const text = "Hello World!!!";

const reg = /W\w+/;//包含W开头后面任意字符1次或多次
const reg1 = /W\w+/y;//粘连标记

console.log(reg.test(text),reg.lastIndex);//true可以匹配,  0
//当方法 exec() 或 test() 再也找不到可以匹配的文本时，它们会自动把 lastIndex 属性重置为 0。
reg1.lastIndex = 6;
console.log(reg1.test(text));//false,不可以匹配. 修改lastIndex=6后才可以正确匹配
