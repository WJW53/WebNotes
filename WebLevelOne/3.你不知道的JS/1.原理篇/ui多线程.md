# ui多线程-深入剖析JS执行机制

## 浏览器常驻的线程

1. js引擎线程 （解释执行js代码、用户输入、网络请求）
2. GUI线程 （绘制用户界面、与js主线程是互斥的）
3. http网络请求线程 （处理用户的get、post等请求，等返回结果后将回调函数推入任务队列）
4. 定时触发器线程 （setTimeout、setInterval等待时间结束后把执行函数推入任务队列中）
5. 浏览器事件处理线程 （将click、mouse等交互事件发生后将这些事件放入事件队列中）

## UI主线程负责协调运转



## JS引擎线程和GUI线程-互斥

>*JS可以操作DOM元素，进而会影响到GUI的渲染结果，因此JS引擎线程与GUI渲染线程是互斥的。也就是说当JS引擎线程处于运行状态时，GUI渲染线程将处于冻结状态。*


## Js执行机制 -- 单线程

> *JavaScript是基于单线程运行的，同时又是可以异步执行(由于其他辅助线程的作用)的，一般来说这种既是单线程又是异步的语言都是基于事件来驱动的，恰好浏览器就给JavaScript提供了这么一个环境*

- 导图要表达的内容用文字来表述的话：

1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。


## 同步任务
```
function foo (ot) {
	function bar (it) {
        //debugger
		console.log(it);	
	}
	bar(20);
	console.log(ot);
}
foo(10);
```
0. 代码没有执行的时候，执行栈为空栈
1. foo函数执行时，创建了一帧，这帧中包含了形参、局部变量（预编译过程），然后把这一帧压入栈中
2. 然后执行foo函数内代码，执行bar函数
3. 创建新帧，同样有形参、局部变量，压入栈中
4. bar函数执行完毕，弹出栈
5. foo函数执行完毕，弹出栈
6. 执行栈为空

- **执行栈其实相当于js主线程**


## 异步任务
```
$.ajax({
	url: ‘localhost:/js/demo.json’,
	data: {},
	success: function (data) {
		console.log(data);
	}
});

console.log('run');
```

1. Ajax 进入Event Table，注册回调函数success
2. 执行console.log(‘run’)
3. ajax事件完成后,http网络 请求线程把任务放入Event Queue中
4. 主线程（调用栈）读取任务下执行success函数


## 重新理解定时器

*setTimeout的等待时间结束后并不是直接执行的而是先推入浏览器的一个任务队列，在同步队列结束后再依次调用任务队列中的任务。*

**setTimeout(function(){}, 0)Js主线程中的执行栈为空时，0毫秒实际上也达不到的，根据HTML标准，最低4毫秒。**

*setInterval是每隔一段时间把任务放到Event Queue之中*

ps:console.time和console.timeEnd这两个方法是可以获取在其中间执行的语句所用的时间
```
console.time("test");
    setTimeout("for(var i=0;i<1000;i++)console.log('定时器!');",1000);
    console.log("测试");
console.timeEnd("test");
```