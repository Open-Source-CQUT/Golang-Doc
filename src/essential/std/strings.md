---
date: 2022-10-22
---
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



## 子串的位置

返回第一次出现的子串的下标

```go
func Index(s, substr string) int
```

返回第一次出现的子串的下标

```go
func IndexAny(s, chars string) int 
```

返回第一次出现的子串的下标

```go
func IndexRune(s string, r rune) int
```

示例

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

<br/>

返回最后一次出现的子串的下标

```go
func LastIndex(s, substr string) int
```

返回最后一次出现的子串任意字符的下标

```go
func LastIndexAny(s, chars string) int
```

示例

```go
func TestLastIndex(t *testing.T) {
	fmt.Println(strings.LastIndex("abcdefga", "a"))
	fmt.Println(strings.LastIndexAny("abcdefghisa", "ba"))
}
```



## 遍历替换字符串

Map 返回字符串 s 的副本，并根据映射函数修改字符串 s 的所有字符。如果映射返回负值，则从字符串中删除该字符，不进行替换

```go
func Map(mapping func(rune) rune, s string) string
```

示例

```go
func TestMap(t *testing.T) {
   fmt.Println(strings.Map(func(r rune) rune {
      return r - 32
   }, "abcdefghijk"))
   fmt.Println(strings.Map(func(r rune) rune {
      return r + 32
   }, "ABCDEFGHIJK"))
   fmt.Println(strings.Map(func(r rune) rune {
      if r < 'F' {
         return -1
      } else {
         return r
      }
   }, "ABCDEFGHIJK"))
}
```

输出

```text
=== RUN   TestMap
ABCDEFGHIJK
abcdefghijk
FGHIJK
--- PASS: TestMap (0.00s)
PASS
```



## 重复复制字符串

根据给定的Count复制字符串，如果为负数会导致`panic`

```go
func Repeat(s string, count int) string
```

示例

```go
func TestRepeat(t *testing.T) {
   fmt.Println(strings.Repeat("a", 10))
   fmt.Println(strings.Repeat("abc", 10))
}
```

输出

```
=== RUN   TestRepeat
aaaaaaaaaa
abcabcabcabcabcabcabcabcabcabc
--- PASS: TestRepeat (0.00s)
PASS
```



## 替换字符串

s为源字符串，old指要被替换的部分，new指old的替换部分，n指的是替换次数，n小于0时表示不限制替换次数。

```go
func Replace(s, old, new string, n int) string
```

示例

```go
func TestReplace(t *testing.T) {
   fmt.Println(strings.Replace("Hello this is golang", "golang", "c++", 1))
   fmt.Println(strings.Replace("Hello this is golang", "o", "c", -1))
   fmt.Println(strings.Replace("Hello this is golang", "o", "c", 1))
}
```

输出

```
=== RUN   TestReplace
Hello this is c++
Hellc this is gclang
Hellc this is golang
--- PASS: TestReplace (0.00s)
PASS
```

<br>

 `Replace`的方便函数，等价于`stings.Replace(s,old,new,-1)`

```go
func ReplaceAll(s, old, new string) string
```

示例

```go
func TestReplaceAll(t *testing.T) {
	fmt.Println(strings.ReplaceAll("Hello this is golang", "o", "c++"))
}
```

输出

```
=== RUN   TestReplaceAll
Hellc++ this is gc++lang
--- PASS: TestReplaceAll (0.00s)
PASS
```



## 分隔字符串

根据子串sep将字符串s分隔成一个字符串切片

```go
func Split(s, sep string) []string
```

根据子串sep将字符串s分隔成一个字符串切片，其分隔次数由n决定

```go
func SplitN(s, sep string, n int) []string
```

根据子串sep将字符串s分隔成包含sep的字符串元素组成的字符串切片

```go
func SplitAfter(s, sep string) []string
```

根据子串sep将字符串s分隔成包含sep的字符串元素组成的字符串切片，其分隔次数由n决定

```go
func SplitAfterN(s, sep string, n int) []string
```

示例

```go
func TestSplit(t *testing.T) {
   fmt.Printf("%q\n", strings.Split("this is go language", " "))
   fmt.Printf("%q\n", strings.SplitN("this is go language", " ", 2))
   fmt.Printf("%q\n", strings.SplitAfter("this is go language", " "))
   fmt.Printf("%q\n", strings.SplitAfterN("this is go language", " ", 2))
}
```

输出

```
=== RUN   TestSplit
["this" "is" "go" "language"]
["this" "is go language"]
["this " "is " "go " "language"]
["this " "is go language"]
--- PASS: TestSplit (0.00s)
PASS
```



## 大小写转换

将英文字符串英文小写字符串

```go
func ToLower(s string) string
```

根据传入的对应语言的`unicode.SpecialCase` ，转换成对应语言的小写字符串

```go
func ToLowerSpecial(c unicode.SpecialCase, s string) string
```

将英文字符串转换成大写字符串

```go
func ToUpper(s string) string
```

根据传入对应语言的`unicode.SpecialCase`，转换成对应语言的大写字符串

```go
func ToUpperSpecial(c unicode.SpecialCase, s string) string
```

示例

```go
func TestLowerAndUpper(t *testing.T) {
   fmt.Println(strings.ToLower("My name is jack,Nice to meet you!"))
   fmt.Println(strings.ToLowerSpecial(unicode.TurkishCase, "Önnek İş"))
   fmt.Println(strings.ToUpper("My name is jack,Nice to meet you!"))
   fmt.Println(strings.ToUpperSpecial(unicode.TurkishCase, "örnek iş"))
}
```

输出

```
=== RUN   TestLowerAndUpper
my name is jack,nice to meet you!
önnek iş
MY NAME IS JACK,NICE TO MEET YOU!
ÖRNEK İŞ
--- PASS: TestLowerAndUpper (0.00s)
PASS
```



## 修剪字符串

修剪字符串两端，将cutset任意匹配的子串删除

```go
func Trim(s, cutset string) string
```

修剪字符串左端，将cutset任意匹配的子串删除

```go
func TrimLeft(s, cutset string) string
```

修剪字符串左端前缀，将cutset匹配的子串删除，不匹配就会返回字符串s

```go
func TrimPrefix(s, suffix string) string
```

修剪字符串右端，将cutset任意匹配的子串删除

```go
func TrimRight(s, cutset string) string
```

修剪字符串右端后缀，将cutset匹配的子串删除，不匹配就会返回字符串s

```go
func TrimSuffix(s, suffix string) string
```

示例

```go
func TestTrim(t *testing.T) {
	fmt.Println(strings.Trim("!!this is a test statement!!", "!!!"))
	fmt.Println(strings.TrimLeft("!!this is a test statement!!", "!!!"))
	fmt.Println(strings.TrimRight("!!this is a test statement!!", "!!!"))
	fmt.Println(strings.TrimPrefix("!!this is a test statement!!", "!!!"))
	fmt.Println(strings.TrimSuffix("!!this is a test statement!!", "!!!"))
}
```

输出

```
=== RUN   TestTrim
this is a test statement
this is a test statement!!
!!this is a test statement
!!this is a test statement!!
!!this is a test statement!!
--- PASS: TestTrim (0.00s)
PASS
```



## 字符串Builder

字符串Builder比起直接操作字符串更加节省内存。

```go
type Builder struct {
	// 内部字段不对外暴露
}
```

示例

```go
func TestBuilder(t *testing.T) {
   builder := strings.Builder{}
   builder.WriteString("hello")
   builder.WriteString(" world")
   fmt.Println(builder.Len())
   fmt.Println(builder.String())
}
```

输出

```
=== RUN   TestBuilder
11
hello world
--- PASS: TestBuilder (0.00s)
PASS
```



::: tip

不要试图将`Builder`作为值进行传递，例如将`strings.Builder`作为函数参数传递的时候，程序会`panic`

```
strings: illegal use of non-zero Builder copied by value
```

其内部有如下一段代码

```go
type Builder struct {
	addr *Builder //自身的地址
	buf  []byte
}

func (b *Builder) copyCheck() {
   if b.addr == nil {
      b.addr = (*Builder)(noescape(unsafe.Pointer(b)))
   } else if b.addr != b {
      panic("strings: illegal use of non-zero Builder copied by value")
   }
}
```

当对`Builder` 进行值拷贝的同时，也拷贝了内部切片的指针，两个`Builder`在写入字符串的时候都是在对同一个切片进行操作，这也是为什么不允许被值拷贝的原因。

:::



## 字符串Replacer

Replacer转用于替换字符串

```go
func NewReplacer(oldnew ...string) *Replacer
```

示例

```go
func TestReplacer(t *testing.T) {
	r := strings.NewReplacer("<", "&lt;", ">", "&gt;")
	fmt.Println(r.Replace("This is <b>HTML</b>!"))
}
```

输出

```
This is &lt;b&gt;HTML&lt;/b&gt;!
```



## 字符串Reader

Reader实现了io.Reader, io.ReaderAt, io.ByteReader, io.ByteScanner, io.RuneReader, io.RuneScanner, io.Seeker, 和 io.WriterTo interfaces。 

```go
func NewReader(s string) *Reader
```

示例

```go
func TestReader(t *testing.T) {
   reader := strings.NewReader("abcdefghijk")
   buffer := make([]byte, 20, 20)
   read, err := reader.Read(buffer)
   if err != nil {
      log.Panic(err)
   }
   fmt.Println(read)
   fmt.Println(string(buffer))
}
```

输出

```
=== RUN   TestReader
11
abcdefghijk         
--- PASS: TestReader (0.00s)
PASS
```

