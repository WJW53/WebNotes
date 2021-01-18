<template>
  <div>
    <div class="header">
         <div class="logo">
             <img src="@/assets/logo.png" alt="">
             <span>渡一教育</span>
         </div>
         <ul class="user">
             <li class="username" id="username">{{ username }}</li>
             <li class="logout">
                 <router-link to="/login">退出</router-link>
             </li>
         </ul>
     </div>
    <div class="left-menu">
      <dl class="menu">
          <dt>学生管理</dt>
          <!--
              data-id  用于当前用户选择当前选项时  读取对应右侧要显示区域的id
                        根据id  获取右侧要显示区域的元素  将其display 修改为block
          -->
          <router-link tag="dd" to="/main/stulist">学生列表</router-link>
          <router-link tag="dd" to="/main/addstu">新增学生</router-link>
      </dl>
    </div>
     <div class="right-content">
       <router-view></router-view>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  created() {
    this.username = this.Cookie.getCookie('username');
  },
};
</script>

<style scoped>
@import url(./index.css);
</style>
