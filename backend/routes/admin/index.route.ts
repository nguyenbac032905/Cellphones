import { Express } from "express";
import productRoutes from "./products.route";
import systemConfig from "../../config/system";
import productCategoryRoutes from "./productCategories.route";
import uploadRotes from "./uploads.route";
import recycleBinRoutes from "./recycleBin.route";

const routesClient = (app: Express) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/product-categories", productCategoryRoutes);
    app.use(PATH_ADMIN + "/uploads", uploadRotes);
    app.use(PATH_ADMIN + "/recycle-bin", recycleBinRoutes);
}

export default routesClient;