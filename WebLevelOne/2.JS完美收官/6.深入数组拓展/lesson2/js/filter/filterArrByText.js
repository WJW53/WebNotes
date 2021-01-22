// 根据文本来过滤的函数    纯函数

function filterArrByText (data, text) {
    if (!text) {
        return data;
    }else {
        return data.filter(function (ele, index) {
            // 王港  王  存在 != -1
            return ele.name.indexOf(text) != -1;
        });
    }
}