# 事件

## 事件绑定：

1. .on()        很重要,具体看两个html文件.  挺强大的,确实人封装好的是真好使啊.  很常用

2. .one()       跟on基本差不多,就是这哥们是一次性事件,用的很少,一般就是用来做广告的
第一次执行我写的内容,第二次开始就该干嘛干嘛了. 在它里面写return false;可以阻止一切默认事件、冒泡

3. .off()       不填写参数,则解绑所有的事件

4. .trigger()   很重要,帮你主动触发事件,无论系统还是自定义事件都可以

5. .click/keydown/mouseenter…

### 思考题

看看鼠标滑轮事件:  .mouseheel()


## 兼容的事件对象：

1.	e.pageX、e.clienX、e.which、e.button

2.	e.preventDefault()

3.	e.stopPropagation()

4.	return false; 


