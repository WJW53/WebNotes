<template>
  <div class="title-memu">
    <Item :isActive="isActive"  @active="$emit('active')">
      <div class="inner">
        <div class="left">
            <slot name="title"></slot>
        </div>
        <div class="right">
            <slot name="icon"></slot>
        </div>
      </div>
    </Item>
  </div>
</template>

<script>
import Item from "./Item";
export default {
    props: {
        isActive:{
            type: Boolean,
            default:false,
        }
    },
    components:{
        Item,
    },
};
</script>

<style scoped>
.title-memu {
  width: 100%;
  height: 46px;
  line-height: 46px;
}
.inner {
  padding: 0 20px;
}
.left {
  float: left;
  font-weight: 500;
  color: #212121;
}
.right {
  float: right;
  font-size: 12px;
  color: #999;
}
</style>