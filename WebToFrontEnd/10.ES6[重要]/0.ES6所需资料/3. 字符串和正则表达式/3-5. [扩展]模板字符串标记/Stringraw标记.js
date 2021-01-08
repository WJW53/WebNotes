
var text1 = `abc\\nbcd`;//普通取消转义

var text = String.raw`abc\n\tbcd`;//标记取消转转义

console.log(text1);
console.log(text);