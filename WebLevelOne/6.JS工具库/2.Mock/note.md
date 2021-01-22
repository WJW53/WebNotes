# Mock

去github上查它的用法,官网规定的用法都在github上
https://github.com/nuysoft/Mock/wiki/Syntax-Specification

## 数据模板定义规范 DTD

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

- Mock对象在全局上有一个mock方法,里面传配置对象config


## 生成随机数据

var Random = Mock.Random;

Random.character(pool?);
返回一个随机字符。

pool
可选。

字符串。表示字符池，将从中选择一个字符返回。

如果传入了 'lower' 或 'upper'、'number'、'symbol'，表示从内置的字符池从选取：
```
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
```
如果未传入该参数，则从 lower + upper + number + symbol 中随机选取一个字符返回。





## 拦截 Ajax 请求



