//共享符号原理实现
const SymbolFor = (() => {
    const global = {};//用于记录有哪些共享符号
    return function (name) {
        console.log(global);
        if (!global[name]) {
            global[name] = Symbol(name);//属性名的值就是一个符号
        }
        console.log(global);
        return global[name];
    }
})();

const syb1 = SymbolFor("abc");

const syb2 = SymbolFor("abc");//这次返回的和上次是一致的

console.log(syb1 === syb2);//true