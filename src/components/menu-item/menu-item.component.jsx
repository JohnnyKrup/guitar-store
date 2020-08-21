import React from "react"
import styled from "styled-components"

/**
 * Every tag can have an element style property,
 * this we use to add the background image
 * of our tiles (menuItems)
 * @param {*} param0
 */
const MenuItem = ({ title, imageUrl, size }) => {
  return (
    <Wrapper className={`${size}`}>
      {/* 
      In order for the image transition to work,
      another div needs to be created inside our original outer div.
      This is because we want to increase only the background image
      without the item to be increased in size.
      */}
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="background-image"
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">DETAILS</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  /* thanks to this property the scale effect cannot become
  bigger than the size of the this container */
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & .background-image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    & .content {
      opacity: 0.9;
    }
  }

  &.large {
    height: 380px;
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  .background-image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
  }

  .content {
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    opacity: 0.7;
    /* thanks to this positioning the content div remains in the middle of the 
    parent container no matter what */
    position: absolute;
    background: #fff;

    .title {
      font-weight: bold;
      margin-bottom: 6px;
      font-size: 22px;
      color: #4a4a4a;
      text-transform: uppercase;
    }

    .subtitle {
      font-weight: lighter;
      font-size: 16px;
    }
  }
`

export default MenuItem
