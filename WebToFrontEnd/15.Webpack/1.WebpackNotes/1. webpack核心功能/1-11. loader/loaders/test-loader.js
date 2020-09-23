var loaderUtils = require("loader-utils");//这个第三方库会帮我们解析options

module.exports = function(sourceCode){
    //sourceCode : 变量 a = 1;
    console.log("test-loader运行了");
    // console.log(this);//这个this里的东西有很多
    var options = loaderUtils.getOptions(this);
    console.log(options);
    var reg = new RegExp(options.changeVar, "g");
    return sourceCode.replace(reg, "var");
}