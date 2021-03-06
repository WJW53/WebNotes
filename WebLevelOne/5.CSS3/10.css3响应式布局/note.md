# CSS3响应式网页开发

如何使页面在不同的设备上展示的效果相同呢？

-  响应式网页设计

用一套代码解决几乎所有设备的页面展示问题.
设计工作由产品经理或者美工来出.

## inline-block

**会使两个带有这个属性的元素之间隔着一个 font-size的宽度**

## 设置视口

1. meta标签中content属性值含user-scalale=no时,用户就不可以放大缩小+
2. width: 可视区宽度
3. device-width: 设备宽度
4. minimum-scale:最小缩放比
5. maximum-scale:最大缩放比
6. user-scalable:是否允许用户缩放
7. css像素根据设备像素进行计算   1css 是否等于 1设备像素,实际是根据dpi的值来适配的
   再适配各种不同分辨率的设备


## 响应式布局实现

1. 流体网格: 可伸缩的网格(大小宽高 都可伸缩(可用flex或者百分比来控制大小)float)--> 布局上面 元素大小不固定可伸缩
2. 弹性图片: 图片宽高不固定(可设置min-width: 100%)
3. **媒体查询**: 让网页在不同的终端上面展示效果相同 (用户体验相同->让用户用着更爽)
                在不同的设备（大小不同 分辨率不同）上面均展示合适的页面

4. 主要断点: 设备宽度的临界点 
大小的区别 ---》 宽度不同   ---》 根据不同宽度展示不同的样式

**响应式网页开发主要是在css样式上面进行操作**


## 使用方法

媒体类型（Media Type):  all(全部)、screen(屏幕)、print(页面打印或打印预览模式)
媒体特性（Media features): width(渲染区宽度)、device-width(设备宽度)...
Media Query是CSS3 对Media Type的增强版，其实可以将Media Query看成Media Type(判断条件)+CSS(符合条件的样式规则)



## 如何使用媒体查询

媒体查询的引用方法有很多种:

1. link标签:
    @import url(example.css) screen and (width:800px);
    例:    @import 'index.css' screen and (max-width: 375px);


2. <link rel="stylesheet" media="screen and (max-width: 375px)" href="index.css">
媒体特性必须加括号,用and连接 媒体类型

3. css3新增的@media

```
/* css样式引入
            媒体查询不占用权重
        */
        /* @media screen and (max-width: 375px){
            html, body {
                width: 100%;
                height: 100%;
                background-color: red;
            }
        } */
```


## 单位值

rem  相对于html元素的font-size大小
em   相对于本身的font-size大小  font-size属性是可以继承的
vw / vh  ---> 相对于视口而言的   会把视口分成100份
vmax  --> 取视口宽高中最大的一边分成100份
vmin ---> 取视口宽高中最小的一边分成100份


## 响应式设计是最佳选择吗？

不是的，内容设计问题都可以通过响应式设计思路解决， 项目的预算，目标用户以及定位决定了其实现方式。
项目的预算，人力，物力，财力， 时间成本
目标用户，
产品定位

-----------------------------------------------------------

渐进增强 ---》  iphone6 向上兼容  兼容最新设备   
优雅降级 ---》  开发通用版本  再兼容老版本   向下兼容

先移动端  ---》 再pc端

先iphone6为初始原型 开发  ---》 兼容其他的设备  ====》 渐进增强
