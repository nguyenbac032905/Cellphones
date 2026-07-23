import { getDistrictsService, getFeeService, getProvincesService, getWardsService } from "../../services/client/shipping.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const getProvinces = asyncHandler(async (req: Request, res: Response) => {
    const result = await getProvincesService();
    return res.status(200).json({
        success: true,
        data: result.data
    })
});
export const getDistricts = asyncHandler(async (req: Request<{provinceID: number}>, res: Response) => {
    const provinceID = req.params.provinceID;
    const result = await getDistrictsService(provinceID);
    return res.status(200).json({
        success: true,
        data: result.data
    })
});
export const getWards = asyncHandler(async (req: Request<{districtID: number}>, res: Response) => {
    const districtID = req.params.districtID;
    const result = await getWardsService(districtID);
    return res.status(200).json({
        success: true,
        data: result.data
    })
});
export const getFee = asyncHandler(async (req: Request, res: Response) => {
    const result = await getFeeService(req.body);
    return res.status(200).json({
        success: true,
        data: result.data
    })
});