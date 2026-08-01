import { Express } from "express";
import productRoutes from "./products.route";
import productCategoryRoutes from "./productCategories.route";
import authRoutes from "./auth.route";
import cartRoutes from "./cart.route";
import { authMiddleware } from "../../middlewares/client/auth.middleware";
import shippingRoutes from "./shipping.route";
import orderRoutes from "./order.route";
import paymentRoutes from "./payment.route";
import couponRoutes from "./coupon.route";
import chatRoutes from "./chat.route";
import uploadRoutes from "./uploads.route";
const routesClient = (app: Express) => {
    const PATH ="/api";
    app.use(PATH + "/products", productRoutes);
    app.use(PATH + "/product-categories", productCategoryRoutes);
    app.use(PATH + "/auth", authRoutes);
    app.use(PATH + "/cart",authMiddleware, cartRoutes);
    app.use(PATH + "/shipping",authMiddleware, shippingRoutes);
    app.use(PATH + "/orders",authMiddleware, orderRoutes);
    app.use(PATH + "/payment", paymentRoutes);
    app.use(PATH + "/coupons", couponRoutes);
    app.use(PATH + "/chats",authMiddleware, chatRoutes);
    app.use(PATH + "/uploads",authMiddleware, uploadRoutes);
}

export default routesClient;