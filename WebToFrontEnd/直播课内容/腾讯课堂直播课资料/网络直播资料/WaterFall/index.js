// 当前有没有请求在触发
var lock = false;
function getData() {
    // 判断当前是否有请求在执行  如果有不进行下次数据请求
    if (lock) {
        return ;
    }
    // 如果没有则进行数据请求  上锁
    lock = true;
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

// 将数据渲染到页面上，注意图片加载是异步，而我们其他代码是同步
// 故可能那会li的高度可能是图片还没加载完毕的时候，
// 所以高度并不准确，故而添加的列也会不正确，最后图片都过过来了，就会发现空白真多
// 解决方案有两种，第一种就是监听，等每行图片加载完毕再添加新dom结构，但很耗费性能
// 故推荐第二种，预留出DOM结构高度
// 如果静态样式里就先引入了几张图片的话就会有bug,得把静态的那几张也预留出来高度
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
        // console.log(oImg.height,oImg.width);
        var oP = document.createElement('p');
        oP.innerText = item.desc;
        itemDom.appendChild(oImg);
        itemDom.appendChild(oP);
        // 按顺序一行一行插入图片
        var minIndex = getMinLi().minIndex;
        console.log(itemDom);
        oLi[minIndex].appendChild(itemDom);
    })
}

// 查找最短列,每次把图片插入最短的那一列,尽量使得空白最少
function getMinLi() {
    var oLi = document.getElementsByClassName('col');
    var minIndex = 0;
    var minHeight = oLi[0].offsetHeight;//li的高度,包括padding、border、水平滚动条
    for (var i = 0; i < oLi.length; i++) {
        if (oLi[i].offsetHeight < minHeight) {//找到并记录
            minHeight = oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minIndex: minIndex,
        minHeight: minHeight
    }
}

getData();


//如果最短列的高度小于(滚动的高度加上视口的高度),就说明出现空白就要继续加载图片
window.onscroll = function (e) {
    console.log('=====',  document.documentElement.scrollTop)
    // 获取滚动条滚动的距离
    var scrollTop = document.documentElement.scrollTop;//滚动的高度是document身上的
    var clientHeight = window.innerHeight;
    var minHeight = getMinLi().minHeight;
    console.log(minHeight, scrollTop, clientHeight)
    // console.log(window.innerHeight, this.document.documentElement.clientHeight)
    // console.log(window.pageYOffset, document.documentElement.scrollTop)
    if (minHeight < scrollTop + clientHeight) {
        getData();
    }
}