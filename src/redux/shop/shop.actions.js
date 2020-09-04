import ShopActionTypes from "./shop.types"

import {
  firestore,
  convertCollcetionsSnapshotToMap,
} from "../../firebase/firebase.utils"

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
})

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
})

/**
 * If "redux-thunk middleware" is enabled, anytime you attempt to 'dispatch' a function
 * instead of an object, the 'middleware' will call that function with the 'dispatch method
 * itslef as the first argument
 *
 * fetchCollectionsStartAsync() is a function that returns a function, that has access to dispatch
 * so that we can dispatch multiple actions and handle async code inside it
 */
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections")
    dispatch(fetchCollectionsStart())

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollcetionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap))
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)))
  }
}
