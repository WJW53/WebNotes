<template>
  <div id="app">
    <!-- <input name="file" type="file" @click="getData" /> -->
    <!-- <span class="iconfont icon-sousuo">&#xe677;</span> -->



  </div>
</template>

<script>
// import $ from '../node_modules/jquery';

export default {
  name: "App",
  components: {},
  data() {
    return {
      wordsList: [],
    };
  },

  methods: {
    getData() {
      this.$axios.get("http://29s13l8324.wicp.vip/qna?wd=中国")
      // this.$axios.get("http://29s13l8324.wicp.vip/qna?wd=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6%E7%9A%84%E7%9F%A5%E5%90%8D%E6%A0%A1%E5%8F%8B%E6%9C%89%E8%B0%81"
      // )
      // this.$axios
      //   .get("search", {
      //     //http://29s13l8324.wicp.vip/search?wd=%E4%B8%AD%E5%9B%BD
      //     params: {
      //       wd: "斗罗大陆",
      //     },
      //   })
        .then((res) => {
          console.log("success!");
          console.log(typeof res.data, res.data);
          // console.log(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log("error!");
          console.log(error);
        });
        console.log('end.');

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
    },
  },

  created() {
    console.log("ok");
    this.getData();
  },
};
</script>

<style>
/* #app {
  
} */
.icon-sousuo {
  color: blue;
  font-size: 32px;
}
</style>