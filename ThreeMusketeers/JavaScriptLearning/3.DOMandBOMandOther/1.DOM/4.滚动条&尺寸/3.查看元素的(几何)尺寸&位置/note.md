# 查看元素的 几何尺寸 和 尺寸

## 查看元素的几何尺寸(不常用)

1. document.documentElement.getBoundingClientRect();
- **兼容性很好,了解即可,不常用**

> 该方法返回一个对象，对象里面有left,top,right,bottom等属性。left和top代表该元素左上角的X和Y坐标
而right和bottom代表元素右下角的X和Y坐标

- height和width属性老版本IE并未实现

- 返回的结果并不是“实时的”,只是静态的写照


## 查看元素的尺寸(常用)
1. dom.offsetWidth
2. dom.offsetHeight
- **这俩求的是视觉上的尺寸,包含padding,但不包含margin**

## 查看元素的位置

1. dom.offsetLeft, dom.offsetTop

> **对于无定位父级的元素,返回相对文档的坐标,注意默认body里的margin横向是8px,纵向可以去重叠消掉8px**
**对于有定位父级的元素，返回相对于最近的有定位的父级的坐标。无论是 left 还是margin-left等都是距离**

2. dom.offsetParent
- **返回最近的有定位的父级标签,如无,返回body标签; 而 body.offsetParent 返回null**

- 封装函数: 求元素相对于文档的坐标 getElementPosition()
