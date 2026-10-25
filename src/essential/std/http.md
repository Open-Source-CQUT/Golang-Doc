---
date: 2026-10-25
---

# http

Go 语言标准库中的`net/http`包十分的优秀，提供了非常完善的 HTTP 客户端与服务端的实现，仅通过几行代码就可以搭建一个非常简单的 HTTP 服务器。

几乎所有的 go 语言中的 web 框架，都是对已有的 http 包做的封装与修改，因此，十分建议学习其他框架前先行掌握 http 包。

## 客户端

我们使用golang发送http请求的时候， 主要用到两个结构体 `http.Client` 和 `http.Request`

Client 的作用是处理连接， 超时等内容

Request 的作用是携带 http 请求相关的信息

一般的请求流程为

- 使用 `NewRequest` 或者 `NewRequestWithContext` 创建新的请求
- 设置请求的对应内容
  - 方法
  - 目标 url
  - Body (如有)
  - Content-Type (按需)
- 使用 `Client.Do(req)` 方法发送请求
- 使用相应的方法来解析后端发送的资源 (主要在 Body 中)

### Get 示例

```go
func main() {
    client := &http.Client{}
    req, _ := http.NewRequest(http.MethodGet, "https://golang.org", nil)
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println(err)
    }
    defer resp.Body.Close()
}
```

在这个例子当中, `http.MethodGet` 是 http 包中的常量, 也就是字符串 `GET`

各种 Method 都有对应的方法， 建议使用 `http.Method*` 而不是自己写字符串

然后 resp.Body 是一个 `ReadCloser`, 也就是 `io.Reader` 和 `io.Closer` 的组合接口

**一定要调用 Body 的 Close() 方法**， 否则会导致资源的泄漏

之后我们对 Body 进行处理， 首先要知道它的数据类型是什么， 从 Header 当中获取

```go
ct := resp.Header.Get("Content-Type")
```

之后我们基于类型对 Body 进行操作. 由于它是一个 ReadCloser, 所以我们可以调用 Reader 接口相关的函数

- 保存为文件

```go
file, err := os.Create("output.html")
_, err := io.Copy(file, resp.Body)
```

- 直接读取并打印

```go
data, err := io.ReadAll(resp.Body)
fmt.Println(string(data))
```

- 如果是 json 我们还可以进行序列化

```go
// 这边是自定义的结构体
var d Data

data, err := io.ReadAll(resp.Body)
err := json.Unmarshal(data, &d)
```

### Post 示例

```go
func main() {
    c := http.Client{}

    person := Person{
        UserId:   "120",
        Username: "jack",
        Age:      18,
        Address:  "usa",
    }

    // 序列化为 []byte
    json, _ := json.Marshal(person)

    // 由于 request 的 Body 要求必须是一个 Reader
    // 使用 bytes.NewReader 方法包装
    reqBody := bytes.NewReader(json)

    req, _ := http.NewRequest(http.MethodPost, "https://golang.org", reqBody)
    // 设置 Header
    req.Header.Set("Content-Type", "application/json")

    // 对于需要身份认证的场景， 还可以设置密码
    request.Header.Set("Authorization","123456")

    resp, err := c.Do(req)
    if err != nil {
        fmt.Println(err)
    }
    defer resp.Body.Close()
}
```

设置 Header 的使用 `req.Header.Set(key, value)` 或者 `req.Header.Add(key, value)`

两者的区别在于 Set 方法只保留单个值， 而 Add 则可以为 Header 当中的同一个 key 指定多个值

### 默认 Client

当我们对于 Client 不需要自定义的时候， 可以直接使用 http 包当中的 `DefaultClient` 来发送请求

这省去了自己写一个 Client 结构体的麻烦

```go
func main() {
    req, _ := http.NewRequest(http.MethodGet, "https://golang.org", nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        fmt.Println(err)
    }
    defer resp.Body.Close()
}
```

http包当中还提供了一些相关的 Http Method 的快捷方式

```go
func main() {
    resp, err := http.Get("https://golang.org")
    if err != nil {
        fmt.Println(err)
    }
    defer resp.Body.Close()
}
```

这个写法跟上面是等价的

`http.Post` `http.Head` 也与之类似

## 服务端

对于 go 而言，创建一个 http 服务器只需要一行代码。

第一个参数是监听的地址，第二个参数是处理器，如果为空的话则使用默认的处理器。大多数情况下使用默认的处理器 DefaultServeMux 即可。

```go
http.ListenAndServe("localhost:8080", nil)
```

## **自定义**

当然也可以自定义配置一个服务端

```go
func main() {
   server := &http.Server{
      Addr:              ":8080",
      Handler:           nil,
      TLSConfig:         nil,
      ReadTimeout:       0,
      ReadHeaderTimeout: 0,
      WriteTimeout:      0,
      IdleTimeout:       0,
      MaxHeaderBytes:    0,
      TLSNextProto:      nil,
      ConnState:         nil,
      ErrorLog:          nil,
      BaseContext:       nil,
      ConnContext:       nil,
   }
   server.ListenAndServe()
}
```

一些详细的配置请自行了解。

## **路由**

首先需要首先自定义一个结构体实现`Handler`接口中的`ServeHTTP(ResponseWriter, *Request)`方法，再调用`http.handle()`函数即可

```go
func main() {
   http.Handle("/index", &MyHandler{})
   http.ListenAndServe(":8080", nil)
}

type MyHandler struct {
}

func (h *MyHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
   fmt.Println("my implement")
}
```

但是每一次都要自定义一个结构体将会十分的繁琐，也可以直接`http.handlerFunc`函数，我们只需要写处理函数即可，从而不用创建结构体。其内部是使用了适配器类型`HandlerFunc`,HandlerFunc 类型是一个适配器，允许将普通函数用作 HTTP 的处理器。如果 f 是具有适当签名的函数，HandlerFunc(f)是调用 f 的 Handler。

```go
func main() {
   http.HandleFunc("/index", func(responseWriter http.ResponseWriter, request *http.Request) {
      fmt.Println(responseWriter, "index")
   })
   http.ListenAndServe(":8080", nil)
}
```

`ServerMux`是核心结构体，实现了基本的方法，`DefaultServeMux`是的默认实例。

## **反向代理**

http 包提供了开箱即用的反向代理功能

```go
func main() {
   http.HandleFunc("/forward", func(writer http.ResponseWriter, request *http.Request) {
      director := func(request *http.Request) {
         request.URL.Scheme = "https"
         request.URL.Host = "golang.org"
         request.URL.Path = "index"
      }

      proxy := httputil.ReverseProxy{Director: director}
      proxy.ServeHTTP(writer, request)

   })

   http.ListenAndServe(":8080", nil)
}
```

上述代码会将所有请求转发到`https://golang.org/index`。

## Server 进阶

> [!NOTE]
> 以下内容的相关示例完整文件请参考 <https://github.com/IridiumNan/golang-package-analysis/tree/main/http>

### 核心内容

Server 跟 Client 之间的交互， 在 golang 当中的核心实现是以下内容

- `ServeHTTP` 获取 Request, 使用 ResponseWriter 进行 HTTP 的交互
- `Handler` 核心接口， 只有一个函数 ServeHTTP
- `HandlerFunc` 这是一个 Wrapper, 将一个普通的函数包装成符合 Handler 接口的结构体
- `ResponseWriter` 设置 Header, Body, 返回相应的状态码
- `ServeMux` 根据不同的路径将不同的请求路由到相应的地方， 使用对应的 Handler 处理
- `Serve` 连接网络和 Handler, 开启服务

### Handler

以下是 Handler 的定义

这也是进行 HTTP 交互在应用层所需要的核心

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

其中 `Request` 提供 Client 发送的信息

- ResponseWriter

`ResponseWriter` 提供跟 Client 交互的函数

```go
type ResponseWriter interface {
    Header() Header

    Write([]byte) (int, error)

    WriteHeader(statusCode int)
}
```

Header 函数直接返回 Header, 使用 Set 进行修改

WriteHeader 返回对应的状态码, 为了保证状态码的有效性， 应该使用 `http.Statusxxx` 的常量而避免硬编码

Write 当中的内容会直接写入 Body

核心的流程是

- 从 Request 当中读取需要的信息(按需)
- 处理信息, 进行相应的操作或者准备资源
- 设置 Header 当中的字段
- 使用 `WriteHeader` 写入状态码
- 使用 `Write` 方法将数据主体写入 Body (当然也可以使用各种工具函数)

### HandlerFunc

当我们调用 `http.HandlerFunc` 的时候， 会将这个函数使用 HandlerFunc 结构体包裹起来

之后注册进 `ServeMux`

```go
// The HandlerFunc type is an adapter to allow the use of
// ordinary functions as HTTP handlers. If f is a function
// with the appropriate signature, HandlerFunc(f) is a
// [Handler] that calls f.
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}

```

HanlderFunc 是一个特殊的 Wrapper 使得该函数实现接口 `ServeHTTP`

### Server

Server 处理网络连接， 进行监听和各种网络配置

本地开发基于 http 非加密的协议的时候， 重点关注 `Addr` 和 `Handler` 这两个 Field

当然其他的 Field 在实际的生产实践当中也是非常重要的， 但是我们这里的目的是讲解入门的核心流程

所以我们只看 Addr 和 Handler

```go
type Server struct {
    Addr string

    Handler Handler // handler to invoke, http.DefaultServeMux if nil

    // ...
}
```

我们刚才已经知道实现 `Handler` 接口就是要提供 `ServeHTTP` 函数

所以我们这里使用最简单的方式写一个 Handler

```go
func handlerMinimal(w http.ResponseWriter, r *http.Request) {
    slog.Info("receive a request, reponding with hello")

    w.Write([]byte("Hello 👋 This is a minimal handler"))
}
```

完成这个 Handler 之后我们构建一个 `http.Server`

```go
const addr = "127.0.0.1:8080"
srv := http.Server{
    // set the addr as 127.0.0.1:8080
    Addr: addr,
    // Wrap this raw function
    Handler: http.HandlerFunc(handlerMinimal),
}
```

接下来使用 `ListenAndServe` 启动服务 (它会阻塞主进程)

```go
slog.Info("starting minimal server", "addr", addr)

err := srv.ListenAndServe()
if err != nil {
    log.Fatal(err)
}
```

这个时候我们使用 `curl` 命令进行测试

因为这个handler根本没有解析客户端的数据， 也没有进行 http method 的解析， 所以我们可以使用各种请求都方式， 都会返回相同的结果 (HEAD 除外)

> [!NOTE]
> 如果没有添加 `-v` 参数的话， curl 会将 Body 当中的内容打印出来  
> 需要看状态码或者 Header, 添加 `-v` 选项

```sh
❯ curl http://localhost:8080/ -XGET
Hello 👋 This is a minimal handler%

❯ curl http://localhost:8080/ -XPOST
Hello 👋 This is a minimal handler%

❯ curl http://localhost:8080/ -XDELETE
Hello 👋 This is a minimal handler%

❯ curl http://localhost:8080/ -XPATCH
Hello 👋 This is a minimal handler%
```

### ServeMux

在 HTTP 协议的当中， 请求必须要指明资源的路径

而不同的路径有不同的处理方式

但是目前我们比较纯粹的 HandlerFunc 内部并没有实现将请求定向到对应的 Handler 的能力

路径请求几乎对于所有的服务都是必须的， 所以 http 标准库当中也提供了自动的路径和 Hanlder 注册的结构体

这个结构体就是 `ServeMux` 它也实现了 Hanlder 接口所要求的 `ServeHTTP` 函数

```go
func (mux *ServeMux) ServeHTTP(w ResponseWriter, r *Request) {
    if r.RequestURI == "*" {
        if r.ProtoAtLeast(1, 1) {
            w.Header().Set("Connection", "close")
        }
        w.WriteHeader(StatusBadRequest)
        return
    }
    var h Handler
    if use121 {
        h, _ = mux.mux121.findHandler(r)
    } else {
        h, r.Pattern, r.pat, r.matches = mux.findHandler(r)
    }
    h.ServeHTTP(w, r)
}
```

我们看到它做的事情实际上就是找到这个 Request 所对应的 Handler, 拿到这个 Hanlder 之后直接使用这个 Handler 处理这次请求

那么对于这个结构体来说， 核心的问题就只剩下如何注册 Handler

我们只需要知道两个核心的函数

```go
func (mux *ServeMux) Handle(pattern string, handler Handler)

func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request))
```

实际上这个 HandleFunc 函数就是先将这个 handler 函数包装起来然后注册, 是一种类似于语法糖的东西

### 案例

使用 ServeMux 进行路由

先实现不同路径对应的 handler

```go
func handleRoot(w http.ResponseWriter, r *http.Request) {
    // read user-agent from header
    ua := r.Header.Get("User-Agent")
    slog.Info("receive request", "user-agent", ua, "endpoint", endpointRoot)

    w.Write([]byte("👋 This is root endpoint"))
}

func handleHello(w http.ResponseWriter, r *http.Request) {
    ua := r.Header.Get("User-Agent")
    slog.Info("receive request", "user-agent", ua, "endpoint", endpointHello)

    w.Write([]byte("👋 This is hello endpoint"))
}

func handleHTTP(w http.ResponseWriter, r *http.Request) {
    ua := r.Header.Get("User-Agent")
    slog.Info("receive request", "user-agent", ua, "endpoint", endpointHTTP)

    w.Write([]byte("👋 This is http endpoint"))
}
```

然后创建 ServerMux 并进行注册

```go
    router := http.NewServeMux()

    router.HandleFunc(endpointRoot, handleRoot)
    router.HandleFunc(endpointHello, handleHello)
    router.HandleFunc(endpointHTTP, handleHTTP)
```

最后创建 Server 并启动服务

```go
srv := http.Server{
    Addr:    addr,
    Handler: router,
}

if err := srv.ListenAndServe(); err != nil {
    log.Fatal(err)
}
```

启动服务

然后使用 curl 进行测试

```sh
❯ curl http://localhost:8080/
👋 This is root endpoint%

❯ curl http://localhost:8080/hello
👋 This is hello endpoint%

❯ curl http://localhost:8080/http
👋 This is http endpoint%
```

我们看到不同的请求路径返回了不同的响应

更多的内容也可以查看 `http/server.go`

---

See Also

- <https://pkg.go.dev/net/http>
- <https://towardsdev.com/building-http-middleware-in-go-a-practical-guide-without-third-party-dependencies-0f7727f36764>
