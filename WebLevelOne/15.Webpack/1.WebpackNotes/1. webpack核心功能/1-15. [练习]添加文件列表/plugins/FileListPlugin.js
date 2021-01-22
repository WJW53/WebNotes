module.exports = class FileListPlugin {

    constructor(filename = "filelist.txt") {
        this.filename = filename;
    }

    apply(compiler) {
        compiler.hooks.emit.tap("FileListPlugin", complation => {
            //console.log(compilation.assets);//它的资源列表
//是个对象,属性名: 文件名, 属性值是个对象有两个方法, source, size

            var fileList = [];
            for (const key in complation.assets) {
                var content = `【${key}】
大小：${complation.assets[key].size() / 1000}KB`;
                fileList.push(content);
            }

            var str = fileList.join("\n\n");
            complation.assets[this.filename] = {
                source() {
                    return str;
                },
                size() {
                    return str.length;
                }
            }
        })
    }
}