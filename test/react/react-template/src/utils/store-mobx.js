import { configure } from "mobx"

configure({ enforceActions: "observed" })

class Store {
  constructor(storeConstructors) {
    if (storeConstructors) {
      for (const key in storeConstructors) {
        const S = storeConstructors[key]
        if (S && typeof S === "function") {
          const storeInstance = new S()
          // 注入公共方法'getStores'
          // 获取所有的'store'
          Object.defineProperty(storeInstance, "getStores", {
            value: () => this.stores
          })

          this.stores[key] = storeInstance
        }
      }
      return this.stores
    }
  }

  // store集合
  stores = {}
}

export default Store
