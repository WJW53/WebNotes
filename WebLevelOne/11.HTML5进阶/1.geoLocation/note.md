# geoLocation

获取地理信息
一些系统,不支持这个功能
定位(GPS): 台式机几乎都没有GPS,笔记本绝大多数都没有GPS,只能手机几乎都有GPS

网络: 来粗略的估计地理位置

HTML5如何获得具体定位呢？

```
window.navigator.geolocation.getCurrentPosition(function(position){
            console.log('成功获取地理位置: ');
            console.log(position);
        });
```

1. 方法一

首先得在 https协议 的网址下测试(比如百度),然后 网页本身没有获取地理位置的能力,得靠浏览器,而我们用的谷歌浏览器想获取地理位置要访问谷歌地图(要翻墙),然后在控制台输入代码就可以获得了

2. 方法二

在file协议下(就是自己本地的文件双击)    (好像也得翻墙,毕竟我没翻墙没显示啊)


## 常识

latitude(经度): 最大值180°
longitude(纬度): 0~90°

只是分东/西经、南/北纬