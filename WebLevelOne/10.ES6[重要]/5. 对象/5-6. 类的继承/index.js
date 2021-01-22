class Animal {
    constructor(type, name, age, sex) {
        if (new.target === Animal) {
            throw new TypeError("你不能直接创建Animal的对象，应该通过子类创建")
        }
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    print() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }

    jiao() {
        throw new Error("动物怎么叫的？");
    }
}

class Dog extends Animal {
    constructor(name, age, sex) {
        super("犬类", name, age, sex);
        this.loves = "吃骨头";//子类特有的属性
    };
    print() {
        //调用父类的print
        super.print();
        //自己特有的代码
        console.log(`【爱好】：${this.loves}`);

    };
    jiao() {
        console.log('旺旺!!');//同名方法覆盖父类
    }
}

//下面的代码逻辑有误,因为抽象类
// const a1 = new Animal("11", 2, "母");
// a1.print();

//加了个new.target === Animal 之后,下述语句才能逻辑才是正确的,否则Dog也调用了父类构造函数
//那就逻辑也是错的
const a = new Dog("旺财", 3, "公")
a.print();