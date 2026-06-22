import { Express } from "express";
import productRoutes from "./products.route";
import systemConfig from "../../config/system";

const routesClient = (app: Express) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/products", productRoutes);
}

export default routesClient;