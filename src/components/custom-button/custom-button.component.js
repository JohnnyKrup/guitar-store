import React from "react"
import "./custom-button.styles.scss"

/**
 * Why do we create a button, when we need a <input type="submit" />?
 * both <button> and <input> have the property type=""
 * the type="" will be passed through as the ...otherProps
 */
const CustomButton = ({ children, ...otherProps }) => (
  <button className="custom-button" {...otherProps}>
    {children}
  </button>
)

export default CustomButton
