# 更多的样式

## 透明度

1. opacity,它设置的是整个元素（比如用在某个div）的透明度，取值为0~1
2. 通常在颜色位置设置alpha通道(rgba)

## 鼠标样式

使用cursor属性设置，属性值为pointer代表小手

图片后缀名改为.ico或.cur

cursor: url("xxx.ico"), auto;
意思是：使用这个图片的内容作为鼠标样式，若该图片失效，则选择auto样式(默认样式)

## 盒子隐藏

1. display:none,不生成盒子，无空间(但这种方法会影响到其他盒子的排列)
2. visibility:hidden,生成盒子，只是从视觉上移除盒子，盒子仍然占据空间

## 背景图

### 和img元素的区别

首先，img元素属于HTML概念，而背景图属于CSS概念

使用哪个，取决于 含义

1. 当图片属于网页的内容时，必须使用img元素
2. 当图片仅用于网页的美化时，必须使用背景图

- 广告: 建议使用img
 

### 设计的CSS属性

1. background-image

2. background-repeat(速写属性)

默认情况下，背景图会在横坐标和纵坐标中重复

3. background-size(速写属性)

预设值：contain、cover,类似于 object-fit

使用数值或百分比

4. background-positions(速写属性)

设置背景图的位置，使用数值或百分比

预设值使用：center,left,top,right,bottom

background-positions: 20px 40px;  表示离左边20px，离上边40px

雪碧图（精灵图）(sprite),从雪碧图中取出某部分图片

5. background-attachment

通常用它控制背景图是否固定

6. 背景图和背景颜色混用

7. 速写(简写)属性:background




