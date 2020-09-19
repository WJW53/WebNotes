# yarn 的特别礼物

在终端命令上，yarn不仅仅是对npm的命令做了一个改名，还增加了一些原本没有的命令，这些命令在某些时候使用起来非常方便

1. **yarn check**

使用```yarn check```命令，可以验证package.json文件的依赖记录和lock文件是否一致

这对于防止篡改非常有用


2. **yarn audit**, 非常有用!

所以我们安装第三方包的时候, 最好先拿yarn audit检测一下

使用```yarn audit```命令，可以检查本地安装的包有哪些已知漏洞，以表格的形式列出，漏洞级别分为以下几种：

- INFO：信息级别(宽松一点的话,这不叫漏洞,很轻微的)
- LOW: 低级别
- MODERATE：中级别
- HIGH：高级别
- CRITICAL：关键级别

现在npm也有这个命令了


3. **yarn why**

使用```yarn why 包名```命令，可以在控制台打印出为什么安装了这个包，哪些包会用到它


4. **yarn create**

非常有趣的命令

> 今后，我们会学习一些脚手架，所谓 脚手架，就是使用一个命令来搭建一个工程结构

过去，我们都是使用如下的做法：

1) 全局安装脚手架工具(工程都没有,怎么本地安装,当然不行啊)
2) 再使用全局命令搭建脚手架

由于大部分脚手架工具都是以```create-xxx```的方式命名的，比如react的官方脚手架名称为```create-react-app```

```
yarn global add create-react-app(yarn先安装全局的脚手架)
create-react-app my-app(我们的工程名字) 
老多文件了,就这点都4w文件,就算yarn再快,也要些时间啊
```


`因此，可以使用 yarn create 命令来一步完成安装和搭建`

例如：

```shell
yarn create react-app my-app
# 等同于下面的两条命令
yarn global add create-react-app
create-react-app my-app
```
