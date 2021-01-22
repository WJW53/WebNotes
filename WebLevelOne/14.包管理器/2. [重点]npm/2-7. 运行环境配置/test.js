//读取package.json文件中的版本号

const packageConfig = require("./package.json");
console.log(packageConfig.version);
console.log(packageConfig.a);