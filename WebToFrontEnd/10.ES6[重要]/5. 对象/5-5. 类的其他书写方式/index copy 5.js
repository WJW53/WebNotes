class Test {
    static a = 1;//Test本身调用


    constructor() {

        // this.b = 1;
        // this.c = 1;

        this.d = this.b + this.c;
    }
    //字段初始化器:
    //b跟c相当于就写到了constructor中,所以实例可以调用


    b = 2;
    c = 3;
}

const t = new Test();
console.dir(t);
console.log(t);
console.log(t.d);
