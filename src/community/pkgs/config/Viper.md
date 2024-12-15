# Viper

仓库地址：[spf13/viper: Go configuration with fangs (github.com)](https://github.com/spf13/viper)

文档地址：[spf13/viper: Go configuration with fangs (github.com)](https://github.com/spf13/viper#readme)

::: tip

官方正在讨论向`Viper2`过渡，感兴趣可以了解：[Viper2](https://forms.gle/R6faU74qPRPAzchZ9)

:::

## 安装

```
go get github.com/spf13/viper
```

## 介绍

`Viper`，直译为眼镜蛇，是一个针对 go 应用程序的完整的配置文件解决方案，可以处理几乎所有类型的配置需求和格式，方便管理项目的配置文件，并且具有以下特色：

- 默认值设置
- 支持格式 JSON, TOML, YAML, HCL, envfile，Java properties
- 支持实时监测和重载配置文件
- 支持环境变量中读取
- 支持远程配置系统读取配置并监测变化
- 支持读取命令行标记
- 支持缓冲区读取
- 支持显示设置值

官方称`Viper`可以满足所有应用程序配置需求，开发者只需要专注于构建应用程序，让`Viper`来负责配置管理，许多知名的项目都使用`Viper`

- [Hugo](http://gohugo.io/)
- [EMC RexRay](http://rexray.readthedocs.org/en/stable/)
- [Imgur’s Incus](https://github.com/Imgur/incus)
- [Nanobox](https://github.com/nanobox-io/nanobox)/[Nanopack](https://github.com/nanopack)
- [Docker Notary](https://github.com/docker/Notary)
- [BloomApi](https://www.bloomapi.com/)
- [doctl](https://github.com/digitalocean/doctl)
- [Clairctl](https://github.com/jgsqware/clairctl)
- [Mercure](https://mercure.rocks/)

::: danger

`Viper`并不负责配置文件的加密与解密，也就是不会对配置文件做任何的安全处理。

:::

## 读取顺序

Viper 使用如下的优先级来读取配置：

1. 显示的值设置
2. 命令行标记标记
3. 环境变量
4. 配置文件
5. 键值存储
6. 默认值

::: tip

Viper 配置中的键是不区分大小写的，后续讨论可能会将其置为可选项。

:::

## 默认值

一个良好的配置系统应当支持默认值设置，虽然有时候并不一定需要，但在没有设置配置文件的时候将会非常有用，下方是一个例子。

```go
viper.SetDefault("filePath","./dir/img/usr")
viper.SetDefault("root","123456")
```

## 读取配置文件

Viper 只需要很少的配置，就知道在哪里查找配置文件。Viper 支持 JSON、 TOML、 YAML、 HCL、 INI、 envfile 和 JavaProperties 文件。Viper 可以同时搜索多个路径，但目前单个 Viper 实例只支持单个配置文件。Viper 不会默认配置搜索路径，将默认决策留给应用程序。

下面是使用 Viper 读取配置文件的一个示例，不需要指定一个完整路径，但在使用时至少应当提供一个配置文件。

```go
func TestReadConfigFile(t *testing.T) {
   viper.SetConfigName("config.yml") // 读取名为config的配置文件，没有设置特定的文件后缀名
   viper.SetConfigType("yaml")       // 当没有设置特定的文件后缀名时，必须要指定文件类型
   viper.AddConfigPath("./")         // 在当前文件夹下寻找
   viper.AddConfigPath("$HOME/")     // 使用变量
   viper.AddConfigPath(".")          // 在工作目录下查找
   err := viper.ReadInConfig() //读取配置
   if err != nil {
      log.Fatalln(err)
   }
}
```

也可以单独处理配置文件未找到的情况

```go
if err := viper.ReadInConfig(); err != nil {
  if _, ok := err.(viper.ConfigFileNotFoundError); ok {
    // 配置文件未找到
  } else {
    // 其他类型的错误
  }
}
```

以下是访问配置的全部函数

- `Get(key string) : interface{}`
- `GetBool(key string) : bool`
- `GetFloat64(key string) : float64`
- `GetInt(key string) : int`
- `GetIntSlice(key string) : []int`
- `GetString(key string) : string`
- `GetStringMap(key string) : map[string]interface{}`
- `GetStringMapString(key string) : map[string]string`
- `GetStringSlice(key string) : []string`
- `GetTime(key string) : time.Time`
- `GetDuration(key string) : time.Duration`
- `IsSet(key string) : bool`
- `AllSettings() : map[string]interface{}`

当访问嵌套配置的时候通过`.`分隔符进行访问，例如：

```
{
  "server":{
    "database":{
      "url": "mysql...."
    }
  }
}
```

可以通过`GetString("server.database.url")`来进行嵌套访问

## 写入配置文件

Viper 提供了一系列函数来方便开发者将运行时存储的配置写入配置文件中。

```go
// WriteConfig 将配置写入原配置文件中，不存在会报错，存在的话会覆盖
func WriteConfig() error { return v.WriteConfig() }

// SafeWriteConfig 将配置安全的写入原配置文件中，不存在时会写入，存在的话则不会覆盖
func SafeWriteConfig() error { return v.SafeWriteConfig() }

// WriteConfigAs 将当前的配置写入指定文件，文件不存在时会返回错误，存在时会覆盖原有配置
func WriteConfigAs(filename string) error { return v.WriteConfigAs(filename) }

// SafeWriteConfigAs 如果指定的文件存在的话，将不会覆盖原配置文件，文件存在的话会返回错误
func SafeWriteConfigAs(filename string) error { return v.SafeWriteConfigAs(filename) }
```

下方是一些示例：

```go
func TestWritingConfig(t *testing.T) {
   viper.WriteConfig() // 将配置写入原配置文件，这些配置文件应当提前被 'viper.AddConfigPath()' 和 'viper.SetConfigName' 定义好
   viper.SafeWriteConfig()
   viper.WriteConfigAs("/path/to/my/.config")
   viper.SafeWriteConfigAs("/path/to/my/.config") // 因为指定文件存在，将会返回错误
   viper.SafeWriteConfigAs("/path/to/my/.other_config")
}
```

## 监测和重载配置

Viper 允许应用程序在运行时动态读取一个配置文件，即不需要重新启动应用程序也可以使更新的配置生效，且不会放过每一个变化的细节。只需要简单地告诉 Viper 实例去监视配置变化，或者可以提供一个函数给 viper 以便每次发生变化时运行该函数。

```go
func TestWatchingConfig(t *testing.T) {
  viper.OnConfigChange(func(e fsnotify.Event) {
    fmt.Println("配置文件已更改:", e.Name)
  })
  viper.WatchConfig()
}
```

## 别名

```go
func TestAliases(t *testing.T) {
   viper.RegisterAlias("a", "b")
   viper.Set("a", 1)
   viper.Set("b", 2) //将会覆盖掉a的配置
   fmt.Println(viper.GetInt("a"))
}
```

## 提取子结构

前面提到了通过`.`分隔符来访问嵌套配置，其实还可以通过`viper.Sub()`函数来提取子结构，其返回值是一个 Viper 实例，如下示例：

```yaml
cache:
  cache1:
    max-items: 100
    item-size: 64
  cache2:
    max-items: 200
    item-size: 80
```

```go
cache1Config := viper.Sub("cache.cache1")
if cache1Config == nil { // 如果不存在返回nil
  panic("cache1配置不存在")
}
```

## 设置嵌套分隔符

当想要指定的 key 中包含`.`时，就必须要手动指定一个其他的分隔符，以防出现误解析，例如：

```go
viper.KeyDelimiter("/") //将分隔符设置为 /
```

## 反序列化

Viper 提供了两个函数可以将配置反序列化到一个结构体或者 map，同样支持嵌套结构：

- `Unmarshal(rawVal interface{}) : error`
- `UnmarshalKey(key string, rawVal interface{}) : error`

```go
type config struct {
  Port int
  Name string
  PathMap string `mapstructure:"path_map"`
}

var C config

err := viper.Unmarshal(&C)
if err != nil {
  t.Fatalf("无法反序列化为结构体, %v", err)
}
```

## 序列化

将当前配置按照特定的格式序列化成字符串以便存入配置文件，通常情况支持 JSON, TOML, YAML, HCL, envfile，Java properties，

::: tip

Viper 同样支持自定义序列化格式，[Decoding custom formats with Viper - Márk Sági-Kazár (sagikazarmark.hu)](https://sagikazarmark.hu/blog/decoding-custom-formats-with-viper/)

:::

```go
import (
  yaml "gopkg.in/yaml.v2"
  // ...
)

func yamlStringSettings() string {
  c := viper.AllSettings()
  bs, err := yaml.Marshal(c)
  if err != nil {
    log.Fatalf("无法将配置序列化为YAML: %v", err)
  }
  return string(bs)
}
```

## 多个实例

通常情况下使用 Viper 提供的全局实例足够使用，但是由于一个实例只能映射一个配置文件，可以自行创建多个实例以实现更多的操作，例如：

```go
x := viper.New()
y := viper.New()

x.SetDefault("ContentDir", "content")
y.SetDefault("ContentDir", "foobar")

//...
```
