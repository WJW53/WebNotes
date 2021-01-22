function test(a, b, c) {
    console.log(a, b, c);
}

test(2, 6, 7);

const arr = ["asf", "Gfh", "111"];

test(...arr);

function test2(a,b,c){
    console.log(test2.length);
}
test2(1,2);//3