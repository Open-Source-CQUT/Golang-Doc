# MySQL

Mysql 是当下最流行的开源关系型数据库，具体的 sql 知识这里不会做过多的赘述，如果你不会请先自行学习，本文只是简单讲解如何利用 go 进行 sql 操作。在项目中的话一般不会直接使用驱动来进行数据库操作，而是会使用 ORM 框架，这里使用的是`sqlx`库，是对标准`sql`库的增强，没有 ORM 功能那么丰富但是胜在简洁。如果你想使用 ORM，可以去了解`Gorm`，`Xorm`，`Ent`这些库。

## 依赖

下载`sqlx`库

```bash
$ go get github.com/jmoiron/sqlx
```

`sqlx`或者说标准库`database/sql`支持的数据库不止 MySQL，任何实现了`driver.Driver`接口的类型都支持，比如：

- PostgreSQL
- Oracle
- MariaDB
- SQLite
- 等其他关系数据库

要使用对应的数据库，就需要实现数据库驱动，驱动可以是你自己写的，也可以是第三方库，在使用之前你就要先使用`sql.Register`注册驱动，然后才能使用。不过一般下载的驱动库都会自动注册驱动，不需要你来手动注册。

```go
func Register(name string, driver driver.Driver)
```

由于 MySQL 比较流行，也最为简单，所以本文采用 MySQL 来讲解，其他关系数据库操作起来都是大差不大差的，下载 MySQL 驱动库

```bash
$ go get github.com/go-sql-driver/mysql
```

## 连接到数据库

通过`sqlx.Open`函数，就可以打开一个数据库连接，它接受两个参数，第一个是驱动名称，第二个就是数据源（一般简称 DSN）。

```go
func Open(driverName, dataSourceName string) (*DB, error)
```

驱动名称就是注册驱动时使用的名称，需要保持一致，DSN 就是数据库的连接地址，每种数据库都可能会不一样，对于 MySQL 而言就是下面这样

```go
db,err := sqlx.Open("mysql","root:123456@tcp(127.0.0.1:3306)/test")
```

## 准备数据

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `age` tinyint(0) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('12132', '张三', 35, '北京市');
INSERT INTO `user` VALUES ('16162', '王五', 22, '上海市');

SET FOREIGN_KEY_CHECKS = 1;
```

## 查询

查询，并将结果映射到结构体中

```go
var db *sqlx.DB

type Person struct {
   UserId   string `db:"id"`
   Username string `db:"name"`
   Age      int    `db:"age"`
   Address  string `db:"address"`
}

func init() {
    conn, err := sqlx.Open("mysql", "root:wyh246859@tcp(127.0.0.1:3306)/test")
   if err != nil {
      fmt.Println("Open mysql failed", err)
      return
   }

   db = conn
}

func main() {
   query()
   defer db.Close()
}

func query() {
   var person Person
   //查询一个是Get，多个是Select
   err := db.Get(&person, "select * from user where id = ?", "12132")
   if err != nil {
      fmt.Println("query failed:", err)
      return
   }
   fmt.Printf("query succ:%+v", person)
}

func list() {
  var perons []Person
  err := db.Select(&perons, "select * from user")
  if err != nil {
    fmt.Println("list err", err)
    return
  }
  fmt.Printf("list succ,%+v", perons)
}
```

## 新增

新增数据

```go
func insert() {
   result, err := db.Exec("insert into user value (?,?,?,?)", "120230", "李四", 12, "广州市")
   if err != nil {
      fmt.Println("insert err:", err)
      return
   }
   id, err := result.LastInsertId()
   if err != nil {
      fmt.Println("insert err:", err)
      return
   }
   fmt.Println("insert succ:", id)
}
```

## 更新

更新数据

```go
func update() {
   res, err := db.Exec("update user set name = ? where id = ?", "赵六", "120230")
   if err != nil {
      fmt.Println("update err:", err)
      return
   }
   eff, err := res.RowsAffected()
   if err != nil || eff == 0 {
      fmt.Println("update err:", err)
      return
   }
   fmt.Println("Update succ")
}
```

## 删除

删除数据

```go
func delete() {
   res, err := db.Exec("delete from user where id = ?", "120230")
   if err != nil {
      fmt.Println("delete err:", err)
      return
   }
   eff, err := res.RowsAffected()
   if err != nil || eff == 0 {
      fmt.Println("delete err:", err)
      return
   }
   fmt.Println("delete succ")
}
```

## 事务

```go
func (db *DB) Begin() (*Tx, error) //开始一个事务
func (tx *Tx) Commit() error //提交一个事务
func (tx *Tx) Rollback() error //回滚一个事务
```

当开启一个事务后，为了保险都会加一句`defer tx.Rollback()`，如果如果过程出错了，就会回滚，要是事务成功提交了，这个回滚自然是无效的。

```go
func main() {

  transation, err := db.Begin()
  if err != nil {
    fmt.Println("transation err")
  }
    defer transation.Rollback()

  insert()
  query()
  update()
  query()
  delete()
   transation.Commit()
}
```
