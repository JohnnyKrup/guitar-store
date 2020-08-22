import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/LogoNoText_128.svg"

const Header = () => {
  return (
    <Wrapper>
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
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

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .option {
      padding: 10px 15px;
    }
  }
`

export default Header
