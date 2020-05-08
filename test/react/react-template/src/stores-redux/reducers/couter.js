
import { COUNT_ADD, COUNT_DECREASE, COUNT_ADD_AYSNC } from '../action/couter'

// 声明一个初始的状态
var initState = {
  count: 0
}

export default (state = initState, action) => {
  console.log('counter reducers: ', action, state)
  switch (action.type) {
    case COUNT_ADD:
      return { ...state, count: state.count + action.count }
    case COUNT_ADD_AYSNC:
      return { ...state, count: state.count + action.count }
    case COUNT_DECREASE:
      return { ...state, count: state.count - action.count }
    default:
      return state
  }
}
