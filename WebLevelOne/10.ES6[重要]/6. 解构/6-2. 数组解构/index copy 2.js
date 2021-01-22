const numbers = ["a", "b", "c", "d"];


const [n1,  ,  , n4, n5 = 123] = numbers;//用逗号隔开就行

console.log(n1, n4, n5)