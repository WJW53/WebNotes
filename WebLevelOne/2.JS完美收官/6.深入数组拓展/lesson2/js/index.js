// server - front data  personArr
var personArr = [
    {name: '王港', src: './img/3.png', des: '颈椎不好', sex: 'm', age: 18}, 
    {name: '刘莹', src: './img/5.png',des: '我是谁', sex: 'f', age: 23}, 
    {name: '王秀莹', src: './img/4.png', des: '我很好看', sex: 'f', age: 25}, 
    {name: '刘金雷', src: './img/1.png', des: '你没有见过陌生的脸', sex: 'm', age: 15}, 
    {name: '刘飞翔', src: './img/2.png', des: '瓜皮刘', sex: 'm', age: 20}
];

// dom 感受事件发生 => 更改状态 => 影响视图
// 需求的增加 事件越来越多  状态越来越多  管理状态 合并行为

// initial variable
var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByTagName('input')[0];

store.subscribe(function () {
    //更新页面或者更新视图的一个作用
    renderPage( lastFilterArr(personArr) );
});

// 数据渲染页面
function renderPage (data) {
    // 遍历
    var htmlStr = '';
    oUl.innerHTML = '';
    data.forEach(function (ele, index, self) {
        htmlStr = htmlStr + '<li><img src="' + ele.src + '"></img><p class="name">' + ele.name + '</p><p class="des">' + ele.des + '</p></li>';
    });
    oUl.innerHTML = htmlStr;
}

renderPage(personArr);

// 添加行为
// 输入行为  

// filter folder 处理行为 
console.log(debounce)
oInput.oninput = debounce(function () {
    store.dispatch( {type: 'text', value: this.value} );
}, 500);





//btn style 

var oBtnArr = [].slice.call( document.getElementsByClassName('btn'), 0);
var lastActiveBtn = oBtnArr[2];

oBtnArr.forEach(function (ele, index, self) {
    ele.onclick = function () {
        changeActive(this);
        store.dispatch( {type: 'sex', value: this.getAttribute('sex')} );
    }
});

function changeActive (curActiveBtn) {
    curActiveBtn.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = curActiveBtn;
}

