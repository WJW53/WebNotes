const MyPromise = (() => {
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",

        //不想让外面访问到的属性就用Symbol,当然和真正的promise不一样
        //他那个形式是[[]],并且外部也不能访问,用了内部代码,我们现在搞不了
        PromiseValue = Symbol("PromiseValue"), //状态数据
        PromiseStatus = Symbol("PromiseStatus"),//状态
        thenables = Symbol("thenables"), //thenable
        catchables = Symbol("catchbles"), //catchables
        changeStatus = Symbol("changeStatus"),//当前状态
        settleHandle = Symbol("settleHandle"), //后续处理的通用函数
        linkPromise = Symbol("linkPromise");  //创建串联的Promise

    return class MyPromise {

        /**
         * 改变当前Promise的状态
         * @param {*} newStatus 
         * @param {*} newValue 
         * @param {*} queue 执行的作业队列
         */
        [changeStatus](newStatus, newValue, queue) {
            if (this[PromiseStatus] !== PENDING) {
                //状态无法变更
                return;
            }
            this[PromiseStatus] = newStatus;
            this[PromiseValue] = newValue;

            //因为状态变了之后就要执行相应队列中的函数
            queue.forEach(handler => handler(newValue));
        }

        /**
         * 
         * @param {*} executor 未决阶段（pending状态）下的处理函数
         */
        constructor(executor) {
            this[PromiseStatus] = PENDING;
            this[PromiseValue] = undefined;//最初默认是undefined
            this[thenables] = []; //后续处理函数的数组 -> resolved
            this[catchables] = []; //后续处理函数的数组 -> rejected

            const resolve = data => {
                this[changeStatus](RESOLVED, data, this[thenables]);
            }

            const reject = reason => {
                this[changeStatus](REJECTED, reason, this[catchables]);
            }
            try {
                executor(resolve, reject);//捕获未决阶段的错误
            }
            catch (err) {
                reject(err);
            }
        }

        /**
         * 处理 后续处理函数
         * @param {*} handler 后续处理函数
         * @param {*} immediatelyStatus 需要立即执行的状态
         * @param {*} queue 作业队列
         */
        [settleHandle](handler, immediatelyStatus, queue) {
            if (typeof handler !== "function") {//这个很重要,避免then方法没传catchable
                return;
            }
            if (this[PromiseStatus] === immediatelyStatus) {
                //直接运行
                setTimeout(() => {//没办法,只能用这个宏队列模拟微队列,制造异步
                    handler(this[PromiseValue]);
                }, 0);
            }
            else {
                queue.push(handler);
            }
        }


        /**
         * 串联多个Promise  <-->  链式编程思想,非常重要
         * @param {*} thenalbe 
         * @param {*} catchable 
         */
        [linkPromise](thenalbe, catchable) {
            function exec(data, handler, resolve, reject) {
                try {
                    const result = handler(data); //得到当前Promise的处理结果
                    //细节,返回的是个Promise对象怎么办呢
                    //它拿到的还得是数据结果才行,所以做特殊处理
                    if (result instanceof MyPromise) {

                        result.then(d => {//这个d拿到的前面那个data,
                            resolve(d);//所以再搞一次,才会传回一样的data而不是promise对象
                        }, err => {
                            reject(err);
                        })
                    }
                    else {
                        resolve(result);
                    }
                }
                catch (err) {
                    reject(err);
                }
            }

            //返回的是新的Promise对象
            return new MyPromise((resolve, reject) => {
                //这些有的原本是写在then和catch中的,但是因为在那里的话,
                //我们就无法得知何时运行的处理函数,从而无法统一新Promise的状态、数据

                //这里利用封装一个新函数,来知道何时得到当前Promise的处理结果

                //隐藏的高级问题  -- 由那个undefined引起的
                //这里需要对data作判断,避免bug,很难以发现
                this[settleHandle](data => {
                    if(typeof thenable !== 'function'){
                        //父级Promise没有注册thenable
                        resolve(data);//那就我来呗
                        return;
                    }
                    exec(data, thenalbe, resolve, reject);
                }, RESOLVED, this[thenables])

                this[settleHandle](reason => {
                    if(typeof catchable !== 'function'){
                        //父级Promise没有注册catchable
                        reject(reason);//那就我来呗
                        return;
                    }
                    exec(reason, catchable, resolve, reject);//还是resolve,内部正常处理
                }, REJECTED, this[catchables])
            })
        }


        /**
         * then和catch方法,同时他们返回的是新的Promise
         * @param {*} thenable 
         * @param {*} catchable 
         */
        then(thenable, catchable) {//把其他操作都放进串联函数中
            return this[linkPromise](thenable, catchable);
        }

        catch(catchable) {//这个undefined引发了很多问题
            return this[linkPromise](undefined, catchable);
        }


        /**
         * 其他API
         * all、race、resolve、reject
         * @param {*} proms 
         */
        static all(proms) {
            return new MyPromise((resolve, reject) => {
                const results = proms.map(p => {//映射成为一个map
                    const obj = {
                        result: undefined,
                        isResolved: false
                    }
                    p.then(data => {
                        obj.result = data;
                        obj.isResolved = true;
                        //判断是否所有的全部完成 , 这是过滤掉所有没完成的
                        const unResolved = results.filter(r => !r.isResolved);
                        if (unResolved.length === 0) {
                            //全部完成, 就再映射回一个全新的数组
                            resolve(results.map(r => r.result));
                        }
                    }, reason => {
                        reject(reason);
                    })
                    return obj;
                })
            })
        }

        static race(proms) {//只要有一个已决状态,就完事儿了
            return new MyPromise((resolve, reject) => {
                proms.forEach(p => {
                    p.then(data => {
                        resolve(data);
                    }, err => {
                        reject(err);
                    });
                })
            })
        }

        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            }
            else {
                return new MyPromise(resolve => {
                    resolve(data);
                })
            }
        }

        static reject(reason) {
            return new MyPromise((resolve, reject) => {
                reject(reason);
            })
        }
    }
})();