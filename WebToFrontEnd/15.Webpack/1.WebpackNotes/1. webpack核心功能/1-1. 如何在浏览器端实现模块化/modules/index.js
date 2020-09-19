// import a from "./a.js"

// console.log("index")
var fs = require("fs"); //内置模块fs，文件处理
var path = require("path");
// const { pathToFileURL } = require("url");

//脱离了浏览器环境所以这不是ajax,这就是读取本地文件

//path也是内置模块,可将__dirname和后面的字符串拼接成那个文件的绝对路径
var abPath = path.resolve(__dirname, "./test.txt");
// console.log(abPath);


var content = fs.readFileSync(abPath, {//因为这里只支持读绝对路径
    encoding: "utf-8"
})

console.log(content);