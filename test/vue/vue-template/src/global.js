import Vue from 'vue';
import axios from '@/utils/axios'
import cookie from '@/utils/cookie'
import localStorage from '@/utils/localStorage'
import '@/utils/componentRegister'

/**
 * 添加方法
 */
Vue.prototype.$http = axios
Vue.prototype.$cookie = cookie
Vue.prototype.$localStorage = localStorage

/**
 * 注册全局报错
 */
Vue.config.errorHandler = (error, vm, info) => {
  console.error(vm)
  console.error(error)
  console.error(info)
}
