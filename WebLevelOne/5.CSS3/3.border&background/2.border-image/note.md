# border-image:

slice是重点(**分为9块,中间的抹掉了**),跟设计师沟通好

border-image-slice:可以填1-4个值(数字/百分比,**是按上右下左的切割线**)，其实可以5个
绝对不能填像素,但填数字指的就是对应的像素. **而100%是一种病态的样子**
第五个值可以填写 fill,意思是把内容区也填充,但这图片背景天生没内容区
一般不填写fill,因为你要是想填内容区,那干嘛不直接不设边框,直接设置内容区的背景颜色呢

border-image-outset:填个像素值,使得图片背景向外延伸

border-image-width:默认值是1,类似于border-width,但它是设置border里能显示的图片背景的宽度
意思是1*border-width,填100的话,就是100倍,那就太诡异了
**填写auto的话,就会向 border-image-slice 去看齐, 相当于拿slice的值再加上px**

border-image-repeat: stretch(默认值)/round(负些责任)/repeat(不负责任的平铺)/space(挺负责的)
也可以填写俩参数,一个代表水平的拉伸方式,另外一个代表垂直的


## 综合写法

border-image:source slice repeat;

