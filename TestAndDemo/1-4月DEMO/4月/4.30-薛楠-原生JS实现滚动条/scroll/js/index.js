/***
 * 
 * 
 */



//刚开始

(function () { //代码块


    var ele_container = document.getElementsByClassName('container')[0],
        ele_content = document.getElementsByClassName('content')[0],
        ele_duration = document.getElementsByClassName('duration')[0],
        ele_bar = document.getElementsByClassName('bar')[0];
    var persent = ele_container.offsetHeight / ele_content.offsetHeight;
    bar_height = Math.floor(ele_duration.offsetHeight * persent);
    ele_bar.style.height = bar_height + 'px'; //获得滑块的高度；

    init() //入口函数 

    function init() {
        scrollDrag(ele_bar) //拖拽滑块
        scrollClick(ele_bar) //上下点击e
        scrollWheel(ele_bar) //鼠标滑轮

    }
    //拖拽滑块  。。
    function scrollDrag(bar) {

        bar.onmousedown = function (e) { //鼠标按下
            e.preventDefault();
            var e_y = e.pageY; //鼠标在文档的Y的坐标点

            document.onmousemove = function (e) { //鼠标移动
                var chay = e.pageY - e_y;
                bar.style.top = bar.offsetTop + chay + 'px';
                e_y = e.pageY; //复原e_y 让鼠标移动永远保持差

                //判断边界
                if (bar.offsetTop < 0) {
                    bar.style.top = 0 + 'px';
                } else if ((bar.offsetTop + bar.offsetHeight) > ele_duration.offsetHeight) {
                    bar.style.top = ele_duration.offsetHeight - bar.offsetHeight + 'px';
                }

                contentMove(bar); //关联运动的公式--- 函数

            }

            document.onmouseup = function () { //鼠标松开
                document.onmousemove = null;

            }

        }

    }
    //核心运动比例函数  让content 内容上下随滑块 移动
    function contentMove(bar) {
        //n1 = bar.offsetTop;
        //n =  ele_duration.offsetHeight - bar.offsetHeight
        //N = ele_content.offsetHeight - ele_container.offsetHeight;
        //N1 = ?

        var persent = bar.offsetTop / (ele_duration.offsetHeight - bar.offsetHeight);
        var N1 = Math.floor((ele_content.offsetHeight - ele_container.offsetHeight) * persent);

        ele_content.style.top = -N1 + 'px';

    }

    //点击按钮 

    function scrollClick(bar) {
        var scroll = document.getElementsByClassName('scroll')[0];
        var speed = 10;
        scroll.addEventListener('click', function (e) {
            var flage = e.target.id //事件对象的id获取
            console.log(flage)

            if (flage == 'up') { //点击上面的按钮
                bar.style.top = bar.offsetTop - speed + 'px';
                if (bar.offsetTop < 0) {
                    bar.style.top = 0 + 'px';
                }


            } else if (flage == 'down') { //点击下面按钮
                bar.style.top = bar.offsetTop + speed + 'px';
                if ((bar.offsetTop + bar.offsetHeight) > ele_duration.offsetHeight) {
                    bar.style.top = ele_duration.offsetHeight - bar.offsetHeight + 'px';
                }

            }

            contentMove(bar) //关联函数

        })



    }

    //滑轮滚动 

    function scrollWheel(bar) {
        var speed = 10;
        ele_content.onmousewheel = function (e) { //鼠标滑轮事件

            //    console.log(e.wheelDelta == -180);
            if (e.wheelDelta > 0) { //向上滑动 控制滑块向上

                bar.style.top = bar.offsetTop - speed + 'px';
                if (bar.offsetTop < 0) {
                    bar.style.top = 0 + 'px';
                }

            } else { //向下滑动控制滑块向下
                bar.style.top = bar.offsetTop + speed + 'px';
                if ((bar.offsetTop + bar.offsetHeight) > ele_duration.offsetHeight) {
                    bar.style.top = ele_duration.offsetHeight - bar.offsetHeight + 'px';
                }

            }
            contentMove(bar) //关联函数

        }






    }



})()