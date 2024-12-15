# gopsutils

仓库：[shirou/gopsutil: psutil for golang (github.com)](https://github.com/shirou/gopsutil)

文档：[gopsutil package - github.com/shirou/gopsutil/v3 - Go Packages](https://pkg.go.dev/github.com/shirou/gopsutil/v3)

平常在开发时，免不了需要获取程序所允许的平台系统信息，过程中涉及不同操作系统的系统调用，为了做适配需要花费大量的工作和时间，而 gopsutils 是一个使用 go 语言开发的系统信息库，它底层兼容许多主流的操作系统，目前支持以下系统架构：

- FreeBSD i386/amd64/arm
- Linux i386/amd64/arm(raspberry pi)
- Windows i386/amd64/arm/arm64
- Darwin amd64/arm64
- OpenBSD amd64 (Thank you @mpfz0r!)
- Solaris amd64 (developed and tested on SmartOS/Illumos, Thank you @jen20!)

部分支持:

- CPU on DragonFly BSD
- host on Linux RISC-V

并且该工具还支持获取 Docker 容器的系统信息。

## 安装

使用 go get 命令安装

```
go get github.com/shirou/gopsutil/v3
```

::: tip

笔者在写这篇文章时是在 Win10 系统上，不同的系统结果会有所不同。

:::

## 主机

主机相关的 API 由`host`包提供，对不同的操作系统都有适配。

### 信息

```go
func Info() (*InfoStat, error)
```

```go
func main() {
  info, _ := host.Info()
  JsonPrint(info)
}
```

```json
{
  "hostname": "LAPTOP-8C92S0HL",
  "uptime": 490854,
  "bootTime": 1683909241,
  "procs": 195,
  "os": "windows",
  "platform": "Microsoft Windows 10 Home China",
  "platformFamily": "Standalone Workstation",
  "platformVersion": "10.0.19044.2251 Build 19044.2251",
  "kernelVersion": "10.0.19044.2251 Build 19044.2251",
  "kernelArch": "x86_64",
  "virtualizationSystem": "",
  "virtualizationRole": "",
  "hostId": "ba697a8c-c555-4329-905c-adc6cb650dde"
}
```

该包下的其他 API 都是`Info()`的分解，不再演示，请自行了解。

## CPU

cpu 相关信息由`cpu`包提供，主要提供了 4 个函数，分别用于获取 CPU 信息，核数，使用率，时间片，以 JSON 格式输出观察起来会更为友好。

### 信息

```go
func Info() ([]InfoStat, error)
```

```go
func main() {
  info, _ := cpu.Info()
  JsonPrint(info)
}
```

```json
[
  {
    "cpu": 0,
    "vendorId": "GenuineIntel",
    "family": "198",
    "model": "",
    "stepping": 0,
    "physicalId": "BFEBFBFF000806EC",
    "coreId": "",
    "cores": 8,
    "modelName": "Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz",
    "mhz": 1992,
    "cacheSize": 0,
    "flags": [],
    "microcode": ""
  }
]
```

### 核数

```go
func Counts(logical bool) (int, error)
```

```go
func main() {
   cores, _ := cpu.Counts(true)
   JsonPrint(cores)
}
```

```
8
```

### 使用率

```go
func Percent(interval time.Duration, percpu bool) ([]float64, error)
```

```go
func main() {
   percents, _ := cpu.Percent(time.Second*5, true)
   JsonPrint(percents)
}
```

```json
[
  4.643962848297214, 4.049844236760125, 5.607476635514018, 5.29595015576324,
  3.115264797507788, 2.803738317757009, 3.115264797507788, 2.1806853582554515
]
```

### 时间片

```go
func Times(percpu bool) ([]TimesStat, error)
```

```go
func main() {
  times, _ := cpu.Times(true)
  JsonPrint(times)
}
```

```json
[
  {
    "cpu": "cpu0",
    "user": 250.28125,
    "system": 176.828125,
    "idle": 2537.96875,
    "nice": 0,
    "iowait": 0,
    "irq": 11.453125,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu1",
    "user": 180.421875,
    "system": 115.078125,
    "idle": 2669.3125,
    "nice": 0,
    "iowait": 0,
    "irq": 4.125,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu2",
    "user": 298.171875,
    "system": 143.46875,
    "idle": 2523.171875,
    "nice": 0,
    "iowait": 0,
    "irq": 2.96875,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu3",
    "user": 234.890625,
    "system": 134.3125,
    "idle": 2595.609375,
    "nice": 0,
    "iowait": 0,
    "irq": 1.53125,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu4",
    "user": 249.78125,
    "system": 122.609375,
    "idle": 2592.421875,
    "nice": 0,
    "iowait": 0,
    "irq": 2.25,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu5",
    "user": 262.875,
    "system": 162.546875,
    "idle": 2539.390625,
    "nice": 0,
    "iowait": 0,
    "irq": 1.90625,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu6",
    "user": 271.296875,
    "system": 122.40625,
    "idle": 2571.109375,
    "nice": 0,
    "iowait": 0,
    "irq": 2.125,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  },
  {
    "cpu": "cpu7",
    "user": 239.328125,
    "system": 104.03125,
    "idle": 2621.4375,
    "nice": 0,
    "iowait": 0,
    "irq": 1.875,
    "softirq": 0,
    "steal": 0,
    "guest": 0,
    "guestNice": 0
  }
]
```

## 磁盘

磁盘相关的函数是由`disk`包提供的，部分是针对 Linux 而设计的。

### 使用率

```go
func Usage(path string) (*UsageStat, error)
```

```go
func main() {
  use, _ := disk.Usage("/")
  JsonPrint(use)
}
```

```json
{
  "path": "/",
  "fstype": "",
  "total": 274152288256,
  "free": 251611193344,
  "used": 22541094912,
  "usedPercent": 8.22210715635224,
  "inodesTotal": 0,
  "inodesUsed": 0,
  "inodesFree": 0,
  "inodesUsedPercent": 0
}
```

### 分区情况

```go
func Partitions(all bool) ([]PartitionStat, error)
```

```go
func main() {
  part, _ := disk.Partitions(true)
  JsonPrint(part)
}
```

```json
[
  {
    "device": "C:",
    "mountpoint": "C:",
    "fstype": "NTFS",
    "opts": ["rw", "compress"]
  },
  {
    "device": "D:",
    "mountpoint": "D:",
    "fstype": "NTFS",
    "opts": ["rw", "compress"]
  },
  {
    "device": "E:",
    "mountpoint": "E:",
    "fstype": "FAT32",
    "opts": ["rw"]
  }
]
```

### IO

```go
func IOCounters(names ...string) (map[string]IOCountersStat, error)
```

```go
func main() {
  part, _ := disk.IOCounters("/")
  JsonPrint(part)
}
```

```json
{
  "C:": {
    "readCount": 435914,
    "mergedReadCount": 0,
    "writeCount": 640313,
    "mergedWriteCount": 0,
    "readBytes": 10356509696,
    "writeBytes": 16957500928,
    "readTime": 209,
    "writeTime": 127,
    "iopsInProgress": 0,
    "ioTime": 0,
    "weightedIO": 0,
    "name": "C:",
    "serialNumber": "",
    "label": ""
  },
  "D:": {
    "readCount": 65907,
    "mergedReadCount": 0,
    "writeCount": 12141,
    "mergedWriteCount": 0,
    "readBytes": 3079766528,
    "writeBytes": 518916608,
    "readTime": 24,
    "writeTime": 7,
    "iopsInProgress": 0,
    "ioTime": 0,
    "weightedIO": 0,
    "name": "D:",
    "serialNumber": "",
    "label": ""
  }
}
```

## 内存

内存相关 API 由`mem`包提供

### 信息

```go
func VirtualMemory() (*VirtualMemoryStat, error)
```

```go
func main() {
  memory, _ := mem.VirtualMemory()
  JsonPrint(memory)
}
```

```json
{
  "total": 17018114048,
  "available": 5477023744,
  "used": 11541090304,
  "usedPercent": 67,
  "free": 5477023744,
  "active": 0,
  "inactive": 0,
  "wired": 0,
  "laundry": 0,
  "buffers": 0,
  "cached": 0,
  "writeBack": 0,
  "dirty": 0,
  "writeBackTmp": 0,
  "shared": 0,
  "slab": 0,
  "sreclaimable": 0,
  "sunreclaim": 0,
  "pageTables": 0,
  "swapCached": 0,
  "commitLimit": 0,
  "committedAS": 0,
  "highTotal": 0,
  "highFree": 0,
  "lowTotal": 0,
  "lowFree": 0,
  "swapTotal": 0,
  "swapFree": 0,
  "mapped": 0,
  "vmallocTotal": 0,
  "vmallocUsed": 0,
  "vmallocChunk": 0,
  "hugePagesTotal": 0,
  "hugePagesFree": 0,
  "hugePagesRsvd": 0,
  "hugePagesSurp": 0,
  "hugePageSize": 0
}
```

### 交换内存

```go
func SwapMemory() (*SwapMemoryStat, error)
```

```go
func main() {
  memory, _ := mem.SwapMemory()
  JsonPrint(memory)
}
```

```json
{
  "total": 19568250880,
  "used": 12943368192,
  "free": 6624882688,
  "usedPercent": 66.14473757196637,
  "sin": 0,
  "sout": 0,
  "pgIn": 0,
  "pgOut": 0,
  "pgFault": 0,
  "pgMajFault": 0
}
```

### 交换设备

```go
func SwapDevices() ([]*SwapDevice, error)
```

```go
func main() {
  devices, _ := mem.SwapDevices()
  JsonPrint(devices)
}
```

```json
[
  {
    "name": "C:\\pagefile.sys",
    "usedBytes": 107663360,
    "freeBytes": 2442473472
  }
]
```

## 网络

## 进程
