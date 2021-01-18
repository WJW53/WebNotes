const MyPromise = (() => {
    const   PENDING = "pending",
            FULFILLED = "fulfilled",
            REJECTED = "rejected",
            PromiseState = Symbol("PromiseState"),//状态
            PromiseResult = Symbol("PromiseResult"),//状态数据
            changeState = Symbol("changeState");


    return class MyPromise {
        [changeState](newState, newResult){
            if(this[PromiseState] !== PENDING){
                return;//状态无法变更
            }
            this[PromiseState] = newState;
            this[PromiseResult] = newResult;
        }
        /**
         * 
         * @param {function} executor 未决阶段(pending状态)下的处理函数
         */
        constructor(executor){
            this[PromiseState] = PENDING;
            this[PromiseResult] = undefined;

            const resolve = (data) => {//注意箭头函数,因为使用的时候是直接resolve();
                this[changeState](FULFILLED,data);
            };

            const reject = (reason) => {
                this[changeState](REJECTED,reason);
            };

            try {
                executor(resolve,reject);
            } catch (error) {
                reject(error);
            }
        }
    }
})();