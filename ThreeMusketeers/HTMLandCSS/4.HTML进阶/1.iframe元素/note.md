# iframe元素

表示框架页

通常用于在网页中嵌入另一个页面

iframe是一个可替换元素

可替换元素：

1. 通常是行盒
2. `通常显示的内容取决于元素的属性`
3. CSS不能完全控制其中的样式
4. 具有行块盒的特点

> 通过检测，我发现当scrolling="auto"或者"yes"时，如果设置了body，那么就会使用body里的设置；当scrolling="no"时，不管body设置了什么，都会使用scrolling的设置，即全部的滚动条都被去掉了。

```关于iframe产生的滚动条样式```
http://www.divcss5.com/html5/h54793.shtml