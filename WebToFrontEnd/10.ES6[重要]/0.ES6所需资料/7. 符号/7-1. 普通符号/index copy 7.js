const syb = Symbol();

const obj = {
    [syb]: 1,
    a: 2,
    b: 3,
    c: 7,
}

Object.defineProperty(obj,"c",{
    value: "male",
    enumerable: false,//不可枚举
})

for (const prop in obj) {
    console.log(prop);
}

console.log(Object.keys(obj));//得到对象本身所有可枚举的属性名
console.log(Object.getOwnPropertyNames(obj));//可得到所有的无法枚举的属性名
//上述这俩都不能得到 符号属性名


//但Object.getOwnPropertySymbols方法可以读取到所有的符号属性名,返回的是数组
const sybs = Object.getOwnPropertySymbols(obj);
console.log(sybs, sybs[0] === syb);//[Symbol()] true
console.log(typeof(sybs[0]));//symbol