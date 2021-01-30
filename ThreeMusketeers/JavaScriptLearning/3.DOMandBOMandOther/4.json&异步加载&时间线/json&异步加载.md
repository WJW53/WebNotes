## json

- **JSON是一种传输数据的格式. 以对象为样板,本质上就是对象.json里的属性名必须用双引号搞起来,便于区分**
- **但用途有区别 : 对象就是本地用的,json是用来传输的.**

- xml可以自定义标签,而html不可以

1. JSON.parse();            string — > json
2. JSON.stringify();        json — > string


## 铺垫--domTree
1. 
- 计算机的异步代表同时发生,同步代表不同时
- 生成dom树的过程叫dom节点的**解析**,dom解析完之后domtree就会形成。下载完一定在解析完之后
                domTree(深度优先遍历)
                    <html>
    <head>                          <body>
        title   meta                  div   span    img(解析)ifram   strong
                                                                       em                 


2. cssTree 跟 dom 节点一一对应
3. domTree + cssTree = renderTree,然后浏览器的引擎会按照rendertree的顺序绘制页面

4. domTree一改变(dom结点的增删,改:宽高变化、位置变化,查:offsetWidth、offsetHeight等)
renderTree就会reflow(重排,从第一行开始重新来),所以使得页面效率低,要尽量避免reflow
repaint 重绘: 改字体颜色,背景图片,只要不影响后续的玩意儿,就影响小,叫重绘.


## 异步(同时)加载JS

- **js加载(同步--不能同时)的缺点：加载工具方法没必要阻塞文档，过得js加载会影响页面效率，一旦网速不好，那么整个网站将等待js加载而不进行后续渲染等工作。**

- 有些工具方法需要按需加载，用到再加载，不用不加载。

- 凡是属性名==属性值的,就写个属性名就行

### javascript 异步加载 的 三种方案
1. **defer 异步加载，但要等到dom文档全部解析完才会被执行。只有IE能用，也可以将代码写到内部。**
- <script  defer="defer">var a = 123;</script>

2. **async 异步加载，加载完就执行，async只能加载外部脚本src="test.js"，不能把js写在script 标签里。**
- IE9以下不好使
- asychronous:异步;     ajax:asychronous javascript and xml
-    1、2 执行时都不会阻塞页面

3. **最常用,兼容性最好,且是按需加载!创建script，插入到DOM中，加载完毕后callBack**

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'test.js';//这句一执行完,系统就会开启一个线程异步地去下载这个test.js,加载script
//只到这一步的话,在network中没显示而已,但实际上已经下载加载了

document.head.appendChild(script);//当把这个标签插入到页面里去,才会去执行这个script
```

- **loadScript('test.js', function(){test();});**要用匿名函数..详情看test.html/js
- 就是传的callback是函数引用,这样的话,执行时才会一切正常,按需加载
或者传字符串用eval()但是不推荐使用eval
- 更好的方法:传字符串,用tools[callback]();而callback="test";


### AJAX - onreadystatechange 事件
>当请求被发送到服务器时，我们需要执行一些基于响应的任务。
**每当 readyState 改变时，就会触发 onreadystatechange 事件。**
readyState 属性存有 XMLHttpRequest 的状态信息。

下面是 XMLHttpRequest 对象的三个重要的属性：

1. onreadystatechange	存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
2. readyState	
存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪

3. status
200: "OK"
404: 未找到页面