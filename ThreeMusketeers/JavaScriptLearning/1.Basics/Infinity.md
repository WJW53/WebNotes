# Infinity

- Infinity 翻译为“无穷大; 无限的时间或空间”。**(-Infinity + Infinity);会返回NaN**

> 在JS中Infinity用于表示无穷大的数值，**且不是常量**，即无法明确表示它到底有多大。可以通过isFinite(val)判断当前数字是否是无穷大，**函数返回true表示 不是无穷大，返回false表示 是无穷大。**

1. Infinity 在JS中是数值类型【number】，因此它也是有符号的，Infinity或者+Infinity 表示无穷大；-Infinity表示无穷小。 **-Infinity == -Infinity-Infinity;true**,同理无穷大也可进行同样操作
可以使用 typeof Infinity 查看Infinity在JS中的类型是 number

2. 当除数为0的时候，计算结果就是Infinity。例如 5/0 = Infinity

3. **与Infinity做任何数值操作，如加、减、乘、除等运算，其结果都是Infinity,所以nfinity == Infinity+233;结果为true,后面可为任意数字**

4. Infinity可以转换为字符串表示，如 Infinity + ""  或者 Infinity.toString()   结果都是字符串的"Infinity"

5. **由于Infinity无法用具体数值表示，所以，对其使用delete，结果永远都是false**

6. 由于Infinity无法用具体数值表示，所以，不要将其使用在for循环中，否则，将进入死循环。

7. 鉴于Infinity的各种特性，在做JS除法的时候，请先判断除数是否是0，如果除数是0，就直接返回0

8. 除了判断除数是否为0之外，其他各种情况基本上可以使用isFinite(val)函数判断是否有Infinity，没有的话，就可以安全的做各种数值操作了。当val是Infinity时，返回false；当val不是Infinity时，返回true