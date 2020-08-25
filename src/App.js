import React from "react"
import "./App.css"
import HomePage from "./pages/homepage.component"
import { Switch, Route } from "react-router-dom"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import SignInAndSignUpPage from "./pages/sign-in-and-up/sign-in-and-up.component"
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
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
          this.setState(
            {
              currentUser: { id: snapShot.id, ...snapShot.data() },
            },
            () => console.log(this.state)
          )
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
      console.log(this.state) //cannot be added here, beacuse setState is an async call

      // this.setState({ currentUser: user })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        {/* pass in the state of the current user, so that we can display if a user is signed in or not */}
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App
