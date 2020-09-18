# history

为了网页的性能,现在一般是单页面操作

- 我们希望给查询那里也增加一个history


## history的方法

back():
forward():

- history.pushState({...},null,url());//第二个参数由于基本浏览器都不支持所以就填写null吧

`popstate监听页面回退`: 只要url变了,就会触发它

`hashchange监听`: hash值变了 即 锚点变了就会触发它

所以popstate更常用

**如果锚点变了会先触发popstate,再触发hashchange(其实由浏览器决定,只是目前我们常用的浏览器都是这个触发)**