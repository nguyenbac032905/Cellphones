import type { RootState, AppDispatch } from "./store";
import { useDispatch, useSelector} from "react-redux";
import type {TypedUseSelectorHook } from "react-redux";

// typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// typed selector
export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;