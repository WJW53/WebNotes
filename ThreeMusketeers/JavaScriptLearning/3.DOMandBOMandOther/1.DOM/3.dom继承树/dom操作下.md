# dom操作(下)

## 课堂练习

1. 遍历元素节点树，要求不能用children属性
2. 封装函数，返回元素e的第n层祖先元素
3. 封装函数，返回元素e的第n个兄弟节点，n为正，返回后面的兄弟节点，n为负，返回前面的，n为0,返回自己。
4. 编辑函数，封装children功能，解决以前部分浏览器的兼容性问题 
5. 自己封装hasChildren()方法，不可用children属性


## 增插删替换

1. 增
- document.createElement('a');//创建一个a标签(元素节点),但目前还是在JS手里拿着,并不在HTML中
- document.createTextNode();//创建文本结点
- document.createComment();//创建注释节点
- document.createDocumentFragment();//创建文档碎片节点

2. 插---**剪切操作,常用**
- ParentNode.appendChild();//**任何元素结点都有appendChild方法**,**类似于push方法**
- ParentNode.insertBefore(a, b);//**ParentNode insert a before b;**

3. 删---
- parent.removeChild();//**剪切操作**
- child.remove();//**真的销毁,返回undefined**

4. 替换
- parent.replaceChild(new, origin);//拿new的标签替换origin


## Element节点的一些属性和方法

- Element节点的一些属性
1. innerHTML    //**可读写,单独引用就是读操作,赋值等操作后就会覆盖原有的**
2. innerText(火狐不兼容) / textContent(老版本IE没有)  //**使得文本内容可读写,但写入一定要小心**

- Element节点的一些方法
1. ele.setAttribute('属性名',属性值);//设置行间属性,**还可以设置系统没有的！**
- 比如设置个data-log(人工定义的,储存唯一标识的数据,打点器)
2. ele.getAttribute('属性名');

