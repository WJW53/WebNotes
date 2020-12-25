import Vue from 'vue'
import Vuex from 'vuex';

import { 
  COUNT_INCREMENT,
  CHANGE_OBJ,
  UPDATE_MSG,
} from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    studentList: [],
    obj: {a: 1},
    msg: '',
  },
  getters: {
    countDouble: state => state.count * 2,
    countAdd: state => num => state.count + num,
    studentLength: state => state.studentList.length,
    studentJuveniles: state => state.studentList.filter(student => student.age < 18),
  },
  mutations: {
    [COUNT_INCREMENT] (state, { num }) { 
      // console.log(payload);
      setTimeout(() => {
        state.count += num;
      }, 1000)
    },
    [CHANGE_OBJ] (state) {
      Vue.set(state.obj, 'b', 10);
      // state.obj = {...state.obj, b: 10};
    },
    [UPDATE_MSG] (state, { value }) {
      state.msg = value;
    }
  },
});