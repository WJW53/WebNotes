module.exports = {
	publicPath:"./",

    devServer: {
			disableHostCheck: true,
        proxy: {
            '/api': {
                // 此处是为了代理跳转
                target: 'http://29s13l8324.wicp.vip',
                ////target: "'http://localhost:8081/'",
                // 允许跨域
                changeOrigin: true,
                ws: true,//是否允许websocket
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}