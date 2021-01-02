import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./http";

import VueResource from 'vue-resource';
import "./assets/reset.css";
import "./assets/index.css";
// import qs from "qs";

axios.defaults.baseURL = "/api";


// //配置token
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// //配置请求头数据格式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(VueResource);
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();
Vue.prototype.$axios = axios;

//不知道,解决那个避免重复冗余导航的报错的,但是这个对我来说不行,
//重新安装npm i vue-router@3.0.3 -S   解决问题
// const routerPush = router.prototype.push;
// router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error);
// };

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
