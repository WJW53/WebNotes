# requestAnimationFrame

屏幕刷新的频率: 60HZ时(每秒闪60次)

如果变化1s超过60次,必然会有一些动画帧会被丢掉(就会有卡顿跳跃的效果)

即便setInterval(func, 1000/60);也会运动不均匀

**1帧的执行时间得少于1/60s,如果大于,则1s中内是执行不完60帧的,会放在2帧、3帧。。执行,因为上一帧不执行完setInterval是不会下一帧的**

`而requestAnimationFrame是每秒60帧且准时执行每一帧`


- cancelAnimationFrame基本上相当于clearTimeout

- requestAnimationFrame兼容性极差,所以目前开发中几乎不用

> 而且不同浏览器不同的实现方式,有差别

## 兼容处理

```js
//做兼容处理
        window.requestAnimationFrame = (function(){
            return window.requestAnimationFrame || 
                    window.webkitrequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(id){
                        window.setTimeout(id,1000/60);
                    }
        }()); 


        window.cancelAnimationFrame = (function(){
            return window.cancelAnimationFrame || 
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    function(id){
                        window.setTimeout(id,1000/60);
                    }
        }());
```