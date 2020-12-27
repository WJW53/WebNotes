<template>
  <div id="app">
    <!-- <input name="file" type="file" @click="getData" /> -->
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
      // this.$axios.get("search?wd='中国'"
      // })
      this.$axios
        .get("search", {
          //http://29s13l8324.wicp.vip/search?wd=%E4%B8%AD%E5%9B%BD
          params: {
            wd: "斗罗大陆",
          },
        })
        .then((res) => {
          console.log("success!");
          console.log(res.data);
          // console.log(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log("error!");
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
</style>
