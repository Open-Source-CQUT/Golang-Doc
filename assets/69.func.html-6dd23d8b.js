import{_ as n,V as s,W as a,a0 as t}from"./framework-f06be456.js";const e={},p=t(`<h1 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h1><p>在Go中，函数是一等公民，函数是Go最基础的组成部分，也是Go的核心。</p><br><h2 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h2><p>函数的声明格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> 函数名<span class="token punctuation">(</span><span class="token punctuation">[</span>参数列表<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>返回值<span class="token punctuation">]</span> <span class="token punctuation">{</span>
	函数体
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>声明函数有两种办法，一种是通过<code>func</code>关键字直接声明，另一种就是通过<code>var</code>关键字来声明，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数签名由函数名称，参数列表，返回值组成，下面是一个完整的例子，函数名称为<code>Sum</code>，有两个<code>int</code>类型的参数<code>a</code>，<code>b</code>，返回值类型为<code>int</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Sum</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个非常重要的点，即Go中的函数不支持重载，像下面的代码就无法通过编译</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name    <span class="token builtin">string</span>
	Age     <span class="token builtin">int</span>
	Address <span class="token builtin">string</span>
	Salary  <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> address <span class="token builtin">string</span><span class="token punctuation">,</span> salary <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> Age<span class="token punctuation">:</span> age<span class="token punctuation">,</span> Address<span class="token punctuation">:</span> address<span class="token punctuation">,</span> Salary<span class="token punctuation">:</span> salary<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go的理念便是：如果签名不一样那就是两个完全不同的函数，那么就不应该取一样的名字，函数重载会让代码变得混淆和难以理解。这种理念是否正确见仁见智，至少在Go中你可以仅通过函数名就知道它是干什么的，而不需要去找它到底是哪一个重载。</p><br><h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2><p>Go中的参数名可以不带名称，一般这种是在接口或函数类型声明时才会用到，不过为了可读性一般还是建议尽量给参数加上名称</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> ExWriter <span class="token keyword">func</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token builtin">error</span> 

<span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ExWrite</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于类型相同的参数而言，可以只需要声明一次类型，不过条件是它们必须相邻</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Log</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> a1<span class="token punctuation">,</span> a2 any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变长参数可以接收0个或多个值，必须声明在参数列表的末尾，最典型的例子就是<code>fmt.Printf</code>函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Printf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> a <span class="token operator">...</span>any<span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> format<span class="token punctuation">,</span> a<span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是，Go中的函数参数是传值传递，即在传递参数时会拷贝实参的值。如果你觉得在传递切片或map时会复制大量的内存，我可以告诉你大可不必担心，因为这两个数据结构本质上都是指针。</p><br><h2 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值" aria-hidden="true">#</a> 返回值</h2><p>下面是一个简单的函数返回值的例子，<code>Sum</code>函数返回一个<code>int</code>类型的值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当函数没有返回值时，不需要<code>void</code>，不带返回值即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ErrPrintf</span><span class="token punctuation">(</span>format <span class="token builtin">string</span><span class="token punctuation">,</span> a <span class="token operator">...</span>any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> format<span class="token punctuation">,</span> a<span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go允许函数有多个返回值，此时就需要用括号将返回值围起来。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Div</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> a <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> math<span class="token punctuation">.</span><span class="token function">NaN</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;0不能作为被除数&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go也支持具名返回值，不能与参数名重复，使用具名返回值时，<code>return</code>关键字可以不需要指定返回哪些值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ans <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ans <span class="token operator">=</span> a <span class="token operator">+</span> b
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和参数一样，当有多个同类型的具名返回值时，可以省略掉重复的类型声明</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">SumAndMul</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>c<span class="token punctuation">,</span> d <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">=</span> a <span class="token operator">+</span> b
	d <span class="token operator">=</span> a <span class="token operator">*</span> b
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管具名返回值如何声明，永远都是以<code>return</code>关键字后的值为最高优先级。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">SumAndMul</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>c<span class="token punctuation">,</span> d <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">=</span> a <span class="token operator">+</span> b
	d <span class="token operator">=</span> a <span class="token operator">*</span> b
    <span class="token comment">// c，d将不会被返回</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> a <span class="token operator">*</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="匿名函数" tabindex="-1"><a class="header-anchor" href="#匿名函数" aria-hidden="true">#</a> 匿名函数</h2><p>匿名函数就是没有签名的函数，例如下面的函数<code>func(a, b int) int</code>，它没有名称，所以我们只能在它的函数体后紧跟括号来进行调用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">func</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> a <span class="token operator">+</span> b
   <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在调用一个函数时，当它的参数是一个函数类型时，这时名称不再重要，就可以直接传递一个匿名函数，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name   <span class="token builtin">string</span>
	Age    <span class="token builtin">int</span>
	Salary <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	people <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Person<span class="token punctuation">{</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">,</span> Salary<span class="token punctuation">:</span> <span class="token number">5000.0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">,</span> Salary<span class="token punctuation">:</span> <span class="token number">6000.0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Charlie&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">28</span><span class="token punctuation">,</span> Salary<span class="token punctuation">:</span> <span class="token number">5500.0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	slices<span class="token punctuation">.</span><span class="token function">SortFunc</span><span class="token punctuation">(</span>people<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p1 Person<span class="token punctuation">,</span> p2 Person<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> p1<span class="token punctuation">.</span>Name <span class="token operator">&gt;</span> p2<span class="token punctuation">.</span>Name <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token number">1</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> p1<span class="token punctuation">.</span>Name <span class="token operator">&lt;</span> p2<span class="token punctuation">.</span>Name <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token number">0</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个自定义排序规则的例子，<code>slices.SortFunc</code>接受两个参数，一个是切片，另一个就是比较函数，不考虑复用的话，我们就可以直接传递匿名函数。</p><br><h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h2><p>闭包（Closure）这一概念，在一些语言中又被称为Lamda表达式，与匿名函数一起使用，闭包 = 函数 + 环境引用吗，看下面一个例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	grow <span class="token operator">:=</span> <span class="token function">Exp</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;2^%d=%d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token function">grow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Exp</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	e <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
		temp <span class="token operator">:=</span> e
		e <span class="token operator">*=</span> n
		<span class="token keyword">return</span> temp
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2^0=1
2^1=2
2^2=4
2^3=8
2^4=16
2^5=32
2^6=64
2^7=128
2^8=256
2^9=512
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Exp</code>函数的返回值是一个函数，这里将称成为<code>grow</code>函数，每将它调用一次，变量<code>e</code>就会以指数级增长一次。<code>grow</code>函数引用了<code>Exp</code>函数的两个变量：<code>e</code>和<code>n</code>，它们诞生在<code>Exp</code>函数的作用域内，在正常情况下随着<code>Exp</code>函数的调用结束，这些变量的内存会随着出栈而被回收。但是由于<code>grow</code>函数引用了它们，所以它们无法被回收，而是逃逸到了堆上，即使<code>Exp</code>函数的生命周期已经结束了，但变量<code>e</code>和<code>n</code>的生命周期并没有结束，在<code>grow</code>函数内还能直接修改这两个变量，<code>grow</code>函数就是一个闭包函数。</p><br><p>利用闭包，可以非常简单的实现一个求费波那契数列的函数，代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 10个斐波那契数</span>
	fib <span class="token operator">:=</span> <span class="token function">Fib</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> n<span class="token punctuation">,</span> next <span class="token operator">:=</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> next<span class="token punctuation">;</span> n<span class="token punctuation">,</span> next <span class="token operator">=</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Fib</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
	i <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">&gt;=</span> n <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
			f <span class="token operator">:=</span> i
			i<span class="token operator">++</span>
			<span class="token keyword">return</span> f<span class="token punctuation">,</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>

		a<span class="token punctuation">,</span> b <span class="token operator">=</span> b<span class="token punctuation">,</span> c
		c <span class="token operator">=</span> a <span class="token operator">+</span> b
		i<span class="token operator">++</span>

		<span class="token keyword">return</span> a<span class="token punctuation">,</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
1
1
2
3
5
8
13
21
34
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="延迟调用" tabindex="-1"><a class="header-anchor" href="#延迟调用" aria-hidden="true">#</a> 延迟调用</h2><p><code>defer</code>关键字可以使得一个函数延迟一段时间调用，在函数返回之前这些defer描述的函数最后都会被逐个执行，看下面一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因为defer是在函数返回前执行的，你也可以在defer中修改函数的返回值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>s <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		s <span class="token operator">-=</span> <span class="token number">10</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	s <span class="token operator">=</span> a <span class="token operator">+</span> b
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当有多个defer描述的函数时，就会像栈一样先进后出的顺序执行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
2
5
4
3
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延迟调用通常用于释放文件资源，关闭网络连接等操作，还有一个用法是捕获<code>panic</code>，不过这是错误处理一节中才会涉及到的东西。</p><h3 id="循环" tabindex="-1"><a class="header-anchor" href="#循环" aria-hidden="true">#</a> 循环</h3><p>虽然没有明令禁止，一般建议不要在for循环中使用defer，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	n <span class="token operator">:=</span> <span class="token number">5</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> n <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>4
3
2
1
0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码结果是正确的，但过程也许不对。在Go中，每创建一个defer，就需要在当前协程申请一片内存空间。假设在上面例子中不是简单的for n循环，而是一个较为复杂的数据处理流程，当外部请求数突然激增时，那么在短时间内就会创建大量的defer，在循环次数很大或次数不确定时，就可能会导致内存占用突然暴涨，这种我们一般称之为内存泄漏。</p><br><h3 id="参数预计算" tabindex="-1"><a class="header-anchor" href="#参数预计算" aria-hidden="true">#</a> 参数预计算</h3><p>对于延迟调用有一些反直觉的细节，比如下面这个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个坑还是非常隐晦的，笔者以前就因为这个坑，半天排查不出来是什么原因，可以猜猜输出是什么，答案如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
3
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能很多人认为是下面这种输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3
2
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照使用者的初衷来说，<code>fmt.Println(Fn1())</code>这部分应该是希望它们在函数体执行结束后再执行，<code>fmt.Println</code>确实是最后执行的，但<code>Fn1()</code>是在意料之外的，下面这个例子的情况就更加明显了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token number">2</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	a <span class="token operator">=</span> <span class="token number">3</span>
	b <span class="token operator">=</span> <span class="token number">4</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的输出一定是3而不是7，如果使用闭包而不是延迟调用，结果又不一样了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token number">2</span>
	f <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	a <span class="token operator">=</span> <span class="token number">3</span>
	b <span class="token operator">=</span> <span class="token number">4</span>
	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>闭包的输出是7，那如果把延迟调用和闭包结合起来呢</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token number">2</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	a <span class="token operator">=</span> <span class="token number">3</span>
	b <span class="token operator">=</span> <span class="token number">4</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次就正常了，输出的是7。下面再改一下，没有闭包了</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token number">2</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	a <span class="token operator">=</span> <span class="token number">3</span>
	b <span class="token operator">=</span> <span class="token number">4</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出又变回3了。通过对比上面几个例子可以发现这段代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>defer fmt.Println(sum(a,b))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其实等价于</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>defer fmt.Println(3)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>go不会等到最后才去调用<code>sum</code>函数，<code>sum</code>函数早在延迟调用被执行以前就被调用了，并作为参数传递了<code>fmt.Println</code>。总结就是，对于<code>defer</code>直接作用的函数而言，它的参数是会被预计算的，这也就导致了第一个例子中的奇怪现象，对于这种情况，尤其是在延迟调用中将函数返回值作为参数的情况尤其需要注意。</p>`,94),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","69.func.html.vue"]]);export{d as default};