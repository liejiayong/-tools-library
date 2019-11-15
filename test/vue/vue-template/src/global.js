// import Vue from 'vue'
import axios from './utils/axios'
// const errorHandler = (error, vm) => {
//   console.error(vm)
//   console.error(error)
// }

// Vue.config.errorHandler = errorHandler

export default {
  install(Vue) {
    // 添加组件

    // 添加过滤器

    // 全局报错处理
    // Vue.prototype.$throw = (error) => errorHandler(error, this)

    // 原型
    Vue.prototype.$http = axios
  }
}
