import Vue from 'vue'
import App from './App'
import router from './router'
 
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()    //此处全局注册一个Vue作为事件中心
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})