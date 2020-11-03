# 1-4. 【扩展】Node中的ES6模块化

大约2018.10, node开始支持es6模块化, 但直到现在还不太成熟,

- 目前, Node中的ES6模块化仍处于试验阶段
- 模块化呢, 要么是CommonJS, 要么是ES6模块化
    - CommonJS:
        - 默认情况下都是 CommonJS
    - ES6: 
        - 【推荐】文件后缀名为.mjs
        - 最近的package.json中的type设置为module (这样的话,整个工程都得使用ES6模块化了)


- 当使用ES6模块化运行时, 必须添加: --experimental-modules 标记
> 例如:在package.json的"scripts"的脚本中配置: "start" : "node --experimental-modules index.mjs"     然后,对应目录下输入命令: npm start

了解一下, 等它强大起来了再说