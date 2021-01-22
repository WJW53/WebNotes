# 基于jQuery对象增删改查相关方法

**参数可以是字符串的标签,也可以是jQuery对象,也可以是函数(就一个参数index)**

1. wrap()                   把选定的每一个标签都包裹一个东西

2. wrapInner()              在每一个选定的标签内部都包裹一个东西

3. wrapAll()                把选定的标签看做一个整体,整体打包加上一个共同的爹
**但是啊,如果它选定的不同级,那就会以第一个标签为基准,把所有的相同标签都剪切到跟它同级,再共同包裹**

4. unWrap()                 无论    不写 或 写任何参数,都只能去除紧挨着的那个父亲标签



## 重要

ps : z-clip插件  监测复制粘贴事件的插件

5. clone()  深度克隆;要是不填参数,无法克隆事件;填写true,事件也能克隆了,NB轰轰的

**即便参数是true,也有不能clone的时候:**

```
//prop会拿到jQuery对象里真正的JSDOM对象
$('.demo').prop('data-log','1111');
console.log( $('.demo').clone(true).prop('data-log') );//undefined,没被克隆到
```

这时就要用data了


6. data() 重点 !!!  好好理解！
```
//html css js用对象存信息
        //tag tag-dom  标签/标签的dom对象 都可以存信息
        //attr也可以存取,但会使得HTML行间样式过多,显得臃肿,而且,频繁的进行dom操作
        //因为你得dom.xxx去取这个东西,而data方法是放在了一个映射池子里(操作的是不涉及DOM操作的JS操作)

        //开发过程: data -> jquery => dom -< data => view
        //data方法 在jQuery 操作的是映射关系,不操作dom,在内部生成一个池子,cache来做规范化处理,效率高

        //好的框架出来前,data还是最好的存取数据的方法

        //vue出现后 --> 它写到行间是为了符合vue的结构语法,便于帮我们在内部做了很多dom操作
        //vue -->      虚拟dom   <-- diff算法,最小程度的操作dom
        //view  model
```        

不涉及DOM操作的JS操作,相比于 涉及到DOM操作的操作,要简单很多