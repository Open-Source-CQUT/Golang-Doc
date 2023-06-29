import{_ as n,V as e,W as a,Z as s}from"./framework-44a66fc7.js";const i={},t=s(`<h1 id="模板引擎" tabindex="-1"><a class="header-anchor" href="#模板引擎" aria-hidden="true">#</a> 模板引擎</h1><p><code>html/template</code>包提供了数据驱动的模板，用于生成可以对抗代码注入的HTML安全输出。一般在传统的MVC架构中，前后端不分离的情况下，为了实现动态网页的效果，模板引擎是必不可少的。<code>Java</code>中著名的有<code>freemaker</code> <code>themyleaf</code>，在<code>go</code>语言中，标准库的模板包就足够基本使用了。</p><h3 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域" aria-hidden="true">#</a> 作用域</h3><p>先看一个示例</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Content-Type<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/html; charset=utf-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Go Web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        {{ . }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.</code>表示的是当前作用域对象，如果传入的是字符串，那么就是字符串，如果是对象，还可以通过<code>.field</code>来访问。</p><h3 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   tempFile<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">ParseFiles</span><span class="token punctuation">(</span><span class="token string">&quot;test.html&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   tempFile<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="去除空白" tabindex="-1"><a class="header-anchor" href="#去除空白" aria-hidden="true">#</a> 去除空白</h3><p>template在解析时，会保留每一个字符，倘若想要去除一些空白字符时，可以使用<code>-</code>来进行对应的操作。</p><p>例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{30 -}} &gt; {{15}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会去除掉<code>}} &gt;</code>之间的空格，最终效果是<code>30&gt; 15</code>，下方的例子同理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{30 -}} &gt; {{- 15}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>得到<code>30&gt;15</code></p><h3 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h3><p>其类似于<code>unix</code>系统的管道运算符，是产生数据的操作，即<code>pipeline</code>，并不是只有<code>|</code>才是pipeline，只要能产生数据的操作都是pipeline</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{.}} | printf &quot;%s&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再例如，括号中的操作也是pipeline</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{println (len &quot;hello world&quot;)}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><p>模板中可以定义变量，语法如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$val := pipeline
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{$length := (len &quot;hello&quot;)}}
{{println $length }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要注意的地方：</strong></p><ul><li>变量的作用域，只要出现<code>end</code>，当前层次的作用域结束，内层变量可以访问外层，但是外层不能访问内层。</li><li>全局变量<code>$</code>是模板的最顶级作用域对象，且一直不会有变化。</li><li>变量不可以在模板之间继承</li></ul><h3 id="条件判断" tabindex="-1"><a class="header-anchor" href="#条件判断" aria-hidden="true">#</a> 条件判断</h3><p>语法如下，理解起来比较简单</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{if pipeline}} condition1 {{end}}
{{if pipeline}} condition1 {{else}} condition2 {{end}}
{{if pipeline}} condition1 {{else if pipeline2}} condition2 {{else}} condition3 {{end}} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迭代" tabindex="-1"><a class="header-anchor" href="#迭代" aria-hidden="true">#</a> 迭代</h3><p>可以适用于切片，map，数组，或者channel</p><p>语法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{range pipeline}} 1 {{end}} //为0值时直接跳过
{{range pipeline}} 1 {{else}} 2 {{end}}　//为0值时执行else
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以迭代赋值，就像写go循环一样</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{range $val := pipeline}}
{{range $key,$val := pipeline}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="with" tabindex="-1"><a class="header-anchor" href="#with" aria-hidden="true">#</a> <code>With</code></h3><p><code>with end</code>用于设置当前作用域对象的值，即<code>.</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{with pipeline}} 1 {{end}} //为0值是跳过
{{with pipeline}} 1 {{else}} 2 {{end}} //为0值时执行else
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><p>以下是内置函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>and
    函数返回它的第一个empty参数或者最后一个参数；
    就是说&quot;and x y&quot;等价于&quot;if x then y else x&quot;；所有参数都会执行；
    
or
    返回第一个非empty参数或者最后一个参数；
    亦即&quot;or x y&quot;等价于&quot;if x then x else y&quot;；所有参数都会执行；
    
not
    返回它的单个参数的布尔值的否定
    
len
    返回它的参数的整数类型长度
    
index
    执行结果为第一个参数以剩下的参数为索引/键指向的值；
    如&quot;index x 1 2 3&quot;返回x[1][2][3]的值；每个被索引的主体必须是数组、切片或者字典。
    
print
    即fmt.Sprint
    
printf
    即fmt.Sprintf
    
println
    即fmt.Sprintln
    
html
    返回其参数文本表示的HTML逸码等价表示。
    
urlquery
    返回其参数文本表示的可嵌入URL查询的逸码等价表示。
    
js
    返回其参数文本表示的JavaScript逸码等价表示。
    
call
    执行结果是调用第一个参数的返回值，该参数必须是函数类型，其余参数作为调用该函数的参数；
    如&quot;call .X.Y 1 2&quot;等价于go语言里的dot.X.Y(1, 2)；
    其中Y是函数类型的字段或者字典的值，或者其他类似情况；
    call的第一个参数的执行结果必须是函数类型的值（和预定义函数如print明显不同）；
    该函数类型值必须有1到2个返回值，如果有2个则后一个必须是error接口类型；
    如果有2个返回值的方法返回的error非nil，模板执行会中断并返回给调用模板执行者该错误； 
    
eq      如果arg1 == arg2则返回真

ne      如果arg1 != arg2则返回真

lt      如果arg1 &lt; arg2则返回真

le      如果arg1 &lt;= arg2则返回真

gt      如果arg1 &gt; arg2则返回真

ge      如果arg1 &gt;= arg2则返回真 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以自定义函数在模板中使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>myFunc <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>arg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">//在Parse之前调用Funcs添加自定义的myFunc函数</span>
tmpl<span class="token punctuation">,</span> err <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Funcs</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span>FuncMap<span class="token punctuation">{</span><span class="token string">&quot;myFunc&quot;</span><span class="token punctuation">:</span> myFunc<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>htmlByte<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{myFunc &quot;world&quot;}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="嵌套template" tabindex="-1"><a class="header-anchor" href="#嵌套template" aria-hidden="true">#</a> 嵌套Template</h3><p>可以在Template中嵌套Template，可以是文件，也可以是define定义的Template</p><p><code>test.txt</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>This is a test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>main.txt</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{{template test.txt}}
{{template virtual.txt}}
This is main
{{define &quot;virtual.txt&quot;}}
This a define template
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析<code>main.txt</code>文件效果如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>This is a test
This a define template
This is main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,53),l=[t];function d(c,p){return e(),a("div",null,l)}const u=n(i,[["render",d],["__file","130.template.html.vue"]]);export{u as default};
