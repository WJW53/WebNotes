// 暂时性死区
function test(a = b, b) {
    console.log(a, b);
}

test(1, 2);
test(1);
test(undefined, 2);//因为此时b也未定义,所以会报错