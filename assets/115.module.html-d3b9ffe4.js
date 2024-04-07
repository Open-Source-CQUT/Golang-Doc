import{_ as c,V as d,W as p,X as s,Y as n,Z as a,$ as t,a0 as i,F as l}from"./framework-f06be456.js";const u={},r=s("h1",{id:"模块",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#模块","aria-hidden":"true"},"#"),n(" 模块")],-1),v={href:"https://go.dev/ref/mod",target:"_blank",rel:"noopener noreferrer"},m=i('<br><h2 id="编写模块" tabindex="-1"><a class="header-anchor" href="#编写模块" aria-hidden="true">#</a> 编写模块</h2><p>Go Module本质上是基于VCS（版本控制系统），当你在下载依赖时，实际上执行的是VCS命令，比如<code>git</code>，所以如果你想要分享你编写的库，只需要做到以下三点：</p><ul><li>源代码仓库可公开访问，且VCS属于以下的其中之一 <ul><li>git</li><li>hg (Mercurial)</li><li>bzr (Bazaar)</li><li>svn</li><li>fossil</li></ul></li><li>是一个符合规范的go mod项目</li><li>符合语义化版本规范</li></ul><p>所以你只需要正常使用VCS开发，并为你的特定版本打上符合标准的Tag，其它人就可以通过模块名来下载你所编写的库，下面将通过示例来演示进行模块开发的几个步骤。</p>',5),g={href:"https://github.com/246859/hello",target:"_blank",rel:"noopener noreferrer"},b=i(`<h3 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h3><p>在开始之前确保你的版本足以完全支持go mod（go &gt;= 1.17），并且启用了Go Module，通过如下命令来查看是否开启</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> GO111MODULE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果未开启，通过如下命令开启用Go Module</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p>首先你需要一个可公网访问的源代码仓库，这个有很多选择，我比较推荐Github。在上面创建一个新项目，将其取名为hello，仓库名虽然没有什么特别限制，但建议还是不要使用特殊字符，因为这会影响到模块名。</p><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404071341749.png" style="zoom:67%;"><p>创建完成后，可以看到仓库的URL是<code>https://github.com/246859/hello</code>，对应的go模块名就是<code>github.com/246859/hello</code>。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404071342277.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后将其克隆到本地，通过<code>go mod init</code>命令初始化模块。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> clone git@github.com:246859/hello.git
Cloning into <span class="token string">&#39;hello&#39;</span><span class="token punctuation">..</span>.
remote: Enumerating objects: <span class="token number">5</span>, done.
remote: Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">5</span>/5<span class="token punctuation">)</span>, done.
remote: Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">4</span>/4<span class="token punctuation">)</span>, done.
remote: Total <span class="token number">5</span> <span class="token punctuation">(</span>delta <span class="token number">0</span><span class="token punctuation">)</span>, reused <span class="token number">0</span> <span class="token punctuation">(</span>delta <span class="token number">0</span><span class="token punctuation">)</span>, pack-reused <span class="token number">0</span>
Receiving objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">5</span>/5<span class="token punctuation">)</span>, done.

$ <span class="token builtin class-name">cd</span> hello <span class="token operator">&amp;&amp;</span> go mod init github.com/246859/hello
go: creating new go.mod: module github.com/246859/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写" tabindex="-1"><a class="header-anchor" href="#编写" aria-hidden="true">#</a> 编写</h3><p>然后就可以进行开发工作了，它的功能非常简单，只有一个函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// hello.go</span>
<span class="token keyword">package</span> hello

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// Hello returns hello message</span>
<span class="token keyword">func</span> <span class="token function">Hello</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> name <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
                name <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello %s!&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顺便写一个测试文件进行单元测试</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// hello_test.go</span>
<span class="token keyword">package</span> hello_test

<span class="token keyword">import</span> <span class="token punctuation">(</span>
        <span class="token string">&quot;testing&quot;</span>
        <span class="token string">&quot;fmt&quot;</span>
        <span class="token string">&quot;github.com/246859/hello&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">TestHello</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        data <span class="token operator">:=</span> <span class="token string">&quot;jack&quot;</span>
        expected <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello %s!&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
        result <span class="token operator">:=</span> hello<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

        <span class="token keyword">if</span> result <span class="token operator">!=</span> expected <span class="token punctuation">{</span>
                t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;expected result %s, but got %s&quot;</span><span class="token punctuation">,</span> expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来继续编写一个命令行程序用于输出hello，它的功能同样非常简单。对于命令行程序而言，按照规范是在项目<code>cmd/app_name/</code>中进行创建，所以hello命令行程序的文件存放在<code>cmd/hello/</code>目录下，然后在其中编写相关代码。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// cmd/hello/main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;github.com/246859/hello&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> name <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name to say hello&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	msg <span class="token operator">:=</span> hello<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		os<span class="token punctuation">.</span>Stderr<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3><p>编写完后对源代码格式化并测试</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">fmt</span> <span class="token operator">&amp;&amp;</span> go vet ./<span class="token punctuation">..</span>.

$ go <span class="token builtin class-name">test</span> <span class="token parameter variable">-v</span> <span class="token builtin class-name">.</span>
<span class="token operator">==</span><span class="token operator">=</span> RUN   TestHello
--- PASS: TestHello <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>
PASS
ok      github.com/246859/hello <span class="token number">0</span>.023s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行命令行程序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go run ./cmd/hello <span class="token parameter variable">-name</span> jack
hello jack<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h3><p>最后的最后，需要为这个库编写简洁明了的<code>README</code>，让其它开发者看一眼就知道怎么使用</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> hello</span>
just say hello

<span class="token title important"><span class="token punctuation">##</span> Install</span>
import code
<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash</span>
<span class="token code-block language-bash language-bash">go get github.com/246859/hello@latest</span>
<span class="token punctuation">\`\`\`</span></span>
install cmd
<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">\`bash</span>
<span class="token code-block language-bash language-bash">go <span class="token function">install</span> github.com/246859/hello/cmd/hello@latest
\`\`\`<span class="token variable"><span class="token variable">\`</span>

<span class="token comment">## Example</span>
Here&#39;s a simple example as follows:
<span class="token variable">\`</span></span>\`\`go
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/246859/hello&quot;</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	result :<span class="token operator">=</span> hello.Hello<span class="token punctuation">(</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">)</span>
	fmt.Println<span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span></span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个很简单的README文档，你也可以自己进行丰富。</p><h3 id="上传" tabindex="-1"><a class="header-anchor" href="#上传" aria-hidden="true">#</a> 上传</h3><p>当一切代码都编写并测试完毕过后，就可以将修改提交并推送到远程仓库。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">add</span> go.mod hello.go hello_test.go cmd/ example/ README.md

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;chore(mod): mod init&quot;</span> go.mod
<span class="token punctuation">[</span>main 5087fa2<span class="token punctuation">]</span> chore<span class="token punctuation">(</span>mod<span class="token punctuation">)</span>: mod init
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">3</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> go.mod

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat(hello): complete Hello func&quot;</span> hello.go
<span class="token punctuation">[</span>main 099a8bf<span class="token punctuation">]</span> feat<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete Hello func
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">11</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> hello.go

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;test(hello): complete hello testcase&quot;</span> hello_test.go
<span class="token punctuation">[</span>main 76e8c1e<span class="token punctuation">]</span> test<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete hello testcase
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">17</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> hello_test.go

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat(hello): complete hello cmd&quot;</span> cmd/hello/
<span class="token punctuation">[</span>main a62a605<span class="token punctuation">]</span> feat<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete hello cmd
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">22</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> cmd/hello/main.go

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;docs(example): add hello example&quot;</span> example/
<span class="token punctuation">[</span>main 5c51ce4<span class="token punctuation">]</span> docs<span class="token punctuation">(</span>example<span class="token punctuation">)</span>: <span class="token function">add</span> hello example
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">11</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> example/main.go

$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;docs(README): update README&quot;</span> README.md
<span class="token punctuation">[</span>main e6fbc62<span class="token punctuation">]</span> docs<span class="token punctuation">(</span>README<span class="token punctuation">)</span>: update README
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">27</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总共六个提交并不多，提交完毕后为最新提交创建一个tag</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> tag v1.0.0

$ <span class="token function">git</span> tag <span class="token parameter variable">-l</span>
v1.0.0

$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
e6fbc62 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, tag: v1.0.0, origin/main, origin/HEAD<span class="token punctuation">)</span> docs<span class="token punctuation">(</span>README<span class="token punctuation">)</span>: update README
5c51ce4 docs<span class="token punctuation">(</span>example<span class="token punctuation">)</span>: <span class="token function">add</span> hello example
a62a605 feat<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete hello cmd
76e8c1e test<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete hello testcase
099a8bf feat<span class="token punctuation">(</span>hello<span class="token punctuation">)</span>: complete Hello func
5087fa2 chore<span class="token punctuation">(</span>mod<span class="token punctuation">)</span>: mod init
1f422d1 Initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后再推送到远程仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push <span class="token parameter variable">--tags</span>
Enumerating objects: <span class="token number">23</span>, done.
Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">23</span>/23<span class="token punctuation">)</span>, done.
Delta compression using up to <span class="token number">16</span> threads
Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">17</span>/17<span class="token punctuation">)</span>, done.
Writing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">21</span>/21<span class="token punctuation">)</span>, <span class="token number">2.43</span> KiB <span class="token operator">|</span> <span class="token number">1.22</span> MiB/s, done.
Total <span class="token number">21</span> <span class="token punctuation">(</span>delta <span class="token number">5</span><span class="token punctuation">)</span>, reused <span class="token number">0</span> <span class="token punctuation">(</span>delta <span class="token number">0</span><span class="token punctuation">)</span>, pack-reused <span class="token number">0</span>
remote: Resolving deltas: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">5</span>/5<span class="token punctuation">)</span>, done.
To github.com:246859/hello.git
   1f422d1<span class="token punctuation">..</span>e6fbc62  	main -<span class="token operator">&gt;</span> main
	* <span class="token punctuation">[</span>new tag<span class="token punctuation">]</span>         v1.0.0 -<span class="token operator">&gt;</span> v1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送完毕后，再为其创建一个release（有一个tag就足矣，release只是符合github规范）</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404071501524.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如此一来，模块的编写就完成了，以上就是模块开发的一个基本流程，其它开发者便可以通过模块名来引入代码或安装命令行工具。</p><h3 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h3><p>通过<code>go get</code>引用库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/246859/hello@latest
go: downloading github.com/246859/hello v1.0.0
go: added github.com/246859/hello v1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>go intall</code>安装命令行程序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">install</span> github.com/246859/hello/cmd/hello@latest <span class="token operator">&amp;&amp;</span> hello <span class="token parameter variable">-name</span> jack
hello jack<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用<code>go run</code>直接运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go run <span class="token parameter variable">-mod</span><span class="token operator">=</span>mod github.com/246859/hello/cmd/hello <span class="token parameter variable">-name</span> jack
hello jack<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,45),k={href:"https://pkg.go.dev/",target:"_blank",rel:"noopener noreferrer"},h=s("figure",null,[s("img",{src:"https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404071528288.png",alt:"",tabindex:"0",loading:"lazy"}),s("figcaption")],-1),f={href:"https://pkg.go.dev/about#adding-a-package",target:"_blank",rel:"noopener noreferrer"},x={href:"https://pkg.go.dev/about#removing-a-package",target:"_blank",rel:"noopener noreferrer"},y=s("h2",{id:"设置代理",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#设置代理","aria-hidden":"true"},"#"),n(" 设置代理")],-1),q={href:"https://proxy.golang.org/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://goproxy.io/zh/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://goproxy.cn/",target:"_blank",rel:"noopener noreferrer"},G=i(`<figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031553255.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里选择七牛云的代理，执行如下命令来修改Go代理，其中的<code>direct</code>表示代理下载失败后绕过代理缓存直接访问源代码仓库。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn,direct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代理修改成功后，日后下载依赖就会非常的迅速。</p><br><h2 id="下载依赖" tabindex="-1"><a class="header-anchor" href="#下载依赖" aria-hidden="true">#</a> 下载依赖</h2>`,6),E={href:"https://pkg.go.dev/",target:"_blank",rel:"noopener noreferrer"},M=i(`<h3 id="代码引用" tabindex="-1"><a class="header-anchor" href="#代码引用" aria-hidden="true">#</a> 代码引用</h3><p>在里面搜索著名的Web框架<code>Gin</code>。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031524530.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里会出现很多搜索结果，在使用第三方依赖时，需要结合引用次数和更新时间来决定是否采用该依赖，这里直接选择第一个</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031526949.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>进入对应的页面后，可以看出这是该依赖的一个文档页面，有着非常多关于它的详细信息，后续查阅文档时也可以来这里。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304031529781.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里只需要将它的地址复制下来，然后在之前创建的项目下使用<code>go get</code>命令，命令如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get github.com/gin-gonic/gin
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当需要升级最新版本时，可以加上<code>@latest</code>后缀，或者可以自行查询可用的Release版本号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get <span class="token parameter variable">-u</span> github.com/gin-gonic/gin@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装命令行" tabindex="-1"><a class="header-anchor" href="#安装命令行" aria-hidden="true">#</a> 安装命令行</h3><p><code>go install</code>命令会将第三方依赖下载到本地并编译成二进制文件，得益于go的编译速度，这一过程通常不会花费太多时间，然后go会将其存放在<code>$GOPATH/bin</code>或者<code>$GOBIN</code>目录下，以便在全局可以执行该二进制文件（前提是你将这些路径添加到了环境变量中）。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在使用<code>install</code>命令时，必须指定版本号。</p></div><p>例如下载由go语言编写的调试器<code>delve</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">install</span> github.com/go-delve/delve/cmd/dlv@latest
go: downloading github.com/go-delve/delve v1.22.1
go: downloading github.com/cosiner/argv v0.1.0
go: downloading github.com/derekparker/trie v0.0.0-20230829180723-39f4de51ef7d
go: downloading github.com/go-delve/liner v1.2.3-0.20231231155935-4726ab1d7f62
go: downloading github.com/google/go-dap v0.11.0
go: downloading github.com/hashicorp/golang-lru v1.0.2
go: downloading golang.org/x/arch v0.6.0
go: downloading github.com/cpuguy83/go-md2man/v2 v2.0.2
go: downloading go.starlark.net v0.0.0-20231101134539-556fd59b42f6
go: downloading github.com/cilium/ebpf v0.11.0
go: downloading github.com/mattn/go-runewidth v0.0.13
go: downloading github.com/russross/blackfriday/v2 v2.1.0
go: downloading github.com/rivo/uniseg v0.2.0
go: downloading golang.org/x/exp v0.0.0-20230224173230-c95f2b4c22f2

$ dlv <span class="token parameter variable">-v</span>
Error: unknown shorthand flag: <span class="token string">&#39;v&#39;</span> <span class="token keyword">in</span> <span class="token parameter variable">-v</span>
Usage:
  dlv <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  attach      Attach to running process and begin debugging.
  completion  Generate the autocompletion script <span class="token keyword">for</span> the specified shell
  connect     Connect to a headless debug server with a terminal client.
  core        Examine a core dump.
  dap         Starts a headless TCP server communicating via Debug Adaptor Protocol <span class="token punctuation">(</span>DAP<span class="token punctuation">)</span>.
  debug       Compile and begin debugging main package <span class="token keyword">in</span> current directory, or the package specified.
  <span class="token builtin class-name">exec</span>        Execute a precompiled binary, and begin a debug session.
  <span class="token builtin class-name">help</span>        Help about any <span class="token builtin class-name">command</span>
  <span class="token builtin class-name">test</span>        Compile <span class="token builtin class-name">test</span> binary and begin debugging program.
  trace       Compile and begin tracing program.
  version     Prints version.

Additional <span class="token builtin class-name">help</span> topics:
  dlv backend    Help about the <span class="token parameter variable">--backend</span> flag.
  dlv log        Help about logging flags.
  dlv redirect   Help about <span class="token function">file</span> redirection.

Use <span class="token string">&quot;dlv [command] --help&quot;</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块管理" tabindex="-1"><a class="header-anchor" href="#模块管理" aria-hidden="true">#</a> 模块管理</h2><p>上述所有的内容都只是在讲述Go Mod的基本使用，但事实上要学会Go Mod仅仅只有这些是完全不够的。官方对于模块的定义为：一组被版本标记的包集合。上述定义中，包应该是再熟悉不过的概念了，而版本则是要遵循语义化版本号，定义为：<code>v(major).(minor).(patch)</code>的格式，例如Go的版本号<code>v1.20.1</code>，主版本号是1，小版本号是20，补丁版本是1，合起来就是<code>v1.20.1</code>，下面是详细些的解释：</p><ul><li><code>major</code>：当major版本变化时，说明项目发生了不兼容的改动，老版本的项目升级到新版本大概率没法正常运行。</li><li><code>minor</code>：当<code>minor</code>版本变化时，说明项目增加了新的特性，只是先前版本的基础只是增加了新的功能。</li><li><code>patch</code>：当<code>patch</code>版本发生变化时，说明只是有bug被修复了，没有增加任何新功能。</li></ul><br><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>go mod download</code></td><td>下载当前项目的依赖包</td></tr><tr><td><code>go mod edit</code></td><td>编辑go.mod文件</td></tr><tr><td><code>go mod graph</code></td><td>输出模块依赖图</td></tr><tr><td><code>go mod init</code></td><td>在当前目录初始化go mod</td></tr><tr><td><code>go mod tidy</code></td><td>清理项目模块</td></tr><tr><td><code>go mod verify</code></td><td>验证项目的依赖合法性</td></tr><tr><td><code>go mod why</code></td><td>解释项目哪些地方用到了依赖</td></tr><tr><td><code>go clean -modcache</code></td><td>用于删除项目模块依赖缓存</td></tr><tr><td><code>go list -m</code></td><td>列出模块</td></tr></tbody></table>`,36),O=i(`<br><h3 id="模块存储" tabindex="-1"><a class="header-anchor" href="#模块存储" aria-hidden="true">#</a> 模块存储</h3><p>当使用Go Mod进行项目管理时，模块缓存默认存放在<code>$GOPATH/pkg/mod</code>目录下，也可以修改<code>$GOMODCACHE</code>来指定存放在另外一个位置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOMODCACHE</span><span class="token operator">=</span>你的模块缓存路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同一个机器上的所有Go Module项目共享该目录下的缓存，缓存没有大小限制且不会自动删除，在缓存中解压的依赖源文件都是只读的，想要清空缓存可以执行如下命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go clean <span class="token parameter variable">-modcache</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code>$GOMODCACHE/cache/download</code>目录下存放着依赖的原始文件，包括哈希文件，原始压缩包等，如下例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOMODCACHE<span class="token variable">)</span></span>/cache/download/github.com/246859/hello/@v <span class="token parameter variable">-1</span>
list
v1.0.0.info
v1.0.0.lock
v1.0.0.mod
v1.0.0.zip
v1.0.0.ziphash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解压过后的依赖组织形式如下所示，就是指定模块的源代码。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOMODCACHE<span class="token variable">)</span></span>/github.com/246859/hello@v1.0.0 <span class="token parameter variable">-1</span>
LICENSE
README.md
cmd/
example/
go.mod
hello.go
hello_test.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="版本选择" tabindex="-1"><a class="header-anchor" href="#版本选择" aria-hidden="true">#</a> 版本选择</h3><p>Go在依赖版本选择时，遵循<strong>最小版本选择原则</strong>。下面是一个官网给的例子，主模块引用了模块A的1.2版本和模块B的1.2版本，同时模块A的1.2版本引用了模块C的1.3版本，模块B的1.2版本引用了模块C的1.4版本，并且模块C的1.3和1.4版本都同时引用了模块D的1.2版本，根据最小可用版本原则，Go最终会选择的版本是A1.2，B1.2，C1.4和D1.2。其中淡蓝色的表示<code>go.mod</code>文件加载的，框选的表示最终选择的版本。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202304032118557.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,14),$={href:"https://go.dev/ref/mod#minimal-version-selection",target:"_blank",rel:"noopener noreferrer"},C=i(`<br><h3 id="go-mod" tabindex="-1"><a class="header-anchor" href="#go-mod" aria-hidden="true">#</a> go.mod</h3><p>每创建一个Go Mod项目都会生成一个<code>go.mod</code>文件，因此熟悉<code>go.mod</code>文件是非常有必要的，不过大部分情况并不需要手动的修改<code>go.mod</code>文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module golearn

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常情况下，该目录下一定有一个<code>list</code>文件，用于记录该依赖已知的版本号，而对于每一个版本而言，都会有如下的文件：</p><ul><li><code>zip</code>：依赖的源码压缩包</li><li><code>ziphash</code>：根据依赖压缩包所计算出的哈希值</li><li><code>info</code>：json格式的版本元数据</li><li><code>mod</code>：该版本的<code>go.mod</code>文件</li><li><code>lock</code>：临时文件，官方也没说干什么用的</li></ul>`,64),D=s("code",null,"go.mod",-1),R={href:"http://xn--sum-888fh76nzcya.golang.org",target:"_blank",rel:"noopener noreferrer"},A=s("code",null,"go.mod",-1),P=s("code",null,"go.sum",-1),j=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>github.com/bytedance/sonic v1.8.0 h1:ea0Xadu+sHlu7x5O3gKhRpQ1IKiMrSiHttPF0ybECuA=
github.com/bytedance/sonic v1.8.0/go.mod h1:i736AoUSYt75HyZLoJW9ERYxcy6eaN6h4BZXU064P/U=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>假如禁用了GOSUMDB，Go会直接将本地计算得到的哈希值写入<code>go.sum</code>文件中，一般不建议这么做。</p></div><p>正常情况下每一个依赖都会有两条记录，第一个是压缩包的哈希值，第二个是依赖包的<code>go.mod</code>文件的哈希值，记录格式为<code>模块名 版本号 算法名称:哈希值</code>，有些比较古老的依赖包可能没有<code>go.mod</code>文件，所以就不会有第二条哈希记录。当这个项目在另一个人的环境中构建时，Go会根据<code>go.mod</code>中指定的本地依赖计算哈希值，再与<code>go.sum</code>中记录的哈希值进行比对，如果哈希值不一致，则说明依赖版本不同，就会拒绝构建。发生这种情况时，本地依赖和<code>go.sum</code>文件都有可能被修改过，但是由于<code>go.sum</code>是经过GOSUMDB查询记录的，所以会倾向于更相信<code>go.sum</code>文件。</p><br><h3 id="私有模块" tabindex="-1"><a class="header-anchor" href="#私有模块" aria-hidden="true">#</a> 私有模块</h3><p>Go Mod大多数工具都是针对开源项目而言的，不过Go也对私有模块进行了支持。对于私有项目而言，通常情况下需要配置以下几个环境配置来进行模块私有处理</p><ul><li><code>GOPROXY</code> ：依赖的代理服务器集合</li><li><code>GOPRIVATE</code> ：私有模块的模块路径前缀的通用模式列表，如果模块名符合规则表示该模块为私有模块，具体行为与GONOPROXY和GONOSUMDB一致。</li><li><code>GONOPROXY</code> ：不从代理中下载的模块路径前缀的通用模式列表，如果符合规则在下载模块时不会走GOPROXY，尝试直接从版本控制系统中下载。</li><li><code>GONOSUMDB</code> ：不进行GOSUMDB公共校验的模块路径前缀的通用模式列表，如果符合在下载模块校验时不会走checksum的公共数据库。</li><li><code>GOINSECURE</code> ：可以通过 HTTP 和其他不安全协议检索的模块路径前缀的通用模式列表。</li></ul><br><h2 id="工作区" tabindex="-1"><a class="header-anchor" href="#工作区" aria-hidden="true">#</a> 工作区</h2><p>前面提到了<code>go.mod</code>文件支持<code>replace</code>指令，这使得我们可以暂时使用一些本地来不及发版的修改，如下所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>replace (
	github.com/246859/hello v1.0.1 =&gt; ./hello
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译时，go就会使用本地的hello模块，在日后发布新版本后再将其去掉。</p><p>但如果使用了 <code>replace</code>指令的话会修改<code>go.mod</code>文件的内容，并且该修改可能会被误提交到远程仓库中，这一点是我们不希望看到的，因为<code>replace</code>指令所指定的target是一个文件路径而非网络URL，这台机器上能用的路径可能到另一台机器上就不能用了，文件路径在跨平台方面也会是一个大问题。为了解决这类问题，工作区便应运而生。</p><p>工作区(workspace)，是Go在1.18引入的关于多模块管理的一个新的解决方案，旨在更好的进行本地的多模块开发工作，下面将通过一个示例进行讲解。</p>`,14),H={href:"https://github.com/246859/work",target:"_blank",rel:"noopener noreferrer"},N=i(`<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>首先项目下有两个独立的go模块，分别是<code>auth</code>，<code>user</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-1</span>
LICENSE
README.md
auth
go.work
user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>auth</code>模块依赖于<code>user</code>模块的结构体<code>User</code>，内容如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> auth

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;github.com/246859/work/user&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// Verify user credentials if is ok</span>
<span class="token keyword">func</span> <span class="token function">Verify</span><span class="token punctuation">(</span>user user<span class="token punctuation">.</span>User<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	password<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">query</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> password <span class="token operator">!=</span> user<span class="token punctuation">.</span>Password <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;authentication failed&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">query</span><span class="token punctuation">(</span>username <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> username <span class="token operator">==</span> <span class="token string">&quot;jack&quot;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">&quot;jack123456&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;user not found&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>user模块内容如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> user

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	Age      <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个项目中，我们可以这样编写<code>go.work</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go 1.22

use (
	./auth
	./user
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其内容非常容易理解，使用<code>use</code>指令，指定哪些模块参与编译，接下来运行auth模块中的代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// auth/example/main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/246859/work/auth&quot;</span>
	<span class="token string">&quot;github.com/246859/work/user&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ok<span class="token punctuation">,</span> err <span class="token operator">:=</span> auth<span class="token punctuation">.</span><span class="token function">Verify</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> Password<span class="token punctuation">:</span> <span class="token string">&quot;jack123456&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v&quot;</span><span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行如下命令，通过结果得知成功导入了模块。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go run ./auth/example
<span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在以前的版本，对于这两个独立的模块，如果auth模块想要使用user模块中的代码只有两种办法</p><ol><li>提交user模块的修改并推送到远程仓库，发布新版本，然后修改<code>go.mod</code>文件为指定版本</li><li>修改<code>go.mod</code>文件将依赖重定向到本地文件</li></ol><p>两种方法都需要修改<code>go.mod</code>文件，而工作区的存在就是为了能够在不修改<code>go.mod</code>文件的情况下导入其它模块。不过需要明白的一点是，<code>go.work</code>文件仅用在开发过程中，它的存在只是为了更加方便的进行本地开发，而不是进行依赖管理，它只是暂时让你略过了提交到发版的这一过程，可以让你马上使用user模块的新修改而无需进行等待，当user模块测试完毕后，最后依旧需要发布新版本，并且auth模块最后仍然要修改<code>go.mod</code>文件引用最新版本（这一过程可以用<code>go work sync</code>命令来完成），因此在正常的go开发过程中，<code>go.work</code>也不应该提交到VCS中（示例仓库中的<code>go.work</code>仅用于演示），因为其内容都是依赖于本地的文件，且其功能也仅限于本地开发。</p><h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3><p>下面是一些工作区的命令</p><table><thead><tr><th>命令</th><th>介绍</th></tr></thead><tbody><tr><td>edit</td><td>编辑<code>go.work</code></td></tr><tr><td>init</td><td>初始化一个新的工作区</td></tr><tr><td>sync</td><td>同步工作区的模块依赖</td></tr><tr><td>use</td><td>往<code>go.work</code>中添加一个新模块</td></tr><tr><td>vendor</td><td>将依赖按照vendor格式进行复制</td></tr></tbody></table>`,19),S=i(`<h3 id="指令" tabindex="-1"><a class="header-anchor" href="#指令" aria-hidden="true">#</a> 指令</h3><p><code>go.work</code>文件的内容很简单，只有三个指令</p><ul><li><code>go</code>，指定go版本</li><li><code>use</code>，指定使用的模块</li><li><code>replace</code>，指定替换的模块</li></ul><p>除了<code>use</code>指令外，其它两个基本上等同于<code>go.mod</code>中的指令，只不过<code>go.work</code>中的的<code>replace</code>指令会作用于所有的模块，一个完整的<code>go.work</code>如下所示。</p><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>go 1.22

use(
	./auth
	./user
)

repalce github.com/246859/hello v1.0.0 =&gt; /home/jack/code/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function z(I,U){const e=l("ExternalLinkIcon"),o=l("RouterLink");return d(),p("div",null,[r,s("p",null,[n("每一个现代语言都会有属于自己的一个成熟的依赖管理工具，例如Java的Gradle，Python的Pip，NodeJs的Npm等，一个好的依赖管理工具可以为开发者省去不少时间并且可以提升开发效率。然而Go在早期并没有一个成熟的依赖管理解决方案，那时所有的代码都存放在GOPATH目录下，对于工程项目而言十分的不友好，版本混乱，依赖难以管理，为了解决这个问题，各大社区开发者百家争鸣，局面一时间混乱了起来，期间也不乏出现了一些佼佼者例如Vendor，直到Go1.11官方终于推出了Go Mod这款官方的依赖管理工具，结束了先前的混乱局面，并在后续的更新中不断完善，淘汰掉了曾经老旧的工具。时至今日，在撰写本文时，Go发行版本已经到了1.20，在今天几乎所有的Go项目都在采用Go Mod，所以在本文也只会介绍Go Mod，官方对于Go模块也编写了非常细致的文档："),s("a",v,[n("Go Modules Reference"),a(e)]),n("。")]),m,s("p",null,[n("示例仓库："),s("a",g,[n("246859/hello: say hello (github.com)"),a(e)])]),b,s("p",null,[n("当一个库被引用过后，"),s("a",k,[n("Go Package"),a(e)]),n("便会为其创建一个页面，这个过程是自动完成的，不需要开发者做什么工作，比如hello库就有一个专属的文档页面，如下图所示。")]),h,s("p",null,[n("关于上传模块的更多详细信息，前往"),s("a",f,[n("Add a package"),a(e)]),n("。")]),s("p",null,[n("关于如何删除模块的信息，前往"),s("a",x,[n("Removing a package"),a(e)]),n("。")]),y,s("p",null,[n("Go虽然没有像Maven Repo，PyPi，NPM这样类似的中央仓库，但是有一个官方的代理仓库："),s("a",q,[n("Go modules services (golang.org)"),a(e)]),n("，它会根据版本及模块名缓存开发者下载过的模块。不过由于其服务器部署在国外，访问速度对于国内的用户不甚友好，所以我们需要修改默认的模块代理地址，目前国内做的比较好的有以下几家：")]),s("ul",null,[s("li",null,[s("a",w,[n("GOPROXY.IO - 一个全球代理 为 Go 模块而生"),a(e)])]),s("li",null,[s("a",_,[n("七牛云 - Goproxy.cn"),a(e)])])]),G,s("p",null,[n("修改完代理后，接下来安装一个第三方依赖试试，Go官方有专门的依赖查询网站："),s("a",E,[n("Go Packages"),a(e)]),n("。")]),M,s("p",null,[n("前往"),a(o,{to:"/cmd.html#mod"},{default:t(()=>[n("go mod cmd")]),_:1}),n("了解命令的更多有关信息")]),O,s("p",null,[n("官网中还给出了"),s("a",$,[n("其他几个例子"),a(e)]),n("，大体意思都差不多。")]),C,s("p",null,[n("一般情况下，Go会计算压缩包和"),D,n("两个文件的哈希值，然后再根据GOSUMDB所指定的服务器（"),s("a",R,[n("默认是sum.golang.org"),a(e)]),n("）查询该依赖包的哈希值，如果本地计算出的哈希值与查询得到的结果不一致，那么就不会再向下执行。如果一致的话，就会更新"),A,n("文件，并向"),P,n("文件插入两条记录，大致如下：")]),j,s("p",null,[n("示例仓库："),s("a",H,[n("246859/work: go work example (github.com)"),a(e)])]),N,s("p",null,[n("前往"),a(o,{to:"/cmd.html#work"},{default:t(()=>[n("go work cmd")]),_:1}),n("了解命令的更多有关信息")]),S])}const B=c(u,[["render",z],["__file","115.module.html.vue"]]);export{B as default};
