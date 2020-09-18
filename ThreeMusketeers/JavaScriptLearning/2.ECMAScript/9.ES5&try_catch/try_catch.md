# try{}catch(e){}finally{}

## 抛出错误

错误在js中本质上是一个对象，抛出错误的语法为：

```js
throw 错误对象;
```

错误对象的构造函数为Error

## 用法

> 捕捉错误,避免影响后续代码的执行

- try{}catch(e){}finally{}
1. 若在try里发生的错误,则不会执行try错误代码后续的代码,且catch会捕捉错误传到e里(所以错误不会传到控制台使程序停止),并执行catch内的代码.  若没错误,则不执行catch内容
finally: 无论有无异常里面代码都会执行

2. 使用场景：为容易出错的，容易产生兼容问题的代码段加上try..catch。合处理那些我们无法控制的错误，如I/O操作，后端java读取I/O操作比较多比如读数据库，所以用try catch比较多。前端可以用在上传图片或async await同步调接口。

>注：ECMA-262第3版引入了try catch语句，作为JavaScript中处理异常的一种标准方式。但是在前端js代码中很少看到try catch语句,并不是所以代码都需要加try catch来作得不偿失的“保险”

3. 若try中有错误,也会先被catch捕捉**然后若只是catch里面代码出错,则报catch里面的错误;**
    **若catch和finally都出错则会报finally里面的错误**

 

## 缺点：

1.try catch耗性能
2.try catch捕获不到异步错误
3.try catch可能会导致报错点更模糊

## Error.name
- Error.name的六种值对应的信息：
1. EvalError：eval()的使用与定义不一致**这个不允许我们用,报错是报单独的信息**
2. RangeError：数值越界 
3. ReferenceError：非法或不能识别的引用数值 //最常用
4. SyntaxError：发生语法解析错误 //常用
5. TypeError：操作数类型错误 
6. URIError：URI处理函数使用不当



