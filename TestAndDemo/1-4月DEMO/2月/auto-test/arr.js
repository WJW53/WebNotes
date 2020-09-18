var arr = {
  length: function (arr) {
    return arr.length;
  },
  add: function (arr) {
    var num = 0;
    for(var i = 0; i < arr.length; i ++) {
      if(isNaN(arr[i])) { return }
      num += arr[i];
    }
    return num;
  }
  
}

module.exports = arr;