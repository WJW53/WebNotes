//vue-cli配置文件, 但其实90%的配置都是webpack配置

module.exports = {
    //开发服务器 的配置
    devServer: {
        proxy:{
            //配置代理
            "x":{//凡是以/x开头的请求, 进行代理
                target: "https://api.bilibili.com",
                onProxyReq(onProxyReq){
                    //
                    onProxyReq.setHeader("origin","https://www.bilibili.com");
                    //
                    onProxyReq.setHeader("referer","https://www.bilibili.com/v/channel?spm_id_from=333.851.b_7072696d61727950616765546162.4");
                }
            }
        }
    }
}