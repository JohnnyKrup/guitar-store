import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/LogoNoText_128.svg"
import { auth } from "../../firebase/firebase.utils"

const Header = ({ currentUser }) => {
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
      </div>
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

export default Header
