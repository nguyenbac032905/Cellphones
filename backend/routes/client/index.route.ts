import { Express } from "express";
import productRoutes from "./products.route";
import productCategoryRoutes from "./productCategories.route";
import authRoutes from "./auth.route";
const routesClient = (app: Express) => {
    const PATH ="/api";
    app.use(PATH + "/products", productRoutes);
    app.use(PATH + "/product-categories", productCategoryRoutes);
    app.use(PATH + "/auth", authRoutes);
}

export default routesClient;