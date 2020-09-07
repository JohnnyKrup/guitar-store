import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { compose } from "redux"

import { isCollectionsFetchingSelector } from "../../redux/shop/shop.selector"
import WithSpinner from "../with-spinner/with.spinner.component"
import CollectionsOverview from "./collections-overview.component"

const mapStateToProps = createStructuredSelector({
  isLoading: isCollectionsFetchingSelector,
})

/**
 * 1st WithSpinner will wrap around CollectionsOverview
 * 2nd We will receive our CollectionsOverviewWithSpinner component
 * 3rd CollectionsOverviewWithSpinner will be passed into connect, where State props are added to it
 *
 * This is hard to read, if there are more HOC that wrap the existing components
 * it will be even harder to read, therefore we use "compose" from redux
 */
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// )

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer
