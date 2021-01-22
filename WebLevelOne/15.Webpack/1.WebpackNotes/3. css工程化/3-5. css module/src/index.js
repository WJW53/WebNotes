import style1 from  "./assets/style1.css"
import style2 from "./assets/style2.css"


// 这三个是只有css-loader处理的时候再打开看看
// console.log(style1)
// console.log(style1.locals);
// console.log(style1.toString());



const div1 = document.getElementById("div1");
// div1.classList.add(style2.c1);
div1.className = style2.c1;