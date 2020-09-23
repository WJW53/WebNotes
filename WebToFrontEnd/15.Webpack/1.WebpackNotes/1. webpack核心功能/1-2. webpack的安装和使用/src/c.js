console.log("es6 module c");
import $ from "jquery";//虽然jQuery是commonjs的,但是也可以用es6模块化写法
//这都得益于webpack已经处理好了,全部兼容,nb!
console.log($);
export default "c";