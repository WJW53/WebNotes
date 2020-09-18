# 样式补充

## display: list-item

- 设置为该属性的盒子，本质上仍然是一个块盒，但同时该盒子会附带另外一个盒子。
- 元素本身生成的盒子为主盒子，附带的盒子称为次盒子。次盒子与主盒子水平排列。
- 前面的 点点 就是附带的次盒子

涉及的CSS：

1. ```list-style-type```
设置次盒子中内容的类型

2. ```list-style-position```
设置次盒子相对主盒子的位置

3. 速写属性```list-style```
list-style: circle inside;

> **清空次盒子**
list-style: none;


## 图片失效时的宽高问题

如果img元素的图片链接失效,此时img元素的特性和普通行盒一样，无法设置宽高

可以设置display:inline-block;保证宽高有效


## 行盒中包含行块盒或可替换元素

行盒的高度与它内部的行块盒或可替换元素(iframe video embed img)的高度无关

## text-align: justify;

text-align: start;（默认值）

- left:左对齐
- right:右对齐
- center:居中
- justify:除最后一行外，分散对齐(使用::after，让原先最后一行也分散对齐)

## 制作一个三角形

## direction 和 writing-mode

开始start->结束end，是相对的，不同国家会有不同习惯

左left->右right，但左右是绝对的

direction: 设置的是开始到结束的方向

writing-mode: 设置文字书写方向

## utf-8字符

例：

x代表后面是16进制
&#x5434;&#x7ECF;&#x7EAC;

或者：

p::after{
            content: "\5434\7ECF\7EAC";
        }



