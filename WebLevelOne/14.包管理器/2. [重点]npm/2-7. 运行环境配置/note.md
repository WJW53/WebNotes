# 运行环境配置

我们书写的代码一般有三种运行环境：

1. 开发环境
2. 生产环境
3. 测试环境

有的时候，我们可能需要在 node 代码中根据不同的环境做出不同的处理

**如何优雅的让 node 知道处于什么环境，是极其重要的**

通常我们使用如下的处理方式：

node中有一个全局变量 global (可以类比浏览器环境的window)，该变量是一个对象，对象中的所有属性均可以直接使用

> global有一个属性是process(进程)，该属性是一个对象，包含了当前运行node程序的计算机的很多信息，其中有一个信息是env(就是environment, 环境/系统变量)，是一个对象，包含了计算机中所有的系统变量

`通常，我们通过系统变量 NODE_ENV(约定俗成的) 的值，来判定node程序处于何种环境`

有两种方式设置 NODE_ENV 的值: 

1. 永久设置(电脑系统变量里建立NODE_ENV然后赋值即可)
2. 临时设置

**我们一般使用临时设置**

因此，我们可以配置 scripts 脚本，在设置好了 NODE_ENV 后启动程序

> 为了避免不同系统的设置方式的差异，可以使用第三方库 cross-env 对环境变量进行设置

```json
"scripts": {
    "start": "cross-env NODE_ENV=development node index.js",
    "build": "cross-env NODE_ENV=production node index.js",
    "test": "cross-env NODE_ENV=test node index.js"
  },
  //或者
//   "scripts": {
//     "start": "set NODE_ENV=development&&node index.js",//&&两边不能有空格,但是set命令不能跨环境,比如linux环境下就要用export
//   },
```

**提供命令行的东西, 一般来说都是开发依赖, 比如这个 cross-env**

## 在node中读取package.json

有的时候，我们可能在 package.json 中配置一些自定义的字段，这些字段需要在node中读取

`在node 中，可以直接导入一个json格式的文件，它会自动将其转换为js对象`