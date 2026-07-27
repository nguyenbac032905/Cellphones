import { returnPaymentService } from "../../services/client/payment.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Response, Request } from "express";

export const returnPayment = asyncHandler(async (req: Request, res: Response) => {
    const result = await returnPaymentService(req.query);

    return res.redirect( `http://localhost:3002/orders/${result.orderID}` );
});