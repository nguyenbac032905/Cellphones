import Cart from "../../models/cart.model";
import Order from "../../models/order.model";
import Product from "../../models/product.model";
import { AppError } from "../../utils/AppError";
import { CreateOrderBody } from "../../validations/client/order.validation";
import { getFeeService } from "./shipping.service";
import { createPaymentUrlService } from "./payment.service";
import { calculatePricing, ICoupon } from "../../helpers/pricing";
import { createGHNOrder } from "../../helpers/ghn";
import { getBranchStockMap, reserveInventory, restoreInventory } from "../../helpers/inventory";
import Coupon from "../../models/coupon.model";

export const createOrderService = async (userID: string, body: CreateOrderBody, branchId: string) => {
    const { products, fullName, phone, address, province, district, ward, districtID, wardCode, note, paymentMethod, couponID } = body;
    let coupon: ICoupon | null = null;
    if (couponID) {
        coupon = await Coupon.findOne({ _id: couponID, deleted: false, status: "active", expireAt: { $gt: new Date() }, }).lean<ICoupon>();
        if (!coupon) {
            throw new AppError("Coupon not found", 404);
        }
    }

    const stockMap = await getBranchStockMap(branchId, products.map((item) => item.productID));

    const requestedQuantity = new Map<string, number>();
    for (const item of products) {
        requestedQuantity.set(item.productID, (requestedQuantity.get(item.productID) ?? 0) + item.quantity);
    }

    const newProducts = [];
    for (const item of products) {
        const product: any = await Product.findOne({ _id: item.productID, deleted: false, status: "active" })
            .select("title price discountPercentage images")
            .lean();

        if (!product) {
            throw new AppError("Sản phẩm không tồn tại hoặc đã bị xóa!");
        }

        const branchStock = stockMap.get(item.productID) ?? 0;
        if (branchStock < (requestedQuantity.get(item.productID) ?? item.quantity)) {
            throw new AppError(`Sản phẩm ${product.title} không đủ số lượng tồn kho tại chi nhánh này!`);
        }

        const mainImage = product.images?.find((i: any) => i.isMain)?.url || product.images?.[0]?.url || "";
        newProducts.push({ ...item, ...product, mainImage });
    }

    const feeRes = await getFeeService({
        fromDistrictId: 1680,
        fromWardCode: "220101",
        toDistrictId: districtID,
        toWardCode: wardCode,
        height: 10,
        width: 30,
        length: 40,
        weight: 3000,
        insuranceValue: 0
    });

    const pricing = calculatePricing({
        items: newProducts,
        shippingFee: feeRes.data.total,
        coupon: coupon
    });

    const inventoryItems = newProducts.map((item) => ({
        variantID: item.productID as string, // TODO: giỏ hàng/đơn hàng chưa mang variantID, cần bổ sung ở bước tích hợp variant vào cart/order
        quantity: item.quantity as number,
        title: item.title as string
    }));

    // COD: không có bước thanh toán online nên trừ tồn kho chi nhánh ngay (atomic, chống bán vượt tồn).
    // VNPAY: tồn kho chỉ bị trừ khi VNPay báo thanh toán thành công (xem payment.service).
    const isCOD = paymentMethod === "COD";
    if (isCOD) {
        await reserveInventory(branchId, inventoryItems);
    }

    let order;
    try {
        order = await Order.create({
            userID,
            branchID: branchId,
            items: newProducts.map((item) => ({
                productID: item.productID,
                title: item.title,
                price: item.price,
                discountPercentage: item.discountPercentage,
                quantity: item.quantity,
                mainImage: item.mainImage
            })),
            shippingAddress: {
                fullName,
                phone,
                address,
                province,
                district,
                ward,
                note,
                districtID,
                wardCode,
            },
            paymentDetail: {
                paymentMethod
            },
            pricing: {
                subTotal: pricing.subTotal,
                discountAmount: pricing.discountAmount,
                shippingFee: pricing.actualShippingFee,
                totalPrice: pricing.totalPrice
            },
            ...(coupon && {
                coupon: {
                    couponID: coupon._id,
                    discountType: coupon.discountType,
                    discountValue: coupon.discountValue,
                    discountAmount: pricing.discountCoupon,
                },
            }),
        });

        if (isCOD) {
            const shippingDetails = await createGHNOrder({
                fullName,
                phone,
                address,
                districtID,
                wardCode,
                note,
                codAmount: pricing.orderTotal,
                paymentTypeID: pricing.paymentTypeID,
                items: newProducts
            });

            order.shippingDetails = shippingDetails;
        }

        await order.save();
    } catch (error) {
        // Tạo đơn / tạo vận đơn thất bại thì hoàn lại tồn kho đã giữ
        if (isCOD) {
            await restoreInventory(branchId, inventoryItems);
        }
        throw error;
    }

    const paymentUrl = createPaymentUrlService({ paymentMethod, orderID: order._id.toString(), amount: pricing.totalPrice, });
    console.log(paymentUrl)
    if (paymentUrl) {
        return {
            data: {
                orderID: order._id,
                paymentMethod,
                nextAction: {
                    type: "redirect",
                    url: paymentUrl
                }
            }
        };
    }

    // Tồn kho chi nhánh đã trừ ở trên, ở đây chỉ cập nhật số lượng đã bán của sản phẩm và dọn giỏ hàng
    await Promise.all(newProducts.map((item) => Product.updateOne({ _id: item.productID }, { $inc: { sold: item.quantity } })));
    await Cart.updateOne({ userID }, { $pull: { products: { productID: { $in: newProducts.map((i) => i.productID) } } } });

    return {
        data: {
            orderID: order._id,
            paymentMethod,
            nextAction: {
                type: "navigate",
                url: `/my-account/orders/${order._id}`
            }
        }
    };
};
export const getOrderService = async (userID: string, orderID: string) => {
    const order = await Order.findOne({ userID: userID, _id: orderID, deleted: false, }).select("-userID -updatedAt").lean();
    if (!order) {
        throw new AppError("Order not found", 404);
    }
    return {
        data: order
    }
}
export const myOrdersService = async (userID: string) => {
    const orders = await Order.find({ userID: userID, deleted: false }).select("-userID -updatedAt").sort({ createdAt: -1 }).lean();
    if (!orders) {
        throw new AppError("Order not found", 404);
    }
    return {
        data: orders
    }
}
