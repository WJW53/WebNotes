import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import axios from "./http";

// import "../vue.config"
import "./assets/reset.css";
// import qs from "qs";

axios.defaults.baseURL = "/api";
// //配置token
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// //配置请求头数据格式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// axios.defaults.timeout = 10000;


new Vue({
  render: h => h(App),
  // router,
}).$mount("#app");
