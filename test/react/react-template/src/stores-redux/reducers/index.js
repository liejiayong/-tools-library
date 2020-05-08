import { combineReducers } from 'redux'
import counter from './couter'
import user from './user'

export default combineReducers({ counter, user })
