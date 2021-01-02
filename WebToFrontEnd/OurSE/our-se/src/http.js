import axios from 'axios';

axios.interceptors.request.use(
    request => {
        //   request.url += '.json';//因为他那边接口没有后缀,只是需要返回json的时候,他给我返回的是json
        //而且axios默认就会把url,参数转为json格式的
        //     //配置token
        //     request.headers.common['Authorization'] = AUTH_TOKEN;

        //     //配置post请求头数据格式,get默认还是application/json
        request.headers.post['Content-Type'] = 'multipart/form-data';
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

// axios.interceptors.response.use(response => {
//   if(response.status === 200) {
//     return response.data;
//   }

//   return response;
// });

export default axios;