(function () { //代码块 

    var p = document.getElementsByTagName('p')[0];
    var bodyNode = document.getElementsByTagName('body')[0];
    var hrefStr = window.location.href;//获取当前的url
    if (hrefStr.indexOf('#clock') > 0) {//检索url里面是否有“#clock”,
        getClock();//函数执行 指针对准 css动画
        bodyNode.removeChild(p);
    } else {
        p.onclick = function () {
            getClock();//函数执行 指针对准 css动画
            bodyNode.removeChild(p);
        }
    }

    setTimeout(function(){
        window.location.reload();
    },20000000)

    function getClock() {
        var hoursNode = document.getElementsByClassName('hours')[0],
            minuteNode = document.getElementsByClassName('minute')[0],
            secNode = document.getElementsByClassName('second')[0];


        var date = new Date(); //创建时间对象 
        var h = date.getHours(); //获取当前的时间种的小时数
        h = h > 12 ? (h - 12) : h; //变成12小时制
        var min = date.getMinutes(); //获取当前的时间种的分钟数
        var sec = date.getSeconds(); //获取当前的时间种的秒数

        console.log(h, min, sec);
        //转化成角度呢？

        var sec_deg = sec * 6;
        var min_deg = min * 6;
        var hours_deg = h * 30;

        //对应的角度 
        hoursNode.style.transform = "rotate(" + hours_deg + "deg)";
        minuteNode.style.transform = "rotate(" + min_deg + "deg)";
        secNode.style.transform = "rotate(" + sec_deg + "deg)";
    }





})()