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
[04:19.48]`;

//将lrc变成一个歌词的数组  [{time:1.06, words:"难念的经"},  {time:3.95, words:"演唱：周华健"}]
function getLrcArray() {
    var lrcArray = lrc.split("\n"); //分割字符串
    for (var i = 0; i < lrcArray.length; i++) {
        var lrcString = lrcArray[i]; //取出每句歌词的字符串
        lrcArray[i] = getLrcObject(lrcString);
    }

    //根据一句歌词字符串，得到一个歌词对象
    //[04:15.75]贪欢一刻偏教那女儿情长埋葬
    function getLrcObject(lrcString) {
        var parts = lrcString.split("]"); //分割成左右两边
        var content = parts[1]; //拿到歌词内容
        var timeString = parts[0].replace("[", ""); //得到时间的字符串
        parts = timeString.split(":"); //将时间部分按照冒号分割
        var minute = +parts[0];
        var second = +parts[1];
        return {
            time: minute * 60 + second,
            words: content  //歌词内容
        }
    }
    return lrcArray;
}

var lrcArray = getLrcArray(); //获取歌词数组
var ul = document.getElementById("ullrc");
var audio = document.getElementById("ad"); //获取audio元素
/**
 * 根据歌词数组，生成li
 */
function createLis() {
    for (var i = 0; i < lrcArray.length; i++) {
        var lrcObj = lrcArray[i];
        var li = document.createElement("li")
        li.innerText = lrcObj.words;
        ul.appendChild(li);
    }
}
var offset = 0; //微调
createLis();
//根据当前的播放进度，得到目前播放的是歌词数组的哪个下标
function getCurrentIndex() {
    var time = audio.currentTime + offset; //获取目前音乐的播放时间
    for (var i = lrcArray.length - 1; i >= 0; i--) {
        var lrcObj = lrcArray[i];
        if (lrcObj.time < time) { //找出第一个比当前时间小的下标
            return i;
        }
    }
    return -1; //表示目前无法播放任何一句歌词
}

// 根据当前音乐的播放进度，设置合适的样式
function setCurrent() {
    //当前的播放进度，当前歌曲播放了多少秒 audio.currentTime
    //得到当前播放的是第几句歌词：得到歌词数组的某个下标
    var index = getCurrentIndex();
    //合适的样式
    //设置ul的margin-top
    var divHeight = 450; //歌词容器的高度
    var liHeight = 35; //每个li的高度
    var top = index * liHeight + liHeight / 2 - divHeight / 2;
    if (top < 0) {
        top = 0;
    }
    ul.style.marginTop = -top + "px";

    //去掉之前的类名为active的li的样式
    var li = ul.querySelector(".active")
    if (li) {
        li.className = "";
    }
    //设置某个li的类名为active
    if (index >= 0) {
        ul.children[index].className = "active";
    }
}

//当音乐的播放时间发生变化时触发的事件
audio.ontimeupdate = setCurrent