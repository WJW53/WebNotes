class Person {
    [Symbol.toStringTag] = "Person";
}

const p = new Person();

const arr = [32424, 45654, 32];

console.log(Object.prototype.toString.apply(p));//原本应该是[object Object]
//改完了就是[object Person]
console.log(Object.prototype.toString.apply(arr));//[object Array]