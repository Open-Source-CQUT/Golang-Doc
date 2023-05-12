# gopsutils

仓库：[shirou/gopsutil: psutil for golang (github.com)](https://github.com/shirou/gopsutil)

文档：[gopsutil package - github.com/shirou/gopsutil/v3 - Go Packages](https://pkg.go.dev/github.com/shirou/gopsutil/v3)



平常在开发时，免不了需要获取程序所允许的平台系统信息，过程中涉及不同操作系统的系统调用，为了做适配需要花费大量的工作和时间，而gopsutils是一个使用go语言开发的系统信息库，它底层兼容许多主流的操作系统，目前支持以下系统架构：

- FreeBSD i386/amd64/arm
- Linux i386/amd64/arm(raspberry pi)
- Windows i386/amd64/arm/arm64
- Darwin amd64/arm64
- OpenBSD amd64 (Thank you @mpfz0r!)
- Solaris amd64 (developed and tested on SmartOS/Illumos, Thank you @jen20!)

部分支持:

- CPU on DragonFly BSD
- host on Linux RISC-V 

并且该工具还支持获取Docker容器的系统信息。



## 安装

使用go get命令安装

```
go get github.com/shirou/gopsutil/v3
```



::: tip

笔者在写这篇文章时是在Win10系统上，不同的系统结果会有所不同。

:::

## CPU

## 磁盘

## 内存

## 网络

## 进程