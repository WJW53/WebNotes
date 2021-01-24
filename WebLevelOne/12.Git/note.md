# Git

**`怎么说呢,总之一句话,干事儿前先备份到别的地方一份,再来探索git`**

my github's token:
```
wjwpush
e9ad67816f5c148b16f308190d6282fd94d03c3c
```

## Github 新建仓库 ，并与本地仓库进行连接

`新建的本地文件夹先不要装东西,保证空的最好,否则可能有证书、readme文件资源没对齐的问题`

`每次不要用HTTPS的地址,用ssh的!!!因为我配的密钥是ssh的!!!`
如果用了https的，那就进行以下操作

### git push的时候每次都要输入用户名和密码的问题解决
换了个ssh key,发现每次git push origin master的时候都要输入用户名和密码
原因是在添加远程库的时候使用了https的方式。。所以每次都要用https的方式push到远程库
查看使用的传输协议:
git remote -v
**重新设置成ssh的方式:**
```shell
git remote rm origin
git remote add origin git@github.com:username/repository.git
git push -u origin master
```
再看下当前的传输协议:
git remote -v

### 初始化本地仓库并连接到远程仓库
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


## Git 版本回退的几种操作方法
1， 结合使用 git reset --hard <commit id> , git reset --hard HEAD^,  git reflog , git log

　　1) 使用 git log 查看你需要回退版本的commit id, 如果git log显示的结果看着不舒服可以多加一个参数 --pretty=oneline (git log --pretty=oneline)

　　2)  使用git reset  --hard <commit id>

　　3)  在第2)的时候需要找到对应的commit id， 

　　　　Scenario 1 : 你已经回退到某个你指定的版本，但是你这时后悔了想再次回到最新的版本，可以通过 git reset --hard HEAD^ 实现。

　　　　Scenario 2 : 你已经回退到你指定的A版本，但是你实际上应该回退到A版本后面的B版本，你这是又无法通过 git log查看commit id；这时你可以执行git reflog找到B版本的commit id。

　　　　　　　　　　这时你可以通过第2）步的命令来实现。

 PS : 这种方法是不会再当前比较粗暴的方式，因为他不会保留你已经回退的版本之后版本的log（有点拗口），下面我们介绍一种回退到你指定的某个版本，并且保留log的方法

 

2，结合使用git checkout  <commit id> -- <paths>, git reflog, git commit -m 'xxxxxxx'

　　1) 使用git log 或者 git reflog 找到你想要回到的哪个版本的commit id

　　2) 使用 git checkout <commit id> -- <paths> 返回到你想要返回的版本， <paths>参数代表的是你想要指定哪个或者哪几个文件 

　　3) 执行完第2)步之后需要执行git commit -m '' 命令提交你当前的修改