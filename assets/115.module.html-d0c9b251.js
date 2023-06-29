import{_ as s,V as o,W as c,X as e,Y as n,$ as d,Z as a,F as l}from"./framework-44a66fc7.js";const t={},r=e("h1",{id:"模块",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#模块","aria-hidden":"true"},"#"),n(" 模块")],-1),u={href:"https://go.dev/ref/mod",target:"_blank",rel:"noopener noreferrer"},v=a(`<br><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><p>有了Go Mod，不再需要将所有的代码都存放在GOPATH目录下，可以在任意位置创建项目，在使用Go Mod之前，需要确保Go Mod已经启用，使用如下命令来查看Go的环境配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行后会输出一大堆的配置，这类只需要关心<code>GO111MODULE</code>这一个配置项即可，关于该配置项有三种可选的值：</p><p><code>on</code>：使用Go Mod进行项目管理</p><p><code>off</code>：不使用Go Mod进行过项目管理</p><p><code>auto</code>：根据项目位置自动判断使用何种方式进行项目管理</p><p>推荐将其修改为<code>on</code>，执行如下命令即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改完毕后就可以创建一个项目了，首先创建一个文件夹，然后需要用到<code>go mod</code>命令来进行创建Go Mod项目，格式如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> golearn <span class="token comment">#创建golearn文件夹</span>
$ <span class="token builtin class-name">cd</span> golearn <span class="token comment">#进入文件夹</span>
$ go mod init golearn <span class="token comment">#初始化Go Mod项目，名为golearn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建完毕后查看目录下是否生成了一个名为<code>go.mod</code>的文件，并且查看文件内容。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
go.mod
$ <span class="token function">cat</span> go.mod
module golearn

go <span class="token number">1.20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以编写一个简单的Go程序来测试下项目是否可以正常运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">vim</span> main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后将如下代码写入<code>main.go</code>文件</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go run golearn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行结果如下就说明项目创建成功</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hello world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h2 id="修改代理" tabindex="-1"><a class="header-anchor" href="#修改代理" aria-hidden="true">#</a> 修改代理</h2><p>Go默认的代理仓库是在外网，国内的用户大多数情况下都无法正常访问，所以为了后续能够正常使用，需要修改Go代理，首先通过<code>go env</code>查看环境配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> GOPROXY
<span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span><span class="token string">&quot;https://proxy.golang.org,direct&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>https://proxy.golang.org</code>这个网址就是官方默认代理网址，需要将其替换成国内的代理服务商，目前国内做的比较好的有以下几家</p>`,27),g={href:"https://goproxy.io/zh/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://goproxy.cn/",target:"_blank",rel:"noopener noreferrer"},p=a(`<figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031553255.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里选择七牛云的代理，执行如下命令来修改Go代理</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn,direct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代理修改成功后，在后续的学习中就会方便很多。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>direct</code>表示尝试直接从项目的版本控制系统中下载依赖</p></div><br><h2 id="下载依赖" tabindex="-1"><a class="header-anchor" href="#下载依赖" aria-hidden="true">#</a> 下载依赖</h2>`,7),b={href:"https://pkg.go.dev/",target:"_blank",rel:"noopener noreferrer"},h=e("code",null,"Gin",-1),x=a(`<figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031524530.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里会出现很多搜索结果，在使用第三方依赖时，需要结合引用次数和更新时间来决定是否采用该依赖，这里直接选择第一个</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031526949.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>进入对应的页面后，可以看出这是该依赖的一个文档页面，有着非常多关于它的详细信息，后续查阅文档时也可以来这里。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031529781.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里只需要将它的地址复制下来，然后在之前创建的项目下使用<code>go get</code>命令，命令如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>过程中会下载很多的依赖，只要没有报错就说明下载成功。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/gin-gonic/gin
go: added github.com/bytedance/sonic v1.8.0
go: added github.com/chenzhuoyu/base64x v0.0.0-20221115062448-fe3a3abad311
go: added github.com/gin-contrib/sse v0.1.0
go: added github.com/gin-gonic/gin v1.9.0
go: added github.com/go-playground/locales v0.14.1
go: added github.com/go-playground/universal-translator v0.18.1
go: added github.com/go-playground/validator/v10 v10.11.2
go: added github.com/goccy/go-json v0.10.0
go: added github.com/json-iterator/go v1.1.12
go: added github.com/klauspost/cpuid/v2 v2.0.9
go: added github.com/leodido/go-urn v1.2.1
go: added github.com/mattn/go-isatty v0.0.17
go: added github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421
go: added github.com/modern-go/reflect2 v1.0.2
go: added github.com/pelletier/go-toml/v2 v2.0.6
go: added github.com/twitchyliquid64/golang-asm v0.15.1
go: added github.com/ugorji/go/codec v1.2.9
go: added golang.org/x/arch v0.0.0-20210923205945-b76863e36670
go: added golang.org/x/crypto v0.5.0
go: added golang.org/x/net v0.7.0
go: added golang.org/x/sys v0.5.0
go: added golang.org/x/text v0.7.0
go: added google.golang.org/protobuf v1.28.1
go: added gopkg.in/yaml.v3 v3.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后查看<code>go.mod</code>文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> go.mod
module golearn

go <span class="token number">1.20</span>

require github.com/gin-gonic/gin v1.9.0

require <span class="token punctuation">(</span>
	github.com/bytedance/sonic v1.8.0 // indirect
	github.com/chenzhuoyu/base64x v0.0.0-20221115062448-fe3a3abad311 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.11.2 // indirect
	github.com/goccy/go-json v0.10.0 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/klauspost/cpuid/v2 v2.0.9 // indirect
	github.com/leodido/go-urn v1.2.1 // indirect
	github.com/mattn/go-isatty v0.0.17 // indirect
	github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/pelletier/go-toml/v2 v2.0.6 // indirect
	github.com/twitchyliquid64/golang-asm v0.15.1 // indirect
	github.com/ugorji/go/codec v1.2.9 // indirect
	golang.org/x/arch v0.0.0-20210923205945-b76863e36670 // indirect
	golang.org/x/crypto v0.5.0 // indirect
	golang.org/x/net v0.7.0 // indirect
	golang.org/x/sys v0.5.0 // indirect
	golang.org/x/text v0.7.0 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以发现相较于之前多了很多东西，同时也会发现目录下多了一个名为<code>go.sum</code>的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
go.mod  go.sum  main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里先按下不表，修改<code>main.go</code>文件如下代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行项目</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go run golearn
<span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> Creating an Engine instance with the Logger and Recovery middleware already attached.

<span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> Running <span class="token keyword">in</span> <span class="token string">&quot;debug&quot;</span> mode. Switch to <span class="token string">&quot;release&quot;</span> mode <span class="token keyword">in</span> production.
 - using env:   <span class="token builtin class-name">export</span> <span class="token assign-left variable">GIN_MODE</span><span class="token operator">=</span>release
 - using code:  gin.SetMode<span class="token punctuation">(</span>gin.ReleaseMode<span class="token punctuation">)</span>

<span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> You trusted all proxies, this is NOT safe. We recommend you to <span class="token builtin class-name">set</span> a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin<span class="token comment">#readme-don-t-trust-all-proxies for details.</span>
<span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> Environment variable PORT is undefined. Using port :8080 by default
<span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> Listening and serving HTTP on :8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>于是，通过一行代码就运行起了一个最简单的Web服务器。当不再需要某一个依赖时，也可以使用<code>go get</code>命令来删除该依赖，这里以删除Gin为例子</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/gin-gonic/gin@none
go: removed github.com/gin-gonic/gin v1.9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在依赖地址后面加上<code>@none</code>即可删除该依赖，结果也提示了删除成功，此时再次查看<code>go.mod</code>文件会发现没有了Gin依赖。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> go.mod <span class="token operator">|</span> <span class="token function">grep</span> github.com/gin-gonic/gin

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当需要升级最新版本时，可以加上<code>@latest</code>后缀</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/gin-gonic/gin@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者可以自行查询可用的Release版本号</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>go get</code>下载的是依赖的源码，如果想要下载打包好的二进制可执行文件，就需要使用<code>go install</code>，例如性能分析工具benchstat，如果是需要进行性能分析光下个源码肯定没什么意义，就需要执行如下命令来下载二进制可执行文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go install olang.org/x/perf/cmd/benchstat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载后可执行文件会存放在<code>%GOPATH/bin</code>目录下。</p></div><br><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>go mod download</code></td><td>下载当前项目的依赖包</td></tr><tr><td><code>go mod edit</code></td><td>编辑go.mod文件</td></tr><tr><td><code>go mod graph</code></td><td>输出模块依赖图</td></tr><tr><td><code>go mod init</code></td><td>在当前目录初始化go mod</td></tr><tr><td><code>go mod tidy</code></td><td>清理项目模块</td></tr><tr><td><code>go mod verify</code></td><td>验证项目的依赖合法性</td></tr><tr><td><code>go mod why</code></td><td>解释项目哪些地方用到了依赖</td></tr><tr><td><code>go clean -modcache</code></td><td>用于删除项目模块依赖缓存</td></tr><tr><td><code>go list -m</code></td><td>列出模块</td></tr></tbody></table><br><h2 id="模块管理" tabindex="-1"><a class="header-anchor" href="#模块管理" aria-hidden="true">#</a> 模块管理</h2><p>上述所有的内容都只是在讲述Go Mod的基本使用，但事实上要学会Go Mod仅仅只有这些是完全不够的。官方对于模块的定义为：一组被版本标记的包集合。上述定义中，包应该是再熟悉不过的概念了，而版本则是要遵循语义化版本号，定义为：<code>v(major).(minor).(patch)</code>的格式，例如Go的版本号<code>v1.20.1</code>，主版本号是1，小版本号是20，补丁版本是1，合起来就是<code>v1.20.1</code>，下面是详细些的解释：</p><ul><li><code>major</code>：当major版本变化时，说明项目发生了不兼容的改动，老版本的项目升级到新版本大概率没法正常运行。</li><li><code>minor</code>：当<code>minor</code>版本变化时，说明项目增加了新的特性，只是先前版本的基础只是增加了新的功能。</li><li><code>patch</code>：当<code>patch</code>版本发生变化时，说明只是有bug被修复了，没有增加任何新功能。</li></ul><br><h3 id="依赖存储" tabindex="-1"><a class="header-anchor" href="#依赖存储" aria-hidden="true">#</a> 依赖存储</h3><p>当使用Go Mod进行项目管理时，模块缓存默认存放在<code>$GOPATH/pkg/mod</code>目录下，也可以修改<code>$GOMODCACHE</code>来指定存放在另外一个位置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOMODCACHE</span><span class="token operator">=</span>你的模块缓存路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同一个机器上的不同的Go Mod项目共享该目录下的缓存，缓存没有大小限制且不会自动删除，且在缓存中解压的依赖源文件都是只读的，想要清空缓存可以执行如下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go clean <span class="token parameter variable">-modcache</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>存储目录下一般会有一个<code>cache</code>目录用于存放依赖的缓存信息和原始压缩包，解压后会根据<code>域名/仓库名</code>的格式来存放，例如阿里云OSS对象存储服务的SDK依赖存放路径就是：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$GOMODCACHE/github.com/aliyun/aliyun-oss-go-sdk@v2.1.6+incompatible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h3 id="版本选择" tabindex="-1"><a class="header-anchor" href="#版本选择" aria-hidden="true">#</a> 版本选择</h3><p>Go在依赖版本选择时，遵循<strong>最小版本选择原则</strong>。下面是一个官网给的例子，主模块引用了模块A的1.2版本和模块B的1.2版本，同时模块A的1.2版本引用了模块C的1.3版本，模块B的1.2版本引用了模块C的1.4版本，并且模块C的1.3和1.4版本都同时引用了模块D的1.2版本，根据最小可用版本原则，Go最终会选择的版本是A1.2，B1.2，C1.4和D1.2。其中淡蓝色的表示<code>go.mod</code>文件加载的，框选的表示最终选择的版本。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304032118557.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>官网中还给出了其他几个例子，但大体意思都差不多。</p><br><h3 id="go-mod" tabindex="-1"><a class="header-anchor" href="#go-mod" aria-hidden="true">#</a> go.mod</h3><p>每创建一个Go Mod项目都会生成一个<code>go.mod</code>文件，因此熟悉<code>go.mod</code>文件是非常有必要的，不过大部分情况并不需要手动的修改<code>go.mod</code>文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module golearn

go 1.20

require github.com/gin-gonic/gin v1.9.0

require (
   github.com/bytedance/sonic v1.8.0 // indirect
   github.com/chenzhuoyu/base64x v0.0.0-20221115062448-fe3a3abad311 // indirect
   github.com/gin-contrib/sse v0.1.0 // indirect
   github.com/go-playground/locales v0.14.1 // indirect
   github.com/go-playground/universal-translator v0.18.1 // indirect
   github.com/go-playground/validator/v10 v10.11.2 // indirect
   github.com/goccy/go-json v0.10.0 // indirect
   github.com/json-iterator/go v1.1.12 // indirect
   github.com/klauspost/cpuid/v2 v2.0.9 // indirect
   github.com/leodido/go-urn v1.2.1 // indirect
   github.com/mattn/go-isatty v0.0.17 // indirect
   github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
   github.com/modern-go/reflect2 v1.0.2 // indirect
   github.com/pelletier/go-toml/v2 v2.0.6 // indirect
   github.com/twitchyliquid64/golang-asm v0.15.1 // indirect
   github.com/ugorji/go/codec v1.2.9 // indirect
   golang.org/x/arch v0.0.0-20210923205945-b76863e36670 // indirect
   golang.org/x/crypto v0.5.0 // indirect
   golang.org/x/net v0.7.0 // indirect
   golang.org/x/sys v0.5.0 // indirect
   golang.org/x/text v0.7.0 // indirect
   google.golang.org/protobuf v1.28.1 // indirect
   gopkg.in/yaml.v3 v3.0.1 // indirect
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在文件中可以发现绝大多数的依赖地址都带有<code>github</code>等字眼，这是因为Go并没有一个公共的依赖仓库，大部分开源项目都是在托管在Gitub上的，也有部分的是自行搭建仓库，例如<code>google.golang.org/protobuf</code>，<code>golang.org/x/crypto</code>。通常情况下，这一串网址同时也是Go项目的模块名称，这就会出现一个问题，URL是不分大小写的，但是存储依赖的文件夹是分大小写的，所以<code>go get github.com/gin-gonic/gin</code>和<code>go get github.com/gin-gonic/Gin</code>两个引用的是同一个依赖但是本地存放的路径不同。发生这种情况时，Go并不会直接把大写字母当作存放路径，而是会将其转义为<code>!小写字母</code>，比如<code>github.com\\BurntSushi</code>最终会转义为<code>github.com\\!burnt!sushi</code>。</p><br><p><strong>module</strong></p><p><code>module</code>关键字声明了当前项目的模块名，一个<code>go.mod</code>文件中只能出现一个<code>module</code>关键字。例子中的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module golearn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代表着当前模块名为<code>golearn</code>，例如打开Gin依赖的<code>go.mod</code>文件可以发现它的<code>module</code>名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Gin的模块名就是下载依赖时使用的地址，这也是通常而言推荐模块名格式，<code>域名/用户/仓库名</code>。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>有一个需要注意的点是，当主版本大于1时，主版本号要体现在模块名中，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>github.com/my/example
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果版本升级到了v2.0.0，那么模块名就需要修改成如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>github.com/my/example/v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果原有项目引用了老版本，且新版本不加以区分的话，在引用依赖时由于路径都一致，所以使用者并不能区分主版本变化所带来的不兼容变动，这样就可能会造成程序错误。</p></div><br><p><strong>Deprecation</strong></p><p>在<code>module</code>的上一行开头注释<code>Deprecated</code>来表示该模块已弃用，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Deprecated: use example.com/mod/v2 instead.
module example.com/mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>go</strong></p><p><code>go</code>关键字表示了当前编写当前项目所用到的Go版本，版本号必须遵循语义化规则，根据go版本的不同，Go Mod会表现出不同的行为，下方是一个简单示例，关于Go可用的版本号自行前往官方查阅。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go 1.20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p><strong>require</strong></p><p><code>require</code>关键字表示引用了一个外部依赖，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>require github.com/gin-gonic/gin v1.9.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>格式是<code>require 模块名 版本号</code>，有多个引用时可以使用括号括起来</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>require (
   github.com/bytedance/sonic v1.8.0 // indirect
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带有<code>// indirect</code>注释的表示该依赖没有被当前项目直接引用，可能是项目直接引用的依赖引用了该依赖，所以对于当前项目而言就是间接引用。前面提到过主板变化时要体现在模块名上，如果不遵循此规则的模块被称为不规范模块，在<code>require</code>时，就会加上incompatible注释。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>require example.com/m v4.1.2+incompatible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p><strong>伪版本</strong></p><p>在上面的<code>go.mod</code>文件中，可以发现有一些依赖包的版本并不是语义化的版本号，而是一串不知所云的字符串，这其实是对应版本的CommitID，语义化版本通常指的是某一个Release。伪版本号则可以细化到指定某一个Commit，通常格式为<code>vx.y.z-yyyyMMddHHmmss-CommitId</code>，由于其<code>vx.y.z</code>并不一定真实存在，所以称为伪版本，例如下面例子中的<code>v0.0.0</code>并不存在，真正有效的是其后的12位CommitID。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// CommitID一般取前12位
github.com/chenzhuoyu/base64x v0.0.0-20221115062448-fe3a3abad311 // indirect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同理，在下载依赖时也可以指定CommitID替换语义化版本号</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/chenzhuoyu/base64x@fe3a3abad311
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p><strong>exclude</strong></p><p><code>exclude</code>关键字表示了不加载指定版本的依赖，如果同时有<code>require</code>引用了相同版本的依赖，也会被忽略掉。该关键字仅在主模块中才生效。例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>exclude golang.org/x/net v1.2.3

exclude (
    golang.org/x/crypto v1.4.5
    golang.org/x/text v1.6.7
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>replace</strong></p><p><code>replace</code>将会替换掉指定版本的依赖，可以使用模块路径和版本替换又或者是其他平台指定的文件路径，例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>replace golang.org/x/net v1.2.3 =&gt; example.com/fork/net v1.4.5

replace (
    golang.org/x/net v1.2.3 =&gt; example.com/fork/net v1.4.5
    golang.org/x/net =&gt; example.com/fork/net v1.4.5
    golang.org/x/net v1.2.3 =&gt; ./fork/net
    golang.org/x/net =&gt; ./fork/net
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仅<code>=&gt;</code>左边的版本被替换，其他版本的同一个依赖照样可以正常访问，无论是使用本地路径还是模块路径指定替换，如果替换模块具有 <code>go.mod </code>文件，则其<code>module</code>指令必须与所替换的模块路径匹配。</p><br><p><strong>retract</strong></p><p><code>retract</code>指令表示，不应该依赖<code>retract</code>所指定依赖的版本或版本范围。例如在一个新的版本发布后发现了一个重大问题，这个时候就可以使用<code>retract</code>指令。</p><p>撤回一些版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>retract (
    v1.0.0 // Published accidentally.
    v1.0.1 // Contains retractions only.
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>撤回版本范围</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>retract v1.0.0
retract [v1.0.0, v1.9.9]
retract (
    v1.0.0
    [v1.0.0, v1.9.9]
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="go-sum" tabindex="-1"><a class="header-anchor" href="#go-sum" aria-hidden="true">#</a> go.sum</h3><p><code>go.sum</code>文件在创建项目之初并不会存在，只有在真正引用了外部依赖后，才会生成该文件，<code>go.sum</code>文件并不适合人类阅读，也不建议手动修改该文件。它的作用主要是解决一致性构建问题，即不同的人在不同的环境中使用同一个的项目构建时所引用的依赖包必须是完全相同的，这单单靠一个<code>go.mod</code>文件是无法保证的。</p><p>接下来看看下载一个依赖时，Go从头到尾都做了些什么事，首先使用如下命令下载一个依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/bytedance/sonic v1.8.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>go get命令首先会将依赖包下载到本地的缓存目录中，通常该目录为<code>$GOMODCACHE/cache/download/</code>，该目录根据域名来划分不同网站的依赖包，所以你可能会看到如下的目录结构</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
cloud.google.com/      go.opencensus.io/     gopkg.in/          nhooyr.io/
dmitri.shuralyov.com/  go.opentelemetry.io/  gorm.io/           rsc.io/
github.com/            go.uber.org/          honnef.co/         sumdb/
go.etcd.io/            golang.org/           lukechampine.com/
go.mongodb.org/        google.golang.org/    modernc.org/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么上例中下载的依赖包存放的路径就位于</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$GOMODCACHE/cache/download/github.com/bytedance/sonic/@v/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可能的目录结构如下，会有好几个版本命名的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
list         v1.8.0.lock  v1.8.0.ziphash  v1.8.3.mod
v1.5.0.mod   v1.8.0.mod   v1.8.3.info     v1.8.3.zip
v1.8.0.info  v1.8.0.zip   v1.8.3.lock     v1.8.3.ziphash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常情况下，该目录下一定有一个<code>list</code>文件，用于记录该依赖已知的版本号，而对于每一个版本而言，都会有如下的文件：</p><ul><li><code>zip</code>：依赖的源码压缩包</li><li><code>ziphash</code>：根据依赖压缩包所计算出的哈希值</li><li><code>info</code>：json格式的版本元数据</li><li><code>mod</code>：该版本的<code>go.mod</code>文件</li><li><code>lock</code>：临时文件，官方也没说干什么用的</li></ul>`,109),k=e("code",null,"go.mod",-1),f={href:"http://xn--sum-888fh76nzcya.golang.org",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"go.mod",-1),G=e("code",null,"go.sum",-1),O=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>github.com/bytedance/sonic v1.8.0 h1:ea0Xadu+sHlu7x5O3gKhRpQ1IKiMrSiHttPF0ybECuA=
github.com/bytedance/sonic v1.8.0/go.mod h1:i736AoUSYt75HyZLoJW9ERYxcy6eaN6h4BZXU064P/U=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>假如禁用了GOSUMDB，Go会直接将本地计算得到的哈希值写入<code>go.sum</code>文件中，一般不建议这么做。</p></div><p>正常情况下每一个依赖都会有两条记录，第一个是压缩包的哈希值，第二个是依赖包的<code>go.mod</code>文件的哈希值，记录格式为<code>模块名 版本号 算法名称:哈希值</code>，有些比较古老的依赖包可能没有<code>go.mod</code>文件，所以就不会有第二条哈希记录。当这个项目在另一个人的环境中构建时，Go会根据<code>go.mod</code>中指定的本地依赖计算哈希值，再与<code>go.sum</code>中记录的哈希值进行比对，如果哈希值不一致，则说明依赖版本不同，就会拒绝构建。发生这种情况时，本地依赖和<code>go.sum</code>文件都有可能被修改过，但是由于<code>go.sum</code>是经过GOSUMDB查询记录的，所以会倾向于更相信<code>go.sum</code>文件。</p><br><h3 id="私有模块" tabindex="-1"><a class="header-anchor" href="#私有模块" aria-hidden="true">#</a> 私有模块</h3><p>Go Mod大多数工具都是针对开源项目而言的，不过Go也对私有模块进行了支持。对于私有项目而言，通常情况下需要配置以下几个环境配置来进行模块私有处理</p><ul><li><code>GOPROXY</code> ：依赖的代理服务器集合</li><li><code>GOPRIVATE</code> ：私有模块的模块路径前缀的通用模式列表，如果模块名符合规则表示该模块为私有模块，具体行为与GONOPROXY和GONOSUMDB一致。</li><li><code>GONOPROXY</code> ：不从代理中下载的模块路径前缀的通用模式列表，如果符合规则在下载模块时不会走GOPROXY，尝试直接从版本控制系统中下载。</li><li><code>GONOSUMDB</code> ：不进行GOSUMDB公共校验的模块路径前缀的通用模式列表，如果符合在下载模块校验时不会走checksum的公共数据库。</li><li><code>GOINSECURE</code> ：可以通过 HTTP 和其他不安全协议检索的模块路径前缀的通用模式列表。</li></ul><br><h2 id="工作区" tabindex="-1"><a class="header-anchor" href="#工作区" aria-hidden="true">#</a> 工作区</h2><p>工作区(workspace)，是Go在1.18引入的关于多模块管理的一个新的解决方案。在以往的时候，如果想要在本地依赖其他模块但又没有上传到远程仓库，一般都需要使用<code>replace</code>指令，文件结构如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>learn
	-main
	|--	main.go
	|--	go.mod
	-tool
	|--	util.go
	|--	go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假如<code>main.go</code>想要导入<code>tool</code>模块下一个函数，则需要将<code>main</code>的<code>go.mod</code>文件修改如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module main

go 1.19

require (
   tool v0.0.0
)
replace (
   tool =&gt; &quot;../utils&quot; // 使用replace指令指向本地模块
)
package main

import (
   &quot;fmt&quot;
   &quot;tool&quot;
)

func main() {
   fmt.Println(tool.StringMsg())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种解决办法是将<code>tool</code>模块上传至远程仓库然后发布tag，然后<code>main</code>模块使用<code>go get -u</code>进行更新，而工作区就是为了解决这样的问题而生的。在目录<code>learn</code>下使用命令<code>go work init main tool</code>，就会多出一个名为<code>go.work</code>的文件，内容如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go 1.19

use (
   ./main
   ./tool
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下操作后，<code>main</code>模块下的<code>go.mod</code>文件便可以不用<code>replace</code>也可以访问<code>tool</code>模块下的函数。</p><p><code>go.work</code>文件有三种指令。</p><p><strong>go</strong></p><p><code>go.work</code>文件中必须要有一个有效的Go版本，其指定了要使用的Go工具链版本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go 1.19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>use</strong></p><p><code>use</code>指令用于将本地的模块加入到主模块集合中，它的参数是包含<code>go.mod</code>文件目录的相对路径，但不会添加包含在参数中的子模块。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use ./mymod  // example.com/mymod

use (
    ../othermod
    ./subdir/thirdmod
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>replace</strong></p><p>就如同<code>go.mod</code>文件中的<code>replace</code>指令一样，用于替换指定版本的依赖，区别在于，它会覆盖<code>use</code>指令中相同的<code>replace</code>指令，也就是说<code>replace</code>指令的优先级以<code>go.work</code>文件为准，其次才是<code>go.mod</code>文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>replace golang.org/x/net v1.2.3 =&gt; example.com/fork/net v1.4.5

replace (
    golang.org/x/net v1.2.3 =&gt; example.com/fork/net v1.4.5
    golang.org/x/net =&gt; example.com/fork/net v1.4.5
    golang.org/x/net v1.2.3 =&gt; ./fork/net
    golang.org/x/net =&gt; ./fork/net
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顺便提下，<code>go work</code>命令有几个子命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    edit        编辑go.work文件
    init        初始化工作区
    sync        将工作区构建列表同步至模块
    use         添加模块到工作区中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若想要禁用工作区模式，可以通过 <code>-workfile=off</code> 指令来指定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go run -workfile=off main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,30);function _(q,M){const i=l("ExternalLinkIcon");return o(),c("div",null,[r,e("p",null,[n("每一个现代语言都会有属于自己的一个成熟的依赖管理工具，例如Java的Gradle，Python的Pip，NodeJs的Npm等，一个好的依赖管理工具可以为开发者省去不少时间并且可以提升开发效率。然而Go在早期并没有一个成熟的依赖管理解决方案，那时所有的代码都存放在GOPATH目录下，对于工程项目而言十分的不友好，版本混乱，依赖难以管理，为了解决这个问题，各大社区开发者百家争鸣，局面一时间混乱了起来，期间也不乏出现了一些佼佼者例如Vendor，直到Go1.11官方终于推出了Go Mod这款官方的依赖管理工具，结束了先前的混乱局面，并在后续的更新中不断完善，淘汰掉了曾经老旧的工具。时至今日，在撰写本文时，Go发行版本已经到了1.20，在今天几乎所有的Go项目都在采用Go Mod，所以在本文也只会介绍Go Mod的教程，官方对于Go模块也编写了非常细致的文档："),e("a",u,[n("Go Modules Reference"),d(i)]),n("。")]),v,e("ul",null,[e("li",null,[e("a",g,[n("GOPROXY.IO - 一个全球代理 为 Go 模块而生"),d(i)])]),e("li",null,[e("a",m,[n("七牛云 - Goproxy.cn"),d(i)])])]),p,e("p",null,[n("修改完依赖后，接下来安装一个第三方依赖试试。Go官方有专门的依赖查询网站，前往"),e("a",b,[n("Go Packages"),d(i)]),n("查询，搜索著名的Web框架"),h,n("。")]),x,e("p",null,[n("一般情况下，Go会计算压缩包和"),k,n("两个文件的哈希值，然后再根据GOSUMDB所指定的服务器（"),e("a",f,[n("默认是sum.golang.org"),d(i)]),n("）查询该依赖包的哈希值，如果本地计算出的哈希值与查询得到的结果不一致，那么就不会再向下执行。如果一致的话，就会更新"),y,n("文件，并向"),G,n("文件插入两条记录，大致如下：")]),O])}const $=s(t,[["render",_],["__file","115.module.html.vue"]]);export{$ as default};
