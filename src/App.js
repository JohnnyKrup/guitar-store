import React from "react"
import "./App.css"
import HomePage from "./pages/homepage.component"
import { Switch, Route, Redirect } from "react-router-dom"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import SignInAndSignUpPage from "./pages/sign-in-and-up/sign-in-and-up.component"
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"
import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/user.actions"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // check if the user is signing in
      if (userAuth) {
        // if there is a document in firebase get back the userReference object
        // if there is no document, a new entry is created in the createUserProf. function
        // with the data from our userAuth process
        const userRef = await createUserProfileDocument(userAuth)

        /**
         * create a listener on the userRef object to get notified of any changes to it
         * we also get back the first state of that data
         * this data from the database, we set equal to our currentUser in our app
         * so that we can massage the data
         */
        userRef.onSnapshot((snapShot) => {
          /**
           * the ID and the rest of the data is not stored in the same place
           * how can we get the data of both places, with one call?
           * get the ID from snapShot.id
           * and as a 2nd arg spread ...snapShot.data() where all other props are
           */
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        {/* pass in the state of the current user, 
        so that we can display if a user is signed in or not.
        After using Redux, we do not need to pass the state of the current user anymore
        */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

/**
 * Thnaks to this function, we have access to:
 * this.props.currentUser
 * @param {*} param0
 */
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
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
