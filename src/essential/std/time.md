---
date: 2022-10-23
---
# time

`time`包提供了时间和日历的相关的函数与方法。

`time.Now()`函数可以获取当前时间

```go
func Now() Time 
```

```go
now := time.Now()
fmt.Println(now)
//2022-11-17 10:00:18.6983438 +0800 CST m=+0.007095001
```

其返回的数据类型是`Time`结构体，其含有非常多的时间操作的方法。

```go
func (t *Time) nsec() int32 //纳秒

func (t *Time) sec() int64 //秒

func (t *Time) unixSec() //返回 Unix时间格式的 秒

func (t *Time) addSec(d int64) //增加秒

func (t *Time) setLoc(loc *Location) //设置地区

func (t *Time) stripMono() //去掉时间的单调时钟读数

func (t Time) After(u Time) //判断一个时间是否在它之后

func (t Time) Before(u Time) bool //判断一个时间是否在它之前

func (t Time) Equal(u Time) bool //判断两个时间是否表示同一瞬间

func (t Time) Sub(u Time) Duration //求两个时间的差值

func (t Time) Add(d Duration) Time //增加一段时间间隔
```



## 时间单位

`time`包存放了基础的时间单位常量

```go
const (
	minDuration Duration = -1 << 63
	maxDuration Duration = 1<<63 - 1
)

const (
	Nanosecond  Duration = 1
	Microsecond          = 1000 * Nanosecond
	Millisecond          = 1000 * Microsecond
	Second               = 1000 * Millisecond
	Minute               = 60 * Second
	Hour                 = 60 * Minute
)
```

它们的类型是`time.Duration`，最小的单位是纳秒，最大的是小时。



## 格式化

时间类型可以格式化输出，不过需要注意的是在Go中格式化模板不是常见的yyyy-mm-dd这类，而是以Go诞生时间为模板。Go的诞生的时间是 2006年1月2日下午15点04分。

例子

```go
now := time.Now()
```

24小时格式化输出

```go
fmt.Println(now.Format("2006-01-02 15:04:05 Monday Jan"))
//2022-11-17 10:44:48 Thursday Nov
```

只输出日期

```go
fmt.Println(now.Format("2006-01-02"))
//2022-11-17
```

只输入12小时制的时间

```go
fmt.Println(now.Format("15:04:05 PM"))
//10:48:47 AM
```



## 解析时间

通常我们会有一个需求就是，将一个字符串时间按照一定格式转换为Go中的时间结构体，接下来我们要做的就是这件事。

```go
func main() {
   location, err := time.LoadLocation("Asia/Shanghai")
   if err != nil {
      fmt.Println(err)
      return
   }

   inLocation, err := time.ParseInLocation("2006/01/02", "2012/10/12", location)
   if err != nil {
      fmt.Println(err)
      return
   }
   fmt.Println(inLocation.String())
}
```

最终输出

```
2012-10-12 00:00:00 +0800 CST
```



## Timer

Timer是一个计时器，对外暴露一个channel，当指定时间到了以后，channel就会收到消息并关闭。

```go
func NewTimer(d Duration) *Timer
```

通过`time.NewTimer()`可以创建一个新的计时器

```sh
func main() {
	timer := time.NewTimer(time.Second)
	defer timer.Stop()
	select {
	case t := <-timer.C:
		fmt.Println(t)
	}
}
```

```
2023-09-25 21:25:03.5696803 +0800 CST m=+1.007908001
```

在使用完timer以后，应及时的关闭。



## Ticker

Ticker是一个定时器，与timer的区别在于，timer是一次性的，而Ticker是定时触发。

```go
func NewTicker(d Duration) *Ticker
```

通过`time.NewTicker()`可以创建一个新的定时器

```go
func main() {
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()
	for i := 0; i < 3; i++ {
		select {
		case t := <-ticker.C:
			fmt.Println(t)
		}
	}
}
```

```
2023-09-25 21:29:20.4429256 +0800 CST m=+1.009508401
2023-09-25 21:29:21.4512075 +0800 CST m=+2.017790301
2023-09-25 21:29:22.4501592 +0800 CST m=+3.016742001
```

同样的，在使用完ticker后，也要及时关闭。



## sleep

`time.Sleep()`可以使用当前goroutine处于挂起状态一定的时间，在这期间goroutine将被阻塞，直到恢复运行状态。

```go
func Sleep(d Duration)
```

```sh
func main() {
	start := time.Now()
	fmt.Println(start)
	time.Sleep(time.Second * 2)
	end := time.Now()
	fmt.Println(end)
}
```

```
2023-09-25 21:36:35.7229057 +0800 CST m=+0.001627901
2023-09-25 21:36:37.7347742 +0800 CST m=+2.013496401
```

上面这段程序就会在输出完`start`后阻塞两秒，然后再输出`end`。
