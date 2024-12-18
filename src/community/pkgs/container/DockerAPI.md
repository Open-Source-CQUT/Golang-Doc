# DockerAPI

文档：[Develop with Docker Engine SDKs | Docker Documentation](https://docs.docker.com/engine/api/sdk/)

DockerAPI是Docker的SDK，以编程的方式与Docker进行交互，例如拉取镜像，运行容器，这个文档只是简单的讲解如何去使用DockerAPI，在官方文档中对每一个API有着更详细的解释。官方API只有Go和Python版本，并且Docker本身也支持HTTP进行交互，如果是其他语言的话可以使用第三方社区开源的SDK，本教程将采用Go语言进行讲解。

## 安装

使用Go Get 安装Docker Client。

```
go get github.com/docker/docker/client
```
