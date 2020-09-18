class Chess {
    constructor(name) {
        this.name = name;
    }

    nothing = 77;

    static width = 50;

    static height = 50;

    static method() {
        console.log('这里是静态方法');
    }
}

//在外面写Chess.width = 50;不太好,所以用static写在里面,必须加static,否则为undefined
//然后 这一页的代码 在浏览器控制台看会正常,但直接在这里run code会报错,我不知道为啥

console.dir(Chess);
console.log(Chess.nothing);//undefined
console.log(Chess.width);
console.log(Chess.height);

Chess.method();


