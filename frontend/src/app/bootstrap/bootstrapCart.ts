import { clearCartReducer, setCartReducer } from "../../features/cart/cart.slice";
import { cartService } from "../../features/cart/services/cart.service";
import { store } from "../store";

export const bootstrapCart = async () => {
    try {
        const result = await cartService.getCart();
        store.dispatch( setCartReducer(result) );
    } catch {
        store.dispatch(clearCartReducer());
    }
};