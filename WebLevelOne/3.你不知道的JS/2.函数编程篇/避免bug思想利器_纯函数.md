# 函数式编程之纯函数

- 函数f的概念就是,对于输入x产生一个输出y=f(x);

## 定义

**对于相同的输入,永远会得到相同的输出,而且没有任何可观察的副作用,也不依赖外部环境的状态。**
- *纯函数是指 不依赖 且 不修改其作用域之外的变量 的函数*
- *纯函数一定有返回值*


## 作用

> 在JS中你可以很容易的创建全局变量,这些变量可以在所有函数中访问到. 这也是一个导致bug的常见原因.因为程序中的任何部分都可能修改全局变量而导致函数的行为出现异常

1. 纯函数非常容易进行单元测试,因为不需要考虑上下文环境,只需要考虑输入和输出.
2. 纯函数是健壮的,改变执行次序不会对系统造成影响,因此纯函数的操作可以并行执行.

## 用处

1. 更好的管理状态,使得可预测性增强,降低代码管理的难度.
2. 但是前端基本上都是在和副作用打交道,让所有函数都是纯函数这种愿望 不可强求 .

## 举例

### 数组过滤

也是利用了deepClone();


## 惰性函数

- 针对于优化频繁使用的函数
- 常用于，函数库的编写，单例模式之中

