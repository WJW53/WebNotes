// 



// $.extend({
//     swiper:  function () {

//     }
// })
// $.swiper()
// $.fn === $.prototype.extend({
    
// })
// $('.xxx').swiper

// 实例、 工具

// 实例： 由一个构造函数构造出来的就是实例
// 工具： 拿过来就可以用的 

// 存储轮播图数据的构造函数
function Slider(options, wrap) {
    // 包裹轮播图的页面的区域 
    this.wrap = wrap;
    // 当前轮播图对象的动画类型
    this.animateType = options.animateType || 'fade';
    // 当前轮播图自动轮播的状态  默认为自动轮播
    this.isAutoChange = options.isAutoChange === undefined ? true : options.isAutoChange;
    // 轮播内容列表
    this.domList = options.domList || [];
    // 轮播图的左右按钮显示状态
    this.showChangeBtn = options.showChangeBtn ||  'always';
    // 轮播图的小圆点按钮显示状态
    this.showSpotBtn = options.showSpotBtn === undefined ? true : options.showSpotBtn;
    // 轮播图的大小
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    // 轮播内容长度
    this.len = this.domList.length;
    // 当前展示的轮播内容索引值
    this.nowIndex = 0;
}
// 创建轮播图结构
Slider.prototype.createElement = function () {
    var swiperWrapper = $('<div class="my-swiper"></div>');
    var imgDomList = $('<ul class="my-swiper-list"></ul>');
    var spotsBtn = $('<div class="my-swiper-spots"></div>');
    for (var i = 0; i < this.domList.length; i++) {
        // 包裹着轮播内容的结构  方便书写样式
        var oLi = $('<li class="my-swiper-item"></li>');
        // this.domList[i] 代表当前轮播内容信息 
        oLi.append($(this.domList[i])).appendTo(imgDomList);
        spotsBtn.append('<span></span>');
    }
    // 如果当前轮播效果为从左到右的轮播  那么在最后插入一个轮播区域  这个轮播区域的内容和第一个轮播区域的内容相同
    if (this.animateType == 'animation') {
        $('<li class="my-swiper-item"></li>').append($(this.domList[0]).clone())
                                            .appendTo(imgDomList);
    }
    var leftBtn = $('<div class="my-swiper-lBtn">&lt;</div>');
    var rightBtn = $('<div class="my-swiper-rBtn">&gt;</div>');
    swiperWrapper.append(imgDomList)
                 .append(leftBtn)
                 .append(rightBtn)
                 .append(spotsBtn)
                 .appendTo(this.wrap);

}
//  设置样式
Slider.prototype.initStyle = function () {
    $('.my-swiper', this.wrap).css({
        width: this.width,
        height: this.height
    }).find('.my-swiper-item').css({
        width: this.width,
        height: this.height
    }).end().find('.my-swiper-spots > span').eq(this.nowIndex).addClass('active')
    if (this.animateType == 'animation') {
        $('.my-swiper', this.wrap).find('.my-swiper-list').css({
            width: this.width * (this.len + 1),
            height: this.height,
            position: 'absolute'
        }).find('.my-swiper-item').css({
            float: 'left'
        })
    } else if (this.animateType == 'fade') {
        $('.my-swiper', this.wrap).find('.my-swiper-list').css({
            width: this.width,
            height: this.height,
            position: 'relative'
        }).find('.my-swiper-item').css({
            position: 'absolute'
        })
    }    
}



$.fn.extend({
    swiper: function (options) {
        var obj = new Slider(options, this);
        obj.createElement();
        obj.initStyle()
    }
})