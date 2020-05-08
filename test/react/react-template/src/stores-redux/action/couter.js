import { delay } from '@/utils'

export const COUNT_ADD = 'COUNT_ADD'
export const COUNT_DECREASE = 'COUNT_DECREASE'
export const COUNT_ADD_AYSNC = 'COUNT_ADD_AYSNC'

const actions = {
  add(current) {
    return {
      type: COUNT_ADD,
      count: current
    }
  },
  addAsync(current) {
    /*redux-thunk允许你actionCreator返回的是一个函数,
    * 如果是函数，会让函数执行 并且把dispatch的权利转交给你，
    * 你可以在想要的时机派发事件
     */
    return async (dispatch, getState) => {
      await delay()
      dispatch({ type: COUNT_ADD_AYSNC, count: current })
    }
  },
  descrease(current) {
    return {
      type: COUNT_DECREASE,
      count: current
    }
  }
}

export default actions
