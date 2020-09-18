Puzzle.prototype = {
  el: null,
  oPuzzle: null,
  oEmptyBlock: null,
  puzzleHeight: 0,
  puzzleHeight: 0,
  row: 0,
  col: 0,
  blockWidth: 0,
  blockHeight: 0,
  blockImgPosition: [],
  blockPosition: [],
  puzzleImg: '',
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    var self = this;
    this.el = document.querySelector(options.el);
    this.oPuzzle = document.createElement('div');
    this.puzzleWidth = options.data.width;
    this.puzzleHeight = options.data.height;
    this.row = options.data.row;
    this.col = options.data.col;
    this.blockWidth = this.puzzleWidth / this.col;
    this.blockHeight = this.puzzleHeight / this.row;
    this.blockImgPosition = this.getBlockImgPosition();
    this.blockPosition = this.getBlockPosition();
    this.puzzleImg = options.data.img;

    setTimeout(function () {
      self.oEmptyBlock = self.oPuzzle.querySelector('div[ref=empty]');
      self.oBlockList = self.oPuzzle.querySelectorAll('div[ref=block]');
    }, 0)
  },
  getBlockImgPosition: function () {
    var arr = [];
    for(var i = 0; i < this.row; i ++) {
      for(var j = 0; j < this.col; j ++) {
        arr.push({
          x: j * this.blockWidth,
          y: i * this.blockHeight,
        })
      }
    }

    return arr;
  },
  getBlockPosition: function () {
    // 声明一个新数组
    var newArr = [];
    for(var i = 0; i < this.blockImgPosition.length; i ++) {
      newArr[i] = this.blockImgPosition[i];
    }
    var lastEle = newArr[newArr.length - 1]; // 获得新数组中最后一项
    newArr.length = newArr.length - 1; // 将新数组的长度减一，即删掉最后一项
    newArr.sort(function () { // 打乱新数组
      return Math.random() - 0.5;
    })
    newArr.push(lastEle);  // 打乱完毕后，向新数组中添加之前删除的最后一项
    return newArr;
  },
  render: function () {
    var template = '';
    
    for(var i = 0; i < this.blockImgPosition.length; i ++) {
      var blockImgX = this.blockImgPosition[i].x;
      var blockImgY = this.blockImgPosition[i].y;
      var blockPositionX = this.blockPosition[i].x;
      var blockPositionY = this.blockPosition[i].y;
      var isLastBlock = i === this.blockImgPosition.length - 1;
      template += `
        <div
          class="block"
          style="
            width: ${this.blockWidth}px;
            height: ${this.blockHeight}px;
            background-image: url('${this.puzzleImg}');
            background-position: ${-blockImgX}px ${-blockImgY}px;
            left: ${blockPositionX}px;
            top: ${blockPositionY}px;
            opacity: ${isLastBlock ? 0 : 1}
          "
          ref="${isLastBlock ? 'empty' : 'block'}"
        ></div>
      `;
    }

    this.oPuzzle.setAttribute('class', 'puzzle');
    this.oPuzzle.style.width = this.puzzleHeight + 'px';
    this.oPuzzle.style.height = this.puzzleHeight + 'px';
    this.oPuzzle.innerHTML = template;
    this.el.appendChild(this.oPuzzle);
  },
  handle: function () {
    var self = this;
    this.oPuzzle.onclick = function (e) {
      var dom = e.target;
      var isBlock = dom.classList.contains('block') && dom.getAttribute('ref') === 'block';

      if(isBlock) {
        self.handleBlock(dom);
      }
    };
  },
  handleBlock: function (dom) {

    // 判断当前点击元素是否和空白元素相邻
    var canMove = this.checkMove(dom);
    // 如果不相邻，则什么都不做
    if(!canMove) { return };

    // 交换点击元素和空白元素的位置
    this.moveBlock(dom);

    // 交换位置后判断是否胜利
    this.checkWin();
  },
  checkMove: function (oBlock) {
    // 获取block元素当前的行和列
    var blockIndex = this.getEleIndex(oBlock);
    var blockRow = blockIndex.row;
    var blockCol = blockIndex.col;

    // 获取empty元素当前的行和列
    var emptyIndex = this.getEleIndex(this.oEmptyBlock);
    var emptyRow = emptyIndex.row;
    var emptyCol = emptyIndex.col;

    // 判断是否列相同，行相差为1
    // 判断是否行相同，列相差为1
    // 将结果返回出去
    return blockCol === emptyCol && Math.abs(blockRow - emptyRow) === 1 || blockRow === emptyRow && Math.abs(blockCol - emptyCol) === 1;
  },
  getEleIndex: function (dom) {
    var left = dom.offsetLeft;
    var top = dom.offsetTop;

    var row = Math.round( top / this.blockHeight );
    var col = Math.round( left / this.blockWidth );

    return {
      row: row,
      col: col
    };
  },
  moveBlock: function (oBlock) {
    // 获取block元素的left值和top值
    var blockLeft = oBlock.style.left;
    var blockTop = oBlock.style.top;
    // 设置block元素的left和top为empty元素的left和top
    oBlock.style.left = this.oEmptyBlock.style.left;
    oBlock.style.top = this.oEmptyBlock.style.top;
    // 设置empty元素的left和top为block元素的left和top
    this.oEmptyBlock.style.left = blockLeft;
    this.oEmptyBlock.style.top = blockTop;
  },
  checkWin: function () {
    // 在该函数中判断是否胜利
    var isWin = true;  // 声明一个变量isWin，存放是否胜利，默认为true
    // 遍历所有的block元素（除了empty）
    for(var i = 0; i < this.oBlockList.length; i ++) {
      var oBlock = this.oBlockList[i];

      var blockLeft = parseInt( '-' + oBlock.style.left ); // 拿到元素的left值，取反，因为背景图片的方向都为负值
      var blockTop = parseInt( '-' + oBlock.style.top ); // 拿到元素的top值，取反，因为背景图片的方向都为负值

      var imgLeft = parseInt(oBlock.style.backgroundPositionX); // 拿到元素背景图片位置方向x
      var imgTop = parseInt(oBlock.style.backgroundPositionY);  // 拿到元素背景图片位置方向y

      if(!(blockLeft === imgLeft && blockTop === imgTop)) {
        isWin = false;
        break;
      }
    }

    if(isWin) {
      this.winGame();
    }
  },
  winGame: function () {
    var self = this;
    setTimeout(function () {
      alert('恭喜你，拼成功啦');
      self.oEmptyBlock.style.opacity = 1;
    }, 300)
    this.oPuzzle.onclick = null;
  },
}

function Puzzle (options) {
  this.init(options);
}