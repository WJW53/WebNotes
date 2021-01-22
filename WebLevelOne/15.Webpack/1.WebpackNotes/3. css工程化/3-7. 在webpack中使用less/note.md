# 在webpack中使用less

```shell
npm i -D less-loader less
```

`less----less-loader---->css----css-loader(配置modules->解决不同文件间合并后的类名冲突)---->js----style-loader---->放置到head里的style`

```js
rules:[{test:/\.less$/,["style-loader","css-loader?modules=true","less-loader"]}]
```
