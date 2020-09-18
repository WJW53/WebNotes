/**
 * 返回一个随机的整数，介于min到max之间
 * @param {*} min 
 * @param {*} max 取不到
 */
function getRandom(min, max) {
    // Math.random()  0~1 小数
    // Math.random() * (max - min)   0~(max - min) 小数
    // Math.random() * (max - min) + min   min ~ max 小数
    // Math.floor(...)  min~max 整数  取不到max
    return Math.floor(Math.random() * (max - min) + min);
}

// 为9的倍数位置，找到一个随机的图片
// 确定结果图片的数字
var resultIndex = getRandom(0, 16);

//获取对应的元素
var imgCenter = document.getElementById("imgCenter");
var imgResult = document.getElementById("imgResult");
var divTable = document.getElementById("divTable");
var divRound = document.getElementById("divRound");

imgResult.src = "img/values/" + resultIndex + ".png";

/**
 * 初始化表格区域
 */
function initTable() {
    for (var i = 0; i < 100; i++) {
        //每循环一次，产生一个div
        /*
            <div>
                <span>?</span><img src="img/values/?.png" alt="">
            </div>
        */
        var div = document.createElement("div");
        div.className = "item";
        if (i % 9 === 0) {
            //这个时候，图片要特殊处理
            div.innerHTML = '<span>' + i + '</span><img src="img/values/' + resultIndex + '.png">';
        }
        else {
            div.innerHTML = '<span>' + i + '</span><img src="img/values/' + getRandom(0, 16) + '.png">';
        }
        divTable.appendChild(div);
    }
}

initTable();

//点击事件只希望触发一次
divRound.onclick = function () {
    divRound.onclick = null;
    // css3变形：顺时针旋转1800度
    divRound.style.transform = "rotate(1800deg)";
    // 过渡完成后触发的事件
    divRound.addEventListener("transitionend", function () {
        //中间一开始的图片隐藏
        imgCenter.style.display = "none";
        //中间结果图片显示
        imgResult.style.display = "block";
    })

    // setTimeout(function () {
    //     //中间一开始的图片隐藏
    //     imgCenter.style.display = "none";
    //     //中间结果图片显示
    //     imgResult.style.display = "block";
    // }, 3000)
}