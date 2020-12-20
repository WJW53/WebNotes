<template>
  <div class="app">
    <!-- 原先是这么写的 -->
    <!-- <date-picker :date="date" @choose-date="chooseDate" /> -->

    <!-- 后来可以这样写,再改一下DatePicker组件中的model选项即可 -->
    <!-- v-model :value @input :date @choose-date -->
    <date-picker v-model="date"/>

  </div>
</template>

<script>
import DatePicker from './DatePicker';

export default {
  components: {
    DatePicker,
  },  
  data () {
    return {
      date: new Date(),
    }
  },
  // methods: {
  //   chooseDate (date) {
  //     this.date = date;
  //   },
  // }
}
</script>

<style scoped>

</style>