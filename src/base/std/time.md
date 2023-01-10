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



## Tick

`time.Tick(duration)`可以设置定时器，其本质上也还是一个channel。

```go
func main() {
	ticker := time.Tick(time.Second)
	for i := range ticker {
		fmt.Println(i)//i的类型是Time
	}
}
```



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

