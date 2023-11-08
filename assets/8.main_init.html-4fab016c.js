import{_ as n,V as s,W as a,a0 as e}from"./framework-f06be456.js";const i={},t=e(`<h1 id="启动函数" tabindex="-1"><a class="header-anchor" href="#启动函数" aria-hidden="true">#</a> 启动函数</h1><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子相信很多人在入门的时候都已经敲过了，<code>main</code>函数几乎是每一门语言的入门课程中第一课。但在go中还有一个<code>init</code>函数在启动时同样会执行，这个函数相比于前者，就不怎么出名了。</p><h2 id="异同" tabindex="-1"><a class="header-anchor" href="#异同" aria-hidden="true">#</a> 异同</h2><p>相同：两个函数在定义时不能有任何的参数与返回值，且go会自动调用</p><p>不同：<code>main</code>函数只能存在于<code>main</code>包中，只能有一个<code>main</code> 函数， 而<code>init</code>函数可以在任意包中被定义，且可以重复定义多个。</p><h2 id="执行顺序" tabindex="-1"><a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a> 执行顺序</h2><p>在启动一个程序时，<code>main</code>函数永远是最后一个执行的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main init&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>main init
main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于<code>init</code>函数就稍微有一点点讲究</p><ul><li>同一文件：同一文件中的<code>init()</code>的调用顺序是从上到下</li><li>同一包：同一包中的<code>init()</code>的调用顺序则是比较各文件名在字符串大小，由小到大进行调用每个文件的<code>init()</code></li><li>不同包： <ul><li>存在依赖的话，则先调用最早被依赖的<code>init()</code>，</li><li>不存在依赖的话，则按照”先导入后调用“的原则调用<code>init()</code></li></ul></li></ul><h2 id="前缀" tabindex="-1"><a class="header-anchor" href="#前缀" aria-hidden="true">#</a> 前缀</h2><p>在导入时，可以加上<code>_</code>前缀表示调用该包的<code>init()</code>，但并不需要导入该包。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token boolean">_</span> <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在导入时，加上<code>.</code>前缀可以省略包名</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
   <span class="token punctuation">.</span> <span class="token string">&quot;GoProject/src/utils&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">AddSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以起别名</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
   u <span class="token string">&quot;GoProject/src/utils&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	u<span class="token punctuation">.</span><span class="token function">AddSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),c=[t];function o(p,l){return s(),a("div",null,c)}const u=n(i,[["render",o],["__file","8.main_init.html.vue"]]);export{u as default};
