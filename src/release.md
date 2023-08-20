# 更新日志

Go官方团队每半年发布一个二级版本，并且只有最新的两个二级版本是长期维护，目前Go第二个主版本尚且没有任何消息。

Go语言更新日志：[Release History - The Go Programming Language](https://go.dev/doc/devel/release)

目前维护的两个最新版本：

- `go1.21` 发布于2023-08-08
- `go1.20` 发布于2023-02-01



## 1.21

Go1.21更新日志：[Go 1.21 Release Notes - The Go Programming Language](https://go.dev/doc/go1.21)

### 1.21.0 （2023-08-08）

**语言层面**

1. 新增了两个内置函数`min` ，`max`，用于计算最大值最小值。

    ```go
    var x, y int
    m := min(x)                 
    m := min(x, y)             
    m := max(x, y, 10)         
    c := max(1, 2.0, 10)      
    f := max(0, float32(x))
    ```

2. 更新了`package`初始化顺序

    - 按导入路径对所有包进行排序


    - 重复执行，直到包的列表为空


    - 找到列表中所有的导入都已被初始化的第一个包


    - 初始化该包并将其从列表中删除

3. 提高和改进了类型推理的能力和精度，主要是泛型相关。

4. 推出了`for range`循环变量改进的预览版本，这是一个困扰了Go开发者接近十年的问题，官方终于要解决了，详情见：[LoopvarExperiment · golang/go Wiki (github.com)](https://github.com/golang/go/wiki/LoopvarExperiment)和[Proposal: Less Error-Prone Loop Variable Scoping (googlesource.com)](https://go.googlesource.com/proposal/+/master/design/60078-loopvar.md)

5. 保证了`recover`的返回值不会是`nil`，如果在调用`panic`时参数为`nil`，则会触发另一个`panic`，返回`*runtime.PanicNilError`。为了兼容性，在编译时设置`GODEBUG=panicnil=1`允许向`panic`传入`nil`。

**标准库**

1. 新增`log/slog`库，提供标准的结构化日志库
2. 新增`testing/slogtest`库，用于验证`slog.Handler`的实现
3. 新增`slices`库，提供了一系列泛型函数用于操作切片。
4. 新增`maps`库，提供了一系列泛型函数用于操作map
5. 新增`cmp`库，用于比较有序类型。

**其他**

1. go1.21.0至少在windows系统上至少需要win10或者Windows Server 2016版本以上才能运行，先前的版本不再支持。
2. go1.21.0至少需要在macOS 10.15 Catalina或者更新的版本才能运行，先前的版本不再支持。
3. 新增了实验性的WebAssembly System Interface，Go依旧在WASM这块不断的探索。
4.  在1.20还是实验性质的（Profile-guide optimization）PGO（见[Profile-guided optimization - The Go Programming Language](https://go.dev/doc/pgo)），1.21版本正式启用。在main包下包含`default.pgo`文件会启用该功能，开启后性能可能会提升2%-7%。
5. 当打印非常深的运行时调用栈时，从原来的只打印前一百个帧，到现在分别打印前50的最后的50个帧。
6. 优化了在Unix平台CGO的调用性能，从1-3微秒优化到了现在的100-200纳秒。
7. 在1.21版本，编译速度提升了接近6%，这主要归功于编译器本身使用PGO来构建。

以上是一些主要的更新信息，更详细的内容访问官方网站。