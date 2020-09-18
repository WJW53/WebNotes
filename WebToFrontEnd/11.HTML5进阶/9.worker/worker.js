importScripts("./math.js");

this.onmessage = function (e) {
    console.log(e);
    console.log(getSum(1, 2));
    var result = 0;
    for (let i = 0; i < e.data.num; i++) {
        result += i;
    }

    this.postMessage(result);
    this.close();//worker自己停止自己的工作
}