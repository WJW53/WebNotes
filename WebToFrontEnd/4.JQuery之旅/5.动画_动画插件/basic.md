# 动画

## 动画相关方法：

1.	.hide()、.show()、.toggle()
		参数：null 或 （duration, easing, callblack）

2.	.fadeIn、.fadeout 、.fadeToggle、.fadeTo()	
		参数：null或 （duration, [opacity,这个是fadeTo才能传的], easing, callblack）
**代表: 变化时间,可放可不放透明度,变化方式,变化完成后执行的函数**

3.	.slideDown()、.slideUp()、.slideToggle()
		参数：null或 （duration, easing, callblack）

4.	.animate()      很重要
		参数：(target duration easing callback）


5.	.stop() .finish()
		参数：true false

    1). .stop();
```
$('#stopBtn').on('click',function(){
        //$('.demo').stop();//不传参的话,只会阻止当前运动,并转向下一次运动
        $('.demo').stop(true);//传一个true的话,直接停止运动,停了
        // $('.demo').stop(true,true);//传两个true的话,停止当前运动,并瞬间移动到当前运动目标点
      });
```

    2). .finish();
```
$('#finishedBtn').on('click',function(){
          $('.demo').finish();//无论后面有多少次运动,直接跳到最后一次运动的目标点
      });
```

    3). .delay();   参数填数字即可,要延迟多少ms


6.	jQuery.fx.off = true; 是否关闭运动过程动画,true代表关闭动画,所以会直接跳到目标点


7. 引入jQuery Easing Plugin: 用于扩展jQuery动画过渡效果 (有很多数学算法)
> 先引入jQuery再引入它

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>