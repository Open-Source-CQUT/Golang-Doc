# slice

::: tip

阅读本文需要`unsafe`标准库的知识。

:::

在了解切片的结构之前，通过几个案例来引入问题，通常会认为数组是值类型，切片是引用类型，或者说切片本身可以看作一个指针，指针指向的正是底层数组。

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

`println(slice)`输出指针所指向的地址，而`&slice`则是指针的地址，切片的初始容量为0，当添加一个元素后，因容量不足，就会分配一个新的底层数组，所以在添加前后，切片指向的是两个不同的底层数组。那如果接下来这种情况呢？

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

继续思考一个问题，那如果容量足够呢？看下面的一个例子，将切片的初始容量设置为了`10000`。

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

从理论上来说，容量足够，就不会扩容，也就不会分配新数组，那元素应该可以添加成功。但是结果中可以看出，尽管全程操作的底层数组都是同一个，`add`函数执行完后，从原切片的角度来看依旧没有成功添加。在整个过程中，有一个点很关键，那就是长度的变化，在`add`函数内部，添加元素后的切片长度为10，而在函数执行完后，原切片的长度依旧为2，这就导致了都是同一个底层数组，但是输出的元素却不同，而究竟为何会如此，这就引出了本节真正的内容，切片的原理。

<br>

## 数据结构

事实上，切片其实是一个结构体，该类型为`runtime.slice`。

```go
type slice struct {
	array unsafe.Pointer
	len   int
	cap   int
}
```

该结构体是不对外暴露的，官方提供了一个对外暴露的版本，`reflect.SliceHeader`。

```go
type SliceHeader struct {
	Data uintptr
	Len  int
	Cap  int
}
```

后者才是切片的运行时表示，因此就可以通过`unsafe.Pointer`来访问其字段和底层数组，同一个底层数组可以被多个切片引用。

```go
func main() {
   slice := []int{1, 2, 3, 4, 5}
   arr := *(*[5]int)(unsafe.Pointer((*(*reflect.SliceHeader)(unsafe.Pointer(&slice))).Data))
   fmt.Println(arr[0])
}
```

```
1
```

再回去看之前的案例，通过`Pointer`直接访问底层数组

```go
func main() {
	slice := make([]int, 2, 10000)
	add(slice)
	fmt.Println(len(slice))
	p := unsafe.Pointer((*reflect.SliceHeader)(unsafe.Pointer(&slice)).Data)
	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", *(*int)(unsafe.Add(p, uintptr(i)*unsafe.Sizeof(int(0)))))
	}
}

func add(s []int) {
	s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
	fmt.Println(len(s))
}
```

切片`slice`与切片`s`是两个不同的切片结构体，函数参数是值传递的，因此`s`是`slice`的值拷贝，但是它们指向的都是同一个底层数组，在`add`函数中向切片`s`添加了8个元素，由于容量足够而没有扩容，所以操作的都是同一个底层数组，因此底层数组也确确实实的被修改了，`append`函数的返回值是一新的切片结构体，于是对于切片`s`而言，长度被更新了，但是这对于作为实参的切片`slice`而言一点影响也没有，它认为底层数组的元素数量依旧是2个，所以无论是通过索引取值还是遍历都无法访问长度以外的元素，当下标大于1的时候也会抛出`panic`。为了证明一点可以使用`unsafe` 操作通过内存地址来访问底层数组，通过输出结果可以发现，尽管`slice`显示的长度只有2，但底层数组的有效元素个数确实为10，并且可以通过指针运算直接读取。就算持有相同的数组引用，即便长度相同，也无法访问到数组的其余元素，这是切片的安全性的体现，使用切片的调用者只需要关注切片层面，不需要关注底层数组的变化。

```
10
2                   
0 0 1 2 3 4 5 6 7 8 
```

也可以手动更换切片底层数组

```go
func main() {
   slice := make([]int, 2, 10000)
   fmt.Println(len(slice))
   arr := [5]int{9, 8, 7, 6, 5}
   (*reflect.SliceHeader)(unsafe.Pointer(&slice)).Data = uintptr(unsafe.Pointer(&arr))
   fmt.Println(len(slice))
   fmt.Println(slice[0])
}
```

可以看到指向一个新的底层数组后，通过切片获取的元素也发生变化。

```
2
2
9
```



## 创建

通常情况下，创建切片方法有，字面量和`make`关键字。

### make

在使用`make`创建切片时，表达式如`make([]int,5,5)`在编译期间会转换为如下结构体

```go
type CallExpr struct {
   miniExpr
   origNode
   X         Node
   Args      Nodes
   KeepAlive []*Name // vars to be kept alive until call returns
   IsDDD     bool
   NoInline  bool
}
```

随后将结构体传入`tcmake`函数中

```go
func tcMake(n *ir.CallExpr) ir.Node
```

首先会对第一个参数进行类型检查

```go
func tcMake(n *ir.CallExpr) ir.Node {
	args := n.Args
	if len(args) == 0 {
		base.Errorf("missing argument to make")
		n.SetType(nil)
		return n
	}

	n.Args = nil
    // 拿到第一个参数
	l := args[0]
    // 进行类型检查
	l = typecheck(l, ctxType)
    // 拿到类型
	t := l.Type()
    // 判空
	if t == nil {
		n.SetType(nil)
		return n
	}
    ...
}
```

随后根据第一个参数判断出的类型对剩余的参数进行处理

```go
func tcMake(n *ir.CallExpr) ir.Node {
    // i表示待处理的参数下标
	i := 1
	var nn ir.Node
	switch t.Kind() {
	default:
		base.Errorf("cannot make type %v", t)
		n.SetType(nil)
		return n

	// 切片类型
	case types.TSLICE:
		// 参数数量判断
		if i >= len(args) {
			base.Errorf("missing len argument to make(%v)", t)
			n.SetType(nil)
			return n
		}

		// 长度
		l = args[i]
		i++
		l = Expr(l)
		// 容量
		var r ir.Node
        
		// 然后就是一堆情况判断
		if i < len(args) {
			r = args[i]
			i++
			r = Expr(r)
		}
		// 判空
		if l.Type() == nil || (r != nil && r.Type() == nil) {
			n.SetType(nil)
			return n
		}
		// 边界检查
		if !checkmake(t, "len", &l) || r != nil && !checkmake(t, "cap", &r) {
			n.SetType(nil)
			return n
		}
		// 长度必须小于容量
		if ir.IsConst(l, constant.Int) && r != nil && ir.IsConst(r, constant.Int) && constant.Compare(l.Val(), token.GTR, r.Val()) {
			base.Errorf("len larger than cap in make(%v)", t)
			n.SetType(nil)
			return n
		}
		// 最终到这里调用函数创建MakeExpr结构体
		nn = ir.NewMakeExpr(n.Pos(), ir.OMAKESLICE, l, r)
    ...
}
```

最后一切顺利的话会生成一个`MakeExpr`结构体，代表着类似`make(Type,Len,Cap)`这样的make表达式。

```go
type MakeExpr struct {
   miniExpr
   Len Node
   Cap Node
}
```

编译期间的初始化就结束了，最后兜兜转转来到运行时，交由`runtime.makeslice`来为要创建的切片分配内存。

```go
func makeslice(et *_type, len, cap int) unsafe.Pointer {
   // mem就是计算出来所需要的内存，overflow代表是否溢出
   // 内存 = 元素大小 * 切片容量
   mem, overflow := math.MulUintptr(et.size, uintptr(cap))
   if overflow || mem > maxAlloc || len < 0 || len > cap {
      mem, overflow := math.MulUintptr(et.size, uintptr(len))
      if overflow || mem > maxAlloc || len < 0 {
         panicmakeslicelen()
      }
      panicmakeslicecap()
   }

   // 分配内存
   return mallocgc(mem, et, true)
}
```

完成后，`makeslice`函数仅返回一个指向底层数组的指针，将其交给早就在编译期间由`tcSliceHeader`函数创建好了的`reflect.SliceHeader`结构体。

```go
func tcSliceHeader(n *ir.SliceHeaderExpr) ir.Node {
   t := n.Type()
   // 非空判断
   if t == nil {
      base.Fatalf("no type specified for OSLICEHEADER")
   }

   // 是否为切片类型
   if !t.IsSlice() {
      base.Fatalf("invalid type %v for OSLICEHEADER", n.Type())
   }

   // 底层数组引用是否有效
   if n.Ptr == nil || n.Ptr.Type() == nil || !n.Ptr.Type().IsUnsafePtr() {
      base.Fatalf("need unsafe.Pointer for OSLICEHEADER")
   }

   // 类型转换
   n.Ptr = Expr(n.Ptr)
   n.Len = DefaultLit(Expr(n.Len), types.Types[types.TINT])
   n.Cap = DefaultLit(Expr(n.Cap), types.Types[types.TINT])

   // 边界条件检查
   if ir.IsConst(n.Len, constant.Int) && ir.Int64Val(n.Len) < 0 {
      base.Fatalf("len for OSLICEHEADER must be non-negative")
   }

   if ir.IsConst(n.Cap, constant.Int) && ir.Int64Val(n.Cap) < 0 {
      base.Fatalf("cap for OSLICEHEADER must be non-negative")
   }

   if ir.IsConst(n.Len, constant.Int) && ir.IsConst(n.Cap, constant.Int) && constant.Compare(n.Len.Val(), token.GTR, n.Cap.Val()) {
      base.Fatalf("len larger than cap for OSLICEHEADER")
   }

   return n
}
```

至此，通过内置函数`make`创建切片完毕。

<br>

### 字面量

假如有如下的字面量初始化方式，

```go
slice := []int{1, 2, 3, 5, 6}
```

那么在编译期间将会转换成如下代码

```go
var underarr [5]int
underarr[0] = 1
underarr[1] = 2
underarr[2] = 3
underarr[3] = 5
underarr[4] = 6
ptr := new([5]int)
*ptr = underarr
slice := ptr[:]
```

<br>

### 切片表达式

对于切片表达式而言，在编译期间会被转换为一个结构体

```go
type SliceExpr struct {
   miniExpr
   X    Node
   Low  Node
   High Node
   Max  Node
}
```

假如有如下表达式，

```go
slice[0:5:5]
```

那么字段对应关系如下：

- `X` - `slice`
- `Low` - `0`
- `High` - `5`
- `Max` - `5`

在编译时传入`tcSlice`函数进行参数检查

```go
func tcSlice(n *ir.SliceExpr) ir.Node {
	n.X = DefaultLit(Expr(n.X), nil)
	n.Low = indexlit(Expr(n.Low))
	n.High = indexlit(Expr(n.High))
	n.Max = indexlit(Expr(n.Max))
	hasmax := n.Op().IsSlice3()
	l := n.X
	if l.Type() == nil {
		n.SetType(nil)
		return n
	}
    ...
}
```

随后在由`cmd\compile\internal\ssagen\ssa.slice`函数完成ssa转换，计算切片表达式，事实上字符串，数组，或指针都要由此函数计算表达式。

```go
func (s *state) slice(v, i, j, k *ssa.Value, bounded bool) (p, l, c *ssa.Value) {
   t := v.Type
   var ptr, len, cap *ssa.Value
   switch {
   case t.IsSlice():
      ptr = s.newValue1(ssa.OpSlicePtr, types.NewPtr(t.Elem()), v)
      len = s.newValue1(ssa.OpSliceLen, types.Types[types.TINT], v)
      cap = s.newValue1(ssa.OpSliceCap, types.Types[types.TINT], v)
   }
   ...   
}
```

最后转换为`ssa.OpSliceMake`，相当于创建一个新的切片结构体，填充新计算出的指针，长度与容量，且指针指向的是同一个数组，修改新切片同样会修改原切片。

```go
func (s *state) exprCheckPtr(n ir.Node, checkPtrOK bool) *ssa.Value {
    ...
    switch n.Op() {
       case ir.OSLICE, ir.OSLICEARR, ir.OSLICE3, ir.OSLICE3ARR:
           n := n.(*ir.SliceExpr)
           ...
           // 计算表达式
           p, l, c := s.slice(v, i, j, k, n.Bounded())
           ...
           return s.newValue3(ssa.OpSliceMake, n.Type(), p, l, c)
    }
    ...
}
```

<br>

## 访问

切片访问分为：下标访问，长度访问，容量访问，这些操作基本都是在编译期间完成的。

### 下标访问

对于如下的一个下标访问表达式

```go
slice[0]
```

首先在编译期会转换成如下结构体

```go
// An IndexExpr is an index expression X[Index].
type IndexExpr struct {
	miniExpr
	X        Node
	Index    Node
	Assigned bool
}
```

随后传入`tcIndex`函数，进行类型与参数检查，对于数组而言会在该函数内就检查下标是否越界，而切片则是在运行时根据字段`Len`来判断是否越界。

```go
func tcIndex(n *ir.IndexExpr) ir.Node {
	...
    case types.TSTRING, types.TARRAY, types.TSLICE:
        n.Index = indexlit(n.Index)
        if t.IsString() {
            n.SetType(types.ByteType)
        } else {
            n.SetType(t.Elem())
        }
        why := "string"
        if t.IsArray() {
            why = "array"
        } else if t.IsSlice() {
            why = "slice"
        }
    	// 下标类型检查
        if n.Index.Type() != nil && !n.Index.Type().IsInteger() {
            base.Errorf("non-integer %s index %v", why, n.Index)
            return n
        }

    	
        if !n.Bounded() && ir.IsConst(n.Index, constant.Int) {
            x := n.Index.Val()
            // 非负数
            if constant.Sign(x) < 0 {
                base.Errorf("invalid %s index %v (index must be non-negative)", why, n.Index)
            // 数组下标大于元素个数？
            } else if t.IsArray() && constant.Compare(x, token.GEQ, constant.MakeInt64(t.NumElem())) {
                base.Errorf("invalid array index %v (out of bounds for %d-element array)", n.Index, t.NumElem())
            // 字符串下标字符串长度？
            } else if ir.IsConst(n.X, constant.String) && constant.Compare(x, token.GEQ, constant.MakeInt64(int64(len(ir.StringVal(n.X))))) {
                base.Errorf("invalid string index %v (out of bounds for %d-byte string)", n.Index, len(ir.StringVal(n.X)))
            } else if ir.ConstOverflow(x, types.Types[types.TINT]) { // 数值溢出？
                base.Errorf("invalid %s index %v (index too large)", why, n.Index)
            }
    }
	...
}
```

最后也会在ssa转换成对地址的直接访问

```go
func (s *state) exprCheckPtr(n ir.Node, checkPtrOK bool) *ssa.Value {
    ...
    switch n.Op() {
        case ir.OINDEX:
		n := n.(*ir.IndexExpr)
		switch {
		case n.X.Type().IsSlice():
			p := s.addr(n)
			return s.load(n.X.Type().Elem(), p)
    }
    ...
}
```

<br>

### 长度容量

对于长度容量的话也是先类型检查，

```go
// tcLenCap typechecks an OLEN or OCAP node.
func tcLenCap(n *ir.UnaryExpr) ir.Node {
   n.X = Expr(n.X)
   n.X = DefaultLit(n.X, nil)
   n.X = implicitstar(n.X)
   l := n.X
   t := l.Type()
   if t == nil {
      n.SetType(nil)
      return n
   }

   var ok bool
   if n.Op() == ir.OLEN {
      ok = okforlen[t.Kind()]
   } else {
      ok = okforcap[t.Kind()]
   }
   if !ok {
      base.Errorf("invalid argument %L for %v", l, n.Op())
      n.SetType(nil)
      return n
   }

   n.SetType(types.Types[types.TINT])
   return n
}
```

然后ssa转换成`ssa.OpSliceLen`和`ssa.OpSliceCap`

```go
func (s *state) exprCheckPtr(n ir.Node, checkPtrOK bool) *ssa.Value {
    ...
    switch n.Op() {
        case ir.OLEN, ir.OCAP:
            n := n.(*ir.UnaryExpr)
            switch {
            case n.X.Type().IsSlice():
                op := ssa.OpSliceLen
                if n.Op() == ir.OCAP {
                    op = ssa.OpSliceCap
                }
                return s.newValue1(op, types.Types[types.TINT], s.expr(n.X))
            }

    }
    ...
}
```

<br>

## 添加

首先对于如下`append`语句

```go
slice = append(slice,7,8,9,10)
```

先会转换成如下表达式结构体

```go
// A CallExpr is a function call X(Args).
type CallExpr struct {
   miniExpr
   origNode
   X         Node
   Args      Nodes
   KeepAlive []*Name // vars to be kept alive until call returns
   IsDDD     bool
   NoInline  bool
}
```

然后对其进行类型检查，与之前类似都是进入`typecheck`函数的`switch`流程，这里不再赘述，最后来到`cmd\compile\internal\ssagen\ssa.append`函数，官方在注释中给出了一段**伪代码**简洁的解释了其流程，过程分为两种情况，主要区别在于是否覆盖原变量，不覆盖原变量的情况如下

```go
//append(s, e1, e2, e3)
ptr, len, cap := s
newlen := len + 3
// 新长度大于容量
if newlen > cap {
    // 扩容
    ptr, len, cap = growslice(s, newlen)
    // 重新计算长度
    newlen = len + 3
}
// 写入底层数组
*(ptr+len) = e1
*(ptr+len+1) = e2
*(ptr+len+2) = e3
// 返回新的切片
return makeslice(ptr, newlen, cap)
```

覆盖原变量的情况如下，逻辑差不多

```go
// s = append(s, e1, e2, e3)
a := &s
ptr, len, cap := s
newlen := len + 3
// 扩容
if uint(newlen) > uint(cap) {
   newptr, len, newcap = growslice(ptr, len, cap, newlen)
   vardef(a)       
   *a.cap = newcap 
   *a.ptr = newptr // 修改切片的底层数组引用
}
newlen = len + 3 // recalculate to avoid a spill
*a.len = newlen
// 写入新的底层数组
*(ptr+len) = e1
*(ptr+len+1) = e2
*(ptr+len+2) = e3
```

这里看伪代码更容易理解，源代码涉及许多ssa操作，比较冗杂。

<br>

## 扩容

在向切片中添加元素时，如果容量不足则切片会进行扩容操作，下面是`append`函数内进行扩容调用的关键代码

```go
// rtcall 调用运行时函数 Growslice
r := s.rtcall(ir.Syms.Growslice, true, []*types.Type{pt, types.Types[types.TINT], types.Types[types.TINT]}, taddr, p, l, c, nl)
```

扩容操作的源代码主要在`runtime.growslice`函数中，关于容量扩充的流程如下

```go
newcap := old.cap
doublecap := newcap + newcap
// 期望容量大于二倍旧容量
if cap > doublecap {
   newcap = cap
} else {
   const threshold = 256
   if old.cap < threshold {
      // 两倍扩充
      newcap = doublecap
   } else {
      for 0 < newcap && newcap < cap {
         // 1.25倍扩充
         newcap += (newcap + 3*threshold) / 4
      }
      // 当容量数值溢出时，直接使用期望容量。
      if newcap <= 0 {
         newcap = cap
      }
   }
}
```

::: tip

扩容的`threshold`值可能会随着版本的变化而变化，例如在以前其值为1024，在版本1.19就为256。

:::

Go将旧容量小于256的切片视为小切片，大于等于256的切片视为大切片，如果期望容量大于二倍旧容量，那么就将期望容量直接作为新容量，否则按照以下规则扩容

- 对于小切片：每次扩容都为旧容量的两倍
- 对于大切片：不断将旧容量乘`4/3`，直到大于期望容量。

随后根据切片中的元素类型的大小进行内存对齐，分为三种情况：

- 1
- 机器字长，32位为4，64位为8
- 2次幂

随后计算预计要分配的内存，然后向上取整，对于前两种情况最终容量为内存/元素类型大小，第三种情况则为`mem >> shift `

```go
switch {
case et.size == 1:
   lenmem = uintptr(old.len)
   newlenmem = uintptr(cap)
   capmem = roundupsize(uintptr(newcap))
   overflow = uintptr(newcap) > maxAlloc
   newcap = int(capmem)
case et.size == goarch.PtrSize:
   lenmem = uintptr(old.len) * goarch.PtrSize
   newlenmem = uintptr(cap) * goarch.PtrSize
   capmem = roundupsize(uintptr(newcap) * goarch.PtrSize)
   overflow = uintptr(newcap) > maxAlloc/goarch.PtrSize
   newcap = int(capmem / goarch.PtrSize)
case isPowerOfTwo(et.size):
   var shift uintptr
   if goarch.PtrSize == 8 {
      // Mask shift for better code generation.
      shift = uintptr(sys.Ctz64(uint64(et.size))) & 63
   } else {
      shift = uintptr(sys.Ctz32(uint32(et.size))) & 31
   }
   lenmem = uintptr(old.len) << shift
   newlenmem = uintptr(cap) << shift
   capmem = roundupsize(uintptr(newcap) << shift)
   overflow = uintptr(newcap) > (maxAlloc >> shift)
   newcap = int(capmem >> shift)
default:
   lenmem = uintptr(old.len) * et.size
   newlenmem = uintptr(cap) * et.size
   capmem, overflow = math.MulUintptr(et.size, uintptr(newcap))
   capmem = roundupsize(capmem)
   newcap = int(capmem / et.size)
}
```

 最后会使用`runtime.memmove`函数将原数组内存拷贝到新的内存中。

<br>

## 拷贝

切片拷贝的原理是直接将整块底层数组的内存复制到新内存中，在运行时的切片拷贝由`runtime.copy`函数完成。

```go
func slicecopy(toPtr unsafe.Pointer, toLen int, fromPtr unsafe.Pointer, fromLen int, width uintptr) int {
   if fromLen == 0 || toLen == 0 {
      return 0
   }

   n := fromLen
   if toLen < n {
      n = toLen
   }

   if width == 0 {
      return n
   }

   size := uintptr(n) * width
   if raceenabled {
      callerpc := getcallerpc()
      pc := abi.FuncPCABIInternal(slicecopy)
      racereadrangepc(fromPtr, size, callerpc, pc)
      racewriterangepc(toPtr, size, callerpc, pc)
   }
   if msanenabled {
      msanread(fromPtr, size)
      msanwrite(toPtr, size)
   }
   if asanenabled {
      asanread(fromPtr, size)
      asanwrite(toPtr, size)
   }

   if size == 1 { // common case worth about 2x to do here
      // TODO: is this still worth it with new memmove impl?
      *(*byte)(toPtr) = *(*byte)(fromPtr) // known to be a byte pointer
   } else {
      // 复制内存
      memmove(toPtr, fromPtr, size)
   }
   return n
}
```

需要注意的是，切片越大，拷贝的性能消耗也就越大。
