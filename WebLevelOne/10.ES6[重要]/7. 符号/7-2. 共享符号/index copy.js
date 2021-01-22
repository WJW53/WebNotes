const syb1 = Symbol.for("abc");
const syb2 = Symbol.for("abc");
console.log(syb1 === syb2);//true

const obj1 = {
    a: 1,
    b: 2,
    [syb1]: 3
}

const obj2 = {
    a: "a",
    b: "b",
    [syb2]: "c"
}

console.log(obj1, obj2);//[Symbol(abc):3]  [Symbol(abc):"c"]  没问题
