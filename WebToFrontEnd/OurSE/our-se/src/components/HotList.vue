<template>
  <!-- 首页里的百度热榜 -->
  <div class="hot-news-wrapper" v-if="hotNewsList && hotNewsList.length != 0">
    <div class="hot-news-header clearfix">
      <span class="hot-news-title">闻海热榜</span>
      <span
        class="iconfont hot-refresh-icon hot-refresh-text"
        @click="changePage"
        >&#xe65b;&nbsp;换一换</span
      >
    </div>
    <ul class="hot-news-list">
      <li
        class="news-meta-item clearfix"
        v-for="(news, index) in curNewsList"
        :key="news.id"
      >
        <span
          class="news-title-index"
          v-if="curPage == 0 && index < 3"
          :style="{ backgroundColor: colorsArray[index] }"
          >{{ index + pageSize * curPage + 1 }}</span
        >
        <span v-else class="news-title-index">{{
          index + pageSize * curPage + 1
        }}</span>
        <a :href="news.url" target="_blank" class="news-title-content">
          {{ news.title }}
        </a>
        <span class="news-title-hot" v-if="index + pageSize * curPage + 1 == 1">热</span>
        <span class="news-title-new" v-if="index + pageSize * curPage + 1 == 5">新</span>
        <span class="news-count"
          >{{ Math.floor(news.click_num / 10000) }}万</span
        >
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "hotlist",
  props: ["hotNewsList"],
  data() {
    return {
      curPage: 0,
      colorsArray: ["#f54545", "#ff8547", "#ffac38"],
      totalPage: 0, //初始页为0,便于%操作
      pageSize: 10, //每页大小默认为10
      curNewsList: [],
    };
  },
  methods: {
    changePage() {
      this.curPage = ++this.curPage % this.totalPage;
      // console.log("changePage:" + this.curPage);
      this.curNewsList = this.hotNewsList.slice(
        //更新啊
        this.curPage * this.pageSize,
        (this.curPage + 1) * this.pageSize
      );
    },
    curHotListChanged() {
      // this.$emit("changeHotList"); //通知父亲要刷新我的组件了??我测试的是这里不需要这样做,所以我就都注释起来了,以后有需要解开注释
    },
  },
  created() {
    this.totalPage = Math.ceil(this.hotNewsList.length / this.pageSize);
    this.curNewsList = this.hotNewsList.slice(
      this.curPage * this.pageSize,
      (this.curPage + 1) * this.pageSize
    );
  },
  mounted() {},
  watch: {
    // curNewsList: "curHotListChanged",
  },
};
</script>


<style scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  overflow: hidden;
}

.hot-news-wrapper {
  position: fixed;
  padding: 10px 5px;
  top: 150px;
  right: 300px;
  width: 400px;
}
.hot-news-wrapper a:link {
  color: #2440b3;
}
.hot-news-wrapper a:visited {
  color: #771caa;
}
.hot-news-wrapper a:hover,
.hot-news-wrapper .hot-refresh-text:hover {
  color: #315efb;
}
.hot-news-wrapper a:active,
.hot-news-wrapper .hot-refresh-text:active {
  color: #f73131;
}
.hot-news-wrapper .hot-news-header {
  margin-bottom: 15px;
}

.hot-news-wrapper .hot-news-header .hot-news-title {
  font-size: 18px;
  font-weight: bold;
  float: left;
}
.hot-news-wrapper .hot-news-header .hot-refresh-text {
  float: right;
  color: #08f;
  cursor: pointer;
  margin-right: 15px;
}

.hot-news-wrapper .hot-news-list li {
  padding: 5px 0;
  font-size: 14px;
}

.hot-news-wrapper .hot-news-list a {
  margin: 0 10px;

  text-decoration: none;
}

.hot-news-wrapper .hot-news-list .news-title-index {
  color: #fff;
  background: #0bf;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
}
.hot-news-wrapper .hot-news-list .news-title-hot {
  background-color: #ff9812;
}
.hot-news-wrapper .hot-news-list .news-title-new {
  background-color: #ff455b;
}

.hot-news-wrapper .hot-news-list .news-title-hot,
.hot-news-wrapper .hot-news-list .news-title-new {
  color: #fff;
  padding: 0 2px;
  border-radius: 2px;
  text-align: center;
  vertical-align: middle;
}

.hot-news-wrapper .hot-news-list .news-count {
  float: right;
  margin-left: 10px;
}

.hot-news-wrapper .hot-news-list .news-count::after {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
}

/* 我才发现这个用不到啊,没传新旧数量,只穿了一个click_num */
.hot-news-wrapper .hot-news-list .news-count.up::after {
  background-image: url("../assets/images/up.png");
  background-position-y: 4px;
}

.hot-news-wrapper .hot-news-list .news-count.down::after {
  background-image: url("../assets/images/down.png");
  background-position-y: 2px;
}
</style>