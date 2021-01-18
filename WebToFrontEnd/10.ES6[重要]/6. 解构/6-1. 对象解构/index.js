const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}

//解构出user中的name、province
//先定义了两个变量name、province
//再解构: 把 user.address.province 拿出来给province这个变量
const { name, address: {province} } = user;

// console.log(name, address, province);//address不存在,只会有province
console.log(name, province);//address不存在,只会有province
