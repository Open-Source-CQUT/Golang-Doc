# 切片原理

在Go中，数组是值类型，切片是引用类型，或者说切片本身可以看作一个指针，指针指向的正是底层数组。

```go
func main() {
   slice := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
   println(&slice)
   println(&slice[0])
}
```

前者是切片指针的地址，后者是切片底层数组的地址。

```
0xc000059f58
0xc000059f08
```

官方文档中有说明使用`append`函数给切片添加元素时，当切片容量不足时，会创建一个新的底层数组。

```go
func main() {
   slice := make([]int, 0, 0)
   println(slice)
   println(&slice)
   slice = append(slice, 1)
   println(slice)
   println(&slice)
}
```

```
[0/0]0xc000059f50
0xc000059f58     
[1/1]0xc000088000
0xc000059f58     
```

`println(slice)`输出指针所指向的地址，而`&slice`则是指针的地址，切片的初始容量为0，当添加一个元素后，因容量不足，就会分配一个新的底层数组，所以在添加前后，切片指向的是两个不同的底层数组。再看一个例子

```go
func main() {
	slice := []int{1, 2}
	println(slice)
	println(&slice)
	add(slice)
	println(slice)
	println(&slice)
}

func add(s []int) {
	println(s)
	println(&s)
	s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
	println(s)
	println(&s)
}
```

```
[2/2]0xc000059f30  
0xc000059f40       
[2/2]0xc000059f30  
0xc000059f58       
[10/10]0xc0000180f0
0xc000059f58       
[2/2]0xc000059f30  
0xc000059f40   
```

初始的`slice`容量只有2，指向的底层数组地址为`0xc000059f30  `，`slice`的地址为`0xc000059f40  `，由于Go中的函数参数是值传递的，所以形参`s`拷贝了`slice`的值，而`slice`的值就是底层数组的地址，所以`slice`和`s`指向的都是同一个底层数组。而后使用`append`函数添加了9个元素，由于容量不足，于是Go给`s`分配了一个新的底层数组，于是`s`指向的底层数组地址变为`0xc0000180f0`，但是改变形参的值，完全不会影响到实参的值，因为两者本身的内存地址不同，这导致了`slice`指向的底层数组地址依旧是`0xc000059f30`，结果就是`add`函数并没有将元素成功添加进`slice`。

<br>

那如果容量足够呢？看下面的一个例子，将切片的初始容量设置为了`10000`。

```go
func main() {
	slice := make([]int, 2, 10000)
	println(slice)
	println(&slice)
	println(len(slice))
	add(slice)
	println(slice)
	println(&slice)
	println(len(slice))
	fmt.Println(slice)
}

func add(s []int) {
	println(s)
	println(&s)
	println(len(s))
	s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
	println(s)
	println(&s)
	println(len(s))
	fmt.Println(s)
}
```

```
[2/10000]0xc00011a000 
0xc000115f58          
2                     
[2/10000]0xc00011a000 
0xc000115f18          
2                     
[10/10000]0xc00011a000
0xc000115f18          
10                    
[0 0 1 2 3 4 5 6 7 8] 
[2/10000]0xc00011a000 
0xc000115f58          
2                     
[0 0]    
```

从结果中可以看出，尽管全程操作的底层数组都是同一个，`add`函数执行完后，从原切片的角度来看依旧没有成功添加。在整个过程中，有一个点很关键，那就是长度的变化，在`add`函数内部，添加元素后的切片长度为10，而在函数执行完后，原切片的长度依旧为2，这就导致了都是同一个底层数组，但是输出的元素却不同。

