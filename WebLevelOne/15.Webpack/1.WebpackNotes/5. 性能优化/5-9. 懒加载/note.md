# 懒加载

- 可以理解为异步的chunk,动态的按需加载

```js
const btn = document.querySelector("button");
btn.onclick = async function() {
  //动态加载
  //import 是ES6的草案,也就是说还没有成为标准,但是webpack是认的
  //浏览器会使用JSONP的方式远程(也就是会异步)去读取一个js模块,也会缓存下来的
  //import()会返回一个promise   （* as obj）,所以我们可以使用async&await

  // const { chunk } = await import(/* webpackChunkName:"lodash" */"lodash-es");//为这个chunk命名

//上面这行的缺陷就在于,它现在不是静态依赖了,一开始没法解析,所以我们要把它弄为静态依赖,以下用法即可,这样就实现了tree shaking

  const { chunk } = await import("./util");
  const result = chunk([3, 5, 6, 7, 87], 2);
  console.log(result);
};
```

类似jsonp原理,放到了全局上的webpackJsonp,异步加载

