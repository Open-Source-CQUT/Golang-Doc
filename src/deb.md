# 依赖导航

这部分是对站内收集的第三方库和框架做一个整理分类，方便后续浏览，也欢迎提交 pr 添加新的项目。

::: tip

先后顺序不代表排名，好不好用要根据实际体验来看。

:::

### Web 框架

| 名称    | 描述                                               | 仓库                                 |
| ------- | -------------------------------------------------- | ------------------------------------ |
| gin     | 最经典的 web 框架                                  | https://github.com/gin-gonic/gin     |
| beego   | 国人开发的 web 框架                                | https://github.com/beego/beego       |
| iris    | 号称最快的 web 框架                                | https://github.com/kataras/iris      |
| echo    | 极简高性能的 web 框架                              | https://github.com/labstack/echo     |
| goji    | 简洁的 web 框架                                    | https://github.com/zenazn/goji       |
| revel   | 高可用的全栈 web 框架                              | https://github.com/revel/revel       |
| buffalo | 可以简单的构建全栈项目 web 框架                    | https://github.com/gobuffalo/buffalo |
| hertz   | 具有高性能和强扩展性的微服务 HTTP 框架（字节开源） | https://github.com/cloudwego/hertz   |
| dotweb  | 一个简单的微型 web 框架                            | https://github.com/devfeel/dotweb    |
| fiber   | Node.js Express 风格的 Web 框架                    | https://github.com/gofiber/fiber     |

### ORM

| 名称      | 描述                | 仓库                                             |
| --------- | ------------------- | ------------------------------------------------ |
| grom      | 开发者友好的 ORM 库 | https://github.com/go-gorm/gorm                  |
| xorm      | 简单强大的 ORM      | https://gitea.com/xorm/xorm                      |
| ent       | FaceBook 开源的 ORM | https://github.com/ent/ent                       |
| sqlx      | 对 sql 库的强大拓展 | https://github.com/jmoiron/sqlx                  |
| beego/orm | beego 自带的 orm    | https://github.com/astaxie/beego/tree/master/orm |
| rel       | 可拓展的现代 ORM    | https://github.com/go-rel/rel                    |
| bun       | SQL 优先的 ORM      | https://github.com/uptrace/bun                   |

### 微服务框架

| 名称     | 描述                                   | 仓库                                  |
| -------- | -------------------------------------- | ------------------------------------- |
| kratos   | 云原生微服务框架（B 站开源）           | https://github.com/go-kratos/kratos   |
| go-kit   | 一个微服务开发的工具库                 | https://github.com/go-kit/kit         |
| kitex    | 高性能和高拓展的微服务框架（字节开源） | https://github.com/cloudwego/kitex    |
| go-zero  | 云原生微服务框架（七牛云开源）         | https://github.com/zeromicro/go-zero  |
| go-micro | 一个国外的微服务框架                   | https://github.com/go-micro/go-micro  |
| kite     | 微服务框架（很久没更新）               | https://github.com/koding/kite        |
| dubbo-go | java dubbo 在 go 实现（阿里开源）      | https://github.com/apache/dubbo-go    |
| tarsgo   | tars 在 go 中的实现（腾讯开源）        | https://github.com/TarsCloud/TarsGo   |
| juptiers | 面向治理的微服务框架（斗鱼开源）       | https://github.com/douyu/jupiter      |
| redsync  | redis 分布式锁                         | https://github.com/go-redsync/redsync |

::: tip 彩蛋

斗鱼的 jupiter 是宙斯的名字，是众神之神，而 B 站的 kratos 是战神奎托斯的名字，奎托斯后来杀掉了众神之神宙斯。

:::

### 日志组件

| 名称       | 描述                                         | 仓库                                    |
| ---------- | -------------------------------------------- | --------------------------------------- |
| logrus     | 结构化日志库                                 | https://github.com/sirupsen/logrus      |
| zap        | uber 开源的高性能日志库                      | https://github.com/uber-go/zap          |
| glog       | 分级执行日志                                 | https://github.com/golang/glog          |
| zerolog    | 零内存分配的 json 日志                       | https://github.com/rs/zerolog           |
| apex/log   | 结构化日志库                                 | https://github.com/apex/log             |
| lumberjack | 日志分割库，支持大小分割，日期分割，文件压缩 | https://github.com/natefinch/lumberjack |

### 测试组件

| 名称              | 描述                                         | 仓库                                         |
| ----------------- | -------------------------------------------- | -------------------------------------------- |
| testify           | 最流行的测试工具包                           | https://github.com/stretchr/testify          |
| ginkgo            | 现代化的测试框架                             | https://github.com/onsi/ginkgo               |
| ramsql            | 基于内存的 SQL 引擎，主要用于 SQL 的单元测试 | https://github.com/proullon/ramsql           |
| go-sqlmock        | 用于测试的 SQL Mock                          | https://github.com/DATA-DOG/go-sqlmock       |
| goconvey          | 在浏览器可视化中测试                         | https://github.com/smartystreets/goconvey    |
| go-stress-testing | 压测工具                                     | https://github.com/link1st/go-stress-testing |
| xgo               | go 打桩测试框架，通过编译期重写代码来实现    | https://github.com/xhd2015/xgo               |
| gomonkey          | go 打桩测试框架，通过修改修改函数地址实现    | https://github.com/agiledragon/gomonkey      |

### 数据处理

| 名称         | 描述                                                  | 仓库                                      |
| ------------ | ----------------------------------------------------- | ----------------------------------------- |
| mapstructure | map 与结构体互转                                      | https://github.com/mitchellh/mapstructure |
| cast         | 可以很方便的数据类型转换                              | https://github.com/spf13/cast             |
| deepcopy     | 深度复制                                              | https://github.com/mohae/deepcopy         |
| copier       | 可以在结构体之间同名字段复制值                        | https://github.com/jinzhu/copier          |
| go-pinyin    | 汉字转拼音                                            | https://github.com/mozillazg/go-pinyin    |
| go-streams   | 流式数据处理                                          | https://github.com/reugn/go-streams       |
| stream       | 流式处理                                              | https://github.com/xyctruth/stream        |
| go-humanize  | 将数据转换成人类可以阅读的格式                        | https://github.com/dustin/go-humanize     |
| uniseg       | 在 Go 中进行 Unicode 文本分段、字包装和字符串宽度计算 | https://github.com/rivo/uniseg            |

### 数据验证

| 名称                        | 描述                     | 仓库                                       |
| --------------------------- | ------------------------ | ------------------------------------------ |
| go-playground/validator/v10 | 数据验证器               | https://github.com/go-playground/validator |
| go-cmp                      | 谷歌开源的用于比较值的库 | https://github.com/google/go-cmp           |
| ozzo-validation             | 基于规则的数据校验库     | https://github.com/go-ozzo/ozzo-validation |
| go-tagexpr                  | 结构体 tag 验证库        | https://github.com/bytedance/go-tagexpr    |

### 数据结构

| 名称              | 描述                              | 仓库                                         |
| ----------------- | --------------------------------- | -------------------------------------------- |
| gods              | 常见数据结构的实现                | https://github.com/emirpasic/gods            |
| go-datastructures | 常见数据结构的实现                | https://github.com/Workiva/go-datastructures |
| biset             | go 中 bitsets 的实现              | https://github.com/bits-and-blooms/bitset    |
| bloom             | go 中 bloom filters 的实现        | https://github.com/bits-and-blooms/bloom     |
| deque             | 高性能双端队列的实现              | https://github.com/edwingeng/deque           |
| concurrent-map    | 并发安全的分片 map 实现           | https://github.com/orcaman/concurrent-map    |
| samber/lo         | Lodash 风格的数据处理库，支持泛型 | https://github.com/samber/lo                 |
| google/btree      | 谷歌实现的 BTree 库，支持泛型     | https://github.com/google/btree              |
| gostl             | 像 C++STL 一样的数据结构库        | https://github.com/liyue201/gostl            |

### 数学计算

| 名称        | 描述                     | 仓库                                    |
| ----------- | ------------------------ | --------------------------------------- |
| gonum       | 类比 numpy               | https://github.com/gonum/gonum          |
| decimal     | 高精度浮点数操作库       | https://github.com/shopspring/decimal   |
| crunch      | 一个简化字节和位操作的库 | https://github.com/superwhiskers/crunch |
| math-engine | 数学表达式解析计算引擎库 | https://github.com/dengsgo/math-engine  |

### 模板引擎

| 名称         | 描述                         | 仓库                                     |
| ------------ | ---------------------------- | ---------------------------------------- |
| pongo2       | Django 风格的模板引擎        | https://github.com/flosch/pongo2         |
| ace          | html 模板引擎                | https://github.com/yosssi/ace            |
| mustache     | mustache 在 go 中的实现      | https://github.com/hoisie/mustache       |
| hero         | 功能强大，快速的模板引擎     | https://github.com/shiyanhui/hero        |
| quictemplate | 顾名思义，高性能的模板引擎   | https://github.com/valyala/quicktemplate |
| amber        | 源于 HAML 和 Jade 的模板引擎 | https://github.com/eknkc/amber           |

### 缓存组件

| 名称       | 描述                                     | 仓库                                    |
| ---------- | ---------------------------------------- | --------------------------------------- |
| golang-lru | 线程安全的 LRU，以及 LRU 2Q 缓存         | https://github.com/hashicorp/golang-lru |
| ttlcache   | 基于内存的缓存，支持 TTL，泛型           | https://github.com/jellydator/ttlcache  |
| gocache    | 缓存中间件管理器                         | https://github.com/eko/gocache          |
| go-cache   | 基于内存的缓存，适用于单机应用，支持 TTL | https://github.com/patrickmn/go-cache   |
| ristretto  | 高性能的内存缓存                         | https://github.com/dgraph-io/ristretto  |
| bigcache   | 基于内存的高效率的大 key 缓存            | https://github.com/allegro/bigcache     |

### 数据库&驱动

| 名称                   | 描述                                             | 仓库                                                   |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| modernc.org/sqlite     | sqlite 驱动，纯 go 编写，不需要 cgo              | https://gitlab.com/cznic/sqlite                        |
| mattn/go-sqlite3       | sqlite 驱动，需要 cgo                            | https://github.com/mattn/go-sqlite3                    |
| denisenkom/go-mssqldb  | sqlserver 驱动，不怎么更新了，建议使用微软的版本 | https://github.com/denisenkom/go-mssqldb               |
| microsoft/go-mssqldb   | sqlserver 驱动，微软 fork 的新分支并维护         | https://github.com/microsoft/go-mssqldb                |
| pgx                    | postgreSQL 驱动                                  | https://github.com/jackc/pgx/                          |
| mysql                  | mysql 驱动                                       | https://github.com/go-sql-driver/mysql                 |
| oci-go-sdk             | oracle 官方驱动                                  | https://github.com/oracle/oci-go-sdk                   |
| go-ora                 | oracle 驱动，纯 go 编写                          | https://github.com/sijms/go-ora                        |
| badger                 | 嵌入式的 kv 数据库，基于 LSM                     | https://github.com/dgraph-io/badger                    |
| boltdb                 | 嵌入式的 kv 数据库，基于 B+Tree                  | https://github.com/boltdb/bolt                         |
| goleveldb              | go 语言实现的 leveldb                            | https://github.com/syndtr/goleveldb                    |
| qmgo                   | 七牛云开源的 mongodb 操作库                      | https://github.com/qiniu/qmgo                          |
| mongo-go-driver        | mongodb 官方的 go 驱动                           | https://github.com/mongodb/mongo-go-driver             |
| rqlite                 | 基于 sqlite 的轻量级分布式关系数据库             | https://github.com/rqlite/rqlite/                      |
| go-mysql               | 一个强大的 MySQL 工具集合                        | https://github.com/go-mysql-org/go-mysql               |
| go-mysql-elasticsearch | MySQL 数据同步到 Elasticsearch 的工具            | https://github.com/go-mysql-org/go-mysql-elasticsearch |
| gofound                | 单机亿级全文检索引擎，                           | https://github.com/sea-team/gofound                    |
| bleve                  | 全文检索库                                       | https://github.com/blevesearch/bleve                   |

### 序列化

| 名称       | 描述                                          | 仓库                                     |
| ---------- | --------------------------------------------- | ---------------------------------------- |
| go-ini     | ini 文件序列化库                              | https://github.com/go-ini/ini            |
| sonic      | 字节开源的高性能 json 序列化库                | https://github.com/bytedance/sonic       |
| easyjson   | json 快速序列化库                             | https://github.com/mailru/easyjson       |
| gjson      | 快速获取 json 键值，非传统的序列化库          | https://github.com/tidwall/gjson         |
| go-yaml    | yaml 序列化库                                 | https://github.com/go-yaml/yaml          |
| go-toml    | toml 序列化库                                 | https://github.com/pelletier/go-toml     |
| properties | properties 序列化库                           | https://github.com/magiconair/properties |
| viper      | 支持多种数据格式序列化，同时也是配置管理器    | https://github.com/spf13/viper           |
| configor   | gorm 作者写的多种数据格式序列化器，配置管理器 | https://github.com/jinzhu/configor       |

### 命令行

| 名称           | 描述                                                | 仓库                                   |
| -------------- | --------------------------------------------------- | -------------------------------------- |
| pflag          | POSIX/GUN 的风格的 flag 包                          | https://github.com/spf13/pflag         |
| go-flags       | 命令参数解析器                                      | https://github.com/jessevdk/go-flags   |
| cobra          | 现代命令行程序构建脚手架                            | https://github.com/spf13/cobra         |
| dimiro1/banner | 美观的 banner 构建库                                | https://github.com/dimiro1/banner      |
| go-pretty      | 输出美观的命令行表格，文字，进度条                  | https://github.com/jedib0t/go-pretty   |
| progressbar    | 线程安全的命令行进度条                              | https://github.com/schollz/progressbar |
| go-ansi        | 用于 Go 语言的 Windows 便携式 ANSI 转义序列实用程序 | https://github.com/k0kubun/go-ansi     |
| go-isatty      | 用于判断 tty 的库                                   | https://github.com/mattn/go-isatty     |

### 压缩解压

| 名称               | 描述                                           | 仓库                                  |
| ------------------ | ---------------------------------------------- | ------------------------------------- |
| klauspost/compress | 对 compress 标准库的优化改造                   | https://github.com/klauspost/compress |
| alexmullins/zip    | archive/zip 标准库的 fork 分支，支持密码       | https://github.com/alexmullins/zip    |
| mholt/archiver     | 支持很多格式的压缩解压缩工具库（个人非常推荐） | https://github.com/mholt/archiver     |
| go-car             | CAR 归档文件在 go 中的实现                     | https://github.com/ipld/go-car        |
| go-unarr           | 一个压缩解压缩库                               | https://github.com/gen2brain/go-unarr |
| xz                 | 用于读写 xz 压缩文件的纯 Golang 库             | https://github.com/ulikunitz/xz       |

### 时期时间

| 名称        | 描述                                   | 仓库                                         |
| ----------- | -------------------------------------- | -------------------------------------------- |
| carbon      | 时间日期处理库                         | https://github.com/golang-module/carbon      |
| robfig/cron | 定时任务库                             | https://pkg.go.dev/github.com/robfig/cron/v3 |
| gron        | 定时任务库                             | https://github.com/roylee0704/gron           |
| jobrunner   | 异步定时任务框架                       | https://github.com/bamzi/jobrunner           |
| dataparse   | 可以在不知道格式的情况下解析时间字符串 | https://github.com/araddon/dateparse         |
| jinzhu/now  | 日期工具库                             | https://github.com/jinzhu/now                |

### 依赖注入

| 名称   | 描述                               | 仓库                                                |
| ------ | ---------------------------------- | --------------------------------------------------- |
| dig    | uber 开源的依赖注入库，基于反射    | https://darjun.github.io/2020/02/22/godailylib/dig/ |
| wire   | 谷歌开源的依赖注入库，基于代码生成 | https://github.com/google/wire                      |
| inject | 依赖注入工具                       | https://github.com/codegangsta/inject               |
| di     | 依赖注入容器                       | https://github.com/sarulabs/di                      |

### 地理位置

| 名称           | 描述          | 仓库                                          |
| -------------- | ------------- | --------------------------------------------- |
| geoip2-golang  | IP 转地理信息 | https://github.com/oschwald/geoip2-golang     |
| ip2location-go | IP 转地理信息 | https://github.com/ip2location/ip2location-go |
|                |               |                                               |

### 爬虫框架

| 名称    | 描述               | 仓库                                   |
| ------- | ------------------ | -------------------------------------- |
| colly   | 简单强大的爬虫框架 | https://github.com/gocolly/colly       |
| goquery | 类似 j-thing       | https://github.com/PuerkitoBio/goquery |
|         |                    |                                        |

### 网络工具

| 名称      | 描述                                             | 仓库                                            |
| --------- | ------------------------------------------------ | ----------------------------------------------- |
| gentleman | 插件驱动，可拓展的 http 客户端                   | https://github.com/h2non/gentleman              |
| resty     | restful http 客户端                              | https://pkg.go.dev/github.com/go-resty/resty/v2 |
| gopeed    | 支持所有平台的现代下载管理器，基于 go 和 flutter | https://github.com/GopeedLab/gopeed             |

### 电子邮件

| 名称                | 描述                                   | 仓库                                        |
| ------------------- | -------------------------------------- | ------------------------------------------- |
| jordan-wright/email | 健壮灵活的邮件发送库                   | https://github.com/jordan-wright/email      |
| gomail              | 邮件发送库                             | https://github.com/go-gomail/gomail         |
| go-simple-mail      | 简单的邮件发送库                       | https://github.com/xhit/go-simple-mail      |
| go-mail             | 易于使用，全面的邮件发送库             | https://github.com/wneessen/go-mail         |
| email-verifier      | 验证邮箱是否有效，且不需要发送邮件     | https://github.com/AfterShip/email-verifier |
| maddy               | 组合式的邮件服务器                     | https://github.com/foxcpp/maddy             |
| mox                 | 全面开源，高维护性，自托管的邮件服务端 | https://github.com/mjl-/mox                 |
| hermes              | 邮件模板生成库                         | https://github.com/matcornic/hermes         |
| listmonk            | 高性能，子托管，可视化的邮件列表管理   | https://github.com/knadh/listmonk           |
| go-smtp             | go 编写的 SMTP 客户端与服务端          | https://github.com/emersion/go-smtp         |
| go-imap             | go 编写的 IMAP 客户端与服务端          | https://github.com/emersion/go-imap         |

### 游戏开发

| 名称       | 描述                         | 仓库                                    |
| ---------- | ---------------------------- | --------------------------------------- |
| ebitengine | 一个超级简单的 2d 游戏引擎   | https://github.com/hajimehoshi/ebiten   |
| Azul3D     | 一个由 go 编写的 3d 游戏引擎 | https://github.com/azul3d/engine        |
| engo       | 由 go 编写的开源 2d 游戏引擎 | https://github.com/EngoEngine/engo      |
| g3n/engine | go3d 游戏引擎                | https://github.com/g3n/engine           |
| gonet      | 一个游戏服务端框架           | https://github.com/xtaci/gonet          |
| leaf       | 游戏服务端框架               | https://github.com/name5566/leaf        |
| cloud-game | 基于 web 的云游戏服务        | https://github.com/giongto35/cloud-game |

### GUI

| 名称       | 描述                                  | 仓库                                             |
| ---------- | ------------------------------------- | ------------------------------------------------ |
| fyne       | 跨平台的 GUI 开发工具箱（真有点东西） | https://github.com/fyne-io/fyne                  |
| go-flutter | 用 go 写 flutter                      | https://github.com/go-flutter-desktop/go-flutter |
|            |                                       |                                                  |

### 系统交互

| 名称     | 描述                           | 仓库                                  |
| -------- | ------------------------------ | ------------------------------------- |
| gopsutil | 获取操作系统信息，兼容主流系统 | https://github.com/shirou/gopsutil    |
| flock    | 基于操作系统调用的文件锁       | https://github.com/gofrs/flock        |
| sys      | 官方的操作系统交互库           | https://cs.opensource.google/go/x/sys |

### 跨语言交互

| 名称       | 描述                                                  | 仓库                                  |
| ---------- | ----------------------------------------------------- | ------------------------------------- |
| gopher-lua | go 编写的 lua 虚拟机                                  | https://github.com/yuin/gopher-lua    |
| go-lua     | go 编写的 lua 虚拟机                                  | https://github.com/Shopify/go-lua     |
| goja       | 支持 es5.1+                                           | https://github.com/dop251/goja        |
| tengo      | Tengo 是一种小型、动态、快速、安全的 Go 脚本语言      | https://github.com/d5/tengo           |
| goby       | 受 ruby 启发，由 go 实现的一种解释型脚本语言          | https://github.com/goby-lang/goby     |
| go+        | 七牛云开源的脚本语言，可以与 go 无缝交互，又称 Q 语言 | https://github.com/goplus/gop         |
| go-python  | go 调用 cpython2                                      | https://github.com/sbinet/go-python   |
| go-pytyon3 | go 调用 cpython3                                      | https://github.com/DataDog/go-python3 |

### 图像处理

| 名称    | 描述                         | 仓库                                      |
| ------- | ---------------------------- | ----------------------------------------- |
| plot    | 一个绘图库，多用于数据可视化 | https://github.com/gonum/plot             |
| gg      | 2d 绘图库                    | https://github.com/fogleman/gg            |
| gocv    | 支持 opencv4+                | https://github.com/hybridgroup/gocv       |
| imaging | 一个简单的图像处理库         | https://github.com/disintegration/imaging |

### 文字处理

| 名称 | 描述                   | 仓库                              |
| ---- | ---------------------- | --------------------------------- |
| vale | 语法感知的文本校对工具 | https://github.com/errata-ai/vale |
|      |                        |                                   |
|      |                        |                                   |

### 认证授权

| 名称    | 描述                                   | 仓库                               |
| ------- | -------------------------------------- | ---------------------------------- |
| casbin  | 灵活强大的权限管理库                   | https://github.com/casbin/casbin   |
| openfga | 高性能权限/授权库，源于 oogle Zanzibar | https://github.com/openfga/openfga |
|         |                                        |                                    |

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

| 名称      | 描述                               | 仓库                                              |
| --------- | ---------------------------------- | ------------------------------------------------- |
| filebox   | 文件操作工具库                     | https://github.com/dstgo/filebox                  |
| size      | 快速完成文件大小与字符串之间的转换 | https://github.com/dstgo/size                     |
| checksum  | 一个计算文件哈希签名的库           | https://github.com/codingsince1985/checksum       |
| pdfcpu    | pdf 处理器                         | https://github.com/pdfcpu/pdfcpu                  |
| unioffice | office 处理库                      | https://github.com/unidoc/unioffice               |
| gooxml    | office 处理库                      | https://github.com/carmel/gooxml                  |
| pdfcpu    | PDF 处理库                         | https://github.com/pdfcpu/pdfcpu                  |
| excelize  | Excel 处理库                       | https://github.com/360EntSecGroup-Skylar/excelize |

### 通用工具

| 名称           | 描述                                   | 仓库                                      |
| -------------- | -------------------------------------- | ----------------------------------------- |
| lancet         | 多功能工具库，类比 java 中的 common 包 | https://github.com/duke-git/lancet        |
| bytebufferpool | 字节缓存池                             | https://github.com/valyala/bytebufferpool |
|                |                                        |                                           |

### 开发框架

| 名称    | 描述                   | 仓库                       |
| ------- | ---------------------- | -------------------------- |
| goframe | 现代企业级 go 开发框架 | https://github.com/gogf/gf |
|         |                        |                            |
|         |                        |                            |

### 共识协议

| 名称                 | 描述                    | 仓库                                    |
| -------------------- | ----------------------- | --------------------------------------- |
| hashicorp/raft       | consul 开源的 raft 库   | https://github.com/hashicorp/raft       |
| hashicorp/memberlist | consul 开源的 gossip 库 | https://github.com/hashicorp/memberlist |
| etcd-io/raft         | etcd 开源的 raft 库     | https://github.com/etcd-io/raft         |

### OCR

| 名称      | 描述                             | 仓库                                 |
| --------- | -------------------------------- | ------------------------------------ |
| gosseract | 使用 Tesseract C + + 库的 OCR 库 | https://github.com/otiai10/gosseract |
|           |                                  |                                      |
|           |                                  |                                      |
