//最简单的写法,define(123);想导出什么,括号里就填写什么
//如果导出内容是经过一系列过程,就写个函数,函数的返回值就是导出内容

// define(function () {
//     //模块内部的代码
//     console.log('b模块的内部代码');
//     var a = 1;
//     var b = 123;

//     return {
//         name: "b模块",
//         data: "b模块的数据"
//     }
// })



define(function (require, exports, module) {
    //模块内部的代码
    console.log("b模块的内部代码")
    module.exports = {
        name: "b模块",
        data: "b模块的数据"
    }
})

