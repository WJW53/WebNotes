<template>
  <div id="app">
    <!-- <input  name="file" type="file" onclick="uploadpic(event)"/> -->
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import $ from '../node_modules/jquery';

export default {
  name: "App",
  components: {
    HelloWorld
  },
  methods:{
    
  },
  mounted(){
    console.log('ok');
    // this.$axios.get("search?wd='中国'"

    // })
      this.$axios.get("search",{//http://29s13l8324.wicp.vip/search
        params:{
          "wd":"斗罗大陆",
        }
    }).then(res => {
        console.log('success!');
        console.log(res.data);
      })
      .catch(error => {
        console.log('error!');
        console.log(error);
      });



    // $.ajax({
    //   url: "http://29s13l8324.wicp.vip/search?wd=%E4%B8%AD%E5%9B%BD",
    //   type: 'GET',
    //   dataType: 'JSONP',
    //   jsonpCallBack: "callback",
    //   success: function(res){
    //     console.log('success!');
    //     console.log(res);
    //   },
    //   error: function(err){
    //     console.log('error');
    //     console.log(err);
    //   }
    // });

  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
