import { observable, action, runInAction } from 'mobx'
import { delay } from '@/utils/index'

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

export default CounterStore
