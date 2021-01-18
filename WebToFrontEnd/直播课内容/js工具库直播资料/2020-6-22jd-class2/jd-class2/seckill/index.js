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