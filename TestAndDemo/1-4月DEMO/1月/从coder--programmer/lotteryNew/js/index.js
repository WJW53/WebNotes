    var pars = {
        rotateNum:8,
        turnTabel:document.getElementsByClassName('container')[0],
        judgeFn:judgeFn

    }

    var lottery = new Lottery(pars)





// coder 小白
// var btn = document.getElementsByClassName('btn')[0];
// var tabel = document.getElementsByClassName('table')[0];
// var bool = true;
// //  console.log(tabel)
// var randomNum;
// btn.onclick = function () {
//     if(bool){
//         randomNum = Math.floor(Math.random() * 360);
//         console.log(randomNum)
//         runTabel(randomNum);
//         bool = false;
//     }
   
// }


// function runTabel(deg) {
//     deg = deg + 360 * 8;
//     tabel.style.transform = 'rotate(' + deg + 'deg)';
//     tabel.style.transition = 'all 3s';
// }

// tabel.addEventListener('webkitTransitionEnd', function () {
//     console.log('end');
//     judgeFn(randomNum)//判断函数
//     tabel.style.transform = 'rotate(' + randomNum + 'deg)';
//     tabel.style.transition = 'none';
//     bool = true;
// })

function judgeFn(num) {
    var str = '';
    if (num > 0 && num < 45 ) {
        //二等奖
        str = '二等奖'
    } else if (num > 90 && num < 135 || num > 270 && num < 315) {
        //三等奖
        str = '三等奖'
    } else if (num > 45 && num < 90 || num > 135 && num < 180 || num > 225 && num < 270 || num > 315 && num < 360) {
        //四等奖
        str = '四等奖'
    } else if (num > 180 && num < 225) {
        //一等奖
        str = '一等奖'
    }

    alert('大吉大利！ 今晚获得' + str + '!');

}

// programer == 开发者

/***
 * 一. 让我们的代码具有可维护性，可复用性强
 * 二. 代码的语义化，能看懂是啥
 * 三  避免全局变量污染
 * 四  模块化
 *     封装思想
 * 五  设计模式里面（初级设计模式）
 */

 // 函数 ：最初的封装和模块化的思想  ----- 利用 闭包 函数式编程 偏函数 函数的柯里化
//  function add(a,b){
//      return a+b 
//  }

//  立即执行函数： 代码块的思想，让里面的变量不污染全局
// var deng = (function(){
//     var name = "dengge";
//     function adc(){
//         console.log(name)
//     }
//     return {
//         c:abc
//     }

// })()   es6 里面的代码块  { }

//  对象
// var  obj = {
//     name:'deng',
//     init:function(){
//         console.log(this.name)
//     },
//     getname:function(){

//     }
// } 
// obj.init()

// 类的感念。  构造函数 ====Jquery
//  function ABC(){

//  }
//  new ABC();

// (function(a,b){
//     //model

//     b(a)


// })(window,function(window){

//     window.jquery = jquery = $;
//     function jquery(){

//     }

//     jquery.prototype.init = function(){

//     }
//     new jquery.prototype.init()


// })
//jquery 封装库是非常重要的，光它引出的插件就成千上万，解决我们前端很多想象不到的效果
//它的底层源码，如何实现。的回调，（链式调用），动画ainimate ，异步等源码都可以去学习，模块化的东西

// 有同学说现在都用三大框架，


// 5  nodejs  

// 时间点：
// 1，2014年左右  前端开始逐渐向后移  某些库探索前端的mvc 

// 2，还要更早的时候，三剑客的时候，flash横霸一时，动画，广告 游戏 视频播放器。

// 3 ，移动端的时代出现，苹果 三星 小米 魅族基本成型  苹果不在支持flash  各大移动浏览器对w3c支持特别好
    //   H5 CSS3  
    // H5 -- 兼容 统一  canvas  storage  webworke 
    // css3 补间动画 
    //  移动端适配  像素--- viewport ---响应式 ---等
//    4, components 把页面想要的东西都可以封装 <aa></aa> 属性 事件 数据等  (浏览器不支持 )

// angular mvc mvvm  把一些后端的思想前移动   ,后端的概念形成前端的框架  .net asp 都有类似的东西 
    // 一单mvc  这种思想和框架是好 但是js体系越来越大  页面就比较慢 

    // js--->后移 自己得有一个小后端(中间层) nodejs  proxy 代理后端 性能优化 路由  要有真实的路由 ,(java php ) 

    // nodejs --> 本身是后端,用js运行 ,模块化的东西,cmd amd  linux  部署服务 集群 负载均衡...
    // es6  --bable 

    // vue react angular  ---vuex    数据绑定 虚拟dome
    // react  多不知道html写在哪里 (更多设计模式)
    // 前端从view层面---后端api整个链条打通  
    // 
// vue
    // nodejs  webpack  css预处理器 命令行开发 
    // 小程序 基于微信
// svn -- git

    
