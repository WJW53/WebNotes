# 盒模型

box: 盒子，每个元素在页面中都会生成一个矩形区域(盒子)

盒子类型：

1. 行盒：display的属性值等于inline 的元素(ps:现在不叫元素)
2. 块盒：display的属性值等于block 的元素
3. display默认值为inline，即行盒

行盒在页面中不换行，而块盒会独占一行（不止有这个区别）

浏览器默认样式表中设置的块盒有: 容器元素、h1~h6、p等元素

常见的行盒: span、a、img、video、audio等元素

## 盒子的组成部分

无论是行盒还是块盒，都有下面几个组成部分，从内到外，分别是：

1. 内容 content

width、height，设置的是盒子内容的宽、高

内容部分通常叫做整个盒子的**内容盒 content-box**

2. 填充 padding

盒子边框到盒子内容的距离

padding-top、padding-right、padding-bottom、padding-left

padding:简写属性

padding: 50px 40px 45px 30px

若上下一致，左右像素一致。则可以写为： padding: 50px 30px

填充区+内容区域 = **填充盒 padding-box**

3. 边框 border(速写/简写属性)

边框 = 边框样式 + 边框宽度 + 边框颜色

border-style边框样式:默认none，无样式。必须先改变它，才能显示宽度和颜色.solid实线边框

border-width边框宽度:实际上它自己还需要设置上右下左四边的边框宽度。边框样式也是有四个方向的

border-color边框颜色:默认为字体颜色一致

边框+填充区+内容区 = **边框盒 border-box**

4. 外边距 margin

边框到其他盒子的距离

margin-top、margin-right、margin-bottom、margin-left

速写属性margin
