var duplicate = function (arr) {
    //// 法一：es6,咋回事儿,这个方法是错的
    // let res=new Map();
    // arr.forEach(item=>{
    //     item.sort((a,b)=>a-b);
    //     res.set(item.join(),item);
    // });        
    // return Array.from(res.values);
    //// return Object.values(res);

    //// 法二：这方法可行
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
    [1, 3],
    [2, 3],
    [1, 2],
    [1],
    [2],
    []
];

num = duplicate(num);

console.log(num);