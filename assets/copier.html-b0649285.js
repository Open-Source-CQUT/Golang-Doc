import{_ as e,V as p,W as o,X as n,Y as s,$ as t,Z as i,F as c}from"./framework-44a66fc7.js";const u={},l=n("h1",{id:"copier",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#copier","aria-hidden":"true"},"#"),s(" copier")],-1),d={href:"https://github.com/jinzhu/copier",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github.com/jinzhu/copier#readme",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"copier是一个用于在go中进行类型复制的库，多用于结构体之间的转换。作者和gorm是同一个，它具有以下特点",-1),v=n("ul",null,[n("li",null,"深拷贝"),n("li",null,"复制同名的字段"),n("li",null,"复制切片"),n("li",null,"复制map"),n("li",null,"复制方法")],-1),m={href:"https://github.com/jmattheis/goverter",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> go get github.com/jinzhu/copier 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>这个库使用起来非常简单，但却非常的实用。它只对外暴露两个函数，一个是<code>copier.Copy</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Copy</span><span class="token punctuation">(</span>toValue <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> fromValue <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一个是<code>copier.CopyWithOption</code>，后者可以对复制行为进行一些自定义的配置，在默认情况下不会进行深拷贝。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Option <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	IgnoreEmpty   <span class="token builtin">bool</span>
	CaseSensitive <span class="token builtin">bool</span>
	DeepCopy      <span class="token builtin">bool</span>
	FieldNameMapping <span class="token punctuation">[</span><span class="token punctuation">]</span>FieldNameMapping
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CopyWithOption</span><span class="token punctuation">(</span>toValue <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> fromValue <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> opt Option<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面演示一个不同类型结构体转换的例子，其中的<code>User</code>和<code>Student</code>结构体是两个完全不同的类型，没有任何的关联。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id   <span class="token builtin">string</span>
	Name <span class="token builtin">string</span>
	<span class="token comment">// 当作为目标结构体时，忽略该字段</span>
	Address <span class="token builtin">string</span> <span class="token string">\`copier:&quot;-&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// 指定字段名</span>
	StudentId   <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Id&quot;\`</span>
	StudentName <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Name&quot;\`</span>
	Address     <span class="token builtin">string</span>
	School      <span class="token builtin">string</span>
	Class       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
		StudentId<span class="token punctuation">:</span>   <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
		StudentName<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
		Address<span class="token punctuation">:</span>     <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
		School<span class="token punctuation">:</span>      <span class="token string">&quot;MIT&quot;</span><span class="token punctuation">,</span>
		Class<span class="token punctuation">:</span>       <span class="token string">&quot;AI&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> copier<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> <span class="token operator">&amp;</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> student<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}
{Id:123 Name:jack Address:}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看复制切片</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	student <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Student<span class="token punctuation">{</span>
		<span class="token punctuation">{</span>
			StudentId<span class="token punctuation">:</span>   <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
			StudentName<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
			Address<span class="token punctuation">:</span>     <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
			School<span class="token punctuation">:</span>      <span class="token string">&quot;MIT&quot;</span><span class="token punctuation">,</span>
			Class<span class="token punctuation">:</span>       <span class="token string">&quot;AI&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>
			StudentId<span class="token punctuation">:</span>   <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
			StudentName<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
			Address<span class="token punctuation">:</span>     <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
			School<span class="token punctuation">:</span>      <span class="token string">&quot;MIT&quot;</span><span class="token punctuation">,</span>
			Class<span class="token punctuation">:</span>       <span class="token string">&quot;AI&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> user <span class="token punctuation">[</span><span class="token punctuation">]</span>User
	<span class="token keyword">if</span> err <span class="token operator">:=</span> copier<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> <span class="token operator">&amp;</span>student<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> student<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} {StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
[{Id:123 Name:jack Address:} {Id:123 Name:jack Address:}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>复制map</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id   <span class="token builtin">string</span>
	Name <span class="token builtin">string</span>
	<span class="token comment">// 当作为目标结构体时，忽略该字段</span>
	Address <span class="token builtin">string</span> <span class="token string">\`copier:&quot;-&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// 指定字段名</span>
	StudentId   <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Id&quot;\`</span>
	StudentName <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Name&quot;\`</span>
	Address     <span class="token builtin">string</span>
	School      <span class="token builtin">string</span>
	Class       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
		StudentId<span class="token punctuation">:</span>   <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
		StudentName<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
		Address<span class="token punctuation">:</span>     <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
		School<span class="token punctuation">:</span>      <span class="token string">&quot;MIT&quot;</span><span class="token punctuation">,</span>
		Class<span class="token punctuation">:</span>       <span class="token string">&quot;AI&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	src <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>Student<span class="token punctuation">)</span>
	src<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> student
	src<span class="token punctuation">[</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> student

	dest <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>User<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">:=</span> copier<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dest<span class="token punctuation">,</span> <span class="token operator">&amp;</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> dest<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>map[a:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} b:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
map[a:{Id:123 Name:jack Address:} b:{Id:123 Name:jack Address:}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义" tabindex="-1"><a class="header-anchor" href="#自定义" aria-hidden="true">#</a> 自定义</h2><p>还可以自定义转换方法，只需要传入<code>copier.TypeConverter</code>即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> TypeConverter <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	SrcType <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	DstType <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	Fn      <span class="token keyword">func</span><span class="token punctuation">(</span>src <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>dst <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id   <span class="token builtin">string</span>
	Name <span class="token builtin">string</span>
	<span class="token comment">// 当作为目标结构体时，忽略该字段</span>
	Address <span class="token builtin">string</span> <span class="token string">\`copier:&quot;-&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// 指定字段名</span>
	StudentId   <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Id&quot;\`</span>
	StudentName <span class="token builtin">string</span> <span class="token string">\`copier:&quot;Name&quot;\`</span>
	Address     <span class="token builtin">string</span>
	School      <span class="token builtin">string</span>
	Class       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
		StudentId<span class="token punctuation">:</span>   <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
		StudentName<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
		Address<span class="token punctuation">:</span>     <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
		School<span class="token punctuation">:</span>      <span class="token string">&quot;MIT&quot;</span><span class="token punctuation">,</span>
		Class<span class="token punctuation">:</span>       <span class="token string">&quot;AI&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	src <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>Student<span class="token punctuation">)</span>
	src<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> student
	src<span class="token punctuation">[</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> student

	dest <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>User<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">:=</span> copier<span class="token punctuation">.</span><span class="token function">CopyWithOption</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dest<span class="token punctuation">,</span> <span class="token operator">&amp;</span>src<span class="token punctuation">,</span> copier<span class="token punctuation">.</span>Option<span class="token punctuation">{</span>
		IgnoreEmpty<span class="token punctuation">:</span>   <span class="token boolean">false</span><span class="token punctuation">,</span>
		CaseSensitive<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
		DeepCopy<span class="token punctuation">:</span>      <span class="token boolean">false</span><span class="token punctuation">,</span>
		Converters<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>copier<span class="token punctuation">.</span>TypeConverter<span class="token punctuation">{</span>
			<span class="token punctuation">{</span>
				SrcType<span class="token punctuation">:</span> Student<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
				DstType<span class="token punctuation">:</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
				Fn<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>src <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>dst <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					s<span class="token punctuation">,</span> ok <span class="token operator">:=</span> src<span class="token punctuation">.</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span>
					<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
						<span class="token keyword">return</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;error type&quot;</span><span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">return</span> User<span class="token punctuation">{</span>
						Id<span class="token punctuation">:</span> s<span class="token punctuation">.</span>StudentId<span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		FieldNameMapping<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> dest<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>map[a:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI} b:{StudentId:123 StudentName:jack Address:usa School:MIT Class:AI}]
map[a:{Id:123 Name: Address:} b:{Id:123 Name: Address:}]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function g(q,f){const a=c("ExternalLinkIcon");return p(),o("div",null,[l,n("p",null,[s("开源仓库："),n("a",d,[s("jinzhu/copier: Copier for golang, copy value from struct to struct and more (github.com)"),t(a)])]),n("p",null,[s("文档地址："),n("a",r,[s("jinzhu/copier: Copier for golang, copy value from struct to struct and more (github.com)"),t(a)])]),k,v,n("p",null,[s("由于copier的复制依赖于反射，所以性能上会有一定的损失。一般这种类型复制的库分成两类，一类基于反射，也是就copier这种，另一类是基于代码生成，通过生成类型转换的代码，这种方法性能不会造成损失，类似实现的库有"),n("a",m,[s("jmattheis/goverter"),t(a)]),s("。")]),b])}const y=e(u,[["render",g],["__file","copier.html.vue"]]);export{y as default};
