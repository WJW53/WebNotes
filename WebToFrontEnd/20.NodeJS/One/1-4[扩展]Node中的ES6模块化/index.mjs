// import * as obj from "./a.mjs";

//这俩写法对应commonjs
// import * as obj from "./a.js";
// import obj from "./a.js";


// require("./a.js");//就会报错,因为export不是包裹在函数环境中


// console.log(obj);

//通过异步的方式动态的加载
import("./a.mjs").then(r => console.log(r));