# 工具方法

## $.方法

- $.方法 意思是基于jQuery库的方法


1. $.type() 判断数据类型 $.isArray()  $.isFunction()  $.isWindow…
**$.type()对于自定义函数,然后new它(也就是自定义的对象)以及字面量形式的对象返回的都是"object"**

2. $.trim() 去掉字符串首尾空格,如果不是字符串,他会先强制把你变成字符串再处理

3. **$.proxy() 改变this指向**

//$.proxy(fnc,obj);第一个参数,为执行函数;第二个参数为,this指向哪里
//改变this指向,  类似JS原生bind()

4. $.noConflict()   防止冲突,现在基本用不上,因为jQuery以前是老大

5. $.each() 遍历 主要是针对于数组操作,参数为(arr,fnc);现在都不怎么用了

6. $.map() 这才是遍历的祖宗方法,最初的版本  不改变原数组,用新容器接收即可

7. $.parseJSON() 严格json字符串转换成对象  <-->  原生JSON.parse();

> **原生JSON.parse():把一个符合json格式的字符串,转换成纯粹意义的json**
$.parseJSON()   的源码  就是JSON.parse(data + "");      哈哈

8. $.makeArray() 一个参数时:类数组转换成数组
> **两个参数时,NB了,也能对真数组进行操作**
