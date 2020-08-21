import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

/**
 * <Link to="/tours" > in case we don't want a <Link> but a <Button>
 * we can use the "props.history.push('/tours')" to achieve the same
 * this gives us more flexibility
 *
 * 3 Main properties to look for when working with rect-router
 * => history
 * => location
 * => match
 *
 * match.url gives us the possibility for dynamic routing, without the need
 * to know the full url path
 * we can just extend it i.e. `${props.match.url}/21`
 */
