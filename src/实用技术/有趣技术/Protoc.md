# Protocol Buffers

官网：[Protocol Buffers  | Google Developers](https://developers.google.com/protocol-buffers/)



Protoc大多数情况下，用于微服务和RPC之间的通信，如果只是单纯的一体Web开发和前后端交互，可能很少会用到Protoc，更多的还是json。



## 介绍

`Protocol Buffers`是谷歌2008开源的语言中立，协议中立，可扩展的结构化数据序列化机制。相比于以上三种更加的轻便，而且在解包封包的时候更加的快速，多用于RPC领域通信相关，可以定义数据的结构化方式，然后可以使用特殊生成的源代码轻松地将结构化数据写入各种数据流和从各种数据流中读取结构化数据，并使用于各种语言。



## 安装

1.在开始之前你需要安装编译器，根据自己的系统选择用什么版本和什么类型的。

```
https://github.com/protocolbuffers/protobuf/releases
```

2.随后将下载后的文件`/bin`目录配置到系统变量中

3.在命令行输入`protoc --version`查看是否安装成功。

4.安装插件

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```



官方教程：[Protocol Buffer Basics: Go  | Protocol Buffers  | Google Developers](https://developers.google.com/protocol-buffers/docs/gotutorial)



## 语法

首先，`Protocol Buffers`的文件是以`.proto`结尾，看一个例子

```protobuf
syntax = "proto3";

message SearchRequest {
  string query = 1;
  string number = 2;
}
```

- 第一行`syntax = "proto3";` 表示使用`proto3`的语法，默认使用`proto2`的语法
- `message`声明的方式类似于结构体，是`proto`中的基本结构
- `SearchRequest`中定义了三个字段，每个字段都会有名称和类型



## 字段类型

| .proto Type | Go Type |
| :---------- | :------ |
| double      | float64 |
| float       | float32 |
| int32       | int32   |
| int64       | int64   |
| uint32      | uint32  |
| uint64      | uint64  |
| sint32      | int32   |
| sint64      | int64   |
| fixed32     | uint32  |
| fixed64     | uint64  |
| sfixed32    | int32   |
| sfixed64    | int64   |
| bool        | bool    |
| string      | string  |
| bytes       | []byte  |



## 字段编号

事实上，proto并不是传统的键值类型，在声明的`.protoc`中是不会出现具体的数据的，每一次字段的`=`后面跟的应该是当前`message`中的唯一编号，这些编号用于在二进制消息体中识别和定义这些字段。编号从1开始，1-15的编号会占用1个字节，16-2047会占用两个字节，因此尽可能的将频繁出现的字段赋予1-15的编号以节省空间，并且应该留出一些空间以留给后续可能会频繁出现的字段。

一个`message`中的字段应当遵循以下规则

- `singular`: 默认是该种类型的字段，在一个结构良好的`message`中，有且只能由0个或者1个该字段，即不能重复存在同一个字段。如下声明便会报错。

    ```protobuf
    syntax = "proto3";
    
    message SearchRequest {
      string query = 1;
      string number = 2;
      string number = 3;//字段重复
    }
    ```

- `optional`:  与`singular`类似，只是可以显示的检查字段值是否被设置，可能会有以下两种情况

    - `set`:  将会被序列化
    - `unset`: 不会被序列化

- `repeated`: 此种类型的字段可以出现0次或多次，将会按照顺序保留重复值（说白了其实就是数组，可以允许同一个类型的值多次重复出现，并且按照出现的顺序保留，就是索引）

- `map`: 键值对类型的字段，声明方式如下

    ```protobuf
    map<string,int32> config = 3;
    ```



## 注释

注释风格类似于`c/c++`

```protobuf
syntax = "proto3";

/* 注释
 * 注释 */
message SearchRequest {
  string query = 1; //注释
  string number = 2;
}
```



## 保留字段

`reserve`关键字可以声明保留字段，保留字段编号声明后，将无法再被用作其他字段的编号和名称，编译时也会发生错误。**谷歌官方给出的回答是**：，如果一个`.proto`文件在新版本中删除了一些编号，那么在未来其他用户可能会重用这些已被删除的编号，但是倘若换回旧版本的编号的话就会造成字段对应的编号不一致从而产生错误，保留字段就可以在编译期起到这么一个提醒作用，提醒你不能使用这个保留使用的字段，否则编译将会不通过。

```protobuf
syntax = "proto3";

message SearchRequest {
  string query = 1;
  string number = 2;
  map<string, int32> config = 3;
  repeated string a = 4;
  reserved "a"; //声明具体名称的字段为保留字段
  reserved 1 to 2; //声明一个编号序列为保留字段
  reserved 3,4; //声明
}
```

如此一来，此文件将不会通过编译。



## 枚举

可以声明枚举常量并将其当作字段的类型来使用，需要注意的是，枚举项的第一个元素必须是零，因为枚举项的默认值就是第一个元素。

```protobuf
syntax = "proto3";

enum Type {
  GET = 0;
  POST = 1;
  PUT = 2;
  DELETE = 3;
}

message SearchRequest {
  string query = 1;
  string number = 2;
  map<string, int32> config = 3;
  repeated string a = 4;
  Type type = 5;
}

```

当枚举项内部存在相同值的枚举项时，可以使用枚举别名

```protobuf
syntax = "proto3";

enum Type {
  option allow_alias = true; //需要开启允许使用别名的配置项
  GET = 0;
  GET_ALIAS = 0; //GET枚举项的别名
  POST = 1;
  PUT = 2;
  DELETE = 3;
}

message SearchRequest {
  string query = 1;
  string number = 2;
  map<string, int32> config = 3;
  repeated string a = 4;
  Type type = 5;
}

```



## 导入

```protobuf
imtport "project/request.proto"
```

通过上述语句可以导入该文件中的所有声明的`message`和`enum`。

为了方便新旧版本兼容，可以使用`public`关键字来进行传递依赖。

`new.proto`文件

```protobuf
syntax = "proto3";

message newMessage{

}
```

`old.proto`文件

```protobuf
syntax = "proto3";

import public "new.proto"; //传递依赖
import "other.proto" //非传递依赖

message oldMessage{

}
```

`test.proto`文件

```protobuf
syntax = "proto3";

//可以使用new.proto和old.proto的内容，但不能使用other.proto的内容
```



## 嵌套消息

```protobuf
message Outer {                  // Level 0
  message MiddleAA {  // Level 1
    message Inner {   // Level 2
      int64 ival = 1;
      bool  booly = 2;
    }
  }
  message MiddleBB {  // Level 1
    message Inner {   // Level 2
      int32 ival = 1;
      bool  booly = 2;
    }
  }
}
```





## Package

您可以向`. proto`文件添加一个可选的包修饰符，以防止协议消息类型之间的名称冲突。

```protobuf
package foo.bar;
message Open { ... }
```

然后，您可以在定义消息类型的字段时使用包名:

```protobuf
message Foo {
  ...
  foo.bar.Open open = 1;
  ...
}
```



## Any

当新旧协议数据进行交换时，双方的字段版本不一致，一些新字段无法识别，即被称为未知字段。在`proto3`刚刚推出时，序列化输出时总是会抛弃未知字段，不过`3.5`以后又重新保留了未知字段，为了能够兼容低版本的`proto`文件。

Anymessage 类型允许您将消息作为嵌入类型使用，而不需要它们的`. proto` 定义。

```protobuf
import "google/protobuf/any.proto";

message ErrorStatus {
  string message = 1;
  repeated google.protobuf.Any details = 2;
}
```





## OneOf

这里的官方文档给出的解释实在是太繁琐了，其实就是表示一个字段在通信时可能会有多种不同的类型，但最终只可能会有一个类型被使用（联想`switch`），并且`oneof `内部不允许出现`repeated`修饰的字段。

```protobuf
message Stock {
    // Stock-specific data
}

message Currency {
    // Currency-specific data
}

message ChangeNotification {
  int32 id = 1;
  oneof instrument {
    Stock stock = 2;
    Currency currency = 3;
  }
}
```



## Service

`service`关键字可以定义一个RPC服务，并且可以使用已定义的消息类型。

```protobuf
syntax = "proto3"; // 声明了protobuf的版本

package fixbug; // 声明了代码所在的包（对于C++来说是namespace）

//定义下面的选项，表示生成service服务类和rpc方法描述，默认不生成
option cc_generic_services = true;

message ResultCode//封装一下失败类
{
  int32 errcode = 1;//表示第1字段
  bytes errmsg = 2;//表示第2字段
}

// 定义登录请求消息类型  name   pwd
message LoginRequest
{
  bytes name = 1;//表示第1字段
  bytes pwd = 2;//表示第2字段
}

// 定义登录响应消息类型
message LoginResponse
{
  ResultCode result = 1;//表示第1字段
  bool success = 2;//表示第2字段
}

//在protobuf里面怎么定义描述rpc方法的类型 - service
service UserServiceRpc
{
  rpc Login(LoginRequest) returns(LoginResponse);
}
```



## Options

`option`就是修改当前文件一些处理的配置，前文中已经出现过了一次别名`option`，以下官网给出的常用配置项。

```proto
option optimize_for = CODE_SIZE;
```

代码生成配置，总共分为三种：

- `SPEED`: 将生成用于序列化、解析和对消息类型执行其他常见操作的代码。这段代码经过了高度优化，这个阶段解析最快，但是空间占用最大。

- `CODE_SIZE`: 将生成最小的类，并依赖于共享的、基于反射的代码来实现序列化、解析和各种其他操作。因此，生成的代码将比使用 SPEED 时小得多，但是操作会更慢。

- `LITE_RUNTIME`: 将生成仅依赖于“ lite”运行时库的类(libProtobuf-lite 而不是 libProtobuf)。Lite 运行时比完整库小得多(数量级更小) ，但省略了某些特性，比如描述符和反射。

    

```protobuf
option go_package = "dir;filename";
```

代码生成时，指定的生成路径，以及文件名。



## 生成代码

```
protoc --proto_path=IMPORT_PATH --go_out=DST_DIR path/to/file.proto
```

- `IMPORT_PATH`：指定解析`import`指令时要去寻找依赖的目录。
- 如果`DST_DIR`以`zip`结尾的话，会自动将其打包为`.zip`的压缩文件。

