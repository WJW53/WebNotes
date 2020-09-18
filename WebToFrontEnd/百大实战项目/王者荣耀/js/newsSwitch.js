// 切换新闻
// 切换到第 n 个新闻,n从0开始,对应的是索引
function switchNews(n) {
  var value = -n * 100 + "%"; //计算它最终的margin-left
  var divNews = document.querySelector(".news-banner .news-blocks");
  divNews.style.marginLeft = value;

  //去掉之前的active
  var before = document.querySelector(
    ".news-container .title-container .active"
  );
  before.className = "";
  //给相应的li加上类样式
  var newsUl = document.querySelector(".news-container .title-container");

  newsUl.children[n].className = "active";
}

var ulTitles = document.querySelector(".news-container .title-container");
ulTitles.onmouseover = function (e) {
  if (e.target.tagName != "LI") {//tagName属性值返回的永远是大写的字符串
    return; //如果你移入的不是LI，我啥都不做
  }
  // 代码到了这里，一定是一个LI
//但ulTitles.children并不是一个真正的数组,是个类数组,所以不能直接使用indexOf()
  var children = Array.from(ulTitles.children);//先把它变为真正的数组
  // 利用indexOf返回e.target在这个数组中的索引值
  var index = children.indexOf(e.target);
  if (index >= 5) {
    //超过了新闻版面的数量
    //目前移入的这个li是最后一个
    return;
  }
  switchNews(index);
};
