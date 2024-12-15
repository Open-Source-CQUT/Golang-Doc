# HttpRouter

仓库地址： [julienschmidt/httprouter: A high performance HTTP request router that scales well (github.com)](https://github.com/julienschmidt/httprouter)

Gin 的路由组件采用的是`HttpRouter`，这同样也是一个轻量，高性能的路由组件，整个组件只有三个`.go`文件，代码十分的简洁，其主要有以下特点。

**一对一匹配**：一个请求只能匹配到零个或一个路由，且有利于 SEO 优化。

**路径自动校正**：随意选择喜欢的 URL 风格，就算多了或者少了一个斜杠，也会自动重定向。如果有大小写错误的话，查找时也会忽略大小写进行正确的重定向。

**路由参数自动解析**：只要给路径段一个名称，路由器就会把动态值传递给你。由于路由器的设计，路径参数解析的占用非常低廉。

**零垃圾**：在路由分配与调度的过程中，不会产生任何内存垃圾。

**RefstfulAPI 支持**：路由器的设计鼓励合理的分层的 Restful API。

**错误处理**：可以设置一个错误处理器来处理请求中的异常，路由器会将其捕获并记录，然后重定向到错误页面。

## 基本用法

就像是`springboot`一样，一个函数绑定一个 URL 且对应一个处理器。

```go
package main

import (
   "fmt"
   "github.com/julienschmidt/httprouter"
   "log"
   "net/http"
)

func Hello(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
   fmt.Fprintf(w, "<h1>Hello World!")
}

func main() {
   router := httprouter.New()
   router.GET("/hello", Hello)
   log.Fatal(http.ListenAndServe(":8080", router))
}
```

随后用浏览器或者任何的接口测试工具输入`127.0.0.1:8080`，即可看到正确的内容，我们可以看到`HttpRouter`仅仅只是做了路由，实际上依旧是采用的`net/http`默认组件，`gin`也是如此，只不过封装的相对而言要更深一点。

## 命名参数

```go
package main

import (
   "fmt"
   "github.com/julienschmidt/httprouter"
   "log"
   "net/http"
)

func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
   fmt.Fprintf(w, "<h1>Hello World!")
}

func main() {
   router := httprouter.New()
   router.GET("/hello:name", Hello)
   log.Fatal(http.ListenAndServe(":8080", router))
}
```

这次的路由后面加了一个`:name`，`name`就是一个命名参数，可以通过`httprouter.Params`来访问参数切片，可以通过索引或者`ByName(name)`来获取参数。同样的，你可以把`http.handler`和`http.handlerFunc`当作`httprouter.handler`来使用，路由本身实现了其接口，例如下方的例子。

```go
func Hello(w http.ResponseWriter, r *http.Request) {
    params := httprouter.ParamsFromContext(r.Context())
    //params := r.Context().Value(httprouter.ParamsKey)也可以

    fmt.Fprintf(w, "hello, %s!\n", params.ByName("name"))
}
```

当方法绑定的路由是`/user/:user`，下面的几种 URL 的匹配情况

```
 /user/gordon              match
 /user/you                 match
 /user/gordon/profile      no match
 /user/                    no match
```

你不能将`/user/new`和`/user/:user`注册到同一个请求方法上，每一个请求方法应当是相互独立的。

## 捕获全部参数

第二种类型是捕获全部参数，顾名思义，他们匹配一切，因此必须位于`Pattern`的尾部。

```go
Pattern: /src/*filepath

 /src/                     match
 /src/somefile.go          match
 /src/subdir/somefile.go   match
```

`HttpRouter`的工作原理是构建大量的前缀树，感兴趣的可以了解：[httprouter package - github.com/julienschmidt/httprouter - Go Packages](https://pkg.go.dev/github.com/julienschmidt/httprouter#readme-how-does-it-work)。

## OPTIONS & CORS

有些人可能会希望修改对于 OPTIONS 的自动响应并设置一些响应头来适配 CORS 的预检请求，这些需求可以通过使用`Router.GlobalOPTIONS`handler 来实现。

```go
router.GlobalOPTIONS = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Access-Control-Request-Method") != "" {
        // 设置CORS响应头
        header := w.Header()
        header.Set("Access-Control-Allow-Methods", r.Header.Get("Allow"))
        header.Set("Access-Control-Allow-Origin", "*")
    }

    // 适配状态码204
    w.WriteHeader(http.StatusNoContent)
})
```

## NOT FOUND 处理器

::: tip

可能需要关闭`Router.HandleMethodNotAllowed`，来避免一些问题。

:::

```go
router.NotFound = http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
  //你的逻辑
})
```

## 基本校验

```go
package main

import (
  "fmt"
  "log"
  "net/http"

  "github.com/julienschmidt/httprouter"
)

func BasicAuth(h httprouter.Handle, requiredUser, requiredPassword string) httprouter.Handle {
  return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    //获取基本的身份凭据
    user, password, hasAuth := r.BasicAuth()

    if hasAuth && user == requiredUser && password == requiredPassword {
      // 将请求委派给给予的处理器
      h(w, r, ps)
    } else {
      // 否则请求认证
      w.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
      http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
    }
  }
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  fmt.Fprint(w, "Not protected!\n")
}

func Protected(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  fmt.Fprint(w, "Protected!\n")
}

func main() {
  user := "gordon"
  pass := "secret!"

  router := httprouter.New()
  router.GET("/", Index)
  router.GET("/protected/", BasicAuth(Protected, user, pass))

  log.Fatal(http.ListenAndServe(":8080", router))
}
```
