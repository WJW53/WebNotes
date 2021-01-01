<template>
  <!-- 网页头部 -->

  <div class="se-base-home" @click="monitorDom">
    <!-- logo v-if 最初的页面，还没输入东西的时候，要显示这个logo1
                但总之要一直有下面那个search-box组件，但是下面那个组件的样式却又不一样了
                切换组件的时候 只是样式改变了而已还有位置，位置也能用样式改
            -->

    <!-- 搜索导航栏 -->
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
            <span class="iconfont img-se" @click="clkBtn('img')">&#xe63c;</span>
            <span class="iconfont file-se" @click="clkBtn('file')"
              >&#xe685;</span
            >
            <span class="iconfont qa-se" @click="jumpQa">&#xe601;</span>
            <input
              id="se-search-text"
              type="text"
              class="search-text"
              maxlength="100"
              v-model="inputVal"
              ref="getFocus"
              @keyup.enter="submitText"
              @input="search($event)"
              @focus="() => (inputFocus = true)"
              @blur="() => (inputFocus = false)"
            />
            <!-- onkeydown="if(event.keyCode==13){blur();this.submitText();}" -->

            <!-- 下面三个span文本一开始是隐藏着的 -->
            <span class="img-hover-tip">按图片搜索</span>
            <!-- 点击图片/文件对应的icon之后弹出一个框框，就是选择文件的 -->
            <span class="file-hover-tip">上传文件</span>
            <!-- 我要提问的话就用路由转新的页面 -->
            <span class="qa-hover-tip">我要提问</span>
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
        <div class="hide-upload-border" id="hiddenFileUpload">
          <div class="upload-wrap">
            <input
              class="upload-pic"
              type="file"
              name="file"
              id="fileId"
              value="上传图片"
            />
            <span
              class="upload-text"
              name="file-btn"
              id="btnId"
              @click="judgeType($event, fileType)"
            >
              选择文件
            </span>
          </div>
          <span class="close-wrap" @click="closeUploadBorder">X</span>
        </div>
        <!-- 搜索内容的实时预览功能 -->
        <ul
          class="search-preview-list"
          v-show="inputFocus && previewSearchList.length"
        >
          <li v-for="res in previewSearchList" :key="res">
            <span>{{ res }}</span>
          </li>
        </ul>

        <div v-if="!isSearchTip" class="search-enter-tip">
          请按“回车”键发起检索
        </div>
      </div>
    </div>

    <!-- 搜索结果主体内容 -->
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

    <!-- ??这个地方好像不需要通知父亲刷新啊 -->
    <!-- !hotListChanged &&  -->
    <hot-list
      v-if="hotNewsList && hotNewsList.length"
      :hotNewsList="hotNewsList"
    >
    </hot-list>

    <!-- 网页分页以及底部设计 -->
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
// import $ from "jquery";
import Pager from "./Pager";
import HotList from "./HotList";

// import BaseHome from "./BaseHome"

export default {
  name: "BaseHome2",
  data() {
    return {
      isSearchTip: false,
      inputVal: "",
      pageList: [],
      articleList: [],
      curPage: 1, //当前页
      totalPage: 0, //总共页数
      pageSize: 20, //每页记录数
      dataChanged: false, //Pager组件是否需要刷新
      inputFocus: false,
      previewSearchList: [], //实时预览
      previewSearchBlock: false,
      hotBlock: false, //热榜的锁,有了一次之后便不再请求了
      hotNewsList: [],
      hotListChanged: false,
      headerShadowBlock: false,
      oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
      fileType: "", //上传文件类型
    };
  },
  components: {
    // BaseHome,
    Pager,
    HotList,
  },
  watch: {
    previewSearchList() {
      if (
        this.inputFocus &&
        this.previewSearchList &&
        this.previewSearchList.length != 0
      ) {
        let seInpTxt = document.getElementById("se-search-text");
        seInpTxt.classList.add("show-dropdown");
        // this.previewSearchBlock = true;
      }
      if (
        // !this.previewSearchBlock &&
        !this.inputFocus ||
        (this.previewSearchList && this.previewSearchList.length == 0)
      ) {
        // console.log("失去焦点");
        let seInpTxt = document.getElementById("se-search-text");
        seInpTxt.classList.remove("show-dropdown");
      }
    },
    inputVal() {
      //实时联想搜索的请求
      // let _this = this;
      // console.log(this.inputVal);
      if (this.inputVal.length >= 1 && !this.previewSearchBlock) {
        //没锁时
        // console.log(this.previewSearchBlock);
        this.$http
          .jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su", {
            // .jsonp("https://www.baidu.com/sugrec", {
            params: {
              wd: this.inputVal,
              // cb: "this.searchPreviewRes",
            },
            jsonp: "cb",
          })
          .then((res) => {
            // console.log("success!");
            // console.log(res);
            // let _this = this;
            this.previewSearchList = res.body.s;
          });
      }
    },
    //滚动条Y滚动时改变搜索导航栏的样式
    scrollTop(newValue, oldValue) {
      // setTimeout(() => {//这留着做判断是否停止滚动,如果有需求需要这个玩意儿的话,可以玩玩
      //   if (newValue == window.scrollY) {
      //     //延时执行后当newValue等于window.scrollY，代表滚动结束
      //     console.log("滚动结束");
      //     this.oldScrollTop = newValue; //每次滚动结束后都要给oldScrollTop赋值
      //   }
      // }, 30); //必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
      // if (this.oldScrollTop == oldValue) {
      //   //每次滚动开始时oldScrollTop与oldValue相等
      //   console.log("滚动开始");
      // }
      let headerScrollY = document.getElementsByClassName(
        "home-search-header"
      )[0];
      if (this.scrollTop != 0 && this.headerShadowBlock == false) {
        headerScrollY.classList.add("se-header-scrollY");
        this.headerShadowBlock = true;
        this.searchInputBlur(); //这里也失焦一下,好看一些
      }
      if (this.headerShadowBlock == true && this.scrollTop == 0) {
        //又回到了上面
        headerScrollY.classList.remove("se-header-scrollY");
        this.headerShadowBlock = false;
      }
    },
  },
  methods: {
    judgeType(event, type) {
      if (type === "img") {
        this.imgUpload(event.target);
      } else if (type === "file") {
        this.fileUpload(event.target);
      } else if (type === "qa") {
        // console.log('');
      }
    },
    jumpQa() {},
    clkBtn(type) {
      // console.log(type);
      // console.log(event);
      this.searchInputBlur();
      this.previewSearchBlock = true; //上锁,不让它再可以预览显示了
      this.isSearchTip = false;
      // console.log(this.previewSearchBlock);
      let tempDom = document.getElementById("hiddenFileUpload");
      // tempDom.classList.add("showUnloadWrap");
      tempDom.style.display = "block";
      this.fileType = type;//传类型
    },
    closeUploadBorder() {
      document.getElementById("hiddenFileUpload").style.display = "none";
      this.previewSearchBlock = false; //解锁
      // this.isSearchTip = true;//这里不能有这一行,不然之后显示不出来tip
      //我在inputVal监听中已经修改了它为true,反正上面这行不能有!!
      // console.log(this.previewSearchBlock);
    },
    imgUpload(et) {
      console.log(et);
    },
    fileUpload(et) {
      console.log(et);
    },
    handleScroll() {
      //注册滚动条Y滚动事件
      window.addEventListener("scroll", () => {
        this.scrollTop = window.scrollY;
      });
    },
    monitorDom(e) {
      //若点击到了别处,就移除样式
      let seInpTxt = document.getElementById("se-search-text");
      e = e || window.event;
      let target = e.target || e.srcElement;

      if (this.inputFocus == false || target != seInpTxt) {
        seInpTxt.classList.remove("show-dropdown");
        this.previewSearchList.length = 0;
      }
    },
    searchInputBlur() {
      //搜索框失焦且移除样式
      let seInpTxt = document.getElementById("se-search-text");
      seInpTxt.blur();
      // console.log(this.inputFocus);
      this.previewSearchList.length = 0; //这里这个好像必须加上,不然有个小地方有小小bug
      seInpTxt.classList.remove("show-dropdown"); //再去掉
    },
    searchInputFocus() {
      //单纯的搜索框聚焦
      let seInpTxt = document.getElementById("se-search-text");
      seInpTxt.focus();
      // console.log(this.inputFocus);//它这里它暂时还不能直接添加那个样式
      //不管就行了 inputVal侦测变化的时候会添加样式的
    },
    search(event) {
      //暂时没用上
      // this.$refs.getFocus.focus();
      // console.log(this.inputVal);
      // console.log(event.currentTarget.value);
      // this.$bus.$emit("bh1",this.inputVal);
    },
    submitText() {
      //点击搜索或者敲回车后跨域请求数据、处理数据等
      this.searchInputBlur(); //提交过后就得先失焦

      //搜索文本的请求
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
            // console.log("submitText! success!");
            if (res.data.length != 0) {
              this.previewSearchList.length = 0;

              // 匹配关键字正则,高亮显示搜索关键字
              for (let item of res.data) {
                // 高亮替换v-html值

                for (let keyWord of item.key_word) {
                  let replaceReg = new RegExp(keyWord, "g");
                  let mainTextString =
                    '<em  style="color: #f73131;">' + keyWord + "</em>"; //可以在style中设置文字颜色
                  let titleString =
                    '<em style="color: #f73131;text-decoration: underline;">' +
                    keyWord +
                    "</em>";
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
            }
          })
          .catch((error) => {
            console.log("error!");
            console.log(error);
          });
      }

      // 热榜的请求
      if (this.hotBlock == false) {
        this.hotBlock = true;
        this.$axios.get("./hotData.json").then((res) => {
          this.hotNewsList = res.data;
          // console.log(this.hotNewsList);
        });
      }
    },
    refresh() {
      //对应Pager(功能齐全)组件分页
      //不能传个原始值,那样的话,外面的实参还是没有改变,只是在函数内部改变了而已a
      //用于刷新组件，需手动调用
      this.dataChanged = true;
      this.$nextTick(() => {
        this.dataChanged = false;
      });
    },
    gotoPage(page) {
      //跳转页面
      this.refresh(); //需要

      //拿笔算算
      let temp = 0;
      if (this.curPage == this.totalPage) {
        //如果是最后一页,要拿到准确的数据长度总共的数量
        temp = this.pageList.length;
      } else {
        temp = this.curPage * this.pageSize;
      }
      this.curPage = page; //更新页码

      //最后一页的时候要区分一下啊
      if (page == this.totalPage) {
        this.articleList = this.pageList.slice(page * this.pageSize);
        console.log(this.curPage); //pageSize==10时,410条数据,我直接跳到最后一页,打印21,这也执行了啊,但为啥就没刷直接新页面呢
        //必须得我在文本框里回车或者点击一下搜索才能显示,唯一bug
      } else {
        this.articleList = this.pageList.slice(
          (page - 1) * this.pageSize,
          page * this.pageSize
        );
      }
    },
    changeRowNum(pageSize) {
      //改变每页数据长度
      //以下代码顺序,不可改变!!!!
      //有个坑在于如果我在pageSize==100的时候往pageSize==10的地方跳如果当前在最后一页,那么现在temp相当于多出来了90页
      let temp = 0; //先保存原先的页码*每页长度
      if (this.curPage == this.totalPage) {
        //如果是最后一页,要拿到准确的数据长度总共的数量
        temp = this.pageList.length;
      } else {
        temp = this.curPage * this.pageSize;
      }

      this.totalPage = Math.ceil(this.pageList.length / pageSize); //新的总共的页数
      this.pageSize = pageSize; //更新每页数据长度
      this.curPage = Math.ceil(temp / this.pageSize); //更新当前页
      //然后就更新文章内容咯!!
      this.articleList = this.pageList.slice(
        (this.curPage - 1) * this.pageSize,
        this.curPage * this.pageSize
      );

      this.refresh(); //需要
    },
    curHotListChanged() {
      //热榜刷新,暂不需要,先放这里
      this.hotListChanged = true;
      this.$nextTick(() => {
        this.hotListChanged = false;
      });
    },
  },
  beforeCreate() {
    //监听器 $on 监听到自定义函数后，会马上执行监听器里的函数，然后再执行 $emit 自定义事件里面的动作
    // this.$on('start',function(arg){//注册自定义事件start
    // 	alert(arg)})
  },
  created() {
    // console.log(this.inputVal);

    this.$bus.$on("bh2", (param) => {
      // this.$parent.isInpSe = true;
      this.inputVal = param;
      // console.log("now this is bh2", this.inputVal);

      this.$nextTick(() => {
        //得把nextTick放在这个回调函数里才能再次聚焦,
        this.$refs.getFocus.focus();
      });
    });
  },
  mounted() {
    // this.$refs.getFocus.focus();//这里要写了那basehome1一开始就不能聚焦了
    //监听全局点击事件
    window.addEventListener("click", this.monitorDom);
    this.handleScroll(); //先执行,然后它会注册滚动事件
    // document上的visibilitychange这个事件监测不到alt tab这种切换
    // 而window上的onbeforeunload侦测的是关闭页面之前 也检测不到 alt tab
    // 那如何侦测。。使得我input搜索框...
    // 换个思路，我得知了有个window.onblur/focus()，可以侦测当前页面是否失焦
    // window.addEventListener("onblur", this.curWindowBlur);
    window.onblur = this.searchInputBlur;
    window.onfocus = this.searchInputFocus;
  },
  beforeDestroy() {
    this.$bus.$off("bh2");
    window.removeEventListener("click", this.clickOther);
    window.removeEventListener("handleScroll", this.handleScroll);
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
  /* width: 840px; */
  /* 100%是为了阴影,展示全屏宽度,不需要的话就换成840呗 */
  width: 100%;
  z-index: 9999;
  left: 0;
  top: 0;
  background-color: #fff;
  /* background-color: yellow; */
}

.se-base-home .se-header-scrollY {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
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

/* 文件选择框 */
.hide-upload-border {
  display: none;
  position: relative;
}

.search-box .upload-wrap {
  position: absolute;
  z-index: 101;
  margin-top: 15px;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 730px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  box-sizing: border-box;
}
.search-box .upload-wrap .upload-pic {
  position: absolute;
  font-size: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  outline: 0;
  opacity: 0;
  z-index: 1;
  /* background-color: red; */
}

.search-box .upload-wrap .upload-text {
  /* display: inline-block; */
  position: absolute;
  z-index: 102;
  font-size: 16px;
  background: #4e71f2;
  border-radius: 6px;
  height: 32px;
  line-height: 32px;
  width: 100px;
  cursor: pointer;
  top: 50%;
  margin-top: -16px;
  margin-left: -50px;
}

.search-box .hide-upload-border .close-wrap {
  position: absolute;
  display: block;
  right: 10px;
  top: 50px;
  z-index: 102;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  /* background-color: red; */
}

/*  */
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
.search .search-area .iconfont:hover {
  color: #315efb;
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
  border-color: #4e71f2;
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

/* search-preview-list */
.search .search-area .show-dropdown {
  border-radius: 10px 0 0 0 !important;
  border-bottom: transparent;
}

.search-box .search-preview-list {
  position: relative;
  background-color: #fff;
  padding: 10px 0 10px 10px;
  width: 618px;
  border: 2px solid #4e71f2;
  border-top: 2px solid #f5f5f6;
  /* box-shadow: 2px 2px 3px #ededed; */
  z-index: 100;
  border-radius: 0 0 10px 10px;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  padding-left: 8px;
  box-sizing: border-box;
}

.search-box .search-preview-list li {
  color: #626675;
  background: 0 0;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  cursor: pointer;
}

.search-box .search-preview-list li:hover {
  color: #4e71f2;
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

/* .search-result-list li em.keys-words {
  color: #f73131;
} */

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