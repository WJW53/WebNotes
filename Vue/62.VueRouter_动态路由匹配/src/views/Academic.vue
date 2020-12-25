<template>
  <div>
    <ul>
      <router-link 
        tag="li"
        v-for="question in questionList"
        :key="question.id"
        :to="{ name: 'question', params: { id: question.id } }"
      >
        {{ question.title }}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questionList: []
    }
  },
  mounted () {
    //先npm i axios,然后import axios from 'axios',最后
//Vue.prototype.$axios = axios;放在http.js中即可,然后再导出到main.js
    this.$axios.get('/question').then(res => {
      this.questionList = res;
    });
  }
}
</script>

<style scoped>
li {
  margin-bottom: 15px;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
  color: #3385ff;
}
</style>