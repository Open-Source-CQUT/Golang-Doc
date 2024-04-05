# 依赖导航

这部分是对站内收集的第三方库和框架做一个整理分类，方便后续浏览，也欢迎提交pr添加新的项目。

::: tip

先后顺序不代表排名，好不好用要根据实际体验来看。

:::

### Web框架

| 名称    | 描述                                               | 仓库                                 |
| ------- | -------------------------------------------------- | ------------------------------------ |
| gin     | 最经典的web框架                                    | https://github.com/gin-gonic/gin     |
| beego   | 国人开发的web框架                                  | https://github.com/beego/beego       |
| iris    | 号称最快的web框架                                  | https://github.com/kataras/iris      |
| echo    | 极简高性能的web框架                                | https://github.com/labstack/echo     |
| goji    | 简洁的web框架                                      | https://github.com/zenazn/goji       |
| revel   | 高可用的全栈web框架                                | https://github.com/revel/revel       |
| buffalo | 可以简单的构建全栈项目web框架                      | https://github.com/gobuffalo/buffalo |
| hertz   | 具有高性能和强扩展性的微服务 HTTP 框架（字节开源） | https://github.com/cloudwego/hertz   |
| dotweb  | 一个简单的微型web框架                              | https://github.com/devfeel/dotweb    |



### ORM

| 名称      | 描述              | 仓库                                             |
| --------- | ----------------- | ------------------------------------------------ |
| grom      | 开发者友好的ORM库 | https://github.com/go-gorm/gorm                  |
| xorm      | 简单强大的ORM     | https://gitea.com/xorm/xorm                      |
| ent       | FaceBook开源的ORM | https://github.com/ent/ent                       |
| sqlx      | 对sql库的强大拓展 | https://github.com/jmoiron/sqlx                  |
| beego/orm | beego自带的orm    | https://github.com/astaxie/beego/tree/master/orm |
| rel       | 可拓展的现代ORM   | https://github.com/go-rel/rel                    |
| bun       | SQL优先的ORM      | https://github.com/uptrace/bun                   |



### 微服务框架

| 名称     | 描述                                   | 仓库                                  |
| -------- | -------------------------------------- | ------------------------------------- |
| kratos   | 云原生微服务框架（B站开源）            | https://github.com/go-kratos/kratos   |
| go-kit   | 一个微服务开发的工具库                 | https://github.com/go-kit/kit         |
| kitex    | 高性能和高拓展的微服务框架（字节开源） | https://github.com/cloudwego/kitex    |
| go-zero  | 云原生微服务框架（七牛云开源）         | https://github.com/zeromicro/go-zero  |
| go-micro | 一个国外的微服务框架                   | https://github.com/go-micro/go-micro  |
| kite     | 微服务框架（很久没更新）               | https://github.com/koding/kite        |
| dubbo-go | java dubbo在go实现（阿里开源）         | https://github.com/apache/dubbo-go    |
| tarsgo   | tars在go中的实现（腾讯开源）           | https://github.com/TarsCloud/TarsGo   |
| juptiers | 面向治理的微服务框架（斗鱼开源）       | https://github.com/douyu/jupiter      |
| redsync  | redis分布式锁                          | https://github.com/go-redsync/redsync |

::: tip 彩蛋

斗鱼的jupiter是宙斯的名字，是众神之神，而B站的kratos是战神奎托斯的名字，奎托斯后来杀掉了众神之神宙斯。

:::
### 日志组件

| 名称       | 描述                                         | 仓库                                    |
| ---------- | -------------------------------------------- | --------------------------------------- |
| logrus     | 结构化日志库                                 | https://github.com/sirupsen/logrus      |
| zap        | uber开源的高性能日志库                       | https://github.com/uber-go/zap          |
| glog       | 分级执行日志                                 | https://github.com/golang/glog          |
| zerolog    | 零内存分配的json日志                         | https://github.com/rs/zerolog           |
| apex/log   | 结构化日志库                                 | https://github.com/apex/log             |
| lumberjack | 日志分割库，支持大小分割，日期分割，文件压缩 | https://github.com/natefinch/lumberjack |



### 测试组件

| 名称              | 描述                                     | 仓库                                         |
| ----------------- | ---------------------------------------- | -------------------------------------------- |
| testify           | 最流行的测试工具包                       | https://github.com/stretchr/testify          |
| ginkgo            | 现代化的测试框架                         | https://github.com/onsi/ginkgo               |
| ramsql            | 基于内存的SQL引擎，主要用于SQL的单元测试 | https://github.com/proullon/ramsql           |
| go-sqlmock        | 用于测试的SQL Mock                       | https://github.com/DATA-DOG/go-sqlmock       |
| goconvey          | 在浏览器可视化中测试                     | https://github.com/smartystreets/goconvey    |
| go-stress-testing | 压测工具                                 | https://github.com/link1st/go-stress-testing |



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

| 名称              | 描述                             | 仓库                                         |
| ----------------- | -------------------------------- | -------------------------------------------- |
| gods              | 常见数据结构的实现               | https://github.com/emirpasic/gods            |
| go-datastructures | 常见数据结构的实现               | https://github.com/Workiva/go-datastructures |
| biset             | go中bitsets的实现                | https://github.com/bits-and-blooms/bitset    |
| bloom             | go中bloom filters的实现          | https://github.com/bits-and-blooms/bloom     |
| deque             | 高性能双端队列的实现             | https://github.com/edwingeng/deque           |
| concurrent-map    | 并发安全的分片map实现            | https://github.com/orcaman/concurrent-map    |
| samber/lo         | Lodash风格的数据处理库，支持泛型 | https://github.com/samber/lo                 |

### 数学计算

| 名称    | 描述                     | 仓库                                    |
| ------- | ------------------------ | --------------------------------------- |
| gonum   | 类比numpy                | https://github.com/gonum/gonum          |
| decimal | 高精度浮点数操作库       | https://github.com/shopspring/decimal   |
| crunch  | 一个简化字节和位操作的库 | https://github.com/superwhiskers/crunch |

### 模板引擎

| 名称         | 描述                       | 仓库                                     |
| ------------ | -------------------------- | ---------------------------------------- |
| pongo2       | Django风格的模板引擎       | https://github.com/flosch/pongo2         |
| ace          | html模板引擎               | https://github.com/yosssi/ace            |
| mustache     | mustache在go中的实现       | https://github.com/hoisie/mustache       |
| hero         | 功能强大，快速的模板引擎   | https://github.com/shiyanhui/hero        |
| quictemplate | 顾名思义，高性能的模板引擎 | https://github.com/valyala/quicktemplate |
| amber        | 源于HAML和Jade的模板引擎   | https://github.com/eknkc/amber           |



### 缓存组件

| 名称       | 描述                                    | 仓库                                    |
| ---------- | --------------------------------------- | --------------------------------------- |
| golang-lru | 线程安全的LRU，以及LRU 2Q 缓存          | https://github.com/hashicorp/golang-lru |
| ttlcache   | 基于内存的缓存，支持TTL，泛型           | https://github.com/jellydator/ttlcache  |
| gocache    | 缓存中间件管理器                        | https://github.com/eko/gocache          |
| go-cache   | 基于内存的缓存，适用于单机应用，支持TTL | https://github.com/patrickmn/go-cache   |
| ristretto  | 高性能的内存缓存                        | https://github.com/dgraph-io/ristretto  |
| bigcache   | 基于内存的高效率的大key缓存             | https://github.com/allegro/bigcache     |



### 数据库&驱动

| 名称                  | 描述                                            | 仓库                                       |
| --------------------- | ----------------------------------------------- | ------------------------------------------ |
| modernc.org/sqlite    | sqlite驱动，纯go编写，不需要cgo                 | https://gitlab.com/cznic/sqlite            |
| mattn/go-sqlite3      | sqlite驱动，需要cgo                             | https://github.com/mattn/go-sqlite3        |
| denisenkom/go-mssqldb | sqlserver驱动，不怎么更新了，建议使用微软的版本 | https://github.com/denisenkom/go-mssqldb   |
| microsoft/go-mssqldb  | sqlserver驱动，微软fork的新分支并维护           | https://github.com/microsoft/go-mssqldb    |
| pgx                   | postgreSQL驱动                                  | https://github.com/jackc/pgx/              |
| mysql                 | mysql驱动                                       | https://github.com/go-sql-driver/mysql     |
| oci-go-sdk            | oracle官方驱动                                  | https://github.com/oracle/oci-go-sdk       |
| go-ora                | oracle驱动，纯go编写                            | https://github.com/sijms/go-ora            |
| badger                | 嵌入式的kv数据库，基于LSM                       | https://github.com/dgraph-io/badger        |
| boltdb                | 嵌入式的kv数据库，基于B+Tree                    | https://github.com/boltdb/bolt             |
| goleveldb             | go语言实现的leveldb                             | https://github.com/syndtr/goleveldb        |
| qmgo                  | 七牛云开源的mongodb操作库                       | https://github.com/qiniu/qmgo              |
| mongo-go-driver       | mongodb官方的go驱动                             | https://github.com/mongodb/mongo-go-driver |



### 序列化

::: tip

早期官方的json库速度比较慢，于是有了许多开源的json库，不过后期经过优化后基本上性能已经差别不大了。

:::

| 名称       | 描述                                         | 仓库                                     |
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


### 命令行

| 名称           | 描述                               | 仓库                                 |
| -------------- | ---------------------------------- | ------------------------------------ |
| pflag          | POSIX/GUN的风格的flag包            | https://github.com/spf13/pflag       |
| go-flags       | 命令参数解析器                     | https://github.com/jessevdk/go-flags |
| cobra          | 现代命令行程序构建脚手架           | https://github.com/spf13/cobra       |
| dimiro1/banner | 美观的banner构建库                 | https://github.com/dimiro1/banner    |
| go-pretty      | 输出美观的命令行表格，文字，进度条 | https://github.com/jedib0t/go-pretty |



### 时期时间

| 名称        | 描述                                   | 仓库                                         |
| ----------- | -------------------------------------- | -------------------------------------------- |
| carbon      | 时间日期处理库                         | https://github.com/golang-module/carbon      |
| robfig/cron | 定时任务库                             | https://pkg.go.dev/github.com/robfig/cron/v3 |
| gron        | 定时任务库                             | https://github.com/roylee0704/gron           |
| jobrunner   | 异步定时任务框架                       | https://github.com/bamzi/jobrunner           |
| dataparse   | 可以在不知道格式的情况下解析时间字符串 | https://github.com/araddon/dateparse         |



### 依赖注入

| 名称 | 描述                               | 仓库                                                |
| ---- | ---------------------------------- | --------------------------------------------------- |
| dig  | uber开源的依赖注入库，基于反射     | https://darjun.github.io/2020/02/22/godailylib/dig/ |
| wire | 谷歌开源的依赖注入库，基于代码生成 | https://github.com/google/wire                      |
|      |                                    |                                                     |



### 地理位置

| 名称           | 描述         | 仓库                                          |
| -------------- | ------------ | --------------------------------------------- |
| geoip2-golang  | IP转地理信息 | https://github.com/oschwald/geoip2-golang     |
| ip2location-go | IP转地理信息 | https://github.com/ip2location/ip2location-go |
|                |              |                                               |



### 爬虫框架

| 名称    | 描述               | 仓库                                   |
| ------- | ------------------ | -------------------------------------- |
| colly   | 简单强大的爬虫框架 | https://github.com/gocolly/colly       |
| goquery | 类似j-thing        | https://github.com/PuerkitoBio/goquery |
|         |                    |                                        |



### 网络工具

| 名称      | 描述                         | 仓库                                            |
| --------- | ---------------------------- | ----------------------------------------------- |
| gentleman | 插件驱动，可拓展的http客户端 | https://github.com/h2non/gentleman              |
| resty     | restful http 客户端          | https://pkg.go.dev/github.com/go-resty/resty/v2 |
|           |                              |                                                 |

### 电子邮件

| 名称                | 描述             | 仓库                                   |
| ------------------- | ---------------- | -------------------------------------- |
| jordan-wright/email | 健壮灵活的邮件库 | https://github.com/jordan-wright/email |
|                     |                  |                                        |
|                     |                  |                                        |

### 游戏开发

| 名称       | 描述                     | 仓库                                  |
| ---------- | ------------------------ | ------------------------------------- |
| ebitengine | 一个超级简单的2d游戏引擎 | https://github.com/hajimehoshi/ebiten |
| Azul3D     | 一个由go编写的3d游戏引擎 | https://github.com/azul3d/engine      |
| engo       | 由go编写的开源2d游戏引擎 | https://github.com/EngoEngine/engo    |
| g3n/engine | go3d游戏引擎             | https://github.com/g3n/engine         |
| gonet      | 一个游戏服务端框架       | https://github.com/xtaci/gonet        |
| leaf       | 游戏服务端框架           | https://github.com/name5566/leaf      |



### GUI

| 名称       | 描述                                | 仓库                                             |
| ---------- | ----------------------------------- | ------------------------------------------------ |
| fyne       | 跨平台的GUI开发工具箱（真有点东西） | https://github.com/fyne-io/fyne                  |
| go-flutter | 用go写flutter                       | https://github.com/go-flutter-desktop/go-flutter |
|            |                                     |                                                  |

### 系统交互

| 名称     | 描述                           | 仓库                                  |
| -------- | ------------------------------ | ------------------------------------- |
| gopsutil | 获取操作系统信息，兼容主流系统 | https://github.com/shirou/gopsutil    |
| flock    | 基于操作系统调用的文件锁       | https://github.com/gofrs/flock        |
| sys      | 官方的操作系统交互库           | https://cs.opensource.google/go/x/sys |



### 跨语言交互

| 名称       | 描述                                              | 仓库                                  |
| ---------- | ------------------------------------------------- | ------------------------------------- |
| gopher-lua | go编写的lua虚拟机                                 | https://github.com/yuin/gopher-lua    |
| go-lua     | go编写的lua虚拟机                                 | https://github.com/Shopify/go-lua     |
| goja       | 支持es5.1+                                        | https://github.com/dop251/goja        |
| tengo      | Tengo 是一种小型、动态、快速、安全的 Go 脚本语言  | https://github.com/d5/tengo           |
| goby       | 受ruby启发，由go实现的一种解释型脚本语言          | https://github.com/goby-lang/goby     |
| go+        | 七牛云开源的脚本语言，可以与go无缝交互，又称Q语言 | https://github.com/goplus/gop         |
| go-python  | go调用cpython2                                    | https://github.com/sbinet/go-python   |
| go-pytyon3 | go调用cpython3                                    | https://github.com/DataDog/go-python3 |



### 图像处理

| 名称    | 描述                         | 仓库                                      |
| ------- | ---------------------------- | ----------------------------------------- |
| plot    | 一个绘图库，多用于数据可视化 | https://github.com/gonum/plot             |
| gg      | 2d绘图库                     | https://github.com/fogleman/gg            |
| gocv    | 支持opencv4+                 | https://github.com/hybridgroup/gocv       |
| imaging | 一个简单的图像处理库         | https://github.com/disintegration/imaging |



### 文字处理

| 名称 | 描述                   | 仓库                              |
| ---- | ---------------------- | --------------------------------- |
| vale | 语法感知的文本校对工具 | https://github.com/errata-ai/vale |
|      |                        |                                   |
|      |                        |                                   |



### 认证授权

| 名称    | 描述                                  | 仓库                               |
| ------- | ------------------------------------- | ---------------------------------- |
| casbin  | 灵活强大的权限管理库                  | https://github.com/casbin/casbin   |
| openfga | 高性能权限/授权库，源于oogle Zanzibar | https://github.com/openfga/openfga |
|         |                                       |                                    |



### 代码生成

| 名称     | 描述       | 仓库                             |
| -------- | ---------- | -------------------------------- |
| jennifer | 代码生成库 | https://github.com/dave/jennifer |
|          |            |                                  |
|          |            |                                  |



### 正则处理

| 名称       | 描述                           | 仓库                                      |
| ---------- | ------------------------------ | ----------------------------------------- |
| commonregx | 一个收集了常用的正则表达式的库 | https://github.com/mingrammer/commonregex |
|            |                                |                                           |
|            |                                |                                           |



### 文件处理

| 名称      | 描述                               | 仓库                                        |
| --------- | ---------------------------------- | ------------------------------------------- |
| filebox   | 文件操作工具库                     | https://github.com/dstgo/filebox            |
| size      | 快速完成文件大小与字符串之间的转换 | https://github.com/dstgo/size               |
| checksum  | 一个计算文件哈希签名的库           | https://github.com/codingsince1985/checksum |
| pdfcpu    | pdf处理器                          | https://github.com/pdfcpu/pdfcpu            |
| unioffice | office处理库                       | https://github.com/unidoc/unioffice         |
| gooxml    | office处理库                       | https://github.com/carmel/gooxml            |
| pdfcpu    | PDF处理库                          | https://github.com/pdfcpu/pdfcpu            |



### 通用工具

| 名称           | 描述                               | 仓库                                      |
| -------------- | ---------------------------------- | ----------------------------------------- |
| lancet         | 多功能工具库，类比java中的common包 | https://github.com/duke-git/lancet        |
| bytebufferpool | 字节缓存池                         | https://github.com/valyala/bytebufferpool |
|                |                                    |                                           |



### 开发框架

| 名称    | 描述                 | 仓库                       |
| ------- | -------------------- | -------------------------- |
| goframe | 现代企业级go开发框架 | https://github.com/gogf/gf |
|         |                      |                            |
|         |                      |                            |



### 共识协议

| 名称                 | 描述                 | 仓库                                    |
| -------------------- | -------------------- | --------------------------------------- |
| hashicorp/raft       | consul开源的raft库   | https://github.com/hashicorp/raft       |
| hashicorp/memberlist | consul开源的gossip库 | https://github.com/hashicorp/memberlist |
| etcd-io/raft         | etcd开源的raft库     | https://github.com/etcd-io/raft         |

