import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,d as t,a,b as s,e,f as l,r,o}from"./app-COSvdVdM.js";const d="/images/eggs.png",k="/gopher.jpg",g="/golang.jpg",c="/images/download.png",m={};function u(b,i){const n=r("RouteLink");return o(),h("div",null,[i[28]||(i[28]=t('<h1 id="入门指南" tabindex="-1"><a class="header-anchor" href="#入门指南"><span>入门指南</span></a></h1><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>本文会引导你如何入门学习Go语言，仅从语法层面上来讲它并不难学，你大概几天就可以上手。不过按照惯例，在正式开始之前，我们需要先来了解下它的背景和起源。</p><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2><p>Go 语言由三位大佬共同创造，他们分别是</p><ul><li><a href="https://github.com/ken" target="_blank" rel="noopener noreferrer">Ken Thompson</a>，图灵奖获得者，Unix 系统创始人，B 语言创始人，C 语言创始人</li><li><a href="https://github.com/robpike" target="_blank" rel="noopener noreferrer">Rob Pike</a>，Plan9 操作系统作者之一，UTF-8 发明者之一，Go 语言设计领头人</li><li><a href="https://github.com/griesemer" target="_blank" rel="noopener noreferrer">Robert Griesemer</a>，JS V8 引擎研发者，三人之中最年轻</li></ul><p>还有一位是 Rob Pike 的妻子 Renee French，她设计了 Go 语言的 Logo，就是一只蓝色的土拨鼠。</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在某一天，三位工程师在漫长的 C++项目编译等待过程中感到十分无聊，正是在这个时刻，Rob Pike 脑海中突然闪现出一个新颖的构想：他希望设计一种简洁、小巧、编译快速，同时拥有不俗性能的编程语言，这样他们就不再需要每次编译时都面临漫长的等待。经过一番短暂的头脑风暴，三人于 2007 年 9 月 20 日召开了一个简短的会议，开始讨论和设计这门语言的初步原型，正是从这个时刻起，Go 语言正式诞生了。随后，这个小团队吸引了越来越多的志同道合的开发者，最终在 2009 年 11 月 10 日，谷歌公司正式将 Go 语言以 BSD-3-Clause 协议开源，并推出了第一个先行版本，并组建了正式的开发团队。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>值得一提的是，你可能会在其它地方看见有人叫它Golang，包括本站的Github仓库名也叫Golang-Doc，但它的官方名字其实是一直是Go，早期的时候由于go这个域名被抢注了，所以官网的域名就采用了 <code>golang.org</code>，以至于后面新来的人误以为它就叫Golang。</p></div><figure><img src="'+g+'" alt="这是官网最初的样子" tabindex="0" loading="lazy"><figcaption>这是官网最初的样子</figcaption></figure><p>再之后，Go团队经过了三年的设计与研发，于 2012 年 3 月发布了第一个正式版本 Go1.0（这个时候 Go 的工具链和运行时都还是 C 语言编写的，直到 Go1.5 才完成自举），此后每一年发布两个小版本更新，一直运营和维护到现在。</p><p>三位创始人其实在很早以前就退隐了，在大部分时间里，团队领头人是<a href="https://github.com/rsc" target="_blank" rel="noopener noreferrer">Russ Cox</a>，他早在 Go 语言未对外发布时就已经参与到了开发工作当中，此后一直管理 Go 团队长达 12 年，直到 2024 年 8 月卸任，由<a href="https://github.com/aclements" target="_blank" rel="noopener noreferrer">Austin Clements</a>接手并领导后续的开发工作。、</p><p>如果你想深入了解 Go 语言的历史，前往<a href="https://golang.design/history/" target="_blank" rel="noopener noreferrer">Go History</a>了解更多内容。</p><h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性"><span>特性</span></a></h2><ul><li><strong>语法简单</strong> Go 语言在自由度和灵活度上做了取舍，以此换来了更好的维护性和平滑的学习曲线。</li><li><strong>部署友好</strong> Go 静态编译后的二进制文件不依赖额外的运行环境，编译速度也非常快。</li><li><strong>交叉编译</strong> Go 仅需要在编译时简单设置两个参数，就可以编译出能在其它平台上运行的程序</li><li><strong>天然并发</strong> Go 语言对于并发的支持是纯天然的，仅需一个关键字，就可以开启一个异步协程。</li><li><strong>垃圾回收</strong> Go 有着优秀的 GC 性能，大部分情况下 GC 延时都不会超过 1 毫秒。</li><li><strong>丰富的标准库</strong> 从字符串处理到源码 AST 解析，功能强大且丰富的标准库是 Go 语言坚实的基础。</li><li><strong>完善的工具链</strong> Go 有着完善的开发工具链，涵盖了编译，测试，依赖管理，性能分析等方方面面。</li></ul><p>Go 语言抛弃了继承，弱化了 OOP，类，元编程，泛型，Lamda 表达式等这些特性，拥有良好的性能和较低的上手难度，它适合用于云服务开发，应用服务端开发，以及网络编程。它自带 GC，不需要开发者手动管理内存，静态编译和交叉编译这两点对于运维而言也十分友好。</p><p>Go 语言的缺点同样也有很多，比如令人诟病的错误处理，残缺的泛型，标准库虽然很丰富但内置的数据结构却没几个，<code>interface{}</code>类型满天飞，没有枚举类型，除此之外，Go 开发团队非常固执己见，不善于听取社区意见等等。（相比之下，Rust 在错误处理，泛型，依赖管理，枚举，接口等方面做的要好得多）</p><p>总的来说，我们需要辩证的看待一门语言，作为一门工程化的语言，Go 可以很大程度上提高团队的下限，就算开发人员水平再差也能兜底，很少出现一颗老鼠屎坏了一锅粥这种情况，同时因为简单的语法和较低的学习难度，可以让人很快的上手一个项目。尽管 Go 面世只有十余年不到，但已经有相当多的公司将 Go 作为了首选语言，也能侧面说明 Go 正在逐渐流行起来。</p><p>顺便一提，Go 还是一门完全开源的语言，由社区和谷歌共同维护 Go 语言的发展，官方地址是在谷歌仓库里，Github 上有一份同样的镜像仓库，如果有心你也可以参与到语言的设计当中。</p><p>官方网站：<a href="https://go.dev/" target="_blank" rel="noopener noreferrer">The Go Programming Language</a></p><p>谷歌开源仓库：<a href="https://cs.opensource.google/go" target="_blank" rel="noopener noreferrer">google/go: Google Open Source</a></p><p>Github 仓库：<a href="https://github.com/golang/go" target="_blank" rel="noopener noreferrer">golang/go: The Go programming language</a></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>笔者曾经给 Go 提过 PR，如果你想了解如何给 Go 贡献代码，可以看看我写的这篇文章：<a href="https://246859.github.io/posts/code/go/contribute2go.html" target="_blank" rel="noopener noreferrer">如何向 Go 贡献代码</a>。</p></div><p>相信很多人应该都或多或少听说过<a href="https://www.rust-lang.org/zh-CN/" target="_blank" rel="noopener noreferrer">Rust</a>，它是一个高性能的通用编程语言，其诞生时间比 Go 早一年，Go1 正式发布的时间是 2012 年，Rust 正式版发布时间为 2015 年，它们都是较为现代化的语言，这两门语言笔者都很喜欢，它们发展的领域各不相同，如果你不满足于 Go 的运行效率和表达能力，不妨试试 Rust，不过它的学习难度就远没有 Go 这么简单了。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>Go 语言下载：<a href="https://go.dev/dl/" target="_blank" rel="noopener noreferrer">Downloads - The Go Programming Language</a></p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',28)),a("p",null,[i[1]||(i[1]=s("Stable Version 指的是目前处于维护状态的两个稳定版本，Archived Version 指的是不再维护的历史版本，前往")),e(n,{to:"/release.html"},{default:l(()=>i[0]||(i[0]=[s("更新日志")])),_:1}),i[2]||(i[2]=s("了解更多关于维护规则以及历史版本的信息。"))]),i[29]||(i[29]=t(`<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>windows</span></a></h3><p>对于 windows 平台而言，有 installer 和 archive 两种类型可选，前者就是安装包，只需要点点点，推荐使用后者，会让你更熟悉 go 语言的目录结构，未来出问题不至于手足无措。选择下载 zip 文件，压缩文件中包含 go 语言的源代码以及工具链和一些文档，将其解压指定的路径，然后需要配置两个系统环境变量。</p><ul><li>GOROOT - go 语言的安装路径</li><li>GOPATH - go 语言依赖存放路径</li></ul><p>设置好后，给系统环境变量<code>PATH</code>添加两条新的项</p><ul><li><code>%GOROOT%\\bin</code>：这是 go 二进制程序地址</li><li><code>%GOPATH%\\bin</code>：这是未来会下载第三方依赖的二进制文件存放地址</li></ul><p>在<code>powershell</code>中执行<code>go version</code>命令，最后能正常显示版本就说明安装正确。</p><div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" data-title="powershell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">PS C:\\user\\username&gt; go version</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">go version go1.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">21.3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> windows</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">amd64</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>更新的话只需要下载新的 zip 覆盖原安装目录即可。</p><h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>linux</span></a></h3><p>拿 ubuntu 举例，复制想要的版本的链接，下载到本地</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://golang.google.cn/dl/go1.21.1.linux-amd64.tar.gz</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>解压到指定目录</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ~/go</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -xzf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.21.1.linux-amd64.tar.gz</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在<code>$HOME/.bashrc</code>文件中设置环境变量</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> GOROOT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$HOME</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">go</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> GOPATH</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$HOME</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">gopath</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> PATH</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$PATH</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$GOROOT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">bin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$GOPATH</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">bin</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后查看安装版本，确认正确安装</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> version</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.21.1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> linux/amd64</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>更新的话只需要下载新的 tar.gz 覆盖原安装目录即可。</p><h3 id="安装管理" tabindex="-1"><a class="header-anchor" href="#安装管理"><span>安装管理</span></a></h3><p>上面的安装方式对于基本使用已经够用了，个人推荐用以下的目录结构来存放 go 语言及其衍生文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>go/</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>|--root/</span></span>
<span class="line"><span>|  |</span></span>
<span class="line"><span>|  |--go1.21.3/</span></span>
<span class="line"><span>|  |</span></span>
<span class="line"><span>|  |--go1.20.10/</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>|--mod/</span></span>
<span class="line"><span>|  |</span></span>
<span class="line"><span>|  |--bin/</span></span>
<span class="line"><span>|  |</span></span>
<span class="line"><span>|  |--libs/</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>|--cache/</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>|--temp/</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>|--env</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>释义如下</p><ul><li><code>go/root</code>目录用于存放各个版本 go 语言源文件</li><li><code>go/mod</code>对应<code>GOAPTH</code></li><li><code>go/mod/libs</code>对应<code>GOMODCACHE</code>，也就是下载的第三方依赖存放地址</li><li><code>go/mod/bin</code>对应<code>GOBIN</code>，第三方依赖二进制文件存放地址</li><li><code>go/cache</code>，对应<code>GOCACHE</code>，存放缓存文件</li><li><code>go/temp</code>，对应<code>GOTMPDIR</code>，存放临时文件</li><li><code>go/env</code>，对应<code>GOENV</code>，全局环境变量配置文件</li></ul><p>该方式更新时不需要覆盖原安装目录，只需要将其存放到<code>go/root</code>目录下，然后修改<code>GOROOT</code>系统环境变量为该目录下指定版本的文件夹即可。在默认情况下 env 文件是读取的路径<code>GOROOT/env</code>，通过设置<code>GOENV</code>系统变量将其与<code>GOROOT</code>分离开，避免了因版本变更时 go 环境变量配置的变化，下面是<code>env</code>文件的初始设置。</p><div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" data-title="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;">GO111MODULE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">on</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;">GOCACHE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">go/cache</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;">GOMODCACHE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">go/mod/libs</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;">GOBIN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">go/mod/bin</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD;">GOTMPDIR</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">go/temp</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这只是笔者比较喜欢的一个目录风格，前往<a href="/cmd#env">命令-环境变量</a>了解更多关于环境变量的信息，你可以完全按照个人喜好来进行自定义。</p><h3 id="多版本管理" tabindex="-1"><a class="header-anchor" href="#多版本管理"><span>多版本管理</span></a></h3><p>我编写了一个多版本管理工具<a href="https://github.com/Open-Source-CQUT/govm/blob/main/README.zh.md" target="_blank" rel="noopener noreferrer">govm</a>，结合上面目录结构使用效果最佳。它可以管理本地多个 Go 版本，可以随时切换版本，也可以搜索并下载其他 Go 版本并将其安装到本地。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> govm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> search</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.22</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 10</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.6</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.5</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.4</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.2</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go1.22.0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">           76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> govm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.22.4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Fetch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://dl.google.com/go/go1.22.4.windows-amd64.zip</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Downloading</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4.windows-amd64.zip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 100%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">████████████████████████████████████████</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">| (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">76/76</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 32</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> MB/s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) [2s]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Extract</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4.windows-amd64.zip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> store</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Remove</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> archive</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> cache</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> installed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> govm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> use</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.22.4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> now</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 重新登陆shell</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> version</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> go1.22.4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> windows/amd64</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想了解如何用 Go 编写命令行工具，不嫌弃的话可以将 govm 作为一个项目参考，它也是由 Go 编写的。</p><h3 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器"><span>编辑器</span></a></h3><p>主流的 go 语言 IDE 目前个人只推荐下面两个</p><ol><li>goland：jetbrain 出品，功能强大，全方位支持，不过需要付费，可以考虑 IDEA 社区版配合插件</li><li>vscode：无需付费，万能的编辑器，有插件加持什么语言都能写</li></ol><p>如果有其它的编辑器更符合自身的使用习惯也都可以用，用什么编辑器倒无所谓，如果只是写一些简短的练习代码，可以试试官方提供的<a href="https://go.dev/play/" target="_blank" rel="noopener noreferrer">goplay</a>，可以在线运行 go 代码。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果你正在使用 JetBrains Toolbox，可以尝试我写的一个命令行工具<a href="https://github.com/246859/AutoToolBox" target="_blank" rel="noopener noreferrer">AutoToolBox</a>，可以为 Toolbox 生成 windows 右键菜单，效果图如下。</p><img src="https://github.com/246859/AutoToolBox/raw/main/image/preview.png" style="zoom:67%;"></div><h2 id="寄语" tabindex="-1"><a class="header-anchor" href="#寄语"><span>寄语</span></a></h2><p>Go 语言整体难度并不高，如果你有其他语言基础学起来会非常简单，在学习的过程中遇到琢磨不透的难点可以先跳过，学习任何一门语言都是先笼统的了解这个语言的大致语法与结构，再去深究一些特性和细节，文档中的理念也是如此，适合入门学习。笔者本人也仅仅只是一名普通学生，难免会有疏漏和勘误，如果有发现任何错误可以在 Github 提交 PR，如果觉得文档还不错可以在 Github 上点一个 Star。</p><p>如果你是强 OOP 语言的开发者，比如 Java，C#等，请不要带着 OOP 的思想先入为主，否则会对 go 的很多设计感到匪夷所思，在编写代码的时候也会非常难受，笔者最开始也是这样。</p><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览"><span>概览</span></a></h2><p>下面对本站的内容进行一个简单的介绍，以便各位可以按需阅读，部分页面是空白的代表着还未更新。</p>`,40)),a("ul",null,[a("li",null,[i[15]||(i[15]=s("语言入门：主要讲解关于 Go 语言本身的内容，偏理论。 ")),a("ul",null,[a("li",null,[e(n,{to:"/essential/base/"},{default:l(()=>i[3]||(i[3]=[s("语法基础")])),_:1}),i[4]||(i[4]=s("：主要讲一些十分基础的语法，像是")),i[5]||(i[5]=a("code",null,"if",-1)),i[6]||(i[6]=s("，")),i[7]||(i[7]=a("code",null,"for",-1)),i[8]||(i[8]=s("之类的语法规则。"))]),a("li",null,[e(n,{to:"/essential/senior/"},{default:l(()=>i[9]||(i[9]=[s("语法进阶")])),_:1}),i[10]||(i[10]=s("：讲一些 Go 独有的东西，关于模块，测试，协程等相关内容。"))]),a("li",null,[e(n,{to:"/essential/std/"},{default:l(()=>i[11]||(i[11]=[s("标准库")])),_:1}),i[12]||(i[12]=s("：对 Go 自带的标准库的一个简单介绍，因为标准库的内容实在太过庞大所以随缘更新。"))]),a("li",null,[e(n,{to:"/essential/impl/"},{default:l(()=>i[13]||(i[13]=[s("实现原理")])),_:1}),i[14]||(i[14]=s("：主要讲 Go 语言的一些内部设计原理，比如协程调度，内存管理，垃圾回收等。"))])])]),a("li",null,[i[24]||(i[24]=s("社区生态：主要讲解 Go 周边的生态，偏应用。 ")),a("ul",null,[a("li",null,[e(n,{to:"/community/database/"},{default:l(()=>i[16]||(i[16]=[s("数据库")])),_:1}),i[17]||(i[17]=s("：通过 Go 操作主流的数据库。"))]),a("li",null,[e(n,{to:"/community/micro/"},{default:l(()=>i[18]||(i[18]=[s("微服务")])),_:1}),i[19]||(i[19]=s("：介绍一些与 Go 有关的微服务工具。"))]),a("li",null,[e(n,{to:"/community/pkgs/"},{default:l(()=>i[20]||(i[20]=[s("第三方库")])),_:1}),i[22]||(i[22]=s("：介绍一些由 Go 编写的第三方库，随缘更新，也可以直接在")),e(n,{to:"/deb.html"},{default:l(()=>i[21]||(i[21]=[s("依赖导航")])),_:1}),i[23]||(i[23]=s("里面查看。"))])])])]),a("p",null,[i[26]||(i[26]=s("前往")),e(n,{to:"/essential/base/0.ready.html"},{default:l(()=>i[25]||(i[25]=[s("准备开始")])),_:1}),i[27]||(i[27]=s("进行入门学习"))])])}const y=p(m,[["render",u],["__file","guide.html.vue"]]),F=JSON.parse('{"path":"/guide.html","title":"入门指南","lang":"zh-CN","frontmatter":{"description":"入门指南 本文会引导你如何入门学习Go语言，仅从语法层面上来讲它并不难学，你大概几天就可以上手。不过按照惯例，在正式开始之前，我们需要先来了解下它的背景和起源。 背景 Go 语言由三位大佬共同创造，他们分别是 Ken Thompson，图灵奖获得者，Unix 系统创始人，B 语言创始人，C 语言创始人 Rob Pike，Plan9 操作系统作者之一，U...","head":[["meta",{"property":"og:url","content":"https://golang.halfiisland.com/guide.html"}],["meta",{"property":"og:site_name","content":"Golang 中文学习文档"}],["meta",{"property":"og:title","content":"入门指南"}],["meta",{"property":"og:description","content":"入门指南 本文会引导你如何入门学习Go语言，仅从语法层面上来讲它并不难学，你大概几天就可以上手。不过按照惯例，在正式开始之前，我们需要先来了解下它的背景和起源。 背景 Go 语言由三位大佬共同创造，他们分别是 Ken Thompson，图灵奖获得者，Unix 系统创始人，B 语言创始人，C 语言创始人 Rob Pike，Plan9 操作系统作者之一，U..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://golang.halfiisland.com/images/eggs.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-22T15:34:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-22T15:34:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"入门指南\\",\\"image\\":[\\"https://golang.halfiisland.com/images/eggs.png\\",\\"https://golang.halfiisland.com/gopher.jpg\\",\\"https://golang.halfiisland.com/golang.jpg\\",\\"https://golang.halfiisland.com/images/download.png\\"],\\"dateModified\\":\\"2024-12-22T15:34:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"寒江蓑笠翁\\",\\"url\\":\\"https://246859.github.io/\\",\\"email\\":\\"2633565580@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"特性","slug":"特性","link":"#特性","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[{"level":3,"title":"windows","slug":"windows","link":"#windows","children":[]},{"level":3,"title":"linux","slug":"linux","link":"#linux","children":[]},{"level":3,"title":"安装管理","slug":"安装管理","link":"#安装管理","children":[]},{"level":3,"title":"多版本管理","slug":"多版本管理","link":"#多版本管理","children":[]},{"level":3,"title":"编辑器","slug":"编辑器","link":"#编辑器","children":[]}]},{"level":2,"title":"寄语","slug":"寄语","link":"#寄语","children":[]},{"level":2,"title":"概览","slug":"概览","link":"#概览","children":[]}],"git":{"createdTime":1673353368000,"updatedTime":1734881665000,"contributors":[{"name":"246859","username":"246859","email":"2633565580@qq.com","commits":20,"url":"https://github.com/246859"},{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"url":"https://github.com/Mister-Hope"},{"name":"yihhao wang","username":"yihhao wang","email":"2633565580@qq.com","commits":6,"url":"https://github.com/yihhao wang"},{"name":"zhangbaolong01","username":"zhangbaolong01","email":"51783074+zhangbaolong01@users.noreply.github.com","commits":1,"url":"https://github.com/zhangbaolong01"}]},"readingTime":{"minutes":22.3,"words":3345},"filePathRelative":"guide.md","localizedDate":"2023年1月10日","autoDesc":true,"excerpt":"\\n<figure><img src=\\"/images/eggs.png\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>本文会引导你如何入门学习Go语言，仅从语法层面上来讲它并不难学，你大概几天就可以上手。不过按照惯例，在正式开始之前，我们需要先来了解下它的背景和起源。</p>\\n<h2>背景</h2>\\n<p>Go 语言由三位大佬共同创造，他们分别是</p>\\n<ul>\\n<li><a href=\\"https://github.com/ken\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Ken Thompson</a>，图灵奖获得者，Unix 系统创始人，B 语言创始人，C 语言创始人</li>\\n<li><a href=\\"https://github.com/robpike\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Rob Pike</a>，Plan9 操作系统作者之一，UTF-8 发明者之一，Go 语言设计领头人</li>\\n<li><a href=\\"https://github.com/griesemer\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Robert Griesemer</a>，JS V8 引擎研发者，三人之中最年轻</li>\\n</ul>"}');export{y as comp,F as data};