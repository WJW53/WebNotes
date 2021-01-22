/* eslint-disable prefer-destructuring */
function getCookie(key) {
  const cookie = document.cookie.trim().split('; ');
  const cookieObj = {};
  for (let i = 0; i < cookie.length; i += 1) {
    const arr = cookie[i].split('=');
    cookieObj[arr[0]] = arr[1];
  }
  return cookieObj[key];
}

function setCookie(key, value, time) {
  const expires = new Date(new Date().getTime() + time);
  document.cookie = `${key}=${value}; expires=${expires.toGMTString()}`;
  console.log(document.cookie);
}
function removeCookie(key) {
  setCookie(key, '', -1);
}

export default {
  getCookie,
  setCookie,
  removeCookie,
};
