$('.logo-static').ready(function () {
    $(this).find('.text').hide();
})
var logoGif = $('.logo-gif');
$('.logo').mouseenter(function () {
    if (!logoGif.hasClass('animation-start')) {
        logoGif.css({
            backgroundImage: 'url("//img1.360buyimg.com/da/jfs/t1/32282/27/6770/112552/5c90a8b3Ea193c1af/897d05893a77d649.gif?v=' + Math.random() + '")'
        });
        logoGif.removeClass('animation-end').addClass('animation-start').fadeIn();
        setTimeout(function () {
            logoGif.addClass('animation-end').removeClass('animation-start');
            if (logoGif.hasClass('animation-leave')) {
                logoGif.fadeOut().removeClass('animation-leave')
            }
        }, 4000)
    }
}).mouseleave(function () {
    if (logoGif.hasClass('animation-end')) {
        logoGif.fadeOut()
    }
    logoGif.addClass('animation-leave');
})
function dealData(res) {
    var data = res.result;
    var str = data.reduce(function (prevData, item) {
        return prevData + `<li>${item[0]}</li>`
    }, '');
    $('#search-list').html(str).show()
}
$('#search-btn').click(function () {
    var val = $('#search-inp').val();
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        type: 'get',
        data: {
            code: 'utf-8',
            q: val,
            callback: 'dealData',
        },
        dataType: 'jsonp'
    })
});
var searchListTimer = null;
$('.search-form').mouseleave(function () {
    searchListTimer = setTimeout(() => {
        $('#search-list').hide()
    }, 500);
}).mouseenter(function() {
    if ($('#search-inp').val()) {
        $('#search-list').show()
    }
}).find('#search-list').mouseenter(function () {
    clearTimeout(searchListTimer)
}).on('click', 'li', function () {
    $('#search-inp').val($(this).text())
});

// 代表的是输入框发出数据请求的延迟定时器
var searchTimer = null;
$('#search-inp').on('keyup', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
        $('#search-btn').trigger('click')
    }, 500)
})


var placeHolders = ['联想笔记本', '美的饮水机', 'apple']


// 生成一个区间的随机整数
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

setInterval(function () {
    $('#search-inp').attr('placeholder', placeHolders[random(0, 3)])
}, 3000)