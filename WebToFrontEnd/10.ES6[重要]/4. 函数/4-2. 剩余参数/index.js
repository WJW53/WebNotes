function test(a, b, ...args) {
    console.log(args);//真正的数组
    console.log(arguments);//类数组
    // console.log(this.arguments);
}

test(1, 32, 46, 7, 34); 