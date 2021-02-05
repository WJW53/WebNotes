const MyPromise = (() => {
    
    //我觉得,不管写任何原理,最主要是先要弄明白这个东西总共做了些什么事儿,我们需要知道我们具体要实现什么
    //这样才能一步步地去解决问题.  将原理步骤用文字先一步步的阐述下来,梳理好,再去写代码

    /**
     * 1. 分两个阶段:未决和已决(不可逆), 且未决拥有推向已决的能力
     *  1.1 未决是pending状态,已决是fulfilled或rejected
     *  1.2 无论阶段还是状态,都是不可逆的!!
     *  1.3 在未决阶段如果发生未捕获的错误会将状态推向rejected,并会被catchable捕获
     * 
     * 2. 达到已决阶段后,通常需要进行后续处理,不同的已决状态决定了不同的后续处理
     *  2.1 fulfilled/resolved(有的地儿也这么叫,但A+规范中是fulfilled): 正常的已决,后续处理为thenable
     *                  可以用实例方法then注册thenable和catchable
     *  2.1 rejected: 非正常的已决,后续处理为catchable
     *                  可以用实例方法catch注册catchable
     * 
     * --ps: 在做后续处理之前关于Promise的代码都是同步的!!then/catch方法中才是异步,微队列,我们用宏队列模拟
     * 
     * 3. Promise串联(也是核心):当后续Promise需要用到前面的Promise的处理结果时,就需要Promise串联
     *       无论then还是catch方法,返回的都是一个新的Promise,新的Promise的状态有如下规则
     * --ps: 下述语句中将当前Promise称作父Promise,由它的then/catch方法所返回的新的Promise称之为子Promise
     *      3.1 父Promise是未决则子Promise也未决,即pending状态;
     *      3.2 若父已决,则会先运行父的后续处理函数,然后将正常的返回值作为子Promise的fulfilled的状态数据;
     *                              若是非正常的返回值(抛出错误),则将其作为子Promise的rejected的状态数据.
     *      3.3 子Promise一定会等到父Promise有了后续处理结果后,才会变成已决状态,否则仍为未决,因为异步嘛!!
     *      3.4 若父Promise的后续处理里返回的也是一个Promise,则子Promise的状态及状态数据与这个Promise一致
     * 
     * 4. 关于Promise的一些API
     *      4.1 实例成员(pro.xxx()):
     *          then：注册一个后续处理函数，当Promise为resolved状态时运行该函数
                        then也可以注册catchable函数,只是习惯上只注册一个resolve的
                catch：注册一个后续处理函数，当Promise为rejected状态时运行该函数
                finally：ES2018的api, 注册一个后续处理函数(无参), 当Promise为已决时(不论fulfilled还是rejected都),
                                执行完then和catch的回调后,都会执行finally方法内指定的回调
                            
            4.2 静态成员(Promise.xxx()):
                resolve(data): 返回一个fulfilled/resolved状态的Promise,data即为状态数据
                    ps: 特例: 若data是一个Promise对象,则直接返回这个data,但是不同浏览器可能导致情况不同
                reject(data): 返回一个rejected状态的Promise,data即为状态数据
              ps: all和race 常用于处理多个promise对象的状态集合
                all(iterable数组--proms): 也是返回一个新的Promise,规则呢?子Promise全成才成,一败则败;
                        成时,将iterable中所有的返回值收集到一个数组中,然后作为状态数据
                        败时,第一个败的错误信息及作为状态数据
                race(iterable数组--proms): 任意一个子Promise成功或失败,则返回新的Promise内部就会执行对应的
                                            resolve();/reject();
                            注意:在forEach中如果不是prom不是Promise实例则需要转化先为Promise实例

        5. 行了,可以开始写代码了
    我是先写静态成员API,然后写状态控制,再写后续处理,接着是最重要的Promise串联(链式调用),再写其他实例成员API,记得解决undefined的bug
     */

    const PENDING = "pending",//未决:挂起状态
        FULFILLED = "fulfilled",//已决:按照正常逻辑进行下去的状态
        REJECTED = "rejected",//已决:未能正常进行,通常表示出现错误的状态
        PromiseState = Symbol("PromiseState"),//状态
        PromiseResult = Symbol("PromiseResult"),//状态数据
        changeState = Symbol("changeState"),//状态改变,不可逆
        thenables = Symbol("thenables"),//已决阶段作业队列,第二个参数也可以注册catchable
        catchables = Symbol("catchables"),//reject后的作业队列
        settleHandle = Symbol("settleHandle"),//后续处理函数的通用函数
        linkPromise = Symbol("linkPromise");//链式调用



    return class MyPromise {
        /**
         * 
         * @param {String} newState 
         * @param {*} newResult 
         * @param {Array} queue 
         */
        [changeState](newState, newResult, queue) {
            if (this[PromiseState] !== PENDING) {//代表已决,则状态无法变更
                return;
            }
            this[PromiseState] = newState;//更新状态和状态数据
            this[PromiseResult] = newResult;
            //为什么要在这里加个queue并执行完所有的后续处理函数呢?
            //因为可能使用Promise的时候,在它的未决阶段的处理函数内我们使用了异步函数,比如setTimeout,这样的话,
            //后续的then/catch就会都先注册进作业队列,setTimeout时间到了之后状态才改变,此时我们就应该立即执行作业队列中的函数了
            queue.forEach(handler => handler(newResult));
            // console.log('changeState');
        }

        /**
         * 
         * @param {Function} executor - 代表未决阶段下的处理函数
         */
        constructor(executor) {
            this[PromiseState] = PENDING;//初始化状态和状态数据
            this[PromiseResult] = undefined;
            //初始化作业队列为数组
            this[thenables] = [];
            this[catchables] = [];

            const resolve = (data) => {//这里一定要用箭头函数,因为在外面使用的时候是直接resolve()
                this[changeState](FULFILLED, data, this[thenables]);//记得传入作业队列
            };
            const reject = (reason) => {
                this[changeState](REJECTED, reason, this[catchables]);
            }

            try {
                executor(resolve, reject);//执行并传参
            } catch (error) {
                reject(error);
            }
        }


        /**
         * 
         * @param {Function} handler                后续处理
         * @param {String} immediatelyState         需要立即执行的状态
         * @param {Array} queue                     后续处理函数的作业队列
         */
        [settleHandle](handler, immediatelyState, queue) {
            if (typeof handler !== 'function') {
                return;
            }
            if (this[PromiseState] === immediatelyState) {//已决状态,立即执行
                //因为是异步的,我们拿setTimeout模拟
                setTimeout(() => {
                    // console.log('settleHandle');
                    handler(this[PromiseResult]);
                }, 4);
            } else {
                queue.push(handler);//否则加入作业队列,等待执行
            }

        }

        /**
         * 
         * @param {*} thenable 
         * @param {*} catchable 
         * @return {MyPromise} - 返回一个全新的Promise,规则已经在上述梳理中写了
         */
        [linkPromise](thenable, catchable) {
            function exec(data, handler, resolve, reject) {
                try {//因为不论当前then是成功还是失败回调,都会有正常的返回值,它都会走向下一个then的成功回调,
                    //所以这里要用try-catch,只有当这里也执行出错,才会rejected,否则依然fulfilled(返回的是Promise的话另说,见下述)
                    const result = handler(data);//得到当前Promise的处理结果
                    if (result instanceof MyPromise) {
                        result.then(newData => {//那么必须要等这个result已决之后,我们才能将要返回的Promise推向已决
                            resolve(newData);
                        }, err => {
                            reject(err);
                        });
                    } else {
                        // console.log('ok,exec,resolve');
                        resolve(result);//-->fulfilled
                    }
                } catch (error) {
                    reject(error);//-->rejected
                }
            }


            //这个新的Promise与之前的Promise状态及数据一致,但一定得等到前面的Promise的后续处理函数完成,才能resolve/reject
            return new MyPromise((resolve, reject) => {
                // this[settleHandle](thenable, FULFILLED, this[thenables]);
                // this.catch(catchable);
                //能不能在这里直接这样写?  ----   当然不能了,why? ---- 我们无法得知何时运行后续处理函数,从而无法统一新的Promise的状态、数据
                //我们需要封装一下,即: 当执行exec时,我们就知道了,需要在里面执行thenable/catchable,然后就可以resolve/reject啦
                this[settleHandle](data  => {
                    //防止值的穿透:
                    //这里有个隐藏的很深的问题,就是比如: 之前的Promise只已决为了fulfilled,但是呢,它没有注册thenable,只注册了catchable
                    //那怎么办,那你没处理,之后我们后面的兄弟帮你处理了呀
                    if (typeof thenable !== 'function') {
                        resolve(data);
                        return;
                    }
                    // console.log('nasha');
                    exec(data, thenable, resolve, reject);
                }, FULFILLED, this[thenables]);

                this[settleHandle](reason => {
                    //同理,这里也一样
                    if (typeof catchable !== 'function') {
                        reject(reason);
                        return;
                    }
                    // console.log('nasha2');
                    exec(reason, catchable, resolve, reject);
                }, REJECTED, this[catchables]);
            });
        }



        //实例成员API
        then(thenable, catchable) {//注册成功和失败回调函数,加入作业队列中
            // this[settleHandle](thenable, FULFILLED, this[thenables]);
            // this.catch(catchable);
            //由于加上了Promise链式调用,那肯定不能按上述这样写了呀
            // console.log('then');
            return this[linkPromise](thenable, catchable);
        }

        catch(catchable) {
            // this[settleHandle](catchable, REJECTED, this[catchables]);
            // console.log('catch');
            return this[linkPromise](undefined, catchable);//注意啊,这个undefined肯定要加啊,不然把你catchable当作thenable了
        }
        finally(callback) {
            // console.log('finally');
            return this.then(data => {
                return new MyPromise((resolve, reject) => {
                    resolve(callback());
                }).then(() => data);
            }, error => {
                return new MyPromise((resolve, reject) => {
                    resolve(callback());
                }).then(() => { throw error });
            })
        }


        //静态成员API
        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            } else {
                return new MyPromise(resolve => {
                    resolve(data);
                });
            }
        }
        static reject(reason) {
            return new MyPromise((resolve, reject) => {
                reject(reason);
            });
        }
        static all(promiseArr) {
            return new MyPromise((resolve, reject) => {
                let index = 0, len = promiseArr.length;
                const ans = new Array(len);
                for (let i = 0; i < len; i++) {//let i;跟踪了作用域,所以即便里面异步没关系,仍然能保证顺序同iterable数组中的一致
                    promiseArr[i].then(res => {
                        ans[i] = res;
                        index++;
                        if (index === len) {
                            resolve(ans);
                        }
                    }).catch(err => {
                        reject(err);
                    })
                }
            })
        }
        static race(promiseArr) {
            return new MyPromise((resolve, reject) => {
                promiseArr.forEach(p => {
                    MyPromise.resolve(p).then(data => resolve(data), error => reject(error));
                })
            })
        }

    }
})();