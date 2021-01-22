# 

## CSS属性中的width：auto；或不设跟width：100%；的区别

### width不设置宽度
- 例如:在body中只有一个子元素div，该div的所有父元素就有：body和html

1. **浏览器计算宽度时会参考浏览器窗口的宽度。如果你不给宽度设定任何缺省值，那浏览器会自动将页面内容平铺填满整个横向宽度。**

2. *但是浏览器根本就不计算内容的高度，除非内容超出了视窗范围(导致滚动条出现)。或者你给整个页面设置一个绝对高度。否则，浏览器就会简单的让内容往下堆砌，页面的高度根本就无需考虑。因为页面并没有缺省的高度值，所以，当你让一个元素的高度设定为百分比高度时，无法根据获取父元素的高度，也就无法计算自己的高度。*

3. 换句话说，父元素的高度只是一个缺省值：height: auto;。当你要求浏览器根据这样一个缺省值来计算百分比高度时，只能得到undefined的结果。也就是一个null值，浏览器不会对这个值有任何的反应。

4. 那么，如果想让一个元素的百分比高度height: 100%;起作用，你需要给这个元素的所有父元素的高度设定一个有效值。
```
    *{
        margin: 0;
        padding: 0;
    }
    html,body{
        height: 100%;
    }
    #mydiv{
        background-color:blue;
        height:100%;
        width:100%
    }
```
```<div id="mydiv"></div>```


### width: auto

1. *子元素（包括content+padding+border+margin）撑满整个父元素的content区域*
2. 子元素有margin、border、padding时，会减去子元素content区域相对应的width值
3. **父元素的content = 子元素（content + padding + border + margin )**


### width: 100%

1. *强制将子元素的content区域 撑满 父元素的content区域*
2. **子元素有margin、border、padding时，不改变子元素content区域的width，而是溢出父盒子，保持原有值**
3. 父元素的content = 子元素的content

>简单来说,就是子元素width：auto;时,父元素的content=子元素的content+padding+border+margin,即设置margin之类属性有效.
而设置width：100%,则会强制性的撑满父元素的空间,父子content相等.

ps:我测试得来,顶层块盒不写width,就是默认相对于视口的100%


## 绝对/固定定位、浮动 与 display 的关系

- https://www.cnblogs.com/baimiaolei/p/5627755.html

另一个有趣的现象是position: absolute 和 float会隐式地改变display类型，不论之前什么类型的元素（display:none除外），只要设置了**position: absolute 或 float中任意一个，都会让元素以display:inline-block的方式显示(实际是block,只是排列方式类似inline-block的而已)**：可以设置长宽，默认宽度并不占满父元素。就算我们显式地设置 display:inline或者display:block，也仍然无效（float在IE6 下的双倍边距bug就是利用添加display:inline来解决的）。值得注意的是，position: relative却不改变display的类型。

**还是再多复习下袁老大讲的吧**


## 文字对齐--怎么说呢,具体还是看原老师讲的吧

- 一旦一个行块盒元素或者文本类元素里面包含文字了,那么外面的文字就会和里面的进行底对齐
- 用vertical-align属性可以调对齐的参考线
