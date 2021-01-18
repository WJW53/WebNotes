function A() {

}


//Symbol.hasInstance这个属性方法不能直接改写
//得通过Object.defineProperty修改
Object.defineProperty(A, Symbol.hasInstance, {
    value: function (obj) {
        return false;//instanceof的判定,就靠这个,我们把原先的true改为false,所以输出一定是false
    }
});

const obj = new A();

console.log(obj instanceof A);
// console.log(A[Symbol.hasInstance](obj));