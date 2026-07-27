import Cart from "../../models/cart.model";
import Order from "../../models/order.model";
import Product from "../../models/product.model";
import { AppError } from "../../utils/AppError";
import { CreateOrderBody } from "../../validations/client/order.validation";
import { getFeeService } from "./shipping.service";
import { createPaymentUrlService } from "./payment.service";
import { calculatePricing } from "../../helpers/pricing";
import { createGHNOrder } from "../../helpers/ghn";

export const createOrderService = async ( userID: string, body: CreateOrderBody, ) => {
    const { products, fullName, phone, address, province, district, ward, districtID, wardCode, note, paymentMethod } = body;

    const newProducts = [];
    for (const item of products) {
        const product: any = await Product.findOne({_id: item.productID, deleted: false, status: "active"})
            .select("title price discountPercentage stock images")
            .lean();

        if (!product) {
            throw new AppError("Sản phẩm không tồn tại hoặc đã bị xóa!");
        }

        if (product.stock < item.quantity) {
            throw new AppError( `Sản phẩm ${product.title} không đủ số lượng tồn kho!` );
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
        shippingFee: feeRes.data.total
    });

    const order = await Order.create({
        userID,
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
        }
    });

    if (paymentMethod === "COD") {
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

    const paymentUrl = createPaymentUrlService({ paymentMethod, orderID: order._id.toString(), amount: pricing.totalPrice, });

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

    await Promise.all( newProducts.map((item) => Product.updateOne( { _id: item.productID }, { $inc: { stock: -item.quantity, sold: item.quantity } } ) ) );
    await Cart.updateOne( { userID }, { $pull: { products: { productID: { $in: newProducts.map((i) => i.productID) } } } } );
    
    return {
        data: {
            orderID: order._id,
            paymentMethod,
            nextAction: {
                type: "navigate",
                url: `/orders/${order._id}`
            }
        }
    };
};
export const getOrderService = async (userID: string, orderID: string) => {
    const order = await Order.findOne({ userID: userID, _id: orderID, deleted: false, }).select("-userID -updatedAt").lean();
    if(!order){ 
        throw new AppError("Order not found", 404);
    }
    return {
        data: order
    }
}