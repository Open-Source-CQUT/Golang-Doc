import{_ as e,V as o,W as t,X as n,Y as s,Z as p,a0 as l,F as c}from"./framework-f06be456.js";const i={},d=n("h1",{id:"常量",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#常量","aria-hidden":"true"},"#"),s(" 常量")],-1),r=n("p",null,"常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：",-1),u=n("li",null,"字面量",-1),m=n("li",null,"其他常量标识符",-1),v=n("li",null,"常量表达式",-1),k=n("li",null,"结果是常量的类型转换",-1),b=n("li",null,"iota",-1),g={href:"https://go.dev/ref/spec#Constants",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>除此之外，常量不能是其他类型，例如切片这类派生类型。</p><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><p>常量的声明需要用到<code>const</code>关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;hello world&quot;</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 字面量</span>

<span class="token keyword">const</span> numExpression <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">+</span><span class="token number">2</span><span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">%</span> <span class="token number">100</span> <span class="token operator">+</span> num <span class="token comment">// 常量表达式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果仅仅只是声明而不指定值，将会无法通过编译</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译器报错</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>main<span class="token punctuation">.</span><span class="token keyword">go</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">:</span><span class="token number">7</span><span class="token punctuation">:</span> missing init expr <span class="token keyword">for</span> name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p>批量声明常量可以用<code>()</code>括起来以提升可读性，可以存在多个<code>()</code>达到分组的效果。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Count <span class="token operator">=</span> <span class="token number">1</span>
   Name  <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
   Size <span class="token operator">=</span> <span class="token number">16</span>
   Len  <span class="token operator">=</span> <span class="token number">25</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iota" tabindex="-1"><a class="header-anchor" href="#iota" aria-hidden="true">#</a> iota</h2><p><code>iota</code>是一个内置的常量标识符，通常用于表示一个常量声明中的无类型整数序数，一般都是在括号中使用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token boolean">iota</span> <span class="token operator">=</span> <span class="token number">0</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先看几个例子，看看规律。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面几个例子可以发现，<code>iota</code>受一种序号的变化而变化，第一个常量使用<code>iota</code>值的表达式，根据序号值的变化会自动的赋值给后续的常量，直到用新的<code>iota</code>重置，这个序号其实就是<strong>代码的相对行号</strong>，是相对于当前分组的起始行号，看下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	Num  <span class="token operator">=</span> <span class="token boolean">iota</span><span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 1 第一行</span>
	Num2 <span class="token operator">=</span> <span class="token boolean">iota</span><span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 13 第二行</span>
	<span class="token boolean">_</span> <span class="token comment">// 25 第三行</span>
	Num3 <span class="token comment">//37 第四行</span>
	Num4 <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// 4 第五行</span>
	<span class="token boolean">_</span> <span class="token comment">// 5 第六行</span>
	Num5 <span class="token comment">// 6 第七行</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中使用了匿名标识符<code>_</code>占了一行的位置，可以看到<code>iota</code>的值本质上就是<code>iota</code>所在行相对于当前<code>const</code>分组的第一行的差值。而不同的<code>const</code>分组则相互不会影响。</p><br><h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2><p>常量的值无法被修改，如果尝试对其进行修改的话将会无法通过编译。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
   Size <span class="token operator">=</span> <span class="token number">16</span>
   Len  <span class="token operator">=</span> <span class="token number">25</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   Size<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main.go:17:2: cannot assign to Size (untyped int constant 16)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p>虽然数字常量在Go语言中可以为任意精度，但是具体实现还是有以下限制：</p><ul><li><p>表示整型常量时至少有256 bits、</p></li><li><p>表示浮点数和复数时，尾数部分至少256 bits，二进制指数部分至少16 bits</p></li><li><p>当无法表示相应的精度时，浮点数会进行相应的舍入。</p></li></ul>`,32);function _(x,N){const a=c("ExternalLinkIcon");return o(),t("div",null,[d,r,n("ul",null,[u,m,v,k,b,n("li",null,[s("还有一些并不适合基础教程，前往"),n("a",g,[s("参考手册-常量"),p(a)]),s("了解更多细节")])]),h])}const w=e(i,[["render",_],["__file","30.constant.html.vue"]]);export{w as default};
