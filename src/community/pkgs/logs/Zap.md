# Zap

Zap 是一个用 Go 构建的，快速的 ，结构化，级别化的日志组件。

官方仓库：[uber-go/zap: Blazing fast, structured, leveled logging in Go. (github.com)](https://github.com/uber-go/zap)

官方文档：[zap package - go.uber.org/zap - Go Packages](https://pkg.go.dev/go.uber.org/zap)

## 安装

```
go get -u go.uber.org/zap
```

## 快速开始

官方给出了两个快速开始的示例，两个都是产品级别的日志，第一个是一个支持`printf`风格但是性能相对较低的`Sugar`。

```go
logger, _ := zap.NewProduction()
defer logger.Sync() // 在程序结束时将缓存同步到文件中
sugar := logger.Sugar()
sugar.Infow("failed to fetch URL",
  "url", url,
  "attempt", 3,
  "backoff", time.Second,
)
sugar.Infof("Failed to fetch URL: %s", url)
```

第二个是性能比较好，但是仅支持强类型输出的日志·`logger`

```go
logger, _ := zap.NewProduction()
defer logger.Sync()
logger.Info("failed to fetch URL",
  // Structured context as strongly typed Field values.
  zap.String("url", url),
  zap.Int("attempt", 3),
  zap.Duration("backoff", time.Second),
)
```

::: tip

Zap 的使用非常简单，麻烦的点在于配置出一个适合自己项目的日志，官方例子很少，要多读源代码注释。

:::

## 配置

一般来说日志的配置都是写在配置文件里的，Zap 的配置也支持通过配置文件反序列化，但是仅支持基础的配置，即便是高级配置官方给出的例子也是十分简洁，并不足以投入使用，所以要详细讲一下细节的配置。

首先看一下总体的配置结构体，需要先搞明白里面的每一个字段的含义

```go
type Config struct {
    // 最小日志级别
   Level AtomicLevel `json:"level" yaml:"level"`
    // 开发模式，主要影响堆栈跟踪
   Development bool `json:"development" yaml:"development"`
    // 调用者追踪
   DisableCaller bool `json:"disableCaller" yaml:"disableCaller"`
    // 堆栈跟踪
   DisableStacktrace bool `json:"disableStacktrace" yaml:"disableStacktrace"`
    // 采样，在限制日志对性能占用的情况下仅记录部分比较有代表性的日志，等于日志选择性记录
   Sampling *SamplingConfig `json:"sampling" yaml:"sampling"`
    // 编码，分为json和console两种模式
   Encoding string `json:"encoding" yaml:"encoding"`
    // 编码配置，主要是一些输出格式化的配置
   EncoderConfig zapcore.EncoderConfig `json:"encoderConfig" yaml:"encoderConfig"`
    // 日志文件输出路径
   OutputPaths []string `json:"outputPaths" yaml:"outputPaths"`
    // 错误文件输出路径
   ErrorOutputPaths []string `json:"errorOutputPaths" yaml:"errorOutputPaths"`
    // 给日志添加一些默认输出的内容
   InitialFields map[string]interface{} `json:"initialFields" yaml:"initialFields"`
}
```

如下是关于编码配置的细节

```go
type EncoderConfig struct {
   // 键值，如果key为空，那么对于的属性将不会输出
   MessageKey     string `json:"messageKey" yaml:"messageKey"`
   LevelKey       string `json:"levelKey" yaml:"levelKey"`
   TimeKey        string `json:"timeKey" yaml:"timeKey"`
   NameKey        string `json:"nameKey" yaml:"nameKey"`
   CallerKey      string `json:"callerKey" yaml:"callerKey"`
   FunctionKey    string `json:"functionKey" yaml:"functionKey"`
   StacktraceKey  string `json:"stacktraceKey" yaml:"stacktraceKey"`
   SkipLineEnding bool   `json:"skipLineEnding" yaml:"skipLineEnding"`
   LineEnding     string `json:"lineEnding" yaml:"lineEnding"`
   // 一些自定义的编码器
   EncodeLevel    LevelEncoder    `json:"levelEncoder" yaml:"levelEncoder"`
   EncodeTime     TimeEncoder     `json:"timeEncoder" yaml:"timeEncoder"`
   EncodeDuration DurationEncoder `json:"durationEncoder" yaml:"durationEncoder"`
   EncodeCaller   CallerEncoder   `json:"callerEncoder" yaml:"callerEncoder"`
   // 日志器名称编码器
   EncodeName NameEncoder `json:"nameEncoder" yaml:"nameEncoder"`
   // 反射编码器，主要是对于interface{}类型，如果没有默认jsonencoder
   NewReflectedEncoder func(io.Writer) ReflectedEncoder `json:"-" yaml:"-"`
   // 控制台输出间隔字符串
   ConsoleSeparator string `json:"consoleSeparator" yaml:"consoleSeparator"`
}
```

`Option`是关于一些配置的开关及应用，有很多实现。

```go
type Option interface {
   apply(*Logger)
}

// Option的实现
type optionFunc func(*Logger)

func (f optionFunc) apply(log *Logger) {
  f(log)
}

// 应用
func Development() Option {
  return optionFunc(func(log *Logger) {
    log.development = true
  })
}
```

这是最常用的日志核心，其内部的字段基本上就代表了我们配置的步骤，也可以参考官方在反序列化配置时的步骤，大致都是一样的。

```go
type ioCore struct {
   // 日志级别
   LevelEnabler
   // 日志编码
   enc Encoder
   // 日志书写
   out WriteSyncer
}
```

`zap.Encoder` 负责日志的格式化，编码

`zap.WriteSyncer` 负责日志的输出，主要是输出到文件和控制台

`zap.LevelEnabler` 最小日志级别，该级别以下的日志不会再通过`syncer`输出。

### 日志编码

日志编码主要涉及到对于日志的一些细节的格式化，首先看一下直接使用最原始的日志的输出。

```go
func TestQuickStart(t *testing.T) {
   rawJSON := []byte(`{
     "level": "debug",
     "encoding": "json",
     "outputPaths": ["stdout"],
     "errorOutputPaths": ["stderr"],
     "initialFields": {"foo": "bar"},
     "encoderConfig": {
       "messageKey": "message",
       "levelKey": "level",
       "levelEncoder": "lowercase"
     }
   }`)

   var cfg zap.Config
   if err := json.Unmarshal(rawJSON, &cfg); err != nil {
      panic(err)
   }
   logger := zap.Must(cfg.Build())
   defer logger.Sync()

   logger.Info("logger construction succeeded")
}
```

```
{"level":"info","message":"logger construction succeeded","foo":"bar"}
```

会发现这行日志有几个问题：

- 没有时间
- 没有调用者的情况，不知道这行日志是哪里输出的，不然到时候发生错误的话都没法排查
- 没有堆栈情况

接下来就一步一步的来解决问题，主要是对`zapcore.EncoderConfig`来进行改造，首先我们要自己书写配置文件，不采用官方的直接反序列化。首先自己创建一个配置文件`config.yml`

```yml
# Zap日志配置
zap:
  prefix: ZapLogTest
  timeFormat: 2006/01/02 - 15:04:05.00000
  level: debug
  caller: true
  stackTrace: false
  encode: console
  # 日志输出到哪里 file | console | both
  writer: both
  logFile:
    maxSize: 20
    backups: 5
    compress: true
    output:
      - "./log/output.log"
```

映射到的结构体

```go
// ZapConfig
// @Date: 2023-01-09 16:37:05
// @Description: zap日志配置结构体
type ZapConfig struct {
  Prefix     string         `yaml:"prefix" mapstructure:""prefix`
  TimeFormat string         `yaml:"timeFormat" mapstructure:"timeFormat"`
  Level      string         `yaml:"level" mapstructure:"level"`
  Caller     bool           `yaml:"caller" mapstructure:"caller"`
  StackTrace bool           `yaml:"stackTrace" mapstructure:"stackTrace"`
  Writer     string         `yaml:"writer" mapstructure:"writer"`
  Encode     string         `yaml:"encode" mapstructure:"encode"`
  LogFile    *LogFileConfig `yaml:"logFile" mapstructure:"logFile"`
}

// LogFileConfig
// @Date: 2023-01-09 16:38:45
// @Description: 日志文件配置结构体
type LogFileConfig struct {
  MaxSize  int      `yaml:"maxSize" mapstructure:"maxSize"`
  BackUps  int      `yaml:"backups" mapstructure:"backups"`
  Compress bool     `yaml:"compress" mapstructure:"compress"`
  Output   []string `yaml:"output" mapstructure:"output"`
  Errput   []string `yaml:"errput" mapstructure:"errput"`
}
```

::: tip

读取配置使用`Viper`，具体代码省略。

:::

```go
type TimeEncoder func(time.Time, PrimitiveArrayEncoder)
```

`TimerEncoder`本质上其实是一个函数，我们可以采用官方提供的其他时间编码器，也可以自行编写。

```go
func CustomTimeFormatEncoder(t time.Time, encoder zapcore.PrimitiveArrayEncoder) {
   encoder.AppendString(global.Config.ZapConfig.Prefix + "\t" + t.Format(global.Config.ZapConfig.TimeFormat))
}
```

整体部分如下

```go
func zapEncoder(config *ZapConfig) zapcore.Encoder {
   // 新建一个配置
   encoderConfig := zapcore.EncoderConfig{
      TimeKey:       "Time",
      LevelKey:      "Level",
      NameKey:       "Logger",
      CallerKey:     "Caller",
      MessageKey:    "Message",
      StacktraceKey: "StackTrace",
      LineEnding:    zapcore.DefaultLineEnding,
      FunctionKey:   zapcore.OmitKey,
   }
   // 自定义时间格式
   encoderConfig.EncodeTime = CustomTimeFormatEncoder
   // 日志级别大写
   encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
   // 秒级时间间隔
   encoderConfig.EncodeDuration = zapcore.SecondsDurationEncoder
   // 简短的调用者输出
   encoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
   // 完整的序列化logger名称
   encoderConfig.EncodeName = zapcore.FullNameEncoder
   // 最终的日志编码 json或者console
   switch config.Encode {
   case "json":
      {
         return zapcore.NewJSONEncoder(encoderConfig)
      }
   case "console":
      {
         return zapcore.NewConsoleEncoder(encoderConfig)
      }
   }
   // 默认console
   return zapcore.NewConsoleEncoder(encoderConfig)
}
```

### 日式输出

日志输出分为控制台输出和文件输出，我们可以根据配置文件来进行动态配置，并且如果想要进行日志文件切割的话还需要使用另一个第三方的依赖。

```
go get -u github.com/natefinch/lumberjack
```

最后代码如下

```go
 func zapWriteSyncer(cfg *ZapConfig) zapcore.WriteSyncer {
   syncers := make([]zapcore.WriteSyncer, 0, 2)
   // 如果开启了日志控制台输出，就加入控制台书写器
   if cfg.Writer == config.WriteBoth || cfg.Writer == config.WriteConsole {
      syncers = append(syncers, zapcore.AddSync(os.Stdout))
   }

   // 如果开启了日志文件存储，就根据文件路径切片加入书写器
   if cfg.Writer == config.WriteBoth || cfg.Writer == config.WriteFile {
      // 添加日志输出器
      for _, path := range cfg.LogFile.Output {
         logger := &lumberjack.Logger{
            Filename:   path, //文件路径
            MaxSize:    cfg.LogFile.MaxSize, //分割文件的大小
            MaxBackups: cfg.LogFile.BackUps, //备份次数
            Compress:   cfg.LogFile.Compress, // 是否压缩
            LocalTime:  true, //使用本地时间
         }
         syncers = append(syncers, zapcore.Lock(zapcore.AddSync(logger)))
      }
   }
   return zap.CombineWriteSyncers(syncers...)
}
```

### 日志级别

官方有关于日志级别的枚举项，直接使用即可。

```go
func zapLevelEnabler(cfg *ZapConfig) zapcore.LevelEnabler {
   switch cfg.Level {
   case config.DebugLevel:
      return zap.DebugLevel
   case config.InfoLevel:
      return zap.InfoLevel
   case config.ErrorLevel:
      return zap.ErrorLevel
   case config.PanicLevel:
      return zap.PanicLevel
   case config.FatalLevel:
      return zap.FatalLevel
   }
   // 默认Debug级别
   return zap.DebugLevel
}
```

### 最后构建

```go
func InitZap(config *ZapConfig) *zap.Logger {
   // 构建编码器
   encoder := zapEncoder(config)
   // 构建日志级别
   levelEnabler := zapLevelEnabler(config)
   // 最后获得Core和Options
   subCore, options := tee(config, encoder, levelEnabler)
    // 创建Logger
   return zap.New(subCore, options...)
}

// 将所有合并
func tee(cfg *ZapConfig, encoder zapcore.Encoder, levelEnabler zapcore.LevelEnabler) (core zapcore.Core, options []zap.Option) {
   sink := zapWriteSyncer(cfg)
   return zapcore.NewCore(encoder, sink, levelEnabler), buildOptions(cfg, levelEnabler)
}

// 构建Option
func buildOptions(cfg *ZapConfig, levelEnabler zapcore.LevelEnabler) (options []zap.Option) {
   if cfg.Caller {
      options = append(options, zap.AddCaller())
   }

   if cfg.StackTrace {
      options = append(options, zap.AddStacktrace(levelEnabler))
   }
   return
}
```

最后效果

```
ZapLogTest      2023/01/09 - 19:44:00.91076     INFO    demo/zap.go:49     日志初始化完成
```
