# svg(了解即可,工作不常用)


*svg: 矢量图,放大不会失帧,适合大面积的贴图,通常动画较少或者简单,它用标签和css去画*
*canvas: 由于所有的动画都是由JS绘制,所以适合用于小面积的绘图,适合动画*


## 画线与矩形

```
<svg width="500px" height="300px" style="border:1px solid #000">
        <line x1="100" y1="100" x2="200" y2="100" class="line1"></line>
        <line x1="200" y1="100" x2="200" y2="200" class="line2"></line>
        <!-- rx/ry是用来作圆角的 -->
        <!-- 所有闭合的图形,在svg中默认都是天生充满并画出来的黑色的 -->
        <rect height="50" width="100" x="0" y="0" rx="10" ry="10"></rect>
    </svg>
```


## 画圈、椭圆、折线

**所有闭合的图形,在svg中默认都是天生充满并画出来的黑色的**
**所以应该在css里将fill设置为transparent,然后再设置stroke的颜色**

cx/cy是圆心坐标, rx/ry是x轴半径/轴半径

<!-- 折线,点内坐标空格隔开,点与点之间用逗号隔开,两个点就想画出来必须不能填充,得用stroke -->


## 画多边形和文本

1. polyline画到哪儿就停了,而polygon是多边形,会闭合(前提是先把fill:transparent)

2. 都用stroke描边就行


## 透明度与线条样式

1. fill-opacity、stroke-opacity
2. 线加粗的时候,只有中间那个线会在准确位置,其他的根据这条线对称平分在两侧
3. stroke-linecap:square; “加帽儿”,所以总会多一点长度



## path标签/元素

1. M:moveTo , L:lineTo ,大小写有区别!!! 
*大写:表示绝对位置, 小写:表示相对位置* 
相对于(200,100) 再向右移动200px,向下移动200px,就是矢量 
<path d="M 100 100 L 200 100 l 200 200"></path> 

2. H: 水平, V:垂直方向, z不区分大小写 
*大写: 移到npx  小写: 移动npx*
<path d="M 100 100 h 200 V 200 z"></path>


## path画弧

*A:arc ： rx,ry,旋转角度,优弧1劣弧0,顺1逆0时针,x2,y2*
<!-- <path d="M 100 100 A 100 50 90 1 1 150 200"></path> -->


## 线性渐变

1. 渐变都要先定义,用defs标签
2. 两个点的坐标决定了渐变的方向
3. 这里用fill:url()引入渐变
<defs>            
    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="50%" style="stop-color:rgb(255,255,0)"></stop>
        <stop offset="100%" style="stop-color:rgb(255,0,0)"></stop>
    </linearGradient>
</defs>
<rect x="100" y="100" height="100" width="200" style="fill: url(#bg1);"></rect>


## 高斯模糊

1. 先定义滤镜filter标签
2. 再用feGaussianBlur标签(这只是其中一种滤镜--高斯),设置属性,stdDeviation越大越模糊
3. 也是用filter:url()引入高斯模糊,是不是行间样式都可以的
```
<filter id="Gaussian">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20"></feGaussianBlur>
        </filter>

        <rect x="100" y="100" height="100" width="200" style="fill: url(#bg1);filter:url(#Gaussian)"></rect>
```



## 虚线及简单动画

1. stroke-dasharray: 10px 20px 30px;
**填充区和非填充区(空白)会轮流交替上面的参数值**
2. stroke-dashoffset: 20px;
*整体会向左偏移*
3. 可以设置dashoffset整体的宽度,然后配合animation实现来回滚动的条条动画



## svg的viewbox(比例尺)

- viewBox是svg的一个属性,写四个参数:起始位置x,y,
1. width="500px" height="300px" viewBox="0,0,250,150",就代表宽高放大了一倍
2. 相当于用250的宽度代替500的宽度,但是图形的css宽高没变,所以效果是放大了一倍
