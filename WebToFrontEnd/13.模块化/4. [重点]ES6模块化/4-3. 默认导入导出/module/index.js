//import data from "./a.js"; //将a.js模块中的默认导出放置到 常量data中

import data, {a, b} from "./a.js";

// import * as data from "./a.js";//其中默认导出会作为data对象的default属性

console.log(data, a, b);

