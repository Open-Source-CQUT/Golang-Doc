# gopher-lua

仓库：[yuin/gopher-lua: GopherLua: VM and compiler for Lua in Go (github.com)](https://github.com/yuin/gopher-lua)

文档：[gopher-lua/README.rst at master · yuin/gopher-lua (github.com)](https://github.com/yuin/gopher-lua/blob/master/README.rst)

## 简介

GopherLua 是用 go 编写的 lua 虚拟机和编译器，使用 GoAPI 来为 Go 程序中嵌入 lua 脚本，同时使用 GoAPI 来进行 lua 操作。lua 作为一个短小精悍的脚本语言很受游戏开发的欢迎，所以一些游戏服务器应用较多，需要与 lua 交互时，使用该库可以很方便的通过 Go 来与 lua 进行交互。

## 安装

```
go get github.com/yuin/gopher-lua
```

::: warning

仅支持 Go1.19 以上的版本

:::

## 快速开始

载入 lua 文件

```go
package main

import (
    "github.com/yuin/gopher-lua"
)

func main() {
  L := lua.NewState()
  defer L.Close()
  if err := L.DoFile("hello.lua"); err != nil {
    panic(err)
  }
}
```

或者直接字符串的形式

```go
package main

import (
    "github.com/yuin/gopher-lua"
)

func main() {
  L := lua.NewState()
  defer L.Close()
  if err := L.DoString(`print("hello")`); err != nil {
      panic(err)
  }
}
```
