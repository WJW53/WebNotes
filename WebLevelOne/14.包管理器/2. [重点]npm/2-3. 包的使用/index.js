// var _ = require("./node_modules/lodash/index.js");

//// 或者直接这么写

// var _ = require("lodash");

// // console.log(_);//lodash污染的是 _ 这个全局变量
// var arr = _.compact([1, 3, 0, "", false, 5]);//只保留数组中判定为真的内容
// console.log(arr);//[ 1, 3, 5 ]



// // 首先，查看当前目录是否有 a.js
// // 把a当作文件夹，并且，把该文件夹当作一个包，
// // 看该包中是否有package.json文件，有就读取main字段
// // 没有就找它的index.js

var a = require("./a");

console.log(a);