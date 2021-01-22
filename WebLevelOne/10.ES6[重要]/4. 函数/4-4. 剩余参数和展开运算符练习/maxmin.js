
//得到文本框中所有的数字 形成一个数组
function getValues() {
    const numbers = [];
    const inps = document.querySelectorAll("input")
    for (let i = 0; i < inps.length; i++) {
        numbers.push(+inps[i].value);
    }
    return numbers;
}

const btn = document.querySelector("button");

//Math.max/min方法可以直接得到数组中的最大/小值, 传的参数要用剩余参数的形式
//不用剩余参数的话就用 Math.max.applay(null,numbers);//这样也行

btn.onclick = function () {
    const numbers = getValues(); //拿到数组
    spanmax.innerText = Math.max(...numbers);
    spanmin.innerText = Math.min(...numbers);
}