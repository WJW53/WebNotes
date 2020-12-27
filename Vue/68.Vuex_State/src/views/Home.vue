<template>
  <div class="home">
    <button @click="$store.state.count ++">点击</button>
    {{ storeCount }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      count: 100,
    }
  },
  computed: {//计算属性可以跟随着某一个值的改变而改变
    ...mapState({
      storeCount: 'count',// state => state.count,想作操作,就还是写成函数形式
    }),
  },
  created () {
    console.log(this.$store.state.count);
  }
}
</script>