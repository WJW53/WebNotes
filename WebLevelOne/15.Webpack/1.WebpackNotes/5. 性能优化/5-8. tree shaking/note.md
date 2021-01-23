# tree shaking {ignore}

> `压缩可以移除模块内部的无效代码`
> `tree shaking 可以移除模块之间的无效代码`

![](https://user-gold-cdn.xitu.io/2018/1/4/160bfdcf2a31ce4a?imageslim)

# 背景

某些模块导出的代码并不一定会被用到(比如你导出了100个API而我只需要用其中的四五个而已)

```js
// myMath.js
export function add(a, b){
  console.log("add")
  return a+b;
}

export function sub(a, b){
  console.log("sub")
  return a-b;
}
```

```js
// index.js
import {add} from "./myMath"
console.log(add(1,2));
```

`tree shaking 用于移除掉不会用到的导出`

# 使用

tree shaking 上个世纪80年年代就有了

`webpack2`开始就支持了`tree shaking`

`只要是生产环境，tree shaking自动开启`

# 原理

webpack会从入口模块出发寻找依赖关系

当解析一个模块时，webpack会根据ES6的模块导入语句来判断，该模块依赖了另一个模块的哪个导出

webpack之所以选择ES6的模块导入语句，是因为ES6模块有以下特点：

0. import与所加载的模块是静态链接关系
1. 导入导出语句只能是顶层语句(不在顶层,它会把你拉到顶层)
2. import的模块名只能是字符串常量
3. import绑定的变量是不可变的

这些特征都非常有利于分析出稳定的依赖

在具体分析依赖时，webpack坚持的原则是：**保证代码正常运行，然后再尽量tree shaking**

所以，如果你依赖的是一个导出的对象，由于JS语言的动态特性，以及`webpack`还不够智能，为了保证代码正常运行，它不会移除对象中的任何信息。因为它怕我们会动态的用到对象里的某些东西，所以它不敢删任何信息，除非他能100%确定我们没用到某些东西

因此，我们在编写代码的时候，**尽量**：

- 使用`export xxx`导出，而不使用`export default {xxx}`导出
- 使用`import {xxx} from "xxx"`导入，而不使用`import xxx from "xxx"`导入

依赖分析完毕后，`webpack`会根据每个模块的每个导出是否被使用，标记其他导出为`dead code`，然后交给代码压缩工具处理

代码压缩工具最终移除掉那些`dead code`代码

# 使用第三方库

1. 某些第三方库可能使用的是`commonjs`的方式导出，比如`lodash`
2. 又或者没有提供普通的ES6方式导出

**对于这些库，tree shaking是无法发挥作用的**

`CommonJS的导入导出是函数API，而ES6模块化的导入导出是一种语法`

因此要寻找这些库的`es6`版本，好在很多流行但没有使用的`ES6`的第三方库，都`发布了它的ES6版本`，比如`lodash-es`

# 作用域分析

tree shaking`本身并没有完善的作用域分析`，可能导致在一些`dead code`函数中的依赖仍然会被视为依赖

插件`webpack-deep-scope-plugin`提供了作用域分析，可解决这些问题，一般我们开发时，不建议用这个

# 副作用问题

webpack在`tree shaking`的使用，有一个原则：**一定要保证代码正确运行**

在满足该原则的基础上，再来决定如何`tree shaking`

因此，当`webpack`无法确定某个模块是否有副作用时，它往往将其视为有副作用

因此，某些情况可能并不是我们所想要的

```js
//common.js
var n  = Math.random();

//index.js
import "./common.js"
```

虽然我们根本没用有`common.js`的导出，但`webpack`担心`common.js`有副作用，如果去掉会影响某些功能

如果要解决该问题，就需要标记该文件是没有副作用的

在`package.json`中加入`sideEffects`
```json
{
    "sideEffects": false
}
```

有两种配置方式：

- false：当前工程中，所有模块都没有副作用。注意，这种写法会影响到某些css文件的导入
- 数组：设置哪些文件拥有副作用，例如：`["!src/common.js"]`，表示只要不是`src/common.js`的文件，都有副作用

> **这种方式我们一般不处理，通常是一些第三方库在它们自己的package.json中标注**

# css tree shaking

`webpack`无法对`css`完成`tree shaking`，因为`css`跟`es6`没有半毛钱关系

因此对`css`的`tree shaking`需要其他插件完成(purge是清除、净化的意思)



例如：`purgecss-webpack-plugin`

> 注意：`purgecss-webpack-plugin`对`css module`无能为力

# 安装glob-all库

做路径处理,匹配更多的路径,做统一处理

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DeepScope = require("webpack-deep-scope-plugin").default;
const MiniCss = require("mini-css-extract-plugin");
const Purgecss = require("purgecss-webpack-plugin");
const path = require("path");
const globAll = require("glob-all");
const srcAbs = path.resolve(__dirname, "src"); //得到src的绝对路径
const htmlPath = path.resolve(__dirname, "public/index.html");
const paths = globAll.sync([`${srcAbs}/**/*.js`, htmlPath]);// ** 匹配0或者更多的目录 
console.log(srcAbs);//它默认的路径都是右斜杠
console.log(paths);//这里会自动转为左斜杠
module.exports = {
  mode: "production",
  module: {
    rules: [{ test: /\.css$/, use: [MiniCss.loader, "css-loader"] }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DeepScope(),
    new MiniCss(),
    new Purgecss({
      paths
      //paths是一个数组,里面每个元素都是绝对路径,表示要匹配的文件,它会拿这些匹配的文件跟css文件
      //看哪些代码用到了,哪些没用到,没用到的css代码就会去除(所以dist目录下的main.css就会去除对应代码)
    })
  ]
};

```