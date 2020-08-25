import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzwIgq2EN0x97xsz4vnww4HEyKrmTS__g",
  authDomain: "gtar-db.firebaseapp.com",
  databaseURL: "https://gtar-db.firebaseio.com",
  projectId: "gtar-db",
  storageBucket: "gtar-db.appspot.com",
  messagingSenderId: "896629947935",
  appId: "1:896629947935:web:d39368e812d9873ba91f2a",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

/**
 * QueryReference Objects do not hold the data, they have properties that tell us details about it,
 * or the method to get the Snapshot Object which gives us the data we are looking for.
 *
 * QueryReference === Info
 * QuerySnapshot === data
 *
 * CRUD (Create / Retrieve / Update / Delete) operations can be done only on the reference object
 * not the snapshot.
 *
 * userAuth will return 'null' if you are not signedIn
 *
 * @param {*} userAuth
 * @param {*} additionalData
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  // get the refernce of the data
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  // get the real data
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }

  // console.log(userRef)
  return userRef
}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).catch((error) => {
    console.log(error)
  })

export default firebase

/**
 * HOW TO ACCESS FIRESTORE DATA
 *
 * import firebase from "firebase/app"
 * import "firebase/firestore"
 *
 * const firestore = firebase.firestore()
 *
 * There are 2 ways to access the data with chained .collection() & .doc() functions or
 * with a complete path (string) inside a .collection() or .doc() function
 * The next 2 lines mean the same
 * firestore.collection("users").doc("ZCYotcmUQHAELJR5MFV7").collection("cartItems").doc("JA60QXUOrLeQtv0QKoZ4")
 * firestore.doc("users/ZCYotcmUQHAELJR5MFV7/cartItems/JA60QXUOrLeQtv0QKoZ4")
 *
 * if you want a collection instead of a specifc item
 * firestore.collection("users/ZCYotcmUQHAELJR5MFV7/cartItems")
 */
