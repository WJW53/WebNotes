# ArrayBuffer

**ArrayBuffer: 一个对象,用于存储一块固定/指定内存大小的数据**

```js

new ArrayBuffer(字节数);

```

可以通过属性```byteLength```得到字节数，可以通过方法```slice```得到新的ArrayBuffer

## 读写ArrayBuffer

1. 使用DataView

```js
new DataView(new ArrayBuffer(n), 偏移量, 偏移的长度);
```

通常会在需要混用多种存储格式时使用DataView

**容易造成混乱，有点智障**

set/get

2. 使用类型化数组[主要是使用这个]

实际上，每一个类型化数组都对应一个ArrayBuffer，如果没有手动指定ArrayBuffer，类型化数组创建时，会新建一个ArrayBuffer