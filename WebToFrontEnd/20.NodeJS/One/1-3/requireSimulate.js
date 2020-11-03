//require伪代码实现
function require(modulePath) {
    //1. 将modulePath转换为绝对路径: C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js
    //2. 判断是否该模块已有缓存
    // if(require.cache["C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js"]){
    //     return require.cache[
    //         "C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js"
    //     ].result;
    // }

    //3. 如果没有缓存: 就读取文件内容
    //4. 把内容包裹到一个函数中
    function __temp(module, exports, require, __dirname, __filename) {
        console.log("当前模块路径: ", __dirname);
        console.log("当前模块文件路径: ", __filename);

        exports.c = 3;
        module.exports = {
            a:1,
            b:2
        }
        this.m = 5;
        //这也会导出:
        //{ a: 1, b: 2 }
    }

    //6. 创建module对象
    module.exports = {};
    const exports = module.exports;
    __temp.call(module.exports, module, exports, require, module.path, module.filename);
    //所以在最开始的时候,没有操作this,exports,module.exports时,他们仨是相同的
    //但是操作后,..那很可能就不一样了

    //7. 最后 return module.exports;
}