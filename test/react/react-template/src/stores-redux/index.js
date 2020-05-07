// import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers/index.js'
import {customThunkMiddleware, customLogMiddleware} from './customMiddleware'

const initValues = {
	count: 0
}

const middlewares = [customThunkMiddleware, customLogMiddleware]

const storeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(reducer, initValues, storeEnhancers)
