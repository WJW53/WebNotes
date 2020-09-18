# 多媒体元素

## 视频video元素

controls:控制控件的显示，取值只能是controls

某些属性，只有两种状态：1. 不写 2.取值为属性名

这种属性叫做布尔属性。

布尔属性，在HTML5中可以不用书写属性值

autoplay：布尔属性，进入页面自动播放

muted：布尔属性，静音播放

loop：布尔属性，循环播放

## 音频audio元素

与video用法一样

## 兼容性

1. 旧版本的浏览器不支持这两个元素(旧版本flash)

2. 不同的浏览器支持的音视频格式可能不一样

对于mp4、webm可以这么写
<video>
    <source src=".mp4">
    <source src=".webm">
    <p>
        对不起，你的浏览器不支持video元素，请点击这里下载。。
    </p>
</video>  