import{_ as n,V as s,W as a,a0 as e}from"./framework-f06be456.js";const o={},l=e(`<h1 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h1><p>常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：</p><ul><li>字面量</li><li>其他常量标识符</li><li>常量表达式</li><li>结果是常量的类型转换</li><li>iota</li></ul><p>常量只能是基本数据类型，不能是</p><ul><li>除基本类型以外的其它类型，如结构体，接口，切片，数组等</li><li>函数的返回值</li></ul><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><p>常量的声明需要用到<code>const</code>关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span> <span class="token comment">// 字面量</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面几个例子可以发现，<code>iota</code>是递增的，第一个常量使用<code>iota</code>值的表达式，根据序号值的变化会自动的赋值给后续的常量，直到用新的<code>iota</code>重置，这个序号其实就是<strong>代码的相对行号</strong>，是相对于当前分组的起始行号，看下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,35),t=[l];function p(i,c){return s(),a("div",null,t)}const r=n(o,[["render",p],["__file","30.constant.html.vue"]]);export{r as default};
