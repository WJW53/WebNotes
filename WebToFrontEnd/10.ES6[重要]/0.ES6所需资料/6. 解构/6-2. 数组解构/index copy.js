const numbers = ["a", "b", "c", "d"];

//数组解构1.
// const {
//     0: n1,
//     3: n2
// } = numbers;

//2.
// let n1, n2;
// ([n1, n2] = numbers);

//3.
const [n1, n2] = numbers;

console.log(n1, n2)