import Vue from 'vue';
import axios from '@/utils/axios'

Vue.prototype.$http = axios

// const errorHandler = (error, vm) => {
//   console.error(vm)
//   console.error(error)
// }
// Vue.config.errorHandler = errorHandler

