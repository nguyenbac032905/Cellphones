import { Express } from "express";
import productRoutes from "./products.route";

const routesClient = (app: Express) => {
    const PATH ="/api";
    app.use(PATH + "/products", productRoutes);
}

export default routesClient;