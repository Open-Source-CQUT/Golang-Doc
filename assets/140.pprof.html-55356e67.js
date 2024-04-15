import{_ as o,V as c,W as l,X as n,Y as s,Z as a,$ as u,a0 as e,F as i}from"./framework-f06be456.js";const d={},r=n("h1",{id:"性能分析",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#性能分析","aria-hidden":"true"},"#"),s(" 性能分析")],-1),k=n("p",null,"当一个程序编写完毕后，我们对它的要求不仅仅只是能运行，还希望它是一个稳定高效的应用。通过各种各样的测试，我们可以保证程序大部分的稳定性，而程序是否高效，就需要我们对其进行性能分析，在此前的内容中，性能分析的唯一手段就只能通过Benchmark来测试某一个功能单元的平均执行耗时，内存分配情况等，然而现实中对程序性能分析的需求远远不止于此，有时候我们需要分析程序整体的CPU占用，内存占用，堆分配情况，协程状态，热点代码路径等等，这是Benchmark所不能满足的。好在go工具链集成了许多性能分析工具以供开发者使用，下面就来逐一讲解。",-1),v=n("h2",{id:"逃逸分析",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#逃逸分析","aria-hidden":"true"},"#"),s(" 逃逸分析")],-1),m=n("p",null,"在go中，变量的内存分配是由编译器决定的，一般就分配到栈上和堆上这两个地方。如果一个本该分配到栈上的变量被分配到了堆上，那么这种情况就称之为逃逸，逃逸分析便是要分析程序中的内存分配情况，由于它是在编译期进行，所以是静态分析的一种。",-1),g={class:"hint-container tip"},b=n("p",{class:"hint-container-title"},"提示",-1),f=e(`<h3 id="引用局部指针" tabindex="-1"><a class="header-anchor" href="#引用局部指针" aria-hidden="true">#</a> 引用局部指针</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">GetPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Mom  <span class="token operator">*</span>Person
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Person <span class="token punctuation">{</span>
	mom <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;lili&quot;</span><span class="token punctuation">}</span>
	son <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> Mom<span class="token punctuation">:</span> <span class="token operator">&amp;</span>mom<span class="token punctuation">}</span>
	<span class="token keyword">return</span> son
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>GetPerson</code>函数中创建了<code>mom</code>变量，由于它是函数内创建的，本来应该是将其分配到栈上，但是它被<code>son</code>的<code>Mom</code>字段所引用了，并且<code>son</code>被作为了函数返回值返回出去，所以编译器就将其分配到了堆上。这是一个很简单的示例，所以理解起来不需要花费太多力气，但如果是一个大点的项目，代码行数有好几万，人工分析就不是那么的轻松了，为此就需要使用工具来进行逃逸分析。前面提到过内存的分配是由编译器主导的，所以逃逸分析也是由编译器来完成，使用起来十分简单，只需要执行如下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go build <span class="token parameter variable">-gcflags</span><span class="token operator">=</span><span class="token string">&quot;-m -m -l&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>gcflags</code>即编译器<code>gc</code>的参数，</p><ul><li><code>-m</code>，打印出代码优化建议，同时出现两个会更加进行细节的输出</li><li><code>-l</code>，禁用内联优化</li></ul><p>输出如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go build <span class="token parameter variable">-gcflags</span><span class="token operator">=</span><span class="token string">&quot;-m -m -l&quot;</span> <span class="token builtin class-name">.</span>
<span class="token comment"># golearn/example</span>
./main.go:13:2: mom escapes to heap:
./main.go:13:2:   flow: son <span class="token operator">=</span> <span class="token operator">&amp;</span>mom:
./main.go:13:2:     from <span class="token operator">&amp;</span>mom <span class="token punctuation">(</span>address-of<span class="token punctuation">)</span> at ./main.go:14:35
./main.go:13:2:     from Person<span class="token punctuation">{</span><span class="token punctuation">..</span>.<span class="token punctuation">}</span> <span class="token punctuation">(</span>struct literal element<span class="token punctuation">)</span> at ./main.go:14:15
./main.go:13:2:     from son :<span class="token operator">=</span> Person<span class="token punctuation">{</span><span class="token punctuation">..</span>.<span class="token punctuation">}</span> <span class="token punctuation">(</span>assign<span class="token punctuation">)</span> at ./main.go:14:6
./main.go:13:2:   flow: ~r0 <span class="token operator">=</span> son:
./main.go:13:2:     from <span class="token builtin class-name">return</span> son <span class="token punctuation">(</span>return<span class="token punctuation">)</span> at ./main.go:15:2
./main.go:13:2: moved to heap: mom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器很明确的告诉了我们变量<code>mom</code>发生了逃逸，导致原因是因为返回值包含了函数内的局部指针，除了这种情况外还有其它情况可能会发生逃逸现象</p><p>::: tips</p><p>如果你对逃逸分析的细节感兴趣，可以在标准库<code>cmd/compile/internal/escape/escape.go</code>里面了解到更多内容。</p><p>:::</p><h3 id="闭包引用" tabindex="-1"><a class="header-anchor" href="#闭包引用" aria-hidden="true">#</a> 闭包引用</h3><p>闭包引用了函数外的变量，那么该变量也会逃逸到堆上，这个很好理解。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token function">do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">do</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build -gcflags=&quot;-m -m -l&quot; .
# golearn/example
./main.go:10:9: f does not escape
./main.go:4:2: main capturing by value: a (addr=false assign=false width=24)
./main.go:4:11: make([]string, 0) escapes to heap:
./main.go:4:11:   flow: a = &amp;{storage for make([]string, 0)}:
./main.go:4:11:     from make([]string, 0) (spill) at ./main.go:4:11
./main.go:4:11:     from a := make([]string, 0) (assign) at ./main.go:4:4
./main.go:4:11:   flow: ~r0 = a:
./main.go:4:11:     from return a (return) at ./main.go:6:3
./main.go:4:11: make([]string, 0) escapes to heap
./main.go:5:5: func literal does not escape
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空间不足" tabindex="-1"><a class="header-anchor" href="#空间不足" aria-hidden="true">#</a> 空间不足</h3><p>栈空间不足时，也会发生逃逸现象，下面创建的切片申请了<code>1&lt;&lt;15</code>的容量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token number">15</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build -gcflags=&quot;-m -m -l&quot; .
# golearn/example
./main.go:4:10: make([]int, 0, 32768) escapes to heap:
./main.go:4:10:   flow: {heap} = &amp;{storage for make([]int, 0, 32768)}:
./main.go:4:10:     from make([]int, 0, 32768) (too large for stack) at ./main.go:4:10
./main.go:4:10: make([]int, 0, 32768) escapes to heap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="长度未知" tabindex="-1"><a class="header-anchor" href="#长度未知" aria-hidden="true">#</a> 长度未知</h3><p>当切片的长度是一个变量的时候，由于其长度未知，便会发生逃逸现象（map并不会）</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	n <span class="token operator">:=</span> <span class="token number">100</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build -gcflags=&quot;-m -m -l&quot; .
# golearn/example
./main.go:5:10: make([]int, n) escapes to heap:
./main.go:5:10:   flow: {heap} = &amp;{storage for make([]int, n)}:
./main.go:5:10:     from make([]int, n) (non-constant size) at ./main.go:5:10
./main.go:5:10: make([]int, n) escapes to heap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种特殊情况便是函数参数为<code>...any</code>类型时也可能会发生逃逸</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	n <span class="token operator">:=</span> <span class="token number">100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go build -gcflags=&quot;-m -m -l&quot; .
# golearn/example
./main.go:7:14: n escapes to heap:
./main.go:7:14:   flow: {storage for ... argument} = &amp;{storage for n}:
./main.go:7:14:     from n (spill) at ./main.go:7:14
./main.go:7:14:     from ... argument (slice-literal-element) at ./main.go:7:13
./main.go:7:14:   flow: {heap} = {storage for ... argument}:
./main.go:7:14:     from ... argument (spill) at ./main.go:7:13
./main.go:7:14:     from fmt.Println(... argument...) (call parameter) at ./main.go:7:13
./main.go:7:13: ... argument does not escape
./main.go:7:14: n escapes to heap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>我们之所以要进行逃逸分析，把内存分配控制的这么细，主要是为了减轻GC压力，不过go并不是c语言，内存分配的最终决定权依旧掌握在编译器手里，除了极端的性能要求情况下，大多数时候我们也无需太过于专注内存分配的细节，毕竟GC诞生的目的就是为了解放开发者。</p><div class="hint-container tip"><p class="hint-container-title">小细节</p><p>对于一些引用类型，当确认以后不会再用到它时，我们可以将其置为<code>nil</code>，来告诉GC可以将其回收。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Writer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	buf <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w Writer<span class="token punctuation">)</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	w<span class="token punctuation">.</span>buff <span class="token operator">=</span> <span class="token boolean">nil</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="pprof" tabindex="-1"><a class="header-anchor" href="#pprof" aria-hidden="true">#</a> pprof</h2><p>pprof（program profiling），是一个程序性能分析的利器，它会对程序运行时的数据进行部分采样，涵盖了cpu，内存，协程，锁，堆栈信息等许多方面，然后再使用工具对采样的数据进行分析并展示结果。</p><p>所以pprof的使用步骤就只有两步：</p><ol><li>采集数据</li><li>分析结果</li></ol><h3 id="采集" tabindex="-1"><a class="header-anchor" href="#采集" aria-hidden="true">#</a> 采集</h3><p>数据采集的方式有两种，自动和手动，各有优劣。在此之前，编写一个简单的函数来模拟内存和cpu的消耗</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		slice <span class="token operator">:=</span> <span class="token function">makeSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">sortSlice</span><span class="token punctuation">(</span>slice<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">makeSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	<span class="token keyword">for</span> <span class="token keyword">range</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">24</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> rand<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sortSlice</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	slices<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="手动" tabindex="-1"><a class="header-anchor" href="#手动" aria-hidden="true">#</a> 手动</h4><p>手动采集就是通过代码来控制，其优点是可控，灵活，可以自定义，直接在代码中使用pprof需要引入<code>runtime/pprof</code>包</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;runtime/pprof&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	w<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;heap.pb&quot;</span><span class="token punctuation">)</span>
	heapProfile <span class="token operator">:=</span> pprof<span class="token punctuation">.</span><span class="token function">Lookup</span><span class="token punctuation">(</span><span class="token string">&quot;heap&quot;</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> heapProfile<span class="token punctuation">.</span><span class="token function">WriteTo</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>pprof.Lookup</code>支持的参数如下面代码所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>profiles<span class="token punctuation">.</span>m <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>Profile<span class="token punctuation">{</span>
    <span class="token string">&quot;goroutine&quot;</span><span class="token punctuation">:</span>    goroutineProfile<span class="token punctuation">,</span>
    <span class="token string">&quot;threadcreate&quot;</span><span class="token punctuation">:</span> threadcreateProfile<span class="token punctuation">,</span>
    <span class="token string">&quot;heap&quot;</span><span class="token punctuation">:</span>         heapProfile<span class="token punctuation">,</span>
    <span class="token string">&quot;allocs&quot;</span><span class="token punctuation">:</span>       allocsProfile<span class="token punctuation">,</span>
    <span class="token string">&quot;block&quot;</span><span class="token punctuation">:</span>        blockProfile<span class="token punctuation">,</span>
    <span class="token string">&quot;mutex&quot;</span><span class="token punctuation">:</span>        mutexProfile<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数会将采集到的数据写入到指定文件中，在写入时传入的数字有以下几个含义</p><ul><li><code>0</code>，写入压缩后的Protobuf数据，没有可读性</li><li><code>1</code>，写入文本格式的数据，能够阅读，http接口返回的就是这一种数据</li><li><code>2</code>，仅<code>goroutine</code>可用，表示打印<code>panic</code>风格的堆栈信息</li></ul><p>采集cpu数据需要单独使用<code> pprof.StartCPUProfile</code>函数，它需要一定的时间进行采样，且其原始数据不可读，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;runtime/pprof&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	w<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;cpu.out&quot;</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> pprof<span class="token punctuation">.</span><span class="token function">StartCPUProfile</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>
	pprof<span class="token punctuation">.</span><span class="token function">StopCPUProfile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采集trace的数据也是同样如此</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;runtime/trace&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	w<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;trace.out&quot;</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> trace<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>
	trace<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自动" tabindex="-1"><a class="header-anchor" href="#自动" aria-hidden="true">#</a> 自动</h4><p><code>net/http/pprof</code>包将上面的分析函数包装成了http接口，并注册到了默认路由中，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> pprof

<span class="token keyword">import</span> <span class="token operator">...</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/debug/pprof/&quot;</span><span class="token punctuation">,</span> Index<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/debug/pprof/cmdline&quot;</span><span class="token punctuation">,</span> Cmdline<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/debug/pprof/profile&quot;</span><span class="token punctuation">,</span> Profile<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/debug/pprof/symbol&quot;</span><span class="token punctuation">,</span> Symbol<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/debug/pprof/trace&quot;</span><span class="token punctuation">,</span> Trace<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使得我们可以直接一键运行pprof数据采集</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/http&quot;</span>
    <span class="token comment">// 记得要导入这个包</span>
	<span class="token boolean">_</span> <span class="token string">&quot;net/http/pprof&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时打开浏览器访问<code>http://127.0.0.1:8080/debug/pprof</code>，就会出现这样的页面</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151433344.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>页面中有几个可供选择的选项，它们分别代表了</p><ul><li><code>allocs</code>：内存分配抽样</li><li><code>block</code>：同步原语的阻塞跟踪</li><li><code>cmdline</code>：当前程序的命令行调用</li><li><code>goroutine</code>：跟踪所有的协程</li><li><code>heap</code>：对于存活对象的内存分配抽样</li><li><code>mutex</code>：互斥锁相关信息的跟踪</li><li><code>profile</code>：cpu分析，会分析一段时间并下载一个文件</li><li><code>threadcreate</code>：分析导致创建新OS线程原因</li><li><code>trace</code>：当前程序执行情况的跟踪，同样会下载一个文件</li></ul><p>这里的数据大多数可读性并不高，主要是拿来给工具分析用的，如下所图</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151445622.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>具体的分析工作要留到后面再进行，除了<code>profile</code>和<code>trace</code>两个选项之外，如果你想要在网页中下载数据文件，可以将<code>query</code>参数<code>debug=1</code>去掉。也可以将这些接口集成到自己的路由中而不是使用默认路由，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/http/pprof&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/trace&quot;</span><span class="token punctuation">,</span> pprof<span class="token punctuation">.</span>Trace<span class="token punctuation">)</span>
	servre <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>
		Addr<span class="token punctuation">:</span>    <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span>
		Handler<span class="token punctuation">:</span> mux<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	servre<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此一来，也能其集成到其它的web框架中，比如<code>gin</code>，<code>iris</code>等等。</p><h3 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h3><p>在得到了采集的数据文件后，有两种方式进行分析，命令行或网页，两者都需要借助<code>pprof</code>命令行工具，go默认集成该工具，所以不需要额外下载。</p>`,68),h={href:"https://github.com/google/pprof",target:"_blank",rel:"noopener noreferrer"},q=e(`<h4 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行" aria-hidden="true">#</a> 命令行</h4><p>将此前收集到的数据文件作为参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go tool pprof heap.pb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果数据是由web采集的话，用web url替换掉文件名即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go tool pprof <span class="token parameter variable">-http</span> :8080 http://127.0.0.1/debug/pprof/heap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就会出现一个交互式的命令行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">15</span>:27:38.3266862 +0800 CST
Type: inuse_space
Time: Apr <span class="token number">15</span>, <span class="token number">2024</span> at <span class="token number">3</span>:27pm <span class="token punctuation">(</span>CST<span class="token punctuation">)</span>
No samples were found with the default sample value type.
Try <span class="token string">&quot;sample_index&quot;</span> <span class="token builtin class-name">command</span> to analyze different sample values.
Entering interactive mode <span class="token punctuation">(</span>type <span class="token string">&quot;help&quot;</span> <span class="token keyword">for</span> commands, <span class="token string">&quot;o&quot;</span> <span class="token keyword">for</span> options<span class="token punctuation">)</span>
<span class="token punctuation">(</span>pprof<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入help，可以查看其它命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  Commands:
    callgrind        Outputs a graph in callgrind format
    comments         Output all profile comments
    disasm           Output assembly listings annotated with samples
    dot              Outputs a graph in DOT format
    eog              Visualize graph through eog
    evince           Visualize graph through evince
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在命令行中查看数据一般使用<code>top</code>命令，也可以用<code>traces</code>命令不过它的输出很冗长，<code>top</code>命令只是简单的看个大概。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(pprof) top 5
Showing nodes accounting for 117.49MB, 100% of 117.49MB total
      flat  flat%   sum%        cum   cum%
  117.49MB   100%   100%   117.49MB   100%  main.makeSlice (inline)
         0     0%   100%   117.49MB   100%  main.Do
         0     0%   100%   117.49MB   100%  main.main
         0     0%   100%   117.49MB   100%  runtime.main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单介绍一些其中的一些指标（cpu同理）</p><ul><li><code>flat</code>，代表着当前函数所消耗的资源</li><li><code>cum</code>，当前函数及其后续调用链所消耗的资源总和</li><li><code>flat%</code>，flat/total</li><li><code>cum%</code>，cum/total</li></ul><p>我们可以很明显的看到整个调用栈的内存占用是117.49MB，由于<code>Do</code>函数本身什么都没做，只是调用了其它函数，所以其<code>flat</code>的指标是0，创建切片的事情是由<code>makeSlice</code>函数在负责，所以其<code>flat</code>指标是<code>100%</code>。</p>`,14),y=n("code",null,"pprof",-1),x={href:"https://graphviz.org/download/",target:"_blank",rel:"noopener noreferrer"},w=e(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(pprof) png
Generating report in profile001.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151559766.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过图片我们可以更加清晰的看到整个调用栈的内存情况。</p><p>通过<code>list</code>命令以源代码的形式查看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(pprof) list Do
Total: 117.49MB
ROUTINE ======================== main.Do in D:\\WorkSpace\\Code\\GoLeran\\golearn\\example\\main.go
         0   117.49MB (flat, cum)   100% of Total
         .          .     21:func Do() {
         .          .     22:   for i := 0; i &lt; 10; i++ {
         .   117.49MB     23:           slice := makeSlice()
         .          .     24:           sortSlice(slice)
         .          .     25:   }
         .          .     26:}
         .          .     27:
         .          .     28:func makeSlice() []int {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于图片和源代码而言，还可以用<code>web</code>和<code>weblist</code>命令在浏览器中查看图片和源代码。</p><h4 id="网页" tabindex="-1"><a class="header-anchor" href="#网页" aria-hidden="true">#</a> 网页</h4><p>在此之前为了数据更加多样化，修改一下模拟的函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Do1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		slice <span class="token operator">:=</span> <span class="token function">makeSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">sortSlice</span><span class="token punctuation">(</span>slice<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Do2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		slice <span class="token operator">:=</span> <span class="token function">makeSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token function">sortSlice</span><span class="token punctuation">(</span>slice<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">makeSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	<span class="token keyword">for</span> <span class="token keyword">range</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">12</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> rand<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sortSlice</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	slices<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>网页分析可以可视化结果，免去了我们手动操作命令行，在使用网页分析时，只需执行如下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go tool pprof <span class="token parameter variable">-http</span> :8080 heap.pb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果数据是由web采集的话，将web url替换掉文件名即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go tool pprof <span class="token parameter variable">-http</span> :8080 http://127.0.0.1:9090/debug/pprof/heap
$ go tool pprof <span class="token parameter variable">-http</span> :8080 http://127.0.0.1:9090/debug/pprof/profile
$ go tool pprof <span class="token parameter variable">-http</span> :8080 http://127.0.0.1:9090/debug/pprof/goroutine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),_={class:"hint-container tip"},S=n("p",{class:"hint-container-title"},"提示",-1),P={href:"https://github.com/google/pprof/blob/main/doc/README.md",target:"_blank",rel:"noopener noreferrer"},z=e(`<img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151646245.png" style="zoom:67%;"><p>网页中总共有6个可查看的项</p><ul><li>Top，同命令top</li><li>Graph，直线图</li><li>Flame Graph，火焰图</li><li>Peek，</li><li>Source，查看源代码</li><li>Disassemble，反汇编查看</li></ul><p>对于内存而言四个维度可以分析</p><ul><li><code>alloc_objects</code>：目前已分配的所有对象数量，包括已释放</li><li><code>alloc_spcae</code>：目前为止已分配的所有内存空间，包括已释放</li><li><code>inuse_objects</code>：正在使用的对象数量</li><li><code>inuse_space</code>：正在使用的内存空间</li></ul><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151654998.png" alt="内存分析图" tabindex="0" loading="lazy"><figcaption>内存分析图</figcaption></figure><p>上图最下方的白色叶子节点代表着不同大小的对象占用。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151710273.png" alt="cpu分析图" tabindex="0" loading="lazy"><figcaption>cpu分析图</figcaption></figure><p>关于折线图，有几个点要注意</p><ul><li>块的颜色越深，占用越高，线越粗，占用越高</li><li>实线代表着直接调用，虚线代表着略过了一些调用链。</li></ul><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151656457.png" alt="内存火焰图" tabindex="0" loading="lazy"><figcaption>内存火焰图</figcaption></figure><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151711752.png" alt="cpu火焰图" tabindex="0" loading="lazy"><figcaption>cpu火焰图</figcaption></figure><p>对于火焰图而言，从上往下看是调用链，从左往右看是cum的占用百分比。</p><h2 id="trace" tabindex="-1"><a class="header-anchor" href="#trace" aria-hidden="true">#</a> trace</h2><p>pprof主要负责分析程序的资源占用，而trace更适合跟踪程序的运行细节，它与前者的数据文件互不兼容，由<code>go tool trace</code>命令来完成相关的分析工作。</p><p>如果是手动采集的数据，可以将文件名作为参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ go tool trace trace.out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是自动采集，也是同样的道理</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://127.0.0.1:8080/debug/pprof/trace <span class="token operator">&gt;</span> trace.out <span class="token operator">&amp;&amp;</span> go tool trace trace.out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行后会开启一个web server</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2024/04/15 17:15:40 Preparing trace for viewer...
2024/04/15 17:15:40 Splitting trace for viewer...
2024/04/15 17:15:40 Opening browser. Trace viewer is listening on http://127.0.0.1:51805
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开后页面大概如下所示</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151726506.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里面主要包含了以下几个部分，这些数据要看懂还挺不容易的。</p><ul><li><p>Event timelines for running goroutines</p><ul><li><p>trace by proc：显示每一时刻在该处理器上运行的协程时间线</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151734126.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>trace by thread：显示每一时刻在OS线程上运行的协程时间线</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151734602.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li><li><p>Goroutine analysis：展示每组主函数的协程相关统计信息</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151735181.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151736123.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul></li><li><p>Profiles</p><ul><li>Network blocking profile： 因网络IO而阻塞的协程信息</li><li>Synchronization blocking profile：因同步原语而阻塞的协程信息</li><li>Syscall profile：因系统调用而阻塞的协程信息</li></ul></li><li><p>User-defined tasks and regions</p><ul><li>User-defined tasks：用户定义任务的相关协程信息</li><li>User-defined regions：用户定义代码区域的相关协程信息</li></ul></li><li><p>Garbage collection metrics</p><ul><li><p>Minimum mutator utilization：展示最近GC的最大耗时</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202404151746035.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul></li></ul>`,25);function C(M,B){const p=i("RouterLink"),t=i("ExternalLinkIcon");return c(),l("div",null,[r,k,v,m,n("div",g,[b,n("p",null,[s("前往"),a(p,{to:"/essential/senior/src/essential/impl/8.mem.html"},{default:u(()=>[s("内存分配")]),_:1}),s("文章了解go具体是如分配内存的。")])]),f,n("p",null,[s("pprof开源地址："),n("a",h,[s("google/pprof: pprof is a tool for visualization and analysis of profiling data (github.com)"),a(t)])]),q,n("p",null,[s("我们可以将转换可视化的格式，"),y,s("支持相当多的格式，比如pdf，svg，png，gif等等（需要安装"),n("a",x,[s("Graphviz"),a(t)]),s("）。")]),w,n("div",_,[S,n("p",null,[s("关于如何分析数据，前往"),n("a",P,[s("pprof: How to read the graph"),a(t)]),s("了解更多")])]),z])}const T=o(d,[["render",C],["__file","140.pprof.html.vue"]]);export{T as default};
