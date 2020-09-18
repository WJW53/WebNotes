$('.seckill-list > .main').swiper({
    animateType: 'animation',
    domList: $('.seckill-list > .main > .item'),
    showSpotBtn: false,
    isAuto: false,
    height: 260,
    width: 800
})

$('.seckill-brand').swiper({
    domList: $('.seckill-brand .slider_item'),
    showSpotBtn: true,
    showChangeBtn: 'hide',
    height: 260,
    width: 200
})

var endTime = moment({
    hour: 22,
    minute: 22
})


var seckillTimer = setInterval(function () {
    var millseconds = endTime.diff(moment());
    console.log(millseconds)
    var seconds = parseInt(millseconds / 1000) % 60;
    var minutes = parseInt(millseconds / 1000 / 60)  % 60;
    var hour = parseInt(millseconds / 1000 / 60 / 60);
    console.log(hour, minutes, seconds);
    if (hour <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(seckillTimer);
        seconds = 0;
        hour = 0;
        minutes = 0;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    $('.timmer__unit--hour').text(hour);
    $('.timmer__unit--minute').text(minutes);
    $('.timmer__unit--second').text(seconds);

}, 1000)