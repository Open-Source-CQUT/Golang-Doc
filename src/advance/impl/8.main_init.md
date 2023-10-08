# 启动函数

```go
package main

import "fmt"

func main(){
	fmt.Println("hello world!")
}
```

这个例子相信很多人在入门的时候都已经敲过了，`main`函数几乎是每一门语言的入门课程中第一课。但在go中还有一个`init`函数在启动时同样会执行，这个函数相比于前者，就不怎么出名了。



## 异同

相同：两个函数在定义时不能有任何的参数与返回值，且go会自动调用

不同：`main`函数只能存在于`main`包中，只能有一个`main` 函数， 而`init`函数可以在任意包中被定义，且可以重复定义多个。



## 执行顺序

在启动一个程序时，`main`函数永远是最后一个执行的。

```go
package main

import "fmt"

func init() {
   fmt.Println("main init")
}

func main() {
   fmt.Println("main")
}
```

输出

```
main init
main
```

对于`init`函数就稍微有一点点讲究

- 同一文件：同一文件中的`init()`的调用顺序是从上到下
- 同一包：同一包中的`init()`的调用顺序则是比较各文件名在字符串大小，由小到大进行调用每个文件的`init()` 
- 不同包：
    - 存在依赖的话，则先调用最早被依赖的`init()`，
    - 不存在依赖的话，则按照”先导入后调用“的原则调用`init()`



## 前缀

在导入时，可以加上`_`前缀表示调用该包的`init()`，但并不需要导入该包。

```go
import (
	_ "github.com/gin-gonic/gin"
)
```

在导入时，加上`.`前缀可以省略包名

```go
import (
   . "GoProject/src/utils"
)

func main() {
	AddSum(1, 2)
}
```

也可以起别名

```go
import (
   u "GoProject/src/utils"
)

func main() {
	u.AddSum(1, 2)
}
```

