import{_ as i,V as p,W as c,X as s,Y as n,Z as t,a0 as e,F as o}from"./framework-f06be456.js";const l={},u=s("h1",{id:"cgo",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#cgo","aria-hidden":"true"},"#"),n(" CGO")],-1),d=s("p",null,"由于go需要GC，对于一些性能要求更高的场景，go可能不太适合处理，c作为传统的系统编程语言性能是非常优秀的，而cgo可以将两者联系起来，相互调用，让go调用c，将性能敏感的任务交给c去完成，go负责处理上层逻辑，cgo同样支持c调用go，不过这种场景比较少见，也不太建议这么做。",-1),r=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"提示"),s("p",null,[n("文中代码演示的环境是win10，命令行用的是"),s("code",null,"gitbash"),n("，windows用户建议提前安装好mingw。")])],-1),v={href:"https://go.dev/blog/cgo",target:"_blank",rel:"noopener noreferrer"},k=s("code",null,"cmd/cgo/doc.go",-1),m={href:"https://pkg.go.dev/cmd/cgo",target:"_blank",rel:"noopener noreferrer"},b=e(`<h2 id="代码调用" tabindex="-1"><a class="header-anchor" href="#代码调用" aria-hidden="true">#</a> 代码调用</h2><p>看下面一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">//#include &lt;stdio.h&gt;</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">puts</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">CString</span><span class="token punctuation">(</span><span class="token string">&quot;hello, cgo!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想要使用cgo特性，通过导入语句<code>import &quot;C&quot;</code>即可开启，需要注意的是<code>C</code>必须是大写字母，且导入名称无法被重写，同时需要确保环境变量<code>CGO_ENABLED</code>是否设置为<code>1</code>，在默认情况下该环境变量是默认启用的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span>  CGO
$ go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还需要确保本地拥有<code>C/C++</code>的构建工具链，也就是<code>gcc</code>，在windows平台就是<code>mingw</code>，这样才能确保程序正常通过编译。执行如下命令进行编译，开启了cgo以后编译时间是要比纯go要更久的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go build <span class="token parameter variable">-o</span> ./ main.go
$ ./main.exe
hello, cgo<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外要注意的一个点就是，开启cgo以后，将无法支持交叉编译。</p><h3 id="go嵌入c代码" tabindex="-1"><a class="header-anchor" href="#go嵌入c代码" aria-hidden="true">#</a> go嵌入c代码</h3><p>cgo支持直接把c代码写在go源文件中，然后直接调用，看下面的例子，例子中编写了一个名为<code>printSum</code>的函数，然后在go中的<code>main</code>函数进行调用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
void printSum(int a, int b) {
	printf(&quot;c:%d+%d=%d&quot;,a,b,a+b);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">printSum</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>c:1+2=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这适用于简单的场景，如果c代码非常多，跟go代码糅杂在一起十分降低可读性，就不太适合这么做。</p><p><strong>错误处理</strong></p><p>在go语言中错误处理以返回值的形式返回，但c语言不允许有多返回值，为此可以使用c中的<code>errno</code>，表示在函数调用期间发生了错误，cgo对此做了兼容，在调用c函数时可以像go一样用返回值来处理错误。要使用<code>errno</code>，首先引入<code>errno.h</code>，看下面的一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;
#include &lt;errno.h&gt;

int32_t sum_positive(int32_t a, int32_t b) {
	if (a &lt;= 0 || b &lt;= 0) {
		errno = EINVAL;
		return 0;
	}
	return a + b;
}

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sum<span class="token punctuation">,</span> err <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">sum_positive</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>syscall.Errno
The device does not recognize the command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到它的错误类型是<code>syscall.Errno</code>，<code>errno.h</code>中还定义了其它很多错误代码，可以自己去了解。</p><h3 id="go引入c文件" tabindex="-1"><a class="header-anchor" href="#go引入c文件" aria-hidden="true">#</a> go引入c文件</h3><p>通过引入c文件，就可以很好的解决上述的问题，首先创建一个头文件<code>sum.h</code>，内容如下</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后再创建<code>sum.c</code>，编写具体的函数</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;sum.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在<code>main.go</code>中导入头文件</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">//#include &quot;sum.h&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;cgo sum: %d\\n&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在进行编译的话，必须要指定当前文件夹，否则找不到c文件，如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build -o sum.exe . &amp;&amp; ./sum.exe
cgo sum: 3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码中<code>res</code>是go中的一个变量，<code>C.sum</code>是c语言中的函数，它的返回值是c语言中的<code>int</code>而非go中的<code>int</code>，之所以能成功调用，是因为cgo从中做了类型转换。</p><h3 id="c调用go" tabindex="-1"><a class="header-anchor" href="#c调用go" aria-hidden="true">#</a> c调用go</h3><p>c调用go，指的是在cgo中c调用go，而非原生的c程序调用go，它们是这样一个调用链<code>go-cgo-c-&gt;cgo-&gt;go</code>。go调用c是为了利用c的生态和性能，几乎没有原生的c程序调用go这种需求，如果有的话也建议通过网络通信来代替。</p><p>cgo支持导出go函数让c调用，如果要导出go函数，需在函数签名上方加上<code>//export func_name</code>注释，并且其参数和返回值都得是cgo支持的类型，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//export sum</span>
<span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span> C<span class="token punctuation">.</span>int32_t <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改写刚刚的<code>sum.c</code>文件为如下内容</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;sum.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;_cgo_export.h&quot;</span></span>

<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token class-name">int32_t</span> a<span class="token punctuation">,</span> <span class="token class-name">int32_t</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">do_sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">int32_t</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
	<span class="token class-name">int32_t</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
	<span class="token class-name">int32_t</span> c <span class="token operator">=</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时修改头文件<code>sum.h</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void do_sum();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在go中导出函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;
#include &quot;sum.h&quot;
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">do_sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//export sum</span>
<span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span> C<span class="token punctuation">.</span>int32_t <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在c中使用的<code>sum</code>函数实际上是go提供的，输出结果如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>关键点在于<code>sum.c</code>文件中导入的<code>_cgo_export.h</code>，它包含了有关所有go导出的类型，如果不导入的话就无法使用go导出的函数。另一个注意点是<code>_cgo_export.h</code>不能在go文件导入，因为该头文件生成的前提是所有go源文件能够通过编译。因此下面这种写法是错误的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdint.h&gt;
#include &lt;stdio.h&gt;
#include &quot;_cgo_export.h&quot;

void do_sum() {
	int32_t a = 10;
	int32_t b = 10;
	int32_t c = sum(a, b);

	printf(&quot;%d&quot;, c);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">do_sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//export sum</span>
<span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span> C<span class="token punctuation">.</span>int32_t <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器会提示头文件不存在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fatal error: _cgo_export.h: No such file or directory
 #include &quot;_cgo_export.h&quot;
          ^~~~~~~~~~~~~~~
compilation terminated.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>倘若go函数具有多个返回值，那么c调用时将返回一个结构体。</p><p>顺带一提，我们可以把go指针通过c函数参数传递给c，在c函数调用期间cgo会尽量保证内存安全，但是导出的go函数返回值不能带指针，因为在这种情况下cgo没法判断其是否被引用，也不好固定内存，如果返回的内存被引用了，然后在go中这段内存被GC掉了或者发生偏移，将导致指针越界，如下所示。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//export newCharPtr</span>
<span class="token keyword">func</span> <span class="token function">newCharPtr</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>C<span class="token punctuation">.</span>char <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的写法默认是不允许通过编译的，如果想要关闭这个检查，可以如下设置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GODEBUG=cgocheck=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,51),g=s("code",null,"1",-1),h=s("code",null,"2",-1),f={href:"https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers",target:"_blank",rel:"noopener noreferrer"},y=e(`<h2 id="类型转换" tabindex="-1"><a class="header-anchor" href="#类型转换" aria-hidden="true">#</a> 类型转换</h2><p>cgo对c与go之间的类型做了一个映射，方便它们在运行时调用。对于c中的类型，在go中导入<code>import &quot;C&quot;</code>之后，大部分情况下可以通过</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C.typename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方式来直接访问，比如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C.int(1)
C.char(&#39;a&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但c语言类型可以由多个关键字组成，比如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>unsigned char
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种情况就没法直接访问了，不过可以使用c中的<code>typedef</code>关键字来给类型取个别名，其功能等同于go中的类型别名。如下</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span> byte<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样一来，就可以通过<code>C.byte</code>来访问类型<code>unsigned char</code>了。例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;

typedef unsigned char byte;

void printByte(byte b) {
	printf(&quot;%c\\n&quot;,b);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">printByte</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printByte</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token char">&#39;b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printByte</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token char">&#39;c&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a
b
c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大部分情况下，cgo给常用类型（基本类型之类的）已经取好了别名，也可以根据上述的方法自己定义，不会冲突。</p><h3 id="char" tabindex="-1"><a class="header-anchor" href="#char" aria-hidden="true">#</a> char</h3><p>c中的<code>char</code>对应go中的<code>int8</code>类型，<code>unsigned char</code>对应go中的<code>uint8</code>也就是<code>byte</code>类型。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include&lt;complex.h&gt;

char ch;

char get() {
	return ch;
}

void set(char c) {
	ch = c;
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">char</span><span class="token punctuation">(</span><span class="token char">&#39;c&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	res <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;type: %s, val: %v&quot;</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type: main._Ctype_char, val: 99
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果将<code>set</code>的参数换成<code>C.char(math.MaxInt8 + 1)</code>，那么编译就会失败，并提示如下错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cannot convert math.MaxInt8 + 1 (untyped int constant 128) to type _Ctype_char
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3><p>cgo提供了一些伪函数用于在c和go之间传递字符串和字节切片，这些函数实际上并不存在，你也没法找到它们的定义，就跟<code>import &quot;C&quot;</code>一样，<code>C</code>这个包也是不存在的，只是为了方便开发者使用，在编译后它们会被转换成其它的操作。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Go string to C string</span>
<span class="token comment">// The C string is allocated in the C heap using malloc.</span>
<span class="token comment">// It is the caller&#39;s responsibility to arrange for it to be</span>
<span class="token comment">// freed, such as by calling C.free (be sure to include stdlib.h</span>
<span class="token comment">// if C.free is needed).</span>
<span class="token keyword">func</span> C<span class="token punctuation">.</span><span class="token function">CString</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>C<span class="token punctuation">.</span>char

<span class="token comment">// Go []byte slice to C array</span>
<span class="token comment">// The C array is allocated in the C heap using malloc.</span>
<span class="token comment">// It is the caller&#39;s responsibility to arrange for it to be</span>
<span class="token comment">// freed, such as by calling C.free (be sure to include stdlib.h</span>
<span class="token comment">// if C.free is needed).</span>
<span class="token keyword">func</span> C<span class="token punctuation">.</span><span class="token function">CBytes</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> unsafe<span class="token punctuation">.</span>Pointer

<span class="token comment">// C string to Go string</span>
<span class="token keyword">func</span> C<span class="token punctuation">.</span><span class="token function">GoString</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span> <span class="token builtin">string</span>

<span class="token comment">// C data with explicit length to Go string</span>
<span class="token keyword">func</span> C<span class="token punctuation">.</span><span class="token function">GoStringN</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

<span class="token comment">// C data with explicit length to Go []byte</span>
<span class="token keyword">func</span> C<span class="token punctuation">.</span><span class="token function">GoBytes</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span>Pointer<span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>go中的字符串本质上是一个结构体，里面持有着一个底层数组的引用，在传递给c函数时，需要使用<code>C.CString()</code>在c中使用<code>malloc</code>创建一个“字符串”，为其分配内存空间，然后返回一个c指针，因为c中没有字符串这个类型，通常会使用<code>char*</code>来表示字符串，也就是一个字符数组的指针，使用完毕后记得使用<code>free</code>释放内存。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void printfGoString(char* s) {
	puts(s);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;unsafe&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cstring <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">CString</span><span class="token punctuation">(</span><span class="token string">&quot;this is a go string&quot;</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printfGoString</span><span class="token punctuation">(</span>cstring<span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">free</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>cstring<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以是<code>char</code>数组类型，两者其实都一样，都是指向头部元素的指针。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">printfGoString</span><span class="token punctuation">(</span><span class="token keyword">char</span> s<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">puts</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以传递字节切片，由于<code>C.CBytes()</code>会返回一个<code>unsafe.Pointer</code>，在传递给c函数之前要将其转换为<code>*C.char</code>类型。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void printfGoString(char* s) {
	puts(s);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;unsafe&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cbytes <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">CBytes</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;this is a go string&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printfGoString</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span><span class="token punctuation">(</span>cbytes<span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">free</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>cbytes<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子输出都是一样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this is a go string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述这几种字符串传递方法涉及到了一次内存拷贝，在传递过后实际上是在c内存和go内存中各自保存了一份，这样做会更安全。话虽如此，我们依然可以直接传递指针给c函数，也可以在c中直接修改go中的字符串，看下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void printfGoString(char* s) {
	puts(s);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;unsafe&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ptr <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">SliceData</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;this is a go string&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printfGoString</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this is a go string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例子通过<code>unsafe.SliceData</code>直接获取了字符串底层数组的指针，并将其转换为了c指针后传递给c函数，该字符串的内存是由go进行管理的，自然也就不再需要free，这样做的好处就是传递的过程不再需要拷贝，但有一定的风险。下面的例子演示了在c中修改go中的字符串</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void printfGoString(char* s, int len) {
	puts(s);
	s[8] = &#39;c&#39;;
	puts(s);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> buf <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
	buf <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;this is a go string&quot;</span><span class="token punctuation">)</span>
	ptr <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">SliceData</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printfGoString</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this is a go string
this is c go string
this is c go string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="整数" tabindex="-1"><a class="header-anchor" href="#整数" aria-hidden="true">#</a> 整数</h3><p>go与c之间的整数映射关系如下表所示，关于整数的类型映射还在可以在标准库<code>cmd/cgo/gcc.go</code>看到一些相关信息。</p><table><thead><tr><th>go</th><th>c</th><th>cgo</th></tr></thead><tbody><tr><td>int8</td><td>singed char</td><td>C.schar</td></tr><tr><td>uint8</td><td>unsigned char</td><td>C.uchar</td></tr><tr><td>int16</td><td>short</td><td>C.short</td></tr><tr><td>uint16</td><td>unsigned short</td><td>C.ushort</td></tr><tr><td>int32</td><td>int</td><td>C.int</td></tr><tr><td>uint32</td><td>unsigned int</td><td>C.uint</td></tr><tr><td>int32</td><td>long</td><td>C.long</td></tr><tr><td>uint32</td><td>unsigned long</td><td>C.ulong</td></tr><tr><td>int64</td><td>long long int</td><td>C.longlong</td></tr><tr><td>uint64</td><td>unsigned long long int</td><td>C.ulonglong</td></tr></tbody></table><p>示例代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;

void printGoInt8(signed char n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoUInt8(unsigned char n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoInt16(signed short n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoUInt16(unsigned short n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoInt32(signed int n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoUInt32(unsigned int n) {
	printf(&quot;%d\\n&quot;,n);
}
void printGoInt64(signed long long int n) {
	printf(&quot;%ld\\n&quot;,n);
}
void printGoUInt64(unsigned long long int n) {
	printf(&quot;%ld\\n&quot;,n);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">printGoInt8</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">schar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoInt8</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">schar</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoInt16</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">short</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoUInt16</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">ushort</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoInt32</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoUInt32</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">uint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoInt64</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">longlong</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoUInt64</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">ulonglong</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cgo同时也对<code>&lt;stdint.h&gt;</code>的整数类型提供了支持，这里的类型内存大小更为清晰明确，而且其命名风格也与go非常相似。</p><table><thead><tr><th>go</th><th>c</th><th>cgo</th></tr></thead><tbody><tr><td>int8</td><td>int8_t</td><td>C.int8_t</td></tr><tr><td>uint8</td><td>uint8_t</td><td>C.uint8_t</td></tr><tr><td>int16</td><td>int16_t</td><td>C.int16_t</td></tr><tr><td>uint16</td><td>uint16_t</td><td>C.uint16_t</td></tr><tr><td>int32</td><td>int32_t</td><td>C.int32_t</td></tr><tr><td>uint32</td><td>uint32_t</td><td>C.uint32_t</td></tr><tr><td>int64</td><td>int64_t</td><td>C.int64_t</td></tr><tr><td>uint64</td><td>uint64_t</td><td>C.uint64_t</td></tr></tbody></table><p>在使用cgo时，建议使用<code>&lt;stdint.h&gt;</code>中的整数类型。</p><h3 id="浮点数" tabindex="-1"><a class="header-anchor" href="#浮点数" aria-hidden="true">#</a> 浮点数</h3><p>go与c的浮点数类型映射如下</p><table><thead><tr><th>go</th><th>c</th><th>cgo</th></tr></thead><tbody><tr><td>float32</td><td>float</td><td>C.float</td></tr><tr><td>float64</td><td>double</td><td>C.double</td></tr></tbody></table><p>代码示例如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;

void printGoFloat32(float n) {
	printf(&quot;%f\\n&quot;,n);
}
void printGoFloat64(double n) {
	printf(&quot;%lf\\n&quot;,n);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	C<span class="token punctuation">.</span><span class="token function">printGoFloat32</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">float</span><span class="token punctuation">(</span><span class="token number">1.11</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printGoFloat64</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">double</span><span class="token punctuation">(</span><span class="token number">3.14</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h3><p>切片的情况的实际上跟上面讲到的字符串差不多，不过区别在于cgo没有提供伪函数来对切片进行拷贝，想让c访问到go中的切片就只能把切片的指针传过去。看下面的一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

void printInt32Arr(int32_t* s, int32_t len) {
	for (int32_t i = 0; i &lt; len; i++) {
		printf(&quot;%d &quot;, s[i]);
	}
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> arr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int32</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		arr <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token function">int32</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ptr <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">SliceData</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printInt32Arr</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 1 2 3 4 5 6 7 8 9 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里将切片的底层数组的指针传递给了c函数，由于该数组的内存是由go管理，不建议c长期持有其指针引用。反过来，将c的数组作为go切片的底层数组的例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

int32_t s[] = {1, 2, 3, 4, 5, 6, 7};

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	l <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>s<span class="token punctuation">)</span> <span class="token operator">/</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span>
	goslice <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Slice</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>C<span class="token punctuation">.</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> l<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token keyword">range</span> goslice <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>7
0 1
1 2
2 3
3 4
4 5
5 6
6 7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>unsafe.Slice</code>函数可以将数组指针转换为切片，按照直觉来说，c中的数组就是一个指向头部元素的指针，按照常理来说应该这样使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>goslice <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Slice</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>C<span class="token punctuation">.</span>s<span class="token punctuation">,</span> l<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过输出可以看到，如果这样做的话，除了第一个元素，剩下的内存全都越界了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 [1 2 3 4 5 6 7]                  
1 [0 -1 0 0 0 3432824 0]           
2 [0 0 -1 -1 0 0 -1]               
3 [0 0 0 255 0 0 0]                
4 [2 0 0 0 3432544 0 0]            
5 [0 3432576 0 3432592 0 3432608 0]
6 [0 0 3432624 0 0 0 1422773729] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即便c中的数组只是一个头指针，经过cgo包裹了一下就成了go数组，有了自己的地址，所以应该对数组头部元素取址。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goslice := unsafe.Slice(&amp;C.s[0], l)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h3><p>通过<code>C.struct_</code>前缀加上结构体名称，就可以访问c结构体，c结构体无法被当作匿名结构体嵌入go结构体。下面是一个简单的c结构体的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

struct person {
	int32_t age;
	char*  name;
};

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> p C<span class="token punctuation">.</span>struct_person
	p<span class="token punctuation">.</span>age <span class="token operator">=</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>name <span class="token operator">=</span> C<span class="token punctuation">.</span><span class="token function">CString</span><span class="token punctuation">(</span><span class="token string">&quot;john&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main._Ctype_struct_person
{age:18 name:0x1dd043b6e30}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果c结构体的某些成员包含<code>bit-field</code>，cgo就会忽略这类结构体成员，比如将<code>person</code>修改为下面这种</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
	<span class="token class-name">int32_t</span> age<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">char</span><span class="token operator">*</span>  name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次执行就会报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p.age undefined (type _Ctype_struct_person has no field or method age)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>c和go的结构体字段的内存对齐规则并不相同，如果开启了cgo，大部分情况下会以c为主导。</p><h3 id="联合体" tabindex="-1"><a class="header-anchor" href="#联合体" aria-hidden="true">#</a> 联合体</h3><p>使用<code>C.union_</code>加上名称就可以访问c中的联合体，由于go并不支持联合体，它们在go中会以字节数组的形式存在。下面是一个简单的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

union data {
	int32_t age;
	char  ch;
};

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> u C<span class="token punctuation">.</span>union_data
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[4]uint8 [0 0 0 0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过<code>unsafe.Pointer</code>可以进行访问和修改</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> u C<span class="token punctuation">.</span>union_data
	ptr <span class="token operator">:=</span> <span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>u<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>ptr<span class="token punctuation">)</span>
	<span class="token operator">*</span>ptr <span class="token operator">=</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>ptr<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
1024     
[0 4 0 0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举" aria-hidden="true">#</a> 枚举</h3><p>通过前缀<code>C.enum_</code>加上枚举类型名就可以访问c中的枚举类型。下面是一个简单的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

enum player_state {
	alive,
	dead,
};

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> State C<span class="token punctuation">.</span>enum_player_state

<span class="token keyword">func</span> <span class="token punctuation">(</span>s State<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> s <span class="token punctuation">{</span>
	<span class="token keyword">case</span> C<span class="token punctuation">.</span>alive<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;alive&quot;</span>
	<span class="token keyword">case</span> C<span class="token punctuation">.</span>dead<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;dead&quot;</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;unknown&quot;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>alive<span class="token punctuation">,</span> <span class="token function">State</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>alive<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>dead<span class="token punctuation">,</span> <span class="token function">State</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>dead<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 alive
1 dead
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202312211707105.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202312211739040.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,95),C=s("code",null,"malloc()",-1),x=s("code",null,"free()",-1),q={href:"https://pkg.go.dev/runtime#Pinner",target:"_blank",rel:"noopener noreferrer"},_=s("code",null,"C.free()",-1),w=e(`<p>如果要在c和go之间传递指针，就需要先将其转为<code>unsafe.Pointer</code>，然后再转换成对应的指针类型，就跟c中的<code>void*</code>一样。看两个例子，第一个是c指针引用go变量的例子，而且还对变量做了修改。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

void printNum(int32_t* s) {
	printf(&quot;%d\\n&quot;, *s);
	*s = 3;
	printf(&quot;%d\\n&quot;, *s);
}
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">1</span>
	ptr <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">)</span>
	C<span class="token punctuation">.</span><span class="token function">printNum</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>int32_t<span class="token punctuation">)</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
3
3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个是go指针引用c变量，并对其修改的例子。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

int32_t num = 10;
*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>num<span class="token punctuation">)</span>
	ptr <span class="token operator">:=</span> unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>C<span class="token punctuation">.</span>num<span class="token punctuation">)</span>
	iptr <span class="token operator">:=</span> <span class="token punctuation">(</span><span class="token operator">*</span><span class="token builtin">int32</span><span class="token punctuation">)</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span>
	<span class="token operator">*</span>iptr<span class="token operator">++</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span>num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10
11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>顺带一提，cgo不支持c中的函数指针。</p><h2 id="链接库" tabindex="-1"><a class="header-anchor" href="#链接库" aria-hidden="true">#</a> 链接库</h2><p>c语言并没有像go这样的依赖管理，想要直接使用别人写好的库除了直接获取源代码之外，还有个办法就是静态链接库和动态链接库，cgo也支持这些，得益于此，我们就可以在go程序中导入别人写好的库，而不需要源代码。</p><h3 id="动态链接库" tabindex="-1"><a class="header-anchor" href="#动态链接库" aria-hidden="true">#</a> 动态链接库</h3><p>动态链接库无法单独运行，它在运行时会与可执行文件一起加载到内存中，下面演示制作一个简单的动态链接库，并使用cgo进行调用。首先准备一个<code>lib/sum.c</code>文件，内容如下</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h&gt;</span></span>

<span class="token class-name">int32_t</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token class-name">int32_t</span> a<span class="token punctuation">,</span> <span class="token class-name">int32_t</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写头文件<code>lib/sum.h</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token class-name">int32_t</span> a<span class="token punctuation">,</span> <span class="token class-name">int32_t</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来使用<code>gcc</code>来制作动态链接库，首先编译生成目标文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> lib

$ gcc <span class="token parameter variable">-c</span> sum.c <span class="token parameter variable">-o</span> sum.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后制作动态链接库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> libsum.dll sum.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>制作完成后，然后在go代码中引入<code>sum.h</code>头文件，并且还得通过宏告诉cgo去哪里寻找库文件</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#cgo CFLAGS: -I ./lib
#cgo LDFLAGS: -L\${SRCDIR}/lib -llibsum
#include &quot;sum.h&quot;

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>CFLAGS: -I</code>指的是搜索头文件的相对路径，</p></li><li><p><code>-L</code>指的是库搜索路径，<code>\${SRCDIR}</code>代指当前路径的绝对路径，因为它的参数必须是绝对路径</p></li><li><p><code>-l</code>指的是库文件的名称，sum就是<code>sum.dll</code>。</p></li></ul>`,23),G=s("code",null,"CFFLAGS",-1),S=s("code",null,"LDFLAGS",-1),P={href:"https://pkg.go.dev/cmd/cgo#hdr-Using_cgo_with_the_go_command",target:"_blank",rel:"noopener noreferrer"},I=e(`<p>把动态库放到<code>exe</code>的同级目录下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ls</span>
go.mod  go.sum  lib/  libsum.dll*  main.exe*  main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后编译go程序并执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go build main.go <span class="token operator">&amp;&amp;</span> ./main.exe
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>到此动态链接库调用成功。</p><h3 id="静态链接库" tabindex="-1"><a class="header-anchor" href="#静态链接库" aria-hidden="true">#</a> 静态链接库</h3><p>不同于动态链接库，使用cgo导入静态链接库时，它会与go的目标文件最终链接成一个可执行文件。还是拿<code>sum.c</code>举例，先将源文件编译成目标文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-o</span> sum.o <span class="token parameter variable">-c</span> sum.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后将目标文件打包成静态链接库（必须是<code>lib</code>前缀开头，不然会找不到）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ar rcs libsum.a sum.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>go文件内容</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#cgo CFLAGS: -I ./lib
#cgo LDFLAGS: -L\${SRCDIR}/lib -llibsum
#include &quot;sum.h&quot;

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	res <span class="token operator">:=</span> C<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go build <span class="token operator">&amp;&amp;</span> ./main.exe
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>到此，静态链接库调用成功。</p><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>虽然使用cgo的出发点是为了性能，但在c与go之间切换也会不小的造成性能损失，对于一些十分简单的任务，cgo的效率并不如纯go。看一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token comment">/*
#include &lt;stdint.h&gt;

int32_t cgo_sum(int32_t a, int32_t b) {
	return a + b;
}

*/</span>
<span class="token keyword">import</span> <span class="token string">&quot;C&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">go_sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token builtin">int32</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">testSum</span><span class="token punctuation">(</span>N <span class="token builtin">int</span><span class="token punctuation">,</span> do <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token builtin">int64</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> sum <span class="token builtin">int64</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		sum <span class="token operator">+=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Nanoseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> sum <span class="token operator">/</span> <span class="token function">int64</span><span class="token punctuation">(</span>N<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	N <span class="token operator">:=</span> <span class="token number">1000_000</span>
	nsop1 <span class="token operator">:=</span> <span class="token function">testSum</span><span class="token punctuation">(</span>N<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		C<span class="token punctuation">.</span><span class="token function">cgo_sum</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> C<span class="token punctuation">.</span><span class="token function">int32_t</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;cgo_sum: %d ns/op\\n&quot;</span><span class="token punctuation">,</span> nsop1<span class="token punctuation">)</span>
	nsop2 <span class="token operator">:=</span> <span class="token function">testSum</span><span class="token punctuation">(</span>N<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">go_sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;pure_go_sum: %d ns/op\\n&quot;</span><span class="token punctuation">,</span> nsop2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个非常简单的测试，分别用c和go编写了一个两数求和的函数，然后各自运行100w次，求其平均耗时，测试结果如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cgo_sum: 49 ns/op
pure_go_sum: 2 ns/op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果可以看到，cgo的平均耗时是纯go的二十几倍，倘若执行的不是单纯的两数相加，而是一个比较耗时的任务，cgo的优势会更大一些。除此之外，使用cgo还有以下缺点</p><ol><li>许多go配套工具链将无法使用，比如gotest，pprof，上面的测试例子就不能使用gotest，只能自己手写。</li><li>编译速度变慢，自带的交叉编译也没法用了</li><li>内存安全问题</li><li>依赖问题，如果别人用了你的库，等于也要开启cgo。</li></ol><p>在没有考虑周全之前，不要在项目中引入cgo，对于一些十分复杂的任务，使用cgo确实可以带来好处，但如果只是一些简单的任务，还是老老实实用go吧。</p>`,23);function N(L,$){const a=o("ExternalLinkIcon");return p(),c("div",null,[u,d,r,s("p",null,[n("关于cgo，官方有一个简单的介绍："),s("a",v,[n("C? Go? Cgo! - The Go Programming Language"),t(a)]),n("，如果想要更详细的介绍，可以在标准库"),k,n("中获取更加详细的信息，或者也可以直接看文档"),s("a",m,[n("cgo command - cmd/cgo - Go Packages"),t(a)]),n("，两者内容是完全一样的。")]),b,s("p",null,[n("它有两种检查级别，可以设为"),g,n("，"),h,n("，级别越高检查造成运行时开销越大，可以 前往"),s("a",f,[n("cgo command - passing_pointer"),t(a)]),n("了解细节。")]),y,s("p",null,[n("谈到了指针避不开内存，cgo之间相互调用最大的问题就是两门语言的内存模型并不相同，c语言的内存完全是由开发者手动管理，用"),C,n("分配内存，"),x,n("释放内存，如果不去手动释放，它是绝对不会自己释放掉的，所以c的内存管理是非常稳定的。而go就不一样了，它带有GC，并且Goroutine的栈空间是会动态调整的，当栈空间不足时会进行增长，那么这样一来，内存地址就可能发生了变化，跟上图一样（图画的并不严谨），指针可能就成了c中常见的悬挂指针。即便cgo在大多数情况可以避免内存移动（由"),s("a",q,[n("runtime.Pinner"),t(a)]),n("来固定内存），但go官方也不建议在c中长期引用go的内存。但是反过来，go中的指针引用c中的内存的话，是比较安全的，除非手动调用"),_,n("，否则这块内存是不会被自动释放掉的。")]),w,s("p",null,[G,n("和"),S,n("这两个都是gcc的编译选项，出安全考虑，cgo禁用了一些参数，前往"),s("a",P,[n("cgo command"),t(a)]),n("了解细节。")]),I])}const D=i(l,[["render",N],["__file","135.cgo.html.vue"]]);export{D as default};
