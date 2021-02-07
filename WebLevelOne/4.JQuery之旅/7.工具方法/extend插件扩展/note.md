# extend -- 重点



因为有了它,jQuery才能让多人共同开发

## $.extend()插件扩展(工具方法)

```js
//$.extend();           //加到工具方法里面的
    //$.fn.extend()         //加到实例方法里面的

    //1.扩展方法    *** API 没有写 ***
    //2.浅层克隆:引用值一样
    //3.深层克隆:引用值不一样

    // //源码是下述这样,共用同一个函数; 因this指向不一样,而造成差别
    // $.extend = $.fn.extend = function(){
         
    // }

    //$.extend(); 扩展方法时: ()里的参数是JSON对象的形式
```



## $.fn.extend()插件扩展(实例方法)

$().xx();

## other

mouseenter 与 mouseover 的区别

Mouseover：不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
Mouseenter：只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。

mouseenter事件在鼠标进入某个元素，或第一次进入这个元素的某个子元素时触发。一旦触发后，在抄mouseleave之前，鼠标在这个元素的子元素上触发mouseenter事件都不会触发这个元素的mouseenter事件。即：一旦进入，在子元素间的mouseenter不算是在本元素上的mouseenter。
而mouseover事件是必然冒泡的，一旦子元素mouseover了，本元素必然mouseover（除非子元素上禁止冒泡了zd）。