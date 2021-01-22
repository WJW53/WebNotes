const arr1 = [3, 67, 8, 5,obj={name:"wjw"}];

//克隆arr1数组到arr2

const arr2 = [...arr1];

console.log(arr1 === arr2);//false
console.log(arr1.obj === arr2.obj);//true