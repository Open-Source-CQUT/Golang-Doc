import{_ as t,V as p,W as o,X as n,Y as s,$ as e,Z as i,F as c}from"./framework-44a66fc7.js";const l={},u=n("h1",{id:"wire",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#wire","aria-hidden":"true"},"#"),s(" Wire")],-1),r=n("p",null,"wire是谷歌开源的一个依赖注入工具，依赖注入这个概念在Java的Spring框架中相当盛行，go中也有一些依赖注入库，例如Uber开源的dig。不过wire的依赖注入理念并不是基于语言的反射机制，严格来说，wire其实是一个代码生成器，依赖注入的理念只体现在使用上，如果有问题的话，在代码生成期间就能找出来。",-1),d={href:"https://github.com/google/wire",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/google/wire/blob/main/docs/guide.md",target:"_blank",rel:"noopener noreferrer"},v=i(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>安装代码生成工具</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> install github<span class="token punctuation">.</span>com<span class="token operator">/</span>google<span class="token operator">/</span>wire<span class="token operator">/</span>cmd<span class="token operator">/</span>wire@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装源代码依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/google/wire
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="入门" tabindex="-1"><a class="header-anchor" href="#入门" aria-hidden="true">#</a> 入门</h2><p>wire中依赖注入基于两个元素，<strong>provier</strong>和<strong>injector</strong>。</p><p><strong>provier</strong>可以是开发者提供一个构造器，如下，Provider必须是对外暴露的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> foobarbaz

<span class="token keyword">type</span> Foo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    X <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构造Foo</span>
<span class="token keyword">func</span> <span class="token function">ProvideFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Foo <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Foo<span class="token punctuation">{</span>X<span class="token punctuation">:</span> <span class="token number">42</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带参数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> foobarbaz

<span class="token comment">// ...</span>

<span class="token keyword">type</span> Bar <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    X <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// ProvideBar returns a Bar: a negative Foo.</span>
<span class="token keyword">func</span> <span class="token function">ProvideBar</span><span class="token punctuation">(</span>foo Foo<span class="token punctuation">)</span> Bar <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Bar<span class="token punctuation">{</span>X<span class="token punctuation">:</span> <span class="token operator">-</span>foo<span class="token punctuation">.</span>X<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以带有参数和返回值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> foobarbaz

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;context&quot;</span>
    <span class="token string">&quot;errors&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Baz <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    X <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// ProvideBaz returns a value if Bar is not zero.</span>
<span class="token keyword">func</span> <span class="token function">ProvideBaz</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> bar Bar<span class="token punctuation">)</span> <span class="token punctuation">(</span>Baz<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> bar<span class="token punctuation">.</span>X <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Baz<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;cannot provide baz when bar is zero&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> Baz<span class="token punctuation">{</span>X<span class="token punctuation">:</span> bar<span class="token punctuation">.</span>X<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以对proiver进行组合</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> foobarbaz

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token comment">// ...</span>
    <span class="token string">&quot;github.com/google/wire&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// ...</span>

<span class="token keyword">var</span> SuperSet <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>ProvideFoo<span class="token punctuation">,</span> ProvideBar<span class="token punctuation">,</span> ProvideBaz<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>wire对provider的返回值有如下规定</p><ul><li>第一个返回值是provider提供的值</li><li>第二个返回值必须是<code>func() | error</code></li><li>第三个返回值，如果第二个返回值是<code>func</code>，那么第三个返回值必须是<code>error</code></li></ul></div><p><strong>injector</strong>是由wire生成的一个函数，它负责按照指定的顺序去调用provider，injector的签名由开发者来定义，wire生成具体的函数体，通过调用<code>wire.Build</code>来声明，这个声明不应该被调用，更不应该被编译。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;implementation not generated, run wire&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// +build wireinject</span>
<span class="token comment">// The build tag makes sure the stub is not built in the final build.</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;context&quot;</span>

    <span class="token string">&quot;github.com/google/wire&quot;</span>
    <span class="token string">&quot;example.com/foobarbaz&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义的injector</span>
<span class="token keyword">func</span> <span class="token function">initializeBaz</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>foobarbaz<span class="token punctuation">.</span>Baz<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>foobarbaz<span class="token punctuation">.</span>MegaSet<span class="token punctuation">)</span>
    <span class="token keyword">return</span> foobarbaz<span class="token punctuation">.</span>Baz<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wire
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就会生成<code>wire_gen.go</code>，内容如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Code generated by Wire. DO NOT EDIT.</span>

<span class="token comment">//go:generate go run -mod=mod github.com/google/wire/cmd/wire</span>
<span class="token comment">//+build !wireinject</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;example.com/foobarbaz&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 实际生成的injector</span>
<span class="token keyword">func</span> <span class="token function">initializeBaz</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>foobarbaz<span class="token punctuation">.</span>Baz<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    foo <span class="token operator">:=</span> foobarbaz<span class="token punctuation">.</span><span class="token function">ProvideFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    bar <span class="token operator">:=</span> foobarbaz<span class="token punctuation">.</span><span class="token function">ProvideBar</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
    baz<span class="token punctuation">,</span> err <span class="token operator">:=</span> foobarbaz<span class="token punctuation">.</span><span class="token function">ProvideBaz</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> bar<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> foobarbaz<span class="token punctuation">.</span>Baz<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> baz<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的代码对于wire几乎没有任何依赖，不需要wire也可以正常工作，并且在后续执行<code>go generate</code>就可以再次生成，之后，开发者通过调用实际生成的injector传入对应的参数完成依赖注入。是不是整个过程的代码相当简单，感觉好像就是提供几个构造器，然后生成一个调用构造器的函数，最后再调用这个函数传入参数，好像也没做什么特别复杂的事情，手写一样可以，没错就是这样，wire就是做的这样一件简单的事情，只是由手写变成了自动生成。按照wire的理念，依赖注入本就是应该如此简单的一个事情，不应复杂化。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>下面来通过一个案例加深一下理解，这是一个初始化app的例子。</p><p><code>HttpServer</code>的provider接收一个<code>net.Addr</code>参数，返回指针和<code>error</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> ServerProviderSet <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>NewHttpserver<span class="token punctuation">)</span>

<span class="token keyword">type</span> HttpServer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	net<span class="token punctuation">.</span>Addr
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewHttpserver</span><span class="token punctuation">(</span>addr net<span class="token punctuation">.</span>Addr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HttpServer<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>HttpServer<span class="token punctuation">{</span>addr<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的<code>MysqlClient</code>和<code>System</code>的provider同理</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> DataBaseProviderSet <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>NewMysqlClient<span class="token punctuation">)</span>

<span class="token keyword">type</span> MysqlClient <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> SystemSet <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>NewApp<span class="token punctuation">)</span>

<span class="token keyword">type</span> System <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	server <span class="token operator">*</span>HttpServer
	data   <span class="token operator">*</span>MysqlClient
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>System<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;app run on %s&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>server<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewApp</span><span class="token punctuation">(</span>server <span class="token operator">*</span>HttpServer<span class="token punctuation">,</span> data <span class="token operator">*</span>MysqlClient<span class="token punctuation">)</span> <span class="token punctuation">(</span>System<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> System<span class="token punctuation">{</span>server<span class="token punctuation">:</span> server<span class="token punctuation">,</span> data<span class="token punctuation">:</span> data<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>provider定义完毕后，需要定义injector，最好新建一个<code>wire.go</code>文件来定义</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//go:build wireinject</span>
<span class="token comment">// +build wireinject</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/google/wire&quot;</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义injector</span>
<span class="token keyword">func</span> <span class="token function">initSystemServer</span><span class="token punctuation">(</span>serverAddr net<span class="token punctuation">.</span>Addr<span class="token punctuation">,</span> dataAddr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>System<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 按照顺序调用provider</span>
	<span class="token function">panic</span><span class="token punctuation">(</span>wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>DataBaseProviderSet<span class="token punctuation">,</span> ServerProviderSet<span class="token punctuation">,</span> SystemSet<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>+build wireinject</code>是为了在编译时忽略掉此injector。然后执行如下命令，有如下输出即生成成功。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ wire
$ wire: golearn: wrote /golearn/wire_gen.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>生成后的代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Code generated by Wire. DO NOT EDIT.</span>

<span class="token comment">//go:generate go run github.com/google/wire/cmd/wire</span>
<span class="token comment">//go:build !wireinject</span>
<span class="token comment">// +build !wireinject</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// Injectors from wire.go:</span>

<span class="token comment">// 定义injector</span>
<span class="token keyword">func</span> <span class="token function">initSystemServer</span><span class="token punctuation">(</span>serverAddr net<span class="token punctuation">.</span>Addr<span class="token punctuation">,</span> dataAddr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>System<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	httpServer<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">NewHttpserver</span><span class="token punctuation">(</span>serverAddr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> System<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	mysqlClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">NewMysqlClient</span><span class="token punctuation">(</span>dataAddr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> System<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	system<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">NewApp</span><span class="token punctuation">(</span>httpServer<span class="token punctuation">,</span> mysqlClient<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> System<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> system<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到逻辑很清晰，调用顺序也是正确的，最后通过生成的injector来启动app。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/google/wire&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net&quot;</span>
	<span class="token string">&quot;net/netip&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">initSystemServer</span><span class="token punctuation">(</span>
		net<span class="token punctuation">.</span><span class="token function">TCPAddrFromAddrPort</span><span class="token punctuation">(</span>netip<span class="token punctuation">.</span><span class="token function">MustParseAddrPort</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1:8080&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token string">&quot;mysql:localhost:3306/test&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	server<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2023/08/01 19:20:48 app run on 127.0.0.1:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这就是一个非常简单的使用案例。</p><h2 id="高级用法" tabindex="-1"><a class="header-anchor" href="#高级用法" aria-hidden="true">#</a> 高级用法</h2><h3 id="接口绑定" tabindex="-1"><a class="header-anchor" href="#接口绑定" aria-hidden="true">#</a> 接口绑定</h3><p>有时候，依赖注入时会将一个具体的实现注入到接口上。wire在依赖注入时，是根据类型匹配来实现的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ype Fooer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MyFooer <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>MyFooer<span class="token punctuation">)</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token operator">*</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">provideMyFooer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>MyFooer <span class="token punctuation">{</span>
    b <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MyFooer<span class="token punctuation">)</span>
    <span class="token operator">*</span>b <span class="token operator">=</span> <span class="token string">&quot;Hello, World!&quot;</span>
    <span class="token keyword">return</span> b
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Bar <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">provideBar</span><span class="token punctuation">(</span>f Fooer<span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token comment">// f will be a *MyFooer.</span>
    <span class="token keyword">return</span> f<span class="token punctuation">.</span><span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>provider<code>provideBar</code>的参数是一个接口类型，它的实际上是<code>*MyFooer</code>，为了让代码生成时provider能够正确匹配，我们可以将两种类型绑定，如下</p><p>第一个参数是具体的接口指针类型，第二个是具体实现的指针类型。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Bind</span><span class="token punctuation">(</span>iface<span class="token punctuation">,</span> to <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Binding
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> Set <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>
    provideMyFooer<span class="token punctuation">,</span>
    wire<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span><span class="token function">new</span><span class="token punctuation">(</span>Fooer<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token operator">*</span>MyFooer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    provideBar<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="值绑定" tabindex="-1"><a class="header-anchor" href="#值绑定" aria-hidden="true">#</a> 值绑定</h3><p>在使用<code>wire.Build</code>时，可以不用provider提供值，也可以使用<code>wire.Value</code>来提供一个具体的值。<code>wire.Value</code>支持表达式来构造值，这个表达式在生成代码时会被复制到injector中，如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Foo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    X <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">injectFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Foo <span class="token punctuation">{</span>
    wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>wire<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span>Foo<span class="token punctuation">{</span>X<span class="token punctuation">:</span> <span class="token number">42</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> Foo<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的injector</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func injectFoo() Foo {
    foo := _wireFooValue
    return foo
}

var (
    _wireFooValue = Foo{X: 42}
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要绑定一个接口类型的值，可以使用<code>wire.InterfaceValue</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">injectReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> io<span class="token punctuation">.</span>Reader <span class="token punctuation">{</span>
    wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>wire<span class="token punctuation">.</span><span class="token function">InterfaceValue</span><span class="token punctuation">(</span><span class="token function">new</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="结构体构造" tabindex="-1"><a class="header-anchor" href="#结构体构造" aria-hidden="true">#</a> 结构体构造</h3><p>在providerset中，可以使用<code>wire.Struct</code>来利用其他provider的返回值构建一个指定类型的结构体。</p><p>第一个参数应该传入结构体指针类型，后续是字段名称。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Struct</span><span class="token punctuation">(</span>structType <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> fieldNames <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> StructProvider
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Foo <span class="token builtin">int</span>
<span class="token keyword">type</span> Bar <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">ProvideFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Foo <span class="token punctuation">{</span><span class="token comment">/* ... */</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ProvideBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Bar <span class="token punctuation">{</span><span class="token comment">/* ... */</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> FooBar <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    MyFoo Foo
    MyBar Bar
<span class="token punctuation">}</span>

<span class="token keyword">var</span> Set <span class="token operator">=</span> wire<span class="token punctuation">.</span><span class="token function">NewSet</span><span class="token punctuation">(</span>
    ProvideFoo<span class="token punctuation">,</span>
    ProvideBar<span class="token punctuation">,</span>
    wire<span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span><span class="token function">new</span><span class="token punctuation">(</span>FooBar<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;MyFoo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MyBar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">injectFooBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> FoodBar <span class="token punctuation">{</span>
    wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>Set<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的injector可能如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">injectFooBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> FooBar <span class="token punctuation">{</span>
    foo <span class="token operator">:=</span> <span class="token function">ProvideFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    bar <span class="token operator">:=</span> <span class="token function">ProvideBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fooBar <span class="token operator">:=</span> FooBar<span class="token punctuation">{</span>
        MyFoo<span class="token punctuation">:</span> foo<span class="token punctuation">,</span>
        MyBar<span class="token punctuation">:</span> bar<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> fooBar
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要填充所有字段，可以使用<code>*</code>，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>wire<span class="token punctuation">.</span><span class="token function">Struct</span><span class="token punctuation">(</span><span class="token function">new</span><span class="token punctuation">(</span>FooBar<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认是构造结构体类型，如果想要构造指针类型，可以修改injector签名的返回值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func injectFooBar() *FoodBar {
    wire.Build(Set)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要忽略掉字段，可以加tag，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Foo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    mu sync<span class="token punctuation">.</span>Mutex <span class="token string">\`wire:&quot;-&quot;\`</span>
    Bar Bar
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cleanup" tabindex="-1"><a class="header-anchor" href="#cleanup" aria-hidden="true">#</a> Cleanup</h3><p>如果provider构造的一个值在使用后需要进行收尾工作（比如关闭一个文件），provider可以返回一个闭包来进行这样的操作，injector并不会调用这个cleanup函数，具体何时调用交给injector的调用者，如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Data <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// TODO wrapped database client</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewData .</span>
<span class="token keyword">func</span> <span class="token function">NewData</span><span class="token punctuation">(</span>c <span class="token operator">*</span>conf<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> logger log<span class="token punctuation">.</span>Logger<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Data<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cleanup <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">NewHelper</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">&quot;closing the data resources&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Data<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cleanup<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际生成的代码可能如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">wireApp</span><span class="token punctuation">(</span>confData <span class="token operator">*</span>conf<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> logger log<span class="token punctuation">.</span>Logger<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dataData<span class="token punctuation">,</span> cleanup<span class="token punctuation">,</span> err <span class="token operator">:=</span> data<span class="token punctuation">.</span><span class="token function">NewData</span><span class="token punctuation">(</span>confData<span class="token punctuation">,</span> logger<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>
    <span class="token comment">// inject data</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">return</span> app<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型重复" tabindex="-1"><a class="header-anchor" href="#类型重复" aria-hidden="true">#</a> 类型重复</h3><p>provider的入参最好不要类型重复，尤其是对于一些基础类型</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> FooBar <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	foo <span class="token builtin">string</span>
	bar <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewFooBar</span><span class="token punctuation">(</span>foo <span class="token builtin">string</span><span class="token punctuation">,</span> bar <span class="token builtin">string</span><span class="token punctuation">)</span> FooBar <span class="token punctuation">{</span>
	<span class="token keyword">return</span> FooBar<span class="token punctuation">{</span>
	    foo<span class="token punctuation">:</span> foo<span class="token punctuation">,</span>  
	    bar<span class="token punctuation">:</span> bar<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">InitializeFooBar</span><span class="token punctuation">(</span>a <span class="token builtin">string</span><span class="token punctuation">,</span> b <span class="token builtin">string</span><span class="token punctuation">)</span> FooBar <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>wire<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span>NewFooBar<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况下生成代码会报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>provider has multiple parameters of type string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>wire将无法区分这些参数该如何注入，为了避免冲突，可以使用类型别名。</p>`,81);function m(b,g){const a=c("ExternalLinkIcon");return p(),o("div",null,[u,r,n("p",null,[s("仓库地址："),n("a",d,[s("google/wire: Compile-time Dependency Injection for Go (github.com)"),e(a)])]),n("p",null,[s("文档地址："),n("a",k,[s("wire/docs/guide.md at main · google/wire (github.com)"),e(a)])]),v])}const f=t(l,[["render",m],["__file","wire.html.vue"]]);export{f as default};
