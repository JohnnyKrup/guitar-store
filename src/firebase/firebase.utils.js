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

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).catch((error) => {
    console.log(error)
  })

export default firebase
