module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // 此处是为了代理跳转
                target: 'http://29s13l8324.wicp.vip',
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