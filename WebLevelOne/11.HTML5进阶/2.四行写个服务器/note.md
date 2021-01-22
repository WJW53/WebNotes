# 四行写个服务器

先配置好node.js,express

```
var express = require("express");

var app = new express();

app.use(express.static("./page"));

app.listen(12306);//端口号尽量大于8000、或者等于80
//80端口的话就可以不写了,因为默认访问80端口

//express框架 默认访问index.html
```

//webstorm 右键 run server.js
//命令框或者vscode的客户端, 进到项目路径里, node server.js
