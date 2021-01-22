import NumberTimer from "../util/number"
import appendNumber from "./appendNumber"

var n = new NumberTimer(100);//100ms

//这句是让onNumberCreated不再为null,然后进入start函数后就会运行它
//这里这个isPrime是已经返回boolean值的类型了
n.onNumberCreated = function (n, isPrime) {
    appendNumber(n, isPrime);
}

//该模块用于注册事件
var isStart = false; //默认没有开始

window.onclick = function () {
    if(isStart){
        n.stop();
        isStart = false;
    }else{
        n.start();
        isStart = true;
    }
}