---
index: false
---
# 实用依赖

Go虽然是一门很年轻的语言，但它的生态正在蓬勃发展，有着众多的出色的第三方又或是官方的依赖库。在较早的时候，Go还没一个较为统一且有效的版本管理方案，那时候版本管理混乱，依赖复杂，维护起来令人十分折磨。直到`GO Module`的出现，打破了这个局面，现在可以非常简单的通过`Go Mod`来管理项目的依赖，版本等等。

这一章节，会搬运和分享Go中一些有趣的，实用的，令人眼前一亮的依赖库。一些大型的依赖例如`gin `会单独放到框架章节中，这里所指的依赖是仅负责一个功能集合的库，像`beego`这些包含的功能显然不止一个了。



## 如何寻找依赖

`go`尽管有了一个专门的依赖管理工具，但是它的生态远远不如`java`那般成熟。倘若你曾经从事过`java`开发，就一定知道`maven central repository`即中央仓库，对于`java`而言，想找什么依赖直接去中央仓库查一查就知道了，Go也有对应的网站，但并不算是远程公共仓库，只是一个单纯的依赖查询和公共文档站：[Go Packages](https://pkg.go.dev/)

在寻找依赖时，需要关注的点是仓库的最后更新时间，如果是那种几年没更新了并且star特别少的就不建议使用。

并且在寻找之前，go官方库其实内置了非常多的工具库，你可以先去官方库里找一找，比如`json`序列化，模板引擎等等，找不到再去网上找。

|     名称      |     功能     |                URL                 |  更新时间  | Star  |
| :-----------: | :----------: | :--------------------------------: | :--------: | :---: |
|   Mysql驱动   | Mysql客户端  |   github.com/go-sql-driver/mysql   | 2022.11.15 | 12.8k |
|   Redis驱动   | Redis客户端  |     github.com/go-redis/redis      | 2022.11.16 | 15.9k |
|     gorm      | 对象映射框架 |      github.com/go-gorm/gorm       | 2022.11.13 | 30.4k |
|      Gin      |   Web框架    |      github.com/gin-gonic/gin      | 2022.11.15 | 64.4k |
|     Beego     |   Web框架    |       github.com/beego/beego       | 2022.11.8  | 29.1k |
|     Iris      |   Web框架    |      github.com/kataras/iris       | 2022.11.15 | 23.2k |
|      Zap      |     日志     |       github.com/uber-go/zap       | 2022.11.7  | 17.4k |
|    logrus     |     日志     |     github.com/sirupsen/logrus     | 2022.7.19  | 21.7k |
|    Jwt-go     |     JWT      |    github.com/dgrijalva/jwt-go     |  2021.8.3  | 10.5k |
|      jwt      |     JWT      |     github.com/golang-jwt/jwt      | 2022.11.16 | 3.6k  |
| json-iterator |  json序列化  |    github.com/json-iterator/go     | 2022.9.16  | 11.5k |
|   validator   |   数据验证   | github.com/go-playground/validator | 2022.9.17  | 11.8k |