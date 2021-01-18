<template>
  <div class="modal">
    <div class="mask" @click="setShowModal(false)"></div>
    <div class="modal-content">
      <h2>编辑表单</h2>
      <form action="#" id="edit-student-form">
        <div>
          <label for="edit-name">姓名</label
          ><input
          type="text"
          id="edit-name"
          name="name"
          :value="activeStu.name"
          @input="edit('name', $event.target.value)"
          />
        </div>
        <div>
          <label for="">性别</label>
          <input
          type="radio"
          name="sex"
          id="edit-male"
          value="0"
          :checked="activeStu.sex === 0"
          @change="edit('sex', 0)"/>
          <label for="edit-male" class="sex">男</label>
          <input
          type="radio"
          name="sex"
          id="edit-female"
          value="1"
          :checked="activeStu.sex === 1"
          @change="edit('sex', 1)"
          />
          <label for="edit-female" class="sex">女</label>
        </div>
        <div>
          <label for="edit-email">邮箱</label
          ><input type="email" id="edit-email" name="email"
          :value="activeStu.email"
          @input="edit('email', $event.target.value)"/>
        </div>
        <div>
          <label for="edit-number">学号</label
          ><input type="text" id="edit-number" name="sNo" readonly
          :value="activeStu.sNo"/>
        </div>
        <div>
          <label for="edit-birthYear">出生年</label
          ><input type="text" id="edit-birthYear" name="birth"
          :value="activeStu.birth"
          @input="edit('birth', $event.target.value)"/>
        </div>
        <div>
          <label for="edit-phone">手机号</label
          ><input type="text" id="edit-phone" name="phone"
          :value="activeStu.phone"
          @input="edit('phone', $event.target.value)"/>
        </div>
        <div>
          <label for="edit-address">住址</label
          ><input type="text" id="edit-address" name="address"
          :value="activeStu.address"
          @input="edit('address', $event.target.value)"/>
        </div>
        <div>
          <label for=""></label>
          <button id="edit-submit" class="btn" @click.prevent="commit">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      stu: {},
    };
  },
  methods: {
    ...mapMutations(['setShowModal']),
    edit(key, value) {
      this.stu[key] = value;
    },
    async commit() {
      // 数据合并 this.stu this.activeStu
      const user = { ...this.activeStu, ...this.stu };
      try {
        const { msg } = await this.$api.updateStu(user);
        this.$Toast({ msg, type: 'success' });
        this.setShowModal(false);
        Object.assign(this.activeStu, this.stu);
      } catch (error) {
        this.$Toast({ msg: error, type: 'fail' });
      }
    },
  },
  computed: {
    ...mapState(['activeStu']),
  },
};
</script>

<style>
</style>
