<template>
  <div id="app">
    <template v-if="!isInpSe">
      <base-home>闻海</base-home>
    </template>
    <template v-else>
      <router-link to="/home"></router-link>
    </template>
    <transition>
      <router-view>

      </router-view>
    </transition>

  </div>
</template>

<script>
// import $ from '../node_modules/jquery';
import BaseHome from './components/BaseHome'

export default {
  name: "App",
  components: {
    BaseHome
  },
  data() {
    return {
      isInpSe: false,
      wordsList: [],
    };
  },

  methods: {},

  created() {
    console.log("ok");
  },
};
</script>

<style>
/* #app {
  
} */
.icon-sousuo {
  color: blue;
  font-size: 32px;
}
</style>
