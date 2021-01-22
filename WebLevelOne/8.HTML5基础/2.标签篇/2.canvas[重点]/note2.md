## 坐标的平移旋转与缩放

1. **rotate() 是根据画布的原点进行旋转的,就是左上角那个点,必须放在moveTo**
2. **translate(x,y)可以更改画布原点**
3. **scale(kx,ky) 是所有坐标的x*kx,y*ky,实际类似于css3里更改坐标系刻度**



## save和restore

1. save()可以保存当前坐标系的平移数据,缩放数据,旋转数据
2. restore()则可以还原


## 背景填充

```
var img = new Image();
        img.src = "./pic1.jpeg";

        img.onload = function () {
            ctx.beginPath();

        //为啥repeat可以而no-repeat显示不出来呢
        //因为 纹理的填充 是以坐标系原点开始填充的,那个位置可能no-repeat就看不到了
        //所以 使用translate解决呗

            ctx.translate(100,100);

            var bg = ctx.createPattern(img, "no-repeat");
            // ctx.fillStyle = "lightblue";
            ctx.fillStyle = bg; //还是没图片为啥,图片异步加载,这会儿可能还没加载完毕呢
            ctx.fillRect(0, 0, 200, 100);
        }
```


## 线性渐变

也是从坐标系原点开始变,而不是从图形左上角
var bg = ctx.createLinearGradient(x1,y1,x2,y2);//渐变开始和结束点的坐标

*//??????????到底怎么渐变的,记得抽空弄明白,这老师根本没讲清楚啊*



## 辐射渐变

var bg = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);

有空看看别人的总结
https://www.cnblogs.com/tianma3798/p/5895811.html



## 阴影

```
    ctx.beginPath();
    ctx.shadowColor = "red";
    ctx.shadowBlur = 30;

    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 15;
    ctx.fillRect(0,0,200,200);
```


## 如何在画布上渲染文字

ctx.font可设置字体大小、格式,strokeText/fillText字体大小都会改变
若想要空心的字体,就用font+strokeText,实心就换fillText



## 线端样式

1. ctx.lineJoin = 'miter';//线段交汇时:round变圆,bevel直接砍了,默认值miter锋锐的
2. ctx.lineCap = 'round';//butt默认样式,square前后都多加一些,round把两头变圆增加一点长度        
3. ctx.miterLimit = 7;//防止过度尖锐

