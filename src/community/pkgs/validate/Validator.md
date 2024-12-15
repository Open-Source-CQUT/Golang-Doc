# Validator

官方地址：[go-playground/validator: :100:Go Struct and Field validation, including Cross Field, Cross Struct, Map, Slice and Array diving (github.com)](https://github.com/go-playground/validator)

文档地址：[validator/README.md at master · go-playground/validator (github.com)](https://github.com/go-playground/validator/blob/master/README.md)

官方示例：[validator/\_examples at master · go-playground/validator (github.com)](https://github.com/go-playground/validator/tree/master/_examples)

基准测试：[go-playground/validator: :100:Go Struct and Field validation, including Cross Field, Cross Struct, Map, Slice and Array diving (github.com)](https://github.com/go-playground/validator#benchmarks)

## 介绍

`go-playground/validator`实现了一款基于结构体标签的值验证器，它有着以下独一无二的特性：

- 可使用验证标签和自定义验证器来进行跨字段和跨结构体验证

- 切片，数组，map，或者任何多维域都可以被验证

- 可以深入验证 map 的 key 和 value

- 在验证之前，通过其基本类型来确定如何进行处理

- 可以处理自定义字段类型

- 支持别名标签，它将允许多个验证映射到单个标签上，以便更容易的定义对于结构体的验证

- 可以提取自定义的字段名，例如可以在验证时提取 JSON 名称以便在错误信息中显示

- 自定义多语言错误信息

- `gin`框架的标准默认验证组件

## 安装

```powershell
go get github.com/go-playground/validator/v10
```

## 导入

```go
import "github.com/go-playground/validator/v10"
```

## 标签

验证器有着非常多的基础验证标签，所有标签对应的验证函数都可以在`baked_in.go`文件中找到，验证器的结构体 Tag 是`valiadte`，

例如

```go
type User {
  age int `validate:"gte=18"` //表示大于等于18岁
}
```

也可以通过`setTagName`方法来修改默认 Tag 。

### 字段

| Tag             | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `eqcsfield`     | 在一个单独的结构中，验证当前字段的值是否等于由 param 的值指定的字段    |
| `eqfield`       | 验证当前字段的值是否等于参数值指定的字段                               |
| `fieldcontains` | 验证当前字段的值是否包含由参数值指定的字段                             |
| `fieldexcludes` | 验证当前字段的值是否不包含由参数值指定的字段                           |
| `gtcsfield`     | 在一个单独的结构中，验证当前字段的值是否大于由参数的值指定的字段       |
| `gtecsfield`    | 在一个单独的结构中，验证当前字段的值是否大于或等于由参数的值指定的字段 |
| `gtefield`      | 验证当前字段的值是否大于或等于由参数值指定的字段                       |
| `gtfield`       | 验证当前字段的值是否大于由参数值指定的字段                             |
| `ltcsfield`     | 在一个单独的结构中，验证当前字段的值是否小于由参数的值指定的字段       |
| `ltecsfield`    | 在一个单独的结构中，验证当前字段的值是否小于等于由参数的值指定的字段   |
| `ltefield`      | 验证当前字段的值是否小于或等于由参数值指定的字段                       |
| `ltfield`       | 验证当前字段的值是否小于由参数值指定的字段                             |
| `necsfield`     | 验证当前字段的值不等于由参数的值指定的单独结构中的字段                 |
| `nefield`       | 验证当前字段的值是否不等于参数值指定的字段                             |

### 网络

| Tag                | Description                                    |
| ------------------ | ---------------------------------------------- |
| `cidr`             | 无类域间路由 CIDR                              |
| `cidrv4`           | 无类域间路由 CIDRv4                            |
| `cidrv6`           | 无类域间路由 CIDRv6                            |
| `datauri`          | 数据统一资源定位符                             |
| `fqdn`             | 完全限定域名(FQDN)                             |
| `hostname`         | 主机名 RFC 952                                 |
| `hostname_port`    | 通常用于套接字地址的字段验证`<dns>:<port>`组合 |
| `hostname_rfc1123` | 主机名 RFC 952                                 |
| `ip`               | 因特网协议地址 IP                              |
| `ip4_addr`         | 因特网协议地址 IPv4                            |
| `ip6_addr`         | 因特网协议地址 IPv6                            |
| `ip_addr`          | 因特网协议地址 IP                              |
| `ipv4`             | 因特网协议地址 IPv4                            |
| `ipv6`             | 因特网协议地址 IPv6                            |
| `mac`              | 媒体存取控制位址，也称局域网地址               |
| `tcp4_addr`        | 传输控制协议地址 TCP4                          |
| `tcp6_addr`        | 传输控制协议地址 TCPv6                         |
| `tcp_addr`         | 传输控制协议地址 TCP                           |
| `udp4_addr`        | 用户数据报协议地址 UDPv4                       |
| `udp6_addr`        | 用户数据报协议地址 UDPv6                       |
| `udp_addr`         | 用户数据报协议地址 UDP                         |
| `unix_addr`        | Unix 域套接字端点地址                          |
| `uri`              | 统一资源标识符                                 |
| `url`              | 统一资源定位符                                 |
| `url_encoded`      | 统一资源标识符编码                             |
| `urn_rfc2141`      | RFC 2141 统一资源名                            |

### 字符串

| Tag               | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `alpha`           | 验证当前字段的值是否是有效的字母                               |
| `alphanum`        | 验证当前字段的值是否是有效的字母数字                           |
| `alphanumunicode` | 验证当前字段的值是否是有效的字母数字 unicode 值                |
| `alphaunicode`    | 验证当前字段的值是否是有效的字母 unicode 值                    |
| `ascii`           | 验证字段的值是否为有效的 ASCII 字符                            |
| `boolean`         | 验证当前字段的值是否为有效的布尔值或是否可以安全地转换为布尔值 |
| `contains`        | 验证字段的值是否包含参数中指定的文本                           |
| `containsany`     | 验证字段的值是否包含参数中指定的任何字符                       |
| `containsrune`    | 验证字段的值是否包含参数中指定的符文                           |
| `endsnotwith`     | 验证字段的值不以参数中指定的文本结束                           |
| `endswith`        | 验证字段的值以参数中指定的文本结束                             |
| `excludes`        | 验证字段的值不包含参数中指定的文本                             |
| `excludesall`     | 验证字段的值不包含参数中指定的任何字符                         |
| `excludesrune`    | 验证字段的值不包含参数中指定的字符                             |
| `lowercase`       | 验证当前字段的值是否为小写字符串                               |
| `multibyte`       | 验证字段的值是否具有多字节字符                                 |
| `number`          | 验证当前字段的值是否为有效数字                                 |
| `numeric`         | 验证当前字段的值是否是有效的数值                               |
| `printascii`      | 验证字段的值是否是有效的可打印 ASCII 字符                      |
| `startsnotwith`   | 验证字段的值不是以参数中指定的文本开始                         |
| `startswith`      | 验证字段的值是否以参数中指定的文本开始                         |
| `uppercase`       | 验证当前字段的值是否为大写字符串                               |

### 格式化

| Tag                             | Description                                                       |
| ------------------------------- | ----------------------------------------------------------------- |
| `base64`                        | Base64 字符串                                                     |
| `base64url`                     | Base64URL 字符串                                                  |
| `bic`                           | 验证当前字段的值是否为 ISO 9362 中定义的有效的 BIC 码(SWIFT 代码) |
| `bcp47_language_tag`            | 验证当前字段的值是否为 BCP47 规范的语言标签                       |
| `btc_addr`                      | 验证字段的值是否为有效的 BTC 地址                                 |
| `btc_addr_bech32`               | 验证字段的值是否为有效的 bech32 BTC 地址                          |
| `credit_card`                   | 验证当前字段的值是否是有效的信用卡号                              |
| `datetime`                      | 验证当前字段的值是否是有效的时间日期字符串                        |
| `e164`                          | 验证当前字段的值是否为有效的 e.164 格式的电话号码                 |
| `email`                         | 验证当前字段的值是否是有效的电子邮件地址                          |
| `eth_addr`                      | 验证字段的值是否为有效的以太坊地址                                |
| `hexadecimal`                   | 验证当前字段的值是否为有效的十六进制                              |
| `hexcolor`                      | 验证当前字段的值是否是有效的十六进制颜色                          |
| `hsl`                           | 验证当前字段的值是否是有效的 HSL 颜色                             |
| `hsla`                          | 验证当前字段的值是否是有效的 HSLA 颜色                            |
| `html`                          | 验证当前字段的值是否是有效的 HTML                                 |
| `html_encoded`                  | 验证当前字段的值是否是有效的 HTML 编码                            |
| `isbn`                          | 验证字段的值是否为有效的 v10 或 v13 ISBN（国际标准书号）          |
| `isbn10`                        | 验证字段的值是否为有效的 v10 ISBN（国际标准书号）                 |
| `isbn13`                        | 验证字段的值是否为有效的 v13 ISBN（国际标准书号）                 |
| `iso3166_1_alpha2`              | 验证当前字段的值是否为有效的 iso3166-1 alpha-2 国家代码           |
| `iso3166_1_alpha3`              | 验证当前字段的值是否为有效的 iso3166-1 alpha-3 国家代码           |
| `iso3166_1_alpha_numeric`       | 验证当前字段的值是否为有效的 iso3166-1 字母数字国家代码           |
| `iso3166_2`                     | 验证当前字段的值是否为有效的国家地区代码 (ISO 3166-2)             |
| `iso4217`                       | 验证当前字段的值是否为有效的货币代码 (ISO 4217)                   |
| `json`                          | 验证当前字段的值是否为有效的 json 字符串                          |
| `jwt`                           | 验证当前字段的值是否是有效的 JWT 字符串                           |
| `latitude`                      | 验证字段的值是否是有效的纬度坐标                                  |
| `longitude`                     | 验证字段的值是否是有效的纬度坐标                                  |
| `postcode_iso3166_alpha2`       | 根据 iso 3166 alpha 2 中国家代码的值进行验证                      |
| `postcode_iso3166_alpha2_field` | 通过字段验证，该字段表示 iso 3166 alpha 2 中的国家代码值          |
| `rgb`                           | 验证当前字段的值是否是有效的 RGB 颜色                             |
| `rgba`                          | 验证当前字段的值是否是有效的 RGBA 颜色                            |
| `ssn`                           | 验证字段的值是否是有效的 SSN                                      |
| `timezone`                      | 验证当前字段的值是否是有效的时区字符串                            |
| `uuid`                          | 验证字段的值是否是任何版本的有效 UUID                             |
| `uuid3`                         | 验证字段的值是否是任的有效 UUID v3                                |
| `uuid3_rfc4122`                 | 验证字段的值是否为有效的 RFC4122 v3 UUID                          |
| `uuid4`                         | 验证字段的值是否为有效的 v4 UUID                                  |
| `uuid4_rfc4122`                 | 验证字段的值是否为有效的 RFC4122 v4 UUID                          |
| `uuid5`                         | 验证字段的值是否是有效的 v5 UUID                                  |
| `uuid5_rfc4122`                 | 验证字段的值是否是有效的 RFC4122 v5 UUID                          |
| `uuid_rfc4122`                  | 验证字段的值是否为任何版本的有效 RFC4122 UUID                     |
| `md4`                           | 验证字段的值是否为有效的 MD4                                      |
| `md5`                           | 验证字段的值是否为有效的 MD5                                      |
| `sha256`                        | 验证该字段的值是否是有效的 SHA256                                 |
| `sha384`                        | 验证字段的值是否是有效的 SHA384                                   |
| `sha512`                        | 验证字段的值是否为有效的 SHA512                                   |
| `ripemd128`                     | 验证字段的值是否是有效的 PIPEMD128                                |
| `ripemd128`                     | 验证字段的值是否是有效的 PIPEMD160                                |
| `tiger128`                      | 验证字段的值是否是有效的 TIGER128                                 |
| `tiger160`                      | 验证字段的值是否是有效的 TIGER160                                 |
| `tiger192`                      | 验证字段的值是否是有效的 TIGER192                                 |
| `semver`                        | 验证当前字段的值是否为语义版本 2.0.0 中定义的有效 semver 版本     |
| `ulid`                          | 验证字段的值是否为有效的 ULID                                     |

### 比较

| Tag   | Description |
| ----- | ----------- |
| `eq`  | 等于        |
| ` gt` | 大于        |
| `gte` | 大于等于    |
| `lt`  | 小于        |
| `lte` | 小于等于    |
| `ne`  | 不等于      |

### 其他

| Tag                    | Description                                                                  |
| ---------------------- | :--------------------------------------------------------------------------- | --- | ---------------- |
| `dir`                  | 文件目录                                                                     |
| `file`                 | 文件路径                                                                     |
| `isdefault`            | 验证当前字段的值是否是默认静态值                                             |
| `len`                  | 字段长度                                                                     |
| `max`                  | 最大值                                                                       |
| `min`                  | 最小值                                                                       |
| `oneof`                | 是否是列举的值的其中的一个                                                   |
| `oimtempty`            | 如果字段未设置，则忽略它                                                     |
| ` required`            | 必须值                                                                       |
| `required_if`          | 只有当所有其他指定字段与指定字段后面的值相等时，验证的字段必须存在且不为空   |
| `required_unless`      | 除非所有其他指定字段与指定字段后面的值相等，验证的字段必须存在且不为空       |
| `required_with`        | 当指定的字段有一个存在时，验证的字段必须存在且不为空                         |
| `required_with_all`    | 当指定的所有字段存在时，验证的字段必须存在且不为空                           |
| `required_without`     | 当指定的字段有一个不存在时，验证的字段必须存在且不为空                       |
| `required_without_all` | 当指定的字段全部不存在时，验证的字段必须存在且不为空                         |
| `excluded_if`          | 只有当所有其他指定字段与指定字段后面的值相等时，验证的字段可以不存在或者为空 |
| `excluded_unless`      | 除非所有其他指定字段与指定字段后面的值相等，验证的字段可以不存在或者为空     |
| `excluded_with`        | 当指定的字段有一个存在时，验证的字段可以不存在或者为空                       |
| `excluded_with_all`    | 当指定的所有字段存在时，验证的字段可以不存在或者为空                         |
| `excluded_without`     | 当指定的字段有一个不存在时，验证的字段可以不存在或者为空                     |
| `excluded_without_all` | 当指定的字段全部不存在时，验证的字段可以不存在或者为空                       |
| `unique `              | 验证每个`arr                                                                 | map | slice`值是否唯一 |

### 别名

| Tag            | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `iscolor`      | hexcolor\|rgb\|rgba\|hsl\|hsla                              |
| `country_code` | iso3166_1_alpha2\|iso3166_1_alpha3\|iso3166_1_alpha_numeric |

### 操作符

| Tag | Description                                                          | Hex                                                |
| --- | -------------------------------------------------------------------- | -------------------------------------------------- | ------ |
| `,` | 与操作，使用多个验证标记，必须所有条件都满足，隔开逗号之间不能有空格 | `0x2c`                                             |
| `   | `                                                                    | 或操作，使用多个验证标记，但是只需满足其中一个即可 | `0x7c` |
| `-` | 该字段跳过验证                                                       | `0x2d`                                             |
| `=` | 参数匹配符号                                                         | `0x3d`                                             |

::: tip

验证字段的时候想要匹配操作符的话，需要使用`utf8`十六进制表达形式替换，例如

```go
filed string `validate:"contains=0x2c"`
```

:::

## 使用

下面会介绍`Validator`的一些基本使用以及一些代码示例。

### 单例

```go
var validate *validator.Validate
```

在使用时，官方建议在整个程序的生命周期中，只存在一个验证器实例，这样会有利于其缓存一些数据。

### 创建验证器

在单独使用`Validator`没有集成其他框架的情况下，需要我们手动创建验证器。

```go
validate = validator.New()
```

### 结构体验证

```go
func (v *Validate) Struct(s interface{}) error
```

`Struct`方法用于验证一个结构体所有公开的字段，默认会自动进行嵌套结构体验证，当传入非法的值或者传入值为`nil`时，会返回`InvalidValidationError`，如果验证失败的错误则返回`ValidationErrors` 。

示例

```go
package validate

import (
  "fmt"
  "github.com/go-playground/validator/v10"
  "testing"
)

type User struct {
  Name    string `validate:"contains=jack"` //名字包含jack
  Age     int    `validate:"gte=18"`        //大于等于17岁
  Address string `valiate:"endwith=市"`      //以市结尾
}

func TestStruct(t *testing.T) {
  validate := validator.New()
  user := User{
    Name:    "jacklove",
    Age:     17,
    Address: "滔博市",
  }
  err := validate.Struct(user)
  for _, err := range err.(validator.ValidationErrors) {
    fmt.Println(err.Namespace()) //命名
    fmt.Println(err.Field())
    fmt.Println(err.StructNamespace())
    fmt.Println(err.StructField())
    fmt.Println(err.Tag())
    fmt.Println(err.ActualTag())
    fmt.Println(err.Kind())
    fmt.Println(err.Type())
    fmt.Println(err.Value())
    fmt.Println(err.Param())
    fmt.Println()
  }
  fmt.Println(err)
}
```

输出

```
User.Age
Age
User.Age
Age
gte
gte
int
int
17
18

Key: 'User.Age' Error:Field validation for 'Age' failed on the 'gte' tag
```

### map 验证

```go
func (v *Validate) ValidateMap(data map[string]interface{}, rules map[string]interface{}) map[string]interface{}
```

通过一个 Tag`map`来进行键值对验证。

示例

```go
func TestMap(t *testing.T) {
   user := map[string]interface{}{
      "name":    "jak",
      "age":     17,
      "address": "滔博市",
   }
   rules := map[string]interface{}{
      "name":    "contains=jacklove",
      "age":     "gte=18",
      "address": "endswith=市",
   }

   validate := validator.New()

   validateMap := validate.ValidateMap(user, rules)
   fmt.Println(validateMap)
}
```

输出

```
map[age:Key: '' Error:Field validation for '' failed on the 'gte' tag name:Key: '' Error:Field validation for '' failed on the 'contains' tag]
```

### 切片验证

验证字符串切片，`dive`前是 tag 是对切片进行验证，`dive`后的 tag 是对切片中的值进行验证，嵌套切片也是一个道理，有几维就用几个`dive`

```go
func TestSlice1(t *testing.T) {
  list := []string{"jack", "mike", "lisa", "golang"}
  err := validator.New().Var(list, "max=5,dive,contains=a,min=5") //切片长度最大值为5，元素必须包含字符a，且最小长度为5
  fmt.Println(err)
}
```

输出

```
Key: '[0]' Error:Field validation for '[0]' failed on the 'min' tag
Key: '[1]' Error:Field validation for '[1]' failed on the 'contains' tag
Key: '[2]' Error:Field validation for '[2]' failed on the 'min' tag
```

对切片里的每一个用户进行结构体验证

```go
func TestSlice(t *testing.T) {
   userList := make([]User, 0)
   user := User{
      Name:    "jacklove",
      Age:     17,
      Address: "滔博市",
   }
   userList = append(userList, user)
   err := validator.New().Var(userList, "dive") //“dive”即深层验证的意思，当元素为结构体时，会自动进行结构体验证
   fmt.Println(err)
}
```

输出

```
Key: '[0].Age' Error:Field validation for 'Age' failed on the 'gte' tag
```

### 变量验证

比较简单易懂，就不做过多的解释

例 1

```go
func TestVar(t *testing.T) {
   name := "jack"
   err := validator.New().Var(name, "max=5,contains=a,min=1,endswith=l") //最大长度为5，最小长度为1，包含字母a，以字母l结尾
   fmt.Println(err)
}
```

输出

```
Key: '' Error:Field validation for '' failed on the 'endswith' tag
```

例 2

```
func TestVar1(t *testing.T) {
   age := 18
   err := validator.New().Var(age, "gte=19")
   fmt.Println(err)
}
```

输出

```
Key: '' Error:Field validation for '' failed on the 'gte' tag
```

::: tip

`Var`方法可以验证的类型包含结构体，变量，切片，map，要合理结合`dive`标签使用。

:::

### 字段验证

字段验证的参数不再是基本类型，而是结构体的字段名，可以是自身的字段名，也可以是嵌套结构体的字段名。

```go
type Password struct {
   FirstPassword  string `validate:"eqfield=SecondPassword"` //验证两次输入的密码是否相等
   SecondPassword string
}

type RegisterUser struct {
   Username string `validate:"necsfield=Password.FirstPassword"` //在注册时为了安全考虑，禁止密码和用户名一致
   Password Password
}

func TestCrossStructFieldValidate(t *testing.T) {
   validate = validator.New()
   // 失败
   fmt.Println(validate.Struct(RegisterUser{
      Username: "gopher",
      Password: Password{
         FirstPassword:  "gopher",
         SecondPassword: "gophers",
      },
   }))
   // 成功
   fmt.Println(validate.Struct(RegisterUser{
      Username: "gophers",
      Password: Password{
         FirstPassword:  "gopher",
         SecondPassword: "gopher",
      },
   }))
}
```

输出

```
Key: 'RegisterUser.Username' Error:Field validation for 'Username' failed on the 'necsfield' tag
Key: 'RegisterUser.Password.FirstPassword' Error:Field validation for 'FirstPassword' failed on the 'eqfield' tag
<nil>
```

::: warning

使用字段验证时，当 Tag 作为参数的字段或者结构体不存在时，会直接判断为验证失败，例如：

```go
type Password struct {
   FirstPassword  string `validate:"eqfield=SeconddPaswod"` // SeconddPaswod != SecondPassword
   SecondPassword string
}
```

对于这种拼写错误，很难检查到，而且验证时也仅会以验证未通过的形式展现，需要十分注意。

:::

## 进阶

接下来会讲解一些进阶的使用技巧与更多的自定义操作。

### 自定义别名

在有些时候，对于一个字段有非常多的验证 tag，当你想要复用到另一个字段上时，你可能会直接赋值粘贴，不过这并不是最好的解决办法，更好的方法是通过注册别名来提高复用性，请看下面的一个例子:

```go
var validate *validator.Validate

const PERSON_NAME_RULES = "max=10,min=1,contains=jack"

func TestAlias(t *testing.T) {
  validate = validator.New()
    // 注册别名
  validate.RegisterAlias("namerules", PERSON_NAME_RULES)
  type person struct {
    FirstName string `validate:"namerules"` // 使用别名
    LastName  string `validate:"namerules"`
  }

  err := validate.Struct(person{
    FirstName: "",
    LastName:  "",
  })

  fmt.Println(err)
}
```

输出

```go
Key: 'person.FirstName' Error:Field validation for 'FirstName' failed on the 'namerules' tag
Key: 'person.LastName' Error:Field validation for 'LastName' failed on the 'namerules' tag
```

### 自定义验证函数

虽然组件自带的验证 tag 足够满足基本时候，可有些时候对于一些特殊需求必须要自己定义逻辑，`Validator`为我们提供了相关的 API 来自定义验证函数。接下来先看一个例子：

```go
func TestCustomValidate(t *testing.T) {
   validate = validator.New()
   fmt.Println(validate.RegisterValidation("is666", is666))
   type Example struct {
      Name string `validate:"is666"`
   }
   fmt.Println(validate.Struct(Example{Name: "777"}))
   fmt.Println(validate.Struct(Example{Name: "666"}))
}

func is666(fl validator.FieldLevel) bool {
   return fl.Field().String() == "666"
}
```

创建了一个函数，判断字段值是不是等于`"666"`，并且其对应的 Tag 是`is666`，输出如下

```go
<nil>
Key: 'Example.Name' Error:Field validation for 'Name' failed on the 'is666' tag
```

::: tip

注册的 Tag 如果已经存在，那么将会被现有的覆盖掉，也就是说可以“重写”默认的 Tag 校验逻辑。

:::

### 自定义类型验证函数

类型验证函数是专门针对某一类型的，通常用于一些非基本类型，同样的也可以覆盖默认基本类型的校验，下面看一个例子：

```go
type Address struct {
  name string
}

func TestCustomTypeValidate(t *testing.T) {
  validate = validator.New()
  validate.RegisterCustomTypeFunc(ValidateAddress, Address{}) // 注册类型验证函数和对应的类型
  type Example struct {
    Address Address `validate:"required"`
  }
  fmt.Println(validate.Struct(Example{Address: Address{name: ""}}))
  fmt.Println(validate.Struct(Example{Address: Address{name: "cn"}}))
}

func ValidateAddress(value reflect.Value) interface{} {
  if address, ok := value.Interface().(Address); ok {
    //错误处理
    if address.name == "" {
      return address.name
    }

    return value //返回字段即代表验证正确
  }
  return nil
}
```

输出

```go
Key: 'Example.Address' Error:Field validation for 'Address' failed on the 'required' tag
<nil>
```

::: tip

同时将多个类型注册到一个函数也是同样的道理

:::

### 自定义结构体验证函数

结构体验证函数的区别在于，其他函数的参数是字段，而此函数的参数是结构体，看下面的例子：

```go
type People struct {
   FirstName string
   LastName  string
}

func TestCustomStructLevel(t *testing.T) {
   validate = validator.New()
   validate.RegisterStructValidation(PeopleValidate, People{}) //同类型注册，可以传入的结构体也不止一种
   err := validate.Struct(People{
      FirstName: "",
      LastName:  "",
   })
   fmt.Println(err)
}

func PeopleValidate(sl validator.StructLevel) {
   people := sl.Current().Interface().(People)

   if people.FirstName == "" || people.LastName == "" {
      sl.ReportError(people.FirstName, "FirstName", "FirstName", "", "")
      sl.ReportError(people.FirstName, "LastName", "LastName", "", "")
   }
}
```

输出

```
Key: 'People.FirstName' Error:Field validation for 'FirstName' failed on the '' tag
Key: 'People.LastName' Error:Field validation for 'LastName' failed on the '' tag
```

### 多语言

翻译器组件

```
go get github.com/go-playground/universal-translator
```

地区组件

```
go get github.com/go-playground/locales
```

验证器默认的语言是英文，而我们在进行项目开发时，可能会用到不止一种语言，这时候我们就需要用到国际化多语言组件，看下面的一个例子：

```go
import (
  "fmt"
  "github.com/go-playground/locales/zh"
  ut "github.com/go-playground/universal-translator"
  "github.com/go-playground/validator/v10"
  zh_trans "github.com/go-playground/validator/v10/translations/zh"
  "reflect"
  "testing"
)

type User struct {
   Name    string `validate:"contains=jack"` //名字包含jack
   Age     int    `validate:"gte=18"`        //大于等于17岁
   Address string `validate:"endswith=市"`    //以市结尾
}

var (
   uni      *ut.UniversalTranslator
   validate *validator.Validate
)

func TestTranslate(t *testing.T) {
   zh := zh.New()
   //第一个是备用的，后续的是支持的语言，可以有多个
   uni = ut.New(zh, zh)
   //这里的语言通常可以在http的请求头中的Accept-Language中获取对应的语言
   trans, found := uni.GetTranslator(zh.Locale())
   validate = validator.New()
   if found {
      zh_trans.RegisterDefaultTranslations(validate, trans) //注册默认翻译器
   }
   err := validate.Struct(User{
      Name:    "",
      Age:     0,
      Address: "",
   })
   fmt.Println(err.(validator.ValidationErrors).Translate(trans))
}
```

输出

```
map[User.Address:Address必须以文本'市'结尾 User.Age:Age必须大于或等于18 User.Name:Name必须包含文本'jack']
```

也可以把每一个错误单独翻译

```go
for _, fieldError := range err.(validator.ValidationErrors) {
   fmt.Println(fieldError.Translate(trans))
}
```

输出

```
Name必须包含文本'jack'
Age必须大于或等于18
Address必须以文本'市'结尾
```

可以看到返回值是一个 map，可以看到基本的错误信息翻译已经做到了，但是还不足以纳入使用，我们需要接着来美化一下错误信息，以便更好的与客户或者前端进行对接。

```go
type User struct {

   Name    string `validate:"contains=jack" label:"姓名"` //名字包含jack
   Age     int    `validate:"gte=18" label:"年龄"`        //大于等于17岁
   Address string `validate:"endswith=市" label:"地址"`    //以市结尾
   Sex     string `validate:"required" label:"性别"`
}
```

首先自定义 Tag`label`，它的值就是字段的中文名，随后通过验证器注册一个`TagNameFunc`，它的作用是在获取字段名时或替换掉原名称。在`errors.go`文件中的`Filed() string`方法上的注释如下说道："带有标记名的字段名优先于字段的实际名称"，所以后续在发生错误时，就可以使用自定义的中文名来替代英文单词。`TagNameFunc`如下：

```go
// 我们加上了一个自定义标签，这个标签用于给结构体字段做中文名，它会替代原本的字段名称
func CustomTagNameFunc(field reflect.StructField) string {
   label := field.Tag.Get("label")
   if len(label) == 0 {
      return field.Name
   }
   return label
}
```

最后再注册

```go
validate.RegisterTagNameFunc(CustomTagNameFunc)
```

再次执行输出

```
姓名必须包含文本'jack'
年龄必须大于或等于18
地址必须以文本'市'结尾
```

然后这还不够，依旧不足以作为错误信息返回给前端，我们需要将信息格式化成 json 或者任何适合消息传输的格式，你可能会想到直接将 map 序列化成 json，这是一种解决办法，不过你可能会得到如下结果：

```json
{
  "User.地址": "地址必须以文本'市'结尾",
  "User.姓名": "姓名必须包含文本'back'",
  "User.年龄": "年龄必须大于或等于18",
  "User.性别": "性别为必填字段"
}
```

通过将 map 的 key 值处理下得到如下结果：

```json
{
  "地址": "地址必须以文本'市'结尾",
  "姓名": "姓名必须包含文本'back'",
  "年龄": "年龄必须大于或等于18",
  "性别": "性别为必填字段"
}
```

不过并不建议将上面这种的信息返回给前端，我们可以处理成一个字符串作为信息返回

```
姓名必须包含文本'back', 年龄必须大于或等于18, 地址必须以文本'市'结尾, 性别为必填字段,
```

**完整代码**

```go
import (
   "fmt"
   "github.com/go-playground/locales/zh"
   ut "github.com/go-playground/universal-translator"
   "github.com/go-playground/validator/v10"
   zh_trans "github.com/go-playground/validator/v10/translations/zh"
   "reflect"
   "strings"
   "testing"
)

type User struct {
   Name    string `validate:"contains=back" label:"姓名"` //名字包含jack
   Age     int    `validate:"gte=18" label:"年龄"`        //大于等于17岁
   Address string `validate:"endswith=市" label:"地址"`    //以市结尾
   Sex     string `validate:"required" label:"性别"`
}

var (
   uni      *ut.UniversalTranslator
   validate *validator.Validate
)

// 我们加上了一个自定义标签，这个标签用于给结构体字段做中文名，它会替代原本的字段名称
func CustomTagNameFunc(field reflect.StructField) string {
   label := field.Tag.Get("label")
   if len(label) == 0 {
      return field.Name
   }
   return label
}

func TestTranslate(t *testing.T) {
   zh := zh.New()
   uni = ut.New(zh, zh)
   //这里的语言通常可以在http的请求头中的Accept-Language中获取对应的语言
   trans, found := uni.GetTranslator(zh.Locale())
   validate = validator.New()
   if found {
      zh_trans.RegisterDefaultTranslations(validate, trans) //注册默认翻译器
   }
   validate.RegisterTagNameFunc(CustomTagNameFunc)
   err := validate.Struct(User{
      Name:    "",
      Age:     0,
      Address: "",
   })
   translate := errInfoFormat(err.(validator.ValidationErrors), trans)
   fmt.Println(translate)
}

func errInfoFormat(errors validator.ValidationErrors, trans ut.Translator) string {
   builder := strings.Builder{}
   for _, err := range errors {
      builder.WriteString(err.Translate(trans))
      builder.WriteString(", ")
   }
   return builder.String()
}
```

最后的最后，如果觉得错误信息太冰冷，希望更人性化一点，可以重写指定 tag 的错误提示信息，这需要用到`RegisterTranslation`方法，同时也需要用到两个类型的函数，分别是`RegisterTranslationsFunc`负责注册对应 Tag 的翻译模板，另一个则是`TranslationFunc`，负责将模板处理得到最后的翻译内容。这里用`required`举个例子：

```go
func requiredOverrideRegister(ut ut.Translator) error { //这个函数的作用是注册翻译模板
  return ut.Add("required", "{}是一个必须填写的字段", true) // {}是占位符 true代表了是否重写已有的模板
}

func requiredOverrideTranslation(ut ut.Translator, fe validator.FieldError) string { // 这个函数的作用是负责翻译内容
  t, _ := ut.T("required", fe.Field()) //参数可以有多个，取决于注册对应Tag的模板有多少个占位符
  return t
}
```

最后注册一下

```go
validate.RegisterTranslation("required", trans, requiredOverrideRegister, requiredOverrideTranslation)
```

结果

```
姓名必须包含文本'back', 年龄必须大于或等于18, 地址必须以文本'市'结尾, 性别是一个必须填写的字段,
```

### 语言文件

事实上一个个写代码注册非常的繁琐，`universal-translator`提供了通过编写`JSON `配置文件的方式来进行翻译：[universal-translator/examples/full-with-files at master · go-playground/universal-translator (github.com)](https://github.com/go-playground/universal-translator/tree/master/_examples/full-with-files)

```go
func TestFilei18n(t *testing.T) {
   validate = validator.New()
   zh := zh.New()
   universalTranslator := ut.New(zh, zh)
   translator, _ := universalTranslator.GetTranslator(zh.Locale())
   zh_trans.RegisterDefaultTranslations(validate, translator)
   er := universalTranslator.Import(ut.FormatJSON, "./zh.json") //建议要在注册之后导入，这样才能覆盖原有的Tag
   if er != nil {
      log.Fatal(er)
   }
   type Gopher struct {
      Language string `validate:"required"`
   }

   err := validate.Struct(Gopher{
      "",
   })
   fmt.Println(err.(validator.ValidationErrors).Translate(translator))
}
```

JSON 文件

```json
[
  {
    "locale": "zh",
    "key": "required",
    "trans": "这是一个十分重要的字段{0}，你必须填写它",
    "override": true
  }
]
```

输出

```
map[Gopher.Language:这是一个十分重要的字段Language，你必须填写它]
```

::: tip

`universal-translator`在使用时有很多坑，如果是想要覆盖原有的`Tag`的话，`type`与`rule`都可以不填，因为原有的配置中也没有填，最好保持一致。填了什么`type`，就会将配置加到对应的 map 中，如果是`Cardinal`或者其他的`type`且`rule`配置了`one`之类的，那么就需要本地做相应的配置才能正常使用，否则将会报错。

:::
