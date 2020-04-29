// 所有的"store-module"在这里整合

import Store from "@/utils/store-mobx"
import couter from "./modules/couter"
import post from "./modules/post"
console.log('store', Store, couter, post)

export default new Store({ couter, post })
