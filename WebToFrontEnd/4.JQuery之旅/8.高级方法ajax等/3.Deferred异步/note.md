# Deferred

```
//$.Deferred();
        //延迟对象

        // var df = $.Deferred();
        //注册状态回调函数:  done 成功,fail 失败,progress 正在进行
        //对应触发回调函数: resolve,reject,notify
        //只要done或者fail触发一次,那么就不再触发;progress不会这样
        //df.promise();是阉割版的df,只返回了注册功能
```

**触发函数,就是为了执行 注册函数的**