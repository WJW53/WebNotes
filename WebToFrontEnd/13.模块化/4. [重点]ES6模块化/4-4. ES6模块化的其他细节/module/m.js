// import { a, b } from "./m1.js";
// import m2, { k } from "./m2.js"

// export { a, b, k, m2 as default }


//更方便的语法糖,直接 export {绑定的标识符} from "模块路径"
export { a, b } from "./m1.js"
export { k, default, a as m2a } from "./m2.js"
export const r = "m-r"