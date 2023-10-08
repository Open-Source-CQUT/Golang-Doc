---
date: 2022-10-01
---
# flag

Go语言内置的Flag包实现了命令行参数的解析，Flag包使得开发命令行工具更加简单。



## 导入

```go
import flag
```



## 类型

其支持的类型有:

- bool
- int
- int64
- uint
- uint64
- float
- float64
- string
- duration



## 定义

使用`flag.Type()`来定义，返回值是指针

```go
name := flag.String("name", "张三", "姓名")
age := flag.Int("age", 15, "年龄")
sex := flag.Bool("sex", true, "性别")
```

也可以使用`flag.TypeVar()`来定义

```go
var name string
var age int
var sex bool
flag.StringVar(&name, "name", "张三", "姓名")
flag.IntVar(&age, "age", 15, "年龄")
flag.BoolVar(&sex, "sex", true, "性别")
```



## 解析

通过调用`flag.Parse()`来解析参数，支持的命令行参数格式有如下几种:

- `-flag xxx`
- `--flag xxx`
- `-flag=xxx`
- `--flag=xxx`

布尔类型的参数必须使用等号，Flag解析会在第一个非命令行参数之前停止。



## 其他

```go
func Args() []string //返回所有非命令参数

func NArg() int //返回非命令行参数的个数

func NFlag() int //返回命令行参数的个数 
```



## 示例

```go
var name string
var age int
var sex bool
flag.StringVar(&name, "name", "张三", "姓名")
flag.IntVar(&age, "age", 15, "年龄")
flag.BoolVar(&sex, "sex", true, "性别")

flag.Parse()
fmt.Println(name, age, sex)
```

编译后在命令行启动程序

```powershell
PS D:\WorkSpace\Code\GoProject\bin> .\go_build_GoProject_src_main.exe
张三 15 true
PS D:\WorkSpace\Code\GoProject\bin> .\go_build_GoProject_src_main.exe -h
Usage of D:\WorkSpace\Code\GoProject\bin\go_build_GoProject_src_main.exe:
  -age int
        年龄 (default 15)
  -name string
        姓名 (default "张三")
  -sex
        性别 (default true)
PS D:\WorkSpace\Code\GoProject\bin> .\go_build_GoProject_src_main.exe -age 15 -name "李四" -sex=false
李四 15 false
PS D:\WorkSpace\Code\GoProject\bin>
```

