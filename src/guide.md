#  入门指南

## 背景

Go语言诞生于2007年9月30日，由三位大佬共同创造，他们分别是Ken Thompson(贝尔实验室成员，Unix系统系统先驱，B语言创始人，C语言创始人)，Rob Pike （贝尔实验室成员，Unix系统先驱，UTF-8发明者之一，Go语言设计领头人），Robert Griesemer(JS V8引擎研发者，三人之中最年轻)，对了还有一位是领头人的妻子Renee French，她主导设计了Go语言的Logo，就是一只憨憨的土拨鼠，经过了三年的初步设计与研发，Go语言由谷歌公司于2009年11月10日正式以`BSD-3-Clause`协议开源，并推出了最初的版本，每半年发布一个二级版本，被称为21世纪的C语言。

![](/images/eggs.png)

::: tip

图中便是三位大佬设计Go语言的情景，里面不少典故和彩蛋。

:::



## 特性

- **语法简单** Go语言在自由度和灵活度上做了取舍，以此换来了更好的维护性和平滑的学习曲线。
- **部署友好** Go静态编译后的二进制文件不依赖额外的运行环境，编译速度也非常快。
- **交叉编译** Go仅需要在编译时简单设置两个参数，就可以编译出能在其它平台上运行的程序
- **天然并发** Go语言对于并发的支持是纯天然的，仅需一个关键字，就可以开启一个异步协程。
- **垃圾回收** Go有着优秀的GC性能，大部分情况下GC延时都不会超过1毫秒。
- **丰富的标准库** 从字符串处理到源码AST解析，功能强大且丰富的标准库是Go语言坚实的基础。
- **完善的工具链** Go有着完善的开发工具链，涵盖了编译，测试，依赖管理，性能分析等方方面面。



Go语言抛弃了继承，弱化了OOP，类，元编程，泛型，Lamda表达式等这些特性，拥有良好的性能和较低的上手难度，它非常适合用于云服务开发，应用服务端开发，甚至可以进行部分Linux嵌入式开发，不过由于带有垃圾回收，其性能始终无法媲美C/C++这类系统级语言。Go在其擅长的领域表现十分出色，虽然面世只有十余年不到，但已经有大量的行业将Go作为了首选语言。Go语言仍有不少的缺点，比如令人诟病的错误处理，残缺的泛型，标准库虽然很丰富但内置的数据结构却没几个等等，不过总的来说这是一门非常年轻且具有活力的现代语言，目前发展的劲头正盛。

此外，Go还是一门完全开源的语言，由社区和谷歌共同维护Go语言的发展，官方地址是在谷歌仓库里，Github上有一份同样的镜像仓库，如果有心你也可以参与到语言的设计当中。

谷歌仓库：[google/go](https://cs.opensource.google/go)

Github仓库：[golang/go: The Go programming language (github.com)](https://github.com/golang/go)

官方网站：[The Go Programming Language](https://go.dev/)

<br/>

## 安装

Go语言下载：[Downloads - The Go Programming Language](https://go.dev/dl/)

![](/images/download.png)

Stable Version指的是目前处于维护状态的两个稳定版本，Archived Version指的是不再维护的历史版本，关于历史信息可以前往[更新日志](/release.md)了解更多关于维护规则以及历史版本的信息。

### windows

对于windows平台而言，有installer和archive两种类型可选，前者就是安装包，只需要点点点，推荐使用后者，会让你更熟悉go语言的目录结构，未来出问题不至于手足无措。选择下载zip文件，压缩文件中包含go语言的源代码以及工具链和一些文档，将其解压指定的路径，然后需要配置两个系统环境变量。

- GOROOT - go语言的安装路径
- GOPATH - go语言依赖存放路径

设置好后，给系统环境变量`PATH`添加两条新的项

- `%GOROOT%\bin`：这是go二进制程序地址
- `%GOPATH%\bin`：这是未来会下载第三方依赖的二进制文件存放地址

在`powershell`中执行`go version`命令，最后能正常显示版本就说明安装正确。

```powershell
PS C:\user\username> go version
go version go1.21.3 windows/amd64
```

更新的话只需要下载新的zip覆盖原安装目录即可。



### linux

拿ubuntu举例，复制想要的版本的链接，下载到本地

```sh
$ wget https://golang.google.cn/dl/go1.21.1.linux-amd64.tar.gz
```

解压到指定目录

```sh
$ tar -C ~/go -xzf go1.21.1.linux-amd64.tar.gz
```

在`$HOME/.bashrc`文件中设置环境变量

```sh
export GOROOT=$HOME/go
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

完成后查看安装版本，确认正确安装

```sh
$ go version
go version go1.21.1 linux/amd64
```

更新的话只需要下载新的tar.gz覆盖原安装目录即可。

<br/>



### 自定义

只是基本使用而言，上面的安装方式对于基本使用已经够用了，个人推荐用以下的目录结构来存放go语言及其衍生文件

```
go/
|
|--root/
|	|
|	|--go1.21.3/
|	|
|	|--go1.20.10/
|
|--mod/
|	|
|	|--bin/
|	|
|	|--libs/
|	|
|	|--pkg/
|	
|--cache/
|
|--temp/
|
|--env
```
释义如下

- `go/root`目录用于存放各个版本go语言源文件
- `go/mod`对应`GOAPTH`
- `go/mod/libs`对应`GOMODCACHE`，也就是下载的第三方依赖存放地址
- `go/mod/bin`对应`GOBIN`，第三方依赖二进制文件存放地址
- `go/cache`，对应`GOCACHE`，存放缓存文件
- `go/temp`，对应`GOTMPDIR`，存放临时文件
- `go/env`，对应`GOENV`，全局环境变量配置文件

该方式更新时不需要覆盖原安装目录，只需要将其存放到`go/root`目录下，然后修改`GOROOT`系统环境变量为该目录下指定版本的文件夹即可。在默认情况下env文件是读取的路径`GOROOT/env`，通过设置`GOENV`系统变量将其与`GOROOT`分离开，避免了因版本变更时go环境变量配置的变化，下面是`env`文件的初始设置。

```ini
GO111MODULE=on
GOCACHE=go/cache
GOMODCACHE=go/mod/libs
GOBIN=go/mod/bin
GOTMPDIR=go/temp
```

这只是笔者比较喜欢的一个目录风格，前往[命令-环境变量](/cmd#env)了解更多关于环境变量的信息，你可以完全按照个人喜好来进行自定义。



### 编辑器

主流的go语言IDE目前个人只推荐下面两个

1. goland：jetbrain出品，功能强大，全方位支持，不过需要付费，可以考虑IDEA社区版配合插件
2. vscode：无需付费，万能的编辑器，有插件加持什么语言都能写

如果有其它的编辑器更符合自身的使用习惯也都可以用，用什么编辑器倒无所谓，如果只是写一些简短的练习代码，可以试试官方提供的[goplay](https://go.dev/play/)，可以在线运行go代码。



## 介绍

下面对本站的内容进行一个简单的介绍，以便各位可以按需阅读，部分页面是空白的代表着还未更新。

- 语言入门：主要讲解关于Go语言本身的内容，偏理论。
    - [语法基础](/essential/base/)：主要讲一些十分基础的语法，像是`if`，`for`之类的语法规则。
    - [语法进阶](/essential/senior/)：讲一些Go独有的东西，关于模块，测试，协程等相关内容。
    - [标准库](/essential/std/)：对Go自带的标准库的一个简单介绍，因为标准库的内容实在太过庞大所以随缘更新。
    - [实现原理](/essential/impl/)：主要讲Go语言的一些内部设计原理，比如协程调度，内存管理，垃圾回收等。
- 社区生态：主要讲解Go周边的生态，偏应用。
    - [数据库](/community/database/)：通过Go操作主流的数据库。
    - [微服务](/community/micro/)：介绍一些与Go有关的微服务工具。
    - [第三方库](/community/pkgs/)：介绍一些由Go编写的第三方库，随缘更新，也可以直接在[依赖导航](/deb.md)里面查看。

前往[准备开始](/essential/base/0.ready.md)进行入门学习。


## 寄语

虽然Go语言整体难度并不高，但在学习的过程中遇到琢磨不透的困难可以先跳过，学习任何一门语言都是先笼统的了解这个语言的大致语法与结构，再去深究一些特性和细节，文档中的理念也是如此，适合入门学习。笔者本人也仅仅只是一名普通学生，难免会有疏漏和勘误，如果有发现任何错误可以在Github提交PR，如果觉得文档还不错可以在Github上点一个Star。



