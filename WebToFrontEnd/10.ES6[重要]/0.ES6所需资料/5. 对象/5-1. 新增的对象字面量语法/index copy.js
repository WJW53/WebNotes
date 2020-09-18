//以前的写法是这样的,有些繁琐
// function createUser(loginId,loginPwd,nickName){
//     return {
//         loginId: loginId,
//         loginPwd: loginPwd,
//         nickName: nickName,
//         id: Math.random()
//     }
// }


//现在就可以简写了
function createUser(loginId, loginPwd, nickName) {
    const sayHello = function () {//这里不能用箭头函数,不然this指向window
        console.log("loginId", this.loginId, "nickname", this.nickName)
    }
    return {
        loginId,
        loginPwd,
        nickName,
        sayHello,
        id: Math.random()
    }
}
const u = createUser("0529", "0503", "wjw");
u.sayHello();