
var per = 0;
var bar = document.getElementsByClassName('bar')[0];
var pageLoadding = document.getElementsByClassName('page-loading')[0]
var timer = setInterval(function () {
  per++;
  bar.style.width = per + '%';
  if (per == 100) {
    clearInterval(timer);
    // classList 每个dom元素的属性  这个属性是用来操作class类名的
    //           add代表在class里面添加一个class类名
    pageLoadding.classList.add('complete');
  }
}, 30);