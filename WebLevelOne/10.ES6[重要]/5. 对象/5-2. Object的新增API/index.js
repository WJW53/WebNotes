const obj1 = {
    a: 1
}

const obj2 = {
    b: 2,
    c(){
        console.log('c');
    }
}

// obj1.__proto__ = obj2

Object.setPrototypeOf(obj1, obj2);

console.log(obj1.__proto__ === obj2, obj1, obj1.c === obj2.c);//true { a: 1 } true