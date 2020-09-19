# yarn 的核心命令

1. **初始化**

初始化：```yarn init [--yes/-y]```

2. **安装**

- 虽然yarn支持全局安装, 但yarn不建议全局安装(但后面学脚手架一定要全局安装)


`针对全局安装的：`

```
yarn global bin命令查看yarn全局安装包路径
ps: C:\nodejs\node_global\bin
把它加入到系统变量中
```

添加指定包：```yarn [global] add package-name [--dev/-D] [--exact/-E]```

安装package.json中的所有依赖：```yarn install [--production/--prod]```

3. **脚本和本地CLI**

运行脚本：```yarn run 脚本名``` 

> start、stop、test可以省略run

运行本地安装的CLI：```yarn run CLI名```

4. **查询**

查看bin目录：```yarn [global] bin```

查询包信息：```yarn info 包名 [子字段]```  , 一般都要加上子字段的

列举已安装的依赖：```yarn [global] list [--depth=依赖深度]```

> yarn的list命令和npm的list不同，yarn输出的信息更加丰富，包括顶级目录结构、每个包的依赖版本号

5. **更新**

列举需要更新的包：```yarn outdated```

更新包：```yarn [global] upgrade [包名]```

6. **卸载**

卸载包：```yarn remove 包名```


7. **另外**

yarn add lodash@3.5.0 就会安装成指定的这个版本,.json中的dependencies不会加上^,我们也不能手动加, 因为它要保证和.lock文件中的一致,避免出错.导致无法检测能否升级,因为是确切版本依赖
所以如果想有^, 我们安装的时候就不要指定@版本号

> 所以, json和lock这两个文件如果有出入, 可能也会引起很多问题, 所以删除东西的时候最好这俩都搞干净(删除所有包的话: 删除lock文件,清除json里的dependencies和devDependencies,删除node_modules), 然后重新配置. 要么就用remove命令卸载!这样它会自动把json lock文件配置好

8. 配置登录发布包啥的还是得用npm,一般不会用yarn