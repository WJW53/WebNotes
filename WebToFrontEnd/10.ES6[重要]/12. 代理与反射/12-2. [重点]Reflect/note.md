# Reflect

- 好好理解通彻就行,相当于一种铺垫

## Reflect是什么?

Reflect是一个内置的JS对象(底层实现),它提供了一系列方法,可以让开发者通过调用这些方法,访问一些JS底层功能

由于它类似于其他语言的**反射**,因此取名为Reflect

## 它可以做什么

使用Reflect可以实现诸如 属性的赋值与取值、调用普通函数、调用构造函数、判断属性是否存在于对象中  等等功能.

## 这些功能不是已经存在了吗? 为什么还需要用Reflect实现一次?

有一个很重要的理念,在ES5就被提出: `减少魔法,让代码更加纯粹`

`基本凡是底层实现的,都认为是魔法`

这种理念很大程度上是受到函数式编程的影响

**ES6进一步贯彻了这种理念,它认为,对属性内存的控制、原型链的修改、函数的调用等等,这些都属于底层实现,属于一种魔法.因此,需要将它们提取出来,形成一个正常的API,并高度聚合到某个对象中,于是,就造成了Reflect对象。**


## 它里面到底提供了哪些API呢?

- Reflect.set(target, propertyKey, value): 设置对象target的属性propertyKey的值为value，等同于给对象的属性赋值
- Reflect.get(target, propertyKey): 读取对象target的属性propertyKey，等同于读取对象的属性值
- Reflect.apply(target, thisArgument, argumentsList)：调用一个指定的函数，并绑定this和参数列表。等同于函数调用
- Reflect.deleteProperty(target, propertyKey)：删除一个对象的属性
- Reflect.defineProperty(target, propertyKey, attributes)：类似于Object.defineProperty，不同的是如果配置出现问题，返回false而不是报错
- Reflect.construct(target, argumentsList)：用构造函数的方式创建一个对象
- Reflect.has(target, propertyKey): 判断一个对象是否拥有一个属性
- 其他API：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
