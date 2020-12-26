function isLogin() {
  return document.cookie.includes('login=true');
}

function login() {
  const expiresDay = 147;
  const date = new Date();
  date.setTime(date.getTime() + expiresDay * 24 * 60 * 60 * 1000);
  //如果您设置了新的 cookie，旧的 cookie 不会被覆盖。 新 cookie 将添加到 document.cookie 中
  document.cookie = `login=true;expires=${date.toGMTString()}`;//有效期147天
}

function cancelLogin() {//如何取消cookie,让这个cookie的expires为以往的一个时间即可
  const date = new Date();
  date.setTime(date.getTime() - 100000000);
  document.cookie = `login=true;expires=${date.toGMTString()}`;
}

export default {
  isLogin,
  login,
  cancelLogin,
}