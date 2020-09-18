const syb = Symbol();
const syb2 = Symbol("abc");

//控制台里  字符串是黑色字体,而Symbol属于红色,所以也不是字符串
console.log(syb);
console.log(syb2);

//只能用String()显示转换
const str = String(syb);
console.log(str);