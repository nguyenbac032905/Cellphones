import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/payment.controller";


router.get("/return_payment_url", controller.returnPayment);

export default router;