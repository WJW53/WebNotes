<template>
  <div id="app">
    <!-- <base-home1 v-if="!isInpSe"></base-home1>
    <base-home2 v-else></base-home2> -->

    <!-- //如果直接在父组件v-if v-else的话,那就无法进行这个$bus通信了,
    //因为必然有个组件不在DOM里, 连vue实例的生命周期还没开始呢,所以无法使用eventBus事件总线通信,所以我一开始只能设置
    //组件2的style  display:none 或者 opacity:0
     -->


    <base-home1 :style="style1"></base-home1>
    <base-home2 :style="style2"></base-home2>


    <!-- <Pager
      v-if="!dataChanged"
      ref="pager"
      :pageSize="pageSize"
      :page="curPage"
      :total="total"
      @setPage="gotoPage"
      @setRowNum="changeRowNum"
    /> -->

    <!-- <transition>
      <router-view>

      </router-view>
    </transition> -->
  </div>
</template>

<script>

import BaseHome1 from "./components/BaseHome1";
import BaseHome2 from "./components/BaseHome2";

// import Pager from "@/components/Pager";

export default {
  name: "App",
  components: {
    BaseHome1,
    BaseHome2,
  },
  data() {
    return {
      style1:{
        display: "block",
      },
      style2:{
        opacity: 0,
      },
      isInpSe: false,
      dataChanged: false,
    };
  },

  methods: {
    refresh() {
      //用于刷新组件，需手动调用
      this.dataChanged = true;
      this.$nextTick(() => {
        this.dataChanged = false;
      });
    },
    styleChange(){
      this.style1.display = "none";
      this.style2.opacity = 1;
    },
    
  },

  created() {},
  watch:{
    isInpSe: 'styleChange'
  }
};
</script>

<style scoped>
/* #app {
  
} */
</style>
