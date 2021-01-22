# border

## 关于box-shadow

先说一句,得根据不同电脑自己慢慢调配效果,What the fucking hell!!!
反正很多原因造成的,效果不一致,Fuck!

1. calc:  
        left:calc(50% - 50px);
        top:calc(50% - 50px);   **这个减号两边必须要有空格**

2. border-radius:
    1个值代表四个值一样: 左上 右上 右下 左下
    2个值代表: 左上右下 右上左下
    3个值代表: 左上 右上左下 右下

实际上这么写:
    border-top-left-radius: 10px 10px;(水平,垂直半径)
    border-top-right-radius: 20px 20px;
    border-bottom-right-radius: 30px 30px;
    border-bottom-left-radius: 40px 40px;

**各写两个值。其实是因为,每个圆角是由一个圆与正方形的那个角的两边相切后取的弧**
**第一个值为水平半径,第二个值是垂直半径,最大都是取div的宽高.再超过就没意义了**

或者这么写,网上说不提倡这么写,但也没说出个所以然来:
    border-radius:10px 20px 30px 40px / 10px 20px 30px 40px;

3. box-shadow:
        box-shadow: x-shadow y-shadow blur-radius spread-radius color type;

    默认为外阴影outset,可以设置为内阴影inset
**5个值时: 水平偏移量,垂直偏移量,模糊值(越大越模糊),在4个方向同时扩大/缩小阴影大小,颜色**
    三个px时,是不包括最后那个扩大/缩小的值

    内阴影写法:
    box-shadow: inset 1px 2px 2px 0px skyblue;

**它可设置多重阴影,最先设置的阴影在逻辑最上层(覆盖之后的),也就是z轴方向,最靠近我们的**

- ps: 阴影在背景的上面,文字的下面



