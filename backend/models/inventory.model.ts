import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        branch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true
        },
        stock: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

inventorySchema.index(
    { product_id: 1, branch_id: 1 },
    { unique: true }
);

inventorySchema.index({ branch_id: 1 });

const Inventory = mongoose.model(
    "Inventory",
    inventorySchema,
    "inventories"
);

export default Inventory;
