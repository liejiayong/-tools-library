import { observable, computed, action, runInAction } from "mobx"
import { delay } from '@/utils/index'

class InputStore {
  @observable
  state = {
    firstName: "",
    lastName: ""
  }

  @computed
  get fullName() {
    const { firstName, lastName } = this.state
    const cutting = firstName && lastName ? " - " : ""
    return firstName + cutting + lastName
  }

  @action
  onNameChange = (key, value) => {
    this.state[key] = value

    // 在此处获取所有的'store'模块
    const stores = this.getStores()
    console.log("all stores", stores)
  }

  @action
  onNameChangeAsync = async (key, value) => {
    await delay()

    // 如果是异步触发的修改,需要使用'runInAction'包裹修改动作
    runInAction(() => {
      this.state[key] = value
    })
  }
}

export default InputStore
