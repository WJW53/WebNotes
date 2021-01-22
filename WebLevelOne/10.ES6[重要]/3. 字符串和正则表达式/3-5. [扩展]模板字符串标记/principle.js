var love1 = "秋葵";
var love2 = "香菜";

var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}。`;

//相当于： 
// text = myTag(["邓哥喜欢", "，邓哥也喜欢", "。"], "秋葵", "香菜");//就会调用这个函数

function myTag(parts) {
    console.log(parts);
    console.log(arguments);

    //从下标为1的位置开始把剩下的参数变为一个数组
    const values = Array.prototype.slice.apply(arguments).slice(1);

    //parts.length == values.length + 1;//就是插值的数量肯定是分割后的部分数量+1

    let str = "";
    for (let i = 0; i < values.length; i++) {
        str += `${parts[i]}：${values[i]}`;//str += parts[i] + " : " + values[i];
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;
}

console.log(text);