import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: false,
    activeStu: null,
    list: [],
    size: 10,
    count: 0,
    totalPage: 0,
    nowPage: 0,
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setShowModal(state, bool) {
      state.show = bool;
    },
    setActiveStu(state, stu) {
      state.activeStu = stu;
    },
    setTotalPage(state, count) {
      state.count = count;
      state.totalPage = Math.ceil(count / state.size);
    },
    setNowPage(state, page) {
      state.nowPage = page;
    },
  },
  actions: {
    async getStuList({ state, commit }, page) {
      const { data: { cont: count, findByPage: list } } = await api.findByPage(page, state.size);
      commit('setList', list);
      commit('setTotalPage', count);
      commit('setNowPage', page);
    },
    async delStu({ state, dispatch }, sNo) {
      const value = await api.delStu(sNo);
      console.log(value);
      let page = Math.ceil((state.count - 1) / state.size);
      if (state.nowPage > page) {
        page = state.nowPage - 1;
      } else {
        page = state.nowPage;
      }
      dispatch('getStuList', page);
    },
  },
  modules: {
  },
});
