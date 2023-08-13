# swag

swaggo/swag是Swagger API 2.0在go语言中的一个实现，通过在书写指定格式的注释就可以生成`swagger.json`和`swagger.yaml`类型的接口文档，方便导出和导入。

仓库：[swaggo/swag: Automatically generate RESTful API documentation with Swagger 2.0 for Go. (github.com)](https://github.com/swaggo/swag)

文档：[swaggo/swag: Automatically generate RESTful API documentation with Swagger 2.0 for Go. (github.com)](https://github.com/swaggo/swag#readme)

swag默认支持的web框架如下所示，本文以gin为例子，来演示gin结合swagger快速生成接口文档的例子。

- [gin](http://github.com/swaggo/gin-swagger)
- [echo](http://github.com/swaggo/echo-swagger)
- [buffalo](https://github.com/swaggo/buffalo-swagger)
- [net/http](https://github.com/swaggo/http-swagger)
- [gorilla/mux](https://github.com/swaggo/http-swagger)
- [go-chi/chi](https://github.com/swaggo/http-swagger)
- [flamingo](https://github.com/i-love-flamingo/swagger)
- [fiber](https://github.com/gofiber/swagger)
- [atreugo](https://github.com/Nerzal/atreugo-swagger)
- [hertz](https://github.com/hertz-contrib/swagger)



::: tip

如果不熟悉swagger语法，可以前往[About Swagger Specification | Documentation | Swagger](https://swagger.io/docs/specification/about/)

:::

## 安装

首先下载swagger命令行工具

```
go install github.com/swaggo/swag/cmd/swag@latest
```

然后下载swagger依赖

```
go get github.com/swaggo/swag
```

然后下载swagger的静态文件库，html，css，js之类的，都被嵌到了go代码中。

```
go get github.com/swaggo/files@latest
```

最后下载swagger的gin适配库

```
go get github.com/swaggo/gin-swagger@latest
```



## 使用

使用go mod创建一个最基本的go项目，新建`main.go`，写入如下内容。

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @BasePath  /api/v1
func main() {
	engine := gin.Default()
	engine.GET("/api/v1/ping", Ping)
	engine.Run(":80")
}

// Ping godoc
// @Summary      say hello world
// @Description  return hello world json format content
// @param       name query    string  true  "name"
// @Tags         system
// @Produce      json
// @Router       /ping [get]
func Ping(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": fmt.Sprintf("Hello World!%s", ctx.Query("name")),
	})
}
```

这是一个很简单的gin web例子，main函数上的注释是文档的基本信息，Ping函数则是一个普通的接口。接下来执行命令生成文档，默认是在`main.go`同级的docs目录下

```
swag init
```

修改`main.go`代码

```go
package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    // 匿名导入生成的接口文档包
    _ "golearn/docs"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @BasePath  /api/v1
func main() {
    engine := gin.Default()
    // 注册swagger静态文件路由
    engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    engine.GET("/api/v1/ping", Ping)
    engine.Run(":80")
}

// Ping godoc
// @Summary      say hello world
// @Description  return hello world json format content
// @param       name query    string  true  "name"
// @Tags         system
// @Produce      json
// @Router       /ping [get]
func Ping(ctx *gin.Context) {
    ctx.JSON(200, gin.H{
       "message": fmt.Sprintf("Hello World!%s", ctx.Query("name")),
    })
}
```

运行程序，访问`127.0.0.1/swagger/index.html`，界面如下

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308132014682.png)

如此便运行起了一个基本的接口文档。接下来除了一些特别要注意的点，基本上和其他语言使用起来没有什么太大的差别。



## 注意事项

1. swag是根据注释来生成openapi的接口描述文件的，在生成时，指定的目录必须要包含接口文档的基本信息，默认是在`main.go`里面查找

2. `swag init`默认指定的是当前目录，值为`./`，可以使用`swag init -d`指定多个目录，使用逗号分隔，第一个指定的目录必须包含接口文档的基本信息。例如

    ```
    swag init -d ./,./api
    ```

3. `-g`，接口文档的基本信息的存放文件可以自定义文件名，默认是`main.go`，在生成文档时，使用`-g`参数指定文件名

    ```
    swag init -g api.go -d ./,./api
    ```

    该命令的意思是在`./api.go`解析接口文档的基本信息，同时在`./`和`./api`两个目录下查找和解析其他接口的注释信息并生成对应的文档。

4. `-o`参数可以指定文档描述文件的输出路径，默认是`./docs`，例:

    ```
    swag init -o ./api/docs
    ```

5. `--ot`可以指定输出文件类型，默认是（docs.go,swagger.json,swagger.yaml），如果想要使用go程序加载swagger ui，go文件是必不可少的。

    ```
    swag init --ot go,yaml
    ```

    其余生成的json和yaml文件可以方便在其他接口管理软件上导入数据。

6. 注释写在哪里都一样，就算不写在函数上也一样能解析，只是写在函数上可读性好一些，本质上还是一个以注释形式和go源代码嵌在一起的DSL。

7. swag还支持很多其他的参数，可以使用`swag init -h`查看。



