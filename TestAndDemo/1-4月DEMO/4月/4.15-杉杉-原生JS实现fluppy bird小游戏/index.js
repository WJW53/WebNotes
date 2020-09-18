var bird = {
  skyStep: 2, // 天空背景移动步长
  birdTop: 0, // 小鸟元素的top值
  birdStepY: 0, // 小鸟向上移动步长
  pipeMoveTimer: [], // 柱子移动的定时器集合
  score: 0, // 分数
  pipeInfo: [], // 小鸟可通过的柱子空间
  startFlag: false, // 游戏开始 锁
  /**
   * 初始化函数
   */
  init: function () {
    this.initData();
    this.animate();
    this.handle();
  },
  /**
   * 初始化数据
   */
  initData: function () {
    this.el = document.getElementById('game');
    this.oStart = this.el.getElementsByClassName('start')[0];
    this.oBird = this.el.getElementsByClassName('bird')[0];
    this.oScore = this.el.getElementsByClassName('score')[0];
    this.oMask = this.el.getElementsByClassName('mask')[0];
    this.oEnd = this.el.getElementsByClassName('end')[0];
    this.oFinalScore = this.oEnd.getElementsByClassName('final-score')[0];
  },
  /**
   * 运动
   *  1. 天空背景移动
   *  2. 开始游戏文字动画
   *  3. 小鸟跳动
   *  4. 小鸟挥动翅膀
   */
  animate: function () {
    this.skyMove();
    this.startBound();
    this.birdJump();
    this.birdFly();
  },
  /**
   * 天空背景移动
   *  设置 game 元素的x轴背景位置不断减小，就可实现背景图片移动的效果
   */
  skyMove: function () {
    var self = this;
    var skyPosition = 0;
    this.skyTimer = setInterval(function () {
      skyPosition -= self.skyStep;
      self.el.style.backgroundPositionX = skyPosition + 'px';
    }, 30)
  },
  /**
   * 开始游戏文字动画
   */
  startBound: function () {
    var self = this;
    var type = 'white';
    var style = {
      white: { fontSize: '24px', color: '#fff' },
      blue: { fontSize: '36px', color: '#09f' },
    };

    this.startBoundTimer = setInterval(function () {
      type = type === 'white' ? 'blue' : 'white';
      self.oStart.style.fontSize = style[type].fontSize;
      self.oStart.style.color = style[type].color;
    }, 300)
  },
  /**
   * 小鸟跳动
   */
  birdJump: function () {
    var self = this;

    this.birdJumpTimer = setInterval(function () {
      self.birdTop = self.birdTop === 260 ? 220 : 260;
      self.setBirdTop();
    }, 300)
  },
  /**
   * 小鸟挥动翅膀
   *  移动小鸟的背景图片位置信息
   */
  birdFly: function () {
    var count = 0;
    var self = this;
    this.birdFlyTimer = setInterval(function () {
      self.oBird.style.backgroundPositionX = (++ count % 3) * -30 + 'px';
    }, 300)
  },
  /**
   * 监听dom事件
   */
  handle: function () {
    this.hanldeStart();
    this.handleClick();
  },
  /**
   * 点击开始游戏按钮
   */
  hanldeStart: function () {
    var self = this;
    this.oStart.onclick = function () {
      this.style.display = 'none'; // 开始游戏文字隐藏

      clearInterval(self.startBoundTimer); // 清除 开始游戏文字 定时器
      clearInterval(self.birdJumpTimer); // 清除 开始小鸟跳跃 定时器
      
      self.startGame(); // 正式开始游戏
    };
  },
  /**
   * 点击屏幕
   */
  handleClick: function () {
    var self = this;
    this.el.onclick = function (e) {
      if(!self.startFlag || e.target.classList.contains('start')) { return }; // 如果为开始游戏 或者 点击的为开始游戏文字 则什么都不做
      self.birdStepY = -10; // 每点击一次都让小鸟的高度上升
    };
  },
  /**
   * 设置小鸟的top值
   */
  setBirdTop: function () {
    this.oBird.style.top = this.birdTop + 'px';
    if(this.startFlag) {
      this.judgeKonck();
      this.addScore();
    }
  },
  /**
   * 开始游戏
   */
  startGame: function () {
    this.startFlag = true; // 设置开始游戏锁为true，代表游戏已经开始
    this.oScore.style.display = 'block'; // 显示score元素
    this.setBirdStyle(); // 设置小鸟样式
    this.birdDrop(); // 小鸟自动降落
    this.skyStep = 5; // 设置天空移动的速度变快
    for(var i = 1; i <= 5; i ++) {
      this.createPipe(300 * i); // 循环4次，创建出4个柱子
    }
  },
  /**
   * 设置小鸟的样式
   *  1. 小鸟元素top值为80px
   *  2. 取消小鸟元素的transition过渡
   */
  setBirdStyle: function () {
    this.oBird.style.left = '80px'; // 小鸟回到屏幕左侧等待
    this.oBird.style.transition = 'none'; // 取消小鸟的过渡transition
  },
  /**
   * 小鸟降落
   */
  birdDrop: function () {
    var self = this;

    this.birdDropTimer = setInterval(function () {
      self.birdTop += ++ self.birdStepY; // 为了让小鸟又一个加速运动，所以每次垂直步长需要加一
      self.setBirdTop();
    }, 30)
  },
  /**
   * 创建柱子
   * @param {Number} x - 柱子距离左侧的距离
   */
  createPipe: function (x) {
    var upHeight = 50 + Math.floor(Math.random() * 175); // 上柱子的高度，为什么需要加50？因为要设置柱子最短为50像素高
    var downHeight = 600 - upHeight - 150; // 下柱子的高度，为什么减去150？原因是要留出150px的空隙

    // 创建出上面的柱子
    var oUpPipe = this.createEle('div', ['pipe', 'pipe--up'], {
      height: upHeight + 'px', 
      left: x + 'px',
    }); 

    // 创建出下面的柱子
    var oDownPipe = this.createEle('div', ['pipe', 'pipe--down'], {
      height: downHeight + 'px', 
      left: x + 'px',
    }); 

    this.el.appendChild(oUpPipe);
    this.el.appendChild(oDownPipe);

    this.pipeMove([oUpPipe, oDownPipe], x);

    this.pipeInfo.push({
      dom: oUpPipe,
      y: [upHeight, upHeight + 150],
    });
  },
  /**
   * 创建元素
   * @param {String} eleName - 要创建的元素名字
   * @param {Array} classArr - 元素的类名集合
   * @param {Object} styleObj - 元素的样式
   */
  createEle: function (eleName, classArr, styleObj) {
    var dom = document.createElement(eleName);

    for(var i = 0; i < classArr.length; i ++) {
      dom.classList.add(classArr[i]);
    }

    for(var key in styleObj) {
      dom.style[key] = styleObj[key];
    }

    return dom;
  },
  /**
   * @param {domArr} domArr - 成对的柱子元素数组
   * @param {Number} x - 柱子距离左侧的宽度
   */
  pipeMove: function (domArr, x) {
    var self = this;
    var timer = setInterval(function () {
      x -= self.skyStep;
      if(x < -52) { 
        self.createPipe(1450);
        clearInterval(timer);
      };
      for(var i = 0; i < domArr.length; i ++) {
        domArr[i].style.left = x + 'px';
      }
    }, 30);

    this.pipeMoveTimer.push(timer);
  },
  /**
   * 小鸟碰撞检测
   *  1. 是否撞击临界（即最上方和最下方），一旦撞击，则失败
   *  2. 是否撞击到柱子，一旦撞击，则失败
   */
  judgeKonck: function () {
    this.judgeBoundary();
    this.judgePipe();
  },
  /**
   *  判断小鸟是否撞击临界（即最上方和最下方），一旦撞击，则失败
   */
  judgeBoundary: function () {
    var minTop = 0;
    var maxTop = 570;

    if(this.birdTop < minTop || this.birdTop > maxTop) {
      this.startFlag = false;
      this.failGame();
    }
  },
  /**
   * 判断小鸟是否撞击柱子，一旦撞击，则失败
   */
  judgePipe: function () {
    var pipeX = this.pipeInfo[this.score].dom.offsetLeft; //  获取柱子的 left值
    var pipeY = this.pipeInfo[this.score].y;  // 获取上柱子底部的值 和 下柱子顶部的值
    var birdY = this.oBird.offsetTop; // 获取小鸟的top值

    // 如果柱子的left值范围为[43, 95]时，小鸟的高度小于上柱子底部的值 或者 大于下柱子顶部的值时，则失败
    // 95 ? => 110 - 15 ==> 15 - bird.marginLeft
    // 15 ? => 95 - 80 = 15
    if((pipeX <= 95 && pipeX >= 15) && (birdY < pipeY[0] || birdY > pipeY[1])) {
      this.failGame();
    }
  },
  /**
   * 加分 函数
   */
  addScore: function () {
    var pipeX = this.pipeInfo[this.score].dom.offsetLeft;
    if(pipeX < 80 - 52) { // 80-52？ 柱子正好越过小鸟的距离
      this.oScore.innerText = ++ this.score; // 分数加一
    }
  },
  /**
   * 游戏失败
   */
  failGame: function () {
    clearInterval(this.skyTimer); // 清除天空移动定时器
    clearInterval(this.birdDropTimer); // 清除小鸟降落定时器
    clearInterval(this.birdFlyTimer); // 清除小鸟挥动翅膀定时器
    for(var i = 0; i < this.pipeMoveTimer.length; i ++) { // 清除柱子移动定时器
      clearInterval(this.pipeMoveTimer[i]);
    }
    this.oMask.style.display = 'block';
    this.oEnd.style.display = 'block';
    this.oScore.style.display = 'none';
    this.oFinalScore.innerText = this.score;
  },
}