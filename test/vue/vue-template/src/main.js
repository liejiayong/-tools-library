import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './global'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const install = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(install)
