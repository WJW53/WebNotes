# MyVue----Due设计分析

## 在core文件夹下

1、index.js是入口文件
2、instance文件夹下的index.js才是真正的有效的入口
    - 初始化due，render，

### instance文件夹下init.js
- 给due添加初始化方法


### instance文件夹下proxy.js

- 给due对象的属性进行代理（数据劫持）

### vdom文件夹下的vnode.js

- 虚拟DOM节点,类的定义

### instance文件夹下的mount.js

- 将虚拟DOM挂载到真实节点el上

### instance文件夹下的render.js

首先搞明白一点，文本内容只能在文本节点里，不可能在其他类型节点中，没写文本节点是因为有个匿名的无形的存在

1. 进行预备渲染(实际就是建立渲染索引,通过模板找vnode,通过vnode找模板),遍历树形结构建立索引
2. 进行真正的render

### 在instance下的grammer文件夹里

#### vmodel.js


