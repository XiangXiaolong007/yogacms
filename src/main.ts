import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import "@/utils/request";

import "./style/index.scss";
// 引入font-awesome字体图标
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
