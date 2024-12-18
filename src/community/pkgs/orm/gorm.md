# Gorm

官方文档：[GORM - The fantastic ORM library for Golang, aims to be developer friendly.](https://gorm.io/zh_CN/)

开源仓库：[go-gorm/gorm: The fantastic ORM library for Golang, aims to be developer friendly (github.com)](https://github.com/go-gorm/gorm)

在 go 社区中，对于数据库交互这一块，有两派人，一派人更喜欢简洁的`sqlx`这一类的库，功能并不那么强大但是自己可以时时刻刻把控 sql，性能优化到极致。另一派人喜欢为了开发效率而生的 ORM，可以省去开发过程中许多不必要的麻烦。而提到 ORM，在 go 语言社区中就绝对绕不开`gorm`，它是一个非常老牌的 ORM，与之类似的还有相对比较年轻的`xorm`，`ent`等。这篇文章讲的就是关于 gorm 的内容，本文只是对它的基础入门内容做一个讲解，权当是抛砖引玉，想要了解更深的细节可以阅读官方文档，它的中文文档已经相当完善了，并且笔者也是 gorm 文档的翻译人员之一。

## 特点

- 全功能 ORM
- 关联 (拥有一个，拥有多个，属于，多对多，多态，单表继承)
- Create，Save，Update，Delete，Find 中钩子方法
- 支持 Preload、Joins 的预加载
- 事务，嵌套事务，Save Point，Rollback To to Saved Point
- Context、预编译模式、DryRun 模式
- 批量插入，FindInBatches，Find/Create with Map，使用 SQL 表达式、Context Valuer 进行 CRUD
- SQL 构建器，Upsert，锁，Optimizer/Index/Comment Hint，命名参数，子查询
- 复合主键，索引，约束
- 自动迁移
- 自定义 Logger
- 灵活的可扩展插件 API：Database Resolver（多数据库，读写分离）、Prometheus…
- 每个特性都经过了测试的重重考验
- 开发者友好

gorm 当然也有一些缺点，比如几乎所有的方法参数都是空接口类型，不去看文档恐怕根本就不知道到底该传什么参数，有时候可以传结构体，有时候可以传字符串，有时候可以传 map，有时候可以传切片，语义比较模糊，并且很多情况还是需要自己手写 SQL。

作为替代的有两个 orm 可以试一试，第一个是`aorm`，刚开源不久，它不再需要去自己手写表的字段名，大多情况下都是链式操作，基于反射实现，由于 star 数目不多，可以再观望下。第二个就是`ent`，是`facebook`开源的 orm，它同样支持链式操作，并且大多数情况下不需要自己去手写 SQL，它的设计理念上是基于图（数据结构里面的那个图），实现上基于代码生成而非反射（比较认同这个），但是文档是全英文的，有一定的上手门槛。

## 安装

安装 gorm 库

```sh
$ go get -u gorm.io/gorm
```

## 连接

gorm 目前支持以下几种数据库

- MySQL ：`"gorm.io/driver/mysql"`
- PostgreSQL： `"gorm.io/driver/postgres"`
- SQLite：`"gorm.io/driver/sqlite"`
- SQL Server：`"gorm.io/driver/sqlserver"`
- TIDB：`"gorm.io/driver/mysql"`，TIDB 兼容 mysql 协议
- ClickHouse：`"gorm.io/driver/clickhouse"`

除此之外，还有一些其它的数据库驱动是由第三方开发者提供的，比如 oracle 的驱动[CengSin/oracle](https://github.com/CengSin/oracle)。本文接下来将使用 MySQL 来进行演示，使用的什么数据库，就需要安装什么驱动，这里安装 Mysql 的 gorm 驱动。

```sh
$ go get -u gorm.io/driver/mysql
```

然后使用 dsn（data source name）连接到数据库，驱动库会自行将 dsn 解析为对应的配置

```go
package main

import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
  "log/slog"
)

func main() {
  dsn := "root:123456@tcp(192.168.48.138:3306)/hello?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn))
  if err != nil {
    slog.Error("db connect error", err)
  }
  slog.Info("db connect success")
}
```

或者手动传入配置

```go
package main

import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
  "log/slog"
)

func main() {
  db, err := gorm.Open(mysql.New(mysql.Config{}))
  if err != nil {
    slog.Error("db connect error", err)
  }
  slog.Info("db connect success")
}
```

两种方法都是等价的，看自己使用习惯。

### 连接配置

通过传入`gorm.Config`配置结构体，我们可以控制 gorm 的一些行为

```go
db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
```

下面是一些简单的解释，使用时可以根据自己的需求来进行配置。

```go
type Config struct {
  // 禁用默认事务，gorm在单个创建和更新时都会开启事务以保持数据一致性
  SkipDefaultTransaction bool
  // 自定义的命名策略
  NamingStrategy schema.Namer
  // 保存完整的关联
  FullSaveAssociations bool
  // 自定义logger
  Logger logger.Interface
  // 自定义nowfunc，用于注入CreatedAt和UpdatedAt字段
  NowFunc func() time.Time
  // 只生成sql不执行
  DryRun bool
  // 使用预编译语句
  PrepareStmt bool
  // 建立连接后，ping一下数据库
  DisableAutomaticPing bool
  // 在迁移数据库时忽略外键
  DisableForeignKeyConstraintWhenMigrating bool
  // 在迁移数据库时忽略关联引用
  IgnoreRelationshipsWhenMigrating bool
  // 禁用嵌套事务
  DisableNestedTransaction bool
  // 运行全局更新，就是不加where的update
  AllowGlobalUpdate bool
  // 对表的所有字段进行查询
  QueryFields bool
  // 批量创建的size
  CreateBatchSize int
  // 启用错误转换
  TranslateError bool

  // ClauseBuilders clause builder
  ClauseBuilders map[string]clause.ClauseBuilder
  // ConnPool db conn pool
  ConnPool ConnPool
  // Dialector database dialector
  Dialector
  // Plugins registered plugins
  Plugins map[string]Plugin

  callbacks  *callbacks
  cacheStore *sync.Map
}
```

## 模型

在 gorm 中，模型与数据库表相对应，它通常由结构体的方式展现，例如下面的结构体。

```go
type Person struct {
  Id      uint
  Name    string
  Address string
  Mom     string
  Dad     string
}
```

结构体的内部可以由基本数据类型与实现了`sql.Scanner`和 `sql.Valuer`接口的类型组成。在默认情况下，`Person`结构体所映射的表名为`perons`，其为蛇形复数风格，以下划线分隔。列名同样是以蛇形风格，比如`Id`对应列名`id`，gorm 同样也提供了一些方式来对其进行配置。

### 指定列名

通过结构体标签，我们可以对结构体字段指定列名，这样在实体映射的时候，gorm 就会使用指定的列名。

```go
type Person struct {
  Id      uint   `gorm:"column:ID;"`
  Name    string `gorm:"column:Name;"`
  Address string
  Mom     string
  Dad     string
}
```

### 指定表名

通过实现`Table`接口，就可以指定表明，它只有一个方法，就是返回表名。

```go
type Tabler interface {
  TableName() string
}
```

在实现的方法中，它返回了字符串`person`，在数据库迁移的时候，gorm 会创建名为`person`的表。

```go
type Person struct {
  Id      uint   `gorm:"column:ID;"`
  Name    string `gorm:"column:Name;"`
  Address string
  Mom     string
  Dad     string
}

func (p Person) TableName() string {
  return "person"
}
```

对于命名策略，也可以在创建连接时传入自己的策略实现来达到自定义的效果。

### 时间追踪

```go
type Person struct {
  Id      uint
  Name    string
  Address string
  Mom     string
  Dad     string

  CreatedAt sql.NullTime
  UpdatedAt sql.NullTime
}

func (p Person) TableName() string {
  return "person"
}
```

当包含`CreatedAt`或`UpdatedAt`字段时，在创建或更新记录时，如果其为零值，那么 gorm 会自动使用`time.Now()`来设置时间。

```go
db.Create(&Person{
    Name:    "jack",
    Address: "usa",
    Mom:     "lili",
    Dad:     "tom",
  })

// INSERT INTO `person` (`name`,`address`,`mom`,`dad`,`created_at`,`updated_at`) VALUES ('jack','usa','lili','tom','2023-10-25 14:43:57.16','2023-10-25 14:43:57.16')
```

gorm 也支持时间戳追踪

```go
type Person struct {
  Id      uint   `gorm:"primaryKey;"`
  Name    string `gorm:"primaryKey;"`
  Address string
  Mom     string
  Dad     string

  // nanoseconds
  CreatedAt uint64 `gorm:"autoCreateTime:nano;"`
  // milliseconds
  UpdatedAt uint64 `gorm:"autoUpdateTime;milli;"`
}
```

那么在`Create`执行时，等价于下面的 SQL

```sql
INSERT INTO `person` (`name`,`address`,`mom`,`dad`,`created_at`,`updated_at`) VALUES ('jack','usa','lili','tom',1698216540519000000,1698216540)
```

在实际情况中，如果有时间追踪的需要，我更推荐后端存储时间戳，在跨时区的情况下，处理更为简单。

### Model

gorm 提供了一个预设的`Model`结构体，它包含 ID 主键，以及两个时间追踪字段，和一个软删除记录字段。

```go
type Model struct {
    ID        uint `gorm:"primarykey"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt DeletedAt `gorm:"index"`
}
```

在使用时只需要将其嵌入到你的实体模型中即可。

```go
type Order struct {
  gorm.Model
  Name string
}
```

这样它就会自动具备`gorm.Model`所有的特性。

### 主键

在默认情况下，名为`Id`的字段就是主键，使用结构体标签可以指定主键字段

```go
type Person struct {
  Id      uint `gorm:"primaryKey;"`
  Name    string
  Address string
  Mom     string
  Dad     string

  CreatedAt sql.NullTime
  UpdatedAt sql.NullTime
}
```

多个字段形成联合主键

```go
type Person struct {
  Id      uint `gorm:"primaryKey;"`
  Name    string `gorm:"primaryKey;"`
  Address string
  Mom     string
  Dad     string

  CreatedAt sql.NullTime
  UpdatedAt sql.NullTime
}
```

### 索引

通过`index`结构体标签可以指定列索引

```go
type Person struct {
  Id      uint   `gorm:"primaryKey;"`
  Name    string `gorm:"primaryKey;"`
    Address string `gorm:"index:idx_addr,unique,sort:desc;"`
  Mom     string
  Dad     string

  // nanoseconds
  CreatedAt uint64 `gorm:"autoCreateTime:nano;"`
  // milliseconds
  UpdatedAt uint64 `gorm:"autoUpdateTime;milli;"`
}
```

在上面的结构体中，对`Address`字段建立了唯一索引。两个字段使用同一个名字的索引就会创建复合索引

```go
type Person struct {
    Id      uint   `gorm:"primaryKey;"`
    Name    string `gorm:"primaryKey;"`
    Address string `gorm:"index:idx_addr,unique;"`
    School  string `gorm:"index:idx_addr,unique;"`
    Mom     string
    Dad     string

    // nanoseconds
    CreatedAt uint64 `gorm:"autoCreateTime:nano;"`
    // milliseconds
    UpdatedAt uint64 `gorm:"autoUpdateTime;milli;"`
}
```

### 外键

在结构体中定义外键关系，是通过嵌入结构体的方式来进行的，比如

```go
type Person struct {
  Id   uint `gorm:"primaryKey;"`
  Name string

  MomId uint
  Mom   Mom `gorm:"foreignKey:MomId;"`

  DadId uint
  Dad   Dad `gorm:"foreignKey:DadId;"`
}

type Mom struct {
  Id   uint
  Name string

  Persons []Person `gorm:"foreignKey:MomId;"`
}

type Dad struct {
  Id   uint
  Name string

  Persons []Person `gorm:"foreignKey:DadId;"`
}
```

例子中，`Person`结构体有两个外键，分别引用了`Dad`和`Mom`两个结构体的主键，默认引用也就是主键。`Person`对于`Dad`和`Mom`是一对一的关系，一个人只能有一个爸爸和妈妈。`Dad`和`Mom`对于`Person`是一对多的关系，因为爸爸和妈妈可以有多个孩子。

```go
Mom   Mom `gorm:"foreignKey:MomId;"`
```

嵌入结构体的作用是为了方便指定外键和引用，在默认情况下，外键字段名格式是`被引用类型名+Id`，比如`MomId`。默认情况下是引用的主键，通过结构体标签可以指定引用某一个字段

```go
type Person struct {
  Id   uint `gorm:"primaryKey;"`
  Name string

  MomId uint
  Mom   Mom `gorm:"foreignKey:MomId;references:Sid;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

  DadId uint
  Dad   Dad `gorm:"foreignKey:DadId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type Mom struct {
  Id   uint
  Sid  uint `gorm:"uniqueIndex;"`
  Name string

  Persons []Person `gorm:"foreignKey:MomId;"`
}
```

其中`constraint:OnUpdate:CASCADE,OnDelete:SET NULL;`便是定义的外键约束。

### 钩子

一个实体模型可以自定义钩子

- 创建
- 更新
- 删除
- 查询

对应的接口分别如下

```go
// 创建前触发
type BeforeCreateInterface interface {
    BeforeCreate(*gorm.DB) error
}

// 创建后触发
type AfterCreateInterface interface {
    AfterCreate(*gorm.DB) error
}

// 更新前触发
type BeforeUpdateInterface interface {
    BeforeUpdate(*gorm.DB) error
}

// 更新后触发
type AfterUpdateInterface interface {
    AfterUpdate(*gorm.DB) error
}

// 保存前触发
type BeforeSaveInterface interface {
    BeforeSave(*gorm.DB) error
}

// 保存后触发
type AfterSaveInterface interface {
    AfterSave(*gorm.DB) error
}

// 删除前触发
type BeforeDeleteInterface interface {
    BeforeDelete(*gorm.DB) error
}

// 删除后触发
type AfterDeleteInterface interface {
    AfterDelete(*gorm.DB) error
}

// 查询后触发
type AfterFindInterface interface {
    AfterFind(*gorm.DB) error
}
```

结构体通过实现这些接口，可以自定义一些行为。

### 标签

下面是 gorm 支持的一些标签

| 标签名                   | 说明                                                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `column`                 | 指定 db 列名                                                                                                                                                                                                                                                                                                                                     |
| `type`                   | 列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：`not null`、`size`, `autoIncrement`… 像 `varbinary(8)` 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：`MEDIUMINT UNSIGNED not NULL AUTO_INCREMENT` |
| `serializer`             | 指定将数据序列化或反序列化到数据库中的序列化器, 例如: `serializer:json/gob/unixtime`                                                                                                                                                                                                                                                             |
| `size`                   | 定义列数据类型的大小或长度，例如 `size: 256`                                                                                                                                                                                                                                                                                                     |
| `primaryKey`             | 将列定义为主键                                                                                                                                                                                                                                                                                                                                   |
| `unique`                 | 将列定义为唯一键                                                                                                                                                                                                                                                                                                                                 |
| `default`                | 定义列的默认值                                                                                                                                                                                                                                                                                                                                   |
| `precision`              | 指定列的精度                                                                                                                                                                                                                                                                                                                                     |
| `scale`                  | 指定列大小                                                                                                                                                                                                                                                                                                                                       |
| `not null`               | 指定列为 NOT NULL                                                                                                                                                                                                                                                                                                                                |
| `autoIncrement`          | 指定列为自动增长                                                                                                                                                                                                                                                                                                                                 |
| `autoIncrementIncrement` | 自动步长，控制连续记录之间的间隔                                                                                                                                                                                                                                                                                                                 |
| `embedded`               | 嵌套字段                                                                                                                                                                                                                                                                                                                                         |
| `embeddedPrefix`         | 嵌入字段的列名前缀                                                                                                                                                                                                                                                                                                                               |
| `autoCreateTime`         | 创建时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoCreateTime:nano`                                                                                                                                                                                                           |
| `autoUpdateTime`         | 创建/更新时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoUpdateTime:milli`                                                                                                                                                                                                     |
| `index`                  | 根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 [索引 open in new window](https://gorm.io/zh_CN/docs/indexes.html) 获取详情                                                                                                                                                                                                         |
| `uniqueIndex`            | 与 `index` 相同，但创建的是唯一索引                                                                                                                                                                                                                                                                                                              |
| `check`                  | 创建检查约束，例如 `check:age > 13`，查看 [约束 open in new window](https://gorm.io/zh_CN/docs/constraints.html) 获取详情                                                                                                                                                                                                                        |
| `<-`                     | 设置字段写入的权限， `<-:create` 只创建、`<-:update` 只更新、`<-:false` 无写入权限、`<-` 创建和更新权限                                                                                                                                                                                                                                          |
| `->`                     | 设置字段读的权限，`->:false` 无读权限                                                                                                                                                                                                                                                                                                            |
| `-`                      | 忽略该字段，`-` 表示无读写，`-:migration` 表示无迁移权限，`-:all` 表示无读写迁移权限                                                                                                                                                                                                                                                             |
| `comment`                | 迁移时为字段添加注释                                                                                                                                                                                                                                                                                                                             |     |
| `foreignKey`             | 指定当前模型的列作为连接表的外键                                                                                                                                                                                                                                                                                                                 |
| `references`             | 指定引用表的列名，其将被映射为连接表外键                                                                                                                                                                                                                                                                                                         |
| `polymorphic`            | 指定多态类型，比如模型名                                                                                                                                                                                                                                                                                                                         |
| `polymorphicValue`       | 指定多态值、默认表名                                                                                                                                                                                                                                                                                                                             |
| `many2many`              | 指定连接表表名                                                                                                                                                                                                                                                                                                                                   |
| `joinForeignKey`         | 指定连接表的外键列名，其将被映射到当前表                                                                                                                                                                                                                                                                                                         |
| `joinReferences`         | 指定连接表的外键列名，其将被映射到引用表                                                                                                                                                                                                                                                                                                         |
| `constraint`             | 关系约束，例如：`OnUpdate`、`OnDelete`                                                                                                                                                                                                                                                                                                           |

### 迁移

`AutoMigrate`方法会帮助我们进行自动迁移，它会创建表，约束，索引，外键等等。

```go
func (db *DB) AutoMigrate(dst ...interface{}) error
```

例如

```go
type Person struct {
  Id      uint   `gorm:"primaryKey;"`
  Name    string `gorm:"type:varchar(100);uniqueIndex;"`
  Address string
}

type Order struct {
  Id   uint
  Name string
}

db.AutoMigrate(Person{}, Order{})
// CREATE TABLE `person` (`id` bigint unsigned AUTO_INCREMENT,`name` varchar(100),`address` longtext,PRIMARY KEY (`id`),UNIQUE INDEX `idx_person_name` (`name`))
// CREATE TABLE `orders` (`id` bigint unsigned AUTO_INCREMENT,`name` longtext,PRIMARY KEY (`id`))
```

或者也可以我们手动来操作，通过`Migrator`方法访问`Migrator`接口

```go
func (db *DB) Migrator() Migrator
```

它支持以下接口方法

```go
type Migrator interface {
  // AutoMigrate
  AutoMigrate(dst ...interface{}) error

  // Database
  CurrentDatabase() string
  FullDataTypeOf(*schema.Field) clause.Expr
  GetTypeAliases(databaseTypeName string) []string

  // Tables
  CreateTable(dst ...interface{}) error
  DropTable(dst ...interface{}) error
  HasTable(dst interface{}) bool
  RenameTable(oldName, newName interface{}) error
  GetTables() (tableList []string, err error)
  TableType(dst interface{}) (TableType, error)

  // Columns
  AddColumn(dst interface{}, field string) error
  DropColumn(dst interface{}, field string) error
  AlterColumn(dst interface{}, field string) error
  MigrateColumn(dst interface{}, field *schema.Field, columnType ColumnType) error
  HasColumn(dst interface{}, field string) bool
  RenameColumn(dst interface{}, oldName, field string) error
  ColumnTypes(dst interface{}) ([]ColumnType, error)

  // Views
  CreateView(name string, option ViewOption) error
  DropView(name string) error

  // Constraints
  CreateConstraint(dst interface{}, name string) error
  DropConstraint(dst interface{}, name string) error
  HasConstraint(dst interface{}, name string) bool

  // Indexes
  CreateIndex(dst interface{}, name string) error
  DropIndex(dst interface{}, name string) error
  HasIndex(dst interface{}, name string) bool
  RenameIndex(dst interface{}, oldName, newName string) error
  GetIndexes(dst interface{}) ([]Index, error)
}
```

方法列表中涉及到了数据库，表，列，视图，索引，约束多个维度，对需要自定义的用户来说可以更加精细化的操作。

### 指定表注释

在迁移时，如果想要添加表注释，可以按照如下方法来设置

```go
db.Set("gorm:table_options", " comment 'person table'").Migrator().CreateTable(Person{})
```

需要注意的是如果使用的是`AutoMigrate()`方法来进行迁移，且结构体之间具引用关系，gorm 会进行递归先创建引用表，这就会导致被引用表和引用表的注释都是重复的，所以推荐使用`CreateTable`方法来创建。

::: tip

在创建表时`CreateTable`方法需要保证被引用表比引用表先创建，否则会报错，而`AutoMigrate`方法则不需要，因为它会顺着关系引用关系递归创建。

:::

## 创建

### Create

在创建新的记录时，大多数情况都会用到`Create`方法

```go
func (db *DB) Create(value interface{}) (tx *DB)
```

现有如下的结构体

```go
type Person struct {
  Id   uint `gorm:"primaryKey;"`
  Name string
}
```

创建一条记录

```go
user := Person{
    Name: "jack",
}

// 必须传入引用
db = db.Create(&user)

// 执行过程中发生的错误
err = db.Error
// 创建的数目
affected := db.RowsAffected
```

创建完成后，gorm 会将主键写入 user 结构体中，所以这也是为什么必须得传入指针。如果传入的是一个切片，就会批量创建

```go
user := []Person{
    {Name: "jack"},
    {Name: "mike"},
    {Name: "lili"},
}

db = db.Create(&user)
```

同样的，gorm 也会将主键写入切片中。当数据量过大时，也可以使用`CreateInBatches`方法分批次创建，因为生成的`INSERT INTO table VALUES (),()`这样的 SQL 语句会变的很长，每个数据库对 SQL 长度是有限制的，所以必要的时候可以选择分批次创建。

```go
db = db.CreateInBatches(&user, 50)
```

除此之外，`Save`方法也可以创建记录，它的作用是当主键匹配时就更新记录，否则就插入。

```go
func (db *DB) Save(value interface{}) (tx *DB)
```

```go
user := []Person{
    {Name: "jack"},
    {Name: "mike"},
    {Name: "lili"},
}

db = db.Save(&user)
```

### Upsert

`Save`方法只能是匹配主键，我们可以通过构建`Clause`来完成更加自定义的 upsert。比如下面这行代码

```go
db.Clauses(clause.OnConflict{
    Columns:   []clause.Column{{Name: "name"}},
    DoNothing: false,
    DoUpdates: clause.AssignmentColumns([]string{"address"}),
    UpdateAll: false,
}).Create(&p)
```

它的作用是当字段`name`冲突后，更新字段`address`的值，不冲突的话就会创建一个新的记录。也可以在冲突的时候什么都不做

```go
db.Clauses(clause.OnConflict{
    Columns:   []clause.Column{{Name: "name"}},
    DoNothing: true,
}).Create(&p)
```

或者直接更新所有字段

```go
db.Clauses(clause.OnConflict{
    Columns:   []clause.Column{{Name: "name"}},
    UpdateAll: true,
}).Create(&p)
```

在使用 upsert 之前，记得给冲突字段添加索引。

## 查询

### First

gorm 对于查询而言，提供了相当多的方法可用，第一个就是`First`方法

```go
func (db *DB) First(dest interface{}, conds ...interface{}) (tx *DB)
```

它的作用是按照主键升序查找第一条记录，例如

```go
var person Person
result := db.First(&person)
err := result.Error
affected := result.RowsAffected
```

传入`dest`指针方便让 gorm 将查询到的数据映射到结构体中。

或者使用`Table`和`Model`方法可以指定查询表，前者接收字符串表名，后者接收实体模型。

```
db.Table("person").Find(&p)
db.Model(Person{}).Find(&p)
```

::: tip

如果传入的指针元素包含实体模型比如说结构体指针，或者是结构体切片的指针，那么就不需要手动使用指定查哪个表，这个规则适用于所有的增删改查操作。

:::

### Take

`Take`方法与`First`类似，区别就是不会根据主键排序。

```go
func (db *DB) Take(dest interface{}, conds ...interface{}) (tx *DB)
```

```go
var person Person
result := db.Take(&person)
err := result.Error
affected := result.RowsAffected
```

### Pluck

`Pluck`方法用于批量查询一个表的单列，查询的结果可以收集到一个指定类型的切片中，不一定非得是实体类型的切片。

```go
func (db *DB) Pluck(column string, dest interface{}) (tx *DB)
```

比如将所有人的地址搜集到一个字符串切片中

```go
var adds []string

// SELECT `address` FROM `person` WHERE name IN ('jack','lili')
db.Model(Person{}).Where("name IN ?", []string{"jack", "lili"}).Pluck("address", &adds)
```

其实就等同于

```go
db.Select("address").Where("name IN ?", []string{"jack", "lili"}).Find(&adds)
```

### Count

`Count`方法用于统计实体记录的数量

```go
func (db *DB) Count(count *int64) (tx *DB)
```

看一个使用示例

```go
var count int64

// SELECT count(*) FROM `person`
db.Model(Person{}).Count(&count)
```

### Find

批量查询最常用的是`Find`方法

```go
func (db *DB) Find(dest interface{}, conds ...interface{}) (tx *DB)
```

它会根据给定的条件查找出所有符合的记录

```go
// SELECT * FROM `person`
var ps []Person
db.Find(&ps)
```

### Select

gorm 在默认情况下是查询所有字段，我们可以通过`Select`方法来指定字段

```go
func (db *DB) Select(query interface{}, args ...interface{}) (tx *DB)
```

比如

```go
// SELECT `address`,`name` FROM `person` ORDER BY `person`.`id` LIMIT 1
db.Select("address", "name").First(&p)
```

等同于

```go
db.Select([]string{"address", "name"}).First(&p)
```

同时，还可以使用`Omit`方法来忽略字段

```go
func (db *DB) Omit(columns ...string) (tx *DB)
```

比如

```go
// SELECT `person`.`id`,`person`.`name` FROM `person` WHERE id IN (1,2,3,4)
db.Omit("address").Where("id IN ?", []int{1, 2, 3, 4}).Find(&ps)``
```

由`Select`和`Omit`选择或忽略的字段，在创建更新查询的时候都会起作用。

### Where

条件查询会用到`Where`方法

```go
func (db *DB) Where(query interface{}, args ...interface{}) (tx *DB)
```

下面是一个简单的示例

```go
var p Person

db.Where("id = ?", 1).First(&p)
```

在链式操作中使用多个`Where`会构建多个`AND`语句，比如

```go
// SELECT * FROM `person` WHERE id = 1 AND name = 'jack' ORDER BY `person`.`id` LIMIT 1
db.Where("id = ?", 1).Where("name = ?", "jack").First(&p)
```

或者使用`Or`方法来构建`OR`语句

```go
func (db *DB) Or(query interface{}, args ...interface{}) (tx *DB)
```

```go
// SELECT * FROM `person` WHERE id = 1 OR name = 'jack' AND address = 'usa' ORDER BY `person`.`id` LIMIT 1
db.Where("id = ?", 1).
    Or("name = ?", "jack").
    Where("address = ?", "usa").
    First(&p)
```

还有`Not`方法，都是类似的

```go
func (db *DB) Not(query interface{}, args ...interface{}) (tx *DB)
```

```go
// SELECT * FROM `person` WHERE id = 1 OR name = 'jack' AND NOT name = 'mike' AND address = 'usa' ORDER BY `person`.`id` LIMIT 1
db.Where("id = ?", 1).
    Or("name = ?", "jack").
    Not("name = ?", "mike").
    Where("address = ?", "usa").
    First(&p)
```

对于`IN`条件，可以直接在`Where`方法里面传入切片。

```go
db.Where("address IN ?", []string{"cn", "us"}).Find(&ps)
```

或者多列`IN`条件，需要用`[][]any`类型来承载参数

```go
// SELECT * FROM `person` WHERE (id, name, address) IN ((1,'jack','uk'),(2,'mike','usa'))
db.Where("(id, name, address) IN ?", [][]any{{1, "jack", "uk"}, {2, "mike", "usa"}}).Find(&ps)
```

gorm 支持 where 分组使用，就是将上述几个语句结合起来

```go
db.Where(
    db.Where("name IN ?", []string{"cn", "uk"}).Where("id IN ?", []uint{1, 2}),
  ).Or(
    db.Where("name IN ?", []string{"usa", "jp"}).Where("id IN ?", []uint{3, 4}),
  ).Find(&ps)
// SELECT * FROM `person` WHERE (name IN ('cn','uk') AND id IN (1,2)) OR (name IN ('usa','jp') AND id IN (3,4))
```

### Order

排序会用到`Order`方法

```go
func (db *DB) Order(value interface{}) (tx *DB)
```

来看个使用的例子

```go
var ps []Person

// SELECT * FROM `person` ORDER BY name ASC, id DESC
db.Order("name ASC, id DESC").Find(&ps)
```

也可以多次调用

```go
// SELECT * FROM `person` ORDER BY name ASC, id DESC,address
db.Order("name ASC, id DESC").Order("address").Find(&ps)
```

### Limit

`Limit`和`Offset`方法常常用于分页查询

```go
func (db *DB) Limit(limit int) (tx *DB)

func (db *DB) Offset(offset int) (tx *DB)
```

下面是一个简单的分页示例

```go
var (
    ps   []Person
    page = 2
    size = 10
)

// SELECT * FROM `person` LIMIT 10 OFFSET 10
db.Offset((page - 1) * size).Limit(size).Find(&ps)
```

### Group

`Group`和`Having`方法多用于分组操作

```go
func (db *DB) Group(name string) (tx *DB)

func (db *DB) Having(query interface{}, args ...interface{}) (tx *DB)
```

下面看个例子

```go
var (
    ps []Person
)

// SELECT `address` FROM `person` GROUP BY `address` HAVING address IN ('cn','us')
db.Select("address").Group("address").Having("address IN ?", []string{"cn", "us"}).Find(&ps)
```

### Distinct

`Distinct`方法多用于去重

```go
func (db *DB) Distinct(args ...interface{}) (tx *DB)
```

看一个示例

```go
// SELECT DISTINCT `name` FROM `person` WHERE address IN ('cn','us')
db.Where("address IN ?", []string{"cn", "us"}).Distinct("name").Find(&ps)
```

### 子查询

子查询就是嵌套查询，例如想要查询出所有`id`值大于平均值的人

```go
// SELECT * FROM `person` WHERE id > (SELECT AVG(id) FROM `person`
db.Where("id > (?)", db.Model(Person{}).Select("AVG(id)")).Find(&ps)
```

from 子查询

```go
// SELECT * FROM (SELECT * FROM `person` WHERE address IN ('cn','uk')) as p
db.Table("(?) as p", db.Model(Person{}).Where("address IN ?", []string{"cn", "uk"})).Find(&ps)
```

### 锁

gorm 使用`clause.Locking`子句来提供锁的支持

```go
// SELECT * FROM `person` FOR UPDATE
db.Clauses(clause.Locking{Strength: "UPDATE"}).Find(&ps)

// SELECT * FROM `person` FOR SHARE NOWAIT
db.Clauses(clause.Locking{Strength: "SHARE", Options: "NOWAIT"}).Find(&ps)
```

### 迭代

通过`Rows`方法可以获取一个迭代器

```go
func (db *DB) Rows() (*sql.Rows, error)
```

通过遍历迭代器，使用`ScanRows`方法可以将每一行的结果扫描到结构体中。

```go
rows, err := db.Model(Person{}).Rows()
if err != nil {
    return
}
defer rows.Close()

for rows.Next() {
    var p Person
    err := db.ScanRows(rows, &p)
    if err != nil {
        return
    }
}
```

## 修改

### save

在创建的时候提到过`Save`方法，它也可以用来更新记录，并且它会更新所有字段，**即便有些结构体的字段是零值**，不过如果主键匹配不到的话就会进行插入操作了。

```go
var p Person

db.First(&p)

p.Address = "poland"
// UPDATE `person` SET `name`='json',`address`='poland' WHERE `id` = 2
db.Save(&p)
```

可以看到它把除了主键以外的字段全都添到了`SET`语句中。

### update

所以大多数情况下，建议使用`Update`方法

```go
func (db *DB) Update(column string, value interface{}) (tx *DB)
```

它主要是用来更新单列字段

```go
var p Person

db.First(&p)

// UPDATE `person` SET `address`='poland' WHERE id = 2
db.Model(Person{}).Where("id = ?", p.Id).Update("address", "poland")
```

### updates

`Updates`方法用于更新多列，接收结构体和 map 作为参数，并且当结构体字段为零值时，会忽略该字段，但在 map 中不会。

```go
func (db *DB) Updates(values interface{}) (tx *DB)
```

下面是一个例子

```go
var p Person

db.First(&p)

// UPDATE `person` SET `name`='jojo',`address`='poland' WHERE `id` = 2
db.Model(p).Updates(Person{Name: "jojo", Address: "poland"})

// UPDATE `person` SET `address`='poland',`name`='jojo' WHERE `id` = 2
db.Model(p).Updates(map[string]any{"name": "jojo", "address": "poland"})
```

### SQL 表达式

有些时候，常常会会需要对字段进行一些自增或者自减等与自身进行运算的操作，一般是先查再计算然后更新，或者是使用 SQL 表达式。

```go
func Expr(expr string, args ...interface{}) clause.Expr
```

看下面的一个例子

```go
// UPDATE `person` SET `age`=age + age,`name`='jojo' WHERE `id` = 2
db.Model(p).Updates(map[string]any{"name": "jojo", "age": gorm.Expr("age + age")})

// UPDATE `person` SET `age`=age * 2 + age,`name`='jojo' WHERE `id` = 2
db.Model(p).Updates(map[string]any{"name": "jojo", "age": gorm.Expr("age * 2 + age")})
```

## 删除

在 gorm 中，删除记录会用到`Delete`方法，它可以直接传实体结构，也可以传条件。

```go
func (db *DB) Delete(value interface{}, conds ...interface{}) (tx *DB)
```

例如直接传结构体

```go
var p Person

db.First(&p)

// // DELETE FROM `person` WHERE `person`.`id` = 2
db.Delete(&p)
```

或者

```go
var p Person

db.First(&p)

// DELETE FROM `person` WHERE `person`.`id` = 2
db.Model(p).Delete(nil)
```

或者指定条件

```go
// DELETE FROM `person` WHERE id = 2
db.Model(Person{}).Where("id = ?", p.Id).Delete(nil)
```

也可以简写成

```go
var p Person

db.First(&p)

// DELETE FROM `person` WHERE id = 2
db.Delete(&Person{}, "id = ?", 2)

// DELETE FROM `person` WHERE `person`.`id` = 2
db.Delete(&Person{}, 2)
```

批量删除的话就是传入切片

```go
// DELETE FROM `person` WHERE id IN (1,2,3)
db.Delete(&Person{}, "id IN ?", []uint{1, 2, 3})
// DELETE FROM `person` WHERE `person`.`id` IN (1,2,3)
db.Delete(&Person{}, []uint{1, 2, 3})
```

### 软删除

假如你的实体模型使用了软删除，那么在删除时，默认进行更新操作，若要永久删除的话可以使用`Unscope`方法

```go
db.Unscoped().Delete(&Person{}, []uint{1, 2, 3})
```

## 关联定义

gorm 提供了表关联的交互能力，通过嵌入结构体和字段的形式来定义结构体与结构体之间的关联。

### 一对一

一对一关系是最简单的，正常情况下一个人只能有一个母亲，看下面的结构体

```go
type Person struct {
  Id      uint
  Name    string
  Address string
  Age     uint

  MomId sql.NullInt64
  Mom   Mom `gorm:"foreignKey:MomId;"`
}

type Mom struct {
  Id   uint
  Name string
}
```

`Person`结构体通过嵌入`Mom`结构体，实现了对`Mom`类型的引用，其中`Person.MomId`就是引用字段，主键`Mom.Id`就是被引用字段，这样就完成了一对一关系的关联。如何自定义外键以及引用和约束还有默认的外键规则这些已经在[外键定义](#外键)中已经讲到过，就不再赘述

::: tip

对于外键字段，推荐使用`sql`包提供的类型，因为外键默认可以为`NULL`，在使用`Create`创建记录时，如果使用普通类型，零值`0`也会被创建，不存在的外键被创建显然是不被允许的。

:::

### 一对多

下面加一个学校结构体，学校与学生是一对多的关系，一个学校有多个学校，但是一个学生只能上一个学校。

```go
type Person struct {
    Id      uint
    Name    string
    Address string
    Age     uint

    MomId sql.NullInt64
    Mom   Mom `gorm:"foreignKey:MomId;"`

    SchoolId sql.NullInt64
    School   School gorm:"foreignKey:SchoolId;"`
}

type Mom struct {
    Id   uint
    Name string
}


type School struct {
    Id   uint
    Name string

    Persons []Person `gorm:"foreignKey:SchoolId;"`
}
```

`school.Persons`是`[]person`类型，表示着可以拥有多个学生，而`Person`则必须要有包含引用`School`的外键，也就是`Person.SchoolId`。

### 多对多

一个人可以拥有很多房子，一个房子也可以住很多人，这就是一个多对多的关系。

```go
type Person struct {
  Id      uint
  Name    string
  Address string
  Age     uint

  MomId sql.NullInt64
  Mom   Mom `gorm:"foreignKey:MomId;"`

  SchoolId sql.NullInt64
  School   School `gorm:"foreignKey:SchoolId;"`

  Houses []House `gorm:"many2many:person_house;"`
}

type Mom struct {
  Id   uint
  Name string
}

type School struct {
  Id   uint
  Name string

  Persons []Person
}

type House struct {
  Id   uint
  Name string

  Persons []Person `gorm:"many2many:person_house;"`
}

type PersonHouse struct {
  PersonId sql.NullInt64
  Person   Person `gorm:"foreignKey:PersonId;"`
  HouseId  sql.NullInt64
  House    House `gorm:"foreignKey:HouseId;"`
}
```

`Person`和`House`互相持有对方的切片类型表示多对多的关系，多对多关系一般需要创建连接表，通过`many2many`来指定连接表，连接表的外键必须要指定正确。

创建完结构体后让 gorm 自动迁移到数据库中

```go
tables := []any{
    School{},
    Mom{},
    Person{},
    House{},
    PersonHouse{},
}
for _, table := range tables {
    db.Migrator().CreateTable(&table)
}
```

注意引用表与被引用表的先后创建顺序。

## 关联操作

在创建完上述三种关联关系后，接下来就是如何使用关联来进行增删改查。这主要会用到`Association`方法

```go
func (db *DB) Association(column string) *Association
```

它接收一个关联参数，它的值应该是嵌入引用结构体中的被引用类型的字段名。

```go
db.Model(&person).Association("Mom").Find(&mom)
```

比如关联查找一个人的母亲，`Association`的参数就是`Mom`，也就是`Person.Mom`字段名。

### 创建关联

```go
// 定义好数据
jenny := Mom{
    Name: "jenny",
}

mit := School{
    Name:    "MIT",
    Persons: nil,
}

h1 := House{
    Id:      0,
    Name:    "h1",
    Persons: nil,
}

h2 := House{
    Name:    "h2",
    Persons: nil,
}

jack := Person{
    Name:    "jack",
    Address: "usa",
    Age:     18,
}

mike := Person{
    Name:    "mike",
    Address: "uk",
    Age:     20,
}

// INSERT INTO `people` (`name`,`address`,`age`,`mom_id`,`school_id`) VALUES ('jack','usa',18,NULL,NULL)
db.Create(&jack)
// INSERT INTO `schools` (`name`) VALUES ('MIT')
db.Create(&mit)

// 添加Person与Mom的关联，一对一关联
// INSERT INTO `moms` (`name`) VALUES ('jenny') ON DUPLICATE KEY UPDATE `id`=`id`
// UPDATE `people` SET `mom_id`=1 WHERE `id` = 1
db.Model(&jack).Association("Mom").Append(&jenny)

// 添加school与Person的关联，一对多关联
// INSERT INTO `people` (`name`,`address`,`age`,`mom_id`,`school_id`,`id`) VALUES ('jack','usa',18,1,1,1),('mike','uk',20,NULL,1,DEFAULT) ON DUPLICATE KEY UPDATE `school_id`=VALUES(`school_id`)
db.Model(&mit).Association("Persons").Append([]Person{jack, mike})

// 添加Person与Houses的关联，多对多关联
// INSERT INTO `houses` (`name`) VALUES ('h1'),('h2') ON DUPLICATE KEY UPDATE `id`=`id`
// INSERT INTO `person_house` (`person_id`,`house_id`) VALUES (1,1),(1,2) ON DUPLICATE KEY UPDATE `person_id`=`person_id`
db.Model(&jack).Association("Houses").Append([]House{h1, h2})
```

假如所有的记录都不存在，在进行关联创建时，也会先创建记录再创建关联。

### 查找关联

下面演示如何进行查找关联。

```go
// 一对一关联查找
var person Person
var mom Mom

// SELECT * FROM `people` ORDER BY `people`.`id` LIMIT 1
db.First(&person)
// SELECT * FROM `moms` WHERE `moms`.`id` = 1
db.Model(person).Association("Mom").Find(&mom)

// 一对多关联查找
var school School
var persons []Person

// SELECT * FROM `schools` ORDER BY `schools`.`id` LIMIT 1
db.First(&school)
// SELECT * FROM `people` WHERE `people`.`school_id` = 1
db.Model(&school).Association("Persons").Find(&persons)

// 多对多关联查找
var houses []House

// SELECT `houses`.`id`,`houses`.`name` FROM `houses` JOIN `person_house` ON `person_house`.`house_id` = `houses`.`id` AND `person_house`.`person_id` IN (1,2)
db.Model(&persons).Association("Houses").Find(&houses)
```

关联查找会根据已有的数据，去引用表中查找符合条件的记录，对于多对多关系而言，gorm 会自动完成表连接这一过程。

### 更新关联

下面演示如何进行更新关联

```go
// 一对一关联更新
var jack Person

lili := Mom{
    Name: "lili",
}

// SELECT * FROM `people` WHERE name = 'jack' ORDER BY `people`.`id` LIMIT 1
db.Where("name = ?", "jack").First(&jack)

// INSERT INTO `moms` (`name`) VALUES ('lili')
db.Create(&lili)

// INSERT INTO `moms` (`name`,`id`) VALUES ('lili',2) ON DUPLICATE KEY UPDATE `id`=`id`
// UPDATE `people` SET `mom_id`=2 WHERE `id` = 1
db.Model(&jack).Association("Mom").Replace(&lili)

// 一对多关联更新

var mit School
newPerson := []Person{{Name: "bob"}, {Name: "jojo"}}
// INSERT INTO `people` (`name`,`address`,`age`,`mom_id`,`school_id`) VALUES ('bob','',0,NULL,NULL),('jojo','',0,NULL,NULL)
db.Create(&newPerson)

//  SELECT * FROM `schools` WHERE name = 'mit' ORDER BY `schools`.`id` LIMIT 1
db.Where("name = ?", "mit").First(&mit)

// INSERT INTO `people` (`name`,`address`,`age`,`mom_id`,`school_id`,`id`) VALUES ('bob','',0,NULL,1,4),('jojo','',0,NULL,1,5) ON DUPLICATE KEY UPDATE `school_id`=VALUES(`school_id`)
//  UPDATE `people` SET `school_id`=NULL WHERE `people`.`id` NOT IN (4,5) AND `people`.`school_id` = 1
db.Model(&mit).Association("Persons").Replace(newPerson)

// 多对多关联更新

// INSERT INTO `houses` (`name`) VALUES ('h3'),('h4'),('h5') ON DUPLICATE KEY UPDATE `id`=`id`
// INSERT INTO `person_house` (`person_id`,`house_id`) VALUES (1,3),(1,4),(1,5) ON DUPLICATE KEY UPDATE `person_id`=`person_id`
// DELETE FROM `person_house` WHERE `person_house`.`person_id` = 1 AND `person_house`.`house_id` NOT IN (3,4,5)
db.Model(&jack).Association("Houses").Replace([]House{{Name: "h3"}, {Name: "h4"}, {Name: "h5"}})
```

在关联更新时，如果被引用数据和引用数据都不存在，gorm 会尝试创建它们。

### 删除关联

下面演示如何删除关联

```go
// 一对一关联删除
var (
    jack Person
    lili Mom
)

// SELECT * FROM `people` WHERE name = 'jack' ORDER BY `people`.`id` LIMIT 1
db.Where("name = ?", "jack").First(&jack)

//  SELECT * FROM `moms` WHERE name = 'lili' ORDER BY `moms`.`id` LIMIT 1
db.Where("name = ?", "lili").First(&lili)

// UPDATE `people` SET `mom_id`=NULL WHERE `people`.`id` = 1 AND `people`.`mom_id` = 2
db.Model(&jack).Association("Mom").Delete(&lili)

// 一对多关联删除

var (
    mit     School
    persons []Person
)

// SELECT * FROM `schools` WHERE name = 'mit' ORDER BY `schools`.`id` LIMIT 1
db.Where("name = ?", "mit").First(&mit)
// SELECT * FROM `people` WHERE name IN ('jack','mike')
db.Where("name IN ?", []string{"jack", "mike"}).Find(&persons)

// UPDATE `people` SET `school_id`=NULL WHERE `people`.`school_id` = 1 AND `people`.`id` IN (1,2)
db.Model(&mit).Association("Persons").Delete(&persons)

// 多对多关联删除
var houses []House

// SELECT * FROM `houses` WHERE name IN ('h3','h4')
db.Where("name IN ?", []string{"h3", "h4"}).Find(&houses)

// DELETE FROM `person_house` WHERE `person_house`.`person_id` = 1 AND `person_house`.`house_id` IN (3,4)
db.Model(&jack).Association("Houses").Delete(&houses)
```

关联删除时只会删除它们之间的引用关系，并不会删除实体记录。我们还可以使用`Clear`方法来直接清空关联

```go
db.Model(&jack).Association("Houses").Clear()
```

如果想要删除对应的实体记录，可以在`Association`操作后面加上`Unscoped`操作（不会影响 many2many）

```go
db.Model(&jack).Association("Houses").Unscoped().Delete(&houses)
```

对于一对多和多对多而言，可以使用`Select`操作来删除记录

```go
var (
    mit     School
)
db.Where("name = ?", "mit").First(&mit)

db.Select("Persons").Delete(&mit)
```

### 预加载

预加载用于查询关联数据，对于具有关联关系的实体而言，它会先预先加载被关联引用的实体。之前提到的关联查询是对关联关系进行查询，预加载是直接对实体记录进行查询，包括所有的关联关系。**从语法上来说**，关联查询需要先查询指定的`[]Person`，然后再根据`[]Person` 去查询关联的`[]Mom`，预加载从语法上直接查询`[]Person`，并且也会将所有的关联关系顺带都加载了，不过实际上它们执行的 SQL 都是差不多的。下面看一个例子

```go
var users []Person

// SELECT * FROM `moms` WHERE `moms`.`id` = 1
// SELECT * FROM `people`
db.Preload("Mom").Find(&users)
```

这是一个一对一关联查询的例子，它的输出

```go
[{Id:1 Name:jack Address:usa Age:18 MomId:{Int64:1 Valid:true} Mom:{Id:1 Name:jenny} SchoolId:{Int64:1 Valid:true} School:{Id:0 Name: Persons:[]} Houses:[]} {Id:2 Name:mike Address:uk Age:20 MomId:{Int64:0 Valid:false} Mom:{Id:0 Name:} SchoolId:{Int64:1 Valid:true} School:{Id:0 Name: Persons:[]} Houses:[]}]
```

可以看到将关联的`Mom`一并查询出来了，但是没有预加载学校关系，所有`School`结构体都是零值。还可以使用`clause.Associations`表示预加载全部的关系，除了嵌套的关系。

```go
db.Preload(clause.Associations).Find(&users)
```

下面来看一个嵌套预加载的例子，它的作用是查询出所有学校关联的所有学生以及每一个学生所关联的母亲和每一个学生所拥有的房子，而且还要查询出每一个房子的主人集合，学校->学生->房子->学生。

```go
var schools []School

db.Preload("Persons").
    Preload("Persons.Mom").
    Preload("Persons.Houses").
    Preload("Persons.Houses.Persons").Find(&schools)

// 输出代码，逻辑可以忽略
for _, school := range schools {
    fmt.Println("school", school.Name)
    for _, person := range school.Persons {
        fmt.Println("person", person.Name)
        fmt.Println("mom", person.Mom.Name)
        for _, house := range person.Houses {
            var persons []string
            for _, p := range house.Persons {
                persons = append(persons, p.Name)
            }
            fmt.Println("house", house.Name, "owner", persons)
        }
        fmt.Println()
    }
}
```

输出为

```
school MIT
person jack
mom jenny
house h1 owner [jack]
house h2 owner [jack]

person mike
mom

```

可以看到输出了每一个学校的每一个学生的母亲以及它们的房子，还有房子的所有主人。

## 事务

gorm 默认开启事务，任何插入和更新操作失败后都会回滚，可以在[连接配置](#连接配置)中关闭，性能大概会提升 30%左右。gorm 中事务的使用有多种方法，下面简单介绍下。

### 自动

闭包事务，通过`Transaction`方法，传入一个闭包函数，如果函数返回值不为 nil，那么就会自动回滚。

```go
func (db *DB) Transaction(fc func(tx *DB) error, opts ...*sql.TxOptions) (err error)
```

下面看一个例子，闭包中的操作应该使用参数`tx`，而非外部的`db`。

```go
var ps []Person

db.Transaction(func(tx *gorm.DB) error {
    err := tx.Create(&ps).Error
    if err != nil {
        return err
    }

    err = tx.Create(&ps).Error
    if err != nil {
        return err
    }

    err = tx.Model(Person{}).Where("id = ?", 1).Update("name", "jack").Error
    if err != nil {
        return err
    }

    return nil
})
```

### 手动

比较推荐使用手动事务，由我们自己来控制何时回滚，何时提交。手动事务会用到下面三个方法

```go
// Begin方法用于开启事务
func (db *DB) Begin(opts ...*sql.TxOptions) *DB

// Rollback方法用于回滚事务
func (db *DB) Rollback() *DB

// Commit方法用于提交事务
func (db *DB) Commit() *DB
```

下面看一个例子，开启事务后，就应该使用`tx`来操作 orm。

```go
var ps []Person

tx := db.Begin()

err := tx.Create(&ps).Error
if err != nil {
    tx.Rollback()
    return
}

err = tx.Create(&ps).Error
if err != nil {
    tx.Rollback()
    return
}

err = tx.Model(Person{}).Where("id = ?", 1).Update("name", "jack").Error
if err != nil {
    tx.Rollback()
    return
}

tx.Commit()
```

可以指定回滚点

```go
var ps []Person

tx := db.Begin()

err := tx.Create(&ps).Error
if err != nil {
    tx.Rollback()
    return
}

tx.SavePoint("createBatch")

err = tx.Create(&ps).Error
if err != nil {
    tx.Rollback()
    return
}

err = tx.Model(Person{}).Where("id = ?", 1).Update("name", "jack").Error
if err != nil {
    tx.RollbackTo("createBatch")
    return
}

tx.Commit()
```

## 总结

如果你阅读完了上面的所有内容，并动手敲了代码，那么你就可以使用 gorm 进行对数据库进行增删改查了，gorm 除了这些操作以外，还有其它许多功能，更多细节可以前往官方文档了解。
