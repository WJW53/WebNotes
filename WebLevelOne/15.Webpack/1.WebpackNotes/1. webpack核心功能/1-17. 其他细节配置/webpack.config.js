var path = require("path");
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        index: "./src/index.js"
    },
    // context: path.resolve(__dirname, "src"),
    // output: {
    //     libraryTarget: "window"
    // },
    // resolve: {
    //     modules: ["abc"],
    //     extensions: [".js", ".json", ".css",".vue", ".jsx"]
    // },
    // alias: {
    //     "@": path.resolve(__dirname, 'src'),
    //     "_": __dirname
    // }
    // externals: {
    //     jquery: "$",
    //     lodash: "_"
    // },
    stats: {
        colors: true,//白色
        modules: false,//哪些模块被打包了,不让你显示了
        hash: false,
        builtAt: false//不显示构建时间
    }
}