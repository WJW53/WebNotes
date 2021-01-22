//写一个具备  更NB 的 工厂, 可为所有对象 量身定制的
//config

// {
//     type: 'base',
//     className: 'duyi',
//     width: 100,
//     height: 50,
//     text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
//     center: true,
//     css: {
//         position: 'absolute',
//         opacity: 0,
//         bottom: 0,
//         backgroundImage: 'url(./src/img/dialog.jpg)',
//         backgroundSize: '100% 100%',                        
//         padding: '10px 15px 10px 15px',
//         textAlign: 'justify',
//         fontSize: '18px',
//         fontWeight: '900',
//         lineHeight: '25px'
//     },
//     animateIn: {
//         opacity: 1,
//         bottom: 140,
//     },
//     animateOut: {
//         opacity: 0,
//         bottom: 0
//     },
//     delay: 200,
//     event: {
//         click: function () {
//             alert($(this).text());
//         },
            // mouseenter:function(){

            // },
//     }
// }

var ComponentFactory = function(config){
    $Div = $('<div class = "component base" ></div>')

    //根据 config 定制化 $Div
    config.className && $Div.addClass(config.className);
    config.width && $Div.css('width',config.width);//有 就 执行
    config.height && $Div.css('height',config.height);
    config.text && $Div.text(config.text);
    // top:"50%",marginTop:-config.height/2,
    config.center && $Div.css({position:'absolute',left:'50%',marginLeft:-config.width/2,});
    config.css && $Div.css(config.css);//那就直接把写好的传进来呗

    if(config.event){
        for(var prop in config.event){
            // console.log(typeof prop,prop);
            $Div.on(prop,config.event[prop]);
        }
    }
    

    $Div.on('cpLeave',function(){
        var self = this;
        setTimeout(function(){//因为定时器里的this不是指向$Div
            config.animateOut && $(self).animate( config.animateOut );
        },config.delay || 0);
    });

    $Div.on('cpLoad',function(){
        var self = this;
        setTimeout(function(){
            config.animateIn && $(self).animate( config.animateIn );//
        },config.delay || 0);
        
    });

    return $Div;
}