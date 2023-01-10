#  入门指南

Go语言诞生于2006年1月2日下午15点04分，由三位大佬共同创造，他们分别是`Ken Thompson`(贝尔实验室成员，Unix系统系统先驱，B语言创始人，C语言创始人)，`Rob Pike `（贝尔实验室成员，Unix系统先驱，UTF-8发明者之一，Go语言设计领头人），`Robert Griesemer`(JS V8引擎研发者，三人之中最年轻)，对了还有一位是领头人的妻子`Renee French`，她主导设计了Go语言的Logo，就是一只憨憨的土拨鼠，经过了三年的初步设计与研发，Go语言由谷歌公司于2009年11月10日正式以`BSD-3-Clause`协议开源，并推出了最初的版本，每半年发布一个二级版本，被称为21世界的C语言。

![](https://camo.githubusercontent.com/2b507540e2681c1a25698f246b9dca69c30548ed66a7323075b0224cbb1bf058/68747470733a2f2f676f6c616e672e6f72672f646f632f676f706865722f6669766579656172732e6a7067)

::: tip

图中便是三位大佬设计Go语言的情景，里面不少典故和彩蛋。

:::

## 特性

- **语法简单** Go在自由与灵活上做了取舍，以此换来了更好的维护性和更低的学习难度。
- **交叉编译** 允许跨平台编译代码。
- **天然并发** Go语言对并发的支持是纯天然的，仅仅只需要一个`go`关键字就能开启一个协程。
- **垃圾回收**  GC算不上很出色，但比较靠谱。
- **静态链接** 简化了部署操作，无需安装任何运行环境和诸多第三方库。
- **内存分配** 可以说，除偶尔因性能问题而被迫采用对象池和自主内存管理外，基本无须参与内存管理操作。



Go语言仓库地址：[golang/go: The Go programming language (github.com)](https://github.com/golang/go)

Go语言官网：[The Go Programming Language](https://go.dev/)

此外，Go还是一门完全开源的语言，由开源社区和官方共同维护Go语言的发展，官方地址是在谷歌仓库里，但是Github上有一份同样的镜像仓库。

<br/>

## 安装

Go语言下载：[Downloads - The Go Programming Language](https://go.dev/dl/)



官方已经将所有打包好的安装包放在了`Featured downloads`一栏，根据自己的平台选择即可，由于安装包是自动配置所有的环境变量，如果修改了安装路径就需要后续自行配置所有的环境变量，安装完毕后在打开命令行输入`go version`：

```powershell
PS C:\Users\Stranger> go version
go version go1.19.3 windows/amd64
```

能够正确显示版本即可。

<br/>



## 开发工具



#### Vscode

Vscode是一款开源的代码编辑器，有许多拓展和插件，支持许多语言，也包括Go语言。

教程：[(82条消息) VSCode搭建Go开发环境（2020-04-13更新）_闹闹吃鱼的博客-CSDN博客_vscode配置go语言开发环境](https://blog.csdn.net/AdolphKevin/article/details/105480530)

<br/>

#### Goland

Goland是JetBrain旗下的为Go语言打造的智能编辑器，不过由于要付费，请根据自身情况选择。

教程：[(82条消息) Go语言下载安装教程|Goland配置教程|2021|Windows_付友友友的博客-CSDN博客_goland社区版](https://blog.csdn.net/m0_46685221/article/details/115051174)



## 快速开始

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
```

输出

```
Hello, 世界

Program exited.
```



当一切准备好后，就可以开始学习Go的基础语法了。



## 寄语

在学习的过程中遇到琢磨不透的困难可以先跳过，学习任何一门语言都是先笼统的了解这个语言的大致语法与结构，再去深究一些特性和细节，教程中的理念也是如此，适合入门学习。笔者本人也仅仅只是一名普通学生，难免会有疏漏和勘误，如果有发现任何错误可以在Github提交PR，如果觉得文档还不错可以在Github上点一个Star。



