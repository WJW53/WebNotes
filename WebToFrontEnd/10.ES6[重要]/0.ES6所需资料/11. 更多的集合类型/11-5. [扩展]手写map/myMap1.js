class MyMap {
    constructor(iterable = []) {
        if (typeof iterable[Symbol.iterator] !== "function") {
            throw new TypeError(`你提供的${iterable}不是一个可迭代对象`);
        }

        this._datas = [];
        for (const item of iterable) {
            //item也得是一个可迭代对象才行
            if (typeof item[Symbol.iterator] !== "function") {
                throw new TypeError(`你提供的${item}不是一个可迭代对象`);
            }

            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;

            this.set(key, value);//
        }
    }

    set(key, value) {
        const obj = this._getObj(key);
        if (obj) {//如果已经存在该键
            //修改键值
            obj.value = value;
        } else {
            this._datas.push({
                key,
                value
            });
        }
    }

    get(key) {
        const item = this._getObj(key);
        if (item) {
            return item.value;
        }
        return undefined;
    }

    get size() {
        return this._datas.length;
    }

    delete(key) {
        for (let i = 0; i < this._datas.length; i++) {
            const element = this._datas[i];
            if (this.isEqual(element.key, key)) {
                this._datas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * 根据key值从内部数组中,找到对应的数组项
     * @param {*} key 
     */
    _getObj(key) {
        for (const item of this._datas) {
            if (this.isEqual(item.key, key)) {
                return item;//返回对应的数组项/对象
            }
        }
    }

    has(key) {
        // for (const item of this._datas) {
        //     if(this.isEqual(item.key,key)){
        //         return true;
        //     }
        // }
        // return false;

        //代码更简洁
        return this._getObj(key) !== undefined;
    }

    clear() {
        this._datas.length = 0;
    }

    /**
         * 判断两个数据是否相等
         * @param {*} data1 
         * @param {*} data2 
         */
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }


    *[Symbol.iterator]() {
        for (const item of this._datas) {
            yield [item.key, item.value];
        }
    }

    forEach(callback) {
        for (const item of this._datas) {
            callback(item.value, item.key, item);
        }
    }

}