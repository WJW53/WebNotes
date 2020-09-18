# 数组解构

1. 
```
const numbers = ["a", "b", "c", "d", [1, 2, 3, 4]];
//得到numbers下标为4的数组中的下标为2的数据，放到变量n中
const [, , , , [, , n]] = numbers;
```

2 & 3.
```
const numbers = ["a", "b", "c", "d", {
    a: 1,
    b: 2
}];

//得到numbers下标为4的数组的属性a，赋值给变量A
// const [, , , , { a: A }] = numbers;

const { a: A } = numbers[4];

console.log(A);
```

4. 交换ab的值
```
let a = 1, b = 2;
[b, a] = [a, b];
```