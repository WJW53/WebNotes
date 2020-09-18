# 位置图形

## 位置坐标图形大小相关方法：
.offset()               返回一个对象,包含当前元素相对于文档的坐标,{top:...,left:...}
.position()             相对于父级定位元素的坐标,没找到就相对于整个文档的坐标,**赋值无效**
.scrollTop() 、.scrollLeft()       滚动距离,可赋值有效(数字,不能是字符串)

**参考：一个元素的 scrollTop 值是这个元素,这个元素,这个元素！！的内容顶部(卷起来的)到它的视口可见内容的顶部**
**的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0。**


**注意: 以下返回的都是number类型的值,例:100  而用.css('width')   这个返回的是字符串类型的,例:"100px"**  
.width()、.height()                         只针对盒子模型的content区域
.innerHeight()、.innerWidth()               填充盒
.outerHeight()、.outerWidth()               边框盒 
.outerHeight(true)、.outerWidth(true)       边框盒+margin , 就是整个盒模型


## 遍历索引

都是在jQuery对象下,遍历索引相关方法：

1. .each()

2. .children()  所有孩子们

3. .index()    
> **返回指定元素(index方法里的参数)相对于其他指定元素(调用index方法的jQuery对象)的 索引(index) 位置 这些元素可通过 jQuery 选择器或 DOM 元素来指定 .   注意:如果未找到元素,index() 将返回-1**

### 所以我这里整理一下jquery中index的方法的用法

https://www.jianshu.com/p/0f9e45e2e22f

```
a.index(b)
a必须是一个jq对象或者jq对象集合

1、当a为一个jq对象时
a. 如果省略不给b参数，那么返回这个jq对象的dom对象在dom树中的兄弟元素的索引，比如对于上面的代码 $(".child3").index()返回2（从0开始算）

b. 如果b为一个dom对象一个jq对象或者jq对象集合，当这个对象就是a的jq对象或其dom对象或者这个jq集合第一个是a，则返回0，否则返回-1
c. 如果b为一个选择器字符，则返回a在b选中元素的索引，如 $(".child3").index(".child") 返回2

2、当a为jq对象集时
a. 如果省略不给b参数，那么返回这个jq对象集合第一个jq对象的dom对象在dom树中的兄弟元素的索引，比如对于上面的代码
$(".child").index()返回0（从0开始算）
b. 如果b为一个dom对象一个jq对象或者jq对象集合，则返回这个对象或者这个jq集合第一个对象在a中的索引，如果a不包括，则返回-1，否则返回索引
c. 如果b为一个选择器字符，则返回a的第一个对象在b选中元素的索引
```




## console.log()

**所以需谨记，console.log打印的是当前的对象，控制台上显示的是当前的对象;但是如果在控制台上展开该对象**
**则该对象中的属性为程序运行完后该对象的所有属性。**

## target定义：

target 属性规定哪个 DOM 元素触发了该事件。
target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。

## e.target与this

**this会因冒泡而改变对象,但e.target始终为事件源对象(源目标节点)**