const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}

//以前的写法: 
// let name, age, sex, address;
// name = user.name;
// age = user.age;
// sex = user.sex;
// address = user.address;


//不加 () 就会报错,因为他会把左边认为是对象字面量, 然后识别 =user ,就会报错

// let name, age, sex, address, abc;
// ({ name, age, sex, address } = user);//会把user对象里对应的同名属性分别赋值到这些变量里



// // 先定义5个变量，然后从对象中读取同名属性，放到变量中
let { name, age, sex, address, abc = 123 } = user;

console.log(name, age, sex, address, abc);