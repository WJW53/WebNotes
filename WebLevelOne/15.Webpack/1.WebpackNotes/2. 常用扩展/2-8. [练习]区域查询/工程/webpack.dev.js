//开发环境

module.exports = {
    mode:"devlopment",
    devServer: {
        open: true,
        openPage: "list.html",//默认进入列表页
        proxy: {
            "/api": {
                target: "http://yuanjin.tech:5100/",
                changeOrigin: true
            }
        }
    }
}