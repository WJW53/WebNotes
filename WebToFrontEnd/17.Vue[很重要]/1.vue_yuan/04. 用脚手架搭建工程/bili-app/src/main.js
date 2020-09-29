import Vue from 'vue'
import App from './App.vue'
// import channelServ from "./services/channel.js"

// Vue.config.productionTip = false

// channelServ.getChannels();//不能,得用async、await

// async function test() {
//   var channels = await channelServ.getChannels();
//   console.log(channels);
// }
// test();

//都写完了得重新npm run serve才能看是否拿到了,
//这种方法只在开发环境下有效,一打包后,又会失效..

new Vue({
  render: h => h(App),
}).$mount('#app');

