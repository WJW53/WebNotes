[TOC]

## 先讲个别的：计算机内部的精度偏差问题

0.14 * 100==14.000000000000002(JS,小数保留15位)
但是:
1000000000000000000000001+10000000000000000000000002342341
1.0000001e+31

经多组数据实验后:JS可正常计算的范围,小数点前16位以及后16位,超过16则出错

Math.random()-->(0,1)随机一个浮点数,toFixed()保留几位小数,这个最后也会有问题

如何解决?-->Math.floor();Math.ceil();向下/向上取整.所以一般这么写:

- var num = Math.floor(Math.random()*100);


# call & apply(必考)

- 官方对call的解释:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call

- ***深入了解call,好好看一看***
1.https://www.jianshu.com/p/00dc4ad9b83f
(看这一篇就行)
2. https://www.cnblogs.com/donghezi/p/9742778.html

- 每个函数都包含两个非继承而来的方法：call()和apply();

## 根据下述典例的总结

https://blog.csdn.net/weixin_34214500/article/details/88205471

*就是说只要一个方法中call 出现两次或者两次以上，他都会在第二步，把前面的行为主体变成你传入的参数(第一个)，然后让其执行call()*

**所以fn1.call.call(fn2) 其实就等于 fn1.call. … .call(fn2) 等于fn2()**

## call原理 可能是这样,具体看 最后面的的例子吧
- 参考:https://blog.csdn.net/u010377383/article/details/80646415
- 基本为以下三部。

// 1. 将函数设为对象的属性
 o.fn = bar
// 2. 执行该函数
 o.fn()
// 3. 删除该函数
 delete o.fn

所以我们基于ES3 实现call
```
Function.prototype.es3Call = function (context) {
  var content = context || window;
  content.fn = this;
  var args = [];
  // arguments是类数组对象，遍历之前需要保存长度，过滤出第一个传参
  for (var i = 1, len = arguments.length ; i < len; i++) {
    // 避免object之类传入
    args.push('arguments[' + i + ']');
  }
  var result = eval('content.fn('+args+')');
  delete content.fn;
  return result;
}
```

## 用法

### 语法
> function.call(thisArg, arg1, arg2, ...)

### 参数

1. thisArg
可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值
*如果这个函数处于非严格模式下，则指定为this、null 或 undefined 时会自动替换为指向全局对象，原始值会被包装*
*严格模式下的this是undefined*

2. arg1, arg2, ...
指定的参数列表。

## 作用 : 改变函数体内部this的指向
- 一般借用别的构造函数改变自己this的指向

test();--->test.call();

call()的第一个参数就会使得this指向这个参数,后面的可正常传参

## 区别: 后面传的参数书写方式不同
1. call (除了第一个参数)需要把实参按照形参的个数传进去
2. apply (除了第一个参数)需要传一个arguments数组

## call的经典例子

- 看图片

#### 2.2、call方法原理
模拟Function中内置的call方法，写一个myCall方法，探讨call方法的执行原理
```
function sum(){
    console.log(this);
}
function fn(){
    console.log(this);
}
var obj = {name:'iceman'};
Function.prototype.myCall = function (context) {
    // myCall方法中的this就是当前我要操作和改变其this关键字的那个函数名

    // 1、让fn中的this关键字变为context的值->obj
    // 让this这个函数中的"this关键字"变为context
    // eval(this.toString().replace("this","obj"));

    // 2、让fn方法在执行
    // this();
};
fn.myCall(obj);// myCall方法中原来的this是fn
sum.myCall(obj);// myCall方法中原来的this是sum
```

>当 fn.myCall(obj); 这行代码执行的时候，根据this的寻找规律，在myCall方法前面有"."，那么myCall中的this就是fn。执行myCall的方法，在第一步会将方法体中this换为传入的对象，并且执行原来的this， 注意：是执行原来的this（我在学这一块的时候这里理解了好久），在本例中就是执行fn。

看完以上那段话是不是有些懵逼了呢？哈哈，没事，接下来看下面例子，理解一下。

#### 2.3、call方法经典例子
```
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
```

#### 2.3.1、输出一
fn1.call(fn2); // 1

首先fn1通过原型链查找机制找到Function.prototype上的call方法，并且让call方法执行，此时call这个方法中的this就是要操作的fn1。在call方法代码执行的过程过程中，首先让fn1中的“this关键字”变为fn2，然后再让fn1这个方法执行。

注意：在执行call方法的时候，fn1中的this的确会变为fn2，但是在fn1的方法体中输出的内容中并没有涉及到任何和this相关的内容，所以还是输出1.

#### 2.3.2、输出二(重点难点)
fn1.call.call(fn2); // 2

*首先fn1通过原型链找到Function.prototype上的call方法，然后再让call方法通过原型再找到Function原型上的call（因为call本身的值也是一个函数，所以同样可以让Function.prototype），在第二次找到call的时候再让方法执行，方法中的this是fn1.call，首先让这个方法中的this变为fn2，然后再让fn1.call执行。*

这个例子有点绕了，不过一步一步来理解。在最开始的时候，fn1.call.call(fn2) 这行代码的最后一个call中的this是fn1.call，根据前面的理解可以知道 fn1.call 的原理大致为：
```
Function.prototype.call = function (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是fn1
};
将上面的代码写为另一种形式：

Function.prototype.call = test1;
function test1 (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是fn1
};
```
我们知道，这两种形式的写法的作用是一样的。那么此时可以将 fn1.call.call(fn2) 写成 test1.call(fn2) ，call中的的this就是test1：
```
Function.prototype.call = function (context) {
    // 改变fn中的this关键字
    // eval(....);
    
    // 让fn方法执行
    this(); // 此时的this就是test1
};
```

**注意：此时call中的的this就是test1。**

然后再将call中this替换为fn2，那么test1方法变为：

```
Function.prototype.call = function (context) {
    // 省略其他代码
    
    fn2(); 
};
```

所以最后是fn2执行，所以最后输出2。
