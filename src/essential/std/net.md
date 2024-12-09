# net

Go语言的`net`标准库是一个非常强大的库，它提供了处理网络通信、IP地址、DNS解析、TCP/UDP协议、HTTP协议等常见任务的功能。由于Go语言本身的并发特性，得益于此，Go在处理网络IO的时候非常的简洁高效。



## 地址解析

Go提供了四个函数来解析网络地址，下面逐一讲解。



### MAC地址

签名

```go
func ParseMAC(s string) (hw HardwareAddr, err error)
```

示例

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	hw, err := net.ParseMAC("00:1A:2B:3C:4D:5E")
	if err != nil {
		panic(err)
	}
	fmt.Println(hw)
}
```



### CIDR

签名

```go
func ParseCIDR(s string) (IP, *IPNet, error)
```

示例

```go
package main

import (
    "fmt"
    "log"
    "net"
)

func main() {
    ipv4Addr, ipv4Net, err := net.ParseCIDR("192.0.2.1/24")
    if err != nil {
       log.Fatal(err)
    }
    fmt.Println(ipv4Addr)
    fmt.Println(ipv4Net)
}
```



### IP地址

IP地址支持解析ipv4，ipv6，函数签名如下

```go
func ResolveIPAddr(network, address string) (*IPAddr, error) 
```

使用示例如下

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	ipv4Addr, err := net.ResolveIPAddr("ip4", "192.168.2.1")
	if err != nil {
		panic(err)
	}
	fmt.Println(ipv4Addr)

	ipv6Addr, err := net.ResolveIPAddr("ip6", "2001:0db8:85a3:0000:0000:8a2e:0370:7334")
	if err != nil {
		panic(err)
	}
	fmt.Println(ipv6Addr)
}

```



### TCP地址

TCP地址支持tcp4，tcp6，签名如下

```go
func ResolveTCPAddr(network, address string) (*TCPAddr, error)
```

使用示例如下

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	tcp4Addr, err := net.ResolveTCPAddr("tcp4", "0.0.0.0:2020")
	if err != nil {
		panic(err)
	}
	fmt.Println(tcp4Addr)
	tcp6Addr, err := net.ResolveTCPAddr("tcp6", "[::1]:8080")
	if err != nil {
		panic(err)
	}
	fmt.Println(tcp6Addr)
}
```



### UDP地址

UDP地址支持udp4，udp6，签名如下

```go
func ResolveUDPAddr(network, address string) (*UDPAddr, error)
```

使用示例如下

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	udp4Addr, err := net.ResolveUDPAddr("udp4", "0.0.0.0:2020")
	if err != nil {
		panic(err)
	}
	fmt.Println(udp4Addr)
	udp6Addr, err := net.ResolveUDPAddr("udp6", "[::1]:8080")
	if err != nil {
		panic(err)
	}
	fmt.Println(udp6Addr)
}

```



### Unix地址

Unix地址支持unix，unixgram，unixpacket，签名如下

```go
func ResolveUnixAddr(network, address string) (*UnixAddr, error)
```

使用示例如下

```go
package main

import (
    "fmt"
    "net"
)

func main() {
    unixAddr, err := net.ResolveUnixAddr("unix", "/tmp/mysocket")
    if err != nil {
       panic(err)
    }
    fmt.Println(unixAddr)
}
```



## DNS

Go还提供了很多函数用于DNS查询，下面一个例子是解析域名的IP地址

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	addrs, err := net.LookupHost("github.com")
	if err != nil {
		panic(err)
	}
	fmt.Println(addrs)
}
```

查询记录值

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	mxs, err := net.LookupMX("github.com")
	if err != nil {
		panic(err)
	}
	fmt.Println(mxs)
}
```



## 网络编程

tcp编程的逻辑十分简单，对于客户端而言就是

1. 建立连接
2. 发送数据或读取数据
3. 退出

对于服务端而言就是

1. 监听地址
2. 获取连接
3. 新建一个协程去处理该连接

下面是一个简单的例子，客户端代码

```go
package main

import (
	"net"
)

func main() {
	// 建立连接
	conn, err := net.Dial("tcp", "0.0.0.0:1234")
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	// 发送数据
	for i := range 10 {
		_, err := conn.Write([]byte{'a' + byte(i)})
		if err != nil {
			panic(err)
		}
	}
}
```



服务端代码

```go
package main

import (
	"errors"
	"fmt"
	"io"
	"net"
	"sync"
)

func main() {
	// 监听地址
	listener, err := net.Listen("tcp", "0.0.0.0:1234")
	if err != nil {
		panic(err)
	}
	defer listener.Close()

	var wg sync.WaitGroup

	for {
		// 阻塞等待下一个连接建立
		conn, err := listener.Accept()
		if err != nil {
			panic(err)
		}

		// 开启一个新的协程去异步处理该连接
		wg.Add(1)
		go func() {
			defer wg.Done()
			buf := make([]byte, 4096)
			for {
				// 从连接中读取数据
				n, err := conn.Read(buf)
				if errors.Is(err, io.EOF) {
					break
				} else if err != nil {
					panic(err)
				}

				data := string(buf[:n])
				fmt.Println(data)
			}
		}()
	}

	wg.Wait()
}

```

客户端发送数据，服务端接收数据，这个例子非常的简单，服务端建立新连接时，只需开启一个新的协程就可以去处理，不需要阻塞，UDP大体上的写法也都是类似的。