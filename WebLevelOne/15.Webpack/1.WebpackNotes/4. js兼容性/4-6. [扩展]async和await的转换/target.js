"use strict";

//我们不断地简化了转化后的代码,如果需要原始转化代码,可以去babel官网试一试那里自行测试

function asyncGeneratorStep(gen, resolve, reject, _next, arg) {
    try {
        var info = gen.next(arg);
        var value = info.value;//是一个Promise对象
    } catch (error) {
        reject(error);
        return;
    }

    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(data => {
            _next(data);
        });
    }
}


function A() {//这个Promise是babel模拟的API,不用管这里
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(3);
        }, 1000);
    });
}

function B() {//核心思想在于B这边
    var fn = function* () {//我们改了这里的代码,实际上,这里原先是底层实现的生成器,很复杂
        const b = yield A();
        const c = yield A();
        return b + c;
    };
    return new Promise(function (resolve, reject) {
        var gen = fn();
        function _next(value) {//生成器完成了,Promise就完成了
            // asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", err);
            asyncGeneratorStep(gen, resolve, reject, _next, value);
        }
        // function _throw(err) {
        //     asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        // }
        _next(undefined);
    });
}

B().then(function (data) {
    return console.log(data);
});