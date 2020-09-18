var _ = require("lodash");

module.exports = function (arr) {
    return _.compact(arr);//去掉数组内判定为false的元素
}