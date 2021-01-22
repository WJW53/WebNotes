//深度拷贝
function type(obj) {//利用hashmap思想
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]' : 'boolean', 
      '[object Number]'  : 'number', 
      '[object String]'  : 'string', 
      '[object Function]' : 'function', 
      '[object Array]'  : 'array', 
      '[object Date]'   : 'date', 
      '[object RegExp]'  : 'regExp', 
      '[object Undefined]': 'undefined',
      '[object Null]'   : 'null', 
      '[object Object]'  : 'object'
    };
    if(obj instanceof Element) {//对dom元素的处理
        return 'element';
    }
    return map[toString.call(obj)];
}
function deepClone(data) {
    var t = type(data), o, i, ni;
    
    if(t === 'array') {
      o = [];
    }else if( t === 'object') {
      o = {};
    }else {
      return data;
    }
    
    if(t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
        o.push(deepClone(data[i]));//递归调用
      }
      return o;
    }else if( t === 'object') {
      for( i in data) {
        o[i] = deepClone(data[i]);//递归调用
      }
      return o;
    }
}