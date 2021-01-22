//重点!因为这里是loader处理阶段，node环境,此时根本没有页面(HTML)
//所以不存在document,xxxx的
//所以得 返回模板字符串吧

//loader是个函数
//sourceCode是 文件源代码,这里就是那个css文件的代码内容,是个字符串
//经过loader处理后,我们返回JS代码
module.exports = function (sourceCode) {
    //这里的字符串嵌套要搞清楚

    var code = `var style = document.createElement("style");
    style.innerHTML = \`${sourceCode}\`;
    document.head.appendChild(style);
    module.exports = \`${sourceCode}\``;

    // console.log(code);
    return code;
}