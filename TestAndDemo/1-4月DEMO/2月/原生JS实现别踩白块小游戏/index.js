var game = {
  timer: null,
  step: 5,  // 每一行元素移动的步长
  score: 0, // 游戏得分
  flag: false, // 是否开始游戏
  init: function () {
    this.initData(); // 初始化数据
    this.handle();
  },
  initData: function () {
    this.el = document.getElementById('game'); // 父元素
    this.oGo = this.el.getElementsByClassName('go')[0]; //go 元素
    this.oMain = this.el.getElementsByClassName('main')[0]; // main 元素
  },
  handle: function () {
    /**
     * 监听事件元素
     */
    this.handleStart();  // 点击开始游戏
    this.handleTarget();  // 点击每一个黑块
  },
  handleStart: function () {
    /**
     * 点击 开始游戏
     */
    var self = this;
    this.oGo.onclick = function () {
      this.style.display = 'none';  // go 元素隐藏
      self.flag = true; // 游戏开始
      self.move(); // 开始运动
    }
  },
  handleTarget: function () {
    /**
     * 点击 每一个黑色的小方块
     */
    var self = this;
    this.oMain.onclick = function (e) {
      var dom = e.target;
      var isTarget = dom.classList.contains('target');

      if(!self.flag) { return }  // 如果游戏未开始，什么都不做

      if(isTarget) {
        // 如果点击的是 target 元素
        dom.classList.remove('target'); // 移除元素的target  class
        dom.style.backgroundColor = '#ccc'; // 设置元素的背景颜色为灰色
        self.score ++;  // 分数 +1
        self.levelUp(); // 等级提升
      } else {  
        // 如果点击的不是target元素
        self.end(); // 游戏结束
      }

    }
  },
  move: function () {
    // 每隔 20 ms 执行一次 render(渲染)函数
    this.timer = setInterval(this.render.bind(this), 20)
  },
  render: function () {
    this.oMain.style.top = this.oMain.offsetTop + this.step + 'px'; // 更改main元素的位置
    if(this.oMain.offsetTop >= 0) {
      // 如果main元素的top值>=0,则渲染一行元素，再重新设置main元素的top值为-150px
      this.renderRow();
      this.oMain.style.top = '-150px';
    }
    this.judgeLastRow(); // 判断 最后一行是否包含target元素
  },
  renderRow: function () {
    var index = Math.floor(Math.random() * 4);  // 得到一个随机索引，如0，则为第0个元素设置一个不同的class
    var oRowDiv = document.createElement('div');  // 生成一个div元素
    oRowDiv.setAttribute('class', 'row'); // 设置该元素的class为row

    for(var i = 0; i < 4; i ++) {
      var oColDiv = document.createElement('div');
      oColDiv.setAttribute('class', 'col');
      oRowDiv.appendChild(oColDiv);
    }

    var oClickDiv = oRowDiv.childNodes[index];
    oClickDiv.classList.add('target');
    
    this.oMain.insertBefore(oRowDiv, this.oMain.childNodes[0]);  // 向父元素内第一个元素前插入新生成的行元素
  },
  judgeLastRow: function () {
    /**
     * 判断 最后一行是否包含target元素
     */
    var rowNum = this.oMain.childNodes.length; // 获取整体内容的行数
    if(rowNum === 6) {
      // 如果行元素长度为6，则获取到最后一给行元素
      var oLastRow = this.oMain.childNodes[rowNum - 1];
      for(var i = 0; i < 4; i ++) {
        var dom = oLastRow.childNodes[i]; // 获取到每个行元素内的列元素
        var isContainTarget = dom.classList.contains('target'); // 如果有一个列元素的class包含target，则游戏结束
        if(isContainTarget) {
          this.end();
          break;
        }
      }
      
      // 移除最后一行，保持整体游戏区域内只有6行元素。
      // 因为我们每一次判断的都是第6行元素是否有列元素class包含 “target”
      this.oMain.removeChild(oLastRow);
    }
  },
  levelUp: function () {
    if(this.score % 10 === 0) {
      this.step ++;
    }
  },
  end: function () {
    clearInterval(this.timer);
    this.flag = false;
    alert(this.score);
  },
}