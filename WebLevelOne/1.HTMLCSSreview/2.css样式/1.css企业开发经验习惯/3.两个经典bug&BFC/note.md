# 关于margin的两个bug以及如何使用BFC来弥补

## margin 塌陷

### 原理

- *父子嵌套元素在垂直方向的margin(正值),父子元素是结合在一起的.就是说水平线是一样的*
- 相当于他俩margin是绑定在一起的
- `同号取最大,异号,是按两人的和`


### 弥补办法-->BFC

1. 给父级设置边框或内边距(不建议使用)
```
border-top:1px solid black;
<!-- 或者 -->
<!-- padding-top:1px; -->
```

2. **触发bfc(block format context块级格式化上下文),改变父级的渲染规则**

- 改变父级的渲染规则有以下四种方法,***给父级盒子添加***
>(1)position:absolute/fixed;绝对/固定定位
(2)display:inline-block;行块盒
(3)float:left/right;浮动
(4)overflow:hidden;溢出盒子的部分要隐藏展示

*这四种方法虽然都能触发bfc,**但是使用的时候都会带来不同的麻烦,**具体使用中还需根据具体情况选择影响最小的来解决margin塌陷*


## margin 合并

### 原理


`注意：如果垂直方向有值,哥哥位置该在哪儿就在哪儿,但弟弟元素会照常跟哥哥元素设置的margin异号时,取加和式100-120==-20!!  -120+100==-20;;同号取max`
- **两个兄弟结构的元素在垂直方向上的margin是合并的**

### 弥补办法-->BFC

1. 给弟弟加上一层父级元素,并给他的父级加上overflow:hidden;
```html
    <div class="box1"></div>
    <div class="wrapper">
        <div class="box2"></div>
    </div>
  .wrapper{
            overflow:hidden;
        }
```

2. 给俩兄弟各自加一层父级,再加BFC
```html
    <div class="wrapper">
        <div class="box1"></div>
    </div>
    <div class="wrapper">
        <div class="box2"></div>
    </div>
```

- *但是这两种方法都**改变了HTML结构**,在开发中是不能采用的*

所以在实际应用时,在margin合并这个问题上,我们一般不用bfc
**而是通过只设置上面的元素的margin-bottom来解决距离的问题**