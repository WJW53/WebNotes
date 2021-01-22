export var name = "模块a";

export const objtest = {
    test(){
        console.log('可以更改吗');
    }
}



function method () {
    name = "module a";//但是这样的话 就可以把name更改了
    objtest.test = function () {
        console.log('引用值的内容可以更改成功!');
    }
    console.log(name);
    objtest.test();
}

// export {method as default};
export default method;//这就是上面那种的语法糖

//如果所有要导出的变量也用const修饰的话,就坚定不移的改不了了