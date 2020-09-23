var path = require("path");//因为是在node环境中执行,所以可以用commonjs模块化

module.exports = {
    mode: "development",
    entry: {
        //属性名：chunk的名称， 属性值：入口模块（启动模块）
        main: "./src/index.js", 
        //启动模块有两个,顺序依次,合并出来的js肯定还是一个
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