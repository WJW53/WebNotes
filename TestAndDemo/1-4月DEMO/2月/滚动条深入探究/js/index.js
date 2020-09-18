/***
 * 探究滚动条的原理 
 * 1，默认的滚动条的bar 计算
 * 2, 滚动条的拖拽
 * 3, 实现滚动原理
 * 
 * 
 * 
 */

(function () { //代码执行块
    //先把默认的bar搞出来
    //   窗口的高度 / 内容的高度 * 滑倒的高度  = bar高度

    var containerNode = document.getElementsByClassName('container')[0]; //窗口
    var contentNode = document.getElementsByClassName('content')[0]; //内容高度
    var durationNode = document.getElementsByClassName('duration')[0]; //滑道高度
    var ele_bar = document.getElementsByClassName('bar')[0]; //滑块

    containerNode.offsetHeight //窗口的高度
    contentNode.offsetHeight // 内容的高度
    durationNode.offsetHeight // 滑块的高度
    var H_bar = Math.floor(containerNode.offsetHeight / contentNode.offsetHeight * durationNode.offsetHeight);
    ele_bar.style.height = H_bar + 'px';

    init();

    function init() {
        scrollDrage(); //滚东条的拖拽
        scrollClick(); //点击数滚动
        scrollWheel(); //滚轮事件


    }

    function scrollDrage() {
        ele_bar.onmousedown = function (e) {
            e = e || window.event;
            e.preventDefault();
            var e_y = e.pageY; //记录按下的点 


            document.onmousemove = function (e) {
                var chay = e.pageY - e_y; //鼠标移动 产生插值 
                ele_bar.style.top = ele_bar.offsetTop + chay + 'px';
                e_y = e.pageY //按下的店的变量更换 ，更新一个差值的点 
                if ((ele_bar.offsetTop + ele_bar.offsetHeight) > durationNode.offsetHeight) {
                    ele_bar.style.top = durationNode.offsetHeight - ele_bar.offsetHeight + 'px';
                } else if (ele_bar.offsetTop < 0) {
                    ele_bar.style.top = 0 + 'px';
                }

                contentMove(); //执行比例运动；
            }

            document.onmouseup = function () { //
                document.onmousemove = null;


            }







        }



    }
    //滚动条原理 ： 滚动条的最大滚动距离 H ----》 durationNode.offsetHeight - ele_bar.offsetHeight
    //    滚动距离   H1 ------>  ele_bar.offsetTop;
    // 比例： H1 / H = p
    // 对应的可滑动的内容区域 n ： contentNode.offsetHeight - containerNode.offsetHeight;
    //求：滑出去的 内容 x：  p * n ；

    function contentMove() {
        var persentH = ele_bar.offsetTop / (durationNode.offsetHeight - ele_bar.offsetHeight);
        var x = Math.floor(persentH * (contentNode.offsetHeight - containerNode.offsetHeight));
        contentNode.style.top = -x + 'px';

    }

    function scrollClick() {
        var speed  = 10; 
        var  scroll = document.getElementsByClassName('scroll')[0];
        scroll.onclick = function(e){

            console.log(e.target.id)

            if(e.target.id == 'up'){//点击上面 up
                ele_bar.style.top = ele_bar.offsetTop - speed + 'px';
                if (ele_bar.offsetTop < 0) {
                    ele_bar.style.top = 0 + 'px';
                }


            }else if(e.target.id == 'down'){//点击的下面 down
                ele_bar.style.top = ele_bar.offsetTop + speed + 'px';
                if ((ele_bar.offsetTop + ele_bar.offsetHeight) > durationNode.offsetHeight) {
                    ele_bar.style.top = durationNode.offsetHeight - ele_bar.offsetHeight + 'px';
                } 

            }

            contentMove();
        }
       




    }

    function scrollWheel(){
        var speed  = 10;
        containerNode.onmousewheel = function(e){

            // console.log(e.wheelDelta > 0 )

            if(e.wheelDelta > 0){//向上滑 
                ele_bar.style.top = ele_bar.offsetTop - speed + 'px';
                if (ele_bar.offsetTop < 0) {
                    ele_bar.style.top = 0 + 'px';
                }


            }else{ //下
                ele_bar.style.top = ele_bar.offsetTop + speed + 'px';
                if ((ele_bar.offsetTop + ele_bar.offsetHeight) > durationNode.offsetHeight) {
                    ele_bar.style.top = durationNode.offsetHeight - ele_bar.offsetHeight + 'px';
                } 


            }
            contentMove();
        }


    }

//学生
    //大一  ‘天才时间’ 30w        1万小时法则 
    //有目标 开始学习  不荒废时间 


//大二  ‘黄金时间’ 


//大三  ‘ 紧 迫 ” 时间规划好  全身投入    


//大四  “ 有救”  ----》态度 所有的精力 全部投入道学习 


//转业 不会浪费  

//    -----》疫情  之后 一大批的跳槽  ，企业其需求 特别大  互联网公司 



// 报名15   js扎实  ---》15期 

//  16期 -----》 js还没有学完  


// 报名全阶班  -----》 就业保障协议

})()