//写法一: 
// define(["b", "a"], function (b, a) {
//     //等b.js和a.js加载完后运行该函数,因为是异步嘛,函数是回调函数
//     //模块内部的代码
//     console.log(b, a);

//     return undefined;//一样,想导出啥就返回啥
// })


define((require, exports, module) => {
    var a = require("a"),
        b = require("b");
    console.log(b, a);
})