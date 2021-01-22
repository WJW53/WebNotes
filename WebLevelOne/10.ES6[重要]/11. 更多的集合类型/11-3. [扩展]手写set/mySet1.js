class MySet {
    constructor(iterable = []) {
        //验证是否是可迭代对象
        if (typeof iterable[Symbol.iterator] !== "function") {
            throw new TypeError(`你提供的${iterable}不是一个可迭代对象`);
        }
        this._datas = [];//_代表不让外部使用
        for (const item of iterable) {
            this.add(item);
        }
    }

    get size() {//访问器属性
        return this._datas.length;
    }

    add(data) {
        if (!this.has(data)) {
            this._datas.push(data);
        }

    }

    has(data) {
        for (const item of this._datas) {
            if (this.isEqual(data, item)) {
                return true;
            }
        }
        return false;
    }

    delete(data) {
        for (let i = 0; i < this._datas.length; i++) {
            const element = this._datas[i];
            if (this.isEqual(element, data)) {
                this._datas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._datas.length = 0;//都快忘了还能这样呢
    }


    //它是一个生成器函数会返回一个迭代器/可迭代对象
    *[Symbol.iterator]() {
        for (const item of this._datas) {
            yield item;
        }
    }

    //forEach的参数就是回调函数嘛
    forEach(callback) {
        for (const item of this._datas)
            callback(item, item, this);
    }


    /**
     * 判断两个数据是否相等
     * @param {*} data1 
     * @param {*} data2 
     */
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            //+0 -0 在  ===  下, 是相等的
            return true;
        }
        return Object.is(data1, data2);
    }
}