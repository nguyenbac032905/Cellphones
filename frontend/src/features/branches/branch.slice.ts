import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Branch } from "./types/branch.type";
import { getStoredBranchId } from "./utils/branchStorage";

interface BranchState {
    branches: Branch[];
    branchId: string;
}

const initialState: BranchState = {
    branches: [],
    branchId: getStoredBranchId(),
};

const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {
        setBranchesReducer: (state, action: PayloadAction<Branch[]>) => {
            state.branches = action.payload;
        },
        setBranchIdReducer: (state, action: PayloadAction<string>) => {
            state.branchId = action.payload;
        },
    },
});

export const { setBranchesReducer, setBranchIdReducer } = branchSlice.actions;
export default branchSlice.reducer;
