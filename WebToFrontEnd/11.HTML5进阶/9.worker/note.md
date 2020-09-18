# Worker

- 不常用

Worker打破了一个概念: js都是单线程的

> worker是多线程的,而且是真的多线程,不是伪多线程(ajax可以认为是伪的)

`是完全独立的线程,与主线程之间用postmessage发送消息,onmessage接收消息`

速度很快,计算量越大,性能提升越明显

## Worker有很多限制

1. 不能操作DOM

2. 没有window对象

3. 不能读取本地文件

4. 但是可以发ajax, 可以计算, 但忽略不计 没必要在这两个地方用worker

## 在worker中能否继续创建worker？

在理论上是可以的,但是实际上没有任何一款浏览器支持



globalworkerstop?..忽略忽略 现在都不支持