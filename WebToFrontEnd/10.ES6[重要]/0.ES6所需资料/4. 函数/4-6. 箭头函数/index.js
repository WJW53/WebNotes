const numbers = [3, 7, 78, 3, 5, 346];

//保持代码的简洁
const result = numbers.filter(num => num % 2 !== 0)
    .map(num => num * 2).reduce((a, b) => a + b)

console.log(result);//36