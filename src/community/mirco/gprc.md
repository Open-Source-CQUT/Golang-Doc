# gPRC

![](/images/grpc/cover.png)

远程过程调用 rpc 应该是微服务当中必须要学习的一个点了，在学习的过程中会遇到各式各样的 rpc 框架，不过在 go 这个领域，几乎所有的 rpc 框架都是基于 gRPC 的，并且它还成为了云原生领域的一个基础协议，为什么选择它，官方如下回答：

> gRPC 是一个现代化的开源高性能远程过程调用(Remote Process Call，RPC)
> 框架，可以在任何环境中运行。它可以通过可插拔的负载平衡、跟踪、健康检查和身份验证支持，有效地连接数据中心内和数据中心之间的服务。它还适用于连接设备、移动应用程序和浏览器到后端服务的最后一英里分布式计算。

官方网址：[gRPC](https://grpc.io/)

官方文档：[Documentation | gRPC](https://grpc.io/docs/)

gRPC 技术教程：[Basics tutorial | Go | gRPC](https://grpc.io/docs/languages/go/basics/)

ProtocBuf 官网：[Reference Guides | Protocol Buffers Documentation (protobuf.dev)](https://protobuf.dev/reference/)

它也是 CNCF 基金会下一个的开源项目，CNCF 全名 CLOUD NATIVE COMPUTING FOUNDATION，译名云原生计算基金会

![](/images/grpc/title.png)

## 特点

**简单的服务定义**

使用 Protocol Buffers 定义服务，这是一个强大的二进制序列化工具集和语言。

**启动和扩容都十分迅捷**

只需一行代码即可安装运行时和开发环境，仅需几秒钟既可以扩张到每秒数百万个 RPC

**跨语言，跨平台**

根据不同平台不同语言自动生成客户端和服务端的服务存根

**双向流和集成授权**

基于 HTTP/2 的双向流和可插拔的认证授权

虽然 GRPC 是语言无关的，但是本站的内容大部分都是 go 相关的，所以本文也会使用 go 作为主要语言进行讲解，后续用到的 pb 编译器和生成器如果是其他语言的使用者可以自行到 Protobuf 官网查找。为了方便起见，接下来会直接省略项目的创建过程。

::: tip

本文参考了以下文章的内容：

[写给 go 开发者的 gRPC 教程-protobuf 基础 - 掘金 (juejin.cn)](https://juejin.cn/post/7191008929986379836)

[gRPC 中的 Metadata - 熊喵君的博客 | PANDAYCHEN](https://pandaychen.github.io/2020/02/22/GRPC-METADATA-INTRO/)

[gRPC 系列——grpc 超时传递原理 | 小米信息部技术团队 (xiaomi-info.github.io)](https://xiaomi-info.github.io/2019/12/30/grpc-deadline/)

[gRPC API 设计指南 | Google Cloud](https://cloud.google.com/apis/design?hl=zh-cn)

:::

## 依赖安装

先下载 Protocol
Buffer 编译器，下载地址：[Releases · protocolbuffers/protobuf (github.com)](https://github.com/protocolbuffers/protobuf/releases)

![](/images/grpc/proto_dl.png)

根据自己的情况选择系统和版本即可，下载完成后需要将 bin 目录添加到环境变量中。

然后还要下载代码生成器，编译器是将 proto 文件生成对应语言的序列化代码，生成器是用于生成业务代码。

```sh
$ go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
$ go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

创建一个空的项目，名字这里取 grpc_learn，然后引入如下依赖

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

下面将以一个 Hello World 示例来进行演示，创建如下的项目结构。

```
grpc_learn\helloworld
|
+---client
|       main.go
|
+---hello
|
|
+---pb
|       hello.proto
|
\---server
        main.go

```

### 定义 protobuf 文件

其中，在`pb/hello.proto`中，写入如下内容，这是一个相当简单的示例，如果不会 protoc 语法，请移步相关文档。

```protobuf
syntax = "proto3";

// .表示就直接生成在输出路径下，hello是包名
option go_package = ".;hello";

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

编写完成后，使用 protoc 编译器生成数据序列化相关的代码，使用生成器生成 rpc 相关代码

```sh
$ protoc -I ./pb \
    --go_out=./hello ./pb/*.proto\
    --go-grpc_out=./hello ./pb/*.proto
```

此时可以发现`hello`文件夹生成了`hello.pb.go`和`hello_grpc.pb.go`文件，浏览`hello.pb.go`可以发现我们定义的 message

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

在本例中，客户端建立好连接后，在调用远程方法时就跟调用本地方法一样，直接访问`client`的`Hello`
方法并获取结果，这就是一个最简单的 GRPC 例子，许多开源的框架也都是对这一个流程进行了封装。

## bufbuild

在上述例子中，是直接使用命令生成的代码，如果后期插件多了命令会显得相当繁琐，这时可以通过工具来进行管理 protobuf 文件，正好就有这么一个开源的管理工具`bufbuild/buf`。

开源地址：[bufbuild/buf: A new way of working with Protocol Buffers. (github.com)](https://github.com/bufbuild/buf)

文档地址：[Buf - Install the Buf CLI](https://buf.build/docs/installation)

**特点**

- BSR 管理
- Linter
- 代码生成
- 格式化
- 依赖管理

有了这个工具可以相当方便的管理 protobuf 文件。

文档中提供了相当多的安装方式，可以自己选择。如果本地安装了 go 环境的话，直接使用`go install`安装即可

```sh
$ go install github.com/bufbuild/buf/cmd/buf@latest
```

安装完毕后查看版本

```sh
$ buf --version
1.24.0
```

来到`helloworld/pb`文件夹，执行如下命令创建一个 module 来管理 pb 文件。

```sh
$ buf mod init
$ ls
buf.yaml  hello.proto
```

`buf.yaml`文件内容默认如下

```yaml
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

再来到`helloworld/`目录下，创建`buf.gen.yaml`，写入如下内容

```yaml
version: v1
plugins:
  - plugin: go
    out: hello
    opt:
  - plugin: go-grpc
    out: hello
    opt:
```

再执行命令生成代码

```sh
$ buf generate
```

完成后就可以看到生成的文件了，当然 buf 不止这点功能，其他的功能可以自己去文档学习。

## 流式 RPC

grpc 的调用方式有两大类，一元 RPC（Unary RPC）和流式 RPC（Stream RPC）。Hello World 中的示例就是一个典型的一元 RPC。

![](/images/grpc/unary_rpc.png)

一元 rpc（或者叫普通 rpc 更能理解些，实在不知道怎么翻译这个`unary`了）用起来就跟普通的 http 一样，客户端请求，服务端返回数据，一问一答的方式。而流式 RPC 的请求和响应都
可以是流式的，如下图

![](/images/grpc/stream.png)

使用流式请求时，只返回一次响应，客户端可以通过流来多次发送参数给服务端，服务端可以不需要像一元 RPC 那样等到所有参数都接收完毕再处理，具体处理逻辑可以由服务端决定。正常情况下，只有客户端可以主动关闭流式请求，一旦流被关闭，当前 RPC 请求也就会结束。

使用流式响应时，只发送一次参数，服务端可以通过流多次发送数据给客户端，客户端不需要像一元 RPC 那样接受完所有数据再处理，具体的处理逻辑可以由客户端自己决定。正常请求下，只有服务端可以主动关闭流式响应，一旦流被关闭，当前 RPC 请求也就会结束。

```protobuf
service MessageService {
  rpc getMessage(stream google.protobuf.StringValue) returns (Message);
}
```

也可以是只有响应是流式的（Server-Streaming RPC）

```protobuf
service MessageService {
  rpc getMessage(google.protobuf.StringValue) returns (stream Message);
}
```

或者请求和响应都是流式的（Bi-driectional-Streaming RPC）

```
service MessageService {
  rpc getMessage(stream google.protobuf.StringValue) returns (stream Message);
}
```

### 单向流式

下面通过一个例子来演示单向流式的操作，首先创建如下的项目结构

```
grpc_learn\server_client_stream
|   buf.gen.yaml
|
+---client
|       main.go
|
+---pb
|       buf.yaml
|       message.proto
|
\---server
        main.go
```

`message.proto`内容如下

```protobuf
syntax = "proto3";


option go_package = ".;message";

import "google/protobuf/wrappers.proto";

message Message {
  string from = 1;
  string content = 2;
  string to = 3;
}

service MessageService {
  rpc receiveMessage(google.protobuf.StringValue) returns (stream Message);
  rpc sendMessage(stream Message) returns (google.protobuf.Int64Value);
}
```

通过 buf 生成代码

```sh
$ buf generate
```

这里演示是消息服务，`receiveMessage`接收一个指定的用户名，类型为字符串，返回消息流，`sendMessage`
接收消息流，返回成功发送的消息数目，类型为 64 位整型。接下来创建`server/message_service.go`，自己实现默认的代码生成的服务

```go
package main

import (
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"
  "google.golang.org/protobuf/types/known/wrapperspb"
  "grpc_learn/server_client_stream/message"
)

type MessageService struct {
  message.UnimplementedMessageServiceServer
}

func (m *MessageService) ReceiveMessage(user *wrapperspb.StringValue, recvServer message.MessageService_ReceiveMessageServer) error {
  return status.Errorf(codes.Unimplemented, "method ReceiveMessage not implemented")
}
func (m *MessageService) SendMessage(sendServer message.MessageService_SendMessageServer) error {
  return status.Errorf(codes.Unimplemented, "method SendMessage not implemented")
}
```

可以看到接收消息和发送消息的参数里面都有一个流包装接口

```go
type MessageService_ReceiveMessageServer interface {
    // 发送消息
  Send(*Message) error
  grpc.ServerStream
}

type MessageService_SendMessageServer interface {
    // 发送返回值并关闭连接
  SendAndClose(*wrapperspb.StringValue) error
    // 接收消息
  Recv() (*Message, error)
  grpc.ServerStream
}

```

它们都嵌入了`gprc.ServerStream`接口

```go
type ServerStream interface {
  SetHeader(metadata.MD) error
  SendHeader(metadata.MD) error
  SetTrailer(metadata.MD)
  Context() context.Context
  SendMsg(m interface{}) error
  RecvMsg(m interface{}) error
}
```

可以看到，流式 RPC 并不像一元 RPC 那样入参和返回值都可以很明确的体现在函数签名上，这些方法乍一看是看不出来入参和返回值是什么类型的，需要调用传入的 Stream 类型完成流式传输，接下来开始编写服务端的具体逻辑。在编写服务端逻辑的时候，用了一个`sync.map`
来模拟消息队列，当客户端发送`ReceiveMessage`
请求时，服务端通过流式响应不断返回客户端想要的消息，直到超时过后断开请求。当客户端请求`SendMessage`
时，通过流式请求不断发送消息过来，服务端不断的将消息放入队列中，直到客户端主动断开请求，并返回给客户端消息发送条数。

```go
package main

import (
  "errors"
  "google.golang.org/protobuf/types/known/wrapperspb"
  "grpc_learn/server_client_stream/message"
  "io"
  "log"
  "sync"
  "time"
)

// 一个模拟的消息队列
var messageQueue sync.Map

type MessageService struct {
  message.UnimplementedMessageServiceServer
}

// ReceiveMessage
// param user *wrapperspb.StringValue
// param recvServer message.MessageService_ReceiveMessageServer
// return error
// 接收指定用户的消息
func (m *MessageService) ReceiveMessage(user *wrapperspb.StringValue, recvServer message.MessageService_ReceiveMessageServer) error {
  timer := time.NewTimer(time.Second * 5)
  for {
    time.Sleep(time.Millisecond * 100)
    select {
    case <-timer.C:
      log.Printf("5秒钟内没有收到%s的消息，关闭连接", user.GetValue())
      return nil
    default:
      value, ok := messageQueue.Load(user.GetValue())
      if !ok {
        messageQueue.Store(user.GetValue(), []*message.Message{})
        continue
      }
      queue := value.([]*message.Message)
      if len(queue) < 1 {
        continue
      }

      // 拿到消息
      msg := queue[0]
      // 通过流式传输将消息发送给客户端
      err := recvServer.Send(msg)
      log.Printf("receive %+v\n", msg)
      if err != nil {
        return err
      }

      queue = queue[1:]
      messageQueue.Store(user.GetValue(), queue)
      timer.Reset(time.Second * 5)
    }
  }
}

// SendMessage
// param sendServer message.MessageService_SendMessageServer
// return error
// 发送消息给指定用户
func (m *MessageService) SendMessage(sendServer message.MessageService_SendMessageServer) error {
  count := 0
  for {
    // 从客户端接收消息
    msg, err := sendServer.Recv()
    if errors.Is(err, io.EOF) {
      return sendServer.SendAndClose(wrapperspb.Int64(int64(count)))
    }
    if err != nil {
      return err
    }
    log.Printf("send %+v\n", msg)

    value, ok := messageQueue.Load(msg.From)
    if !ok {
      messageQueue.Store(msg.From, []*message.Message{msg})
      continue
    }
    queue := value.([]*message.Message)
    queue = append(queue, msg)
    // 将消息放入消息队列中
    messageQueue.Store(msg.From, queue)
    count++
  }
}
```

客户端开了两个协程，一个协程用来发送消息，另一个协程用来接收消息，当然也可以一边发送一边接收，代码如下。

```go
package main

import (
  "context"
  "errors"
  "github.com/dstgo/task"
  "google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
  "google.golang.org/protobuf/types/known/wrapperspb"
  "grpc_learn/server_client_stream/message"
  "io"
  "log"
  "time"
)

var Client message.MessageServiceClient

func main() {
  dial, err := grpc.Dial("localhost:9090", grpc.WithTransportCredentials(insecure.NewCredentials()))
  if err != nil {
    log.Panicln(err)
  }
  defer dial.Close()

  Client = message.NewMessageServiceClient(dial)

  log.SetPrefix("client\t")
  msgTask := task.NewTask(func(err error) {
    log.Panicln(err)
  })

  ctx := context.Background()

  // 接收消息请求
  msgTask.AddJobs(func() {
    receiveMessageStream, err := Client.ReceiveMessage(ctx, wrapperspb.String("jack"))
    if err != nil {
      log.Panicln(err)
    }
    for {
      recv, err := receiveMessageStream.Recv()
      if errors.Is(err, io.EOF) {
        log.Println("暂无消息，关闭连接")
        break
      } else if err != nil {
        break
      }
      log.Printf("receive %+v", recv)
    }
  })

  msgTask.AddJobs(func() {
    from := "jack"
    to := "mike"

    sendMessageStream, err := Client.SendMessage(ctx)
    if err != nil {
      log.Panicln(err)
    }
    msgs := []string{
      "在吗",
      "下午有没有时间一起打游戏",
      "那行吧，以后有时间一起约",
      "就这个周末应该可以吧",
      "那就这么定了",
    }
    for _, msg := range msgs {
      time.Sleep(time.Second)
      sendMessageStream.Send(&message.Message{
        From:    from,
        Content: msg,
        To:      to,
      })
    }
    // 消息发送完了，主动关闭请求并获取返回值
    recv, err := sendMessageStream.CloseAndRecv()
    if err != nil {
      log.Println(err)
    } else {
      log.Printf("发送完毕，总共发送了%d条消息\n", recv.GetValue())
    }
  })

  msgTask.Run()
}
```

执行过后服务端输出如下

```
server  2023/07/18 16:28:24 send from:"jack" content:"在吗" to:"mike"
server  2023/07/18 16:28:24 receive from:"jack" content:"在吗" to:"mike"
server  2023/07/18 16:28:25 send from:"jack" content:"下午有没有时间一起打游戏" to:"mike"
server  2023/07/18 16:28:25 receive from:"jack" content:"下午有没有时间一起打游戏" to:"mike"
server  2023/07/18 16:28:26 send from:"jack" content:"那行吧，以后有时间一起约" to:"mike"
server  2023/07/18 16:28:26 receive from:"jack" content:"那行吧，以后有时间一起约" to:"mike"
server  2023/07/18 16:28:27 send from:"jack" content:"就这个周末应该可以吧" to:"mike"
server  2023/07/18 16:28:27 receive from:"jack" content:"就这个周末应该可以吧" to:"mike"
server  2023/07/18 16:28:28 send from:"jack" content:"那就这么定了" to:"mike"
server  2023/07/18 16:28:28 receive from:"jack" content:"那就这么定了" to:"mike"
server  2023/07/18 16:28:33 5秒钟内没有收到jack的消息，关闭连接
```

客户端输出如下

```
client  2023/07/18 16:28:24 receive from:"jack" content:"在吗" to:"mike"
client  2023/07/18 16:28:25 receive from:"jack" content:"下午有没有时间一起打游戏" to:"mike"
client  2023/07/18 16:28:26 receive from:"jack" content:"那行吧，以后有时间一起约" to:"mike"
client  2023/07/18 16:28:27 receive from:"jack" content:"就这个周末应该可以吧" to:"mike"
client  2023/07/18 16:28:28 发送完毕，总共发送了5条消息
client  2023/07/18 16:28:28 receive from:"jack" content:"那就这么定了" to:"mike"
client  2023/07/18 16:28:33 暂无消息，关闭连接
```

通过这个例子可以发现单向流式 RPC 请求处理起来的话不论是客户端还是服务端都要比一元 rpc 复杂，不过双向流式 RPC 比它们还要更复杂些。

### 双向流式

双向流式 PRC，即请求和响应都是流式的，就相当于把上例中的两个服务结合成一个。对于流式 RPC 而言，第一个请求肯定是由客户端发起的，随后客户端可以随时通过流来发送请求参数，服务端也可以随时通过流来返回数据，不管哪一方主动关闭流，当前请求都会结束。

::: tip

后续的内容除非必要，都会直接省略掉 pb 代码生成以及创建 rpc 客户端服务端这些步骤的代码描述

:::

首先创建如下项目结构

```
bi_stream\
|   buf.gen.yaml
|
+---client
|       main.go
|
+---message
|       message.pb.go
|       message_grpc.pb.go
|
+---pb
|       buf.yaml
|       message.proto
|
\---server
        main.go
        message_service.go
```

`message.proto`内容如下

```protobuf
syntax = "proto3";


option go_package = ".;message";

import "google/protobuf/wrappers.proto";

message Message {
  string from = 1;
  string content = 2;
  string to = 3;
}

service ChatService {
  rpc chat(stream Message) returns (stream Message);
}
```

服务端逻辑中，建立连接后，开启两个协程，一个协程负责接收消息，一个负责发送消息，具体的处理逻辑与上个例子类似，不过这次去掉了超时的判定逻辑。

```go
package main

import (
  "github.com/dstgo/task"
  "google.golang.org/grpc/metadata"
  "grpc_learn/bi_stream/message"
  "log"
  "sync"
  "time"
)

// MessageQueue 模拟的消息队列
var MessageQueue sync.Map

type ChatService struct {
  message.UnimplementedChatServiceServer
}

// Chat
// param chatServer message.ChatService_ChatServer
// return error
// 聊天服务，服务端逻辑我们用多协程来进行处理
func (m *ChatService) Chat(chatServer message.ChatService_ChatServer) error {
  md, _ := metadata.FromIncomingContext(chatServer.Context())
  from := md.Get("from")[0]
  defer log.Println(from, "end chat")

  var chatErr error
  chatCh := make(chan error)

  // 创建两个协程，一个收消息，一个发消息
  chatTask := task.NewTask(func(err error) {
    chatErr = err
  })

  // 接收消息的协程
  chatTask.AddJobs(func() {
    for {
      msg, err := chatServer.Recv()
      log.Printf("receive %+v err %+v\n", msg, err)
      if err != nil {
        chatErr = err
        chatCh <- err
        break
      }

      value, ok := MessageQueue.Load(msg.To)
      if !ok {
        MessageQueue.Store(msg.To, []*message.Message{msg})
      } else {
        queue := value.([]*message.Message)
        queue = append(queue, msg)
        MessageQueue.Store(msg.To, queue)
      }
    }
  })

  // 发送消息的协程
  chatTask.AddJobs(func() {
  Send:
    for {
      time.Sleep(time.Millisecond * 100)
      select {
      case <-chatCh:
        log.Println(from, "close send")
        break Send
      default:
        value, ok := MessageQueue.Load(from)
        if !ok {
          value = []*message.Message{}
          MessageQueue.Store(from, value)
        }

        queue := value.([]*message.Message)
        if len(queue) < 1 {
          continue Send
        }

        msg := queue[0]
        queue = queue[1:]
        MessageQueue.Store(from, queue)
        err := chatServer.Send(msg)
        log.Printf("send %+v\n", msg)
        if err != nil {
          chatErr = err
          break Send
        }
      }
    }
  })

  chatTask.Run()

  return chatErr
}
```

客户端逻辑中，开启了两个子协程来模拟两个人的聊天过程，两个子协程中分别又各有两个孙协程负责收发消息（客户端逻辑中并没有保证两个人聊天的消息收发顺序正确，只是一个简单的双方发送与接收的例子）

```go
package main

import (
  "context"
  "github.com/dstgo/task"
  "google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
  "google.golang.org/grpc/metadata"
  "grpc_learn/bi_stream/message"
  "log"
  "time"
)

var Client message.ChatServiceClient

func main() {
  log.SetPrefix("client ")
  dial, err := grpc.Dial("localhost:9090", grpc.WithTransportCredentials(insecure.NewCredentials()))
  defer dial.Close()

  if err != nil {
    log.Panicln(err)
  }
  Client = message.NewChatServiceClient(dial)

  chatTask := task.NewTask(func(err error) {
    log.Panicln(err)
  })

  chatTask.AddJobs(func() {
    NewChat("jack", "mike", "你好", "有没有时间一起打游戏？", "好吧")
  })

  chatTask.AddJobs(func() {
    NewChat("mike", "jack", "你好", "没有", "没时间，你找别人吧")
  })

  chatTask.Run()
}

func NewChat(from string, to string, contents ...string) {
  ctx := context.Background()
  mdCtx := metadata.AppendToOutgoingContext(ctx, "from", from)
  chat, err := Client.Chat(mdCtx)
  defer log.Println("end chat", from)

  if err != nil {
    log.Panicln(err)
  }

  chatTask := task.NewTask(func(err error) {
    log.Panicln(err)
  })

  chatTask.AddJobs(func() {
    for _, content := range contents {
      time.Sleep(time.Second)
      chat.Send(&message.Message{
        From:    from,
        Content: content,
        To:      to,
      })
    }
    // 消息发完了，就关闭连接
    time.Sleep(time.Second * 5)
    chat.CloseSend()
  })

  // 接收消息的协程
  chatTask.AddJobs(func() {
    for {
      msg, err := chat.Recv()
      log.Printf("receive %+v\n", msg)
      if err != nil {
        log.Println(err)
        break
      }
    }
  })

  chatTask.Run()
}

```

正常情况下，服务端输出

```
server 2023/07/19 17:18:44 server listening on [::]:9090
server 2023/07/19 17:18:49 receive from:"mike" content:"你好" to:"jack" err <nil>
server 2023/07/19 17:18:49 receive from:"jack" content:"你好" to:"mike" err <nil>
server 2023/07/19 17:18:49 send from:"jack" content:"你好" to:"mike"
server 2023/07/19 17:18:49 send from:"mike" content:"你好" to:"jack"
server 2023/07/19 17:18:50 receive from:"jack" content:"有没有时间一起打游戏？" to:"mike" err <nil>
server 2023/07/19 17:18:50 receive from:"mike" content:"没有" to:"jack" err <nil>
server 2023/07/19 17:18:50 send from:"mike" content:"没有" to:"jack"
server 2023/07/19 17:18:50 send from:"jack" content:"有没有时间一起打游戏？" to:"mike"
server 2023/07/19 17:18:51 receive from:"jack" content:"好吧" to:"mike" err <nil>
server 2023/07/19 17:18:51 receive from:"mike" content:"没时间，你找别人吧" to:"jack" err <nil>
server 2023/07/19 17:18:51 send from:"jack" content:"好吧" to:"mike"
server 2023/07/19 17:18:51 send from:"mike" content:"没时间，你找别人吧" to:"jack"
server 2023/07/19 17:18:56 receive <nil> err EOF
server 2023/07/19 17:18:56 receive <nil> err EOF
server 2023/07/19 17:18:56 jack close send
server 2023/07/19 17:18:56 jack end chat
server 2023/07/19 17:18:56 mike close send
server 2023/07/19 17:18:56 mike end chat
```

正常情况下，客户端输出（可以看到消息的顺序逻辑是乱的）

```
client 2023/07/19 17:26:24 receive from:"jack"  content:"你好"  to:"mike"
client 2023/07/19 17:26:24 receive from:"mike"  content:"你好"  to:"jack"
client 2023/07/19 17:26:25 receive from:"mike"  content:"没有"  to:"jack"
client 2023/07/19 17:26:25 receive from:"jack"  content:"有没有时间一起打游戏？"  to:"mike"
client 2023/07/19 17:26:26 receive from:"jack"  content:"好吧"  to:"mike"
client 2023/07/19 17:26:26 receive from:"mike"  content:"没时间，你找别人吧"  to:"jack"
client 2023/07/19 17:26:32 receive <nil>
client 2023/07/19 17:26:32 rpc error: code = Unknown desc = EOF
client 2023/07/19 17:26:32 end chat jack
client 2023/07/19 17:26:32 receive <nil>
client 2023/07/19 17:26:32 rpc error: code = Unknown desc = EOF
client 2023/07/19 17:26:32 end chat mike
```

通过示例可以看到的是，双向流式的处理逻辑无论是客户端还是服务端，都要比单向流式更复杂，需要结合多协程开启异步任务才能更好的处理逻辑。

## metadata

metadata 本质上是一个 map，它的 value 是一个字符串切片，就类似 http1 的 header 一样，并且它在 gRPC 中扮演的角色也和 http
header 类似，提供一些本次 RPC 调用的一些信息，同时 metadata 的生命周期跟随着一次 rpc 调用的整个过程，调用结束，它的生命周期也就结束了。

它在 gRPC 中主要通过`context`来进行传输和存储，不过 gRPC 提供了`metadata`
包，里面有相当多的方便函数来简化操作，不需要我们去手动操作`context `。metadata 在 gRPC 中对应的类型为`metadata.MD`，如下所示。

```go
// MD is a mapping from metadata keys to values. Users should use the following
// two convenience functions New and Pairs to generate MD.
type MD map[string][]string
```

我们可以直接使用`metadata.New`函数来创建，不过在创建之前，有几个点需要注意

```go
func New(m map[string]string) MD
```

metadata 对键名有所限制，仅能是以下规则限制的字符：

- ASCII 字符
- 数字：0-9
- 小写字母：a-z
- 大写字母：A-Z
- 特殊字符：-\_

::: tip

在 metadata 中，大写的字母都会被转换为小写，也就是说会占用同一个 key，值也会被覆盖。

:::

::: tip

以`grpc-`开头的 key 是 grpc 保留使用的内部 key，如果使用这类 key 的话可能会导致一些错误。

:::

### 手动创建

创建 metadata 的方式有很多，这里介绍手动创建 metadata 最常用的两种方法，第一种就是使用`metadata.New`函数，直接传入一个 map。

```go
func New(m map[string]string) MD
```

```go
md := metadata.New(map[string]string{
    "key":  "value",
    "key1": "value1",
    "key2": "value2",
})
```

第二种是`metadata.Pairs`，传入偶数长度的字符串切片，会自动的解析成键值对。

```go
func Pairs(kv ...string) MD
```

```go
md := metadata.Pairs("k", "v", "k1", "v1", "k2", "v2")
```

还可以使用`metadata.join`来合并多个 metadata

```go
func Join(mds ...MD) MD
```

```go
md1 := metadata.New(map[string]string{
    "key":  "value",
    "key1": "value1",
    "key2": "value2",
})
md2 := metadata.Pairs("k", "v", "k1", "v1", "k2", "v2")
union := metadata.join(md1,md2)
```

### 服务端使用

**获取 metadata**

服务端获取 metadata 可以使用`metadata.FromIncomingContext`函数来获取

```go
func FromIncomingContext(ctx context.Context) (MD, bool)
```

对于一元 rpc 而言，service 的参数里面会带一个`context`参数，直接从里面获取 metadata 即可

```go
func (h *HelloWorld) Hello(ctx context.Context, name *wrapperspb.StringValue) (*wrapperspb.StringValue, error) {
  md, b := metadata.FromIncomingContext(ctx)
  ...
}
```

对于流式 rpc，service 的参数里面会有一个流对象，通过它可以获取流的`context`

```go
func (m *ChatService) Chat(chatServer message.ChatService_ChatServer) error {
  md, b := metadata.FromIncomingContext(chatServer.Context())
    ...
}
```

**发送 metadata**

发送 metadata 可以使用`grpc.sendHeader`函数

```go
func SendHeader(ctx context.Context, md metadata.MD) error
```

该函数最多调用一次，在一些导致 header 被自动发送的事件发生后使用则不会生效。在一些情况下，如果不想直接发送 header，这时可以使用`grpc.SetHeader`
函数。

```go
func SetHeader(ctx context.Context, md metadata.MD) error
```

该函数多次调用的话，会将每次传入的 metadata 合并，并在以下几种情况发送给客户端

- `gprc.SendHeader`和`Servertream.SendHeader`被调用时
- 一元 rpc 的 handler 返回时
- 调用流式 rpc 中流对象的`Stream.SendMsg`时
- rpc 请求的状态变为`send out`，这种情况要么是 rpc 请求成功了，要么就是出错了。

对于流式 rpc 而言，建议使用流对象的`SendHeader`方法和`SetHeader`方法。

```go
type ServerStream interface {
  SetHeader(metadata.MD) error
  SendHeader(metadata.MD) error
  SetTrailer(metadata.MD)
  ...
}
```

::: tip

在使用过程中会发现 Header 和 Trailer 两个功能差不多，不过它们的主要区别在于发送的时机，一元 rpc 中可能体会不到，但是这一差别在流式 RPC 中尤为明显，因为流式 RPC 中的 Header 可以不用等待请求结束就可以发送 Header。前面提到过了 Header 会在特定的情况下被发送，而 Trailer 仅仅只会在整个 RPC 请求结束后才会被发送，在此之前，获取到的 trailer 都是空的。

:::

### 客户端使用

**获取 metadata**

客户端想要获取响应的 header，可以通过`grpc.Header`和`grpc.Trailer`来实现

```go
func Header(md *metadata.MD) CallOption
```

```go
func Trailer(md *metadata.MD) CallOption
```

不过需要注意的是，并不能直接获取，可以看到以上两个函数返回值是`CallOption`，也就是说是在发起 RPC 请求时作为 option 参数传入的。

```go
// 声明用于接收值的md
var header, trailer metadata.MD

// 调用rpc请求时传入option
res, err := client.SomeRPC(
    ctx,
    data,
    grpc.Header(&header),
    grpc.Trailer(&trailer)
)
```

在请求完成后，会将值写到传入的 md 中。对于流式 rpc 而言，可以通过发起请求时返回的流对象直接获取

```go
type ClientStream interface {
  Header() (metadata.MD, error)
  Trailer() metadata.MD
    ...
}
```

```go
stream, err := client.StreamRPC(ctx)
header, err := stream.Header()
trailer := Stream.Trailer()
```

**发送 metadata**

客户端想要发送 metadata 很简单，之前提到过 metadata 的表现形式就是 valueContext，将 metadata 结合到 context 中，然后在请求的时候把 context 传入即可，`metadata`
包提供了两个函数来方便构造 context。

```go
func NewOutgoingContext(ctx context.Context, md MD) context.Context
```

```go
md := metadata.Pairs("k1", "v1")
ctx := context.Background()
outgoingContext := metadata.NewOutgoingContext(ctx, md)

// 一元rpc
res,err := client.SomeRPC(outgoingContext,data)
// 流式rpc
stream,err := client.StreamRPC(outgoingContext)
```

如果原有的 ctx 已经有 metadata 了的话，再使用`NewOutgoingContext`会将先前的数据直接覆盖掉，为了避免这种情况，可以使用下面这个函数，它不会覆盖，而是会将数据合并。

```go
func AppendToOutgoingContext(ctx context.Context, kv ...string) context.Context
```

```go
md := metadata.Pairs("k1", "v1")
ctx := context.Background()
outgoingContext := metadata.NewOutgoingContext(ctx, md)

appendContext := metadata.AppendToOutgoingContext(outgoingContext, "k2","v2")

// 一元rpc
res,err := client.SomeRPC(appendContext,data)
// 流式rpc
stream,err := client.StreamRPC(appendContext)
```

## 拦截器

gRPC 的拦截器就类似于 gin 中的 Middleware 一样，都是为了在请求前或者请求后做一些特殊的工作并且不影响到本身的业务逻辑。在 gRPC 中，拦截器有两大类，服务端拦截器和客户端拦截器，根据请求类型来分则有一元 RPC 拦截器，和流式 RPC 拦截器，下图

![](/images/grpc/interceptor.png)

为了能更好的理解拦截器，下面会根据一个非常简单的示例来进行描述。

```go
grpc_learn\interceptor
|   buf.gen.yaml
|
+---client
|       main.go
|
+---pb
|       buf.yaml
|       person.proto
|
+---person
|       person.pb.go
|       person_grpc.pb.go
|
\---server
        main.go
```

`person.proto`内容如下

```protobuf
syntax = "proto3";

option go_package = ".;person";

import "google/protobuf/wrappers.proto";

message personInfo {
  string name = 1;
  int64  age = 2;
  string address = 3;
}

service person {
  rpc getPersonInfo(google.protobuf.StringValue) returns (personInfo);
  rpc createPersonInfo(stream personInfo) returns (google.protobuf.Int64Value);
}
```

服务端代码如下，逻辑全是之前的内容，比较简单不再赘述。

```go
package main

import (
  "context"
  "errors"
  "google.golang.org/protobuf/types/known/wrapperspb"
  "grpc_learn/interceptor/person"
  "io"
  "sync"
)

// 存放数据
var personData sync.Map

type PersonService struct {
  person.UnimplementedPersonServer
}

func (p *PersonService) GetPersonInfo(ctx context.Context, name *wrapperspb.StringValue) (*person.PersonInfo, error) {
  value, ok := personData.Load(name.Value)
  if !ok {
    return nil, person.PersonNotFoundErr
  }
  personInfo := value.(*person.PersonInfo)
  return personInfo, nil
}

func (p *PersonService) CreatePersonInfo(personStream person.Person_CreatePersonInfoServer) error {
  count := 0
  for {
    personInfo, err := personStream.Recv()
    if errors.Is(err, io.EOF) {
      return personStream.SendAndClose(wrapperspb.Int64(int64(count)))
    } else if err != nil {
      return err
    }

    personData.Store(personInfo.Name, personInfo)
    count++
  }
}
```

### 服务端拦截

拦截服务端 rpc 请求的有`UnaryServerInterceptor`和`StreamServerInterceptor`，具体类型如下所示

```go
type UnaryServerInterceptor func(ctx context.Context, req interface{}, info *UnaryServerInfo, handler UnaryHandler) (resp interface{}, err error)

type StreamServerInterceptor func(srv interface{}, ss ServerStream, info *StreamServerInfo, handler StreamHandler) error
```

**一元 RPC**

创建一元 RPC 拦截器，只需要实现`UnaryserverInterceptor`类型即可，下面是一个简单的一元 RPC 拦截器的例子，功能是输出每一次 rpc 的请求和响应。

```go
// UnaryPersonLogInterceptor
// param ctx context.Context
// param req interface{} rpc的请求数据
// param info *grpc.UnaryServerInfo 本次一元RPC的一些请求信息
// param unaryHandler grpc.UnaryHandler 具体的handler
// return resp interface{} rpc的响应数据
// return err error
func UnaryPersonLogInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, unaryHandler grpc.UnaryHandler) (resp interface{}, err error) {
  log.Println(fmt.Sprintf("before unary rpc intercept path: %s req: %+v", info.FullMethod, req))
  resp, err = unaryHandler(ctx, req)
  log.Println(fmt.Sprintf("after unary rpc intercept path: %s resp: %+v err: %+v", info.FullMethod, resp, err))
  return resp, err
}
```

对于一元 RPC 而言，拦截器拦截的是每一个 RPC 的请求和响应，即拦截的是 RPC 的请求阶段和响应阶段，如果拦截器返回 error，那么本次请求就会结束。

**流式 rpc**

创建流式 RPC 拦截器，只需要实现`StreamServerInterceptor`类型即可，下面是一个简单的流式 RPC 拦截器的例子。

```go
// StreamPersonLogInterceptor
// param srv interface{} 对应服务端实现的server
// param stream grpc.ServerStream 流对象
// param info *grpc.StreamServerInfo 流信息
// param streamHandler grpc.StreamHandler 处理器
// return error
func StreamPersonLogInterceptor(srv interface{}, stream grpc.ServerStream, info *grpc.StreamServerInfo, streamHandler grpc.StreamHandler) error {
  log.Println(fmt.Sprintf("before stream rpc interceptor path: %s srv: %+v clientStream: %t serverStream: %t", info.FullMethod, srv, info.IsClientStream, info.IsServerStream))
  err := streamHandler(srv, stream)
  log.Println(fmt.Sprintf("after stream rpc interceptor path: %s srv: %+v clientStream: %t serverStream: %t err: %+v", info.FullMethod, srv, info.IsClientStream, info.IsServerStream, err))
  return err
}
```

对于流式 RPC 而言，拦截器拦截的是每一个流对象的`Send`和`Recve`
方法被调用的时机，如果拦截器返回 error，并不会导致本次 RPC 请求的结束，仅仅只是代表着本次`send `或`recv`出现了错误。

**使用拦截器**

要想使创建的拦截器生效，需要在创建 gRPC 服务器的时候作为 option 传入，官方也提供了相关的函数以供使用。如下所示，有添加单个拦截器的函数，也有添加链式拦截器的函数。

```go
func UnaryInterceptor(i UnaryServerInterceptor) ServerOption

func ChainUnaryInterceptor(interceptors ...UnaryServerInterceptor) ServerOption

func StreamInterceptor(i StreamServerInterceptor) ServerOption

func ChainStreamInterceptor(interceptors ...StreamServerInterceptor) ServerOption
```

::: tip

重复使用`UnaryInterceptor`会抛出如下 panic

```
panic: The unary server interceptor was already set and may not be reset.
```

`StreamInterceptor`也是同理，而链式拦截器重复调用则会 append 到同一个链上。

:::

使用示例如下

```go
package main

import (
  "google.golang.org/grpc"
  "grpc_learn/interceptor/person"
  "log"
  "net"
)

func main() {
  log.SetPrefix("server ")
  listen, err := net.Listen("tcp", "9090")
  if err != nil {
    log.Panicln(err)
  }
  server := grpc.NewServer(
        // 添加链式拦截器
    grpc.ChainUnaryInterceptor(UnaryPersonLogInterceptor),
    grpc.ChainStreamInterceptor(StreamPersonLogInterceptor),
  )
  person.RegisterPersonServer(server, &PersonService{})
  server.Serve(listen)
}
```

### 客户端拦截

客户端拦截器跟服务端差不多，一个一元拦截器`UnaryClientInterceptor`，一个流式拦截器`StreamClientInterceptor`，具体类型如下所示。

```go
type UnaryClientInterceptor func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, invoker UnaryInvoker, opts ...CallOption) error

type StreamClientInterceptor func(ctx context.Context, desc *StreamDesc, cc *ClientConn, method string, streamer Streamer, opts ...CallOption) (ClientStream, error)
```

**一元 RPC**

创建一元 RPC 客户端拦截器，实现`UnaryClientInterceptor`即可，下面就是一个简单的例子。

```go
// UnaryPersonClientInterceptor
// param ctx context.Context
// param method string 方法名
// param req interface{} 请求数据
// param reply interface{} 响应数据
// param cc *grpc.ClientConn 客户端连接对象
// param invoker grpc.UnaryInvoker 被拦截的具体客户端方法
// param opts ...grpc.CallOption 本次请求的配置项
// return error
func UnaryPersonClientInterceptor(ctx context.Context, method string, req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
  log.Println(fmt.Sprintf("before unary request path: %s req: %+v", method, req))
  err := invoker(ctx, method, req, reply, cc, opts...)
  log.Println(fmt.Sprintf("after unary request path: %s req: %+v rep: %+v", method, req, reply))
  return err
}
```

通过客户端的一元 RPC 拦截器，可以获取到本地请求的请求数据和响应数据以及一些其他的请求信息。

**流式 RPC**

创建一个流式 RPC 客户端拦截器，实现`StreamClientInterceptor`即可，下面就是一个例子。

```go
// StreamPersonClientInterceptor
// param ctx context.Context
// param desc *grpc.StreamDesc 流对象的描述信息
// param cc *grpc.ClientConn 连接对象
// param method string 方法名
// param streamer grpc.Streamer 用于创建流对象的对象
// param opts ...grpc.CallOption 连接配置项
// return grpc.ClientStream 创建好的客户端流对象
// return error
func StreamPersonClientInterceptor(ctx context.Context, desc *grpc.StreamDesc, cc *grpc.ClientConn, method string, streamer grpc.Streamer, opts ...grpc.CallOption) (grpc.ClientStream, error) {
  log.Println(fmt.Sprintf("before create stream  path: %s name: %+v client: %t server: %t", method, desc.StreamName, desc.ClientStreams, desc.ServerStreams))
  stream, err := streamer(ctx, desc, cc, method, opts...)
  log.Println(fmt.Sprintf("after create stream  path: %s name: %+v client: %t server: %t", method, desc.StreamName, desc.ClientStreams, desc.ServerStreams))
  return stream, err
}
```

通过流式 RPC 客户端拦截器，只能拦截到客户端与服务端建立连接的时候也就是创建流的时机，并不能拦截到客户端流对象每一次收发消息的时候，不过我们把拦截器中创建好的流对象包装一下就可以实现拦截收发消息了，就像下面这样

```go
// StreamPersonClientInterceptor
// param ctx context.Context
// param desc *grpc.StreamDesc 流对象的描述信息
// param cc *grpc.ClientConn 连接对象
// param method string 方法名
// param streamer grpc.Streamer 用于创建流对象的对象
// param opts ...grpc.CallOption 连接配置项
// return grpc.ClientStream 创建好的客户端流对象
// return error
func StreamPersonClientInterceptor(ctx context.Context, desc *grpc.StreamDesc, cc *grpc.ClientConn, method string, streamer grpc.Streamer, opts ...grpc.CallOption) (grpc.ClientStream, error) {
  log.Println(fmt.Sprintf("before create stream  path: %stream name: %+v client: %t server: %t", method, desc.StreamName, desc.ClientStreams, desc.ServerStreams))
  stream, err := streamer(ctx, desc, cc, method, opts...)
  log.Println(fmt.Sprintf("after create stream  path: %stream name: %+v client: %t server: %t", method, desc.StreamName, desc.ClientStreams, desc.ServerStreams))
  return &ClientStreamInterceptorWrapper{method, desc, stream}, err
}

type ClientStreamInterceptorWrapper struct {
  method string
  desc   *grpc.StreamDesc
  grpc.ClientStream
}

func (c *ClientStreamInterceptorWrapper) SendMsg(m interface{}) error {
  // 消息发送前
  err := c.ClientStream.SendMsg(m)
  // 消息发送后
  log.Println(fmt.Sprintf("%s send %+v err: %+v", c.method, m, err))
  return err
}

func (c *ClientStreamInterceptorWrapper) RecvMsg(m interface{}) error {
  // 消息接收前
  err := c.ClientStream.RecvMsg(m)
  // 消息接收后
  log.Println(fmt.Sprintf("%s recv %+v err: %+v", c.method, m, err))
  return err
}
```

**使用拦截器**

使用时，与服务端类似也是四个工具函数通过 option 来添加拦截器，分为单个拦截器和链式拦截器。

```go
func WithUnaryInterceptor(f UnaryClientInterceptor) DialOption

func WithChainUnaryInterceptor(interceptors ...UnaryClientInterceptor) DialOption

func WithStreamInterceptor(f StreamClientInterceptor) DialOption

func WithChainStreamInterceptor(interceptors ...StreamClientInterceptor) DialOption
```

::: tip

客户端重复使用`WithUnaryInterceptor`不会抛出 panic，但是仅最后一个会生效。

:::

下面是一个使用案例

```go
package main

import (
  "context"
  "fmt"
  "google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
  "google.golang.org/protobuf/types/known/wrapperspb"
  "grpc_learn/interceptor/person"
  "log"
)

func main() {
  log.SetPrefix("client ")
  dial, err := grpc.Dial("localhost:9090",
    grpc.WithTransportCredentials(insecure.NewCredentials()),
    grpc.WithChainUnaryInterceptor(UnaryPersonClientInterceptor),
    grpc.WithChainStreamInterceptor(StreamPersonClientInterceptor),
  )
  if err != nil {
    log.Panicln(err)
  }

  ctx := context.Background()
  client := person.NewPersonClient(dial)

  personStream, err := client.CreatePersonInfo(ctx)
  personStream.Send(&person.PersonInfo{
    Name:    "jack",
    Age:     18,
    Address: "usa",
  })
  personStream.Send(&person.PersonInfo{
    Name:    "mike",
    Age:     20,
    Address: "cn",
  })
  recv, err := personStream.CloseAndRecv()
  log.Println(recv, err)

  log.Println(client.GetPersonInfo(ctx, wrapperspb.String("jack")))
  log.Println(client.GetPersonInfo(ctx, wrapperspb.String("jenny")))
}
```

到目前为止，整个案例已经编写完毕，是时候来运行一下看看结果是什么样的。服务端输出如下

```
server 2023/07/20 17:27:57 before stream rpc interceptor path: /person/createPersonInfo srv: &{UnimplementedPersonServer:{}} clientStream: true serverStream: false
server 2023/07/20 17:27:57 after stream rpc interceptor path: /person/createPersonInfo srv: &{UnimplementedPersonServer:{}} clientStream: true serverStream: false err: <nil>
server 2023/07/20 17:27:57 before unary rpc intercept path: /person/getPersonInfo req: value:"jack"
server 2023/07/20 17:27:57 after unary rpc intercept path: /person/getPersonInfo resp: name:"jack" age:18 address:"usa" err: <nil>
server 2023/07/20 17:27:57 before unary rpc intercept path: /person/getPersonInfo req: value:"jenny"
server 2023/07/20 17:27:57 after unary rpc intercept path: /person/getPersonInfo resp: <nil> err: person not found
```

客户端输出如下

```
C:\Users\Stranger\AppData\Local\Temp\GoLand\___go_build_grpc_learn_interceptor_client.exe
client 2023/07/20 17:27:57 before create stream  path: /person/createPersonInfotream name: createPersonInfo client: true server: false
client 2023/07/20 17:27:57 after create stream  path: /person/createPersonInfotream name: createPersonInfo client: true server: false
client 2023/07/20 17:27:57 /person/createPersonInfo send name:"jack" age:18 address:"usa" err: <nil>
client 2023/07/20 17:27:57 /person/createPersonInfo send name:"mike" age:20 address:"cn" err: <nil>
client 2023/07/20 17:27:57 /person/createPersonInfo recv value:2 err: <nil>
client 2023/07/20 17:27:57 value:2 <nil>
client 2023/07/20 17:27:57 before unary request path: /person/getPersonInfotream req: value:"jack"
client 2023/07/20 17:27:57 after unary request path: /person/getPersonInfotream req: value:"jack" rep: name:"jack" age:18 address:"usa"
client 2023/07/20 17:27:57 name:"jack" age:18 address:"usa" <nil>
client 2023/07/20 17:27:57 before unary request path: /person/getPersonInfotream req: value:"jenny"
client 2023/07/20 17:27:57 after unary request path: /person/getPersonInfotream req: value:"jenny" rep:
client 2023/07/20 17:27:57 <nil> rpc error: code = Unknown desc = person not found
```

可以看到两边的输出都符合预期，起到了拦截的效果，这个案例只是一个很简单的示例，利用 gRPC 的拦截器可以做很多事情比如授权，日志，监控等等其他功能，可以选择自己造轮子，也可以选择使用开源社区现成的轮子，[gRPC Ecosystem](https://github.com/grpc-ecosystem)
专门收集了一系列开源的 gRPC 拦截器中间件，地址：[grpc-ecosystem/go-grpc-middleware](https://github.com/grpc-ecosystem/go-grpc-middleware)。

## 错误处理

在开始之前先来看一个例子，在上一个拦截器案例中，如果用户查询不到，会向客户端返回错误`person not found`
，那么问题来了，客户端能不能根据返回的错误做特殊的处理呢？接下来试一试，在客户端代码中，尝试使用`errors.Is`来判断错误。

```go
func main() {
  log.SetPrefix("client ")
  dial, err := grpc.Dial("localhost:9090",
    grpc.WithTransportCredentials(insecure.NewCredentials()),
    grpc.WithChainUnaryInterceptor(UnaryPersonClientInterceptor),
    grpc.WithChainStreamInterceptor(StreamPersonClientInterceptor),
  )
  if err != nil {
    log.Panicln(err)
  }

  ctx := context.Background()
  client := person.NewPersonClient(dial)

  personStream, err := client.CreatePersonInfo(ctx)
  personStream.Send(&person.PersonInfo{
    Name:    "jack",
    Age:     18,
    Address: "usa",
  })
  personStream.Send(&person.PersonInfo{
    Name:    "mike",
    Age:     20,
    Address: "cn",
  })
  recv, err := personStream.CloseAndRecv()
  log.Println(recv, err)

  info, err := client.GetPersonInfo(ctx, wrapperspb.String("john"))
  log.Println(info, err)
  if errors.Is(err, person.PersonNotFoundErr) {
    log.Println("person not found err")
  }
}
```

结果输出如下

```
client 2023/07/21 16:46:10 before create stream  path: /person/createPersonInfotream name: createPersonInfo client: true server: false
client 2023/07/21 16:46:10 after create stream  path: /person/createPersonInfotream name: createPersonInfo client: true server: false
client 2023/07/21 16:46:10 /person/createPersonInfo send name:"jack"  age:18  address:"usa" err: <nil>
client 2023/07/21 16:46:10 /person/createPersonInfo send name:"mike"  age:20  address:"cn" err: <nil>
client 2023/07/21 16:46:10 /person/createPersonInfo recv value:2 err: <nil>
client 2023/07/21 16:46:10 value:2 <nil>
client 2023/07/21 16:46:10 before unary request path: /person/getPersonInfotream req: value:"john"
client 2023/07/21 16:46:10 after unary request path: /person/getPersonInfotream req: value:"john" rep:
client 2023/07/21 16:46:10 <nil> rpc error: code = Unknown desc = person not found
```

可以看到客户端接收的 error 是这样的，会发现服务端返回的 error 在 desc 这个字段里面

```
rpc error: code = Unknown desc = person not found
```

自然`errors.Is`这段逻辑也就没有执行，即便换成`errors.As`也是一样的结果。

```go
if errors.Is(err, person.PersonNotFoundErr) {
    log.Println("person not found err")
}
```

为此，gRPC 提供了`status`
包来解决这类问题，这也是为什么客户端接收到的错误会有 code 和 desc 字段的原因，因为 gRPC 实际上返回给客户端的是一个`Status`
，其具体类型如下，可以看出也是一个 protobuf 定义的 message。

```go
type Status struct {
   state         protoimpl.MessageState
   sizeCache     protoimpl.SizeCache
   unknownFields protoimpl.UnknownFields

   Code int32 `protobuf:"varint,1,opt,name=code,proto3" json:"code,omitempty"`
   Message string `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
   Details []*anypb.Any `protobuf:"bytes,3,rep,name=details,proto3" json:"details,omitempty"`
}
```

```protobuf
message Status {
  // The status code, which should be an enum value of
  // [google.rpc.Code][google.rpc.Code].
  int32 code = 1;

  // A developer-facing error message, which should be in English. Any
  // user-facing error message should be localized and sent in the
  // [google.rpc.Status.details][google.rpc.Status.details] field, or localized
  // by the client.
  string message = 2;

  // A list of messages that carry the error details.  There is a common set of
  // message types for APIs to use.
  repeated google.protobuf.Any details = 3;
}
```

### 错误码

Status 结构体中的 Code，是一种类似 Http Status 形式的存在，用于表示当前 rpc 请求的状态，gRPC 定义了 16 个 code 位于`grpc/codes`
，涵盖了大部分的场景，分别如下所示

```go
// A Code is an unsigned 32-bit error code as defined in the gRPC spec.
type Code uint32

const (
  // 调用成功
  OK Code = 0

  // 请求被取消
  Canceled Code = 1

  // 未知错误
  Unknown Code = 2

  // 参数不合法
  InvalidArgument Code = 3

    // 请求超时
  DeadlineExceeded Code = 4

  // 资源不存在
  NotFound Code = 5

    // 已存在相同的资源（能出现这个我是没想到的）
  AlreadyExists Code = 6

  // 权限不足被拒绝访问
  PermissionDenied Code = 7

  // 资源枯竭，剩下的容量不足以使用，比如磁盘容量不够了之类的情况
  ResourceExhausted Code = 8

  // 执行条件不足，比如使用rm删除一个非空的目录，删除的条件是目录是空的，但条件不满足
  FailedPrecondition Code = 9

  // 请求被打断
  Aborted Code = 10

  // 操作访问超出限制范围
  OutOfRange Code = 11

  // 表示当前服务没有实现
  Unimplemented Code = 12

  // 系统内部错误
  Internal Code = 13

  // 服务不可用
  Unavailable Code = 14

  // 数据丢失
  DataLoss Code = 15

  // 没有通过认证
  Unauthenticated Code = 16

  _maxCode = 17
)
```

`grpc/status`包提供了相当多的函数以方 status 与 error 之间的相互转换。我们可以直接使用`status.New`来创建一个 Status，或者`Newf`

```go
func New(c codes.Code, msg string) *Status

func Newf(c codes.Code, format string, a ...interface{}) *Status
```

例如下面的代码

```go
success := status.New(codes.OK, "request success")
notFound := status.Newf(codes.NotFound, "person not found: %s", name)
```

通过 status 的 err 方法可以获取到其中的 error，当状态为 ok 的时候 error 为 nil。

```go
func (s *Status) Err() error {
  if s.Code() == codes.OK {
    return nil
  }
  return &Error{s: s}
}
```

也可以直接创建 error

```go
func Err(c codes.Code, msg string) error

func Errorf(c codes.Code, format string, a ...interface{}) error
```

```go
success := status.Error(codes.OK, "request success")
notFound := status.Errorf(codes.InvalidArgument, "person not found: %s", name)
```

于是我们可以将服务代码修改成如下

```go
func (p *PersonService) GetPersonInfo(ctx context.Context, name *wrapperspb.StringValue) (*person.PersonInfo, error) {
  value, ok := personData.Load(name.Value)
  if !ok {
    return nil, status.Errorf(codes.NotFound, "person not found: %s", name.String())
  }
  personInfo := value.(*person.PersonInfo)
  return personInfo, status.Errorf(codes.OK, "request success")
}
```

在此之前，服务端返回的所有的 code 都是 unknown，现在经过修改后有了更加明确的语义。于是在客户端就可以通过`status.FromError`
或者使用下面的函数从 error 中获取 status，从而根据不同的 code 来做出响应的处理

```go
func FromError(err error) (s *Status, ok bool)

func Convert(err error) *Status

func Code(err error) codes.Code
```

示例如下

```go
info, err := client.GetPersonInfo(ctx, wrapperspb.String("john"))
s, ok := status.FromError(err)
switch s.Code() {
case codes.OK:
case codes.InvalidArgument:
    ...
}
```

不过尽管 grpc 的 code 已经尽可能的涵盖了一些通用场景，不过有时候还是无法满足开发人员的需求，这个时候就可以使用 Status 中的 Details 字段，并且它还是一个切片，可以容纳多个信息。通过`Status.WithDetails`
来传入一些自定义的信息

```go
func (s *Status) WithDetails(details ...proto.Message) (*Status, error)
```

通过`Status.Details`来获取信息

```go
func (s *Status) Details() []interface{}
```

需要注意的是，传入的信息最好是由 protobuf 定义的，这样才能方便服务端客户端两端都能解析，官方给出了几个示例

```protobuf
message ErrorInfo {
  // 错误的原因
  string reason = 1;

  // 定义服务的主体
  string domain = 2;

  // 其他信息
  map<string, string> metadata = 3;
}

// 重试信息
message RetryInfo {
  // 同一个请求的等待间隔时间
  google.protobuf.Duration retry_delay = 1;
}

// 调试信息
message DebugInfo {
  // 堆栈
  repeated string stack_entries = 1;

  // 一些细节信息
  string detail = 2;
}

    ...
    ...
```

更多的例子可以前往[googleapis/google/rpc/error_details.proto at master · googleapis/googleapis (github.com)](https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto)
查看。如果需要可以通过下面的代码来引入。

```go
import "google.golang.org/genproto/googleapis/rpc/errdetails"
```

使用`ErrorInfo`作为 details

```go
notFound := status.Newf(codes.NotFound, "person not found: %s", name)
  notFound.WithDetails(&errdetails.ErrorInfo{
    Reason:   "person not found",
    Domain:   "xxx",
    Metadata: nil,
  })
```

在客户端就可以拿到数据做出处理，不过上述只是 gRPC 推荐使用的一些例子，除此之外，同样也可以自己定义 message，来更好的满足相应的业务需求，如果想做一些统一的错误处理，也可以放到拦截器里面操作。

## 超时控制

![](/images/grpc/chain.png)

在大多数情况下，通常不会只有一个服务，并且可能上游有很多服务，下游也有很多服务。客户端发起一次请求，从最上游的服务到最下游，就形成了一个服务调用链，就像图中那样，或许可能比图中的还要长。

如此长的一个调用链，如果其中一个服务的逻辑处理需要花费很长时间，就会导致上游一直处于等待状态。为了减少不必要的资源浪费，因此有必要引入超时这一机制，这样一来最上游调用时传入的超时时间，便是整个调用链所允许的执行花费最大时间。而 gRPC 可以跨进程跨语言传递超时，它把一些需要跨进程传递的数据放在了 HTTP2 的`HEADERS Frame`
帧中，如下图

![](/images/grpc/http2.png)

gRPC 请求中的超时数据对应着`HEADERS Frame`中的`grpc-timeout`
字段。需要注意的是，并不是所有的 gRPC 库都实现了这一超时传递机制，不过`gRPC-go`肯定是支持的，如果使用其他语言的库，并且使用了这一特性，则需要额外留意这一点。

### 连接超时

gRPC 客户端在向服务端建立连接时，默认是异步建立的，如果连接建立失败只会返回一个空的 Client。如果想要使连接同步进行，则可以使用`grpc.WithBlock()`
来使连接未建立成功时阻塞等待。

```go
dial, err := grpc.Dial("localhost:9091",
    grpc.WithBlock(),
    grpc.WithTransportCredentials(insecure.NewCredentials()),
    grpc.WithChainUnaryInterceptor(UnaryPersonClientInterceptor),
    grpc.WithChainStreamInterceptor(StreamPersonClientInterceptor),
)
```

如果想要控制一个超时时间，则只需要传入一个 TimeoutContext，使用`grpc.DialContext`来替代`gprc.Dial`以传入 context。

```go
timeout, cancelFunc := context.WithTimeout(context.Background(), time.Second)
defer cancelFunc()
dial, err := grpc.DialContext(timeout, "localhost:9091",
    grpc.WithBlock(),
    grpc.WithTransportCredentials(insecure.NewCredentials()),
    grpc.WithChainUnaryInterceptor(UnaryPersonClientInterceptor),
    grpc.WithChainStreamInterceptor(StreamPersonClientInterceptor),
)
```

如此一来，如果连接建立超时，就会返回 error

```
context deadline exceeded
```

在服务端同样也可以设置连接超时，在与客户端建立新连接的时候设置一个超时时间，默认是 120 秒，如果在规定时间内没有成功建立连接，服务端会主动断开连接。

```go
server := grpc.NewServer(
    grpc.ConnectionTimeout(time.Second*3),
)
```

::: tip

`grpc.ConnectionTimeout`仍处于实验阶段，未来的 API 可能会被修改或删除。

:::

### 请求超时

gRPC 客户端在发起请求的时候，第一个参数就是`Context`类型，同样的，要想给 RPC 请求加上一个超时时间，只需要传入一个 TimeoutContext 即可

```go
timeout, cancel := context.WithTimeout(ctx, time.Second*3)
defer cancel()
info, err := client.GetPersonInfo(timeout, wrapperspb.String("john"))
switch status.Code(err) {
case codes.DeadlineExceeded:
    // 超时逻辑处理
}
```

经过 gRPC 的处理，超时时间被传递到了服务端，在传输过程中它以在帧字段的形式存在中，在 go 里面它以 context 的形式存在，就此在整个链路中进行传递。在链路传递过程中，不建议去修改超时时间，具体在请求时设置多长的超时时间，这应该是最上游应该考虑的问题。

## 认证授权

在微服务领域中，每一个服务都需要对请求验证用户身份和权限，如果和单体应用一样，每个服务都要自己实现一套认证逻辑，这显然是不太现实的。所以需要一个统一的认证与授权服务，而常见的解决方案是使用 OAuth2，分布式 Session，和 JWT，这其中，OAuth2 使用最为广泛，一度已经成为了业界标准，OAuth2 最常用的令牌类型就是是 JWT。下面是一张 OAuth2 授权码模式的流程图，基本流程如图所示。

![](/images/grpc/auth.png)

## 安全传输

## 服务注册与发现

客户端调用服务端的指定服务之前，需要知晓服务端的 ip 和 port，在先前的案例中，服务端地址都是写死的。在实际的网络环境中不总是那么稳定，一些服务可能会因故障下线而无法访问，也有可能会因为业务发展进行机器迁移而导致地址变化，在这些情况下就不能使用静态地址访问服务了，而这些动态的问题就是服务发现与注册要解决的，服务发现负责监视服务地址的变化并更新，服务注册负责告诉外界自己的地址。gRPC 中，提供了基础的服务发现功能，并且支持拓展和自定义。

不能用静态地址，可以用一些特定的名称来进行代替，比如浏览器通过 DNS 解析域名来获取地址，同样的，gRPC 默认的服务发现就是通过 DNS 来进行的，修改本地的 host 文件，添加如下映射

```
127.0.0.1 example.grpc.com
```

然后将 helloworld 示例中客户端 Dial 的地址改为对应的域名

```go
func main() {
  // 建立连接，没有加密验证
  conn, err := grpc.Dial("example.grpc.com:8080",
    grpc.WithTransportCredentials(insecure.NewCredentials()),
  )
  if err != nil {
    panic(err)
  }
  defer conn.Close()
  // 创建客户端
  client := hello2.NewSayHelloClient(conn)
  // 远程调用
  helloRep, err := client.Hello(context.Background(), &hello2.HelloReq{Name: "client"})
  if err != nil {
    panic(err)
  }
  log.Printf("received grpc resp: %+v", helloRep.String())
}

```

同样能看到正常的输出

```
2023/08/26 15:52:52 received grpc resp: msg:"hello world! client"
```

在 gRPC 中，这类名称必须要遵守 RFC 3986 中定义的 URI 语法，格式为

```
                   hierarchical part
        ┌───────────────────┴─────────────────────┐
                    authority               path
        ┌───────────────┴───────────────┐┌───┴────┐
  abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
scheme  user information     host     port                  query         fragment
```

上例中的 URI 就是如下形式，由于默认支持 dns 所以省略掉了前缀的 scheme。

```
dns:example.grpc.com:8080
```

除此之外 gRPC 还默认支持 Unix domain
sockets，而对于其他的方式，需要我们根据 gRPC 的拓展来进行自定义实现，为此需要实现一个自定义的解析器`resolver.Resovler`
，resolver 负责监控目标地址和服务配置的更新。

```go
type Resolver interface {
    // gRPC将调用ResolveNow来尝试再次解析目标名称。这只是一个提示，如果不需要，解析器可以忽略它，该方法可能被并发的调用
  ResolveNow(ResolveNowOptions)
  Close()
}
```

gRPC 要求我们传入一个 Resolver 构造器，也就是`resolver.Builder`，它负责构造 Resolver 实例。

```go
type Builder interface {
  Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)
  Scheme() string
}
```

Builder 的 Scheme 方法返回它负责解析的 Scheme 类型，例如默认的 dnsBuilder 它返回的就是`dns`
，构造器在初始化时应该使用`resolver.Register`注册到全局 Builder 中，又或者作为 options，使用`grpc.WithResolver`
传入 ClientConn 内部，后者的优先级高于前者。

![](/images/grpc/discover.png)

上图简单描述了一下 resolver 的工作流程，接下来就演示如何自定义 resolver

### 自定义服务解析

下面编写一个自定义解析器，需要一个自定义的解析构造器来进行构造。

```go
package myresolver

import (
  "fmt"
  "google.golang.org/grpc/resolver"
)

func NewBuilder(ads map[string][]string) *MyBuilder {
  return &MyBuilder{ads: ads}
}

type MyBuilder struct {
  ads map[string][]string
}

func (c *MyBuilder) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
  if target.URL.Scheme != c.Scheme() {
    return nil, fmt.Errorf("unsupported scheme: %s", target.URL.Scheme)
  }
  m := &MyResolver{ads: c.ads, t: target, cc: cc}
    // 这里必须要updatestate，否则会死锁
  m.start()
  return m, nil
}

func (c *MyBuilder) Scheme() string {
  return "hello"
}

type MyResolver struct {
  t   resolver.Target
  cc  resolver.ClientConn
  ads map[string][]string
}

func (m *MyResolver) start() {
  addres := make([]resolver.Address, 0)
  for _, ad := range m.ads[m.t.URL.Opaque] {
    addres = append(addres, resolver.Address{Addr: ad})
  }

  err := m.cc.UpdateState(resolver.State{
    Addresses: addres,
        // 配置，loadBalancingPolicy指的是负载均衡策略
    ServiceConfig: m.cc.ParseServiceConfig(
      `{"loadBalancingPolicy":"round_robin"}`),
  })

  if err != nil {
    m.cc.ReportError(err)
  }
}

func (m *MyResolver) ResolveNow(_ resolver.ResolveNowOptions) {}

func (m *MyResolver) Close() {}

```

自定义解析器就是把 map 里面的匹配的地址传入到 updatestate，同时还指定了负载均衡的策略，`round_robin`指的是轮询的意思。

```go
// service config 结构如下
type jsonSC struct {
    LoadBalancingPolicy *string
    LoadBalancingConfig *internalserviceconfig.BalancerConfig
    MethodConfig        *[]jsonMC
    RetryThrottling     *retryThrottlingPolicy
    HealthCheckConfig   *healthCheckConfig
}
```

客户端代码如下

```go
package main

import (
  "context"
  "google.golang.org/grpc"
  "google.golang.org/grpc/credentials/insecure"
  "google.golang.org/grpc/resolver"
  "grpc_learn/helloworld/client/myresolver"
  hello2 "grpc_learn/helloworld/hello"
  "log"
  "time"
)

func init() {
  // 注册builder
  resolver.Register(myresolver.NewBuilder(map[string][]string{
    "myworld": {"127.0.0.1:8080", "127.0.0.1:8081"},
  }))
}

func main() {

  // 建立连接，没有加密验证
  conn, err := grpc.Dial("hello:myworld",
    grpc.WithTransportCredentials(insecure.NewCredentials()),
  )
  if err != nil {
    panic(err)
  }
  defer conn.Close()
  // 创建客户端
  client := hello2.NewSayHelloClient(conn)
     // 每秒调用一次
  for range time.Tick(time.Second) {
    // 远程调用
    helloRep, err := client.Hello(context.Background(), &hello2.HelloReq{Name: "client"})
    if err != nil {
      panic(err)
    }
    log.Printf("received grpc resp: %+v", helloRep.String())
  }

}
```

正常来说，流程应该是服务端向注册中心注册自身服务，然后客户端从注册中心中获取服务列表然后进行匹配，这里传入的 map 就是一个模拟的注册中心，数据是静态的就省略掉了服务注册这一环节，只剩下服务发现。客户端使用的 target 为`hello:myworld`
，hello 是自定义的 scheme，myworld 就是服务名，经过自定义的解析器解析后，就得到了 127.0.0.1:
8080 的真实地址，在实际情况中，为了做负载均衡，一个服务名可能会匹配多个真实地址，所以这就是为什么服务名对应的是一个切片，这里开两个服务端，占用不同的端口，负载均衡策略为轮询，服务端输出分别如下，通过请求时间可以看到负载均衡策略确实是在起作用的，如果不指定策略的话默认只选取第一个服务。

```
// server01
2023/08/29 17:32:21 received grpc req: name:"client"
2023/08/29 17:32:23 received grpc req: name:"client"
2023/08/29 17:32:25 received grpc req: name:"client"
2023/08/29 17:32:27 received grpc req: name:"client"
2023/08/29 17:32:29 received grpc req: name:"client"

// server02
2023/08/29 17:32:20 received grpc req: name:"client"
2023/08/29 17:32:22 received grpc req: name:"client"
2023/08/29 17:32:24 received grpc req: name:"client"
2023/08/29 17:32:26 received grpc req: name:"client"
2023/08/29 17:32:28 received grpc req: name:"client"
```

注册中心其实就是存放着的就是服务注册名与真实服务地址的映射集合，只要是能够进行数据存储的中间件都可以满足条件，甚至拿 mysql 来做注册中心也不是不可以（应该没有人会这么做）。一般来说注册中心都是 KV 存储的，redis 就是一个很不错的选择，但如果使用 redis 来做注册中心的话，我们就需要自行实现很多逻辑，比如服务的心跳检查，服务下线等，服务调度等等，还是相当麻烦的，虽然 redis 在这方面有一定的应用但是较少。正所谓专业的事情交给专业的人做，这方面做的比较出名的有很多：Zookeeper，Consul，Eureka，ETCD，Nacos 等。

可以前往[注册中心对比和选型：Zookeeper、Eureka、Nacos、Consul 和 ETCD - 掘金 (juejin.cn)](https://juejin.cn/post/7068065361312088095)
来了解这几个中间件的一些区别。

### 结合 consul

结合 consul 使用的案例可以前往[consul](community/mirco/consul.mdl#服务注册与发现)

## 负载均衡
