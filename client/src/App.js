import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./App.css"

import HomePage from "./pages/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import SignInAndSignUpPage from "./pages/sign-in-and-up/sign-in-and-up.component"
import CheckoutPage from "./pages/checkout/checkout.component"

import Header from "./components/header/header.component"

import { auth, createUserProfileDocument } from "./firebase/firebase.utils"
import { setCurrentUser } from "./redux/user/user.actions"
import { selectCurrentUser } from "./redux/user/user.selectors"

const App = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeUserAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
    return () => {
      console.log("I unsubscribed")
      unsubscribeUserAuth()
    }
  }, [setCurrentUser])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        {/**
         * instead of component={SignInAndSignUpPage}
         * we want to use the render={} prop, so that we can set up
         * that signed in users, will be redirected to the homepage
         * and cannot mess around with the signin page
         */}
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

/**
 * Thnaks to this function, we have access to:
 * this.props.currentUser
 * @param {*} param0
 */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

/**
 * This function spreads the actions of the reducers
 * i.e. setCurrentUser: user => dispatch(setCurrentUser(user))
 * this means: we call an anonymous function and pass in a user,
 * this user will be dispatched with a new setCurrentUser object
 * with that user in it
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
