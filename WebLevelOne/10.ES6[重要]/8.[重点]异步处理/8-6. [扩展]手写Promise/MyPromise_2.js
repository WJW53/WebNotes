const MyPromise = (function () {
    const PENDING = "pending",
        FULFILLED = "fulfilled",
        REJECTED = "rejected",
        PromiseState = Symbol("PromiseState"),
        PromiseResult = Symbol("PromiseResult"),
        thenables = Symbol("thenables"),
        catchables = Symbol("catchables"),
        changeState = Symbol("changeState"),
        settleHandle = Symbol("settleHandle"),
        linkPromise = Symbol("linkPromise");


    return class MyPromise {
        constructor(executor) {
            this[PromiseState] = PENDING;
            this[PromiseResult] = undefined;
            this[thenables] = [];
            this[catchables] = [];

            const resolve = (data) => {
                this[changeState](FULFILLED, data, this[thenables]);
            };
            const reject = (error) => {
                this[changeState](REJECTED, error, this[catchables]);
            };
            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }


        [changeState](newState, newResult, queue) {
            if (this[PromiseState] !== PENDING) {
                return;
            }
            this[PromiseState] = newState;
            this[PromiseResult] = newResult;

            queue.forEach(handler => handler(newResult));
        }

        [settleHandle](handler, immediatelyState, queue) {
            if (typeof handler !== 'function') {
                return;
            }
            if (this[PromiseState] === immediatelyState) {
                setTimeout(() => {
                    handler(this[PromiseResult]);
                }, 4);
            } else {
                queue.push(handler);
            }
        }

        [linkPromise](thenable, catchable) {
            function exec(data, handler, resolve, reject) {
                try {
                    const result = handler(data);
                    if (result instanceof MyPromise) {
                        result.then(newData => {
                            resolve(newData);
                        }, error => {
                            reject(error);
                        })
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }

            return new MyPromise((resolve, reject) => {
                this[settleHandle](data => {
                    if (typeof thenable !== 'function') {
                        return resolve(data);
                    }
                    exec(data, thenable, resolve, reject);
                }, FULFILLED, this[thenables]);

                this[settleHandle](error => {
                    if (typeof catchable !== 'function') {
                        return reject(error);
                    }
                    exec(error, catchable, resolve, reject);
                }, REJECTED, this[catchables]);
            });
        }

        then(thenable, catchable) {
            return this[linkPromise](thenable, catchable);
        }
        catch(catchable) {
            return this[linkPromise](undefined, catchable);
        }
        finally(callback) {
            // return this.then(data => {
            //     return new MyPromise((resolve, reject) => {
            //         resolve(callback());
            //     }).then(() => data);//因为不知道callback什么时候执行完,所以最后需要then来把它再推向已决
            // }, error => {
            //     return new MyPromise((resolve, reject) => {
            //         resolve(callback());
            //     }).then(() => { throw error });
            // });
            return this.then(data => MyPromise.resolve(callback(data)).then(() => data),
                error => MyPromise.resolve(callback(error)).then(() => { throw error }));
        }

        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            } else {
                return new MyPromise((resolve, reject) => resolve(data));
            }
        }
        static reject(error) {
            return new MyPromise((resolve, reject) => reject(error));
        }
        static all(promiseArr) {
            return new MyPromise((resolve, reject) => {
                let index = 0, res = [], len = promiseArr.length;
                for (let i = 0; i < len; i++) {
                    promiseArr[i].then(data => {
                        res[i] = data;
                        index++;
                        if (index === len) {
                            resolve(res);
                        }
                    }, error => reject(error));
                }
            });
        }
        static race(promiseArr) {
            return new MyPromise((resolve, reject) => {
                promiseArr.forEach(p => {
                    p.then(data => resolve(data), error => reject(error));
                });
            });
        }


    };
})()