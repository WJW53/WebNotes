// 导出当前目录中所有的模块,不管这个目录下是否删除或者新增模块,这样写都可以解决

const context = require.context("./", true, /\.js$/);
for (const key of context.keys()) {
  if (key !== "./index.js") {
    let filename = key.substr(2);//去掉./
    filename = filename.substr(0, filename.length - 3);//去掉.js
    exports[filename] = context(key);
  }
}


// module.exports = "This is : ./src/index.js";