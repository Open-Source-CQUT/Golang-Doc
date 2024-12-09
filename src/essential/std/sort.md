---
date: 2022-10-19
---
# sort 

::: tip

如果你是1.21版本以上的开发者，我建议使用`slices`标准库来进行排序，它支持泛型，API设计更加合理。

:::

在go中的`sort`包下提供了官方实现的排序方法，大部分可以直接开箱即用。倘若想要对结构体进行排序的话必须实现`sort.Interface`下的三个方法`Len()` `swap()` `Less()`。由于官方已经帮我们实现了`Float64Slice` `StringSlice` `IntSlice`三个类型，所以这三个类型可以不用我们自己实现直接使用即可。

```go
type Interface interface {
   // 长度方法
   Len() int

   // 比较方法
   Less(i, j int) bool

   // 交换方法
   Swap(i, j int)
}
```



## 整型排序

```go
func main() {
   ints := []int{1, 2, 3, 111, 5, 99, 23, 5, 66}
   sort.Ints(ints)
}
```



## 浮点排序

```go
func main() {
   floats := []float64{1.0, 2.5, 3.8, 1.11, 5.5, 99.99999, 23.9999, 5.66, 66}
   sort.Float64s(floats)
   fmt.Println(floats)
}
```



## 字符串排序

```go
func main() {
   strings := []string{"helloworld", "aaa", "bbb", "ccc"}
   sort.Strings(strings)
}
```



## 逆向排序

需要先进行`sort.Reverse`包装再进行排序

```go
func main() {
	floats := []float64{1.0, 2.5, 3.8, 1.11, 5.5, 99.99999, 23.9999, 5.66, 66}
	sort.Sort(sort.Reverse(sort.Float64Slice(floats)))
	fmt.Println(floats)
}
```



## 自定义排序

如果想要自定义结构体排序的话，就必须实现三个方法。

```go
type Person struct {
	UserId   string 
	Username string 
	Age      int    
	Address  string 
}

type PersonSlice []Person

//返回切片的长度
func (p PersonSlice) Len() int {
	return len(p)
}

//比较方法
func (p PersonSlice) Less(i, j int) bool {
	return p[i].Age < p[j].Age
}

//交换方法
func (p PersonSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}
```

由于是根据年龄比较的，所有结果是根据年龄的大小来排序。

```go
func main() {
   persons := []Person{{
      UserId:   "1",
      Username: "wyh",
      Age:      18,
      Address:  "us",
   }, {
      UserId:   "2",
      Username: "jack",
      Age:      17,
      Address:  "ch",
   }, {
      UserId:   "3",
      Username: "mike",
      Age:      15,
      Address:  "india",
   }}

   sort.Sort(PersonSlice(persons))

   fmt.Println(persons)
}
```



## 是否有序

判断一个切片是否有序，其内部并不会进行排序操作，而是通过循环调用`Less()`来判断

```go
func main() {
   persons := []Person{{
      UserId:   "1",
      Username: "wyh",
      Age:      18,
      Address:  "us",
   }, {
      UserId:   "2",
      Username: "jack",
      Age:      17,
      Address:  "ch",
   }, {
      UserId:   "3",
      Username: "mike",
      Age:      15,
      Address:  "india",
   }}

   sort.Sort(PersonSlice(persons))

   println(sort.IsSorted(PersonSlice(persons)))
}
```

