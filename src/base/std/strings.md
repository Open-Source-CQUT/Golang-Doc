# strings

包 `strings`实现了简单的函数来操作UTF-8编码的字符串，简单来说就是操作字符串的工具包。

官方文档：[strings package - strings - Go Packages](https://pkg.go.dev/strings@go1.19.4)

::: tip

Go天然支持UTF8字符，所有的字符串操作都是建立在UTF8的基础之上。

:::

## 导入

```go
import (
   "strings"
)
```

下面将以示例的形式讲解常用的函数。





## 复制字符串

```go
func Clone(s string) string 
```

将会分配一个新的内存给复制的副本，如果传入一个空字符串，则不会分配内存且返回空字符串。

```go
func TestClone(t *testing.T) {
   ori := "hello 世界"
   copys := strings.Clone(ori)
   fmt.Println(ori, copys)
   fmt.Println(&ori, &copys)
}
```

```
=== RUN   TestClone
hello 世界 hello 世界
0xc00005e5d0 0xc00005e5e0
--- PASS: TestClone (0.00s)
PASS
```



## 比较字符串

```go
func Compare(a, b string) int
```

将a与b按照字典顺序进行字符串比较，如果a>b，返回1，a<b返回-1，a=b返回0。

```go
func TestCompare(t *testing.T) {
	fmt.Println(strings.Compare("abc", "abe"))
	fmt.Println(strings.Compare("abcd", "abe"))
	fmt.Println(strings.Compare("abijk", "abe"))
	fmt.Println(strings.Compare("abe", "abe"))
}
```

```
=== RUN   TestCompare
-1
-1
1
0
--- PASS: TestCompare (0.00s)
PASS
```



## 包含字符串

```go
func Contains(s, substr string) bool
```

判断一个字符串s是不是包含一个子串substr

```go
func TestContains(t *testing.T) {
	fmt.Println(strings.Contains("abcdefg", "a"))
	fmt.Println(strings.Contains("abcdefg", "abc"))
	fmt.Println(strings.Contains("abcdefg", "ba"))
}
```

```
=== RUN   TestContains
true
true
false
--- PASS: TestContains (0.00s)
PASS
```

<br/>

```go
func ContainsAny(s, chars string) bool
```

判断字符串chars内任意字符的unicode码是否在字符串s内，翻译一下就是s是否包含chars内的任意字符串

```go
func TestContainsAny(t *testing.T) {
	fmt.Println(strings.ContainsAny("abcedfg", "bac"))
	fmt.Println(strings.ContainsAny("abcedfg", "gfdecba"))
}
```

```
=== RUN   TestContainsAny
true
--- PASS: TestContainsAny (0.00s)
PASS
```

<br/>

```go
func ContainsRune(s string, r rune) bool
```

判断字符串s内是否包含字符r

```go
func TestContainsRune(t *testing.T) {
   fmt.Println(strings.ContainsRune("abcedf", 'a'))
   fmt.Println(strings.ContainsRune("abcedf", 'b'))
   fmt.Println(strings.ContainsRune("你好世界", '你'))
}
```

```
=== RUN   TestContainsRune
true
true
true
--- PASS: TestContainsRune (0.00s)
PASS
```



## 子串出现次数

```go
func Count(s, substr string) int
```

给出子串substr在字符串s内的出现次数

```go
func TestCount(t *testing.T) {
	fmt.Println(strings.Count("3.1415926", "1"))
	fmt.Println(strings.Count("there is a girl", "e"))
	fmt.Println(strings.Count("there is a girl", ""))
}
```

```
=== RUN   TestCount
2
2
16
--- PASS: TestCount (0.00s)
PASS
```



## 删除指定子串

```go
func Cut(s, sep string) (before, after string, found bool)
```

删除在s内第一次出现的子串sep，并返回删除后的结果

- `before` - 被删除子串位置前面的字符串
- `after` - 被删除子串位置后面的字符串
- `found` - 是否找到子串

```go
func TestCut(t *testing.T) {
	show := func(s, sep string) {
		before, after, found := strings.Cut(s, sep)
		fmt.Printf("Cut(%q, %q) = %q, %q, %v\n", s, sep, before, after, found)
	}
	show("Hello world", " ")
	show("Hello world", "world")
	show("Hello world", "Hello")
	show("Hello world", "Hello world")
}
```

```
=== RUN   TestCut
Cut("Hello world", " ") = "Hello", "world", true
Cut("Hello world", "world") = "Hello ", "", true
Cut("Hello world", "Hello") = "", " world", true
Cut("Hello world", "Hello world") = "", "", true
--- PASS: TestCut (0.00s)
PASS
```



## 忽略大小写相等

```go
func EqualFold(s, t string) bool
```

返回字符串s和t在忽略大小写情况下是否相等

```go
func TestEqualFold(t *testing.T) {
   fmt.Println(strings.EqualFold("你好", "你好"))
   fmt.Println(strings.EqualFold("Hello", "Hello"))
   fmt.Println(strings.EqualFold("Hello", "hELLO"))
}
```

```
=== RUN   TestEqualFold
true
true
true
--- PASS: TestEqualFold (0.00s)
PASS
```



## 分割字符串

```go
func Fields(s string) []string
```

```go
func FieldsFunc(s string, f func(rune) bool) []string
```

前者是根据空格来分割字符串，后者是函数f的返回值来决定是否分割字符串。

```go
func TestField(t *testing.T) {
   fmt.Printf("%q\n", strings.Fields(" a b c d e f g "))
   fmt.Printf("%q\n", strings.FieldsFunc("a,b,c,d,e,f,g", func(r rune) bool {
      return r == ','
   }))
}
```

```
=== RUN   TestField
["a" "b" "c" "d" "e" "f" "g"]
["a" "b" "c" "d" "e" "f" "g"]
--- PASS: TestField (0.00s)
PASS
```



## 寻找前后缀

```go
func HasPrefix(s, prefix string) bool
```

```go
func HasSuffix(s, suffix string) bool
```

前者是寻找前缀，后者是寻找后缀，感兴趣可以去看看这里的源码实现，比较巧妙。

```go
func TestPreSuffix(t *testing.T) {
   str := "abbc cbba"
   fmt.Println(strings.HasPrefix(str, "abb"))
   fmt.Println(strings.HasSuffix(str, "bba"))
}
```

```
=== RUN   TestPreSuffix
true
true
--- PASS: TestPreSuffix (0.00s)
PASS
```



## 寻找子串的位置

```go
func Index(s, substr string) int
```

返回第一次出现的子串的下标

```go
func IndexAny(s, chars string) int 
```

返回子串中任意第一个出现的字符下标

```go
func IndexRune(s string, r rune) int
```

返回s中第一次出现字符r的下标

```go
func TestIndex(t *testing.T) {
   fmt.Println(strings.Index("abcdefg", "bc"))
   fmt.Println(strings.IndexAny("abcdefg", "cb"))
   fmt.Println(strings.IndexRune("abcdefg", 'g'))
}
```

```
=== RUN   TestIndex
1
1
6
--- PASS: TestIndex (0.00s)
PASS
```



