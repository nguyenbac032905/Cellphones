interface PricingItem {
    price: number;
    quantity: number;
    discountPercentage: number;
}

interface CalculatePricingParams {
    items: PricingItem[];
    shippingFee: number;
    freeShippingThreshold?: number;
}

interface PricingResult {
    subTotal: number;
    discountAmount: number;
    orderTotal: number;
    shippingFee: number;
    actualShippingFee: number;
    totalPrice: number;
    isFreeShip: boolean;
    paymentTypeID: 1 | 2;
}

export const calculatePricing = ({ items, shippingFee, freeShippingThreshold = 300000 }: CalculatePricingParams): PricingResult => {
    const subTotal = Math.round( items.reduce( (sum, item) => sum + item.price * item.quantity, 0 ) );
    const discountAmount = Math.round( items.reduce( (sum, item) => sum + item.price * item.quantity * (item.discountPercentage / 100), 0 ) );
    const orderTotal = subTotal - discountAmount;

    const isFreeShip = orderTotal >= freeShippingThreshold;
    const actualShippingFee = isFreeShip ? 0 : shippingFee;

    const totalPrice = orderTotal + actualShippingFee;

    return { subTotal, discountAmount, orderTotal, shippingFee, actualShippingFee, totalPrice, isFreeShip, paymentTypeID: isFreeShip ? 1 : 2 };
};