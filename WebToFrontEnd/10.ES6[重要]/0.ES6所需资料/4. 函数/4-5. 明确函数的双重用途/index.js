function Person(firstName, lastName) {
    //判断是否是使用new的方式来调用的函数

    // //过去的判断方式
    // if (!(this instanceof Person)) {//能否在原型链上找到
    //     throw new Error("该函数没有使用new来调用")
    // }

//现在的完美的判定方式
    if (new.target === undefined) {
        throw new Error("该函数没有使用new来调用")
    }

    console.log(new.target);
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;

}

const p1 = new Person("袁", "进");
console.log(p1);


const p2 = Person("袁", "进");
console.log(p2);

const p3 = Person.call(p1, "袁", "进")
console.log(p3);