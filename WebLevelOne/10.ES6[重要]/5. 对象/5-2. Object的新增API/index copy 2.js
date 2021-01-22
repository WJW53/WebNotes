const obj1 = {
    a: 123,
    b: 456,
    c: "abc"
}

const obj2 = {
    a: 789,
    d: "kkk"
}

/*
{
    a: 789,
    b: 456,
    c: "abc",
    d: "kkk"
}
*/

//es7
//这种方式最安全!
// const obj = {
//     ...obj1,
//     ...obj2
// }


//将obj2的数据，覆盖到obj1，并且会对obj1产生改动，返回obj1
// const obj = Object.assign(obj1, obj2);// obj === obj1


const obj = Object.assign({}, obj1, obj2);// 这个就不会对obj1产生改动,因为都改动的是{}

console.log(obj);

console.log(obj===obj1);

console.log('obj1 = ',obj1);

console.log('obj2 = ',obj2);