var game = {
  el: '', // 父元素
  level: 0, // 当前游戏级别
  blocks: 0,  // “牌”的总个数
  gameWidth: 600, // 游戏区域宽度，单位px 
  gameHeight: 600,  // 游戏区域高度，单位px
  dataArr: [], // 数据数组，存放 “牌” 的信息
  judgeArr: [], // 判断数组，存放被翻转牌的信息
  turnNum: 0, // 翻转成功的个数
  picNum: 20,  // “牌” 总数量
  maxLevel: 3, // 最高游戏级别
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    this.options = options;
    this.el = options.el;
    this.level = options.level > this.maxLevel ? this.maxLevel : options.level;
    this.blocks = (this.level * 2) * (this.level * 2);
    this.getdataArr();
  },
  getdataArr: function () {
    /**
     * 获取数据数组
     */
    // 1. 利用Array.sort乱序
    var randomArr = this.randomArr(); // 得到随机数数组
    var halfBlocks = this.blocks / 2; // 得到排数的一半
    var dataArr = [];

    for(var i = 0; i < halfBlocks; i ++) {
      var num = randomArr[i];
      var info = {
        url: './images/' + num + '.png',
        id: num
      }
      dataArr.push(info, info);
    }
    console.log(dataArr);
    this.dataArr = this.shuffle(dataArr);
  },
  randomArr: function () {
    /**
     * 获取数字数组
     * 数组中的每一项 为 0 到 count 数字
     */
    var picNum = this.picNum;
    var arr = [];
    for(var i = 0; i < picNum; i ++) {
      arr.push(i + 1);
    }
    console.log(arr);
    return this.shuffle(arr);
  },
  shuffle: function (arr) {
    /**
     * 洗牌，数组乱序方法
     */
    // 1. 利用Array.sort进行数组乱序
    return arr.sort(function () {
      return 0.5 - Math.random();
    })

    // 2. 利用其他方法进行数组乱序
    var length = arr.length - 1;
    for(var i = length ; i >= 0; i --) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var temp = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = temp;
    }
    return arr;
  },
  render: function () {
    /**
     * 渲染元素
     */
    // var template = '';
    var blocks = this.blocks;
    var gameWidth = this.gameWidth;
    var gameHeight = this.gameHeight;
    var level = this.level;
    var blockWidth = gameWidth / ( level * 2 );
    var blockHeight = gameHeight / ( level * 2 );
    var dataArr = this.dataArr;

    for(var i = 0; i < blocks; i ++) {
      var info = dataArr[i];
      var oBlock = document.createElement('div');
      var oPic = document.createElement('div');
      // console.log(info);
      oPic.style.backgroundImage = 'url(' + info.url + ')';
      oBlock.style.width = blockWidth + 'px';
      oBlock.style.height = blockHeight + 'px';
      oBlock.picid = info.id;
      oPic.setAttribute('class', 'pic');
      oBlock.setAttribute('class', 'block');
      oBlock.appendChild(oPic);
      this.el.appendChild(oBlock);
      
      // var info = dataArr[i];
      // template += `
      //   <div 
      //     class="block" 
      //     style="width: ${blockWidth}px; height: ${blockHeight}px"
      //     data-picId=${info.id}
      //   >
      //     <div 
      //       class="pic"
      //       style="background-image: url('${info.url}')"
      //     ></div>
      //   </div>
      // `;
    }
    // this.el.innerHTML = template;
  },
  handle: function () {
    /**
     * 监听父元素的点击事件
     * 通过事件委托判断点击的元素是否为 未翻转的牌
     */
    var self = this;
    this.el.onclick = function (e) {
      var dom = e.target;
      var isBlock = dom.classList.contains('block');
      if(isBlock) {
        self.handleBlock(dom);
      }
    }
  },
  handleBlock: function (dom) {
    /**
     * 点击未翻转成功牌时
     * 如果点击了两张牌，则判断是否为同一张牌
     */
    var picId = dom.picid;
    var judgeArr = this.judgeArr;
    var judgeLength = judgeArr.push({
      id: picId,
      dom: dom
    });
    dom.classList.add('on');

    if(judgeLength === 2) { this.judgePic(); }
    this.judgeWin();
  },
  judgePic: function () {
    /**
     * 判断被翻转牌的图片是否相同
     * 若两个元素对象的id相同，则翻转成功
     * 若不同，则不成功，将牌再次翻转回去
     */
    var judgeArr = this.judgeArr; 
    var isSamePic = judgeArr[0].id === judgeArr[1].id;
    
    if(isSamePic) {
      this.turnNum += 2;
    } else {
      var picDom1 = judgeArr[0].dom;
      var picDom2 = judgeArr[1].dom;
      setTimeout(function () {
        picDom1.classList.remove('on');
        picDom2.classList.remove('on');
      }, 800)
    }
    judgeArr.length = 0;
  },
  judgeWin: function () {
    /**
     * 判断游戏是否胜利
     * 如果翻转成功牌的个数等于牌的总个数，则为胜利
     */

    if(this.turnNum === this.blocks) {
      setTimeout(function () {
        alert('胜利');
      }, 300)
    }
  }
}

game.init({
  el: document.getElementById('game'),
  level: 2
})