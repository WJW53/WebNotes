const MyPromise = (() => {
    const PENDING = "pending",
        FULFILLED = "fulfilled",
        REJECTED = "rejected",
        PromiseState = Symbol("PromiseState"),//状态
        PromiseResult = Symbol("PromiseResult"),//状态数据
        changeState = Symbol("changeState"),
        thenables = Symbol("thenables"),//thenable
        catchables = Symbol("catchables"),//catchable
        settleHandle = Symbol("settleHandle");//后续处理的通用函数


    return class MyPromise {
        /**
         * 
         * @param {*} newState 
         * @param {*} newResult 
         * @param {*} queue 执行的作业队列
         */
        [changeState](newState, newResult, queue) {
            if (this[PromiseState] !== PENDING) {
                return;//状态无法变更
            }
            //更新状态和状态数据
            this[PromiseState] = newState;
            this[PromiseResult] = newResult;
            //执行相应队列中的函数,所以我们模拟的时候实际上是
            
            //以下是针对: 未决推向已决的语句在setTimeout等异步函数中时
            //即使用的时候,先then注册后续处理函数,执行栈空了之后,setTimeout里面的
            //resolve/reject触发,然后再来这里将所有的后续处理函数依次执行即可
            queue.forEach(handler => handler(newResult));
        }
        /**
         * 
         * @param {function} executor 未决阶段(pending状态)下的处理函数
         */
        constructor(executor) {
            this[PromiseState] = PENDING;
            this[PromiseResult] = undefined;
            this[thenables] = [];//后续处理函数的数组 -> fulfilled
            this[catchables] = [];//                 -> rejected

            const resolve = (data) => {//注意箭头函数,因为使用的时候是直接resolve();
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
         * 
         * @param {*} handler 后续处理函数
         * @param {*} immediatelyState 需要立即执行的状态
         * @param {*} queue 作业队列
         */
        [settleHandle](handler, immediatelyState, queue) {
            if (typeof (handler) !== "function") {
                return;
            }
            if (this[PromiseState] === immediatelyState) {//已决状态立即执行
                setTimeout(() => {//我们只能拿宏队列模拟了,还没学nodejs
                    handler(this[PromiseResult]);
                }, 4);
            } else {//否则加入作业队列中
                queue.push(handler);
            }
        }

        then(thenable, catchable) {
            this[settleHandle](thenable, FULFILLED, this[thenables]);

            this.catch(catchable);
        }

        catch(catchable) {
            this[settleHandle](catchable, REJECTED, this[catchables]);
        }


    }
})();