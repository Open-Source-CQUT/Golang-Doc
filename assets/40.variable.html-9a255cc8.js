import{_ as e,V as i,W as t,X as s,Y as n,Z as p,a0 as l,F as c}from"./framework-f06be456.js";const o={},d=s("h1",{id:"变量",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#变量","aria-hidden":"true"},"#"),n(" 变量")],-1),u={href:"https://go.dev/ref/spec#Variables",target:"_blank",rel:"noopener noreferrer"},r=l(`<br><h2 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h2><p>在go中的类型声明是后置的，变量的声明会用到<code>var</code>关键字，格式为<code>var 变量名 类型名</code>，变量名的命名规则必须遵守标识符的命名规则。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> intNum <span class="token builtin">int</span>
<span class="token keyword">var</span> str <span class="token builtin">string</span>
<span class="token keyword">var</span> char <span class="token builtin">byte</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当要声明多个相同类型的变量时，可以只写一次类型</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> numA<span class="token punctuation">,</span> numB<span class="token punctuation">,</span> numC <span class="token builtin">int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当要声明多个不同类型的变量时，可以使用<code>()</code>进行包裹，可以存在多个<code>()</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
	name    <span class="token builtin">string</span>
	age     <span class="token builtin">int</span>
	address <span class="token builtin">string</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	school <span class="token builtin">string</span>
	class <span class="token builtin">int</span>
<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个变量如果只是声明而不赋值，那么变量存储的值就是对应类型的零值。</p><br><h2 id="赋值" tabindex="-1"><a class="header-anchor" href="#赋值" aria-hidden="true">#</a> 赋值</h2><p>赋值会用到运算符<code>=</code>，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> name <span class="token builtin">string</span>
name <span class="token operator">=</span> <span class="token string">&quot;jack&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以声明的时候直接赋值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;jack&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者这样也可以</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> name <span class="token builtin">string</span>
<span class="token keyword">var</span> age <span class="token builtin">int</span>
name<span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种方式每次都要指定类型，可以使用官方提供的语法糖：短变量初始化，可以省略掉<code>var</code>关键字和后置类型，具体是什么类型交给编译器自行推断。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>name <span class="token operator">:=</span> <span class="token string">&quot;jack&quot;</span> <span class="token comment">// 字符串类型的变量。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>虽然可以不用指定类型，但是在后续赋值时，类型必须保持一致，下面这种代码无法通过编译。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a := 1
a = &quot;1&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还需要注意的是，短变量初始化不能使用<code>nil</code>，因为<code>nil</code>不属于任何类型，编译器无法推断其类型。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>name <span class="token operator">:=</span> <span class="token boolean">nil</span> <span class="token comment">// 无法通过编译</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>短变量声明可以批量初始化</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>name<span class="token punctuation">,</span> age <span class="token operator">:=</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>短变量声明方式无法对一个已存在的变量使用，比如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 错误示例</span>
<span class="token keyword">var</span> a <span class="token builtin">int</span>
a <span class="token operator">:=</span> <span class="token number">1</span>

<span class="token comment">// 错误示例</span>
a <span class="token operator">:=</span> <span class="token number">1</span>
a <span class="token operator">:=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是有一种情况除外，那就是在赋值旧变量的同时声明一个新的变量，比如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>a <span class="token operator">:=</span> <span class="token number">1</span>
a<span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种代码是可以通过编译的，变量<code>a</code>被重新赋值，而<code>b</code>是新声明的。</p><br><p>在go语言中，有一个规则，那就是所有在函数中的变量都必须要被使用，比如下面的代码只是声明了变量，但没有使用它</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么在编译时就会报错，提示你这个变量声明了但没有使用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a declared and not used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个规则仅适用于函数内的变量，对于函数外的包级变量则没有这个限制，下面这个代码就可以通过编译。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="交换" tabindex="-1"><a class="header-anchor" href="#交换" aria-hidden="true">#</a> 交换</h2><p>在Go中，如果想要交换两个变量的值，不需要使用指针，可以使用赋值运算符直接进行交换，语法上看起来非常直观，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>num1<span class="token punctuation">,</span> num2 <span class="token operator">:=</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">36</span>
num1<span class="token punctuation">,</span> num2 <span class="token operator">=</span> num2<span class="token punctuation">,</span> num1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>三个变量也是同样如此</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>num1<span class="token punctuation">,</span> num2<span class="token punctuation">,</span> num3 <span class="token operator">:=</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">36</span><span class="token punctuation">,</span> <span class="token number">49</span>
num1<span class="token punctuation">,</span> num2<span class="token punctuation">,</span> num3  <span class="token operator">=</span> num3<span class="token punctuation">,</span> num2<span class="token punctuation">,</span> num1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><p>由于在函数内部存在未使用的变量会无法通过编译，但有些变量又确实用不到，这个时候就可以使用匿名变量<code>_</code>，使用<code>_</code>来表示该变量可以忽略，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="比较" tabindex="-1"><a class="header-anchor" href="#比较" aria-hidden="true">#</a> 比较</h2><p>变量之间的比较有一个大前提，那就是它们之间的类型必须相同，go语言中不存在隐式类型转换，像下面这样的代码是无法通过编译的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func main() {
	var a uint64
	var b int64
	fmt.Println(a == b)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器会告诉你两者之间类型并不相同</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>invalid operation: a == b (mismatched types uint64 and int64)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以必须使用强制类型转换</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token builtin">uint64</span>
	<span class="token keyword">var</span> b <span class="token builtin">int64</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">==</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在没有泛型之前，早期go提供的内置<code>min</code>，<code>max</code>函数只支持浮点数，到了1.21版本，go才终于将这两个内置函数用泛型重写。使用<code>min</code>函数比较最小值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>minVal <span class="token operator">:=</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1.2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code>max</code>函数比较最大值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>maxVal <span class="token operator">:=</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1.12</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它们的参数支持所有的可比较类型，go中的可比较类型有</p><ul><li>布尔</li><li>数字</li><li>字符串</li><li>指针</li><li>通道 （仅支持判断是否相等）</li><li>元素是可比较类型的数组（切片不可比较）</li><li>字段类型都是可比较类型的结构体（仅支持判断是否相等）</li></ul><p>除此之外，还可以通过导入标准库<code>cmp</code>来判断，不过仅支持有序类型的参数，在go中内置的有序类型只有数字和字符串。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">&quot;cmp&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmp<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	cmp<span class="token punctuation">.</span><span class="token function">Less</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块" aria-hidden="true">#</a> 代码块</h2><p>在函数内部，可以通过花括号建立一个代码块，代码块彼此之间的变量作用域是相互独立的。例如下面的代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
	
	<span class="token punctuation">{</span>
		a <span class="token operator">:=</span> <span class="token number">2</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	
	<span class="token punctuation">{</span>
		a <span class="token operator">:=</span> <span class="token number">3</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的输出是</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
3
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>块与块之间的变量相互独立，不受干扰，无法访问，但是会受到父块中的影响。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>

	<span class="token punctuation">{</span>
		a <span class="token operator">:=</span> <span class="token number">2</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的输出是</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
1
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,69);function v(m,k){const a=c("ExternalLinkIcon");return i(),t("div",null,[d,s("p",null,[n("变量是用于保存一个值的存储位置，允许其存储的值在运行时动态的变化。每声明一个变量，都会为其分配一块内存以存储对应类型的值，前往"),s("a",u,[n("参考手册-变量"),p(a)]),n("以查看更多细节。")]),r])}const g=e(o,[["render",v],["__file","40.variable.html.vue"]]);export{g as default};
