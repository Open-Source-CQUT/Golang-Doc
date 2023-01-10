# 命令

这里会介绍一些Go的常用命令，熟悉常用命令的使用对于开发来说非常重要。



```text
    bug         bug报告
    build       编译包和依赖
    clean       清除缓存文件
    doc         展示文档
    env        	打印环境信息
    fix         根据新的API修复
    generate    生成go文件
    get         为当前模块下载依赖
    list        列出依赖
    mod         模块管理
    run         编译并运行go程序
    test        测试
    tool        特殊工具
    version     打印go版本
    vet         报告错误
```



## 版本

查看当前go的版本

用法：`go version`

输出：`go version go1.19.3 windows/amd64`



## 帮助

帮助指令，当遇到不懂的命令时，使用help指令可以查看命令的详细解释

```
go help cmd
```

或者

```
go cmd -h
```

可以查看命令的基本用法和参数格式



**示例**

查看基本用法

```
PS C:\Users\Stranger> go run -h
usage: go run [build flags] [-exec xprog] package [arguments...]
Run 'go help run' for details.
```

查看详细用法和解释

```
PS C:\Users\Stranger> go help run
usage: go run [build flags] [-exec xprog] package [arguments...]

Run compiles and runs the named main Go package.
Typically the package is specified as a list of .go source files from a single
directory, but it may also be an import path, file system path, or pattern
matching a single known package, as in 'go run .' or 'go run my/cmd'.
......
```



## 环境

查看环境配置

```
go env
```

- `usage: go env [-json] [-u] [-w] [var ...]`，env命令总共有四个参数
- `-json`：  env命令输出的默认是shell脚本格式的配置，加上此参数后会以json格式输出环境配置
- `-u` ：此参数是用于取消一个配置的默认参数，等于直接把值置为空值，需要跟var参数
- `-w`：此参数是用于永久修改环境配置



**示例**

json格式输出

```
PS C:\Users\Stranger> go env -json

{
        "AR": "ar",
        "CC": "gcc",
        "CGO_CFLAGS": "-g -O2",
        "CGO_CPPFLAGS": "",
        "CGO_CXXFLAGS": "-g -O2",
        "CGO_ENABLED": "1",
        "CGO_FFLAGS": "-g -O2",
        "CGO_LDFLAGS": "-g -O2",
        "CXX": "g++",
        ...
}
```

取消一个配置的默认参数

```
go env -u GOBIN
```

修改配置

```
go env -w GO111MODULE=on
```



::: tip

并不是所有配置都可以通过`go env -w`来修改，比如不能覆盖已有系统变量的配置

:::



#### 配置项

接下来介绍一下环境中几个比较重要的配置项



**GO111MODULE**

`GO111MODULE`是Go在1.11版本引入的依赖管理项，考虑到向下兼容，并没有抛弃原有的GOPATH，总共有三个参数值。

- `on`： 寻找依赖时只会根据`go.mod`文件下载依赖，也就是说完全忽略GOPATH
- `off`：寻找依赖时会在GOPATH和VENDER下寻找，忽略`go.mod`
- `auto`：自动判断，当在GOPATH目录下时，使用`off`的功能，在GOPATH目录外时，使用`on`的功能



**GOBIN**

`go install` 指定的安装目录



**GOCACHE**

用于存储使用Go命令而产生的缓存的目录



 **GOMODCACHE**

用于存储下载的依赖库的目录



**GOENV**

指定名为env的配置文件的存放位置，env文件就是`go env`的内容，无法使用`go env -w`覆盖，只能通过系统变量来设置



**GOPROXY**

GO下载依赖的代理，由于Go的仓库在国外，国内一般都要代理。



**GOROOT**

安装Go语言的根目录



**GOPATH**

曾经用于解决导入项目的配置，现在几乎不用了，直接无视都可以。



## 运行

基本用法：`go run [build flags] [-exec xprog] package [arguments...]`

基本功能就是编译二进制文件并运行，且为了减少构建时间不会生成供调试器使用的信息。

- `build flags`：是构建标志，后续在`build`命令时会讲到
- `-exec xprog`：用xprog执行二进制文件
- `arguments`：一些运行时参数



**示例**

运行当前目录下的go文件

```
go run .
```

运行指定目录下的go文件

```
'go run my/cmd
```



## 编译

基本用法：`go build [-o output] [build flags] [packages]`

基本功能就是根据导入的路径的编译命名，且会忽略掉测试文件，并生成可执行的二进制文件



**示例**

编译并在当前目录生成可执行的二进制文件

```
go build .
```

或者指定目录

```
go build ./example/ram 
```

在指定位置生成指定名称的二进制执行文件

```
go build -o ./example/myexe.exe .
```

以上的例子就是大多数开发会用到的，当然实际上能做的事情远远不只这么点。

```
 go build -gcflags="-N -l -S"
```

通过这个指令可以生成go汇编结果，

- `-l` 禁止内联 
- `-N` 编译时，禁止优化 
- `-S` 输出汇编代码

```
main.main STEXT size=190 args=0x0 locals=0x60 funcid=0x0 align=0x0
        0x0000 00000 (D:\WorkSpace\Code\GoLeran\gin_learn\main.go:5)    TEXT    main.main(SB), ABIInternal, $96-0
        0x0000 00000 (D:\WorkSpace\Code\GoLeran\gin_learn\main.go:5)    CMPQ    SP, 16(R14)
		...
```



## 提交错误

基本使用：`go bug`

使用该命令时会自动跳转到Github的issue页面，并会自动附带上控制台的输出。



## 文档

基本用法： 

```
Usage of [go] doc:
        go doc
        go doc <pkg>
        go doc <sym>[.<methodOrField>]
        go doc [<pkg>.]<sym>[.<methodOrField>]
        go doc [<pkg>.][<sym>.]<methodOrField>
        go doc <pkg> <sym>[.<methodOrField>]
       
```

输出注释文档



**示例**

直接输出包文档，包文档指的是`package`关键字上面的注释

```
go doc
```

指定包

```
go doc foo
```

指定函数

```
go doc template.new
```

指定方法

```
 go doc json.Number.Int64
```

