var express = require("express");
var app = new express();

app.use(express.static('./'));

app.listen(12306);