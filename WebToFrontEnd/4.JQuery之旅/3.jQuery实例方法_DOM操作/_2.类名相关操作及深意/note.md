# 类名及相关操作深意(重要)

### 用类名与用.css的区别

```
 $('.demo').click(function(e){
            // $(this);//知道谁点的我
            //console.log(e.target);//会输出原生的标签

            //相当于直接修改css,而css树可以直接缓存,效率更高
            //更整洁,易维护,复用性高,节约代码请求的带宽,对webpack的开展有好的支持
            $('.demo').removeClass('active');//点击就去除所有demo的active,不能换成this
            $(this).addClass('active');//然后再给这个新点击的元素,添加active
            
            // 用.css不好,因为写的是行间样式,而且不能写的麻烦,而且内部.的次数比较多,效率较低
            //这相当于利用JS控制css的,
            // $('.demo').css({backgroundColor:'orange'});
            // $(thsi).css({backgroundColor:'red'});
        });
```        

## 注意

### 1

注意：
1. 尽量避免直接添加行间样式，因为其权重过高 ，这样不利于响应式设计，破坏了c3+h5优雅的解决方案

### 重要2
2. attr和prop的区别：
**jQuery认为：attribute的checked、selected、disabled就是表示该属性初始状态的值，property的checked、selected、disabled才表示该属性实时状态的值(值为true或false)**


### .val()  重要


