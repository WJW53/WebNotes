(function(){//先来一个立即执行函数
    return  $.ajax( {
        url:'https://open.duyiedu.com/jq/movie/power',//接口文档
        type:'POST',
        timeout: 0,
        data:{
            username:'wjw',//暂时无所谓,其实得按人规定的来
            password:'ok',
        },
    } );
}())
.then(function(res){
    // console.log(res);
    if(res.data.power == "other"){
        return  $.ajax({
            url:'https://open.duyiedu.com/jq/movie/movieList',//电影列表
            type:'GET',
            timeout: 0,
        });
    }else{

    }
},function(){
    
})
.then(function(res){
    // console.log(res);
    var data = res.data;//先接收,res.data是个数组,里面元素是对象
    var $Wrapper = $('.wrapper');
    var df = $.Deferred();

    $.each(data,function(index,ele){
        //ele.name   ele.poster(这个是图片地址)
        console.log(index,ele);
        //老样子,走起
        var $MovieSection = $('.tpl').clone().removeClass('tpl').addClass('movieSection');
        
        //把数据放进HTML结构里
        $MovieSection//因为事件本身也是异步的,所以上述新建了一个df,然后返回df.promise(),便于下个then
            .data({id:ele.id})                          //立马接收到,可直接注册成功事件
                .on('click',function(){//给每一个绑定点击事件,用来显示电影详情
                    df.resolve( $(this) );//这里很重要,这个$(this)就是指,每一个电影板块
                })
                    .children()
                        .eq(0).attr('src',ele.poster)//图片资源
                            .next().text(ele.name);

        console.log($MovieSection.data('id'));                    
        $Wrapper.append($MovieSection);//加到wrapper里
                
    });

    return df.promise();//但凡上面碰到别的异步,那这里就要return df.promise();
    
},function(error){
    console.log(error);
})
.then(function( dom ){
    return $.ajax({
        url: 'https://open.duyiedu.com/jq/movie/movieInfo',//电影详情
        type:'GET',
        timeout: 0,
        data:{
            movieId: dom.data('id'),//发送给服务器端每个电影的id,通过这个id
        },                          //服务器端给我它的电影信息
    });
})
.then(function(res){
    console.log(res);//看电影详情的信息
    var data = res.data;
    var direct = data.direct;
    var gut = data.gut;
    var mainActor = data.mainActor;//这俩本身都是数组
    var screenWritter = data.screenwritter;

    //最后那个\是转义字符,就可以让回车不再是回车了,不阻碍字符串拼接
    //mainActor比较特殊
    var htmlStr = '<div class="mask">\
        <p>导演: ' + direct + '</p>\
        <p>剧情: ' + gut + '</p>\
        <p>主演: ' + mainActor.reduce(function(prev,curv){
            //prev为累加器,currentValue,是数组当前处理的元素
            //reduce(callback,initialValue);
            prev += curv+" ";
            return prev;
        },'') + '</p>\
        <p>编剧: ' + screenWritter.reduce(function(prev,curv){
            prev += curv+" ";
            return prev;
        },'') + '</p>\
        </div>';

    // $('.mask').css({display:'none'});//我自己写的这个,老师没写
    $('.mask').remove();//这两个任选其一,都可,避免文字不断重复添加

    // $('body').html(htmlStr);
    $(htmlStr)//其实吧,咱也不知道下面(.css)到底怎么个赋值顺序,你想让它水平垂直居中,那个marginleft本来是自身-1/2的
        .appendTo('body')//故最好分两条css方法写进去,避免报错.$(window).outerWidth(true)/2屏幕的一半宽度
        .css({position: 'absolute', left: $(window).outerWidth(true) / 2, marginTop: 50, width: 400, marginLeft: -200});

});









$.ajax({            
    url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/power',
    data: {
        password: '123456',
        username: 'cst'
    },
    type: 'POST',
    success: function (res) {
        if( res.data.power == 'root' ) {
            $.ajax({
                url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/movieList',
                type: 'GET',
                success: function (res) {
                    var data = res.data;
                    var $Wrapper = $('.wrapper');
                    $.each(data, function (index, ele) {
                        var $MovieDiv = $('.tpl').clone().removeClass('tpl').addClass('movieSection');
                        $MovieDiv
                            .data({id: ele.id})
                                .on('click', function () {                                           
                                    $.ajax({
                                        url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/movieInfo',
                                        type: 'GET',
                                        data: {
                                            movieId: $(this).data('id')
                                        },
                                        success: function (res) {
                                            var data = res.data;
                                            var direct = data.direct;
                                            var gut = data.gut;
                                            var actors = data.mainActor;
                                            var screenWriters = data.screenwriter;

                                            var htmlStr = '<div class="mask">\
                                                <p>导演：' + direct + '</p>\
                                                <p>剧情：' + gut + '</p>\
                                                <p>主演：' + actors.reduce(function (prevValue, curValue) {
                                                    prevValue += ' ' + curValue;
                                                    return prevValue;
                                                }, '') + '</p>\
                                                <p>编剧：' + screenWriters.reduce(function (prevValue, curValue) {
                                                    prevValue += ' ' + curValue;
                                                    return prevValue;
                                                }, '') + '</p>\
                                            </div>';

                                            $(htmlStr).appendTo('body')
                                                .css({width: 400, height: 200, position: 'absolute', left: $(window).outerWidth() / 2 , bottom: 100})
                                                    .css({marginLeft: -$('.mask').outerWidth() / 2, marginTop: -$('.mask').outerHeight() / 2});
                                        },
                                        error: function () {

                                        }
                                    })
                                })
                                    .children().eq(0)
                                        .attr('src', ele.poster)
                                            .next()
                                                .text(ele.name);

                        $Wrapper.append( $MovieDiv );
                    });
                },
                error: function () {

                }
            })
        }else {

        }
    },
    error: function (error) {
        console.log(error);
    }
});
