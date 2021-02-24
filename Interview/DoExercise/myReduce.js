Array.prototype.myReduce = function (callback) {
    const initVal = arguments[1] ? arguments[1] : "";//获取默认值
    const len = this.length;//数组的长度
    if (!len && !initVal) {//没有默认值并且空数组就会报错
        throw new Error("'Rudece of empty array with no initial value'")
    }
    if (!len) {
        return initVal;//空数组不执行回调函数
    }
    let total = initVal ? initVal : this[0];//是否有默认值,没有就取第一项
    let i = initVal ? 0 : 1;
    while (i < len) {
        total = callback(total, this[i], i, this);//更新每次累加的值
        i++;
    }
    return total;
}

const arr = [1,2,3,4,5];

const total = arr.myReduce(function(total, item, index, arr) {
  console.log(total, item, index, arr);
  return total + item;
  // expected results:  1, 2, 1, [1,2,3,4,5]
},);

console.log(total); // expected results 15
