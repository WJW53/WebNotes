//myFullPage 本身是个 实例方法  

$.fn.extend({//那就先把它加进来呗
    myFullPage: function(config){//传来一个对象
        //尽量把频繁使用的值,重新赋给一个变量
        //考虑插件的性能,兼容能力

        //1.初始化变量

        var colorsArray  = config.colorsArray;
        var $W = $(this);//$Wrapper,保存调用这个插件的原jQuery对象
        // var $W2 = $W;//重新包一遍,我tnd在这里吃了一个小时的大亏才想出来的
        var $Section = $W.find('.section');
        var commonStyle = {//公共css样式
            width:"100%",
            height:"100%",
        }

        var clientWidth = $(window).outerWidth();//视口宽度
        var clientHeight = $(window).outerHeight();//视口高度
        //当前页面索引,第一个是0
        var curIndex = 0;
        //上锁,避免快速按键 导致没有运动完就重新计算top、left,而造成bug
        var lock = true;

        //2.初始化样式
        $('html')
            .add('body')
                .css({
                    position: 'relative',
                    overflow: 'hidden',
                    margin: 0
                })
                    .add($W)
                        .add($Section)
                            .css(commonStyle);
        
        $W.css({position:'absolute',left:0,top:0})
                .find('.section')
                    .each(function(index,ele){//因为设置的颜色不一样,所以得循环
                        $(ele).css({//因为ele是原生DOM节点,所以得包装一下
                            backgroundColor: colorsArray[index],
                            position:'relative'
                        }).find('.slide')//立即在这接着找slide样式,避免下面wrapAll出问题
                            .css({
                                float:'left',
                                height:clientHeight,
                                width:clientWidth,
                                position: 'relative'//不能忘记
                            })
                                .wrapAll('<div class="sliderWrapper"></div>');
                    });


        $Section.find('.sliderWrapper').each(function(index,ele){
            $(ele).css({
                width:$(ele).find('.slide').length * clientWidth,
                height:clientHeight,
            })
        });


        //3.利用JS控制移动

        //active: 标记当前页面
        //select: 标记默认页面(一开始打开的页面)
        //先给第一个 section active
        //再给每一个section 下的 第一个slide  innerActive

        //3.1 给样式类
        $Section.eq(0)
            .addClass('active')//再利用end方法回退
                .end().find('.sliderWrapper')//给sliderWrapper一个绝对定位,为了让横幅移动
                    .css({position: 'absolute', left: 0, top: 0})
                        .each(function(index,ele){
                            $(ele).find('.slide').eq(0).addClass('innerActive')
                        });
        

        //console.log($W);//jQuery对象,对应div.wrapper  的DOM节点
        //3.2 js控制移动
        $(document).on('keydown',function(e){
            // console.log($W,$(this),$());//这里$W为undefined,why
            // console.log($W2);//这个就对了
            // console.log(e.which);
            // console.log($W.offset());

            //e.which
            //left:37,top:38,right:39,bottom:40
            if(e.which == 38 || e.which == 40){
                //垂直移动 $W
                if(lock){
                    lock = false;
                    var newTop = $W.offset().top;//记录top值
                    var direction = "";//记录当前页是因按了哪个方向而来的

                    if(e.which == 38 && curIndex !=0){//上
                        //一定要在curindex改变前,先执行onLeave
                        direction = 'top';
                        config.onLeave(curIndex,direction);//触发onLeave事件
                        //top再加一屏距离
                        curIndex--;
                        newTop += clientHeight;    
                    }else if(e.which == 40 && curIndex != $Section.length-1){//下
                        direction = 'bottom';
                        config.onLeave(curIndex,direction);
                        //top再减一屏距离
                        curIndex++;
                        newTop -= clientHeight;
                    }

                    $W.animate({
                        top:newTop,

                    },400,'swing',function(){//这个回调很重要,运动完才能重新开锁
                        lock = true;
                        //更新 : 谁拿样式、谁清除样式
                        $Section.eq(curIndex).addClass('active');
                        if(direction == 'top'){
                            console.log(curIndex,direction);
                            $Section.eq(curIndex + 1).removeClass('active');
                        }else if(direction == 'bottom'){
                            console.log(curIndex,direction);
                            $Section.eq(curIndex - 1).removeClass('active');
                        }

                        //触发afterLoad
                        config.afterLoad(curIndex,direction);
                    });
                }
                
            }
            if(e.which == 37 || e.which == 39){
                //水平移动: 利用 .active .sliderWrapper ,即横向滚动当前的页面,进行水平切换

                if(lock){
                    lock = false;//先关门
                    
                    var $SW2 = $('.active').find('.sliderWrapper');//
                    var $SW = $('.active').find('.sliderWrapper');//这也重新包了一次,到底为啥啊,wc
                    var curShowDom = $SW.find('.innerActive');
                    var newLeft = $SW.offset().left;
                    var direction = null;

                    if(e.which == 37 && curShowDom.index() != 0){
                        //left
                        newLeft +=  clientWidth;
                        direction = 'left';
                        console.log(curIndex,direction);
                    }else if(e.which == 39 && curShowDom.index() != $SW.find('.slide').length-1){
                        //毕竟find,是可以先从本级找起的
                        //right
                        newLeft -= clientWidth;
                        direction = 'right';
                        console.log(curIndex,direction);
                    }

                    $SW.animate({
                        left: newLeft,
                    },300,'swing',function(){
                        lock = true;
                        //如果按过方向键,就移除当前innerActive,否则什么都不干
                        direction != null ? curShowDom.removeClass('innerActive') : "";

                        if(direction == 'left'){
                            curShowDom.prev().addClass('innerActive');
                        }else if(direction == 'right'){
                            curShowDom.next().addClass('innerActive');
                        }
                    })
                }
            }
        })
    }
})