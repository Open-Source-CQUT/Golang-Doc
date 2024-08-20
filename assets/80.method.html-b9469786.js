import{_ as e,V as p,W as c,X as n,Y as s,Z as o,$ as i,a0 as a,F as l}from"./framework-f06be456.js";const u={},d=a(`<h1 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h1><p>方法与函数的区别在于，方法拥有接收者，而函数没有，且只有自定义类型能够拥有方法。先来看一个例子。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> IntSlice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i IntSlice<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> i<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>i IntSlice<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	i<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> val
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i IntSlice<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先声明了一个类型<code>IntSlice</code>，其底层类型为<code>[]int</code>，再声明了三个方法<code>Get</code>，<code>Set</code>和<code>Len</code>，方法的长相与函数并无太大的区别，只是多了一小段<code>(i IntSlice)</code> 。<code>i</code>就是接收者，<code>IntSlice</code>就是接收者的类型，接收者就类似于其他语言中的<code>this</code>或<code>self</code>，只不过在Go中需要显示的指明。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> intSlice IntSlice
   intSlice <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>intSlice<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   intSlice<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>intSlice<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>intSlice<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法的使用就类似于调用一个类的成员方法，先声明，再初始化，再调用。</p><br><h3 id="值接收者" tabindex="-1"><a class="header-anchor" href="#值接收者" aria-hidden="true">#</a> 值接收者</h3><p>接收者也分两种类型，值接收者和指针接收者，先看一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MyInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i MyInt<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   i <span class="token operator">=</span> <span class="token function">MyInt</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token comment">// 修改了，但是不会造成任何影响</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   myInt <span class="token operator">:=</span> <span class="token function">MyInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
   myInt<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myInt<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码运行过后，会发现<code>myInt</code>的值依旧是1，并没有被修改成2。方法在被调用时，会将接收者的值传入方法中，上例的接收者就是一个值接收者，可以简单的看成一个形参，而修改一个形参的值，并不会对方法外的值造成任何影响，那么如果通过指针调用会如何呢？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	myInt <span class="token operator">:=</span> <span class="token function">MyInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">(</span><span class="token operator">&amp;</span>myInt<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myInt<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遗憾的是，这样的代码依旧不能修改内部的值，为了能够匹配上接收者的类型，Go会将其解引用，解释为<code>(*(&amp;myInt)).Set(2)</code>。</p><br><h3 id="指针接收者" tabindex="-1"><a class="header-anchor" href="#指针接收者" aria-hidden="true">#</a> 指针接收者</h3><p>稍微修改了一下，就能正常修改<code>myInt</code>的值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MyInt <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>MyInt<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token operator">*</span>i <span class="token operator">=</span> <span class="token function">MyInt</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   myInt <span class="token operator">:=</span> <span class="token function">MyInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
   myInt<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>myInt<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在的接收者就是一个指针接收者，虽然<code>myInt</code>是一个值类型，在通过值类型调用指针接收者的方法时，Go会将其解释为<code>(&amp;myint).Set(2)</code>。所以方法的接收者为指针时，不管调用者是不是指针，都可以修改内部的值。</p><br><p>函数的参数传递过程中，是值拷贝的，如果传递的是一个整型，那就拷贝这个整型，如果是一个切片，那就拷贝这个切片，但如果是一个指针，就只需要拷贝这个指针，显然传递一个指针比起传递一个切片所消耗的资源更小，接收者也不例外，值接收者和指针接收者也是同样的道理。在大多数情况下，都推荐使用指针接收者，不过两者并不应该混合使用，要么都用，要么就都不用，看下面一个例子。</p>`,20),k={class:"hint-container tip"},r=n("p",{class:"hint-container-title"},"提示",-1),v=a(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Animal <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Dog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>Dog<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Run&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> an Animal
   an <span class="token operator">=</span> Dog<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token comment">// an = &amp;Dog{} 正确方式</span>
   an<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段代码将会无法通过编译，编译器将会输出如下错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cannot use Dog{} (value of type Dog) as type Animal in assignment:
	Dog does not implement Animal (Run method has pointer receiver)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译过来就是，无法使用<code>Dog{}</code>初始化<code>Animal</code>类型的变量，因为<code>Dog</code>没有实现<code>Animal </code>，解决办法有两种，一是将指针接收者改为值接收者，二是将<code>Dog{}</code>改为<code>&amp;Dog{}</code>，接下来逐个讲解。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Dog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d Dog<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 改为了值接收者</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Run&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 可以正常运行</span>
   <span class="token keyword">var</span> an Animal
   an <span class="token operator">=</span> Dog<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token comment">// an = &amp;Dog{} 同样可以</span>
   an<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在原来的代码中，<code>Run</code> 方法的接收者是<code>*Dog</code> ，自然而然实现<code>Animal</code>接口的就是<code>Dog</code>指针，而不是<code>Dog</code>结构体，这是两个不同的类型，所以编译器就会认为<code>Dog{}</code>并不是<code>Animal</code>的实现，因此无法赋值给变量<code>an</code>，所以第二种解决办法就是赋值<code>Dog</code>指针给变量<code>an</code>。不过在使用值接收者时，<code>Dog</code>指针依然可以正常赋值给<code>animal</code>，这是因为Go会在适当情况下对指针进行解引用，因为通过指针可以找到<code>Dog</code>结构体，但是反过来的话，无法通过<code>Dog</code>结构体找到<code>Dog</code>指针。如果单纯的在结构体中混用值接收者和指针接收者的话无伤大雅，但是和接口一起使用后，就会出现错误，倒不如无论何时要么都用值接收者，要么就都用指针接收者，形成一个良好的规范，也可以减少后续维护的负担。</p><br><p>还有一种情况，就是当值接收者是可寻址的时候，Go会自动的插入指针运算符来进行调用，例如切片是可寻址，依旧可以通过值接收者来修改其内部值。比如下面这个代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Slice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s Slice<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span>Slice<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但这样会引发另一个问题，如果对其添加元素的话，情况就不同了。看下面的例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type Slice []int

func (s Slice) Set(i int, v int) {
	s[i] = v
}

func (s Slice) Append(a int) {
	s = append(s, a)
}

func main() {
	s := make(Slice, 1, 2)
	s.Set(0, 1)
	s.Append(2)
	fmt.Println(s)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它的输出还是和之前一样，<code>append</code>函数是有返回值的，向切片添加完元素后必须覆盖原切片，尤其是在扩容后，在方法中对值接收者修改并不会产生任何影响，这也就导致了例子中的结果，改成指针接收者就正常了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Slice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Slice<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">(</span><span class="token operator">*</span>s<span class="token punctuation">)</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> v
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Slice<span class="token punctuation">)</span> <span class="token function">Append</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token operator">*</span>s<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span>Slice<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[1 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18);function m(b,g){const t=l("RouterLink");return p(),c("div",null,[d,n("div",k,[r,n("p",null,[s("需要先了解"),o(t,{to:"/essential/senior/85.interface.html"},{default:i(()=>[s("接口")]),_:1})])]),v])}const y=e(u,[["render",m],["__file","80.method.html.vue"]]);export{y as default};
