//$()   对象 --> 内部原理 如下
        //jQuery 库 封闭作用域

(function(){
    function jQuery(selector){
        return new jQuery.prototype.init(selector);//初始化
    }


    jQuery.prototype.init = function(selector){
        //1.  this = {};

        // var isDOM =//判断是不是DOM对象的 一个 节点！！！,已做兼容性处理
        //         typeof HTMLElement === 'object'
        //         ? function(obj) {
        //         return obj instanceof HTMLElement;
        //         }
        //         : function(obj) {
        //         return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        //         };

        //选出dom标签 并且 包装成jQuery对象 并返回
        //id class
        this.length = 0;//初始化长度

        //null undefined jsDom对象

        if(selector == null){//因为null == undefined,所以这儿并没有多写啥
            return this;
        }

//注意:只有它是字符串的时候,才var 了一个 dom,注意以前讲的if里现在预编译不能做函数声明
        //console.log(dom);//undefined
        //所以可以声明dom,因为虽然是在if里,但它返回的结果不是函数,我试了,不然也不会是undefined
        //但是若没有进到这个if里下面的length就会报错,因为现在dom还不是个对象,不能.length!
        if(typeof selector == "string" && selector.indexOf('.') != -1){
            var dom = document.getElementsByClassName(selector.slice(1));
        }else if(typeof selector == "string" && selector.indexOf('#') != -1){
            var dom =  document.getElementById(selector.slice(1));
        }

    ////jsDom对象判断,但是如果是dom对象节点,那上面字符串的时候就不会var dom,从而导致下面的dom.length报错,所以要揉一起
    ////只有一个DOM节点,才tnd为true,一个通过getElements..获取的类数组就只是一个类数组而已,卧槽了
    ////因为要做链式调用,所以这里必须处理一下DOM对象,一个节点节点,以后用一个节点说话！！！
        //console.log(dom.length);//这种虽然会报错
        //但是在if里的 或运算  例外,只要前面的正确,就不会解析后面的,所以这里dom.length不报错
        if(selector instanceof HTMLElement || dom.length == undefined){//这是id选择器选择的dom自己本身的时候
            this[0] = dom || selector;//因为id选择器选出来的是原生标签,不是dom对象,所以没有length属性
            this.length++;
        }else{//类选择器时:可能有好多个dom,它选出来的是类数组
            ////基础铺垫
            for(var i = 0;i<dom.length;i++){
                this[i] = dom[i];
                this.length++;
            }
        }

        
        // console.log(isDOM(selector));//false, Why?!
        // console.log(selector instanceof HTMLElement);//false,Why?!
        //因为oDiv真的不是一个dom对象,由于叫法原因,此对象非比对象,哎我自己领会就好.它只是一个类数组卧槽了,我把概念搞混淆了
        //真想搞oDiv,得先做其他处理(把类数组里的节点摘出来,还得搞那个length,不然报错)然后再for循环就行
        // if(typeof selector == 'object'){
        //     for(var i = 0;i<selector.length;i++){
        //         this[i] = selector[i];
        //         this.length++;
        //     }       
        // }
 
        
        //3. return this;
    }


    jQuery.prototype.css = function (config) {
        //循环操作每一个dom
        for(var i = 0;i<this.length;i++){
            for( var attr in config){//遍历传进来的属性对象
                this[i].style[attr] = config[attr];//赋值给调用的dom对象
            }
        }
        //jQuery链式操作的精髓3 链式调用 
        return this;//写不写都行,毕竟它会隐式调用return this;
    }


    jQuery.prototype.pushStack = function(dom){
        // dom --> newObj
        if(dom.constructor != jQuery){//如果你不是jq对象的话
            dom = jQuery(dom);//那我就帮你包装一下
        }
        dom.prevObject = this;////新建立一个prevObject属性,指向上一个环境
        return dom;//再返回最新的
    }


    jQuery.prototype.get = function(num){
        // if(num == null){//就是没给get传参数的时候
        //     //或者写简化版本的: [].slice.call(this,0);
        //     return Array.prototype.slice.call(this,0);//把拿到的类数组,变成真正的数组
        // }else{
        //     if(num>=0){
        //         return this[num];
        //     }else{
        //         return this[num + this.length];
        //     }   
        // }
//经过测试 ifelse 跟 三目运算符 性能差不多
        return num!=null ? (num>=0 ? this[num] : this[num + this.length]) : [].slice.call(this,0);
    }


    jQuery.prototype.eq = function(num){
        //不为空就让这里的dom等于其选中的原生jsDom对象的节点,否则就让dom也为空
        var dom = num != null ? (num>=0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    }


    jQuery.prototype.add = function(selector){
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();//先建个空的准备存储

        //就得是这个顺序才对吧,最早入栈的是0号位,以此类推
        for(var i = 0;i<baseObj.length;i++){
            newObj[newObj.length++] = baseObj[i];//先加上原有的
        }
        for(var i = 0;i<curObj.length;i++){
            newObj[newObj.length++] = curObj[i];//把当前得到属性的加到原有的最后面
        }
        
        
        //console.log(newObj);//测试一下
        //记录上一个状态
        // newObj.prevObject = this;//this指之前的环境
        this.pushStack(newObj);//入栈
        return newObj;//返回我这个新的jq对象
    }


    jQuery.prototype.end = function(){
        return this.prevObject;//回到上个节点
    }


    jQuery.prototype.myOn = function(type,handler){//这个myOn离jQuery的on方法差了很多功能
        for(var i = 0;i<this.length;i++){//因为前面可能有多个DOM节点
            if(!this[i].cacheEvent){//如果没有存事件,就建造一个存事件的缓冲池
                this[i].cacheEvent = {};
            }
            if(!this[i].cacheEvent[type]){//如果没存过这个事件
                this[i].cacheEvent[type] = [handler];//就给这个事件绑定处理程序
            }else{//有这个事件那就直接再添加处理程序
                this[i].cacheEvent[type].push(handler);
            }
        }
    }


    jQuery.prototype.myTrigger = function(type){//把其他参数统一起来,再变为真数组
        var params = arguments.length > 1 ? [].slice.call(arguments,1) : [];

        var self = this;
        for(var i = 0;i<this.length;i++){
            if(this[i].cacheEvent[type]){//如果它绑定了这类事件,就
                this[i].cacheEvent[type].forEach(function (ele,index) {//遍历处理程序
                    ele.apply(self,params);//指向调用trigger的jQuery对象,且传给他实参
                    //就是说 让这个jq对象执行,这个处理程序,毕竟是在人家身上绑定的事件
                });
            }
        }
    }

//queue的名称和内容,是第一次调用它的jQuery对象的属性和属性值
    jQuery.prototype.myQueue = function(){//type,handler
        var queueObj = this;//jQuery对象
        var queueName = arguments[0] || 'fx';//如果不传参数,我就给它来一个队列名
        var addFunc = arguments[1] || null;
        var len = arguments.length;

        //只传队列名,即为 取队列操作,那就返回给它呗
        if( len == 1 ){
            return queueObj[0][queueName];
        }

        // 官方: queue 通过全局构造函数 Data 来创造一个全局的 {},存信息
        //添加队列 或 向已有队列中添加内容
        //我们简单搞一下:   dom 是否含有 chain的handler,没有就新创一个,有就入队
        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
        return this;//最后返回,链式调用
    }

    //牢记: 出队才会执行handler,入队不执行
    jQuery.prototype.myDequeue = function(){//type
        var self = this;//闭包
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);//取出这个队列(其每个内容都是函数)
        var currFunc = queueArr.shift();//从数组中删除第一个元素，并返回该元素的值.此方法更改数组的长度

        if(currFunc == undefined){//出口。  队首 空了的,就return;
            return ;
        }

        var next = function(){//next的功能,这个是关键
            self.myDequeue(queueName);//毕竟next()是在全局执行的,我们是想这里的this是最开始的
            //jQuery对象,所以这里必须用self
        }
        //递归出队每一个队内成员
        currFunc(next);//再执行下一个队首(因为刚才已经移除了前任队首)
        return this;//最后返回,链式调用
    }


    jQuery.prototype.myDelay = function(duration){
        var queueArr = this[0]['fx'];//this[0]是dom对象

        queueArr.push( function(next){//延迟执行next
            setTimeout(function(){
                next();
            },duration);
        } );

        return this; //不要忘记,链式调用必备
    }


    jQuery.prototype.myAnimate = function (json, callback) {
        var len = this.length;//因为可能有多个dom节点,但我们这里只是每次执行一个
        var self = this;

        //animate最后添加到队列里的内容函数
        var baseFunc = function( next ){
            var times = 0;//检测到所有DOM节点都运动到了目标点,这时才能再执行回调函数
            for(var i = 0;i<len;i++){
                startMove(self[i],json,function(){
                    times++;
                    if(times == len){//可以的停止的,因为times总是比i大1,恰好..
                        callback && callback();//有,就执行
                        next();//执行后续队员的出队
                    }
                });
            }
        }

        this.myQueue('fx',baseFunc);//创建这个队列,并且把这个baseFunc作为内容
        if(this.myQueue('fx').length == 1){//因为length可是会变的
            //当只有一个队员的时候,
            this.myDequeue('fx');//就出队
        }

//
        function getStyle (obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            }else {
                return window.getComputedStyle(obj,false)[attr];
            }
        }
                
        function startMove (obj, json, callblack) {
            clearInterval(obj.timer);
            var iSpeed;
            var iCur;
            var name;
            obj.timer = setInterval(function () {
                var bStop = true;
                for (var attr in json) {                            
                    if (attr === 'opacity') {                                
                        name = attr;
                        iCur = parseFloat(getStyle(obj, attr)) * 100;
                    }else {
                        iCur = parseInt(getStyle(obj, attr));
                    }                            
                    iSpeed = (json[attr] - iCur) / 7;
                    if (iSpeed > 0) {
                        iSpeed = Math.ceil(iSpeed);
                    }else {
                        iSpeed = Math.floor(iSpeed);
                    }
                    if (attr === 'opacity') {
                        obj.style.opacity = (iCur + iSpeed) / 100;
                    }else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                    if (json[attr] - iCur !== 0) {
                        bStop = false;
                    }
                }
                if (bStop) {
                    clearInterval(obj.timer);
                    callblack();
                }
            }, 30);
        }

        return this;//   
    }


    jQuery.myCallbacks = function(){
        //'once' 'memory' 'once memory' null
        //

        //存储参数,没传就设为空字符串
        var options = arguments[0] || "";
        //通过add来加入的方法
        var list = [];
        //记录当前要执行函数的索引
        var fireIndex = 0;

        //记录是否fire过,默认没有
        var fired = false;

        //全局的实际参数列表
        var args = [];

        //在这儿执行fire
        var fire = function(){
            for(;fireIndex < list.length;fireIndex++){
                list[fireIndex].apply(window,args);//把这个函数挂到全局上,并传参执行
            }
            if(options.indexOf('once') != -1){//有once的时候,要都置空
                list = [];
                fireIndex = 0;
            }
        }

        return {
            add: function(func){
                list.push(func);

                if(options.indexOf('memory' != -1) && fired){//有memory的时候 并且 fire过
                    fire();//这时直接fire
                }

                return this;
            },
            fire: function(func){
                //每次执行前,都先把索引置为零
                fireIndex = 0;
                args = arguments;//赋给全局实参
                fired = true;
                fire();//明白了明白了,  闭包+return匿名对象 具体看两大原理文件夹下test.html
            }
        }

    }


    //本质是由callback实现,然后有三种状态 即 对应三个callback
    jQuery.myDeferred = function(){
        //3个callback
        // done->resolve   fail->reject   progress->notify
        var arrCallbacks = [
            [//只写这个是只能做到 resolve则不会继续resolve成功,但可以reject,所以要改进,看下面
                jQuery.myCallbacks('once memory'),'done','resolve'
            ],[
                jQuery.myCallbacks('once memory'),'fail','reject'
            ],[
                jQuery.myCallbacks('memory'),'progress','notify'
            ]
        ];

        var pendding = true;//做个标记,将resolve和reject联系起来
        var deferred = {};

        for(var i = 0;i < arrCallbacks.length;i++){
            //arr[i][j]
            //立即执行函数避免bug
            //注册：
            //deferred['done/fail/progress'] = function(){};//视作了deferre的属性
            deferred[ arrCallbacks[i][1] ] = ( function(index){
                return function(func){
                    arrCallbacks[index][0].add(func);
                };
            }(i) );

            //触发
            //deferred['resolve/reject/notify'] = function(){};
            deferred[ arrCallbacks[i][2] ] = ( function(index){
                return function(){
                    var args = arguments;
                    if(pendding){
                        arrCallbacks[index][0].fire.apply(window,args);//指向全局,传入参数
                        if(arrCallbacks[index][2] == 'resolve' || arrCallbacks[index][2] == 'reject'){
                            pendding = false;//如果是这俩,那就false,也就是只执行一次
                        }
                    }
                }
            }(i) );
        }
        //最后
        return deferred;
    }




//这样的话,原型上的所有功能就都到默认的初始化的上面了
    jQuery.prototype.init.prototype = jQuery.prototype;//这个非常重要,


    window.$ = window.jQuery = jQuery;//这样的话就会被保存到外面的全局了
})();