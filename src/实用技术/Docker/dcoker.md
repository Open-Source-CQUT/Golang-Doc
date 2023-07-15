# Docker

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307152047981.png)

docker是一款非常出名的项目，它是由go语言编写且完全开源。docker去掉了传统开发过程中的繁琐配置这一步，让开发者可以更加快速的构建应用。到目前为止，docker提供了桌面端，CLI命令行，SDK，以及WebApi几种方式以供开发者选用。

::: tip

这部分文章主要关注点在CLI命令行，其他几种方式请自行了解。

:::

其实自己很早就用过docker，但是没有进行过一个系统的归纳，写下这些内容也是对自己的学习进行一个总结。Docker这块主要分为两大部分，前半部分主要讲怎么使用docker，后半部分会讲docker的一些原理（如果还有时间的话），先学会用再去深究这是我一直以来的理念。





## 一些链接

### 官网

官网：[Docker: Accelerated, Containerized Application Development](https://www.docker.com/)

docker官网，这里什么信息都有。



### 仓库

开源仓库：[moby/moby: Moby Project - a collaborative project for the container ecosystem to assemble container-based systems (github.com)](https://github.com/moby/moby)

docker使用过程中，如果遇到问题，直接来仓库提issue是最有效的方法（能搜就别问了），如果有能力提pr就更好了。



### 文档

文档地址：[Docker Docs: How to build, share, and run applications | Docker Documentation](https://docs.docker.com/)

docker的官方文档，使用指南，使用手册，API文档，详细到每一个命令的作用都有解释，也会教你怎么开始使用docker，怎么安装怎么卸载，不过是全英文。