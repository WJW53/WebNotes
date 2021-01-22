module.exports = {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(png)|(jpg)|(gif)$/,
                use: [{
                    loader: "./loaders/img-loader.js",
                    options: {
                        limit: 10000, //10000字节以上使用图片，3000字节以内使用base64格式
                        filename: "img-[contenthash:5].[ext]"
                    }
                }]
            }
        ]
    }
}