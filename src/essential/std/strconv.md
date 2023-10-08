---
date: 2022-10-16
---
# strconv

官方文档：[strconv package - strconv - Go Packages](https://pkg.go.dev/strconv@go1.19.4)

包 strconv 实现与基本数据类型的字符串表示形式之间的转换



## 导入

```go
import (
	"strconv"
)
```

下面将会以例子的形式演示如何使用。





## 字符串转整型

```go
func Atoi(s string) (int, error)
```

- `s` - 要转换的字符串

```go
func TestAoti(t *testing.T) {
	ints, err := strconv.Atoi("456789")
	fmt.Println(ints, err)
}
```

```
=== RUN   TestAoti
456789 <nil>
--- PASS: TestAoti (0.00s)
PASS
```



## 整型转字符串

```go
func Itoa(i int) string
```

- `i` - 要转换的整型数字

```go
func TestIota(t *testing.T) {
   str := strconv.Itoa(114)
   fmt.Println(str)
}
```

```
=== RUN   TestIota
114
--- PASS: TestIota (0.00s)
PASS
```



## 字符串转布尔值

```go
func ParseBool(str string) (bool, error)
```

- `s` - 要转换的字符串

够转换的字符串如下

```
"1", "t", "T", "true", "TRUE", "True" // true
"0", "f", "F", "false", "FALSE", "False" // false
```



```go
func TestAtob(t *testing.T) {
   parseBool, err := strconv.ParseBool("1")
   fmt.Println(parseBool, err)
    
   b, err := strconv.ParseBool("true")
   fmt.Println(b, err)
    
   b2, err := strconv.ParseBool("FALSE")
   fmt.Println(b2, err)
}
```

```
=== RUN   TestAotb
true <nil>
true <nil>
false <nil>
--- PASS: TestAotb (0.00s)
PASS
```



## 布尔值转字符串

```go
func FormatBool(b bool) string
```

- `b` - 布尔值

```go
func TestBota(t *testing.T) {
   fmt.Println(strconv.FormatBool(true))
   fmt.Println(strconv.FormatBool(false))
}
```

```
=== RUN   TestBota
true
false
--- PASS: TestBota (0.00s)
PASS
```



## 转换成Go字符串

两者都会将字符串转换为带引号的Go字符串，区别在于后者会将非ASCII字符转通过`\u`转义。

```go
func TestQuote(t *testing.T) {
	fmt.Println(strconv.Quote("hello 世界"))
	fmt.Println(strconv.QuoteToASCII("hello 世界"))
}
```

```
=== RUN   TestQuote
"hello 世界"
"hello \u4e16\u754c"
--- PASS: TestQuote (0.00s)
PASS
```



## 字符串转浮点数

```go
func ParseFloat(s string, bitSize int) (float64, error)
```

- `s` - 要转换的字符串
- `bitSize` - 位数

```go
func TestParseFloat(t *testing.T) {
   float, err := strconv.ParseFloat("1.145114", 64)
   fmt.Println(float, err)

   float, err = strconv.ParseFloat("2.3333333333333333333", 64)
   fmt.Println(float, err)
}
```

```
=== RUN   TestFloat
1.145114 <nil>
2.3333333333333335 <nil>
--- PASS: TestFloat (0.00s)
PASS
```



## 浮点数转字符串

字符串在转换浮点数时，官方给出了几种格式方法，以便输出不同的样式。

```
// 'b' (-ddddp±ddd, 二进制指数),
// 'e' (-d.dddde±dd, 小写e十进制指数),
// 'E' (-d.ddddE±dd, 大写E的十进制指数),
// 'f' (-ddd.dddd, 没有指数), // 没有特殊需求一般都用这个
// 'g' (对于大指数采用'e'的格式， 小指数采用'f'的格式),
// 'G' (对于大指数采用'e'的格式， 小指数采用'f'的格式)，
// 'x' (-0xd.ddddp±ddd, 十六进制分数和二进制指数), 
// 'X' (-0Xd.ddddP±ddd, 十六进制分数和二进制指数).
```

转换函数

```go
func FormatFloat(f float64, fmt byte, prec, bitSize int) string
```

- f - 指要转换的浮点数
- fmt - 指的是格式化类型
- prec - 指的是精度，除了`g/G`的情况是表示最大有效位数，其他情况都表示的是保留小数到后几位，
- bitzise - 指的是位数

当然一般情况都是使用`f`直接转换小数的格式最多。 

```go
func TestFormatFloat(t *testing.T) {
   f := 1315643.14159261234567891011
   fmt.Println(strconv.FormatFloat(f, 'f', 6, 64))
   fmt.Println(strconv.FormatFloat(f, 'b', 6, 64))
   fmt.Println(strconv.FormatFloat(f, 'e', 6, 64))
   fmt.Println(strconv.FormatFloat(f, 'x', 6, 64))
   fmt.Println(strconv.FormatFloat(f, 'g', 6, 64))
   fmt.Println(strconv.FormatFloat(1.111, 'g', 6, 64))
}
```

```
=== RUN   TestFormatFloat
1315643.141593
5650644266346967p-32
1.315643e+06
0x1.4133b2p+20
1.31564e+06
1.111
--- PASS: TestFormatFloat (0.00s)
PASS
```



## 字符串转复数

```go
func ParseComplex(s string, bitSize int) (complex128, error)
```

- `s` - 要转换的字符串
- `bitSize` - 位数

```go
func TestParseComplex(t *testing.T) {
   fmt.Println(strconv.ParseComplex("1+2i", 128))
   fmt.Println(strconv.ParseComplex("1+2j", 128))
}
```

```
=== RUN   TestParseComplex
(1+2i) <nil>
(0+0i) strconv.ParseComplex: parsing "1+2j": invalid syntax
--- PASS: TestParseComplex (0.00s)
PASS
```



## 复数转字符串

```go
func FormatComplex(c complex128, fmt byte, prec, bitSize int) string
```

`c`- 复数

`fmt` - 格式化类型，参考浮点数格式化类型

`prec` - 参考浮点数精度

`bitsize` - 位数

```go
func TestFormatComplex(t *testing.T) {
   fmt.Println(strconv.FormatComplex(complex(1.1, 12), 'f', 2, 128))
   fmt.Println(strconv.FormatComplex(complex(5.6, 2.8), 'b', 2, 128))
   fmt.Println(strconv.FormatComplex(complex(18.88999, 89.7), 'g', 2, 128))
}
```

```
=== RUN   TestFormatComplex
(1.10+12.00i)
(6305039478318694p-50+6305039478318694p-51i)
(19+90i)
--- PASS: TestFormatComplex (0.00s)
PASS
```



## 字符串追加数据

在其他语言比如java中`"1"+1`的结果是`"11"`，java会自动完成类型转换，而在Go语言中这样的操作是不被允许的，因为两者的数据类型不同。所以需要用到`strconv`下的Append函数 ，具体的参数与上面对于的数据转换函数一致。

```go
func TestAppend(t *testing.T) {
   bytes := []byte("这里有一些数据:")
   bytes = strconv.AppendInt(bytes, 10, 10)
   bytes = strconv.AppendFloat(bytes, 1.2222, 'f', 2, 64)
   bytes = strconv.AppendBool(bytes, false)
   fmt.Println(string(bytes))
}  
```

```
=== RUN   TestAppend
这里有一些数据:101.22false
--- PASS: TestAppend (0.00s)
PASS
```

