class Test {

    //这样的方法,太low了
    // print(){
    //     console.warn("print方法已过时");
    //     console.log('print方法');
    // }

    //现在无法使用,因为没有成为正式的标准,需要设置一些东西才能用
    //TS或者babel学了也可以用这个
    @Obsolete
    print () {
        console.log("print方法")
    }
}

function Obsolete(target, methodName, descriptor) {//类名,方法名,方法名的descriptor
    // function Test
    // print
    // { value: function print(){}, ... }
    // console.log(target, methodName, descriptor);

    const oldFunc = descriptor.value;
    descriptor.value = function(...args){
        console.warn(`${methodName}方法已过时`);
        oldFunc.apply(this, args);
    }
}
