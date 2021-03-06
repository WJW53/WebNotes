# 个人整理的技术点_二

## css复习

### 单行文本溢出打点：
```css
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
```
### 多行文本溢出打点：
```css
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:3;
overflow:hidden;
text-overflow:ellipsis;
```

## div+css布局，

### flex布局：

#### 容器属性：
flex-direction:row;
flex-wrap:nowrap;
flex-flow: row nowrap;(是上面两条属性的复合属性)
justify-content:center;
align-items: center;(默认为stretch,即项目若没设置高度或高度为auto，则占满容器高度)
		baseline比较特殊，它让项目以第一行文字的基线为参照进行排列。
align-content:center;(多行项目的对齐方式,对单行不起作用,默认也是stretch)


#### 项目属性：
order：决定项目排列顺序，数值越小，排列越靠前。
flex-grow: 默认0，即在有剩余空间的情况下该项目不放大
flex-shrink：默认1，即空间不足时该项目缩小
flex-basis: 默认auto，用于设置项目宽度，默认auto，即项目本身宽度；优先于width属性；
	若值为0，则必须加上单位，以免被视作伸缩性。
flex：默认 0 1 auto，即不放大，可缩小，项目本身大小；
	两个快捷键值：auto(1 1 auto)等分放大或缩小，与none(0 0 auto)不放大也不缩小，非弹性
flex：1；即 1 1 0;chrome看到的是1 1 0%;flex：1；并不关心项目内容，只是把空间等比放大或收缩。
align-self:auto(默认,表示继承父元素的align-items,如果没有父元素,则默认stretch)
		用于让个别项目拥有与其他项目不同的对齐方式。

玩转布局很关键！


## vue复习：

### 一、组件间的通信方式：

1. 父组件通过props传递数据
2. 子组件通过$emit触发自定义事件
3. 子组件绑定ref属性，父组件通过this.$refs['xxx']访问子组件
4. let EventBus = new Vue();
5. $children、$parent或$root
6. $attrs与$listeners（这俩是父作用域中，不作为prop...、不含.native修饰器的）
7. Provide与Inject，父及子孙
8. Vuex
9. .sync/update(父子组件)
10. localstorage/sessionstorage

### 小结

父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择$ref
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递
祖先与后代组件数据传递可选择$attrs与$listeners或者 Provide与 Inject
复杂关系的组件数据传递可以通过vuex存放共享的变量

### 二、生命周期
vue实例从创建到销毁的整个过程：

0. let vm = new Vue();
1. 仅仅初始化了默认的一些生命周期函数和一些默认事件，其他的东西都未被创建
2. beforeCreate()
3. 初始化注入校验,data、methods、props、watcher、event等都初始化好了
4. created()

5. 是否有el选项，如果没有就等到vm.$mount(el) is called
6. 是否有template选项，如果有就将template编译到render函数中，没有则将el的outerHTML作为template编译

注：5、6两步是Vue开始编辑模板，最终在内存中生成一个编译好的模板字符串，但并没有挂载到真正的页面中去

7. beforeMount(),此时页面还是旧的
8. 将内存中编译好的模板生成虚拟DOM并替换到真实的浏览器页面中去
9. mounted(),执行完毕后，就代表vue已经脱离了创建和初始化阶段了，该进入运行阶段了

10. 当data改变的时候，先触发beforeUpdate(),此时data是新的但页面中的数据还是旧的，尚未同步
11. 将虚拟DOM打补丁(边比较边修改)，生成最新的虚拟DOM并重新渲染到真实的页面中去，此时model view层统一了
12. updated(), 此时data和页面已经保持同步了，都是最新的。但并不建议在此期间改变状态，建议使用。watcher和computed取而代之

13. 当vm.$destroy is called之后,Vue实例进入到了销毁阶段，执行beforeDestroy(),但此时vm所有的东西仍可用,还是旧的vue实例
14. 执行真正的销毁过程，Vue实例指示的所有东西都解除绑定了，事件监听器也会被移除。
15. destroyed(),此时组件已经被完全销毁了，组件中的所有data、methods、指令、过滤器等都已经不可用了， vue生命周期结束了



## vuex：

state用来存放共享变量的地方
getter，可以增加一个getter派生状态，(相当于store中的计算属性），用来获得共享变量的值
mutations用来存放修改state的方法。
actions也是用来存放修改state的方法，不过action是在mutations的基础上进行。常用来做一些异步操作

## 模板渲染

• 通过vue-template-compiler包，先将代码解析成AST语法树
• 优化代码，对静态节点进行标记
• 生成代码字符串，通过with + new Functoin 实现生成render方法，render执行后生成的是虚拟dom
 1.通过vue-template-compiler包，将代码生成ast语法树，对代码进行优化，标记静态节点(如<div>123</div>)
 2.将ast语法树生成代码字符串，通过with + new Function()实现生成render函数，render执行后生成一个虚拟dom(本质就是一个js对象)
- with(vm) {}这样在内部就可以直接使用_c,_v,_s,和data中的属性 *with(this){return _c('div',[_v("zf")])}* this就是vm
3. 从虚拟dom到页面的真实渲染，通过updateComponent包的vm.update函数传入vnode，利用patch方法生成真实dom节点并渲染到页面
4. 初次渲染时生成的真实dom结构渲染到容器中，re-render时，利用diff算法比对新旧节点的差异，生成需要更新的真实dom，渲染到容器对应的位置
• 附加分
• vue的diff算法是平级（父级比完比儿子，儿子比完比孙子）比较，不考虑跨级比较（即不考虑父亲和儿子的比对）；内部采用深度递归的方式+双指针的方式进行比较
a. 先比较是否是相同节点（主要比较key和标签名）
b. 相同节点则比较属性，并复用老节点
c. 比较儿子节点，考虑老节点和新儿子节点的情况
d. 优化比较：先比较头头，尾尾，头尾，尾头
e. 比对查找进行复用
• 核心：使用key，key相同直接复用；找不到key则创建元素，多的就删除（vue2，vue3，react都是这样）

## .vue文件中三个部分如何编译成js文件的

没了解过，面试官引导，在js是怎么创建vue，定义vue组件的？

使用vue-loader编译的
在vue-loader里面有一个parse方法将vue文件解析成了一个对象，对象里面存在style， template， script三个部分
parse方法在实现拆分的时候用了一个vue-template-compiler模块中的parseComponent方法实现的，这个方法也就对文件里面的内容进行处理转换。遍历文件里面的所有信息找到指定的标签进行拆分
接着拆分出来的部分依次编译style通过css-loader   js用babel-loader  template用内部的loader解析


## vue-router源码

vue-router 有两个模式一个hash一个history
- 作为前端路由来说实现了页面不刷新就可以切换页面，他的实现是通过h5当中的History的hashchange事件以及pushState，replaceState方法，popState事件实现的。
- hash 和 history的区别在于hash不会通知服务器， 而history 会通知服务器。
- 在发布到线上的时候如果用的是history模式需要服务器端配合着前端路由实现一个服务器代理关系


## vue源码 问的很细 什么时候绑定dep 什么时候通知watcher 什么时候绑定watcher等(头条2020校招)

- 首先vue的数据双向绑定利用的是观察者和发布-订阅模式，在vue中是通过三个类实现的，一个是Observer观察者， 一个是Dep发布者，最后一个Watcher监听者
- Dep是用来通知哪里发生变化的一个映射（究竟要通知到哪里），当vue的data有数据与视图变化相关联就会创建Dep对象， 如果在watch中有监听数据变化，会对应找到该数据的dep添加依赖信息。
- Dep是通过Watcher添加的依赖关系。
- dep的绑定是基于对于watcher的
- Dep的创建时间是在，初始化时给data的属性进行数据劫持时创建的
- Watcher的创建时间是有数据双向绑定的时候例如模板里面的{{}} 或者v-model  watch钩子里面都会绑定
- Watcher的通知是在观察者观察到变化的时候，Dep会通知对应的Watcher

ps:结构简单对于dom少的业务用原生的dom操作更好,原因是虚拟dom会进行整体对比遍历


## vdom(头条2020校招)

- 虚拟dom：其实就是真实dom的一个映射，属于MVVM模式里面的一个核心部分，现在的主流框架中vue ，react都用了到了虚拟dom，虚拟dom也是为了提高页面渲染效率与性能出现的。
- 虚拟dom是数据变化之后应该有的页面渲染结构，MVVM模式是通过虚拟dom和真实DOM做对比，只去更新视图中变化的区域，而实现的视图渲染。
- 在虚拟DOM和真实DOM对比的过程中使用了diff算法，而react 和vue 的一个实现区别就是diff算法。
- vue的diff算法是从两侧同时查找， 而react 是从左到右进行查找，
- vue的diff算法是能保留的就保留 实在不能用的才会进行删除重建

## vue如何优化首页加载

1. 组件按需引入(懒加载)
2. 添加loading效果
3. 异步加载组件

## 性能优化

### 一 页面性能指标
FP (First Paint) 首次绘制: 标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点.
FCP (First Contentful Paint) 首次内容绘制 标记浏览器渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、SVG 甚至 元素.
FMP(First Meaningful Paint) 首次有效绘制: 例如，在 YouTube 观看页面上，主视频就是主角元素. 看这个csdn的网站不是很明显, 这几个都成一个时间线了, 截个weibo的看下. 下面的示例图可以看到, 微博的博文是主要元素.

### 二 性能优化方式

#### 减少请求的次数
1.请求合并：将同一时间需要的js合并，目的是节省dns查找的时间
2.按需加载---（1）单页应用下的按照路由的需要加载 （2）缓存
3.css sprite base64 iconfont
4.cdn托管
5.延迟加载：图片的延迟加载：（就是先不设置img的src属性，等合适的时机（比如滚动、滑动、出现在视窗内等）再把图片真实url放到img的src属性上。） js的延迟加载：

#### 减少量
1.精简代码（tree-shaking）----(1)去除无用的代码 (2)规范些代码的方式 (3)外部cdn的引入
2.懒加载 ---（1）路由的懒加载
3.压缩 ---（1）webpack 压缩UglifyJsPlugin；（2）gzip压缩 (3)图片压缩、JPG优化
4.缓存http代码：---浏览器的强缓存（max-age Etag）和协商(弱)缓存（last-modified）
5.第三方组件---第三方组件作为外部依赖使用，会被打包进业务代码。
6.按需加载 --- （1）第三方库和工具的按需加载，如echarts （2）选择更优的工具 day.js代替moment （3）可用代码拆分（Code-splitting）只传送用户需要的代

#### 减少内存的消耗
1.减少全局变量；
2.减少全局组件；
3.减少dom操作， 减少DOM访问，使用事件代理
    css样式放在页面前面
    延迟js加载
    避免CSS表达式，避免@import

#### 其他
1.预加载：preload（在主渲染前进行预加载） 和prefetch（利用空闲时间）,可用webpackde PreLoadWebpackPlugin插件

SSR 预渲染 同构

#### webpack
1. 遇到webpack打包性能问题，先去npm run build --report，然后根据分析结果来做相应的优化，谁占体积大就干谁
2. webpack提供的externals可以配合外部资源CDN轻松大幅度减少打包体积，尤其对于echarts、jQuery、lodash这种库来说
3. 代码拆分

JS 层面细细展开
**只传送用户需要的代码**。可用代码拆分（Code-splitting）。

**优化压缩代码**（ES5的Uglify，ES2015的babel-minify或者uglify-es）

**高度压缩**（用Brotli~q11，Zopfli或gzip）。Brotli的压缩比优于gzip。它可以帮CertSimple节省17%的压缩JS的字节大小，以及帮LinkedIn减少4%的加载时间。

**移除无用的代码**。用 Chrome DevTools代码覆盖率功能来查找未使用的JS代码。对于精简代码，可参阅tree-shaking， Closure Compiler的高端模式（advanced optimizations）和类似于 lodash-babel-plugin的微调库插件，或者像Moment.js这类库的Webpack的ContextReplacementPlugin。用babel-preset-env & browserlist来避免现代浏览器中已有的转译（transpiling）功能。高级开发人员可能会发现仔细分析Webpack打包（bundle）有助于他们识别和调整不必要的依赖关系。

**缓存HTTP代码**。来减少网络传输量。确定脚本最佳的缓存时间（例如：max-age）和提供验证令牌（Etag）来避免传送无变化的字节。用Service Worker缓存一方面可以让应用程序网络更加灵活，另一方面也可以让你能够快速访问像V8代码缓存这样的功能。长期缓存可以去了解下Webpack带哈希值文件名（filename hashing）。


## Vue的组件设计应遵循什么原则?

高内聚，低耦合。相互独立，互不影响，只暴露用户使用的接口。扁平的、面向数据的，集中统一的状态管理。

### 就近管理
1. 单文件开发
2. 依赖的静态资源放在同级目录
3. 相关联组件也放在同级目录

### 高复用性
1. 页面级别的复用（基础组件）
2. 项目级别的复用- 私有组件库（业务组件）
3. 公司级别的复用- 开源组件库（element-ui、iview）

### 分层设计
**分层架构分为四个层：展示层(presentation layer)，业务层(business layer)，持久层(persistence layer)和数据库层(database layer)。**

由于每一层都是封闭的，所以request必须逐层向下传递。那么为什么每一层都是封闭的呢，因为有个概念叫`层隔离`。层隔离就是说架构中某一层的改变不会影响到其他层，这些变化的影响范围仅限于当前层。

假如展示层和业务层都能够直接访问持久层，那么当持久层的数据变化时，会直接影响到展示层和业务层，这使得整个应用的耦合度变高了，使得组件之间相互依赖，降低了可维护性。

### 灵活扩展
组件要充分的考虑扩展性，除了提供丰富的props还要提供slot插槽来完成用户的定制化需求。或者提供可利用render函数动态渲染的功能。

## 谈谈对MVC，MVP，MVVM 模式的理解

MVC: Model View Controller  
MVP: Model View Presenter 
MVVM: Model View  ViewModel
MVC模式： 主要是三者的通信  主要以view为主 
MVP模式： Presenter是中间人， 与view和model 是双向通信  而view 和model之间不发生关联
MVVM模式： view 和viewmodel是数据双向绑定的  view 的变动会反映在viewModel上面  viewmodel在和model进行双向通信

## 一个computed计算属性依赖了领一个computed计算属性，但是没有走依赖收集流程是为什么

1. 可能是对象层级比较深
2. 也有可能是没有依赖已有的数据属性

## 谈谈对keep-alive的理解

keep-alive是内置的一个组件，做页面存储用的。

正常的vue组件在做页面切换之后就会被销毁，如果说之后返回的时候还想用原来的组件那么就可以设置keep-alive

他的底层实现是通过一个cache数据存储vnode信息，含有keep-alive的子元素的生命周期，mounted之前的钩子函数只执行一次

## vue 单页面利弊

弊端：
  1. 第一次加载时间较长
  2. 不利于SEO引擎搜索
  3. 容易造成命名冲突
  4. 页面复杂度较高，需要技术
优点：
  1. 具有桌面应用的及时性，可移植性
  2. 不需要刷新页面，提高了响应速度
  3. 对服务器的压力较小
  4. 良好的前后端分离
  5. 切换页面不会出现白屏效果
 
## 说一下vue里面nextTick的原理
- 向事件队列中添加回调函数

Vue.nextTick用于延迟执行一段代码，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。

>Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。

>例如，当你设置vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

作者：Ruheng
链接：https://www.jianshu.com/p/a7550c0e164f

### 应用场景
1. 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
2. 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

## vue 怎么创建一个自定义指令

**Vue.directive('指令名称', {bind: 第一次绑定到元素的时候使用, inserted: 指令绑定到父节点的时候调用}, update更新的时候调用)**

底层也就是给html元素节点添加属性，当vue编译dom的时候执行对应的js代码


## cdn回源

cdn回源是什么意思？CDN回源包括回源地址和加速域名。常规的CDN都是回源的。即：当有用户访问某一个URL的时候，如果被解析到的那个CDN节点没有缓存响应的内容，或者是缓存已经到期，就会回源站去获取。如果没有人访问，那么CDN节点不会主动去源站拿的。

回源地址：可以使回源域名，也可以是回源IP，主要作用是CDN加速节点同步更新的一个地址；

加速域名：使用CDN服务器需要加速的一个域名，一般会将加速域名做别名解析为CDN运营商提供的域名，来做CDN加速访问。

回源域名一般是cdn领域的专业术语，通常情况下，是直接用ip进行回源的，但是如果客户源站有多个ip，并且ip地址会经常变化，对于cdn厂商来说，为了避免经常更改配置（回源ip），会采用回源域名方式进行回源，这样即使源站的ip变化了，也不影响原有的配置。

CDN本来是给网站加速的，但是有时会因为不合适的回源策略给服务器带来负担，只有选择正确的策略才能给自己的网站带来更高的访问效率。


## Webpack5的modulefederationplugin

`作用：让不同项目的模块可以通过远程提供给其它项目使用 而这个功能在一个叫ModuleFederationPlugin 插件内实现`
Remote: 提供模块共享服务

Host: 获取共享的模块


## HTML5新增的input的类型

email
url
number
range
Date pickers (date, month, week, time, datetime, datetime-local)
search
color

## HTML5新增的表单元素

datalist
keygen
output

## forEach()和map()的区别

一、相同点：

都是循环遍历数组中的每一项
forEach和map方法里每次执行匿名函数都支持3个参数，参数分别是item（当前每一项）、index（索引值）、arr（原数组）
匿名函数中的this都是指向window
只能遍历数组

二、区别：
1.forEach()
没有返回值

2.map()
有返回值，可以 return 出来。

## csp和iframe
https://www.sohu.com/a/299619478_120055360


## xss和csrf攻击
看每日一大点和node最后一章

## css常用的单位：

1、px：绝对单位，页面按精确像素展示

2、em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

3、rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。

4、vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。

5、vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。

6、vmin：vw和vh中较小的那个。

7、vmax：vw和vh中较大的那个。

8、%:百分比

9、in:寸

10、cm:厘米

11、mm:毫米

12、pt:point，大约1/72寸

13、pc:pica，大约6pt，1/6寸

14、ex：取当前作用效果的字体的x的高度，在无法确定x高度的情况下以0.5em计算(IE11及以下均不支持，firefox/chrome/safari/opera/ios safari/android browser4.4+等均需属性加么有前缀)

15、ch:以节点所使用字体中的“0”字符为基准，找不到时为0.5em(ie10+,chrome31+,safair7.1+,opera26+,ios safari 7.1+,android browser4.4+支持)


## opacity和rgba的区别

rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，而rgba()只作用于元素的颜色或其背景色。

**即opacity会继承父元素的 opacity 属性，而RGBA设置的元素的后代元素不会继承不透明属性**

## webpack自己也有ast，babel也有ast解析 有何不同，为何不整合？
webpack自己也有ast，babel也有ast解析，这是两套机制，webpack用的acorn，babel用的babylon，两者为何不合并优化，解析两次，岂不是很耗时？

webpack是webpack，babel是babel，一个模块打包工具一个是js代码处理工具，而且两个解析是做了两种不同事情，应该说webpack做了部分babel做的功能。**webpack解析ast是为了合并无用代码比如true===true这种的，并且查找import以分析模块依赖，而babel做的则是为了做代码编译与兼容磨平，两个是不同的工具与不同团队维护的**，**webpack在ast解析层级并没有开放出接口来，而babel倒是有开放出ast处理的接口**，如果一定要磨平，那么首先将两个ast的解析框架统一或者做一个转化babylon转为acorn，webpack的loader处理需要开个口子出来接受以ast作为链尾的返回。然后webpack捞取现成的ast做解析，那么问题来了ast的格式没法约定啊，有一个不一致就GG了，很容易导致解析出问题，webpack为babel开这个接口出来貌似投入大收益小。

因为用webpack的项目不一定用babel。
而且现在webpack的loader之间，loader和webpack之间传递的都是字符串或者buffer，即使用了同一个ast的解析，性能也提不上来。但也因为这种设计足够通用，才使得webpack不至于把js loader绑死在babel上，而是可以选择例如buble之类。通用性和性能很多时候不能兼得。针对这点，有很多模块化打包工具另立门户做了相关的优化，性能提上来了但通用性或者说自由度就变差了。篇幅有限就不多说了。

作者：麦克斯韦
链接：https://www.zhihu.com/question/309893645/answer/580113997

## setTimeout 与 requestAnimationFrame 的区别：

• 引擎层面：setTimeout 属于 JS 引擎，存在事件轮询，存在事件队列。
requestAnimationFrame 属于 GUI 引擎，发生在渲
染过程的中重绘重排部分，与电脑分辨路保持一致。
• 性能层面：当页面被隐藏或最小化时，定时器 setTimeout 仍在后台执行动画任
务。
当页面处于未激活的状态下，该页面的屏幕刷新任
务会被系统暂停，requestAnimationFrame 也会停止。
• 应用层面：利用 setTimeout，这种定时机制去做动画，模拟固定时间刷新页面。
requestAnimationFrame 由浏览器专门为动画提供
的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了
CPU 开销。


## location能否重写(覆写)问题

**IE8及以下location可以被重写**,`高版本就跟chrome一样，重定向到404`

## Object.freeze()

被冻结对象自身的所有属性都不可能以任何方式被修改。任何修改尝试都会失败，无论是静默地还是通过抛出TypeError异常（最常见但不仅限于strict mode）。

数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。**`如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象`**。数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。

这个方法返回传递的对象，而不是创建一个被冻结的副本。

## vuex中mutation和action的详细区别

1. 流程顺序

“相应视图—>修改State”拆分成两部分，视图触发Action，Action再触发Mutation。

2. 角色定位

基于流程顺序，二者扮演不同的角色。
Mutation：专注于修改State，理论上是修改State的唯一途径。
Action：业务代码、异步请求。

3. 限制

角色不同，二者有不同的限制。
Mutation：必须同步执行。
Action：可以异步，但不能直接操作State。

## 小结：textContent、innerText、innerHTML的区别和差异
1 、textContent属性可以获取指定节点的文本及其后代节点中文本内容，也包括<script>和<style>元素中的内容；

innerText也是获取指定节点的文本及其后代节点中文本内容，但不能获取<script>和<style>元素中的内容。

innerHTML是获取HTML文本结构内容。

2、textContent会获取display:none的节点的文本；而innerText好像会感知到节点是否呈现一样，不作返回。

也就是说，textContent能够获取元素的所有子节点上的文本，不管这个节点是否呈现；而innerText只返回呈现到页面上的文本。

3、要注意设置文本时被替换的可不只是文本了；这时textContent 、innerText属性相当于innerHTML属性，会把指定节点下的所有子节点也一并替换掉。

4、由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但 textContent 不会。


## Promise优缺点

### promise的优点
1. 解决回调地狱（Callback Hell）问题
有时我们要进行一些相互间有依赖关系的异步操作，比如有多个请求，后一个的请求需要上一次请求的返回结果。过去常规做法只能 callback 层层嵌套，但嵌套层数过多的话就会有 callback hell 问题

2. 更好地进行错误捕获
多重嵌套 callback 除了会造成上面讲的代码缩进问题，更可怕的是可能会造成无法捕获异常或异常捕获不可控

3. 有一个传统写法没有的好处：
他的状态一旦改变，无论何时查询，都能得到这个状态。这意味着无论何时为promise实例添加回调函数，该函数都能正确执行。
传统写法的话都通过监听事件来执行回调函数，一旦错过了事件，再添加回调函数是不会执行的。

### promise的缺点
1. 无法取消Promise,一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。


##  数据改变到页面渲染的过程是怎么样的？

首先看下面的图片👇，这是执行click函数改变一个数据之后发生的函数调用栈，从图上的说明可以比较清楚个了解这个响应式过程的大概流程。下面简单讲解一下：
```
改变数据，触发这个被劫持过的数据的setter方法
执行这个数据的订阅中心（dep）的notify方法
update方法里执行queueWatcher方法把watcher推入队列
执行nextTick方法开始更新视图
run方法里设置dep.target为当前订阅对象
调用get方法调用当前watcher的getter执行更新方法
updateComponent方法里调用了render方法开始执行渲染页面
patch、patchVnode、updateChildren方法都是比较VNode更新渲染的函数，不过重点的diff过程在updateChildren方法里。
```
![](https://user-gold-cdn.xitu.io/2019/6/23/16b83a2e38faea15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

链接：https://juejin.cn/post/6844903873283358728

## vue-diff的具体实现

patchVnode、updateChildren方法在vue源码项目的src/core/vdom/patch.js文件中。
先介绍patchVnode方法，这是执行真正更新dom的方法，大概的执行逻辑如下
```
判断vnode和oldVnode是否相等
判断是否能重用vnode
判断是否执行回调
判断是否有children需要diff更新
判断执行更新类型—新增dom、移除dom、更新textDom
```

## 一个新特性: Optional Chaining
过去在 Object 属性链的调用中，很容易因为某个属性不存在而导致之后出现Cannot read property xxx of undefined的错误。

那 optional chaining 就是添加了`?.`这么个操作符，它会先判断前面的值，如果是 null 或 undefined，就结束调用、返回 undefined。

例如，我们可以将上面的示例重构为 this.state.data?.()。或者，如果我们主要关注state 是否已定义，我们可以返回this.state？.data。

## ~~

在某些上下文中，+将被解释为连接操作符，而不是加法操作符。当这种情况发生时(你希望返回一个整数，而不是浮点数)，您可以使用两个波浪号:`~~`。

连续使用两个波浪有效地否定了操作，因为— ( — n — 1) — 1 = n + 1 — 1 = n。 换句话说，~—16 等于15。

虽然我想不出很多用例，但是按位 NOT 运算符也可以用在布尔值上：`~true = -2和~false = -1。`

## 指数运算符**

从 ES7 开始，可以使用指数运算符**作为幂的简写，这比编写Math.pow(2, 3) 更快。 这是很简单的东西，但它之所以出现在列表中，是因为没有多少教程更新过这个操作符

## 快速浮点数转整数 |

如果希望将浮点数转换为整数，可以使用Math.floor()、Math.ceil()或Math.round()。但是还有一种更快的方法可以使用|(位或运算符)将浮点数截断为整数。

|的行为取决于处理的是正数还是负数，所以最好只在确定的情况下使用这个快捷方式。

如果n为正，则n | 0有效地向下舍入。 如果n为负数，则有效地向上舍入。 更准确地说，此操作将删除小数点后面的任何内容，将浮点数截断为整数。

你可以使用~~来获得相同的舍入效果，如上所述，实际上任何位操作符都会强制浮点数为整数。这些特殊操作之所以有效，是因为一旦强制为整数，值就保持不变。

## Async/Await替代Promise的6个理由
1. 语法简洁
2. 错误处理：使用 async/await 的话，catch 能处理 JSON.parse 错误
3. 条件语句：上面的代码使用 async/await 编写可以大大地提高可读性:
4. 中间值：使用 async/await 的话，代码会变得异常简单和直观。
```js
const makeRequest = async () => {
    const value1 = await promise1();
    const value2 = await promise2(value1);
    return promise3(value1, value2);
};
```
5. 错误栈：然而，async/await 中的错误栈会指向错误所在的函数
6. 调试：
最后一点，也是非常重要的一点在于，async/await 能够使得代码调试更简单。2 个理由使得调试 Promise 变得非常痛苦:

  - 不能在返回表达式的箭头函数中设置断点
  - 如果你在.then 代码块中设置断点，使用 Step Over 快捷键，调试器不会跳到下一个.then，因为它只会跳过异步代码。

使用 await/async 时，你不再需要那么多箭头函数，这样你就可以像调试同步代码一样跳过 await 语句。

https://blog.fundebug.com/2017/04/04/nodejs-async-await/


## Java到底是编译型语言还是解释型语言？

Java这个语言很非凡。 
一、你可以说它是编译型的。因为所有的Java代码都是要编译的，.java不经过编译就什么用都没有。 
二、你可以说它是解释型的。因为java代码编译后不能直接运行，它是解释运行在JVM上的，所以它是解释运行的，那也就算是解释的了。 
三、但是，现在的JVM为了效率，都有一些JIT优化。它又会把.class的二进制代码编译为本地的代码直接运行，所以，又是编译的。
像C、C++ 他们经过一次编译之后直接可以编译成操作系统了解的类型，可以直接执行的 所以他们是编译型的语言。没有经过第二次的处理 而Java不一样他首先由编译器编译成.class类型的文件，这个是java自己类型的文件 然后在通过虚拟机(JVM)从.class文件中读一行解释执行一行，所以他是解释型的语言，而由于java对于多种不同的操作系统有不同的JVM所以 Java实现了真正意义上的跨平台！ 
请观看下面两张图 了解一下Java的虚拟机机制： 
(1)java语言的编译-->解释--->执行过程 
![](https://img-blog.csdn.net/20170519090738244?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXpjNzA5MTk3MDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

(2)java的虚拟机 
![](https://img-blog.csdn.net/20170519090836650?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXpjNzA5MTk3MDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
今天听到同事在讨论java是哪种类型的语言（编译型、解释型），以前稍微有些接触，但是概念比较模糊，为了不至于让别人的思想左右自己，所以查了些资料，找到了很多热心网友给出的答案，终于有些明白。这里先给出编译型语言和解释型语言的定义。 
定义： 
编译型语言：把做好的源程序全部编译成二进制代码的可运行程序。然后，可直接运行这个程序。 
解释型语言：把做好的源程序翻译一句，然后执行一句，直至结束！
区别： 
编译型语言，执行速度快、效率高；依靠编译器、跨平台性差些。 
解释型语言，执行速度慢、效率低；依靠解释器、跨平台性好。 
个人认为，java是解释型的语言，因为虽然java也需要编译，编译成.class文件，但是并不是机器可以识别的语言，而是字节码，最终还是需要 jvm的解释，才能在各个平台执行，这同时也是java跨平台的原因。所以可是说java即是编译型的，也是解释型，但是假如非要归类的话，从概念上的定义，恐怕java应该归到解释型的语言中。 
附： 
编译型的语言包括：C、C++、Delphi、Pascal、Fortran 
解释型的语言包括：Java、Basic、javascript


## js下载文件、音频、视频的方式

https://blog.csdn.net/lavendersue/article/details/111193389

## java语言

**JAVA语言是一种编译型-解释型语言**，同时具备编译特性和解释特性（其实，**如要严格分类，java就是解释型语言**，其所谓的编译过程只是将.java文件编程成平台无关的字节码.class文件，并不是向C一样编译成可执行的机器语言，在此请读者注意Java中所谓的“编译”和传统的“编译”的区别）。

作为编译型语言，JAVA程序要被统一编译成字节码文件——文件后缀是class。此种文件在java中又称为类文件。java类文件不能再计算机上直接执行，它需要被java虚拟机翻译成本地的机器码后才能执行，而java虚拟机的翻译过程则是解释性的。

java字节码文件首先被加载到计算机内存中，然后读出一条指令，翻译一条指令，执行一条指令，该过程被称为java语言的解释执行，是由java虚拟机完成的。

## 解决1px问题
```js
var viewport = document.querySelector("meta[name=viewport]");
var ppi = 1;
if (window.devicePixelRatio == 2) ppi = 2;
if (window.devicePixelRatio == 3) ppi = 3;

viewport.setAttribute('content', `width=device-width,initial-scale=${1/ppi}, maximum-scale=${1/ppi}, minimum-scale=${1/ppi}, user-scalable=no`);

// 设置根字体大小
var docEl = document.documentElement; 
var fontsize = 10 * (docEl.clientWidth / 320) + 'px'; 
docEl.style.fontSize = fontsize;

// 在CSS中用rem单位就行了
```

## 判断是否存在循环引用
```js
let flag = false;
function cycle(obj, parent) {
    //表示调用的祖先属性的数组
    let parentArr = parent || [obj];
    for (let i in obj) {
        if (typeof obj[i] === "object") {
            //判断是否有循环引用
            for (let j = 0;j<parentArr.length;j++){
              if(parentArr[j] === obj[i]){
                obj[i] = "[cycle]";
                flag = true;
                return;
              }
            }
            cycle(obj[i], [...parentArr, obj[i]]);
        }
    }
    return flag;
}
let a = {
    b:{
        c:{}
    }
};

a.b.c.d = a;

console.log(cycle(a));
```

## vue源码目录结构
```js
VUE 2.6.10
├── scripts 			# 打包相关的配置文件，其中最重要的是config.js。主要是根据不同的入口，打	包为不同的文件。
├── dist 			# 打包之后文件所在位置
├── examples 		# demo示例
├── flow 			# Vue使用了Flow来进行静态类型检查，这里定义了声明了一些静态类型
├── packages 		# vue还可以分别生成其它的npm包
├── src 			# 主要源码所在位置
	├── compiler        # 编译相关 
		├── codegen 		#根据ast生成render函数
        ├── directives 		#通用生成render函数之前需要处理的指令
        ├── parser 			#模板解析
	├── core            # 核心代码
        ├── components 		#全局的组件，这里只有keep-alive
        ├── global-api 	#全局方法，也就是添加在Vue对象上的方法，比如Vue.use,Vue.extend,,Vue.mixin等
        ├── instance 		#实例相关内容，包括实例方法，生命周期，事件等
        ├── observer 		#双向数据绑定相关文件
        ├── util 			#工具方法
        ├── vdom 			#虚拟dom相关 
	├── platforms       # 不同平台的支持
		├── web 			#web端独有文件
	        ├── compiler 		#编译阶段需要处理的指令和模块
	        ├── runtime 		#运行阶段需要处理的组件、指令和模块
	        ├── server 			#服务端渲染相关
	        ├── util 			#工具库
        ├── weex 			#weex端独有文件
	├── server          # 服务端渲染
	├── sfc             # vue 文件解析
	├── shared          # 共享工具代码
├── test 			# 测试用例
```

## 2021大前端技术储备

https://blog.csdn.net/gongch0604/article/details/111947613


## 前端方向

node全栈应用、人工智能化、前端工程化、跨平台技术（非常重要）、性能优化和监控

有些技术需要了解并学习技：cssinjs+原子css，weex，flutter，react native，typescript

## ES2021的新特性

`str.replaceAll`、`Promise.any`、`#`（真正私有化变量,无法外部调用,只能函数/类内部自己调用）、`WeakRef`（类，弱引用，垃圾回收0）

`??=`的意思是，如果左侧的值是空值(null和undefined)，那么就把右侧的值赋值给左侧的变量(这个是ES2020的特性)

Numeric separators,比如123456789，一长串看起来很累，所以这次加了下划线作为分隔符123_456_789,
注意，下划线不能连续，也不能放在开头和结尾，放在开头，就变成字符串了，会被当成变量名，放在结尾会直接报语法错误


## 搞清clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop

https://blog.csdn.net/qq_35430000/article/details/80277587


## CSSOM阻塞DOM的构建的情况

JS文件不只是阻塞DOM的构建，它会导致CSSOM也阻塞DOM的构建。

原本DOM和CSSOM的构建是互不影响，井水不犯河水，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。

这是什么情况？

这是因为JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。前面我们介绍，**不完整的CSSOM是无法使用的，但JavaScript中想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM**。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。也就是说，`在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM`。


## 算术左移、逻辑左移、算术右移、逻辑右移
`算术左移和算术右移主要用来进行有符号数的倍增、减半；`
**算术右移符号位要一起移动，并且在左边补上符号位，也就是如果符号位是1就补1符号位是0就补0**
`逻辑左移和逻辑右移主要用来进行无符号数的倍增、减半。`

由于js和java没有无符号整数型,因此右移需要使用逻辑右移

## Vue.set()

```js
function set(target: Array<any> | Object, key: any, val: any): any {
  // isUndef 是判断 target 是不是等于 undefined 或者 null 。
  //isPrimitive 是判断 target 的数据类型是不是 string、number、symbol、boolean 中的一种
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }

  // 数组的处理
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }

  // 对象，并且该属性原来已存在于对象中，则直接更新
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  // vue给响应式对象(比如 data 里定义的对象)都加了一个 __ob__ 属性，
  // 如果一个对象有这个 __ob__ 属性，那么就说明这个对象是响应式对象，我们修改对象已有属性的时候就会触发页面渲染。
  // 非 data 里定义的就不是响应式对象。
  const ob = (target: any).__ob__

  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }

  // 不是响应式对象
  if (!ob) {
    target[key] = val
    return val
  }

  // 是响应式对象，进行依赖收集
  defineReactive(ob.value, key, val)

  // 触发更新视图
  ob.dep.notify()
  return val
}
```

## 堆排序
```java
public static void heapSort(int[] arr) {
    // 构建初始大顶堆
    buildMaxHeap(arr);
    for (int i = arr.length - 1; i > 0; i--) {
        // 将最大值放到数组最后
        exchange(arr, 0, i);
        // 调整剩余数组，使其满足大顶堆
        maxHeapify(arr, 0, i);
    }
}

// 构建初始大顶堆
public static void buildMaxHeap(int[] arr) {
    // 从最后一个非叶子结点开始调整大顶堆，最后一个非叶子结点的下标就是 arr.length / 2-1
    for (int i = arr.length / 2 - 1; i >= 0; i--) {
        maxHeapify(arr, i, arr.length);
    }
}

// 调整大顶堆，第三个参数表示剩余未排序的数字的数量，也就是剩余堆的大小
private static void maxHeapify(int[] arr, int i, int heapSize) {
    // 左子结点下标
    int l = 2 * i + 1;
    // 右子结点下标
    int r = l + 1;
    // 记录根结点、左子树结点、右子树结点三者中的最大值下标
    int largest = i;
    // 与左子树结点比较
    if (l < heapSize && arr[l] > arr[largest]) {
        largest = l;
    }
    // 与右子树结点比较
    if (r < heapSize && arr[r] > arr[largest]) {
        largest = r;
    }
    if (largest != i) {
        // 将最大值交换为根结点
        exchange(arr, i, largest);
        // 再次调整交换数字后的大顶堆
        maxHeapify(arr, largest, heapSize);
    }
}
// 交换元素
private static void exchange(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

作者：力扣 (LeetCode)
链接：https://leetcode-cn.com/leetbook/read/sort-algorithms/eu7ux3/
```

## ICMP 和 CIP 协议,抽空了解下原理..



## 