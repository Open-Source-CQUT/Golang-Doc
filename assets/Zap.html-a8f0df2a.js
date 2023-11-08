import{_ as t,V as o,W as p,X as n,Y as s,Z as e,a0 as c,F as i}from"./framework-f06be456.js";const l={},u=n("h1",{id:"zap",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#zap","aria-hidden":"true"},"#"),s(" Zap")],-1),r=n("p",null,"Zap是一个用Go构建的，快速的 ，结构化，级别化的日志组件。",-1),d={href:"https://github.com/uber-go/zap",target:"_blank",rel:"noopener noreferrer"},k={href:"https://pkg.go.dev/go.uber.org/zap",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get -u go.uber.org/zap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><p>官方给出了两个快速开始的示例，两个都是产品级别的日志，第一个是一个支持<code>printf</code>风格但是性能相对较低的<code>Sugar</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>logger<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> zap<span class="token punctuation">.</span><span class="token function">NewProduction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> logger<span class="token punctuation">.</span><span class="token function">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 在程序结束时将缓存同步到文件中</span>
sugar <span class="token operator">:=</span> logger<span class="token punctuation">.</span><span class="token function">Sugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
sugar<span class="token punctuation">.</span><span class="token function">Infow</span><span class="token punctuation">(</span><span class="token string">&quot;failed to fetch URL&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span>
  <span class="token string">&quot;attempt&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token string">&quot;backoff&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
sugar<span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to fetch URL: %s&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个是性能比较好，但是仅支持强类型输出的日志·<code>logger</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>logger<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> zap<span class="token punctuation">.</span><span class="token function">NewProduction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> logger<span class="token punctuation">.</span><span class="token function">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">&quot;failed to fetch URL&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// Structured context as strongly typed Field values.</span>
  zap<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;url&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">,</span>
  zap<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token string">&quot;attempt&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  zap<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span><span class="token string">&quot;backoff&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Zap的使用非常简单，麻烦的点在于配置出一个适合自己项目的日志，官方例子很少，要多读源代码注释。</p></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>一般来说日志的配置都是写在配置文件里的，Zap的配置也支持通过配置文件反序列化，但是仅支持基础的配置，即便是高级配置官方给出的例子也是十分简洁，并不足以投入使用，所以要详细讲一下细节的配置。</p><p>首先看一下总体的配置结构体，需要先搞明白里面的每一个字段的含义</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Config <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// 最小日志级别</span>
   Level AtomicLevel <span class="token string">\`json:&quot;level&quot; yaml:&quot;level&quot;\`</span> 
    <span class="token comment">// 开发模式，主要影响堆栈跟踪</span>
   Development <span class="token builtin">bool</span> <span class="token string">\`json:&quot;development&quot; yaml:&quot;development&quot;\`</span> 
    <span class="token comment">// 调用者追踪</span>
   DisableCaller <span class="token builtin">bool</span> <span class="token string">\`json:&quot;disableCaller&quot; yaml:&quot;disableCaller&quot;\`</span>
    <span class="token comment">// 堆栈跟踪</span>
   DisableStacktrace <span class="token builtin">bool</span> <span class="token string">\`json:&quot;disableStacktrace&quot; yaml:&quot;disableStacktrace&quot;\`</span>
    <span class="token comment">// 采样，在限制日志对性能占用的情况下仅记录部分比较有代表性的日志，等于日志选择性记录</span>
   Sampling <span class="token operator">*</span>SamplingConfig <span class="token string">\`json:&quot;sampling&quot; yaml:&quot;sampling&quot;\`</span>
    <span class="token comment">// 编码，分为json和console两种模式</span>
   Encoding <span class="token builtin">string</span> <span class="token string">\`json:&quot;encoding&quot; yaml:&quot;encoding&quot;\`</span>
    <span class="token comment">// 编码配置，主要是一些输出格式化的配置</span>
   EncoderConfig zapcore<span class="token punctuation">.</span>EncoderConfig <span class="token string">\`json:&quot;encoderConfig&quot; yaml:&quot;encoderConfig&quot;\`</span>
    <span class="token comment">// 日志文件输出路径</span>
   OutputPaths <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`json:&quot;outputPaths&quot; yaml:&quot;outputPaths&quot;\`</span>
    <span class="token comment">// 错误文件输出路径</span>
   ErrorOutputPaths <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`json:&quot;errorOutputPaths&quot; yaml:&quot;errorOutputPaths&quot;\`</span>
    <span class="token comment">// 给日志添加一些默认输出的内容</span>
   InitialFields <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">\`json:&quot;initialFields&quot; yaml:&quot;initialFields&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下是关于编码配置的细节</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> EncoderConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token comment">// 键值，如果key为空，那么对于的属性将不会输出</span>
   MessageKey     <span class="token builtin">string</span> <span class="token string">\`json:&quot;messageKey&quot; yaml:&quot;messageKey&quot;\`</span>
   LevelKey       <span class="token builtin">string</span> <span class="token string">\`json:&quot;levelKey&quot; yaml:&quot;levelKey&quot;\`</span>
   TimeKey        <span class="token builtin">string</span> <span class="token string">\`json:&quot;timeKey&quot; yaml:&quot;timeKey&quot;\`</span>
   NameKey        <span class="token builtin">string</span> <span class="token string">\`json:&quot;nameKey&quot; yaml:&quot;nameKey&quot;\`</span>
   CallerKey      <span class="token builtin">string</span> <span class="token string">\`json:&quot;callerKey&quot; yaml:&quot;callerKey&quot;\`</span>
   FunctionKey    <span class="token builtin">string</span> <span class="token string">\`json:&quot;functionKey&quot; yaml:&quot;functionKey&quot;\`</span>
   StacktraceKey  <span class="token builtin">string</span> <span class="token string">\`json:&quot;stacktraceKey&quot; yaml:&quot;stacktraceKey&quot;\`</span>
   SkipLineEnding <span class="token builtin">bool</span>   <span class="token string">\`json:&quot;skipLineEnding&quot; yaml:&quot;skipLineEnding&quot;\`</span>
   LineEnding     <span class="token builtin">string</span> <span class="token string">\`json:&quot;lineEnding&quot; yaml:&quot;lineEnding&quot;\`</span>
   <span class="token comment">// 一些自定义的编码器</span>
   EncodeLevel    LevelEncoder    <span class="token string">\`json:&quot;levelEncoder&quot; yaml:&quot;levelEncoder&quot;\`</span>
   EncodeTime     TimeEncoder     <span class="token string">\`json:&quot;timeEncoder&quot; yaml:&quot;timeEncoder&quot;\`</span>
   EncodeDuration DurationEncoder <span class="token string">\`json:&quot;durationEncoder&quot; yaml:&quot;durationEncoder&quot;\`</span>
   EncodeCaller   CallerEncoder   <span class="token string">\`json:&quot;callerEncoder&quot; yaml:&quot;callerEncoder&quot;\`</span>
   <span class="token comment">// 日志器名称编码器</span>
   EncodeName NameEncoder <span class="token string">\`json:&quot;nameEncoder&quot; yaml:&quot;nameEncoder&quot;\`</span>
   <span class="token comment">// 反射编码器，主要是对于interface{}类型，如果没有默认jsonencoder</span>
   NewReflectedEncoder <span class="token keyword">func</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> ReflectedEncoder <span class="token string">\`json:&quot;-&quot; yaml:&quot;-&quot;\`</span>
   <span class="token comment">// 控制台输出间隔字符串</span>
   ConsoleSeparator <span class="token builtin">string</span> <span class="token string">\`json:&quot;consoleSeparator&quot; yaml:&quot;consoleSeparator&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Option</code>是关于一些配置的开关及应用，有很多实现。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Option <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">apply</span><span class="token punctuation">(</span><span class="token operator">*</span>Logger<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Option的实现</span>
<span class="token keyword">type</span> optionFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>Logger<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f optionFunc<span class="token punctuation">)</span> <span class="token function">apply</span><span class="token punctuation">(</span>log <span class="token operator">*</span>Logger<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">f</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 应用</span>
<span class="token keyword">func</span> <span class="token function">Development</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">optionFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>log <span class="token operator">*</span>Logger<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span>development <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是最常用的日志核心，其内部的字段基本上就代表了我们配置的步骤，也可以参考官方在反序列化配置时的步骤，大致都是一样的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> ioCore <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token comment">// 日志级别</span>
   LevelEnabler
   <span class="token comment">// 日志编码</span>
   enc Encoder
   <span class="token comment">// 日志书写</span>
   out WriteSyncer
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>zap.Encoder</code> 负责日志的格式化，编码</p><p><code>zap.WriteSyncer</code> 负责日志的输出，主要是输出到文件和控制台</p><p><code>zap.LevelEnabler</code> 最小日志级别，该级别以下的日志不会再通过<code>syncer</code>输出。</p><h3 id="日志编码" tabindex="-1"><a class="header-anchor" href="#日志编码" aria-hidden="true">#</a> 日志编码</h3><p>日志编码主要涉及到对于日志的一些细节的格式化，首先看一下直接使用最原始的日志的输出。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestQuickStart</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   rawJSON <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">\`{
     &quot;level&quot;: &quot;debug&quot;,
     &quot;encoding&quot;: &quot;json&quot;,
     &quot;outputPaths&quot;: [&quot;stdout&quot;],
     &quot;errorOutputPaths&quot;: [&quot;stderr&quot;],
     &quot;initialFields&quot;: {&quot;foo&quot;: &quot;bar&quot;},
     &quot;encoderConfig&quot;: {
       &quot;messageKey&quot;: &quot;message&quot;,
       &quot;levelKey&quot;: &quot;level&quot;,
       &quot;levelEncoder&quot;: &quot;lowercase&quot;
     }
   }\`</span><span class="token punctuation">)</span>

   <span class="token keyword">var</span> cfg zap<span class="token punctuation">.</span>Config
   <span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>rawJSON<span class="token punctuation">,</span> <span class="token operator">&amp;</span>cfg<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   logger <span class="token operator">:=</span> zap<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>cfg<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> logger<span class="token punctuation">.</span><span class="token function">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

   logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">&quot;logger construction succeeded&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{&quot;level&quot;:&quot;info&quot;,&quot;message&quot;:&quot;logger construction succeeded&quot;,&quot;foo&quot;:&quot;bar&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会发现这行日志有几个问题：</p><ul><li>没有时间</li><li>没有调用者的情况，不知道这行日志是哪里输出的，不然到时候发生错误的话都没法排查</li><li>没有堆栈情况</li></ul><p>接下来就一步一步的来解决问题，主要是对<code>zapcore.EncoderConfig</code>来进行改造，首先我们要自己书写配置文件，不采用官方的直接反序列化。首先自己创建一个配置文件<code>config.yml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Zap日志配置</span>
<span class="token key atrule">zap</span><span class="token punctuation">:</span>
  <span class="token key atrule">prefix</span><span class="token punctuation">:</span> ZapLogTest
  <span class="token key atrule">timeFormat</span><span class="token punctuation">:</span> 2006/01/02 <span class="token punctuation">-</span> <span class="token datetime number">15:04:05.00000</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span> debug
  <span class="token key atrule">caller</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">stackTrace</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">encode</span><span class="token punctuation">:</span> console
  <span class="token comment"># 日志输出到哪里 file | console | both</span>
  <span class="token key atrule">writer</span><span class="token punctuation">:</span> both
  <span class="token key atrule">logFile</span><span class="token punctuation">:</span>
    <span class="token key atrule">maxSize</span><span class="token punctuation">:</span> <span class="token number">20</span>
    <span class="token key atrule">backups</span><span class="token punctuation">:</span> <span class="token number">5</span>
    <span class="token key atrule">compress</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">output</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./log/output.log&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>映射到的结构体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// ZapConfig</span>
<span class="token comment">// @Date: 2023-01-09 16:37:05</span>
<span class="token comment">// @Description: zap日志配置结构体</span>
<span class="token keyword">type</span> ZapConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Prefix     <span class="token builtin">string</span>         <span class="token string">\`yaml:&quot;prefix&quot; mapstructure:&quot;&quot;prefix\`</span>
	TimeFormat <span class="token builtin">string</span>         <span class="token string">\`yaml:&quot;timeFormat&quot; mapstructure:&quot;timeFormat&quot;\`</span>
	Level      <span class="token builtin">string</span>         <span class="token string">\`yaml:&quot;level&quot; mapstructure:&quot;level&quot;\`</span>
	Caller     <span class="token builtin">bool</span>           <span class="token string">\`yaml:&quot;caller&quot; mapstructure:&quot;caller&quot;\`</span>
	StackTrace <span class="token builtin">bool</span>           <span class="token string">\`yaml:&quot;stackTrace&quot; mapstructure:&quot;stackTrace&quot;\`</span>
	Writer     <span class="token builtin">string</span>         <span class="token string">\`yaml:&quot;writer&quot; mapstructure:&quot;writer&quot;\`</span>
	Encode     <span class="token builtin">string</span>         <span class="token string">\`yaml:&quot;encode&quot; mapstructure:&quot;encode&quot;\`</span>
	LogFile    <span class="token operator">*</span>LogFileConfig <span class="token string">\`yaml:&quot;logFile&quot; mapstructure:&quot;logFile&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token comment">// LogFileConfig</span>
<span class="token comment">// @Date: 2023-01-09 16:38:45</span>
<span class="token comment">// @Description: 日志文件配置结构体</span>
<span class="token keyword">type</span> LogFileConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	MaxSize  <span class="token builtin">int</span>      <span class="token string">\`yaml:&quot;maxSize&quot; mapstructure:&quot;maxSize&quot;\`</span>
	BackUps  <span class="token builtin">int</span>      <span class="token string">\`yaml:&quot;backups&quot; mapstructure:&quot;backups&quot;\`</span>
	Compress <span class="token builtin">bool</span>     <span class="token string">\`yaml:&quot;compress&quot; mapstructure:&quot;compress&quot;\`</span>
	Output   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`yaml:&quot;output&quot; mapstructure:&quot;output&quot;\`</span>
	Errput   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`yaml:&quot;errput&quot; mapstructure:&quot;errput&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>读取配置使用<code>Viper</code>，具体代码省略。</p></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> TimeEncoder <span class="token keyword">func</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> PrimitiveArrayEncoder<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>TimerEncoder</code>本质上其实是一个函数，我们可以采用官方提供的其他时间编码器，也可以自行编写。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CustomTimeFormatEncoder</span><span class="token punctuation">(</span>t time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> encoder zapcore<span class="token punctuation">.</span>PrimitiveArrayEncoder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   encoder<span class="token punctuation">.</span><span class="token function">AppendString</span><span class="token punctuation">(</span>global<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>ZapConfig<span class="token punctuation">.</span>Prefix <span class="token operator">+</span> <span class="token string">&quot;\\t&quot;</span> <span class="token operator">+</span> t<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>global<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>ZapConfig<span class="token punctuation">.</span>TimeFormat<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体部分如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">zapEncoder</span><span class="token punctuation">(</span>config <span class="token operator">*</span>ZapConfig<span class="token punctuation">)</span> zapcore<span class="token punctuation">.</span>Encoder <span class="token punctuation">{</span>
   <span class="token comment">// 新建一个配置</span>
   encoderConfig <span class="token operator">:=</span> zapcore<span class="token punctuation">.</span>EncoderConfig<span class="token punctuation">{</span>
      TimeKey<span class="token punctuation">:</span>       <span class="token string">&quot;Time&quot;</span><span class="token punctuation">,</span>
      LevelKey<span class="token punctuation">:</span>      <span class="token string">&quot;Level&quot;</span><span class="token punctuation">,</span>
      NameKey<span class="token punctuation">:</span>       <span class="token string">&quot;Logger&quot;</span><span class="token punctuation">,</span>
      CallerKey<span class="token punctuation">:</span>     <span class="token string">&quot;Caller&quot;</span><span class="token punctuation">,</span>
      MessageKey<span class="token punctuation">:</span>    <span class="token string">&quot;Message&quot;</span><span class="token punctuation">,</span>
      StacktraceKey<span class="token punctuation">:</span> <span class="token string">&quot;StackTrace&quot;</span><span class="token punctuation">,</span>
      LineEnding<span class="token punctuation">:</span>    zapcore<span class="token punctuation">.</span>DefaultLineEnding<span class="token punctuation">,</span>
      FunctionKey<span class="token punctuation">:</span>   zapcore<span class="token punctuation">.</span>OmitKey<span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 自定义时间格式</span>
   encoderConfig<span class="token punctuation">.</span>EncodeTime <span class="token operator">=</span> CustomTimeFormatEncoder
   <span class="token comment">// 日志级别大写</span>
   encoderConfig<span class="token punctuation">.</span>EncodeLevel <span class="token operator">=</span> zapcore<span class="token punctuation">.</span>CapitalColorLevelEncoder
   <span class="token comment">// 秒级时间间隔</span>
   encoderConfig<span class="token punctuation">.</span>EncodeDuration <span class="token operator">=</span> zapcore<span class="token punctuation">.</span>SecondsDurationEncoder
   <span class="token comment">// 简短的调用者输出</span>
   encoderConfig<span class="token punctuation">.</span>EncodeCaller <span class="token operator">=</span> zapcore<span class="token punctuation">.</span>ShortCallerEncoder
   <span class="token comment">// 完整的序列化logger名称</span>
   encoderConfig<span class="token punctuation">.</span>EncodeName <span class="token operator">=</span> zapcore<span class="token punctuation">.</span>FullNameEncoder
   <span class="token comment">// 最终的日志编码 json或者console</span>
   <span class="token keyword">switch</span> config<span class="token punctuation">.</span>Encode <span class="token punctuation">{</span>
   <span class="token keyword">case</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">:</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span> zapcore<span class="token punctuation">.</span><span class="token function">NewJSONEncoder</span><span class="token punctuation">(</span>encoderConfig<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token keyword">case</span> <span class="token string">&quot;console&quot;</span><span class="token punctuation">:</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span> zapcore<span class="token punctuation">.</span><span class="token function">NewConsoleEncoder</span><span class="token punctuation">(</span>encoderConfig<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 默认console</span>
   <span class="token keyword">return</span> zapcore<span class="token punctuation">.</span><span class="token function">NewConsoleEncoder</span><span class="token punctuation">(</span>encoderConfig<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日式输出" tabindex="-1"><a class="header-anchor" href="#日式输出" aria-hidden="true">#</a> 日式输出</h3><p>日志输出分为控制台输出和文件输出，我们可以根据配置文件来进行动态配置，并且如果想要进行日志文件切割的话还需要使用另一个第三方的依赖。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get -u github.com/natefinch/lumberjack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code> <span class="token keyword">func</span> <span class="token function">zapWriteSyncer</span><span class="token punctuation">(</span>cfg <span class="token operator">*</span>ZapConfig<span class="token punctuation">)</span> zapcore<span class="token punctuation">.</span>WriteSyncer <span class="token punctuation">{</span>
   syncers <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>zapcore<span class="token punctuation">.</span>WriteSyncer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
   <span class="token comment">// 如果开启了日志控制台输出，就加入控制台书写器</span>
   <span class="token keyword">if</span> cfg<span class="token punctuation">.</span>Writer <span class="token operator">==</span> config<span class="token punctuation">.</span>WriteBoth <span class="token operator">||</span> cfg<span class="token punctuation">.</span>Writer <span class="token operator">==</span> config<span class="token punctuation">.</span>WriteConsole <span class="token punctuation">{</span>
      syncers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>syncers<span class="token punctuation">,</span> zapcore<span class="token punctuation">.</span><span class="token function">AddSync</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// 如果开启了日志文件存储，就根据文件路径切片加入书写器</span>
   <span class="token keyword">if</span> cfg<span class="token punctuation">.</span>Writer <span class="token operator">==</span> config<span class="token punctuation">.</span>WriteBoth <span class="token operator">||</span> cfg<span class="token punctuation">.</span>Writer <span class="token operator">==</span> config<span class="token punctuation">.</span>WriteFile <span class="token punctuation">{</span>
      <span class="token comment">// 添加日志输出器</span>
      <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> path <span class="token operator">:=</span> <span class="token keyword">range</span> cfg<span class="token punctuation">.</span>LogFile<span class="token punctuation">.</span>Output <span class="token punctuation">{</span>
         logger <span class="token operator">:=</span> <span class="token operator">&amp;</span>lumberjack<span class="token punctuation">.</span>Logger<span class="token punctuation">{</span>
            Filename<span class="token punctuation">:</span>   path<span class="token punctuation">,</span> <span class="token comment">//文件路径</span>
            MaxSize<span class="token punctuation">:</span>    cfg<span class="token punctuation">.</span>LogFile<span class="token punctuation">.</span>MaxSize<span class="token punctuation">,</span> <span class="token comment">//分割文件的大小</span>
            MaxBackups<span class="token punctuation">:</span> cfg<span class="token punctuation">.</span>LogFile<span class="token punctuation">.</span>BackUps<span class="token punctuation">,</span> <span class="token comment">//备份次数</span>
            Compress<span class="token punctuation">:</span>   cfg<span class="token punctuation">.</span>LogFile<span class="token punctuation">.</span>Compress<span class="token punctuation">,</span> <span class="token comment">// 是否压缩</span>
            LocalTime<span class="token punctuation">:</span>  <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//使用本地时间</span>
         <span class="token punctuation">}</span>
         syncers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>syncers<span class="token punctuation">,</span> zapcore<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span>zapcore<span class="token punctuation">.</span><span class="token function">AddSync</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> zap<span class="token punctuation">.</span><span class="token function">CombineWriteSyncers</span><span class="token punctuation">(</span>syncers<span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日志级别" tabindex="-1"><a class="header-anchor" href="#日志级别" aria-hidden="true">#</a> 日志级别</h3><p>官方有关于日志级别的枚举项，直接使用即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">zapLevelEnabler</span><span class="token punctuation">(</span>cfg <span class="token operator">*</span>ZapConfig<span class="token punctuation">)</span> zapcore<span class="token punctuation">.</span>LevelEnabler <span class="token punctuation">{</span>
   <span class="token keyword">switch</span> cfg<span class="token punctuation">.</span>Level <span class="token punctuation">{</span>
   <span class="token keyword">case</span> config<span class="token punctuation">.</span>DebugLevel<span class="token punctuation">:</span>
      <span class="token keyword">return</span> zap<span class="token punctuation">.</span>DebugLevel
   <span class="token keyword">case</span> config<span class="token punctuation">.</span>InfoLevel<span class="token punctuation">:</span>
      <span class="token keyword">return</span> zap<span class="token punctuation">.</span>InfoLevel
   <span class="token keyword">case</span> config<span class="token punctuation">.</span>ErrorLevel<span class="token punctuation">:</span>
      <span class="token keyword">return</span> zap<span class="token punctuation">.</span>ErrorLevel
   <span class="token keyword">case</span> config<span class="token punctuation">.</span>PanicLevel<span class="token punctuation">:</span>
      <span class="token keyword">return</span> zap<span class="token punctuation">.</span>PanicLevel
   <span class="token keyword">case</span> config<span class="token punctuation">.</span>FatalLevel<span class="token punctuation">:</span>
      <span class="token keyword">return</span> zap<span class="token punctuation">.</span>FatalLevel
   <span class="token punctuation">}</span>
   <span class="token comment">// 默认Debug级别</span>
   <span class="token keyword">return</span> zap<span class="token punctuation">.</span>DebugLevel
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最后构建" tabindex="-1"><a class="header-anchor" href="#最后构建" aria-hidden="true">#</a> 最后构建</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">InitZap</span><span class="token punctuation">(</span>config <span class="token operator">*</span>ZapConfig<span class="token punctuation">)</span> <span class="token operator">*</span>zap<span class="token punctuation">.</span>Logger <span class="token punctuation">{</span>
   <span class="token comment">// 构建编码器</span>
   encoder <span class="token operator">:=</span> <span class="token function">zapEncoder</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
   <span class="token comment">// 构建日志级别</span>
   levelEnabler <span class="token operator">:=</span> <span class="token function">zapLevelEnabler</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
   <span class="token comment">// 最后获得Core和Options</span>
   subCore<span class="token punctuation">,</span> options <span class="token operator">:=</span> <span class="token function">tee</span><span class="token punctuation">(</span>config<span class="token punctuation">,</span> encoder<span class="token punctuation">,</span> levelEnabler<span class="token punctuation">)</span>
    <span class="token comment">// 创建Logger</span>
   <span class="token keyword">return</span> zap<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>subCore<span class="token punctuation">,</span> options<span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将所有合并</span>
<span class="token keyword">func</span> <span class="token function">tee</span><span class="token punctuation">(</span>cfg <span class="token operator">*</span>ZapConfig<span class="token punctuation">,</span> encoder zapcore<span class="token punctuation">.</span>Encoder<span class="token punctuation">,</span> levelEnabler zapcore<span class="token punctuation">.</span>LevelEnabler<span class="token punctuation">)</span> <span class="token punctuation">(</span>core zapcore<span class="token punctuation">.</span>Core<span class="token punctuation">,</span> options <span class="token punctuation">[</span><span class="token punctuation">]</span>zap<span class="token punctuation">.</span>Option<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   sink <span class="token operator">:=</span> <span class="token function">zapWriteSyncer</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
   <span class="token keyword">return</span> zapcore<span class="token punctuation">.</span><span class="token function">NewCore</span><span class="token punctuation">(</span>encoder<span class="token punctuation">,</span> sink<span class="token punctuation">,</span> levelEnabler<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">buildOptions</span><span class="token punctuation">(</span>cfg<span class="token punctuation">,</span> levelEnabler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构建Option</span>
<span class="token keyword">func</span> <span class="token function">buildOptions</span><span class="token punctuation">(</span>cfg <span class="token operator">*</span>ZapConfig<span class="token punctuation">,</span> levelEnabler zapcore<span class="token punctuation">.</span>LevelEnabler<span class="token punctuation">)</span> <span class="token punctuation">(</span>options <span class="token punctuation">[</span><span class="token punctuation">]</span>zap<span class="token punctuation">.</span>Option<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> cfg<span class="token punctuation">.</span>Caller <span class="token punctuation">{</span>
      options <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>options<span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">AddCaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">if</span> cfg<span class="token punctuation">.</span>StackTrace <span class="token punctuation">{</span>
      options <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>options<span class="token punctuation">,</span> zap<span class="token punctuation">.</span><span class="token function">AddStacktrace</span><span class="token punctuation">(</span>levelEnabler<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后效果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZapLogTest      2023/01/09 - 19:44:00.91076     INFO    demo/zap.go:49     日志初始化完成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,49);function m(b,g){const a=i("ExternalLinkIcon");return o(),p("div",null,[u,r,n("p",null,[s("官方仓库："),n("a",d,[s("uber-go/zap: Blazing fast, structured, leveled logging in Go. (github.com)"),e(a)])]),n("p",null,[s("官方文档："),n("a",k,[s("zap package - go.uber.org/zap - Go Packages"),e(a)])]),v])}const f=t(l,[["render",m],["__file","Zap.html.vue"]]);export{f as default};
