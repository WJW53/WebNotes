module.exports = class MyPlugin {
    apply(compiler) {
// //在这里注册事件，类似于window.onload 或者是jQuery里的ready事件：$(function(){})
        compiler.hooks.done.tap("MyPlugin-done", function (compilation) {
            //事件处理函数
            console.log("编译完成");
        });

        //如何注册compilation的钩子函数
        // compiler.hooks.beforeRun.tap("MyPlugin2", function (compilation) {
        //     compilation.hooks.xxxx.;
        // });
    }
}