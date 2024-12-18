# spf13/cast

仓库：[spf13/cast: safe and easy casting from one type to another in Go (github.com)](https://github.com/spf13/cast)

文档：[spf13/cast: safe and easy casting from one type to another in Go (github.com)](https://github.com/spf13/cast#readme)

## 简介

cast是一个简单的类型转换库，用于将一个类型到另一个类型的快速转换，可以省去很多麻烦的操作。

## 安装

```
go get https://github.com/spf13/cast
```

## 例子

字符串

```go
cast.ToString("mayonegg")         // "mayonegg"
cast.ToString(8)                  // "8"
cast.ToString(8.31)               // "8.31"
cast.ToString([]byte("one time")) // "one time"
cast.ToString(nil)                // ""

var foo interface{} = "one more time"
cast.ToString(foo)                // "one more time"
```

整型

```go
cast.ToInt(8)                  // 8
cast.ToInt(8.31)               // 8
cast.ToInt("8")                // 8
cast.ToInt(true)               // 1
cast.ToInt(false)              // 0

var eight interface{} = 8
cast.ToInt(eight)              // 8
cast.ToInt(nil)                // 0
```
