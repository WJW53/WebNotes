const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        home: "./src/index.js",
        a: "./src/a.js"
    },
    output: {
        filename: "scripts/[name].[chunkhash:5].js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "home.html",
            chunks: ["home"]
            //因为一个入口文件就是一个chunk,所以这里可以直接使用
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "a.html",
            chunks: ["a"]
        })
    ]
}