import { CartActionTypes } from "./cart.types"
import { addItemToCart } from "./cart.util"

const INITAL_STATE = {
  hidden: true,
  cartItems: [],
}

const cartReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // first add all existing items into the array
        // then add the current item in the array via action.payload
        cartItems: addItemToCart(state.cartItems, action.payload),
      }

    default:
      return state
  }
}

export default cartReducer
