# nvm

**nvm并非包管理器，它是用于管理多个node版本的工具**

在实际的开发中，可能会出现多个项目分别使用的是不同的node版本，在这种场景下，管理不同的node版本就显得尤为重要

nvm就是用于切换版本的一个工具

## 下载和安装

最新版下载地址：https://github.com/coreybutler/nvm-windows/releases

下载nvm-setup.zip后，直接安装

## 使用nvm

nvm提供了CLI工具，用于管理node版本

在终端中输入nvm，以查看各种可用命令

> 为了加快下载速度，建议设置淘宝镜像
> node淘宝镜像：https://npm.taobao.org/mirrors/node/
> npm淘宝镜像：https://npm.taobao.org/mirrors/npm/



## 常用命令

最好在PowerShell管理员下使用nvm

- nvm node_mirror https://npm.taobao.org/mirrors/node/

- nvm npm_mirror https://npm.taobao.org/mirrors/npm/

- nvm list (查看管理的node版本)

- nvm list available(显示一些node版本的信息, 一般我们安装LTS下的版本比较合适)

- nvm install 版本号  (这样就会安装对应版本的node和npm(记得先改变镜像源)

- nvm uninstall 版本号 (卸载对应node)

- nvm use 版本号(切换版本)

- nvm root (查看nvm管理node的位置C:\Users\hp\AppData\Roaming\nvm)

全局包什么的也是在对应版本下才有, 这其实是好事儿啊!


## 总结

以后开发环境的东西,最好还是都安装在默认路径下,别折腾动来动去的,一两个没事儿,多了之后可能互相依赖啥的,就整出毛病了