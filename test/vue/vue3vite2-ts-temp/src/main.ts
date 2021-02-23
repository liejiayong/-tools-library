import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import store, { storeKey } from "./store";
import router from "./router";

const app = createApp(App);

app.use(store, storeKey).use(router).use(ElementPlus).mount("#app");
console.log("app", app, store);
