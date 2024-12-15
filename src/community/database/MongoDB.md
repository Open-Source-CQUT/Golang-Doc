# MongoDB

MongoDB 是一个文档数据库，它的基本数据单位就是文档，存储格式是 BSON（Binary JSON）一种类似 JSON 的结构，松散的结构可以存储不同类型的数据，相较于关系数据库更为灵活，并且使用 js 作为脚本语言，可以通过脚本来完成组合操作。本文主要介绍使用在 Go 中使用官方的 mongo 驱动操作 mongodb 数据库，并不是 mongodb 教程，如果你没有 mongo 基础，请先自行了解和学习。

mongodb 文档：[Introduction to MongoDB — MongoDB Manual](https://www.mongodb.com/docs/manual/introduction/)

## 驱动

mongodb 在 go 这方面的库比较少，早期有些社区维护的库，后面都停止维护了，不过官方的 mongo 驱动库已经完全足够使用了。

开源仓库：[mongodb/mongo-go-driver: The Official Golang driver for MongoDB (github.com)](https://github.com/mongodb/mongo-go-driver)

文档地址：[mongodb/mongo-go-driver: The Official Golang driver for MongoDB (github.com)](https://github.com/mongodb/mongo-go-driver#readme)

### 安装

下载依赖的话使用下面的地址就行了。

```sh
$ go get go.mongodb.org/mongo-driver/mongo
```

## 连接

下面是一个简单的 mongo 客户端与服务端建立连接的例子。

```go
package main

import (
   "context"
   "fmt"
   "go.mongodb.org/mongo-driver/mongo"
   "go.mongodb.org/mongo-driver/mongo/options"
   "go.mongodb.org/mongo-driver/mongo/readpref"
   "log"
)

func main() {
   ctx := context.Background()
   // 使用URI建立连接
   client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://admin:123456@192.168.48.138:27017/"))
   if err != nil {
      log.Panicln(err)
   }
   // 关闭连接
   defer client.Disconnect(ctx)
   // ping测试连接是否可用
   fmt.Println(client.Ping(ctx, readpref.Primary()))
}
```

## bson

mongodb 在 go 里面使用了以下几种类型来映射数据库中的文档，位于`bson/bson.go`

```go
// BSON文档的有序表示
type D = primitive.D

// 一对键值，BSON文档的有序表示的基本单位
type E = primitive.E

// BSON文档的无序表示
type M = primitive.M

// BSON数据的有序表示
type A = primitive.A
```

它们的实际类型如下

```go
// BSON文档的有序表示
type D []E

// 一对键值，BSON文档的有序表示的基本单位
type E struct {
  Key   string
  Value interface{}
}

// BSON文档的无序表示
type M map[string]interface{}

// BSON数据的有序表示
type A []interface{}
```

通过以上几种类型，即可以构造查询 SQL，也可以用来映射数据。

::: tip

驱动 examples 目录下有着相当多的使用示例，官方非常详细的演示了如何使用上述四种类型。

地址：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go)

:::

## 查询文档

官方查询示例：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go#L145)

首先创建 user 数据库，向集合 users 插入如下数据

```sql
> use user
> db.users.insertMany([
    {
        name: "mike",
        age: 12,

    },
    {
        name: "jenny",
        age: 14,

    },
    {
        name: "jack",
        age: 18,
        address: "usa"
    }
])
```

### 查询单个

```go
type User struct {
    Name    string `bson:"name"`
    Age     int    `bson:"age"`
    Address string `bson:"address"`
}

var user User

result := client.Database("user"). // 选中数据库
                    Collection("users").                     // 选中集合
                    FindOne(ctx, bson.D{{"address", "usa"}}) // 过滤条件

// 反序列化
if err := result.Decode(&user); err != nil {
    log.Panicln(err)
}

fmt.Printf("%+v\n", user)
```

上面那段查询代码等价于

```sql
db.users.findOne({
    address: "usa"
})
```

输出结果

```
{Name:jack Age:18 Address:usa}
```

### 查询多个

```go
type User struct {
   Name    string `bson:"name"`
   Age     int    `bson:"age"`
   Address string `bson:"address"`
}

var users []User

cursor, err := client.Database("user"). // 选中数据库
               Collection("users"). // 选中集合
               Find(ctx, bson.D{})  // 过滤条件

if err != nil {
   log.Panicln(err)
}

if err := cursor.All(ctx, &users); err != nil {
   log.Panicln(err)
}

fmt.Printf("%+v\n", users)
```

等价于

```sql
db.users.find({})
```

输出

```
[{Name:jack Age:18 Address:usa} {Name:mike Age:12 Address:} {Name:jenny Age:14 Address:}]
```

在构造查询条件的时候，也可以使用 options

```go
type User struct {
    Name    string `bson:"name"`
    Age     int    `bson:"age"`
    Address string `bson:"address"`
}

var users []User

find := options.Find()
find.SetSort(bson.M{"age": 1})
find.SetLimit(1)

cursor, err := client.Database("user"). // 选中数据库
                    Collection("users").      // 选中集合
                    Find(ctx, bson.D{}, find) // 过滤条件

if err != nil {
    log.Panicln(err)
}

if err := cursor.All(ctx, &users); err != nil {
    log.Panicln(err)
}

fmt.Printf("%+v\n", users)
```

等价于

```
db.users.find({}).sort({age:1}).limit(1)
```

输出

```
[{Name:mike Age:12 Address:}]
```

## 创建文档

官方创建实例：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go#L55)

下面是创建一个文档的例子

```go
one, err := client.Database("user").Collection("users").InsertOne(ctx, User{
    Name:    "lili",
    Age:     20,
    Address: "china",
})
if err != nil {
    log.Panicln(err)
}
fmt.Println(one.InsertedID)
```

创建成功后会返回文档的 ObjectID

```
ObjectID("64c60fa01e2548d9e4de6cf4")
```

下面是创建多个文档的例子

```go
users := []any{User{
    Name:    "john",
    Age:     10,
    Address: "usa",
}, User{
    Name:    "pop",
    Age:     30,
    Address: "uk",
}}

one, err := client.Database("user").Collection("users").InsertMany(ctx, users)
if err != nil {
    log.Panicln(err)
}
fmt.Println(one.InsertedIDs)
```

创建成功后返回返回一组 ObjectID

```
[ObjectID("64c610d5aec2618d6ca0b515") ObjectID("64c610d5aec2618d6ca0b516")]
```

上面两段代码就等价于`db.users.insertOne`和`db.users.insertMany`。

## 更新文档

官方更新示例：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go#L1357)

下面是更新单个文档的示例，将名为 lili 人更名为 mark

```go
upres, err := client.Database("user").Collection("users").UpdateOne(ctx, bson.D{
    {"name", "mark"},
},
    bson.D{
       {"$set", bson.D{
          {"name", "lili"},
       }},
    })
if err != nil {
    log.Panicln(err)
}
fmt.Printf("%+v", upres)
```

等价于

```sql
db.users.updateOne({
    name: "lili"
}, {
    $set: {
        name: "mark"
    },
})
```

输出

```
&{MatchedCount:1 ModifiedCount:1 UpsertedCount:0 UpsertedID:<nil>}
```

下面是更新多个文档的示例，将年龄为 10 的人地址更新为 cn

```go
upres, err := client.Database("user").Collection("users").UpdateMany(ctx, bson.D{
    {"age", 10},
},
    bson.D{
        {"$set", bson.D{
            {"address", "cn"},
        }},
    })
if err != nil {
    log.Panicln(err)
}
fmt.Printf("%+v", upres)
```

除了使用`Update`，mongo 还提供了`Replace`，两者的区别在于前者是更新文档字段，后者是直接替换文档。例如下面的代码，就不再需要操作符了。

```go
upres, err := client.Database("user").Collection("users").ReplaceOne(ctx, bson.D{
    {"age", 10},
},
    bson.D{
       {"address", "cn"},
    })
if err != nil {
    log.Panicln(err)
}
fmt.Printf("%+v", upres)
```

同时 mongo 还提供了`FindOneAndUpdate`和`FindOneAndReplace`来获取文档和更新文档。如下

```go
res := client.Database("user").Collection("users").FindOneAndReplace(ctx, bson.D{
    {"address", "cn"},
},
    bson.D{
       {"address", "uk"},
    })
if err := res.Err(); err != nil {
    log.Panicln(err)
}

var user User

res.Decode(&user)

fmt.Printf("%+v", user)
```

输出

```
Name: Age:0 Address:cn}
```

此操作会先查询文档再进行修改文档。

## 删除文档

官方删除示例：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go#L1638)

下面是删除一个文档的例子

```go
result, err := client.Database("user").Collection("users").DeleteOne(ctx, bson.D{
    {"name", "jack"},
})
if err != nil {
    log.Panicln(err)
}
fmt.Println(result.DeletedCount)
```

下面是删除多个文档的例子

```go
result, err := client.Database("user").Collection("users").DeleteMany(ctx, bson.D{
    {"age", "10"},
})
if err != nil {
    log.Panicln(err)
}
fmt.Println(result.DeletedCount)
```

## 聚合

官方聚合示例：[mongo-go-driver/examples/documentation_examples/examples.go at master · mongodb/mongo-go-driver (github.com)](https://github.com/mongodb/mongo-go-driver/blob/master/examples/documentation_examples/examples.go#L2119)

聚合操作会用到`mongo.Pipeline`类型，它的本质是`[]bson.D`

```go
type Pipeline []bson.D
```

```go
pipline := mongo.Pipeline{
    {
       {"$match", bson.D{
          {"address", "uk"},
       }},
    },
    {
       {"$sort", bson.D{
          {"age", 1},
       }},
    },
}
aggregate, err := client.Database("user").Collection("users").Aggregate(ctx, pipline)
if err != nil {
    log.Panicln(err)
}
var users []User
if err := aggregate.All(ctx, &users); err != nil {
    log.Panicln(err)
}
log.Println(users)
```

输出

```
[{lili 20 uk} {kak 30 uk}]
```

这段聚合操作就是匹配所有 address 为 uk 的用户，然后按照年龄排序。
