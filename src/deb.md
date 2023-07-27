# 依赖导航

这部分是对站内收集的第三方库和框架做一个整理分类，方便后续浏览。

::: tip

先后顺序不代表排名，好不好用要根据实际体验来看。

:::

### Web

| 名称    | 仓库                                 |
| ------- | ------------------------------------ |
| gin     | https://github.com/gin-gonic/gin     |
| beego   | https://github.com/beego/beego       |
| iris    | https://github.com/kataras/iris      |
| echo    | https://github.com/labstack/echo     |
| goji    | https://github.com/zenazn/goji       |
| revel   | https://github.com/revel/revel       |
| buffalo | https://github.com/gobuffalo/buffalo |
| hertz   | https://github.com/cloudwego/hertz   |
| dotweb  | https://github.com/devfeel/dotweb    |

### ORM

| 名称      | 仓库                                             |
| --------- | ------------------------------------------------ |
| grom      | https://github.com/go-gorm/gorm                  |
| xorm      | https://gitea.com/xorm/xorm                      |
| ent       | https://github.com/ent/ent                       |
| sqlx      | https://github.com/jmoiron/sqlx                  |
| beego/orm | https://github.com/astaxie/beego/tree/master/orm |
| rel       | https://github.com/go-rel/rel                    |
| bun       | https://github.com/uptrace/bun                   |

### 日志

| 名称     | 描述                   | 仓库                               |
| -------- | ---------------------- | ---------------------------------- |
| logrus   | 结构化日志库           | https://github.com/sirupsen/logrus |
| zap      | uber开源的高性能日志库 | https://github.com/uber-go/zap     |
| glog     | 分级执行日志           | https://github.com/golang/glog     |
| zerolog  | 零内存分配的json日志   | https://github.com/rs/zerolog      |
| apex/log | 结构化日志库           | https://github.com/apex/log        |

### 微服务

| 名称     | 仓库                                 |
| -------- | ------------------------------------ |
| kratos   | https://github.com/go-kratos/kratos  |
| go-kit   | https://github.com/go-kit/kit        |
| kitex    | https://github.com/cloudwego/kitex   |
| go-zero  | https://github.com/zeromicro/go-zero |
| go-micro | https://github.com/go-micro/go-micro |
| kite     | https://github.com/koding/kite       |

### 数据转换

| 名称         | 描述                           | 仓库                                      |
| ------------ | ------------------------------ | ----------------------------------------- |
| mapstructure | map与结构体互转                | https://github.com/mitchellh/mapstructure |
| cast         | 可以很方便的数据类型转换       | https://github.com/spf13/cast             |
| deepcopy     | 深度复制                       | https://github.com/mohae/deepcopy         |
| copier       | 可以在结构体之间同名字段复制值 | https://github.com/jinzhu/copier          |
| go-pinyin    | 汉字转拼音                     | https://github.com/mozillazg/go-pinyin    |

### 数据验证

| 名称                        | 描述                     | 仓库                                       |
| --------------------------- | ------------------------ | ------------------------------------------ |
| go-playground/validator/v10 | 数据验证器               | https://github.com/go-playground/validator |
| go-cmp                      | 谷歌开源的用于比较值的库 | https://github.com/google/go-cmp           |
| ozzo-validation             | 基于规则的数据校验库     | https://github.com/go-ozzo/ozzo-validation |

### 数据结构

| 名称              | 描述               | 仓库                                         |
| ----------------- | ------------------ | -------------------------------------------- |
| gods              | 常见数据结构的实现 | https://github.com/emirpasic/gods            |
| go-datastructures | 常见数据结构的实现 | https://github.com/Workiva/go-datastructures |
|                   |                    |                                              |

### 数学计算

| 名称    | 描述               | 仓库                                  |
| ------- | ------------------ | ------------------------------------- |
| gonum   | 类比numpy          | https://github.com/gonum/gonum        |
| decimal | 高精度浮点数操作库 | https://github.com/shopspring/decimal |
|         |                    |                                       |

### 模板引擎

| 名称         | 描述                       | 仓库                                     |
| ------------ | -------------------------- | ---------------------------------------- |
| pongo2       | Django风格的模板引擎       | https://github.com/flosch/pongo2         |
| ace          | html模板引擎               | https://github.com/yosssi/ace            |
| mustache     | mustache在go中的实现       | https://github.com/hoisie/mustache       |
| hero         | 功能强大，快速的模板引擎   | https://github.com/shiyanhui/hero        |
| quictemplate | 顾名思义，高性能的模板引擎 | https://github.com/valyala/quicktemplate |
| amber        | 源于HAML和Jade的模板引擎   | https://github.com/eknkc/amber           |

### 序列化

::: tip

早期官方的json库速度比较慢，于是有了许多开源的json库，不过后期经过优化后基本上性能已经差别不大了。

:::

| 名称       | 描述                                         |                                          |
| ---------- | -------------------------------------------- | ---------------------------------------- |
| go-ini     | ini文件序列化库                              | https://github.com/go-ini/ini            |
| sonic      | 字节开源的高性能json序列化库                 | https://github.com/bytedance/sonic       |
| easyjson   | json快速序列化库                             | https://github.com/mailru/easyjson       |
| gjson      | 快速获取json键值，非传统的序列化库           | https://github.com/tidwall/gjson         |
| go-yaml    | yaml序列化库                                 | https://github.com/go-yaml/yaml          |
| go-toml    | toml序列化库                                 | https://github.com/pelletier/go-toml     |
| properties | properties序列化库                           | https://github.com/magiconair/properties |
| viper      | 支持多种数据格式序列化，同时也是配置管理器   | https://github.com/spf13/viper           |
| configor   | gorm作者写的多种数据格式序列化器，配置管理器 | https://github.com/jinzhu/configor       |


### 命令行工具

| 名称           | 描述                     | 仓库                                 |
| -------------- | ------------------------ | ------------------------------------ |
| pflag          | POSIX/GUN的风格的flag包  | https://github.com/spf13/pflag       |
| go-flags       | 命令参数解析器           | https://github.com/jessevdk/go-flags |
| cobra          | 现代命令行程序构建脚手架 | https://github.com/spf13/cobra       |
| dimiro1/banner | 美观的banner构建库       | https://github.com/dimiro1/banner    |

### 时间日期

| 名称        | 描述                                   | 仓库                                         |
| ----------- | -------------------------------------- | -------------------------------------------- |
| carbon      | 时间日期处理库                         | https://github.com/golang-module/carbon      |
| robfig/cron | 定时任务库                             | https://pkg.go.dev/github.com/robfig/cron/v3 |
| gron        | 定时任务库                             | https://github.com/roylee0704/gron           |
| jobrunner   | 异步定时任务框架                       | https://github.com/bamzi/jobrunner           |
| dataparse   | 可以在不知道格式的情况下解析时间字符串 | https://github.com/araddon/dateparse         |

### 依赖注入

| 名称 | 描述                 | 仓库                                                |
| ---- | -------------------- | --------------------------------------------------- |
| dig  | uber开源的依赖注入库 | https://darjun.github.io/2020/02/22/godailylib/dig/ |
| wire | 谷歌开源的依赖注入库 | https://github.com/google/wire                      |
|      |                      |                                                     |

### 网络工具

| 名称      | 描述                         | 仓库                                            |
| --------- | ---------------------------- | ----------------------------------------------- |
| gentleman | 插件驱动，可拓展的http客户端 | https://github.com/h2non/gentleman              |
| resty     | restful http 客户端          | https://pkg.go.dev/github.com/go-resty/resty/v2 |
|           |                              |                                                 |

### 邮件

| 名称                | 描述             | 仓库                                   |
| ------------------- | ---------------- | -------------------------------------- |
| jordan-wright/email | 健壮灵活的邮件库 | https://github.com/jordan-wright/email |
|                     |                  |                                        |
|                     |                  |                                        |



### 游戏引擎

| 名称       | 描述                     | 仓库                                  |
| ---------- | ------------------------ | ------------------------------------- |
| ebitengine | 一个超级简单的2d游戏引擎 | https://github.com/hajimehoshi/ebiten |
|            |                          |                                       |
|            |                          |                                       |

### GUI

| 名称 | 描述                              | 仓库                            |
| ---- | --------------------------------- | ------------------------------- |
| fyne | 跨平台的GUI开发工具箱（有点东西） | https://github.com/fyne-io/fyne |
|      |                                   |                                 |
|      |                                   |                                 |

### 系统交互

| 名称     | 描述                           | 仓库                               |
| -------- | ------------------------------ | ---------------------------------- |
| gopsutil | 获取操作系统信息，兼容主流系统 | https://github.com/shirou/gopsutil |
|          |                                |                                    |
|          |                                |                                    |

### 跨语言交互

| 名称       | 描述              | 仓库                               |
| ---------- | ----------------- | ---------------------------------- |
| gopher-lua | go编写的lua虚拟机 | https://github.com/yuin/gopher-lua |
| go-lua     | go编写的lua虚拟机 | https://github.com/Shopify/go-lua  |
|            |                   |                                    |

### 图像处理

| 名称 | 描述                         | 仓库                           |
| ---- | ---------------------------- | ------------------------------ |
| plot | 一个绘图库，多用于数据可视化 | https://github.com/gonum/plot  |
| gg   | 2d绘图库                     | https://github.com/fogleman/gg |
|      |                              |                                |

### 其他

| 名称       | 描述                                       | 仓库                                      |
| ---------- | ------------------------------------------ | ----------------------------------------- |
| filebox    | 文件操作工具库                             | https://github.com/dstgo/filebox          |
| lancet     | 多功能工具库，类比java中的common包         | https://github.com/duke-git/lancet        |
| jennifer   | 代码生成库                                 | https://github.com/dave/jennifer          |
| goframe    | 现代企业级go开发框架                       | https://github.com/gogf/gf                |
| casbin     | 灵活强大的权限管理库                       | https://github.com/casbin/casbin          |
| commonregx | 一个集合了常用的正则表达式的库             | https://github.com/mingrammer/commonregex |
| size       | 将描述文件大小的字符串转换成可以处理的数据 | https://github.com/dstgo/size             |
