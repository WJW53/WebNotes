# CSS

## box-shadow
给div或者文字添加阴影（盒子阴影、文本阴影的使用）

box-shadow: h-shadow v-shadow blur spread color inset

box-shadow: 水平偏移量 垂直偏移量 [阴影模糊半径] [阴影扩展] [阴影颜色] [投影方式];

值 | 描述 
:-: | :-: 
h-shadow | 必需。水平阴影的位置。允许负值 
v-shadow | 必需。垂直阴影的位置。允许负值
blur | 可选。模糊距离 
spread | 可选。阴影的尺寸
color | 可选。阴影的颜色。请参阅 CSS 颜色值
inset | 可选。将外部阴影 (outset) 改为内部阴影

## border-radius
为元素添加圆角边框

# JS

## 模板字符串

用反引号(`，键盘tab键上面的键)标识，它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

- 用法

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
not legal.`

// 字符串中嵌入变量
// 模板字符串中嵌入变量，要将变量名写在${}之中，大括号内可以放入任意的JavaScript表达式
var name = "杉杉", 
    time = "今天";
`Hello ${name}, 你 ${time} 有空吗？` // hello 杉杉，你今天有空吗？
```