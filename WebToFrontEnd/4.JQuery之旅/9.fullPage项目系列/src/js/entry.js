//

pageEngine.init('.wrapper',['orange','skyblue','green'])
    .addSection('oneSection')
        .addComponent({
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
                bottom: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){

                },
            }
        })
        .addComponent({
            type: 'base',
            className: 'duyi',
            width: 200,
            height: 120,
            text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
            center: true,
            css: {
                position: 'absolute',
                opacity: 0,//从透明开始变化
                bottom: 0,//从下面开始变化
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
                top: 140,
            },
            animateOut: {
                opacity: 0,//最终变化到0
                top: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){

                },
            }
        })
    .addSection('twoSection')
        .addComponent({
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
                // bottom: 380,
                top:0,
            },
            animateOut: {
                opacity: 0,//最终变化到0
                bottom: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){

                },
            }
        })
    .addSection('threeSection')
        .addSlide('3-slide-1')
            .addComponent({
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
                bottom: 390,
            },
            animateOut: {
                opacity: 0,//最终变化到0
                bottom: 0
            },
            delay: 200,
            event: {
                click: function () {
                    alert($(this).text());
                },
                mouseenter:function(){

                },
            }
            })
        .addSlide('3-slide-2')
            .addComponent({
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
            })
        .addSlide('3-slide-3')
            .addComponent({
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
            })
        .load();//这个可千万别忘记触发啊!!!这相当于是入口