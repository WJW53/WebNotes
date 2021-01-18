// Vue.extend
import Vue from 'vue';
import toast from './index.vue';

const Toast = Vue.extend(toast);
// new Toast 相当于 new Vue(options)
const showToast = ({ msg, type }) => {
  const app = new Toast({
    el: document.createElement('div'),
    data() {
      return {
        msg,
        type,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.show = false;
  }, 1500);
  setTimeout(() => {
    app.exist = false;
  }, 2500);
};

export default showToast;
