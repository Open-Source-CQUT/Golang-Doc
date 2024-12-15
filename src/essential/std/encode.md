---
date: 2022-09-05
---

# encode

在当前互联网时代中，最常用的独立于语言的数据格式有`xml`， `Yaml`，`json`，`protobuf`，Go 同样的也支持这些数据格式的相关的操作，以下为对比表格。

|     名称     |   XML    |   YAML   |   JSON   | Protocol Buffers |
| :----------: | :------: | :------: | :------: | :--------------: |
| **数据结构** |   复杂   |  较简单  |   简单   |      较复杂      |
| **保存方式** |   文本   |   文本   |   文本   |      二进制      |
| **保存大小** |    大    |    中    |    中    |        小        |
| **解析效率** |    慢    |    中    |    中    |        快        |
| **语言支持** |  非常多  |    多    |   很多   |       较多       |
| **开发难度** |   繁琐   |  较简单  |   简单   |       简单       |
| **学习成本** |    低    |    低    |    低    |        低        |
| **适用范围** | 数据交换 | 配置文件 | 数据交换 |     数据交换     |

::: tip

在 go 中，如果想要对结构体进行序列化与反序列化，字段必须是对外暴露的，即首字母大写。

:::

另外，TOML 也逐渐开始流行，语法上像是`.ini`的改进，感兴趣可以前往[TOML：Tom 的（语义）明显、（配置）最小化的语言](https://toml.io/cn/)了解一下。

### XML

`xml`又名 e**X**tensible **M**arkup **L**anguage，是用于存储数据的一种格式，起源于 20 世纪 60 年代，是以上几种数据格式中最为古老的一种。它的用途十分广泛，可用于网络传输，数据交换，配置文件，数据存储等等。但随着时代的更替，逐渐正在被新的标记语言替代。

首先定义结构体

```go
type Person struct {
   UserId   string `xml:"id"`
   Username string `xml:"name"`
   Age      int    `xml:"age"`
   Address  string `xml:"address"`
}
```

```go
func Marshal(v any) ([]byte, error) //xml序列化

func MarshalIndent(v any, prefix, indent string) ([]byte, error) //格式化

func Unmarshal(data []byte, v any) error //反序列化
```

#### 序列化

```go
func main() {
   person := Person{
      UserId:   "120",
      Username: "jack",
      Age:      18,
      Address:  "usa",
   }

   bytes, err := xml.MarshalIndent(person, "", "\t")
   if err != nil {
      fmt.Println(err)
      return
   }
   fmt.Println(string(bytes))
}
```

输出

```xml
<Person>
        <id>120</id>
        <name>jack</name>
        <age>18</age>
        <address>usa</address>
</Person>
```

#### 反序列化

```go
func main() {
   var person = Person{
      UserId:   "",
      Username: "",
      Age:      0,
      Address:  "",
   }

   xmlStr := "<Person>                      \n        <id>120</id>          \n        <name>jack</name>     \n        <age>18</age>         \n        <address>usa</address>\n</Person>  "

   err := xml.Unmarshal([]byte(xmlStr), &person)
   if err != nil {
      fmt.Println(err)
      return
   }
}
```

输出

```go
{UserId:120 Username:jack Age:18 Address:usa}
```

不过传统的 xml 解析方式经常需要新建结构体，这会十分的繁琐，现在解析的都是简单的 xml 结构，倘若使用复杂的结构，就会让人十分头疼。所以我们大多数会用一个第三方开源库`etree`来解析 xml，感兴趣的可以自行了解：[Go 比较好用的解析 xml 文件的插件 etree - 掘金 (juejin.cn)](https://juejin.cn/post/6844903983614525453)。

### YML

YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种配置文件，YML 也在许多项目里以配置文件的形式存在，它的内容结构更加简洁，一目了然。go 官方并没有提供对于 YML 的支持，我们需要使用第三方包。

```powershell
go get github.com/go-yaml/yaml
```

**主要方法**

```go
func Marshal(in interface{}) (out []byte, err error) //序列化

func Unmarshal(in []byte, out interface{}) (err error) //反序列化
```

先准备结构体

```go
type Config struct {
   Database string `yaml:"database"`
   Url      string `yaml:"url"`
   Port     int    `yaml:"port"`
   Username string `yaml:"username"`
   Password string `yaml:"password"`
}
```

配置文件

```yaml
database: mysql
url: 127.0.0.1
port: 3306
username: root
password: 123456
```

#### 序列化

```go
func main() {
   config := Config{
      Database: "oracle",
      Url:      "localhost",
      Port:     3326,
      Username: "root",
      Password: "123456",
   }

   out, err := yaml.Marshal(config)
   if err != nil {
      fmt.Println(err)
      return
   }
   fmt.Println(string(out))
}
```

输出

```yaml
database: oracle
url: localhost
port: 3326
username: root
password: "123456"
```

不过由于`yml`本身有着严格的缩进语法，所以也不存在什么序列化格式化的问题了。

#### 反序列化

```go
func main() {
   bytes, err := os.ReadFile("./src/config.yml")
   if err != nil {
      fmt.Println(err)
      return
   }
   var config Config
   err = yaml.Unmarshal(bytes, &config)
   if err != nil {
      fmt.Println(err)
      return
   }

   fmt.Println(config)
}
```

输出

```
{mysql 127.0.0.1 3306 root 123456}
```

### JSON

`json`在`Restful`风格的接口通信中经常会用到，其相较于`xml`更轻便的大小，低廉的学习成本使其在`web`领域称为了主流的数据交换格式。

在 go 中，`encoding/json`包下提供对应的函数来进行 json 的序列化与反序列化，主要使用的有如下函数。

```go
func Marshal(v any) ([]byte, error) //将go对象序列化为json字符串

func Unmarshal(data []byte, v any) error //将json字符串反序列化为go对象
```

首先定义结构体

```go
type Person struct {
   UserId   string
   Username string
   Age      int
   Address  string
}
```

#### 序列化

```go
func main() {
  person := Person{
    UserId:   "120",
    Username: "jack",
    Age:      18,
    Address:  "usa",
  }

  bytes, err := json.Marshal(person)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(bytes))
}
```

结果

```json
{ "UserId": "120", "Username": "jack", "Age": 18, "Address": "usa" }
```

#### 字段重命名

我们可以通过结构体标签来达到重命名的效果。

```go
type Person struct {
   UserId   string `json:"id"`
   Username string `json:"name"`
   Age      int    `json:"age"`
   Address  string `json:"address"`
}
```

此时输出

```json
{ "id": "1202", "name": "jack", "age": 19, "address": "USA" }
```

#### 缩进

序列化时默认是没有任何缩进的，这是为了减少传输过程的空间损耗，但是这并不利于人为观察，在一些情况下我们需要将其序列化成人类能够观察的形式。为此，只需要换一个函数。

```go
func MarshalIndent(v any, prefix, indent string) ([]byte, error)
```

```go
func main() {
   person := Person{
      UserId:   "1202",
      Username: "jack",
      Age:      19,
      Address:  "USA",
   }
   bytes, err := json.MarshalIndent(person, "", "\t")
   if err != nil {
      fmt.Println(err)
      return
   }
   fmt.Println(string(bytes))
}
```

输出如下

```json
{
  "id": "1202",
  "name": "jack",
  "age": 19,
  "address": "USA"
}
```

#### 反序列化

在反序列化时需要注意，如果结构体有 json 标签的话，则字段名优先以 json 标签为准，否则以结构体属性名为准。

```go
func main() {
  person := Person{}

  jsonStr := "{\"id\":\"120\",\"name\":\"jack\",\"age\":18,\"address\":\"usa\"}\n"

  err := json.Unmarshal([]byte(jsonStr), &person)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Printf("%+v", person)
}
```

输出

```go
{UserId:120 Username:jack Age:18 Address:usa}
```

### Protocol Buffers

protocol 是谷歌 2008 开源的语言中立，协议中立，可扩展的结构化数据序列化机制。相比于以上三种更加的轻便，而且在解包封包的时候更加的快速，多用于 RPC 领域通信相关，有关`Protobuf`的讲解可以前往[Protobuf](/community/mirco/protoc.md)。

安装依赖

```
go get github.com/golang/protobuf/proto
```

`person.proto`文件

```protobuf
syntax = "proto3";

option go_package = "./;person";

package proto;

enum Gender{
  MAIL = 0;
  FE_MAIL = 1;
}

message person {
  string name = 1;
  int32 age = 2;
  Gender gender = 3;
}
```

生成文件后

```go
package main

import (
   p "GoProject/src/proto"
   "fmt"
   "github.com/golang/protobuf/proto"
)

func main() {
  person := p.Person{
    Name:   "wyh",
    Age:    12,
    Gender: p.Gender_FE_MAIL,
  }

  data, err := proto.Marshal(&person)//序列化
  if err != nil {
    fmt.Println(err)
    return
  }
  temp := &p.Person{}
  fmt.Println("proto buffer len: ", len(data), "bytes:", data)
  err = proto.Unmarshal(data, temp)//反序列化
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(temp)
}
```

输出

```
proto buffer len:  9 bytes: [10 3 119 121 104 16 12 24 1]
name:"wyh"  age:12  gender:FE_MAIL
```

不过通常我们不会去手动序列化，`protoc`编译器可以根据我们定义好的`proto`文件生成对应语言的源代码。
