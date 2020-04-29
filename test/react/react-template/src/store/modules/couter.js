import { observable, action, runInAction } from 'mobx'

class CounterStore {
  @observable count = 0

  @action
  add = () => {
    this.count++
  }

  @action
  addSync = async () => {
    await delay()
    runInAction(() => {
      this.count++
    })
  }

  @action
  sub = () => {
    this.count--
  }
}

function delay(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export default CounterStore
