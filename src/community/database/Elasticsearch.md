# ElasticSearch

官方网址：[Elasticsearch：官方分布式搜索和分析引擎 | Elastic](https://www.elastic.co/cn/elasticsearch/)

Elasticsearch 是一个分布式、RESTful 风格的搜索和数据分析引擎，能够解决不断涌现出的各种用例。作为 Elastic Stack 的核心，Elasticsearch 会集中存储您的数据，让您飞快完成搜索，微调相关性，进行强大的分析，并轻松缩放规模。本文会讲解如何用 Go 来进行对 Elastisearch 的一些基本操作，比如增删改查之类的，如果你对 Elasticsearch 并不了解，请先自行学习。

## 依赖

下载官方的依赖库

```bash
$ github.com/elastic/go-elasticsearch/v7
```

如果你是 ES8，就换个版本

```bash
$ github.com/elastic/go-elasticsearch/v8
```

::: tip

本文用 ES8 来进行演示

:::

## 连接

使用函数`elasticsearch.NewClient`来建立一个新的连接

```go
func NewClient(cfg Config) (*Client, error)
```

ES8+默认使用 HTTPS 连接了，在建立 HTTPS 连接时，要么使用 CA 证书，要么用 CA 指纹，两者都是在 Elaticsearch 服务端生成的，一个例子如下

```go
client, err := elasticsearch.NewClient(elasticsearch.Config{
    Addresses:              []string{"https://192.168.153.132:9200"},
    Username:               "elastic",
    Password:               "TETJ8IY+ifbt8SLc+RRQ",
    CertificateFingerprint: "C0E9867C7D446BFF72FE46E7E9FE3455E970A8ADB0D3DF0E1472D55DB2612CD5",
})
```

`elasticsearch`提供的 Go API 基本上都是选项式函数，比如通过 ping API 测试服务是否可以用

```go
pingResp, err := client.Ping(client.Ping.WithPretty(), client.Ping.WithHuman())
if err != nil {
    panic(err)
}
fmt.Println(pingResp)
```

输出

```
[200 OK]
```

再比如，通过 Info API 查看服务状态

```go
infoResp, err := client.Info(client.Info.WithHuman())
if err != nil {
    panic(err)
}
fmt.Println(infoResp)
```

输出

```
[200 OK] {
  "name" : "db-debian12",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "OMbDIsNwTFiuyjNF9Xnpbw",
  "version" : {
    "number" : "8.15.0",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "1a77947f34deddb41af25e6f0ddb8e830159c179",
    "build_date" : "2024-08-05T10:05:34.233336849Z",
    "build_snapshot" : false,
    "lucene_version" : "9.11.1",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

::: tip

有关 ES API 的任何问题，请查阅官方文档[ES Restful API](https://www.elastic.co/guide/en/elasticsearch/reference/master/api-conventions.html)。

:::

## 索引

通过 go api 操作索引，所有关于索引操作的 API 都位于`esapi.Indices`结构体中

```go
// Indices contains the Indices APIs
type Indices struct {
    AddBlock              IndicesAddBlock
    Analyze               IndicesAnalyze
    ClearCache            IndicesClearCache
    Clone                 IndicesClone
    Close                 IndicesClose
    ...
    ...
  ValidateQuery         IndicesValidateQuery
}
```

### 创建

创建一个索引，如下所示

```json
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "age": {
        "type": "long"
      },
      "salary": {
        "type": "double"
      }
    }
  }
}
```

实际操作，就跟发 HTTP 请求一样差不多

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }
  dsl := bytes.NewBufferString(`{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  },
  "mappings": {
    "properties": {
        "name": {
          "type": "text"
        },
        "age": {
          "type": "long"
        },
        "salary": {
          "type": "double"
        }
      }
  }
}`)

  createIndices := client.Indices.Create
  resp, err := createIndices("user", createIndices.WithBody(dsl))
  if err != nil {
    panic(err)
  }
  fmt.Println(resp)
}
```

输出

```json
[200 OK] {"acknowledged":true,"shards_acknowledged":true,"index":"user"}
```

### 获取

获取若干个索引的信息

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  get := client.Indices.Get
  response, err := get([]string{"user"}, get.WithPretty(), get.WithHuman())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[200 OK] {
  "user" : {
    "aliases" : { },
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "long"
        },
        "name" : {
          "type" : "text"
        },
        "salary" : {
          "type" : "double"
        }
      }
    },
    "settings" : {
      "index" : {
        "creation_date_string" : "2024-09-23T04:35:04.528Z",
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "3",
        "provided_name" : "user",
        "creation_date" : "1727066104528",
        "number_of_replicas" : "2",
        "uuid" : "AvhhuqV2ShGkRP9z7XbdDA",
        "version" : {
          "created_string" : "8.14.4-snapshot[8512000]",
          "created" : "8512000"
        }
      }
    }
  }
}
```

### 分析

针对指定索引对文本字符串进行分析，并返回结果，文本如下

```json
{
  "analyzer": "standard",
  "text": ["this is a test", "the second text"]
}
```

代码

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  analyze := client.Indices.Analyze
  dsl := bytes.NewBufferString(`{
  "analyzer" : "standard",
  "text" : ["this is a test", "the second text"]
}`)
  response, err := analyze(analyze.WithIndex("user"), analyze.WithBody(dsl), analyze.WithPretty(), analyze.WithHuman())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[200 OK] {
  "tokens" : [
    {
      "token" : "this",
      "start_offset" : 0,
      "end_offset" : 4,
      "type" : "<ALPHANUM>",
      "position" : 0
    },
    {
      "token" : "is",
      "start_offset" : 5,
      "end_offset" : 7,
      "type" : "<ALPHANUM>",
      "position" : 1
    },
    {
      "token" : "a",
      "start_offset" : 8,
      "end_offset" : 9,
      "type" : "<ALPHANUM>",
      "position" : 2
    },
    {
      "token" : "test",
      "start_offset" : 10,
      "end_offset" : 14,
      "type" : "<ALPHANUM>",
      "position" : 3
    },
    {
      "token" : "the",
      "start_offset" : 15,
      "end_offset" : 18,
      "type" : "<ALPHANUM>",
      "position" : 104
    },
    {
      "token" : "second",
      "start_offset" : 19,
      "end_offset" : 25,
      "type" : "<ALPHANUM>",
      "position" : 105
    },
    {
      "token" : "text",
      "start_offset" : 26,
      "end_offset" : 30,
      "type" : "<ALPHANUM>",
      "position" : 106
    }
  ]
}
```

### 删除

删除若干个指定的索引

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  indicesDelete := client.Indices.Delete
  response, err := indicesDelete([]string{"user"})
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[200 OK] {"acknowledged":true}
```

在上面这些 API 中，可以看到请求体是需要自己手动序列化的，官方并没有映射成 Go 结构体，响应体也是需要自己手动处理的。这些是比较常用的 API，其他的使用起来都大差不差，没有太大区别。

## 文档

### 创建

创建一个如下的文档

```json
{
  "name": "jack",
  "age": 12,
  "salary": 5701.1
}
```

代码

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  doc := bytes.NewBufferString(`{
    "name": "jack",
    "age": 12,
    "salary": 5701.1
}`)
  create := client.Create
  response, err := create("user", "1", doc, create.WithPretty())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[201 Created] {
  "_index" : "user",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 3,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

### 获取

获取一个指定 ID 的文档

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  get := client.Get
  response, err := get("user", "1", get.WithPretty())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[200 OK] {
  "_index" : "user",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "jack",
    "age" : 12,
    "salary" : 5701.1
  }
}
```

### 更新

更新文档内容

```json
{
  "doc": {
    "name": "jack",
    "age": 35,
    "salary": 5701.1
  }
}
```

代码

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  doc := bytes.NewBufferString(`{
   "doc":  { "name": "jack",
    "age": 35,
    "salary": 5701.1
}}`)
  update := client.Update
  response, err := update("user", "1", doc, update.WithPretty())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

输出

```json
[200 OK] {
  "_index" : "user",
  "_id" : "1",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 3,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}
```

Update API 还可以支持 script 实现 upsert 等之类的操作，前往[Update API](https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-update.html)了解更多信息。

### 删除

通过 ID 删除一个指定的文档

```go
func main() {
    client, err := newClient()
    if err != nil {
       panic(err)
    }

    deleteDoc := client.Delete
    response, err := deleteDoc("user", "1", deleteDoc.WithPretty())
    if err != nil {
       panic(err)
    }
    fmt.Println(response)
}
```

输出

```json
[200 OK] {
  "_index" : "user",
  "_id" : "1",
  "_version" : 3,
  "result" : "deleted",
  "_shards" : {
    "total" : 3,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
}
```

### 搜索

ES API 最常用的就是搜索 API，下面会简单演示用法，先准备数据。

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }

  for i := range 10 {
    doc := bytes.NewBufferString(fmt.Sprintf(`{
    "name": "%s",
    "age": %d,
    "salary": %f
}`, randomName(), rand.Intn(18)+18, rand.Float64()))
    create := client.Create
    response, err := create("user", string('0'+i), doc, create.WithPretty())
    if err != nil {
      panic(err)
    }
    fmt.Println(response)
  }
}

func randomName() string {
  var b []byte
  for range 10 {
    b = append(b, byte(rand.Intn(26)+'a'))
  }
  return string(b)
}
```

搜索 API 就跟平时 HTTP API 用起来完全一样。

查询所有文档

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }
  dsl := bytes.NewBufferString(`{"query": {"match_all":{}}, "size": 1}`)
  search := client.Search
  response, err := search(search.WithBody(dsl), search.WithPretty())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

匹配某一字段

```go
func main() {
  client, err := newClient()
  if err != nil {
    panic(err)
  }
  dsl := bytes.NewBufferString(`{"query": {"term":{ "age": 22 } }, "size": 1}`)
  search := client.Search
  response, err := search(search.WithBody(dsl), search.WithPretty())
  if err != nil {
    panic(err)
  }
  fmt.Println(response)
}
```

## 小结

基础操作差不多就是这些，用起来跟 HTTP API 完全一样，把 ES 学会了，操作 Go API 完全没问题，像一些比较高级的操作比如`cluster`，`data stream`等之类的 API，就请自行探索。
