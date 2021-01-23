define((require, exports, module) => {
    require.async("a", function (a) {//它提供的是异步导入的方式
        console.log(a);
    })
    require.async("b", function (b) {
        console.log(b);
    })
})