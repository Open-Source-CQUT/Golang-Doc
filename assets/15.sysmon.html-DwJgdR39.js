import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as n,o as e}from"./app-COSvdVdM.js";const t={};function l(h,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="sysmon" tabindex="-1"><a class="header-anchor" href="#sysmon"><span>sysmon</span></a></h1><p><code>sysmon</code>是一个普通的函数，直译为系统监控，去掉注释部分也就 200 来行代码。它会在程序引导阶段时被分配一个单独的线程来启动，之后会在后台不断地监控 Go 程序运行时的状态，并作出相应的处理。关于它启动这部分的代码可以在<code>runtime.main</code>函数中查看到：</p><div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" data-title="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ...</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  mp</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> :=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> getg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">m</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  mainStarted</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  systemstack</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        newm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">sysmon</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">nil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>系统监控本身只是一个<code>for</code>循环，每一轮循环的间隔时间为 20 微秒，随着程序空闲指数的上升，间隔时间最多会提升至 10 毫秒。在每一轮循环中，它主要做了下面几件事情：</p><ul><li>辅助协程调度，抢占长时间运行的协程</li><li>检查内存情况，并判断是否需要进行垃圾回收</li></ul>`,5)]))}const r=i(t,[["render",l],["__file","15.sysmon.html.vue"]]),d=JSON.parse('{"path":"/essential/impl/runtime/15.sysmon.html","title":"sysmon","lang":"zh-CN","frontmatter":{"description":"sysmon sysmon是一个普通的函数，直译为系统监控，去掉注释部分也就 200 来行代码。它会在程序引导阶段时被分配一个单独的线程来启动，之后会在后台不断地监控 Go 程序运行时的状态，并作出相应的处理。关于它启动这部分的代码可以在runtime.main函数中查看到： 系统监控本身只是一个for循环，每一轮循环的间隔时间为 20 微秒，随着程序...","head":[["meta",{"property":"og:url","content":"https://golang.halfiisland.com/essential/impl/runtime/15.sysmon.html"}],["meta",{"property":"og:site_name","content":"Golang 中文学习文档"}],["meta",{"property":"og:title","content":"sysmon"}],["meta",{"property":"og:description","content":"sysmon sysmon是一个普通的函数，直译为系统监控，去掉注释部分也就 200 来行代码。它会在程序引导阶段时被分配一个单独的线程来启动，之后会在后台不断地监控 Go 程序运行时的状态，并作出相应的处理。关于它启动这部分的代码可以在runtime.main函数中查看到： 系统监控本身只是一个for循环，每一轮循环的间隔时间为 20 微秒，随着程序..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-15T16:58:36.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-15T16:58:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sysmon\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-15T16:58:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"寒江蓑笠翁\\",\\"url\\":\\"https://246859.github.io/\\",\\"email\\":\\"2633565580@qq.com\\"}]}"]]},"headers":[],"git":{"createdTime":1718824041000,"updatedTime":1734281916000,"contributors":[{"name":"Mister-Hope","username":"Mister-Hope","email":"mister-hope@outlook.com","commits":1,"url":"https://github.com/Mister-Hope"},{"name":"yihhao wang","username":"yihhao wang","email":"2633565580@qq.com","commits":2,"url":"https://github.com/yihhao wang"}]},"readingTime":{"minutes":1.48,"words":222},"filePathRelative":"essential/impl/runtime/15.sysmon.md","localizedDate":"2024年6月19日","autoDesc":true,"excerpt":"\\n<p><code>sysmon</code>是一个普通的函数，直译为系统监控，去掉注释部分也就 200 来行代码。它会在程序引导阶段时被分配一个单独的线程来启动，之后会在后台不断地监控 Go 程序运行时的状态，并作出相应的处理。关于它启动这部分的代码可以在<code>runtime.main</code>函数中查看到：</p>\\n<div class=\\"language-go line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"go\\" data-title=\\"go\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">func</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> main</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">() {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    ...</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  mp</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E5C07B\\"> :=</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> getg</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">().</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">m</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">  mainStarted</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E5C07B\\"> =</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> true</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">  systemstack</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">func</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">() {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">        newm</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E06C75\\">sysmon</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\">nil</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#383A42;--shiki-dark:#C678DD\\">-</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\">1</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    })</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    ...</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{r as comp,d as data};