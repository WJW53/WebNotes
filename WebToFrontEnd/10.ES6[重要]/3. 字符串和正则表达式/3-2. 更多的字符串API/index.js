const text = "你是个狠狼人";

const result = text.includes("狠",3);//第2个参数是指定位置开始查找
console.log(result);

console.log("是否以'你是'开头: ", text.startsWith("你是"));
console.log("是否以'狼人'结尾: ", text.endsWith("狼人"));
console.log("重复3次:", text.repeat(3));