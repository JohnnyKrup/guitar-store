import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"

import rootReducer from "./root-reducer"

/**
 * for more information: https://redux.js.org/
 */
const middlewares = [logger]

/**
 * create a redux-store, apply a middleware
 * and spread all properties of the [logger] array from the redux-logger
 * (the logger helps us debugging)
 * we could have written also:
 * const store = createStore(rootReducer, applyMiddleware(logger)
 * applyMiddleware will accept all possible middleWares
 */
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
