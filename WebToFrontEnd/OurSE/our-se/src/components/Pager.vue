<template>
  <div class="pager-search-footer">
    <div class="pager">
      <a
        href="javascript:void(0);"
        v-show="showFirstPage"
        v-on:click="firstPage"
        >首页</a
      >
      <a href="javascript:void(0);" v-show="showPrevPage" v-on:click="prevPage"
        >上一页</a
      >

      <select v-model="rowNum">
        <option value="10">10</option>
        <option selected="selected" value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <span class="page-num">{{ curPage }}&nbsp;/&nbsp;{{ totalPage }}</span>
      <div class="goto">
        <input type="text" v-model="gotoPage" />
      </div>
      <a href="javascript:void(0);" v-on:click="gotoNextPage">跳转</a>
      <a href="javascript:void(0);" v-show="showNextPage" v-on:click="nextPage"
        >下一页</a
      >
      <a href="javascript:void(0);" v-show="showLastPage" v-on:click="lastPage"
        >尾页</a
      >
    </div>
    <div class="search-footer-foot">
      <span class="search-foot-help">
        <a href="http://help.baidu.com/question" target="blank">帮助</a>
        <a href="http://www.baidu.com/search/jubao.html" target="blank">举报</a>
        <a href="javascript:void(0);">用户反馈</a>
      </span>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.initPager();
    }); //需要延迟初始化
  },
  name: "Pager",
  props: ["pageSize", "curPage", "totalPage"],
  data() {
    return {
      gotoPage: "",
      showFirstPage: true,
      showLastPage: true,
      showPrevPage: true,
      showNextPage: true,
      rowNum: this.pageSize,
    };
  },
  methods: {
    nextPage() {
      //下一页
      this.$emit("setPage", this.curPage + 1); //调用父组件方法
    },
    prevPage() {
      //上一页
      this.$emit("setPage", this.curPage - 1); //调用父组件方法
    },
    gotoNextPage() {
      //跳转页面
      if (this.gotoPage && /[1-9][0-9]*/.test(this.gotoPage)) {
        let pg = parseInt(this.gotoPage);
        if (pg > 0 && pg <= this.totalPage) {
          //1-总共的页码
          this.$emit("setPage", pg); //调用父组件方法
        } else {
          this.gotoPage = "";
          alert("页码不在范围内，请重新输入数字！");
        }
      } else {
        if (this.gotoPage != "") {
          alert("您输入的跳转页面格式不合法！请重新输入数字！");
        }
        this.gotoPage = "";
      }
    },
    firstPage() {
      this.$emit("setPage", 1); //调用父组件方法
    },
    lastPage() {
      this.$emit("setPage", this.totalPage); //调用父组件方法
    },
    rowNumChanged() {
      //更改每页数据长度
      this.$emit("setRowNum", this.rowNum);
    },
    initPager() {
      this.showFirstPage = this.curPage > 1;
      this.showLastPage = this.curPage < this.totalPage;
      this.showPrevPage = this.curPage > 1;
      this.showNextPage = this.curPage < this.totalPage;
      this.gotoPage = "";
    },
  },
  watch: {
    rowNum: "rowNumChanged", //监控rowNum,它一改变立刻执行rowNumChanged函数
  },
};
</script>


<style scoped>
:root,body{
  height: 100%;
}
.pager-search-footer {
  background-color: rgba(214, 209, 209, 0.2) !important;
  height: 106px;
  box-sizing: border-box;
}
.pager {
  display: flex;
  justify-content: space-between;
  width: 618px;
  margin: 20px 0 0 110px;
  padding-top: 10px;
  height: 42px;
  line-height: 42px;
}

.pager a,
.pager select,
.pager div {
  display: block;
  border-radius: 6px;
  width: 64px;
  text-align: center;
}

.pager a {
  background-color: #fff;
}
/* 不能给它规定宽度,不然二位数/三位数都撑到下一行去了 */
.pager .page-num {
  font-weight: 600;
}

.pager-search-footer .pager input,
.pager-search-footer .pager select {
  outline: none;
  border: 2px solid #888;
  padding: 8px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
}
.pager select {
  margin-top: 2px;
}
.pager input {
  width: 64px;
  height: 40px;
}
.pager a {
  font-weight: bold;
  text-decoration: none;
  color: #3951b3;
}
.pager a:hover {
  background: #4e6ef2;
  color: #fff;
}

.pager-search-footer .search-footer-foot {
  margin: 20px 0px 0 110px;
  font-size: 12px;
}
.pager-search-footer .search-footer-foot .search-foot-help a {
  margin-right: 30px;
  color: #9195a3;
  text-decoration: none;
}
.pager-search-footer .search-footer-foot .search-foot-help a:hover {
  color: #222;
}
</style>