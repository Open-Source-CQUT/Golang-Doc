---
date: 2022-10-20
---
# log

Go语言标准库log包实现了简单的日志。

```go
func main() {
   log.Println("日志")
   log.Panicln("panic日志")
   log.Fatalln("错误日志")
}
```

Fatal会在写入日志信息后调用`os.exit(1)`，panic则会抛出`panic`



## 前缀

```go
func (l *Logger) Prefix() string //获取前缀

func (l *Logger) SetPrefix(prefix string) //设置前缀
```

例子

```go
func main() {
	log.SetPrefix("[main]")
	log.Println("日志")
	log.Panicln("panic日志")
}
```



## Flag

方法

```go
func (l *Logger) Flags() int //访问

func (l *Logger) SetFlags(flag int) //设置
```

常量

```go
const (
   Ldate         = 1 << iota     // 日期
   Ltime                         // 时间
   Lmicroseconds                 // 微秒
   Llongfile                     // 完成文件名称
   Lshortfile                    // 短文件名称
   LUTC                          // 时区
   Lmsgprefix                    // 前缀
   LstdFlags     = Ldate | Ltime // 初始值
)
```

例子 

```go
func main() {
   log.SetFlags(log.Lshortfile | log.Lmicroseconds | log.Lmsgprefix | log.Ldate | log.Ltime)
   log.Println("日志")
   log.Panicln("panic日志")
}
```



当然也可以使用`log.SetOutput(w io.Writer)`来设置日志的输出路径，也可以通过`New`方法创建自己的实例。

```go
func New(out io.Writer, prefix string, flag int) *Logger
```

总而言之，标准库的`log`包提供的功能并不够完善，我们通常会使用更加完善的第三方日志包，例如`zap`等等。