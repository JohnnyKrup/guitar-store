import { connect } from "react-redux"
import { compose } from "redux"
import { createStructuredSelector } from "reselect"

import { isCollectionsLoadedSelector } from "../../redux/shop/shop.selector"
import WithSpinner from "../../components/with-spinner/with.spinner.component"
import CollectionPage from "./collection.component"

/**
 * isLoading is passed in a function that gets the state as well as all other props
 * and passes its state into the selector
 */
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !isCollectionsLoadedSelector(state),
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage)

export default CollectionPageContainer
