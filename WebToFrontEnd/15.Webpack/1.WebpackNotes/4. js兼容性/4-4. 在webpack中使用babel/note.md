# 在webpack中使用babel

```shell
npm i -D webpack webpack-cli @babel/core babel-loader
npm i -D @babel/preset-env
```

在webpack.config.js中
```js
module.exports = {
    mode: "devlepment",
    devtool: "source-map",
    module:{
        rules:[
            {test:/\.js$/, use:"babel-loader"}
        ]
    }
}
```

直到这,仍然不能运行,为啥?废话,babel需要引入预设、插件才能解析转换js代码

然后配置.babelrc和.browserslistrc文件,忘记了就去预设那个文件夹里复制来


如果要对特殊的语法转换(Promise, async等),记得安装这俩:

```shell
npm i -D core-js regenerator-runtime
```