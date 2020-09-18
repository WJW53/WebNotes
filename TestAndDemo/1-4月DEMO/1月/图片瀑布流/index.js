var divContainer = document.getElementById("container");
var imgWidth = 220; //每张图片的固定宽度

//1. 加入图片元素
function createImgs() {
    for (var i = 0; i <= 40; i++) {
        var src = "img/" + i + ".jpg"; //生成图片的src路径
        var img = document.createElement("img");
        img.src = src; //设置src路径
        img.style.width = imgWidth + "px"; // 定宽
        divContainer.appendChild(img); //添加到容器中
        img.onload = setPoisions; //当每张图片加载完成后，都进行重新排列
    }
}

createImgs();

//2. 设置每张图片的位置

function setPoisions() {
    var info = cal(); //得到列数，和 间隙的空间
    var nextTops = new Array(info.columns); //该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
    nextTops.fill(0); //将数组的每一项填充为0
    for (var i = 0; i < divContainer.children.length; i++) {
        var img = divContainer.children[i];
        //找到nextTops中的最小值作为当前图片的纵坐标
        var minTop = getMin(nextTops);
        img.style.top = minTop + "px";
        //重新设置数组这一项的下一个top值
        var index = nextTops.indexOf(minTop); //得到使用的是第几列的top值
        nextTops[index] += img.height + info.space;
        //横坐标
        var left = (index + 1) * info.space + index * imgWidth;
        img.style.left = left + "px";
    }
    var max = getMax(nextTops); //求最大值
    divContainer.style.height = max + "px";//3. 设置容器的高度
}

/**
 * 得到该数组中的最大值
 * @param {*} arr 
 */
function getMax(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
    // return Math.min.apply(null, arr)
    // return Math.min(...arr);
}

/**
 * 得到该数组中的最小值
 * @param {*} arr 
 */
function getMin(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
    // return Math.min.apply(null, arr)
    // return Math.min(...arr);
}

/**
 * 计算一共有多少列，以及每一列之间的间隙
 */
function cal() {
    var containerWidth = divContainer.clientWidth;//容器的宽度
    //计算列的数量
    var columns = Math.floor(containerWidth / imgWidth);
    //计算间隙
    var spaceNumber = columns + 1;//间隙数量
    var leftSpace = containerWidth - columns * imgWidth;//计算剩余的空间
    var space = leftSpace / spaceNumber; //每个间隙的空间
    return {
        space: space,
        columns: columns
    }
}

var timerId = null; //一个计时器的id
window.onresize = function () { //窗口尺寸变动后，重新排列
    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
        console.log("重排")
        setPoisions();
    }, 300)
}

// setPoisions(); //这个时候，图片还没有加载完成
// window.onload = setPoisions;