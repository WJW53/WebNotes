# 1-2 全局对象

智能提示先安装:  npm i -D @types/node

## global

obj.global = obj;

类似window.window的做法

## setTimeout && setInterval

返回结果不再是数字了,在node环境中的返回结果是一个对象

## setImmidiate

类似于是setTimeout时间参数为0, 但当然不是这么简单哈, 还有很多不同

## console

global中的一个属性

## __dirname

1. 获取当前模块所在的目录, 挺常用的
2. 不是global中的属性, 那么哪儿来的呢, 后续会讲

## __filename

1. 获取当前模块的文件路径
2. 不是global中的属性

## Buffer

类型化数组

继承自UInt8Array(这个数组里面,每个数字是0-255的数字,因为是无符号整数且8位嘛)

计算机中存储的基本单位: 字节

使用时、输出时 往往可能需要用16进制表示, 为啥, 看袁老大博客


## process

它的属性:

- cwd(): `返回当前nodejs进程的工作目录, 是绝对路径, 平时要用`
- exit(): 强制退出当前node进程, 可传入退出码, 0表示成功退出, 默认为0
- argv: String[], 获取命令中的所有参数
- platform: 获取当前的操作系统. 我得到了win32, 为啥呢, 这代表是支持32位或32位以上的API
- kill(pid): 根据进程ID杀死进程, 任务管理器中的详细信息里有进程ID
- env: 平时要用, 获取环境变量对象