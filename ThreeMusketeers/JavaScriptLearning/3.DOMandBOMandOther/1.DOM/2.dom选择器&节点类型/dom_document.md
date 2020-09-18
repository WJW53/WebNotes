# DOM基本操作

**dom bom 开始,一切系统生成的成组的方式基本都是 类数组。**
- dom元素 ---- 可被dom操作的元素

### 对节点的增删改查
- 查看元素节点

- document代表整个文档(如果说html还有父标签,那就会是document)
- document.getElementById() //元素id **在Ie8以下的浏览器,不区分id大小写,而且也返回匹配name属性的元素**

**ps:尽量不用id,避免被后端人员搞自闭**

- .getElementsByTagName() // **标签名,这个用的频率更高**
- .getElementsByName(name);返回带有指定名称的对象的集合。 //**IE不支持.需注意,只有部分标签name可生效（表单,表单元素,img,iframe）**
- .getElementsByClassName() // **类名 -> ie8和ie8以下的ie版本中没有，可以多个class一起**

下述这俩比较强:

- .querySelector() // css选择器   在ie7和ie7以下的版本中没有
- .querySelectorAll() // css选择器 在ie7和ie7以下的版本中没有

**但是有个大缺陷: 不是实时的。所以在用法上及其受限,一般只用于保存副本**


### 节点的类型

**后面的数字是调用nodeType返回的数字**

- 元素节点   —— 1
- 属性节点   —— 2
- 文本节点(记得空格回车啥的也都是)   —— 3
- 注释(comment)节点   —— 8
- document  —— 9
- DocumentFragment(文档碎片)  ——  11 


### 遍历节点树：

- parentNode -> 父节点  (最顶端的parentNode为#document);
- childNodes -> 子节点们(只算儿子辈分,不算孙子啥的)**相对常用**
- firstChild -> 第一个子节点
- lastChild -> 最后一个子节点
- nextSibling->后一个兄弟节点
- previousSibling->前一个兄弟节点


### 基于元素节点树的遍历

**这回就是真的基于元素了:**

- parentElement -> 返回当前元素的父元素节点 (IE9及以下都不兼容)
- children -> 只返回当前元素的元素子节点(也是儿子辈)**相对常用**
- node.childElementCount  === node.children.length当前元素节点的子元素节点个数(IE9及以下都不兼容)
- firstElementChild -> 返回的是第一个元素节点(IE9及以下都不兼容)
- lastElementChild -> 返回的是最后一个元素节点(IE9及以下都不兼容)
- nextElementSibling / previousElementSibling ->返回后一个/前一个兄弟元素节点(IE9及以下都不兼容)


### 节点的四个属性

- nodeName
    **元素**的标签名,以大写形式表示,只读

- nodeValue
    **只有Text节点或Comment节点的文本内容,可读写**

- **nodeType(最有用)**
    **该节点的类型，只读**

- attributes
    该 Element 节点的属性集合

### 节点的一个方法

- Node.hasChildNodes();//**该节点是否有 子节点**
