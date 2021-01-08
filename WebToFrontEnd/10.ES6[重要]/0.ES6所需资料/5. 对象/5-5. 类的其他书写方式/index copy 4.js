class Chess {
    constructor(name) {
        this.name = name;
    }

    nothing = 77;

    static width = 50;

    static height = 100;

    static method() {
        console.log('这里是类静态方法');
    }
}

//在外面写Chess.width = 50;不太好,所以用static写在里面,必须加static,否则为undefined,
//因为相当于在constructor里了, 也就是在实例对象上的
//然后 这一页的代码 在浏览器控制台看会正常,但直接在这里run code会报错,我不知道为啥,可能跟nodejs有关吧

const chess = new Chess();

console.dir(Chess);
console.log("Chess类: " + Chess.nothing);//undefined
console.log(Chess.width);
console.log(Chess.height);
Chess.method();

console.log('chess对象实例的nothing: ' + chess.nothing);
console.log('chess对象实例的width: ' + chess.width);
console.log('chess对象实例的method: ' + chess.method);


