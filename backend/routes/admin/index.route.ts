import { Express } from "express";
import productRoutes from "./products.route";
import systemConfig from "../../config/system";
import productCategoryRoutes from "./productCategories.route";
import uploadRotes from "./uploads.route";
import recycleBinRoutes from "./recycleBin.route";
import authRoutes from "./auth.route";
import { authMiddleware } from "../../middlewares/admin/auth.middleware";
import roleRoutes from "./roles.route";

const routesClient = (app: Express) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/products",authMiddleware, productRoutes);
    app.use(PATH_ADMIN + "/product-categories",authMiddleware, productCategoryRoutes);
    app.use(PATH_ADMIN + "/uploads",authMiddleware, uploadRotes);
    app.use(PATH_ADMIN + "/recycle-bin",authMiddleware, recycleBinRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
    app.use(PATH_ADMIN + "/roles",authMiddleware, roleRoutes);
}

export default routesClient;