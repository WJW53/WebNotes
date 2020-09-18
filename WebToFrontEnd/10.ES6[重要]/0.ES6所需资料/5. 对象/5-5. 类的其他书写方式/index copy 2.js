const printName = "print";

class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;//这里就会运行set age(){} 相当于运行setAge函数,改个名字而已
        // this.setAge(age);
        // this.getAge();
        this.sex = sex;
    }

    // 法1. java与写法一致,但这样写的不像是一个属性
    // getAge(){//取值是不需要传参的
    //     return this._age + "岁";
    // }
    // setAge(age){
    //     if (typeof age !== "number") {
    //         throw new TypeError("age property must be a number");
    //     }
    //     if(age < 0){
    //         age = 0
    //     }else if(age>1000){
    //         age = 1000;
    //     }
    //     this._age = age;
    // }


    
    //法2.
    //创建一个age属性，并给它加上getter，读取该属性时，会运行该函数
    get age() {
        return this._age + "岁";
    }

    //创建一个age属性，并给它加上setter，给该属性赋值时，会运行该函数
    set age(age) {
        if (typeof age !== "number") {
            throw new TypeError("age property must be a number");
        }
        if (age < 0) {
            age = 0;
        }
        else if (age > 1000) {
            age = 1000;
        }
        this._age = age;
    }

    [printName]() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
}

var a = new Animal("狗", "旺财", 3, "男");
