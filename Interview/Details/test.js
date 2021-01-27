var duplicate = function (arr) {
    //// 法一：Map、forEach
    // let res = new Map();
    // arr.forEach(item => {
    //     item.sort((a, b) => a - b);
    //     res.set(item.join(), item);
    // });

    // // console.log(res);//res是一个字典,它不能用Array.from/Object.values获取键值
    // //也不能用for-in
    // //1.
    // // console.log(...res.values());
    // // return [...res.values()];//可行
    // // 2. 仍然利用foreach
    // let newArr = [];
    // res.forEach((value, key) => {
    //     newArr.push(value);
    // });

    // return newArr;



    //// 法二：这方法更好一点
    let res = {}
    arr.forEach(item => {
        item.sort((a, b) => a - b);
        res[item] = item;
    });
    return Object.values(res);

}

var num = [
    [3],
    [1, 2, 3],
    [1, 3],
    [2, 3],
    [1],
    [2],
    [1, 2, 3],
    [3, 2, 1],
    [1, 3],
    [2, 3],
    [1, 2],
    [1],
    [2],
    []
];

num = duplicate(num);

console.log(num);