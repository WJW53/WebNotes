<template>
  <table>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>手机号</th>
        <th>住址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="tbody">
      <tr v-for="item in list" :key="item.id">
        <td>{{ item.sNo }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.sex === 0 ? '男' : '女' }}</td>
        <td>{{ item.email }}</td>
        <td>{{ new Date().getFullYear() - item.birth }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <button class="btn edit" @click="edit(item)">编辑</button>
          <button class="btn remove" @click="del(item.sNo)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['list']),
  },
  methods: {
    ...mapMutations(['setShowModal', 'setActiveStu']),
    ...mapActions(['delStu']),
    edit(stu) {
      this.setActiveStu(stu);
      this.setShowModal(true);
    },
    del(sNo) {
      const flag = window.confirm('are you 要删除咩');
      if (flag) {
        this.delStu(sNo);
      }
    },
  },
};
</script>

<style>
</style>
