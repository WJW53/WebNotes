<template>
  <div class="img-waterfall-wrapper" id="waterfall-wrapper">
    <!-- <li class="col" v-for="imgItem in myImgList" :key="imgItem.id">
        <img :src="imgItem.url" :alt="imgItem.title" target="_blank" />
        <p>{{ imgItem.title }}</p>
      </li> -->
    <ul class="img-waterfall" id="waterfall">
      <li class="col"></li>
      <li class="col"></li>
      <li class="col"></li>
      <li class="col"></li>
      <li class="col"></li>
    </ul>
  </div>
</template>


<script>
// 这回写一波原生JS的。尼玛的，写着写着发现，后端数据不给好我是又当前端又当后端. C 后来发现有bug不能多次上传实时刷新于是换了个方法
// 因为后端没传宽高,还要用多张图片的预/懒加载,就是浏览器性能耗费增加了
export default {
  name: "water-fall",
  props: ["imgList"],
  data() {
    return {
      sources: {},
      images: {},
      imgNum: 0,
      count: 0,
      myImgList: [],
    };
  },
  watch: {
    // imgList: {
    //   handler(n, o) {
    //     this.myImgList = n;
    //     document.getElementById("waterfall") &&
    //       document.getElementById("waterfall").remove();
    //     this.loadImages();
    //   },
    //   deep: true,
    // },
    // (n) {
    //   if (n != this.myImgList) {
    //     // for (let i = 0; i < this.myImgList.length; i++) {
    //     //   console.log(i);
    //     //   document.getElementsByClassName("item")[i].style.display = "none";
    //     // }
    //     this.myImgList = n;
    //     // this.loadImages();
    //   }
    // },
  },
  methods: {
    loadImages() {
      //   let count = 0;//预加载没写完
      //   for (src in this.sources) {
      //     this.images[src] = new Image();
      //     this.images[src].onload = function () {//都加载完毕了
      //       if (++count >= this.imgNum) {
      //         // 开始执行关键代码
      //       }
      //     };
      //     this.images[src].src = this.sources[src];
      //   }
      let _this = this; //草拟大爷
      for (let i = 0; i < this.imgList.length; i++) {
        let item = this.imgList[i];
        let img = new Image();
        img.src = item.url;
        // if (img.complete) {//不知道咋写
        // }
        img.onload = function () {
          //   console.log(_this.count);
          _this.count++;
          item["height"] = img.height;
          item["width"] = img.width;
          if (_this.count >= _this.imgNum) {
            // console.log("YES!");
            // console.log(_this.myImgList);
            _this.myImgList = _this.imgList;
            _this.renderDom();
          }
        };
      }
    },
    renderDom() {
      // let ul = document.createElement("ul");
      // ul.id = "waterfall";
      // ul.className = "img-waterfall";
      // document.getElementById("waterfall-wrapper").appendChild(ul);
      // let li = document.createElement("li");
      // li.className = "col";
      // for (let i = 0; i < 5; i++) {
      //   ul.appendChild(li);
      // }

      let oLi = document.getElementsByClassName("col");
      let imgDomWidth = oLi[0].offsetWidth - 20 - 20;
      //   console.log(imgDomWidth);
      let _this = this;
      this.myImgList.forEach(function (item, index) {
        let itemDom = document.createElement("div");
        itemDom.className = "item";
        /**
         *  item.width           imgDomWidth
         * -------------    =  ----------------
         *  item.height           image.height
         */
        let oImg = new Image();
        oImg.height = (imgDomWidth * item.height) / item.width;
        oImg.src = item.url;
        // console.log(oImg.height, oImg.width);
        let oP = document.createElement("p");
        oP.innerText = item.title;
        itemDom.appendChild(oImg);
        itemDom.appendChild(oP);
        // 按顺序一行一行插入图片
        let minIndex = _this.getMinLi().minIndex;
        // console.log(itemDom);
        oLi[minIndex].appendChild(itemDom);
      });
    },
    getMinLi() {
      let oLi = document.getElementsByClassName("col");
      let minIndex = 0;
      let minHeight = oLi[0].offsetHeight; //li的高度,包括padding、border、水平滚动条
      for (let i = 0; i < oLi.length; i++) {
        if (oLi[i].offsetHeight < minHeight) {
          //找到并记录
          minHeight = oLi[i].offsetHeight;
          minIndex = i;
        }
      }
      return {
        minIndex: minIndex,
        minHeight: minHeight,
      };
    },
    scrollHandler(e) {
      let _this = this;
      if (_this.count >= _this.imgNum) {
        // console.log("=====", document.documentElement.scrollTop);
        // 获取滚动条滚动的距离
        let scrollTop = document.documentElement.scrollTop; //滚动的高度是document身上的
        let clientHeight = window.innerHeight;
        let minHeight = _this.getMinLi().minHeight;
        // console.log(minHeight, scrollTop, clientHeight);
        // console.log(window.innerHeight, this.document.documentElement.clientHeight);
        // console.log(window.pageYOffset, document.documentElement.scrollTop);
        if (minHeight + 120 < scrollTop + clientHeight) {
          //我这里加120是因为我那里有marginTop
          //   console.log(_this.myImgList.length);
          // _this.renderDom(); //直接再次添加渲染
        }
      }
    },
  },
  created() {
    this.imgNum = this.myImgList.length;
    // for (let item of this.myImgList) {
    //   this.sources[item.title] = item.url;
    // }
  },
  mounted() {
    //这尼玛少打个n,怎么也不给我报错啊？？！！
    this.loadImages();
    window.addEventListener("scroll", this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>


<style scoped>
body {
  background-color: #eee!;
}
.img-waterfall-wrapper {
  /* width: 1225px; */
  margin-top: 120px;
}
.img-waterfall {
  width: 1225px;
  margin: 0 auto;
}
.img-waterfall::after {
  content: "";
  display: block;
  clear: both;
}
.img-waterfall li {
  float: left;
  width: 20%;
}
.img-waterfall li .item {
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  overflow: hidden;
}
.img-waterfall li .item img {
  cursor: pointer;
  /* width: 100%; */
  transition: all 0.6s ease;
}
img:hover {
  transform: scale(1.4);
}
</style>