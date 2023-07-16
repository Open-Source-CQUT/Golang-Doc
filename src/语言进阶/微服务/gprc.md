# GPRC

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161153673.png)

远程过程调用rpc应该是微服务当中必须要学习的一个点了，在学习的过程中会遇到各式各样的rpc框架，不过在go这个领域，几乎所有的rpc框架都是基于gprc的，并且它还成为了云原生领域的一个基础协议，为什么选择它，官方如下回答：

> GRPC 是一个现代化的开源高性能远程过程调用(Remote Process Call，RPC)框架，可以在任何环境中运行。它可以通过可插拔的负载平衡、跟踪、健康检查和身份验证支持，有效地连接数据中心内和数据中心之间的服务。它还适用于连接设备、移动应用程序和浏览器到后端服务的最后一英里分布式计算。

官方网址：[gRPC](https://grpc.io/)

官方文档：[Documentation | gRPC](https://grpc.io/docs/)

ProtocBuf官网：[Reference Guides | Protocol Buffers Documentation (protobuf.dev)](https://protobuf.dev/reference/)

它也是CNCF基金会下一个的开源项目，CNCF全名CLOUD NATIVE COMPUTING FOUNDATION，译名云原生计算基金会

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161210568.png)

## 特点

**简单的服务定义**

使用Protocol Buffers 定义服务，这是一个强大的二进制序列化工具集和语言。

**启动和扩容都十分迅捷**

只需一行代码即可安装运行时和开发环境，仅需几秒钟既可以扩张到每秒数百万个RPC

**跨语言，跨平台**

根据不同平台不同语言自动生成客户端和服务端的服务存根

**双向流和集成授权**

基于HTTP/2的双向流和可插拔的认证授权



虽然GRPC是语言无关的，但是本站的内容大部分都是go相关的，所以本文也会使用go作为主要语言进行讲解，后续用到的pb编译器和生成器如果是其他语言的使用者可以自行到Protobuf官网查找。为了方便起见，接下来会直接省略项目的创建过程（如果不会请先阅读基础教程）。



## 依赖安装

先下载Protocol Buffer编译器，下载地址：[Releases · protocolbuffers/protobuf (github.com)](https://github.com/protocolbuffers/protobuf/releases)

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161253131.png)

根据自己的情况选择系统和版本即可，下载完成后需要将bin目录添加到环境变量中。

然后还要下载代码生成器，编译器是将proto文件生成对应语言的序列化代码，生成器是用于生成业务代码。

```sh
$ go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
$ go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

创建一个空的项目，名字这里取grpc_learn，然后引入如下依赖

```sh
$ go get google.golang.org/grpc
```

最后看一下版本，是不是真的安装成功了

```sh
$ protoc --version
libprotoc 23.4

$ protoc-gen-go --version
protoc-gen-go.exe v1.28.1

$ protoc-gen-go-grpc --version
protoc-gen-go-grpc 1.3.0
```

## Hello World

### 项目结构

下面将以一个Hello World示例来进行演示，创建如下的项目结构。

```
grpc_learn
|   go.mod
|   go.sum
|
+---client
|   |   main.go
|   |
|   \---protoc
\---server
    |   main.go
    |
    \---protoc
            hello.proto
```

### 定义protobuf文件

其中，在`server/protoc/hello.proto`中，写入如下内容，这是一个相当简单的示例，如果不会protoc语法，请移步相关教程。

```protobuf
syntax = "proto3";

option go_package = ".;service";

// 请求
message HelloReq {
  string name = 1;


// 响应
message HelloRep {
  string msg = 1;
}

// 定义服务
service SayHello {
  rpc Hello(HelloReq) returns (HelloRep) {}
}
```

### 生成代码

编写完成后，使用protoc编译器生成数据序列化相关的代码，使用生成器生成rpc相关代码

```
protoc --go_out=server/protoc server/protoc/*.proto
protoc --go-grpc_out=server/protoc server/protoc/*.proto
```

此时可以发现文件夹生成了`hello.pb.go`和`hello_grpc.pb.go`文件，浏览`hello.pb.go`可以发现我们定义的message

```go
type HelloReq struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

    // 定义的字段
	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

type HelloRep struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

   	// 定义的字段
	Msg string `protobuf:"bytes,1,opt,name=msg,proto3" json:"msg,omitempty"`
}
```

在`hello_grpc.pb.go`中可以发现我们定义的服务

```go
type SayHelloServer interface {
	Hello(context.Context, *HelloReq) (*HelloRep, error)
	mustEmbedUnimplementedSayHelloServer()
}

// 后续如果我们自己实现服务接口，必须要嵌入该结构体，就不用实现mustEmbedUnimplementedSayHelloServer方法
type UnimplementedSayHelloServer struct {
}

// 默认返回nil
func (UnimplementedSayHelloServer) Hello(context.Context, *HelloReq) (*HelloRep, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Hello not implemented")
}

// 接口约束
func (UnimplementedSayHelloServer) mustEmbedUnimplementedSayHelloServer() {}

type UnsafeSayHelloServer interface {
	mustEmbedUnimplementedSayHelloServer()
}
```

### 编写服务端

在`server/main.go`中编写如下代码

```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	pb "grpc_learn/server/protoc"
	"log"
	"net"
)

type GrpcServer struct {
	pb.UnimplementedSayHelloServer
}

func (g *GrpcServer) Hello(ctx context.Context, req *pb.HelloReq) (*pb.HelloRep, error) {
	log.Printf("received grpc req: %+v", req.String())
	return &pb.HelloRep{Msg: fmt.Sprintf("hello world! %s", req.Name)}, nil
}

func main() {
	// 监听端口
	listen, err := net.Listen("tcp", ":8080")
	if err != nil {
		panic(err)
	}
	// 创建gprc服务器
	server := grpc.NewServer()
	// 注册服务
	pb.RegisterSayHelloServer(server, &GrpcServer{})
	// 运行
	err = server.Serve(listen)
	if err != nil {
		panic(err)
	}
}
```

### 编写客户端

在`client/main.go`中写入如下代码

```go
package main

import (
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	pb "grpc_learn/server/protoc"
	"log"
)

func main() {
    // 建立连接，没有加密验证
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	// 创建客户端
	client := pb.NewSayHelloClient(conn)
	// 远程调用
	helloRep, err := client.Hello(context.Background(), &pb.HelloReq{Name: "client"})
	if err != nil {
		panic(err)
	}
	log.Printf("received grpc resp: %+v", helloRep.String())
}
```

### 运行

先运行服务端，再运行客户端，服务端输出如下

```
2023/07/16 16:26:51 received grpc req: name:"client"
```

客户端输出如下

```
2023/07/16 16:26:51 received grpc resp: msg:"hello world! client"
```

在本例中，客户端建立好连接后，在调用远程方法时就跟调用本地方法一样，直接访问`client`的`Hello`方法并获取结果。这就是一个最简单的GRPC例子



## 流式通信

grpc的通信方式有两大类，一元RPC（Unary RPC）和流式RPC（Stream RPC）。Hello World中的示例就是一个典型的一元RPC。

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162029789.png)

一元rpc就跟普通的http一样，客户端请求，服务端返回数据。流式RPC的请求和响应可以是流式的，如下图

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162033200.png)

使用流式请求时，客户端可以通过流来多次发起rpc请求给服务端，使用流式响应时，服务端可以通过流多次返回响应给客户端。可以是只有请求是流式的（Client-Streaming RPC），也可以是只有响应是流式的（Server-Streaming RPC），或者请求和响应都是流式的（Bi-driectional-Streaming RPC）