# 属性描述符

Property Descriptor 属性描述符,是一个普通对象,用于描述一个属性的相关信息

## 如何得到这些相关信息呢

通过`Object.getOwnPropertyDescriptor(对象,属性名(字符串类型))`可以得到一个对象的某个属性的属性描述符

- **value：属性值(它是在内存空间的数据,所以不能和存取器属性共存)**
- configurable：该属性的描述符是否可以修改. false一次后,即便下次再true也不行
- enumerable：该属性是否可以被枚举. false -> Object.keys/values(obj)等方法都会失效
- writable：该属性是否可以被重新赋值

> `Object.getOwnPropertyDescriptors(对象)`可以得到一个对象的所有属性描述符


如果需要为某个对象添加属性时，或 修改属性时，配置其属性描述符，可以使用下述代码：
```js
Object.defineProperty(对象,属性名,描述符);
Object.defineProperties(对象,多个属性的描述符(直接传个对象,里面指定一些属性及其描述符));
```

## 存取器属性

> 属性描述符中,如果配置了get/set中的任何一个,则该属性不再是一个普通属性,而变成了存取器属性. `它的属性值不是像普通的属性放在内存空间里,所以控制台里得点开对象看灰色字才能看到`

**get 和 set 配置均为函数,如果一个属性是存取器属性,则读取该属性时,会运行get方法,将get方法得到的返回值作为属性值;如果给该属性赋值,则会运行set方法**

`存取器属性最大的意义在于: 可以控制属性的读取和赋值.`


## js底层应用

简单demo伪代码: 

```js
function HTMLSpanElement() {
            Object.defineProperty(this, "innerHTML", {
                get() {
                    //获取页面窗口中对应的元素的内容
                },
                set() {
                    //重新渲染页面窗口
                }
            });
            this.innerHTML = "";
        }
```