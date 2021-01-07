# svg

以后不太会用到，但是我需要了解到。

通常用来做一些简单的小图形，做一个图片的话，难度太大，成本高

svg: scalable vector graphics,可缩放的矢量图

1. 该图片使用代码书写而成
2. 缩放不会失帧
3. 内容轻量

## 怎么使用

svg可以嵌入浏览器，也可以单独成为一个文件。去iconfont下载

xml语言，svg使用该语言定义

## 如何书写代码(先下载个svg插件)

### 矩形: rect

### 圆形: circle

### 椭圆: ellipse

### 线条: line

### 折线: polyline

### 多边形: polygon

### 路径: path(其实上面的所有形状，都可以通过path画出来)

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc

> A
    半径1 
    半径2 
    顺时针旋转角度 
    小弧(0)或大弧(1) 
    顺时针(1)或逆时针(0) 
    终点x坐标 
    终点y坐

- Z = closepath

### 例子

画太极图
