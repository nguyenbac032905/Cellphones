import { Types } from "mongoose";
import Inventory from "../models/inventory.model";
import { AppError } from "../utils/AppError";

export interface InventoryItem {
    variantID: string | Types.ObjectId;
    quantity: number;
    title?: string;
}

export const getBranchStockMap = async (branchId: string, variantIDs: (string | Types.ObjectId)[]) => {
    const inventories = await Inventory.find({
        branch_id: branchId,
        variant_id: { $in: variantIDs }
    }).select("variant_id stock").lean();

    return new Map<string, number>(
        inventories.map((inv) => [inv.variant_id.toString(), inv.stock])
    );
};

export const restoreInventory = async (branchId: string, items: InventoryItem[]) => {
    await Promise.all(
        items.map((item) =>
            Inventory.updateOne(
                { variant_id: item.variantID, branch_id: branchId },
                { $inc: { stock: item.quantity } }
            )
        )
    );
};

export const reserveInventory = async (branchId: string, items: InventoryItem[]) => {
    const reserved: InventoryItem[] = [];

    try {
        for (const item of items) {
            const updated = await Inventory.findOneAndUpdate(
                {
                    variant_id: item.variantID,
                    branch_id: branchId,
                    stock: { $gte: item.quantity }
                },
                { $inc: { stock: -item.quantity } }
            );

            if (!updated) {
                throw new AppError(
                    item.title
                        ? `Sản phẩm ${item.title} không đủ số lượng tồn kho tại chi nhánh này!`
                        : "Sản phẩm không đủ số lượng tồn kho tại chi nhánh này!"
                );
            }

            reserved.push(item);
        }
    } catch (error) {
        await restoreInventory(branchId, reserved);
        throw error;
    }
};

export const deductInventoryAfterPayment = async (branchId: string, items: InventoryItem[]) => {
    await Promise.all(
        items.map((item) =>
            Inventory.updateOne(
                { variant_id: item.variantID, branch_id: branchId },
                [{ $set: { stock: { $max: [0, { $subtract: ["$stock", item.quantity] }] } } }]
            )
        )
    );
};
