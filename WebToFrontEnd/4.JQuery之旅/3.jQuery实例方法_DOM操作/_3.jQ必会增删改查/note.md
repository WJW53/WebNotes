# 基于jQuery对象查改删增相关方法

- **参数都是字符串型的css选择器,都是用来过滤的**

1. **.next()、.prev()、.preAll()、.nextAll()**这四个常用,尤其后面俩

2. .prevUntil() 、.nextUntil()  玩好传俩参数时就行
 
3. .siblings()  找到所有兄弟元素
 
4. .parent()、.parents()、.offsetParent()、.closest()   也挺常用
 
5. .slice() //只到这儿？
 
**ps: 6~9的后者都是填写jQuery对象,而非css选择器;前者既可以css选择器也可以jQuery对象!!**

6. .insertAfter()、.after()
 
7. .insertBefore()、.before()
 
8. .appendTo()、.append()
 
9. .prependTo()、.prepend()
 
10. .remove()   移除的干干净净(包括绑定的事件),返回给你一个只含有结构样式的jQuery对象
.detach()  虽然给你删干净了,但是返回的jQuery也包含绑定的事件,所以可以再添加回来

11. $() 参数：填写标签的字符串形式 , 就可以创建jQuery对象,然后可以利用appendTo插入该对象
