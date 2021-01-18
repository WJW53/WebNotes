class Test {

    constructor() {
        this.a = 123;
    }

    print1(){
        console.log(this.a);
    }

    print2 = () => {
        console.log(this);
        console.log(this.a);
    }
}

const t1 = new Test();
const t2 = new Test();
console.log(t1.print1());//123'\n'  undefined, 123  这里为什么输出三个值呢?
//如果函数没有return 一个值,就会默认返回一个undefined,又用了console.log肯定出现undefined
t2.print2();
console.log(t1.print2=== t2.print2);//箭头函数时为false

