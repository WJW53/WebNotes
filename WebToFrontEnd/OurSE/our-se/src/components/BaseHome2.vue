<template>
  <!-- 网页头部 -->

  <div class="se-base-home">
    <!-- <slot ></slot> -->
    <!-- logo v-if 最初的页面，还没输入东西的时候，要显示这个logo1
                但总之要一直有下面那个search-box组件，但是下面那个组件的样式却又不一样了
                切换组件的时候 只是样式改变了而已还有位置，位置也能用样式改
            -->
    <!-- <slot> </slot> -->
    <div class="home-search-header">
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
            <span class="iconfont img-se">&#xe63c;</span>
            <span class="iconfont file-se">&#xe685;</span>
            <span class="iconfont qa-se">&#xe601;</span>
            <input
              type="text"
              class="search-text"
              maxlength="100"
              v-model="inputVal"
              ref="getFocus"
              @keyup.enter="submitText"
              @input="search($event)"
            />

            <!-- 下面三个span文本一开始是隐藏着的 -->
            <span class="img-hover-tip" style="display: none">按图片搜索</span>
            <!-- 点击图片/文件对应的icon之后弹出一个框框，就是选择文件的 -->
            <span class="file-hover-tip" style="display: none">上传文件</span>
            <!-- 我要提问的话就用路由转新的页面 -->
            <span class="qa-hover-tip" style="display: none">我要提问</span>
          </span>
          <span class="submit-box">
            <!-- 点击提交之后,就请求拿到数据,然后动态实时渲染页面. 
                            这也是路由换新的页面哦 -->
            <input
              @click="submitText"
              type="submit"
              value="闻海搜索"
              class="se-btn-sub"
            />
          </span>
        </div>

        <div v-if="!isSearchTip" class="search-enter-tip">
          请按“回车”键发起检索
        </div>
      </div>
    </div>

    <div
      class="search-news-result"
      v-if="articleList && articleList.length != 0"
    >
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
          <!-- <template v-if="index < pageSize"> -->
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
          <!-- </template> -->
        </li>
        <!-- </template> -->
      </ul>
    </div>

    <!-- 网页底部，分页部分等 -->
    <!-- <div class="search-footer" v-if="articleList && articleList.length != 0">
      <ul class="search-footer-page">
        <li class="first-page other-page"><span>&lt;&lt;第一页</span></li>
        <li class="prev-page other-page"><span>&lt;上一页</span></li>
        <li
          v-for="(article, index) in articleList"
          :key="article.title"
          class="index-page"
        >
          <span>{{ Math.ceil(index / 10) }}</span>
        </li>
        <li class="next-page other-page"><span>下一页&gt;</span></li>
        <li class="end-page other-page"><span>最后一页&gt;&gt;</span></li>
      </ul>
      <div class="search-footer-foot">
        <span class="search-foot-help">
          <a href="http://help.baidu.com/question" target="blank">帮助</a>
          <a href="http://www.baidu.com/search/jubao.html" target="blank"
            >举报</a
          >
          <a href="javascript:void(0);">用户反馈</a>
        </span>
      </div>
    </div> -->

    <pager
      v-if="!dataChanged && articleList && articleList.length != 0"
      ref="pager"
      :pageSize="pageSize"
      :curPage="curPage"
      :totalPage="totalPage"
      @setPage="gotoPage"
      @setRowNum="changeRowNum"
    />
  </div>
</template>



<script>
import Page from "../views/Page.vue";
// <template>

//     <base-home><slot> </slot></base-home>
// </template>

// import BaseHome from "./BaseHome"
import Pager from "./Pager";
export default {
  name: "BaseHome2",
  data() {
    return {
      isSearchTip: false,
      inputVal: "",
      articleList: [],
      curPage: 1, //当前页
      totalPage: 0, //总共页数
      pageSize: 20, //每页记录数
      dataChanged: false,
      pageList: [],
    };
  },
  components: {
    // BaseHome,
    Pager,
  },
  methods: {
    search(event) {
      // this.$refs.getFocus.focus();
      // console.log(this.inputVal);
      // console.log(event.currentTarget.value);
      // this.$bus.$emit("bh1",this.inputVal);
    },
    submitText() {
      if (this.inputVal) {
        this.isSearchTip = true;
        this.$axios
          // .get("search", {
          //http://29s13l8324.wicp.vip/search?wd=%E4%B8%AD%E5%9B%BD
          .get("./wordData.json", {
            params: {
              // "wd": "英国首相",
              // wd: this.inputVal,
            },
          })
          .then((res) => {
            console.log("success!");

            // 匹配关键字正则,高亮显示搜索关键字
            for (let item of res.data) {
              // 高亮替换v-html值

              for (let keyWord of item.key_word) {
                let replaceReg = new RegExp(keyWord, "g");
                let mainTextString =
                  '<em  style="color: #f73131;">' + keyWord + "</em>"; //可以在style中设置文字颜色
                let titleString =
                  '<em style="color: #f73131;">' + keyWord + "</em>";
                // 开始替换,在item.main_text中将replaceReg匹配到的字符,替换为mainTextSting
                item.main_text = item.main_text.replace(
                  replaceReg,
                  mainTextString
                );

                item.title = item.title.replace(replaceReg, titleString);

              }
            }

            this.pageList = res.data;
            this.totalPage = Math.ceil(this.pageList.length / this.pageSize);
            this.articleList = this.pageList.slice(
              (this.curPage - 1) * this.pageSize,
              this.curPage * this.pageSize
            );
            // console.log(this.articleList[0]);
            // console.log(this.articleList[0].main_text);
          })
          .catch((error) => {
            console.log("error!");
            console.log(error);
          });
      }
    },

    refresh() {
      //用于刷新组件，需手动调用
      this.dataChanged = true;
      this.$nextTick(() => {
        this.dataChanged = false;
      });
    },
    gotoPage(page) {
      //拿笔算算
      this.refresh();
      let temp = this.curPage * this.pageSize; //保存一下
      this.curPage = page; //更新页码
      // this = Math.ceil(temp / (this.pageSize*));
      this.articleList = this.pageList.slice(
        (page - 1) * this.pageSize,
        page * this.pageSize
      );
    },
    changeRowNum(pageSize) {
      //先改变的这个
      this.refresh();
      let temp = this.curPage * this.pageSize; //保存一下
      this.pageSize = pageSize; //更新每页数据长度
      this.curPage = Math.ceil(temp / this.pageSize); //更新当前页
      this.totalPage = Math.ceil(this.pageList.length / this.pageSize);
    },
  },
  created() {
    // console.log(this.inputVal);

    this.$bus.$on("bh2", (param) => {
      // this.$parent.isInpSe = true;
      this.inputVal = param;
      // console.log("now this is bh2", this.inputVal);

      this.$nextTick(() => {
        //这里把nextTick放在这个回调函数里才能再次聚焦,
        this.$refs.getFocus.focus();
      });
    });
  },
  mounted() {
    // this.$refs.getFocus.focus();//这里要写了那basehome1一开始就不能聚焦了
  },
  beforeDestroy() {
    this.$bus.$off("bh2");
  },
};
</script>


<style scoped>
/* html,body{
    height: 100%;
} */
/* .se-base-home{
  display: none;
} */
.home-search-header {
  position: fixed;
  height: 70px;
  width: 840px;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: #fff;
  /* background-color: yellow; */
  /* display: flex; 
   justify-content: center;
  align-items: center; */
}

/* logo */
.search-logo {
  position: absolute;
  top: 50%;
  left: 0;
  text-align: center;
  /* background-color: blue; */
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  margin-top: -24px;
  margin-left: 10px;
}
.search-logo img {
  width: 32px;
  height: 32px;
  padding: 8px 5px 0 5px;
}
.search-logo .logo-title {
  font-size: 20px;
  color: red;
  vertical-align: top;
  font-weight: 600;
}

/* search-box */
.search-box {
  position: absolute;
  width: 730px;
  left: 100px;
  /* background-color: red; */
  height: 48px;
  top: 50%;
  margin-top: -24px;
}

.search {
  position: relative;
  font-size: 16px;
}
.search .search-area {
  position: relative;
}
.search .search-area .search-text {
  height: 36px;
  padding: 4px 10px;
  border: 2px solid #c4c7ce;
  border-radius: 10px 0 0 10px;
  width: 484px;
  font-size: 18px;
  padding-right: 120px;
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
  /* background-color: green; */
  /* right: 2px; */
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
}
.search-enter-tip {
  position: absolute;
  margin-top: 50px;
  font-size: 13px;
  color: #666;
}

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
  cursor: pointer;
}
.search-news-result .search-head-nums .search-tool-text {
  color: #666;
  cursor: pointer;
}
.search-result-list {
  margin-top: 10px;
  margin-left: 110px;
  width: 620px;
}

.search-result-list li em.keys-words {
  color: #f73131;
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

/* 页脚 */

.search-footer {
  height: 100px;
  background-color: rgba(214, 209, 209, 0.2);
  font-family: arial;
}
.search-footer .search-footer-page {
  /* position: relative; */
  display: flex;
  width: 860px;
  bottom: 0;
  height: 64px;
  overflow: hidden;
  margin-left: 100px;
  /* justify-content: center; */
  align-items: center;
}
.search-footer .search-footer-page li {
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  border-radius: 6px;
  background-color: #fff;
  color: #3951b3;
  text-align: center;
  margin-right: 12px;
}
.search-footer .search-footer-page li span {
  display: block;
}
.search-footer .search-footer-page .other-page span {
  width: 80px;
}
.search-footer .search-footer-page .index-page span {
  width: 34px;
}
.search-footer .search-footer-page li:hover {
  background: #4e6ef2;
  color: #fff;
}

/*
.search-footer-foot {
  margin-top: 10px;
  font-size: 12px;
  margin-left: 100px;
}
.search-footer-foot .search-foot-help a {
  margin-right: 30px;
  color: #9195a3;
  text-decoration: none;
}
.search-footer-foot .search-foot-help a:hover {
  color: #222;
} */
</style>