var oImg = document.getElementsByTagName('img');

// 默认中间展示索引值为0的这张图片
var curDisplay = 0;

// 获得图片个数

var len = oImg.length;

var timer;

function init() {
    show();
    bindEvent();
    play();
}
init();

function show() {
    // 获得中间图片
    var mLen = Math.floor(len / 2);
    var rNum, lNum;
    // rNum,lNum分别是分散在中间图片左右左右两侧的图片索引

    for (var i = 0; i < mLen; i++) {
        lNum = len + curDisplay - i - 1;
        if (lNum > len - 1) {
            lNum -= len;
        }
        // 分别让分散在左右两侧的图片平移旋转

        oImg[lNum].style.transform = 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)';
        rNum = curDisplay + i + 1;
        if (rNum > len - 1) {
            rNum -= len;
        }
        oImg[rNum].style.transform = 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)';
    }
    // 当前显示图片直接z轴向前移动
    oImg[curDisplay].style.transform = 'translateZ(300px)';
}

function bindEvent() {
    for (var i = 0; i < len; i++) {
        // 在每一张图片上绑定上点击事件
        // 利用立即执行函数清除闭包
        (function (i) {
            oImg[i].onclick = function () {
                // 改变当前显示图片索引
                curDisplay = i;
                show();
            };
            // 鼠标覆盖  清除自动轮播定时器
            oImg[i].onmouseenter = function () {
                clearInterval(timer);
            };
            // 鼠标移走 继续轮播
            oImg[i].onmouseleave = function () {
                play();
            };
        })(i);
    }
}


// 自动播放
function play() {
    timer = setInterval(function () {
        if (curDisplay == len - 1) {
            curDisplay = 0;
        } else {
            curDisplay++;
        }
        show();
    }, 2000);
}