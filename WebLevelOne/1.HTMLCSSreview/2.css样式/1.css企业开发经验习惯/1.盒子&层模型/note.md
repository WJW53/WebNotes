# 
 
## 开发经验

1. 先定义功能(css),抽取一些公共样式到css文件中,再去选配功能 --> 高效团队开发
2. 初始化/重置样式
- 通配符选择器*的大作用就在这里;它的权重是0,那么你随便写个选择器都可以更改
```
*{
    padding:0;
    margin:0;
    text-decoration:none;
    list-style:none;
}
```


## 盒模型

### 盒子的组成部分部分

1. 盒子外边距--margin
2. 盒子壁--border
- **可视的盒子的宽高为:border+padding+content**
3. 内边距--padding
- **padding为三个值的时候:上,左右(即左右相等),下;border、margin也是一致的**
- **background-color设置的颜色就是content+padding**
4. 盒子内容区--content = width * height


## 层模型

- 

### 定位--position

- **body天生margin:8px;**padding仍然是0;

1. static(默认静态,即不定位)
2. relative
- *保留原来位置(不脱离文档流)进行定位,原来占得地方还在,灵魂出窍.只是视觉上的偏差而已,真实位置仍未改变*
- 也就是相对于自己原先的位置进行定位

3. absolute
- 脱离原来位置(文档流)进行定位,即会被文档流元素忽略,不再是障碍了
- 包含块变化：找祖先元素中第一个定位元素(最近的有定位的父级元素),该元素的填充盒为其包含块！
- 找不到则,相对与整个网页作为参照物定位

4. fixed
- 同absolute一样
- *包含块固定为:浏览器的 可视窗口*

5. left top right bottom
- 若同时设置left和right,则按left的来,听left的;同理,听top的

6. 所以常常将absolute(子级)与relative(父级)相结合使用


### 绝对和固定定位元素的居中

方法一(兼容性好)二(IE8以上,移动端忽略)：
1. 要居中的元素(可微调),不需要定尺寸
2. left:50%;top:50%;
3. margin-left:-元素宽度的一半px;margin-top:-元素高度的一半px;
4. 弥补3的不足,用CSS3的样式:transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */

方法三:
1. 定宽高,或者不设置(但需要有自己的尺寸:图片)
2. left: 0; right: 0; / top: 0;bottom: 0;
3. margin:0 auto / auto 0;    /* 有了这个就自动居中了,或者四个方向均为0,然后margin均为auto */

方法四:
- 使用css3盒模型:flex布局实现css绝对定位居中。这种情况是在不考虑低版本浏览器的情况下可以使用。