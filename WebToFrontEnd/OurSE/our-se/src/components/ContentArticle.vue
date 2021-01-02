<template>
  <div class="search-news-result" v-if="articleList && articleList.length != 0">
    <!-- 网页内容最上面的部分 -->
    <div class="search-head-nums">
      <span class="head-nums-text"
        >闻海为您找到相关结果约{{ pageList.length }}个</span
      >
      <span class="iconfont search-tool">&#xe677;</span>
      <span class="search-tool-text">搜索工具</span>
    </div>

    <!-- 网页文章内容 -->
    <ul class="search-result-list">
      <!-- <template v-if"> -->
      <li
        class="search-list-article"
        v-for="article in articleList"
        :key="article.id"
      >
        <h3 class="t">
          <a
            :href="article.url"
            class="search-result-article"
            target="blank"
            v-html="article.title"
          >
            {{ article.title }}
          </a>
        </h3>
        <div class="article-main-text" v-html="article.main_text">
          {{ article.main_text }}
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import $ from "jquery";

export default {
  name: "TextTop10",
  props: ["articleList","pageList"],
  data() {
    return {};
  },
  created() {},
  methods:{
    },
  mounted(){
    $('html,body').animate({scrollTop:0},1000)//??我是想让它每次回到最上面,这样好像不能直接生效
    // document.getElementsByTagName("body")[0].scrollTop = 0;
  }
};
</script>



<style scoped>
/* search-result-articles */
.search-news-result .search-head-nums {
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  margin: 80px 0 0 110px;
  color: #ccc;
}
.search-news-result .search-head-nums .head-nums-text {
  margin-right: 340px;
}
.search-news-result .search-head-nums .search-tool {
  color: #333;
  width: 14px;
  height: 14px;
  margin-right: 10px;
}
.search-news-result .search-head-nums .search-tool-text {
  color: #666;
}
.search-result-list {
  margin-top: 10px;
  margin-left: 110px;
  width: 620px;
}
.search-result-list .t {
  margin-bottom: 4px;
}

.search-result-list .t a {
  text-decoration: underline;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: #2440b3;
}

.search-result-list .search-list-article {
  margin-bottom: 20px;
}

.search-result-list .t a:visited {
  color: #771caa;
}
.search-result-list .t a:hover {
  color: #315efb;
}
.search-result-list .t a:active {
  color: #f73131;
  text-decoration: none;
}
.search-result-list .article-main-text {
  color: #333;
  font-size: 13px;
  line-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>