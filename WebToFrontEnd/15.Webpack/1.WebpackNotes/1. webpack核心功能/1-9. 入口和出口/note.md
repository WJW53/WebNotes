# 入口和出口 {ignore}

[toc]

![](assets/2020-01-09-15-51-07.png)

> node内置模块 - path: https://nodejs.org/dist/latest-v12.x/docs/api/path.html


## 关于 ./

1. 模块化代码中，比如require("./")，表示当前js文件所在的目录

2. `在路径处理(比如path.resolve())中，"./"表示node的运行目录(就是node在哪个目录下运行的)`

3. **全局变量__dirname: 所有情况下,都表示当前运行的js文件所在的目录,它是一个绝对路径**

`4. path是node内置的模块,path.resolve()方法会将字符串组装成绝对路径,可跨平台`

## 出口

> 入口出口都是在webpack.config.js中配置的

这里的出口 是针对 资源列表的文件名或路径的配置 (就是总hash那里)

出口通过output属性(是个对象)进行配置,差webpack文档,但是中文文档有些地方好像有些毛病

## 入口

**`入口真正配置的是chunk`**

入口通过entry进行配置

### 出口里的规则 filename：

> 用 [] 括起来, 这个规则类似于占位符

- name：chunkname
- `hash: 总的资源hash，通常用于解决缓存问题,因为只要文件内容变了,总hash一定变了`
- chunkhash: 使用chunkhash
- id: 使用chunkid，不推荐，因为生产环境和开发环境下有毛病嘛


## 示例

```js
var path = require("path");//因为是在node环境中执行,所以可以用commonjs模块化

module.exports = {
    mode: "development",
    entry: {
        // 属性名：chunk的名称， 属性值：入口模块（启动模块）
        main: "./src/index.js", 
        // 启动模块有两个,顺序依次,合并出来的js肯定还是一个
        a: ["./src/a.js", "./src/index.js"]
    },
    output: {
        //必须配置一个绝对路径，表示资源放置的文件夹，默认是dist
        path: path.resolve(__dirname, "target"),
        //为了动态适配,应用到每个entry chunk 的 assets,  :5代表只取hash的前5位   
        filename: "[name]_[chunkhash:5].js" //配置的是 合并模块后的js文件 的规则
    },
    devtool: "source-map"
}
```