// "use strict"

function test(a, b = 1) {//加了参数默认值后,就会形成严格模式
    console.log("arugments: ", arguments[0], arguments[1]);
    console.log("a:", a, "b:", b);
    a = 3;
    console.log("arugments", arguments[0], arguments[1]);// 1 2
    console.log("a:", a, "b:", b);//3 2
}

test(1, 2);