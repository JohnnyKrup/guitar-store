import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"

/**
 * This root reducer will combine all the code
 * of all reducers in this project
 */
export default combineReducers({
  user: userReducer,
})
