var content = require("./assets/index.css");

//其实不管commonjs还是es6,都不能这样做 -- 引入css文件
//但是这边是在webpack打包过程中,它又不会运行src里的文件
//人家只是整理好所有的依赖关系
//但是上面这句话ast分析不了，那咋办呢
//写一个loader，用它来处理嘛

console.log(content); //css的源码字符串