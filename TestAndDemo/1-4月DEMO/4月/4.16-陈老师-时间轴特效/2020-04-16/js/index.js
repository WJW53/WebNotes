var items = document.querySelectorAll('.item');
var imgs = document.querySelectorAll('.itemBox img');
var timeLine = document.querySelector('.timeLine');
var circles = document.querySelectorAll('.timeLine div');

var sn = 0; //起点。通过这个值加或减得出来对称数字
var ln = 0; //上一个选中的圆点对应的索引值

//排列圆点
for (var i = 0; i < circles.length; i++) {
    /*
       原数字(i)：0  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16 
       要变成(n)：0  1   2   3   4   3   2   1   0   1   2   3   4   3   2   1   0
       
       1、用i除以4得到的结果为，i每走4次这个结果就会加个1。我要的是整数所以parseInt。算出的数字是每4次增加1
       2、再把这个结果%2，就会变成010101在这循环。而我们想要的数字正是不断在加与减之间切换。所以这个是我想要的
       3、因为每4次0和1换一下，这不就是我正想要的，每4次让加减颠倒一下
     */
    // console.log(parseInt(i / 4)%2);
    var n = parseInt(i / 4) % 2 ? sn-- : sn++;

    /* if(parseInt(i / 4) % 2==0){
        sn++;
    }else{
        sn--
    } */

    //console.log(i, n,sn);
    
    //移动圆点一定要用transform，用定位是没作用，因为父级用了弹性盒模型，所以子元素的定位会失效
    var t = timeLine.offsetHeight / 5 * n;
    circles[i].style.transform = 'translateY(' + t + 'px)';

    //逢4的倍数那个圆点要放大
    if(i%4==0){
        circles[i].classList.add('big');
    }

    //用自执行函数是为了在循环时能得到正确i的值。不用这种形式的话，在定时器里i的值永远为length-1
    (function (i) {
        setTimeout(function () {
            circles[ln].classList.remove('active'); //先把上一个圆点的class去掉
            circles[i].classList.add('active'); //再把当前的圆点class加上

            //盒子显示，圆点的数量与盒子的数量不是一一对应，每4个圆点对应一个盒子。所以拿圆点的索引除以4（要取整）得到对应盒子的索引
            items[parseInt(i/4)].style.opacity=1;
            items[parseInt(i/4)].style.transform='scaleX(1)';

            ln=i;   //把上一个的索引（ln）更新成不前次。上一个会随着当前的走而走。当前的走一次，上一个也要走一次。初始的时候为0，当前走到1，要把0对应的索引干掉。当前走到2，要干掉1对应的索引。所以上一个要变成1。还有一句话。当前次的索引相对于下一次的索引是不是上一个？

            //圆点走到最后，把active要去掉。不过不要那么着急
            if(i==circles.length-1){
                setTimeout(function(){
                    circles[i].classList.remove('active');
                },100);
            }
        }, i * 150);    //每个圆点运动的时间间隔为150ms
    })(i);
}
console.log(imgs);

items.forEach(function(item, index){
    item.onmouseover=function(){
        //这里要区分是上面的盒子还是下面的盒子。上面的盒子索引值（从0开始）为偶数，它%2的结果为0（往上走，-10px）；下面盒子索引为奇数，它%2的结果为1（往下走，10px）。
        /* if(index%2==0){
            this.style.transform='translateY(-10px)';
        }else{
            this.style.transform='translateY(10px)';
        } */
        this.style.transform=index%2?'translateY(10px)':'translateY(-10px)';
        imgs[index].style.transform='rotate(360deg)';   //头像旋转
    }
    item.onmouseout=function(){
        this.style.transform='translateY(0)';
        imgs[index].style.transform='rotate(0)';

    }
});