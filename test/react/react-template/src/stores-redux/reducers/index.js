
import { COUNT_ADD, COUNT_DECREASE } from '../action/couter'

export default (state, action) => {
  switch (action.type) {
    case COUNT_ADD:
      return { ...state, count: action.count }
    case COUNT_DECREASE:
      return { ...state, count: action.count }
    default:
      return state
  }
}
