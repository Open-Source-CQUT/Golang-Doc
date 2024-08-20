# Golang中文学习文档
这是一个简单纯粹且完全开源的Golang中文学习文档，网站内容是作者在学习过程中的记录，每一篇文章的更新都是新的积累，主要包括go语言基础方面的东西，适合入门玩家浏览。

由于作者水平十分有限，如果在文中有发现任何纰漏或者想自己发布文章，欢迎提交issue和PR，有时间看到了会尽快审理。



## 开发

文档本身采用[VuePress](https://vuepress.vuejs.org/zh/)框架和[Vuepress-theme-hope](https://theme-hope.vuejs.press/zh/)主题进行开发，上手难度低，使用简单，并采用`yarn`进行构建。



**准备**

在进行开发之前，请确保本地的nodejs版本是18及以上

```bash
$ node -v
v20.11.1
```

如果没有安装`yarn`，请使用如下命令将`yarn`安装到全局

```bash
$ npm install -g yarn
```

如遇到框架相关的问题请自行浏览官方网站。



**安装依赖**

```bash
$ yarn install
```

**本地运行**

```bash
$ yarn docs:dev
```

**清空缓存运行**

```bash
$ yarn docs:clean-dev
```

**构建**

```bash
$ yarn docs:build
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Open-Source-CQUT/Golang-Doc&type=Timeline)](https://star-history.com/#Open-Source-CQUT/Golang-Doc&Timeline)


## 贡献

1. fork本仓库
2. 创建一个你自己的特色分支
3. 提交新修改
4. 向本仓库提交PR
5. 等待merge