import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as n,o as l}from"./app-COSvdVdM.js";const t={};function e(h,i){return l(),a("div",null,i[0]||(i[0]=[n(`<h1 id="常量" tabindex="-1"><a class="header-anchor" href="#常量"><span>常量</span></a></h1><p>常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：</p><ul><li>字面量</li><li>其他常量标识符</li><li>常量表达式</li><li>结果是常量的类型转换</li><li>iota</li></ul><p>常量只能是基本数据类型，不能是</p><ul><li>除基本类型以外的其它类型，如结构体，接口，切片，数组等</li><li>函数的返回值</li></ul><p>常量的值无法被修改，否则无法通过编译</p><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化"><span>初始化</span></a></h2><p>常量的声明需要用到<code>const</code>关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略，例如</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> name</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Jack&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 字面量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> msg</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;hello world&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 字面量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> num</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 字面量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> numExpression</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> %</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> num</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 常量表达式</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果仅仅只是声明而不指定值，将会无法通过编译</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> name</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> string</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>编译器报错</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>missing init expr for name</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>批量声明常量可以用<code>()</code>括起来以提升可读性，可以存在多个<code>()</code>达到分组的效果。</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Count</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Name</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">  =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Jack&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Size</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 16</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Len</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">  =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 25</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在同一个常量分组中，在已经赋值的常量后面的常量可以不用赋值，其值默认就是前一个的值，比如</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  A</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  B</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  C</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  D</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  E</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iota" tabindex="-1"><a class="header-anchor" href="#iota"><span>iota</span></a></h2><p><code>iota</code>是一个内置的常量标识符，通常用于表示一个常量声明中的无类型整数序数，一般都是在括号中使用。</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> iota</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>看几个使用案例</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 2</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num3</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 3</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num4</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 4</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以这么写</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 2</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 4</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num3</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 6</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num4</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 8</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> &lt;&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 13</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 25</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num3</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 3</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">   Num4</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 4</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面几个例子可以发现，<code>iota</code>是递增的，第一个常量使用<code>iota</code>值的表达式，根据序号值的变化会自动的赋值给后续的常量，直到用新的<code>const</code>重置，这个序号其实就是<strong>代码的相对行号</strong>，是相对于当前分组的起始行号，看下面的例子</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Num</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">  =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 1 第一行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Num2</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 13 第二行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  _</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 25 第三行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Num3</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> //37 第四行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Num4</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 4 第五行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  _</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 5 第六行</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Num5</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 6 第七行</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中使用了匿名标识符<code>_</code>占了一行的位置，可以看到<code>iota</code>的值本质上就是<code>iota</code>所在行相对于当前<code>const</code>分组的第一行的差值。而不同的<code>const</code>分组则相互不会影响。</p><h2 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举"><span>枚举</span></a></h2><p>Go 语言没有为枚举单独设计一个数据类型，不像其它语言通常会有一个<code>enum</code>来表示。一般在 Go 中，都是通过自定义类型 + const + iota 来实现枚举，下面是一个简单的例子</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Season</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> uint8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Spring</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Season</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> iota</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Summer</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Autumn</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">  Winter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些枚举实际上就是数字，Go 也不支持直接将其转换为字符串，但我们可以通过给自定义类型添加方法来返回其字符串表现形式，实现<code>Stringer</code>接口即可。</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">s </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Season</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  switch</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  case</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> Spring</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;spring&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  case</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> Summer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;summer&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  case</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> Autumn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;autumn&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  case</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> Winter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;winter&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来就是一个简单的枚举实现了。你也可以通过官方工具<a href="https://pkg.go.dev/golang.org/x/tools/cmd/stringer" target="_blank" rel="noopener noreferrer">Stringer</a>来自动生成枚举。</p><p>不过它有以下缺点：</p><ul><li><p>类型不安全，因为<code>Season</code>是自定义类型，可以通过强制类型转换将其他数字也转换成该类型</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Season</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>繁琐，字符串表现形式需要自己实现</p></li><li><p>表达能力弱，因为<code>const</code>仅支持基本数据类型，所以这些枚举值也只能用字符串和数字来进行表示</p></li></ul><p>为什么不在语言层面支持枚举是笔者非常不能理解的一件事，我认为这绝对是利大于弊的。</p>`,38)]))}const d=s(t,[["render",e],["__file","30.constant.html.vue"]]),r=JSON.parse('{"path":"/essential/base/30.constant.html","title":"常量","lang":"zh-CN","frontmatter":{"date":"2022-08-13T00:00:00.000Z","description":"常量 常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于： 字面量 其他常量标识符 常量表达式 结果是常量的类型转换 iota 常量只能是基本数据类型，不能是 除基本类型以外的其它类型，如结构体，接口，切片，数组等 函数的返回值 常量的值无法被修改，否则无法通过编译 初始化 常量的声明需要用到const关键字，常量在声明时就必须初始化一个...","head":[["meta",{"property":"og:url","content":"https://golang.halfiisland.com/essential/base/30.constant.html"}],["meta",{"property":"og:site_name","content":"Golang 中文学习文档"}],["meta",{"property":"og:title","content":"常量"}],["meta",{"property":"og:description","content":"常量 常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于： 字面量 其他常量标识符 常量表达式 结果是常量的类型转换 iota 常量只能是基本数据类型，不能是 除基本类型以外的其它类型，如结构体，接口，切片，数组等 函数的返回值 常量的值无法被修改，否则无法通过编译 初始化 常量的声明需要用到const关键字，常量在声明时就必须初始化一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-15T16:58:36.000Z"}],["meta",{"property":"article:published_time","content":"2022-08-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-15T16:58:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-15T16:58:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"寒江蓑笠翁\\",\\"url\\":\\"https://246859.github.io/\\",\\"email\\":\\"2633565580@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":2,"title":"iota","slug":"iota","link":"#iota","children":[]},{"level":2,"title":"枚举","slug":"枚举","link":"#枚举","children":[]}],"git":{"createdTime":1674913151000,"updatedTime":1734281916000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"url":"https://github.com/Mister-Hope"},{"name":"W2Q3Q1","username":"W2Q3Q1","email":"72857495+W2Q3Q1@users.noreply.github.com","commits":1,"url":"https://github.com/W2Q3Q1"},{"name":"246859","username":"246859","email":"2633565580@qq.com","commits":8,"url":"https://github.com/246859"}]},"readingTime":{"minutes":6.73,"words":1009},"filePathRelative":"essential/base/30.constant.md","localizedDate":"2022年8月13日","autoDesc":true,"excerpt":"\\n<p>常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：</p>\\n<ul>\\n<li>字面量</li>\\n<li>其他常量标识符</li>\\n<li>常量表达式</li>\\n<li>结果是常量的类型转换</li>\\n<li>iota</li>\\n</ul>\\n<p>常量只能是基本数据类型，不能是</p>\\n<ul>\\n<li>除基本类型以外的其它类型，如结构体，接口，切片，数组等</li>\\n<li>函数的返回值</li>\\n</ul>\\n<p>常量的值无法被修改，否则无法通过编译</p>\\n<h2>初始化</h2>\\n<p>常量的声明需要用到<code>const</code>关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略，例如</p>"}');export{d as comp,r as data};