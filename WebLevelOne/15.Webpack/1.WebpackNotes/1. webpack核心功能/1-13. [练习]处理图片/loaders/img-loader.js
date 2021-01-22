//
var loaderUtil = require("loader-utils");

function loader(buffer) {//给的是 buffer----2进制格式
    // console.log(buffer);
    console.log("文件数据大小: (字节)", buffer.length);
    // var content = getBase64(buffer);
    //var content = getFilePath.call(this,buffer);//这个this是webpack配置loader那里

    //按文件大小选择配置方式    这里采用解构写法
    var { limit = 1000, filename = "[contenthash].[ext]" } = loaderUtil.getOptions(this);
    if (buffer.byteLength >= limit) {
        var content = getFilePath.call(this, buffer, filename);
    }
    else {
        var content = getBase64(buffer);
    }

    // console.log(content);
    return `module.exports = \`${content}\``;
}

//这样给的source就不是字符串了,而是二进制
loader.raw = true;//给loader函数添加一个静态属性,代表该loader要处理的是原始数据


module.exports = loader;//不能直接把整个函数赋值在这里,那样就不能在这条语句之外使用loader


function getBase64(buffer, name) {
    return "data:image/png;base64," + buffer.toString("base64");
}

function getFilePath(buffer,name) {
    //这个方法会生成一个文件名字
    var filename = loaderUtil.interpolateName(this, name, {
        content: buffer
    });
    // console.log(filename);
    this.emitFile(filename, buffer);//直接向最终资源中加入这个文件(不会用chunk)
    return filename;//同时也是文件路径,在dist文件夹下嘛,同级的
}