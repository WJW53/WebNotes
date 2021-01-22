const arr = [3];
const arr2 = [5, 6, 7, 8];

arr2[Symbol.isConcatSpreadable] = true;

const result = arr.concat(56, arr2);
console.log(arr);
// 本来应该这样: [3, 56, [5,6,7,8]]
// 修改后:  [3, 56, 5, 6, 7, 8]
console.log(result);

const arr3 = [1,2,[3,4,[5,6,7]],"kai",[8,[9],[0]]];
arr3[Symbol.isConcatSpreadable] = true;
console.log([].concat(1,arr3));