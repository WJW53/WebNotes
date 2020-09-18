// 强大的js基础 抓耳挠腮 浑身难受
function combineFilter (config){
    return function (data) {
        for (var prop in config) {
            data = config[prop](data,store.getState(prop));
        }
        return data;
    }
}


var lastFilterArr = combineFilter({
    text: filterArrByText,
    sex: filterArrBySex
});