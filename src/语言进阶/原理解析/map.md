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

- `keys`，存放指定类型键的数组。
- `elems`，存放指定类型值的数组。
- `overflow`，指向溢出桶的指针。

在`cmd/compile/internal/reflectdata/reflect.go`中的`MapBucketType`函数的功能就是创建bucket，它会进行一系列检查工作，比如key的类型是否`comparable`。

```go
// MapBucketType makes the map bucket type given the type of the map.
func MapBucketType(t *types.Type) *types.Type
```



## 哈希冲突

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202310051941295.png)

当两个键通过计算哈希后被分配到了同一个bucket，这种情况就是发生了哈希冲突。go中解决哈希冲突的方式就是拉链法，当发生冲突的键的数量大于桶的容量后，就会创建一个新的桶来存放这些键，这个桶就叫溢出桶，原有的桶则会指向新的溢出桶。而在hmap中，有一个字段`extra`专门用来存放溢出桶的信息，它的结构如下

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

