import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import axios from "./http";

import "../vue.config"
import "./assets/reset.css";

axios.defaults.baseURL = '/api';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

// axios.defaults.timeout = 10000;


new Vue({
  render: h => h(App),
  // router,
}).$mount("#app");
