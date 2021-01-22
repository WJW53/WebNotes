# 处理图片

动态图片：

通过ajax-->服务器-->{
    name: "张胜男",
    headUrl: "xxxxxx"
}


静态图片有两种：

1. 页面中直接使用img元素引用,放在dist目录下即可

2. 我们利用js生成的
    - 这节课讲的就是如何利用loaders解决这个问题


```js
//这样给的source就不是字符串了,而是二进制
loader.raw = true;//给loader函数添加一个静态属性,代表该loader要处理的是原始数据

function getBase64(buffer) {//得到文件base64编码
    return "data:image/png;base64," +  buffer.toString("base64");
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

```


