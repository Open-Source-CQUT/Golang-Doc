# gPRC

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161153673.png)

远程过程调用rpc应该是微服务当中必须要学习的一个点了，在学习的过程中会遇到各式各样的rpc框架，不过在go这个领域，几乎所有的rpc框架都是基于gRPC的，并且它还成为了云原生领域的一个基础协议，为什么选择它，官方如下回答：

> gRPC 是一个现代化的开源高性能远程过程调用(Remote Process Call，RPC)框架，可以在任何环境中运行。它可以通过可插拔的负载平衡、跟踪、健康检查和身份验证支持，有效地连接数据中心内和数据中心之间的服务。它还适用于连接设备、移动应用程序和浏览器到后端服务的最后一英里分布式计算。

官方网址：[gRPC](https://grpc.io/)

官方文档：[Documentation | gRPC](https://grpc.io/docs/)

gRPC技术教程：[Basics tutorial | Go | gRPC](https://grpc.io/docs/languages/go/basics/)

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

### 定义protobuf文件

其中，在`pb/hello.proto`中，写入如下内容，这是一个相当简单的示例，如果不会protoc语法，请移步相关教程。

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

编写完成后，使用protoc编译器生成数据序列化相关的代码，使用生成器生成rpc相关代码

```sh
$ protoc -I ./pb \
		--go_out=./hello ./pb/*.proto\
		--go-grpc_out=./hello ./pb/*.proto
```

此时可以发现`hello`文件夹生成了`hello.pb.go`和`hello_grpc.pb.go`文件，浏览`hello.pb.go`可以发现我们定义的message

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

在本例中，客户端建立好连接后，在调用远程方法时就跟调用本地方法一样，直接访问`client`的`Hello`方法并获取结果，这就是一个最简单的GRPC例子，许多开源的框架也都是对这一个流程进行了封装。



## bufbuild

在上述例子中，是直接使用命令生成的代码，如果后期插件多了命令会显得相当繁琐，这时可以通过工具来进行管理protobuf文件，正好就有这么一个开源的管理工具`bufbuild/buf`。

开源地址：[bufbuild/buf: A new way of working with Protocol Buffers. (github.com)](https://github.com/bufbuild/buf)

文档地址：[Buf - Install the Buf CLI](https://buf.build/docs/installation)

**特点**

- BSR管理
- Linter
- 代码生成
- 格式化
- 依赖管理

有了这个工具可以相当方便的管理protobuf文件。



文档中提供了相当多的安装方式，可以自己选择。如果本地安装了go环境的话，直接使用`go install`安装即可

```sh
$ go install github.com/bufbuild/buf/cmd/buf@latest
```

安装完毕后查看版本

```sh
$ buf --version
1.24.0
```

来到`helloworld/pb`文件夹，执行如下命令创建一个module来管理pb文件。

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

完成后就可以看到生成的文件了，当然buf不止这点功能，其他的功能可以自己去文档学习。



## 流式RPC

grpc的调用方式有两大类，一元RPC（Unary RPC）和流式RPC（Stream RPC）。Hello World中的示例就是一个典型的一元RPC。

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162029789.png)

一元rpc（或者叫普通rpc更能理解些，实在不知道怎么翻译这个`unary`了）用起来就跟普通的http一样，客户端请求，服务端返回数据，一问一答的方式。而流式RPC的请求和响应都 可以是流式的，如下图

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162033200.png)

使用流式请求时，只返回一次响应，客户端可以通过流来多次发送参数给服务端，服务端可以不需要像一元RPC那样等到所有参数都接收完毕再处理，具体处理逻辑可以由服务端决定。正常情况下，只有客户端可以主动关闭流式请求，一旦流被关闭，当前RPC请求也就会结束。

使用流式响应时，只发送一次参数，服务端可以通过流多次发送数据给客户端，客户端不需要像一元RPC那样接受完所有数据再处理，具体的处理逻辑可以由客户端自己决定。正常请求下，只有服务端可以主动关闭流式响应，一旦流被关闭，当前RPC请求也就会结束。

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

通过buf生成代码

```sh
$ buf generate
```

这里演示是消息服务，`receiveMessage`接收一个指定的用户名，类型为字符串，返回消息流，`sendMessage`接收消息流，返回成功发送的消息数目，类型为64位整型。接下来创建`server/message_service.go`，自己实现默认的代码生成的服务

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

可以看到，流式RPC并不像一元RPC那样入参和返回值都可以很明确的体现在函数签名上，这些方法乍一看是看不出来入参和返回值是什么类型的，需要调用传入的Stream类型完成流式传输，接下来开始编写服务端的具体逻辑。在编写服务端逻辑的时候，用了一个`sync.map`来模拟消息队列，当客户端发送`ReceiveMessage`请求时，服务端通过流式响应不断返回客户端想要的消息，直到超时过后断开请求。当客户端请求`SendMessage`时，通过流式请求不断发送消息过来，服务端不断的将消息放入队列中，直到客户端主动断开请求，并返回给客户端消息发送条数。

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

通过这个例子可以发现单向流式RPC请求处理起来的话不论是客户端还是服务端都要比一元rpc复杂，不过双向流式RPC比它们还要更复杂些。

### 双向流式

双向流式PRC，即请求和响应都是流式的，就相当于把上例中的两个服务结合成一个。对于流式RPC而言，第一个请求肯定是由客户端发起的，随后客户端可以随时通过流来发送请求参数，服务端也可以随时通过流来返回数据，不管哪一方主动关闭流，当前请求都会结束。

::: tip

后续的内容除非必要，都会直接省略掉pb代码生成以及创建rpc客户端服务端这些步骤的代码描述

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

metadata本质上是一个map，它的value是一个字符串切片，就类似http1的header一样，并且它在gRPC中扮演的角色也和http header类似，提供一些本次RPC调用的一些信息，同时metadata的生命周期跟随着一次rpc调用的整个过程，调用结束，它的生命周期也就结束了。

它在gRPC中主要通过`context`来进行传输和存储，不过gRPC提供了`metadata`包，里面有相当多的方便函数来简化操作，不需要我们去手动操作`context `。metadata在gRPC中对应的类型为`metadata.MD`，如下所示。

```go
// MD is a mapping from metadata keys to values. Users should use the following
// two convenience functions New and Pairs to generate MD.
type MD map[string][]string
```

我们可以直接使用`metadata.New`函数来创建，不过在创建之前，有几个点需要注意

```go
func New(m map[string]string) MD
```

metadata对键名有所限制，仅能是以下规则限制的字符：

- ASCII字符
- 数字：0-9
- 小写字母：a-z
- 大写字母：A-Z
- 特殊字符：-_

::: tip

在metadata中，大写的字母都会被转换为小写，也就是说会占用同一个key，值也会被覆盖。

:::

::: tip

以`grpc-`开头的key是grpc保留使用的内部key，如果使用这类key的话可能会导致一些错误。

:::

### 手动创建

创建metadata的方式有很多，这里介绍手动创建metadata最常用的两种方法，第一种就是使用`metadata.New`函数，直接传入一个map。

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

还可以使用`metadata.join`来合并多个metadata

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

**获取metadata**

服务端获取metadata可以使用`metadata.FromIncomingContext`函数来获取

```go
func FromIncomingContext(ctx context.Context) (MD, bool)
```

对于一元rpc而言，service的参数里面会带一个`context`参数，直接从里面获取metadata即可

```go
func (h *HelloWorld) Hello(ctx context.Context, name *wrapperspb.StringValue) (*wrapperspb.StringValue, error) {
	md, b := metadata.FromIncomingContext(ctx)
	...
}
```

对于流式rpc，service的参数里面会有一个流对象，通过它可以获取流的`context`

```go
func (m *ChatService) Chat(chatServer message.ChatService_ChatServer) error {
	md, b := metadata.FromIncomingContext(chatServer.Context())
    ...
}
```

**发送metadata**

发送metadata可以使用`grpc.sendHeader`函数

```go
func SendHeader(ctx context.Context, md metadata.MD) error
```

该函数最多调用一次，在一些导致header被自动发送的事件发生后使用则不会生效。在一些情况下，如果不想直接发送header，这时可以使用`grpc.SetHeader`函数。

```go
func SetHeader(ctx context.Context, md metadata.MD) error 
```

该函数多次调用的话，会将每次传入的metadata合并，并在以下几种情况发送给客户端

- `gprc.SendHeader`和`Servertream.SendHeader`被调用时
- 一元rpc的handler返回时
- 调用流式rpc中流对象的`Stream.SendMsg`时
- rpc请求的状态变为`send out`，这种情况要么是rpc请求成功了，要么就是出错了。

对于流式rpc而言，建议使用流对象的`SendHeader`方法和`SetHeader`方法。

```go
type ServerStream interface {
	SetHeader(metadata.MD) error
	SendHeader(metadata.MD) error
	SetTrailer(metadata.MD)
	...
}
```

::: tip

在使用过程中会发现Header和Trailer两个功能差不多，不过它们的主要区别在于发送的时机，一元rpc中可能体会不到，但是这一差别在流式RPC中尤为明显，因为流式RPC中的Header可以不用等待请求结束就可以发送Header。前面提到过了Header会在特定的情况下被发送，而Trailer仅仅只会在整个RPC请求结束后才会被发送，在此之前，获取到的trailer都是空的。

:::

### 客户端使用

**获取metadata**

客户端想要获取响应的header，可以通过`grpc.Header`和`grpc.Trailer`来实现

```go
func Header(md *metadata.MD) CallOption
```

```go
func Trailer(md *metadata.MD) CallOption
```

不过需要注意的是，并不能直接获取，可以看到以上两个函数返回值是`CallOption`，也就是说是在发起RPC请求时作为option参数传入的。

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

在请求完成后，会将值写到传入的md中。对于流式rpc而言，可以通过发起请求时返回的流对象直接获取

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
trailer, err := Stream.Trailer()
```

**发送metadata**

客户端想要发送metadata很简单，之前提到过metadata的表现形式就是valueContext，将metadata结合到context中，然后在请求的时候把context传入即可，`metadata`包提供了两个函数来方便构造context。

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

如果原有的ctx已经有metadata了的话，再使用`NewOutgoingContext`会将先前的数据直接覆盖掉，为了避免这种情况，可以使用下面这个函数，它不会覆盖，而是会将数据合并。

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

## TLS安全传输

## 自定义认证