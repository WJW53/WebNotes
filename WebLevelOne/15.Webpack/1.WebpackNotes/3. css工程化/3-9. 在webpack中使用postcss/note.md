# 在webpack中使用postcss

基本同less在webpack中的使用一致

```shell
npm i -D webpack webpack-cli
npm i -D css-loader style-loader 
npm i -D postcss postcss-loader
```

记得配置postcss.config.js, .browserslistrc, .stylelintrc(可选)

```js
//webpack.config.js
module.exports={
    module: {
        rules: [
            {//=true可以省略
                test: /\.pcss$/, use: ["style-loader", "css-loader?modules=true", "postcss-loader"]
            }
        ]
    }
}
```

