var count = 0; //需要隐藏的内部实现

console.log("util模块执行了!只执行一次这句话,因为有模块缓存")

module.exports = {//也能这样写,但是现在这个module.exports指向了新的对象
    //这时,exports跟它已经不是同一个东西了
    abc: 123,
    getNumber: function () {
        count++;
        return count;
    }
}

exports.bcd = 456;

console.log('module.exports赋了新值',exports === module.exports);//false

    ////node.js对exports的原理:

    // (function (module) {

        ////模块开始执行前,初始化一个这个
    //     module.exports = {};


    ////初始化完成后
    //     var exports = module.exports;//两个其实是同一个
        ////改动其中一个的内容另外也就变了


    //     //这是需要隐藏的内部实现,即模块内的代码
    //     var count = 0;

    //     console.log('这里会执行');

    //     //要暴露给外部的接口
    //     exports.getNumber = function () {
    //         count++;
    //         return count;
    //     }
    //     exports.abc = 123;


    //var exports = module.exports;这句之后,上述都是模块内的代码

    //     //切记最后返回的是module.exports;
    //     return module.exports;

    // })();