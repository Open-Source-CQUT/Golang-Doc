# Mysql

Mysql是当下最流行的开源关系型数据库，具体的sql知识这里不会做过多的赘述，只是简单讲解如何利用go进行sql操作。如果是在项目中的话一般不会直接使用驱动来进行数据库操作，而是会使用ORM框架。



## 依赖

```powershell
go get github.com/go-sql-driver/mysql 
go get github.com/jmoiron/sqlx 
```



## 链接

```go
db,err := sqlx.Open("数据库类型","用户名:密码@tcp(地址:端口)/数据库名")
```



## 数据

```mysql
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



## 结构体

```go
type Person struct {
   UserId string `db:"id"`
   Username string `db:"name"`
   Age int `db:"age"`
   Address string `db:"address"`
}
```



## 查询

```go
var db *sqlx.DB

type Person struct {
   UserId   string `db:"id"`
   Username string `db:"name"`
   Age      int    `db:"age"`
   Address  string `db:"address"`
}

func init() {
   conn, err := sqlx.Open("mysql", "root:wyh246859@tcp(127.0.0.1)/test")
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



```go
func main() {

	transation, err := db.Begin()
	if err != nil {
		fmt.Println("transation err")
	}

	insert()
	query()
	update()
	query()
	delete()
 	transation.Commit()
	defer func() {
		if err := recover(); err != nil {
			fmt.Println("transation err", err)
			transation.Rollback()
		}
		db.Close()
		fmt.Println("数据库链接关闭")
	}()
}
```