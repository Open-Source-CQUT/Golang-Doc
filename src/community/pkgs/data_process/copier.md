# copier

开源仓库：[jinzhu/copier: Copier for golang, copy value from struct to struct and more (github.com)](https://github.com/jinzhu/copier)

文档地址：[jinzhu/copier: Copier for golang, copy value from struct to struct and more (github.com)](https://github.com/jinzhu/copier#readme)

copier 是一个用于在 go 中进行类型复制的库，多用于结构体之间的转换。作者和 gorm 是同一个，它具有以下特点

- 深拷贝
- 复制同名的字段
- 复制切片
- 复制 map
- 复制方法

由于 copier 的复制依赖于反射，所以性能上会有一定的损失。一般这种类型复制的库分成两类，一类基于反射，也是就 copier 这种，另一类是基于代码生成，通过生成类型转换的代码，这种方法性能不会造成损失，类似实现的库有[jmattheis/goverter](https://github.com/jmattheis/goverter)。

## 安装

```sh
 go get github.com/jinzhu/copier
```

## 使用

这个库使用起来非常简单，但却非常的实用。它只对外暴露两个函数，一个是`copier.Copy`。

```go
func Copy(toValue interface{}, fromValue interface{}) (err error)
```

另一个是`copier.CopyWithOption`，后者可以对复制行为进行一些自定义的配置，在默认情况下不会进行深拷贝。

```go
type Option struct {
  IgnoreEmpty   bool
  CaseSensitive bool
  DeepCopy      bool
  FieldNameMapping []FieldNameMapping
}

func CopyWithOption(toValue interface{}, fromValue interface{}, opt Option) (err error)
```

下面演示一个不同类型结构体转换的例子，其中的`User`和`Student`结构体是两个完全不同的类型，没有任何的关联。

```go
type User struct {
  Id   string
  Name string
  // 当作为目标结构体时，忽略该字段
  Address string `copier:"-"`
}

type Student struct {
  // 指定字段名
  StudentId   string `copier:"Id"`
  StudentName string `copier:"Name"`
  Address     string
  School      string
  Class       string
}

func main() {
  student := Student{
    StudentId:   "123",
    StudentName: "jack",
    Address:     "usa",
    School:      "MIT",
    Class:       "AI",
  }
  user := User{}
  if err := copier.Copy(&user, &student); err != nil {
    panic(err)
  }
  fmt.Printf("%+v\n", student)
  fmt.Printf("%+v\n", user)
}
```

输出

```
{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}
{Id:123 Name:jack Address:}
```

下面看复制切片

```go
func main() {
  student := []Student{
    {
      StudentId:   "123",
      StudentName: "jack",
      Address:     "usa",
      School:      "MIT",
      Class:       "AI",
    },
    {
      StudentId:   "123",
      StudentName: "jack",
      Address:     "usa",
      School:      "MIT",
      Class:       "AI",
    },
  }

  var user []User
  if err := copier.Copy(&user, &student); err != nil {
    panic(err)
  }
  fmt.Printf("%+v\n", student)
  fmt.Printf("%+v\n", user)
}
```

输出

```
[{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} {StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
[{Id:123 Name:jack Address:} {Id:123 Name:jack Address:}]
```

复制 map

```go
type User struct {
  Id   string
  Name string
  // 当作为目标结构体时，忽略该字段
  Address string `copier:"-"`
}

type Student struct {
  // 指定字段名
  StudentId   string `copier:"Id"`
  StudentName string `copier:"Name"`
  Address     string
  School      string
  Class       string
}

func main() {
  student := Student{
    StudentId:   "123",
    StudentName: "jack",
    Address:     "usa",
    School:      "MIT",
    Class:       "AI",
  }

  src := make(map[string]Student)
  src["a"] = student
  src["b"] = student

  dest := make(map[string]User)

  if err := copier.Copy(&dest, &src); err != nil {
    panic(err)
  }
  fmt.Printf("%+v\n", src)
  fmt.Printf("%+v\n", dest)
}

```

输出

```
map[a:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} b:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
map[a:{Id:123 Name:jack Address:} b:{Id:123 Name:jack Address:}]
```

## 自定义

还可以自定义转换方法，只需要传入`copier.TypeConverter`即可

```go
type TypeConverter struct {
  SrcType interface{}
  DstType interface{}
  Fn      func(src interface{}) (dst interface{}, err error)
}
```

如下所示

```go
type User struct {
  Id   string
  Name string
  // 当作为目标结构体时，忽略该字段
  Address string `copier:"-"`
}

type Student struct {
  // 指定字段名
  StudentId   string `copier:"Id"`
  StudentName string `copier:"Name"`
  Address     string
  School      string
  Class       string
}

func main() {
  student := Student{
    StudentId:   "123",
    StudentName: "jack",
    Address:     "usa",
    School:      "MIT",
    Class:       "AI",
  }

  src := make(map[string]Student)
  src["a"] = student
  src["b"] = student

  dest := make(map[string]User)

  if err := copier.CopyWithOption(&dest, &src, copier.Option{
    IgnoreEmpty:   false,
    CaseSensitive: false,
    DeepCopy:      false,
    Converters: []copier.TypeConverter{
      {
        SrcType: Student{},
        DstType: User{},
        Fn: func(src interface{}) (dst interface{}, err error) {
          s, ok := src.(Student)
          if !ok {
            return User{}, errors.New("error type")
          }
          return User{
            Id: s.StudentId,
          }, nil
        },
      },
    },
    FieldNameMapping: nil,
  }); err != nil {
    panic(err)
  }
  fmt.Printf("%+v\n", src)
  fmt.Printf("%+v\n", dest)
}
```

输出

```
map[a:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} b:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
map[a:{Id:123 Name: Address:} b:{Id:123 Name: Address:}]
```
