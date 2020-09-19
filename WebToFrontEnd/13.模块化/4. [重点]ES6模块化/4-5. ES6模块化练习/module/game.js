//按键模块

import { playerMove, isWin } from "./play.js";
import showUI from "./ui.js";

showUI();
var over = false;//游戏是否结束

//完成整个游戏

window.onkeydown = function (e) {
    // console.log(e.key);//测试上下左右对应什么字符串
    if (over) {
        return;
    }
    var result = false;
    if (e.key === "ArrowUp") {
        result = playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        result = playerMove("down");
    }
    else if (e.key === "ArrowLeft") {
        result = playerMove("left");
    }
    else if (e.key === "ArrowRight") {
        result = playerMove("right");
    }

    if (result) {//移动成功就重新绘制地图
        showUI();
        if (isWin()) {
            console.log("游戏胜利！");
            over = true;
        }
    }
}