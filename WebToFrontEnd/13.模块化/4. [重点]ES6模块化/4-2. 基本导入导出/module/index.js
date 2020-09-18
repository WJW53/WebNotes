import {b} from "./b.js";//这句 就可以使用内部的导出了

import "./b.js"//这条导入语句仅仅会运行模块,不使用它内部的任何导出
//如果已经缓存过一次,那也不会再运行模块了

import "./init.js"
import * as a from "./a.js"

// var b = 3;
// console.log(b2)
// console.log(name, age);

console.log(b);

console.log(a.a, a.AGE, a.name);