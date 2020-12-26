import axios from 'axios';
// import { config } from 'vue/types/umd';



////不跨域


axios.interceptors.request.use(request => {
    //   request.url += '.json';

//     //配置token
//     request.headers.common['Authorization'] = AUTH_TOKEN;
//     //配置请求头数据格式
//     request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return request;
});

// axios.interceptors.response.use(response => {
//   if(response.status === 200) {
//     return response.data.data;
//   }

//   return response;
// });


//跨域
// axios.interceptors.request.use(
//     config => {
//         config.headers = {
//             'Content-Type': 'multipart/form-data'
//         };
//         return config;
//     },
//     error => {
//         return Promise.reject(err);
//     }
// )

export default axios;