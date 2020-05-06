import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import {customThunkMiddleware, customLogMiddleware} from './customMiddleware'

const initValues = {
	daily: undefined, 
	locationId: 0, 
	calenderId: 0
}

const middlewares = [customThunkMiddleware, customLogMiddleware]

const storeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(reducer, initValues, storeEnhancers)
