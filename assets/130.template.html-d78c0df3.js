import{_ as e,V as t,W as p,X as n,Y as s,Z as i,a0 as o,F as c}from"./framework-f06be456.js";const l={},u=n("h1",{id:"模板引擎",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#模板引擎","aria-hidden":"true"},"#"),s(" 模板引擎")],-1),d={href:"https://pkg.go.dev/text/template",target:"_blank",rel:"noopener noreferrer"},r=o(`<p>在平时我们经常会使用<code>fmt.Sprintf</code>函数来进行字符串格式化，但它只适用于处理小字符串的情况，而且需要使用格式化动词来指定类型，无法做到参数命名，不支持复杂情况下的处理，而这就是模板引擎所需要解决的问题，比如在直接挂到后端的静态<code>HTML</code>页面就需要用到模板引擎。社区里面有很多优秀的第三方模板引擎库，比如<code>pongo2</code> ,<code>sprig</code>，<code>jet</code>，不过本文要讲述的主角是go内置的模板引擎库<code>text/template</code>，在实际开发中一般用的是<code>html/template</code>，后者基于前者并做了很多关于<code>HTML</code>的安全处理，一般情况使用前者即可，若是涉及到<code>HTML</code>的模板处理建议使用后者会更安全。</p><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><p>下面来看一个关于模板引擎的简单使用示例，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tmpl <span class="token operator">:=</span> <span class="token string">\`This is the first template string, {{ .message }}\`</span>

	te<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;texTmpl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	execErr <span class="token operator">:=</span> te<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> execErr <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码的输出为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>This is the first template string, hello world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在案例代码中，<code>tmpl</code>是一个模板字符串，字符串中的<code>{{ .message }}</code>是模板引擎的模板参数。首先通过<code>*Template.Parse</code>方法解析模板字符串，</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Template<span class="token punctuation">)</span> <span class="token function">Parse</span><span class="token punctuation">(</span>text <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Template<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解析成功后再通过<code>*Template.Execute</code>方法将<code>data</code>数据应用于模板中，最后输出到传入的<code>Writer</code>中也就是<code>os.Stdout</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Template<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span>wr io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> data any<span class="token punctuation">)</span> <span class="token builtin">error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在以后模板引擎的使用中，基本上都是这三步：</p><ol><li>获取模板</li><li>解析模板，</li><li>将数据应用到模板中</li></ol><p>可见模板引擎的使用其实相当简单，稍微复杂一点的是模板引擎的模板语法，这才是本文主要讲解的内容。</p><h2 id="模板语法" tabindex="-1"><a class="header-anchor" href="#模板语法" aria-hidden="true">#</a> 模板语法</h2><h3 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h3><p>go通过两对花括号<code>{{ }}</code>，来在模板中表示这是一个模板参数，通过<code>.</code>来表示根对象，根对象就是传入的<code>data</code>。就像是访问一个类型的成员变量一样，通过<code>.</code>符号衔接变量名就可以在模板中访问对应的值，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ .data }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>前提与之同名的成员变量存在，否则就会报错。对于传入的<code>data</code>，一般是结构体或者<code>map</code>，也可以是基本类型，比如数字字符串，这时<code>.</code>所代表的根对象就是其自身。在花括号内，不一定非得去访问根对象来获取值，也可以是基本类型的字面量，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ 1 }}
{{ 3.14 }}
{{ &quot;jack&quot; }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管什么类型，最终都会通过<code>fmt.Sprintf(&quot;%s&quot;, val)</code>来获取其字符串表现形式，看下面的例子。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span> <span class="token string">&quot;data-&gt; {{ . }}\\n&quot;</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">,</span>
		<span class="token number">6379</span><span class="token punctuation">,</span>
		<span class="token number">3.1415926</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;2*2&quot;</span><span class="token punctuation">,</span> <span class="token number">3.6</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Data <span class="token builtin">string</span>
		<span class="token punctuation">}</span><span class="token punctuation">{</span>Data<span class="token punctuation">:</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>writer io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> tmpl <span class="token builtin">string</span><span class="token punctuation">,</span> data any<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	parsedTmpl<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> parsedTmpl<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data-&gt; hello world!          
data-&gt; 6379                  
data-&gt; 3.1415926             
data-&gt; [1 2*2 3.6]           
data-&gt; map[data:hello world!]
data-&gt; {hello world!}   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到其输出形式跟直接使用<code>fmt.Sprintf</code>一致。对于结构体和map，可以通过字段名来访问其值，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span> <span class="token string">&quot;data-&gt; {{ .Data }}\\n&quot;</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;Data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Data <span class="token builtin">string</span>
		<span class="token punctuation">}</span><span class="token punctuation">{</span>Data<span class="token punctuation">:</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data-&gt; hello world!
data-&gt; hello world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于切片和<code>map</code>，虽然并没有提供特定语法来访问某一个索引的值，但可以通过函数调用的方式来实现，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span> <span class="token string">&quot;data-&gt; {{ index . 1}}\\n&quot;</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;second&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">&quot;first&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data-&gt; second
data-&gt; first 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是多维切片，可以通过如下方式来访问对应下标的值，等同于<code>s[i][j][k]</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ index . i j k }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于嵌套的结构体或map，可以使用<code>.k1.k2.k3</code>这种方式访问，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ .person.father.name }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在使用模板参数时，可以在参数前后加上<code>-</code>符号来消除参数前后的空白，看个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span> <span class="token string">\`{{ .x }} {{ - .op - }} {{ .y }}\`</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;x&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;op&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&gt;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正常来说输出结果应该是<code>10 &gt; 2</code>，但由于在<code>op</code>参数前后添加了<code>-</code>符号，所以它前后的空白符都会被消除，所以实际输出为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10&gt;2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是，在花括号中，<code>-</code>符号与参数必须相隔一个空格，也就说必须是<code>{{- . -}}</code>这种格式，在例子中之所以会在两边额外加个空格写成<code>{{ - . - }}</code>这种格式纯粹是个人觉得看的顺眼，实际上并没有这个语法限制。</p><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><p>模板语法支持注释，注释并不会在最终的模板中生成，其语法如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{/* this is a comment */}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注释符号<code>/*</code>和<code>*/</code>必须与花括号相邻，它们之间不能有其它字符，否则将无法正常解析。只有一种情况例外，那就是消除空白符的时候</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{- /* this is a comment */ -}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><p>在模板中也可以声明变量，通过<code>$</code>符号来表示这是一个变量，并通过<code>:= </code>来进行赋值，就跟go代码一样，例子如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ $name := .Name }}
{{ $val := index . 1 }}
{{ $val := index .dict key }}
// 整型赋值
{{ $numer := 1 }}
// 浮点数赋值
{{ $float := 1.234}}
// 字符串赋值
{{ $name := &quot;jack&quot; }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后续使用时，通过<code>$</code>衔接变量名来访问该变量的值，比如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span> <span class="token string">\`{{ $name := .name }} {{- $name }}\`</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量必须先声明才能使用，否则将会提示<code>undefined variable</code>，并且也要在作用域内才能使用。</p><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><p>模板自身的语法其实并不多，大多数功能都是通过函数来实现的，函数调用的格式为函数名后衔接参数列表，以空格为分隔符，如下所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ funcname arg1 arg2 arg3 ... }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如之前用到的<code>index</code>函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ index .s 1 }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用于比较是否相等的函数<code>eq</code>函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ eq 1 2 }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每一个<code>*Template</code>都有一个<code>FuncsMap</code>，用于记录函数的映射</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> FuncMap <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在创建模板时从<code>text/template.builtins</code>获取默认的函数映射表，下面是内置的所有函数</p><table><thead><tr><th>函数名</th><th>作用</th><th>示例</th></tr></thead><tbody><tr><td><code>and</code></td><td>与运算</td><td><code>{{ and true false }}</code></td></tr><tr><td><code>or</code></td><td>或运算</td><td><code>{{ or true false }}</code></td></tr><tr><td><code>not</code></td><td>取反运算</td><td><code>{{ not true }}</code></td></tr><tr><td><code>eq</code></td><td>是否相等</td><td><code>{{ eq 1 2 }}</code></td></tr><tr><td><code>ne</code></td><td>是否不相等</td><td><code>{{ ne 1 2 }}</code></td></tr><tr><td><code>lt</code></td><td>小于</td><td><code>{{ lt 1 2 }}</code></td></tr><tr><td><code>le</code></td><td>小于等于</td><td><code>{{ le 1 2 }}</code></td></tr><tr><td><code>gt</code></td><td>大于</td><td><code>{{ gt 1 2 }}</code></td></tr><tr><td><code>ge</code></td><td>大于等于</td><td><code>{{ ge 1 2 }}</code></td></tr><tr><td><code>len</code></td><td>返回长度</td><td><code>{{ len .slice }}</code></td></tr><tr><td><code>index</code></td><td>获取目标指定索引的元素</td><td><code>{{ index . 0 }}</code></td></tr><tr><td><code>slice</code></td><td>切片，等价于s[1:2:3]</td><td><code>{{ slice . 1 2 3 }}</code></td></tr><tr><td><code>html</code></td><td>HTML转义</td><td><code>{{ html .name }}</code></td></tr><tr><td><code>js</code></td><td>js转义</td><td><code>{{ js .name }}</code></td></tr><tr><td><code>print</code></td><td>fmt.Sprint</td><td><code>{{ print . }}</code></td></tr><tr><td><code>printf</code></td><td>fmt.Sprintf</td><td><code>{{ printf &quot;%s&quot; .}}</code></td></tr><tr><td><code>println</code></td><td>fmt.Sprintln</td><td><code>{{ println . }}</code></td></tr><tr><td><code>urlquery</code></td><td>url query转义</td><td><code>{{ urlquery .query }}</code></td></tr></tbody></table><p>除了这些之外，还有一个比较特殊的内置函数<code>call</code>，它是用于直接调用通过在<code>Execute</code>时期传入的<code>data</code>中的函数，例如下面的模板</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ call .string 1024 }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>传入的数据如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
    <span class="token string">&quot;string&quot;</span><span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>val any<span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%v: 2048&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么在模板中就会生成</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1024: 2048
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是自定义函数的途径之一，不过通常建议使用<code>*Template.Funcs</code>方法来添加自定义函数，因为后者可以作用全局，不需要绑定到根对象中。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Template<span class="token punctuation">)</span> <span class="token function">Funcs</span><span class="token punctuation">(</span>funcMap FuncMap<span class="token punctuation">)</span> <span class="token operator">*</span>Template
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>自定义函数的返回值一般有两个，第一个是需要用到的返回值，第二个是<code>error</code>。例如有如下自定义函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>template<span class="token punctuation">.</span>FuncMap<span class="token punctuation">{</span>
    <span class="token string">&quot;add&quot;</span><span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>val any<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%v+1&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在模板中直接使用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ add 1024 }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1024 + 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h3><p>这个管道与<code>chan</code>是两个东西，官方文档里面称其为<code>pipeline</code>，任何能够产生数据的操作都称其为<code>pipeline</code>。下面的模板操作都属于管道操作</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ 1 }}
{{ eq 1 2 }}
{{ $name }}
{{ .name }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>熟悉linux的应该都知道管道运算符<code>|</code>，模板中也支持这样的写法。管道操作在模板中经常出现，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ $name := 1 }}{{ $name | print | printf &quot;%s+1=?&quot; }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1+1=?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在后续的<code>with</code>，<code>if</code>，<code>range</code>中也会频繁用到。</p><h3 id="with" tabindex="-1"><a class="header-anchor" href="#with" aria-hidden="true">#</a> with</h3><p>通过<code>with</code>语句可以控制变量和根对象的作用域，格式如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ with pipeline }} 
	text 
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>with</code>会检查管道操作返回的值，如果值为空的话，中间的<code>text</code>模板就不会生成。如果想要处理空的情况，可以使用<code>with else</code>，格式如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ with pipeline }} 
	text1 
{{ else }} 
	text2 
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果管道操作返回的值为空，那么就会执行<code>else</code>这块的逻辑。在<code>with</code>语句中声明的变量，其作用域仅限于<code>with</code>语句内，看下面一个例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ $name := &quot;mike&quot; }}
{{ with $name := &quot;jack&quot;  }} 
	{{- $name -}}
{{ end }}
{{- $name -}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的输出如下，显然这是由于作用域不同，它们是两个不同的变量。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jackmike
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过<code>with</code>语句还可以在作用域内改写根对象，如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ with .name }}
	name: {{- .second }}-{{ .first -}}
{{ end }}
age: {{ .age }}
address: {{ .address }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入如下的数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
        <span class="token string">&quot;first&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;second&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;bob&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>     <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name:bob-jack
age: 1       
address: usa 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在<code>with</code>语句内部，根对象<code>.</code>已经变成了<code>.name</code>。</p><h3 id="条件" tabindex="-1"><a class="header-anchor" href="#条件" aria-hidden="true">#</a> 条件</h3><p>条件语句的格式如下所示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ if pipeline }}
	text1
{{ else if pipeline }}
	text2
{{ else }}
	text3
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就跟写普通的代码一样，非常好理解。下面看几个简单的例子，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ if eq .lang &quot;en&quot; }}
	{{- .content.en -}}
{{ else if eq .lang &quot;zh&quot; }}
	{{- .content.zh -}}
{{ else }}
	{{- .content.fallback -}}
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入的数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
    <span class="token string">&quot;lang&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;zh&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;content&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
        <span class="token string">&quot;en&quot;</span><span class="token punctuation">:</span>       <span class="token string">&quot;hello, world!&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;zh&quot;</span><span class="token punctuation">:</span>       <span class="token string">&quot;你好，世界！&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;fallback&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello, world!&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中的模板根据传入的语言<code>lang</code>来决定要以何种方式展示内容，输出结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>你好，世界！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="迭代" tabindex="-1"><a class="header-anchor" href="#迭代" aria-hidden="true">#</a> 迭代</h3><p>迭代语句的格式如下，<code>range</code>所支持的<code>pipeline</code>必须是数组，切片，<code>map</code>，以及<code>channel</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ range pipeline }}
	loop body
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合<code>else</code>使用，当长度为0时，就会执行<code>else</code>块的内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ range pipeline }}
	loop body
{{ else }}
	fallback
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还支持<code>break</code>，<code>continue</code>这类操作，比如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ range pipeline }}
	{{ if pipeline }}
		{{ break }}
	{{ end }}
	{{ if pipeline }}
		{{ continue }}
	{{ end }}
	loop body
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看一个迭代的例子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ range $index, $val := . }}
	{{- if eq $index 0 }}
		{{- continue -}}
	{{ end -}}
	{{- $index}}: {{ $val }} 
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token number">3.14</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1: 2    
2: 3.14 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>迭代<code>map</code>也是同理。</p><h3 id="嵌套" tabindex="-1"><a class="header-anchor" href="#嵌套" aria-hidden="true">#</a> 嵌套</h3><p>一个模板中可以定义有多个模板，比如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ define &quot;t1&quot; }} t1 {{ end }}
{{ define &quot;t2&quot; }} t2 {{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这些定义的模板在并不会生成在最终的模板中，除非在加载时指定了名称或者通过<code>template</code>语句手动指定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func (t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比如下面的例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ define &quot;t1&quot; }}
    {{- with .t1 }}
    	{{- .data -}}
    {{ end -}}
{{ end }}
{{ define &quot;t2&quot; }}
    {{- with .t2 }}
    	{{- .data -}}
    {{ end}}
{{ end -}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入如下数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
    <span class="token string">&quot;t1&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;template body 1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&quot;t2&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;template body 2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdout

	tmpl <span class="token operator">:=</span>
		<span class="token string">\`{{ define &quot;t1&quot; }}
    {{- with .t1 }}
    	{{- .data -}}
    {{ end -}}
{{ end }}
{{ define &quot;t2&quot; }}
    {{- with .t2 }}
    	{{- .data -}}
    {{ end}}
{{ end -}}\`</span>

	datas <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
			<span class="token string">&quot;t1&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;template body 1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token string">&quot;t2&quot;</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span><span class="token string">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;template body 2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	name <span class="token operator">:=</span> <span class="token string">&quot;t1&quot;</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> datas <span class="token punctuation">{</span>
		err <span class="token operator">:=</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> tmpl<span class="token punctuation">,</span> name<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExecTmpl</span><span class="token punctuation">(</span>writer io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> tmpl <span class="token builtin">string</span><span class="token punctuation">,</span> name <span class="token builtin">string</span><span class="token punctuation">,</span> data any<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;template&quot;</span><span class="token punctuation">)</span>
	parsedTmpl<span class="token punctuation">,</span> err <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> parsedTmpl<span class="token punctuation">.</span><span class="token function">ExecuteTemplate</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> name<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>template body 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者也可以手动指定模板</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ define &quot;t1&quot; }}
    {{- with .t1 }}
    	{{- .data -}}
    {{ end -}}
{{ end }}
{{ define &quot;t2&quot; }}
    {{- with .t2 }}
    	{{- .data -}}
    {{ end}}
{{ end -}}
{{ template &quot;t2&quot; .}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么在解析时是否指定模板名称，t2都会加载。</p><h3 id="关联" tabindex="-1"><a class="header-anchor" href="#关联" aria-hidden="true">#</a> 关联</h3><p>子模板只是在一个模板内部声明多个命名的模板，关联是将外部的多个命名的<code>*Template</code>关联起来。然后通过<code>template</code>语句来引用指定的模板。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ tempalte &quot;templateName&quot; pipeline}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>pipeline</code>可以根据自己的需求来指定关联模板的根对象，或者也可以直接传入当前模板的根对象。看下面的一段代码例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tmpl1 <span class="token operator">:=</span> <span class="token string">\`name: {{ .name }}\`</span>

	tmpl2 <span class="token operator">:=</span> <span class="token string">\`age: {{ .age }}\`</span>

	tmpl3 <span class="token operator">:=</span> <span class="token string">\`Person Info
{{template &quot;t1&quot; .}}
{{template &quot;t2&quot; .}}\`</span>

	t1<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;t1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl1<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	t2<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;t2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl2<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	t3<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;t3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tmpl3<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">associate</span><span class="token punctuation">(</span>t3<span class="token punctuation">,</span> t1<span class="token punctuation">,</span> t2<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	err <span class="token operator">=</span> t3<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">associate</span><span class="token punctuation">(</span>t <span class="token operator">*</span>template<span class="token punctuation">.</span>Template<span class="token punctuation">,</span> ts <span class="token operator">...</span><span class="token operator">*</span>template<span class="token punctuation">.</span>Template<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> ts <span class="token punctuation">{</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">AddParseTree</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> tt<span class="token punctuation">.</span>Tree<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述的地面中，t3关联了t1，和t2，使用<code>*Template.AddParseTree</code>方法进行关联</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Template<span class="token punctuation">)</span> <span class="token function">AddParseTree</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> tree <span class="token operator">*</span>parse<span class="token punctuation">.</span>Tree<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Template<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最终的模板生成结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Person Info
name: jack
age: 18  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插槽" tabindex="-1"><a class="header-anchor" href="#插槽" aria-hidden="true">#</a> 插槽</h3><p>通过<code>block</code>语句，可以实现类似vue插槽的效果，其目的是为了复用某一个模板而用的。看一个使用案例就知道怎么用了，在t1模板中定义插槽</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Basic Person Info
name: {{ .name }}
age: {{ .age }}
address: {{ .address }}
{{ block &quot;slot&quot; . }} default content body {{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>block</code>语句可以插槽中的默认内容，在后续其它模板使用插槽时，会覆盖默认的内容。在t2模板中引用t1模板，并使用<code>define</code>定义嵌入的内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{ template &quot;person.txt&quot; . }}
{{ define &quot;slot&quot; }}
school: {{ .school }}
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将两个模板关联以后，传入如下的数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>    <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>     <span class="token number">18</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;company&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;google&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;school&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;mit&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终输出的结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Basic Person Info
name: jack  
age: 18     
address: usa
            
school: mit 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板文件" tabindex="-1"><a class="header-anchor" href="#模板文件" aria-hidden="true">#</a> 模板文件</h2><p>在模板语法的案例中，都是使用的字符串字面量来作为模板，在实际的使用情况中大多数都是将模板放在文件中。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ParseFS</span><span class="token punctuation">(</span>fsys fs<span class="token punctuation">.</span>FS<span class="token punctuation">,</span> patterns <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Template<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比如<code>template.ParseFs</code>就是从指定的文件系统中加载匹配<code>pattern</code>的模板。下面的例子以<code>embed.FS</code>作为文件系统，准备三个文件</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code># person.txt
Basic Person Info
name: {{ .name }}
age: {{ .age }}
address: {{ .address }}
{{ block &quot;slot&quot; . }} {{ end }}

# student.txt
{{ template &quot;person.txt&quot; . }}
{{ define &quot;slot&quot; }}
school: {{ .school }}
{{ end }}

# employee.txt
{{ template &quot;person.txt&quot; . }}
{{ define &quot;slot&quot; }}
company: {{ .company }}
{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;embed&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;text/template&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//go:embed *.txt</span>
<span class="token keyword">var</span> fs embed<span class="token punctuation">.</span>FS

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">{</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>    <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span>     <span class="token number">18</span><span class="token punctuation">,</span>
		<span class="token string">&quot;address&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;company&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;google&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;school&quot;</span><span class="token punctuation">:</span>  <span class="token string">&quot;mit&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	t1<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">ParseFS</span><span class="token punctuation">(</span>fs<span class="token punctuation">,</span> <span class="token string">&quot;person.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;student.txt&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	t1<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	
	t2<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">ParseFS</span><span class="token punctuation">(</span>fs<span class="token punctuation">,</span> <span class="token string">&quot;person.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;employee.txt&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	t2<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Basic Person Info
name: jack       
age: 18          
address: usa     
                 
school: mit      
Basic Person Info
name: jack       
age: 18          
address: usa     
                 
company: google  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个很简单的模板文件使用案例，<code>person.txt</code>作为插槽文件，其它两个复用其内容并嵌入自定义的新内容。也可以使用下面两个函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ParseGlob</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Template<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ParseFiles</span><span class="token punctuation">(</span>filenames <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Template<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ParseGlob</code>基于通配符匹配，<code>ParseFiles</code>基于文件名，它们都是使用的本地文件系统。如果是用于展示在前端的<code>html</code>文件，建议使用<code>html/template</code>包，它提供的API与<code>text/template</code>完全一致，但是针对<code>html</code>，<code>css</code>，<code>js</code>做了安全处理。</p>`,171);function v(k,m){const a=c("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[s("官方文档："),n("a",d,[s("template package - text/template - Go Packages"),i(a)])]),r])}const g=e(l,[["render",v],["__file","130.template.html.vue"]]);export{g as default};
