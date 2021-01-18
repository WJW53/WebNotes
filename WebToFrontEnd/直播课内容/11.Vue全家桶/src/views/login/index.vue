<template>
  <div>
      <form action="#" id="login">
        <h2>登录
            <router-link to="/logon">注册</router-link>
        </h2>
        <div>
            <label for="account">
                账号:
            </label>
            <input type="text" v-model="account">
        </div>
        <div>
            <label for="password">密码:</label>
            <input type="password" v-model="password">
        </div>
        <div>
            <label for=""></label>
            <input class="btn" type="button" @click="login" value="提交" id="submit-btn">
            <input class="btn" type="button" @click="reset" value="重置">
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (this.account && this.password) {
        try {
          const { msg } = await this.$api.login(`account=${this.account}&password=${this.password}`);
          this.$Toast({ msg, type: 'success' });
          this.Cookie.setCookie('username', this.account);
          this.$router.push('/main');
        } catch (error) {
          this.$Toast({ msg: error, type: 'fail' });
        }
      }
    },
    reset() {
      this.password = '';
      this.account = '';
    },
  },
  created() {
    this.Cookie.setCookie('username', '', -1);
  },
};
</script>

<style scoped src="./login.css">
/* @import url(./login.css); */
</style>
