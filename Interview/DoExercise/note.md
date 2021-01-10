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
function cal(a,b,c,d){
    return a+b*c-d;
}

function curry(func,...args){
    return function(...subArgs){//每次都是返回新的函数!!
        const allArgs = [...args,...subArgs];
        if(allArgs.length>=func.length){
            func(...allArgs);
        }else{
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
4. 一般用于：事件处理函数、异步处理函数、其他时性函数、为了绑定父级this、为了代码简洁
5. 对象的属性绝对不要使用箭头函数，因为小心this指向了window，拿不到该拿的东西

## 类

静态成员: 在内存中唯一的成员, 不论创建多少个对象都只有一个同名的成员存在

实例(对象)成员: 跟随对象的成员

1. 类声明不会被提升，存在暂时性死区
2. 类中的所有代码均在严格模式(对象中函数中的this指向调用该函数的对象实例)下进行
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

## 给函数传参的时候,实际上传的是拷贝值

`就是,开辟新的地址空间(栈那里)存储这个拷贝值,原始值的话就存这个值,引用值的话,就在这个新地址空间里拷贝那个引用值的地址(在堆里面)`

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