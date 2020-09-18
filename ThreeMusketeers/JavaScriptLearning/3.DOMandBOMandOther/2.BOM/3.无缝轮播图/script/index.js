//配置对象,便于以后修改
var config = {
    imgWidth: 520, //图片的宽度
    dotWidth: 12, //圆点的宽度
    doms: { //涉及的dom对象
        divBanner:document.querySelector(".banner"),
        divImgs: document.querySelector(".banner .imgs"),
        divDots: document.querySelector(".banner .dots"),
        divArrow: document.querySelector(".banner .arrow")
    },
    currentIndex: 0, //实际的图片索引，0 ~ imgNumber-1
    timer: { //运动计时器配置
        duration: 16, //运动间隔的时间，单位毫秒
        total: 300, //运动的总时间，单位毫秒
        id: null //计时器id
    },
    autoTimer:null //自动移动的计时器
};
//图片数量,这得放外面定义。要是放config里面, doms,this,config 都不能操作它
config.imgNumber = config.doms.divImgs.children.length;

/**
 * 初始化元素尺寸
 */
function initSize() {
    config.doms.divDots.style.width = config.dotWidth * config.imgNumber + "px";
    //多设两个图片宽度,便于无缝滚动
    config.doms.divImgs.style.width = config.imgWidth * (config.imgNumber + 2) + "px";
}

/**
 * 初始化元素
 */
function initElements() {
    //创建小圆点
    for (var i = 0; i < config.imgNumber; i++) {
        var span = document.createElement("span");
        config.doms.divDots.appendChild(span);
    }
    //添加、复制图片
    var children = config.doms.divImgs.children;
    // last是为了避免children的实时改变而改变了children.length.  永远让last为最后一个
    var first = children[0], last = children[children.length - 1];
    var newImg = first.cloneNode(true); //深度克隆
    config.doms.divImgs.appendChild(newImg);
    newImg = last.cloneNode(true);
    config.doms.divImgs.insertBefore(newImg, first);//在first之前插入newImg
}

/**
 * 初始化位置
 */
function initPosition() {
    var left = (-config.currentIndex - 1) * config.imgWidth;
    config.doms.divImgs.style.marginLeft = left + "px";
}

/**
 * 设置小圆点的状态,也是初始化
 */
function setDotStatus() {
    for (var i = 0; i < config.doms.divDots.children.length; i++) {
        var dot = config.doms.divDots.children[i];
        if (i === config.currentIndex) {
            dot.className = "active";
        }
        else {
            dot.className = "";
        }
    }
}

/**
 * 初始化汇总方法
 */
function init() {
    initSize();
    initElements();
    initPosition();
    setDotStatus();
}

init();

/**
 * 切换到某一个图片索引
 * @param {*} index 切换到的图片索引
 * @param {*} direction 方向  "left"  "right"
 */
function switchTo(index, direction) {//direction指的是 当前图片本身向哪个方向移动:因为老师写反了,搞的..
    if (index === config.currentIndex) {//没改变图片索引的话
        return;
    }
    if (!direction) {//没给方向的话,默认为左边
        direction = "left";
    }
    //最终的marginLeft
    var newLeft = (-index - 1) * config.imgWidth;
    animateSwitch();

    //重新设置当前索引,这里要忘记设置了,那不就全嗝儿屁了吗!
    config.currentIndex = index;
    setDotStatus();

    /**
     * 逐渐改变marginLeft,让它有个改变的过程,动画,显得更人性化
     */
    function animateSwitch() {
        stopAnimate();//先停止之前的动画
        //1. 计算运动的次数
        var number = Math.ceil(config.timer.total / config.timer.duration);//向上取整
        var curNumber = 0;//当前的运动次数

        //2. 计算总距离,这里需要稍复杂的计算

//      看我写的md文档吧.  老师只是在写if的时候写反了而已
//      老师只是下面这个 left , right 写反了,所以搞的后面很麻烦. 我暂且没改,因为涉及好几个函数的left和right

        var distance,
            marginLeft = parseFloat(getComputedStyle(config.doms.divImgs).marginLeft),//浮点数更精确
            totalWidth = config.imgNumber * config.imgWidth;//一定不能考虑额外的图片的宽度!!!
        if (direction === "left") {//只要把这两个if里的left right互换位置即可不必新增那俩toDirection函数
            if (newLeft < marginLeft) {
                distance = newLeft - marginLeft;
            }
            else {
                distance = -(totalWidth - Math.abs(newLeft - marginLeft));
            }
        }
        if (direction === "right") {
            if (newLeft > marginLeft) {
                distance = newLeft - marginLeft;
            }
            else {
                distance = totalWidth - Math.abs(newLeft - marginLeft);
            }
        }

        //3. 计算每次改变的距离   
        var everyDistance = distance / number;

        config.timer.id = setInterval(function () {
            //改变div的marginleft,用的是图片的marginLeft
            marginLeft += everyDistance;
            if (direction === "left" && Math.abs(marginLeft) > totalWidth) {
                marginLeft += totalWidth;//如果点击 向右 切换按钮,且超出原本范围,就瞬间回到左边对应位置
            }
            else if (direction === "right" && Math.abs(marginLeft) < config.imgWidth) {
                marginLeft -= totalWidth;//如果点击 向左 切换按钮,且超出原本范围,就瞬间回到右边对应位置
            }
            config.doms.divImgs.style.marginLeft = marginLeft + "px";//别忘记加上px
            curNumber++;//准备进行下一次
            if (curNumber === number) {//移动到了最后一次,就停止动画吧
                stopAnimate();
            }
        }, config.timer.duration);//每次隔 duration 毫秒
    }

    function stopAnimate() {//停止渐进动画
        clearInterval(config.timer.id);
        config.timer.id = null;
    }
}

config.doms.divArrow.onclick = function (e) {
    if (e.target.classList.contains("left")) {
        toLeft();
    }
    else if (e.target.classList.contains("right")) {
        toRight();
    }
}

config.doms.divDots.onclick = function (e) {
    if (e.target.tagName === "SPAN") {//只有点击圆点的时候
        var index = Array.from(this.children).indexOf(e.target);//先变为真数组,得到索引
        switchTo(index, index > config.currentIndex ? "left" : "right");//注意 左右 的书写位置
    }
}

function toLeft() {//左键那个按钮
    var index = config.currentIndex - 1;
    if (index < 0) {
        index = config.imgNumber - 1;
    }
    switchTo(index, "right");
}

function toRight() {//右键那个按钮
    var index = (config.currentIndex + 1) % config.imgNumber;
    switchTo(index, "left");
}

//自动转换
config.autoTimer = setInterval(toRight, 2000);
//当移入div的时候,就停止自动切换
config.doms.divBanner.onmouseenter = function(){
    clearInterval(config.autoTimer);
    config.autoTimer = null;
}
//当离开div的时候,继续自动切换
config.doms.divBanner.onmouseleave = function(){
    if(config.autoTimer){
        return;
    }
    config.autoTimer = setInterval(toRight, 2000);
}