
function bindEvent() {
    $('#submit').click(function () {
        var val = $('#inp-box').val();
        if (val) {
            renderDom('mine', val);
            $('#inp-box').val('');
            getData(val);
        }
    });
    $('#inp-box').on('keyup', function (e) {
        // console.log(e.keyCode)
        if (e.keyCode == 13) {
            $('#submit').trigger('click');
        }
    })
}
function renderDom(avitor, text) {
    if (avitor == 'mine') {
        $(' <div class="mine">\
        <div class="avitor"></div>\
        <div class="text">' + text + '</div>\
    </div>').appendTo($('.content'));
    } else if (avitor == 'robot') {
        $(' <div class="robot">\
        <div class="avitor"></div>\
        <div class="text">' + text + '</div>\
    </div>').appendTo($('.content'));
    }
    var scrollTop = $('#content')[0].scrollHeight - $('#content')[0].clientHeight;
    $('#content').scrollTop(scrollTop);
}
function getData(text) {
    $.ajax({
        url: 'https://developer.duyiedu.com/edu/turing/chat',
        // url: 'http://127.0.0.1:3000/chat',
        type: 'GET',
        data: {
            text: text
        },
        // headers: {
        //     'token': 'lalalala1'
        // },
        dataType: 'json',
        success: function (res) {
            console.log(res);
            renderDom('robot', res.text);
        }
    });
}
bindEvent();