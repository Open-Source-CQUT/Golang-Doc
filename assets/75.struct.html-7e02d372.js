import{_ as p,V as i,W as o,X as n,Y as a,Z as e,a0 as t,F as c}from"./framework-f06be456.js";const l="/images/essential/struct_mem_1.png",u="/images/essential/struct_mem_2.png",d="/images/essential/struct_mem_3.png",r={},k=t(`<h1 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h1><p>结构体可以存储一组不同类型的数据，是一种复合类型。Go抛弃了类与继承，同时也抛弃了构造方法，刻意弱化了面向对象的功能，Go并非是一个传统OOP的语言，但是Go依旧有着OOP的影子，通过结构体和方法也可以模拟出一个类。下面是一个简单的结构体的例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Programmer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span>
	Age      <span class="token builtin">int</span>
	Job      <span class="token builtin">string</span>
	Language <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h2><p>结构体的声明非常简单，例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
   age <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体本身以及其内部的字段都遵守大小写命名的暴露方式。对于一些类型相同的相邻字段，可以不需要重复声明类型，如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Rectangle <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	height<span class="token punctuation">,</span> width<span class="token punctuation">,</span> area <span class="token builtin">int</span>
	color               <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在声明结构体字段时，字段名不能与方法名重复</p></div><br><h2 id="实例化" tabindex="-1"><a class="header-anchor" href="#实例化" aria-hidden="true">#</a> 实例化</h2><p>Go不存在构造方法，大多数情况下采用如下的方式来实例化结构体，初始化的时候就像<code>map</code>一样指定字段名称再初始化字段值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>programmer <span class="token operator">:=</span> Programmer<span class="token punctuation">{</span>
   Name<span class="token punctuation">:</span>     <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   Age<span class="token punctuation">:</span>      <span class="token number">19</span><span class="token punctuation">,</span>
   Job<span class="token punctuation">:</span>      <span class="token string">&quot;coder&quot;</span><span class="token punctuation">,</span>
   Language<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过也可以省略字段名称，当省略字段名称时，就必须初始化所有字段，通常不建议使用这种方式，因为可读性很糟糕。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>programmer <span class="token operator">:=</span> Programmer<span class="token punctuation">{</span>
   <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   <span class="token number">19</span><span class="token punctuation">,</span>
   <span class="token string">&quot;coder&quot;</span><span class="token punctuation">,</span>
   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果实例化过程比较复杂，你也可以编写一个函数来实例化结构体，就像下面这样，你也可以把它理解为一个构造函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name    <span class="token builtin">string</span>
	Age     <span class="token builtin">int</span>
	Address <span class="token builtin">string</span>
	Salary  <span class="token builtin">float64</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> address <span class="token builtin">string</span><span class="token punctuation">,</span> salary <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span> Age<span class="token punctuation">:</span> age<span class="token punctuation">,</span> Address<span class="token punctuation">:</span> address<span class="token punctuation">,</span> Salary<span class="token punctuation">:</span> salary<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过Go并不支持函数与方法重载，所以你无法为同一个函数或方法定义不同的参数。如果你想以多种方式实例化结构体，要么创建多个构造函数，要么建议使用options模式。</p><h3 id="选项模式" tabindex="-1"><a class="header-anchor" href="#选项模式" aria-hidden="true">#</a> 选项模式</h3><p>选项模式是Go语言中一种很常见的设计模式，可以更为灵活的实例化结构体，拓展性强，并且不需要改变构造函数的函数签名。假设有下面这样一个结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span>
	Age      <span class="token builtin">int</span>
	Address  <span class="token builtin">string</span>
	Salary   <span class="token builtin">float64</span>
	Birthday <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>声明一个<code>PersonOptions</code>类型，它接受一个<code>*Person</code>类型的参数，它必须是指针，因为我们要在闭包中对Person赋值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> PersonOptions <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来创建选项函数，它们一般是<code>With</code>开头，它们的返回值就是一个闭包函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> PersonOptions <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Name <span class="token operator">=</span> name
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithAge</span><span class="token punctuation">(</span>age <span class="token builtin">int</span><span class="token punctuation">)</span> PersonOptions <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Age <span class="token operator">=</span> age
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithAddress</span><span class="token punctuation">(</span>address <span class="token builtin">string</span><span class="token punctuation">)</span> PersonOptions <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Address <span class="token operator">=</span> address
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithSalary</span><span class="token punctuation">(</span>salary <span class="token builtin">float64</span><span class="token punctuation">)</span> PersonOptions <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Salary <span class="token operator">=</span> salary
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际声明的构造函数签名如下，它接受一个可变长<code>PersonOptions</code>类型的参数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>options <span class="token operator">...</span>PersonOptions<span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
    <span class="token comment">// 优先应用options</span>
	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> options <span class="token punctuation">{</span>
        <span class="token function">option</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
	
	<span class="token comment">// 默认值处理</span>
	<span class="token keyword">if</span> p<span class="token punctuation">.</span>Age <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		p<span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token punctuation">}</span>
	<span class="token operator">...</span><span class="token operator">...</span>
	
    <span class="token keyword">return</span> p
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来对于不同实例化的需求只需要一个构造函数即可完成，只需要传入不同的Options函数即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	pl <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>
		<span class="token function">WithName</span><span class="token punctuation">(</span><span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithAddress</span><span class="token punctuation">(</span><span class="token string">&quot;123 Main St&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithSalary</span><span class="token punctuation">(</span><span class="token number">10000.00</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>

	p2 <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>
		<span class="token function">WithName</span><span class="token punctuation">(</span><span class="token string">&quot;Mike jane&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数式选项模式在很多开源项目中都能看见，gRPC Server的实例化方式也是采用了该设计模式。函数式选项模式只适合于复杂的实例化，如果参数只有简单几个，建议还是用普通的构造函数来解决。</p><br><h2 id="组合" tabindex="-1"><a class="header-anchor" href="#组合" aria-hidden="true">#</a> 组合</h2><p>在Go中，结构体之间的关系是通过组合来表示的，可以显式组合，也可以匿名组合，后者使用起来更类似于继承，但本质上没有任何变化。例如：</p><p>显式组合的方式</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
   age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   p      Person
   school <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Employee <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   p   Person
   job <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用时需要显式的指定字段<code>p</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
   p<span class="token punctuation">:</span>      Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   school<span class="token punctuation">:</span> <span class="token string">&quot;lili school&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而匿名组合可以不用显式的指定字段</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Person
	school <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Employee <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Person
	job <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匿名字段的名称默认为类型名，调用者可以直接访问该类型的字段和方法，但除了更加方便以外与第一种方式没有任何的区别。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
   Person<span class="token punctuation">:</span> Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   school<span class="token punctuation">:</span> <span class="token string">&quot;lili school&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2><p>对于结构体指针而言，不需要解引用就可以直接访问结构体的内容，例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
   name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>age<span class="token punctuation">,</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译的时候会转换为<code>(*p).name</code> ，<code>(*p).age</code>，其实还是需要解引用，不过在编码的时候可以省去，算是一种语法糖。</p><br><h2 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h2><p>结构体标签是一种元编程的形式，结合反射可以做出很多奇妙的功能，格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token string">\`key1:&quot;val1&quot; key2:&quot;val2&quot;\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>标签是一种键值对的形式，使用空格进行分隔。结构体标签的容错性很低，如果没能按照正确的格式书写结构体，那么将会导致无法正常读取，但是在编译时却不会有任何的报错，下方是一个使用示例。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Programmer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name     <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
    Age      <span class="token builtin">int</span> <span class="token string">\`yaml:&quot;age&quot;\`</span>
    Job      <span class="token builtin">string</span> <span class="token string">\`toml:&quot;job&quot;\`</span>
    Language <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`properties:&quot;language&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体标签最广泛的应用就是在各种序列化格式中的别名定义，标签的使用需要结合反射才能完整发挥出其功能。</p><h2 id="内存对齐" tabindex="-1"><a class="header-anchor" href="#内存对齐" aria-hidden="true">#</a> 内存对齐</h2><p>Go结构体字段的内存分布遵循内存对齐的规则，这么做可以减少CPU访问内存的次数，相应的占用的内存要多一些，属于空间换时间的一种手段。假设有如下结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Num <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	A <span class="token builtin">int64</span>
	B <span class="token builtin">int32</span>
	C <span class="token builtin">int16</span>
	D <span class="token builtin">int8</span>
    E <span class="token builtin">int32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>已知这些类型的占用字节数</p><ul><li><code>int64</code>占8个字节</li><li><code>int32</code>占4个字节</li><li><code>int16</code>占2字节</li><li><code>int8</code>占一个字节</li></ul><p>整个结构体的内存占用似乎是8+4+2+1+4=19个字节吗，当然不是这样，根据内存对齐规则而言，结构体的内存占用长度至少是最大字段的整数倍，不足的则补齐。该结构体中最大的是<code>int64</code>占用8个字节，那么内存分布如下图所示</p><figure><img src="`+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>所以实际上是占用24个字节，其中有5个字节是无用的。</p><p>再来看下面这个结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Num <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	A <span class="token builtin">int8</span>
	B <span class="token builtin">int64</span>
	C <span class="token builtin">int8</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>明白了上面的规则后，可以很快的理解它的内存占用也是24个字节，尽管它只有三个字段，足足浪费了14个字节。</p><figure><img src="`+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但是我们可以调整字段，改成如下的顺序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type Num struct {
	A int8
	C int8
	B int64
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此一来就占用的内存就变为了16字节，浪费了6个字节，减少了8个字节的内存浪费。</p><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>从理论上来说，让结构体中的字段按照合理的顺序分布，可以减少其内存占用。不过实际编码过程中，并没有必要的理由去这样做，它不一定能在减少内存占用这方面带来实质性的提升，但一定会提高开发人员的血压和心智负担，尤其是在业务中一些结构体的字段数可能多大几十个或者数百个，所以仅做了解即可。</p>',70),v={class:"hint-container tip"},m=n("p",{class:"hint-container-title"},"提示",-1),b=n("p",null,"如果你真的想通过此种方法来节省内存，可以看看这两个库",-1),g={href:"https://github.com/dkorunic/betteralign",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/dominikh/go-tools",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,"他们会检查你的源代码中的结构体，计算并重新排布结构体字段来最小化结构体占用的内存。",-1),f=t(`<h2 id="空结构体" tabindex="-1"><a class="header-anchor" href="#空结构体" aria-hidden="true">#</a> 空结构体</h2><p>空结构体没有字段，不占用内存空间，我们可以通过<code>unsafe.SizeOf</code>函数来计算占用的字节大小</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">type</span> Empty <span class="token keyword">struct</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>Empty<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>空结构体的使用场景有很多，比如之前提到过的，作为<code>map</code>的值类型，可以将<code>map</code>作为<code>set</code>来进行使用，又或者是作为通道的类型，表示仅做通知类型的通道。</p>`,6);function w(P,x){const s=c("ExternalLinkIcon");return i(),o("div",null,[k,n("div",v,[m,b,n("ul",null,[n("li",null,[n("a",g,[a("BetterAlign"),e(s)])]),n("li",null,[n("a",h,[a("go-tools"),e(s)])])]),y]),f])}const q=p(r,[["render",w],["__file","75.struct.html.vue"]]);export{q as default};
