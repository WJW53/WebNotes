# localStorage

cookie的问题: 每次请求的时候都有可能传送许多无用的信息到后端

既浪费带宽又影响速度

所以,localStorage出来了

**localStorage只能存储字符串(JSON)**

## localStorage与sessionStorage的区别

1. `长期存放在浏览器的,写入localStorage(无论窗口是否关闭都需要存储)`

2. 这次会话临时需要存储的东西用sessionStorage

3. 每次窗口关闭的时候,sessionStorage都会自动清空

## localStorage与cookie的区别

1. localStorage在发送请求的时候不会把数据发出去,cookie会把所有的数据带出去

2. cookie存储的内容比较少4K, localStorage可以存放较多的内容, 5M左右

## localStorage的方法

- setItem(key, value):
- getItem(ke):
- removeItem(key):

协议域名端口都相同,才能称为同一个域