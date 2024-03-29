# 各种模块化标准的区别

## CommonJS和ES6模块的区别

1. 因为`CommonJS的require语法是同步的`，所以就导致了CommonJS模块规范只适合用在服务端，而ES6模块无论是在浏览器端还是服务端都是可以使用的，但是在服务端中，还需要遵循一些特殊的规则才能使用，比如文件名配置.mjs或者配置`type:module`；
2. CommonJS 模块输出的是一个值的拷贝，而ES6 模块输出的是值的引用；
3. **CommonJS 模块是运行时加载，而ES6 模块是编译时输出接口，使得对JS的模块进行静态分析成为了可能；**
4. 因为两个模块加载机制的不同，所以`在对待循环加载`的时候，它们会有不同的表现。CommonJS遇到循环依赖的时候，只会输出已经执行的部分，后续的输出或者变化，是不会影响已经输出的变量。而ES6模块相反，使用import加载一个变量，变量不会被缓存，真正取值的时候就能取到最终的值；
5. 关于模块顶层的this指向问题，在CommonJS顶层，this指向当前模块；而在ES6模块中，this指向undefined；
6. 关于两个模块互相引用的问题，在ES6模块当中，是支持加载CommonJS模块的。但是反过来，CommonJS并不能requireES6模块，在NodeJS中，两种模块方案是分开处理的。

作者：echolc55873
链接：https://juejin.cn/post/6844904067651600391
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## seajs与requirejs最大的区别

seajs(cmd)是模块懒加载,requirejs是模块预加载