//类的写法
class Animal {
    constructor(type, name, age, sex) {//constructor: 构造器,单词可不能打错了
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
}

const animal = new Animal("狗", "旺财", 3, "男");
animal.print();

for (const prop in animal) {
    console.log(prop);//不会出现print
}
