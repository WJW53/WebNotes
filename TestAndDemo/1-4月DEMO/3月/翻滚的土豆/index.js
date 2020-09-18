//全局配置
var config = {
  width: 640,
  minSpeed: 400,
  maxSpeed: 1000
};

// 蓄力条
var bar = {
  dom: document.querySelector(".bar-content"),
  value: 0, //蓄力的进度
  timerId: null, //计时器的id
  render: function() {
    this.dom.style.width = this.value + "%";
  },
  start: function() {
    if (this.timerId) {
      //当前正在蓄力中
      return;
    }
    //自动蓄力
    //this指向bar
    var that = this;
    var step = 2; // 每次增加的数量
    //开始蓄力
    this.timerId = setInterval(function() {
      // this指向window
      that.value += step;
      if (that.value >= 100) {
        that.value = 100;
        step = -step;
      } else if (that.value <= 0) {
        that.value = 0;
        step = -step;
      }
      that.render();
    }, 16);
  },
  //停止
  stop: function() {
    clearInterval(this.timerId);
    this.timerId = null;
  },
  clear: function() {
    this.value = 0;
    this.render();
  }
};

// 大地的移动
var land = {
  dom: document.querySelector(".land"),
  left: 0,
  render: function() {
    this.dom.style.marginLeft = this.left + "px";
  },
  // distance：移动的距离（像素）
  // duration：移动的时间（毫秒）
  move: function(distance, duration) {
    this.dom.style.transition = duration + "ms linear"; //加过渡效果
    this.left -= distance;
    this.render();
    var that = this;
    setTimeout(function() {
      if (that.left < -config.width) {
        that.dom.style.transition = ""; //回退时不能有动画
        that.left += config.width;
        that.render();
      }
    }, duration);
  }
};

// 土豆跳跃
var tudou = {
  dom: document.querySelector(".tudou"),
  maxTop: 466, //最大的top值,
  top: 466,
  timerId: null, //计时器id
  rotate: 0, //当前的旋转角度
  render: function() {
    this.dom.style.top = this.top + "px";
  },
  // v表示速度，正数表示向下的速度，负数表示向上的速度
  // 单位：像素/秒
  jump: function(v) {
    if (this.timerId) {
      //已经在跳啦
      return;
    }
    var t = 0.016; //每次移动的间隔时间，单位秒
    var a = 2000; //重力加速度，固定
    //旋转
    var allTime = ((2 * Math.abs(v)) / a) * 1000; //滞空时间 毫秒
    this.dom.style.transition = "transform " + allTime + "ms";
    this.rotate += 90;
    this.dom.style.transform = "rotate(" + this.rotate + "deg)";

    //大地的移动
    var hv = Math.abs(v) / 2; //大地水平速度 = 垂直的速度的一半 / 2
    var landDis = (hv * allTime) / 1000; //大地移动的距离
    land.move(landDis, allTime);

    var that = this;
    this.timerId = setInterval(function() {
      // 移动一段距离
      // 物体移动距离 = v*t + 0.5*a*t*t
      var dis = v * t + 0.5 * a * t * t; //这次移动的距离
      that.top += dis;
      //改变速度
      v = a * t + v;
      if (that.top >= that.maxTop) {
        //落地了
        that.top = that.maxTop;
        clearInterval(that.timerId);
        that.timerId = null;

        bar.clear(); //清空蓄力条
      }
      that.render();
    }, t * 1000);
  }
};

//当鼠标按下
window.onmousedown = function() {
  bar.start();
};

window.onmouseup = function() {
  bar.stop();
  var speed =
    (bar.value / 100) * (config.maxSpeed - config.minSpeed) + config.minSpeed;
  tudou.jump(-speed);
};
