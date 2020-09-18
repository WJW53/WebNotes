# background

## 渐变颜色生成器
- 课程最后再讲

线性的: linear-gradient();
放射性的: radial-gradient();
repeating-linear-gradient();
repeating-radial-gradient();

```
#linear{
            width: 200px;
            height: 100px;
            background-image: linear-gradient(to right bottom,#0f0,#ff0);
            /* 数字deg不能分开,从下往上是0度, 从左向右是90度,bottom是180度*/
            /* 颜色起始亦是截止位置:可以用像素值,也可以百分比 */
/* 从左到右渐变,绿色到20px为止,20-60px是绿到黄的渐变, 60-80px是黄到蓝的渐变,80-130px是蓝到紫的渐变,再后面是紫 */
            background-image: linear-gradient(90deg,#0f0 20px,#ff0 60px,#00f 80px,#f0f 130px);
        }

#radial{
        margin-top:50px;
        width: 200px;
        height: 100px;
        /* 从圆心处开始放射,ellipse是椭圆,也可以circle. 可以放射到距离圆心最...的地方停止 */
        /* background-image: radial-gradient(ellipse closest-corner at 50px 50px, #0f0,green,#0ff); */
        background-image: radial-gradient(ellipse closest-side at 50px 50px, #0f0,green,#0ff);
        /* background-image: radial-gradient(ellipse farthest-corner at 50px 50px, #0f0,green,#0ff); */
        /* background-image: radial-gradient(ellipse farthest-side at 50px 50px, #0f0,green,#0ff); */
        }
```

## background-image:
可以填写多个url,也就是多个照片,为了便于切换的
```
/* 多个背景图片如何显示: */
            background-image: url(),url();
            background-size: 100px 200px, 100px 200px;
            background-repeat: no-repeat;
            background-position:0 0,100px 0;
```

## 其他属性用法

**一、background-origin:**
1. 默认值是padding-box,也就是从填充区开始(其左顶点),但没指定结束位置哈
2. 一般搭配no-repeat,否则左和上边会有模糊的平铺
3. position是根据origin的左顶点而设置的


二、background-clip:
1. 默认值是border-box,防止跑到盒子外面去.设置背景图片到哪儿结束
2. **还有个值是text,有点重要,但只有webkit内核可以使用**
    

**三、background-attachment:**
0. 测试时配合overflow: scroll;使用
1. scroll: 是默认值,相对于容器进行定位
2. local: 相对于容器里的content-box进行定位
3. fixed: 相对于浏览器视口进行定位,但是若超出容器,则超出部分不会显示


四、background-size:
1. 可以填像素
2. cover: 在不改变图片比例情况下,用一张图片填充满容器,可能有点溢出,图片未完全显示
> 拿一条边对齐另一条边大于等于容器大小

3. contain: 在不改变图片比例情况下,让容器包含一张完整的图片,可能有一点repeat
> 拿一条边对齐另一条边小于等于容器大小


五、background-repeat: 
0. 默认值为repeat,平铺重复背景图片
1. no-repeat,repeat-x,repeat-y
2. round:尽量平铺拉伸,空间够时就再填加一个
3. space:利用空白平铺拉伸,空间够时就再加一个
4. 可以填写两个值,round、space分别代表水平和垂直方向上拉伸的方式,若写了repeat-x或y,则另一轴始终默认为repeat


六、background-color:
HSLA:
Hue(色调0-360,红绿蓝分别是0/120/240),Saturation(饱和度0.0%-100%),Lightness(亮度0.0%-100%),Alpha(透明度0-1)

1. background-color: hsla();
2. 其他的还有一些,rgba,transparent,currentColor等属性值


### ps: border-color: 默认为currentColor,而currentColor会取color的值,这叫中转颜色