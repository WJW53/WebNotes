//有多少张图片、每张图片的地址、每张图片点击后的超链接
var imgs = [
    // src：图片路径, link：超链接路径
    { src: "./img/banner1.jpg", link: "http://www.duyiedu.com" },
    { src: "./img/banner2.jpg", link: "http://www.duyiedu.com" },
    { src: "./img/banner3.jpg", link: "http://www.duyiedu.com" }
]

//包含所有图片的div
var divImgs = document.getElementById("divImgs");
var divDots = document.querySelector(".dots"); //选中类样式为dots的元素
var index = 0; //表示目前第几张图片是应该被显示的，该变量不考虑额外的图片，比如3张图片，index的取值应该是：0，1，2
var divContainer = document.querySelector(".container"); //整个容器
var containerWidth = divContainer.clientWidth; // 得到整个容器的宽度
var moveTimer = null; //动画计时器的id
var autoTimer = null; //自动播放的计时器
/**
 * 根据imgs数组，创建一些元素，加入到页面中
 */
function createElements() {
    //加入末尾的图片
    createA(imgs[imgs.length - 1]);

    for (var i = 0; i < imgs.length; i++) {
        //生成a元素
        createA(imgs[i]);
        //创建span元素
        var span = document.createElement("span");
        span.setAttribute("index", i);
        divDots.appendChild(span);
    }
    //加入第一张图片
    createA(imgs[0]);

    //设置divImgs的宽度
    //+2的目的是因为：宽度要计算额外的两张图片
    divImgs.style.width = imgs.length + 2 + "00%";

    //设置初始的divImgs的marginLeft
    divImgs.style.marginLeft = getTargetMarginLeft() + "px";

    /**
     * 根据传入的图片信息对象
     * @param {*} obj { src: "./img/banner1.jpg", link: "http://www.duyiedu.com" }
     */
    function createA(obj) {
        var a = document.createElement("a");
        a.href = obj.link;
        //生成img元素
        var img = document.createElement("img");
        img.src = obj.src;

        a.appendChild(img); //将img元素加入到a元素
        divImgs.appendChild(a); //添加a元素到divImgs
    }
}

createElements();
setSpanSelected();

/**
 * 根据当前的index的值，计算divImgs最终应该达到的marginLeft
 */
function getTargetMarginLeft() {
    return -(index + 1) * containerWidth;
}

/**
 * 根据index的值，设置相应的span元素的类样式
 * 每当index改变后，都应该重新调用该函数
 */
function setSpanSelected() {
    //先清除之前设置为selected的span元素的类样式
    var span = document.querySelector(".dots span.selected");
    if (span) {
        //该span有值
        span.className = "";//清除
    }
    divDots.children[index].className = "selected";
}

/**
 * 该函数根据index的值，自动的切换到对应的图片、自动的切换到对应的span
 */
function setStatus() {
    setSpanSelected(); //切换span
    if (moveTimer) {
        //目前正在进行动画
        clearInterval(moveTimer); //清空目前的动画
        moveTimer = null;
    }
    //切换图片：设置divImgs的marginLeft
    var targetMargin = getTargetMarginLeft(); //得到最终要设置的marginLeft的值
    //动画：不能直接设置marginLeft为最终的值
    //从 当前的marginLeft  一步一步变化到   targetMargin， 变化的过程是不断的 减 marginLeft
    var marginLeft = getComputedStyle(divImgs).marginLeft; //当前的marginLeft
    marginLeft = parseFloat(marginLeft); //因为marginLeft包含px
    var step = 24; // 每次减少的像素
    var minMarginLeft = -imgs.length * containerWidth; //marginLeft的临界值 = 最后一张图片的marginLeft
    moveTimer = setInterval(function () { //不断的减
        marginLeft -= step;
        if (marginLeft < minMarginLeft) {
            //小于了临界值
            marginLeft += imgs.length * containerWidth;
        }
        if (Math.abs(marginLeft - targetMargin) <= step) {
            //当这一次改变后，距离目标已经小于等于了step，则表示已经到达了目标
            marginLeft = targetMargin;
            clearInterval(moveTimer); //停止动画
            moveTimer = null;
        }
        divImgs.style.marginLeft = marginLeft + "px";
    }, 16)
}


//注册事件
//span元素的点击事件
divDots.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
        //点击的是span元素
        //点击的是第几个span元素？i
        var i = parseInt(e.target.getAttribute("index")); //读取span元素的index属性
        index = i;
        setStatus();
    }
}

/**
 * 开始自动播放
 */
function autoStart() {
    autoTimer = setInterval(function () {
        index++;
        if (index === imgs.length) {
            //超过了最大下标
            index = 0;
        }
        setStatus();
    }, 3000)
}

autoStart();