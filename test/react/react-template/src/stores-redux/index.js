import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reduxLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index.js'

const middlewares = applyMiddleware(reduxThunk, reduxPromise, reduxLogger)

const store = createStore(reducer, middlewares)

export default store
