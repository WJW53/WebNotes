module.exports = {
    map: false, //关闭source-map
    // map:{
    //     inline:false//使用源码地图,但是不使用行内源码,它会用单独的文件保存
    // },
    plugins: {
        "postcss-preset-env": {
            stage: 0, //哪怕是处于草案阶段的语法，也需要转换
            preserve: false//输出文件内不显示未来的css语法
        },
        "postcss-apply": {},
        "postcss-color-function": {},
        // "stylelint": {}//vscode中如果安装了stylelint,这个就没必要了
    }
}