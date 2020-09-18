# dom继承树

**ps:var div = document.getElementsByTagName('*');//用*是从html开始,选择所有标签**

## DOM接口(PPT讲义P82)

1. Document可以理解为构造函数,但是我们不能new它,它由系统操作。但是可以Document.prototype.abc = 'abc',
document.abc可以访问'abc'
2. 但Document.prototype不是document.prototype的直接原型,HTMLDocument才是
3. 也就是 : document --> HTMLDocument.prototype --> Document.prototype
4. Document(文档)下面分为:HTMLDocument和XMLDocument
5. Node也可以理解为构造函数,是最顶头的玩意儿,也就是Document的原型
6. 而EventTarget.prototype是Node.prototype的原型
7. 最后Object.prototype是EventTarget.prototype的原型,原型链终端
8. document.body --> <body>; document.head --> <head>; document.documentElement --> <html>
9. Element下面也是分为 : HTMLElement和XMLElement.


## DOM基本操作

1. getElementById方法定义在Document.prototype上，即Element节点上不能使用。
2. getElementsByName方法定义在HTMLDocument.prototype上,
即非html中的document以外不能使用(xml document,El ement)
3. **getElementsByTagName方法定义在Document.prototype 和 Element.prototype上**,所以常用
4. HTMLDocument.prototype定义了一些常用的属性，body,head,分别指代HTML文档中的<body><head>标签。
5. Document.prototype上定义了documentElement属性，指代文档的根元素，在HTML文档中，他总是指代<html>元素
6. getElementsByClassName、querySelectorAll、querySelector在Document,Element类中均有定义
