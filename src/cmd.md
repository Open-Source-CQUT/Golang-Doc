---
title: 命令
date: 2023-01-10
---

## 命令行

![](/images/cmd.png)

Go 中的命令包含了一整套工具链，这些命令涵盖了文档，格式化，代码检查，编译，测试，依赖管理等多个方面，可以说是涉及到了 Go 开发的方方面面。

```text
bug         报告漏洞
build       编译包和依赖
clean       清除对象文件
doc         展示源代码中的文档
env         查看Go环境变量信息
fix         修复因go版本变化而导致的API兼容问题
fmt         源代码格式化
generate    代码生成
get         添加依赖
install     安装并编译包
list        包/模块列表命令
mod         模块维护命令
work        工作区维护命令
run         编译并运行
test        测试
tool        运行指定的go工具
version     展示go的版本信息
vet         扫描并输出源代码中可能存在的问题
```

本文只是简单的叙述与介绍它们的使用，所有内容参考自官方文档，想要了解更多细节可以前往[cmd/go](https://pkg.go.dev/cmd/go)。

### help

第一个要认识的是`help`命令，通过它可以阅读命令的用法。有两种用法，如果要获取简短的使用信息，可以在指定命令后面加上`-h`标志，比如

```sh
$ go env -h
usage: go env [-json] [-u] [-w] [var ...]
Run 'go help env' for details.
```

go 会简洁的展示该命令的用法，它也提示了，想要获得更详细的信息就需要使用 help 命令

```sh
$ go help env
usage: go env [-json] [-u] [-w] [var ...]

Env prints Go environment information.

By default env prints information as a shell script
(on Windows, a batch file). If one or more variable
names is given as arguments, env prints the value of
each named variable on its own line.

The -json flag prints the environment in JSON format
instead of as a shell script.

The -u flag requires one or more arguments and unsets
the default setting for the named environment variables,
if one has been set with 'go env -w'.

The -w flag requires one or more arguments of the
form NAME=VALUE and changes the default settings
of the named environment variables to the given values.

For more about environment variables, see 'go help environment'.
```

善于利用 help 命令，通过它你可以获取很多有关命令的信息。

### doc

```sh
$ go doc -h
Usage of [go] doc:
        go doc
        go doc <pkg>
        go doc <sym>[.<methodOrField>]
        go doc [<pkg>.]<sym>[.<methodOrField>]
        go doc [<pkg>.][<sym>.]<methodOrField>
        go doc <pkg> <sym>[.<methodOrField>]
For more information run
        go help doc

Flags:
  -C dir
        change to dir before running command
  -all
        show all documentation for package
  -c    symbol matching honors case (paths not affected)
  -cmd
        show symbols with package docs even if package is a command
  -short
        one-line representation for each symbol
  -src
        show source code for symbol
  -u    show unexported symbols as well as exported
```

`doc`命令会输出指定包，常量，函数，类型，变量，方法甚至结构体字段的文档注释。在不带任何参数的情况，它会输出当前包的注释

```sh
$ go doc
```

也可以指定查看某一个包，比如查看`runtime`包的文档注释

```sh
$ go doc runtime
package runtime // import "runtime"

Package runtime contains operations that interact with Go's runtime system,
such as functions to control goroutines. It also includes the low-level type
information used by the reflect package; see reflect's documentation for the
programmable interface to the run-time type system.
......
```

或者某一个类型

```sh
$ go doc unsafe.Pointer
package unsafe // import "unsafe"

type Pointer *ArbitraryType
    Pointer represents a pointer to an arbitrary type. There are four special
    operations available for type Pointer that are not available for other
    types:
      - A pointer value of any type can be converted to a Pointer.
      - A Pointer can be converted to a pointer value of any type.
      - A uintptr can be converted to a Pointer.
      - A Pointer can be converted to a uintptr.
      ...
```

或者某一个函数

```sh
$ go doc runtime.GC
package runtime // import "runtime"

func GC()
    GC runs a garbage collection and blocks the caller until the garbage
    collection is complete. It may also block the entire program.
```

它有以下常用下标志

- `-u`：查看私有的类型
- `-all`：查看指定包的所有文档
- `-short`：只一行简短描述
- `-src`：输出源代码
- `-cmd`：对于一些属于 go 命令的包，也输出它们包内的代码文档。

比如查看`runtime.inf`变量，这是一个不对外暴露的变量

```sh
$ go doc -u runtime.inf
package runtime // import "runtime"

var inf = float64frombits(0x7FF0000000000000)
```

利用好`doc`命令可以帮助你更方便的阅读文档。

另一个可以阅读命令文档的方式就是去阅读源代码，因为有些命令的文档并不会写的那么仔细，反而在源代码中会有比较详细的说明。由于这些命令全部都是由 go 编写的，阅读起来也相当的方便。这些命令都位于`src/cmd`包下，每一个子包就是一个单独的命令，入口位于`cmd/go/main.go`文件中

```go
func init() {
    base.Go.Commands = []*base.Command{
       bug.CmdBug,
       work.CmdBuild,
       clean.CmdClean,
       doc.CmdDoc,
       envcmd.CmdEnv,
       fix.CmdFix,
       fmtcmd.CmdFmt,
       generate.CmdGenerate,
       modget.CmdGet,
       work.CmdInstall,
       list.CmdList,
       modcmd.CmdMod,
       workcmd.CmdWork,
       run.CmdRun,
       test.CmdTest,
       tool.CmdTool,
       version.CmdVersion,
       vet.CmdVet,

       help.HelpBuildConstraint,
       help.HelpBuildmode,
       help.HelpC,
       help.HelpCache,
       help.HelpEnvironment,
       help.HelpFileType,
       modload.HelpGoMod,
       help.HelpGopath,
       get.HelpGopathGet,
       modfetch.HelpGoproxy,
       help.HelpImportPath,
       modload.HelpModules,
       modget.HelpModuleGet,
       modfetch.HelpModuleAuth,
       help.HelpPackages,
       modfetch.HelpPrivate,
       test.HelpTestflag,
       test.HelpTestfunc,
       modget.HelpVCS,
    }
}
```

在这里你会找到 go 的所有子命令，以及它们的帮助文档信息。

### bug

```sh
$ go help bug
usage: go bug

Bug opens the default browser and starts a new bug report.
The report includes useful system information.
```

该命令没有任何参数和任何标志，它会用你的默认浏览器访问`github.com/golang/go`仓库的 issue 界面，方便你反馈 bug，除此之外没有任何其它作用。

### version

通过`version`命令可以查看当前 go 的版本信息。

```go
$ go version -h
usage: go version [-m] [-v] [file ...]
```

在不带任何参数执行的情况下，它会输出当前 go 语言的版本

```sh
$ go version
go version go1.21.0 windows/amd64
```

它还接收文件路径作为参数，它将输出该路径下所有可以被识别的二进制文件编译时所采用的 go 版本。

```sh
$ go version -v ./
buf.exe: go1.20.2
cobra-cli.exe: go1.21.0
dlv.exe: go1.20.2
goctl.exe: go1.20.2
goimports.exe: go1.20.2
golangci-lint.exe: go1.20.2
gopls.exe: go1.19.3
kratos.exe: go1.20.2
main.exe: go1.19.1
protoc-gen-go-grpc.exe: go1.20.2
protoc-gen-go-http.exe: go1.20.2
protoc-gen-go.exe: go1.20.2
protoc-gen-openapi.exe: go1.20.2
swag.exe: go1.21.0
wire.exe: go1.21.0
```

其中`-v`参数指定`version`命令去尝试输出无法识别的文件的 go 版本，`-m`参数输出二进制文件的模块信息，以及一些编译参数，下面是一个简单的例子。

```sh
$ go version -v -m wire.exe
wire.exe: go1.21.0
        path    github.com/google/wire/cmd/wire
        mod     github.com/google/wire  v0.5.0  h1:I7ELFeVBr3yfPIcc8+MWvrjk+3VjbcSzoXm3JVa+jD8=
        dep     github.com/google/subcommands   v1.0.1  h1:/eqq+otEXm5vhfBrbREPCSVQbvofip6kIz+mX5TUH7k=
        dep     github.com/pmezard/go-difflib   v1.0.0  h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=
        dep     golang.org/x/tools      v0.0.0-20190422233926-fe54fb35175b      h1:NVD8gBK33xpdqCaZVVtd6OFJp+3dxkXuz7+U7KaVN6s=
        build   -buildmode=exe
        build   -compiler=gc
        build   DefaultGODEBUG=panicnil=1
        build   CGO_ENABLED=1
        build   CGO_CFLAGS=
        build   CGO_CPPFLAGS=
        build   CGO_CXXFLAGS=
        build   CGO_LDFLAGS=
        build   GOARCH=amd64
        build   GOOS=windows
        build   GOAMD64=v1
```

`go`自身也是一个二进制文件，其实在不带任何参数的情况下，`go version`输出的就是自身二进制文件的 go 语言版本，因为`cmd/go`的所有工具链都是由 go 语言自身实现的。

### env

通过`env`命令可以查看所有 go 环境变量的信息，修改这些环境变量将会影响 go 工具链的行为。

```sh
$ go env -h
usage: go env [-json] [-u] [-w] [var ...]
Run 'go help env' for details.
```

不带任何参数执行该命令，会输出 go 所有环境变量的值

```sh
$ go env
set GO111MODULE=on
set GOARCH=amd64
...
```

将某一个环境变量名作为参数可以只输出该变量的值

```sh
$ go env GO111MODULE
on
```

加上`-json`可以输出其`json`形式

```sh
$ go env -json
{
        "AR": "ar",
        "CC": "gcc",
    ......
}

```

通过`-w`标志，并且以`var=value`形式作为参数，会永久修改某一个变量的值

```sh
$ go env -w GO111MODULE=on
```

使用`-u`标志，可以将某一个变量恢复为默认值

```sh
$ go env -u GO111MODULE
```

执行`go help environment`可以查看每一个环境变量的介绍

```sh
$ go help environment
The go command and the tools it invokes consult environment variables
for configuration. If an environment variable is unset or empty, the go
command uses a sensible default setting. To see the effective setting of
the variable <NAME>, run 'go env <NAME>'. To change the default setting,
run 'go env -w <NAME>=<VALUE>'. Defaults changed using 'go env -w'
are recorded in a Go environment configuration file stored in the
per-user configuration directory, as reported by os.UserConfigDir.
The location of the configuration file can be changed by setting
the environment variable GOENV, and 'go env GOENV' prints the
effective location, but 'go env -w' cannot change the default location.
See 'go help env' for details.

General-purpose environment variables:

        GO111MODULE
                Controls whether the go command runs in module-aware mode or GOPATH mode.
                May be "off", "on", or "auto".
                See https://golang.org/ref/mod#mod-commands.
        GCCGO
                The gccgo command to run for 'go build -compiler=gccgo'.
        GOARCH
                The architecture, or processor, for which to compile code.
                Examples are amd64, 386, arm, ppc64.
        GOBIN
                The directory where 'go install' will install a command.
        GOCACHE
                The directory where the go command will store cached
                information for reuse in future builds.
    ......
```

下面介绍一些常用的环境变量

**GOVERSION**

该环境变量的值取决于 go 语言的版本，而版本号来自于`$GOROOT/VERSION`文件，该文件记录了当前 go 的版本号和构建时间。

```sh
$ cat $GOROOT/VERSION
go1.21.3
time 2023-10-09T17:04:35Z
```

`runtime.Version`变量值与`GOVERSION`的值相同，且该环境变量无法被修改。

**GOENV**

`$GOROOT`目录下会有一个默认的名为`go.env`的配置文件

```sh
$ cat $GOROOT/go.env
# This file contains the initial defaults for go command configuration.
# Values set by 'go env -w' and written to the user's go/env file override these.
# The environment overrides everything else.

# Use the Go module mirror and checksum database by default.
# See https://proxy.golang.org for details.
GOPROXY=https://proxy.golang.org,direct
GOSUMDB=sum.golang.org

# Automatically download newer toolchains as directed by go.mod files.
# See https://go.dev/doc/toolchain for details.
GOTOOLCHAIN=auto
```

它的格式就是简单的`key=value`这种形式，通过`go env -w key=value`命令修改的环境变量值将会被写入配置文件中。不过也可以不使用默认的配置文件，`GOENV`环境变量可以手动指定`env`配置文件的地址，并且`GOENV`环境变量的值只能被操作系统的环境变量所覆盖，无法被`go env -w`命令所修改。

**GOHOSTARCH**

代表着本机的 CPU 架构，只是用来展示，该环境变量的值并不是从配置文件中读取，也无法被修改。

**GOHOSTOS**

代表着本机的操作系统，只是用来展示，该环境变量的值并不是从配置文件中读取，也无法被修改。

**GOOS**

编译时，`GOOS`的值将会决定将源代码编译成哪个目标系统的二进制文件，默认值是`GOHOSTOS`，也就是本机的操作系统，它有以下几个可选项

- `linux`
- `darwin`
- `windows`
- `netbsd`
- `aix`
- `android`

实际支持的操作系统并不止这些，使用命令，`go tool dist list`，查看所有支持的值

```sh
$ go tool dist list | awk -F '/' '{print $1}' | awk '!seen[$0]++'
aix
android
darwin
dragonfly
freebsd
illumos
ios
js
linux
netbsd
openbsd
plan9
solaris
wasip1
windows
```

**GOARCH**

编译时，`GOARCH`的值将会决定编译时采用哪个 CPU 架构的指令，默认值是`GOHOSTARCH`，也就是本机的 CPU 架构，它有以下几个可选项

- `amd64`
- `386`
- `arm`
- `ppc64`

实际上支持的架构不止这些，使用`go tool dist list` 命令，查看所有支持的值

```sh
$ go tool dist list | awk -F '/' '{print $2}' | awk '!seen[$0]++'
ppc64
386
amd64
arm
arm64
riscv64
wasm
loong64
mips
mips64
mips64le
mipsle
ppc64le
s390x
```

需要注意的是，`GOOS`和`GOARCh`并不能随意的进行组合，部分操作系统只能支持特定的 CPU 架构。

**GOROOT**

`GOROOT`代表 go 语言安装位置的根目录， `GOROOT`的值无法被直接修改，且只能被操作系统的环境变量所覆盖。

```sh
$ ls $GOROOT -1
api
bin
codereview.cfg
CONTRIBUTING.md
doc
go.env
lib
LICENSE
misc
PATENTS
pkg
README.md
SECURITY.md
src
test
VERSION
```

在根目录下有以下几个比较重要的文件夹或文件

- `lib`，存放一些依赖，目前而言只有一个包含世界各国时区信息的库，位于`$GOROOT/lib/time`，编译后的二进制文件不会包含这些时区信息。

- `pkg`，存放一些工具库和头文件，比如`go tool`命令会在`$GOROOT/pkg/tool`目录下寻找 go 工具链的二进制文件
- `bin`，存放二进制文件，默认情况下只有`go`和`gofmt`这两个可执行文件，`$GOROOT/bin`应该被添加到系统变量中，否则无法使用 go 命令。
- `src`，存放 go 源代码

- `VERSION`，该文件存放着 go 语言的版本信息
- `go.env`，该文件是默认的`env`配置文件

**GOPATH**

`GOPATH`默认值是`$HOME/go`，该环境变量的值指定了在解析`import`语句时，去哪里寻找导入的文件。在早期没有 gomod 的时候，`GOPATH`是专门用来存放各种第三方库的，其结构如下

```sh
GOPATH=/home/user/go

/home/user/go/
    src/
        foo/
            bar/               (go code in package bar)
                x.go
            quux/              (go code in package main)
                y.go
    bin/
        quux                   (installed command)
    pkg/
        linux_amd64/
            foo/
                bar.a          (installed package object)
```

gomod 诞生之后，`GOPATH`就只是一个用来存放`go get`下载的依赖的地方，以及用于存放`go install`下载并编译的二进制文件。需要注意的是`GOPATH`的位置不能与`GOROOT`相同，否则将不会起任何作用。

```sh
$ go env GOBIN
warning: GOPATH set to GOROOT (/home/user/go) has no effect
```

截至目前笔者写下本文时，go 语言版本已经来到了 go1.21.3，除了非常古老的项目，基本上没有人会再使用 gopath 来管理依赖了。

**GOBIN**

`GOBIN`是用于存放`go install`下载并编译的第三方二进制可执行文件，其默认值为`$GOPATH/bin`。与`$GOROOT/bin`一样，该目录应该被添加到操作系统的环境变量中，否则的话也无法使用`GOBIN`目录的下的二进制文件。

**GOMODCACHE**

`GOMODCACHE`表示存放`go get`下载的依赖所存放的位置，默认值为`$GOPATH/pkg/mod`。其存放格式如下

```
$GOMODCACHE/domain/username/project@verion
```

在同级目录下还会有一个名为`sumdb`的文件夹，用于存放依赖校验和数据库的相关信息。

**GOCACHE**

存放用于编译的缓存信息，其默认值为`$HOME/.cache/go-build`，该目录下会生成一个`README`文件。

```sh
$ cat $(go env GOCACHE)/README
This directory holds cached build artifacts from the Go build system.
Run "go clean -cache" if the directory is getting too large.
Run "go clean -fuzzcache" to delete the fuzz cache.
See golang.org to learn more about Go.
```

每一次`build`都会产生许多文件，go 会缓存这些文件以便于下一次编译时复用。

**GOTEMPDIR**

用于编译时产生的临时文件，例如`go run`要运行的临时二进制文件。其默认值为操作系统所指定的临时目录，在 mac 或 linux 上为`/tmp`，windows 上为`%TEMP%`，也可以修改为用户所指定的位置。

**GO111MODULE**

该环境变量表示使用何种方式来管理 go 项目的依赖，有以下三个可用的值

- `off`，关闭 gomod，采用 gopath，并且会忽略一切`go.mod`文件
- `on`，采用 gomod，不使用 gopath（默认）。
- `auto`，自动感知，如果项目文件包含`go.mod`就会采用 gomod 来进行管理

::: tip

为什么叫`GO111MODULE`，不直接叫`GOMODULE`，因为 gomod 是在 go1.11 版本第一次推出的。

:::

**GOPROXY**

go 模块代理，默认值为`https://proxy.golang.org,direct`，url 采用逗号分隔，`direct`意思是直接使用 VCS 跳过模块代理，只有在前者无法访问时才会执行后者，还有一个可用的选项是`off`，表示禁止下载任何模块。除此之外，`GOPROXY`还可以是文件地址，比如

```
GOPROXY=file://$(go env GOMODCACHE)/cache/download
```

通过`go get -x`可以查看依赖下载过程所执行的命令，就可以知晓有没有走代理。

```sh
$ go get -x github.com/spf13/cast
# get https://goproxy.cn/github.com/@v/list
# get https://goproxy.cn/github.com/spf13/cast/@v/list
# get https://goproxy.cn/github.com/spf13/@v/list
# get https://goproxy.cn/github.com/spf13/@v/list: 404 Not Found (0.118s)
# get https://goproxy.cn/github.com/@v/list: 404 Not Found (0.197s)
# get https://goproxy.cn/github.com/spf13/cast/@v/list: 200 OK (0.257s)
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.info
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.info: 200 OK (0.013s)
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.mod
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.mod: 200 OK (0.015s)
# get https://goproxy.cn/sumdb/sum.golang.org/supported
# get https://goproxy.cn/sumdb/sum.golang.org/supported: 200 OK (0.064s)
# get https://goproxy.cn/sumdb/sum.golang.org/lookup/github.com/spf13/cast@v1.5.1
# get https://goproxy.cn/sumdb/sum.golang.org/lookup/github.com/spf13/cast@v1.5.1: 200 OK (0.014s)
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/0/x079/736
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/0/x079/736: 200 OK (0.016s)
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/0/x068/334
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/1/266
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/0/x068/334: 200 OK (0.023s)
# get https://goproxy.cn/sumdb/sum.golang.org/tile/8/1/266: 200 OK (0.028s)
go: downloading github.com/spf13/cast v1.5.1
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.zip
# get https://goproxy.cn/github.com/spf13/cast/@v/v1.5.1.zip: 200 OK (0.024s)
go: added github.com/spf13/cast v1.5.1
```

使用模块代理可以有效的提升模块的下载速度，国内用户基本上不使用代理的话无法访问默认的官方代理，目前公开且可信任的第三方模块代理如下

- `https://proxy.golang.com.cn`，开源同时提供企业版服务
- `https://goproxy.cn`，七牛云提供并开源

当然也有开源的自建模块代理方案：[goproxy](https://github.com/goproxy/goproxy)

**GOSUMDB**

`GOSUMDB`用于设置依赖库的校验和检测数据库地址，默认是`sum.golang.org`，当你设置了代理后，go 就会通过代理来访问校验数据库。

**GOPRIVATE**

`GOPRIVATE`环境变量用于设置私有的库，匹配的库将不会通过 sumdb 进行校验，也不会走代理，将通过 VCS 直接下载依赖。该支持通配符设置，使用逗号分隔，如下所示，所有后缀为`corp.example.com`和名为`github.com/gohper/myproject`的依赖都不会走代理和 sumdb。

```
GOPRIVATE=*.corp.example.com,github.com/gohper/myproject
```

也可以直接设置某一用户或组织

```
GOPRIVATE=github.com/gopher,github.com/myorganization
```

**GONOPROXY**

表明哪些依赖不需要走代理，规则与`GOPRIVATE`一致，并且会覆盖`GOPRIVATE`。

**GONOSUMDB**

表明哪些依赖不需要走校验数据库，规则与`GOPRIVATE`一致，并且会覆盖`GOPRIVATE`。

**GOINSECURE**

表示哪些依赖直接使用 VCS 进行下载，规则与`GOPRIVATE`一致，并且会被`GONOPROXY`和`GONOSUMDB`覆盖。

**GOVCS**

设置模块管理的版本控制系统，默认`public:git|hg,private:all`。也可以限制指定域名的 VCS，例如

```
GOVCS=github.com:git,evil.com:off,*:git|hg
```

在上述的限制中，github 只能用 git，evil.com 则不允许使用，使用`|`来可以表示多个 VCS。如果不做任何限制，可以如下设置

```
GOVCS=*:all
```

如果不允许任何 VCS 的使用，可以如下设置

```
GOVCS=*:off
```

**GOWORK**

设置工作区是否启用，默认为空即启用，如果设置为`off`，则不启用，会忽略一切`go.work`文件。

**GOTOOLDIR**

设置要使用的 go 工具链的位置，默认是`$GOROOT/pkg/tool`，默认的工具链也存放在该位置。

**GODEBUG**

设置调试选项，以键值对的形式控制 go 程序的部分执行行为，例如

```
GODEBUG=http2client=0,http2server=0
```

这些设置是为了方便在版本更新过程中而出现了不兼容变化时，方便 go 回退到以前的旧行为，例如在`1.21`中不再允许`panic(nil)`这种情况发生，为此，go 官方专门记录了`GODEBUG History`，前往[GODEBUG](https://go.dev/doc/godebug)了解更多细节。

**CGO_ENABLED**

表示是否开启 cgo，默认为 1，即开启，设置为 0 则关闭。

上面这些环境变量都是比较常用的，对于一些不那么常用的不做过多的介绍，比如 CGO，WASM 之类的，感兴趣可以自己了解。

### build

go 支持的编译器有两种，gccgo 和 gc。gcc 是一个老牌 c/c++的编译器，支持多种语言包括 go，后者 gc 并不是指的是垃圾回收的意思，它指的是 go compiler，go 语言在 go1.5 时完成了自举，gc 是完全由 go 语言编写的编译器，它的源代码位于`cmd/compile`包下，由于完全是 go 语言实现，所以对于了解和学习其内部机制也十分的方便。在默认情况下，编译器采用 gc 进行编译。顺便提一嘴，go 语言调试器也分两种，gdb 和 dlv，前者是老牌的 c/c++调试器，支持多种语言，包括 go，后者是 go 语言编写的调试器，对 go 语言的支持更友好，它同样也是开源的，推荐使用后者。
`build`命令的作用就是将 go 源文件编译成可执行的二进制文件，你会体验到相当迅速的编译体验，这也正是 go 语言的特点之一。

```sh
$ go build -h
usage: go build [-o output] [build flags] [packages]
Run 'go help build' for details.
```

它接收三个参数，一个是`-o`标志所指示的文件输出路径，一个是用于定义编译行为的构建标志`build flas`，最后一个就是要编译的包，**该参数必须放在最后**。下面是一个简单的例子，没用到构建标志。

```sh
# Windows
$ go build -o .\bin\golearn.exe golearn

# macOS / Linux
$ go build -o ./bin/golearn golearn
```

`./bin/golearn.exe`是表示输出路径，`golearn`表示要编译的模块，也可以是一个`入口文件`，或是一个`文件夹`。比如下面简单的例子是以`main.go`入口文件作为编译目标。

```sh
# Windows
$ go build -o .\bin\golearn.exe main.go

# macOS / Linux
$ go build -o ./bin/golearn main.go
```

在编译的时候它会忽略掉所有以`_test.go`结尾的文件，因为些文件按照约定都是测试文件。

除此之外，`build`命令还支持相当多的构建标志用于控制编译时的一些行为。

- `-x`：输出编译过程中的详细指令
- `-n`：与`-x`类似，但是区别是它只是输出这些指令，但实际上并不会执行。
- `-v`：输出编译的包
- `-p`：编译过程中的并发数
- `-a`：强制重新构建，即使已经是最新的了。
- `-compiler`：指定使用哪个编译器，`gccgo`或者`gc`，后者是由 go 编写的编译器。
- `-race`：开启竞态检测
- `-msan`：开启内存分析
- `-asan`：开启地址分析
- `-cover`：开启代码覆盖检测
- `-buildmode`：指定编译模式，有`archive`，`c-archive`，`c-shared`，`default`，`shared`，`exe`，`pie`，`plugin`这几个选项。
- `-pgo`，指定 pgo 文件
- `-trimpath`：消除源文件路径前缀，比如相对路径`/var/lib/go/src/main.go`，消除后在运行时通过`runtime `获取到的文件名就只有相对于模块路径的相对路径`/main.go`，开启此项后，编译耗时会明显上升，大概在 20-40%左右，取决于文件数量。
- `-toolexec`，在编译前执行的一些 go 命令，格式为`-toolexec 'cmd args'`。
- `-gcflags`：指定编译器 gc 的一些 tag
- `-gccgoflags`：指定编译器 gccgo 的一些 tag
- `-ldflags`：指定 link 工具的一些 tag

对于一些 ldflags 之类的传递参数，可以传递`"-help"`这样的参数来获取其可能的值，比如

```sh
$ go build -ldflags -help
usage: link [options] main.o
  -B note
        add an ELF NT_GNU_BUILD_ID note when using ELF
  -E entry
        set entry symbol name
......
```

上述这些是比较常用的，对于其它不怎么常用的可以自行了解。

#### gcflags

通过`gcflags`可以向编译器 gc 传递一些参数以控制特定的行为，它的使用格式是`-gcflags="pattern=args list"`，`ages list`就是参数列表，`pattern`就是作用范围，有以下几个可用的值

- `main`，入口文件所在的顶级包路径
- `all`，当前模块以及当前模式的所有依赖
- `std`，标准库
- `cmd`，作用`cmd`包下的所有源文件
- 通配符，比如`.`，`./...`，`cmd/...`。

该`pattern`规则适用于所有支持该格式的标志，例如`ldflags`。通过如下命令查看其参数可用的值

```sh
$ go build -gcflags -help
usage: compile [options] file.go...
  -%    debug non-static initializers
  -+    compiling runtime
  -B    disable bounds checking
  -C    disable printing of columns in error messages
  -D path
        set relative path for local imports
  -E    debug symbol export
  -I directory
        add directory to import search path
  -K    debug missing line numbers
  -L    also show actual source file names in error messages for positions affected by //line directives
  -N    disable optimizations
  -S    print assembly listing
  -V    print version and exit
  -W    debug parse tree after type checking
  ......
```

下面介绍几个常用的参数

- `-S`：输出代码的汇编形式
- `-N`：关闭编译优化
- `-m`：输出优化决策
- `-l`：关闭函数内联
- `-c`：编译的并发数
- `-dwarf`：生成 DWARF 标志

比如如果要查看代码的汇编形式，可以使用`-S`参数，并且还要关闭优化和内联，这样才能还原其本来的形式，如下

```sh
$ go build -trimpath -gcflags="-N -l -S" main.go
main.main STEXT size=171 args=0x0 locals=0x58 funcid=0x0 align=0x0
        0x0000 00000 (./main.go:9)      TEXT    main.main(SB), ABIInternal, $88-0
        0x0000 00000 (./main.go:9)      CMPQ    SP, 16(R14)
        0x0004 00004 (./main.go:9)      PCDATA  $0, $-2
        0x0004 00004 (./main.go:9)      JLS     161
        0x000a 00010 (./main.go:9)      PCDATA  $0, $-1
        0x000a 00010 (./main.go:9)      PUSHQ   BP
        0x000b 00011 (./main.go:9)      MOVQ    SP, BP
        0x000e 00014 (./main.go:9)      SUBQ    $80, SP
        0x0012 00018 (./main.go:9)      FUNCDATA        $0, gclocals·J5F+7Qw7O7ve2QcWC7DpeQ==(SB)
        0x0012 00018 (./main.go:9)      FUNCDATA        $1, gclocals·bDfKCdmtOiGIuJz/x+yQyQ==(SB)
        0x0012 00018 (./main.go:9)      FUNCDATA        $2, main.main.stkobj(SB)
        0x0012 00018 (./main.go:10)     MOVUPS  X15, main..autotmp_0+40(SP)
        0x0018 00024 (./main.go:10)     LEAQ    main..autotmp_0+40(SP), CX
        0x001d 00029 (./main.go:10)     MOVQ    CX, main..autotmp_2+32(SP)
```

#### ldflags

通过 ldflags 可以向链接器传递一些参数以控制特定的行为，通过如下命令来查看`ldflags`所有可用的值，接近二三十个。

```sh
$ go build -ldflags -help
usage: link [options] main.o
  -B note
        add an ELF NT_GNU_BUILD_ID note when using ELF
  -E entry
        set entry symbol name
  -H type
        set header type
  -I linker
        use linker as ELF dynamic linker
  -L directory
        add specified directory to library path
  -R quantum
        set address rounding quantum (default -1)
  -T int
        set the start address of text symbols (default -1)
  -V    print version and exit
  -X definition
        add string value definition of the form importpath.name=value
  -a    no-op (deprecated)
  .....
```

`ldflags`的`-X`参数是一个非常实用的功能，它可以在链接时定义指定包的字符串变量的值。通过这个功能，我们可以很方便的在编译时注入一些元信息。而且它只是一个变量，所以也方便在运行时获取，下面是一个简单的例子。

```go
package main

import "fmt"

var (
  Version string
)

func main() {
  fmt.Println(Version)
}

```

执行命令

```sh
go build -ldflags "-X main.Version=$(git describe --always)" main.go
```

运行后就会输出 git 提交的 sha1 校验和。

```
5e3fd7a
```

另外一些比较实用的参数有

- `-w`：不生成 DWARF，这是一种方便调试源码的信息。
- `-s`：禁用符号表

这两个通常放一块用，可以显著的减小编译后的二进制文件的体积，大概有 40%-50%左右，缺点也很明显，没法进行调试，下面是一个例子。

```sh
$ go build -ldflags="-w -s" main.go
```

#### 交叉编译

go 语言编译总共有两大特点，第一个就是快，另外一大特点就是交叉编译，交叉编译指的是可以在本地编译成其它系统的目标代码，例如在`windows`上编译成`linux`或`darwin`上的二进制文件，反过来也是一样。交叉编译支持的语言非常多，这并不是什么稀奇事，但是 go 语言交叉编译非常的简单，只需要以下两步

1. 设置 GOOS 环境变量，选择你的目标操作系统
2. 设置 GOARCH 环境变量，选择你的目标 CPU 架构
3. 像平时一样使用`go build`进行编译

整个过程非常短，不需要使用额外的工具或配置，而且速度跟平时一样快。如下所示

```makefile
build_linux:
  SET CGO_ENABLED=0
  SET GOOS="linux"
  SET GOARCH="amd64"
  go build -o golearn  main.go

build_mac:
  SET CGO_ENABLED=0
  SET GOOS="darwin"
  SET GOARCH="amd64"
  go build -o golearn main.go

build_win:
  SET CGO_ENABLED=0
  SET GOOS="win"
  SET GOARCH="amd64"
  go build -o golearn.exe main.go

.PHONY: build_linux \
    build_mac \
    build_win
```

第一步`SET CGO_ENABLED=0`这一项禁用了 cgo，一旦你的代码中使用了 cgo，那么就无法正常使用交叉编译。第二步`SET GOOS`设置目标系统，可选的有`linux`，`darwin`，`windwos`，`netbsd`。第三步设置 CPU 架构，`SET GOARCH`，可选的有`amd64`，`386`，`arm`，`ppc64`。最后一步就是像往常一样进行编译。

#### 编译控制

`build`命令可以通过`tags`来达到控制编译的效果，它以一种指令的方式存在于源代码中，看个例子，`product.go`文件

```go
// +build product

package main

import "fmt"

func main() {
  fmt.Println("product")
}
```

`debug.go`文件

```go
// +build debug

package main

import "fmt"

func main() {
  fmt.Println("debug")
}
```

它们都有一个`// +build`指令，表示它们在什么情况下才会被编译。其基本格式为

```go
// +build tag1 tag2

package pkg_name
```

有几个必须遵守的规则

1. `//`与`+build`必须隔一个空格
2. 它必须位于包声明的上方
3. 与包声明必须隔一行空行

除此之外，它还可以通过简单的间隔来达到逻辑控制的目的，空格表示 OR，逗号表示 AND，！表示 NOT。比如下面这个例子

```go
// +build windows linux

package pkg_name
```

表示在 windows 或者 linux 平台下会将当前文件编译进去。

```go
// +build windows,amd64,!cgo linux,i386,cgo

package pkg_name
```

这个例子表示的是在 windows 平台 amd64 架构且未启用 cgo 或者是 linux 平台 i386 架构且启用了 cgo 才会将其编译。如果你只是单纯的不想让某个文件不参加编译，可以使用`ignore`。

```go
// +build ignore

package pkg_name
```

也可以存在多行指令

```go
// +build windows
// +build amd64

package pkg_name
```

多行指令以 AND 方式进行处理。对于平台和架构这些 tag，在编译时 go 会自动传入，我们也可以传入自定义的 tag，就拿最开始的拿两个文件举例

```sh
$ go build -tags="debug" . && ./golearn.exe
debug

$ go build -tags="product" . && ./golearn.exe
product
```

可以看到传入不同 tag 时输出不同，编译控制的目的也就达到了。

### run

`run`命令与`build`都会将源代码进行编译，不同的是`run`命令在编译完成后会直接运行。 `run`命令为了加快编译速度，在编译过程中不会生成调试信息，所以也就不支持调试，并且只是生成一个临时的二进制文件，通常存放在`GOTMEPDIR`目录下，例如`/temp/go-build2822241271/b001/exe/main.exe`。

```sh
$ go run -h
usage: go run [build flags] [-exec xprog] package [arguments...]
Run 'go help run' for details.
```

它也支持`build`命令的构建标志，还提供了一个参数`-exec`来指明由哪个程序来运行二进制文件，`[arguments...]`指的是程序的运行参数。下面是一个例子

```go
package main

import (
  "fmt"
  "os"
)

var (
  Version string
)

func main() {
  fmt.Println(Version)
  fmt.Println(os.Args[1:])
}
```

使用`go run`运行

```sh
$ go run -ldflags="-X main.Version=$(git describe --always)" main.go hello
5e3fd7a
[hello]
```

总体上使用起来与`go build`没有太大的差别，就不再做过多的赘述。

### tool

`tool`命令本身没有任何功能，它的作用是直接调用`cmd/`目录下的工具，例如`cmd/compile`就是自带的编译器。通过`go tool`可以直接调用这些工具，不用去手动执行这些工具的二进制文件。

```sh
$ go tool -h
usage: go tool [-n] command [args...]
```

使用`-n`参数打印出其所有支持的命令参数

```sh
$ go tool -n
addr2line
asm
buildid
cgo
compile
covdata
cover
doc
fix
link
nm
objdump
pack
pprof
test2json
trace
vet
```

这些工具存放在`GOROOT/pkg/tool`目录下，并且根据操作系统和 CPU 架构对工具进行分组，如下。

```sh
$ ls $GOROOT/pkg/tool/windows_amd64/ -1
addr2line.exe*
asm.exe*
buildid.exe*
cgo.exe*
compile.exe*
covdata.exe*
cover.exe*
doc.exe*
fix.exe*
link.exe*
nm.exe*
objdump.exe*
pack.exe*
pprof.exe*
test2json.exe*
trace.exe*
vet.exe*
```

使用`go doc cmd/command`格式查看每个命令的用法，比如

```sh
$ go doc cmd/compile
Usage:

    go tool compile [flags] file...

The specified files must be Go source files and all part of the same package.
The same compiler is used for all target operating systems and architectures.
The GOOS and GOARCH environment variables set the desired target.

Flags:

    -D path
        Set relative path for local imports.
    -I dir1 -I dir2
        Search for imported packages in dir1, dir2, etc,
        after consulting $GOROOT/pkg/$GOOS_$GOARCH.
    -L
        Show complete file path in error messages.
...
```

`cmd/compile`支持的标志参数，也就是前面提到过的`gcflags`支持的参数。`go tool compile`与`go build`的不同在于，前者只是负责编译，并且只能以文件作为参数，后者可以以文件夹，包，文件作为参数，而且不仅做了编译源代码这一件事，还负责链接文件，清除无用的文件等，前者是后者的一部分。我们可以打印`build`过程中执行的命令

```sh
$ go build -n main.go

#
# internal/goarch
#

mkdir -p $WORK\b004\
cat >$WORK\b004\importcfg << 'EOF' # internal
# import config
EOF
"/golang/pkg/tool/windows_amd64/compile.exe" -o "$WORK/b004/_pkg_.a" -trimpath "$WORK/b004=>" -p internal/goarch -std -+ -complete -buildid 3gunEkUExGdhOPa2rFsh/3gunEkUExGdhOPa2rFsh -goversion go1.21.0 -c=4 -nolocalimports -importcfg "$WORK/b004/importcfg" -pack "/golang/src/internal/goarch/goarch.go" "/golang/src/internal/goarch/goarch_amd64.go" "/golang/src/internal/goarch/zgoarch_amd64.go"
"/golang/pkg/tool/windows_amd64/buildid.exe" -w "$WORK/b004/_pkg_.a" # internal
...
```

在过程中可以看到有这么一段`/golang/pkg/tool/windows_amd64/compile.exe`，正是调用了编译器。除了`compile`之外，还有很多工具可以调用，很多 go 命令实际上都是它们的别名。

### clean

`clean`命令用于清除编译过程中生成的对象文件

```sh
$ go clean -h
usage: go clean [clean flags] [build flags] [packages]
Run 'go help clean' for details.
```

它支持以下标志

- `-i`：清除对应的归档文件或二进制文件
- `-n`：打印将要清除过程要执行的命令但实际并不执行
- `-x`：打印清除过程中的要执行的命令并执行
- `-r`：通过`import path`递归的进行清除
- `-cache`，清除所有`go build`产生的缓存
- `-testcache`：清除所有产生的测试缓存
- `-modcache`：清除所有下载的模块缓存
- `-fuzzcache`：清除`fuzz test`产生的缓存。

当使用`go tool compile`时，是直接调用编译器命令，并不像`go build`那会做很多善后处理，就会产生对象文件。比如执行如下的命令

```sh
go tool compile -N -S -l main.go
```

就会生成一个名为`main.o`的文件，使用`go clean`命令清除即可。或者使用`-n`参数打印将要执行的命令。

```sh
$ go clean -n
rm -f golearn golearn.exe golearn golearn.exe golearn.test golearn.test.exe golearn.test golearn.test.exe api api.exe main main.exe
```

清除编译缓存，它会删除`GOCACHE`目录下产生的编译缓存

```sh
$ go clean -cache -n
rm -r /cache/00 /cache/01 /cache/02
```

清除 fuzz test 产生的缓存，这些缓存默认存放在`GOCACHE/fuzz/`目录下

```sh
$ go clean -fuzzcache -n
rm -rf /cache/fuzz
```

### fix

go 语言截至到撰写本文时已经有十年了，在语言不断更新和修改的过程中，难免会出现一些因 API 的变化而导致的不兼容，`fix`命令就是为此而生的，它会检测源文件中那些已经过时的 API 并将其替换为新的 API。

```sh
$ go fix -h
usage: go fix [-fix list] [packages]
Run 'go help fix' for details.
```

它支持文件夹，文件名，目录作为参数，接收`-fix`标志来传递参数以表明进行何种修改，可以通过`got tool fix -help`命令查看可用的值

```sh
$ go tool fix -help
usage: go tool fix [-diff] [-r fixname,...] [-force fixname,...] [path ...]
  -diff
        display diffs instead of rewriting files
  -force string
        force these fixes to run even if the code looks updated
  -go string
        go language version for files
  -r string
        restrict the rewrites to this comma-separated list

Available rewrites are:

buildtag
        Remove +build comments from modules using Go 1.18 or later

cftype
        Fixes initializers and casts of C.*Ref and JNI types

context
        Change imports of golang.org/x/net/context to context

egl
        Fixes initializers of EGLDisplay

eglconf
        Fixes initializers of EGLConfig

gotypes
        Change imports of golang.org/x/tools/go/{exact,types} to go/{constant,types}

jni
        Fixes initializers of JNI's jobject and subtypes

netipv6zone
        Adapt element key to IPAddr, UDPAddr or TCPAddr composite literals.

        https://codereview.appspot.com/6849045/

printerconfig
        Add element keys to Config composite literals.
```

下面举个例子，源代码中用到了`golang.org/x/net/context`包

```sh
package main

import (
  "fmt"
  "golang.org/x/net/context"
)

func main() {
  background := context.Background()
  fmt.Println(background.Err())
}
```

使用`go fix`修正，将其替换为标准库中的`context`包，我们可以如下命令来进行替换

```sh
$ go fix -fix context main.go
```

也可以不替换，看看前后文件变化。

```sh
$ go tool fix -r context -diff  main.go
main.go: fixed context
diff main.go fixed/main.go
--- main.go
+++ fixed/main.go
@@ -1,8 +1,8 @@
 package main

 import (
+       "context"
        "fmt"
-       "golang.org/x/net/context"
 )

 func main() {
```

go 语言诞生了十多年只有九个可用的替换参数，可见兼容性保持的还算可以。

### fmt

`fmt`命令是 go 语言自带的格式化工具，用于格式化 go 源代码文件。

```sh
$ go fmt -h
usage: go fmt [-n] [-x] [packages]
Run 'go help fmt' for details.
```

通过命令`go doc gofmt`查看其详细文档

```sh
$ go doc cmd/gofmt
Gofmt formats Go programs. It uses tabs for indentation and blanks for
alignment. Alignment assumes that an editor is using a fixed-width font.

Usage:

    gofmt [flags] [path ...]

The flags are:

    -d
        Do not print reformatted sources to standard output.
        If a file's formatting is different than gofmt's, print diffs
        to standard output.
    -e
        Print all (including spurious) errors.
    -l
        Do not print reformatted sources to standard output.
        If a file's formatting is different from gofmt's, print its name
        to standard output.
    -r rule
        Apply the rewrite rule to the source before reformatting.
    -s
        Try to simplify code (after applying the rewrite rule, if any).
    -w
        Do not print reformatted sources to standard output.
        If a file's formatting is different from gofmt's, overwrite it
        with gofmt's version. If an error occurred during overwriting,
        the original file is restored from an automatic backup.

```

`gofmt`使用`tab`进行缩进，空格进行对齐，在默认情况下格式化后的代码将会输出到标准输出中，并非覆盖到原文件。`go fmt`命令实际上用到的是`gofmt`命令，它是一个独立的二进制文件，位于`GOROOT/bin`目录下。

```sh
$ ls $GOROOT/bin -1
go.exe*
gofmt.exe*
```

给`go fmt`命令加上`-n`标志就可以知晓其将要执行的指令。

```sh
$ go fmt main.go
/golang/bin/gofmt.exe -l -w main.go
```

可以看出`go fmt`其实就是是`gofmt -l -w`的别名，`gofmt`命令有以下参数

- `-d`：输出格式化前后的文件差异
- `-e`：输出所有错误
- `-l`：输出发生变化的文件名
- `-r`：应用格式化规则
- `-s`：尝试简化代码
- `-w`：覆盖源文件，如果发生错误就恢复备份

假设现在有如下源文件

```go
$ cat main.go
package main

import "fmt"

func main() {
fmt.Println("hello world!")}
```

通过`-d`参数可以预览其变化

```sh
$ gofmt -d main.go
diff main.go.orig main.go
--- main.go.orig
+++ main.go
@@ -3,5 +3,5 @@
 import "fmt"

 func main() {
-fmt.Println("hello world!")}
-
+       fmt.Println("hello world!")
+}
```

`-l`参数将会输出将要修改的文件名

```
$ gofmt -l .
main.go
```

如果存在语法错误的话，`-e`参数可以输出的更详细

```sh
$ gofmt -d -e main.go
main.go:6:27: missing ',' in argument list
main.go:6:28: expected operand, found newline
main.go:7:2: expected ')', found 'EOF'
main.go:7:2: expected ';', found 'EOF'
main.go:7:2: expected ';', found 'EOF'
main.go:7:2: expected '}', found 'EOF'
main.go:7:2: missing ',' in argument list
```

`-w`会将修改应用到源文件中

```sh
$ gofmt -l -w .
main.go

$ cat main.go
package main

import "fmt"

func main() {
        fmt.Println("hello world!")
}

```

你可以发现作为一个格式化工具，`gofmt`完全没有提供任何的自定义配置，而专为美化 js 代码的格式化器`prettify`它就提供了相当多的配置用于格式化代码，这里可以体现出 go 官方的一个态度，别想搞什么个性化，所有人代码风格最好都是一致的，至少有一个好处就是在阅读代码的时候不用去适应他人的习惯。不过其实它还是保留了一个自定义项的，就是格式化代码的替换规则，规则是可以自定义的，格式如下

```
pattern -> replacement
```

比如去除冗余的括号

```
(a) -> a
```

查看文件变更

```sh
$ gofmt -r "(a) -> a" -d -l .
main.go
diff main.go.orig main.go
--- main.go.orig
+++ main.go
@@ -3,5 +3,5 @@
 import "fmt"

 func main() {
-       fmt.Println(("hello world!"))
+       fmt.Println("hello world!")
 }
```

可以看到`gofmt`会将冗余的括号删除掉。

### get

`get`命令绝对是 go 开发过程中最常用的了，它的作用是将指定地址包源代码下载到`GOMODCACHE`所对应的目录中。

```sh
$ go get -h
usage: go get [-t] [-u] [-v] [build flags] [packages]
Run 'go help get' for details.
```

- `-u`：尝试更新包的次要版本以及补丁版本，如果涉及到主版本的改变，比如`v1->v2`，将不会更新。
- `-t`：更新测试中的依赖版本
- `-v`：输出被编译的包，实际上属于`build flags`的参数之一

在古早时期，`go get`的作用和`go install`类似，它会下载并编译这些包，然而随着 go 模块的诞生与完善，这一部分的作用渐渐的被废弃了，`get`命令现在最常用的作用就是对 go 模块下载并解析依赖，所以你可以看到`go get`命令还支持`build flags`这类构建标志，并且如果你尝试在模块外像使用`go install`一样使用`go get`，它会提示你此用法已经被废弃了。

```sh
$ go get github.com/wire/wire
go: go.mod file not found in current directory or any parent directory.
        'go get' is no longer supported outside a module.
        To build and install a command, use 'go install' with a version,
        like 'go install example.com/cmd@latest'
        For more information, see https://golang.org/doc/go-get-install-deprecation
        or run 'go help get' or 'go help install'.

```

至于为什么在文档描述中还保留这些也是不得而知，翻看`get`命令的源代码，你还会发现它保留了以前的那些 flag。

```go
var (
  getD        = CmdGet.Flag.Bool("d", true, "")
  getF        = CmdGet.Flag.Bool("f", false, "")
  getFix      = CmdGet.Flag.Bool("fix", false, "")
  getM        = CmdGet.Flag.Bool("m", false, "")
  getT        = CmdGet.Flag.Bool("t", false, "")
  getU        upgradeFlag
  getInsecure = CmdGet.Flag.Bool("insecure", false, "")
  // -v is cfg.BuildV
)
```

回到正题，`get`命令会将指定的包的源代码下载到本地的全局依赖目录中，也就是`GOCACHE`对应的目录，然后将信息记录到`go.mod`和`go.sum`文件中，前者负责记录版本，后者负责记录 sha1 校验和确保安全性。`get`命令实际上是基于 VCS，也就是本地的版本控制系统，总共支持下面几个

- git
- hg (Mercurial)
- bzr (Bazaar)
- svn
- fossil

其中，默认只支持 git 和 hg，可以`GOVCS`中进行配置，格式如下

```
GOVCS=github.com:git,example.com:hg,*:git|hg,*:all
```

`GOVCS`仅支持 git 和 hg 作为 VCS，其它三个需要在`GOPRIVATE`中配置。

`go get`命令总共有下面几种用法，可以直接将依赖地址作为参数

```sh
$ go get golang.org/x/net
```

也可以指定版本

```sh
$ go get golang.org/x/net@0.17.0
```

指定最新版本

```sh
$ go get golang.org/x/net@latest
```

尝试更新版本

```sh
$ go get -u golang.org/x/net
```

移除某一依赖

```sh
$ go get golang.org/x/net@none
```

上面这些是用来管理普通的依赖，它还可以用来管理不那么普通的依赖，比如更新 go 语言的版本

```sh
$ go get go@latest
go: updating go.mod requires go >= 1.21.3; switching to go1.21.3
go: downloading go1.21.3 (windows/amd64)
go: upgraded go 1.21.0 => 1.21.3
```

甚至还可以用来更新 go 工具链的版本

```sh
$ go get toolchain@latest
```

当你使用`go get`更新 go 和工具链版本时，它们会在`GOMODCACHE/golang.org/`目录下安装新版本的 go

```sh
$ ls $(go env GOMODCACHE)/golang.org -1
'toolchain@v0.0.1-go1.21.3.windows-amd64'/
x/
```

这时候再手动修改一下`GOROOT`就可以切换到指定的版本了。

### install

`install`命令与`get`命令类似，它们都是用于下载第三方的依赖，不过区别在于`get`命令下载的是源码，而`install`命令会将源码编译成本机可执行的二进制文件，二进制文件存放路径首先在`GOBIN`目录下，其次是`GOPATH/bin`。该命令的主要功能是用来下载第三方公开的一些命令行工具，得益于 go 语言的编译速度和可移植性，并不需要下载二进制文件，而是直接下载源代码然后在本地进行编译。

```sh
$ go install -h
usage: go install [build flags] [packages]
Run 'go help install' for details.
```

`install`命令接收构建标志和包名作为参数，在 gomod 开启的情况下，包名必须携带版本号。例如下载 delve 调试器

```sh
$ go install -x github.com/go-delve/delve/cmd/dlv@latest
# get https://goproxy.cn/github.com/@v/list
# get https://goproxy.cn/github.com/go-delve/delve/cmd/@v/list
# get https://goproxy.cn/github.com/go-delve/delve/cmd/dlv/@v/list
# get https://goproxy.cn/github.com/go-delve/delve/@v/list
# get https://goproxy.cn/github.com/go-delve/@v/list
# get https://goproxy.cn/github.com/@v/list: 404 Not Found (0.014s)
# get https://goproxy.cn/github.com/go-delve/delve/cmd/@v/list: 404 Not Found (0.027s)
# get https://goproxy.cn/github.com/go-delve/delve/cmd/dlv/@v/list: 404 Not Found (0.027s)
# get https://goproxy.cn/github.com/go-delve/delve/@v/list: 200 OK (0.027s)
# get https://goproxy.cn/github.com/go-delve/@v/list: 404 Not Found (0.027s)
WORK=/home/user/tmp/go-build2033992495
mkdir -p $WORK/b001/
cat >/home/user/tmp/go-build2033992495/b001/importcfg.link << 'EOF' # internal
packagefile github.com/go-delve/delve/cmd/dlv=/home/user/.cache/go-build/f1/f11d552287458c0fce625abe50bf928c487064c36bbb1251ad8b1968772c3e4b-d
......
......
mkdir -p /home/wyh/gomod/bin/
mv $WORK/b001/exe/a.out /home/wyh/gomod/bin/dlv
rm -r $WORK/b001/
```

它首先会将源代码下载到`GOMODCACHE`所存放的路径，这一点跟`get`命令一致，然后切换到临时工作目录，对其进行编译，编译完成后将二进制文件移动到`GOPATH/bin`目录下，最后再删除临时文件夹。`install`命令还有一个限制就是下载的包必须是该项目的入口包，也就是说必须要包含`main.go`入口文件，否则的话会提示你无法安装。例如，使用`go install`下载 gin

```sh
$ go install -x github.com/gin-gonic/gin@latest
# get https://goproxy.cn/github.com/@v/list
# get https://goproxy.cn/github.com/gin-gonic/gin/@v/list
# get https://goproxy.cn/github.com/gin-gonic/@v/list
# get https://goproxy.cn/github.com/@v/list: 404 Not Found (0.022s)
# get https://goproxy.cn/github.com/gin-gonic/gin/@v/list: 200 OK (0.027s)
# get https://goproxy.cn/github.com/gin-gonic/@v/list: 404 Not Found (0.028s)
package github.com/gin-gonic/gin is not a main package
```

gin 是一个 web 框架依赖库，并不是一个命令行工具，自然也就没有入口文件，所以也就会安装失败。

### list

`list`命令会列出指定位置的包，一行一个，并且支持自定义格式化输出，支持很多的参数，使用它的前提是必须在一个支持 gomod 的项目内。

```sh
$ go list -h
usage: go list [-f format] [-json] [-m] [list flags] [build flags] [packages]
Run 'go help list' for details.
```

它支持的参数如下

- `-f`：格式化参数
- `-json`：json 格式输出
- `-compiled`：展示所有会被编译器编译的包
- `-deps`：展示每一个包及其所依赖的每一个包的名称
- `-test`：展示每一个包的测试包
- `-e`：遇到错误的包时正常输出
- `-find`：不解析这些包的依赖关系
- `-export`：使用该参数时，设置结构体`Package.Export`字段值为包含指定包的最新的导出信息的文件，以及设置`Package.BuildID`字段值为包的`BuildID`，主要是格式化输出用。

模块信息参数，

- `-m`：输出模块而不是输出包

- `-versions`：展示一个模块所有可用的信息
- `-retracted`：展示一个模块的撤回版本

`[packages]`参数可以是一个指定的包名，或者文件夹，也可以是`all`，表示任何地方，当使用`-m`参数时，`all`表示当前模块引用的所有依赖。

例如，当前文件只有一个`main.go`文件，且只有一行输出`"hello world"`的代码，执行`go list -deps .`后，它输出了从当前项目到`fmt`及其引用的所有依赖的包。

```bash
$ ls
go.mod  go.sum  main.go

$ cat main.go
package main

import "fmt"

func main() {
        fmt.Println("hello world")
}

$ go list -deps .
internal/goarch
unsafe
internal/abi
internal/unsafeheader
internal/cpu
internal/bytealg
internal/coverage/rtcov
internal/godebugs
internal/goexperiment
internal/goos
runtime/internal/atomic
runtime/internal/math
runtime/internal/sys
runtime
......
......
path
io/fs
os
fmt
golearn
```

或者输出当前项目下所有的模块依赖

```bash
$ go list -m all
golearn
cloud.google.com/go v0.26.0
github.com/246859/containers v0.0.1
github.com/246859/river v0.1.0 => D:\WorkSpace\Code\riverdb
github.com/BurntSushi/toml v0.3.1
github.com/Jleagle/steam-go v0.0.0-20230725082712-1053b441b1f2
github.com/Jleagle/unmarshal-go v0.0.0-20210227002040-694f544f9265
github.com/KyleBanks/depth v1.2.1
github.com/Microsoft/go-winio v0.6.1
github.com/PuerkitoBio/purell v1.1.1
github.com/PuerkitoBio/urlesc v0.0.0-20170810143723-de5bf2ad4578
github.com/andeya/ameda v1.5.3
github.com/andeya/goutil v1.0.1
...
```

#### format

`list`命令的输出是以行为单位，每一个行输出都是一个包。官方提供了可以让我们自定义行输出格式的参数`-f`，它所接受的值也就是`template/text`模板引擎包所定义的模板语法，例如下面的示例

```sh
-f "package {{ .Dir }} {{ .Name }}"
```

每一个迭代的包都将以下面结构体的形式传入，该结构体中的所有字段都可以作为模板参数。

```go
type Package struct {
    Dir            string   // directory containing package sources
    ImportPath     string   // import path of package in dir
    ImportComment  string   // path in import comment on package statement
    Name           string   // package name
    Doc            string   // package documentation string
    Target         string   // install path
    Shlib          string   // the shared library that contains this package (only set when -linkshared)
    Goroot         bool     // is this package in the Go root?
    Standard       bool     // is this package part of the standard Go library?
    Stale          bool     // would 'go install' do anything for this package?
    StaleReason    string   // explanation for Stale==true
    Root           string   // Go root or Go path dir containing this package
    ConflictDir    string   // this directory shadows Dir in $GOPATH
    BinaryOnly     bool     // binary-only package (no longer supported)
    ForTest        string   // package is only for use in named test
    Export         string   // file containing export data (when using -export)
    BuildID        string   // build ID of the compiled package (when using -export)
    Module         *Module  // info about package's containing module, if any (can be nil)
    Match          []string // command-line patterns matching this package
    DepOnly        bool     // package is only a dependency, not explicitly listed
    DefaultGODEBUG string  // default GODEBUG setting, for main packages

    // Source files
    GoFiles           []string   // .go source files (excluding CgoFiles, TestGoFiles, XTestGoFiles)
    CgoFiles          []string   // .go source files that import "C"
    CompiledGoFiles   []string   // .go files presented to compiler (when using -compiled)
    IgnoredGoFiles    []string   // .go source files ignored due to build constraints
    IgnoredOtherFiles []string // non-.go source files ignored due to build constraints
    CFiles            []string   // .c source files
    CXXFiles          []string   // .cc, .cxx and .cpp source files
    MFiles            []string   // .m source files
    HFiles            []string   // .h, .hh, .hpp and .hxx source files
    FFiles            []string   // .f, .F, .for and .f90 Fortran source files
    SFiles            []string   // .s source files
    SwigFiles         []string   // .swig files
    SwigCXXFiles      []string   // .swigcxx files
    SysoFiles         []string   // .syso object files to add to archive
    TestGoFiles       []string   // _test.go files in package
    XTestGoFiles      []string   // _test.go files outside package

    // Embedded files
    EmbedPatterns      []string // //go:embed patterns
    EmbedFiles         []string // files matched by EmbedPatterns
    TestEmbedPatterns  []string // //go:embed patterns in TestGoFiles
    TestEmbedFiles     []string // files matched by TestEmbedPatterns
    XTestEmbedPatterns []string // //go:embed patterns in XTestGoFiles
    XTestEmbedFiles    []string // files matched by XTestEmbedPatterns

    // Cgo directives
    CgoCFLAGS    []string // cgo: flags for C compiler
    CgoCPPFLAGS  []string // cgo: flags for C preprocessor
    CgoCXXFLAGS  []string // cgo: flags for C++ compiler
    CgoFFLAGS    []string // cgo: flags for Fortran compiler
    CgoLDFLAGS   []string // cgo: flags for linker
    CgoPkgConfig []string // cgo: pkg-config names

    // Dependency information
    Imports      []string          // import paths used by this package
    ImportMap    map[string]string // map from source import to ImportPath (identity entries omitted)
    Deps         []string          // all (recursively) imported dependencies
    TestImports  []string          // imports from TestGoFiles
    XTestImports []string          // imports from XTestGoFiles

    // Error information
    Incomplete bool            // this package or a dependency has an error
    Error      *PackageError   // error loading package
    DepsErrors []*PackageError // errors loading dependencies
}

type PackageError struct {
    ImportStack   []string // shortest path from package named on command line to this one
    Pos           string   // position of error (if present, file:line:col)
    Err           string   // the error itself
}
```

如果迭代的是模块，则以下面结构体的形式传入，它的所有字段也可以作为模板参数。

```go
type Module struct {
    Path       string        // module path
    Query      string        // version query corresponding to this version
    Version    string        // module version
    Versions   []string      // available module versions
    Replace    *Module       // replaced by this module
    Time       *time.Time    // time version was created
    Update     *Module       // available update (with -u)
    Main       bool          // is this the main module?
    Indirect   bool          // module is only indirectly needed by main module
    Dir        string        // directory holding local copy of files, if any
    GoMod      string        // path to go.mod file describing module, if any
    GoVersion  string        // go version used in module
    Retracted  []string      // retraction information, if any (with -retracted or -u)
    Deprecated string        // deprecation message, if any (with -u)
    Error      *ModuleError  // error loading module
    Origin     any           // provenance of module
    Reuse      bool          // reuse of old module info is safe
}

type ModuleError struct {
    Err string // the error itself
}
```

查看所有包

```bash
$ go list -f "package {{.Dir}} {{.Name}}" ./...
package /golearn main
package /golearn/app cmd
package /golearn/cmd cmd
package /golearn/docs docs
package /golearn/tool tool
package /golearn/tool_test tool
```

查看模块

```bash
$ go list -m -f "mod {{.Path}} {{.Version}} {{.GoVersion}} {{.GoMod}}"
mod golearn  1.21.3 /golearn/go.mod
```

### mod

`go mod`是专用于管理 go 模块的命令。

```sh
$ go mod help
Go mod provides access to operations on modules.

Note that support for modules is built into all the go commands,
not just 'go mod'. For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be done using 'go get'.
See 'go help modules' for an overview of module functionality.

Usage:

        go mod <command> [arguments]

The commands are:

        download    download modules to local cache
        edit        edit go.mod from tools or scripts
        graph       print module requirement graph
        init        initialize new module in current directory
        tidy        add missing and remove unused modules
        vendor      make vendored copy of dependencies
        verify      verify dependencies have expected content
        why         explain why packages or modules are needed

Use "go help mod <command>" for more information about a command.
```

它有下面几个子命令

- `download`：将`go.mod`文件中所有标明的依赖下载到本地缓存
- `edit`：编辑`go.mod`文件，它提供的命令行接口主要是提供给其它工具或脚本调用的。
- `init`：在当前目录初始化一个 gomod 项目
- `tidy`：下载缺失的依赖，删除无用的依赖
- `graph`：输出依赖图
- `verify`：验证本地的依赖
- `why`：解释为什么会依赖这些模块
- `vendor`：导出项目依赖到 vendor 目录

#### init

```sh
$ go help mod init
usage: go mod init [module-path]
```

`init`命令用于初始化一个 gomod 项目，其唯一的参数是模块路径，日后如果别人要下载你的依赖就需要通过此模块路径来作为依据。它的命名规则一般为

```
domain_name/user_name/repo_name
```

比如一般大家都会把项目放在 github 上，所以可以是

```
github.com/jack/gotour
```

不太建议使用一些特殊符号作为模块路径。下面看一个使用案例

```sh
$ mkdir gotour

$ cd gotour

$ go mod init "github.com/jack/gotour"
go: creating new go.mod: module github.com/jack/gotour
```

#### tidy

```
$ go help mod tidy
usage: go mod tidy [-e] [-v] [-x] [-go=version] [-compat=version]
```

`tidy`命令会清除`go.mod`中的无用依赖项，也就是没有被引用的依赖项，以及会下载哪些了被引用但是不存在的依赖项。它支持以下参数

- `-v`，输出那些被删除的模块依赖
- `-e`，如果过程中发生错误则忽略它继续执行
- `-x`，输出执行过程
- `-go=version`，更新`go.mod`文件中的 go 版本
- `-compact=version`，保留从指定的主要 Go 版本中所需的任何附加校验和，以便成功加载模块图，并且如果该版本的`go`命令从不同模块版本中加载任何已导入的包，将导致 tidy 出错。通常很少会用到这个参数，一般在版本版本变更时才会出错，可以前往 stackoverflow 看看这个回答[go modules - go mod tidy error message: "but go 1.16 would select" - Stack Overflow](https://stackoverflow.com/questions/71973152/go-mod-tidy-error-message-but-go-1-16-would-select)

看一个使用例子

```sh
$ go mod tidy -v
unused github.com/246859/containers
unused github.com/246859/river
unused github.com/Jleagle/steam-go
unused github.com/Jleagle/unmarshal-go
unused github.com/KyleBanks/depth
unused github.com/Microsoft/go-winio
unused github.com/PuerkitoBio/purell
unused github.com/PuerkitoBio/urlesc
unused github.com/andeya/ameda
unused github.com/andeya/goutil
unused github.com/asaskevich/govalidator
unused github.com/buger/jsonparser
unused github.com/bwmarrin/snowflake
unused github.com/bytedance/go-tagexpr/v2
unused github.com/bytedance/sonic
unused github.com/cespare/xxhash/v2
unused github.com/chenzhuoyu/base64x
......
```

#### download

```sh
$ go help mod download
usage: go mod download [-x] [-json] [-reuse=old.json] [modules]
```

`download`命令的名称虽然翻译过来叫下载，但它只是把依赖下载到本地的依赖缓存中，不会修改`go.mod`文件，它的作用是预下载依赖到本地的文件缓存中，如果你想要下载某一个依赖，建议使用`go get`或者`go mod tidy`。

下面是几个使用例子

```sh
$ go mod download -x gorm.io/gorm
# get https://goproxy.cn/gorm.io/gorm/@v/list
# get https://goproxy.cn/gorm.io/gorm/@v/list: 200 OK (0.084s)
```

如果不带任何参数，它会下载所有存在于`go.mod`文件中但是又不存在与本地依赖缓存中的依赖项，如果没有需要下载的它会输出

```
go: no module dependencies to download
```

#### edit

```sh
$ go help mod edit
usage: go mod edit [editing flags] [-fmt|-print|-json] [go.mod]
```

`edit`是一个命令行接口，用于修改`go.mod`文件，通常是提供给其它程序使用的，一些编辑器 IDE 为提供 gomod 支持就会使用这些命令。它支持下面几个参数

- `-module`，修改模块路径
- `-go=version`，修改期望的 go 版本
- `-require=path@version`，新增一个依赖项
- `-droprequire=path@version`，删除一个依赖项
- `-exclude=path@version`，新增一个排除依赖项
- `-dropexclude=path@version`，删除一个排除依赖项
- `-replace=old@version=new@version`，新增一个替换依赖项
- `-dropreplace=old@version`，删除一个替换依赖项
- `-retract=version`，新增一个版本回退项
- `-dropretract=version`，删除一个版本回退项

还有一些其它用于展示的参数

- `-print`，输出文件内容
- `-json`，以 json 格式输出

比如下面这个例子

```
$ go mod edit -print
module golearn

go 1.21.3

require (
        github.com/dstgo/task v1.2.0
        github.com/spf13/cast v1.5.1
        github.com/swaggo/swag v1.16.2
        golang.org/x/net v0.19.0
        gorm.io/gorm v1.25.5
)
```

#### graph

```sh
$ go help mod graph
usage: go mod graph [-go=version] [-x]
```

`graph`命令会输出当前项目下的依赖图，其可读性很差，并且大多数时候也不是给人类阅读的，其结果通常会被处理再以可视化的形式展示。每一行是就是一个依赖，其格式如下

```
引用方 被引用方
```

比如

```
golearn go@1.21.3
```

它还支持两个参数

- `-go=version`，使用给定 go 版本加载依赖图，其值不能小于`go.mod`文件中的版本。
- `-x`，展示过程中所执行的命令。

看一个简单的使用例子

```sh
$ go mod graph
golearn github.com/246859/containers@v0.0.1
golearn github.com/246859/river@v0.1.0
golearn github.com/Jleagle/steam-go@v0.0.0-20230725082712-1053b441b1f2
golearn github.com/Jleagle/unmarshal-go@v0.0.0-20210227002040-694f544f9265
golearn github.com/KyleBanks/depth@v1.2.1
golearn github.com/Microsoft/go-winio@v0.6.1
golearn github.com/PuerkitoBio/purell@v1.1.1
golearn github.com/PuerkitoBio/urlesc@v0.0.0-20170810143723-de5bf2ad4578
golearn github.com/andeya/ameda@v1.5.3
golearn github.com/andeya/goutil@v1.0.1
golearn github.com/asaskevich/govalidator@v0.0.0-20230301143203-a9d515a09cc2
golearn github.com/buger/jsonparser@v1.1.1
golearn github.com/bwmarrin/snowflake@v0.3.0
golearn github.com/bytedance/go-tagexpr/v2@v2.9.11
......
```

#### vendor

```sh
$ go help mod vendor
usage: go mod vendor [-e] [-v] [-o outdir]
```

vendor 是早期 gomod 没有推出之前的一个 gopath 的替代方案，每一个 go 项目下都会有一个 vendor 目录，按照`domain/user/project`这种格式单独存放每一个项目的依赖，就像隔壁 nodeJs 臃肿的`node_module`一样每一个项目的依赖分开放，这种依赖管理方式现在看起来确实很愚蠢，但是在那个时候确实没有更好的方案了，之所以保留 vendor 是因为 go 秉承的向下兼容的承诺，有一些老项目包括 go 源代码里面可能还在使用 vendor。

回到正题，`vendor`是`go mod`的一个子命令，它可以将当前模块所引用的全局依赖导出到 vendor 目录中。

```sh
$ go mod vendor -h
usage: go mod vendor [-e] [-v] [-o outdir]
Run 'go help mod vendor' for details.
```

它有以下几个参数

- `-o`：指定输出路径文件夹
- `-v`：输出每一个依赖
- `-e`：出现错误时不退出仍然继续

下面看一个示例，先用`go list -m all`查看下当前项目所引用的依赖

```sh
$ go list -m all
github.com/dstgo/task
github.com/davecgh/go-spew v1.1.1
github.com/pkg/errors v0.9.1
github.com/pmezard/go-difflib v1.0.0
github.com/stretchr/objx v0.5.0
github.com/stretchr/testify v1.8.4
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405
gopkg.in/yaml.v3 v3.0.1
```

导出到当前的 vendor 目录下

```sh
$ go mod vendor -v -e -o vendor
# github.com/davecgh/go-spew v1.1.1
## explicit
github.com/davecgh/go-spew/spew
# github.com/pkg/errors v0.9.1
## explicit
github.com/pkg/errors
# github.com/pmezard/go-difflib v1.0.0
## explicit
github.com/pmezard/go-difflib/difflib
# github.com/stretchr/testify v1.8.4
## explicit; go 1.20
github.com/stretchr/testify/assert
# gopkg.in/yaml.v3 v3.0.1
## explicit
gopkg.in/yaml.v3
```

导出后的目录结构如下

```
└─vendor
    ├─github.com
    │  ├─davecgh
    │  │  └─go-spew
    │  │      └─spew
    │  ├─pkg
    │  │  └─errors
    │  ├─pmezard
    │  │  └─go-difflib
    │  │      └─difflib
    │  └─stretchr
    │      └─testify
    │          └─assert
    └─gopkg.in
    |    └─yaml.v3
    |
    |--modules.txt
```

其中的`modules.txt`是描述所有依赖项的文件，就类似于现在的`go.mod`。

#### verify

```sh
$ go help mod verify
usage: go mod verify
```

该命令会检查项目的依赖自下载到本地以后是否被修改过。比如，如果没问题就输出`all modules verified`

```sh
$ go mod verify
all modules verified
```

否则它会报告哪里发生了改变，并以非正常状态结束命令。比如

```sh
$ go mod verify
gorm.io/gorm v1.25.5: dir has been modified (/go/mod/libs/gorm.io/gorm@v1.25.5)
```

#### why

```
$ go help mod why
usage: go mod why [-m] [-vendor] packages...
```

解释为什么这个包被依赖，实际上是输出有关它的依赖图。比如

```sh
$ go mod why gorm.io/gorm
# gorm.io/gorm
golearn
gorm.io/gorm
```

默认只会解析从`main`的导入，加上`-m`参数可以分析每一个包的导入情况。

### work

命令 work 是一个用于 go 多模块管理的本地开发工具

```bash
$ go work help
Work provides access to operations on workspaces.

Note that support for workspaces is built into many other commands, not
just 'go work'.

The commands are:

        edit        edit go.work from tools or scripts
        init        initialize workspace file
        sync        sync workspace build list to modules
        use         add modules to workspace file
        vendor      make vendored copy of dependencies

Use "go help work <command>" for more information about a command.
```

#### init

`init`子命令用于初始化一个 workspace，该命令会创建一个名为`go.work`的文件

```bash
$ go work init -h
usage: go work init [moddirs]
Run 'go help work init' for details.
```

接收参数`[moddirs]`指定将哪些模块纳入管理，例如

```bash
$ go work init ./service ./api
```

#### use

`use`子命令用于向`go.work`中添加纳入管理的模块目录

```bash
$ go help work use
usage: go work use [-r] [moddirs]

Use provides a command-line interface for adding
directories, optionally recursively, to a go.work file.
```

接收`[moddirs]`作为参数，还有一个`-r`表示在`[moddirs]`路径下递归搜索模块，例如

```bash
$ go work use -r ./oss-api ./multi_modules
```

#### edit

`edit`子命令的作用同`go mod edit`，都是留给命令行接口给其它工具和脚本操作的。

```
$ go help work edit
usage: go work edit [editing flags] [go.work]

Edit provides a command-line interface for editing go.work,
for use primarily by tools or scripts. It only reads go.work;
it does not look up information about the modules involved.
If no file is specified, Edit looks for a go.work file in the current
directory and its parent directories
```

参数有如下

- `-fmt`，格式化`go.work`文件

- `-use`，`-dropuse`，添加和移除模块路径

- `-replace=old[@v]=new[@v]`，`-dropreplace=old[@v]=new[@v]`，用于添加和移除要替换的模块

- `-go`，`-toolchain=name`，指定 go 版本，以及指定要使用的工具链

- `-print`，将最后的修改打印出来，不写回文件

- `-json`，以`json`格式输出，无法与`-print`同时存在，对应类型结构如下所示

  ```go
  type GoWork struct {
          Go        string
          Toolchain string
          Use       []Use
          Replace   []Replace
  }

  type Use struct {
          DiskPath   string
          ModulePath string
  }

  type Replace struct {
          Old Module
          New Module
  }

  type Module struct {
          Path    string
          Version string
  }
  ```

一些使用示例如下，格式化输出

```bash
$ go work edit -fmt -print
go 1.22.0

use (
        ./ab/cd
        ./auth
        ./user
)
```

json 输出

```bash
$ go work edit -fmt -json
{
        "Go": "1.22.0",
        "Use": [
                {
                        "DiskPath": "./ab/cd"
                },
                {
                        "DiskPath": "./auth"
                },
                {
                        "DiskPath": "./user"
                }
        ],
        "Replace": null
}
```

#### sync

`sync`子命令用于将`go.work`中的模块列表回到 workspace 中的各个模块中。

```bash
$ go help work sync
usage: go work sync

Sync syncs the workspace's build list back to the
workspace's modules
```

这个过程主要发生在**本地开发完成后**，各个模块**已经完成发版工作**，此时使用`sync`，它会根据各个模块的依赖关系来更新 worksapce 所有模块的`go.mod`中的依赖，从而不需要我们去手动更新。

#### vendor

`vendor`命令会将 workspace 中所有模块依赖的库做一份复制到`vendor`目录下。

```bash
$ go work help vendor
usage: go work vendor [-e] [-v] [-o outdir]
```

功能同`go mod vendor`，不再做过多的赘述。

### vet

命令`vet`是一个 go 语言源代码的静态错误检查工具，就像其它语言的 lint 工具，比如`Eslint`。

```sh
$ go vet -h
usage: go vet [build flags] [-vettool prog] [vet flags] [packages]
Run 'go help vet' for details.
Run 'go tool vet help' for a full list of flags and analyzers.
Run 'go tool vet -help' for an overview.
```

先来看一个简单的示例，现有如下源代码

```sh
$ cat main.go
package main

import "fmt"

func main(){
        fmt.Println("hello world!"
}
```

在同级目录下不带任何参数执行`go vet`

```sh
$ go vet
vet: ./main.go:6:28: missing ',' before newline in argument list (and 1 more errors)
```

`vet`会报告哪个文件哪一行出了什么问题。它支持构建标志作为参数，例如`-n`和`-x`，支持包，文件夹，文件名作为参数。

```sh
$ go vet .
$ go vet main.go
$ go vet ./cmd
$ go vet runtime
```

通过如下命令查看其更详细的参数和解释。

```sh
$ go tool vet help
vet is a tool for static analysis of Go programs.

vet examines Go source code and reports suspicious constructs,
such as Printf calls whose arguments do not align with the format
string. It uses heuristics that do not guarantee all reports are
genuine problems, but it can find errors not caught by the compilers.

Registered analyzers:

    asmdecl      report mismatches between assembly files and Go declarations
    assign       check for useless assignments
    atomic       check for common mistakes using the sync/atomic package
    bools        check for common mistakes involving boolean operators
    buildtag     check //go:build and // +build directives
    ......
```

`go tool vet`命令并不能直接用来对代码进行检查，应该使用`go vet`。`go vet`参数中的`[vet flag]`支持设置代码分析器，可用的值如下

```
asmdecl      检查汇编文件是否与go声明不匹配
assign       检查是否有无用的变量
atomic       检查使用sync/atomic时是否破坏了原子性
bools        检查是否错误使用逻辑运算符
buildtag     检查build tag
cgocall      检查违反cgao指针传递规则的行为
composites   检查未初始化的复合结构，比如map，chan
copylocks    检查是否发生了锁的值复制
directive    检查go工具链指令
errorsas     检查是否向errors.As传递非指针类型或非error类型的值
framepointer 检查编译优化后的汇编代码是否在保存帧指针之前对其进行清除
httpresponse 检查是否错误使用httpresponse
ifaceassert  检查接口到接口的类型断言
loopclosure  循环变量的引用问题
lostcancel   context.WithCancel没有使用cancel函数
nilfunc      检查函数和nil之间是否存在无用的比较
printf       检查printf的格式化参数是否正确
shift        检查是否有等于或超过整数宽度的移位
sigchanyzer  检查无缓冲的chan os.Signal
slog         检查不合法的结构化日志调用
stdmethods   检查已知接口方法的签名是否正确
stringintconv 检查字符串整型转换
structtag    检查结构体tag是否正确
testinggoroutine 检查是否在测试中使用协程调用testing.Fatal
tests        检查测试和示例的常见错误用法
timeformat   使用(time.Time).Format 或 time.Parse的时间格式是否正确
unmarshal    向unmarshal传递非指针或非接口类型
unreachable  检查不可到达的代码
unsafeptr    检查uintptr到unsafe.Pointer不正确转换
unusedresult 检查未使用的函数返回值
```

它们都是针对某一个点进行分析的分析器，比如`timeformat`分析器是检查`time.Format`的调用格式是否符合正确的语法。在默认情况下以上所有的分析器都会启用，单独启用可用使用如下的格式

```sh
$ go vet -timeformat main.go
```

单独禁用

```sh
$ go vet -timeformat=false main.go
```

这些分析器的源代码位于`cmd/vendor/golang.org/x/tools/go/analysis/passes`，每一个分析器都是 go 语言容易犯的一个坑，所以十分建议使用`vet`命令来检查你的代码。除此这些之外，它还支持一些其它的标志参数

- `-V`，仅打印版本然后退出
- `-json`，以 json 形式输出
- `-c=n`，显示上下文中指定数目的冲突行（似乎并没有任何作用）

还有一些外置的分析器，比如`shadows`，它负责检测短变量命名的变量隐藏问题，由于是外置的所以需要用`go install`来进行下载

```sh
$ go install golang.org/x/tools/go/analysis/passes/shadow/cmd/shadow@latest
```

使用格式如下

```sh
$ go vet -vettool=$(which shadow)
```

### test

```sh
$ go test -h
usage: go test [build/test flags] [packages] [build/test flags & test binary flags]
Run 'go help test' and 'go help testflag' for details.
```

`test`命令是 go 语言工具链中提供测试功能的命令，这个功能相当的重要，对于一个软件而言，完善的测试的是必不可少的。这里只是简单的介绍下如何使用`test`命令，如果要了解更多测试相关，前往：[测试](/essential/senior/120.test.md)

它除了支持`build`命令的编译参数之外，`test`还支持下面几个参数

- `-args`，程序的入口参数
- `-c`，编译当前包的测试二进制文件到当前目录但并不执行，以`pkg.test`方式命名
- `-exec`，在测试开始之前执行一些其它的命令
- `-json`，测试的输出风格变为 json
- `-o`，指定测试二进制文件的路径名

它还支持许多`testflag `，使用`help`命令查看所有`testflag`

```sh
$ go help testflag
The 'go test' command takes both flags that apply to 'go test' itself
and flags that apply to the resulting test binary.

The following flags are recognized by the 'go test' command and
control the execution of any test:
        -bench regexp
        -benchtime t
        -count n
    ......
```

介绍几个常用的

- `-v`，输出每一个用例的测试结果。
- `-timeout duration`，测试执行超时时间
- `-skip regexp`，跳过指定的测试用例
- `-short`，让哪些运行时间很长的测试用例缩短运行时间
- `-shuffle`，打乱所有测试用例的执行顺序
- `-run regexp`，运行指定的测试用例
- `-list regexp`，列出每一个测试用例
- `-cpu 1,2,4`，指定 cpu 数量
- `-count n`，指定每个测试用例执行多少次

最简单的用法就是，不带任何参数，它会执行当前所在包下的所有测试用例，并输出结果。

```sh
$ ls *_test.go
hello_test.go

$ go test
PASS
ok      golearn 0.522s
```

指定某一个测试文件

```sh
$ go test hello_test.go
ok      command-line-arguments  0.041s
```

加上`-v`参数可以查看更详细的输出，它相当常用。

```sh
$ go test -v hello_test.go
=== RUN   TestHello
    hello_test.go:6: hello world!
--- PASS: TestHello (0.00s)
PASS
ok      command-line-arguments  0.041s
```

指定某一个测试用例

```sh
$ go test -v -run TestHello
=== RUN   TestHello
    hello_test.go:6: hello world!
--- PASS: TestHello (0.00s)
PASS
ok      golearn 0.028s
```

在测试时，`test`命令分两种模式，先来讲第一种文件夹模式，当不带`package`参数执行`test`命令时，它就会以文件夹模式执行测试，比如下面几个命令

```sh
$ go test
$ go test -v
```

在这种模式下，禁用测试缓存。另一种模式是列表模式，当`package`参数不为空时，就会以列表模式进行测试，它与前者的区别就是是否开启测试缓存。比如下面几个

```sh
$ go test -v .
$ go test -v ./...
$ go test .
$ go test -v net/http
```

在列表模式下，go 会将指定包下的每一个包的测试文件编译成二进制文件并执行，为了避免重复运行测试，go 默认会将结果缓存，二次运行时不会重新编译。使用下列参数时将会默认开启缓存

- `-benchtime`
- `-cpu`
- `-list`
- `-parallel`
- `-run`
- `short`
- `-timeout`
- `-failfast`
- `-v`

使用除了这些参数之外的其它参数就可以关闭缓存，官方提倡的方法是使用`-count=1`的方式来禁用缓存。比如

```sh
$ go test -v -count=1 ./...
```

## 指令

与命令不同，go 的指令是以硬编码的形式存在于源文件中的，它们有另一个比较术语化的名字：编译指示（progma directives）。

编译器和链接器会因为它们改变自身的行为从而达到控制编译的效果，就有点类似于 c 语言中的宏，当然并非所有指令都是用来影响编译的，部分用于其它功能性行为，比如`generate`指令通常用于代码生成的功能。这些指令通常以注释的形式存在，并且以`//go:`作为前缀，中间不能包含任何的空格，比如`//go:generate`指令。所有指令类型总共分为两种

- 功能性指令，这类是 go 提供的功能性指令可以随意使用，比如`generate`，`embed`，`build`。
- 编译器指令，这类指令需要谨慎使用，胡乱使用可能导致无法预测的结果。

除了功能性指令外，大多数指令都只能作用于函数签名上。对于编译器指令可以执行命令`go doc compile`查看其指令。对于全部指令，可以在`cmd/compile/internal/ir/node.go: 440`找到有关它们的信息。

### generate

```sh
$ go help generate
usage: go generate [-run regexp] [-n] [-v] [-x] [build flags] [file.go... | packages]
```

`generate`指令顾名思义就是跟生成有关的，通常它的作用是用于执行那些会生成代码以及更新源代码的命令，不过实际上它可以执行任何命令。并且，`generate`指令与其它指令不同，它有一个专门的命令可以用于执行所有位于源文件中的 generate 指令。它可以以文件名或者包名来作为输入参数来表示执行哪些文件的`generate`指令，下面是它的其它参数。

- `-run=regex` ，运行指定的 generate 指令
- `-skip=regex`，跳过指定的 generate 指令
- `-n`，打印将要执行的命令
- `-x`，打印过程中执行的命令
- `-v`，输出处理的文件

除此之外，在`generate`指令中执行的命令还支持以下几个内置参数

- `$GOARCH`，cpu 架构
- `$GOOS`，操作系统
- `$GOFILE`，文件名
- `$GOLINE`，行号
- `$GOPACKAGE`，包名
- `$GOROOT`，go root
- `$DOLLAR`，美元符号
- `$PATH`，path 环境变量

看个例子，什么代码都没有只有一行注释

```go
package main

//go:generate echo "hello world!"
```

执行命令

```
$ go generate .
hello world!
```

这个例子是执行 go 命令

```go
package main

//go:generate go version
```

执行命令

```sh
$ go generate .
go version go1.21.3 windows/amd64
```

`generate`指令可以用于执行任何命令，比如 swagger 生成 API 文档，或者 Wire 生成 IOC 代码。不过这个指令不适合执行特别复杂的命令，它适合执行简短的命令，如果有复杂的需求可以使用脚本或者 makefile 来代替。

### embed

`embed`指令是 1.16 新增的，它的作用是将可以将静态文件一同打包进二进制文件中，比如 HTML 模板之类的。它的格式如下

```go
//go:embed pattern
```

`pattern`可以是 glob 表达式，也可以是文件夹或者某一个具体文件。看一个例子

```go
package main

import "embed"

//go:embed *
var static embed.FS
```

`embed`指令要求必须位于一个类型为`embed.Fs`的全局变量上方，注意必须是全局变量，并且使用它必须导入`embed`包，在这个例子中，`*`代表了会将当前文件夹下的所有文件都打包进二进制文件中，不过它不会允许`.`开头的文件夹存在。

下面这个例子展示了从嵌入的文件中读取内容

```go
package main

import (
  "embed"
  "fmt"
)

//go:embed *.txt
var static embed.FS

func main() {
  bytes, err := static.ReadFile("hello.txt")
  if err != nil {
    panic(err)
  }
  fmt.Println(string(bytes))
}
```

它只有三个方法，使用起来跟平常文件系统没什么区别，并且由于它实现了`io/Fs`接口，所以也可以作为`Fs`对象来进行传递。

```go
func (f FS) Open(name string) (fs.File, error)
func (f FS) ReadFile(name string) ([]byte, error)
func (f FS) ReadDir(name string) ([]fs.DirEntry, error)
```

下面这个例子展示了通过`embed`指令嵌入 html 文件，并通过 http 服务访问。

```go
package main

import (
  "embed"
  "net/http"
)

//go:embed index.html
var htmlFs embed.FS

func main() {
  http.Handle("/", http.FileServer(http.FS(htmlFs)))
  http.ListenAndServe(":8080", http.DefaultServeMux)
}
```

访问结果如下

```sh
$ curl -s -GET 127.0.0.1:8080
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hello world!</title>
</head>
<body>
<H1>Hello World!</H1>
<script>
    alert("hello world!");
</script>
</body>
</html>
```

`embed`指令还支持全局变量的类型可以为`[]byte`，比如下面这个例子

```go
package main

import (
  _ "embed"
  "net/http"
)

//go:embed index.html
var rawdata []byte

func main() {
  http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
    writer.Write(rawdata)
  })
  http.ListenAndServe(":8080", http.DefaultServeMux)
}
```

它实现的效果跟上一个例子是差不多的。

```sh
$ curl -s -GET 127.0.0.1:8080
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hello world!</title>
</head>
<body>
<H1>Hello World!</H1>
<script>
    alert("hello world!");
</script>
</body>
</html>
```

### build

在[build-编译控制](#编译控制)部分，讲到了用`// +build`指令来控制编译行为。而`//go:build`指令是在 1.17 新出的，意在取代先前的指令，不过现在都 1.21 也还没有取代，估计以后会以共存的方式存在，关于这个新指令，官方文档也有介绍：[build constraints](https://pkg.go.dev/cmd/go#hdr-Build_constraints)。它的功能与前者没什么区别，但是语法更加严格，支持布尔表达式，看一个例子

```go
//go:build (linux && 386) || (darwin && !cgo)

package pkg_name
```

这种方式可读性要比原来那种高得多。

### line

`line`指令会影响其下一行的行号，列号，已经文件名，它的作用仅限于此，大部分时候可能会用来调试错误之类的。比如在发生错误时，会改变编译器输出的信息。

```go
package main

var a undefinedType

func main() {

}
```

正常情况下，编译器会输出

```
.\main.go:3:7: undefined: undefinedType
```

但如果使用了`line`指令，就不一样了

```go
package main

//line abc.go:10:100
var a undefinedType

func main() {

}
```

那么它的输出就是

```
abc.go:10:106: undefined: undefinedType
```

并且因为历史遗留原因，`line`指令也是唯一一个用法跟其它指令不同的指令。它的格式是

```go
//line filename:line:column
```

可以看到它并不需要`go:`作为前缀。

### linkname

这个指令的操作可以用于链接其它包的函数或者全局变量，即便它是私有类型，这种操作经常在标准库尤其是`runtime`中出现，有一些函数没有函数体就是通过这种方式来实现的，另一部分空函数体的函数则是由汇编实现。来看下它的用法，使用格式如下

```go
//go:linkname 链接类型名称 被链接的类型
```

并且在使用之前，比如导入`unsafe`包。看一个简单的链接标准库中的私有类型的例子

```go
import (
  "fmt"
  "unsafe"
)

//go:linkname memhash runtime.memhash
func memhash(p unsafe.Pointer, h, s uintptr) uintptr

func MemHash(data []byte) uint64 {
  ptr := unsafe.Pointer(unsafe.SliceData(data))
  return uint64(memhash(ptr, 0, uintptr(len(data))))
}

func main() {
  fmt.Println(MemHash([]byte("hello")))
}
```

输出

```
15395306441938000233
```

它将`runtime.memhash`这个私有函数与我们自己声明的函数链接到了一起，这个函数没有函数体只有一个签名，只起到一个载体的作用。`memhash`的作用是给定一个指针，哈希种子，和内存偏移量，根据内存来计算哈希值。这个链接过程在编译期完成，

如果不是标准库的，那么情况就有些不一样了，比如在`example`包下有一个`test`函数，在链接之前首先要匿名导入这个包。

```go
package example

// 一个私有类型，外界无法访问。
func test() string {
  return "a"
}
```

```go
package main

import (
  "fmt"
  _ "golearn/example"
  _ "unsafe"
)

//go:linkname test golearn/example.test
func test() string

func main() {
  fmt.Println(test())
}
```

输出

```
a
```

可以看到已经链接成功了，这种方法可以绕过 go 的模块系统为所欲为，不过不建议大规模使用，除非你知道你自己干什么。

### noinline

`noinline`指令表示一个函数禁止内联优化，即便它非常简单。看一个简单的例子

```go
package main

func val() string {
  return "val"
}

func main() {
  var c = val()
  _ = c
}
```

`val`是一个非常简单的函数，它的作用是返回一个字符串字面量，由于它太过简单且结果总是可以预测，那么在编译时它会被编译器优化成如下形式

```go
package main

func main() {
  var c = "val"
  _ = c
}
```

来看看它汇编的样子，可以看到并没有发现`val`函数的调用。

```
TEXT    main.val(SB), NOSPLIT|NOFRAME|ABIInternal, $0-0
FUNCDATA        $0, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
FUNCDATA        $1, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
LEAQ    go:string."val"(SB), AX
MOVL    $3, BX

FUNCDATA        $0, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
RET
```

接下来加上`noinline`指令

```go
package main

//go:noinline
func val() string {
  return "val"
}

func main() {
  var c = val()
  _ = c
}
```

再来看看其汇编形式

```
CMPQ    SP, 16(R14)
PCDATA  $0, $-2
JLS     17
PCDATA  $0, $-1
PUSHQ   BP
MOVQ    SP, BP
FUNCDATA        $0, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
FUNCDATA        $1, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
PCDATA  $1, $0
CALL    main.val(SB)
POPQ    BP
RET
```

这次可以非常明显的看到了`main.val`这个调用，而这也正是`noinline`指令发挥的功能，阻止编译器优化时的函数内联。

### nospilit

`nospilit`指令的作用是跳过栈溢出检测。由于 go 的并发调度模型是抢占式调度，假设一个函数会运行非常底层的代码，其它协程在调用此函数时不适合被抢占，就可以使用该指令来表示。

```go
//go:nosplit
func nospilitFn()
```

使用该指令后，也就不会再进行栈增长。

### noescape

`noescape`，通过它的名字可以很容易猜到是跟逃逸有关的，它的作用是表示当前函数不会发生内存逃逸行为，执行完后所有资源都被回收，并且这个函数必须只有签名没有函数体，在这种情况下一般函数的实现是由汇编实现的。

比如之前用到的`memhash`就会用到这个指令

```go
//go:noescape
//go:linkname memhash runtime.memhash
func memhash(p unsafe.Pointer, h, s uintptr) uintptr
```

这样一来，编译器不会对其进行逃逸分析，前提是你得保证它不会发生逃逸，如果发生了，那就不知道会有什么后果了。

### uintptrescapes

`uintptrescapes`指令表示该函数中`uinptr`类型的参数被转换为了指针值并且逃逸到了堆上，且必须保持其存活。这个指令一般用于一些低级的系统调用，大部分情况下不需要去了解它。

```go
//go:uintptrescapes
func nospilit(ptr uintptr) uintptr
```

在以前应该还有一个`notinheaps`指令用于表示一个类型不允许分配内存到堆上，不知道在哪个版本被删掉了。

### norace

`norace`指令表示一个函数的内存访问不再需要竞态分析，通常是在运行低层次代码不适合进行竞态分析时使用。

```go
//go:norace
func low_level_code(ptr uintptr) uintptr
```

::: tip

还有部分指令限制了只能由`runtime`包使用，外部是无法使用的， 它们会涉及到更深的东西，想要了解可以在[Runtime-only compiler directives](https://github.com/golang/go/blob/master/src/runtime/HACKING.md#runtime-only-compiler-directives)中看到有关它们的介绍。

:::
