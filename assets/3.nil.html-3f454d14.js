import{_ as e,V as t,W as p,X as n,Y as s,Z as o,a0 as c,F as i}from"./framework-f06be456.js";const l="/images/essential/impl_nil_1.png",u="/images/essential/impl_nil_2.png",d={},r=c(`<h1 id="nil" tabindex="-1"><a class="header-anchor" href="#nil" aria-hidden="true">#</a> nil</h1><h2 id="引子" tabindex="-1"><a class="header-anchor" href="#引子" aria-hidden="true">#</a> 引子</h2><p>在某一次编写代码的过程中，我需要调用<code>Close()</code>方法来关闭多个对象，就像下面的代码一样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	b B
	c C
   	d D
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> a<span class="token punctuation">.</span>b <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> a<span class="token punctuation">.</span>b<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> a<span class="token punctuation">.</span>c <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> a<span class="token punctuation">.</span>c<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
    
    <span class="token keyword">if</span> a<span class="token punctuation">.</span>d <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> err <span class="token operator">:=</span> a<span class="token punctuation">.</span>d<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> err
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但写这么多<code>if</code>判断感觉不太优雅，<code>B</code>，<code>C</code>和<code>D</code>都实现了<code>Close</code>方法，应该可以更简洁一点，于是我把它们放进了一个切片中，然后循环判断</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	closers <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>io<span class="token punctuation">.</span>Closer<span class="token punctuation">{</span>
		a<span class="token punctuation">.</span>b<span class="token punctuation">,</span>
		a<span class="token punctuation">.</span>c<span class="token punctuation">,</span>
		a<span class="token punctuation">.</span>d<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
    
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> closer <span class="token operator">:=</span> <span class="token keyword">range</span> closers <span class="token punctuation">{</span>
		<span class="token keyword">if</span> closer <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> closer<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样看起来似乎要更好一点，那么运行一下看看</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a A
	<span class="token keyword">if</span> err <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;success&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果出乎意料，居然崩了，错误信息如下，意思就是不能对<code>nil</code>接收者调用方法，循环中的<code>if closer != nil</code>似乎没有起到过滤作用，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>panic: value method main.B.Close called using nil *B pointer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个例子是笔者曾经遇到过的一个bug的简化版，很多初学者刚开始可能都会和我一样犯这种错误，下面就来讲讲到底是怎么个回事。</p><h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2><p>在之前的章节提到过，<code>nil</code>是引用类型的零值，比如切片，map，通道，函数，指针，接口的零值。对于切片，map，通道，函数，可以将它们都看作是指针，都是由指针指向具体的实现。</p><figure><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但唯独接口不一样，接口由两个东西组成：类型和值</p><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当试图对一个变量赋值<code>nil</code>时，会无法通过编译，并且提示如下信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use of untyped nil in assignment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容大致为不能声明一个值为<code>untyped nil</code>的变量。既然有<code>untyped nil</code>，相对的就肯定会有<code>typed nil</code>，而这种情况往往出现在接口身上。看下面一个简单的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> p <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> pa any
	pa <span class="token operator">=</span> p
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>pa <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;nil&gt;
true 
&lt;nil&gt;
false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果非常奇怪，明明<code>pa</code>的输出就是<code>nil</code>，但它就是不等于<code>nil</code>，我们可以通过反射来看看它到底是什么</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> p <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> pa any
	pa <span class="token operator">=</span> p
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;nil&gt;
true 
*int 
&lt;nil&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果可以看到，它实际上是<code>(*int)(nil)</code>，也就是说<code>pa</code>存储的类型是<code>*int</code>，而它实际的值是<code>nil</code>，当对一个接口类型的值进行相等运算的时候，首先会判断它们的类型是否相等，如果类型不相等，则直接判定为不相等，其次再去判断值是否相等，这一段的接口判断的逻辑可以参考自<code>cmd/compile/internal/walk.walkCompare</code>函数。</p><p>所以，如果想要一个接口等于<code>nil</code>，必须要它的值为<code>nil</code>，并且类型也为<code>nil</code>，因为接口中的类型实际上也是一个指针</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> iface <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	tab  <span class="token operator">*</span>itab
	data unsafe<span class="token punctuation">.</span>Pointer
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要绕开类型，直接判断其值是否为<code>nil</code>，可以使用反射，下面是一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> p <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> pa any
	pa <span class="token operator">=</span> p
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>IsNil()</code>可以直接判断其值是否为<code>nil</code>，这样一来就不会出现上述的问题了。所以在平时使用的过程中，假设函数的返回值是一个接口类型，如果你想返回一个零值，最好直接返回<code>nil</code>，不要返回任何具体实现的零值，就算它实现了该接口，但它永远也不会等于<code>nil</code>，这就可能导致例子里面的错误。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>解决了上面的问题，接下来看看下面这几个例子</p><p>当结构体的接收者为指针接收者时，<code>nil</code>是可用的，看下面一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>A<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token operator">*</span>A
	a<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码可以正常运行，并且不会报空指针错误。</p><p>当切片为<code>nil</code>的时候，可以访问它的长度和容量，也可以对其添加元素</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func main() {
	var s []int
	fmt.Println(len(s))
	fmt.Println(cap(s))
	s = append(s, 1)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当map为<code>nil</code>的时候，还可以对其进行访问</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> s <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	i<span class="token punctuation">,</span> ok <span class="token operator">:=</span> s<span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面例子中的这些有关于<code>nil</code>的特性可能会让人比较困惑，尤其是对于go的初学者而言，<code>nil</code>代表着上面几种类型的零值，也就是默认值，默认值应当表现出默认的行为，这也正是go的设计者所希望看到的：让<code>nil</code>变得更有用，而不是直接抛出空指针错误。这一理念同样也体现在标准库中，比如开启一个HTTP服务器可以这样写</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以直接传入一个<code>nil Handler</code>，然后<code>http</code>库就会使用默认的<code>Handler</code>来处理HTTP请求。</p>`,44),k={class:"hint-container tip"},v=n("p",{class:"hint-container-title"},"提示",-1),m={href:"https://www.youtube.com/watch?v=ynoY2xz-F8s&t=56s",target:"_blank",rel:"noopener noreferrer"};function b(g,f){const a=i("ExternalLinkIcon");return t(),p("div",null,[r,n("div",k,[v,n("p",null,[s("感兴趣的可以看看这个视频"),n("a",m,[s("Understanding nil - Gopher Conference 2016"),o(a)]),s("，讲的非常清晰易懂。")])])])}const h=e(d,[["render",b],["__file","3.nil.html.vue"]]);export{h as default};
