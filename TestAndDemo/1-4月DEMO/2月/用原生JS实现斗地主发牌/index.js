/**
 * 相关的位置
 */
var positions = {
    // 顶部的扑克牌
    top: {
        firstLeft: 297.5, //第一张的横坐标
        firstTop: 0, //第一张的纵坐标
        horizonStep: 150, //相邻扑克牌之间，横向的偏移距离
        verticalStep: 0 //相邻扑克牌之间，纵向的偏移距离
    },
    left: {
        firstLeft: 0, //第一张的横坐标
        firstTop: 35, //第一张的纵坐标
        horizonStep: 0, //相邻扑克牌之间，横向的偏移距离
        verticalStep: 30 //相邻扑克牌之间，纵向的偏移距离
    },
    right: {
        firstLeft: 895, //第一张的横坐标
        firstTop: 35, //第一张的纵坐标
        horizonStep: 0, //相邻扑克牌之间，横向的偏移距离
        verticalStep: 30 //相邻扑克牌之间，纵向的偏移距离
    },
    bottom: {
        firstLeft: 207.5, //第一张的横坐标
        firstTop: 550, //第一张的纵坐标
        horizonStep: 30, //相邻扑克牌之间，横向的偏移距离
        verticalStep: 0 //相邻扑克牌之间，纵向的偏移距离
    },
    center: { //中心点
        firstLeft: 452.5, //第一张的横坐标
        firstTop: 280, //第一张的纵坐标
        horizonStep: -0.1887, //相邻扑克牌之间，横向的偏移距离
        verticalStep: -0.1887 //相邻扑克牌之间，纵向的偏移距离
    }
}

var divGame = document.getElementById("divGame");

/**
 * 创建一张扑克牌
 * @param face 牌面   1~13的数字，14表示小王，15表示大王
 * @param color 花色  1~4的数字，小王大王花色固定为1
 */
function createPoker(face, color) {
    var poker = {
        face: face,
        color: color,
        left: 0, //横坐标
        top: 0, //纵坐标
        dom: document.createElement("img") //该扑克牌对应的dom元素
    }; //扑克牌对象

    poker.value = poker.face; //该数字表示牌的大小，主要用于排序
    if (poker.face === 1) {
        //牌面为2
        poker.value = 14;
    }
    if (poker.face === 2) {
        //牌面为2
        poker.value = 15;
    }
    if (poker.face === 14 || poker.face === 15) {
        //小王或大王
        poker.value = poker.face + 2;
    }

    //处理dom对象
    poker.dom.src = "img/" + poker.face + "_" + poker.color + ".jpg"; //图片路径
    divGame.appendChild(poker.dom);

    //通过该函数，可以设置扑克牌的位置
    poker.setPosition = function (newLeft, newTop) {
        poker.left = newLeft;
        poker.top = newTop;
        poker.dom.style.left = newLeft + "px";
        poker.dom.style.top = newTop + "px";
    }

    //通过该函数，可以设置扑克牌的z-index
    poker.setZIndex = function (newZIndex) {
        poker.dom.style.zIndex = newZIndex;
    }

    return poker;
}

/**
 * 创建一整副扑克牌，返回一个扑克牌的数组
 */
function createAllPokers() {
    var pokers = []; //一整副扑克牌
    for (var face = 1; face <= 13; face++) { //循环牌面
        for (var color = 1; color <= 4; color++) { //循环花色
            var p = createPoker(face, color); //创建一张扑克牌
            pokers.push(p); //将扑克牌加入到数组
        }
    }
    //加入大小王
    pokers.push(createPoker(14, 1));
    pokers.push(createPoker(15, 1));
    //洗牌
    pokers.sort(function () {
        return Math.random() - 0.5;
    })
    //设置位置
    setPositions(pokers, "center");

    //设置所有扑克牌的动画延迟
    for (var i = 0; i < pokers.length; i++) {
        //设置每张牌的动画延迟
        pokers[i].dom.style.transitionDelay = 0.25 * (53 - i) + "s"
    }

    return pokers;
}

/**
 * 设置一叠牌的位置
 * @param pokers 数组，一叠牌
 * @param direction 这一叠牌整体的方向  left right top bottom center
 */
function setPositions(pokers, direction) {
    var pos = positions[direction] //取出该方向上所有的位置信息
    for (var i = 0; i < pokers.length; i++) {
        //循环每一张牌
        var p = pokers[i];
        var left = pos.firstLeft + pos.horizonStep * i;
        var top = pos.firstTop + pos.verticalStep * i;
        p.setPosition(left, top);
        p.setZIndex(i);
    }
}

var pokers = createAllPokers();

/**
 * 发牌
 */
function deal() {
    var players = [
        {
            direction: "bottom",
            pokers: []
        },
        {
            direction: "left",
            pokers: []
        },
        {
            direction: "right",
            pokers: []
        },
    ];//玩家
    var nextIndex = 0; //下一次发牌，给哪个玩家
    //发51张牌给玩家
    for (var i = 0; i < 51; i++) { //发51次
        var player = players[nextIndex]; //拿到接收牌的玩家对象
        var p = pokers.pop(); //移除数组的最后一项（顶端的牌）
        player.pokers.push(p); //将该牌添加到玩家的数组中
        //重新设置位置
        setPositions(player.pokers, player.direction);

        //轮换 0~2
        nextIndex++;
        if (nextIndex === 3) {
            nextIndex = 0;
        }
    }
    var topPokers = []; //剩余的三张牌
    topPokers.push(pokers.pop());
    topPokers.push(pokers.pop());
    topPokers.push(pokers.pop());
    setPositions(topPokers, "top");
    //等发完牌之后，给每个玩家手中的牌排序
    setTimeout(function () {
        for (var i = 0; i < players.length; i++) {
            var player = players[i]; //每个玩家
            //排序之前，先消除延迟
            for (var j = 0; j < player.pokers.length; j++) {
                //循环每一张扑克牌
                player.pokers[j].dom.style.transitionDelay = "0s";
            }
            player.pokers.sort(function (a, b) {
                return b.value - a.value; //比较扑克牌中的value属性
            })
            //重新设置每个玩家手中牌的位置
            setPositions(player.pokers, player.direction);
        }
    }, 250 * 54)
}

//点击界面后，发牌
window.onclick = function () {
    deal();
    window.onclick = null; //发牌仅一次
}