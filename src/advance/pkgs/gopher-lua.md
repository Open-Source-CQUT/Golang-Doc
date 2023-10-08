# gopher-lua

仓库：[yuin/gopher-lua: GopherLua: VM and compiler for Lua in Go (github.com)](https://github.com/yuin/gopher-lua)

文档：[gopher-lua/README.rst at master · yuin/gopher-lua (github.com)](https://github.com/yuin/gopher-lua/blob/master/README.rst)



## 简介

GopherLua是用go编写的lua虚拟机和编译器，使用GoAPI来为Go程序中嵌入lua脚本，同时使用GoAPI来进行lua操作。lua作为一个短小精悍的脚本语言很受游戏开发的欢迎，所以一些游戏服务器应用较多，需要与lua交互时，使用该库可以很方便的通过Go来与lua进行交互。



## 安装

```
go get github.com/yuin/gopher-lua
```

::: warning

仅支持Go1.19以上的版本

:::



## 快速开始

载入lua文件

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

