# ES5.0 严格模式

## 一些知识
- es3.0 和 es5.0 非常通用

1. 我们现在的浏览器是基于 es3.0的 + es5.0的新增方法 使用的。它俩产生冲突的部分,按es3.0执行
2. 启用es5.0严格模式 : 那么es3.0和es5.0产生冲突的部分使用es5.0,否则使用es3.0.

## 使用严格模式

1. 在 逻辑最顶端 **(可全局、也可局部--函数内(更推荐局部))** 书写 "use strict";   单双引号都可以,有分号
2. 就是一行字符串,不会对不兼容严格模式的浏览器产生影响.
3. **不支持with,arguments.callee,func.caller 变量赋值前必须声明,拒绝重复属性和参数**
4. **局部this必须被赋值,Person.call() 赋值什么就是什么,123也得是123,不赋值就是undefined,**
5. 一般来说,公司推荐使用严格模式,虽然阉割代码灵活度,但是减小了犯错的概率

## with -- 强大
```js
with(obj){
    console.log(name);
}
```

> with会让它 括号里的对象 当作with要执行的代码体的 作用域链的最顶端 ---- 改变作用域链.(当作最新的AO)
> 相当于把那个对象自己的执行期上下文给了with自己

- 优点:简化代码
- **缺点:过于强大.因为你改了作用域链(本身就很复杂),系统内核会耗费大量的效率(链越长耗费越大)改这个链,效率丧失**


## Js中caller和callee的区别

1. caller 返回一个 调用当前函数的东西的引用 如果是由顶层调用的话 则返回null

（举个栗子哈 caller给你打电话的人  谁给你打电话了 谁调用了你 很显然是下面a函数的执行 只有在打电话的时候你才能知道打电话的人是谁 所以对于函数来说 只有caller在函数执行的时候才存在）
```js
      var callerTest = function() {
           console.log(callerTest.caller) ;  
     } ;
      function a() {
           callerTest() ;   
     }
     a() ;//输出function a() {callerTest();}
     callerTest() ;//输出null 
```
 

2. callee 返回一个正在被执行函数的引用  （这里常用来递归匿名函数本身 但是在严格模式下不可行）
     callee是arguments对象的一个成员 表示对函数对象本身的引用 ,callee有个length属性（代表形参的长度）
```js
     var c = function(x,y) {
             console.log(arguments.length,arguments.callee.length,arguments.callee)
      } ;
     c(1,2,3) ;//输出3 2 function(x,y) {console.log(arguments.length,arguments.callee.length,arguments.callee)}
```

###  new之后控制台打印的是: 该对象的constructor的名 对象的标准形式{}


### eval
> **nb,可以打印字符串中的js代码.但不幸的是,es3.0里都不让使用eval,说eval是魔鬼,可在es5.0严格模式下使用**
> 更强大的用法 , 可以自行搜索,但是挺复杂
