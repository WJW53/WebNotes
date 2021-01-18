## 运用

1. //Math.max/min方法可以直接得到数组中的最大/小值, 传的参数要用剩余参数的形式
2. //不用剩余参数的话就用 Math.max.applay(null,numbers);//这样也行
3.`函数名.length,可以知道函数有几个形参,我都给忘了这种操作了`
4. 函数柯里化

```js
//curry:柯里化,用户固定某个函数的前面的参数,得到一个新的函数,新的函数调用时,接收剩余的参数
        function curry(func, ...args) {
            return function(...subArgs) {//每次都是返回新的函数!!
                const allArgs = [...args, ...subArgs];
                if (allArgs.length >= func.length) {
                    //参数够了
                    return func(...allArgs);
                } else {
                    //参数不够，继续固定
                    return curry(func, ...allArgs);
                }
            }
        }
```