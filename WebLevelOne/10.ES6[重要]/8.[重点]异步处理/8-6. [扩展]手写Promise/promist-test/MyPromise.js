const MyPromise = (() => {
  const PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
    PromiseState = Symbol("PromiseState"), //状态
    PromiseResult = Symbol("PromiseResult"), //状态数据
    changeState = Symbol("changeState"), //改变状态及数据
    thenables = Symbol("thenables"), //thenable
    catchables = Symbol("catchables"), //catchable
    settleHandle = Symbol("settleHandle"), //后续处理的通用函数
    linkPromise = Symbol("linkPromise"); //串联的Promise

  return class MyPromise {
    /**
     *
     * @param {*} newState
     * @param {*} newResult
     * @param {*} queue 执行的作业队列
     */
    [changeState](newState, newResult, queue) {
      if (this[PromiseState] !== PENDING) {
        return; //状态无法变更
      }
      //更新状态和状态数据
      this[PromiseState] = newState;
      this[PromiseResult] = newResult;
      //执行相应队列中的函数,所以我们模拟的时候实际上是

      //以下是针对: 未决推向已决的语句在setTimeout等异步函数中时
      //即使用的时候,先then注册后续处理函数,执行栈空了之后,setTimeout里面的
      //resolve/reject触发,然后再来这里将所有的后续处理函数依次执行即可
      queue.forEach((handler) => handler(newResult));
    }
    /**
     *
     * @param {function} executor 未决阶段(pending状态)下的处理函数
     */
    constructor(executor) {
      this[PromiseState] = PENDING;
      this[PromiseResult] = undefined;
      this[thenables] = []; //后续处理函数的数组 -> fulfilled
      this[catchables] = []; //                 -> rejected

      const resolve = (data) => {
        //注意箭头函数,因为使用的时候是直接resolve();
        this[changeState](FULFILLED, data, this[thenables]);
      };

      const reject = (reason) => {
        this[changeState](REJECTED, reason, this[catchables]);
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    /**
     * 后续处理通用函数
     * @param {*} handler 后续处理函数
     * @param {*} immediatelyState 需要立即执行的状态
     * @param {*} queue 作业队列
     */
    [settleHandle](handler, immediatelyState, queue) {
      if (typeof handler !== "function") {
        return;
      }
      if (this[PromiseState] === immediatelyState) {
        //已决状态立即执行
        // queueMicrotask(() => {
        //   handler(this[PromiseResult]);
        // });
        handler(this[PromiseResult]); //没必要了，因为linkPromise里我在对应的外层设置了一个queueMicrotask
        // setTimeout(() => {// 定时器/nextTick, 环境不同,
        //     handler(this[PromiseResult]);//记住这里
        // }, 4);
      } else {
        //否则加入作业队列中
        queue.push(handler);
      }
    }

    //链式调用,精髓
    [linkPromise](thenable, catchable) {
      const exec = (data, handler, resolve, reject) => {
        try {
          const result = handler(data); //得到当前Promise的处理结果
          //   console.log("result", result);
          if (newMyPromise === result) {
            //解决循环引用的问题
            return reject(
              new TypeError("Chaining cycle detected for promise #<Promise>")
            );
          }
          if (result instanceof MyPromise) {
            //如果当前返回值是Promise对象
            result.then(
              (newData) => {
                //那么,你完成我就完成
                resolve(newData);
              },
              (err) => {
                //你失败我就失败
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      //返回的新的Promise的状态与之前的promise一致,而状态数据是这个thenable的返回值
      //所以重点在如何控制thenable何时执行,这样我们才能用resolve/reject
      const newMyPromise = new MyPromise((resolve, reject) => {
        this[settleHandle](
          (data) => {
            //这里是不能直接写thenable的,我们需要封装一下,
            //也就是当这里的函数运行了,我就知道,噢,需要执行thenable了
            //防止值的穿透:

            //用3个特殊的例子测试，0~6、循环引用、静态resolve后在then中resolve
            return queueMicrotask(() => {
              //queueMicrotask解决了第1种情况
              //确保newMyPromise已经初始化完毕
              if (typeof thenable !== "function") {
                //父级promise没有注册thenable时,那交给我来处理
                return resolve(data);
              }
              return exec(data, thenable, resolve, reject);
            });
            // setTimeout(() => {//如果在settleHandle中使用了queueMicrotask, 此处必须使用setTimeout才能解决了第三种情况
            //   //确保newMyPromise已经初始化完毕
            //   if (typeof thenable !== "function") {
            //     //父级promise没有注册thenable时,那交给我来处理
            //     return resolve(data);
            //   }
            //   return exec(data, thenable, resolve, reject);
            // }, 4);
            // return exec(data, thenable, resolve, reject);
          },
          FULFILLED,
          this[thenables]
        );

        this[settleHandle](
          (reason) => {
            return queueMicrotask(() => {
              if (typeof catchable !== "function") {
                //父级promise没有注册catchable时,那交给我来处理
                return reject(reason);
              }
              return exec(reason, catchable, resolve, reject);
            });
            // return exec(reason, catchable, resolve, reject);
            // setTimeout(() => {
            //   if (typeof catchable !== "function") {
            //     //父级promise没有注册catchable时,那交给我来处理
            //     return reject(reason);
            //   }
            //   return exec(reason, catchable, resolve, reject);
            // }, 4);
          },
          REJECTED,
          this[catchables]
        );
      });

      return newMyPromise;
    }

    then(thenable, catchable) {
      return this[linkPromise](thenable, catchable);
    }

    catch(catchable) {
      return this[linkPromise](undefined, catchable);
    }

    /**
     * 其他API
     * all、race、resolve、reject
     * @param {*} proms
     */
    static all(proms) {
      return new MyPromise((resolve, reject) => {
        //这里我选用了es5的写法，es6写就太简单了，直接for let i...
        //将proms映射为新数组,每个元素是一个对象
        const results = proms.map((p) => {
          const obj = {
            result: undefined,
            isFulFilled: false,
          };

          p.then(
            (data) => {
              obj.result = data;
              obj.isFulFilled = true;
              //判断是否全部都fulfilled
              const unFulFilled = results.filter((r) => !r.isFulFilled);
              if (unFulFilled.length === 0) {
                //即全部fulfilled了
                resolve(results.map((r) => r.result)); //再映射一下
              }
            },
            (reason) => {
              //有一个失败,整体都失败
              reject(reason);
            }
          );

          return obj;
        });
        // console.log(results);
      });
    }

    static race(proms) {
      return new MyPromise((resolve, reject) => {
        proms.forEach((p) => {
          //只要有一个已决,就结束了
          Promise.resolve(p) //如果不是Promise实例需要转化为Promise实例
            .then(
              (data) => {
                resolve(data);
              },
              (err) => {
                reject(err);
              }
            );
        });
      });
    }

    static resolve(data) {
      if (data instanceof MyPromise) {
        return data;
      } else {
        return new MyPromise((resolve, reject) => {
          resolve(data);
        });
      }
    }

    static reject(reason) {
      return new MyPromise((resolve, reject) => {
        reject(reason);
      });
    }
  };
})();
