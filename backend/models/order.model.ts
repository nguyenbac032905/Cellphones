import mongoose, { Schema } from 'mongoose';

const OrderItemSchema = new Schema({
    productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    quantity: { type: Number, required: true, min: 1 },
    mainImage: { type: String, required: true }
}, { _id: false });

const OrderPricingSchema = new Schema({
    subTotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: false },

    items: [OrderItemSchema],

    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        note: { type: String },
        districtID: {type: Number, required: true},
        wardCode: {type: String, required: true},
    },

    paymentDetail: {
        paymentMethod: { type: String, enum: ['COD', 'VNPAY'], required: true },
        paymentStatus: {
            type: String,
            enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
            default: 'PENDING'
        },
        // số giao dịch vnp để có thể đối soát, hoàn tiền
        vnpayTransactionNo: { type: String },
        paidAt: Date
    },

    orderStatus: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERING', 'DELIVERED', 'CANCELLED', 'RETURNED'],
        default: 'PENDING'
    },

    shippingDetails: {
        shippingOrderCode: { type: String },
        expectedDeliveryDate: { type: Date },
        ghnStatus: { 
            type: String, 
            enum: [
                'ready_to_pick', 'picking', 'cancel', 'picked', 
                'storing', 'transporting', 'sorting', 'delivering', 
                'delivery_fail', 'delivered', 'waiting_to_return', 'return', 'returned'
            ]
        }
    },

    // Pricing
    pricing: { type: OrderPricingSchema, required: true },

    // coupon:{
    //     coupon_id: String,
    //     coupon_code: String,
    //     discountType: String,
    //     discountValue: Number,
    //     discountAmount: Number
    // }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema, "orders");

export default Order;