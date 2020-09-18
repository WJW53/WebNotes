# 

## html()   特殊

1. .html();//返回字符串类型的HTML内容

2. 
```
console.log($('ul li').html());//返回的(取值时)是"1",只取第一个的值
        console.log($('ul li').html('OK!'));//但是赋值的时候,会赋值给每一个li        
//其实这在jQuery里是不太正常的,jQuery通常是打包操作,但它取值时只选了一个,类似原生的JS操作
```

3. 里面也是可以传一个函数的,形参同样为index,ele  而ele拿到的都是原生JS标签

4. 赋值时,它是实时的嘛？？,因为我测试:即便先console.log();再重新赋值操作,cl也是得到后者答案


## text()

... 


## size()

ps: 3.0及以上都废弃了size,只能用length了