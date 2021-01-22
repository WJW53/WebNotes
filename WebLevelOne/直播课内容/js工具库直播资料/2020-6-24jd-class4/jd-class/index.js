$('#shortcut').load('./shortcut/index.html')
$('#header').load('./header/index.html')
$('#fs').load('./fs/index.html')
$('#seckill').load('./seckill/index.html')


window.onresize = function () {
    console.log($(window).width())
    if ($(window).width() < 980) {
        $('.focus-brand').hide()
        $('.w').width(980)
    } else {
        $('.focus-brand').show()
        $('.w').width(1190)
    }
}