# 发布包

## 准备工作

1. `先移除淘宝镜像源`
2. 到npm官网注册一个账号，并完成邮箱认证
3. 本地使用 npm cli 进行登录
   1. 使用命令```npm login```登录
   2. 使用命令```npm whoami```查看当前登录的账号
   3. 使用命令```npm logout```注销
4. 创建工程根目录
5. 使用npm init进行初始化

## 发布

1. 开发
2. 确定版本
3. 使用命令```npm publish```完成发布

## 发布包过程的坑

https://blog.csdn.net/zhangjing1019/article/details/102896421

我遇到的就是下述这个:

```
无法发布到私有包

npm ERR! publish Failed PUT 402
npm ERR! code E402
npm ERR! You must sign up for private packages :

这个当你的包名为@your-name/your-package时才会出现，原因是当包名以@your-name开头时，npm publish会默认发布为私有包，但是 npm 的私有包需要付费，所以需要添加如下参数进行发布:

npm publish --access public
```

> 然后自己就可以玩一玩了, 我在another文件夹下初始化并下载自己的包，然后运行那里的index引入了自己的包然后ok

## 别忘了改回来

玩完了别忘记改回淘宝镜像源!!然后 npm logout(如果没登录当然会报错呗)