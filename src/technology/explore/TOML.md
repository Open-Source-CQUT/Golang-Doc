---
date: 2022-10-20
---

# TOML

官方文档：[TOML：Tom 的（语义）明显、（配置）最小化的语言](https://toml.io/cn/)

主流的配置文件格式有很多，也有各自的缺点，`xml`，`json`，`yaml`，`ini`，`properties`等等，都有其各自适用的范围与领域，TOML比起其它的格式，风格上更像是ini的拓展，在基本类型方面而言更加简洁和实用，这是一个很大的优点，但是在嵌套类型上，例如嵌套表，嵌套表数组，为了在写法表现上更加简洁，相应的牺牲就是在语义上变得繁琐和不太容易理解。就作者个人而言认为，目前最主流和最适合的配置文件依旧是`yaml`，不过抱着学习的心态，对于TOML，未尝不可一试。



Go中对于TOML支持的依赖：[toml - Search Results - Go Packages](https://pkg.go.dev/search?q=toml)



## 介绍

TOML是由Github创始人所构建的一种语言，这种语言专门为配置文件而生，旨在成为一个语义明显且易于阅读的最小化配置文件格式。TOML 被设计成可以无歧义地映射为哈希表。TOML 应该能很容易地被解析成各种语言中的数据结构。他们的目的就是**简洁，简单，语义化**，以及**为人而生**的配置文件格式。

TOML非常简单易学，类型丰富，总共支持以下类型：

- 键/值对
- 数组
- 表
- 内联表
- 表数组
- 整数 & 浮点数
- 字符串
- 布尔值
- 日期 & 时刻，带可选的时区偏移

并且TOML也已经受到了非常广泛的语言支持，其中就包括Go语言。



## 示例

这是一个十分简单的TOML配置，即便没有了解过TOML也能看个大概，一些细节上的问题等阅读本节后就会全部消失了。

```toml
# 这是一个 TOML 文档

title = "TOML 示例"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00

[database]
enabled = true
ports = [ 8000, 8001, 8002 ]
data = [ ["delta", "phi"], [3.14] ]
temp_targets = { cpu = 79.5, case = 72.0 }

[servers]

[servers.alpha]
ip = "10.0.0.1"
role = "前端"

[servers.beta]
ip = "10.0.0.2"
role = "后端"
```



::: tip

TOML官方声称自己还在测试版本，不排除日后语法更改的可能性，但是很多团队已经将其纳入生产环境了，具体如何使用需要由各位自行决定。

:::





## 规范

TOML的规范特别少，总共就四条：

- TOML 是大小写敏感的 -- 命名时需要注意大小写
- TOML 文件必须是合法的 UTF-8 编码的 Unicode 文档 -- 仅支持UTF-8编码
- 空白是指制表符（0x09）或空格（0x20）
- 换行是指 LF（0x0A）或 CRLF（0x0D 0x0A）



## 注释

TOML的注释与其他大多数配置语言类似，都是通过`#`来进行标注，允许全行注释与行尾注释。

```toml
# 这是一个全行注释
lang = "TOML"
os = "win10" # 这是一个行尾注释
```



## 键值对

TOML最基本的元素就是键值对，有以下几点需要注意：

- 键名在等号的左边，值在右边
- 键名和键值周围的空白会被忽略
- 键名，等号，键值，必须在同一行 （有些值可以跨多行）
- 键值所允许的类型如下：
    - 字符串
    - 整数
    - 浮点数
    - 布尔值
    - 坐标日期时刻
    - 各地日期时刻
    - 各地日期
    - 各地时刻
    - 数组
    - 内联表



示例

```toml
key = "val"
```



一个键名必须对应一个键值，不允许空键的存在

```toml
key = #非法的空键
```



书写完一行键值对后必须立刻换行

```toml
lang = "TOML" os = "win10" # 错误的写法
```



## 键名

键名分为**裸键**，**引号键**，大多数情况下推荐使用裸键。



**裸键**只能包含ASCII字母，ASCII数字，下划线和短横线

```toml
key = "val"
second_key = "second_val"
thrid-key = "third-val"
1024 = "1024"
```

::: tip

虽然裸键允许使用纯数字来作键名，但始终会将键名当作字符串来解析

:::



**引号键**的规则与字符串字面量的规则一致，提供对于键名更广泛的使用

```toml
”url“ = "toml.io" # 双引号
"blank str" = "blank val" # 带空格
"项目名称" = "TOML" # 中文键名，事实上只要是utf-8字符都可以
'key' = "val" # 单引号键名
'second "key"' = "second val" # 单引号内含有双引号
""="" # 双引号空键
''='' # 单引号空键
```

::: tip

裸键是无论如何也不能是空键，但引号键允许空键，不过并不推荐这样做

:::



通过`.`使键有了层级结构

```toml
lang = "TOML"
os = "win10"
os.cpu = "intel"
os."gpu" = "nvidia"
```



## 字符串

TOML中的字符串有四种：**基本字符串**、**多行字符串**、**字面量**、**多行字面量**，所有的字符串都只能包含合法的UTF8-8字符



**基本字符串**由双引号`"`包裹，几乎所有Unicode字符都可以使用，除了部分需要转义

```toml
strings = "这是一个字符串,\"这是双引号内部\",长度\t大小\t"
```

下面是一些常见的转义方法

```
\b         - backspace       (U+0008)
\t         - tab             (U+0009)
\n         - linefeed        (U+000A)
\f         - form feed       (U+000C)
\r         - carriage return (U+000D)
\"         - quote           (U+0022)
\\         - backslash       (U+005C)
\uXXXX     - unicode         (U+XXXX)
\UXXXXXXXX - unicode         (U+XXXXXXXX)
```

::: tip

任何 Unicode 字符都可以用 `\uXXXX` 或 `\UXXXXXXXX` 的形式来转义。所有上面未列出的其它转义序列都是保留的，如果用了，TOML 应当产生错误。

:::



**多行基本字符串**是由三个引号包裹，允许换行，紧随开头引号的换行会被自动去除

```toml
long_str = """
这是一个换行了的字符串
这是第二行"""
```



解析的结果根据不同的平台会有不同

```
"这是一个换行了的字符串\n这是第二行" # Unix
"这是一个换行了的字符串\r\n这是第二行" #Windows
```



如果只是单纯的想写多行，而不想引入换行符以及其他的空白符，可以在行末使用`\`来消除空白

```toml
str = "今天天气很好，可以和朋友出去玩一玩，准备去海边游泳"

#等价于
str1 = """
今天天气很好，\
可以和朋友出去玩一玩，\
准备去海边游泳
"""

#等价于
str2 = str1 = """
今天天气很好，\

可以和朋友出去玩一玩，\

准备去海边游泳
"""
```

当一行的最后一个非空白字符串是违背转义的`\`时，它会将包括自己在内的所有空白字符一齐清除，直到遇见下一个非空白字符或者结束引号为止



::: tip

也可以在多行基本字符串内的写入一个或两个相连的`"`，同样可以写在开头和结尾

```toml
str = """"我很高兴遇见你"""" # "我很高兴遇见你”
str2 = """  这是一个多行基本字符串示例:" \""" "我很高兴遇见你" \""" " """ # 这是一个多行基本字符串示例:" """ "我很高兴遇见你" """ "
```

:::



**字面量字符串**由单引号包裹，完全不允许转义，多用于书写文件路径，正则表达式等特殊的规则

```toml
regx = '<<\i\c*\s*>>'
```



**多行字面量**由`'''`包裹，同样不允许转义，由于没有转义，书写连续三个`'`将会解析错误

```toml
lines = ''' don't you think trump is chinese '''
```



## 整数

整数是纯数字，可以有`+`，`-` 符号前缀

```toml
num = +1
n_num = -1
zero = 0
```

对于一些很长的数字，可以用下划线`_`来分割以增强可读性，下面以中国人的数字阅读习惯举个例子

```toml
big_num0 = 1_0000_0000 # 一亿
big_num1 = 100_0000 # 一百万
big_num2 = 996_1024 # 九百九十六万零一千零二十四
```

其它进制

```toml
hex = 0xABCD
octal = 0o755
binary = 0b1001
```

::: tip

TOML所允许的整数范围是`-2^63 - 2^63-1`

:::



## 浮点数

浮点数应当被实现为 IEEE 754 binary64 值

```toml
# 小数
float1 = +1.024
float2 = -2.048
float3 = 9.66

# 指数
float4 = 2e+11
float5 = 1e6
float6 = -2E-2

#都有
float7 = 1.024e-15
```

小数点前后必须紧邻一个数字

```toml
# 非法的浮点数
invalid_float_1 = .7
invalid_float_2 = 7.
invalid_float_3 = 3.e+20
```

也可以使用`_`来增强可读性

```toml
float8 = 224_617.445_991_228
```

特殊浮点值也能够表示，它们是小写的

```toml
# 无穷
sf1 = inf  # 正无穷
sf2 = +inf # 正无穷
sf3 = -inf # 负无穷

# 非数
sf4 = nan  # 实际上对应信号非数码还是静默非数码，取决于实现
sf5 = +nan # 等同于 `nan`
sf6 = -nan # 有效，实际码取决于实现
```



## 布尔值

布尔值只有两种表达，真-`true`，假-`false`



## 时区日期时刻

[RFC 3339](https://rfc-editor.org/rfc/rfc3339)格式的日期格式，需要指定特定的时区偏移量，如下所示

```toml
odt1 = 1979-05-27T07:32:00Z
odt2 = 1979-05-27T00:32:00-07:00
odt3 = 1979-05-27T00:32:00.999999-07:00
```

规范也允许使用空格替换字母T

```toml
odt4 = 1979-05-27 07:32:00Z
```



## 本地日期时刻

RFC3339格式的日期时刻省略了日期偏移量，这表示该日期时刻的使用并不涉及时区偏移。在没有其它信息的情况下，并不知道它究竟该被转换成世上的哪一刻，如果仍被要求转换，那结果将取决于实现。



日期

```toml
date = 2020-02-05
```



时刻

```toml
time = 08:32:12.10
```



日期时刻

```toml
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27 07:32:00
```



::: tip

日期时刻的值如果超出的所实现的精度，多余的部分将会被舍弃

:::



## 数组

数组是由方括号`[]`包裹，子元素由逗号分隔`,`，可以混和不同类型的值。

```toml
ints = [1, 2, 3, 4, 56]
floats = [1.1, 2.2, 3.3]
nums = [1, 2.2, 3, 4.4, 5]
arr = [1, "2", 3.0, [5], true]
```

数组内部可以换行，也可以被注释

```toml
# fib数列
fibs = [
    0, # 0
    1, # 1
    1, # 2
    2, # 3
    3, # 4
    5]
```





在这之前的所有内容作者都觉得是TOML的优点，而往后的内容，就是TOML所诟病的点了。



## 表

又称为哈希映射表或字典，是键值对的集合。



**表头**由方括号定义`[]`，只作为单独的行出现，其规则与键名一致

```toml
[table]

[a.b.c]            # 这是最佳实践
[ d.e.f ]          # 等同于 [d.e.f]
[ g .  h  . i ]    # 等同于 [g.h.i]
[ j . "ʞ" . 'l' ]  # 等同于 [j."ʞ".'l']
```



在定义表头时，可以直接定义子表，而无需先定义父表

```toml
[creature.human.female] # 不需要先定义[creature]和[creature.human]这两个表头

[creature] # 父表方在子表后定义同样是允许的
```



其下方直到文件结束或者下一个表头为止，都是这个表头的键值对，且并不保证键值对的顺序。

```toml
[table-1]
key1 = "some string"
key2 = 123

[table-2]
key1 = "another string"
key2 = 456
```



顶层表，又被称为根表，于文档开始处开始并在第一个表头（或文件结束处）前结束，不同于其它表，它没有名字且无法后置。

```toml
# 顶层表开始。
name = "Fido"
breed = "pug"

# 顶层表结束。
[owner]
name = "Regina Dogman"
member_since = 1999-08-04
```



点分隔键为最后一个键名前的每个键名创建并定义一个表，倘若这些表尚未被创建的话。

```toml
fruit.apple.color = "red"
# 定义一个名为 fruit 的表
# 定义一个名为 fruit.apple 的表

fruit.apple.taste.sweet = true
# 定义一个名为 fruit.apple.taste 的表
# fruit 和 fruit.apple 已经创建过了
```



说实话TOML在表名重定义这块做的有点繁杂，按照作者的理解是：如果一个表已经被方括号表头形式定义过一次了，那么不能再以方括号形式定义同样的表，且使用点分隔键来再次定义这个表也是不被允许的。倘若一个表是通过点分隔符定义的，那么可以通过方括号表头的形式定义其子表。刚开始看这一坨，确实有点绕。

```toml
[creature]
human.genderCount = 2

# [creature] 非法
# [creature.human] 非法

[creature.human.female] #添加子表
name = "trump"
```



## 内联表

内联表提供了一种更为紧凑的语法来表示表，它们对于分组数据特别有用，否则这些数据很快就会变得冗长，内联表被完整地定义在花括号之中：`{` 和 `}`。 括号中，可以出现零或更多个以逗号分隔的键值对，键值对采取与标准表中的键值对相同的形式，什么类型的值都可以，包括内联表。



**规范**

- 内联表得出现在同一行内
- 内联表中，最后一对键值对后不允许终逗号（也称为尾逗号）
- 不允许花括号中出现任何换行，除非在值中它们合法
- 即便如此，也强烈不建议把一个内联表搞成纵跨多行的样子，如果你发现自己真的需要，那意味着你应该使用标准表



```toml
name = { first = "Tom", last = "Preston-Werner" }
point = { x = 1, y = 2 }
animal = { type.name = "pug" }
```

上述内联表等同于下面的标准表定义：

```toml
[name]
first = "Tom"
last = "Preston-Werner"

[point]
x = 1
y = 2

[animal]
type.name = "pug"
```



内联表是完全独立的，在内部定义全部的键与子表，且不能在括号以外的地方，再添加键与子表。

```toml
[product]
type = { name = "Nail" }
# type.edible = false  # 非法
```



同样的，内联表不能被用于向一个已定义的表添加键或子表。

```toml
[product]
type.name = "Nail"
# type = { edible = false }  # 非法
```



## 表数组

可以把表头写在方括号里，表示是一个表数组，按照其出现顺序插入数组。

```toml
[[products]]
name = "Hammer"
sku = 738594937

[[products]]  # 数组里的空表

[[products]]
name = "Nail"
sku = 284758393

color = "gray"
```

等价于 JSON 的如下结构。

```json
{
  "products": [
    { "name": "Hammer", "sku": 738594937 },
    { },
    { "name": "Nail", "sku": 284758393, "color": "gray" }
  ]
}
```



任何对表数组的引用，都指向数组里上一个的表元素，允许在表数组内创建子表和子表数组。

```toml
[[fruits]]
name = "apple"

[fruits.physical]  # 子表
color = "red"
shape = "round"

[[fruits.varieties]]  # 嵌套表数组
name = "red delicious"

[[fruits.varieties]]
name = "granny smith"

[[fruits]]
name = "banana"

[[fruits.varieties]]
name = "plantain"
```

上述 TOML 等价于 JSON 的如下结构。

```json
{
  "fruits": [
    {
      "name": "apple",
      "physical": {
        "color": "red",
        "shape": "round"
      },
      "varieties": [
        { "name": "red delicious" },
        { "name": "granny smith" }
      ]
    },
    {
      "name": "banana",
      "varieties": [
        { "name": "plantain" }
      ]
    }
  ]
}
```



表数组和子表的定义顺序不能颠倒

```toml
# 非法的 TOML 文档
[fruit.physical]  # 子表，但它应该隶属于哪个父元素？
color = "red"
shape = "round"

[[fruit]]  # 解析器必须在发现“fruit”是数组而非表时抛出错误
name = "apple"
```



试图向一个静态定义的数组追加内容，即便数组尚且为空，也会在解析时报错。

```toml
# 非法的 TOML 文档
fruits = []

[[fruits]] # 不允许
```



若试图用已经确定为数组的名称定义表，会在解析时报错。将数组重定义为普通表的行为，也会在解析时报错。

```toml
# 非法的 TOML 文档
[[fruits]]
name = "apple"

[[fruits.varieties]]
name = "red delicious"

# 非法：该表与之前的表数组相冲突
[fruits.varieties]
name = "granny smith"

[fruits.physical]
color = "red"
shape = "round"

# 非法：该表数组与之前的表相冲突
[[fruits.physical]]
color = "green"
```



## 拓展名

TOML配置文件的拓展名均以`.toml`为准



## MIME类型

在互联网上传输 TOML 文件时，恰当的 MIME 类型是 `application/toml`