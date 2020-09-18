# 文字溢出&背景图片处理

## 文字溢出

- 考虑后端传的数据：溢出容器,打点处理

### 单行文本
```
/* 三件套: 先规定段落中的文本不进行换行,然后溢出隐藏,最后 显示省略符号来代表被修剪的文本*/
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
```

### 多行文本
1. 不容易处理,而且老版本浏览器不支持方便的技术来处理,所以很多时候呢,就直接在最后手动打三个点...
2. 一般做截断处理:
- 先计算:行数 = height / line-height,然后直接overflow:hidden;


## 图片处理
1. 
```
background-image:url(Shanks.png) ;
/* 宽高 */
background-size: 100px 100px;
/* 也可以仅设置一个方向重复repeat-x */
background-repeat:no-repeat;
/* 分别是行和列上的,可以用px,也可以用center等,还可以用%,特殊:这里的center==50%,就是可以居中 */
background-position: 50% 50%;
```

2. *国际企业的想法,就是即便你网速不好使(加载不出来东西)的时候,依然可以完成正常功能。就是去掉css,显示html原有的样子*     ```<a href="http://www.taobao.com" target="_blank">淘宝网</a>```
- **ps:背景图片或者背景颜色会为所设置的padding和width同时添加**
```
<style>
        *{
            padding: 0;
            margin: 0;
        }
        a{
            display: inline-block;
            text-decoration: none;
            color: #424242;
            width: 190px;
            border: 1px solid black;
            background-image: url(//img.alicdn.com/tfs/TB1UDHOcwoQMeJjy0FoXXcShVXa-286-118.png);
            background-size: 190px 90px;
            
            /* 方法一: 有个高度,先要求不换行,给我首行缩进200px,也就是移出了a的范围,最后,溢出隐藏*/
            /* height: 90px;
            white-space: nowrap;
            text-indent: 200px;
            overflow: hidden; */

            /* 方法二: 直接把a的高度设置为0,然后内边距设置为背景图的高度,最后溢出隐藏*/
            height: 0;
            padding-top: 90px;
            overflow: hidden;
        }

    </style>
```

**ps: 行盒只能嵌套行盒,块盒里面可以嵌套任何盒子. 有一个特例: p不能嵌套块盒,你要这么写了,人会把你砍成俩**
**第二个特例: a标签不能嵌套a标签**