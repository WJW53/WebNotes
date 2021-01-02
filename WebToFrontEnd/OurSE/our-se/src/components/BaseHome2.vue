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
            <span class="iconfont qa-se" @click="clkBtn('qa')">&#xe601;</span>
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
              value="上传文件"
            />
            <span
              class="upload-text"
              name="file-btn"
              @click="judgeType($event, fileType)"
            >
              点击空白选择文件点击此处提交文件
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

        <div v-show="!isSearchTip" class="search-enter-tip">
          请按“回车”键发起检索
        </div>
      </div>
    </div>

    <!-- 没搜索到的提示 -->
    <div class="error-tip" id="search-article-error-tip" v-if="searchErrorTip">
      很抱歉，没有为您找到搜索结果！
    </div>

    <!-- 问答区域 -->
    <question v-if="showQuestion"> </question>

    <!-- 图片搜索区域  -->
    <image-water-full
      v-if="showImage && imgList && imgList.length != 0"
      :imgList="imgList"
    >
    </image-water-full>

    <!-- 上传文件和文本框搜索的结果区域 -->
    <content-article
      v-if="showNewsPage && !searchErrorTip && !showTextTop && !showQuestion"
      :articleList="articleList"
      :pageList="pageList"
    >
    </content-article>
    <content-article
      v-else-if="!searchErrorTip && showTextTop && !showQuestion"
      :articleList="articleList"
      :pageList="pageList"
    ></content-article>

    <!-- 百度热榜区域 -->
    <!-- ??这个地方好像不需要通知父亲刷新啊 -->
    <!-- !hotListChanged &&  -->
    <hot-list
      v-if="hotNewsList && hotNewsList.length"
      :hotNewsList="hotNewsList"
    >
    </hot-list>

    <!-- 网页分页以及底部设计 -->
    <pager
      v-if="
        !dataChanged && articleList && articleList.length != 0 && !showQuestion
      "
      ref="pager"
      :class="{ 'pager-bottom': isBottom }"
      :pageSize="pageSize"
      :curPage="curPage"
      :totalPage="totalPage"
      @setPage="gotoPage"
      @setRowNum="changeRowNum"
    />
  </div>
</template>



<script>
import $ from "jquery";
import Pager from "./Pager";
import HotList from "./HotList";
import TextTop10 from "./ContentArticle";
import ContentArticle from "./ContentArticle.vue";
import Question from "./Question";
import ImageWaterFull from "./ImageWaterFull";

// import BaseHome from "./BaseHome"

export default {
  name: "BaseHome2",
  data() {
    return {
      isSearchTip: false,
      inputVal: "",
      pageList: [],
      articleList: [],
      imgList: [],
      isBottom: false,
      curPage: 1, //当前页
      totalPage: 0, //总共页数
      pageSize: 20, //每页记录数
      searchArticleBlock: false,
      dataChanged: false, //Pager组件是否需要刷新
      inputFocus: false,
      previewSearchList: [], //实时预览
      previewSearchBlock: false,
      hotBlock: false, //热榜的锁,有了一次之后便不再请求了
      hotNewsList: [],
      hotListChanged: false,
      headerShadowBlock: false,
      imgBlock: false,
      oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
      scrollTop: 0, // 记录当前的滚动距离
      fileType: "", //上传文件类型
      showTextTop: false,
      showQuestion: false,
      showImage: false,
      showNewsPage: false,
      searchErrorTip: false,
    };
  },
  components: {
    // BaseHome,
    Pager,
    HotList,
    ContentArticle,
    Question,
    ImageWaterFull,
  },
  watch: {
    curPage() {
      if (this.curPage == this.totalPage && this.articleList.length < 9) {
        this.isBottom = true;
      } else {
        this.isBottom = false;
      }
    },
    previewSearchList() {
      if (
        this.inputFocus &&
        this.previewSearchList &&
        this.previewSearchList.length != 0
      ) {
        let seInpTxt = document.getElementById("se-search-text");
        seInpTxt.classList.add("show-dropdown");
      }
      if (
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
      // document.getElementById("search-article-error-tip").style.display =
      //   "none";
      this.searchErrorTip = false;
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
        this.imgUpload();
      } else if (type === "file") {
        this.fileUpload();
      }
    },
    jumpQa() {
      // console.log("qa-qa");
      this.inputVal = "";
      this.showQuestion = true; //展示问答区域
      this.$router.push({ path: "/question" });
      this.hotNewsList.length = 0; //热榜清空
      this.closeUploadBorder(); //关闭文件上传框
    },
    clkBtn(type) {
      // console.log(type);
      // console.log(event);
      this.fileType = type; //传类型
      this.searchInputBlur();
      if (type != "qa") {
        this.previewSearchBlock = true; //上锁,不让它再可以预览显示了
        this.isSearchTip = true; //设为true,那里的!true才能是false,也就是不显示
        // console.log(this.previewSearchBlock);
        let tempDom = document.getElementById("hiddenFileUpload");
        // tempDom.classList.add("showUnloadWrap");
        tempDom.style.display = "block";
      } else {
        this.jumpQa();
      }
    },
    closeUploadBorder() {
      document.getElementById("hiddenFileUpload").style.display = "none";
      this.previewSearchBlock = false; //解锁
      // console.log(this.previewSearchBlock);
    },
    searchNoResTips() {
      // document.getElementById("search-article-error-tip").style.display =
      //   "block";
      this.articleList.length = 0;
      this.searchErrorTip = true;
    },
    afterImgUpload() {
      // document.getElementById("search-article-error-tip").style.display =
      //   "none";
      console.log("afterImgUpload");
      this.searchErrorTip = false;
      this.imgBlock = false; //不论成功失败都要解锁啊
      this.showTextTop = false;
      this.showQuestion = false;
      this.showNewsPage = false;
      this.hotNewsList.length = 0;
      this.articleList.length = 0;
      this.pageList.length = 0;
      this.closeUploadBorder();
    },
    imgUpload() {
      // console.log("img");
      //1. 获取到上传的文件
      this.showImage = true;
      this.closeUploadBorder();
      let objFile = document.getElementById("fileId");
      let file = objFile.files[0];
      // console.log(file);
      let name = file.name.replace(".jpg", "");
      name = name.replace(".png", "");
      name = name.replace(".jpeg", "");
      // //2. 创建form对象,将文件内容添加到form对象中
      let param = new FormData(); // 创建form对象
      param.append("file", file, file.name); // 通过append向form对象添加数据
      // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      if (!this.imgBlock) {
        //没上锁的时候
        this.imgBlock = true; //加锁 哥在请求呢
        this.$axios
          .post("up_photo", param)
          .then((response) => {
            this.$router.push({ path: "/image" });
            this.imgList = response.data.photos;
            for (let i = 0; i < this.imgList.length; i++) {
              this.imgList[i].title = name + (i + 1);
            }
            // console.log(this.imgList); //这个才是要用的数据对象

            this.afterImgUpload();
          })
          .catch((error) => {
            console.log(error);
            this.afterImgUpload();
          });
      }
    },

    fileUpload() {
      this.showQuestion = false;
      this.showImage = false;
      this.showNewsPage = false;
      let objFile = document.getElementById("fileId");
      let _this = this; //注意!!先把this保存起来!!
      if (!objFile.files[0]) {
        alert("请您先选择文件");
      } else if (objFile.files[0].size == 0) {
        // 文件字节数,不为零说明就不为空啊
        alert("请您上传一个有内容的文件");
      } else {
        // let files = $("#fileId").prop("files"); //获取到文件列表
        let files = objFile.files;
        if (files.length == 0) {
          alert("请选择文件");
        } else {
          //选完文件之后可以none掉
          let reader = new FileReader(); //新建一个FileReader
          reader.readAsText(files[0], "UTF-8"); //以文字读取文件
          reader.onload = function (evt) {
            //读取完文件之后会回来这里
            let fileString = evt.target.result; // 读取文件内容
            // console.log(fileString);
            _this.$axios
              .post("up_text", {
                text: fileString,
              })
              .then((res) => {
                // console.log(res.data); //它没有关键词高亮显示
                //先关闭选择框
                if (res.data.length != 0) {
                  // document.getElementById("search-article-error-tip").style.display =
                  //   "none";
                  _this.searchErrorTip = false; //必要的
                  _this.inputVal = "";
                  _this.closeUploadBorder();
                  _this.$router.push({ path: "/pagetop" });
                  _this.showTextTop = true;
                  _this.isSearchTip = true; //别搞混了 这里得设为true
                  _this.pageSize = 10; //因为只有top10
                  _this.curPage = 1; //归1
                  _this.configPage(res);
                }
              })
              .catch((error) => {
                // document.getElementById("search-article-error-tip").style.display =
                //   "none";
                // this.searchErrorTip = true;
                // _this.articleList.length = 0; //必要的
                _this.searchNoResTips();
                _this.closeUploadBorder();
                // console.log("error!");
                // console.log(error);
              });
          };
        }
      }
      // this.$axios
      //   .get("./txtData.json", {
      //     params: {},
      //   })
      //   .then((res) => {
      //     // console.log(res.data); //它没有关键词高亮显示
      //     if (res.data.length != 0) {
      //       this.$router.push({ path: "/pagetop" });
      //       this.showTextTop = true;
      //       this.isSearchTip = true; //别搞混了 这里得设为true
      //       this.pageSize = 10; //因为只有top10
      //       this.curPage = 1; //归1
      //       this.configPage(res);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("error!");
      //     console.log(error);
      //   });
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
    highLighted(res) {
      //关键词高亮显示
      // 匹配关键字正则,高亮显示搜索关键字
      for (let item of res.data) {
        // 高亮替换v-html值
        // for(let i = 0;i<res.data.length;i++){
        //   let item = res.data[i];
        for (let keyWord of item.key_word) {
          let replaceReg = new RegExp(keyWord, "g");
          let mainTextString =
            '<em  style="color: #f73131;">' + keyWord + "</em>"; //可以在style中设置文字颜色
          let titleString =
            '<em style="color: #f73131;text-decoration: underline;">' +
            keyWord +
            "</em>";
          // 开始替换,在item.main_text中将replaceReg匹配到的字符,替换为mainTextSting
          item.main_text = item.main_text.replace(replaceReg, mainTextString);

          item.title = item.title.replace(replaceReg, titleString);
        }
      }
    },
    configPage(res) {
      this.refresh();
      this.pageList = res.data;
      this.totalPage = Math.ceil(this.pageList.length / this.pageSize);
      this.articleList = this.pageList.slice(
        (this.curPage - 1) * this.pageSize,
        this.curPage * this.pageSize
      );
    },
    submitText() {
      if (!this.searchArticleBlock) {
        //没锁
        this.searchArticleBlock = true; //上锁
        //点击搜索或者敲回车后跨域请求数据、处理数据等
        this.showNewsPage = true;
        this.showImage = false;
        this.searchInputBlur(); //提交过后就得先失焦
        this.showQuestion = false; //关掉这些东西
        this.closeUploadBorder();
        //搜索文本的请求
        if (this.inputVal) {
          this.isSearchTip = true;

          this.$axios
            .get("search", {
              // .get("http://29s13l8324.wicp.vip/search", {
              // .get("./wordData.json", {
              params: {
                // "wd": "英国首相",
                wd: this.inputVal,
              },
            })
            .then((res) => {
              this.searchArticleBlock = false;
              // console.log("submitText! success!");
              // 热榜的请求,肯定要先有文章过来再有热榜啊,这样才不突兀
              this.searchErrorTip = false; //消失
              if (this.hotBlock == false) {
                this.hotBlock = true;
                // this.$axios.get("./hotData.json").then((res) => {
                this.$axios.get("get_hot").then((res) => {
                  this.hotNewsList = res.data;
                  // console.log(this.hotNewsList);
                });
              }

              //数据处理
              this.showTextTop = false;
              if (res.data.length != 0) {
                this.$router.push({ path: "/page" });
                this.previewSearchList.length = 0;
                this.highLighted(res); //关键词高亮显示
                this.configPage(res); //配置分页的相关东西
                // console.log(this.articleList[0]);
                // console.log(this.articleList[0].main_text);
              }
            })
            .catch((error) => {
              //没找到的话 我做提示
              this.searchArticleBlock = false;
              this.searchNoResTips();
              if (error.response) {
                console.log("The status is not the range of 2xx");
              } else if (error.request) {
                //错误情况二：请求没有收到响应, 再浏览器环境下`error.request`是XMLHttpRequest实例
                console.log(error.request);
              } else {
                //Something happened in setting up the request and triggered an Error
                console.log("Error", error.message);
              }
            });
        }
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
        //如果当前就是最后一页,要拿到准确的数据长度总共的数量
        temp = this.pageList.length;
      } else {
        temp = this.curPage * this.pageSize;
      }
      this.curPage = page; //更新页码

      //最后一页的时候要区分一下啊
      if (page == this.totalPage) {
        //仔细看啊 ,害的我找了1天, 这里这个page-1,给忘了,我说怎么没有瞬间跳转呢
        this.articleList = this.pageList.slice((page - 1) * this.pageSize);
        // console.log(this.curPage);
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
:root,
body {
  height: 100%;
}
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
.se-base-home .error-tip {
  width: 730px;
  margin-top: 150px;
  margin-left: 100px;
  font-size: 16px;
  color: #666;
  /* display: none; */
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
  /* height: 64px */
  height: 48px;
  line-height: 24px;
  width: 140px;
  cursor: pointer;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
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
.pager-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}

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