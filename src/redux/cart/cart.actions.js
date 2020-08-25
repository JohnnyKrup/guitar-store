import { CartActionTypes } from "./cart.types"

/**
 * payload is an optional property and since
 * we are not making use of it, we don't have to pass anything in to our
 * toggleCartHidden function
 */
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
})
