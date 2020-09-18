//关于console.log();
//控制台API不是在任何规范中都定义的标准API，而是在所有浏览器中都实现的东西
//因此，由于没有标准规范来定义API中任何方法的输出，因此供应商通常可以自由选择以自己的方式实现。
function clog (msg) {
    console.log(msg.toString());
}//这样就会打印出系统真正的toString();了
//clog(obj);


//数组去重,利用类数组(对象)的属性名唯一,hash的方式
Array.prototype.unique = function(){
    var temp = {};
    var arr = [];//去重后的数组
    var len = this.length;//减少计算length的次数
    for(var i=0;i<len;i++){//this[i]就相当于指向的数组array[i]
        if(!temp[this[i]]){//!undefined为true,如果对象中没有这个值就..
        //这里还是要赋值字符串呀,不然数组里的0和undefined都没法去重   
            temp[this[i]] = 'a';//就给这个对象添加对应的属性
            arr.push(this[i]);//再将这个数组元素加入arr中
        }
    }
    return arr;
}


//深度拷贝
function type(obj) {//封装type
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]' : 'boolean', 
      '[object Number]'  : 'number', 
      '[object String]'  : 'string', 
      '[object Function]' : 'function', 
      '[object Array]'  : 'array', 
      '[object Date]'   : 'date', 
      '[object RegExp]'  : 'regExp', 
      '[object Undefined]': 'undefined',
      '[object Null]'   : 'null', 
      '[object Object]'  : 'object'
    };
    if(obj instanceof Element) {//对dom元素的处理
        return 'element';
    }
    return map[toString.call(obj)];
}
function deepClone(data) {//深度克隆
    var t = type(data), o, i, ni;//类型,克隆后的data,用来循环的i,ni
    
    if(t === 'array') {
      o = [];
    }else if( t === 'object') {
      o = {};
    }else {
      return data;//原始值等其他或者DOM元素
    }
    
    if(t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
        o.push(deepClone(data[i]));
      }
      return o;
    }else if( t === 'object') {
      for( i in data) {
        o[i] = deepClone(data[i]);//深度克隆每个属性
      }
      return o;
    }
}


//利用类数组(对象)的属性名唯一,hash的方式
Array.prototype.unique = function(){
    var temp = {};
    var arr = [];//去重后的数组
    var len = this.length;//减少计算length的次数
    for(var i=0;i<len;i++){//this[i]就相当于指向的数组array[i]
        if(!temp[this[i]]){//!undefined为true,如果对象中没有这个值就..
        //这里还是要赋值字符串呀,不然数组里的0和undefined都没法去重   
            temp[this[i]] = 'a';//就给这个对象添加对应的属性
            arr.push(this[i]);//再将这个数组元素加入arr中
        }
    }
    return arr;
}





//获取滚动条位置
function getScrollOffset() {
    if(window.pageXOffset){
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }else{
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop +　document.documentElement.scrollTop,
        }
    }
}


//获取视口尺寸
function getViewportOffset(){
    if(window.innerWidth){//IE8以上
        return {
            w: window.innerWidth,
            ha: window.innerHeight,
        }
    }else{
        if(document.compatMode == 'BackCompat'){//怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight,
            }
        }else{
            return {//标准模式
                w:document.documentElement.clientWidth,
                h:document.documentElement.clientHeight,
            }
        }
    }
}


//获取元素属性
function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

//兼容性事件绑定,this指向事件本身
function addEvent(elem,type,handle){
    //本来是这么写,但简化后,就...
    // if(typeof obj.addEventListener!=='undefined')
    if(elem.addEventListener){//W3C标准
        elem.addEventListener(type,handle,false);
    }else if(elem.attachEvent){//IE
        elem.attachEvent('on'+type,function(){
            handle.call(elem);//对象冒充
        });
    }else{
        elem['on'+type] = handle;
    }
}

//删除事件
function removeEvent(elem,type,fn){
        if(typeof elem.removeEventListener!=='undefined'){
            elem.removeEventListener(type,fn,false);
        }else if(typeof elem.detachEvent!=='undefined'){
            elem.detachEvent('on'+type);
        }else{
            elem['on'+type] = false;
        }
}


//封装取消冒泡的函数
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

//封装阻止默认事件的函数
function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

//封装接收事件触发之后的事件源对象
function reveiveTrrigerEventObject (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    //这个target就会指向事件源对象,比如div...
    //console.log(target.innerText);//解决了动态改变ul的问题,利用了事件冒泡机制,叫事件委托
}


//鼠标拖拽挪动方块,兼容性写法,好像有问题,不行？！
function drag(elem){
        var disX,
            disY;

        addEvent(elem,'mousedown',function(e){
            var event = e || window.event;
            disX = event.clientX - parseInt(getStyle(elem,'left'));
            disY = event.clientY - parseInt(getStyle(elem,'top'));
            addEvent(document,'mousemove',mouseMove);
            addEvent(document,'mouseup',mouseUp);
            stopBubble(event);
            cancelHandler(event);
        });
//不要在elem上挪动,要在document上挪动,这样才能保证监听到这个事件

        function mouseMove(e){
            var event = e || window.event;
            elem.style.left = event.clientX - disX + 'px';
            elem.style.top = event.clientY - disY + 'px';
        }
        function mouseUp(e){
            var event = e || window.event;
            removeEvent(document,'mousemove',mouseMove);
            removeEvent(document,'mouseup',mouseUp);
        }
}  

//封装:异步加载标签
//记得传函数引用或者是字符串(原理:['']代替引用);
function loadScript (url,callback) {//解决把外部文件下载过来,记得callback是传函数引用!!!
    var script = document.createElement('script');//创建
    script.type = 'text/javascript';//设置
    

    //script.readyState//状态码,初始值为loading,会动态改变.complete/loaded:代表已经加载完毕
    if(script.readyState){//Chrome也有
        script.onreadystatechange = function(){//IE里也有,当监听到readyState改变了才会触发
            //初始值是interactive,当改变时就执行函数
            if(script.readyState == 'complete' || script.readyState == 'loaded' ){
                callback();
            }
        }
    }else{
        script.onload = function(){//Safari Chrome Firefox opera都兼容;IE只有script没有onload
            callback();//onload 事件会在页面或图像加载完成后立即发生。
        }
    }

    //src放在后面防止放在前面的话,若硬件设施啥的太NB了,加载太快导致无法触发onreadystatechange
    script.src = url;

    document.head.appendChild(script);
}


//正则表达式:
//判断密码强度
        //密码长度必须是6-12位
        //密码中须出现大小写字母、数字、特殊字符(!@#_,.)  -->  强
        //密码中须出现大小写字母、数字      --> 中
        //密码中须出现大小写字母      --> 弱
        //其他                  --> 不满足要求
        
        function judgePwd(pwd){
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#_,.]).{6,12}$/.test(pwd)){
                return "强";
            }else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/.test(pwd)){
                return "中"
            }else if(/^(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(pwd)){
                return "弱"
            }else{
                return "不满足要求"
            }   
        }