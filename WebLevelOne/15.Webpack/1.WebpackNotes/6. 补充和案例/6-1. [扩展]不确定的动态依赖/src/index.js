// // const module = document.getElementById("txt").value;

// // if (Math.random() < 0.5) {
    ////如果直接require(module);//那webpack就不敢干活了,不导入
// //   // const a = require("./utils/" + module); // 动态依赖,它会把这个目录下的文件全部打包
// //   // console.log(a);
// // }

////上述实际就是下述过程:
// // 仅在webpack运行过程中有效
// // 参数1：目录，哪个目录中的模块需要添加到打包结果
// // 参数2：是否递归寻找子目录，如果为true，表示需要寻找子目录
// // 参数3：正则表达式，凡是匹配的才会加入到打包结果
// const context = require.context("./utils", true, /\.js$/);
// const a = context("./a.js");
// console.log(a);
// console.log(context.keys());//打印找到的所有的模块,是一个数组

const util = require("./utils");//因为默认导出的是它下面的index.js
console.log(util);//{a:"a",b:"b",c:"c",d:"d"}

