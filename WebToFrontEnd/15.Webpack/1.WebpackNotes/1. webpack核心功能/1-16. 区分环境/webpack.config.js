//我们配的总的配置文件

var baseConfig = require("./webpack.base.js");//公共的配置
var devConfig = require("./webpack.dev.js");
var proConfig = require("./webpack.pro.js");

module.exports = function (env) {
    if (env && env.prod) {//生产环境
        return {//混合下所有的配置属性
            ...baseConfig,
            ...proConfig
        }
    }
    else {//开发环境
        return {
            ...baseConfig,
            ...devConfig
        }
    }
}