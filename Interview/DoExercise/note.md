## css画三角形
利用宽高为0，border撑满盒子，若是等边三角形，则border-bottom的宽度为left跟right的根号三倍，不设置top（即为0），再让左右透明即可

## css正方形
```css
.div{
    height:0;
    width:50%;
    padding-bottom:100%;
}
```

## instanceOf实现原理
>instanceof主要用于判断某个实例是否属于某个类型，也可用于判断某个实例是否是其父类型或者祖先类型的实例。

- instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false。

```js
function myInstanceOf(left,right){
    const rightVal = right.prototype;
    const leftVal = left.__proto__;
    // 若找不到就到一直循环到父类型或祖类型
    while(true){
        if(leftVal===null){
            return false;
        }
        if(leftVal===rightVal){
            return true;
        }
        leftVal = leftVal.__proto__;// 获取祖类型的__proto__
    }
}

```

## JS数据类型
7种:  null,undefined,boolean,number,string,引用类型(object,array,function),symbol           Date...

## typeof

typeof(Symbol())  === "symbol"
typeof(Symbol)    === "function"
typeif void 0     === "undefined"

## Object.prototype.toString.call()

## constructor属性返回变量或对象的构造函数

1. `null 是js 原型链的起点，没有构造函数`

2. `undefined 没有构造函数`

3. [].constructor  === Array  

> 写的时候肯定不能带[],这意思这是告诉你里面写这些类型的数据,然后调用constructor属性,就能得到它们的构造函数

4. [string].constructor === String

5. [object].constructor === object

6. [number].constructor === Number

7. [symbol].constructor === Symbol

8. [function].constructor === Function

9. [new Date].constructor === Date

10. [RegExp].constructor === RegExp


## cdn

具体来说，CDN就是采用更多的缓存服务器（CDN边缘节点），布放在用户访问相对集中的地区或网络中。当用户访问网站时，利用全局负载技术，将用户的访问指向距离最近的缓存服务器上，由缓存服务器响应用户请求。（有点像电商的本地仓吧？）

大家可能觉得，这个不就是“镜像服务器”嘛？其实不一样。镜像服务器是源内容服务器的完整复制。而CDN，是部分内容的缓存，智能程度更高。

确切地说，CDN=更智能的镜像+缓存+流量导流。

具体步骤：

- ①、当用户点击APP上的内容，APP会根据URL地址去本地DNS（域名解析系统）寻求IP地址解析。
- ②、本地DNS系统会将域名的解析权交给CDN专用DNS服务器。
- ③、CDN专用DNS服务器，将CDN的全局负载均衡设备IP地址返回用户。
- ④、用户向CDN的负载均衡设备发起内容URL访问请求。
- ⑤、CDN负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的缓存服务器。
- ⑥、负载均衡设备告诉用户这台缓存服务器的IP地址，让用户向所选择的缓存服务器发起请求。
- ⑦、用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。
- ⑧、如果这台缓存服务器上并没有用户想要的内容，那么这台缓存服务器就要网站的源服务器请求内容。
- ⑨、源服务器返回内容给缓存服务器，缓存服务器发给用户，并根据用户自定义的缓存策略，判断要不要把内容缓存到缓存服务器上。

## 同源策略

同源策略是什么
同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。所以xyz.com下的js脚本采用ajax读取abc.com里面的文件数据是会被拒绝的。

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

不受同源策略限制的
1. 页面中的链接，重定向以及表单提交是不会受到同源策略限制的。
2. 跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的<script src="..."></script>，<img>，<link>，<iframe>等。

## JSONP
`JSONP的原型：创建一个回调函数，然后在远程服务上调用这个函数并且将JSON 数据形式作为参数传递，完成回调。`

将JSON数据填充进回调函数，这就是JSONP的JSON+Padding的含义。

## DNS

>DNS 是域名系统 (Domain Name System) 的缩bai写，是因特网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。这也是DNS的官方说法。

DNS的作用：在互联网中，其实没有类似于www.xxx.com这种域名方式，而替代的是以IP地址，如222.222.222.222，那我们在IE地址栏中应当输入222.222.222.222才能打开网站www.xxx.com。

但我们细想一下，互联网上的网站成千上万，如果每个网站登陆都需要记住一大串数字，那是不是特别不方便，对于记忆力不强的人，根本无法记住这么烦琐的数字。这个时候DNS就出现了，它的作用就是将222.222.222.222解析为www.xxx.com，那么我们登陆的时候就直接输入域名就可以了。



扩展资料：

每个IP地址都可以有一个主机名，主机名由一个或多个字符串组成，字符串之间用小数点隔开。有了主机名，就不要死记硬背每台IP设备的IP地址，只要记住相对直观有意义的主机名就行了。这就是DNS协议的功能。
主机名到IP地址的映射有两种方式：

- 1）静态映射，每台设备上都配置主机到IP地址的映射，各设备独立维护自己的映射表，而且只供本设备使用；
- 2）动态映射，建立一套域名解析系统（DNS），只在专门的DNS服务器上配置主机到IP地址的映射，网络上需要使用主机名通信的设备，首先需要到DNS服务器查询主机所对应的IP地址。通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。在解析域名时，可以首先采用静态域名解析的方法，如果静态域名解析不成功，再采用动态域名解析的方法。可以将一些常用的域名放入静态域名解析表中，这样可以大大提高域名解析效率。

## h5&&c3新增

h5是html的最新版本，是14年由w3c完成标准制定。增强了，浏览器的原生功能，减少浏览器插件bai（eg：flash）的应用，提高用户体验满意度，让开发更加方便。
- h5新增的标签

新增元素

说明

video    表示一段视频并提供播放的用户界面    

audio    表示音频    
canvas    表示位图区域    
source    为video和audio提供数据源    
track    为video和audio指定字母    
svg    定义矢量图    

code    代码段    
figure    和文档有关的图例    

figcaption    图例的说明    

main    
time    日期和时间值    
mark    高亮的引用文字    
datalist    提供给其他控件的预定义选项    

keygen    秘钥对生成器控件    

output    计算值    
progress    进度条    
menu    菜单    

embed    嵌入的外部资源    

menuitem    用户可点击的菜单项    

menu    菜单    

template    

section    

nav    

aside    

article    

footer    

header    

- css3
css3被划分为模块，最重要的几个模块包括：选择器、框模型、背景和边框、文本效果、2D/3D 转换、动画、多列布局、用户界面
选择器

框模型

背景和边框
border-radius、box-shadow、border-image、
background-size：规定背景图片的尺寸
background-origin：规定背景图片的定位区域
background-clip：规定背景的绘制区域

文本效果（常用）
text-shadow：设置文字阴影
word-wrap：强制换行
word-break
css3提出@font-face规则，规则中定义了font-family、font-weight、font-style、font-stretch、src、unicode-range
2/3D转换
transform：向元素应用2/3D转换
transition：过渡
动画

@keyframes规则：
animation、animation-name、animation-duration等
用户界面（常用）
box-sizing、resize
css3新增伪类
```css
：nth-child()
：nth-last-child()
：only-child
：last-child
：nth-of-type()
：only-of-type()
：empty
：target  这个伪类允许我们选择基于URL的元素，如果这个元素有一个识别器（比如跟着一个#），那么:target会对使用这个ID识别器的元素增加样式。
：enabled  
：disabled
：checked
：not
```

## 数字三位逗号一分割
```js
//1. 递归
function formatNumber(str){
    let len = str.length - 3;
    if(len <= 0){
        return str;
    }
    return formatNumber(str.substr(0,len)) + "," + str.substr(len);
}
let money = formatNumber("1234567890");
console.log(money);
//2. RegExp.
// 数字格式化 1,123,000
"1234.567890".replace(/\B(?=(?:\d{3})+(?!\d))/g,",") // 结果：1,234,567,890，匹配的是后面是3*n个数字(而它的后面不是数字)的非单词边界(\B)
//"1,234.567,890",这个比较牛逼
"4451 2378.3500".replace(/\B(?=(?:\d{3})+(?!\d))/g,",");//
```

## 函数柯里化
```js
/**
 * 科里化函数,还是这个比较正宗
 * 在函数式编程中，科里化最重要的作用是把多参函数变为单参函数
 */
this.myPlugin.curry = function (func) {
    //得到从下标1开始的参数
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function () {
        var curArgs = Array.from(arguments); //当前调用的参数
        var totalArgs = args.concat(curArgs);
        if (totalArgs.length >= func.length) {
            //参数数量够了
            return func.apply(null, totalArgs);
        }
        else {
            //参数数量仍然不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}
```


```js
function cal(a,b,c,d){
    return a+b*c-d;
}

function curry(func,...args){
    return function(...subArgs){//每次都是返回新的函数!!
        const allArgs = [...args,...subArgs];
        if(allArgs.length>=func.length){
            func(...allArgs);
        }else{
            // allArgs.unshift(func);//把func加到开头
            return curry(func,...allArgs);
        }
    }
}

const newCal = curry(cal, 1, 2);

console.log(newCal(3, 4)); // 1+2*3-4=3
console.log(newCal(4, 5)); // 1+2*4-5=4
console.log(newCal(5, 6)); // 1+2*5-6=5
console.log(newCal(6, 7)); // 1+2*6-7=6

const newCal2 = newCal(8);

console.log(newCal2(9)); // 1+2*8-9=8
```

## new.target===undefined
则不是用new创建的

## 箭头函数

1. this为父级作用域的this
2. 本身无this、arguments、new.target
3. 没有原型，所以不能作为构造函数使用
4. 一般用于：事件处理函数、异步处理函数、其他临时性函数、为了绑定父级this、为了代码简洁
5. 对象的属性绝对不要使用箭头函数，因为小心this指向了window，拿不到该拿的东西

## 类

静态成员: 在内存中唯一的成员, 不论创建多少个对象都只有一个同名的成员存在

实例(对象)成员: 跟随对象的成员

1. 类声明不会被提升，存在暂时性死区
2. `类中的所有代码均在严格模式(对象中函数中的this指向调用该函数的对象实例)下进行`
3. 类的所有方法都是不可枚举的，会自动把所有方法放到原型上
4. 类的所有方法都不能当做构造函数使用，就是不让你new
5. 类的构造器必须使用new来调用

## 字段初始化器(ES7)

`有直接赋值的字段,可以直接写在constructor外面,它会自动放在构造函数里: this.xxx = xxxxx;`

注意: 

1). 使用static的字段初始化器，添加的是静态成员
2). **没有使用static的字段初始化器，添加的成员位于对象上**
3). **箭头函数在字段初始化器位置上,指向当前对象. 但是此时箭头函数不在原型上了,而是在每个实例对象上**
所以它(箭头函数时)浪费了内存空间占用,但绑定了this指向实例


## 如果函数没有return,就会默认return undefined;

## 传统的构造函数的问题

1. 属性和原型方法定义分离，降低了可读性
2. 原型成员上的东西可以被枚举,但其实我们是不希望这种情况发生的
3. 默认情况下，构造函数仍然可以被当作普通函数使用

## new关键字的执行过程

a. 开辟空间创建新的对象(会向内存申请一个空间存放对象)
b. 将构造函数内部的this指向该对象(`实际是指向内存中存放该匿名对象的空间`)
c. 执行构造函数内部的代码(`通过this关键字向对象中添加属性和方法`)
d. 返回新创建的对象(`就是这个this`)


## 构造函数内部原理

- 三步隐式变化

`1. 在函数体最前面隐式的加上var this={}`

暂时这么理解,并非最终形式: var this = {}; 所以AO{this:{name:'wjw',}}

2. 执行this.xxx = xxxxx;`并将这个匿名对象也就是这个this的__proto__指向构造函数自身原型对象上`
3. 在函数体最后面隐式的返回this
4. 但是若有显式的return {};则隐式的return this会失效
`注意这里返回的一定是 对象值 才会使返回隐式的this对象失效.`
比如:return 123;因为123属于原始值,有new了就不会返回原始值。而是仍然返回隐式的this

## Symbol.for原理实现
```js
const SymbolFor = (() => {
    const global = {};
    return function(name){
        console.log(global);
        if(!global[name]){
            global[name] = Symbol(name);
        }
        console.log(global);
        return global[name];
    }
})();
const syb1 = SymbolFor("abc");
const syb2 = SymbolFor("abc");
console.log(syb1 === syb2);
```


## ES6之前的模块引入方式和区别：
ES6之前模块引入主要是CommonJS(服务器)和AMD(浏览器)

- 没写完，待整理

## 圣杯模式--yaho
```js
var inherit = (function(){
    var F = function(){};
    return function(Target,Origin){
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());
```

## Object.create(null)

更干净,没有原型链上的属性。而`{}`的__proto__里面一堆原型链上的属性
```js
var o = Object.create(null,{
    a:{
           writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o);//很干净,
```
所以这个o.toString()会报Uncaught TypeError

- Object.create(Object.prototype) 和 {} 创建的对象在 打印台 上就一模一样了.

```js
//Demo1:
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

//Demo2:
var a=Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}

```


### 总结：
1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
2. 想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

用Object.create(null)吧！其他时候，请用{}。

## 数组push内部原理
```js
Array.prototype.push = function(target){
    this[this.length] = target;
    this.length++;
}
```
所以length的初始值非常重要!!

## transform会引起重排吗

`不会，因为 GPU 进程会为其开启一个新的复合图层，不会影响默认复合图层（就是普通文档流），所以并不会影响周边的 DOM 结构，而属性的改变也会交给 GPU 处理，不会进行重排。`

> 使 GPU 进程开启一个新的复合图层的方式还有 3D 动画，过渡动画，以及 opacity 属性，还有一些标签，这些都可以创建新的复合图层。这些方式叫做硬件加速方式。你可以想象成新的复合图层和默认复合图层是两幅画，相互独立，不会彼此影响。降低重排的方式：要么减少次数，要么降低影响范围，创建新的复合图层就是第二种优化方式。`绝对布局虽然脱离了文档流，但不会创建新的复合图层，因此当绝对布局改变时，不会影响普通文档流的 render tree，但是依然会绘制整个默认复合图层`，对普通文档流是有影响的。普通文档流就是默认复合图层，不要介意我交换使用它们如果你要使用硬件加速方式降低重排的影响，请不要过度使用，创建新的复合图层是有额外消耗的，比如更多的内存消耗，并且在使用硬件加速方式时，配合 z-index 一起使用，尽可能使新的复合图层的元素层级等级最高。

## 实现function(func, times, wait ){}，传入func每隔wait时间，执行一次，执行times次
```js
function repeat(func, times, wait){
    return function(content){
        let count = 0;
        let timer = setInterval(function(){
            count++;
            func(content);
            if(count == times){
                clearInterval(timer);
            }
        },wait);
    }
}
const repeatFunc = repeat(alert, 4, 3000);
repeatFunc("Hello World!");
```

## 不能使用全局变量实现调用a()三次得到1，2，1......重复，使用了闭包存一个boolean值
```js
const a = (function(){
    var flag = 1;
    return function(){
        flag = flag == 3 ? 1 : flag;
        console.log(flag++);
    }
}());
a();
a();
a();
a();
a();
a();
```

## html页面如何真正彻底的禁止缓存呢？
在开发中经常有需求需要禁止HTML的缓存，如网上所说在head标签里加入如下代码：
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">

<meta http-equiv="Cache-Control" content="no-cache"/>这个标签什么意思
　　Meta中的Cache-Control属性用来清除缓存（再访问这个网站要重新下载！）。Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。
　　请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、only-if- cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must- revalidate、proxy-revalidate、max-age。
Meta中的Cache-Control属性各个指令含义如下
Public：指示响应可被任何缓存区缓存
Private：指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效
no-cache：指示请求或响应消息不能缓存
no-store：用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
max-age：指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应
min-fresh：指示客户机可以接收响应时间小于当前时间加上指定时间的响应
max-stale：指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。
no-siteapp：设置这个之后通过手机百度搜索打开网页时,百度会为你的网页进行转码

## HTTP的请求头设置Cache-Control


## 将HTML的所有标签替换成<&b>
```js
let newDom = document.getElementsByTagName("html")[0].outerHTML.replace(/<[a-zA-Z]+[1-6]*[^>]*>|<\/[a-zA-Z]+[1-6]*[^>]*>/g,"<&b>");
```

## 百分比时：top是根据包含块的高度，left是根据包含块宽度，而margin和padding是根据包含块的宽度决定的（它俩不论横纵都是根据宽度！！）
**绝对/固定定位之后包含块就是最近非static祖先元素的填充盒**

**设置为relative定位之后，是更具元素本身起点（左上角）进行移动，top、left等属性单位为%时，其值是基于父容器的高、宽值，也是包含块**

## 管道函数(只能是单参!!  <-->  可以利用柯里化将多参化为单参)
```js
const pipe = function(){
    let args = Array.from(arguments);
    // return function(val){//利用reduce
    //     return args.reduce(function(result,func){
    //         return func(result);//每次都把上一次返回的结果作为下一次的result传进来,然后继续调用func函数
    //     },val);//val是初始默认值
    // }
    // 或者这么写
    return function(val){
        for(let i = 0;i<args.length;i++){
            let func = args[i];
            val = func(val);
        }
        return val;
    }
}
```

## 函数防抖
- 应用场景: 文本框输入事件，窗口尺寸发生变化(window.onresize事件)的时候

- 实际就是保证触发某件事而之后,如果你频繁触发,那我就等你没再触发了,再开计时器,时间到了,我就运行回调函数,如果时间没到你又触发,那我就清空计时器,之前的计时就不作数啦!
```js
//利用闭包
const debounce = function(callback,time){//debounce的目的在于开启唯一一个计时器,返回一个函数
    let timer;//私有化变量,让这个timer始终都只有一个
    return function(){
        if(timer){
            clearTimeout(timer);//清除之前的计时,重新计时
        }
        let args = Array.prototype.slice.call(arguments,0);//真的想用this的话,可以在handle的最后一个参数传递想要的this,然后这里拿到数组最后一个参数即可
        timer = setTimeout(function(){
            callback.apply(null,args);
        },time);
    }
}

let handle = debounce(function(width){
    console.log(width);
},1000);
window.onresize = function(){
    handle(document.documentElement.clientWidth);//这里说不准有多少个参数
}
```

## 函数节流

- 保证一个时间段内只执行一次,只要时间没到,不管你调用多少次,我就啥都不做,也就是`固定时间频率运行`.时间到了执行完回调后再清空计时器
- 节流的应用场景对应用户输入的实时查询,这样的话用户隔一段时间就会看到实时关键词搜索的结果或提示
```js
//第三种,混合前两种方法,做个综合
const throttle = function(callback,time,immediately){
    if(immediately === undefined){//默认用时间戳
        immediately = true;
    }
    if(immediately){
        var t;
        return function(){
            let args = Array.prototype.slice.call(arguments,0);
            if(!t || (Date.now() - t >= time)){//之前没有计时或固定时间频率到了
                callback.apply(null,args);
                t = Date.now();
            }
        }
    }else{
        var timer;
        return function(){
            if(timer){
                return;
            }
            let args = Array.prototype.slice.call(arguments,0);//真的想用this的话,可以在handle的最后一个参数传递想要的this,然后这里拿到数组最后一个参数即可
            timer = setTimeout(function(){
                callback.apply(null,args);
                timer = null;//执行完后再清空
            },time);
        }
    }
}

// //第二种,时间戳,第一次马上执行,之后按固定频率执行
// const throttle = function(callback,time){
//     var t;
//     return function(){
//         let args = Array.prototype.slice.call(arguments,0);
//         if(!t || (Date.now() - t >= time)){//之前没有计时或固定时间频率到了
//             callback.apply(null,args);
//             t = Date.now();
//         }
//     }
// }



// //第一种,类似防抖,但不清空计时器,有计时器那就直接返回,啥也不干
// const throttle = function(callback,time){
//     let timer;
//     return function(){
//         if(timer){
//             return;
//         }
//         let args = Array.prototype.slice.call(arguments,0);//真的想用this的话,可以在handle的最后一个参数传递想要的this,然后这里拿到数组最后一个参数即可
//         timer = setTimeout(function(){
//             callback.apply(null,args);
//             timer = null;//执行完后再清空
//         },time);
//     }
// }
```

## 填充字符串(ES8)
```js
let str='apple'; 
let pasStr='xxx';
//不改变原字符串,返回新的字符串
str.padStart(str.length+pasStr.length,pasStr);   // "xxxapple"
str.padEnd(str.length+pasStr.length,pasStr);   // "xxxapple"
```

## 深度克隆(仅区分array/object和原始值)
```js
const myClone = function(obj, isDeep){
    if(Array.isArray(obj)){//数组
        if(isDeep){
            let newArr = [];
            for(let i = 0;i<obj.length;i++){
                newArr.push(myClone(obj[i], isDeep));
            }
            return newArr;
        }else{
            return obj.slice();
        }
    }else if(typeof obj === "object" && obj !== null){//对象
        let newObj = {};
        for(let prop in obj){
            if(isDeep){
                newObj[prop] = myClone(obj[prop], isDeep);
            }else{
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    }else{//函数等、原始类型
        return obj;
    }
}

```


## 闭包
闭包是指在 JavaScript 中，内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

或者说：内部函数被保存到外面环境中被使用就是闭包了

应用场景：`提供了许多与面向对象编程相关的好处 ---- 特别是数据隐藏和封装 ---- 有权访问私有变量和私有函数的公有方法`

## 打印出当前网页使用了多少种HTML元素
```js
const countEleType = () => {
    return [...new Set([...document.querySelectorAll("*")].map(el => el.tagName))].length;//取名字默认返回的都是大写,但我们这里不用管
}
```


## ie7body默认的margin上下margin15左右margin为10

## W3C规定垂直方向上的margin为auto时解析为0,水平方向时是自动吸收剩余空间(必须是块盒)

### 宽度为auto的绝对定位元素,通过left与right可以调整它的宽度
### 高度为auto的绝对定位元素,通过top与bottom可以调整它的高度

## "aaabbbcccdddeefggaa",转换成连续不重复的字符串例如:abcdefga
```js
let str = "aaabbbcccdddeefggaa";
let reg = /(\w)\1*/g;//\1是反向引用,表示匹配第一个分组匹配到的内容
str.replace(reg,"$1");
```

## 弱类型语言

弱类型语言是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过显性强制转换。弱类型语言包括vb 、PHP、javascript等语言。

- 强类型语言和弱类型语言区别
    - 无论是强类型语言还是弱类型语言，`判别的根本是是否会隐性的进行语言类型转变`。强类型语言在速度上略逊于弱类型语言，但是强类型定义语言带来的严谨性又能避免不必要的错误。

## Promise的fulfilled和resolved
- fulfilled是Promise规范


## 排序只有1，2，3三个元素的数组，不能统计1，2，3的个数。

假设，我们有三个指针：p1、p2、p3.p1从左侧开始，指向第一个非1的数字；p3从右侧开始，指向第一个非3的数字。p2从p1开始遍历，如果是2，p2继续遍历，直到p2遇到1或者3：

如果遇到1，则和p1进行交换，然后p1向右，指向第一个非1的数字

如果遇到3，则和p3进行交换，然后p3向左，指向第一个非3的数字

`p2在p3右侧，算法结束`。

总结一下上面的算法：

1. p1从左侧开始，指向第一个非1的数字；p3从右侧开始，指向第一个非3的数字。

2. p2从p1开始遍历，如果是2，p2继续遍历，直到p2遇到1或者3

3. 如果遇到1，则和p1进行交换，然后p1向右，指向第一个非1的数字

4. 如果遇到3，则和p3进行交换，然后p3向左，指向第一个非3的数字

5. 重复上面的步骤，直到p2在p3的右侧结束。

```C
void sort(int arr[],int len)
{
    int i = 0;//头指针指向0
    int  j = len - 1;//尾指针指向2
    int k = 0;

    while (arr[i] == 0)
        i++;
    k = i + 1;

    while (arr[j] == 2)
        j--;

    while (k < j)
    {
        if (arr[k] == 1)
            k++;
        else if (arr[k] == 0)
        {
            swap(arr[i], arr[k]);
            while (arr[i] == 0)
                i++;

        }
        else if (arr[k] == 2)
        {
            swap(arr[k], arr[j]);
            while (arr[j] == 2)
                j--;
        }
     

    }

}
```


## 滚动条宽度默认是17px(不管是浏览器自带的,还是元素的滚动条都是17px)
- offsetWidth(边框盒)包含滚动条宽度,而clientWidth(填充盒)不包含滚动条宽度

- 元素自己设置的overflow:scroll;就会出现滚动条,这个滚动条的宽度在填充盒的宽度里


## 实现一个函数，给定一个非负数整数 num，反复将各个位上的数字相加，直到结果为一位数。
```js
function addDigits(num){
	if(!num){
		return null;
	}
	const str = num.toString();
	let res = 0;
	for (let i = 0; i < str.length; i++) {
		res += +str.substring(i, i + 1);
	}
	if(res.toString().length === 1){
		return res;
	}else{
		return addDigits(res);
	}
	
}
console.log( addDigits(546) );	// 6		因为 5 + 4 + 6 = 15 => 1 + 5 = 6
```

## 描述一下script标签的async和defer的区别
defer会等到页面全部加载完成之后在进行脚本执行

async下载完毕会立即执行

此处可以说一下时间线的问题

## 写出下面程序的打印顺序，并简要说明原因
```js
    setTimeout(function () {
        console.log("set1");
        new Promise(function(resolve) {
            resolve();
        }).then(function () {
            new Promise(function (resolve) {
                resolve();
            }).then(function () {
                console.log("then4");
            })
            console.log('then2');
        })
    });
    new Promise(function (resolve) {
        console.log('pr1');
        resolve();
    }).then(function () {
        console.log('then1');
    });

    setTimeout(function() {
        console.log("set2");
    });
    console.log(2);

    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        console.log('then3');
    })
```
答案：pr1 2 then1 then3 set1 then2 then4 set2 解析： promise 对象里面的函数会立即执行，而定时器的function会插入到任务队列的最后执行

## 链表的逆置

- 记得写

## 链表删除某个节点


## 字符串压缩
给你个字符串，利用反复出的字符串的 例如 aaabbbdddddfff 转化为a3b3d4f3 假设只包含大小写字母
```js
function zipStr(str) {
    var reg = /(\w)(\1*)/g
    console.log(str.replace(reg, function ($, $1, $2) {
        console.log($1, $2);
        return $1 + ($2.length + 1);
    }))
}
``` 

## 如何清除Node模块的缓存
1. 手动删除
2. `所有缓存的模块保存在require.cach中`，所以可以在被加载的模块中添加一行代码
```js
delete require.cache[module.filename]
```

## 关于em的小细节

浏览器默认font-size是16px,当font-size设置1em时,默认仍是inherit,也就是继承父元素的字体大小。`但当设置其他css属性的时候，1em就等于当前元素的字体大小`
```css
html {
    /* 2*16px=32px */
    font-size: 2em;
}
div {
    /* 2*32px=64px */
    font-size: 2em;
    /* 2*64px=128px */
    padding-bottom: 2em;
    background-color: aquamarine;
}
```

## 给出一个二叉树,用一个函数确定是否有一条从根节点到叶子节点的路径，这个路径上所有节点的值加在一起等于给定的sum的值。(思路：DFS + 求差 + 递归) leetcode112
```js
var hasPathSum = function(root, sum) {
  // 根节点为空
  if (root === null) return false;
  
  // 叶节点 同时 sum 参数等于叶节点值
  if (root.left === null && root.right === null) return root.val === sum;
  // 总和减去当前值，并递归
  sum = sum - root.val
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
};
```

## 通过上面我们对CommonJS规范和ES6规范的比较，我们总结一下两者的区别：

CommonJS模块是运行时加载，ES6模块是编译时输出接口
CommonJS模块输出的是一个值的复制，ES6模块输出的是值的引用
CommonJS加载的是整个模块，即将所有的方法全部加载进来，ES6可以单独加载其中的某个方法
CommonJS中this指向当前模块module.exports，ES6中this指向undefined
CommonJS默认非严格模式，ES6的模块自动采用严格模式


## e.target和e.currentTarget
- target: 触发事件的对象，谁触发谁命中。
- currentTarget: 绑定事件的对象，恒等于this，等于addEventListener前面的元素

## async和defer
https://www.jianshu.com/p/97409670450a/

https://www.cnblogs.com/jiasm/p/7683930.html

### 普通script
**`文档解析的过程中，如果遇到script脚本，就会停止页面的解析进行下载`（但是Chrome会做一个优化，如果遇到script脚本，会快速的查看后边有没有需要下载其他资源的，如果有的话，会先下载那些资源，然后再进行下载script所对应的资源，这样能够节省一部分下载的时间。**
资源的下载是在解析过程中进行的，虽说script1脚本会很快的加载完毕，但是他前边的script2并没有加载&执行，所以他只能处于一个挂起的状态，等待script2执行完毕后再执行。
当这两个脚本都执行完毕后，才会继续解析页面。

### defer
文档解析时，遇到设置了defer的脚本，就会在后台进行下载，但是并不会阻止文档的渲染，`当页面解析完毕后，会等到所有的defer脚本加载完毕并按照顺序执行，执行完毕后会触发DOMContentLoaded事件`。

### async
`async脚本会在加载完毕后立即执行，async脚本的加载不计入DOMContentLoaded事件统计`

也就是说下图两种情况都是有可能发生的

### 推荐的应用场景
defer
如果你的脚本代码依赖于页面中的DOM元素（文档解析完毕），或者被其他脚本文件依赖。
例：评论框、代码语法高亮、polyfill.js
async
如果你的脚本并不关心页面中的DOM元素（文档是否解析完毕），并且也不会产生其他脚本需要的数据。
例：百度统计

如果不太能确定的话，用defer总是会比async稳定。。。

## 不支持事件冒泡的事件
- UI事件
load,unload,scroll,resize
- 焦点事件
focus,blur
- 鼠标事件
mouseleave,mouseenter

原因是在于：**这些事件仅发生于自身上**，而它的任何父节点上的事件都不会产生，所以不会冒泡。

## JS中substr与substring的区别

js中substr和substring都是截取字符串中子串，非常相近，可以有一个或两个参数。

语法：substr(start [，length]) 第一个字符的索引是0，start必选 length可选

　　　substring(start [, end]) 第一个字符的索引是0，start必选 end可选

### 相同点：当有一个参数时，两者的功能是一样的，返回从start指定的位置直到字符串结束的子串

var str = "hello Tony";

str.substr(6);  //Tony

str.substring(6); //Tony

 
### 不同点：有两个参数时

（1）substr(start,length) 返回从start位置开始length长度的子串

“goodboy”.substr(1,6);   //oodboy

【注】当length为0或者负数，返回空字符串

（2）substring(start,end) 返回从start位置开始到end位置的子串（不包含end）

“goodboy”.substring(1,6);  //oodbo

【注】:

（1）substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点

（2）start 或 end 为 NaN 或者负数，那么将其替换为0


## 圣杯布局的最小尺寸问题

> 圣杯布局是基于左侧栏（#left）负外边距 margin-left: -100%;设置来实现的，**但是左侧栏上移有个前提条件，就是margin-left的负值(而-100%就是包含块的宽度，也就是center的宽度)与左侧栏（#自身的内容宽度相加后的值不大于上一行剩余空间，才可以实现左侧栏（#left）上移。这里中间栏(#center)完全占据上一行剩余空间，故剩余空间宽度为0，所以`margin-left的负值与左侧栏自身的内容宽度相加后的值不大于0才可以上移`，否则左侧栏（#left）仍然停留在第二行**，就无法实现圣杯布局目的。`所以中间栏（#center）的宽度需要不小于左侧栏（#left）宽度，才能满足圣杯布局的实现`。

圣杯布局的最小尺寸计算：若左侧栏（#left）宽度为X，右侧栏宽度为Y，那么容器（#container）`最小尺寸计算：2X+Y`。

在上述实例中，圣杯布局最小尺寸为2x200+150=550px。所以容器（#container）需要设置最小尺寸min-width:550px;,同时这里550px是容器边框盒的尺寸，为了避免采用默认内容盒尺寸进行转换计算，就采用设置：box-sizing:border-box;。


## ==和===区别

==， 两边值类型不同的时候，要先进行类型转换，再比较
===，不做类型转换，类型不同的一定不等。

### == 类型转换过程：

1. **如果类型不同，进行类型转换**
2. 判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
3. 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
4. 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
5. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

### 经典面试题：[] == ![] 为什么是true
转化步骤：

- !运算符优先级最高，![]会被转为为false，因此表达式变成了：[] == false
- 根据上面第(4)条规则，如果有一方是boolean，就把boolean转为number，因此表达式变成了：[] == 0
- 根据上面第(5)条规则，把数组转为原始类型，调用数组的toString()方法，[]转为空字符串，因此表达式变成了：'' == 0
- 根据上面第(3)条规则，两边数据类型为string和number，把空字符串转为0，因此表达式变成了：0 == 0
- 两边数据类型相同，0 == 0 为 true


## new的实现原理及模拟代码
使用New命令时，它后面的函数会依次执行下面的步骤:

1. 创建一个空对象，作为要返回的对象实例；
2. 将这个空对象的隐式原型指向构造函数的prototype属性；
3. 将这个空对象赋值给构造函数内部的this关键字；
4. 开始执行构造函数内部的代码；
5. 返回原始值需要忽略，返回对象需要正常处理。

也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象.

```js
function _New(constructor, ...params) {
  // 将 arguments 对象转为数组
  let args = [].slice.call(params);
  // 创建一个空对象,指向构造函数的原型
  // 就是把context的__proto__指向构造函数的原型
  // 这里就执行了New的第一步和第二步,因为他可以
  //let context = Object.create(constructor.prototype);
  let context = {};
  context.__proto__ = constructor.prototype;
  //Object.setPrototypeOf(context, constructor.prototype);//这跟上句一样
  // 执行构造函数，并将该构造函数内部的this指向空对象
  let result = constructor.apply(context, args);

  // 返回值处理
  return (typeof result === 'object' && result !== null) ? result : context
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

let fn1 = _New(Person, '张三', 10)
console.log(fn1)

```

构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望`以这个现有的对象作为模板，生成新的实例对象`(就是虽然没有拿到你的构造函数,但是我可以用你的实例作为模板,再造一个新的实例对象)，这时就可以使用Object.create()方法。
```js
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

person2.name; // 张三
person2.greeting() // Hi! I'm 张三.
```

## 关于文档对象

https://www.cnblogs.com/linxd/p/4519453.html

```js
console.log(Object.getPrototypeOf(document));//HTMLDocument
console.log(Object.getPrototypeOf(Object.getPrototypeOf(document)));//Document
console.log(Object.getOwnPropertyDescriptor(window, "document"));//configurable属性值为false， set函数没有定义，所以我们根本就不可能改变window.document.
```

**Node才是一切的起始**
```Document.__proto__ === Node```
**```document.__proto__ === HTMLDocument.prototype```**: 即document其实是HTMLDocument.prototype的构造函数(constructor)的一个实例
```HTMLDocument.__proto__ === Document```
```HTMLDocument.prototype.__proto__ === Document.prototype```
```HTMLElement.__proto__ === Element```
```document === window.document```

## 提前获取图片宽高
- 原理：浏览器可以在img.onload事件触发之前,就获取到图片的宽高了
    - **因为浏览器肯定是先获取到图片的头部数据，而头部中就有该图片的宽高信息，所以不用等图片加载完毕**
不断的setInterval监测就行了

## Function
`Function是JS引擎启动的时候直接放到内存当中的,其他的所有对象都是通过new 函数来创建的`

## console.log与dir
```js
console.log(Function.prototype);
// ƒ () { [native code] }
console.dir(Function.prototype);
// ƒ anonymous()
// apply: ƒ apply()
// arguments: (...)
// bind: ƒ bind()
// call: ƒ call()
// caller: (...)
// constructor: ƒ Function()
// length: 0
// name: ""
// toString: ƒ toString()
// Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
// get arguments: ƒ ()
// set arguments: ƒ ()
// get caller: ƒ ()
// set caller: ƒ ()
// __proto__: Object
// [[FunctionLocation]]: <unknown>
// [[Scopes]]: Scopes[0]
```
明显看到dir更nb一些,只是说单单论这方面啊,log本身有很多别的特点


## ES5和ES6实现继承的区别
**ES5的继承：实质是先创造子类的实例对象this，然后再将父类的属性/方法添加到this上面(Parent.apply(this));**

**ES6的继承：实质是先创造父类的实例对象this(所以必须先在constructor内调用super()方法,否则使用this会报错),然后再用子类的构造函数修改this**

类的prototype属性和__proto__属性:

大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。`Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链`。即：

1. 子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。
2. 子类 prototype 属性的 __proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性。

`另：ES6 可以继承原生数据结构（比如Array、String等）的构造函数，这是 ES5 无法做到的。`


## 手写reduce

MDN文档（reduce）：
以下是自我理解：
- reduce方法接受两个参数

    1. 回调函数callback参数有四个

        - total 累加值，每次执行回调执行返回的值。
        - item 当前需要处理值
        - index 当前值索引 （可选）
        - arr  当前数组 （可选）


    2. initialValue 默认值 （可选）

    -   如果传递initialValue第一次从索引0开始 首次返回默认值，如果没有提供初始值，则将使用数组中的第一个元素
    -   在没有默认值的空数组调用reduce会报错

```js
Array.prototype.myReduce = function (callback) {
    const initVal = arguments[1] ? arguments[1] : "";//获取默认值
    const len = this.length;//数组的长度
    if (!len && !initVal) {//没有默认值并且空数组就会报错
        throw new Error("'Rudece of empty array with no initial value'")
    }
    if (!len) {
        return initVal;//空数组不执行回调函数
    }
    let total = initVal ? initVal : this[0];//是否有默认值,没有就取第一项
    let i = initVal ? 0 : 1;
    while (i < len) {
        total = callback(total, this[i], i, this);//更新每次累加的值
        i++;
    }
    return total;
}
```

## 如何禁用缓存

在coding的过程中，页面请求经常会因为缓存问题造成一些问题，下面记录几种避开缓存的问题。
- 1. **在请求的url后面拼接随机数或者是时间戳**
- 2. 对于ajax请求，**将get请求改为post请求，post请求不经过缓存**

## 说说HTTP/3.0

尽管HTTP/2解决了很多1.1的问题，但HTTP/2仍然存在一些缺陷，这些缺陷并不是来自于HTTP/2协议本身，而是来源于底层的TCP协议，我们知道TCP链接是可靠的连接，如果出现了丢包，那么整个连接都要等待重传，`HTTP/1.1可以同时使用6个TCP连接，一个阻塞另外五个还能工作，但HTTP/2只有一个TCP连接，阻塞的问题便被放大了`。

由于TCP协议已经被广泛使用，我们很难直接修改TCP协议，基于此，**HTTP/3选择了一个折衷的方法——UDP协议，`HTTP/2在UDP的基础上`实现多路复用、0-RTT、TLS加密、流量控制、丢包重传等功能**。

## HTTP/2与HTTP/3

https://blog.csdn.net/howgod/article/details/102597450?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control

## svg和canvas
`都是脱离文档流，而且他俩层级是最高的，他俩的谁更高？一样高，代码靠后胜出。`

## CSS响应式布局
不同的设备，比例都一样，正常显示

## 局部作用域和块级作用域
1.相同点
都是只可以在局部被访问。
2.不同点
a. 局部范围不同
局部作用域 : 仅限于 ‘函数体’ 内部声明的变量
块级作用域 : 一切大括号{} 内部使用let/const声明的变量
b. 优先级不同(执行上下文不同)
局部作用域优先级 > 块级作用域 (在函数体大括号内部，无论使用什么关键字声明var/let/const都是局部作用域)
c. 预解析规则不同
var : 显示变量提升。 （在声明前可以访问变量，获取的是undefined）
js编译器在预解析阶段,会把变量的声明提升到当前作用域最顶端，赋值语句还是在原地
let : 隐式变量提升。 （在声明前不可以访问变量，会报错）
变量的声明也会提前，但是不允许被访问
暂时性死区(隐式变量提升)。一旦在当前作用域使用let,则js编译器在预解析阶段会将该变量"绑定"这个作用域,不受任何外部影响 


## with的两大弊端
1. 泄露变量到全局作用域
2. 导致性能下降
这是为什么呢？

原因是 JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。

但如果引擎在代码中发现了 with，它只能简单地假设关于标识符位置的判断都是无效的，因为无法知道传递给 with 用来创建新词法作用域的对象的内容到底是什么。

## JSON.stringify()内部处理

JSON.stringify():将value(Object,Array,String,Number...)序列化为JSON字符串
JSON.parse():将JSON数据解析为js原生值
toJSON(), 作为JSON.stringify中第二个参数(函数过滤器)补充 ,理解内部顺序很重要。
假设把一个对象传入JSON.stringify() 序列化对象的顺序如下：
- (1) 如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，按默认顺序执行序列化
- (2) 如果提供了第二个参数，应用这个函数过滤器，传入的函数过滤器的值是第(1)步返回的值。
- (3) 对第(2)步 返回的每个值进行相应的序列化。
- (4) 如果提供了第三个参数，执行相应的格式化操作。
JSON.toJSONString():对象转JSON字符串。
 


1. JSON.stringify() 将值转换为相应的JSON格式：
2. `转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。`
3. 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
4. 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
5. **undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略(出现在非数组对象的属性值中时)**或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
6. `对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误`
7. 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
8. Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
9. NaN 和 Infinity 格式的数值及 null 都会被当做 null。
10. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。


## requestAnimationFrame

requestAnimationFrame是一个单回调，和setTimeout差不多区别是：setTimeout的时间是你指定的requestAnimationFrame你不用写时间，它的重绘时间间隔是根据不同浏览器的刷新频率自行脑补的- -所以有严重兼容问题，记得有封装好的处理兼容的函数。

`W3C 标准，requestAnimationFrame在浏览器每次刷新页面之前执行`(之前是何时？浏览器刷新频率才知道，不归你管)

## 重写valueOf达到判断改变
```js
var a = {
    num:0,
    valueOf:function(){
        return ++this.num;
    }
}
if(a==1&&a==2&&a==3){
    console.log('小样儿');
}
```

## Promise和async/await的区别
1. Promise是ES6，async/await是ES2017/ES8出现的
2. async/await相对于Promise来讲，写法更加简洁、优雅
3. reject状态：
    1）promise错误可以通过catch来捕捉，建议尾部捕获错误，
    2）async/await既可以用.then又可以用try-catch捕捉
4. 是一种语法糖,相当强大啊,但它并不能完全取代PromiseAPI,比如在setTimeout中return时,所以需要我们改造计时器函数
5. 调试
　async/await能够使得代码调试更简单。2个理由使得调试Promise变得非常痛苦:

　《1》不能在返回表达式的箭头函数中设置断点
　《2》如果你在.then代码块中设置断点，使用Step Over快捷键，调试器不会跳到下一个.then，因为它只会跳过异步代码。

　　　使用await/async时，你不再需要那么多箭头函数，这样你就可以像调试同步代码一样跳过await语句。

## UTF-8&GBK

为什么url需要encode

## 很多人不知道的是，重绘和回流其实和 Event loop 有关

https://www.jianshu.com/p/76bb929eae01

当 Event loop 执行完Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
然后判断是否有 resize 或者 scroll ，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms才会触发一次，并且自带节流功能。
判断是否触发了 media query
更新动画并且发送事件
判断是否有全屏操作事件
执行 requestAnimationFrame 回调
执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
更新界面
以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调

常见的引起重绘的属性
```
color
border-style
visibility
background
text-decoration
background-image
background-position
background-repeat
outline-color
outline
outline-style
border-radius
outline-width
box-shadow
background-size
```

常见引起回流属性和方法
`任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发重排`，下面列一些栗子

添加或者删除可见的DOM元素；
元素尺寸改变——边距、填充、边框、宽度和高度
内容变化，比如用户在input框中输入文字
浏览器窗口尺寸改变——resize事件发生时
计算 offsetWidth 和 offsetHeight 属性
设置 style 属性的值


## 高阶函数
满足以下两点任意一点即可：
1. 如果一个函数接收1个或多个函数作为参数
2. 函数内部 return 一个函数


## 如果v-for和v-if非要放在一起使用

应该没有bug，除了会报警告，反正我暂时不知道

## canvas和svg

Canvas 和 SVG 都允许您在浏览器中创建图形，但是它们在根本上是不同的。

Canvas
描述：

通过Javascript来绘制2D图形。
是逐像素进行渲染的。
其位置发生改变，会重新进行绘制。
SVG
描述：

一种使用XML描述的2D图形的语言
SVG基于XML意味着，SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。
在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
比较
Canvas

依赖分辨率
不支持事件处理器
弱的文本渲染能力
能够以 .png 或 .jpg 格式保存结果图像
最适合图像密集型的游戏，其中的许多对象会被频繁重绘
SVG

不依赖分辨率
支持事件处理器
最适合带有大型渲染区域的应用程序（比如谷歌地图）
复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
不适合游戏应用


## css gpu加速
 filter属性，

 transform属性，

(尽量使用带Z的3D属性，        浏览器会在页面渲染前为3D属性创建独立复合图层，在运行时为2D属性创建，所以如果是2D会在动画开始和技术依然检测到重绘)

 opacity属性会使用gpu加速，

  好处是不会引起repait（重绘），完全由GPU处理，传统的动画中，比如用left 然后relative来处理，会引起重绘。


## 水平和垂直均居中

     1>     方案一 inline-block+text-align+table-cell+vertical-align

              .parent {text-align:center;display:table-cell;vertical-align:middle;}

              .child {display:inline-block;}

     2>     方案二 absolute+transform

              .parent {position:relative;}

              .child { position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}

     3>     方案三 flex+justify-content+align-items

              .parent {display:flex;justify-content:center;align-items:center;}


## for-of与for-in

1. for-in可以遍历数组或对象的可枚举属性
2. for-of不能遍历对象，因为for-of是用在可迭代对象上，也就是Array,Map,Set,String,arguments,TypedArray,NodeList等，遍历的是值而不是键

## 什么是可迭代对象

凡是部署了`Symbol.iterator`属性(这个属性值得是一个迭代器函数,也就是该函数返回一个迭代器),都称之为部署了迭代器接口,返回一个迭代器对象,对于原生数据结构部署了Iterator接口,`for...of...`会自动去遍历,如果没有的话,比如普通对象,就需要自己在Symbol.iterator属性上面部署

## JS中的迭代器

`**JS规定, 如果一个对象具有next方法, 并且该方法返回一个对象, 该对象的格式如下:**`

```js
{value: 值, done: 是否迭代完成}
```

则认为该对象是一个迭代器

含义：

- next方法：用于得到下一个数据
- 返回的对象
  - `value：下一个数据的值`
  - done：boolean(迭代是否完成)

## 迭代器创建函数
```js
// 迭代器创建函数  iterator creator
        function createIterator(arr) {
            let i = 0;//当前的数组下标
            return { 
                next() {
                    var result = {
                        value: arr[i],
                        done: i >= arr.length
                    }
                    i++;
                    return result;
                }
            }
        }
```


## 扩展Function
```js
Function.prototype.method=function (name,fn) {//（函数名称，函数本身）
   this.prototype[name]=fn;
   return this;//链式调用关键
};//这个函数的意思：为function对象增加函数，会用链式调用，链式调用有两个参数name,和fn

//使用的时候:
_$.method("AddEvent",function (type,fn) {//_$本身是一个functionm,它想要继承原型链上的东西
  fn();
}).method("getEvent",function (fn,e) {
  fn();
})
```

## Vue中computed/watch/methods的区别

首先它们(不包括methods)都是以Vue的依赖追踪机制为基础的，它们的共同点是：都是希望在依赖数据发生改变的时候，被依赖的数据根据预先定义好的函数，发生“自动”的变化。

相比于watch/computed，**methods不处理数据逻辑关系，只提供可调用的函数**


computed:

1. 支持缓存并且默认会取缓存，只有当依赖数据发生改变，才会重新计算
2. 不支持异步，当computed内有异步操作时无法监听数据的变化
3. 基于响应式依赖进行缓存的，即基于data、props中声明过的数据通过计算得到
4. 通常应用在多个属性通过复杂计算得到一个数据时
5. 若computed中的属性的属性值是函数，则默认会取get方法，return值即为该属性的属性值。当数据变化时，默认调用set

watch：

1. 不支持缓存，数据更改就会触发回调,监听的属性也必须是data、props中声明过的数据
2. 支持异步
3. 监听函数有两个参数，第一个是最新值，第二个是旧值
4. 通常应用在一个数据影响多个数据使用, watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的
5. 监听的对象除了可以配置回调函数外，还可以配置两个参数，
    immediate: 组件加载立即触发回调函数执行
    deep: 深度监听，为了发现对象内部值的变化，对复杂类型的对象使用
**注意：deep监听不到数组的变动和对象的新增，参考vue数组变异，只有以响应式的方式触发才会被监听到**
监听的对象也可以写成字符串形式

`当需要在数据变化时执行异步或者开销较大的操作时，用watch，请勿滥用`


## vue有哪些指令

1、v-if：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。
2、v-show：根据表达式之真假值，切换元素的 display CSS 属性。
3、v-for：循环指令，基于一个数组或者对象渲染一个列表，vue 2.0以上必须需配合 key值 使用。
4、v-bind：动态地绑定一个或多个特性，或一个组件 prop 到表达式。
5、v-on：用于监听指定元素的DOM事件，比如点击事件。绑定事件监听器。
6、v-model：实现表单输入和应用状态之间的双向绑定
7、v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
8、v-once：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
9、v-text和{{}}表达式渲染数据，不解析标签。
10、v-html不仅可以渲染数据，而且可以解析标签。　

## vue的优点

Vue是一套用于构建用户界面的渐进式的JavaScript框架。

1. 体积小：压缩后只有33k；
2. 更高的运行效率：基于虚拟DOM，一种可以预先通过JavaScript进行各种计算，把最终的DOM操作计算出来并优化的技术，由于这种DOM操作属于预处理操作，并没有真实的操作DOM，所以叫做虚拟DOM；而jQuery是需要一直操作真实DOM的
3. 双向数据绑定：让开发者不用再去操作DOM对象，把更多的精力投入到业务逻辑上；
4. 生态丰富、学习成本低(相比于react、angular容易上手)：市场上拥有大量成熟、稳定的基于vue.js的ui框架及组件，拿来即用实现快速开发；对初学者友好、入门容易、学习资料多；
5. 和其他框架一样，Vue允许你将一个网页分割成可复用的组件，每个组件都包含属于自己的HTML、CSS、JavaScript，以用来渲染网页中相应的地方。如果我们构建了一个大型的应用，可能需要将东西分割成为各自的组件和文件，使用Vue的命令行工具，使快速初始化一个真实的工程变得非常简单。 


## canvas与css动画

canvas 相当于提供了一个画板，开发者用JS操作其2D绘图上下文就可以画图，非常自由。连续擦除并重绘图像就成了动画，但图像的计算需要时间，所以代码写不好帧率就会下降，也就是会卡顿。

CSS Animation 则是由浏览器实现的。开发者准备好一些关键帧，并给元素加上包含这些关键帧的动画属性，浏览器就会自动将元素从一帧渐变到另外一帧。因为是浏览器原生实现，所以性能较canvas而言会好一些，而且部分情况可以启动GPU计算，性能更上一层楼。

前面说了canvas的2D绘图上下文，是为了区别于其3D绘图上下文，也就是webGL。webGL支持GPU渲染3D图形，但是3D最终也得用2D表现出来，所以绝大部分成熟的canvas动画库都支持开启硬件加速，原理就是用 webGL 来渲染2D图形。


## webpack编译原理


