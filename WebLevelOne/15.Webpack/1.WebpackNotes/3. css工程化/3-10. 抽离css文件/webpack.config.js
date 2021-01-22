const HtmlWebpackPlugin = require("html-webpack-plugin")
var { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: "development",
    entry: {//多个入口时
        main: "./src/index.js",
        other: "./src/other.js"
    },
    output: {
        filename: "js/[name].[chunkhash:5].js",
        //避免loader那个最终不知道静态资源的具体路径的问题, / 代表dist下的根目录
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader?modules"]
            },
            {
                test: /\.jpg$/, use: {
                    loader: "file-loader",
                    options: {
                        name: "img/[hash:5].[ext]"
                    }
                }
            }
        ]
    },
    devServer: {
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:5].css"
        })
    ]
}