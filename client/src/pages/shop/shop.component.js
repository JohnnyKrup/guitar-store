import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions"

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionConatiner from "../collection/collection.container"

/**
 * we have access to the match property because in App.js
 * the ShopPage is <Route path="/shop" component={ShopPage} /> passed as
 * a Component in a Route and automatically Route passes match / history / location as
 * properties to its component
 * @param {*} param0
 */
const ShopPage = ({ fetchCollectionsStartAsync, match }) => {
  /**
   * the second argument after the object, is to tell React
   * not to call this useEffect function, in case nothing has changed
   * it can lead to infinite loops if that 2nd arg gets forget
   */
  useEffect(() => {
    fetchCollectionsStartAsync()
  }, [fetchCollectionsStartAsync])

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionConatiner}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})

export default connect(null, mapDispatchToProps)(ShopPage)
