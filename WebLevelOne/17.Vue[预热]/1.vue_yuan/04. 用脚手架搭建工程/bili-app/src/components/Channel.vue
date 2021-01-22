<template>
  <div class="channel" v-if="data">
    <Item :isActive="isActive" @active="$emit('active')">
      <div class="inner">
        <span class="name">{{ data.name }}</span>
        <span class="number">{{ data.channel_count }}</span>
      </div>
    </Item>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: function () {
        //默认值是对象/数组时，则它必须作为函数的返回结果
        return {}; //保证了每个data都是不一样的
      },
    },
  },
  components: {
    Item,
  },
};
</script>

<style scoped>
.channel {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.inner {
  padding: 0 20px;
}
.name {
  font-size: 14px;
  color: #212121;
}
.number {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}
.name,.number {
  float: left;
}
</style>