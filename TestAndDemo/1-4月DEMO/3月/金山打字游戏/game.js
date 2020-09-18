//计分板
var board = {
  dom: document.getElementById("score"),
  maxLost: 3, //最大丢失量
  lost: 0, //当前丢失了多少个
  score: 0, //当前分数
  render: function() {
    //显示
    this.dom.innerHTML =
      "<p>得分：" +
      this.score +
      "</p><p>丢失：" +
      this.lost +
      " / " +
      this.maxLost +
      "</p>";
  },
  //增加一个丢失数
  addLost: function() {
    if (this.lost === this.maxLost) {
      return; //游戏已经结束了
    }
    this.lost++;
    if (this.lost === this.maxLost) {
      //丢失量达到最大
      game.gameOver();
    }
    this.render();
  },
  reset: function() {
    this.lost = 0;
    this.score = 0;
    this.render();
  },
  //增加得分
  addScore: function(number) {
    if (this.lost === this.maxLost) {
      //已经结束了
      return;
    }
    this.score += number;
    this.render();
  }
};

board.render();

var letters = []; //目前的所有字母，一个字母就是一个对象
//字母的容器
var divContainer = document.getElementById("letter-container");
/**
 * 产生一个字母对象，并将其加入到数组中
 */
function createLetter() {
  //创建img元素
  var img = document.createElement("img");
  img.className = "letter";

  divContainer.appendChild(img);

  //设置src路径
  var charNumber = getRandom(65, 65 + 26); //字母的随机ASCII码
  var char = String.fromCharCode(charNumber);
  img.src = "img/letter/" + char + ".png";

  //left随机
  var left = getRandom(0, divContainer.clientWidth - img.width);
  img.style.left = left + "px";

  var letter = {
    dom: img,
    char: char,
    left: left,
    top: -img.height, //初始的top值
    speed: getRandom(100, 500), //速度: 像素/秒
    render: function() {
      this.dom.style.top = this.top + "px";
    },
    // 没调用一次该方法，字母移动一段距离
    // duration是经过的时间: 秒
    move: function(duration) {
      var dis = duration * this.speed; //计算距离
      this.top += dis;
      this.render();
    },
    kill: function() {
      //自杀
      // 从数组中移除
      var index = letters.indexOf(this); //找到字母在数组中的下标
      if (index >= 0) {
        letters.splice(index, 1);
      }
      // 移除dom元素
      this.dom.remove();
    }
  };

  letter.render();

  letters.push(letter);
}

// 根据最小值和最大值产生一个随机整数(不包含最大值)
function getRandom(min, max) {
  // Math.random()   0~1
  // Math.random() * (max - min)    0 ~ (max - min)
  // Math.random() * (max - min) + min    min ~ max
  return Math.floor(Math.random() * (max - min) + min);
}

//游戏对象，统筹规划
var game = {
  timerProduce: null, //自动产生字母的timerid
  timerMove: null, //自动移动的timerid
  isOver: false,
  //自动的，不断的，产生字母
  startProduce: function() {
    if (this.timerProduce) {
      return; //正在产生中，什么也不做
    }
    this.timerProduce = setInterval(createLetter, 500);
  },
  //停止自动产生字母
  stopProduce: function() {
    clearInterval(this.timerProduce);
    this.timerProduce = null;
  },
  //开始不断的移动所有字母
  startMove: function() {
    if (this.timerMove) {
      return;
    }
    var duration = 0.016; //间隔时间，秒
    this.timerMove = setInterval(function() {
      for (var i = 0; i < letters.length; i++) {
        var letter = letters[i]; //要移动的字母
        letter.move(duration);
        //判断该字母是不是可以消除了
        if (letter.top >= divContainer.clientHeight) {
          letter.kill();
          i--;
          //丢失
          board.addLost();
        }
      }
    }, duration * 1000);
  },
  //停止移动所有字母
  stopMove: function() {
    clearInterval(this.timerMove);
    this.timerMove = null;
  },
  gameOver: function() {
    this.stopMove();
    this.stopProduce();
    document.getElementById("over").style.display = "block";
    this.isOver = true;
  },
  restart: function() {
    //清空字母
    for (var i = 0; i < letters.length; i++) {
      var letter = letters[i];
      letter.kill();
      i--;
    }
    this.startMove();
    this.startProduce();
    board.reset();
    this.isOver = false;
    document.getElementById("over").style.display = "none";
  }
};

game.startProduce();
game.startMove();

//注册事件
window.onkeydown = function(e) {
  if (game.isOver) {
    return;
  }
  var key = e.key.toUpperCase();
  //匹配
  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    if (letter.char === key) {
      letter.kill();
      board.addScore(10);
      return; //只移除一个
    }
  }
};
