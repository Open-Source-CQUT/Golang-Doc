---
date: 2022-10-24
---
# unsafe

官方文档地址：[unsafe package - unsafe - Go Packages](https://pkg.go.dev/unsafe@go1.20)

`unsafe`标准库是官方提供的一个可以进行低级编程的库，该包提供的操作可以直接跳过Go的类型系统从而读写内存。该包可能不具有移植性，且官方声称该包不受`Go 1` 兼容性准则的保护。即便如此，`unsafe`也还是被大量的项目使用，其中也包括官方提供的标准库。

::: tip

之所以不可移植的原因是一些操作的结果取决于操作系统实现，不同的系统可能会有不同的结果。

:::

## ArbitraryType

```go
type ArbitraryType int
```

Arbitrary可以翻译为任意的，在这里代表的是任意类型，且不等同于`any`，实际上该类型并不属于`unsafe`包，出现在这里仅仅只是为了文档目的。

<br>

## IntegerType

```go
type IntegerType int
```

`IntegerType`代表的是任意整数类型，实际上该类型并不属于`unsafe`包，出现在这里仅仅只是为了文档目的。

上面这两个类型不需要太在意，它们仅仅只是一个代表而已，在使用`unsafe`包函数时编辑器甚至会提示你类型不匹配，它们的实际类型就是你传入的具体类型。

<br>

## Sizeof

```go
func Sizeof(x ArbitraryType) uintptr
```

以字节为单位返回变量`x`的大小，不包括其引用内容的大小，例如：

```go
func main() {
	var ints byte = 1
	fmt.Println(unsafe.Sizeof(ints))
	
	var floats float32 = 1.0
	fmt.Println(unsafe.Sizeof(floats))
	
	var complexs complex128 = 1 + 2i
	fmt.Println(unsafe.Sizeof(complexs))
	
	var slice []int = make([]int, 100)
	fmt.Println(unsafe.Sizeof(slice))
	
	var mp map[string]int = make(map[string]int, 0)
	fmt.Println(unsafe.Sizeof(mp))
	
	type person struct {
		name string
		age  int
	}
	fmt.Println(unsafe.Sizeof(person{}))
	
	type man struct {
		name string
	}
	fmt.Println(unsafe.Sizeof(man{}))
}
```

```
1
4 
16
24
8 
24
16
```

<br>

## Offsetof

```go
func Offsetof(x ArbitraryType) uintptr
```

该函数用于表示结构体内字段偏移量，所以`x`必须是一个结构体字段，或者说返回值就是结构体地址起始处到字段地址起始处两者之间的字节数，例如

```go
func main() {
   type person struct {
      name string
      age  int
   }
   p := person{
      name: "aa",
      age:  11,
   }
   fmt.Println(unsafe.Sizeof(p))
   fmt.Println(unsafe.Offsetof(p.name))
   fmt.Println(unsafe.Sizeof(p.name))
   fmt.Println(unsafe.Offsetof(p.age))
   fmt.Println(unsafe.Sizeof(p.age))
}
```

```
24
0 
16
16
8 
```

<br>

## Alignof

如果不懂什么是内存对齐，可以前往：[Go语言内存对齐详解 - 掘金 (juejin.cn)](https://juejin.cn/post/7077833959047954463)

```go
func Alignof(x ArbitraryType) uintptr
```

对齐大小通常是以字节为单位的计算机字长与`Sizeof`的最小值，例如在`amd64`的机器上，字长为64位，也就是8个字节，例如：

```go
func main() {
	type person struct {
		name string
		age  int32
	}
	p := person{
		name: "aa",
		age:  11,
	}
	fmt.Println(unsafe.Alignof(p), unsafe.Sizeof(p))
	fmt.Println(unsafe.Alignof(p.name), unsafe.Sizeof(p.name))
	fmt.Println(unsafe.Alignof(p.age), unsafe.Sizeof(p.age))
}
```

```go
8 24
8 16
4 4 
```

<br>

## Pointer

```go
type Pointer *ArbitraryType
```

`Pointer`是一种可以指向任意类型的"指针"，其类型为`*ArbitraryType`，该类型与`uintptr`结合使用，才能真正发挥`unsafe`包的真正威力。在官方文档的描述中，`unsafe.Pointer`类型可以进行四个特殊操作，分别是：

- 任何类型的指针都可以转换为`unsafe.Pointer`
- `unsafe.Pointer`可以转换为任何类型的指针
- `uintptr`可以转换为`unsafe.Pointer`
- `unsafe.Pointer`可以转换为`uintptr`

这四个特殊操作构成了整个`unsafe`包的基石，也正是这四个操作才能写出能够忽略类型系统从而直接读写内存的代码，建议在使用时应当格外注意。

::: tip

`unsafe.Pointer`无法解引用，同样的也无法取地址。

:::



(1)  **将`*T1`转换为`unsafe.Pointer`再转换为`*T2`**

现有类型`*T1`，`*T2`，假设`T2`不大于`T1`并且两者内存布局等效，就允许将一种`T2`类型的数据转换为`T1`。例如：

```go
func main() {
   fmt.Println(Float64bits(12.3))
   fmt.Println(Float64frombits(Float64bits(12.3)))
}

func Float64bits(f float64) uint64 {
   return *(*uint64)(unsafe.Pointer(&f))
}

func Float64frombits(b uint64) float64 {
   return *(*float64)(unsafe.Pointer(&b))
}
```

```
4623113902481840538
12.3
```

这两个函数实际是`math`包下的两个函数，过程中的类型变化如下

```
float64 -> *float64 -> unsafe.Pointer ->  *uint64 -> uint64 -> *uint64 -> unsafe.Pointer -> *float64 -> float64
```

<br>

(2)  **将`unsafe.Pointer`转换为`uintptr`**

将`unsafe.Pointer`转换为`uintptr`时，会将前者所指向的地址作为后者的值，`uintptr`保存的是地址，区别在于，前者在语法上是一个指针，是一个引用，后者仅仅是一个整数值。例如

```go
func main() {
   num := 1
   fmt.Println(unsafe.Pointer(&num))
   fmt.Printf("0x%x", uintptr(unsafe.Pointer(&num)))
}
```

```
0xc00001c088
0xc00001c088
```

更大的区别在于垃圾回收的处理，由于`unsafe.Pointer`是一个引用，在需要的时候并不会被回收掉，而后者仅仅作为一个值，自然不会有这种特殊待遇了，另一个需要注意的点是当指针指向的元素地址移动时，GC会去更新指针引用的旧地址，但不会去更新`uinptr`所保存的值。例如下面的代码就可能会出现问题：

```go
func main() {
   num := 16
   address := uintptr(unsafe.Pointer(&num))
   np := (*int64)(unsafe.Pointer(address))
   fmt.Println(*np)
}
```

当一些情况下，GC移动变量后，`address`指向的地址已经无效了，此时再使用该值去创建指针就会引发`panic`

```
panic: runtime error: invalid memory address or nil pointer dereference
```

所以并不建议保存`Pointer`转换为`uintptr`后的值。

<br>

**(3)  通过`uintptr`转换为`unsafe.Pointer`**

如下方式可以通过`uintptr`获得一个指针，只要指针是有效的，那么便不会出现例二的无效地址情况。`Pointer`与类型指针本身是不支持指针运算，但是`uintptr`只是一个整数值，可以进行数学运算，对`uintptr`进行数学运算后再转换为`Pointer`就可以完成指针运算。

```go
p = unsafe.Pointer(uintptr(p) + offset)
```

这样，可以仅通过一个指针，就能访问到一些类型的内部元素，比如数组和结构体，无论其内部元素是否对外暴露，例如

```go
func main() {
	type person struct {
		name string
		age  int32
	}
	p := &person{"jack", 18}
	pp := unsafe.Pointer(p)
	fmt.Println(*(*string)(unsafe.Pointer(uintptr(pp) + unsafe.Offsetof(p.name))))
	fmt.Println(*(*int32)(unsafe.Pointer(uintptr(pp) + unsafe.Offsetof(p.age))))

	s := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	ps := unsafe.Pointer(&s[0])
	fmt.Println(*(*int)(unsafe.Pointer(uintptr(ps) + 8)))
	fmt.Println(*(*int)(unsafe.Pointer(uintptr(ps) + 16)))
}
```

```
jack
18
2 
```



## Add

```go
func Add(ptr Pointer, len IntegerType) Pointer
```

`Add`将返回使用偏移量`len`更新后的`Pointer`，等价于`Pointer(uintptr(ptr) + uintptr(len))`

```go
Pointer(uintptr(ptr) + uintptr(len))
```

例如：

```go
func main() {
   s := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
   ps := unsafe.Pointer(&s[0])
   fmt.Println(*(*int)(unsafe.Add(ps, 8)))
   fmt.Println(*(*int)(unsafe.Add(ps, 16)))
}
```

```
2
3
```



## SliceData

```go
func SliceData(slice []ArbitraryType) *ArbitraryTyp
```

该函数接收一个切片，返回其底层数组的其实地址。如果不使用`SliceData`，那么只能通过取其第一个元素的指针来获取底层数组的地址，如下

```go
func main() {
	nums := []int{1, 2, 3, 4}
	for p, i := unsafe.Pointer(&nums[0]), 0; i < len(nums); p, i = unsafe.Add(p, unsafe.Sizeof(nums[0])), i+1 {
		num := *(*int)(p)
		fmt.Println(num)
	}
}
```

当然也可以通过`reflect.SliceHeader`类型来获取，不过在1.20版本以后它就已经被废弃了，`SliceData`就是为了替代它的，使用`SliceData`的例子如下

```go
func main() {
	nums := []int{1, 2, 3, 4}
	for p, i := unsafe.Pointer(unsafe.SliceData(nums)), 0; i < len(nums); p, i = unsafe.Add(p, unsafe.Sizeof(int(0))), i+1 {
		num := *(*int)(p)
		fmt.Println(num)
	}
}
```





## Slice

```
func Slice(ptr *ArbitraryType, len IntegerType) []ArbitraryType
```

`Slice`函数接收一个指针，以及长度偏移量，它会返回该段内存的切片表达形式，过程中不会涉及到内存拷贝，对切片进行修改将会直接影响该地址上的数据，反过来也是如此，它通常和`SliceData`配合起来使用。

```go
func main() {
	nums := []int{1, 2, 3, 4}
	numsRef1 := unsafe.Slice(unsafe.SliceData(nums), len(nums))
	numsRef1[0] = 2
	fmt.Println(nums)
}
```

```
[2 2 3 4]
```

修改`numsRef1`切片的数据，会导致`nums`的数据也会发生变化



## StringData

```
func StringData(str string) *byte
```

同`SliceData`函数，只不过因为字符串转字节切片需求比较频繁，所以单独拿出来，使用例子如下

```go
func main() {
	str := "hello,world!"
	for ptr, i := unsafe.Pointer(unsafe.StringData(str)), 0; i < len(str); ptr, i = unsafe.Add(ptr, unsafe.Sizeof(byte(0))), i+1 {
		char := *(*byte)(ptr)
		fmt.Println(string(char))
	}
}
```

由于字符串字面量是存放在进程中的只读段，所以如果你在这里尝试修改字符串底层的数据，程序会直接崩掉报`fatal`。不过对于存放在堆栈上的字符串变量而言，在运行时修改其底层的数据是完全可行的。



## String

```go
func String(ptr *byte, len IntegerType) string
```

同`Slice`函数，接收一个字节类型指针，以及其长度偏移量，返回其字符串表达形式，过程中不涉及内存拷贝。下面是一个字节切片转字符串的例子

```go
func main() {
	bytes := []byte("hello world")
	str := unsafe.String(unsafe.SliceData(bytes), len(bytes))
	fmt.Println(str)
}
```

`StringData`和`String`在字符串与字节切片的转换过程中不涉及内存拷贝，性能比直接类型转换要好，不过只适用于只读的情况下，如果你打算修改数据，就最好别用这个。
