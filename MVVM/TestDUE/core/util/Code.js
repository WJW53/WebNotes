// code为如下格式: 

// let content = 'panda';
// let description = 'panda say hello';
// let obj = { x: 1, y: 2 };

// let flag = false;
// if (obj.x < 2 + 1) {
//     flag = true;
// } else {
//     flag = false;
// }


//将环境变量对象解析为字符串
export function generateAnnoCode(obj) {
    let code = "";
    for (let temp in obj) {
        code += "let " + temp + "=" + JSON.stringify(obj[temp]) + ";";//转换成声明赋值语句
    }
    return code;
}
//判断表达式是否成立
export function isTrue(expression, env) {
    let bool = false;
    let code = env;
    code += "if(" + expression + ") {bool = true;}";//'if(obj.x < 2 + 1){bool = true;}'
    eval(code);//利用eval执行
    return bool;
}