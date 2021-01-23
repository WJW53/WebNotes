# async和await的转换

底层实现原理很复杂

实现`*`与`yield`(也就是生成器)用的是`迭代器+可迭代协议+状态机(很复杂,后端java里的底层) = 生成器`

- 为什么使用babel时，如果要转换async和await，需要安装regeneratorRuntime这个库？
`因为async和await需要先转换为生成器，而生成器的语法也属于新语法，也需要进行转换，而转换生成器需要一个库的支持，这个库就是regeneratorRuntime`


去babel试一试那里输入
```js
function* B(){
    const b = yield 1;
    const c = yield A();
    return b + c;
}
```

得到了：
```js
"use strict";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(B);

function B() {
  var b, c;
  return regeneratorRuntime.wrap(function B$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          b = _context.sent;
          _context.next = 5;
          return A();

        case 5:
          c = _context.sent;
          return _context.abrupt("return", b + c);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

用到了一些额外的库,我在package.json中已经配置好了


test:
```js
function A() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(3);
        }, 1000);
    })
}

function* B() {
    const b = yield A();
    const c = yield A();
    return b + c;
}


B().then(data => console.log(data));
```

转换后:
```js
"use strict";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(B);

function A() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(3);
    }, 1000);
  });
}

function B() {
  var b, c;
  return regeneratorRuntime.wrap(function B$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return A();

        case 2:
          b = _context.sent;
          _context.next = 5;
          return A();

        case 5:
          c = _context.sent;
          return _context.abrupt("return", b + c);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

B().then(function (data) {
  return console.log(data);
});
```
