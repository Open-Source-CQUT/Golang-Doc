# 更新日志

**维护版本：**

- go1.24，首次发布：2025-02-11，最后更新：go1.24.0 (2025-02-11)
- go1.23，首次发布：2024-08-13，最后更新：go1.23.4 (2024-12-03)

Go 语言官方更新日志：[Release History - The Go Programming Language](https://go.dev/doc/devel/release)

Go 官方采用语义化版本来进行版本标识，格式为 v`主版本`.`次版本`.`补丁版本` (见[Semantic Versioning](https://semver.org/lang/zh-CN/))，主版本的更新意味着发生了 Breaking Change，即无法向下兼容的更新，次版本的更新意味着有新功能添加同时保持向下兼容，补丁版本的更新意味着有问题被修复同时保持向下兼容。

Go 团队每半年发布一个二级版本，并且只有最新的两个二级版本是长期维护，维护时间都是六个月，鉴于 Go 每一次更新都保持着相当高的兼容性，建议在新版本稳定后及时将 Go 升级到最新版。

Go2.0 上一次提出草案是在 2018 年 11 月 19 日，那时还是处于 go1.13 版本，五年过后，版本已经迭代到了 go1.21，Go2.0 的各种想法已经通过增量更新的方式体现在了 Go1.0 上，创始人之一也曾明确表示未来可能并不会有 Go2.0，Go 将一直为保持向下兼容而努力(见[Go 1 and the Future of Go Programs](https://go.dev/doc/go1compat))。

::: tip

此页面只是对官方日志的一个简单搬运，不定期更新，想获取最新消息还请前往官网。

:::

## 1.24

首次发布：2025-02-11

最后更新：go1.24.0 (2025-02-11)

go1.24 版本的详细更新日志可以前往[Go 1.24 Release Notes](https://go.dev/doc/go1.24)
查看，在其维护期间发布的所有补丁版本可以前往[Go1.24 - Release Patch](https://go.dev/doc/devel/release#go1.24.0)了解。

**语言层面**

1. 泛型类型别名，允许为泛型类型创建别名，这在引用第三方定义的泛型类型时非常有用，例如

   ```go
   import (
       "other"
   )
   
   type MyQuque[T any] = other.Queue[T]
   ```

**标准库**

1. 新增 `weak` 包：提供弱指针（Weak Pointers），允许对象在不增加引用计数的情况下被引用，避免缓存导致的内存泄漏，使用前需检查指针是否为
   `nil`
2. 文件系统访问限制：引入 `os.Root` 类型，限制文件操作在特定目录内，增强安全性
3. 加密与哈希支持：新增 `crypto/mlkem`，`crypto/hkdf`、`crypto/pbkdf2` 和 `crypto/sha3` 包，优化现有加密算法性能
4. 新增基准测试函数 `testing.B.Loop`，以更好的进行循环测试
5. `encoding/json` ：新增 `omitzero` 标签，支持基于 `IsZero()` 方法的零值过滤
6. `strings` 和 `bytes`：新增迭代器函数（如 `Lines`、`SplitSeq`、`FieldsSeq`）

**运行时**

1. 基于Swiss Tables重构内置map，大型map访问速度提升30%，迭代速度提升10%-60%
2. `sync.Map` 改用并发哈希 Trie（hash-trie）以优化性能，尤其是在并发写的情况
3. 运行时内部的互斥锁采用新的spinbit实现，降低了锁竞争，提升高并发场景性能
4. 优化小对象分配策略，减少内存碎片和GC暂停时间
5. 新增 `runtime.AddCleanup` 替代 `runtime.SetFinalizer`，支持为对象注册多个清理函数，并在独立 goroutine 中顺序执行

**Cgo**

1. 支持 `#cgo noescape` 和 `#cgo nocallback` 注解，分别声明 C 函数不逃逸内存和不回调 Go 函数，提升运行时性能
2. Cgo 现在将拒绝编译对具有多个不兼容声明的 C 函数的调用，严格检测跨文件的不兼容 C 函数声明（如 `void f(int)` 和
   `void f(double)`），避免生成错误调用序列

**工具链**

1. 模块工具依赖管理：通过 go.mod 的 tool 指令跟踪工具依赖，替代传统的 tools.go 空导入方案
2. 结构化输出：go build 和 go test 支持 -json 标志，输出 JSON 格式的构建和测试结果
3. 编译与链接优化：编译器生成代码效率提升，链接器默认生成 GNU Build ID（ELF 平台）和 UUID（macOS）
4. 禁止通过别名绕过对 CGO 生成类型的方法定义限制
5. `go build` 自动嵌入版本控制系统信息到二进制文件（支持 `-buildvcs=false` 禁用）
6. `GOAUTH` 环境变量支持私有模块认证。
7. `go.mod` 支持 `tool` 指令管理可执行依赖，替代 `tools.go` 空白导入
8. 新增 `go get -tool`参数 和 `go install tool` 命令管理模块工具依赖
9. 构建缓存支持 `go run` 和 `go tool` 的二进制缓存
10. `objdump` 支持 LoongArch、RISC-V、S390X 反汇编
11. `vet` 新增 `tests` 分析器（检测测试函数签名错误）

**平台兼容性**

1. macOS：Go 1.24 为最后一个支持 macOS 11 Big Sur 的版本，Go 1.25 将要求 macOS 12+
2. Windows：将 32 位 ARM 架构标记为不完整的（GOOS=windows
   GOARCH=arm），见 [issue #70705](https://golang.google.cn/issue/70705)
3. Linux：最低内核版本要求升级至 3.2
4. 要求 Go 1.22.6+ 作为引导工具链

**废弃**

1. `math/rand.Seed()`彻底失效，需通过 `GODEBUG=randseednop=0` 恢复旧行为。
2. `runtime.GOROOT()`标记为弃用，推荐通过`go env GOROOT`获取路径

## 1.23

首次发布：2024-08-13

最后更新：go1.23.4 (2024-12-03)

go1.23 版本的详细更新日志可以前往[Go 1.23 Release Notes](https://go.dev/doc/go1.23)查看，在其维护期间发布的所有补丁版本可以前往[Go1.23 - Release Patch](https://go.dev/doc/devel/release#go1.23.0)了解。

**语言层面**

1. for range 支持迭代器函数，详细信息查看[Go Wiki: Rangefunc Experiment](https://go.dev/wiki/RangefuncExperiment)。

   ```go
   func Upper(s []string) iter.Seq2[int, string] {
     return func(yield func(int, string) bool) {
       for i, s1 := range s {
         if !yield(i, strings.ToUpper(s1)) {
           return
         }
       }
       return
     }
   }
   
   func main() {
     sl := []string{"hello", "world", "golang"}
     for i, s := range Upper(sl) {
       fmt.Printf("%d : %s\n", i, s)
     }
   }
   
   //0 : HELLO
   //1 : WORLD
   //2 : GOLANG
   ```

   这是一个比较实用的特性，一般会结合泛型来用。

**标准库**

1. 新增标准库`iter`，它定义和描述了关于迭代器的详细信息

2. `maps`库新增了若干个迭代器函数

3. `slices`库新增了若干个迭代器函数

4. 新增`structs`库，提供了可以修改结构体属性的能力，比如内存布局

   ```go
   type Person struct {
     Name string
     Age  int
     _    structs.HostLayout
   }
   ```

5. 优化了`time`标准库的实现

**Linker**

1. 处理`//go:linkname`的滥用，对于一些经常被引用的 API 暂时允许其存在，比如`runtime.memhash64`，`runtime.nanotime`等等，此后对于其他的新引用将不会允许。

   ```go
   //go:linkname gcinit runtime.gcinit
   func gcinit()
   
   func main() {
     gcinit()
   }
   ```

   像这种代码就无法通过编译

   ```
   link: main: invalid reference to runtime.gcinit
   ```

**工具链**

1. 新增`go telemetry` 命令用于遥测数据管理

## 1.22

首次发布：2024-02-06

最后更新：go1.22.6（released 2024-08-06）

go1.22 版本的详细更新日志可以前往[Go 1.22 Release Notes](https://go.dev/doc/go1.22)查看，在其维护期间发布的所有补丁版本可以前往[Go1.22 - Release Patch](https://go.dev/doc/devel/release#go1.22.0)了解。

**语言层面**

1. 解决了 go 语言循环变量的问题

   ```go
   func main() {
     var wg sync.WaitGroup
     const n = 10
     wg.Add(n)
     for i := 0; i < n; i++ {
       go func() {
         fmt.Println(i)
         wg.Done()
       }()
     }
     wg.Wait()
   }
   ```

   这段代码在 1.22 前，会输出 10 个 9，在 1.22 后则会正常输出 0 到 9。

2. `for range`现在支持迭代数字类型，如下

   ```go
   for i := range 10 {
     fmt.Println(i)
   }
   ```

**标准库**

1. 增强了`net/http`标准库的路由

2. `database/sql`新增了`sql.Null`泛型类型

   ```go
   type Null[T any] struct {
     V     T
     Valid bool
   }
   ```

   使用如下

   ```go
   type Person struct {
     Name sql.Null[string]
     Age  sql.Null[int]
   }
   ```

## 1.21

首次发布：2023-08-08

最后更新：go1.21.13 (released 2024-08-06)

go1.21 版本的详细更新日志可以前往[Go 1.21 Release Notes](https://go.dev/doc/go1.21)查看，在其维护期间发布的所有补丁版本可以前往[Go1.21 - Release Patch](https://go.dev/doc/devel/release#go1.21.0)了解。

**语言层面**

1. 新增了两个内置函数`min` ，`max`，用于计算最大值最小值。
2. 新增内置函数`clear`，用于清空 map 和 slice
3. 更新了`package`初始化顺序

   - 按导入路径对所有包进行排序
   - 重复执行，直到包的列表为空
   - 找到列表中所有的导入都已被初始化的第一个包
   - 初始化该包并将其从列表中删除

4. 提高和改进了类型推理的能力和精度，主要是泛型相关。

5. 推出了`for range`循环变量改进的预览版本，这是一个困扰了 Go 开发者接近十年的问题，官方终于要解决了，详情见：[LoopvarExperiment · golang/go Wiki (github.com)](https://github.com/golang/go/wiki/LoopvarExperiment)和[Proposal: Less Error-Prone Loop Variable Scoping (googlesource.com)](https://go.googlesource.com/proposal/+/master/design/60078-loopvar.md)

6. 保证了`recover`的返回值不会是`nil`，如果在调用`panic`时参数为`nil`，则会触发另一个`panic`，返回`*runtime.PanicNilError`。为了兼容性，在编译时设置`GODEBUG=panicnil=1`允许向`panic`传入`nil`。

**标准库**

1. 新增`log/slog`库，提供标准的结构化日志库
2. 新增`testing/slogtest`库，用于验证`slog.Handler`的实现
3. 新增`slices`库，提供了一系列泛型函数用于操作切片。
4. 新增`maps`库，提供了一系列泛型函数用于操作 map
5. 新增`cmp`库，用于比较有序类型。

**其他**

1. go1.21.0 至少在 windows 系统上至少需要 win10 或者 Windows Server 2016 版本以上才能运行，先前的版本不再支持。
2. go1.21.0 至少需要在 macOS 10.15 Catalina 或者更新的版本才能运行，先前的版本不再支持。
3. 新增了实验性的 WebAssembly System Interface，Go 依旧在 WASM 这块不断的探索。
4. 在 1.20 还是实验性质的(Profile-guide optimization)PGO(见[Profile-guided optimization - The Go Programming Language](https://go.dev/doc/pgo))，1.21 版本正式启用。在 main 包下包含`default.pgo`文件会启用该功能，开启后性能可能会提升 2%-7%。
5. 当打印非常深的运行时调用栈时，从原来的只打印前一百个帧，到现在分别打印前 50 的最后的 50 个帧。
6. 优化了在 Unix 平台 CGO 的调用性能，从 1-3 微秒优化到了现在的 100-200 纳秒。
7. 在 1.21 版本，编译速度提升了接近 6%，这主要归功于编译器本身使用 PGO 来构建。

## 1.20

首次发布：2023-02-01

最后更新：go1.20.14 (released 2024-02-06)

go1.20 版本的详细更新日志可以前往[Go 1.20 Release Notes](https://go.dev/doc/go1.20)查看，在其维护期间发布的所有补丁版本可以前往[Go1.20 - Release Patch](https://go.dev/doc/devel/release#go1.20)了解。

**语言层面**

1. 在将切片类型转换为数组时，原来需要对指针数组解引用`*(*[4byte])(x)`来避免和切片操作同一个底层数组，现在可以直接这么写`[4]byte(x)`。
2. `unsafe`新增了`SliceData`，`String`，`StringData`函数，用于构建和结构切片与字符串值。

**标准库**

1. 新增`crypto/ecdh`库，提供了对于 ECDH(Elliptic Curve Diffie-Hellman，一种非对称加密方法)的支持。
2. go1.20 扩展了对 error 包装的支持，允许一个 error 包装多个 error。
3. 新增`net/http.ResponseContorller`，提供了一种更清晰、更易于发现的方法来添加每个 handler controls。
4. `httputil.ReverseProxy`包含了一个新的 Rewrite Hook 函数，用于取代之前的 Director Hook。

**其他**

1. go1.20 是最后一个支持 win7，8，Server2008 和 Server2012 的版本，在未来版本中不再提供支持。
2. go1.20 是最后一个支持 macOS 10.13 或 10.14 的版本，未来版本将不再提供支持。
3. 在 1.18 和 1.19 版本中，由于泛型的出现，相较于 1.17 编译速度出现了倒退，go1.20 编译速度将会提升 10%左右。
4. 发布 PGO(Profile-guided optimization)的预览版本，这是一种计算机界的编译器优化技术，可以提高运行时性能。
5. 在 go1.20，在没有 C toolchains 的系统上，go command 禁用 cgo。
6. 支持收集程序代码覆盖率文件，见[Coverage profiling support for integration tests - The Go Programming Language](https://go.dev/testing/coverage/)
7. 对 GC 进行了改进，提高了稳定性，减少内存开销，提升了整体 2%的 CPU 性能。

## 1.19

首次发布：2022-08-02

最后更新：go1.19.13 (released 2023-09-06)

go1.19 版本的详细更新日志可以前往[Go 1.19 Release Notes](https://go.dev/doc/go1.19)查看，在其维护期间发布的所有补丁版本可以前往[Go1.19 - Release Patch](https://go.dev/doc/devel/release#go1.19)了解。

**重要变化**

1. 内存模型向 c/c++看齐，类似于 TcMollcate

2. `sync/atomic`包现在提供了更多的类型可供使用

3. 支持使用`runtime/debug.SetMemoryLimit`函数对 go 内存进行软限制，在某些情况下可以提供内存利用效率

4. 运行时现在会根据协程栈的平均使用情况来选择一个合适的大小为其初始化栈空间内存，这样可以避免频繁的栈扩容缩容

## 1.18

首次发布：2022-03-15

最后更新：go1.18.10 (released 2023-01-10)

go1.18 版本的详细更新日志可以前往[Go 1.18 Release Notes](https://go.dev/doc/go1.18)查看，在其维护期间发布的所有补丁版本可以前往[Go1.18 - Release Patch](https://go.dev/doc/devel/release#go1.18)了解。

**语言层面**

1. 重量级更新，支持泛型，类型集接口，参数类型约束

**其它**

1. 优化了`append`函数的扩容行为
2. 新增`debug/buildinfo`包，可以在运行时获取 go 程序的构建信息
3. gofmt 现在可以并发的格式化源文件

## 1.17

首次发布：2021-08-16

最后更新：go1.17.13 (released 2022-08-01)

go1.17 版本的详细更新日志可以前往[Go 1.17 Release Notes](https://go.dev/doc/go1.17)查看，在其维护期间发布的所有补丁版本可以前往[Go1.17 - Release Patch](https://go.dev/doc/devel/release#go1.17)了解。

**语言层面**

1. 新增`unsafe.Add`函数，支持指针运算
2. 新增`unsafe.Slice`函数，支持获取切片的底层数组的指针
3. 切片现在可以转换为数组指针类型，`[]T => *[N]T`，前提是数组的长度要小于等于切片的长度

## 1.16

首次发布：2021-02-16

最后更新：go1.16.15 (released 2022-03-03)

go1.16 版本的详细更新日志可以前往[Go 1.16 Release Notes](https://go.dev/doc/go1.16)查看，在其维护期间发布的所有补丁版本可以前往[Go1.16 - Release Patch](https://go.dev/doc/devel/release#go1.16)了解。

**重要变化**

该版本没什么重要的语法上的变更，一些重要的变化如下

1. 弃用`ioutil`包
2. 支持通过`//go:embed`指令来将一些静态文件嵌入到程序中
3. 新增`io/fs.Fs`类型，对文件系统进行了更好的抽象

## 1.15

首次发布：2020-08-11

最后更新：go1.15.15 (released 2021-08-05)

go1.15 版本的详细更新日志可以前往[Go 1.15 Release Notes](https://go.dev/doc/go1.15)查看，在其维护期间发布的所有补丁版本可以前往[Go1.15 - Release Patch](https://go.dev/doc/devel/release#go1.15)了解。

**重要变化**

该版本没什么重要的语法上的变更，一些重要的变化如下

1. 优化了小对象的分配效率

2. 新增了包`time/tzdata`，通过下面的方式支持将时区数据库嵌入到程序中，因为有很多系统本地并没有时区数据信息。

   ```go
   improt _ "time/tzdata"
   ```

3. 对 go 链接器做出了重大改进，减少了其资源使用，并提高了代码的健壮性

4. 在某些情况下，允许`unsafe.Pointer`转换为`uinptr`

## 1.14

首次发布：2020-02-25

最后更新：go1.14.15 (released 2021-02-04)

go1.14 版本的详细更新日志可以前往[Go 1.14 Release Notes](https://go.dev/doc/go1.14)查看，在其维护期间发布的所有补丁版本可以前往[Go1.14 - Release Patch](https://go.dev/doc/devel/release#go1.14)了解。

**语言层面**

1. 支持方法集接口类型嵌套

   ```go
   type MyIO interface {
     io.WriteCloser
   }
   ```

**其它**

1. 引用了开放编码优化，`defer`调用的开销降低至几乎跟原生调用一样
2. 支持协程间的异步抢占，没有函数调用的循环将不会再永久阻塞调度

## 1.13

首次发布：2019-09-03

最后更新：go1.13.15 (released 2020-08-06)

go1.13 版本的详细更新日志可以前往[Go 1.13 Release Notes](https://go.dev/doc/go1.13)查看，在其维护期间发布的所有补丁版本可以前往[Go1.13 - Release Patch](https://go.dev/doc/devel/release#go1.13)了解。

**语言层面**

1. 支持更现代的数字字面量，比如

   ```go
   0b101 // 二进制
   0o10 // 十进制
   0x1B // 十六进制
   ```

   支持下划线分割数字以带来更好的可读性

   ```go
   10_000
   ```

   虚数`i`的后缀现在可以是任何的二进制，十进制，十六进制，或浮点数数字

**其它**

1. `GO111MODULE`值默认为`auto`
2. 新增`GOPRIVATE`环境变量来支持私有的依赖源
3. 新增`GOSUMDB`环境环境
4. `defer`的使用开销降低了 30%
5. 当发生索引下标越界时，`panic`现在会打印出下标信息
6. go 下载依赖时会进行语义化版本验证

## 1.12

首次发布：2019-02-25

最后更新：go1.12.17 (released 2020-02-12)

go1.12 版本的详细更新日志可以前往[Go 1.12 Release Notes](https://go.dev/doc/go1.12)查看，在其维护期间发布的所有补丁版本可以前往[Go1.12 - Release Patch](https://go.dev/doc/devel/release#go1.12)了解。

**重要变化**

该版本没什么重要的语法上的变更，一些重要的变化如下

1. 显著提高了堆的扫描性能
2. 运行时将更积极的向操作系统释放申请的内存
3. 用于下载 go 依赖的命令现在可以并发安全的使用

## 1.11

首次发布：2018-08-24

最后更新：go1.11.13 (released 2019-08-13)

go1.11 版本的详细更新日志可以前往[Go 1.11 Release Notes](https://go.dev/doc/go1.11)查看，在其维护期间发布的所有补丁版本可以前往[Go1.11 - Release Patch](https://go.dev/doc/devel/release#go1.11)了解。

**重要变化**

该版本没什么重要的语法上的变更，一些重要的变化如下

1. GoMod 首次发布，此前依赖管理的混乱局面将要结束
2. 首次实验性的支持了 WASM
3. 运行时采用稀疏堆布局，不再限制堆大小

## 1.10

首次发布：2018-02-16

最后更新：go1.10.8 (released 2019-01-23)

go1.10 版本的详细更新日志可以前往[Go 1.10 Release Notes](https://go.dev/doc/go1.10)查看，在其维护期间发布的所有补丁版本可以前往[Go1.10 - Release Patch](https://go.dev/doc/devel/release#go1.10)了解。

**重要变化**

该版本没什么重要的语法上的变更，一些重要的变化如下

1. `go install`命令现在只用于安装和编译命令行工具，不再用于下载依赖
2. `go get`命令现在用于下载源码依赖
3. go 测试现在会缓存测试结果，并且会在运行前自动运行`go vet`
4. 显著降低了 GC 在活跃时造成的延时

## 1.9

首次发布：2017-08-24

最后更新：go1.9.7 (released 2018-06-05)

go1.9 版本的详细更新日志可以前往[Go 1.9 Release Notes](https://go.dev/doc/go1.9)查看，在其维护期间发布的所有补丁版本可以前往[Go1.9 - Release Patch](https://go.dev/doc/devel/release#go1.9)了解。

**语言层面**

1. 支持类型别名

**其它**

1. 支持并行编译
2. 新增并发安全的`sync.Map`

## 1.8

首次发布：2017-02-16

最后更新：go1.8.7 (released 2018-02-07)

go1.8 版本的详细更新日志可以前往[Go 1.8 Release Notes](https://go.dev/doc/go1.8)查看，在其维护期间发布的所有补丁版本可以前往[Go1.8 - Release Patch](https://go.dev/doc/devel/release#go1.8)了解。

**语言层面**

1. 当两个结构体进行类型转换时，会忽略结构体 tag 的不同

   ```go
   func example() {
       type T1 struct {
           X int `json:"foo"`
       }
       type T2 struct {
           X int `json:"bar"`
       }
       var v1 T1
       var v2 T2
       v1 = T1(v2) // now legal
   }
   ```

**其它**

1. 垃圾收集造成的暂停时间低至 10 微秒，大部分情况下低于 100 微秒（可以看到几乎每个版本 go 都在努力改进 GC）
2. 调用`defer`的开销减少了接近一半
3. go 调用 c 的开销减少了接近一半
4. 优化了 map 的并发使用检测

## 1.7

首次发布：2016-08-15

最后更新：go1.7.6 (released 2017-05-23)

go1.7 版本的详细更新日志可以前往[Go 1.7 Release Notes](https://go.dev/doc/go1.7)查看，在其维护期间发布的所有补丁版本可以前往[Go1.7 - Release Patch](https://go.dev/doc/devel/release#go1.7)了解。

**重要变化**

1. 将`golang.org/x/net/context`加入标准库
2. gc 时间相较于 1.6 大幅缩短
3. `testing`包支持子测试

## 1.6

首次发布：2016-02-17

最后更新：go1.6.4 (released 2016-12-01)

go1.6 版本的详细更新日志可以前往[Go 1.6 Release Notes](https://go.dev/doc/go1.6)查看，在其维护期间发布的所有补丁版本可以前往[Go1.6 - Release Patch](https://go.dev/doc/devel/release#go1.6)了解。

**重要变化**

该版本没有语法上的变更，下面是比较重要的变化

1. 对 map 进行并发使用检测，如果检测到了 map 正在并发使用会抛出`fatal`
2. 在发生`panic`时，只会打印正在运行协程的调用栈
3. 支持 HTTP/2

## 1.5

首次发布：2015-08-19

最后更新：go1.5.4 (released 2016-04-12)

go1.5 版本的详细更新日志可以前往[Go 1.5 Release Notes](https://go.dev/doc/go1.5)查看，在其维护期间发布的所有补丁版本可以前往[Go1.5 - Release Patch](https://go.dev/doc/devel/release#go1.5)了解。

**语言层面**

1. 在初始化 map 字面量的键时，允许省略元素类型

   ```go
   m := map[Point]string{
       Point{29.935523, 52.891566}:   "Persepolis",
       Point{-25.352594, 131.034361}: "Uluru",
       Point{37.422455, -122.084306}: "Googleplex",
   }
   
   // 省略类型
   m := map[Point]string{
       {29.935523, 52.891566}:   "Persepolis",
       {-25.352594, 131.034361}: "Uluru",
       {37.422455, -122.084306}: "Googleplex",
   }
   ```

**其它**

1. 运行时和编译器完全由 go 重写，不再包含任何 c 代码
2. 支持并发垃圾收集，大大减少了程序暂停的时间
3. `GOMAXPROCS`默认值变为机器的逻辑核数
4. `internal`包的语义可以应用到任何地方，不再只局限于 go 的源码包
5. 实验性的支持 vendor 依赖管理（终于开始着手处理依赖管理这部分了）

## 1.4

首次发布：2014-12-10

最后更新：go1.4.3 (released 2015-09-22)

go1.4 版本的详细更新日志可以前往[Go 1.4 Release Notes](https://go.dev/doc/go1.4)查看，在其维护期间发布的所有补丁版本可以前往[Go1.4 - Release Patch](https://go.dev/doc/devel/release#go1.4)了解。

**语言层面**

1. `for range`循环可以一个迭代参数，比如

   ```
   for i := range x {
       ...
   }
   ```

   但是不能一个都没有

2. 在调用双重引用类型的方法时，不再自动解引用

   ```go
   type T int
   func (T) M() {}
   var x **T
   
   // 不被允许
   x.M()
   ```

**其它**

1. 在 1.4 之前，go 的运行时都是由 c 编写的，现在全部由 go 完成
2. 支持将包名修改为`internal`来表示该包的所有内容都是私有的不可导出

## 1.3

首次发布：2014-06-18

最后更新：go1.3.3 (released 2014-09-30)

go1.3 版本的详细更新日志可以前往[Go 1.3 Release Notes](https://go.dev/doc/go1.3)查看，在其维护期间发布的所有补丁版本可以前往[Go1.3 - Release Patch](https://go.dev/doc/devel/release#go1.3)了解。

**重要变化**

该版本没有语法上的变更，一些比较重要的变化如下

1. 协程栈模型从分段栈改为连续栈，提升了栈扩容的性能。
2. 提升了垃圾回收器指针判断的精度
3. 在小容量 map 中进行迭代，顺序也会变得不可预测
4. 由于一些运行时方面的完善，当前版本的 go 程序性能有了较大幅度的提升

## 1.2

首次发布：2013-12-01

最后更新：go1.2.2 (released 2014-05-05)

go1.2 版本的详细更新日志可以前往[Go 1.2 Release Notes](https://go.dev/doc/go1.2)查看，在其维护期间发布的所有补丁版本可以前往[Go1.2 - Release Patch](https://go.dev/doc/devel/release#go1.2)了解。

**语言层面**

1. 对值为`nil`的变量进行操作会引发`panic`

2. 在对切片进行分隔时，可以使用第三个参数来限制被分割的切片容量从而更安全的使用切片

   ```go
   var array [10]int
   slice := array[2:4:4]
   ```

**其它**

1. 协程栈的最小内存大小由 4KB 提升到了 8KB

2. 将最大线程数限制在了 10000

3. 长时间运行的协程在发生函数调用时会被抢占（协作式抢占的首次引入）

## 1.1

首次发布：2013-05-13

最后更新：go1.1.2 (released 2013-08-13)

go1.1 版本的详细更新日志可以前往[Go 1.1 Release Notes](https://go.dev/doc/go1.1)查看，在其维护期间发布的所有补丁版本可以前往[Go1.1 - Release Patch](https://go.dev/doc/devel/release#go1.1)了解。

**语言层面**

1. 一个数被 0 整除以前会抛出`panic`，到了 1.1 直接无法通过编译。
2. 方法可以作为一个值存在。
3. 引入了终止语句的概念，函数的返回规则更为宽松，[终止语句的定义 - go-sepc](https://go.dev/ref/spec#Terminating_statements)。

**性能方面**

1. 使用 go1.1 的工具编译的 go 程序性能大概可以提升 30%-40%

**其它:**

1. 在 64 位机上堆内存的最大值提升到了几十 GB
2. 交叉编译时默认禁用 cgo

## 1.0

首次发布：2012-03-28

go1.0 版本的详细更新日志可以前往[Go 1.0 Release Notes](https://go.dev/doc/go1.0)查看，在其维护期间发布的所有补丁版本可以前往[Go1.0 - Release Patch](https://go.dev/doc/devel/release#go1.0)了解。

**语言层面**

相较于预览版而言，语法上多了以下这些东西

1. 新增内置`append`函数，用于给切片添加元素

2. 新增内置`close`函数，用于关闭管道

3. 复合语义，在初始化切片，map，结构体字面量元素时，可以省略其类型，如下所示

   ```go
   // 声明类型
   holiday1 := []Date{
       Date{"Feb", 14},
       Date{"Nov", 11},
       Date{"Dec", 25},
   }

   // 省略类型
   holiday2 := []Date{
       {"Feb", 14},
       {"Nov", 11},
       {"Dec", 25},
   }
   ```

4. 在`init`函数中使用的协程会直接启动，不需要再等待所有的包都初始化完毕。

5. 新增`rune`类型，表示一个 UTF-8 字符

6. 新增`error`内置接口，表示错误类型

7. 新增`delete`内置函数用于删除 map 中的键值对

8. 使用`for range`迭代 map 的顺序变得不可预测

9. 支持同时给多个变量赋值

   ```
   a := 1
   b := 2
   a, b = 3, 4
   ```

10. 变量隐藏问题：当函数的有具名返回值时，如果有任何返回值被隐藏了，则`return`语句必须携带返回值，否则编译不通过，下面是一个错误示例

    ```go
    func Bug() (i, j, k int) {
        for i = 0; i < 5; i++ {
            for j := 0; j < 5; j++ { // Redeclares j.
                k += i * j
                if k > 100 {
                    return // Rejected: j is shadowed here.
                }
            }
        }
        return // OK: j is not shadowed here.
    }
    ```

11. 允许复制带有私有字段的结构体值

12. 在结构体和切片都是可比较元素组成的情况下，允许它们作为 map 的键，同时移除了函数和 map 的可比较性

除了语言层面之外，go1.0 在包的组织方式和标准库以及命令行方面相较于预览版本都有着非常大的改变，由于内容太多这里不再过多赘述，感兴趣可以自己去官网了解。

## pre

在 go1 正式发布之前，所有的版本都被称为预览版本，对于这些预览版本官方会每周发布一个快照版本，其中比较重要的版本有

- r60(2011-09-07)，规定了 else 块现在必须加括号
- r59(2011-08-01)，设计了新的结构体 tag 方案
- r58(2011-06-29)，修复了滥用 goto 而导致内存未初始化的问题，新增了 gui，exec 包
- r57(2011-05-03)，支持短变量多重赋值语法，重新设计了 http，reflect 包，将 gotest 作为一个 go 程序而非 shell 脚本
- r56(2011-03-07)，第一个稳定版本

预览版本的开发始于 2009 年 12 月 09 日，在 go1 于 2012 年 3 月 28 日正式发布之后停止，持续了接近三年的时间，往后不再记录每周快照版本。前往[Pre-Go 1 Release History](https://go.dev/doc/devel/pre_go1)了解这些主要版本的信息，前往[Weekly Snapshot History](https://go.dev/doc/devel/weekly#2012-03-27)了解全部预览版本的每周快照版本信息。
