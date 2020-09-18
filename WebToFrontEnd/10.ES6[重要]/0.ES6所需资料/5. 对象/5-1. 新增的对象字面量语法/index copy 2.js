const user = {
    name: "姬成",
    age: 100,
    sayBefore: function(){
        console.log('这是以前的写法');
    },
    sayHello(){
        console.log('这是现在的写法\n',this.name, this.age)
    }
}

user.sayHello();