<template>
  <!-- 网页头部 -->

  <div class="se-base-home">
    <!-- logo v-if 最初的页面，还没输入东西的时候，要显示这个logo1
                但总之要一直有下面那个search-box组件，但是下面那个组件的样式却又不一样了
                切换组件的时候 只是样式改变了而已还有位置，位置也能用样式改
            -->
    <!-- <slot> </slot> -->
    <div class="search-logo">
      <!-- <img src="" alt="" class="img-lg"> -->
      <span class="logo-title">闻</span>
      <!-- <span class="iconfont icon-logo">&#xe6a2;</span> -->
      <img
        src="../assets/images/se-logo.png"
        alt="闻海"
        title="闻海一下，速览新闻"
      />
      <span class="logo-title">海</span>
    </div>
    <!-- v-else -->

    <!-- 搜索部分 -->
    <div class="search-box">
      <!-- 第一排 -->
      <div class="search">
        <span class="search-area">
          <span class="iconfont img-se" @click="changeHome">&#xe63c;</span>
          <span class="iconfont file-se" @click="changeHome">&#xe685;</span>
          <span class="iconfont qa-se" @click="changeHome">&#xe601;</span>
          <input
            type="text"
            class="search-text"
            placeholder="[请任意输入，进入闻海搜索]"
            maxlength="100"
            v-model="inputVal"
            @input="onInput"
            ref="getFocus"
          />

          <!-- 下面三个span文本一开始是隐藏着的 -->
          <span class="img-hover-tip" >按图片搜索</span>
          <!-- 点击图片/文件对应的icon之后弹出一个框框，就是选择文件的 -->
          <span class="file-hover-tip" >上传文件</span>
          <!-- 我要提问的话就用路由转新的页面 -->
          <span class="qa-hover-tip" >我要提问</span>
        </span>
        <span class="submit-box">
          <!-- 点击提交之后,就请求拿到数据,然后动态实时渲染页面. 
                            这也是路由换新的页面哦 -->
          <input type="submit" value="闻海搜索" class="se-btn-sub" />
        </span>
      </div>
    </div>
  </div>
</template>



<script>
// <template>
//   <base-home></base-home>
// </template>

// import BaseHome from "./BaseHome";

export default {
  name: "BaseHome1",
  data() {
    return {
      inputVal: "",
    };
  },
  components: {
    // BaseHome,
  },
  methods: {
    onInput() {
      // console.log(this.inputVal);
      // console.log("now this is bh1", this.inputVal);
      this.$parent.isInpSe = true;
      let param = this.inputVal;
      this.inputVal = "";//避免点浏览器后退前进后,原先那个文本框内容还在
      this.$bus.$emit("bh2", param); //不行 这会儿BaseHome还不在DOM结构里呢,怎么跟它通信呢,我一开始写的两个组件就...
    },
    changeHome(){
      this.isInpSe = true;
      this.$emit("changeHome");
    },
  },
  created() {
    // this.$bus.$on("bh1",this.inputVal);
  },
  mounted() {
    // document.getElementById("getFocus").focus
    this.$refs.getFocus.focus();
  },
};
</script>



<style scoped>
.se-base-home {
  height: 450px;
  width: 730px;
  margin: auto;
  margin-top: 225px;
}
.search-logo {
  /* background-color: blue; */
  vertical-align: middle;
  cursor: pointer;
  text-align: center;
}
.search-logo img {
  margin: 0 5px;
}
.search-logo .logo-title {
  font-size: 60px;
  color: red;
  vertical-align: top;
}
.search-box {
  position: relative;
  margin-top: 30px;
  /* width: 820px; */
  /* background-color: red; */
}
.search {
  font-size: 16px;
}
.search .search-area {
  position: relative;
}
.search .search-area .img-hover-tip,
.search .search-area .file-hover-tip,
.search .search-area .qa-hover-tip {
  display: none;
}

.search .search-area .img-se:hover ~ span.img-hover-tip,
.search .search-area .file-se:hover ~ span.file-hover-tip,
.search .search-area .qa-se:hover ~ span.qa-hover-tip {
  display: inline;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 94px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #626675;
  position: absolute;
  /* 注意这个101,不然看不到,被那个实时预览框给抹白了 */
  z-index: 101;
  top: 52px;
  right: 5px;
}
.search .search-area .search-text {
  height: 36px;
  padding: 4px 10px;
  border: 2px solid #c4c7ce;
  border-radius: 10px 0 0 10px;
  width: 484px;
  font-size: 18px;
  padding-right: 120px;
  overflow: hidden;
  box-shadow: none;
  outline: 0;
}
.search .search-area .search-text:hover {
  border-color: #a7aab5;
}
.search .search-area .iconfont {
  position: absolute;
  width: 24px;
  height: 20px;
  font-size: 20px;
  cursor: pointer;
  top: 50%;
  margin-top: -10px;
  margin-right: 10px;
}
.search .img-se {
  right: 70px;
  z-index: 1;
}
.search .file-se {
  right: 36px;
  z-index: 1;
  font-weight: 600;
}
.search .qa-se {
  right: 0;
  z-index: 1;
}

.search .submit-box {
  position: absolute;
  z-index: 2;
  margin-left: -2px;
  /* background-color: red; */
}

.search .submit-box .se-btn-sub {
  width: 112px;
  border: 0;
  cursor: pointer;
  height: 48px;
  font-weight: 400;
  font-size: 17px;
  text-align: center;
  line-height: 48px;
  background-color: #38f;
  color: #ffffff;
  border-radius: 0 10px 10px 0;
  outline: none;
}
.search .search-area input.search-text:focus {
  border-color: #38f;
}
.search .submit-box .se-btn-sub:hover {
  background-color: #317ef3;
  border-bottom: 1px solid #2868c8;
  /* box-shadow: 1px 1px 1px #000; */
}
</style>