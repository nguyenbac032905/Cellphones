import Cart from "../../models/cart.model";
import Order from "../../models/order.model";
import Product from "../../models/product.model";
import { AppError } from "../../utils/AppError";
import { CreateOrderBody } from "../../validations/client/order.validation";
import axios from "axios";
const ghnClient = axios.create({
    baseURL: process.env.GHN_BASE_URL,
    headers: {
        Token: process.env.GHN_TOKEN,
        ShopId: process.env.GHN_SHOP_ID,
        "Content-Type": "application/json"
    }
});

export const createOrderService = async (userID: string, body: CreateOrderBody) => {
    const { products, fullName, phone, address, province, district, ward, districtID, wardCode, note, paymentMethod } = body;

    const newProducts = [];
    for (const item of products) {
        const product: any = await Product.findOne({ _id: item.productID, deleted: false, status: "active" })
            .select("title price discountPercentage stock images")
            .lean();

        if (!product) {
            throw new AppError("Sản phẩm không tồn tại hoặc đã bị xóa!");
        }

        if (product.stock < item.quantity) {
            throw new AppError(`Sản phẩm ${product.title} không đủ số lượng tồn kho!`);
        }

        const mainImage = product.images?.find((image: any) => image.isMain === true)?.url || product.images?.[0]?.url || "";
        newProducts.push({ ...item, ...product, mainImage });
    }

    // Tính toán số tiền
    const subTotal = Math.round(newProducts.reduce((sum, item) => sum + item.quantity * item.price, 0));
    const discountAmount = Math.round(newProducts.reduce((sum, item) => sum + item.quantity * (item.price * item.discountPercentage / 100), 0));
    const totalOrder = subTotal - discountAmount;

    // Điều kiện Freeship (Đơn >= 300k: Shop trả ship [1], Dưới 300k: Khách trả ship [2])
    const isFreeShip = totalOrder >= 300000 ? 1 : 2;

    const order = new Order({
        userID: userID,
        items: newProducts.map(item => ({
            productID: item.productID,
            title: item.title,
            price: item.price,
            discountPercentage: item.discountPercentage,
            quantity: item.quantity,
            mainImage: item.mainImage
        })),
        shippingAddress: {
            fullName, phone, address, province, district, ward, note
        },
        paymentDetail: {
            paymentMethod: paymentMethod
        }
    });
    
    if (paymentMethod === "COD") {
        const ghnOrderRes = await ghnClient.post("/v2/shipping-order/create", {
            payment_type_id: isFreeShip,
            cod_amount: Math.round(totalOrder),
            note: note,
            required_note: "KHONGCHOXEMHANG",

            from_name: "Cellphones",
            from_phone: "0353263314",
            from_address: "25 Ngô Tất Tố, phường An Tảo, thành phố Hưng Yên, tỉnh Hưng Yên",
            from_district_id: 1680,
            from_ward_code: "220101",

            to_name: fullName,
            to_phone: phone,
            to_address: address,
            to_district_id: districtID,
            to_ward_code: wardCode,

            weight: 3000,
            length: 40,
            width: 30,
            height: 10,
            service_type_id: 2,

            items: newProducts.map(item => ({
                name: item.title,
                quantity: item.quantity,
                price: item.price
            }))
        });
        
        if (!ghnOrderRes || !ghnOrderRes.data?.data) {
            throw new AppError("Tạo đơn hàng GHN thất bại!");
        }

        const ghnData = ghnOrderRes.data.data;
        order.shippingDetails = {
            shippingOrderCode: ghnData.order_code,
            expectedDeliveryDate: ghnData.expected_delivery_time,
            ghnStatus: "ready_to_pick"
        };
        const actualShippingFee = isFreeShip ? 0 : ghnData.total_fee;
        order.pricing = {
            subTotal: subTotal,
            discountAmount: discountAmount,
            shippingFee: actualShippingFee,
            totalPrice: totalOrder + actualShippingFee
        }
    }

    await order.save();

    await Promise.all(newProducts.map(item =>
        Product.updateOne({ _id: item.productID }, { $inc: { stock: -item.quantity, sold: item.quantity } })
    ));

    const ids = newProducts.map(item => item.productID);
    
    await Cart.updateOne(
        { userID: userID },
        { $pull: { products: { productID: { $in: ids } } } }
    );
    
    return {
        data: {orderID: order._id}
    };
};