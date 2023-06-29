import{_ as n,V as e,W as s,Z as a}from"./framework-44a66fc7.js";const i={},t=a(`<h1 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h1><p>这里会介绍一些Go的常用命令，熟悉常用命令的使用对于开发来说非常重要。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    bug         bug报告
    build       编译包和依赖
    clean       清除缓存文件
    doc         展示文档
    env        	打印环境信息
    fix         根据新的API修复
    generate    生成go文件
    get         为当前模块下载依赖
    list        列出依赖
    mod         模块管理
    run         编译并运行go程序
    test        测试
    tool        特殊工具
    version     打印go版本
    vet         报告错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本" tabindex="-1"><a class="header-anchor" href="#版本" aria-hidden="true">#</a> 版本</h2><p>查看当前go的版本</p><p>用法：<code>go version</code></p><p>输出：<code>go version go1.19.3 windows/amd64</code></p><h2 id="帮助" tabindex="-1"><a class="header-anchor" href="#帮助" aria-hidden="true">#</a> 帮助</h2><p>帮助指令，当遇到不懂的命令时，使用help指令可以查看命令的详细解释</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go help cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go cmd -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以查看命令的基本用法和参数格式</p><p><strong>示例</strong></p><p>查看基本用法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\Users\\Stranger&gt; go run -h
usage: go run [build flags] [-exec xprog] package [arguments...]
Run &#39;go help run&#39; for details.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看详细用法和解释</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\Users\\Stranger&gt; go help run
usage: go run [build flags] [-exec xprog] package [arguments...]

Run compiles and runs the named main Go package.
Typically the package is specified as a list of .go source files from a single
directory, but it may also be an import path, file system path, or pattern
matching a single known package, as in &#39;go run .&#39; or &#39;go run my/cmd&#39;.
......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><p>查看环境配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>usage: go env [-json] [-u] [-w] [var ...]</code>，env命令总共有四个参数</li><li><code>-json</code>： env命令输出的默认是shell脚本格式的配置，加上此参数后会以json格式输出环境配置</li><li><code>-u</code> ：此参数是用于取消一个配置的默认参数，等于直接把值置为空值，需要跟var参数</li><li><code>-w</code>：此参数是用于永久修改环境配置</li></ul><p><strong>示例</strong></p><p>json格式输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\Users\\Stranger&gt; go env -json

{
        &quot;AR&quot;: &quot;ar&quot;,
        &quot;CC&quot;: &quot;gcc&quot;,
        &quot;CGO_CFLAGS&quot;: &quot;-g -O2&quot;,
        &quot;CGO_CPPFLAGS&quot;: &quot;&quot;,
        &quot;CGO_CXXFLAGS&quot;: &quot;-g -O2&quot;,
        &quot;CGO_ENABLED&quot;: &quot;1&quot;,
        &quot;CGO_FFLAGS&quot;: &quot;-g -O2&quot;,
        &quot;CGO_LDFLAGS&quot;: &quot;-g -O2&quot;,
        &quot;CXX&quot;: &quot;g++&quot;,
        ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>取消一个配置的默认参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go env -u GOBIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go env -w GO111MODULE=on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>并不是所有配置都可以通过<code>go env -w</code>来修改，比如不能覆盖已有系统变量的配置</p></div><h4 id="配置项" tabindex="-1"><a class="header-anchor" href="#配置项" aria-hidden="true">#</a> 配置项</h4><p>接下来介绍一下环境中几个比较重要的配置项</p><p><strong>GO111MODULE</strong></p><p><code>GO111MODULE</code>是Go在1.11版本引入的依赖管理项，考虑到向下兼容，并没有抛弃原有的GOPATH，总共有三个参数值。</p><ul><li><code>on</code>： 寻找依赖时只会根据<code>go.mod</code>文件下载依赖，也就是说完全忽略GOPATH</li><li><code>off</code>：寻找依赖时会在GOPATH和VENDER下寻找，忽略<code>go.mod</code></li><li><code>auto</code>：自动判断，当在GOPATH目录下时，使用<code>off</code>的功能，在GOPATH目录外时，使用<code>on</code>的功能</li></ul><p><strong>GOBIN</strong></p><p><code>go install</code> 指定的安装目录</p><p><strong>GOCACHE</strong></p><p>用于存储使用Go命令而产生的缓存的目录</p><p><strong>GOMODCACHE</strong></p><p>用于存储下载的依赖库的目录</p><p><strong>GOENV</strong></p><p>指定名为env的配置文件的存放位置，env文件就是<code>go env</code>的内容，无法使用<code>go env -w</code>覆盖，只能通过系统变量来设置</p><p><strong>GOPROXY</strong></p><p>GO下载依赖的代理，由于Go的仓库在国外，国内一般都要代理。</p><p><strong>GOROOT</strong></p><p>安装Go语言的根目录</p><p><strong>GOPATH</strong></p><p>曾经用于解决导入项目的配置，现在几乎不用了，直接无视都可以。</p><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h2><p>基本用法：<code>go run [build flags] [-exec xprog] package [arguments...]</code></p><p>基本功能就是编译二进制文件并运行，且为了减少构建时间不会生成供调试器使用的信息。</p><ul><li><code>build flags</code>：是构建标志，后续在<code>build</code>命令时会讲到</li><li><code>-exec xprog</code>：用xprog执行二进制文件</li><li><code>arguments</code>：一些运行时参数</li></ul><p><strong>示例</strong></p><p>运行当前目录下的go文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go run .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行指定目录下的go文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;go run my/cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h2><p>基本用法：<code>go build [-o output] [build flags] [packages]</code></p><p>基本功能就是根据导入的路径的编译命名，且会忽略掉测试文件，并生成可执行的二进制文件</p><p><strong>示例</strong></p><p>编译并在当前目录生成可执行的二进制文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go build .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者指定目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go build ./example/ram 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在指定位置生成指定名称的二进制执行文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go build -o ./example/myexe.exe .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上的例子就是大多数开发会用到的，当然实际上能做的事情远远不只这么点。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> go build -gcflags=&quot;-N -l -S&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这个指令可以生成go汇编结果，</p><ul><li><code>-l</code> 禁止内联</li><li><code>-N</code> 编译时，禁止优化</li><li><code>-S</code> 输出汇编代码</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main.main STEXT size=190 args=0x0 locals=0x60 funcid=0x0 align=0x0
        0x0000 00000 (D:\\WorkSpace\\Code\\GoLeran\\gin_learn\\main.go:5)    TEXT    main.main(SB), ABIInternal, $96-0
        0x0000 00000 (D:\\WorkSpace\\Code\\GoLeran\\gin_learn\\main.go:5)    CMPQ    SP, 16(R14)
		...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="提交错误" tabindex="-1"><a class="header-anchor" href="#提交错误" aria-hidden="true">#</a> 提交错误</h2><p>基本使用：<code>go bug</code></p><p>使用该命令时会自动跳转到Github的issue页面，并会自动附带上控制台的输出。</p><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2><p>基本用法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage of [go] doc:
        go doc
        go doc &lt;pkg&gt;
        go doc &lt;sym&gt;[.&lt;methodOrField&gt;]
        go doc [&lt;pkg&gt;.]&lt;sym&gt;[.&lt;methodOrField&gt;]
        go doc [&lt;pkg&gt;.][&lt;sym&gt;.]&lt;methodOrField&gt;
        go doc &lt;pkg&gt; &lt;sym&gt;[.&lt;methodOrField&gt;]
       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出注释文档</p><p><strong>示例</strong></p><p>直接输出包文档，包文档指的是<code>package</code>关键字上面的注释</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go doc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go doc foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go doc template.new
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> go doc json.Number.Int64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="embed" tabindex="-1"><a class="header-anchor" href="#embed" aria-hidden="true">#</a> Embed</h2><p>基本用法:</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//go:embed static</span>
<span class="token keyword">var</span> content <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>embed</code>是用于解决编译时将静态文件打包入二进制执行程序内部的问题，有一些静态文件在运行期间是不可能会改变的，可以在打包时将其嵌入二进制程序内部。在使用时有几个需要注意的点：</p><ul><li>注释的变量类型仅支持三种 <code>string</code>，<code>[]byte</code>，<code>embed.FS</code>，即便是别名也不允许，并且只能声明不能初始化。</li><li>注释时与<code>//</code>不能有空格间隔，否则会被当作普通注释。</li><li>路径只能书写相对路径，路径中不能以<code>.</code> 或<code>/</code>开头，匹配多个路径时要使用<code>path.Match</code>风格的模式匹配。</li></ul><p>以下是几种符合规划的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//go:embed README.txt</span>
<span class="token keyword">var</span> ReadMe <span class="token builtin">string</span> <span class="token comment">// 字符串</span>

<span class="token comment">//go:embed README.txt</span>
<span class="token keyword">var</span> ReadMeBytes <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token comment">// 字节切片</span>

<span class="token comment">//go:embed static</span>
<span class="token keyword">var</span> StaticDir embed<span class="token punctuation">.</span>FS <span class="token comment">// 如果想要嵌入多个文件或者目录必须使用embed.FS</span>

<span class="token comment">//go:embed static template</span>
<span class="token comment">//go:embed web/index.html</span>
<span class="token keyword">var</span> ResourceDir embed<span class="token punctuation">.</span>FS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例</strong></p><p>假设有如下文件结构</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test/
|
|--defaultConfig.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在开发时经常会遇到默认配置的情况，一般来说如果初始化时没有配置文件，就应该自动生成一个，所以选择将默认配置文件嵌入二进制程序。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> embed_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;embed&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;testing&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//go:embed defaultConfig.yml</span>
<span class="token keyword">var</span> defaultConfigString <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">TestEmbedString</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dist<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;./config.yml&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>dist<span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">NewBufferString</span><span class="token punctuation">(</span>defaultConfigString<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//go:embed defaultConfig.yml</span>
<span class="token keyword">var</span> defaultConfigBytes <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>

<span class="token keyword">func</span> <span class="token function">TestEmbedBytes</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dist<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;./config.yml&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>dist<span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>defaultConfigBytes<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//go:embed defaultConfig.yml</span>
<span class="token keyword">var</span> defaultConfigFS embed<span class="token punctuation">.</span>FS

<span class="token keyword">func</span> <span class="token function">TestEmbedFS</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dist<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;./config.yml&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	file<span class="token punctuation">,</span> err <span class="token operator">:=</span> defaultConfigFS<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;defaultConfig.yml&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>dist<span class="token punctuation">,</span> file<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,101),d=[t];function l(o,c){return e(),s("div",null,d)}const u=n(i,[["render",l],["__file","cmd.html.vue"]]);export{u as default};
