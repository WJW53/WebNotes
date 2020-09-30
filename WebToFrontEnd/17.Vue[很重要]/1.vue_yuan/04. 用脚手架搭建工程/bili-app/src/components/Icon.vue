<template>
  <i class="iconfont" :class="[iconClass,extraClass]"></i>
</template>

<script>

var map = {
    arrowUp: "iconshangjiantou",
    arrowDown: "iconxiajiantou_huaban",
    search: "iconSearch",
}


export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    extraClass:{
      type: String,
      default:"",
    }
  },
  computed: {
    iconClass() {
        return map[this.type];
    },
  },
};
</script>

<style>
@import "//at.alicdn.com/t/font_2109914_2jzfvj1heb7.css";

</style>