var express = require("express");

var app = new express();

app.use(express.static("./page"));

app.listen(12306);//端口号尽量大于8000、或者等于80
//80端口的话就可以不写了,因为默认访问80端口

//express框架 默认访问index.html

console.log('ok!');