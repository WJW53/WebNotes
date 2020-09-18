var lrc = `[00:01.06]难念的经
[00:03.95]演唱：周华健
[00:06.78]
[00:30.96]笑你我枉花光心计
[00:34.15]爱竞逐镜花那美丽
[00:36.75]怕幸运会转眼远逝
[00:39.32]为贪嗔喜恶怒着迷
[00:41.99]责你我太贪功恋势
[00:44.48]怪大地众生太美丽
[00:47.00]悔旧日太执信约誓
[00:49.66]为悲欢哀怨妒着迷
[00:52.56]啊 舍不得璀灿俗世
[00:57.66]啊 躲不开痴恋的欣慰
[01:02.86]啊 找不到色相代替
[01:08.09]啊 参一生参不透这条难题
[01:13.15]吞风吻雨葬落日未曾彷徨
[01:15.73]欺山赶海践雪径也未绝望
[01:18.23]拈花把酒偏折煞世人情狂
[01:20.90]凭这两眼与百臂或千手不能防
[01:23.76]天阔阔雪漫漫共谁同航
[01:26.09]这沙滚滚水皱皱笑着浪荡
[01:28.68]贪欢一刻偏教那女儿情长埋葬
[01:32.38]
[01:34.09]吞风吻雨葬落日未曾彷徨
[01:36.50]欺山赶海践雪径也未绝望
[01:39.07]拈花把酒偏折煞世人情狂
[01:41.69]凭这两眼与百臂或千手不能防
[01:44.68]天阔阔雪漫漫共谁同航
[01:46.93]这沙滚滚水皱皱笑着浪荡
[01:49.54]贪欢一刻偏教那女儿情长埋葬
[01:53.41]
[02:15.45]笑你我枉花光心计
[02:18.53]爱竞逐镜花那美丽
[02:21.14]怕幸运会转眼远逝
[02:23.76]为贪嗔喜恶怒着迷
[02:26.43]责你我太贪功恋势
[02:28.98]怪大地众生太美丽
[02:31.60]悔旧日太执信约誓
[02:34.26]为悲欢哀怨妒着迷
[02:36.90]啊 舍不得璀灿俗世
[02:42.04]啊 躲不开痴恋的欣慰
[02:47.34]啊 找不到色相代替
[02:52.52]啊 参一生参不透这条难题
[02:57.47]吞风吻雨葬落日未曾彷徨
[03:00.05]欺山赶海践雪径也未绝望
[03:02.64]拈花把酒偏折煞世人情狂
[03:05.27]凭这两眼与百臂或千手不能防
[03:08.22]天阔阔雪漫漫共谁同航
[03:10.49]这沙滚滚水皱皱笑着浪荡
[03:13.06]贪欢一刻偏教那女儿情长埋葬
[03:18.45]吞风吻雨葬落日未曾彷徨
[03:20.90]欺山赶海践雪径也未绝望
[03:23.54]拈花把酒偏折煞世人情狂
[03:26.21]凭这两眼与百臂或千手不能防
[03:29.07]天阔阔雪漫漫共谁同航
[03:31.32]这沙滚滚水皱皱笑着浪荡
[03:33.92]贪欢一刻偏教那女儿情长埋葬
[03:39.32]吞风吻雨葬落日未曾彷徨
[03:41.84]欺山赶海践雪径也未绝望
[03:44.38]拈花把酒偏折煞世人情狂
[03:47.04]凭这两眼与百臂或千手不能防
[03:49.99]天阔阔雪漫漫共谁同航
[03:52.20]这沙滚滚水皱皱笑着浪荡
[03:54.89]贪欢一刻偏教那女儿情长埋葬
[04:00.28]吞风吻雨葬落日未曾彷徨
[04:02.68]欺山赶海践雪径也未绝望
[04:05.25]拈花把酒偏折煞世人情狂
[04:07.90]凭这两眼与百臂或千手不能防
[04:10.85]天阔阔雪漫漫共谁同航
[04:13.08]这沙滚滚水皱皱笑着浪荡
[04:15.75]贪欢一刻偏教那女儿情长埋葬
[04:19.48]`; // 模板字符串
var audio = document.getElementById("ad"); // audio元素
var ul = document.getElementById("ullrc"); // 歌词的ul元素
/**
 * 将歌词字符串转换为数组返回
 * [{time:1.06, words:"难念的经"}, {time:3.95, words:"演唱：周华健"}]
 */
function getLrcArray() {
  //1. ["[00:01.06]难念的经", "[00:03.95]演唱：周华健", ....]
  var parts = lrc.split("\n");
  //2. [{time:1.06, words:"难念的经"}, {time:3.95, words:"演唱：周华健"}]
  for (var i = 0; i < parts.length; i++) {
    parts[i] = getLrcObj(parts[i]);
  }
  return parts;

  // "[00:01.06]难念的经"  --->  {time:1.06, words:"难念的经"}
  function getLrcObj(content) {
    var twoParts = content.split("]");
    // 取出时间
    var time = twoParts[0].substr(1);
    var timeParts = time.split(":");
    var minute = +timeParts[0]; //分钟
    var seconds = +timeParts[1]; //秒
    time = minute * 60 + seconds;
    // 取出文字
    var words = twoParts[1];

    return {
      time: time,
      words: words,
    };
  }
}

// 将歌词字符串转换为数组，保存到全局变量lrcArray中
var lrcArray = getLrcArray();

/**
 * 为每一句歌词创建一个li，加入到ul元素中
 */
function createLis() {
  for (var i = 0; i < lrcArray.length; i++) {
    var li = document.createElement("li");
    li.innerText = lrcArray[i].words;
    ul.appendChild(li);
  }
}

createLis();
var weitiao = 0;
/**
 * 根据当前播放的时间，匹配到对应的歌词，得到该歌词的下标
 */
function getLrcIndex() {
  var time = audio.currentTime + weitiao; //当前播放的时间
  for (var i = 0; i < lrcArray.length; i++) {
    if (time < lrcArray[i].time) {
      return i - 1;
    }
  }
}

/**
 * 只要一调用这个函数，就把歌词滚动到最合适的位置
 */
function setPositioin() {
  var i = getLrcIndex();
  if (i === -1) {
    return; //最开始的情况，没有命中任何一句歌词，不管它
  }
  // 假设当前播放的是第 i 句歌词
  var top = i * 35 + 35 / 2 - 450 / 2;
  if (top < 0) {
    top = 0; // top最小为0
  }
  ul.style.marginTop = -top + "px";
  // 高亮显示当前歌词
  // 先去掉ul元素中带有active样式的元素
  var acLi = ul.querySelector(".active"); //查找ul元素中，带有类样式active的元素
  if (acLi) {
    acLi.className = "";
  }
  ul.children[i].className = "active";
}

// 当播放时间发生变化时触发的事件（重新设置歌词位置）
audio.ontimeupdate = setPositioin;