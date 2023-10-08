---
date: 2022-10-21
---
# math

`math`是Go中的基本数学操作库，也是必须要熟练掌握和使用的库。



## 整数常量

```go
const (
   intSize = 32 << (^uint(0) >> 63) // 32 or 64

   MaxInt    = 1<<(intSize-1) - 1
   MinInt    = -1 << (intSize - 1)
   MaxInt8   = 1<<7 - 1
   MinInt8   = -1 << 7
   MaxInt16  = 1<<15 - 1
   MinInt16  = -1 << 15
   MaxInt32  = 1<<31 - 1
   MinInt32  = -1 << 31
   MaxInt64  = 1<<63 - 1
   MinInt64  = -1 << 63
   MaxUint   = 1<<intSize - 1
   MaxUint8  = 1<<8 - 1
   MaxUint16 = 1<<16 - 1
   MaxUint32 = 1<<32 - 1
   MaxUint64 = 1<<64 - 1
)
```



## 浮点常量

```go
const (
   MaxFloat32             = 0x1p127 * (1 + (1 - 0x1p-23)) // 3.40282346638528859811704183484516925440e+38
   SmallestNonzeroFloat32 = 0x1p-126 * 0x1p-23            // 1.401298464324817070923729583289916131280e-45

   MaxFloat64             = 0x1p1023 * (1 + (1 - 0x1p-52)) // 1.79769313486231570814527423731704356798070e+308
   SmallestNonzeroFloat64 = 0x1p-1022 * 0x1p-52            // 4.9406564584124654417656879286822137236505980e-324
)
```



## 数学常量

```go
const (
   E   = 2.71828182845904523536028747135266249775724709369995957496696763 // https://oeis.org/A001113
   Pi  = 3.14159265358979323846264338327950288419716939937510582097494459 // https://oeis.org/A000796
   Phi = 1.61803398874989484820458683436563811772030917980576286213544862 // https://oeis.org/A001622

   Sqrt2   = 1.41421356237309504880168872420969807856967187537694807317667974 // https://oeis.org/A002193
   SqrtE   = 1.64872127070012814684865078781416357165377610071014801157507931 // https://oeis.org/A019774
   SqrtPi  = 1.77245385090551602729816748334114518279754945612238712821380779 // https://oeis.org/A002161
   SqrtPhi = 1.27201964951406896425242246173749149171560804184009624861664038 // https://oeis.org/A139339

   Ln2    = 0.693147180559945309417232121458176568075500134360255254120680009 // https://oeis.org/A002162
   Log2E  = 1 / Ln2
   Ln10   = 2.30258509299404568401799145468436420760110148862877297603332790 // https://oeis.org/A002392
   Log10E = 1 / Ln10
)
```



## 最大值

```go
func TestMax(t *testing.T) {
	fmt.Println(math.Max(1.0, 2.0))
}
```

```
=== RUN   TestMax
2
--- PASS: TestMax (0.00s)
PASS
```



## 最小值

```go
func TestMin(t *testing.T) {
   fmt.Println(math.Min(1.0, 2.0))
}
```

```
=== RUN   TestMin
1
--- PASS: TestMin (0.00s)
PASS
```



## 绝对值

```go
func TestAbs(t *testing.T) {
   fmt.Println(math.Abs(-1))
}
```

```
=== RUN   TestAbs
1
--- PASS: TestAbs (0.00s)
PASS
```



## 余数

```go
func TestMod(t *testing.T) {
   fmt.Println(math.Mod(1, 10))
   fmt.Println(math.Mod(12, 10))
}
```

```
=== RUN   TestMod
1
2
--- PASS: TestMod (0.00s)
PASS
```



## Nan检测

```go
func TestName(t *testing.T) {
   fmt.Println(math.IsNaN(math.NaN()))
}
```

```
=== RUN   TestFloor
2
--- PASS: TestFloor (0.00s)
PASS
```



## Inf检测

```go
func TestInf(t *testing.T) {
   fmt.Println(math.IsInf(1.0, 1))
   fmt.Println(math.IsInf(math.Inf(-1), -1))
}
```

```
=== RUN   TestInf
false
true
--- PASS: TestInf (0.00s)
PASS
```



## 取整

```go
func TestTrunc(t *testing.T) {
   fmt.Println(math.Trunc(1.26))
   fmt.Println(math.Trunc(2.3333))
}
```

```
=== RUN   TestTrunc
1
2
--- PASS: TestTrunc (0.00s)
PASS
```



## 向下取整

```go
func TestFloor(t *testing.T) {
   fmt.Println(math.Floor(2.5))
}
```

```
=== RUN   TestFloor
2
--- PASS: TestFloor (0.00s)
PASS
```



## 向上取整

```go
func TestCeil(t *testing.T) {
   fmt.Println(math.Ceil(2.5))
}
```

```
=== RUN   TestCeil
3
--- PASS: TestCeil (0.00s)
PASS
```



## 四舍五入

```go
func TestRound(t *testing.T) {
   fmt.Println(math.Round(1.2389))
   fmt.Println(math.Round(-5.2389))
}
```

```
=== RUN   TestRound
1
-5
--- PASS: TestRound (0.00s)
PASS
```



## 求对数

```go
func TestLog(t *testing.T) {
   fmt.Println(math.Log(100) / math.Log(10))
   fmt.Println(math.Log(1) / math.Log(2))
}
```

```
=== RUN   TestLog
2
0
--- PASS: TestLog (0.00s)
PASS
```



## E的指数

```go
func TestEx(t *testing.T) {
   fmt.Println(math.Exp(2))
}
```

```
=== RUN   TestEx
7.38905609893065
--- PASS: TestEx (0.00s)
PASS
```



## 幂

```go
func TestPow(t *testing.T) {
   fmt.Println(math.Pow(2, 3))
   fmt.Println(math.Pow(3, 3))
}
```

```
=== RUN   TestPow
8
27
--- PASS: TestPow (0.00s)
PASS
```



## 平方根

```go
func TestSqrt(t *testing.T) {
	fmt.Println(math.Sqrt(4))
}
```

```
=== RUN   TestSqrt
2
--- PASS: TestSqrt (0.00s)
PASS
```



## 立方根

```go
func TestCube(t *testing.T) {
   fmt.Println(math.Cbrt(8))
   fmt.Println(math.Cbrt(27))
}
```

```
=== RUN   TestCube
2
3
--- PASS: TestCube (0.00s)
PASS
```



## 开N方

```go
func TestN(t *testing.T) {
	fmt.Println(math.Round(math.Pow(8, 1.0/3)))
	fmt.Println(math.Round(math.Pow(100, 1.0/2)))
}
```

```
=== RUN   TestN
2
10
--- PASS: TestN (0.00s)
PASS
```



## Sin

```go
func TestSin(t *testing.T) {
   fmt.Println(math.Sin(0))
   fmt.Println(math.Sin(20))
}
```

```
=== RUN   TestSin
0
0.9129452507276277
--- PASS: TestSin (0.00s)
PASS
```



## Cos

```go
func TestCos(t *testing.T) {
   fmt.Println(math.Cos(0))
   fmt.Println(math.Cos(20))
}
```

```
=== RUN   TestCos
1
0.40808206181339196
--- PASS: TestCos (0.00s)
PASS
```



## Tan

```go
func TestTan(t *testing.T) {
   fmt.Println(math.Tan(0))
   fmt.Println(math.Tan(20))
}
```

```
=== RUN   TestTan
0
2.2371609442247427
--- PASS: TestTan (0.00s)
PASS
```



::: tip

`math`包下远不止以上函数，不过已经足够满足日常使用，如需深究，可以自行阅读源码。

:::