<template>
  <div class="search-news-result" v-if="articleList && articleList.length != 0">
    <!-- 网页内容最上面的部分 -->
    <div class="search-head-nums">
      <span v-if="type === ''" class="head-nums-text"
        >闻海为您找到相关结果约{{ pageList.length }}个</span
      >
      <span v-else-if="type === 'file'" class="head-nums-text top10"
        >闻海已为您搜索到与您文档相似度Top10的文章</span
      >
      <span v-if="type != 'file'" class="iconfont search-tool">&#xe677;</span>
      <span v-if="type != 'file'" class="search-tool-text">搜索工具</span>
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
            target="_blank"
            v-html="article.title"
          >
            {{ article.title }}
          </a>
        </h3>
        <span v-if="article.label" class="article-label">{{
          article.label
        }}</span>
        <div class="article-main-text" v-html="article.main_text">
          {{ article.main_text }}
        </div>
      </li>
    </ul>

    <div v-if="fileString != ''" class="local-text">
      <span class="local-tip">以下是您的文件内容：</span>
      <textarea
        class="local-text-content"
        v-model="textString"
        readonly
      ></textarea>
    </div>
  </div>
</template>


<script>
import $ from "jquery";

export default {
  name: "TextTop10",
  props: ["articleList", "pageList", "type", "fileString"],
  data() {
    return {
      textString: "",
    };
  },
  watch: {
    fileString(newVal) {
      this.textString = newVal;
    },
  },
  created() {
    this.textString = this.fileString;
  },
  methods: {},
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 1000); //??我是想让它每次回到最上面,这样好像不能直接生效
    // document.getElementsByTagName("body")[0].scrollTop = 0;
  },
};
</script>



<style scoped>
/* search-result-articles */
.search-news-result .search-head-nums {
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  margin: 80px 0 0 100px;
  color: #ccc;
  width: 618px;
}
.search-news-result .top10 {
  display: block;
  font-size: 16px;
  color: #fff;
  background-color: skyblue;
  text-align: center;
  width: 618px;
  border-radius: 6px;
}
.search-news-result .search-head-nums .head-nums-text {
  display: inline-block;
  width: 500px;
}
.search-news-result .search-head-nums .search-tool {
  color: #333;
  width: 14px;
  height: 14px;
  margin-right: 10px;
  display: inline-block;
  padding-left: 40px;
}
.search-news-result .search-head-nums .search-tool-text {
  color: #666;
  display: inline-block;
}
.search-result-list {
  margin-top: 10px;
  margin-left: 100px;
  width: 620px;
}
.search-result-list .t {
  margin-bottom: 4px;
  width: 486px;
  white-space: nowrap; /*取消换行*/
  overflow: hidden; /*溢出不显示*/
  text-overflow: ellipsis; /*溢出部分展示形式：点点点*/
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
.search-result-list .article-label {
  float: right;
  background-color: yellow;
  border-radius: 6px;
  right: 0;
  font-size: 14px;
  font-weight: 400;
  color: #f73131;
  margin-top: -20px;
  margin-right: 10px;
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

.search-news-result .local-text {
  width: 500px;
  height: 500px;
  position: fixed;
  z-index: 2;
  top: 50%;
  margin-top: -250px;
  right: 200px;
  background-color: yellow;
}
.search-news-result .local-text textarea {
  width: 100%;
  height: 100%;
  /* background-color: red; */
  min-height: 30px;
  color: #333;
  word-break: break-all;
  border: 2px solid pink;
  font-size: 23px;
  /* WC,这个resize精髓啊,那个边框被干掉了,而且用户不能拉框了 */
  resize: none;
  outline: none;
}

.search-news-result .local-text .local-tip {
  font-size: 24px;
  display: block;
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: skyblue;
  position: absolute;
  top: -35px;
}
</style>