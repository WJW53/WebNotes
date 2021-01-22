<template>
<!-- :是bind的简写,后面是表达式,按js解析    如果:class里的属性值为true,意思是含有这个属性 -->

  <div class="item" :class="{ active: isActive }" @click="handleClick">
    <!-- 插槽slot,类似于数据传递 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
      isActive: {
          type: Boolean,//约束该属性的类型是boolean
        //   required: true,//约束该属性必须要传递. 属性名必须是required,不能变化,否则无效
          default: false,//可以不传递,不传递的话默认是false
      }
  },
  methods:{
    handleClick(){
      //我知道发生了一件重要的事，但我不知道该做什么，此时，应该通知父组件
      this.$emit("active");//告诉父组件要干active这件事儿了
    }
  }
};
</script>

// scope保证了组件的样式不同,它会自动生成一个自定义属性,解决样式冲突的问题
<style scoped>
.active {
  background-color: #e7e7e7;
}
.item {
  cursor: pointer;
  /* 父组件告诉我宽高怎样,那就怎样呗 */
  width: 100%;
  height: 100%;
  transition: 1s;
}
.item:hover {
  background-color: #f4f4f4;
}
</style>