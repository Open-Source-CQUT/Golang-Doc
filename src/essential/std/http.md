---
date: 2022-10-12
---
# http

Go语言标准库中的`net/http`包十分的优秀，提供了非常完善的HTTP客户端与服务端的实现，仅通过几行代码就可以搭建一个非常简单的HTTP服务器。

几乎所有的go语言中的web框架，都是对已有的http包做的封装与修改，因此，十分建议学习其他框架前先行掌握http包。



## Get示例

关于Http相关的知识这里不再赘述，想要了解更多的话可以去百度。

```go
func main() {
	resp, err := http.Get("https://baidu.com")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	content, err := io.ReadAll(resp.Body)
	fmt.Println(string(content))
}
```

通过直接调用Http包下的函数就可以发起简单的请求，会返回一个指针与错误，调用过后必须将其手动关闭。



## Post示例

```go
func main() {
   person := Person{
      UserId:   "120",
      Username: "jack",
      Age:      18,
      Address:  "usa",
   }

   json, _ := json.Marshal(person)
   reader := bytes.NewReader(json)

   resp, err := http.Post("https://golang.org", "application/json;charset=utf-8", reader)
   if err != nil {
      fmt.Println(err)
   }
   defer resp.Body.Close()
}
```



## 客户端

一般情况下，我们都不会直接使用上述的方法，而且会自己配置一个客户端来达到更加细致化的需求。这将会用到`http.Client{}`结构体，可提供的配置项总共有四个:

- `Transport`:配置Http客户端数据传输相关的配置项，没有就采用默认的策略
- `Timeout`：请求超时时间配置
- `Jar`：Cookie相关配置
- `CheckRedirect`：重定向配置



## **简单示例**

```go
func main() {
	client := &http.Client{}
	request, _ := http.NewRequest("GET", "https://golang.org", nil)
	resp, _ := client.Do(request)
	defer resp.Body.Close()
}
```



## **增加header**

```go
func main() {
   client := &http.Client{}
   request, _ := http.NewRequest("GET", "https://golang.org", nil)
   request.Header.Add("Authorization","123456")
   resp, _ := client.Do(request)
   defer resp.Body.Close()
}
```

一些详细的配置这里不会做过多的赘述，还请自行了解。



## 服务端

对于go而言，创建一个http服务器只需要一行代码。

第一个参数是监听的地址，第二个参数是处理器，如果为空的话则使用默认的处理器。大多数情况下使用默认的处理器DefaultServeMux即可。

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

但是每一次都要自定义一个结构体将会十分的繁琐，也可以直接`http.handlerFunc`函数，我们只需要写处理函数即可，从而不用创建结构体。其内部是使用了适配器类型`HandlerFunc`,HandlerFunc类型是一个适配器，允许将普通函数用作HTTP的处理器。如果f是具有适当签名的函数，HandlerFunc(f)是调用f的Handler。

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

http包提供了开箱即用的反向代理功能

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