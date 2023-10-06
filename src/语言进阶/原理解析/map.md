# map

在go中与其它语言不同的是，映射表的支持是由`map`关键字提供的，而非将其封装为标准库。映射表是一种使用场景非常多的数据结构，底层有着许多的实现方式，最常见的两种方式就是红黑树和哈希表，go采用的是哈希表实现方式。



## 内部结构

`runtime.hmap`结构体就是代表着go中的`map`，与切片一样`map`的内部实现也是结构体。

```go
// A header for a Go map.
type hmap struct {
	// Note: the format of the hmap is also encoded in cmd/compile/internal/reflectdata/reflect.go.
	// Make sure this stays in sync with the compiler's definition.
	count     int // # live cells == size of map.  Must be first (used by len() builtin)
	flags     uint8
	B         uint8  // log_2 of # of buckets (can hold up to loadFactor * 2^B items)
	noverflow uint16 // approximate number of overflow buckets; see incrnoverflow for details
	hash0     uint32 // hash seed

	buckets    unsafe.Pointer // array of 2^B Buckets. may be nil if count==0.
	oldbuckets unsafe.Pointer // previous bucket array of half the size, non-nil only when growing
	nevacuate  uintptr        // progress counter for evacuation (buckets less than this have been evacuated)

	extra *mapextra // optional fields
}
```

英文注释已经说明的很清晰了，下面对比较重要的字段进行一些简单的解释

- `count`，表示hamp中的元素数量，结果等同于`len(map)`。

- `flags`，hmap的标志位，用于表示hmap处于什么状态，有以下几种可能。

    ```go
    const (
        iterator     = 1 // 迭代器正在使用桶
        oldIterator  = 2 // 迭代器正在使用旧桶
        hashWriting  = 4 // 一个协程正在写入hmap
        sameSizeGrow = 8 // 当前map扩容成一个相同容量的新map，即等量扩容
    )
    ```

- `B`，表示hamp中哈希桶的数量，通常是`2^n`。

- `noverflow`，hmap中溢出桶的大致数量。

- `hash0`，哈希种子，在hmap被创建时指定，用于计算哈希值。

- `buckets`，存放哈希桶数组的指针。

- `oldbuckets`，存放hmap在扩容前哈希桶数组的指针。

- `extra`，存放着hmap中的溢出桶，溢出桶指的是就是当前桶已经满了，创建新的桶来存放元素，新创建的桶就是溢出桶。

hamp中的`bucket`也就是桶，在go中对应的结构为`runtime.bmap`，如下所示

```go
// A bucket for a Go map.
type bmap struct {
	// tophash generally contains the top byte of the hash value
	// for each key in this bucket. If tophash[0] < minTopHash,
	// tophash[0] is a bucket evacuation state instead.
	tophash [bucketCnt]uint8
	// Followed by bucketCnt keys and then bucketCnt elems.
	// NOTE: packing all the keys together and then all the elems together makes the
	// code a bit more complicated than alternating key/elem/key/elem/... but it allows
	// us to eliminate padding which would be needed for, e.g., map[int64]int8.
	// Followed by an overflow pointer.
}
```

从上面可以看到它只有一个`tophash`的字段，该字段是用于存放每个键的高八位，不过实际上来说，`bmap`的字段不止这些，这是因为`map`可以存储各种类型的键值对，所以需要在编译时根据类型来推导占用的内存空间，在源代码`cmd/compile/internal/reflectdata/reflect.go`中，有着相关的介绍。所以实际上，`bmap`的结构如下

```go
type bmap struct {
	tophash [BUCKETSIZE]uint8
	keys [BUCKETSIZE]keyType
	elems [BUCKETSIZE]elemType
	overflow *bucket
}
```

不过这些字段对我们是不可见的，其中的一些解释如下

- `tophash`，存放每一个键的高八位值
- `keys`，存放指定类型键的数组。
- `elems`，存放指定类型值的数组。
- `overflow`，指向溢出桶的指针。

在`cmd/compile/internal/reflectdata/reflect.go`中的`MapBucketType`函数的功能就是创建bucket，它会进行一系列检查工作，比如key的类型是否`comparable`。

```go
// MapBucketType makes the map bucket type given the type of the map.
func MapBucketType(t *types.Type) *types.Type
```



## 哈希冲突

在hmap中，有一个字段`extra`专门用来存放溢出桶的信息，它会指向存放溢出桶的切片，其结构如下。

```go
type mapextra struct {
	// 溢出桶的指针切片
	overflow    *[]*bmap
	// 扩容前旧的溢出桶的指针切片
	oldoverflow *[]*bmap
	// 指向下一个空闲的溢出桶的指针
	nextOverflow *bmap
}
```

<img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202310061622883.png" style="zoom: 50%;" />

上图就可以比较好的展示hmap的大致结构，`buckets`指向原有的桶切片，`extra`指向溢出桶切片，桶`bucket0`指向溢出桶`overflow0`，两种不同的桶分别存放在两个切片中，两种桶的内存都是连续的。当两个键通过哈希后被分配到了同一个bucket，这种情况就是发生了哈希冲突。go中解决哈希冲突的方式就是拉链法，当发生冲突的键的数量大于桶的容量后，一般是8个，其值取决于`internal/abi.MapBucketCount`。然后就会创建一个新的桶来存放这些键，而这个桶就叫溢出桶，意为原来的桶装不下了，元素溢出到这个新桶里来了，创建完毕后，原有的桶会有一个指针指向新的溢出桶，这些桶的指针连起来就形成了一个链表。

对于拉链法而言，负载因子可以用于衡量哈希表的冲突情况，其计算公式如下

```go
loadfactor := len(elems) / len(buckets)
```

当负载因子越大时，说明哈希冲突越多，也就是溢出桶的数量越多，那么在读写哈希表时，就需要遍历更多的溢出桶链表，才能找到指定的位置，所以性能就越差。为了改善这种情况，应该增加`buckets`桶的数量，也就是扩容，对于hmap而言，有两种情况会触发扩容

- 负载因子超过一定阈值`bucketCnt*13/16`，至少是6.5。
- 溢出桶过多

当负载因子越小时，说明hmap的内存利用率低，占用的内存就越大。go中用于计算负载因子的函数是`runtime.overLoadFactor`

```go
func overLoadFactor(count int, B uint8) bool {
	return count > bucketCnt && uintptr(count) > loadFactorNum*(bucketShift(B)/loadFactorDen)
}
```

其中`loadFactorNum`和`loadFactorDen`都是一个常数，`bucketshift`是计算`1 << B`，并且已知

```go
loadFactorNum = (bucketCnt * 13 / 16) * loadFactorDen
```

所以化简一下就能得到

```go
count > bucketCnt && uintptr(count) / 1 << B > (bucketCnt * 13 / 16)
```

其中`(bucketCnt * 13 / 16)`值为6.5，所以该函数的作用就是计算元素数量除以桶的数量值是否大于负载因子6.5。



## 创建

map的初始化有两种方式，这一点已经在语言入门中阐述过了。不管用何种方式初始化，最后都是由`runtime.makemap`来创建map，该函数签名如下

```go
func makemap(t *maptype, hint int, h *hmap) *hmap
```

其中的参数

- `t`，指的是map的类型，不同的类型所需的内存占用不同
- `hint`，指的是`make`函数的第二个参数，map预计元素的容量。
- `h`，指的是`hmap`的指针，可以为`nil`。

返回值就是初始化完毕的`hmap`指针。该函数在初始化过程中有几个主要的工作。首先就是计算预计分配的内存是否会超出最大分配内存，对应如下代码

```go
// 将预计容量与桶类型的内存大小相乘
mem, overflow := math.MulUintptr(uintptr(hint), t.Bucket.Size_)
// 数值溢出或者超出了最大分配内存
if overflow || mem > maxAlloc {
    hint = 0
}
```

在先前的内部结构中已经提到过，hmap内部是由桶组成的，在内存利用率最低的情况下，一个桶只有一个元素，占用的内存最多，所以预计的最大占用内存就是元素容量乘以对应类型的内存占用。如果计算结果数值溢出了，或者超出了最大能分配的内存，就将hint置为0，因为后续需要用hint来计算桶数组的容量。

然后初始化hmap，并计算出一个随机的哈希种子，对应如下代码

```go
// 初始化
if h == nil {
    h = new(hmap)
}
// 获取一个随机的哈希种子
h.hash0 = fastrand()
```

再根据hint的值计算出哈希桶的容量，对应的代码如下

```go
B := uint8(0)
// 不断循环直到 hint / 1 << B < 6.5
for overLoadFactor(hint, B) {
    B++
}
// 赋值给hmap
h.B = B
```

通过不断循环找到第一个满足`(hint / 1 << B) < 6.5`的B值，将其赋值给hmap，在知晓了哈希桶的容量后，然后就是为哈希桶分配内存

```go
if h.B != 0 {
    var nextOverflow *bmap
    // 分配好的哈希桶，和预先分配的空闲溢出桶
    h.buckets, nextOverflow = makeBucketArray(t, h.B, nil)
    // 如果预先分配了空闲溢出桶，就指向该溢出桶
    if nextOverflow != nil {
        h.extra = new(mapextra)
        h.extra.nextOverflow = nextOverflow
    }
}
```

`makeBucketArray`函数会根据B的值，为哈希桶分配对应大小的内存，以及预先分配好空闲的溢出桶，当B小于4时，就不会创建溢出桶，如果大于4那么就会创建`2^B-4`个溢出桶。对应`runtime.makeBucketArray`函数中的如下代码

```go
base := bucketShift(b)
nbuckets := base
// 小于4就不会创建溢出桶
if b >= 4 {
    // 预计桶的数量加上1 << (b-4)
    nbuckets += bucketShift(b - 4)
    // 溢出桶所需的内存
    sz := t.Bucket.Size_ * nbuckets
    // 将内存空间向上取整
    up := roundupsize(sz)
    if up != sz {
        // 不相等就采用up重新计算
        nbuckets = up / t.Bucket.Size_
    }
}
```

`base`指的是预计分配桶的数量，`nbuckets`指的是实际分配桶的数量，因为它加上了溢出桶的数量。

```go
if base != nbuckets {
    // 第一个可用的溢出桶
    nextOverflow = (*bmap)(add(buckets, base*uintptr(t.BucketSize)))
    // 为了减少跟踪溢出桶的开销，将最后一个可用溢出桶的溢出指针指向哈希桶的头部
    last := (*bmap)(add(buckets, (nbuckets-1)*uintptr(t.BucketSize)))
    last.setoverflow(t, (*bmap)(buckets))
}
```

当两者不相等时，就说明分配了溢出桶，`nextoverflow`指针就是指向的第一个可用的溢出桶。由此可见，哈希桶与溢出桶其实是在同一块连续的内存中，这是为什么在之前的图中会将哈希桶与溢出桶放在一起的原因。
