# Golang 中文学习文档

这是一个简单纯粹且完全开源的 Golang 中文学习文档，网站内容是作者在学习过程中的记录，每一篇文章的更新都是新的积累，主要包括 go 语言基础方面的东西，适合入门玩家浏览。

由于作者水平十分有限，如果在文中有发现任何纰漏或者想自己发布文章，欢迎提交 issue 和 PR，有时间看到了会尽快审理。

## 开发

文档本身采用 [VuePress](https://vuejs.press/zh/) 框架和 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题进行开发，上手难度低，使用简单，并采用 `pnpm` 进行构建。

**准备**

在进行开发之前，请确保本地的 nodejs 版本是 18.19 及以上：

```bash
$ node -v
v22.12.0
```

之后请启用 Corepack (Windows 系统需要管理员权限)：

```bash
corepack enable
```

如遇到框架相关的问题请自行浏览官方网站。

**安装依赖**

```bash
pnpm install
```

**本地运行**

```bash
pnpm docs:dev
```

**清空缓存运行**

```bash
pnpm docs:clean-dev
```

**构建**

```bash
pnpm docs:build
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Open-Source-CQUT/Golang-Doc&type=Timeline)](https://star-history.com/#Open-Source-CQUT/Golang-Doc&Timeline)

## 贡献

1. fork 本仓库
2. 创建一个你自己的特色分支
3. 提交新修改
4. 向本仓库提交 PR
5. 等待 merge
