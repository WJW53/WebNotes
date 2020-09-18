// 时间逻辑

var timeData = {
    // 活动开始时间
    startTime: 1587645000,
    // 活动持续时长
    continueTime: 14400
}
// 获取相关DOM
var times = document.getElementById("times");
var activeDesc = document.getElementById("active-desc");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");
var T = null;
// 根据当前时间，计算出我们想要的时间逻辑。
function getTime(timeData) {
    // 最终的返回结果 
    var result = {
        // 场次时间，hour,min,sec, 距离活动开始，结束的时间
    }
    // 当前时间
    var now = Math.floor(new Date().getTime() / 1000);
    // 活动开始时间转化为Date对象
    var date = new Date(timeData.startTime * 1000);
    // 把活动的场次计算出来，并且格式化（9:0 => 09:00）
    result.times = (date.getHours() > 10 ? 
        date.getHours() : 
        "0" + date.getHours()) + ":" + (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()) + " 场";
    var dateTime = timeData.startTime;
    // 活动未开始
    if(now < dateTime) {
        result.msg = "距离开始还有";
        // 时间差值
        var chargeTime = dateTime- now;
        // 将时间差值进行时分秒转换
        result.hour = Math.floor(chargeTime/3600);
        result.minute = Math.floor(chargeTime%3600/60);
        result.second = chargeTime % 60 
    } else if( now < (dateTime +timeData.continueTime)) {
        // 活动正在进行中
        result.msg = "距离结束还有";
        // 时间差值
        var chargeTime = dateTime + timeData.continueTime - now;
         // 将时间差值进行时分秒转换
        result.hour = Math.floor(chargeTime/3600);
        result.minute = Math.floor(chargeTime%3600/60);
        result.second = chargeTime % 60 
    }  else {
        result.msg = "活动已经结束";
        result.hour = result.minute = result.second = 0;
    }
    return result;
}
// 格式化时间函数 9:0:0 => 09:00:00
function formatTime(time) {
    if(time.hour < 10) {
        time.hour = "0" + time.hour
    }
    if(time.minute < 10) {
        time.minute = "0" + time.minute
    }
    if(time.second < 10) {
        time.second = "0" + time.second
    }
}
// 根据我们时间来渲染页面
function renderByTime(timeData) {
    // 获取时间转换对象
    var result = getTime(timeData);
    // 格式化时间
    formatTime(result);
    // 页面渲染+页面优化，当然DOM内容与将要赋值的内容相等，就不进行重新渲染操作，否则进行渲染
    if(times.innerHTML != result.times) {
        times.innerHTML = result.times;
    }
    if(activeDesc.innerHTML != result.msg){
        activeDesc.innerHTML = result.msg;
    }
    if(hour.innerHTML != result.hour) {
        hour.innerHTML = result.hour;
    }
    if(minute.innerHTML != result.minute) {
        minute.innerHTML = result.minute;
    }

    if(second.innerHTML != result.second) {
        second.innerHTML = result.second;
    }
    if(result.msg == "活动已经结束") {
        clearInterval(T);
    }
    
   
}

// 浏览器的刷新频率60hz，相当于电脑1分钟闪60下，我们按照浏览器的刷新频率进行渲染。
T = setInterval(function () {
    renderByTime(timeData);
},1/60);

// 滚动逻辑

// 数据对象的集合
/**
 * [
 *  {
 *      imgURL 图片地址
 *      title 标题
 *      desc  描述
 *      disCount 打折
 *      price 价格
 * } 
 * ]
 *
 */
var data = [
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570862996.74362387.png?thumb=1&w=200&h=200",
        title: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
        desc: "茶水分离，长效保温",
        disCount: "65元",
        price: "99元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570670535.6211177.jpg?thumb=1&w=200&h=200",
        title: "米家风冷对开门冰箱 483L 银色",
        desc: "风冷双变频，无霜不结冰",
        disCount: "1199元",
        price: "2499元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1573714512.40746513.jpg?thumb=1&w=200&h=200",
        title: "米家扫拖一体机器人 白色",
        desc: "扫得干净，拖得彻底",
        disCount: "1699元",
        price: "1999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572868360.8284015.jpg?thumb=1&w=200&h=200",
        title: "立式空调A（3匹/变频/超一级能效）",
        desc: "超一级能效巨省电，自清洁",
        disCount: "5599元",
        price: "5999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570862996.74362387.png?thumb=1&w=200&h=200",
        title: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
        desc: "茶水分离，长效保温",
        disCount: "65元",
        price: "99元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570670535.6211177.jpg?thumb=1&w=200&h=200",
        title: "米家风冷对开门冰箱 483L 银色",
        desc: "风冷双变频，无霜不结冰",
        disCount: "1199元",
        price: "2499元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1573714512.40746513.jpg?thumb=1&w=200&h=200",
        title: "米家扫拖一体机器人 白色",
        desc: "扫得干净，拖得彻底",
        disCount: "1699元",
        price: "1999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572868360.8284015.jpg?thumb=1&w=200&h=200",
        title: "立式空调A（3匹/变频/超一级能效）",
        desc: "超一级能效巨省电，自清洁",
        disCount: "5599元",
        price: "5999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570862996.74362387.png?thumb=1&w=200&h=200",
        title: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
        desc: "茶水分离，长效保温",
        disCount: "65元",
        price: "99元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570670535.6211177.jpg?thumb=1&w=200&h=200",
        title: "米家风冷对开门冰箱 483L 银色",
        desc: "风冷双变频，无霜不结冰",
        disCount: "1199元",
        price: "2499元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1573714512.40746513.jpg?thumb=1&w=200&h=200",
        title: "米家扫拖一体机器人 白色",
        desc: "扫得干净，拖得彻底",
        disCount: "1699元",
        price: "1999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572868360.8284015.jpg?thumb=1&w=200&h=200",
        title: "立式空调A（3匹/变频/超一级能效）",
        desc: "超一级能效巨省电，自清洁",
        disCount: "5599元",
        price: "5999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570862996.74362387.png?thumb=1&w=200&h=200",
        title: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
        desc: "茶水分离，长效保温",
        disCount: "65元",
        price: "99元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570670535.6211177.jpg?thumb=1&w=200&h=200",
        title: "米家风冷对开门冰箱 483L 银色",
        desc: "风冷双变频，无霜不结冰",
        disCount: "1199元",
        price: "2499元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1573714512.40746513.jpg?thumb=1&w=200&h=200",
        title: "米家扫拖一体机器人 白色",
        desc: "扫得干净，拖得彻底",
        disCount: "1699元",
        price: "1999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572868360.8284015.jpg?thumb=1&w=200&h=200",
        title: "立式空调A（3匹/变频/超一级能效）",
        desc: "超一级能效巨省电，自清洁",
        disCount: "5599元",
        price: "5999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570862996.74362387.png?thumb=1&w=200&h=200",
        title: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
        desc: "茶水分离，长效保温",
        disCount: "65元",
        price: "99元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1570670535.6211177.jpg?thumb=1&w=200&h=200",
        title: "米家风冷对开门冰箱 483L 银色",
        desc: "风冷双变频，无霜不结冰",
        disCount: "1199元",
        price: "2499元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1573714512.40746513.jpg?thumb=1&w=200&h=200",
        title: "米家扫拖一体机器人 白色",
        desc: "扫得干净，拖得彻底",
        disCount: "1699元",
        price: "1999元"
    },
    {
        imgURL:
            "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572868360.8284015.jpg?thumb=1&w=200&h=200",
        title: "立式空调A（3匹/变频/超一级能效）",
        desc: "超一级能效巨省电，自清洁",
        disCount: "5599元",
        price: "5999元"
    }
];

var list = document.getElementById("list");
var leftBtn = document.getElementById("left-btn");
var rightBtn = document.getElementById("right-btn");
// 根据数据对象进行渲染
function goodsRender(data) {
    // 获取数组长度
    var len = data.length;
    // 根据数组内容进行渲染
    for(var i=0; i<len; i++) {
        var li = document.createElement("li");
        li.className = "item-" + i;
        renderToTemplate(li, data[i])
        list.appendChild(li);
    }
}
// 根据模版进行渲染函数
function renderToTemplate(tag, obj) {
    tag.innerHTML = '<img src="'+ obj.imgURL +'" alt="">\
    <div class="title">'+ obj.title +'（茶水分离） 白色 520ml </div> \
    <div class="desc">'+ obj.desc +' </div> \
    <div> \
        <span class="price-off">'+ obj.disCount +'</span> \
        <del class="price">'+ obj.price +'</del> \
    </div>'
}

goodsRender(data);

// btn
// 当前页
var nowPage = 0;
// 总共的页数
var totalPage = data.length / 4;
// 左边按钮点击函数
leftBtn.onclick = function () {
    // 当前页面为0时，禁止左翻页（页面从0开始）
   if(nowPage == 0) {
       return;
   }
   // 左翻页 当前页数 --    
   nowPage --;
   // 在页面左翻时，把右侧按钮状态为不可点击状态变为可点击状态    
   if(nowPage !== totalPage-1) {
       rightBtn.className="allow";
   }
   // 左翻页后，如果到头禁止翻页
   if(nowPage == 0) {
       leftBtn.className = "not"
   }
   list.style.transform = "translateX(-" + 248 * 4 * nowPage + "px)";
}

rightBtn.onclick = function () {
    // 当前页面为totalPage-1时，禁止左翻页（页面从0开始）
    if(nowPage == totalPage-1) {
        return;
    }
    nowPage ++;
    // 在页面右翻时，把左侧按钮状态为不可点击状态变为可点击状态    
    if(nowPage !== 0) {
        leftBtn.className="allow";
    }
     // 右翻页后，如果到头禁止翻页
    if(nowPage == totalPage-1) {
        rightBtn.className = "not"
    }
    list.style.transform = "translateX(-" + 248 * 4 * nowPage + "px)";

}