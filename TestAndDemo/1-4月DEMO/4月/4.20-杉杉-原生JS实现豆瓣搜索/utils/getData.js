// 获取数据函数
// 拿到搜索的文字时，遍历searchObj对象，如果搜索的文字是searchObj中的某一个key，那么就返回key对应的value值，否则只返回一个空数组
function getData(searchText, callback) {
  var res = [];
  for(var key in searchObj) {
    if(searchText === key) {
      res = searchObj[key];
      break;
    }
  }
  callback(res);
}