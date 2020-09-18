/**
 * 产生一个随机整数，范围是min~max之间
 * @param {*} min 最小值
 * @param {*} max 最大值，取不到最大值
 */
function getRandom(min, max) {
  // Math.random()   0~1   包含小数
  // Math.random() * (max - min)   0 ~ (max-min)  包含小数
  // Math.random() * (max - min) + min   min ~ max  包含小数
  // Math.floor(Math.random() * (max - min) + min)  min~max 只有整数
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 得到一个随机的颜色
 */
function getRandomColor() {
  // 颜色数组
  var colors = [
    "#f26395",
    "#62efab",
    "#ef7658",
    "#ffe868",
    "#80e3f7",
    "#d781f9"
  ];
  //产生一个随机的下标
  var index = getRandom(0, colors.length);
  return colors[index];
}

/**
 * 判断一个数n，是不是一个素数（质数）
 * 素数：大于1的数字，只能被1和自身整除
 * @param {*} n
 */
function isPrime(n) {
  if (n <= 1) {
    return false;
  }
  // 2~n-1
  for (var i = 2; i < n; i++) {
    if (n % i === 0) {
      // i能整除n
      return false;
    }
  }
  // 找不到
  return true;
}

var number = 1; //下一个要添加的数字
var divNumbers = document.getElementById("divNumbers"); //小数字的容器
var divNum = document.getElementById("num"); //中间的数字的div
var divCenter = document.getElementById("divCenter");
/**
 * 添加一个数字
 */
function addNumber() {
  //添加小数字
  var span = document.createElement("span");
  span.innerText = number;
  divNumbers.appendChild(span);
  //设置中间的数字
  divNum.innerText = number;

  if (isPrime(number)) {
    //产生一个随机颜色
    var color = getRandomColor();
    //变化颜色
    span.style.color = color;
    //中间有东西飘出去了
    var div = document.createElement("div");
    div.className = "overlap"; //重叠的div
    div.innerText = number;
    div.style.color = color;
    //设置过渡
    div.style.transition = "1s ease-in";
    divCenter.appendChild(div); //此时，该元素根本就不在页面上（浏览器还没有对页面进行绘制）
    //必须在这个位置，强行的让浏览器绘制一遍（reflow）
    getComputedStyle(div).top; //该代码没有实际意义，只是强行读取该元素最终的某个位置，逼迫浏览器绘制该元素
    //让它飘
    div.style.transform =
      "translate(" +
      getRandom(-300, 300) +
      "px, " +
      getRandom(-300, 300) +
      "px)";
    //让它透明
    div.style.opacity = 0;
    //过渡完成后，需要删除该元素
    div.addEventListener(
      "transitionend",
      function() {
        //过渡完成后触发的事件
        div.remove(); //自杀
      },
      {
        once: true //该事件只触发一次
      }
    );
  }
  //让滚动条滚动到span元素的位置
  span.scrollIntoView();
  number++;
}
var timer = null; //用于保存计时器的id
/**
 * 开始不断的产生数字
 */
function start() {
  if (timer) {
    //正在产生数字
    return;
  }
  // 每N毫秒运行一次addNumber函数
  timer = setInterval(addNumber, 100);
}

/**
 * 停止产生数字
 */
function stop() {
  clearInterval(timer);
  timer = null;
}

window.onclick = function() {
  if (timer) {
    //正在产生数字
    stop();
  } else {
    start();
  }
};
