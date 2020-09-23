import radColor, { getRandom } from "../util/radColor"
import $ from "jquery";

var divContainer = $("#divContainer");
var divCenter = $("#divCenter");

export default function (n, isPrime) {
    var span = $("<span>").text(n);
    if (isPrime) {//运行到这里已经是boolean值了
        var color = radColor();
        span.css("color", color);
        createCenterPrimeNumber(n, color)
    }
    divContainer.append(span);
    //产生中间的数字
    createCenterNumber(n);
}

function createCenterNumber(n) {
    divCenter.text(n)
}

/**
 * 在中间产生一个素数 并 设置样式
 * @param {*} n 
 */
function createCenterPrimeNumber(n, color) {
    var div = $("<div>").addClass("center").css("color", color).text(n);
    $("body").append(div);

    //加入了div后，强行让页面重新渲染
    //只要读取某个元素的位置或尺寸信息，则会导致浏览器重新渲染 reflow,还有这操作?
    getComputedStyle(div[0]).left;
    div.css("transform", `translate(${getRandom(-200, 200)}px, ${getRandom(-200, 200)}px)`).css("opacity", 0)

}