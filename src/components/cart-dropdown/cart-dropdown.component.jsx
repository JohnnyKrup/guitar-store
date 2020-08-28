import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { withRouter } from "react-router-dom"

import CustomButton from "../custom-button/custom-button.component"
import CartItem from "../cart-item/cart-item.component"
import { selectCartItems } from "../../redux/cart/cart.selectors"
import { toggleCartHidden } from "../../redux/cart/cart.actions"

import "./cart-dropdown.styles.scss"

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} item={cartItem} />
        })
      ) : (
        <span className="empty-message">Dein Warenkorb ist leer</span>
      )}
    </div>
    {
      // .length ? is the same if statement as .length > 0
      cartItems.length ? (
        <CustomButton
          onClick={() => {
            history.push("/checkout")
            dispatch(toggleCartHidden())
          }}
        >
          ZUR KASSE
        </CustomButton>
      ) : null
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
})
/**
 * HigherOrderComponents can take other HOC (like connect) as an argument
 * as HOC always return a component
 *
 * The order in how these HOC are passed in as arguments matters.
 * HOC calls will be evaluated from the inside out, same like math operations
 * In this way connect will be evaluated and then passes all its properties to withRouter
 * this is what we need, as we are looking for the hostory in withRouter to have access
 * to all properties that connect is aware of.
 */
export default withRouter(connect(mapStateToProps)(CartDropdown))
