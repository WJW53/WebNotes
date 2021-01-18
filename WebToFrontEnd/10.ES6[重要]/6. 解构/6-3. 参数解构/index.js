// function ajax(options) {
//     const defaultOptions = {//默认配置
//         method: "get",
//         url: "/"
//     }
//     const opt = {
//         ...defaultOptions,
//         ...options
//     }
//     console.log(opt);
// }


//直接参数解构
//要么调用ajax时传递参数,配合解构
//要么在形参时给默认值 形成解构
//否则会报错,因为会undefined or null
// function ajax({
//     method = "get",
//     url = "/"
// } = {}) {
//     console.log(method, url);
// }

// ajax();

function ajax({
    method = "get",
    url = "/"
}){
    console.log(method, url);
}

ajax({
    url : '/abc',
});