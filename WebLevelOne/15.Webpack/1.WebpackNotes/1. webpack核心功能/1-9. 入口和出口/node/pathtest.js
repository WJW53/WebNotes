//该对象提供了大量路径处理的函数
//我们常用resolve这个函数

var path = require("path") //导出了一个对象

//组装绝对路径,可跨平台,这个方法非常好用
var result1 = path.resolve("./","child","abc","123");
console.log(result1);

var result = path.resolve(__dirname, "src");
console.log(result);