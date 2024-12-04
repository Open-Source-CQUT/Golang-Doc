import{_ as o,V as t,W as l,X as s,Y as n,Z as p,a0 as a,F as i}from"./framework-f06be456.js";const c={},d=a(`<h1 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h1><p>常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：</p><ul><li>字面量</li><li>其他常量标识符</li><li>常量表达式</li><li>结果是常量的类型转换</li><li>iota</li></ul><p>常量只能是基本数据类型，不能是</p><ul><li>除基本类型以外的其它类型，如结构体，接口，切片，数组等</li><li>函数的返回值</li></ul><p>常量的值无法被修改，否则无法通过编译</p><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><p>常量的声明需要用到<code>const</code>关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;hello world&quot;</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> numExpression <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">+</span><span class="token number">2</span><span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">%</span> <span class="token number">100</span> <span class="token operator">+</span> num <span class="token comment">// 常量表达式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果仅仅只是声明而不指定值，将会无法通过编译</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译器报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>missing init expr for name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p>批量声明常量可以用<code>()</code>括起来以提升可读性，可以存在多个<code>()</code>达到分组的效果。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Count <span class="token operator">=</span> <span class="token number">1</span>
   Name  <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
   Size <span class="token operator">=</span> <span class="token number">16</span>
   Len  <span class="token operator">=</span> <span class="token number">25</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在同一个常量分组中，在已经赋值的常量后面的常量可以不用赋值，其值默认就是前一个的值，比如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	A <span class="token operator">=</span> <span class="token number">1</span>
	B <span class="token comment">// 1</span>
	C <span class="token comment">// 1</span>
	D <span class="token comment">// 1</span>
	E <span class="token comment">// 1</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iota" tabindex="-1"><a class="header-anchor" href="#iota" aria-hidden="true">#</a> iota</h2><p><code>iota</code>是一个内置的常量标识符，通常用于表示一个常量声明中的无类型整数序数，一般都是在括号中使用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token boolean">iota</span> <span class="token operator">=</span> <span class="token number">0</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看几个使用案例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Num <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// 0</span>
   Num1 <span class="token comment">// 1</span>
   Num2 <span class="token comment">// 2</span>
   Num3 <span class="token comment">// 3</span>
   Num4 <span class="token comment">// 4</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以这么写</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Num <span class="token operator">=</span> <span class="token boolean">iota</span><span class="token operator">*</span><span class="token number">2</span> <span class="token comment">// 0</span>
   Num1 <span class="token comment">// 2</span>
   Num2 <span class="token comment">// 4</span>
   Num3 <span class="token comment">// 6</span>
   Num4 <span class="token comment">// 8</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Num <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span><span class="token operator">*</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 1</span>
   Num1 <span class="token comment">// 13</span>
   Num2 <span class="token comment">// 25</span>
   Num3 <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// 3</span>
   Num4 <span class="token comment">// 4</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面几个例子可以发现，<code>iota</code>是递增的，第一个常量使用<code>iota</code>值的表达式，根据序号值的变化会自动的赋值给后续的常量，直到用新的<code>const</code>重置，这个序号其实就是<strong>代码的相对行号</strong>，是相对于当前分组的起始行号，看下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	Num  <span class="token operator">=</span> <span class="token boolean">iota</span><span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 1 第一行</span>
	Num2 <span class="token operator">=</span> <span class="token boolean">iota</span><span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 13 第二行</span>
	<span class="token boolean">_</span> <span class="token comment">// 25 第三行</span>
	Num3 <span class="token comment">//37 第四行</span>
	Num4 <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// 4 第五行</span>
	<span class="token boolean">_</span> <span class="token comment">// 5 第六行</span>
	Num5 <span class="token comment">// 6 第七行</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中使用了匿名标识符<code>_</code>占了一行的位置，可以看到<code>iota</code>的值本质上就是<code>iota</code>所在行相对于当前<code>const</code>分组的第一行的差值。而不同的<code>const</code>分组则相互不会影响。</p><br><h2 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举" aria-hidden="true">#</a> 枚举</h2><p>Go语言没有为枚举单独设计一个数据类型，不像其它语言通常会有一个<code>enum</code>来表示。一般在Go中，都是通过自定义类型 + const + iota来实现枚举，下面是一个简单的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Season <span class="token builtin">uint8</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	Spring Season <span class="token operator">=</span> <span class="token boolean">iota</span>
	Summer
	Autumn
	Winter
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些枚举实际上就是数字，Go也不支持直接将其转换为字符串，但我们可以通过给自定义类型添加方法来返回其字符串表现形式，实现<code>Stringer</code>接口即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s Season<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> s <span class="token punctuation">{</span>
	<span class="token keyword">case</span> Spring<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;spring&quot;</span>
	<span class="token keyword">case</span> Summer<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;summer&quot;</span>
	<span class="token keyword">case</span> Autumn<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;autumn&quot;</span>
	<span class="token keyword">case</span> Winter<span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">&quot;winter&quot;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),r={href:"https://pkg.go.dev/golang.org/x/tools/cmd/stringer",target:"_blank",rel:"noopener noreferrer"},u=a(`<p>不过它有以下缺点：</p><ul><li><p>类型不安全，因为<code>Season</code>是自定义类型，可以通过强制类型转换将其他数字也转换成该类型</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">Season</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>繁琐，字符串表现形式需要自己实现</p></li><li><p>表达能力弱，因为<code>const</code>仅支持基本数据类型，所以这些枚举值也只能用字符串和数字来进行表示</p></li></ul><p>为什么不在语言层面支持枚举是笔者非常不能理解的一件事，我认为这绝对是利大于弊的。</p>`,3);function m(v,k){const e=i("ExternalLinkIcon");return t(),l("div",null,[d,s("p",null,[n("这样一来就是一个简单的枚举实现了。你也可以通过官方工具"),s("a",r,[n("Stringer"),p(e)]),n("来自动生成枚举。")]),u])}const g=o(c,[["render",m],["__file","30.constant.html.vue"]]);export{g as default};
