const obj = {
    d: 1,
    b: 2,
    a: 3,
    0: 6,
    5: 2,
    4: 1
}
const props = Object.getOwnPropertyNames(obj);
console.log(props);//先按照数字升序排序,再排其他,按照书写顺序排列
