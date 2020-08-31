import React from "react"
import { Route } from "react-router-dom"

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import Collection from "../collection/collection.component"

/**
 * we have access to the match property because in App.js
 * the ShopPage is <Route path="/shop" component={ShopPage} /> passed as
 * a Component in a Route and automatically Route passes match / history / location as
 * properties to its component
 * @param {*} param0
 */
const ShopPage = ({ match }) => {
  // console.log(match)
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={Collection} />
    </div>
  )
}

export default ShopPage
