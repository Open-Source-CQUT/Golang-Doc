# 入门指南

![](/images/eggs.png)

本文会引导你如何入门学习Go语言，仅从语法层面上来讲它并不难学，你大概几天就可以上手。不过按照惯例，在正式开始之前，我们需要先来了解下它的背景和起源。

## 背景

Go 语言由三位大佬共同创造，他们分别是

- [Ken Thompson](https://github.com/ken)，图灵奖获得者，Unix 系统创始人，B 语言创始人，C 语言创始人
- [Rob Pike](https://github.com/robpike)，Plan9 操作系统作者之一，UTF-8 发明者之一，Go 语言设计领头人
- [Robert Griesemer](https://github.com/griesemer)，JS V8 引擎研发者，三人之中最年轻

还有一位是 Rob Pike 的妻子 Renee French，她设计了 Go 语言的 Logo，就是一只蓝色的土拨鼠。

![](/gopher.jpg)

在某一天，三位工程师在漫长的 C++项目编译等待过程中感到十分无聊，正是在这个时刻，Rob Pike
脑海中突然闪现出一个新颖的构想：他希望设计一种简洁、小巧、编译快速，同时拥有不俗性能的编程语言，这样他们就不再需要每次编译时都面临漫长的等待。经过一番短暂的头脑风暴，三人于
2007 年 9 月 20 日召开了一个简短的会议，开始讨论和设计这门语言的初步原型，正是从这个时刻起，Go
语言正式诞生了。随后，这个小团队吸引了越来越多的志同道合的开发者，最终在 2009 年 11 月 10 日，谷歌公司正式将 Go 语言以
BSD-3-Clause 协议开源，并推出了第一个先行版本，并组建了正式的开发团队。

::: tip

值得一提的是，你可能会在其它地方看见有人叫它Golang，包括本站的Github仓库名也叫Golang-Doc，但它的官方名字其实是一直是Go，早期的时候由于go这个域名被抢注了，所以官网的域名就采用了
`golang.org`，以至于后面新来的人误以为它就叫Golang。

:::

![这是官网最初的样子](/golang.jpg)

再之后，Go团队经过了三年的设计与研发，于 2012 年 3 月发布了第一个正式版本 Go1.0（这个时候 Go 的工具链和运行时都还是 C
语言编写的，直到 Go1.5 才完成自举），此后每一年发布两个小版本更新，一直运营和维护到现在。

三位创始人其实在很早以前就退隐了，在大部分时间里，团队领头人是[Russ Cox](https://github.com/rsc)，他早在 Go
语言未对外发布时就已经参与到了开发工作当中，此后一直管理 Go 团队长达 12 年，直到 2024 年 8
月卸任，由[Austin Clements](https://github.com/aclements)接手并领导后续的开发工作。、

如果你想深入了解 Go 语言的历史，前往[Go History](https://golang.design/history/)了解更多内容。



## 特性

- **语法简单** Go 语言在自由度和灵活度上做了取舍，以此换来了更好的维护性和平滑的学习曲线。
- **部署友好** Go 静态编译后的二进制文件不依赖额外的运行环境，编译速度也非常快。
- **交叉编译** Go 仅需要在编译时简单设置两个参数，就可以编译出能在其它平台上运行的程序
- **天然并发** Go 语言对于并发的支持是纯天然的，仅需一个关键字，就可以开启一个异步协程。
- **垃圾回收** Go 有着优秀的 GC 性能，大部分情况下 GC 延时都不会超过 1 毫秒。
- **丰富的标准库** 从字符串处理到源码 AST 解析，功能强大且丰富的标准库是 Go 语言坚实的基础。
- **完善的工具链** Go 有着完善的开发工具链，涵盖了编译，测试，依赖管理，性能分析等方方面面。

Go 语言抛弃了继承，弱化了 OOP，类，元编程，泛型，Lamda 表达式等这些特性，拥有良好的性能和较低的上手难度，它适合用于云服务开发，应用服务端开发，以及网络编程。它自带 GC，不需要开发者手动管理内存，静态编译和交叉编译这两点对于运维而言也十分友好。

Go 语言的缺点同样也有很多，比如令人诟病的错误处理，残缺的泛型，标准库虽然很丰富但内置的数据结构却没几个，`interface{}`类型满天飞，没有枚举类型，除此之外，Go 开发团队非常固执己见，不善于听取社区意见等等。（相比之下，Rust 在错误处理，泛型，依赖管理，枚举，接口等方面做的要好得多）

总的来说，我们需要辩证的看待一门语言，作为一门工程化的语言，Go 可以很大程度上提高团队的下限，就算开发人员水平再差也能兜底，很少出现一颗老鼠屎坏了一锅粥这种情况，同时因为简单的语法和较低的学习难度，可以让人很快的上手一个项目。尽管 Go 面世只有十余年不到，但已经有相当多的公司将 Go 作为了首选语言，也能侧面说明 Go 正在逐渐流行起来。

顺便一提，Go 还是一门完全开源的语言，由社区和谷歌共同维护 Go 语言的发展，官方地址是在谷歌仓库里，Github 上有一份同样的镜像仓库，如果有心你也可以参与到语言的设计当中。

官方网站：[The Go Programming Language](https://go.dev/)

谷歌开源仓库：[google/go: Google Open Source](https://cs.opensource.google/go)

Github 仓库：[golang/go: The Go programming language](https://github.com/golang/go)

::: tip

笔者曾经给 Go 提过 PR，如果你想了解如何给 Go 贡献代码，可以看看我写的这篇文章：[如何向 Go 贡献代码](https://246859.github.io/posts/code/go/contribute2go.html)。

:::

相信很多人应该都或多或少听说过[Rust](https://www.rust-lang.org/zh-CN/)，它是一个高性能的通用编程语言，其诞生时间比 Go 早一年，Go1 正式发布的时间是 2012 年，Rust 正式版发布时间为 2015 年，它们都是较为现代化的语言，这两门语言笔者都很喜欢，它们发展的领域各不相同，如果你不满足于 Go 的运行效率和表达能力，不妨试试 Rust，不过它的学习难度就远没有 Go 这么简单了。

## 安装

Go 语言下载：[Downloads - The Go Programming Language](https://go.dev/dl/)

![](/images/download.png)

Stable Version 指的是目前处于维护状态的两个稳定版本，Archived Version 指的是不再维护的历史版本，前往[更新日志](/release.md)了解更多关于维护规则以及历史版本的信息。

### windows

对于 windows 平台而言，有 installer 和 archive 两种类型可选，前者就是安装包，只需要点点点，推荐使用后者，会让你更熟悉 go 语言的目录结构，未来出问题不至于手足无措。选择下载 zip 文件，压缩文件中包含 go 语言的源代码以及工具链和一些文档，将其解压指定的路径，然后需要配置两个系统环境变量。

- GOROOT - go 语言的安装路径
- GOPATH - go 语言依赖存放路径

设置好后，给系统环境变量`PATH`添加两条新的项

- `%GOROOT%\bin`：这是 go 二进制程序地址
- `%GOPATH%\bin`：这是未来会下载第三方依赖的二进制文件存放地址

在`powershell`中执行`go version`命令，最后能正常显示版本就说明安装正确。

```powershell
PS C:\user\username> go version
go version go1.21.3 windows/amd64
```

更新的话只需要下载新的 zip 覆盖原安装目录即可。

### linux

拿 ubuntu 举例，复制想要的版本的链接，下载到本地

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

更新的话只需要下载新的 tar.gz 覆盖原安装目录即可。

### 安装管理

上面的安装方式对于基本使用已经够用了，个人推荐用以下的目录结构来存放 go 语言及其衍生文件

```
go/
|
|--root/
|  |
|  |--go1.21.3/
|  |
|  |--go1.20.10/
|
|--mod/
|  |
|  |--bin/
|  |
|  |--libs/
|
|--cache/
|
|--temp/
|
|--env
```

释义如下

- `go/root`目录用于存放各个版本 go 语言源文件
- `go/mod`对应`GOAPTH`
- `go/mod/libs`对应`GOMODCACHE`，也就是下载的第三方依赖存放地址
- `go/mod/bin`对应`GOBIN`，第三方依赖二进制文件存放地址
- `go/cache`，对应`GOCACHE`，存放缓存文件
- `go/temp`，对应`GOTMPDIR`，存放临时文件
- `go/env`，对应`GOENV`，全局环境变量配置文件

该方式更新时不需要覆盖原安装目录，只需要将其存放到`go/root`目录下，然后修改`GOROOT`系统环境变量为该目录下指定版本的文件夹即可。在默认情况下 env 文件是读取的路径`GOROOT/env`，通过设置`GOENV`系统变量将其与`GOROOT`分离开，避免了因版本变更时 go 环境变量配置的变化，下面是`env`文件的初始设置。

```ini
GO111MODULE=on
GOCACHE=go/cache
GOMODCACHE=go/mod/libs
GOBIN=go/mod/bin
GOTMPDIR=go/temp
```

这只是笔者比较喜欢的一个目录风格，前往[命令-环境变量](/cmd#env)了解更多关于环境变量的信息，你可以完全按照个人喜好来进行自定义。

### 多版本管理

我编写了一个多版本管理工具[govm](https://github.com/Open-Source-CQUT/govm/blob/main/README.zh.md)，结合上面目录结构使用效果最佳。它可以管理本地多个 Go 版本，可以随时切换版本，也可以搜索并下载其他 Go 版本并将其安装到本地。

```bash
$ govm search 1.22 -n 10
go1.22.6           76 MB
go1.22.5           76 MB
go1.22.4           76 MB
go1.22.3           76 MB
go1.22.2           76 MB
go1.22.1           76 MB
go1.22.0           76 MB

$ govm install 1.22.4
Fetch go1.22.4 from https://dl.google.com/go/go1.22.4.windows-amd64.zip
Downloading go1.22.4.windows-amd64.zip 100% |████████████████████████████████████████| (76/76 MB, 32 MB/s) [2s]
Extract go1.22.4.windows-amd64.zip to local store
Remove archive from cache
Version go1.22.4 installed

$ govm use 1.22.4
Use go1.22.4 now

# 重新登陆shell
$ go version
go version go1.22.4 windows/amd64
```

如果你想了解如何用 Go 编写命令行工具，不嫌弃的话可以将 govm 作为一个项目参考，它也是由 Go 编写的。

### 编辑器

主流的 go 语言 IDE 目前个人只推荐下面两个

1. goland：jetbrain 出品，功能强大，全方位支持，不过需要付费，可以考虑 IDEA 社区版配合插件
2. vscode：无需付费，万能的编辑器，有插件加持什么语言都能写

如果有其它的编辑器更符合自身的使用习惯也都可以用，用什么编辑器倒无所谓，如果只是写一些简短的练习代码，可以试试官方提供的[goplay](https://go.dev/play/)，可以在线运行 go 代码。

::: tip

如果你正在使用 JetBrains Toolbox，可以尝试我写的一个命令行工具[AutoToolBox](https://github.com/246859/AutoToolBox)，可以为 Toolbox 生成 windows 右键菜单，效果图如下。

<img src="https://github.com/246859/AutoToolBox/raw/main/image/preview.png" style="zoom: 67%;" />

:::

## 寄语

Go 语言整体难度并不高，如果你有其他语言基础学起来会非常简单，在学习的过程中遇到琢磨不透的难点可以先跳过，学习任何一门语言都是先笼统的了解这个语言的大致语法与结构，再去深究一些特性和细节，文档中的理念也是如此，适合入门学习。笔者本人也仅仅只是一名普通学生，难免会有疏漏和勘误，如果有发现任何错误可以在 Github 提交 PR，如果觉得文档还不错可以在 Github 上点一个 Star。

如果你是强 OOP 语言的开发者，比如 Java，C#等，请不要带着 OOP 的思想先入为主，否则会对 go 的很多设计感到匪夷所思，在编写代码的时候也会非常难受，笔者最开始也是这样。

## 概览

下面对本站的内容进行一个简单的介绍，以便各位可以按需阅读，部分页面是空白的代表着还未更新。

- 语言入门：主要讲解关于 Go 语言本身的内容，偏理论。
  - [语法基础](/essential/base/)：主要讲一些十分基础的语法，像是`if`，`for`之类的语法规则。
  - [语法进阶](/essential/senior/)：讲一些 Go 独有的东西，关于模块，测试，协程等相关内容。
  - [标准库](/essential/std/)：对 Go 自带的标准库的一个简单介绍，因为标准库的内容实在太过庞大所以随缘更新。
  - [实现原理](/essential/impl/)：主要讲 Go 语言的一些内部设计原理，比如协程调度，内存管理，垃圾回收等。
- 社区生态：主要讲解 Go 周边的生态，偏应用。
  - [数据库](/community/database/)：通过 Go 操作主流的数据库。
  - [微服务](/community/micro/)：介绍一些与 Go 有关的微服务工具。
  - [第三方库](/community/pkgs/)：介绍一些由 Go 编写的第三方库，随缘更新，也可以直接在[依赖导航](/deb.md)里面查看。

前往[准备开始](/essential/base/0.ready.md)进行入门学习
