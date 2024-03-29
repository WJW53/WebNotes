//过去的做法
function Animal(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Animal.prototype.print = function () {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}

function Dog(name, age, sex) {
    //借用父类的构造函数
    Animal.call(this, "犬类", name, age, sex);
}
Dog.prototype.printSon = function(){
    console.log('这儿不影响Animal.prototype');
}


//设置隐式原型,意思就是Dog.prototype是Animal.prototype的一个实例
Object.setPrototypeOf(Dog.prototype, Animal.prototype);

const d = new Dog("旺财", 3, "公");
d.print();
console.log(d);
console.log(Dog.prototype.__proto__ === Animal.prototype);//true