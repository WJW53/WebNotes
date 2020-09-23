module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /index\.js$/, //正则表达式，匹配模块的路径
                use: [{
                    loader: "./loaders/test-loader?changeVar=未知数",
                    options: {
                        changeLet: "变量"    
                    }
                }, "./loaders/loader2"] //匹配到了之后，使用哪些加载器
            }, //规则1

            // ./src/a.js会匹配到这个loader3,loader4
            {
                test: /[0-9]\.js$/, //正则表达式，匹配模块的路径
                use: ["./loaders/loader3", "./loaders/loader4"] //匹配到了之后，使用哪些加载器
            }, //规则2
        ], //模块的匹配规则
        noParse: [

        ]//是否不要解析某个模块
    }
}