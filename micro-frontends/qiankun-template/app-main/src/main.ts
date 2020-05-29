import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import startQiankun from "./micro"
Vue.config.productionTip = false;

Vue.use(Antd);

startQiankun();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
