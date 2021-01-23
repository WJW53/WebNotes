# Git

**`怎么说呢,总之一句话,干事儿前先备份到别的地方一份,再来探索git`**

my github's token:
```
wjwpush
e9ad67816f5c148b16f308190d6282fd94d03c3c
```

## Github 新建仓库 ，并与本地仓库进行连接

`新建的本地文件夹先不要装东西,保证空的最好,否则可能有证书、readme文件资源没对齐的问题`

```shell
git init
git add .
git commit -m "first_commit"
git remote add origin https://github.com/WJW53/xxx.git
git pull --rebase origin master
git remote -v
#可以省略-u,冲突可以再加个-f
git push -u origin master
```
`在remote add后不要着急git add，一定要git pull --rebase origin master`

- 然后第一次验证github账号密码，第二次验证token账号密码
### rejected原因
是因为你在码云创建的仓库有ReadMe文件，而本地没有，造成本地和远程的不同步，
那么有两种方案可以解决：
one ：
本地没有ReadMe文件，那么就在本地生成一个：

`git pull --rebase origin master     本地生成ReadMe文件`
//如果这里报错,大概率是因为你有的文件没有重新add commit,重新来一次即可
git push -u origin master

two：
那我就强制上传覆盖远程文件，
git push -f origin master
(这个命令在团队开发的时候最好不要用,否则可能会有生命危险)

git branch -a 查看所有分支(本地和远端)
要删除服务器远端的分支，则执行如下所示的命令：
git push origin –delete 分支名
如果是要删除本地已经合并了的分支，则执行：
git branch –d 分支名
下图中的命令是为了删除本地未合并的分支：
git branch –D 分支名

把远程仓库和本地同步，消除差异
git pull origin master --allow-unrelated-histories


## 坑有很多

初学git时我遇到的最大的坑是`项目嵌套git,导致上传失败`,以及各种问题

如何解决：删除子文件夹里的.git文件, `就留根目录里一个.git就行了`

要想两全其美, 网上说有个submodule的东西貌似可以解决,日后再去详细了解吧


## git 添加ssh认证到github
　　由于本地到远程github上用ssh比较方便，不需要每次都输入用户名密码，所以下面记录一下本地仓库与远程github怎么添加ssh加密。

　　一。创建SSH KEY。先看一下你C盘用户目录下有没有.ssh目录，有的话看下里面有没有id_rsa和id_rsa.pub这两个文件，有就跳到下一步，没有就通过下面命令创建
```shell
　　　　$ ssh-keygen -t rsa -C "youremail@example.com"
```
　　  　 然后一路回车。这时你就会在用户下的.ssh目录里找到id_rsa和id_rsa.pub这两个文件   

　　　　

　　二。登录Github,找到右上角的图标，打开点进里面的Settings，再选中里面的SSH and GPG KEYS，点击右上角的New SSH key，然后Title里面随便填，再把刚才id_rsa.pub里面的内容复制到Title下面的Key内容框里面，最后点击Add SSH key，这样就完成了SSHKey的加密。具体步骤也可看下面：

