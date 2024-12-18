# Redis

Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存、分布式、可选持久性的键值对(Key-Value)存储数据库，并提供多种语言的 API，Redis 即可以当作一个 NoSQL 数据库，又可以是当作高速缓存存储，还支持简单的消息队列。

本文仅仅讲解如何使用 Go 语言驱动来操作 Redis 数据库，不会对 Redis 本身做任何讲解。

官方文档：[Golang Redis client (uptrace.dev)](https://redis.uptrace.dev/)

官方仓库：[go-redis/redis: Type-safe Redis client for Golang (github.com)](https://github.com/go-redis/redis)

## 安装

关于 Redis 的驱动有很多，本文使用的是`github.com/go-redis/redis`。

如果你使用的 Redis 版本号为 6

```
go get github.com/go-redis/redis/v8
```

如果你使用的 Redis 版本号为 7

```
go get github.com/go-redis/redis/v9
```

## 快速开始

```go
import (
   "fmt"
   "log"
   "testing"

   "github.com/go-redis/redis"
)

func TestQuickStart(t *testing.T) {
   // 创建Redis连接客户端
   redisClient := redis.NewClient(&redis.Options{
      Addr:     "192.168.48.134:6379",
      Password: "123456",
      DB:       0, // 使用默认DB
   })

   // 设置键值对，0就是永不过期
   redisClient.Set("hello", "world", 0)

   // 读取值
   result, err := redisClient.Get("hello").Result()
   if err == redis.Nil {
      fmt.Println("ket not exist")
   } else if err != nil {
      log.Panic(err)
   }
   fmt.Println(result)
}
```

## 连接配置

```go
type Options struct {
  // 网络类型 tcp 或者 unix.
  // 默认是 tcp.
  Network string
  // redis地址，格式 host:port
  Addr string

    // Dialer 创建一个新的网络连接且比Network和Addr有着更高的优先级
  // Network and Addr options.
  Dialer func() (net.Conn, error)

  // 新建一个redis连接的时候，会回调这个函数
  OnConnect func(*Conn) error

  // redis密码，redis server没有设置可以为空。
  Password string

  // redis数据库，序号从0开始，默认是0，可以不用设置
  DB int

  // redis操作失败最大重试次数，默认0。
  MaxRetries int

  // 最小重试时间间隔.
  // 默认是 8ms ; -1 表示关闭.
  MinRetryBackoff time.Duration

  // 最大重试时间间隔
  // 默认是 512ms; -1 表示关闭.
  MaxRetryBackoff time.Duration

  // redis新连接超时时间.
  // 默认是 5 秒.
  DialTimeout time.Duration

  // socket读取超时时间
  // 默认 3 秒.
  ReadTimeout time.Duration

  // socket写超时时间
  WriteTimeout time.Duration

  // redis连接池的最大连接数.
  // 默认连接池大小等于 cpu个数 * 10
  PoolSize int

  // redis连接池最小空闲连接数.
  MinIdleConns int

  // redis连接最大的存活时间，默认不会关闭过时的连接.
  MaxConnAge time.Duration

  // 当你从redis连接池获取一个连接之后，连接池最多等待这个拿出去的连接多长时间。
  // 默认是等待 ReadTimeout + 1 秒.
  PoolTimeout time.Duration

  // redis连接池多久会关闭一个空闲连接.
  // 默认是 5 分钟. -1 则表示关闭这个配置项
  IdleTimeout time.Duration

  // 多长时间检测一下，空闲连接
  // 默认是 1 分钟. -1 表示关闭空闲连接检测
  IdleCheckFrequency time.Duration

  // 只读设置，如果设置为true， 在当前节点实例上，redis只能查询缓存不能更新。
  readOnly bool

    // TLS配置
  TLSConfig *tls.Config
}
```

## 建立连接

```go
// 创建Redis连接客户端
redisClient := redis.NewClient(&redis.Options{
    Addr:     "192.168.48.134:6379",
    Password: "123456",
    DB:       0, // 使用默认DB
})
```

## 关闭连接

驱动内部维护着一个连接池，不需要操作一次就关闭一次连接。

```go
defer redisClient.Close()
```

这个 Redis 驱动几乎将所有的操作封装好了，Redis 命令和方法名一一对应，基本上只要知道 Redis 命令怎么用，驱动对应的方法都也差不多会了。

Redis 命令：[redis 命令手册](https://redis.com.cn/commands.html)

## 基本操作

#### 删除键

```go
redisClient.Set("name", "jack", 0)
fmt.Println(redisClient.Del("name").Result())
```

#### 过期时间

```go
redisClient.Set("name", "jack", 0)
// 设置过期时间
redisClient.Expire("name", time.Second*2)
fmt.Println(redisClient.Get("name").Val())
time.Sleep(time.Second * 3)
fmt.Println(redisClient.Get("name").Val())
```

#### 取消过期时间

```go
redisClient.Set("name", "jack", 2)
// 取消过期时间
redisClient.Persist("name")
time.Sleep(time.Second * 2)
fmt.Println(redisClient.Get("name"))
```

#### 查询过期时间

```go
fmt.Println(redisClient.TTL("name"))
fmt.Println(redisClient.PTTL("name"))
```

#### 重命名

```go
redisClient.Rename("name", "newName")
```

#### 查询类型

```go
redisClient.Type("name")
```

#### 扫描

```go
fmt.Println(redisClient.Scan(0, "", 4))
```

## 字符串

#### 简单存取

```go
redisClient.Set("token", "abcefghijklmn", 0)
fmt.Println(redisClient.Get("token").Val())
```

#### 批量存取

```go
redisClient.MSet("cookie", "12345", "token", "abcefg")
fmt.Println(redisClient.MGet("cookie", "token").Val())
```

#### 数字增减

```go
redisClient.Set("age", "1", 0)
// 自增
redisClient.Incr("age")
fmt.Println(redisClient.Get("age").Val())
// 自减
redisClient.Decr("age")
fmt.Println(redisClient.Get("age").Val())
```

## 哈希表

#### 读写操作

```go
// 单个设置
redisClient.HSet("map", "name", "jack")
// 批量设置
redisClient.HMSet("map", map[string]interface{}{"a": "b", "c": "d", "e": "f"})
// 单个访问
fmt.Println(redisClient.HGet("map", "a").Val())
// 批量访问
fmt.Println(redisClient.HMGet("map", "a", "b").Val())
// 获取整个map
fmt.Println(redisClient.HGetAll("map").Val())
```

输出

```
b
[b <nil>]
map[a:b c:d e:f name:jack]
```

#### 删除键

```go
// 删除map的一个字段
redisClient.HDel("map", "a")
```

#### 判断键是否存在

```go
// 判断字段是否存在
redisClient.HExists("map", "a")
```

#### 获取所有的键

```go
// 获取所有的map的键
redisClient.HKeys("map")
```

#### 获取哈希表键长度

```go
// 获取map长度
redisClient.HLen("map")
```

#### 遍历哈希表的键值对

```go
// 遍历map中的键值对
redisClient.HScan("map", 0, "", 1)
```

## 列表

#### 修改元素

```go
// 左边添加
redisClient.LPush("list", "a", "b", "c", "d", "e")
// 右边添加
redisClient.RPush("list", "g", "i", "a")
// 在参考值前面插入值
redisClient.LInsertBefore("list", "a", "aa")
// 在参考值后面插入值
redisClient.LInsertAfter("list", "a", "gg")
// 设置指定下标的元素的值
redisClient.LSet("list", 0, "head")
```

#### 访问长度

```go
// 访问列表长度
redisClient.LLen("list")
```

#### 访问元素

```go
// 左边弹出元素
redisClient.LPop("list")
// 右边弹出元素
redisClient.RPop("list")
// 访问指定下标的元素
redisClient.LIndex("list", 1)
// 访问指定范围内的元素
redisClient.LRange("list", 0, 1)
```

#### 删除元素

```go
// 删除指定元素
redisClient.LRem("list", 0, "a")
// 删除指定范围的元素
redisClient.LTrim("list", 0, 1)
// 保留指定范围的元素
redisClient.LTrim("list", 0, 1)
```

## 集合

#### 新增元素

```go
// 往一个集合里面添加元素
redisClient.SAdd("set", "a", "b", "c")
redisClient.SAdd("set2", "c", "d", "e")
```

#### 访问集合元素

```go
// 获取集合中的所有成员
redisClient.SMembers("set")
// 判断一个元素是否属于这个集合
redisClient.SIsMember("set", "a")
// 随机返回count个元素
redisClient.SRandMemberN("set", 1)
// 获取一个集合的元素个数
redisClient.SCard("set")
```

#### 集合操作

```go
// 返回给定集合的差集
redisClient.SDiff("set", "set2")
// 将给定集合的差集保存在结果集里，返回结果集的长度
redisClient.SDiffStore("store", "set", "se2")
// 返回给定集合的交集
redisClient.SInter("set", "set2")
// 将给定集合的交集保存在结果集里，返回结果集的长度
redisClient.SInterStore("store", "set", "set2")
// 返回给定集合的并集
redisClient.SUnion("set", "set2")
// 将给定集合的并集保存在结果集里，返回结果集的长度
redisClient.SUnionStore("store", "set", "store")
```

#### 删除元素

```go
// 弹出并删除该元素
redisClient.SPop("set")
// 弹出并删除N给元素
redisClient.SPopN("set", 2)
```

#### 移动元素

```go
// 从源集合移动指定元素刀目标集合
redisClient.SMove("set", "set2", "a")
```

#### 删除元素

```go
// 删除指定元素
redisClient.SRem("set", "a", "b")
```

#### 遍历

```go
// 遍历集合
redisClient.SScan("set", 0, "", 2)
```

## 有序集合

#### 加入元素

```go
// 往有序集合中加入元素
redisClient.ZAdd("ss", redis.Z{
   Score:  1,
   Member: "a",
}, redis.Z{
   Score:  2,
   Member: "b",
})
```

#### 元素排名

```go
// 返回有序集合中该元素的排名，从低到高排列
redisClient.ZRank("ss", "1")
// 返回有序集合中该元素的排名，从高到低排列
redisClient.ZRevRank("ss", "1")
```

#### 访问元素

```go
// 返回介于min和max之间的成员数量
redisClient.ZCount("ss", "1", "2")

// 返回对元素的权值
redisClient.ZScore("ss", "a")

// 返回指定区间的元素
redisClient.ZRange("ss", 1, 2)
// 返回介于min和max之间的所有成员列表
redisClient.ZRangeByScore("ss", redis.ZRangeBy{
   Min:    "1",
   Max:    "2",
   Offset: 0,
   Count:  1,
})
```

#### 修改权值

```go
// 给一个对应的元素增加相应的权值
redisClient.ZIncr("ss", redis.Z{
   Score:  2,
   Member: "b",
})
```

#### 删除元素

```go
// 删除指定元素
redisClient.ZRem("ss", "a")
// 删除指定排名区间的元素
redisClient.ZRemRangeByRank("ss", 1, 2)
// 删除权值在min和max区间的元素
redisClient.ZRemRangeByScore("ss", "1", "2")
```

## 脚本

```go
// 加载脚本，返回sha值
redisClient.ScriptLoad("return 0")
// 根据sha值执行脚本
redisClient.EvalSha("sha", []string{}, "")
// 直接执行脚本
redisClient.Eval("return 0", []string{}, "")
// 清除脚本缓存
redisClient.ScriptFlush()
// 杀死当前正在运行的脚本
redisClient.ScriptKill()
// 验证对应哈希值的脚本是否存在
redisClient.ScriptExists("")
```

## 发布订阅

```go
// 发送消息到指定频道
redisClient.Publish("channel", "message")
// 订阅指定频道
redisClient.Subscribe("channel")
// 查看订阅状态
redisClient.PubSubNumSub("channel")
```
