import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/shipping.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { getDistrictsSchema, getFeeSchema, getWardsSchema } from "../../validations/client/shipping.validation";

router.get("/provinces", controller.getProvinces);
router.get("/districts/:provinceID",validateMiddlware(getDistrictsSchema), controller.getDistricts);
router.get("/wards/:districtID",validateMiddlware(getWardsSchema), controller.getWards);
router.post("/fee",validateMiddlware(getFeeSchema), controller.getFee)

export default router;