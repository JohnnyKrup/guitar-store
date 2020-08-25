import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/LogoNoText_128.svg"
import { auth } from "../../firebase/firebase.utils"
import { connect } from "react-redux"
import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

const Header = ({ currentUser, hidden }) => {
  return (
    <Wrapper>
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            ABMELDEN
          </div>
        ) : (
          <Link to="/signin" className="option">
            ANMELDEN
          </Link>
        )}

        <Link to="/contact" className="option">
          KONTAKT
        </Link>

        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  .logo-container {
    height: 100%;
    width: 70px;
    padding: 25px;
  }

  /* .logo {
    height: auto;
    width: 100%;
  } */

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .option {
      padding: 10px 15px;
      cursor: pointer;
    }
  }
`

/**
 * The state that is passed in here is thr RootReducer
 * that's why we have to access .user from the RootReducer
 * then from that property we get the userReducer and in there
 * we want the currentUser from the userReducer
 * [root-reducer].[reducer-selection].[reducer-propertyValue]
 * @param {*} state
 */
// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// })
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
})

/**
 * connect is a HigherOrderComponent (HOC) it is a function
 * that takes in a component as an argument and returns a new component
 * source: https://reactjs.org/docs/higher-order-components.html
 *
 * In our sample we extend the Header Component and we export the
 * Header Component with that added functionality, instead of the
 * initial Header Component
 */
export default connect(mapStateToProps)(Header)
