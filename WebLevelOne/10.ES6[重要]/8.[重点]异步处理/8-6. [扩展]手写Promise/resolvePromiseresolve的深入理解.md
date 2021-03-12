# 关于Promise.resolve(v)和new Promise(resolve =＞ resolve(v))是否等价问题

借鉴在《ECMAScript 6 入门》一书中描述的内容，Promise.resolve('foo')等价于new Promise(resolve => resolve('foo'))。如果resolve的参数是一个promise对象呢，是否仍然等价？

## Demo1
```js
let p1 = Promise.resolve(1);
let p2 = new Promise(resolve => resolve(1));
console.log(p1);
console.log(p2);
// Promise {<fulfilled>: 1} 
// Promise {<fulfilled>: 1}
```


## Demo2
```js
let p = Promise.resolve(1);
let p3 = Promise.resolve(p);
let p4 = new Promise(resolve => resolve(p));
console.log(p3);
console.log(p4);
// Promise {<fulfilled>: 1}
// Promise {<pending>}
```
发现p3和p4的状态不一样了



## Demo3
```js
let p = Promise.resolve(1);
let p3 = Promise.resolve(p);
let p4 = new Promise(resolve => resolve(p));
p4.then(() => console.log('promise1'))
  .then(() => console.log('promise2'));
p3.then(() => console.log('promise3'))
  .then(() => console.log('promise4'))
  .then(() => console.log('promise5'));
// promise3
// promise4
// promise1
// promise5
// promise2
```
发现p4中指定的回调函数延迟了两个时序执行。再看Demo4相关的等价代码，推迟了两个时序的then执行。



## Demo4
`Promise.resolve(thenable)`等价于`new Promise(resolve => { 	Promise.resolve().then(()=>{ 		p.then(resolve); 	}); });`
```js
let p = Promise.resolve(1);
let p3 = Promise.resolve(p);
//Promise.resolve(thenable) 等价于如下代码
let p4 = new Promise(resolve => {
	Promise.resolve().then(()=>{
		p.then(resolve);
	});
});
p4.then(() => console.log('promise1'))
  .then(() => console.log('promise2'));
p3.then(() => console.log('promise3'))
  .then(() => console.log('promise4'))
  .then(() => console.log('promise5'));
```


![](./Promiseresolve(thenable).jpg)

第一次宏任务执行，遇到如上图选中的A区块，会将A加入到微任务队列，继续执行，接着会将`() => console.log('promise3')`加入到微任务队列，本次循环结束之前会执行微任务队列中的这两个回调函数。

A区块的执行会将`resolve`放入队列，`() => console.log('promise3')`执行打印出`promise3`;执行完毕会将`() => console.log('promise4')`放入队列，继续执行。

resolve执行，会通知`p4`状态改变为`fulfilld`，进而将`() => console.log('promise1')`放入队列，`() => console.log('promise4')`执行，打印出`promise4`，执行完毕会将`() => console.log('promise5')`放入队列。因此一次打印`promise1`和`promise5`,同理, 最后打印 `promise2`

---------------------------------------------------------------------

```js
    // v是一个实例化的promise，且状态为fulfilled
    let v = new Promise(resolve => {
      console.log("begin");
      resolve("then");
    });

    // 在promise里面resolve一个状态为fulfilled的promise

    // 模式一 new Promise里的resolve()
    // begin->1->2->3->then->4 可以发现then推迟了两个时序
    // 推迟原因：浏览器会创建一个 PromiseResolveThenableJob 去处理这个 Promise 实例，这是一个微任务。
    // 等到下次循环到来这个微任务会执行，也就是PromiseResolveThenableJob 执行中的时候，因为这个Promise 实例是fulfilled状态，所以又会注册一个它的.then()回调
    // 又等一次循环到这个Promise 实例它的.then()回调执行后，才会注册下面的这个.then(),于是就被推迟了两个时序
    new Promise(resolve => {
      resolve(v);
    }).then((v)=>{
        console.log(v)
    });

    //  模式二 Promise.resolve(v)直接创建
    // begin->1->then->2->3->4 可以发现then的执行时间正常了，第一个执行的微任务就是下面这个.then
    // 原因：Promise.resolve()API如果参数是promise会直接返回这个promise实例，不会做任何处理
/*     Promise.resolve(v).then((v)=>{
        console.log(v)
    }); */

    new Promise(resolve => {
      console.log(1);
      resolve();
    })
      .then(() => {
        console.log(2);
      })
      .then(() => {
        console.log(3);
      })
      .then(() => {
        console.log(4);
      });
```

## resolve()本质作用

1. resolve()是用来表示promise的状态为fullfilled，相当于只是定义了一个有状态的Promise，但是并没有调用它；
2. promise调用then的前提是promise的状态为fullfilled；
3. 只有promise调用then的时候，then里面的函数才会被推入微任务中；

-----------------------------------------------------------------------------
参考
Promise.resolve()与new Promise(r => r(v))  https://segmentfault.com/a/1190000020980101

async await 和 promise微任务执行顺序问题 https://segmentfault.com/q/1010000016147496?_ea=5766963#

What's the difference between resolve(thenable) and resolve('non-thenable-object')?    https://stackoverflow.com/questions/53894038/whats-the-difference-between-resolvethenable-and-resolvenon-thenable-object

作者：小编
链接：https://juejin.cn/post/6936515826514149389
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。