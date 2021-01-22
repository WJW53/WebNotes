//启动插件功能的入口
//扩展性思想、流程化思想

$('.wrapper').myFullPage({
    colorsArray:['orange','skyblue','green'],

    onLeave: function(index,direction){
        // console.log(index,direction);
        ////找到离开的section
        // $('.section').eq(index).find('.component').fadeOut();

        //触发_leave事件
        $('.section').eq(index).trigger('_leave');
    },

    afterLoad: function(index,direction){
        // console.log(index,direction);
        ////找到进入的section
        // $('.section').eq(index).find('.component').fadeIn();

        //
        $('.section').eq(index).trigger('_load');
    },
    
});

//     //可以加不同的工厂,加不同的HTML结构
//     //生成 section里面的内容 的构造工厂, 根据不同的配置对象,定制不同的结构
//     function ComponentFactory(config) {//传个config参数
//         var $Div = $('<div class="component" style="display: none;text-align: center;font-size: 30px;"><span></span></div>');
//         $Div.find('span').text('WJW');
        
// //  绑定这两个自定义事件,有需要的就再添加
//         $Div.on('cpLeave',function(){//映射_leave触发事件
//             //淡出
//             $(this).fadeOut();
//         });
//         $Div.on('cpLoad',function(){//映射_load触发事件
//             //淡入
//             $(this).fadeIn();
//         })

//         return $Div;
//     }


$('.section').each(function(index,ele){
    $(ele).append( ComponentFactory(
        {
            type: 'base',
            className: 'duyi',
            width: 522,
            height: 286,
            text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
            center: true,
            css: {
                position: 'absolute',
                opacity: 0,
                bottom: 0,
                // 但是为啥字符串里url里面这个./直接代表??!!我一直以为是../img/dialog.jpg
                backgroundImage: 'url(./src/img/dialog.jpg)',
                backgroundSize: '100% 100%',                        
                padding: '10px 15px 10px 15px',
                textAlign: 'justify',//自动对齐
                fontSize: '18px',
                fontWeight: '900',//最粗
                lineHeight: '25px'//1.5倍
            },
            animateIn: {
                opacity: 1,//最终要变化到1
                bottom: 140,
            },
            animateOut: {
                opacity: 0,//最终变化到0
                // bottom: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){

                },
            }
        }
    ) );//向每一个section里加入内容
})



//触发映射事件
$('.section').on('_leave',function(){//一旦触发_leave事件,就触发,cpLeave
    $(this).find('.component').trigger('cpLeave');
});

$('.section').on('_load',function(){
    $(this).find('.component').trigger('cpLoad');
});


//还需要写个配置引擎 : pageEngine.js
//就是只要有一个div框,就可以动态的往里面加.......