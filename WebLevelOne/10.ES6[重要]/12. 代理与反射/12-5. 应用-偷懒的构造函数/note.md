# 偷懒的构造函数

因为constructor里有很多this.xxx = xxx;太烦人了

所以写个代理,简化一下

Reflect.construct -> proxy