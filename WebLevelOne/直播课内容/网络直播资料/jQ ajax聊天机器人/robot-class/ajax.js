
/**
 * ajax: async javascript and xml(json)
 *      主要用于数据交互（网络请求）
 * 
 *      duing： 邓哥奇遇记系列
 *         五层网络模型：
 *          应用层
 *          传输层
 *          网络层
 *          数据链路层
 *          物理层
 *      url: 请求地址
 *      type: 请求方式
 *      data: 请求参数
 *      success：请求成功的回调函数
 *      async: 当前请求是否允许异步 true 允许异步  false 不允许异步
 */
function ajax(options) {
    // xhr 用于存储当前网络请求中的所有信息
    var xhr = null;
    // 判断当前浏览器是否含有XMLHTTPRequest对象（IE7+， Chrome, firefox及其他浏览器有的） 有的话 创建该对象  没有则判断是否含有ActiveXOject对象（IE6/5中特有的）
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
        return alert('当前浏览器不支持XMLHttpRequest')
    }
    var dataStr = '';
    if (typeof options.data == 'object') {
        for (var prop in options.data) {
            if (options.data.hasOwnProperty(prop)) {
                dataStr += prop + '=' + options.data[prop] + '&';
            }
        }
    } else if (typeof options.data == 'string') {
        dataStr = options.data;
    } else {
        // return alert('数据格式只能为字符串或者对象');
        dataStr = '';
    }
    // 默认当前请求是异步请求
    if (typeof options.async !== 'boolean') {
        options.async = true;
    }
    options.type = options.type.toUpperCase();
    // onreadystatechange事件是用来监听xhr 对象身上的readyState属性的
    // 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // "我是xx"  "{data: 'xxx'}"  JSON.parse(xhr.responseText)
                options.success(xhr.responseText);
            }
        }
    }
    if (options.type == 'GET') {
        // key=value&key1=value1
        xhr.open(options.type, options.url + '?' + dataStr, options.async);
        xhr.send();
    } else if (options.type == 'POST') {
        xhr.open(options.type, options.url, options.async);
        // key=value&key1=value1
        // {}   appliction/json
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(dataStr);
    }
   
    
}