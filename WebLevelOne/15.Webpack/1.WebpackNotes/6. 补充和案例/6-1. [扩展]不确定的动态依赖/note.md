# 不确定的动态依赖

`仅在webpack运行过程中有效`

```js
//index.js
// // const module = document.getElementById("txt").value;

// // if (Math.random() < 0.5) {
    ////如果直接require(module);//那webpack就不敢干活了,不导入
// //   // const a = require("./utils/" + module); // 动态依赖,它会把这个目录下的文件全部打包
// //   // console.log(a);
// // }

//// 上述实际就是下述过程:
//// 参数1：目录，哪个目录中的模块需要添加到打包结果
//// 参数2：是否递归寻找子目录，如果为true，表示需要寻找子目录
//// 参数3：正则表达式，凡是匹配的才会加入到打包结果
// const context = require.context("./utils",true,/\.js$/);//哪个目录,是否递归打包子目录,匹配哪些文件.返回的结果是一个函数: module.exports = webpackContext;
// console.log(context("./a.js"));
// console.log(context.keys());


//因为默认导出的是utils下面的index.js
const util = require("./utils");//袁老大NB,这种就很容易维护代码了,不确定的动态依赖,不能使用if的时候,就这么用
//精髓代码在最下面
console.log(util);//{a:"a",b:"b",c:"c",d:"d"}
```

```js
var map = {
    "./a.js": "./src/utils/a.js",
    "./b.js": "./src/utils/b.js",
    "./c.js": "./src/utils/c.js",
    "./index.js": "./src/utils/index.js",
}
function webpackContext(req){
    var id = webpackContextResolve(req);
    return __webpack_require__(id);//最后还是去找那个对应的模块了
}
function webpackContextResolve(req){
    if(!__webpack_require__.o(map,req)){
        var e = nwe Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND''
        throw e;
    }
    return map[req];
}
```

- 这样写极易维护代码
```js
//./utils/index.js
// 导出当前目录中所有的模块,不管这个目录下是否删除或者新增模块,这样写都可以解决
const context = require.context("./", true, /\.js$/);
for (const key of context.keys()) {
  if (key !== "./index.js") {
    let filename = key.substr(2);
    filename = filename.substr(0, filename.length - 3);
    exports[filename] = context(key);
  }
}
//所以这个index.js最终的导出结果就是{a:"a",b:"b",c:"c",d:"d"}
```