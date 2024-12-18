# JWT

JWT 已经成为了现代服务端通信认证的主流方式之一，具有轻量，无状态的特点。

## 简介

JWT 全名 JSON Web Tokens，关于 JWT 的详细介绍可以在[jwt.io]([JSON Web Token Introduction - jwt.io](https://jwt.io/introduction))查看，它是一种开放的，安全的，紧凑的，以 JSON 对象为载体在服务双方之间传输信息的方式，它的特点就是安全性高，内容防篡改，消耗低。

## 结构

在 RFC 标准中，JWT 由以下三个部分组成：

- Header 头部
- Payload 载荷
- Signature 签名

然后每一个部分用一个点`.`来分隔，最后组成一个字符串，格式就是`header.payload.signature`吗，这就是一个 JWT 令牌的标准结构，接下来就一个个讲解每个结构的作用。

::: tip

需要注意的是`base64`与`base64URL`不是同一种编码方式，后者兼容了网页 URL，对其进行了转义。

:::

### 头部

头部只是声明一些基本信息，通常由两部分组成，令牌的类型，和签名所使用的加密算法，例如下方：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

以上的信息大致就是，令牌的类型为 JWT，签名部分所使用的加密算法为 HS256，最后再将 JSON 对象通过`Base64Url`编码成字符串，该字符串就是 JWT 的头部。

### 载荷

JWT 的第二部分是载荷部分，主要包含声明(`claims`)部分，声明部分通常是关于一个实体的数据，比如一个用户。关于声明的类型总共有三种：

- `reigstered`：`Registered claims`代表着 一些预定义的声明，一些并不强制使用但是仍然推荐使用，例如：`iss`(issuer 签发者)，`exp`(expiration time 过期时间) ，`aud`(audience 受众)。
- `public`：`Public claims`是可以由使用 JWT 的人随意定义的，最好要避免和其他声明部分冲突。
- `private claims`：这部分的声明同样也是自定义的，通常用于在服务双方共享一些信息。

一个载荷示例如下：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

该 JSON 对象将会通过`Base64Url`被编码成字符串，从而组成 JWT 的第二部分。

::: danger

虽然载荷部分也受到保护，也有防篡改，但是这一部分是公共可读的，所以不要把敏感信息存放在 JWT 内。

:::

### 签名

在获得了编码的头部和编码的载荷部分后，就可以通过头部所指明的签名算法根据前两个部分的内容再加上密钥进行加密签名，所以一旦 JWT 的内容有任何变化，解密时得到的签名都会不一样，同时如果是使用私钥，也可以对 JWT 的签发者进行验证。

```
sign = HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

例如下方的例子：

```
Header
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload
{
  "alg": "HS256",
  "typ": "JWT"
}

Verify Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your secret
)
```

最后得到的输出就是一个由三个`base64Url`字符串组成且由`.`分隔的字符串，大概长下面这样

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ
```

## 工作原理

在身份验证中，当用户使用凭据成功登录时，将返回一个 JSON Web 令牌。由于令牌是凭证，因此必须非常小心地防止出现安全问题。一般来说，令牌的保存时间不应超过所需的时间。然后无论何时用户想要访问受保护的路由和资源，在发起请求时就必须携带上 token，通常都是在请求头中的`Authorization` header 中的`Bearer schema`，例如下方：

```
Authorization: Bearer <token>
```

服务器在收到 JWT 后，会对其进行有效性验证，例如内容有篡改，token 已过期等等，如果验证通过就可以顺利的访问资源。虽然 JWT 中可以携带一些基本信息，但是依旧建议信息不要太大。

## JWT 库

官方仓库：[golang-jwt/jwt: Community maintained clone of https://github.com/dgrijalva/jwt-go](https://github.com/golang-jwt/jwt)

官方文档：[jwt package - github.com/golang-jwt/jwt/v4 - Go Packages](https://pkg.go.dev/github.com/golang-jwt/jwt/v4)

这个库支持解析和验证以及 JWT 的生成和签名。目前支持的签名算法有 HMAC SHA, RSA, RSA-PSS, 和 ECDSA，不过也可以添加自己的钩子。

**安装**

```
go get -u github.com/golang-jwt/jwt/v4
```

**导入**

```go
import "github.com/golang-jwt/jwt/v4"
```

## 选择签名算法

可用的签名算法有好几种，在使用之前应该先了解下它们之间的区别以便更好的去选择签名算法，它们之间最大的不同就是**对称加密**和**非对称加密**。

最简单的对称加密算法`HSA`，让任何`[]byte`都可以用作有效的密钥，所以计算速度稍微快一点。在生产者和消费者双方都是可以被信任的时候，对称加密算法的效率是最高的。不过由于签名和验证都使用相同的密钥，因此无法轻松的分发用于验证的密钥，毕竟签名的密钥也是同一个，签名泄露了则 JWT 的安全性就毫无意义。

非对称加密签名方法，例如`RSA`，使用不同的密钥来进行签名和验证 token，这使得生成带有私钥的令牌成为可能，同时也允许任何使用公钥验证的人正常访问。

不同的签名算法所需要的密钥的类型也不同，下面给出一些常见签名算法的类型：

- `HMAC`：对称加密，需要类型`[]byte`的值用于签名和验证。 (`HS256`,`HS384`,`HS512`)
- `RSA`：非对称加密，需要`*rsa.PrivateKey`类型的值用于签名，和`*rsa.PublicKey`类型的值用于验证。(`RS256`,`RS384`,`RS512`)
- `ECDSA`：非对称加密，需要`*ecdsa.PrivateKey`类型的值用于签名，和`*ecdsa.PublicKey`类型的值用于验证。(`ES256`,`ES384`,`ES512`)
- `EdDSA`：非对称加密，需要`ed25519.PrivateKey`类型的值用于签名和`ed25519.PublicKey` 类型的值用于验证。(`Ed25519`)

## 示例

下面会演示一些示例，有关于 jwt 的创建与签名，已经解析与验证。

```go
type Token struct {
  Raw       string                 // 原始Token字符串，当开始解析时填充此字段
  Method    SigningMethod          // 签名使用的方法
  Header    map[string]interface{} // JWT的header部分
  Claims    Claims                 // JWT的payload部分
  Signature string                 // JWT的签名部分，当开始解析时填充此字段
  Valid     bool                   // JWT是否合法有效
}
```

Token 结构体代表了一个 JWT Token，字段的使用主要取决于 JWT 是如何被创建/签名或解析/验证的。

```go
type RegisteredClaims struct {
   // the `iss` (Issuer) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
   Issuer string `json:"iss,omitempty"`

   // the `sub` (Subject) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
   Subject string `json:"sub,omitempty"`

   // the `aud` (Audience) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
   Audience ClaimStrings `json:"aud,omitempty"`

   // the `exp` (Expiration Time) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
   ExpiresAt *NumericDate `json:"exp,omitempty"`

   // the `nbf` (Not Before) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
   NotBefore *NumericDate `json:"nbf,omitempty"`

   // the `iat` (Issued At) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
   IssuedAt *NumericDate `json:"iat,omitempty"`

   // the `jti` (JWT ID) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
   ID string `json:"jti,omitempty"`
}
```

这是库中提供的预定义 Claims，可以适当使用以达到目的需求。

### 例 1.HMAC 的创建与签名

```go
func TestHmac(t *testing.T) {
   // hmac的密钥类型是字节数组
   secret := []byte("my secret")
   // 使用HS256算法，jwt.MapClaims是payload
   token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
      "id":   123456,
      "name": "jack",
   })
   fmt.Printf("%+v\n", *token)
   // 签名
   signedString, err := token.SignedString(secret)
   fmt.Println(signedString, err)
}
```

输出：

```
{Raw: Method:0xc000008150 Header:map[alg:HS256 typ:JWT] Claims:map[id:123456 name:jack] Signature: Valid:false}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MTIzNDU2LCJuYW1lIjoiamFjayJ9.
QxLw9NkFgZW3BluyXIofe4efp1IAy61s8b2fe3Eo86M
<nil>
```

### 例 3.使用预定义 Claims

```go
mySigningKey := []byte("AllYourBase")

// 创建Claims
claims := &jwt.RegisteredClaims{
  ExpiresAt: jwt.NewNumericDate(time.Unix(1516239022, 0)),
  Issuer:    "test",
}

token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
ss, err := token.SignedString(mySigningKey)
fmt.Printf("%v %v", ss, err)
```

输出：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0ZXN0IiwiZXhwIjoxNTE2MjM5MDIyfQ.
0XN_1Tpp9FszFOonIBpwha0c_SfnNI22DhTnjMshPg8
<nil>
```

### 例 3.自定义 Claims

```go
type MyClaims struct {
   User string `json:"user"`
   jwt.RegisteredClaims
}

func TestCustomClaims(t *testing.T) {
   // 创建密钥
   secret := []byte("my secret")
   // 创建Claims
   claims := MyClaims{
      User: "114514",
      RegisteredClaims: jwt.RegisteredClaims{
         ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
         IssuedAt:  jwt.NewNumericDate(time.Now()),
         NotBefore: jwt.NewNumericDate(time.Now()),
         Issuer:    "Server",
      },
   }
   // 创建Token
   token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
   // 签名
   signedString, err := token.SignedString(secret)
   fmt.Println(signedString, err)
}
```

输出：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyIjoiMTE0NTE0IiwiaXNzIjoiU2VydmVyIiwiZXhwIjoxNjczMDg1Nzk2LCJuYmYiOjE2NzMwODIxOTYsImlhdCI6MTY3MzA4MjE5Nn0.
PdPXdQBbDuYtE4ENXzoAcrW-dBSxqsufeYXCT5zTwVI
<nil>
```

::: tip

当在自定义 Claims 中嵌入了标准 Claims 时，需要确保：

1.嵌入的标准 Claims 是非指针类型

2.如果是指针类型，最好确保在传递之前为其分配合适的内存，否则将会 panic。

:::

### 例 4.HMAC 解析验证 Token

```go
func TestParse(t *testing.T) {
   secret := []byte("my secret")
   // 假设通过HS256算法创建并签名生成了一个token
   tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuYW1lIjoiamFjayJ9.QxLw9NkFgZW3BluyXIofe4efp1IAy61s8b2fe3Eo86M"

   // 传入token字符串和验证钩子函数，返回值就是一个Token结构体
   token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
      // 验证签名算法是否匹配
      if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
         return nil, fmt.Errorf("不匹配的签名算法: %s", token.Header["alg"])
      }

      // 返回验证密钥
      return secret, nil
   })
   if err != nil {
      fmt.Println(token, err)
   }

   if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
      fmt.Println(claims)
   } else {
      fmt.Println(err)
   }

}
```

输出：

```
map[id:123456 name:jack]
```

### 例 5.错误处理

```go
func TestProcess(t *testing.T) {
   secret := []byte("my secret")
   // 假设通过HS256算法创建并签名生成了一个token
   tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJuYW1lIjoiamFjayJ9.QxLw9NkFgZW3BluyXIofe4efp1IAy61s8b2fe3Eo86M"

   // 传入token字符串和验证钩子函数，返回值就是一个Token结构体
   token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
      // 验证签名算法是否匹配
      if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
         return nil, fmt.Errorf("不匹配的签名算法: %s", token.Header["alg"])
      }
      // 返回验证密钥
      return secret, nil
   })

   if token.Valid {
      fmt.Println("token合法")
   } else if errors.Is(err, jwt.ErrTokenMalformed) {
      fmt.Println("传入的字符串甚至连一个token都不是...")
   } else if errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet) {
      fmt.Println("token已经过期或者还没有生效")
   } else {
      fmt.Println("token处理异常...")
   }
}
```

输出：

```
token合法
```

### 例 6.自定义 Claims 解析

如果在创建 Token 时使用的是自定义 Claims，那么在解析时如果希望 Claims 可以直接转换自定义的 Claims 而不是 map，就需要传入自定义 Claims。

```go
func TestCustomClaimsParse(t *testing.T) {
  secret := []byte("my secret")
  tokenstring := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTE0NTE0IiwiaXNzIjoiU2VydmVyIiwiZXhwIjoxNjczMDg4MDU2LCJuYmYiOjE2NzMwODQ0NTYsImlhdCI6MTY3MzA4NDQ1Nn0.T245aoDeL2x19X8_JZde0EmZ2TDyIgr1u3ddKFjQmgw"
  token, err := jwt.ParseWithClaims(tokenstring, &MyClaims{}, func(token *jwt.Token) (interface{}, error) {
    return secret, nil
  }, jwt.WithValidMethods([]string{"HS256"})) // 使用option进行验证

    // 类型断言
  if claims, ok := token.Claims.(*MyClaims); ok && token.Valid {
    fmt.Println(claims)
  } else {
    fmt.Println(err)
  }
}
```

输出：

```
&{114514 {Server  [] 2023-01-07 18:40:56 +0800 CST 2023-01-07 17:40:56 +0800 CST 2023-01-07 17:40:56 +0800 CST }}
```

### 例 7.RSA 的签名与解析

RSA 在分布式架构中用的会比较多，大致过程如下：

1. 认证中心创建密钥对，使用私钥将 jwt 签名，jwt 返回给客户端，公钥则有业务服务持有
2. 客户端携带 jwt 向业务服务发起请求，业务模块使用公钥对 jwt 进行解析，无需访问认证中心
3. 认证通过则返回业务信息
4. 认证失败则返回失败信息

```go
func TestRsa(t *testing.T) {

   // 创建密钥对
   privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
   publicKey := &privateKey.PublicKey

   if err != nil {
      fmt.Println(err)
      return
   }

   // claims
   claims := MyClaims{
      User: "114514",
      RegisteredClaims: jwt.RegisteredClaims{
         ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
         IssuedAt:  jwt.NewNumericDate(time.Now()),
         NotBefore: jwt.NewNumericDate(time.Now()),
         Issuer:    "Server",
      },
   }

   token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
   // 私钥加密
   signedString, err := token.SignedString(privateKey)

   fmt.Println(signedString, err)

   // 公钥解密
   token, err = jwt.ParseWithClaims(signedString, &MyClaims{}, func(token *jwt.Token) (interface{}, error) {
      return publicKey, nil
   })

   if err != nil {
      fmt.Println(err)
   } else if claims, ok := token.Claims.(*MyClaims); ok && token.Valid {
      fmt.Println(claims)
   }
}
```
