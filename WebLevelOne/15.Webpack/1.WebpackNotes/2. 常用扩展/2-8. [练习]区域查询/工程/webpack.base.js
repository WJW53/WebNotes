//公共配置
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
        list: "./src/list/index.js",//因为两个页面,我们想分开写,所以就这么搞,两个入口
        detail: "./src/detail/index.js"
    },
    output: {
        filename: "scripts/[name].[chunkhash:5].js"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    stats: {
        modules: false,
        colors: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/list.html",
            filename: "list.html",
            chunks: ["list"]//控制script标签的src,各用各的
        }),
        new HtmlWebpackPlugin({
            template: "./public/detail.html",
            filename: "detail.html",
            chunks: ["detail"]
        }),
        new CopyWebpackPlugin([
            { from: './public', to: './' }//把public下的资源copy打包到dist目录中
        ])
    ]
}