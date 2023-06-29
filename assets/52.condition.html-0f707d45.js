import{_ as n,V as s,W as a,Z as e}from"./framework-44a66fc7.js";const p={},t=e(`<h1 id="条件控制" tabindex="-1"><a class="header-anchor" href="#条件控制" aria-hidden="true">#</a> 条件控制</h1><p>在Go中，条件控制语句总共有三种<code>if</code>，<code>switch</code>，<code>select</code>。<code>select</code>相对前两者而言比较特殊，本节不会讲解，将会留到并发那一节再做介绍。</p><br><h2 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else" aria-hidden="true">#</a> if else</h2><p><code>if else </code>至多两个判断分支，语句格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> expression <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> expression <span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>expression</code>必须是一个布尔表达式，即结果要么为真要么为假，必须是一个布尔值，例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   a<span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
   <span class="token keyword">if</span> a <span class="token operator">&gt;</span> b <span class="token punctuation">{</span>
      b<span class="token operator">++</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      a<span class="token operator">++</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以把表达式写的更复杂些，必要时为了提高可读性，应当使用括号来显式的表示谁应该优先计算。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   a<span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>
    <span class="token keyword">if</span> a<span class="token operator">&lt;&lt;</span><span class="token number">1</span><span class="token operator">%</span><span class="token number">100</span><span class="token operator">+</span><span class="token number">3</span> <span class="token operator">&gt;</span> b<span class="token operator">*</span><span class="token number">100</span><span class="token operator">/</span><span class="token number">20</span><span class="token operator">+</span><span class="token number">6</span> <span class="token punctuation">{</span> <span class="token comment">// (a&lt;&lt;1%100)+3 &gt; (b*100/20)+6</span>
      b<span class="token operator">++</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      a<span class="token operator">++</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时<code>if</code>语句也可以包含一些简单的语句，例如：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> x <span class="token operator">:=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> x <span class="token operator">&gt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="else-if" tabindex="-1"><a class="header-anchor" href="#else-if" aria-hidden="true">#</a> else if</h2><p><code>else if</code> 语句可以在<code>if else</code>的基础上创建更多的判断分支，语句格式如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> expression1 <span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> expression2 <span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> expression3 <span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行的过程中每一个表达式的判断是从左到右，整个<code>if</code>语句的判断是从上到下 。一个根据成绩打分的例子如下，第一种写法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   score <span class="token operator">:=</span> <span class="token number">90</span>
   <span class="token keyword">var</span> ans <span class="token builtin">string</span>
   <span class="token keyword">if</span> score <span class="token operator">==</span> <span class="token number">100</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;S&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">90</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">100</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;A&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">80</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">90</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;B&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">70</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">80</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;C&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">60</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">70</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;E&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">60</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;F&quot;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      ans <span class="token operator">=</span> <span class="token string">&quot;nil&quot;</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ans<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种写法利用了<code>if</code>语句是从上到下的判断的前提，所以代码要更简洁些。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	score <span class="token operator">:=</span> <span class="token number">90</span>
	<span class="token keyword">var</span> ans <span class="token builtin">string</span>
	<span class="token keyword">if</span> score <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> score <span class="token operator">&lt;</span> <span class="token number">60</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;F&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&lt;</span> <span class="token number">70</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;D&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&lt;</span> <span class="token number">80</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;C&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&lt;</span> <span class="token number">90</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;B&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">&lt;</span> <span class="token number">100</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;A&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> score <span class="token operator">==</span> <span class="token number">100</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token string">&quot;S&quot;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        ans <span class="token operator">=</span> <span class="token string">&quot;nil&quot;</span>
    <span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ans<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h2><p><code>switch</code>语句也是一种多分支的判断语句，语句格式如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">switch</span> expr <span class="token punctuation">{</span>
	<span class="token keyword">case</span> case1<span class="token punctuation">:</span>
		statement1
	<span class="token keyword">case</span> case2<span class="token punctuation">:</span>
		statement2
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">default</span> statement
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个简单的例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   str <span class="token operator">:=</span> <span class="token string">&quot;a&quot;</span>
   <span class="token keyword">switch</span> str <span class="token punctuation">{</span>
   <span class="token keyword">case</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">:</span>
      str <span class="token operator">+=</span> <span class="token string">&quot;a&quot;</span>
      str <span class="token operator">+=</span> <span class="token string">&quot;c&quot;</span>
   <span class="token keyword">case</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">:</span>
      str <span class="token operator">+=</span> <span class="token string">&quot;bb&quot;</span>
      str <span class="token operator">+=</span> <span class="token string">&quot;aaaa&quot;</span>
   <span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token comment">// 当所有case都不匹配后，就会执行default分支</span>
      str <span class="token operator">+=</span> <span class="token string">&quot;CCCC&quot;</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以在表达式之前编写一些简单语句，例如声明新变量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> num <span class="token operator">:=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">{</span> <span class="token comment">// 等价于 switch num := f(); true {</span>
	<span class="token keyword">case</span> num <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span>
		num<span class="token operator">++</span>
	<span class="token keyword">case</span> num <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
		num<span class="token operator">--</span>
		<span class="token keyword">fallthrough</span>
	<span class="token keyword">case</span> num <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
		num <span class="token operator">+=</span> num
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>switch</code>语句也可以没有入口处的表达式。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   num <span class="token operator">:=</span> <span class="token number">2</span>
   <span class="token keyword">switch</span> <span class="token punctuation">{</span> <span class="token comment">// 等价于 switch true { </span>
   <span class="token keyword">case</span> num <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span>
      num<span class="token operator">++</span>
   <span class="token keyword">case</span> num <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
      num<span class="token operator">--</span>
   <span class="token keyword">case</span> num <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
      num <span class="token operator">*=</span> num
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>fallthrough</code>关键字来继续执行相邻的下一个分支。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   num <span class="token operator">:=</span> <span class="token number">2</span>
   <span class="token keyword">switch</span> <span class="token punctuation">{</span>
   <span class="token keyword">case</span> num <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> num <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span>
      num<span class="token operator">++</span>
   <span class="token keyword">case</span> num <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
      num<span class="token operator">--</span>
      <span class="token keyword">fallthrough</span> <span class="token comment">// 执行完该分支后，会继续执行下一个分支</span>
   <span class="token keyword">case</span> num <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
      num <span class="token operator">+=</span> num
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="label" tabindex="-1"><a class="header-anchor" href="#label" aria-hidden="true">#</a> label</h2><p>标签语句，给一个代码块打上标签，可以是<code>goto</code>，<code>break</code>，<code>continue</code>的目标。例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	A<span class="token punctuation">:</span> 
		a <span class="token operator">:=</span> <span class="token number">1</span>
	B<span class="token punctuation">:</span>
		b <span class="token operator">:=</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单纯的使用标签是没有任何意义的，需要结合其他关键字来进行使用。</p><br><h2 id="goto" tabindex="-1"><a class="header-anchor" href="#goto" aria-hidden="true">#</a> goto</h2><p><code>goto</code>将控制权传递给在<strong>同一函数</strong>中<strong>对应标签</strong>的语句，示例如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   a <span class="token operator">:=</span> <span class="token number">1</span>
   <span class="token keyword">if</span> a <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
      <span class="token keyword">goto</span> A
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
A<span class="token punctuation">:</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在实际应用中<code>goto</code>用的很少，跳来跳去的很降低代码可读性，性能消耗也是一个问题。</p>`,44),o=[t];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","52.condition.html.vue"]]);export{r as default};
