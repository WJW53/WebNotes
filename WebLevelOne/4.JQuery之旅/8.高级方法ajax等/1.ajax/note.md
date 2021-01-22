# ajax

是一个功能,向后端发送数据请求,获得拿到的数据

相当于一个对象(rhr?),不是说真的是个对象

详解放到网络部分(毕竟挺caodan的)

## ajax()基本使用


$.ajax()返回的其实也是$.Deferred().promise();
包含done fail progress三种状态事件

第一个data就是发送给服务端的数据,success里面的data是服务器返回的数据
你的dataType是json的话,这两个data里的数据都要是json格式的