# 添加文件列表

compilation.assets; 是总的资源列表

是个对象,属性名: 文件名, 属性值是个对象有两个方法, source, size

```js
complation.assets[this.filename] = {
                source() {
                    return str;
                },
                size() {
                    return str.length;
                }
            }
```