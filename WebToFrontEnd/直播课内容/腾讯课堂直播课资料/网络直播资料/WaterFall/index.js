// 当前有没有请求在触发
var lock = false;
function getData() {
    // 判断当前是否有请求在执行  如果有不进行下次数据请求
    if (lock) {
        return ;
    }
    // 如果没有则进行数据请求  上锁
    lock = true
    ajax({
        url: './data.json',
        type: 'get',
        data: '',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            renderDom(data)
            // 当数据返回之后  打开锁
            lock = false;
        },
        async:  true
    })
}

// 将数据渲染到页面上
function renderDom(data) {
    var oLi = document.getElementsByClassName('col');
    var imgDomWidth = oLi[0].offsetWidth - 20 - 20;
    console.log(imgDomWidth);
    data.forEach(function (item, index) {
        var itemDom = document.createElement('div');
        itemDom.className = 'item';
        /**
         *  item.width           imgDomWidth
         * -------------    =  ----------------
         *  item.height           image.height
         */
        var oImg = new Image();
        oImg.height = (imgDomWidth * item.height) / item.width;
        oImg.src = item.img;
        var oP = document.createElement('p');
        oP.innerText = item.desc;
        itemDom.appendChild(oImg);
        itemDom.appendChild(oP);
        // 按顺序一行一行插入图片
        var minIndex = getMinLi().minIndex;
        console.log(itemDom)
        oLi[minIndex].appendChild(itemDom)
    })
}

// 查找最短列
function getMinLi() {
    var oLi = document.getElementsByClassName('col');
    var minIndex = 0;
    var minHeight = oLi[0].offsetHeight;
    for (var i = 0; i < oLi.length; i++) {
        if (oLi[i].offsetHeight < minHeight) {
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minIndex: minIndex,
        minHeight: minHeight
    }
}

getData()

window.onscroll = function (e) {
    console.log('=====',  document.documentElement.scrollTop)
    // 获取滚动条滚动的距离
    var scrollTop = document.documentElement.scrollTop;
    var clientHeight = window.innerHeight;
    var minHeight = getMinLi().minHeight;
    console.log(minHeight, scrollTop, clientHeight)
    // console.log(window.innerHeight, this.document.documentElement.clientHeight)
    // console.log(window.pageYOffset, document.documentElement.scrollTop)
    if (minHeight < scrollTop + clientHeight) {
        getData()
    }
}