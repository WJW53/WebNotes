# AMD

- amd/cmd 规范，现在了解下就行了，基本不用了，人也不更新了

全称是Asynchronous Module Definition，即 异步模块加载机制

require.js实现了AMD规范

`在AMD中，导入和导出模块的代码，都必须放置在define函数中`

```js

define([依赖的模块列表], function(模块名称列表){
    //模块内部的代码
    return 导出的内容;
})

```

加载入口文件的方式

```js
<!-- require.js(先加载) 会读取 index.js这个入口文件 -->
    <script data-main="./js/index.js" src="./js/require.js"></script>
```

data-main 是自定义属性

- 为了以前习惯于commonjs的人,amd又搞了个新的规范

```js
define(function(require, exports, module){
    var xx = require("xx");
    //

    module.exports =  {...};
});

```