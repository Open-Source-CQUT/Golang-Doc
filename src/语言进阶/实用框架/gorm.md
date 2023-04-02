# Gorm

官方文档：[Gen Guides | GORM - The fantastic ORM library for Golang, aims to be developer friendly.](https://gorm.io/gen/index.html)

官方仓库：[go-gorm/gorm: The fantastic ORM library for Golang, aims to be developer friendly (github.com)](https://github.com/go-gorm/gorm)

一个为go语言构建的出色的ORM框架，旨在为开发者提供友好的开发环境。

::: tip

尽管GORM的官方文档已经非常完善了，但是依然有不少错误，笔者本人也是GORM中文文档的贡献者之一，此页面也仍在不断更新，后续有重写编写的计划。

:::




## 安装

```
go get -u gorm.io/gen
```



## 快速入门



### 模型

```go
type Product struct {
   gorm.Model //组合
   Code  string
   Price uint
}
```



### 链接数据库

```go
db, err := gorm.Open(mysql.Open("root:wyh246859@tcp(127.0.0.1:3306)/test"), &gorm.Config{})
if err != nil {
   fmt.Println(err)
   return
}

//自动迁移模型 如果表不存在则创建表，结构变化则适配变化
db.AutoMigrate(&Product{})
```



### 增加记录

```go
//增
db.Create(&Product{Code: "D44", Price: 100})
```



### 查询记录

```go
var product Product
//查
db.First(&product, 1)
```



### 更新记录

```go
var product Product
//查
db.First(&product, 1)
//改
db.Model(&product).Update("Price", 200)
```



### 删除记录

如果结构体包含`deleted_at`则进行逻辑删除

```go
db.Delete(&product, 1)
```



### 完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func main() {
	db, err := gorm.Open(mysql.Open("root:wyh246859@tcp(127.0.0.1:3306)/test?parseTime=True&loc=Local&charset=utf8"), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return
	}
	db.AutoMigrate(&Product{})

	//增
	db.Create(&Product{Code: "D44", Price: 100})
	var product Product
	//查
	db.First(&product, 1)
	//改
	db.Model(&product).Update("Price", 200)
	//删
	db.Delete(&product, 1)

}
```



**例如**

```go
type User struct {
   ID           uint
   Name         string
   Email        *string
   Age          uint8
   Birthday     *time.Time
   MemberNumber sql.NullString
   ActivatedAt  sql.NullTime
   CreatedAt    time.Time
   UpdatedAt    time.Time
}
```



## 数据库连接

GORM官方支持的数据库有四种`MySQL`,`PostgresSQL`,`SQLite`,`SQL server`。

### MySQL

```go
import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

func main() {
  // 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
  dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
```

::: warning

对于`Mysql`而言，想要正确的解析`time.time`类型的话，你需要在连接参数上加上`parseTime=True`，想要完整的utf8编码，需要加上`charset=utf8mb4`。[go-sql-driver/mysql: Go MySQL Driver is a MySQL driver for Go's (golang) database/sql package (github.com)](https://github.com/go-sql-driver/mysql#parameters)

:::



MySQL 驱动程序提供了 [一些高级配置](https://github.com/go-gorm/mysql) 可以在初始化过程中使用，例如：

```go
db, err := gorm.Open(mysql.New(mysql.Config{
  DSN: "gorm:gorm@tcp(127.0.0.1:3306)/gorm?charset=utf8&parseTime=True&loc=Local", // DSN = data source name
  DefaultStringSize: 256, // string 类型字段的默认长度
  DisableDatetimePrecision: true, // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
  DontSupportRenameIndex: true, // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
  DontSupportRenameColumn: true, // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
  SkipInitializeWithVersion: false, // 根据当前 MySQL 版本自动配置
}), &gorm.Config{})
```



#### 自定义驱动

GORM 允许通过 `DriverName` 选项自定义 MySQL 驱动，例如：

```go
import (
  _ "example.com/my_mysql_driver"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

db, err := gorm.Open(mysql.New(mysql.Config{
  DriverName: "my_mysql_driver",
  DSN: "gorm:gorm@tcp(localhost:9910)/gorm?charset=utf8&parseTime=True&loc=Local", // data source name, 详情参考：https://github.com/go-sql-driver/mysql#dsn-data-source-name
}), &gorm.Config{})
```



### PostgreSQL

```go
import (
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
```

我们使用 [pgx](https://github.com/jackc/pgx) 作为 postgres 的 database/sql 驱动，默认情况下，它会启用 prepared statement 缓存，你可以这样禁用它：

```go
// https://github.com/go-gorm/postgres
db, err := gorm.Open(postgres.New(postgres.Config{
  DSN: "user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai",
  PreferSimpleProtocol: true, // disables implicit prepared statement usage
}), &gorm.Config{})
```



#### 自定义驱动

GORM 允许通过 `DriverName` 选项自定义 PostgreSQL 驱动，例如：

```go
import (
  _ "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/postgres"
  "gorm.io/gorm"
)

db, err := gorm.Open(postgres.New(postgres.Config{
  DriverName: "cloudsqlpostgres",
  DSN: "host=project:region:instance user=postgres dbname=postgres password=password sslmode=disable",
})
```



#### 现有的数据库连接

GORM 允许通过一个现有的数据库连接来初始化 `*gorm.DB`

```go
import (
  "database/sql"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

sqlDB, err := sql.Open("pgx", "mydb_dsn")
gormDB, err := gorm.Open(postgres.New(postgres.Config{
  Conn: sqlDB,
}), &gorm.Config{})
```



### SQLite

```go
import (
  "gorm.io/driver/sqlite" // 基于 GGO 的 Sqlite 驱动
  // "github.com/glebarez/sqlite" // 纯 Go 实现的 SQLite 驱动, 详情参考： https://github.com/glebarez/sqlite
  "gorm.io/gorm"
)

// github.com/mattn/go-sqlite3
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
```



### SQL Server

```go
import (
  "gorm.io/driver/sqlserver"
  "gorm.io/gorm"
)

// github.com/denisenkom/go-mssqldb
dsn := "sqlserver://gorm:LoremIpsum86@localhost:9930?database=gorm"
db, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
```



### 连接池

GORM 使用 [database/sql](https://pkg.go.dev/database/sql) 维护连接池

```go
sqlDB, err := db.DB()

// SetMaxIdleConns 设置空闲连接池中连接的最大数量
sqlDB.SetMaxIdleConns(10)

// SetMaxOpenConns 设置打开数据库连接的最大数量。
sqlDB.SetMaxOpenConns(100)

// SetConnMaxLifetime 设置了连接可复用的最大时间。
sqlDB.SetConnMaxLifetime(time.Hour)
```





## 约定俗成

gorm相比于配置文件，会更优先采用约定俗成，如果开发者遵循这些约定俗成来进行开发，只需要写很少的代码。当然gorm也会允许修改这些配置。



### `ID` 作为主键

GORM uses the field with the name `ID` as the table’s primary key by default.

```go
type User struct {
  ID   string // 字段ID将会被作为默认主键
  Name string
}
```

你可以使用使用结构体标签 `primaryKey`来修改主键

```go
type Animal struct {
  ID     int64
  UUID   string `gorm:"primaryKey"` //UUID被设置为主键
  Name   string
  Age    int64
}
```



### 复数表名

GORM使用结构体名的蛇形命名作为标明，例如结构体`User`，其表名为`users`。



### TableName

开发者可以实现`Tabler`接口来更改默认表名（不支持动态表名）例如：

```go
func (User) TableName() string  {
   return "profiles";
}
```



### 动态表名

```go
func UserTable(user User) func (tx *gorm.DB) *gorm.DB {
  return func (tx *gorm.DB) *gorm.DB {
    if user.Admin {
      return tx.Table("admin_users")
    }

    return tx.Table("users")
  }
}

db.Scopes(UserTable(user)).Create(&user)
```



### 临时表名

使用`Table`方法指定临时表名：

```go
db.Table("test_users").AutoMigrate(&User{})
```



### 列名

根据约定，数据表的列名使用的是 struct 字段名的 `蛇形命名`

```
type User struct {
  ID        uint      // 列名是 `id`
  Name      string    // 列名是 `name`
  Birthday  time.Time // 列名是 `birthday`
  CreatedAt time.Time // 列名是 `created_at`
}
```

您可以使用 `column` 标签或 [`命名策略`](https://gorm.io/zh_CN/docs/conventions.html#naming_strategy) 来覆盖列名

```
type Animal struct {
  AnimalID int64     `gorm:"column:beast_id"`         // 将列名设为 `beast_id`
  Birthday time.Time `gorm:"column:day_of_the_beast"` // 将列名设为 `day_of_the_beast`
  Age      int64     `gorm:"column:age_of_the_beast"` // 将列名设为 `age_of_the_beast`
}
```



### 时间戳追踪

#### `createAt`

对于拥有`createAt`字段的模型来说，创建记录时，如果为零值，则将值设为当前时间

```go
db.Create(&user) // 将 `CreatedAt` 设为当前时间

user2 := User{Name: "jinzhu", CreatedAt: time.Now()}
db.Create(&user2) // user2 的 `CreatedAt` 不会被修改

// 想要修改该值，您可以使用 `Update`
db.Model(&user).Update("CreatedAt", time.Now())
```

你可以通过将 `autoCreateTime` 标签置为 `false` 来禁用时间戳追踪，例如：

```go
type User struct {
  CreatedAt time.Time `gorm:"autoCreateTime:false"`
}
```

#### `UpdatedAt`

对于有 `UpdatedAt` 字段的模型，更新记录时，将该字段的值设为当前时间。创建记录时，如果该字段值为零值，则将该字段的值设为当前时间

```go
db.Save(&user) // 将 `UpdatedAt` 设为当前时间

db.Model(&user).Update("name", "jinzhu") // 会将 `UpdatedAt` 设为当前时间

db.Model(&user).UpdateColumn("name", "jinzhu") // `UpdatedAt` 不会被修改

user2 := User{Name: "jinzhu", UpdatedAt: time.Now()}
db.Create(&user2) // 创建记录时，user2 的 `UpdatedAt` 不会被修改

user3 := User{Name: "jinzhu", UpdatedAt: time.Now()}
db.Save(&user3) // 更新世，user3 的 `UpdatedAt` 会修改为当前时间
```

你可以通过将 `autoUpdateTime` 标签置为 `false` 来禁用时间戳追踪，例如：

```go
type User struct {
  UpdatedAt time.Time `gorm:"autoUpdateTime:false"`
}
```



## 模型

在MVC架构中，需要有一个`Model`来进行对数据库表的映射，`gorm`所支持的模型是一个结构体，其内部可以有基本数据类型，指针，或者

`Scanner`和`Valuer`的自定义实现类型。



例如

```go
type User struct {
	Name string
    Age int
    Address string
}
```



### `Gorm.Model`

```go
// gorm.Model 的定义
type Model struct {
  ID        uint           `gorm:"primaryKey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`
}

//使用匿名字段
type User struct {
    gorm.Model
    Name string
    Age int
}
//或者`embaeded`标签
type User struct {
    Model gorm.Model `gorm:"embedded"`
    Name string
    Age int
}
//等价于
type User struct {
    ID        uint           `gorm:"primaryKey"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
    Name string
    Age int
}
```

 这是官方默认声明好了的结构体，可以将其嵌入你的结构体当中以节省代码，当然你也可以嵌入自定义结构体。



### 字段级权限控制

gorm允许使用结构体标签来进行字段级别的权限控制。

::: tip

使用 GORM Migrator 创建表时，不会创建被忽略的字段

:::

```go
type User struct {
   Name string `gorm:"<-:create"` // 允许读和创建
   Name string `gorm:"<-:update"` // 允许读和更新
   Name string `gorm:"<-"`        // 允许读和写（创建和更新）
   Name string `gorm:"<-:false"`  // 允许读，禁止写
   Name string `gorm:"->"`        // 只读（除非有自定义配置，否则禁止写）
   Name string `gorm:"->;<-:create"` // 允许读和写
   Name string `gorm:"->:false;<-:create"` // 仅创建（禁止从 db 读）
   Name string `gorm:"-"`  // 通过 struct 读写会忽略该字段
   Name string `gorm:"-:all"`        // 通过 struct 读写、迁移会忽略该字段
   Name string `gorm:"-:migration"`  // 通过 struct 迁移会忽略该字段
}
```



### 创建/更新时间追踪

GORM 约定使用 `CreatedAt`、`UpdatedAt` 追踪创建/更新时间。如果您定义了这种字段，GORM 在创建、更新时会自动填充 [当前时间](https://gorm.io/zh_CN/docs/gorm_config.html#now_func)

要使用不同名称的字段，您可以配置 `autoCreateTime`、`autoUpdateTime` 标签

如果您想要保存 UNIX（毫/纳）秒时间戳，而不是 time，您只需简单地将 `time.Time` 修改为 `int` 即可

```go
type User struct {
  CreatedAt time.Time // 在创建时，如果该字段值为零值，则使用当前时间填充
  UpdatedAt int       // 在创建时该字段值为零值或者在更新时，使用当前时间戳秒数填充
  Updated   int64 `gorm:"autoUpdateTime:nano"` // 使用时间戳填纳秒数充更新时间
  Updated   int64 `gorm:"autoUpdateTime:milli"` // 使用时间戳毫秒数填充更新时间
  Created   int64 `gorm:"autoCreateTime"`      // 使用时间戳秒数填充创建时间
}
```



### 字段标签

声明 model 时，tag 是可选的，GORM 支持以下 tag： tag 名大小写不敏感，但建议使用 `camelCase` 风格

| 标签名                   | 说明                                                         |
| :----------------------- | :----------------------------------------------------------- |
| `column`                 | 指定 db 列名                                                 |
| `type`                   | 列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：`not null`、`size`, `autoIncrement`… 像 `varbinary(8)` 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：`MEDIUMINT UNSIGNED not NULL AUTO_INCREMENT` |
| `serializer`             | 指定将数据序列化或反序列化到数据库中的序列化器, 例如: `serializer:json/gob/unixtime` |
| `size`                   | 定义列数据类型的大小或长度，例如 `size: 256`                 |
| `primaryKey`             | 将列定义为主键                                               |
| `unique`                 | 将列定义为唯一键                                             |
| `default`                | 定义列的默认值                                               |
| `precision`              | 指定列的精度                                                 |
| `scale`                  | 指定列大小                                                   |
| `not null`               | 指定列为 NOT NULL                                            |
| `autoIncrement`          | 指定列为自动增长                                             |
| `autoIncrementIncrement` | 自动步长，控制连续记录之间的间隔                             |
| `embedded`               | 嵌套字段                                                     |
| `embeddedPrefix`         | 嵌入字段的列名前缀                                           |
| `autoCreateTime`         | 创建时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoCreateTime:nano` |
| `autoUpdateTime`         | 创建/更新时追踪当前时间，对于 `int` 字段，它会追踪时间戳秒数，您可以使用 `nano`/`milli` 来追踪纳秒、毫秒时间戳，例如：`autoUpdateTime:milli` |
| `index`                  | 根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 [索引](https://gorm.io/zh_CN/docs/indexes.html) 获取详情 |
| `uniqueIndex`            | 与 `index` 相同，但创建的是唯一索引                          |
| `check`                  | 创建检查约束，例如 `check:age > 13`，查看 [约束](https://gorm.io/zh_CN/docs/constraints.html) 获取详情 |
| `<-`                     | 设置字段写入的权限， `<-:create` 只创建、`<-:update` 只更新、`<-:false` 无写入权限、`<-` 创建和更新权限 |
| `->`                     | 设置字段读的权限，`->:false` 无读权限                        |
| `-`                      | 忽略该字段，`-` 表示无读写，`-:migration` 表示无迁移权限，`-:all` 表示无读写迁移权限 |
| `comment`                | 迁移时为字段添加注释                                         |



## 查询



### 检索单个对象

GORM 提供了 `First`、`Take`、`Last` 方法，以便从数据库中检索单个对象。当查询数据库时它添加了 `LIMIT 1` 条件，且没有找到记录时，它会返回 `ErrRecordNotFound` 错误。



`First`，根据主键升序查询第一条记录，等价于`SELECT * FROM users ORDER BY id LIMIT 1;`

```go
db.First(user)
```



`Take`，获取第一条记录，等价于`SELECT * FROM users LIMIT 1;`

```go
db.Take(user)
```



`Last`，根据主键降序获取第一条记录，等价于`SELECT * FROM users ORDER BY id DESC LIMIT 1;`

```go
db.Last(user)
```



检查返回结果

```go
res := db.Last(user)
fmt.Println(res.RowsAffected) //影响的记录行数
fmt.Println(errors.Is(res.Error, gorm.ErrRecordNotFound)) //判断是否错误为gorm.ErrRecordNotFound
```

>如果你想避免`ErrRecordNotFound`错误，你可以使用`Find`，比如`db.Limit(1).Find(&user)`，`Find`方法可以接受struct和slice的数据。



`First` 和 `Last` 会根据主键排序，分别查询第一条和最后一条记录，如果model没有定义主键，即不是结构体也不是结构体指针，那么将按model的第一个字段排序。



### 主键检索

如果主键是数字类型，可以使用内联条件来检索对象，若传入字符串参数，需要特别注意SQL注入问题。

```go
db.First(&user, 10) // SELECT * FROM users WHERE id = 10;

db.First(&user, "10") // SELECT * FROM users WHERE id = 10;

db.Find(&users, []int{1,2,3}) // SELECT * FROM users WHERE id IN (1,2,3);
```

如果主键是字符串，例如UUID，则应该这样写

```go
db.First(&user, "id = ?", "1b74413f-f3b8-409f-ac47-e8c062e3472a")
// SELECT * FROM users WHERE id = "1b74413f-f3b8-409f-ac47-e8c062e3472a";
```

当目标对象主键值不为空时，将使用主键值进行检索

```go
var user = User{ID: 10}
db.First(&user)
// SELECT * FROM users WHERE id = 10;

var result User
db.Model(User{ID: 10}).First(&result)
// SELECT * FROM users WHERE id = 10;
```



### 检索全部对象

传入一个`[]User`类型的切片，会将所有查询到的结果装入这个切片中

```go
db.Find(&users)
```



### 字符串条件

```go
users := make([]User, 0)

//获取第一个匹配的记录
db.Where("name = ?", "jack").First(&users)

//读取所有不等于条件的记录
db.Where("name <> ?", "jack").Find(&users)

//获取在该范围内的记录
db.Where("name IN ?", []string{"jack", "mike"}).Find(&users)

//模糊查询
db.Where("name LIKE ?", "%jack").Find(&users)

//AND条件查询
db.Where("name = ? AND age >= ?", "jack", "0").Find(&users)

//Between
db.Where("age BETWEEN ? AND ?", 0, 20).Find(&users)
```



如果对象的主键值不为空，在查询时不会将其覆盖，而是将其作为`AND`条件查询，例如：

```go
user := &User{ID:20}
db.Where("id = ?",100).Find(user)
//等价于 SELECT * FROM users WHERE id = 20 AND id = 100 ORDER BY id ASC LIMIT 1
```



### 数据结构条件

当`Where`方法的`query`参数可以为`struct`,`map`,`slice`时，gorm会根据不同的类型做出不同的处理。

```go
//struct
db.Where(&User{Name: "jack", Age: 18}).Find(&users)

//struct 指定结构体字段查询
db.Where(&User{Name: "jack"},"Name","Age").Find(&users)
// 等价于 SELECT * FROM users WHERE name = "jack" AND age = 0;

//map
db.Where(map[string]interface{}{"name": "jack", "age": 18}).Find(&users)

//主键切片
db.Where([]int{1, 2}).Find(&users)
```

::: warning

当使用结构体进行查询时，gorm只会使用非零值的字段进行查询，当字段值为`0`，`''`，`false`，`nil`将不会用做查询条件，如果一定要用零值，可以换成map。

:::



### 内联条件

条件查询以`Where()`方法的方式内联到`First`,`Last`,`Find`方法中，直接说可能会不懂，看下面的例子。

```go
// 通过主键查询获取对象
db.First(&user, "id = ?", "string_primary_key")
// SELECT * FROM users WHERE id = 'string_primary_key';

// 普通字段查询
db.Find(&user, "name = ?", "jinzhu")
// SELECT * FROM users WHERE name = "jinzhu";

db.Find(&users, "name <> ? AND age > ?", "jinzhu", 20)
// SELECT * FROM users WHERE name <> "jinzhu" AND age > 20;

// Struct
db.Find(&users, User{Age: 20})
// SELECT * FROM users WHERE age = 20;

// Map
db.Find(&users, map[string]interface{}{"age": 20})
// SELECT * FROM users WHERE age = 20;
```



### Not条件

构建Not条件，用法跟`Where()`类似

```go
db.Not("name = ?", "jinzhu").First(&user)
// SELECT * FROM users WHERE NOT name = "jinzhu" ORDER BY id LIMIT 1;

// Not In
db.Not(map[string]interface{}{"name": []string{"jinzhu", "jinzhu 2"}}).Find(&users)
// SELECT * FROM users WHERE name NOT IN ("jinzhu", "jinzhu 2");

// Struct
db.Not(User{Name: "jinzhu", Age: 18}).First(&user)
// SELECT * FROM users WHERE name <> "jinzhu" AND age <> 18 ORDER BY id LIMIT 1;

// 不在主键切片中
db.Not([]int64{1,2,3}).First(&user)
// SELECT * FROM users WHERE id NOT IN (1,2,3) ORDER BY id LIMIT 1;
```



### Or条件

构造Or条件，用法跟`Where()`类似

```go
db.Where("role = ?", "admin").Or("role = ?", "super_admin").Find(&users)
// SELECT * FROM users WHERE role = 'admin' OR role = 'super_admin';

// Struct
db.Where("name = 'jinzhu'").Or(User{Name: "jinzhu 2", Age: 18}).Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' OR (name = 'jinzhu 2' AND age = 18);

// Map
db.Where("name = 'jinzhu'").Or(map[string]interface{}{"name": "jinzhu 2", "age": 18}).Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' OR (name = 'jinzhu 2' AND age = 18);
```



### 排序

从数据库检索记录时指定顺序

```go
db.Order("age desc, name").Find(&users)
// SELECT * FROM users ORDER BY age desc, name;

db.Order("age desc").Order("name").Find(&users)
// SELECT * FROM users ORDER BY age desc, name;

db.Clauses(clause.OrderBy{
  Expression: clause.Expr{SQL: "FIELD(id,?)", Vars: []interface{}{[]int{1, 2, 3}}, WithoutParentheses: true},
}).Find(&User{})
// SELECT * FROM users ORDER BY FIELD(id,1,2,3)
```



### Limi&Offset

```go
db.Limit(3).Find(&users)
// SELECT * FROM users LIMIT 3;

// 用-1来取消Limit条件
db.Limit(10).Find(&users1).Limit(-1).Find(&users2)
// SELECT * FROM users LIMIT 10; (users1)
// SELECT * FROM users; (users2)

db.Offset(3).Find(&users)
// SELECT * FROM users OFFSET 3;

db.Limit(10).Offset(5).Find(&users)
// SELECT * FROM users OFFSET 5 LIMIT 10;

// 
db.Offset(10).Find(&users1).Offset(-1).Find(&users2)
// SELECT * FROM users OFFSET 10; (users1)
// SELECT * FROM users; (users2)
```



### Distinct

将查询的结果去重。

```go
db.Distinct("name", "age").Order("name, age desc").Find(&results)
```



### Group&Having

```go
db.Model(&User{}).Select("name, sum(age) as total").Where("name LIKE ?", "group%").Group("name").First(&result)
// SELECT name, sum(age) as total FROM `users` WHERE name LIKE "group%" GROUP BY `name` LIMIT 1


db.Model(&User{}).Select("name, sum(age) as total").Group("name").Having("name = ?", "group").Find(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "group"
```



### Join

```go
db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result{})
// SELECT users.name, emails.email FROM `users` left join emails on emails.user_id = users.id

// 多个join
db.Joins("JOIN emails ON emails.user_id = users.id AND emails.email = ?", "jinzhu@example.org")
.Joins("JOIN credit_cards ON credit_cards.user_id = users.id").Where("credit_cards.number = ?", "411111111111").Find(&user)
```

**预加载**

```go
db.Joins("Company").Find(&users)
/*
SELECT 
	`users`.`id`,`users`.`name`,`users`.`age`,`Company`.`id` AS `Company__id`,`Company`.`name` AS `Company__name` 
FROM `users` 
LEFT JOIN 
	`companies` AS `Company` 
ON 
	`users`.`company_id` = `Company`.`id`;
*/
```

```go
db.Joins("Company", db.Where(&Company{Alive: true})).Find(&users)
/*
SELECT 
	`users`.`id`,`users`.`name`,`users`.`age`,`Company`.`id` AS `Company__id`,`Company`.`name` AS `Company__name` 
FROM `users` 
LEFT JOIN 
	`companies` AS `Company` 
ON 
	`users`.`company_id` = `Company`.`id` 
AND 
	`Company`.`alive` = true;
*/
```



### Scan

将结果扫描到结构体中，类似于`Find()`

```go
type Result struct {
  Name string
  Age  int
}

var result Result
db.Table("users").Select("name", "age").Where("name = ?", "Antonio").Scan(&result)

// 原生sql
db.Raw("SELECT name, age FROM users WHERE name = ?", "Antonio").Scan(&result)
```



## 高级查询

这一小节主要是涉及到一些GROM中常见的查询技巧

### 自动选择字段

GORM允许通过`Select`方法来选择特定的字段，如果经常使用此功能，可以定义一个较小的结构体，以实现调用API时，自动选择特定的字段。

```go
type User struct {
   ID           uint
   Name         string
   Email        string
   Age          uint8
   Birthday     time.Time
   MemberNumber sql.NullString
   ActivatedAt  sql.NullTime
   CreatedAt    time.Time
   UpdatedAt    time.Time
}

type UserSimpleInfo {
    ID uint
    Name string
}

//使用select选择字段id和name
db.Model(&User{}).Select("id","name").Where("age > ?",18).Find(&User{})

//查询时会自动选择id和name字段
db.Model(&User{}).Where("age > ?",18).Find(&UserSimpleInfo{})
```

开启`QueryFields` 模式会根据当前 model 的所有字段名称进行 select。

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  QueryFields: true,
})

db.Find(&user)
// SELECT `users`.`name`, `users`.`age`, ... FROM `users` // 带上这个选项

// Session Mode
db.Session(&gorm.Session{QueryFields: true}).Find(&user)
// SELECT `users`.`name`, `users`.`age`, ... FROM `users`
```



### 锁

GORM支持多种类型的锁

```go
db.Clauses(clause.Locking{Strength: "UPDATE"}).Find(&users)
// SELECT * FROM `users` FOR UPDATE

db.Clauses(clause.Locking{
  Strength: "SHARE",
  Table: clause.Table{Name: clause.CurrentTable},
}).Find(&users)
// SELECT * FROM `users` FOR SHARE OF `users`

db.Clauses(clause.Locking{
  Strength: "UPDATE",
  Options: "NOWAIT",
}).Find(&users)
// SELECT * FROM `users` FOR UPDATE NOWAIT
```



### 子查询

子查询可以嵌套在查询中，GORM允许在使用`*gorm.DB`对象作为参数时生成子查询。

```go
//找出年龄大于平均年龄的用户
db.Debug().Model(&User{}).Where("age > (?)", db.Model(&User{}).Select("AVG(age)")).Find(&users)
//SELECT　* FROM `users` WHERE age > (SELECT AVG(age) FROM `users`)

subQuery := db.Select("AVG(age)").Where("name LIKE ?", "name%").Table("users")
db.Select("AVG(age) as avgage").Group("name").Having("AVG(age) > (?)", subQuery).Find(&results)
// SELECT AVG(age) as avgage FROM `users` GROUP BY `name` HAVING AVG(age) > (SELECT AVG(age) FROM `users` WHERE name LIKE "name%")
```

同样的，也可以使用`Table()`方法来使用`FROM子查询`，就如下方的例子:

```go
db.Table("(?) as u", db.Model(&User{}).Select("name", "age")).Where("age = ?", 18).Find(&User{})
// SELECT * FROM (SELECT `name`,`age` FROM `users`) as u WHERE `age` = 18

subQuery1 := db.Model(&User{}).Select("name")
subQuery2 := db.Model(&Pet{}).Select("name")
db.Table("(?) as u, (?) as p", subQuery1, subQuery2).Find(&User{})
// SELECT * FROM (SELECT `name` FROM `users`) as u, (SELECT `name` FROM `pets`) as p
```



### 条件组

使用条件组可以很轻松的编写复杂的条件SQL

```go
db.Where(
    db.Where("pizza = ?", "pepperoni").Where(db.Where("size = ?", "small").Or("size = ?", "medium")),
).Or(
    db.Where("pizza = ?", "hawaiian").Where("size = ?", "xlarge"),
).Find(&Pizza{}).Statement

// SELECT * FROM `pizzas` WHERE (pizza = "pepperoni" AND (size = "small" OR size = "medium")) OR (pizza = "hawaiian" AND size = "xlarge")
```



### 多列IN

```go
db.Where("(name, age, role) IN ?", [][]interface{}{{"jinzhu", 18, "admin"}, {"jinzhu2", 19, "user"}}).Find(&users)
// SELECT * FROM users WHERE (name, age, role) IN (("jinzhu", 18, "admin"), ("jinzhu 2", 19, "user"));
```



### 命名参数

GORM一般使用是都是使用匿名参数，不过也支持命名参数，支持`sql.NamedArg`和`map[string]interface{}`和`struct`形式的命名参数。

```go
//匿名参数
db.Where("age > ? AND age < ?", 1, 18).Find(&users)

//命名参数
db.Where("age > @min AND age < @max", sql.Named("min", 1), sql.Named("max", 18)).Find(&users)

//命名参数
db.Where("age > @min AND age < @max", map[string]interface{}{"min": 1, "max": 18}).Find(&users)
```



### Map扫描

GORM允许将扫描结果写入`map[string]interface{}`或者`[]map[string]interface{}`，不过必须得指定`Model`或者`Tabel`。

```go
result := map[string]interface{}{}
db.Model(&User{}).First(&result, "id = ?", 1)

var results []map[string]interface{}
db.Table("users").Find(&results)
```



### FirstOrInit

查找第一条匹配的记录，如果没有找到的话，则根据已给定的条件初始化示例，支持`struct`和`map[string]interface{}`

```go
user := &User{}

// SELECT * FROM `users` WHERE `users`.`name` = 'mike' ORDER BY`users`.`id` LIMIT 1
db.Debug().FirstOrInit(&user, User{Name: "mike"})
//没有找到，则将条件赋值给user user -> User{Name:"mike"}

// SELECT * FROM `users` WHERE `users`.`name` = 'jack' ORDER BY`users`.`id` LIMIT 1
db.Debug().FirstOrInit(&user, User{Name: "jack"})
//找到了，则将结果扫描至user
```

此外，也可以使用`Attrs()`方法来初始化user，**并且其中的条件不会被用于查询，也不会保存至数据库**

```go
user := &User{
   ID: 1,
}

//SELECT * FROM `users` WHERE `users`.`id` = 1 ORDER BY `users`.`id` LIMIT 1
db.Debug().Attrs(User{Name: "mike"}).FirstOrInit(&user)
//没找到，user->User{ID:1,Name:"mike"}

//使用map
db.Debug().Attrs(map[string]interface{}{"name": "mike"}).FirstOrInit(&user)
```

`Assign()`方法，不管是否找到对应的记录，都会将值赋给`struct`，但这些值不会被用于查询，也不会保存至数据库。

```go
//SELECT * FROM `users` WHERE `users`.`id` = 1 ORDER BY `users`.`id` LIMIT 1
db.Debug().Assign(map[string]interface{}{"name": "mike"}).FirstOrInit(&user)

db.Debug().Assign(User{Name: "mike"}).FirstOrInit(&user)
```



### FirstOrCreate

查找第一条匹配的记录，如果没有找到的话，则创建一条新记录。

```go
user := &User{
		ID: 1,
}

//SELECT * FROM `users` WHERE `users`.`name` = 'mike' AND `users`.`id` = 1 ORDER BY `users`.`id` LIMIT 1
db.Debug().FirstOrCreate(&user, User{Name: "mike"})
//找到了，将结果扫描至user

user = &User{
		ID: 8,
}

//SELECT * FROM `users` WHERE `users`.`name` = 'jack' AND `users`.`id` = 8 ORDER BY `users`.`id` LIMIT 1
/*INSERT INTO `users` 
	(`name`,`email`,`age`,`birthday`,`member_number`,`activated_at`,`created_at`,`updated_at`,`id`) 
VALUES 
	('jack','',0,'0000-00-00 00:00:00',NULL,NULL,'2022-11-29 14:49:38.915','2022-11-29 14:49:38.915',8)
*/
db.Debug().FirstOrCreate(&user, User{Name: "jack"})
//没找到，根据条件创建一个新记录
```

同样的，`Attrs()`中的值不会被用于查询SQL，但是在创建时会被写入数据库。

```go
user := &User{
   ID: 8,
}

//SELECT * FROM `users` WHERE `users`.`name` = 'jack' AND `users`.`id` = 8 ORDER BY `users`.`id` LIMIT 1
/*INSERT INTO `users` 
	(`name`,`email`,`age`,`birthday`,`member_number`,`activated_at`,`created_at`,`updated_at`,`id`) 
VALUES 
	('jack','',0,'0000-00-00 00:00:00',NULL,NULL,'2022-11-29 14:49:38.915','2022-11-29 14:49:38.915',8)
*/
db.Debug().Attrs(User{Name: "jack"}).FirstOrCreate(&user)
//没找到，根据条件创建一个新记录
```

`Assign()`中的值，不管找没找到，都会将值赋给`struct`，并且将结果写入数据库

```go
user := &User{
   ID: 8,
}

db.Debug().Assign(User{Name: "jack"}).FirstOrCreate(&user)

//没找到的情况下执行INSERT
//SELECT * FROM `users` WHERE `users`.`name` = 'jack' AND `users`.`id` = 8 ORDER BY `users`.`id` LIMIT 1
/*INSERT INTO `users` 
	(`name`,`email`,`age`,`birthday`,`member_number`,`activated_at`,`created_at`,`updated_at`,`id`) 
VALUES 
	('jack','',0,'0000-00-00 00:00:00',NULL,NULL,'2022-11-29 14:49:38.915','2022-11-29 14:49:38.915',8)
*/

//找到的情况下执行UPDATE
//UPDATE `users` SET `name`='jack',`updated_at`='2022-11-29 14:56:18.829' WHERE `id` = 8
```



### 优化器/索引提示

该功能主要由`gorm.io/hints`提供，优化器提示允许去控制查询优化器去选择某一个查询执行计划。

```go
import "gorm.io/hints"

db.Clauses(hints.New("MAX_EXECUTION_TIME(10000)")).Find(&User{})
// SELECT * /*+ MAX_EXECUTION_TIME(10000) */ FROM `users`
```

索引提示则允许将索引提示传递给数据库以防查询程序混淆。

```go
import "gorm.io/hints"

db.Clauses(hints.UseIndex("idx_user_name")).Find(&User{})
// SELECT * FROM `users` USE INDEX (`idx_user_name`)

db.Clauses(hints.ForceIndex("idx_user_name", "idx_user_id").ForJoin()).Find(&User{})
// SELECT * FROM `users` FORCE INDEX FOR JOIN (`idx_user_name`,`idx_user_id`)"
```



### 迭代

GORM支持通过行进行行迭代

```go
rows, err := db.Model(&User{}).Rows()

defer rows.Close()

for rows.Next() {
   var user User
   db.ScanRows(rows, &user)
   fmt.Println(user)
}
```



### FindInBatches

用于批量查询并处理记录

```go
users := make([]User, 0)

//每批次处理100条记录
result := db.Where("id > ?", 1).FindInBatches(&users, 100, func(tx *gorm.DB, batch int) error {

   for _, user := range users {
      //处理找到的记录
      fmt.Println(user)
   }

   //是第几批
   fmt.Println(batch)

   //返回error会中断后续的批处理操作
   return nil
})

fmt.Println(result.RowsAffected)
```



### 钩子方法

对于查询操作，GORM 支持 `AfterFind` 钩子，查询记录后会调用

```go
func (u *User) AfterFind(tx *gorm.DB) (err error) {
  if u.Role == "" {
    u.Role = "user"
  }
  return
}
```



### Pluck

Pluck 用于从数据库查询单个列，并将结果扫描到切片。如果您想要查询多列，您应该使用 `Select` 和 [`Scan`]

```go
var ages []int64
db.Model(&users).Pluck("age", &ages)

var names []string
db.Model(&User{}).Pluck("name", &names)

db.Table("deleted_users").Pluck("name", &names)

// Distinct Pluck
db.Model(&User{}).Distinct().Pluck("Name", &names)
// SELECT DISTINCT `name` FROM `users`

// 超过一列的查询，应该使用 `Scan` 或者 `Find`，例如：
db.Select("name", "age").Scan(&users)
db.Select("name", "age").Find(&users)
```



### Scope

`Scopes` 允许你指定常用的查询，可以在调用方法时引用这些查询

```go
func AmountGreaterThan1000(db *gorm.DB) *gorm.DB {
  return db.Where("amount > ?", 1000)
}

func PaidWithCreditCard(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}

func PaidWithCod(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}

func OrderStatus(status []string) func (db *gorm.DB) *gorm.DB {
  return func (db *gorm.DB) *gorm.DB {
    return db.Where("status IN (?)", status)
  }
}

db.Scopes(AmountGreaterThan1000, PaidWithCreditCard).Find(&orders)
// 查找所有金额大于 1000 的信用卡订单

db.Scopes(AmountGreaterThan1000, PaidWithCod).Find(&orders)
// 查找所有金额大于 1000 的货到付款订单

db.Scopes(AmountGreaterThan1000, OrderStatus([]string{"paid", "shipped"})).Find(&orders)
// 查找所有金额大于 1000 且已付款或已发货的订单
```



### Count

Count 用于获取匹配的记录数

```go
var count int64
db.Model(&User{}).Where("name = ?", "jinzhu").Or("name = ?", "jinzhu 2").Count(&count)
// SELECT count(1) FROM users WHERE name = 'jinzhu' OR name = 'jinzhu 2'

db.Model(&User{}).Where("name = ?", "jinzhu").Count(&count)
// SELECT count(1) FROM users WHERE name = 'jinzhu'; (count)

db.Table("deleted_users").Count(&count)
// SELECT count(1) FROM deleted_users;

// 去重并计数
db.Model(&User{}).Distinct("name").Count(&count)
// SELECT COUNT(DISTINCT(`name`)) FROM `users`

db.Table("deleted_users").Select("count(distinct(name))").Count(&count)
// SELECT count(distinct(name)) FROM deleted_users

// 分组计数
users := []User{
  {Name: "name1"},
  {Name: "name2"},
  {Name: "name3"},
  {Name: "name3"},
}

db.Model(&User{}).Group("name").Count(&count)
count // => 3
```



## 创建

在gorm中，创建记录主要用到`Create()`方法，下面是一个简单的示例。



**例子**

```go
user := &User{
    Name:     "john",
    Email:    "78645@163.com",
    Age:      23,
    Birthday: time.Now(),
}

res := db.Create(user)

fmt.Println(res.RowsAffected)
```



### 指定字段

默认情况下，传入的结构体不为零值的字段所对应的表字段在创建记录时会赋予对应的值。倘若想要指定在创建记录时给哪些字段赋值，可以按照下面的例子来进行操作。

```go
user := &User{
   Name:     "john",
   Email:    "78645@163.com",
   Age:      23,
   Birthday: time.Now(),
}

//指定字段
res := db.Select("Name", "Age", "CreatedAt").Create(user)
// INSERT INTO `users` (`name`,`age`,`created_at`) VALUES ("john", 23, "now")


fmt.Println(res.RowsAffected)
```

当然也可以反向选择

```go
user := &User{
   Name:     "john",
   Email:    "78645@163.com",
   Age:      23,
   Birthday: time.Now(),
}

//反向选择字段
res := db.Omit("Name", "Age", "CreatedAt").Create(user)
// INSERT INTO `users` (`birthday`,`updated_at`) VALUES ("now", "now")


fmt.Println(res.RowsAffected)
```



### 字段默认值

可以通过结构体标签的形式为字段定义默认值，`gorm:"default:val"`

```go
type User struct {
  ID   int64
  Name string `gorm:"default:galeone"`
  Age  int64  `gorm:"default:18"`
}
```

插入记录到数据库时，**默认值会被用于填充值为零值的字段**。

::: tip

**注意** 对于声明了默认值的字段，像 `0`、`''`、`false` 等零值是不会保存到数据库。您需要使用指针类型或 Scanner/Valuer 来避免这个问题，例如：

```go
type User struct {
  gorm.Model
  Name string
  Age  *int           `gorm:"default:18"` // 当该字段为0时，会正常保存到数据库。
  Active sql.NullBool `gorm:"default:true"`
}
```

:::

::: tip

**注意** 若要数据库有默认、虚拟/生成的值，你必须为字段设置 `default` 标签。若要在迁移时跳过默认值定义，你可以使用 `default:(-)`，例如：

```go
type User struct {
  ID        string `gorm:"default:uuid_generate_v3()"` // 数据库的内置函数
  FirstName string
  LastName  string
  Age       uint8
  FullName  string `gorm:"->;type:GENERATED ALWAYS AS (concat(firstname,' ',lastname));default:(-);"` //migrate时将会跳过此字段。
}
```

:::



### 批量创建

如果想要插入大量的记录，可以将一个`slice`传递给`Create()`方法。GORM将生成一条SQL语句来插入所有数据，并填回主键的值，钩子方法也会被调用。

```go
users := []User{{Name: "devaid"}, {Name: "jenny"}, {Name: "lily"}}

db.Create(&users)

fmt.Println(users)
```

或者可以实用`CreateInBatches()`方法，分批次插入数据，并且可以指定每一批次的数量。

```go
users := []User{{Name: "devaid"}, {Name: "jenny"}, {Name: "lily"}, {Name: "devaid"}, {Name: "jenny"}, {Name: "lily"}, {Name: "devaid"}, {Name: "jenny"}, {Name: "lily"}, {Name: "devaid"}, {Name: "jenny"}, {Name: "lily"}}

//每一批次插入5条记录
db.CreateInBatches(&users, 5)

fmt.Println(users)
```

::: tip

**注意** 使用`CreateBatchSize` 选项初始化 GORM 时，所有的创建& 关联 `INSERT` 都将遵循该选项

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  CreateBatchSize: 1000,
})

db := db.Session(&gorm.Session{CreateBatchSize: 1000})

users = [5000]User{{Name: "jinzhu", Pets: []Pet{pet1, pet2, pet3}}...}

db.Create(&users)
// INSERT INTO users xxx (5 batches)
// INSERT INTO pets xxx (15 batches)
```

:::



### Map创建

`Create()`方法的参数可以是`map`，例如下方的例子。

```go
db.Model(&User{}).Create(map[string]interface{}{"Name": "map", "age": 12})
```

::: tip

根据 map 创建记录时，association 不会被调用，且主键也不会自动填充

:::



### 钩子方法

GORM允许用户定义的钩子方法有`BeforeSave`, `BeforeCreate`, `AfterSave`, `AfterCreate`，创建记录时将调用这些钩子方法。

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
  u.UUID = uuid.New()

    if u.Role == "admin" {
        return errors.New("invalid role")
    }
    return
}
```

如果想跳过钩子方法，可以实用`SkipHooks`会话模式。

```go
DB.Session(&gorm.Session{SkipHooks: true}).Create(&user)

DB.Session(&gorm.Session{SkipHooks: true}).Create(&users)

DB.Session(&gorm.Session{SkipHooks: true}).CreateInBatches(users, 100)
```



### 关联创建

在创建关联数据时，如果关联值是非零值，这些关联会被`upsert`，并且它们的钩子方法也会被调用。

```go
type CreditCard struct {
  gorm.Model
  Number   string
  UserID   uint
}

type User struct {
  gorm.Model
  Name       string
  CreditCard CreditCard
}

db.Create(&User{
  Name: "jinzhu",
  CreditCard: CreditCard{Number: "411111111111"}
})
// INSERT INTO `users` ...
// INSERT INTO `credit_cards` ...
```

不过也可以跳过关联保存

```go
db.Omit("CreditCard").Create(&user)

// 跳过所有关联
db.Omit(clause.Associations).Create(&user)
```



### Upsert 及冲突

::: tip

阅读以下的代码需要有`gorm/clause`的相关知识。 

:::

upsert是update和insert的合体，这里暂时不对其具体的语义进行探讨，简单对其做一个定义，基本功能为：**存在时更新，不存在时插入**，简单的解释就是，当某种条件成立时使用update，条件不成立时使用insert，一般情况下都是将唯一标识当作判别标准，GORM为不同的数据库提供了兼容的Upsert支持。



`id`冲突时，什么都不做

```go
db.Clauses(clause.OnConflict{DoNothing: true}).Create(&user)
```

-

`id`冲突时，将其更新为默认值，即在冲突时，将`role`字段修改为默认值`”user“`，忽略掉`model`中的字段值。

```go
db.Clauses(clause.OnConflict{
  Columns:   []clause.Column{{Name: "id"}},
  DoUpdates: clause.Assignments(map[string]interface{}{"role": "user"}),
}).Create(&users)
//等价于
// MERGE INTO "users" USING *** WHEN NOT MATCHED THEN INSERT *** WHEN MATCHED THEN UPDATE SET ***; SQL Server
// INSERT INTO `users` *** ON DUPLICATE KEY UPDATE ***; MySQL
```



`id`冲突时，将其更新为默认值，且使用SQL内置的函数或语句。

```go
db.Clauses(clause.OnConflict{
  Columns:   []clause.Column{{Name: "id"}},
  DoUpdates: clause.Assignments(map[string]interface{}{"count": gorm.Expr("GREATEST(count, VALUES(count))")}),
}).Create(&users)
// INSERT INTO `users` *** ON DUPLICATE KEY UPDATE `count`=GREATEST(count, VALUES(count));
```



`id`冲突时。将指定列更新为新的值，即将`model`中指定字段的值更新至表中。

```go
db.Clauses(clause.OnConflict{
  Columns:   []clause.Column{{Name: "id"}},
  DoUpdates: clause.AssignmentColumns([]string{"name", "age"}),
}).Create(&users)
// INSERT INTO `users` *** ON DUPLICATE KEY UPDATE `name`=VALUES(name),`age=VALUES(age);
```



`id`冲突时，将所有的列更新为新的值

```go
db.Clauses(clause.OnConflict{
  UpdateAll: true,
}).Create(&users)
// INSERT INTO `users` *** ON DUPLICATE KEY UPDATE ***;
```



## 更新



### 所有字段

`Save()`方法会更新所有的字段，即使字段是零值。

```go
db.First(&user)

user.Name = "jinzhu 2"
user.Age = 100
db.Save(&user)
// UPDATE users SET name='jinzhu 2', age=100, birthday='2016-01-01', updated_at = '2013-11-17 21:34:10' WHERE id=111;
```



### 单列

更新单列主要用到`Update()`方法，使用`Update()`方法需要提供一些相应的条件，否则将会抛出错误`ErrMissingWhereClause` 。当使用`Model()`时并且主键值不为空，主键值将会被采用构建更新条件。

```go
user := &User{
		ID:       1,
		Name:     "john",
		Email:    "78645@163.com",
		Age:      23,
		Birthday: time.Now(),
	}

//默认使用主键条件
db.Model(&user).Update("name", "mike")
//UPDATE users SET name = 'mike' WHERE id = 1

//自行构建条件
db.Model(&User{}).Where("age = ?", 23).Update("name", "mike")
//UPDATE users SET name = 'mike' WHERE age = 23

//两者都有
db.Model(&user).Where("age = 23", 1).Update("name", "mike")
//UPDATE users SET name = 'mike' WHERE id = 1 AND age = 23 
```



### 多列

更新多列时主要用到`Updates()`方法，其参数支持`struct`和`map[string]interface{}`，当使用`struct`更新时，默认情况话只会更新非零值字段。

```go
//根据struct更新，只会更新非零值字段
db.Model(&user).Updates(User{Name: "mike", Age: 18})

//根据map更新属性
db.Model(&user).Updates(map[string]interface{}{"name": "mike", "age": 18, "email": "11@qq.com"})
```



### 选定字段

如果想要选定一些字段，可以使用`Select()`，如果想要排除一些字段可以使用`Omit()`

```go
db.Model(&user).Select("name", "age").Updates(User{Name: "mike", Age: 18})

db.Model(&user).Omit("name").Updates(User{Name: "mike", Age: 18})

db.Model(&user).Select("name", "age", "email").Updates(map[string]interface{}{"name": "mike", "age": 18, "email": "11@qq.com"})

db.Model(&user).Omit("email").Updates(map[string]interface{}{"name": "mike", "age": 18, "email": "11@qq.com"})

//选中所有字段进行更新
db.Model(&user).Select("*").Updates(User{Name: "mike", Age: 18})

//更新除了name所有的字段
db.Model(&user).Select("*").Omit("name").Updates(User{Name: "mike", Age: 18})
```



### 批量更新

当没有指定`Model()`的主键值时，GORM就会执行批量更新

```go
//将所有年龄18岁以上的人名字更新为mike
db.Model(&User{}).Where("age > 18").Updates(&User{Name: "mike"})

//将id为1，2，3的人更新为mike
db.Model(&User{}).Where("id IN",[]int{1,2,3}).Updates(map[string]interface{}{"name":"mike"})
```



### 阻止全局更新

GORM在对于没有任何条件限制下的批量更新操作是不会去执行的，并返回错误`ErrMissingWhereClause`，如果想要这么做的话，使用原生SQL，或者开启`AllowGlobalUpdate`模式。

```go
db.Exec("UPDATE users SET name = ?", "jinzhu")
// UPDATE users SET name = "jinzhu"

db.Session(&gorm.Session{AllowGlobalUpdate: true}).Model(&User{}).Update("name", "jinzhu")
// UPDATE users SET `name` = "jinzhu"
```



### 使用SQL表达式

使用SQL表达式可以灵活且安全的使用SQL内部的一些函数与操作。

```go
//将所有年龄18岁以上的人名字更新为mike
db.Model(&User{}).Where("age > 18").Update("age", gorm.Expr("age + ?", 10))
//UPDATE users SET age = age + 10 WHERE age > 10

db.Model(&User{}).Where("age > 18").Updates(map[string]interface{}{"age": gorm.Expr("age + ?", 10)})
//UPDATE users SET age = age + 10 WHERE age > 10
```



### 子查询更新

可以将子查询得到的结果作为更新列的值

```go
db.Model(&user).Update("company_name", db.Model(&Company{}).Select("name").Where("companies.id = users.company_id"))
// UPDATE "users" SET "company_name" = (SELECT name FROM companies WHERE companies.id = users.company_id);

db.Table("users as u").Where("name = ?", "jinzhu").Updates(map[string]interface{}{"company_name": db.Table("companies as c").Select("name").Where("c.id = u.company_id")})
```



### 更新钩子方法

GORM 支持的 hook 点包括：`BeforeSave`, `BeforeUpdate`, `AfterSave`, `AfterUpdate`. 更新记录时将调用这些方法

```go
func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
    if u.Role == "admin" {
        return errors.New("admin user not allowed to update")
    }
    return
}
```



### 禁止Hook与时间更新

倘若想在更新时跳过`Hook`方法且不追踪时间更新，可以使用`UpdateColumn()`替代`Update()`，`UpdateColumns()`替代`Updates()`

```go
// 更新单个列
db.Model(&user).UpdateColumn("name", "hello")
// UPDATE users SET name='hello' WHERE id = 111;

// 更新多个列
db.Model(&user).UpdateColumns(User{Name: "hello", Age: 18})
// UPDATE users SET name='hello', age=18 WHERE id = 111;

// 更新选中的列
db.Model(&user).Select("name", "age").UpdateColumns(User{Name: "hello", Age: 0})
// UPDATE users SET name='hello', age=0 WHERE id = 111;
```



### 返回更新的数据

返回被修改的数据，仅适用于支持 Returning 的数据库，例如：

```go
// 返回所有列
var users []User
DB.Model(&users).Clauses(clause.Returning{}).Where("role = ?", "admin").Update("salary", gorm.Expr("salary * ?", 2))
// UPDATE `users` SET `salary`=salary * 2,`updated_at`="2021-10-28 17:37:23.19" WHERE role = "admin" RETURNING *
// users => []User{{ID: 1, Name: "jinzhu", Role: "admin", Salary: 100}, {ID: 2, Name: "jinzhu.2", Role: "admin", Salary: 1000}}

// 返回指定的列
DB.Model(&users).Clauses(clause.Returning{Columns: []clause.Column{{Name: "name"}, {Name: "salary"}}}).Where("role = ?", "admin").Update("salary", gorm.Expr("salary * ?", 2))
// UPDATE `users` SET `salary`=salary * 2,`updated_at`="2021-10-28 17:37:23.19" WHERE role = "admin" RETURNING `name`, `salary`
// users => []User{{ID: 0, Name: "jinzhu", Role: "", Salary: 100}, {ID: 0, Name: "jinzhu.2", Role: "", Salary: 1000}}

```



### 检查字段值是否有更新

GORM提供了`Changed() `方法，一般在`BeforeUpdate(0)`钩子方法里面使用，它会返回字段是否有变化的布尔值，它仅仅是检查`Model`对象的字段值是否与`update()`,`updates()`的值是否相等，如果有值有变化，且字段未被忽略，则返回`true`。

```go
func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
  // 如果 Role 字段有变更
    if tx.Statement.Changed("Role") {
    return errors.New("role not allowed to change")
    }

  // 如果 Name 或 Role 字段有变更
   if tx.Statement.Changed("Name", "Admin") { 
     tx.Statement.SetColumn("Age", 18)
   }

  // 如果任意字段有变更
    if tx.Statement.Changed() {
        tx.Statement.SetColumn("RefreshedAt", time.Now())
    }
    return nil
}

db.Model(&User{ID: 1, Name: "jinzhu"}).Updates(map[string]interface{"name": "jinzhu2"})
// Changed("Name") => true

db.Model(&User{ID: 1, Name: "jinzhu"}).Updates(map[string]interface{"name": "jinzhu"})
// Changed("Name") => false, 因为 `Name` 没有变更

db.Model(&User{ID: 1, Name: "jinzhu"}).Select("Admin").Updates(map[string]interface{
  "name": "jinzhu2", "admin": false,
})
// Changed("Name") => false, 因为 `Name` 没有被 Select 选中并更新

db.Model(&User{ID: 1, Name: "jinzhu"}).Updates(User{Name: "jinzhu2"})
// Changed("Name") => true

db.Model(&User{ID: 1, Name: "jinzhu"}).Updates(User{Name: "jinzhu"})
// Changed("Name") => false, 因为 `Name` 没有变更

db.Model(&User{ID: 1, Name: "jinzhu"}).Select("Admin").Updates(User{Name: "jinzhu2"})
// Changed("Name") => false, 因为 `Name` 没有被 Select 选中并更新
```



### 在更新前修改值

使用`gorm.DB.Statement.SetCloumn()`方法设置字段值

```go
func (user *User) BeforeSave(tx *gorm.DB) (err error) {
  //在更新密码前将值加密
  if pw, err := bcrypt.GenerateFromPassword(user.Password, 0); err == nil {
    tx.Statement.SetColumn("EncryptedPassword", pw)
  }
  
  //如果code字段改变就将年龄+20
  if tx.Statement.Changed("Code") {
    user.Age += 20
    tx.Statement.SetColumn("Age", user.Age)
  }
}

db.Model(&user).Update("Name", "jinzhu")
```



## 删除

GORM中主要使用`db.Delete()`方法来执行删除操作。



### 单个删除

删除一条记录时，需要指定额外的条件或者指定主键，否则GORM将不会执行并且返回错误`ErrMissingWhereClause`。

```go
user := &User{
   ID:       1,
   Name:     "john",
   Email:    "78645@163.com",
   Age:      23,
   Birthday: time.Now(),
}

//带主键值的对象
db.Delete(&user)

//带额外条件的删除
db.Where("age = ?",18).Delete(&user)
```



### 根据主键删除

```go
//DELETE FROM users WHERE id = 10
db.Model(&User{}).Delete("id = ?", 10)

//DELETE FROM users WHERE id = 10
db.Model(&User{}).Delete(&User{}, 10)

//DELETE FROM users WHERE id = 10
db.Delete(&User{}, 10)
```



### 批量删除

如果指定的值不包括主属性，那么GORM会执行批量删除，它将删除所有匹配的记录

```go
//DELETE FROM users WHERE id age > 18
db.Model(&User{}).Delete("age > ?", 18)

//DELETE FROM users WHERE id age > 18
db.Where("age > ?", 18).Delete(&User{})
```



### 阻止全局删除

在没有任何条件限制的情况下的批量删除将不会被执行，且会返回错误`ErrMissingWhereClause`。如果一定要这么做可以使用原生SQL或者启用`AllowGlobalUpdate `模式

```go
db.Exec("DELETE FROM users")
// DELETE FROM users

db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&User{})
// DELETE FROM users
```



### 返回删除行的数据

返回被删除的数据，仅适用于支持 Returning 的数据库

```go
// 返回所有列
var users []User
DB.Clauses(clause.Returning{}).Where("role = ?", "admin").Delete(&users)
// DELETE FROM `users` WHERE role = "admin" RETURNING *
// users => []User{{ID: 1, Name: "jinzhu", Role: "admin", Salary: 100}, {ID: 2, Name: "jinzhu.2", Role: "admin", Salary: 1000}}

// 返回指定的列
DB.Clauses(clause.Returning{Columns: []clause.Column{{Name: "name"}, {Name: "salary"}}}).Where("role = ?", "admin").Delete(&users)
// DELETE FROM `users` WHERE role = "admin" RETURNING `name`, `salary`
// users => []User{{ID: 0, Name: "jinzhu", Role: "", Salary: 100}, {ID: 0, Name: "jinzhu.2", Role: "", Salary: 1000}}
```



### 软删除

如果模型中包含了一个`gorm.deletedAt`字段(`gorm.Model`已经包含了该字段)，它将自动获得软删除的能力。拥有软删除能力的模型在调用`Delete()`时，数据库中的记录并不会被真正的删除，但是GORM会将`DeleteAt`置为删除时间，并且不再能够通过正常的查询方法查找到该记录。

```go
// user 的 ID 是 `111`
db.Delete(&user)
// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE id = 111;

// 批量删除
db.Where("age = ?", 20).Delete(&User{})
// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE age = 20;

// 在查询时会忽略被软删除的记录
db.Where("age = 20").Find(&user)
// SELECT * FROM users WHERE age = 20 AND deleted_at IS NULL;
```

倘若不像引入`gorm.Model`，也可以按照如下的例子启用软删除特性

```go
type User struct {
  ID      int
  Deleted gorm.DeletedAt
  Name    string
}
```

GORM中可以使用`Unscoped() `来查找到被软删除的记录

```go
db.Unscoped().Where("age = 20").Find(&users)
// SELECT * FROM users WHERE age = 20;
```

同样的也可以使用`Unscoped()`来永久删除记录

```go
db.Unscoped().Delete(&order)
// DELETE FROM orders WHERE id=10;
```



### 软删除标志

在默认情况下，GORM使用`*time.time`作为`DeleteAt`字段的类型，此外，通过`gorm.io/plugin/soft_delet`插件还可以支持其他的类型。



#### Unix时间戳

使用unix时间戳作为 `delete flag`

```go
import "gorm.io/plugin/soft_delete"

type User struct {
  ID        uint
  Name      string
  DeletedAt soft_delete.DeletedAt //默认使用unix时间戳
    // DeletedAt soft_delete.DeletedAt `gorm:"softDelete:nano"` 或者指定纳秒
    // DeletedAt soft_delete.DeletedAt `gorm:"softDelete:milli"` 或者指定微秒
}

// 查询
SELECT * FROM users WHERE deleted_at = 0;

// 删除
UPDATE users SET deleted_at = /* 当前时间戳 */ WHERE ID = 1;
```



#### 1/0 Flag

```go
import "gorm.io/plugin/soft_delete"

type User struct {
  ID    uint
  Name  string
  IsDel soft_delete.DeletedAt `gorm:"softDelete:flag"`
}

// 查询
SELECT * FROM users WHERE is_del = 0;

// 删除
UPDATE users SET is_del = 1 WHERE ID = 1;
```



#### 混合使用

混合模式可以使用 `0`, `1` 或 unix 秒来标识数据是否已被删除，并同时保存删除的时间。

```go
type User struct {
  ID        uint
  Name      string
  DeletedAt time.Time
  IsDel     soft_delete.DeletedAt `gorm:"softDelete:flag,DeletedAtField:DeletedAt"` // 使用 `1` `0` 标识
  // IsDel     soft_delete.DeletedAt `gorm:"softDelete:,DeletedAtField:DeletedAt"` // 使用 `unix second` 标识
  // IsDel     soft_delete.DeletedAt `gorm:"softDelete:nano,DeletedAtField:DeletedAt"` // 使用 `unix nano second` 标识
}

// 查询
SELECT * FROM users WHERE is_del = 0;

// 删除
UPDATE users SET is_del = 1, deleted_at = /* current unix second */ WHERE ID = 1;
```



## SQL构建器



### 原生SQL

原生查询SQL和`Scan`

```go
users := make([]User, 0)

db.Raw("SELECT id, name, age FROM users WHERE name = ?", "mike").Scan(&users)

var name string
db.Raw("SELECT name FROM users WHERE id = ?", 1).Scan(&name)
```

`Exec`原生SQL

```go
db.Exec("DROP TABLE users")
db.Exec("UPDATE orders SET shipped_at = ? WHERE id IN ?", time.Now(), []int64{1, 2, 3})

// Exec with SQL Expression
db.Exec("UPDATE users SET money = ? WHERE name = ?", gorm.Expr("money * ? + ?", 10000, 1), "jinzhu")
```



### 命名参数

GORM 支持 [`sql.NamedArg`](https://tip.golang.org/pkg/database/sql/#NamedArg)、`map[string]interface{}{}` 或 struct 形式的命名参数，例如：

```go
db.Where("name1 = @name OR name2 = @name", sql.Named("name", "jinzhu")).Find(&user)
// SELECT * FROM `users` WHERE name1 = "jinzhu" OR name2 = "jinzhu"

db.Where("name1 = @name OR name2 = @name", map[string]interface{}{"name": "jinzhu2"}).First(&result3)
// SELECT * FROM `users` WHERE name1 = "jinzhu2" OR name2 = "jinzhu2" ORDER BY `users`.`id` LIMIT 1

// 原生 SQL 及命名参数
db.Raw("SELECT * FROM users WHERE name1 = @name OR name2 = @name2 OR name3 = @name",
   sql.Named("name", "jinzhu1"), sql.Named("name2", "jinzhu2")).Find(&user)
// SELECT * FROM users WHERE name1 = "jinzhu1" OR name2 = "jinzhu2" OR name3 = "jinzhu1"

db.Exec("UPDATE users SET name1 = @name, name2 = @name2, name3 = @name",
   sql.Named("name", "jinzhunew"), sql.Named("name2", "jinzhunew2"))
// UPDATE users SET name1 = "jinzhunew", name2 = "jinzhunew2", name3 = "jinzhunew"

db.Raw("SELECT * FROM users WHERE (name1 = @name AND name3 = @name) AND name2 = @name2",
   map[string]interface{}{"name": "jinzhu", "name2": "jinzhu2"}).Find(&user)
// SELECT * FROM users WHERE (name1 = "jinzhu" AND name3 = "jinzhu") AND name2 = "jinzhu2"

type NamedArgument struct {
    Name string
    Name2 string
}

db.Raw("SELECT * FROM users WHERE (name1 = @Name AND name3 = @Name) AND name2 = @Name2",
     NamedArgument{Name: "jinzhu", Name2: "jinzhu2"}).Find(&user)
// SELECT * FROM users WHERE (name1 = "jinzhu" AND name3 = "jinzhu") AND name2 = "jinzhu2"
```



### DryRun模式

在不执行的情况下生成SQL及其参数，可以用于测试生成的SQL

```go
statement := db.Session(&gorm.Session{DryRun: true}).Raw("SELECT name FROM users WHERE id = ?", 1).Statement
stmt.SQL.String() //=> SELECT name FROM users WHERE id = ?
stmt.Vars         //=> [1]
```



### TOSQL

返回生成的 `SQL` 但不执行。

GORM使用 database/sql 的参数占位符来构建 SQL 语句，它会自动转义参数以避免 SQL 注入，但GORM不保证生成 SQL 的安全，请只用于调试。

```go
sql := DB.ToSQL(func(tx *gorm.DB) *gorm.DB {
  return tx.Model(&User{}).Where("id = ?", 100).Limit(10).Order("age desc").Find(&[]User{})
})
sql //=> SELECT * FROM "users" WHERE id = 100 AND "users"."deleted_at" IS NULL ORDER BY age desc LIMIT 10
```



### Row & Rows

获取 `*sql.Row`结果，即只有一行数据

```go
// 使用 GORM API 构建 SQL
row := db.Table("users").Where("name = ?", "jinzhu").Select("name", "age").Row()
row.Scan(&name, &age)

// 使用原生 SQL
row := db.Raw("select name, age, email from users where name = ?", "jinzhu").Row()
row.Scan(&name, &age, &email)
```

获取 `*sql.Rows` 结果，有多行数据

```go
// 使用 GORM API 构建 SQL
rows, err := db.Model(&User{}).Where("name = ?", "jinzhu").Select("name, age, email").Rows()
defer rows.Close()
for rows.Next() {
  rows.Scan(&name, &age, &email)

  // 业务逻辑...
}

// 原生 SQL
rows, err := db.Raw("select name, age, email from users where name = ?", "jinzhu").Rows()
defer rows.Close()
for rows.Next() {
  rows.Scan(&name, &age, &email)

  // 业务逻辑...
}
```

将 `sql.Rows` 扫描至 model，使用 `ScanRows` 将一行记录扫描至 struct，例如：

```go
rows, err := db.Model(&User{}).Where("name = ?", "jinzhu").Select("name, age, email").Rows() // (*sql.Rows, error)
defer rows.Close()

var user User
for rows.Next() {
  // ScanRows 将一行扫描至 user
  db.ScanRows(rows, &user)

  // 业务逻辑...
}
```



### 连接

在一条 tcp DB 连接中运行多条 SQL (不是事务)

```go
db.Connection(func(tx *gorm.DB) error {
  tx.Exec("SET my.role = ?", "admin")

  tx.First(&User{})
})
```



### 子句(Clause)

GORM内部使用`SQL builder`生成SQL。对于每个操作，GORM都会创建一个`*gorm.Statement`对象，所有的`GORM API`都是在为`Statement`添加，修改子句。最后，GORM会根据这些子句生成SQL。

例如，当使用`First`进行查询时，它会在`Statement`中添加以下子句。

子句示例 [示例](https://github.com/go-gorm/gorm/tree/master/clause)

```go
clause.Select{Columns: "*"} //选择所有字段
clause.From{Tables: clause.CurrentTable} //选择表
clause.Limit{Limit: 1} //限制长度
clause.OrderByColumn{ //排序
  Column: clause.Column{Table: clause.CurrentTable, Name: clause.PrimaryKey}, //主键排序
}
```

然后 GORM 在 `Query` callback 中构建最终的查询 SQL，像这样：

```go
Statement.Build("SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "LIMIT", "FOR")
```

生成 SQL：

```go
SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1
```



### 子句构造器

不同的数据库, 子句可能会生成不同的 SQL，例如：

```go
db.Offset(10).Limit(5).Find(&users)
// SQL Server 会生成
// SELECT * FROM "users" OFFSET 10 ROW FETCH NEXT 5 ROWS ONLY
// MySQL 会生成
// SELECT * FROM `users` LIMIT 5 OFFSET 10
```



### 子句选项

GORM 定义了很多 [子句](https://github.com/go-gorm/gorm/tree/master/clause)，其中一些 子句提供了你可能会用到的选项

尽管很少会用到它们，但如果你发现 GORM API 与你的预期不符合。这可能可以很好地检查它们，例如：

```
db.Clauses(clause.Insert{Modifier: "IGNORE"}).Create(&user)
// INSERT IGNORE INTO users (name,age...) VALUES ("jinzhu",18...);
```



### StatementModifier

GORM 提供了 [StatementModifier](https://pkg.go.dev/gorm.io/gorm?tab=doc#StatementModifier) 接口，允许您修改语句，使其符合您的要求，这儿有一个 [Hint](https://gorm.io/zh_CN/docs/hints.html) 示例

```
import "gorm.io/hints"

db.Clauses(hints.New("hint")).Find(&User{})
// SELECT * /*+ hint */ FROM `users`
```



## Belongs To

`belongs To`会与另一个模型建立了一对一的连接。这种模型的每一个实例都属于另一个模型的一个实例。

### 示例

每个user能且只能被分配给一个company，下面的代码中即表示的这种关系。注意，在 `User` 对象中，有一个和 `Company` 一样的 `CompanyID`。 默认情况下， `CompanyID` 被隐含地用来在 `User` 和 `Company` 之间创建一个外键关系， 因此必须包含在 `User` 结构体中才能填充 `Company` 内部结构体。

```go
// `User` 属于 `Company`，`CompanyID` 是外键
type User struct {
  gorm.Model
  Name      string
  CompanyID int
  Company   Company
}

type Company struct {
  ID   int
  Name string
}
```



### 重写外键

要定义一个 belongs to 关系，数据库的表中必须存在外键。默认情况下，外键的名字，使用拥有者的类型名称加上表的主键的字段名字

例如，定义一个User实体属于Company实体，那么外键的名字一般使用CompanyID。

GORM同时提供自定义外键名字的方式，如下例所示。

```go
type User struct {
  gorm.Model
  Name         string
  CompanyRefer int
  Company      Company `gorm:"foreignKey:CompanyRefer"`
  // 使用 CompanyRefer 作为外键
}

type Company struct {
  ID   int
  Name string
}
```



### 重写引用

对于 belongs to 关系，GORM 通常使用数据库表，主表（拥有者）的主键值作为外键参考。 正如上面的例子，我们使用主表Company中的主键字段ID作为外键的参考值。如果在User实体中设置的Company实体，那么GORM会自动把Company中的ID属性保存到User的CompanyID属性中。并且，可以使用`references`标签来更改它，例如下方代码：

```go
type User struct {
  gorm.Model
  Name      string
  CompanyID string
  Company   Company `gorm:"references:Code"` // 使用 Code 作为引用
}

type Company struct {
  ID   int
  Code string
  Name string
}
```

::: warning

如果外键名恰好在拥有者类型存在，GORM通常会错误的认为这是`Has One`关系。为了避免这种情况，需要在`belong to`关系中指定`references`。

```go
type User struct {
  gorm.Model
  Name      string
  CompanyID string
  Company   Company `gorm:"references:CompanyID"` // 使用 Company.CompanyID 作为引用
}

type Company struct {
  CompanyID   int
  Code        string
  Name        string
}
```

:::



### 外键约束

你可以通过 `constraint` 标签配置 `OnUpdate`、`OnDelete` 实现外键约束，在使用 GORM 进行迁移时它会被创建，例如：

```go
type User struct {
  gorm.Model
  Name      string
  CompanyID int
  Company   Company `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type Company struct {
  ID   int
  Name string
}
```



## Has One

`has one` 与另一个模型建立一对一的关联，但它和一对一关系有些许不同。 这种关联表明一个模型的每个实例都包含或拥有另一个模型的一个实例。例如，您的应用包含 user 和 credit card 模型，且每个 user 只能有一张 credit card。

```go
// User 有一张 CreditCard，UserID 是外键
type User struct {
  gorm.Model
  CreditCard CreditCard
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}
```



### 重写外键

对于 `has one` 关系，同样必须存在外键字段。拥有者将把属于它的模型的主键保存到这个字段。这个字段的名称通常由 `has one` 模型的类型加上其 `主键` 生成，对于上面的例子，它是 `UserID`。为 user 添加 credit card 时，它会将 user 的 `ID` 保存到自己的 `UserID` 字段。

如果你想要使用另一个字段来保存该关系，你同样可以使用标签 `foreignKey` 来更改它，例如：

```go
type User struct {
  gorm.Model
  CreditCard CreditCard `gorm:"foreignKey:UserName"` // 使用 UserName 作为外键
}

type CreditCard struct {
  gorm.Model
  Number   string
  UserName string
}
```



### 重写引用

默认情况下，拥有者实体会将 `has one` 对应模型的主键保存为外键，您也可以修改它，用另一个字段来保存，例如下面这个使用 `Name` 来保存的例子。

您可以使用标签 `references` 来更改它，例如：

```go
type User struct {
  gorm.Model
  Name       string     `gorm:"index"`
  CreditCard CreditCard `gorm:"foreignKey:UserName;references:name"`
}

type CreditCard struct {
  gorm.Model
  Number   string
  UserName string
}
```



### 多态关联

GORM 为 `has one` 和 `has many` 提供了多态关联支持，它会将拥有者实体的表名、主键值都保存到多态类型的字段中。

```go
type Cat struct {
  ID    int
  Name  string
  Toy   Toy `gorm:"polymorphic:Owner;"`//Owner指的是字段前缀
}

type Dog struct {
  ID   int
  Name string
  Toy  Toy `gorm:"polymorphic:Owner;"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
}

db.Create(&Dog{Name: "dog1", Toy: Toy{Name: "toy1"}})
// INSERT INTO `dogs` (`name`) VALUES ("dog1")
// INSERT INTO `toys` (`name`,`owner_id`,`owner_type`) VALUES ("toy1","1","dogs")
```

您可以使用标签 `polymorphicValue` 来更改多态类型的值，例如：

```go
type Dog struct {
  ID   int
  Name string
  Toy  Toy `gorm:"polymorphic:Owner;polymorphicValue:master"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
}

db.Create(&Dog{Name: "dog1", Toy: Toy{Name: "toy1"}})
// INSERT INTO `dogs` (`name`) VALUES ("dog1")
// INSERT INTO `toys` (`name`,`owner_id`,`owner_type`) VALUES ("toy1go","1","master")
```



### 自引用 Has One

```go
type User struct {
  gorm.Model
  Name      string
  ManagerID *uint
  Manager   *User
}
```



### 外键约束

你可以通过为标签 `constraint` 配置 `OnUpdate`、`OnDelete` 实现外键约束，在使用 GORM 进行迁移时它会被创建，例如：

```
type User struct {
  gorm.Model
  CreditCard CreditCard `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}
```



## Has Many

`has many` 与另一个模型建立了一对多的连接。 不同于 `has one`，拥有者可以有零或多个关联模型。

例如，您的应用包含 user 和 credit card 模型，且每个 user 可以有多张 credit card。



### 声明

```go
// User 有多张 CreditCard，UserID 是外键
type User struct {
  gorm.Model
  CreditCards []CreditCard
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}
```



### 检索

```
// 检索用户列表并预加载信用卡
func GetAll(db *gorm.DB) ([]User, error) {
    var users []User
    err := db.Model(&User{}).Preload("CreditCards").Find(&users).Error
    return users, err
}
```



### 重写外键

要定义 `has many` 关系，同样必须存在外键。 默认的外键名是拥有者的类型名加上其主键字段名

例如，要定义一个属于 `User` 的模型，则其外键应该是 `UserID`。

此外，想要使用另一个字段作为外键，您可以使用 `foreignKey` 标签自定义它：

```go
type User struct {
  gorm.Model
  CreditCards []CreditCard `gorm:"foreignKey:UserRefer"`
}

type CreditCard struct {
  gorm.Model
  Number    string
  UserRefer uint
}
```



### 重写引用

GORM 通常使用拥有者的主键作为外键的值。 对于上面的例子，它是 `User` 的 `ID` 字段。

为 user 添加 credit card 时，GORM 会将 user 的 `ID` 字段保存到 credit card 的 `UserID` 字段。

同样的，您也可以使用标签 `references` 来更改它，例如：

```go
type User struct {
  gorm.Model
  MemberNumber string
  CreditCards  []CreditCard `gorm:"foreignKey:UserNumber;references:MemberNumber"`
}

type CreditCard struct {
  gorm.Model
  Number     string
  UserNumber string
}
```



### 多态关联

GORM 为 `has one` 和 `has many` 提供了多态关联支持，它会将拥有者实体的表名、主键都保存到多态类型的字段中。

```go
type Dog struct {
  ID   int
  Name string
  Toys []Toy `gorm:"polymorphic:Owner;"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
}

db.Create(&Dog{Name: "dog1", Toys: []Toy{{Name: "toy1"}, {Name: "toy2"}}})
// INSERT INTO `dogs` (`name`) VALUES ("dog1")
// INSERT INTO `toys` (`name`,`owner_id`,`owner_type`) VALUES ("toy1","1","dogs"), ("toy2","1","dogs")
```

您可以使用标签 `polymorphicValue` 来更改多态类型的值，例如：

```go
type Dog struct {
  ID   int
  Name string
  Toys []Toy `gorm:"polymorphic:Owner;polymorphicValue:master"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
}

db.Create(&Dog{Name: "dog1", Toy: []Toy{{Name: "toy1"}, {Name: "toy2"}}})
// INSERT INTO `dogs` (`name`) VALUES ("dog1")
// INSERT INTO `toys` (`name`,`owner_id`,`owner_type`) VALUES ("toy1","1","master"), ("toy2","1","master")
```



### 自引用

```go
type User struct {
  gorm.Model
  Name      string
  ManagerID *uint
  Team      []User `gorm:"foreignkey:ManagerID"`
}
```



### 外键约束

你可以通过为标签 `constraint` 配置 `OnUpdate`、`OnDelete` 实现外键约束，在使用 GORM 进行迁移时它会被创建，例如：

```go
type User struct {
  gorm.Model
  CreditCards []CreditCard `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}
```



## Many To Many

Many to Many 会在两个 model 中添加一张连接表。

例如，您的应用包含了 user 和 language，且一个 user 可以说多种 language，多个 user 也可以说一种 language。

当使用 GORM 的 `AutoMigrate` 为 `User` 创建表时，GORM 会自动创建连接表

### 声明

```go
// User 拥有并属于多种 language，`user_languages` 是连接表
type User struct {
  gorm.Model
  Languages []*Language `gorm:"many2many:user_languages;"`
}

type Language struct {
  gorm.Model
  Name string
  Users []*User `gorm:"many2many:user_languages;"`
}
```

### 检索

```go
// 检索 User 列表并预加载 Language
func GetAllUsers(db *gorm.DB) ([]User, error) {
    var users []User
    err := db.Model(&User{}).Preload("Languages").Find(&users).Error
    return users, err
}

// 检索 Language 列表并预加载 User
func GetAllLanguages(db *gorm.DB) ([]Language, error) {
    var languages []Language
    err := db.Model(&Language{}).Preload("Users").Find(&languages).Error
    return languages, err
}
```



### 重写外键

对于 `many2many` 关系，连接表会同时拥有两个模型的外键，例如：

```go
type User struct {
  gorm.Model
  Languages []Language `gorm:"many2many:user_languages;"`
}

type Language struct {
  gorm.Model
  Name string
}

// 连接表：user_languages
//   foreign key: user_id, reference: users.id
//   foreign key: language_id, reference: languages.id
```

若要重写它们，可以使用标签 `foreignKey`、`references`、`joinforeignKey`、`joinReferences`。当然，您不需要使用全部的标签，你可以仅使用其中的一个重写部分的外键、引用。

```go
type User struct {
    gorm.Model
    Profiles []Profile `gorm:"many2many:user_profiles;foreignKey:Refer;joinForeignKey:UserReferID;References:UserRefer;joinReferences:ProfileRefer"`
    Refer    uint      `gorm:"index:,unique"`
}

type Profile struct {
    gorm.Model
    Name      string
    UserRefer uint `gorm:"index:,unique"`
}

// 会创建连接表：user_profiles
//   foreign key: user_refer_id, reference: users.refer
//   foreign key: profile_refer, reference: profiles.user_refer
```

::: tip

某些数据库只允许在唯一索引字段上创建外键，如果您在迁移时会创建外键，则需要指定 `unique index` 标签。

:::



### 自引用

自引用 many2many 关系

```go
type User struct {
  gorm.Model
    Friends []*User `gorm:"many2many:user_friends"`
}

// 会创建连接表：user_friends
//   foreign key: user_id, reference: users.id
//   foreign key: friend_id, reference: users.id
```



### 自定义连接表

`连接表` 可以是一个全功能的模型，支持 `Soft Delete`、`钩子`、更多的字段，就跟其它模型一样。您可以通过 `SetupJoinTable` 指定它，例如：

::: tip

自定义连接表要求外键是复合主键或复合唯一索引

:::

```go
type Person struct {
  ID        int
  Name      string
  Addresses []Address `gorm:"many2many:person_addresses;"`
}

type Address struct {
  ID   uint
  Name string
}

type PersonAddress struct {
  PersonID  int `gorm:"primaryKey"`
  AddressID int `gorm:"primaryKey"`
  CreatedAt time.Time
  DeletedAt gorm.DeletedAt
}

func (PersonAddress) BeforeCreate(db *gorm.DB) error {
  // ...
}

// 修改 Person 的 Addresses 字段的连接表为 PersonAddress
// PersonAddress 必须定义好所需的外键，否则会报错
err := db.SetupJoinTable(&Person{}, "Addresses", &PersonAddress{})
```



### 外键约束

你可以通过为标签 `constraint` 配置 `OnUpdate`、`OnDelete` 实现外键约束，在使用 GORM 进行迁移时它会被创建，例如：

```go
type User struct {
  gorm.Model
  Languages []Language `gorm:"many2many:user_speaks;"`
}

type Language struct {
  Code string `gorm:"primarykey"`
  Name string
}

/* CREATE TABLE `user_speaks` 
	(`user_id` integer,`language_code` text,PRIMARY KEY (`user_id`,`language_code`),CONSTRAINT `fk_user_speaks_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,CONSTRAINT `fk_user_speaks_language` FOREIGN KEY (`language_code`) REFERENCES `languages`(`code`) ON DELETE SET NULL ON UPDATE CASCADE);
	
*/

```



### 复合外键

如果您的模型使用了复合主键，GORM 会默认启用复合外键。

您也可以覆盖默认的外键、指定多个外键，只需用逗号分隔那些键名，例如：

```go
type Tag struct {
  ID     uint   `gorm:"primaryKey"`
  Locale string `gorm:"primaryKey"`
  Value  string
}

type Blog struct {
  ID         uint   `gorm:"primaryKey"`
  Locale     string `gorm:"primaryKey"`
  Subject    string
  Body       string
  Tags       []Tag `gorm:"many2many:blog_tags;"`
  LocaleTags []Tag `gorm:"many2many:locale_blog_tags;ForeignKey:id,locale;References:id"`
  SharedTags []Tag `gorm:"many2many:shared_blog_tags;ForeignKey:id;References:id"`
}

// 连接表：blog_tags
//   foreign key: blog_id, reference: blogs.id
//   foreign key: blog_locale, reference: blogs.locale
//   foreign key: tag_id, reference: tags.id
//   foreign key: tag_locale, reference: tags.locale

// 连接表：locale_blog_tags
//   foreign key: blog_id, reference: blogs.id
//   foreign key: blog_locale, reference: blogs.locale
//   foreign key: tag_id, reference: tags.id

// 连接表：shared_blog_tags
//   foreign key: blog_id, reference: blogs.id
//   foreign key: tag_id, reference: tags.id
```



## 关联模式



### 自动创建，更新

在创建、更新记录时，GORM 会通过Upsert 自动保存关联及其引用记录。

```go
user := User{
  Name:            "jinzhu",
  BillingAddress:  Address{Address1: "Billing Address - Address 1"},
  ShippingAddress: Address{Address1: "Shipping Address - Address 1"},
  Emails:          []Email{
    {Email: "jinzhu@example.com"},
    {Email: "jinzhu-2@example.com"},
  },
  Languages:       []Language{
    {Name: "ZH"},
    {Name: "EN"},
  },
}

db.Create(&user)
// BEGIN TRANSACTION;
// INSERT INTO "addresses" (address1) VALUES ("Billing Address - Address 1"), ("Shipping Address - Address 1") ON DUPLICATE KEY DO NOTHING;
// INSERT INTO "users" (name,billing_address_id,shipping_address_id) VALUES ("jinzhu", 1, 2);
// INSERT INTO "emails" (user_id,email) VALUES (111, "jinzhu@example.com"), (111, "jinzhu-2@example.com") ON DUPLICATE KEY DO NOTHING;
// INSERT INTO "languages" ("name") VALUES ('ZH'), ('EN') ON DUPLICATE KEY DO NOTHING;
// INSERT INTO "user_languages" ("user_id","language_id") VALUES (111, 1), (111, 2) ON DUPLICATE KEY DO NOTHING;
// COMMIT;

db.Save(&user)
```

如果您想要更新关联的数据，您应该使用 `FullSaveAssociations` 模式：

```go
db.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)
// ...
// INSERT INTO "addresses" (address1) VALUES ("Billing Address - Address 1"), ("Shipping Address - Address 1") ON DUPLICATE KEY SET address1=VALUES(address1);
// INSERT INTO "users" (name,billing_address_id,shipping_address_id) VALUES ("jinzhu", 1, 2);
// INSERT INTO "emails" (user_id,email) VALUES (111, "jinzhu@example.com"), (111, "jinzhu-2@example.com") ON DUPLICATE KEY SET email=VALUES(email);
// ...
```



### 跳过自动创建、更新

若要在创建、更新时跳过自动保存，您可以使用 `Select` 或 `Omit`，例如：

```go
user := User{
  Name:            "jinzhu",
  BillingAddress:  Address{Address1: "Billing Address - Address 1"},
  ShippingAddress: Address{Address1: "Shipping Address - Address 1"},
  Emails:          []Email{
    {Email: "jinzhu@example.com"},
    {Email: "jinzhu-2@example.com"},
  },
  Languages:       []Language{
    {Name: "ZH"},
    {Name: "EN"},
  },
}

db.Select("Name").Create(&user)
// INSERT INTO "users" (name) VALUES ("jinzhu", 1, 2);

db.Omit("BillingAddress").Create(&user)
// Skip create BillingAddress when creating a user

db.Omit(clause.Associations).Create(&user)
// Skip all associations when creating a user
```

 ::: tip

**NOTE:** 对于 many2many 关联，GORM 在创建连接表引用之前，会先 upsert 关联。如果你想跳过关联的 upsert，你可以这样做：

 ```go
db.Omit("Languages.*").Create(&user)
 ```

 下面的代码将跳过创建关联及其引用

 ```go
db.Omit("Languages").Create(&user)
 ```

:::



### 查找关联

查找所有匹配的关联记录

```go
db.Model(&user).Association("Languages").Find(&languages)
```

查找带条件的关联

```go
codes := []string{"zh-CN", "en-US", "ja-JP"}
db.Model(&user).Where("code IN ?", codes).Association("Languages").Find(&languages)

db.Model(&user).Where("code IN ?", codes).Order("code desc").Association("Languages").Find(&languages)
```



### 添加关联

如果是`many to many`、`has many` 添加新的关联；如果是 `has one`, `belongs to` 替换当前的关联

```go
db.Model(&user).Association("Languages").Append([]Language{languageZH, languageEN})

db.Model(&user).Association("Languages").Append(&Language{Name: "DE"})

db.Model(&user).Association("CreditCard").Append(&CreditCard{Number: "411111111111"})
```



### 替换关联

用一个新的关联替换当前的关联

```go
db.Model(&user).Association("Languages").Replace([]Language{languageZH, languageEN})

db.Model(&user).Association("Languages").Replace(Language{Name: "DE"}, languageEN)
```



### 删除关联

如果存在，则删除源模型与参数之间的关系，只会删除引用，不会从数据库中删除这些对象，会将引用更新为`NULL`。

```go
db.Model(&user).Association("Languages").Delete([]Language{languageZH,languageEN})
db.Model(&user).Association("Languages").Delete(languageZH, languageEN)
```



### 清空关联

删除源模型与关联之间的所有引用，但不会删除这些关联

```go
db.Model(&user).Association("Languages").Clear()
```



### 关联计数

返回当前关联的计数

```go
db.Model(&user).Association("Languages").Count()

// 条件计数
codes := []string{"zh-CN", "en-US", "ja-JP"}
db.Model(&user).Where("code IN ?", codes).Association("Languages").Count()
```



### 批量处理

关联模式也支持批量处理，例如：

```go
// 查询所有用户的所有角色
db.Model(&users).Association("Role").Find(&roles)

// 从所有 team 中删除 user A
db.Model(&users).Association("Team").Delete(&userA)

// 获取去重的用户所属 team 数量
db.Model(&users).Association("Team").Count()

// 对于批量数据的 `Append`、`Replace`，参数的长度必须与数据的长度相同，否则会返回 error
var users = []User{user1, user2, user3}
// 例如：现在有三个 user，Append userA 到 user1 的 team，Append userB 到 user2 的 team，Append userA、userB 和 userC 到 user3 的 team
db.Model(&users).Association("Team").Append(&userA, &userB, &[]User{userA, userB, userC})
// 重置 user1 team 为 userA，重置 user2 的 team 为 userB，重置 user3 的 team 为 userA、 userB 和 userC
db.Model(&users).Association("Team").Replace(&userA, &userB, &[]User{userA, userB, userC})
```



### Select删除

你可以在删除记录时通过 `Select` 来删除具有 has one、has many、many2many 关系的记录，例如：

```go
// 删除 user 时，也删除 user 的 account
db.Select("Account").Delete(&user)

// 删除 user 时，也删除 user 的 Orders、CreditCards 记录
db.Select("Orders", "CreditCards").Delete(&user)

// 删除 user 时，也删除用户所有 has one/many、many2many 记录
db.Select(clause.Associations).Delete(&user)

// 删除 users 时，也删除每一个 user 的 account
db.Select("Account").Delete(&users)
```

::: tip

 **注意：** 只有当记录的主键不为空时，关联才会被删除，GORM 会使用这些主键作为条件来删除关联记录

```go
// 不会有效
db.Select("Account").Where("name = ?", "jinzhu").Delete(&User{})
// 会删除所有 name=`jinzhu` 的 user，但这些 user 的 account 不会被删除

db.Select("Account").Where("name = ?", "jinzhu").Delete(&User{ID: 1})
// 会删除 name = `jinzhu` 且 id = `1` 的 user，并且 user `1` 的 account 也会被删除

db.Select("Account").Delete(&User{ID: 1})
// 会删除 id = `1` 的 user，并且 user `1` 的 account 也会被删除
```

:::



### 关联标签

| 标签             | 描述                                     |
| :--------------- | :--------------------------------------- |
| foreignKey       | 指定当前模型的列作为连接表的外键         |
| references       | 指定引用表的列名，其将被映射为连接表外键 |
| polymorphic      | 指定多态类型，比如模型名                 |
| polymorphicValue | 指定多态值、默认表名                     |
| many2many        | 指定连接表表名                           |
| joinForeignKey   | 指定连接表的外键列名，其将被映射到当前表 |
| joinReferences   | 指定连接表的外键列名，其将被映射到引用表 |
| constraint       | 关系约束，例如：`OnUpdate`、`OnDelete`   |



## 预加载



GORM 允许在其他 SQL 中使用`preload`进行即时加载关系(说人话就是在查询的时候把模型中所有的关联数据都查出来)，例如：

```go
type User struct {
  gorm.Model
  Username string
  Orders   []Order
}

type Order struct {
  gorm.Model
  UserID uint
  Price  float64
}

// 查找 user 时预加载相关 Order
db.Preload("Orders").Find(&users)
// SELECT * FROM users;
// SELECT * FROM orders WHERE user_id IN (1,2,3,4);

db.Preload("Orders").Preload("Profile").Preload("Role").Find(&users)
// SELECT * FROM users;
// SELECT * FROM orders WHERE user_id IN (1,2,3,4); // has many
// SELECT * FROM profiles WHERE user_id IN (1,2,3,4); // has one
// SELECT * FROM roles WHERE id IN (4,5,6); // belongs to
```



### Joins 预加载

`Preload` 在一个单独查询中加载关联数据。而 `Join Preload` 会使用 left join 加载关联数据

```go
db.Joins("Company").Joins("Manager").Joins("Account").First(&user, 1)
db.Joins("Company").Joins("Manager").Joins("Account").First(&user, "users.name = ?", "jinzhu")
db.Joins("Company").Joins("Manager").Joins("Account").Find(&users, "users.id IN ?", []int{1,2,3,4,5})
```

::: warning

**注意** `Join Preload` 适用于一对一的关系，例如： `has one`, `belongs to`

:::



### 预加载全部

与创建、更新时使用 `Select` 类似，`clause.Associations` 也可以和 `Preload` 一起使用，它可以用来 `预加载` 全部关联，例如：

```go
type User struct {
  gorm.Model
  Name       string
  CompanyID  uint
  Company    Company
  Role       Role
  Orders     []Order
}

db.Preload(clause.Associations).Find(&users)
```

`clause.Associations` 不会预加载嵌套的关联，但你可以使用嵌套预加载 例如：

```go
db.Preload("Orders.OrderItems.Product").Preload(clause.Associations).Find(&users)
```



### 条件预加载

GORM 允许带条件的 Preload 关联

```go
// 带条件的预加载 Order
db.Preload("Orders", "state NOT IN (?)", "cancelled").Find(&users)
// SELECT * FROM users;
// SELECT * FROM orders WHERE user_id IN (1,2,3,4) AND state NOT IN ('cancelled');

db.Where("state = ?", "active").Preload("Orders", "state NOT IN (?)", "cancelled").Find(&users)
// SELECT * FROM users WHERE state = 'active';
// SELECT * FROM orders WHERE user_id IN (1,2) AND state NOT IN ('cancelled');
```



### 自定义预加载

您可以通过 `func(db *gorm.DB) *gorm.DB` 实现自定义预加载 SQL，例如：

```go
db.Preload("Orders", func(db *gorm.DB) *gorm.DB {
  return db.Order("orders.amount DESC")
}).Find(&users)
// SELECT * FROM users;
// SELECT * FROM orders WHERE user_id IN (1,2,3,4) order by orders.amount DESC;
```



### 嵌套预加载

GORM 支持嵌套预加载，例如：

```go
db.Preload("Orders.OrderItems.Product").Preload("CreditCard").Find(&users)

// 自定义预加载 `Orders` 的条件
// 这样，GORM 就不会加载不匹配的 order 记录
db.Preload("Orders", "state = ?", "paid").Preload("Orders.OrderItems").Find(&users)
```



## Context

GORM通过 `WithContext()`方法提供了Context支持



### 单会话模式

单会话模式通常被用于执行单次操作

```go
db.WithContext(ctx).Find(&users)
```



### 持续会话模式

持续会话模式通常被用于执行一系列操作，例如：

```go
tx := db.WithContext(ctx)
tx.First(&user, 1)
tx.Model(&user).Update("role", "admin")
```



### 会话超时

对于长 Sql 查询，你可以传入一个带超时的 context 给 `db.WithContext` 来设置超时时间，例如：

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()
db.WithContext(ctx).Find(&users)
```



### Hooks/Callbacks 中的 Context

您可以从当前 `Statement`中访问 `Context` 对象，例如︰

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
  ctx := tx.Statement.Context
  // ...
  return
}
```



## 错误处理

在GO中，错误处理是很重要的，建议在调用任何终结操作后，都进行错误检查。



### 示例

GORM的错误处理与常见的GO代码不同，因为GORM提供的是链式API。如果遇到任何错误，GORM会设置`*gorm.DB`的`Error`字段，如下：

```go
if err := db.Where("name","jack").First(&user).Error; err != nil {
	//错误处理
}
```

或者

```go
if res := db.Where("name","jack").First(&user); res.Error != nil {
	//错误处理
}
```



### 错误列表

[错误列表]([gorm/errors.go at master · go-gorm/gorm (github.com)](https://github.com/go-gorm/gorm/blob/master/errors.go))

|         Error名称          |                      描述                      |
| :------------------------: | :--------------------------------------------: |
|    `ErrRecordNotFound`     |                   记录未找到                   |
|  `ErrInvalidTransaction`   | 无效的事务，通常发生在`Commit`或者`Rollback`时 |
|    `ErrNotImplemented`     |                    不可执行                    |
|  `ErrMissingWhereClause`   |               缺失了`WHERE`条件                |
|  `ErrUnsupportedRelation`  |                  不支持的关联                  |
|  `ErrPrimaryKeyRequired`   |                    主键缺失                    |
|  `ErrModelValueRequired`   |                  模型的值缺失                  |
|      `ErrInvalidData`      |                  不支持的数据                  |
|   `ErrUnsupportedDriver`   |                  不支持的驱动                  |
|      `ErrRegistered`       |                     已注册                     |
|     `ErrInvalidField`      |                   无效的字段                   |
|      `ErrEmptySlice`       |                   发现空切片                   |
| `ErrDryRunModeUnsupported` |              不支持`dry run`模式               |
|       `ErrInvalidDB`       |                  无效的数据库                  |
|     `ErrInvalidValue`      |  无效的值，应该为一个指向结构体或者切片的指针  |
| `ErrInvalidValueOfLength`  |             关联值无效，长度不匹配             |
|   `ErrPreloadNotAllowed`   |        当使用`Count()`时不允许`Preload`        |



## 链式操作

GORM允许进行链式操作，所以可以像如下写代码

```go
db.Where("name=?","jack").Where("age = ?",19).Fisrt(&user)
```

GORM中有三种类型的方法，`链式方法`,`终结方法`,`新建会话方法`.

在 `链式方法`, `终结方法`之后, GORM 返回一个初始化的 `*gorm.DB` 实例，实例不能安全地重复使用，并且新生成的 SQL 可能会被先前的条件污染，例如：

```go
queryDB := DB.Where("name = ?", "jinzhu")

queryDB.Where("age > ?", 10).First(&user)
// SELECT * FROM users WHERE name = "jinzhu" AND age > 10

queryDB.Where("age > ?", 20).First(&user2)
// SELECT * FROM users WHERE name = "jinzhu" AND age > 10 AND age > 20
```

为了重新使用初始化的 `*gorm.DB` 实例, 您可以使用 `新建会话方法` 创建一个可共享的 `*gorm.DB`, 例如:

```go
queryDB := DB.Where("name = ?", "jinzhu").Session(&gorm.Session{})

queryDB.Where("age > ?", 10).First(&user)
// SELECT * FROM users WHERE name = "jinzhu" AND age > 10

queryDB.Where("age > ?", 20).First(&user2)
// SELECT * FROM users WHERE name = "jinzhu" AND age > 20
```



### 链式方法

链式方法是将`Clauses`修改或添加到当前`Statement`的方法，例如 :`Where`,`Select`,`Joins`,`Scopes`,`Preload`等等。



### 终结方法

终结方法是回立即执行注册回调的方法，然后生成并执行SQL，比如：`Create`, `First`, `Find`, `Take`, `Save`, `Update`, `Delete`, `Scan`, `Row`, `Rows`



### 新建会话方法

GORM定义了`Session`,`WithContext`,`Debug`方法作为`新建会话方法`。在 `链式方法`, `终结方法`之后, GORM 返回一个初始化的 `*gorm.DB` 实例，不能安全地再使用。您应该使用 `新建会话方法` 来标记 `*gorm.DB` 为可共享。



## 会话

GORM提供了`Session`方法，这是一个`New Session Method`，它允许创建带配置的新建会话模式

```go
// Session 配置
type Session struct {
  DryRun                   bool
  PrepareStmt              bool
  NewDB                    bool
  Initialized              bool
  SkipHooks                bool
  SkipDefaultTransaction   bool
  DisableNestedTransaction bool
  AllowGlobalUpdate        bool
  FullSaveAssociations     bool
  QueryFields              bool
  Context                  context.Context
  Logger                   logger.Interface
  NowFunc                  func() time.Time
  CreateBatchSize          int
}
```

接下来会逐一讲解这些配置



### DryRun

生成 `SQL` 但不执行。 它可以用于准备或测试生成的 SQL，例如：

```go
// 新建会话模式
stmt := db.Session(&Session{DryRun: true}).First(&user, 1).Statement
stmt.SQL.String() //=> SELECT * FROM `users` WHERE `id` = $1 ORDER BY `id`
stmt.Vars         //=> []interface{}{1}

// 全局 DryRun 模式
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{DryRun: true})

// 不同的数据库生成不同的 SQL
stmt := db.Find(&user, 1).Statement
stmt.SQL.String() //=> SELECT * FROM `users` WHERE `id` = $1 // PostgreSQL
stmt.SQL.String() //=> SELECT * FROM `users` WHERE `id` = ?  // MySQL
stmt.Vars         //=> []interface{}{1}
```

你可以使用下面的代码生成最终的 SQL：

```go
// 注意：SQL 并不总是能安全地执行，GORM 仅将其用于日志，它可能导致会 SQL 注入
db.Dialector.Explain(stmt.SQL.String(), stmt.Vars...)
// SELECT * FROM `users` WHERE `id` = 1
```



### 预编译

`PreparedStmt` 在执行任何 SQL 时都会创建一个 prepared statement 并将其缓存，以提高后续的效率，例如：

```go
// 全局模式，所有 DB 操作都会创建并缓存预编译语句
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  PrepareStmt: true,
})

// 会话模式
tx := db.Session(&Session{PrepareStmt: true})
tx.First(&user, 1)
tx.Find(&users)
tx.Model(&user).Update("Age", 18)

// returns prepared statements manager
stmtManger, ok := tx.ConnPool.(*PreparedStmtDB)

// 关闭 *当前会话* 的预编译模式
stmtManger.Close()

// 为 *当前会话* 预编译 SQL
stmtManger.PreparedSQL // => []string{}

// 为当前数据库连接池的（所有会话）开启预编译模式
stmtManger.Stmts // map[string]*sql.Stmt

for sql, stmt := range stmtManger.Stmts {
  sql  // 预编译 SQL
  stmt // 预编译模式
  stmt.Close() // 关闭预编译模式
}
```



### NewDB

通过 `NewDB` 选项创建一个不会保留先前条件的新会话。

```go
tx := db.Where("name = ?", "jinzhu").Session(&gorm.Session{NewDB: true})

tx.First(&user)
// SELECT * FROM users ORDER BY id LIMIT 1 //name = jinzhu的条件被遗弃

tx.First(&user, "id = ?", 10)
// SELECT * FROM users WHERE id = 10 ORDER BY id //name = jinzhu的条件被遗弃

// 不带 `NewDB` 选项
tx2 := db.Where("name = ?", "jinzhu").Session(&gorm.Session{})
tx2.First(&user)
// SELECT * FROM users WHERE name = "jinzhu" ORDER BY id //name = jinzhu的条件被保留
```



### 初始化

创建一个新的初始化的 DB，这个 DB 不再是方法链、协程安全。

```go
tx := db.Session(&gorm.Session{Initialized: true})
```



### 跳过钩子

如果您想跳过 `钩子` 方法，您可以使用 `SkipHooks` 会话模式，例如：

```go
DB.Session(&gorm.Session{SkipHooks: true}).Create(&user)

DB.Session(&gorm.Session{SkipHooks: true}).Create(&users)

DB.Session(&gorm.Session{SkipHooks: true}).CreateInBatches(users, 100)

DB.Session(&gorm.Session{SkipHooks: true}).Find(&user)

DB.Session(&gorm.Session{SkipHooks: true}).Delete(&user)

DB.Session(&gorm.Session{SkipHooks: true}).Model(User{}).Where("age > ?", 18).Updates(&user)
```



### 禁用嵌套事务

在一个 DB 事务中使用 `Transaction` 方法，GORM 会使用 `SavePoint(savedPointName)`，`RollbackTo(savedPointName)` 为你提供嵌套事务支持。 你可以通过 `DisableNestedTransaction` 选项关闭它，例如：

```go
db.Session(&gorm.Session{
  DisableNestedTransaction: true,
}).CreateInBatches(&users, 100)
```



### 禁用全局更新

GORM 默认不允许进行全局 update/delete，该操作会返回 `ErrMissingWhereClause` 错误。 您可以通过将一个选项设置为 true 来启用它，例如：

```
db.Session(&gorm.Session{
  AllowGlobalUpdate: true,
}).Model(&User{}).Update("name", "jinzhu")
// UPDATE users SET `name` = "jinzhu"
```



### 保存所有关联

在创建、更新记录时，GORM 会通过自动保存关联及其引用记录。 如果您想要更新关联的数据，您应该使用 `FullSaveAssociations` 模式，例如：

```go
db.Session(&gorm.Session{FullSaveAssociations: true}).Updates(&user)
// ...
// INSERT INTO "addresses" (address1) VALUES ("Billing Address - Address 1"), ("Shipping Address - Address 1") ON DUPLICATE KEY SET address1=VALUES(address1);
// INSERT INTO "users" (name,billing_address_id,shipping_address_id) VALUES ("jinzhu", 1, 2);
// INSERT INTO "emails" (user_id,email) VALUES (111, "jinzhu@example.com"), (111, "jinzhu-2@example.com") ON DUPLICATE KEY SET email=VALUES(email);
// ...
```



### Context

通过 `Context` 选项，您可以传入 `Context` 来追踪 SQL 操作，例如：

```go
timeoutCtx, _ := context.WithTimeout(context.Background(), time.Second)
tx := db.Session(&Session{Context: timeoutCtx})

tx.First(&user) // 带有 context timeoutCtx 的查询操作
tx.Model(&user).Update("role", "admin") // 带有 context timeoutCtx 的更新操作
```

GORM 也提供了简写形式的方法 `WithContext`，其实现如下：

```go
func (db *DB) WithContext(ctx context.Context) *DB {
  return db.Session(&Session{Context: ctx})
}
```



### 自定义 Logger

Gorm 允许使用 `Logger` 选项自定义内建 Logger，例如：

```go
newLogger := logger.New(log.New(os.Stdout, "\r\n", log.LstdFlags),
              logger.Config{
                SlowThreshold: time.Second,
                LogLevel:      logger.Silent,
                Colorful:      false,
              })
db.Session(&Session{Logger: newLogger})

db.Session(&Session{Logger: logger.Default.LogMode(logger.Silent)})
```



### NowFunc

`NowFunc` 允许改变 GORM 获取当前时间的实现，例如：

```go
db.Session(&Session{
  NowFunc: func() time.Time {
    return time.Now().Local()
  },
})
```



### 调试

`Debug` 只是将会话的 `Logger` 修改为调试模式的简写形式，其实现如下：

```go
func (db *DB) Debug() (tx *DB) {
  return db.Session(&Session{
    Logger:         db.Logger.LogMode(logger.Info),
  })
}
```



### 查询字段

声明查询字段

```go
db.Session(&gorm.Session{QueryFields: true}).Find(&user)
// SELECT `users`.`name`, `users`.`age`, ... FROM `users` // 有该选项
// SELECT * FROM `users` // 没有该选项
```



### CreateBatchSize

默认批量大小

```go
users = [5000]User{{Name: "jinzhu", Pets: []Pet{pet1, pet2, pet3}}...}

db.Session(&gorm.Session{CreateBatchSize: 1000}).Create(&users)
// INSERT INTO users xxx (需 5 次)
// INSERT INTO pets xxx (需 15 次)
```



## 钩子方法



### 生命周期

Hook是在创建，查询，更新，删除等操作之前，之后调用的函数。如果已经为模型定义了指定的方法，它会在创建，更新，查询，删除时，自动被调用。如果任何回调返回错误，GORM将会停止后续的操作并回滚事务。



### 创建钩子

创建时可用的 hook

```go
// 开始事务
BeforeSave
BeforeCreate
// 关联前的 save
// 插入记录至 db
// 关联后的 save
AfterCreate
AfterSave
// 提交或回滚事务
```

代码示例：

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
  u.UUID = uuid.New()

  if !u.IsValid() {
    err = errors.New("can't save invalid data")
  }
  return
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
  if u.ID == 1 {
    tx.Model(u).Update("role", "admin")
  }
  return
}
```

::: tip

在 GORM 中保存、删除操作会默认运行在事务上， 因此在事务完成之前该事务中所作的更改是不可见的，如果您的钩子返回了任何错误，则修改将被回滚。

:::



### 更新钩子

更新时可用的 hook

```go
// 开始事务
BeforeSave
BeforeUpdate
// 关联前的 save
// 更新 db
// 关联后的 save
AfterUpdate
AfterSave
// 提交或回滚事务
```

代码示例：

```go
func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
  if u.readonly() {
    err = errors.New("read only user")
  }
  return
}

// 在同一个事务中更新数据
func (u *User) AfterUpdate(tx *gorm.DB) (err error) {
  if u.Confirmed {
    tx.Model(&Address{}).Where("user_id = ?", u.ID).Update("verfied", true)
  }
  return
}
```



### 删除钩子

删除时可用的 hook

```go
// 开始事务
BeforeDelete
// 删除 db 中的数据
AfterDelete
// 提交或回滚事务
```

代码示例：

```go
// 在同一个事务中更新数据
func (u *User) AfterDelete(tx *gorm.DB) (err error) {
  if u.Confirmed {
    tx.Model(&Address{}).Where("user_id = ?", u.ID).Update("invalid", false)
  }
  return
}
```



### 查询钩子

查询时可用的 hook

```go
// 从 db 中加载数据
// Preloading (eager loading)
AfterFind
```

代码示例：

```go
func (u *User) AfterFind(tx *gorm.DB) (err error) {
  if u.MemberShip == "" {
    u.MemberShip = "user"
  }
  return
}
```

## 索引

GORM 允许通过 `index`、`uniqueIndex` 标签创建索引，这些索引将在使用 GORM 进行`AutoMigrate` 或 `Createtable`时创建



### 标签

GORM 可以接受很多索引设置，例如`class`、`type`、`where`、`comment`、`expression`、`sort`、`collate`、`option`

下面有一些示例：

```go
type User struct {
    Name  string `gorm:"index"`
    Name2 string `gorm:"index:idx_name,unique"`
    Name3 string `gorm:"index:,sort:desc,collate:utf8,type:btree,length:10,where:name3 != 'jinzhu'"`
    Name4 string `gorm:"uniqueIndex"`
    Age   int64  `gorm:"index:,class:FULLTEXT,comment:hello \\, world,where:age > 10"`
    Age2  int64  `gorm:"index:,expression:ABS(age)"`
}

// MySQL 选项
type User struct {
    Name string `gorm:"index:,class:FULLTEXT,option:WITH PARSER ngram INVISIBLE"`
}

// PostgreSQL 选项
type User struct {
    Name string `gorm:"index:,option:CONCURRENTLY"`
}
```



### 唯一索引

```
uniqueIndex` 标签的作用与 `index` 类似，它等效于 `index:,unique
type User struct {
    Name1 string `gorm:"uniqueIndex"`
    Name2 string `gorm:"uniqueIndex:idx_name,sort:desc"`
}
```





### 复合索引

两个字段使用同一个索引名将创建复合索引，例如：

```go
// create composite index `idx_member` with columns `name`, `number`
type User struct {
    Name   string `gorm:"index:idx_member"`
    Number string `gorm:"index:idx_member"`
}
```



### 字段优先级

复合索引列的顺序会影响其性能，因此必须仔细考虑

您可以使用 `priority` 指定顺序，默认优先级值是 `10`，如果优先级值相同，则顺序取决于模型结构体字段的顺序

```go
type User struct {
    Name   string `gorm:"index:idx_member"`
    Number string `gorm:"index:idx_member"`
}
// column order: name, number

type User struct {
    Name   string `gorm:"index:idx_member,priority:2"`
    Number string `gorm:"index:idx_member,priority:1"`
}
// column order: number, name

type User struct {
    Name   string `gorm:"index:idx_member,priority:12"`
    Number string `gorm:"index:idx_member"`
}
// column order: number, name
```



### 共享复合索引

如果您正在创建带有嵌入结构的共享复合索引，您不能指定索引名称。 作为嵌入结构不止一次会导致重复的索引名称在 db。

在这种情况下，您可以使用索引标签 `composite`, 它意味着复合索引的id。 所有具有相同结构复合id的字段都与原始规则一样，被合并到相同的索引中。 但改进使得最受影响/嵌入结构能够通过命名策略生成索引名称。 例如:

```go
type Foo struct {
  IndexA int `gorm:"index:,unique,composite:myname"`
  IndexB int `gorm:"index:,unique,composite:myname"`
}
```

如果表Foo被创建，复合索引的名称将是 `idx_foo_myname`。

```go
type Bar0 struct {
  Foo
}

type Bar1 struct {
  Foo
}
```

复合索引的名称分别是 `idx_bar0_myname` 和 `idx_bar1_myname`。

`复合` 只能在指定索引名称时使用。



### 多索引

一个字段接受多个 `index`、`uniqueIndex` 标签，这会在一个字段上创建多个索引

```go
type UserIndex struct {
    OID          int64  `gorm:"index:idx_id;index:idx_oid,unique"`
    MemberNumber string `gorm:"index:idx_id"`
}
```



## 约束

GORM 允许通过标签创建数据库约束，约束会在通过 GORM 进行 `AutoMigrate` 或`createTables`时被创建。



### 检查约束

通过 `check` 标签创建检查约束

```go
type UserIndex struct {
    Name  string `gorm:"check:name_checker,name <> 'jinzhu'"`
    Name2 string `gorm:"check:name <> 'jinzhu'"`
    Name3 string `gorm:"check:,name <> 'jinzhu'"`
}
```



### 外键约束

GORM 会为关联创建外键约束，您可以在初始化过程中禁用此功能：

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  DisableForeignKeyConstraintWhenMigrating: true,
})
```

GORM 允许您通过 `constraint` 标签的 `OnDelete`、`OnUpdate` 选项设置外键约束，例如：

```go
type User struct {
  gorm.Model
  CompanyID  int
  Company    Company    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
  CreditCard CreditCard `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}

type Company struct {
  ID   int
  Name string
}
```



## 事务

### 禁用默认事务

为了确保数据一致性，GORM 会在事务里执行写入操作（创建、更新、删除）。如果没有这方面的要求，您可以在初始化时禁用它，这将获得大约 30%+ 性能提升。

```go
// 全局禁用
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  SkipDefaultTransaction: true,
})

// 持续会话模式
tx := db.Session(&Session{SkipDefaultTransaction: true})
tx.First(&user, 1)
tx.Find(&users)
tx.Model(&user).Update("Age", 18)
```



### 事务使用

要在事务中执行一系列操作，一般流程如下：

```go
db.Transaction(func(tx *gorm.DB) error {
  // 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
  if err := tx.Create(&Animal{Name: "Giraffe"}).Error; err != nil {
    // 返回任何错误都会回滚事务
    return err
  }

  if err := tx.Create(&Animal{Name: "Lion"}).Error; err != nil {
    return err
  }

  // 返回 nil 提交事务
  return nil
})
```



### 嵌套事务

GORM 支持嵌套事务，您可以回滚较大事务内执行的一部分操作，例如：

```go
db.Transaction(func(tx *gorm.DB) error {
  tx.Create(&user1)

  tx.Transaction(func(tx2 *gorm.DB) error {
    tx2.Create(&user2)
    return errors.New("rollback user2") // Rollback user2
  })

  tx.Transaction(func(tx2 *gorm.DB) error {
    tx2.Create(&user3)
    return nil
  })

  return nil
})

// Commit user1, user3
```



### 手动事务

Gorm 支持直接调用事务控制方法（commit、rollback），例如：

```go
// 开始事务
tx := db.Begin()

// 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
tx.Create(...)

// ...

// 遇到错误时回滚事务
tx.Rollback()

// 否则，提交事务
tx.Commit()
```

示例

```go
func CreateAnimals(db *gorm.DB) error {
  // 再唠叨一下，事务一旦开始，你就应该使用 tx 处理数据
  tx := db.Begin()
  defer func() {
    if r := recover(); r != nil {
      tx.Rollback()
    }
  }()

  if err := tx.Error; err != nil {
    return err
  }

  if err := tx.Create(&Animal{Name: "Giraffe"}).Error; err != nil {
     tx.Rollback()
     return err
  }

  if err := tx.Create(&Animal{Name: "Lion"}).Error; err != nil {
     tx.Rollback()
     return err
  }

  return tx.Commit().Error
}
```



### 定点回滚

GORM 提供了 `SavePoint`、`Rollbackto` 方法，来提供保存点以及回滚至保存点功能，例如：

```go
tx := db.Begin()
tx.Create(&user1)

tx.SavePoint("sp1")
tx.Create(&user2)
tx.RollbackTo("sp1") // Rollback user2

tx.Commit() // Commit user1
```



## 迁移



### 自动迁移

AutoMigrate 用于自动迁移您的 schema，保持您的 schema 是最新的。

::: warning

**注意：** AutoMigrate 会创建表、缺失的外键、约束、列和索引。 如果大小、精度、是否为空可以更改，则 AutoMigrate 会改变列的类型。 出于保护您数据的目的，它 **不会** 删除未使用的列

:::

```go
db.AutoMigrate(&User{})

db.AutoMigrate(&User{}, &Product{}, &Order{})

// 创建表时添加后缀
db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{})
```

禁用自动创建外键约束

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  DisableForeignKeyConstraintWhenMigrating: true,
})
```



### Migrator 接口

GORM 提供了 Migrator 接口，该接口为每个数据库提供了统一的 API 接口，可用来为您的数据库构建独立迁移，例如：

SQLite 不支持 `ALTER COLUMN`、`DROP COLUMN`，当你试图修改表结构，GORM 将创建一个新表、复制所有数据、删除旧表、重命名新表。

一些版本的 MySQL 不支持 rename 列，索引。GORM 将基于您使用 MySQL 的版本执行不同 SQL



```go
type Migrator interface {
  // AutoMigrate
  AutoMigrate(dst ...interface{}) error

  // Database
  CurrentDatabase() string
  FullDataTypeOf(*schema.Field) clause.Expr

  // Tables
  CreateTable(dst ...interface{}) error
  DropTable(dst ...interface{}) error
  HasTable(dst interface{}) bool
  RenameTable(oldName, newName interface{}) error
  GetTables() (tableList []string, err error)

  // Columns
  AddColumn(dst interface{}, field string) error
  DropColumn(dst interface{}, field string) error
  AlterColumn(dst interface{}, field string) error
  MigrateColumn(dst interface{}, field *schema.Field, columnType ColumnType) error
  HasColumn(dst interface{}, field string) bool
  RenameColumn(dst interface{}, oldName, field string) error
  ColumnTypes(dst interface{}) ([]ColumnType, error)

  // Constraints
  CreateConstraint(dst interface{}, name string) error
  DropConstraint(dst interface{}, name string) error
  HasConstraint(dst interface{}, name string) bool

  // Indexes
  CreateIndex(dst interface{}, name string) error
  DropIndex(dst interface{}, name string) error
  HasIndex(dst interface{}, name string) bool
  RenameIndex(dst interface{}, oldName, newName string) error
}
```



### 当前数据库

返回当前使用的数据库名

```go
db.Migrator().CurrentDatabase()
```

### 表

```go
// 为 `User` 创建表
db.Migrator().CreateTable(&User{})

// 将 "ENGINE=InnoDB" 添加到创建 `User` 的 SQL 里去
db.Set("gorm:table_options", "ENGINE=InnoDB").Migrator().CreateTable(&User{})

// 检查 `User` 对应的表是否存在
db.Migrator().HasTable(&User{})
db.Migrator().HasTable("users")

// 如果存在表则删除（删除时会忽略、删除外键约束)
db.Migrator().DropTable(&User{})
db.Migrator().DropTable("users")

// 重命名表
db.Migrator().RenameTable(&User{}, &UserInfo{})
db.Migrator().RenameTable("users", "user_infos")
```

### 列

```go
type User struct {
  Name string
}

// 添加 name 字段
db.Migrator().AddColumn(&User{}, "Name")
// 删除 name 字段
db.Migrator().DropColumn(&User{}, "Name")
// 修改 name 字段
db.Migrator().AlterColumn(&User{}, "Name")
// 检查 name 字段是否存在
db.Migrator().HasColumn(&User{}, "Name")

type User struct {
  Name    string
  NewName string
}

// 字段重命名
db.Migrator().RenameColumn(&User{}, "Name", "NewName")
db.Migrator().RenameColumn(&User{}, "name", "new_name")

// 字段类型
db.Migrator().ColumnTypes(&User{}) ([]gorm.ColumnType, error)

type ColumnType interface {
    Name() string
    DatabaseTypeName() string                 // varchar
    ColumnType() (columnType string, ok bool) // varchar(64)
    PrimaryKey() (isPrimaryKey bool, ok bool)
    AutoIncrement() (isAutoIncrement bool, ok bool)
    Length() (length int64, ok bool)
    DecimalSize() (precision int64, scale int64, ok bool)
    Nullable() (nullable bool, ok bool)
    Unique() (unique bool, ok bool)
    ScanType() reflect.Type
    Comment() (value string, ok bool)
    DefaultValue() (value string, ok bool)
}
```

### 约束

```go
type UserIndex struct {
  Name  string `gorm:"check:name_checker,name <> 'jinzhu'"`
}

// 创建约束
db.Migrator().CreateConstraint(&User{}, "name_checker")

// 删除约束
db.Migrator().DropConstraint(&User{}, "name_checker")

// 检查约束是否存在
db.Migrator().HasConstraint(&User{}, "name_checker")
```

为 relation 创建外键

```go
type User struct {
  gorm.Model
  CreditCards []CreditCard
}

type CreditCard struct {
  gorm.Model
  Number string
  UserID uint
}

// 为 user & credit_cards 创建 db 外键
db.Migrator().CreateConstraint(&User{}, "CreditCards")
db.Migrator().CreateConstraint(&User{}, "fk_users_credit_cards")
// ALTER TABLE `credit_cards` ADD CONSTRAINT `fk_users_credit_cards` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)

// 检查 user & credit_cards 的外键是否存在
db.Migrator().HasConstraint(&User{}, "CreditCards")
db.Migrator().HasConstraint(&User{}, "fk_users_credit_cards")

// 删除 user & credit_cards 的 db 外键
db.Migrator().DropConstraint(&User{}, "CreditCards")
db.Migrator().DropConstraint(&User{}, "fk_users_credit_cards")
```

### 索引

```go
type User struct {
  gorm.Model
  Name string `gorm:"size:255;index:idx_name,unique"`
}

// 为 Name 字段创建索引
db.Migrator().CreateIndex(&User{}, "Name")
db.Migrator().CreateIndex(&User{}, "idx_name")

// 为 Name 字段删除索引
db.Migrator().DropIndex(&User{}, "Name")
db.Migrator().DropIndex(&User{}, "idx_name")

// 检查索引是否存在
db.Migrator().HasIndex(&User{}, "Name")
db.Migrator().HasIndex(&User{}, "idx_name")

type User struct {
  gorm.Model
  Name  string `gorm:"size:255;index:idx_name,unique"`
  Name2 string `gorm:"size:255;index:idx_name_2,unique"`
}
// 修改索引名
db.Migrator().RenameIndex(&User{}, "Name", "Name2")
db.Migrator().RenameIndex(&User{}, "idx_name", "idx_name_2")
```



## 日志

GORM有一个自己默认的Logger实现，通常情况下，它会打印慢SQL和错误。在项目中通常会使用第三方日志组件，这里仅作了解。

Logger 接受的选项不多，您可以在初始化时自定义它，例如：

```go
newLogger := logger.New(
  log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer（日志输出的目标，前缀和日志包含的内容——译者注）
  logger.Config{
    SlowThreshold: time.Second,   // 慢 SQL 阈值
    LogLevel:      logger.Silent, // 日志级别
    IgnoreRecordNotFoundError: true,   // 忽略ErrRecordNotFound（记录未找到）错误
    Colorful:      false,         // 禁用彩色打印
  },
)

// 全局模式
db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
  Logger: newLogger,
})

// 新建会话模式
tx := db.Session(&Session{Logger: newLogger})
tx.First(&user)
tx.Model(&user).Update("Age", 18)
```



### 日志级别

GORM 定义了这些日志级别：`Silent`、`Error`、`Warn`、`Info`

```go
db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
  Logger: logger.Default.LogMode(logger.Silent),
})
```

### Debug

Debug 单个操作，将当前操作的 log 级别调整为 logger.Info

```go
db.Debug().Where("name = ?", "jinzhu").First(&User{})
```



### 自定义 Logger

参考 GORM 的 [默认 logger](https://github.com/go-gorm/gorm/blob/master/logger/logger.go) 来定义您自己的 logger

Logger 需要实现以下接口，它接受 `context`，所以你可以用它来追踪日志

```go
type Interface interface {
    LogMode(LogLevel) Interface
    Info(context.Context, string, ...interface{})
    Warn(context.Context, string, ...interface{})
    Error(context.Context, string, ...interface{})
    Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error)

```



## 安全

GORM 使用 `database/sql` 的参数占位符来构造 SQL 语句，这可以自动转义参数，避免 SQL 注入数据

::: tip

**注意** Logger 打印的 SQL 并不像最终执行的 SQL 那样已经转义，复制和运行这些 SQL 时应当注意。

:::

### 查询条件

用户的输入只能作为参数，例如：

```go
userInput := "jinzhu;drop table users;"

// 安全的，会被转义
db.Where("name = ?", userInput).First(&user)

// SQL 注入
db.Where(fmt.Sprintf("name = %v", userInput)).First(&user)
```



### 内联条件

```go
// 会被转义
db.First(&user, "name = ?", userInput)

// SQL 注入
db.First(&user, fmt.Sprintf("name = %v", userInput))
```

当通过用户输入的整形主键检索记录时，你应该对变量进行类型检查。

```go
userInputID := "1=1;drop table users;"
// 安全的，返回 err
id,err := strconv.Atoi(userInputID)
if err != nil {
    return error
}
db.First(&user, id)

// SQL 注入
db.First(&user, userInputID)
// SELECT * FROM users WHERE 1=1;drop table users;
```



### SQL 注入方法

为了支持某些功能，一些输入不会被转义，调用方法时要小心用户输入的参数。

```go
db.Select("name; drop table users;").First(&user)
db.Distinct("name; drop table users;").First(&user)

db.Model(&user).Pluck("name; drop table users;", &names)

db.Group("name; drop table users;").First(&user)

db.Group("name").Having("1 = 1;drop table users;").First(&user)

db.Raw("select name from users; drop table users;").First(&user)

db.Exec("select name from users; drop table users;")

db.Order("name; drop table users;").First(&user)
```

避免 SQL 注入的一般原则是，不信任用户提交的数据。您可以进行白名单验证来测试用户的输入是否为已知安全的、已批准、已定义的输入，并且在使用用户的输入时，仅将它们作为参数。



## 通用数据库接口

ORM 提供了 `DB` 方法，可用于从当前 `*gorm.DB` 返回一个通用的数据库接口 [*sql.DB](https://pkg.go.dev/database/sql#DB)

```go
// 获取通用数据库对象 sql.DB，然后使用其提供的功能
sqlDB, err := db.DB()

// Ping
sqlDB.Ping()

// Close
sqlDB.Close()

// 返回数据库统计信息
sqlDB.Stats()
```

::: danger

**注意** 如果底层连接的数据库不是 `*sql.DB`，它会返回错误

:::

### 连接池

```go
// 获取通用数据库对象 sql.DB ，然后使用其提供的功能
sqlDB, err := db.DB()

// SetMaxIdleConns 用于设置连接池中空闲连接的最大数量。
sqlDB.SetMaxIdleConns(10)

// SetMaxOpenConns 设置打开数据库连接的最大数量。
sqlDB.SetMaxOpenConns(100)

// SetConnMaxLifetime 设置了连接可复用的最大时间。
sqlDB.SetConnMaxLifetime(time.Hour)
```



## 性能

GORM 已经优化了许多东西来提高性能，其默认性能对大多数应用来说都够用了。但这里还是有一些关于如何为您的应用改进性能的方法。

### 禁用默认事务

对于写操作（创建、更新、删除），为了确保数据的完整性，GORM 会将它们封装在一个事务里。但这会降低性能，你可以在初始化时禁用这种方式

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  SkipDefaultTransaction: true,
})
```

### 缓存预编译语句

执行任何 SQL 时都创建并缓存预编译语句，可以提高后续的调用速度

```go
// 全局模式
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  PrepareStmt: true,
})

// 会话模式
tx := db.Session(&Session{PrepareStmt: true})
tx.First(&user, 1)
tx.Find(&users)
tx.Model(&user).Update("Age", 18)
```

### 带预编译的SQL生成器

Prepared Statement 也可以和原生 SQL 一起使用，例如：

```go
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  PrepareStmt: true,
})

db.Raw("select sum(age) from users where role = ?", "admin").Scan(&age)
```

### 缩小字段选择范围 

默认情况下，GORM 在查询时会选择所有的字段，您可以使用 `Select` 来指定您想要的字段

```go
db.Select("Name", "Age").Find(&Users{}
```

或者定义一个较小的 API 结构体，使用智能选择字段功能

```go
type User struct {
  ID     uint
  Name   string
  Age    int
  Gender string
  // 假设后面还有几百个字段...
}

type APIUser struct {
  ID   uint
  Name string
}

// 查询时会自动选择 `id`、`name` 字段
db.Model(&User{}).Limit(10).Find(&APIUser{})
// SELECT `id`, `name` FROM `users` LIMIT 10
```

### FindInBatches



### 索引提示 

 索引用于提高数据检索和 SQL 查询性能。 `Index Hints` 向优化器提供了在查询处理过程中如何选择索引的信息。与 optimizer 相比，它可以更灵活地选择更有效的执行计划

```go
import "gorm.io/hints"

db.Clauses(hints.UseIndex("idx_user_name")).Find(&User{})
// SELECT * FROM `users` USE INDEX (`idx_user_name`)

db.Clauses(hints.ForceIndex("idx_user_name", "idx_user_id").ForJoin()).Find(&User{})
// SELECT * FROM `users` FORCE INDEX FOR JOIN (`idx_user_name`,`idx_user_id`)"

db.Clauses(
    hints.ForceIndex("idx_user_name", "idx_user_id").ForOrderBy(),
    hints.IgnoreIndex("idx_user_name").ForGroupBy(),
).Find(&User{})
// SELECT * FROM `users` FORCE INDEX FOR ORDER BY (`idx_user_name`,`idx_user_id`) IGNORE INDEX FOR GROUP BY (`idx_user_name`)"
```

::: tip

**注意** 也可以参考如何为 MySQL 开启 interpolateparams 以减少 roundtrip https://github.com/go-sql-driver/mysql#interpolateparams

:::



### 读写分离

通过读写分离提高数据吞吐量



## 自定义数据类型

GORM提供了少量接口，使用户能够为GORM定义支持的数据类型，这里以`JSON`为例子。

官方的自定义数据类型仓库：[go-gorm/datatypes: GORM Customized Data Types Collection (github.com)](https://github.com/go-gorm/datatypes)



### Scanner/valuer

自定义数据类型必须实现`Scanner/Valuer`接口，以便让GORM知道如何将该类型接受，保存到数据库。

例如:

```go
type JSON json.RawMessage

// 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (j *JSON) Scan(value interface{}) error {
  bytes, ok := value.([]byte)
  if !ok {
    return errors.New(fmt.Sprint("Failed to unmarshal JSONB value:", value))
  }

  result := json.RawMessage{}
  err := json.Unmarshal(bytes, &result)
  *j = JSON(result)
  return err
}

// 实现 driver.Valuer 接口，Value 返回 json value
func (j JSON) Value() (driver.Value, error) {
  if len(j) == 0 {
    return nil, nil
  }
  return json.RawMessage(j).MarshalJSON()
}
```

有许多第三方包实现了 `Scanner`/`Valuer` 接口，可与 GORM 一起使用，例如：

```go
import (
  "github.com/google/uuid"
  "github.com/lib/pq"
)

type Post struct {
  ID     uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
  Title  string
  Tags   pq.StringArray `gorm:"type:text[]"`
}
```

### 数据类型接口

GORM 会从 `type` 标签中读取字段的数据库类型，如果找不到，则会检查该结构体是否实现了 `GormDBDataTypeInterface` 或 `GormDataTypeInterface` 接口，然后使用接口返回值作为数据类型

```go
type GormDataTypeInterface interface {
  GormDataType() string
}

type GormDBDataTypeInterface interface {
  GormDBDataType(*gorm.DB, *schema.Field) string
}
```

`GormDataType` 的结果用于生成通用数据类型，也可以通过 `schema.Field` 的 `DataType` 字段得到。例如：

```go
func (JSON) GormDataType() string {
  return "json"
}

type User struct {
  Attrs JSON
}

func (user User) BeforeCreate(tx *gorm.DB) {
  field := tx.Statement.Schema.LookUpField("Attrs")
  if field.DataType == "json" {
    // 做点什么...
  }
}
```

在迁移时，`GormDBDataType` 通常会为当前驱动返回恰当的数据类型，例如：

```go
func (JSON) GormDBDataType(db *gorm.DB, field *schema.Field) string {
  // 使用 field.Tag、field.TagSettings 获取字段的 tag
  // 查看 https://github.com/go-gorm/gorm/blob/master/schema/field.go 获取全部的选项

  // 根据不同的数据库驱动返回不同的数据类型
  switch db.Dialector.Name() {
  case "mysql", "sqlite":
    return "JSON"
  case "postgres":
    return "JSONB"
  }
  return ""
}
```

如果 struct 没有实现 `GormDBDataTypeInterface` 或 `GormDataTypeInterface` 接口，GORM 会根据 struct 第一个字段推测其数据类型，例如：会为 `NullString` 使用 `string`

```go
type NullString struct {
  String string // 使用第一个字段的数据类型
  Valid  bool
}

type User struct {
  Name NullString // 数据类型会是 string
}
```



### GormValuerInterface

GORM 提供了 `GormValuerInterface` 接口，支持使用 SQL 表达式或基于 context 的值进行 create/update。基于此接口，可以实现自定义数据类型在生成SQL时自定义SQL表达式，提供更加灵活的处理方式。

```go
type GormValuerInterface interface {
  GormValue(ctx context.Context, db *gorm.DB) clause.Expr
}
```

示例

```go
type Location struct {
    X, Y int
}

func (loc Location) GormDataType() string {
  return "geometry"
}

func (loc Location) GormValue(ctx context.Context, db *gorm.DB) clause.Expr {
  return clause.Expr{
    SQL:  "ST_PointFromText(?)",//表达式
    Vars: []interface{}{fmt.Sprintf("POINT(%d %d)", loc.X, loc.Y)},//参数
  }
}

// Scan 方法实现了 sql.Scanner 接口
func (loc *Location) Scan(v interface{}) error {
  // Scan a value into struct from database driver
}

type User struct {
  ID       int
  Name     string
  Location Location
}

db.Create(&User{
  Name:     "jinzhu",
  Location: Location{X: 100, Y: 100},
})
// INSERT INTO `users` (`name`,`point`) VALUES ("jinzhu",ST_PointFromText("POINT(100 100)"))

db.Model(&User{ID: 1}).Updates(User{
  Name:  "jinzhu",
  Location: Location{X: 100, Y: 100},
})
// UPDATE `user_with_points` SET `name`="jinzhu",`location`=ST_PointFromText("POINT(100 100)") WHERE `id` = 1

```

基于Context的值

如果你想创建或更新一个依赖于当前 context 的值，你也可以实现 `GormValuerInterface` 接口，例如：

```go
type EncryptedString struct {
  Value string
}

func (es EncryptedString) GormValue(ctx context.Context, db *gorm.DB) (expr clause.Expr) {
  if encryptionKey, ok := ctx.Value("TenantEncryptionKey").(string); ok {
    return clause.Expr{SQL: "?", Vars: []interface{}{Encrypt(es.Value, encryptionKey)}}
  } else {
    db.AddError(errors.New("invalid encryption key"))
  }

  return
}
```



### 子句表达式

如果你想构建一些查询 helper，你可以让 struct 实现 `clause.Expression` 接口：

```go
type Expression interface {
    Build(builder Builder)
}
```

以下为[datatypes/json.go at master · go-gorm/datatypes (github.com)](https://github.com/go-gorm/datatypes/blob/master/json.go)中的一个`JSONQueryExpression`实现。

```go
// JSONQueryExpression json query expression, implements clause.Expression interface to use as querier
type JSONQueryExpression struct {
	column      string
	keys        []string
	hasKeys     bool
	equals      bool
	equalsValue interface{}
	extract     bool
	path        string
}

// JSONQuery query column as json
func JSONQuery(column string) *JSONQueryExpression {
	return &JSONQueryExpression{column: column}
}

// Extract extract json with path
func (jsonQuery *JSONQueryExpression) Extract(path string) *JSONQueryExpression {
	jsonQuery.extract = true
	jsonQuery.path = path
	return jsonQuery
}

// HasKey returns clause.Expression
func (jsonQuery *JSONQueryExpression) HasKey(keys ...string) *JSONQueryExpression {
	jsonQuery.keys = keys
	jsonQuery.hasKeys = true
	return jsonQuery
}

// Keys returns clause.Expression
func (jsonQuery *JSONQueryExpression) Equals(value interface{}, keys ...string) *JSONQueryExpression {
	jsonQuery.keys = keys
	jsonQuery.equals = true
	jsonQuery.equalsValue = value
	return jsonQuery
}

// Build implements clause.Expression
func (jsonQuery *JSONQueryExpression) Build(builder clause.Builder) {
	if stmt, ok := builder.(*gorm.Statement); ok {
		switch stmt.Dialector.Name() {
		case "mysql", "sqlite":
			switch {
			case jsonQuery.extract:
				builder.WriteString("JSON_EXTRACT(")
				builder.WriteQuoted(jsonQuery.column)
				builder.WriteByte(',')
				builder.AddVar(stmt, jsonQuery.path)
				builder.WriteString(")")
			case jsonQuery.hasKeys:
				if len(jsonQuery.keys) > 0 {
					builder.WriteString("JSON_EXTRACT(")
					builder.WriteQuoted(jsonQuery.column)
					builder.WriteByte(',')
					builder.AddVar(stmt, jsonQueryJoin(jsonQuery.keys))
					builder.WriteString(") IS NOT NULL")
				}
			case jsonQuery.equals:
				if len(jsonQuery.keys) > 0 {
					builder.WriteString("JSON_EXTRACT(")
					builder.WriteQuoted(jsonQuery.column)
					builder.WriteByte(',')
					builder.AddVar(stmt, jsonQueryJoin(jsonQuery.keys))
					builder.WriteString(") = ")
					if value, ok := jsonQuery.equalsValue.(bool); ok {
						builder.WriteString(strconv.FormatBool(value))
					} else {
						stmt.AddVar(builder, jsonQuery.equalsValue)
					}
				}
			}
		case "postgres":
			switch {
			case jsonQuery.hasKeys:
				if len(jsonQuery.keys) > 0 {
					stmt.WriteQuoted(jsonQuery.column)
					stmt.WriteString("::jsonb")
					for _, key := range jsonQuery.keys[0 : len(jsonQuery.keys)-1] {
						stmt.WriteString(" -> ")
						stmt.AddVar(builder, key)
					}

					stmt.WriteString(" ? ")
					stmt.AddVar(builder, jsonQuery.keys[len(jsonQuery.keys)-1])
				}
			case jsonQuery.equals:
				if len(jsonQuery.keys) > 0 {
					builder.WriteString(fmt.Sprintf("json_extract_path_text(%v::json,", stmt.Quote(jsonQuery.column)))

					for idx, key := range jsonQuery.keys {
						if idx > 0 {
							builder.WriteByte(',')
						}
						stmt.AddVar(builder, key)
					}
					builder.WriteString(") = ")

					if _, ok := jsonQuery.equalsValue.(string); ok {
						stmt.AddVar(builder, jsonQuery.equalsValue)
					} else {
						stmt.AddVar(builder, fmt.Sprint(jsonQuery.equalsValue))
					}
				}
			}
		}
	}
}
```



## Scope

`Scope`允许复用通用的逻辑，这种共享逻辑需要定义为类型`func(*gorm.DB) *gorm.DB`。



### 查询

Scope 查询示例：

```go
func AmountGreaterThan1000(db *gorm.DB) *gorm.DB {
  return db.Where("amount > ?", 1000)
}

func PaidWithCreditCard(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}

func PaidWithCod(db *gorm.DB) *gorm.DB {
  return db.Where("pay_mode_sign = ?", "C")
}

func OrderStatus(status []string) func (db *gorm.DB) *gorm.DB {
  return func (db *gorm.DB) *gorm.DB {
    return db.Where("status IN (?)", status)
  }
}

db.Scopes(AmountGreaterThan1000, PaidWithCreditCard).Find(&orders)
// 查找所有金额大于 1000 的信用卡订单

db.Scopes(AmountGreaterThan1000, PaidWithCod).Find(&orders)
// 查找所有金额大于 1000 的 COD 订单

db.Scopes(AmountGreaterThan1000, OrderStatus([]string{"paid", "shipped"})).Find(&orders)
// 查找所有金额大于1000 的已付款或已发货订单
```



### 分页

```go
func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
  return func (db *gorm.DB) *gorm.DB {
    q := r.URL.Query()
    page, _ := strconv.Atoi(q.Get("page"))
    if page == 0 {
      page = 1
    }

    pageSize, _ := strconv.Atoi(q.Get("page_size"))
    switch {
    case pageSize > 100:
      pageSize = 100
    case pageSize <= 0:
      pageSize = 10
    }

    offset := (page - 1) * pageSize
    return db.Offset(offset).Limit(pageSize)
  }
}

db.Scopes(Paginate(r)).Find(&users)
db.Scopes(Paginate(r)).Find(&articles)
```



### 动态表

使用 `Scopes` 来动态指定查询的表

```go
func TableOfYear(user *User, year int) func(db *gorm.DB) *gorm.DB {
  return func(db *gorm.DB) *gorm.DB {
        tableName := user.TableName() + strconv.Itoa(year)
        return db.Table(tableName)
  }
}

DB.Scopes(TableOfYear(user, 2019)).Find(&users)
// SELECT * FROM users_2019;

DB.Scopes(TableOfYear(user, 2020)).Find(&users)
// SELECT * FROM users_2020;

// Table form different database
func TableOfOrg(user *User, dbName string) func(db *gorm.DB) *gorm.DB {
  return func(db *gorm.DB) *gorm.DB {
        tableName := dbName + "." + user.TableName()
        return db.Table(tableName)
  }
}

DB.Scopes(TableOfOrg(user, "org1")).Find(&users)
// SELECT * FROM org1.users;

DB.Scopes(TableOfOrg(user, "org2")).Find(&users)
// SELECT * FROM org2.users;
```

### 更新

Scope 更新、删除示例：

```go
func CurOrganization(r *http.Request) func(db *gorm.DB) *gorm.DB {
  return func (db *gorm.DB) *gorm.DB {
    org := r.Query("org")

    if org != "" {
      var organization Organization
      if db.Session(&Session{}).First(&organization, "name = ?", org).Error == nil {
        return db.Where("org_id = ?", organization.ID)
      }
    }

    db.AddError("invalid organization")
    return db
  }
}

db.Model(&article).Scopes(CurOrganization(r)).Update("Name", "name 1")
// UPDATE articles SET name = "name 1" WHERE org_id = 111
db.Scopes(CurOrganization(r)).Delete(&Article{})
// DELETE FROM articles WHERE org_id = 111
```



## 数据库实例的上下文值传递



GORM 提供了 `Set`, `Get`, `InstanceSet`, `InstanceGet` 方法来允许用户传值给勾子或其他方法

Gorm 中有一些特性用到了这种机制，如迁移表格时传递表格选项。

```go
// 创建表时添加表后缀
db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{})
```



### Set / Get

使用 `Set` / `Get` 传递设置到钩子方法，例如：

```go
type User struct {
  gorm.Model
  CreditCard CreditCard
  // ...
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
  myValue, ok := tx.Get("my_value")
  // ok => true
  // myValue => 123
}

type CreditCard struct {
  gorm.Model
  // ...
}

func (card *CreditCard) BeforeCreate(tx *gorm.DB) error {
  myValue, ok := tx.Get("my_value")
  // ok => true
  // myValue => 123
}

myValue := 123
db.Set("my_value", myValue).Create(&User{})
```



### InstanceSet / InstanceGet

使用 `InstanceSet` / `InstanceGet` 传递设置到 `*Statement` 的钩子方法，例如：

```go
type User struct {
  gorm.Model
  CreditCard CreditCard
  // ...
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
  myValue, ok := tx.InstanceGet("my_value")
  // ok => true
  // myValue => 123
}

type CreditCard struct {
  gorm.Model
  // ...
}

// 在创建关联时，GORM 创建了一个新 `*Statement`，所以它不能读取到其它实例的设置
func (card *CreditCard) BeforeCreate(tx *gorm.DB) error {
  myValue, ok := tx.InstanceGet("my_value")
  // ok => false
  // myValue => nil
}

myValue := 123
db.InstanceSet("my_value", myValue).Create(&User{})
```



## 数据库解析器

`DBResolver`为GORM提供了多个数据库支持，支持以下功能。

- 支持多个`sources`,`replicas`
- 读写分离
- 根据工作表，结构体自动切换连接
- 手动切换连接
- 负载均衡
- 适用于原生SQL
- 事务支持



### 用法

```go
import (
  "gorm.io/gorm"
  "gorm.io/plugin/dbresolver"
  "gorm.io/driver/mysql"
)

db, err := gorm.Open(mysql.Open("db1_dsn"), &gorm.Config{})

db.Use(dbresolver.Register(dbresolver.Config{
  // `db2` 作为 sources，`db3`、`db4` 作为 replicas
  Sources:  []gorm.Dialector{mysql.Open("db2_dsn")},
  Replicas: []gorm.Dialector{mysql.Open("db3_dsn"), mysql.Open("db4_dsn")},
  // sources/replicas 负载均衡策略
  Policy: dbresolver.RandomPolicy{},
}).Register(dbresolver.Config{
  // `db1` 作为 sources（DB 的默认连接），对于 `User`、`Address` 使用 `db5` 作为 replicas
  Replicas: []gorm.Dialector{mysql.Open("db5_dsn")},
}, &User{}, &Address{}).Register(dbresolver.Config{
  // `db6`、`db7` 作为 sources，对于 `orders`、`Product` 使用 `db8` 作为 replicas
  Sources:  []gorm.Dialector{mysql.Open("db6_dsn"), mysql.Open("db7_dsn")},
  Replicas: []gorm.Dialector{mysql.Open("db8_dsn")},
}, "orders", &Product{}, "secondary"))
```



### 自动切换连接

DBResolver 会根据工作表、struct 自动切换连接

对于原生 SQL，DBResolver 会从 SQL 中提取表名以匹配 Resolver，除非 SQL 开头为 `SELECT`（select for update 除外），否则 DBResolver 总是会使用 `sources` ，例如：

```go
// `User` Resolver 示例
db.Table("users").Rows() // replicas `db5`
db.Model(&User{}).Find(&AdvancedUser{}) // replicas `db5`
db.Exec("update users set name = ?", "jinzhu") // sources `db1`
db.Raw("select name from users").Row().Scan(&name) // replicas `db5`
db.Create(&user) // sources `db1`
db.Delete(&User{}, "name = ?", "jinzhu") // sources `db1`
db.Table("users").Update("name", "jinzhu") // sources `db1`

// Global Resolver 示例
db.Find(&Pet{}) // replicas `db3`/`db4`
db.Save(&Pet{}) // sources `db2`

// Orders Resolver 示例
db.Find(&Order{}) // replicas `db8`
db.Table("orders").Find(&Report{}) // replicas `db8`
```



### 读写分离

DBResolver 的读写分离目前是基于 `GORM callback` 实现的。

对于 `Query`、`Row` callback，如果手动指定为 `Write` 模式，此时会使用 `sources`，否则使用 `replicas`。 对于 `Raw` callback，如果 SQL 是以 `SELECT` 开头，语句会被认为是只读的，会使用 `replicas`，否则会使用 `sources`。



### 手动切换连接

```go
// 使用 Write 模式：从 sources db `db1` 读取 user
db.Clauses(dbresolver.Write).First(&user)

// 指定 Resolver：从 `secondary` 的 replicas db `db8` 读取 user
db.Clauses(dbresolver.Use("secondary")).First(&user)

// 指定 Resolver 和 Write 模式：从 `secondary` 的 sources db `db6` 或 `db7` 读取 user
db.Clauses(dbresolver.Use("secondary"), dbresolver.Write).First(&user)
```

### 事务

使用事务时，DBResolver 也会保持使用一个事务，且不会根据配置切换 sources/replicas 连接

但您可以在事务开始之前指定使用哪个数据库，例如：

```go
// 通过默认 replicas db 开始事务
tx := DB.Clauses(dbresolver.Read).Begin()

// 通过默认 sources db 开始事务
tx := DB.Clauses(dbresolver.Write).Begin()

// 通过 `secondary` 的 sources db 开始事务
tx := DB.Clauses(dbresolver.Use("secondary"), dbresolver.Write).Begin()
```

### 负载均衡

GORM 支持基于策略的 sources/replicas 负载均衡，自定义策略应该是一个实现了以下接口的 struct：

```go
type Policy interface {
    Resolve([]gorm.ConnPool) gorm.ConnPool
}
```

当前只实现了一个 `RandomPolicy` 策略，如果没有指定其它策略，它就是默认策略。

### 连接池

```go
db.Use(
  dbresolver.Register(dbresolver.Config{ /* xxx */ }).
  SetConnMaxIdleTime(time.Hour).
  SetConnMaxLifetime(24 * time.Hour).
  SetMaxIdleConns(100).
  SetMaxOpenConns(200)
)
```
