import{_ as l,V as c,W as t,X as s,Y as n,$ as i,Z as a,F as o}from"./framework-44a66fc7.js";const p={},d=a(`<h1 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h1><p>Go的基本语法十分简洁且简单，下面通过一个简单的示例来进行讲解。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello 世界!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>package</code>关键字代表的是当前go文件属于哪一个包，启动文件通常是<code>main</code>包，启动函数是<code>main</code>函数，在自定义包和函数时命名应当尽量避免与之重复。</p><p><code>import</code>是导入关键字，后面跟着的是被导入的包名。</p><p><code>func</code>是函数声明关键字，用于声明一个函数。</p><p><code>fmt.Println(&quot;Hello 世界!&quot;)</code>是一个语句，调用了<code>fmt</code>包下的<code>Println</code>函数进行控制台输出。</p><br><p>以上就是一个简单的语法介绍。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>本站所有的Go教程，均采用1.19及以上的版本。</p></div><h2 id="包" tabindex="-1"><a class="header-anchor" href="#包" aria-hidden="true">#</a> 包</h2><p>在Go中，程序是通过将包链接在一起来构建的，也可以理解为最基本的调用单位是包，而不是go文件。包其实就是一个文件夹，包内共享所有源文件的变量，常量，函数以及其他类型。包的命名风格建议都是小写字母，并且要尽量简短。</p><br><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3><p>例如创建一个<code>example</code>包，包下有如下函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> example

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>main</code>函数中调用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;example&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   example<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以给包起别名</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> e <span class="token string">&quot;example&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   e<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>批量导入时，可以使用括号<code>()</code>来表示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">&quot;fmt&quot;</span>
   <span class="token string">&quot;math&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者说只导入不调用，通常这么做是为了调用该包下的<code>init</code>函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token string">&quot;fmt&quot;</span>
    <span class="token boolean">_</span> <span class="token string">&quot;math&quot;</span> <span class="token comment">// 下划线表示匿名导入</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>在Go中完全禁止循环导入，不管是直接的还是间接的。例如包A导入了包B，包B也导入了包A，这是直接循环导入，包A导入了包C，包C导入了包B，包B又导入了包A，这就是间接的循环导入，存在循环导入的话将会无法通过编译。</p></div><br><h3 id="导出" tabindex="-1"><a class="header-anchor" href="#导出" aria-hidden="true">#</a> 导出</h3><p>在Go中，导出和访问控制是通过命名来进行实现的，如果想要对外暴露一个函数或者一个变量，只需要将其名称首字母大写即可，例如<code>example</code>包下的<code>SayHello</code>函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> example

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// 首字母大写，可以被包外访问</span>
<span class="token keyword">func</span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要不对外暴露的话，只需将名称首字母改为小写即可，例如下方代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> example

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// 首字母小写，外界无法访问</span>
<span class="token keyword">func</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对外暴露的函数和变量可以被包外的调用者导入和访问，如果是不对外暴露的话，那么仅包内的调用者可以访问，外部将无法导入和访问，<strong>该规则适用于整个Go语言</strong>，例如后续会学到的结构体及其字段，方法，自定义类型，接口等等。</p><br><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><p>Go支持单行注释和多行注释，注释与内容之间建议隔一个空格，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 这是main包</span>
<span class="token keyword">package</span> main

<span class="token comment">// 导入了fmt包</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">/*
*
这是启动函数main函数
*/</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 这是一个语句</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello 世界!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="标识符" tabindex="-1"><a class="header-anchor" href="#标识符" aria-hidden="true">#</a> 标识符</h2><p>标识符就是一个名称，用于包命名，函数命名，变量命名等等，命名规则如下：</p><ul><li>只能由字母，数字，下划线组成</li><li>只能以字母和下划线开头</li><li>严格区分大小写</li><li>不能与任何已存在的标识符重复，即包内唯一的存在</li><li>不能与Go任何内置的关键字冲突</li></ul>`,40),r={href:"https://go.dev/ref/spec#Identifiers",target:"_blank",rel:"noopener noreferrer"},u=a(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">break</span>        <span class="token keyword">default</span>      <span class="token keyword">func</span>         <span class="token keyword">interface</span>    <span class="token keyword">select</span>
<span class="token keyword">case</span>         <span class="token keyword">defer</span>        <span class="token keyword">go</span>           <span class="token keyword">map</span>          <span class="token keyword">struct</span>
<span class="token keyword">chan</span>         <span class="token keyword">else</span>         <span class="token keyword">goto</span>         <span class="token keyword">package</span>      <span class="token keyword">switch</span>
<span class="token keyword">const</span>        <span class="token keyword">fallthrough</span>  <span class="token keyword">if</span>           <span class="token keyword">range</span>        <span class="token keyword">type</span>
<span class="token keyword">continue</span>     <span class="token keyword">for</span>          <span class="token keyword">import</span>       <span class="token keyword">return</span>       <span class="token keyword">var</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2>`,3),v={href:"https://go.dev/ref/spec#Operators",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Precedence    Operator
    5             *  /  %  &lt;&lt;  &gt;&gt;  &amp;  &amp;^
    4             +  -  |  ^
    3             ==  !=  &lt;  &lt;=  &gt;  &gt;=
    2             &amp;&amp;
    1             ||
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值运算符</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>a <span class="token operator">+=</span> <span class="token number">1</span>
a <span class="token operator">/=</span> <span class="token number">2</span>
a <span class="token operator">&amp;^=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Go语言中没有自增与自减运算符，它们被降级为了语句<code>statement</code>，并且规定了只能位于操作数的后方，所以不用再去纠结<code>i++</code>和<code>++i</code>这样的问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a++ // 正确
++a // 错误
a-- // 正确
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一点就是，它们不再具有返回值，因此<code>a = b++</code>这类语句的写法是错误的。</p></div><br><h2 id="字面量" tabindex="-1"><a class="header-anchor" href="#字面量" aria-hidden="true">#</a> 字面量</h2><p>字面量，按照计算机科学的术语来讲是用于表达源代码中一个固定值的符号，也叫字面值。两个叫法都是一个意思，写了什么东西，值就是什么，值就是“字面意义上“的值。</p><br><h3 id="整型字面量" tabindex="-1"><a class="header-anchor" href="#整型字面量" aria-hidden="true">#</a> 整型字面量</h3><p>为了便于阅读，允许使用下划线<code>_</code>来进行数字划分，但是仅允许在<strong>前缀符号之后</strong>和<strong>数字之间</strong>使用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token number">24</span> <span class="token comment">// 24</span>
<span class="token number">024</span> <span class="token comment">// 24</span>
<span class="token number">2_4</span> <span class="token comment">// 24</span>
<span class="token number">0_2_4</span> <span class="token comment">// 24</span>
<span class="token number">10_000</span> <span class="token comment">// 10k</span>
<span class="token number">100_000</span> <span class="token comment">// 100k</span>
<span class="token number">0O24</span> <span class="token comment">// 20</span>
<span class="token number">0b00</span> <span class="token comment">// 0</span>
<span class="token number">0x00</span> <span class="token comment">// 0</span>
<span class="token number">0x0_0</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="浮点数字面量" tabindex="-1"><a class="header-anchor" href="#浮点数字面量" aria-hidden="true">#</a> 浮点数字面量</h3><p>通过不同的前缀可以表达不同进制的浮点数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token number">0.</span>
<span class="token number">72.40</span>
<span class="token number">072.40</span>       <span class="token comment">// == 72.40</span>
<span class="token number">2.71828</span>
<span class="token number">1.e+0</span>
<span class="token number">6.67428e-11</span>
<span class="token number">1E6</span>
<span class="token number">.25</span>
<span class="token number">.12345E+5</span>
<span class="token number">1_5.</span>         <span class="token comment">// == 15.0</span>
<span class="token number">0.15e+0_2</span>    <span class="token comment">// == 15.0</span>

<span class="token number">0x1p-2</span>       <span class="token comment">// == 0.25</span>
<span class="token number">0x2.p10</span>      <span class="token comment">// == 2048.0</span>
<span class="token number">0x1.Fp+0</span>     <span class="token comment">// == 1.9375</span>
<span class="token number">0X.8p-0</span>      <span class="token comment">// == 0.5</span>
<span class="token number">0X_1FFFP-16</span>  <span class="token comment">// == 0.1249847412109375</span>
<span class="token number">0x15e</span><span class="token operator">-</span><span class="token number">2</span>      <span class="token comment">// == 0x15e - 2 (integer subtraction)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="复数字面量" tabindex="-1"><a class="header-anchor" href="#复数字面量" aria-hidden="true">#</a> 复数字面量</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token number">0i</span>
<span class="token number">0123i</span>         <span class="token comment">// == 123i</span>
<span class="token number">0o123i</span>        <span class="token comment">// == 0o123 * 1i == 83i</span>
<span class="token number">0xabci</span>        <span class="token comment">// == 0xabc * 1i == 2748i</span>
<span class="token number">0.i</span>
<span class="token number">2.71828i</span>
<span class="token number">1.e+0i</span>
<span class="token number">6.67428e-11i</span>
<span class="token number">1E6i</span>
<span class="token number">.25i</span>
<span class="token number">.12345E+5i</span>
<span class="token number">0x1p-2i</span>       <span class="token comment">// == 0x1p-2 * 1i == 0.25i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="字符字面量" tabindex="-1"><a class="header-anchor" href="#字符字面量" aria-hidden="true">#</a> 字符字面量</h3><p>字符字面量必须使用单引号括起来<code>&#39;&#39;</code>，Go中的字符完全兼容<code>utf8</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token char">&#39;a&#39;</span>
<span class="token char">&#39;ä&#39;</span>
<span class="token char">&#39;你&#39;</span>
<span class="token char">&#39;\\t&#39;</span>
<span class="token char">&#39;\\000&#39;</span>
<span class="token char">&#39;\\007&#39;</span>
<span class="token char">&#39;\\377&#39;</span>
<span class="token char">&#39;\\x07&#39;</span>
<span class="token char">&#39;\\xff&#39;</span>
<span class="token char">&#39;\\u12e4&#39;</span>
<span class="token char">&#39;\\U00101234&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="转义字符" tabindex="-1"><a class="header-anchor" href="#转义字符" aria-hidden="true">#</a> 转义字符</h3><p>Go中可用的转义字符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\\a   U+0007 响铃符号（建议调高音量）
\\b   U+0008 回退符号
\\f   U+000C 换页符号
\\n   U+000A 换行符号
\\r   U+000D 回车符号
\\t   U+0009 横向制表符号
\\v   U+000B 纵向制表符号
\\\\   U+005C 反斜杠转义
\\&#39;   U+0027 单引号转义 (该转义仅在字符内有效)
\\&quot;   U+0022 双引号转义 (该转义仅在字符串内有效)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="字符串字面量" tabindex="-1"><a class="header-anchor" href="#字符串字面量" aria-hidden="true">#</a> 字符串字面量</h3><p>字符串字面量必须使用双引号<code>&quot;&quot;</code>括起来或者反引号（反引号字符串不允许转义）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token string">\`abc\`</span>                <span class="token comment">// &quot;abc&quot;</span>
<span class="token string">\`\\n
\\n\`</span>                  <span class="token comment">// &quot;\\\\n\\n\\\\n&quot;</span>
<span class="token string">&quot;\\n&quot;</span>
<span class="token string">&quot;\\&quot;&quot;</span>                 <span class="token comment">// \`&quot;\`</span>
<span class="token string">&quot;Hello, world!\\n&quot;</span>
<span class="token string">&quot;今天天气不错&quot;</span>
<span class="token string">&quot;日本語&quot;</span>
<span class="token string">&quot;\\u65e5本\\U00008a9e&quot;</span>
<span class="token string">&quot;\\xff\\u00FF&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="风格" tabindex="-1"><a class="header-anchor" href="#风格" aria-hidden="true">#</a> 风格</h2><p>关于编码风格这一块Go是强制所有人统一同一种风格，Go官方提供了一个格式化工具<code>gofmt</code>，通过命令行就可以使用，该格式化工具没有任何的格式化参数可以传递，仅有的两个参数也只是输出格式化过程，所以完全不支持自定义，也就是说所有通过此工具的格式化后的代码都是同一种代码风格，这会极大的降低维护人员的心智负担，所以在这一块追求个性显然是一个不太明智的选择。</p><br><p>下面会简单列举一些规则，平时在编写代码的时候也可以稍微注意一下。</p><ol><li>花括号，关于花括号<code>{}</code>到底该不该换行，几乎每个程序员都能说出属于自己的理由，在Go中所有的花括号都不应该换行。</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 正确示例</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello 世界!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 错误示例</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello 世界!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>缩进，Go默认使用<code>tabs</code>也就是制表符进行缩进，仅在一些特殊情况会使用空格。</p></li><li><p>间隔，Go中大部分间隔都是有意义的，从某种程度上来说，这也代表了编译器是如何看待你的代码的，例如下方的数学运算</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token number">2</span><span class="token operator">*</span><span class="token number">9</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token operator">/</span><span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>众所周知，乘法的优先级比加法要高，在格式化后，<code>*</code>符号之间的间隔会显得更紧凑，意味着优先进行运算，而<code>+</code>符号附近的间隔则较大，代表着较后进行运算。</p></li><li><p>还是花括号，花括号在任何时候都不能够省略，就算是只有一行代码，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 正确示例</span>
<span class="token keyword">if</span> a <span class="token operator">&gt;</span> b <span class="token punctuation">{</span>
	a<span class="token operator">++</span>
<span class="token punctuation">}</span>
<span class="token comment">// 错误示例</span>
<span class="token keyword">if</span> a <span class="token operator">&gt;</span> b a<span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,38);function k(b,g){const e=o("ExternalLinkIcon");return c(),t("div",null,[d,s("p",null,[n("下方列出所有的内置关键字，也可以前往"),s("a",r,[n("参考手册-标识符"),i(e)]),n("查看更多细节")]),u,s("p",null,[n("下面是Go语言中支持的运算符号的优先级排列，也可以前往"),s("a",v,[n("参考手册-运算符"),i(e)]),n("查看更多细节。")]),m])}const f=l(p,[["render",k],["__file","1.grammer.html.vue"]]);export{f as default};
