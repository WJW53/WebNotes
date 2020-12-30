import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./http";


import "./assets/reset.css";
import "./assets/index.css";
// import qs from "qs";

// axios.defaults.baseURL = "/api";

// //配置token
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// //配置请求头数据格式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false;
axios.defaults.timeout = 65000;

Vue.prototype.$bus = new Vue();
Vue.prototype.$axios = axios;


new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
