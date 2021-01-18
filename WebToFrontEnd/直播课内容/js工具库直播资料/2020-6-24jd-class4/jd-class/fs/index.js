$('.focus-wrapper').swiper({
    animateType: 'fade',
    domList: $('.wrapper-item'),
    width: 590,
    height: 470
})

$('.focus-brand').swiper({
    animateType: 'fade',
    domList: $('.focus-brand > .item'),
    showChangeBtn: 'hover',
    showSpotBtn: false,
    width: 190,
    height: 470,
})

// 激活状态的菜单消失定时器
// var menuActiveTimer = null;
$('.fs-menu').on('mouseenter', 'li', function () {
    $(this).addClass('menu-item-on');
    $(this).siblings().removeClass('menu-item-on')
    $('.menu-content').show();
    var index = $(this).index();
    renderFsContent(menuList[index].content)
})
$('.fs-1').mouseleave(function () {
    $('.menu-content').hide();
    $('.menu-item-on').removeClass('menu-item-on')
})


var menuList = [{
    titles: ['家用电器'],
    content: {
        tabs: ['家电馆', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['手机', '运营商', '数码'],
    content: {
        tabs: ['手机'],
        subs: [{
            title: '手机',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '手表',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['电脑', '办公'],
    content: {
        tabs: ['家电馆', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}, {
    titles: ['家居', '家具', '家装', '厨具'],
    content: {
        tabs: ['家居', '镇乡专卖店', '家电服务'],
        subs: [{
            title: '电视',
            items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
        }, {
            title: '空调',
            items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
        }]
    }
}];

// 静态菜单栏的渲染
function renderFsMenu(data) {
    var fragment = $(document.createDocumentFragment());
    data.forEach(function(menu) {
        var oLi = $('<li></li>');
        menu.titles.forEach(function (title, index) {
            $('<a href="#"></a>').text(title).appendTo(oLi);
            if (index < menu.titles.length - 1) {
                $('<span>/</span>').appendTo(oLi);
            }
        })
        fragment.append(oLi);
    })
    $('.fs-menu').append(fragment)
}

renderFsMenu(menuList);
// 动态渲染菜单右侧结构
function renderFsContent(data) {
    var tabsDiv = $('<div class="tabs-nav"></div>');
    var subsDiv = $('<div class="cate-detail"></div>');
    data.tabs.forEach(function (tab) {
        $(` <a href="">${tab}
        <i class="iconfont">&#xe625;</i>
    </a>`).appendTo(tabsDiv)
    });

    data.subs.forEach(function (sub) {
        var oDl = $('<dl class="cate-item"></dl>');
        var oDt = $(`<dt>
        <a href="#">${sub.title}
            <i class="iconfont">&#xe625;</i>
        </a>
    </dt>`);
        var oDD = $('<dd></dd>');
        sub.items.forEach(function (item) {
            $(' <a href=""></a>').text(item).appendTo(oDD)
        });
        oDl.append(oDt).append(oDD).appendTo(subsDiv);
    })
    $('.menu-content').empty().append(tabsDiv).append(subsDiv)
}


$('.service_frame').mouseenter(function () {
   
    $('.service_pop').css({
        transform: 'translateY(-100%)'
    });
    $('.service_frame').css({
        transform: 'translateY(-28px)'
    });
    if ($(this).hasClass('service_frame2')) {
        $(this).css({
            transform: 'translateY(-83px)'
        });
    }
    $(this).addClass('service_frame_on').siblings().removeClass('service_frame_on')
})

$('.close').click(function () {
    $('.service_pop').css({
        transform: 'translateY(0%)'
    });
    $('.service_frame').css({
        transform: 'translateY(0px)'
    });
    $('.service_frame_on').removeClass('service_frame_on')
})