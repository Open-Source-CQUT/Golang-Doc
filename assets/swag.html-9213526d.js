import{_ as t,V as i,W as o,X as n,Y as s,Z as e,a0 as p,F as c}from"./framework-f06be456.js";const l={},u=n("h1",{id:"swag",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#swag","aria-hidden":"true"},"#"),s(" swag")],-1),r=n("p",null,[s("swaggo/swag是Swagger API 2.0在go语言中的一个实现，通过在书写指定格式的注释就可以生成"),n("code",null,"swagger.json"),s("和"),n("code",null,"swagger.yaml"),s("类型的接口文档，方便导出和导入。")],-1),d={href:"https://github.com/swaggo/swag",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/swaggo/swag#readme",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"swag默认支持的web框架如下所示，本文以gin为例子，来演示gin结合swagger快速生成接口文档的例子。",-1),m={href:"http://github.com/swaggo/gin-swagger",target:"_blank",rel:"noopener noreferrer"},v={href:"http://github.com/swaggo/echo-swagger",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/swaggo/buffalo-swagger",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/swaggo/http-swagger",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/swaggo/http-swagger",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/swaggo/http-swagger",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/i-love-flamingo/swagger",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/gofiber/swagger",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/Nerzal/atreugo-swagger",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/hertz-contrib/swagger",target:"_blank",rel:"noopener noreferrer"},S={class:"hint-container tip"},j=n("p",{class:"hint-container-title"},"提示",-1),T={href:"https://swagger.io/docs/specification/about/",target:"_blank",rel:"noopener noreferrer"},I=p(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>首先下载swagger命令行工具</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go install github.com/swaggo/swag/cmd/swag@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后下载swagger源码依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/swaggo/swag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>为避免出现问题，两者版本必须保持一致。</p></div><p>然后下载swagger的静态文件库，html，css，js之类的，都被嵌到了go代码中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/swaggo/files@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后下载swagger的gin适配库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get github.com/swaggo/gin-swagger@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为本文是只用gin做示例，其他web框架的适配器请自行了解，基本都是大同小异。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>使用go mod创建一个最基本的go项目，新建<code>main.go</code>，写入如下内容。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// @title           Swagger Example API</span>
<span class="token comment">// @version         1.0</span>
<span class="token comment">// @description     This is a sample server celler server.</span>

<span class="token comment">// @contact.name   API Support</span>
<span class="token comment">// @contact.url    http://www.swagger.io/support</span>
<span class="token comment">// @contact.email  support@swagger.io</span>

<span class="token comment">// @BasePath  /api/v1</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	engine <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1/ping&quot;</span><span class="token punctuation">,</span> Ping<span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:80&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Ping godoc</span>
<span class="token comment">// @Summary      say hello world</span>
<span class="token comment">// @Description  return hello world json format content</span>
<span class="token comment">// @param       name query    string  true  &quot;name&quot;</span>
<span class="token comment">// @Tags         system</span>
<span class="token comment">// @Produce      json</span>
<span class="token comment">// @Router       /ping [get]</span>
<span class="token keyword">func</span> <span class="token function">Ping</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
		<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!%s&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个很简单的gin web例子，main函数上的注释是文档的基本信息，Ping函数则是一个普通的接口。接下来执行命令生成文档，默认是在<code>main.go</code>同级的docs目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swag init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改<code>main.go</code>代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
    swaggerFiles <span class="token string">&quot;github.com/swaggo/files&quot;</span>
    ginSwagger <span class="token string">&quot;github.com/swaggo/gin-swagger&quot;</span>
    <span class="token comment">// 匿名导入生成的接口文档包</span>
    <span class="token boolean">_</span> <span class="token string">&quot;golearn/docs&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// @title           Swagger Example API</span>
<span class="token comment">// @version         1.0</span>
<span class="token comment">// @description     This is a sample server celler server.</span>

<span class="token comment">// @contact.name   API Support</span>
<span class="token comment">// @contact.url    http://www.swagger.io/support</span>
<span class="token comment">// @contact.email  support@swagger.io</span>

<span class="token comment">// @BasePath  /api/v1</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    engine <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 注册swagger静态文件路由</span>
    engine<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/swagger/*any&quot;</span><span class="token punctuation">,</span> ginSwagger<span class="token punctuation">.</span><span class="token function">WrapHandler</span><span class="token punctuation">(</span>swaggerFiles<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span><span class="token punctuation">)</span>
    engine<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1/ping&quot;</span><span class="token punctuation">,</span> Ping<span class="token punctuation">)</span>
    engine<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:80&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Ping godoc</span>
<span class="token comment">// @Summary      say hello world</span>
<span class="token comment">// @Description  return hello world json format content</span>
<span class="token comment">// @param       name query    string  true  &quot;name&quot;</span>
<span class="token comment">// @Tags         system</span>
<span class="token comment">// @Produce      json</span>
<span class="token comment">// @Router       /ping [get]</span>
<span class="token keyword">func</span> <span class="token function">Ping</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
       <span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!%s&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序，访问<code>127.0.0.1/swagger/index.html</code>，界面如下</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308132014682.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如此便运行起了一个基本的接口文档。接下来除了一些特别要注意的点，基本上和其他语言使用起来没有什么太大的差别。</p><h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2><p>定义参数的格式为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@param name paramtype datatype isRequired comment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>@param userId query <span class="token builtin">int</span> <span class="token boolean">true</span> <span class="token string">&quot;user unique id&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中支持的参数类型有</p><ul><li>query</li><li>path</li><li>header</li><li>body</li><li>formData</li></ul><p>数据类型有</p><ul><li>string (string)</li><li>integer (int, uint, uint32, uint64)</li><li>number (float32)</li><li>boolean (bool)</li><li>user defined struct</li></ul><p>参数类型也可以是你自己的类型，前提是能够被swagger扫描到。</p><h2 id="响应" tabindex="-1"><a class="header-anchor" href="#响应" aria-hidden="true">#</a> 响应</h2><p>定义接口响应的基本格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// @Success      200  {array}   model.Account</span>
<span class="token comment">// @Failure      400  {object}  httputil.HTTPError</span>
<span class="token comment">// @Failure      404  {object}  httputil.HTTPError</span>
<span class="token comment">// @Failure      500  {object}  httputil.HTTPError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由状态码，基本类型，数据类型组成。<code>{array}</code>表示是一个数组，会展现数据类型的数组形式，<code>{object}</code>就会展现数据类型的原有形式。比如一般我们会定义一个统一的响应体</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> JSONResult <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Code    <span class="token builtin">int</span>          <span class="token string">\`json:&quot;code&quot; \`</span>
    Message <span class="token builtin">string</span>       <span class="token string">\`json:&quot;message&quot;\`</span>
    Data    <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token string">\`json:&quot;data&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Data</code>字段的类型是不确定的，在描述响应用例时，可以将其组合，如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 组合</span>
@success <span class="token number">200</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> jsonresult<span class="token punctuation">.</span>JSONResult<span class="token punctuation">{</span>data<span class="token operator">=</span>Account<span class="token punctuation">}</span> <span class="token string">&quot;desc&quot;</span>

<span class="token comment">// 数组</span>
@success <span class="token number">200</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> jsonresult<span class="token punctuation">.</span>JSONResult<span class="token punctuation">{</span>data<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Account<span class="token punctuation">}</span> <span class="token string">&quot;desc&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模型" tabindex="-1"><a class="header-anchor" href="#模型" aria-hidden="true">#</a> 模型</h2><p>给结构体字段加注释会被被swagger扫描为模型字段注释</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> model

<span class="token keyword">type</span> Account <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// account id</span>
    ID   <span class="token builtin">int</span>    <span class="token string">\`json:&quot;id&quot; example:&quot;1&quot;\`</span>
    <span class="token comment">// username</span>
    Name <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot; example:&quot;account name&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>example</code>标签的值会被作为示例值在页面中展示，当然它还支持字段限制</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Foo <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Bar <span class="token builtin">string</span> <span class="token string">\`minLength:&quot;4&quot; maxLength:&quot;16&quot;\`</span>
    Baz <span class="token builtin">int</span> <span class="token string">\`minimum:&quot;10&quot; maximum:&quot;20&quot; default:&quot;15&quot;\`</span>
    Qux <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`enums:&quot;foo,bar,baz&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有的模型在使用时都要确保能被swagger扫描到，否则不会起作用。</p><h2 id="认证" tabindex="-1"><a class="header-anchor" href="#认证" aria-hidden="true">#</a> 认证</h2><p>在认证这块支持</p><ul><li>Basic Auth</li><li>API Key</li><li>OAuth2 app auth</li><li>OAuth2 implicit auth</li><li>OAuth2 password auth</li><li>OAuth2 access code auth</li></ul><p>假如接口认证用的是JWT，存放在header中的<code>Authorization</code>字段中，我们可以如下定义</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// @securityDefinitions.apikey Bearer</span>
<span class="token comment">// @in header</span>
<span class="token comment">// @name Authorization</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202310171234737.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>本质上这只是一个apikey，如果你传入的是bearer token的话，需要自己手动加上Bearer前缀。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202310172158864.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后在你需要认证的接口上加上如下注释</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// @security Bearer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它的值是你的<code>securityDefinitions</code>定义的名称。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>swag实际上是将多个不同的swagger实例存放在一个map中，ginSwagger作为适配器从实例中读取<code>doc.json</code>也就是API接口的定义文件，swaggerFiles提供静态的HTML文件用于展示网页，解析API定义并生成界面，整个流程明白以后，就可以进行自定义的操作了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Name is a unique name be used to register swag instance.</span>
<span class="token comment">// 默认实例名称</span>
<span class="token keyword">const</span> Name <span class="token operator">=</span> <span class="token string">&quot;swagger&quot;</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	swaggerMu sync<span class="token punctuation">.</span>RWMutex
    <span class="token comment">// 实例表</span>
	swags     <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>Swagger
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CustomWrapHandler</span><span class="token punctuation">(</span>config <span class="token operator">*</span>Config<span class="token punctuation">,</span> handler <span class="token operator">*</span>webdav<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
    <span class="token keyword">var</span> once sync<span class="token punctuation">.</span>Once

    <span class="token keyword">if</span> config<span class="token punctuation">.</span>InstanceName <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
       config<span class="token punctuation">.</span>InstanceName <span class="token operator">=</span> swag<span class="token punctuation">.</span>Name
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> config<span class="token punctuation">.</span>Title <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
       config<span class="token punctuation">.</span>Title <span class="token operator">=</span> <span class="token string">&quot;Swagger UI&quot;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// create a template with name</span>
    index<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;swagger_index.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>swaggerIndexTpl<span class="token punctuation">)</span>

    <span class="token keyword">var</span> matcher <span class="token operator">=</span> regexp<span class="token punctuation">.</span><span class="token function">MustCompile</span><span class="token punctuation">(</span><span class="token string">\`(.*)(index\\.html|doc\\.json|favicon-16x16\\.png|favicon-32x32\\.png|/oauth2-redirect\\.html|swagger-ui\\.css|swagger-ui\\.css\\.map|swagger-ui\\.js|swagger-ui\\.js\\.map|swagger-ui-bundle\\.js|swagger-ui-bundle\\.js\\.map|swagger-ui-standalone-preset\\.js|swagger-ui-standalone-preset\\.js\\.map)[?|.]*\`</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method <span class="token operator">!=</span> http<span class="token punctuation">.</span>MethodGet <span class="token punctuation">{</span>
          ctx<span class="token punctuation">.</span><span class="token function">AbortWithStatus</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusMethodNotAllowed<span class="token punctuation">)</span>

          <span class="token keyword">return</span>
       <span class="token punctuation">}</span>
	
       <span class="token comment">// 路由匹配</span>
       matches <span class="token operator">:=</span> matcher<span class="token punctuation">.</span><span class="token function">FindStringSubmatch</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>RequestURI<span class="token punctuation">)</span>

       <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">3</span> <span class="token punctuation">{</span>
          ctx<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusNotFound<span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">StatusText</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusNotFound<span class="token punctuation">)</span><span class="token punctuation">)</span>

          <span class="token keyword">return</span>
       <span class="token punctuation">}</span>

       path <span class="token operator">:=</span> matches<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
       once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          handler<span class="token punctuation">.</span>Prefix <span class="token operator">=</span> matches<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span>
		
       <span class="token keyword">switch</span> filepath<span class="token punctuation">.</span><span class="token function">Ext</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">case</span> <span class="token string">&quot;.html&quot;</span><span class="token punctuation">:</span>
          ctx<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/html; charset=utf-8&quot;</span><span class="token punctuation">)</span>
       <span class="token keyword">case</span> <span class="token string">&quot;.css&quot;</span><span class="token punctuation">:</span>
          ctx<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;text/css; charset=utf-8&quot;</span><span class="token punctuation">)</span>
       <span class="token keyword">case</span> <span class="token string">&quot;.js&quot;</span><span class="token punctuation">:</span>
          ctx<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/javascript&quot;</span><span class="token punctuation">)</span>
       <span class="token keyword">case</span> <span class="token string">&quot;.png&quot;</span><span class="token punctuation">:</span>
          ctx<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;image/png&quot;</span><span class="token punctuation">)</span>
       <span class="token keyword">case</span> <span class="token string">&quot;.json&quot;</span><span class="token punctuation">:</span>
          ctx<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json; charset=utf-8&quot;</span><span class="token punctuation">)</span>
       <span class="token punctuation">}</span>

       <span class="token keyword">switch</span> path <span class="token punctuation">{</span>
       <span class="token comment">// 主页</span>
       <span class="token keyword">case</span> <span class="token string">&quot;index.html&quot;</span><span class="token punctuation">:</span>
          <span class="token boolean">_</span> <span class="token operator">=</span> index<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> config<span class="token punctuation">.</span><span class="token function">toSwaggerConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
       <span class="token comment">// API描述文件</span>
       <span class="token keyword">case</span> <span class="token string">&quot;doc.json&quot;</span><span class="token punctuation">:</span>
          doc<span class="token punctuation">,</span> err <span class="token operator">:=</span> swag<span class="token punctuation">.</span><span class="token function">ReadDoc</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>InstanceName<span class="token punctuation">)</span>
          <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
             ctx<span class="token punctuation">.</span><span class="token function">AbortWithStatus</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusInternalServerError<span class="token punctuation">)</span>

             <span class="token keyword">return</span>
          <span class="token punctuation">}</span>

          ctx<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> doc<span class="token punctuation">)</span>
       <span class="token keyword">default</span><span class="token punctuation">:</span>
          handler<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>Request<span class="token punctuation">)</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过生成的go代码来自动完成实例注册，下方是自动生成的<code>docs.go</code>的部分代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// SwaggerInfo holds exported Swagger Info so clients can modify it</span>
<span class="token keyword">var</span> SwaggerInfo <span class="token operator">=</span> <span class="token operator">&amp;</span>swag<span class="token punctuation">.</span>Spec<span class="token punctuation">{</span>
	Version<span class="token punctuation">:</span>          <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
	Host<span class="token punctuation">:</span>             <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
	BasePath<span class="token punctuation">:</span>         <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
	Schemes<span class="token punctuation">:</span>          <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	Title<span class="token punctuation">:</span>            <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
	Description<span class="token punctuation">:</span>      <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
	InfoInstanceName<span class="token punctuation">:</span> <span class="token string">&quot;swagger&quot;</span><span class="token punctuation">,</span>
	SwaggerTemplate<span class="token punctuation">:</span>  docTemplate<span class="token punctuation">,</span>
	LeftDelim<span class="token punctuation">:</span>        <span class="token string">&quot;{{&quot;</span><span class="token punctuation">,</span>
	RightDelim<span class="token punctuation">:</span>       <span class="token string">&quot;}}&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 注册实例</span>
	swag<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>SwaggerInfo<span class="token punctuation">.</span><span class="token function">InstanceName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> SwaggerInfo<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在<code>init</code>函数中有一个Register函数用来注册当前实例，如果想要修改实例名称不建议在该文件进行编辑，因为<code>docs.go</code>文件是自动生成的，只需要在生成代码时使用<code>--instanceName appapi</code>参数。为了方便，可以使用go generate命令嵌入的到go文件中，方便自动生成代码，如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// swagger declarative api comment</span>

<span class="token comment">// @title App Internal API Documentation</span>
<span class="token comment">// @version v1.0.0</span>
<span class="token comment">// @description Wilson api documentation</span>
<span class="token comment">// @BasePath /api/v1</span>
<span class="token comment">//go:generate swag init --generatedTime --instanceName appapi -g api.go -d ./ --output ./swagger</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>个人并不喜欢将swagger的通用信息注释写在<code>main.go</code>或<code>main</code>函数上，将这些注释写在<code>go generate</code>上方最合适不过。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果需要多个实例，务必保持实例名称唯一，否则会<code>panic</code></p></div><p>为了定制化一些配置，需要用<code>ginSwagger.CustomWrapHandler</code>，它相比前者多了一个Config参数，释义如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Config stores ginSwagger configuration variables.</span>
<span class="token keyword">type</span> Config <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// The url pointing to API definition (normally swagger.json or swagger.yaml). Default is \`doc.json\`.</span>
	URL                      <span class="token builtin">string</span>
    <span class="token comment">// 接口列表展开状态</span>
	DocExpansion             <span class="token builtin">string</span>
    <span class="token comment">// 实例名称</span>
	InstanceName             <span class="token builtin">string</span>
    <span class="token comment">// 标题</span>
	Title                    <span class="token builtin">string</span>
    <span class="token comment">// 展开深度</span>
	DefaultModelsExpandDepth <span class="token builtin">int</span>
    <span class="token comment">// 顾名思义</span>
	DeepLinking              <span class="token builtin">bool</span>
	PersistAuthorization     <span class="token builtin">bool</span>
	Oauth2DefaultClientID    <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>swaggerFiles.NewHandler()</code>来替代默认的Handler，在多个实例时尤其要如此。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>engine<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span>openapi<span class="token punctuation">.</span>ApiDoc<span class="token punctuation">,</span> ginSwagger<span class="token punctuation">.</span><span class="token function">CustomWrapHandler</span><span class="token punctuation">(</span>openapi<span class="token punctuation">.</span>Config<span class="token punctuation">,</span> swaggerFiles<span class="token punctuation">.</span><span class="token function">NewHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除此之外还可以进行类型重写等一系列操作，都是比较简单的，更多内容可以阅读官方文档。</p><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2><ol><li><p>swag是根据注释来生成openapi的接口描述文件的，在生成时，指定的目录必须要包含接口文档的基本信息，默认是在<code>main.go</code>里面查找</p></li><li><p><code>swag init</code>默认指定的是当前目录，值为<code>./</code>，可以使用<code>swag init -d</code>指定多个目录，使用逗号分隔，第一个指定的目录必须包含接口文档的基本信息。例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swag init -d ./,./api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>-g</code>，接口文档的基本信息的存放文件可以自定义文件名，默认是<code>main.go</code>，在生成文档时，使用<code>-g</code>参数指定文件名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swag init -g api.go -d ./,./api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令的意思是在<code>./api.go</code>解析接口文档的基本信息，同时在<code>./</code>和<code>./api</code>两个目录下查找和解析其他接口的注释信息并生成对应的文档。</p></li><li><p><code>-o</code>参数可以指定文档描述文件的输出路径，默认是<code>./docs</code>，例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swag init -o ./api/docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>--ot</code>可以指定输出文件类型，默认是（docs.go,swagger.json,swagger.yaml），如果想要使用go程序加载swagger ui，go文件是必不可少的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swag init --ot go,yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其余生成的json和yaml文件可以方便在其他接口管理软件上导入数据。</p></li><li><p>注释写在哪里都一样，就算不写在函数上也一样能解析，只是写在函数上可读性好一些，本质上还是一个以注释形式和go源代码嵌在一起的DSL。</p></li><li><p>swag还支持很多其他的参数，可以使用<code>swag init -h</code>查看。</p></li></ol>`,72);function A(P,N){const a=c("ExternalLinkIcon");return i(),o("div",null,[u,r,n("p",null,[s("仓库："),n("a",d,[s("swaggo/swag: Automatically generate RESTful API documentation with Swagger 2.0 for Go. (github.com)"),e(a)])]),n("p",null,[s("文档："),n("a",g,[s("swaggo/swag: Automatically generate RESTful API documentation with Swagger 2.0 for Go. (github.com)"),e(a)])]),k,n("ul",null,[n("li",null,[n("a",m,[s("gin"),e(a)])]),n("li",null,[n("a",v,[s("echo"),e(a)])]),n("li",null,[n("a",b,[s("buffalo"),e(a)])]),n("li",null,[n("a",h,[s("net/http"),e(a)])]),n("li",null,[n("a",w,[s("gorilla/mux"),e(a)])]),n("li",null,[n("a",f,[s("go-chi/chi"),e(a)])]),n("li",null,[n("a",q,[s("flamingo"),e(a)])]),n("li",null,[n("a",x,[s("fiber"),e(a)])]),n("li",null,[n("a",y,[s("atreugo"),e(a)])]),n("li",null,[n("a",_,[s("hertz"),e(a)])])]),n("div",S,[j,n("p",null,[s("如果不熟悉swagger语法，可以前往"),n("a",T,[s("About Swagger Specification | Documentation | Swagger"),e(a)])])]),I])}const H=t(l,[["render",A],["__file","swag.html.vue"]]);export{H as default};
