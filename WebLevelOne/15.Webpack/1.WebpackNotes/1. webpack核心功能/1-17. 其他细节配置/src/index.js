//1.
//var $ = require("jquery")

//A node在查找jQuery
//B webpack在查找jquery

// 选B

//------是webpack在解析关系,它管你个锤子,有require就找

//2.
// if(Math.random()<0.5){
//     require("./a");
// }
//打包结果中,包含:

//A. index 和 a
//B. index
//C. index、有可能有a

// 选A


//3.
// require("./a");

//为什么我没有书写后缀名,仍然可以找到a.js?
//答1. 因为会自动补全后缀名
//答2. 因为node会自动补全后缀名[错误!!]
//答3. 因为webpack配置中的resolve.extensions: [".js", ".json"]
// 会自动补全后缀名

//答3是正确答案