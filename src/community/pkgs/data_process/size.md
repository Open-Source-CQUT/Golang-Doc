# size

dstgo/size 是一个很方便的将字符串与文件大小相互转换的库

仓库地址：[dstgo/size: Fast conversion between file size and string (github.com)](https://github.com/dstgo/size)

文档地址：[dstgo/size: Fast conversion between file size and string (github.com)](https://github.com/dstgo/size#readme)

## 安装

```
$ go get https://github.com/dstgo/size
```

## 使用

```go
const (
  B  Size = 1
  KB      = B * 1024
  MB      = KB * 1024
  GB      = MB * 1024
  TB      = GB * 1024
  PB      = TB * 1024
)
```

```go
type SizeMeta struct {
  Data float64
  Unit Size
}
```

该库使用起来相当简单，只有两个对外暴露的函数

```go
func ParseSize(str string) SizeMeta
```

`ParseSize`将字符串转换成一个`SizeMeta`结构体，存储了数据大小，以及单位大小

```go
func ParseTargetSize(str string, size Size) SizeMeta
```

`ParseTargetSize`将字符串转换成指定大小的`SizeMeta`

示例如下：

```go
package main

import (
  "fmt"
  "github.com/dstgo/size"
)

func main() {
  parseSize := size.ParseSize("1.2MB")
  fmt.Printf("%+v\n", parseSize)
  fmt.Printf("%+v\n", parseSize.Round(1))

  parseSize1 := size.ParseSize("2.3-asdajl")
  fmt.Printf("%+v\n", parseSize1)

  targetSize := size.ParseTargetSize("2.65MB", size.KB)
  fmt.Printf("%+v", targetSize)
  fmt.Printf("%+v", targetSize.String())
}

```

转换后可以使用`Round`方法来修改保留多少位，也可以使用`String`方法来获取其字符串形式，示例输出如下

```
1.20MB
1.2

2713.60KB
```
