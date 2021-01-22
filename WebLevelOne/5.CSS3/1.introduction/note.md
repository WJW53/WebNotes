# brief introduction of css3

1. upgrade version(css2的升级版本)
2. css3's compatibale history(CSS3的兼容性历史)

## css3's compatibale history

browser             prefix(css3样式前缀)

google/safari   :   -webkit
IE              :   -ms(Microsoft缩写)
firefox         :   -moz
opera           :   -o


之后每个浏览器又都写了不加前缀的一些属性:
    比如: border-radius直接写就行


当时年代,让一个属性在所有浏览器都好使,怎么写？ :
    先查表兼容性,然后针对每种情况,全都堵死


直到现在,仍然有些属性不是所有浏览器支持,甚至有的只有-webkit内核支持,
比如: -webkit-text-fill-color: ;仅仅-webkit支持


http://css.doyoe.com
http://www.caniuse.com
(caniuse是相对最权威的,实时的)


## 预/后处理器

1. 预处理器: pre-processor
less/sass(先按它的语法规则书写代码,然后它转换为标准的css代码,方便编写和管理代码)
cssNext(插件)：用来实现一些未来的标准的(并未完全在各大浏览器实现的功能)



2. 后处理器: post-processor
autoprefixer 是后处理器中的一个插件
> 如果有一天,css不再有兼容性问题,那么它之前写的代码也不用重新改写了,相当于原先的是升级版代码
而预处理器做不到这点


cssNext、autoprefixer 这俩插件,单独使用都用不了,得配合 postCss 才能用

**postCss:** 它只是一个工具,不能划分为后处理器. 是用js实现的css的 抽象的语法树: 
                                    AST(Abstract Syntax Tree)
剩下的事就留给后人来做了

postCss(可以集成到webpack里) + 插件(充分体现扩展性,现在都200多个了(19年))


## sass也是一个插件
```
:root{
    <!-- 自定义一个变量并赋值 -->
    --headline--color: #333;
}

@custom-selector: --headline h1,h2,h3,h4,h5,h6;

: --headline{
    color: var( --headline-color );
}

--------------------------------------------------------相当于如下的css
h1,h2,h3,h4,h5,h6{
    color:#333;
}


```

