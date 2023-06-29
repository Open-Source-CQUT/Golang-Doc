import{_ as s,V as l,W as t,X as e,Y as a,$ as i,Z as d,F as r}from"./framework-44a66fc7.js";const c={},o=e("h1",{id:"casbin",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#casbin","aria-hidden":"true"},"#"),a(" Casbin")],-1),u={href:"https://github.com/casbin/casbin",target:"_blank",rel:"noopener noreferrer"},p={href:"https://casbin.org/zh/docs/overview",target:"_blank",rel:"noopener noreferrer"},v=d(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>本文只能算是一个Casbin入门文章，如果想要更细致的了解请前往官网进行学习。</p></div><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>在一个系统中，后端程序员需要负责对于API权限的管理，而这需要耗费大量的工作，倘若每一个项目都要自己手写一套，将会浪费大量的时间。拥有更多人力物力的大公司会更倾向于自己开发一套权限框架，但是大部分中小公司承受不起这种开发成本，所以市面上开源的权限框架成为了他们的首选。Casbin就是这样一个开源高效的访问控制库，本身是采用Go语言进行开发，同时也支持其他的主流语言。</p><p>需要注意的是，Casbin仅仅只是一个访问控制框架，只负责访问控制，访问认证方面的逻辑并不由Casbin负责，它仅仅存储用户与角色之间的映射关系。支持以下访问控制模型：</p><ol><li>ACL (Access Control List, 访问控制列表)</li><li>具有超级用户的ACL</li><li><strong>没有用户的 ACL</strong>: 对于没有身份验证或用户登录的系统尤其有用。</li><li><strong>没有资源的 ACL</strong>: 某些场景可能只针对资源的类型, 而不是单个资源, 诸如 <code>write-article</code>, <code>read-log</code>等权限。 它不控制对特定文章或日志的访问。</li><li>RBAC (基于角色的访问控制)</li><li><strong>支持资源角色的RBAC</strong>: 用户和资源可以同时具有角色 (或组)。</li><li><strong>支持域/租户的RBAC</strong>: 用户可以为不同的域/租户设置不同的角色集。</li><li>ABAC (基于属性的访问控制): 支持利用<code>resource.Owner</code>这种语法糖获取元素的属性。</li><li>RESTful: 支持路径, 如 <code>/res/*</code>, <code>/res/: id</code> 和 HTTP 方法, 如 <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>。</li><li><strong>拒绝优先</strong>: 支持允许和拒绝授权, 拒绝优先于允许。</li><li><strong>优先级</strong>: 策略规则按照先后次序确定优先级，类似于防火墙规则</li></ol><h2 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理" aria-hidden="true">#</a> 工作原理</h2><p>在Casbin中，访问控制模型被抽象为基于PERM的配置文件，PERM指Policy（策略），Effect（效果），Request（请求），Matcher（匹配），在项目修改授权机制时，只需要简单地修改配置文件即可。一个正常的Model配置文件内容如下：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub &amp;&amp; r.obj == p.obj &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个最简单的ACL访问控制模型。</p><h3 id="策略" tabindex="-1"><a class="header-anchor" href="#策略" aria-hidden="true">#</a> 策略</h3><p>在配置文件中，策略定义部分为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[policy_definition]
p = sub, obj, act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>p</code>即指policy，不能用其他字符代替，sub指subject，为策略主体，obj即object，为策略对象，act即action，指的是行为。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p = sub, obj, act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以有第四个字段eft，如果省略默认eft为allow。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p=sub, obj, act, eft
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一行定义只是描述了policy该如何书写，并非具体的策略定义。下面是一个具体的policy例子</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, jojo, cake, eat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>p代表了这是一条策略规则定义，jojo即策略主体，cake即策略对象，eat即行为，完整意思为主体jojo能对对象cake进行行为eat。具体的策略规则并不会出现在模型文件中，会有专门的policy文件或者数据库来进行策略存储。</p><h3 id="请求" tabindex="-1"><a class="header-anchor" href="#请求" aria-hidden="true">#</a> 请求</h3><p>在配置文件中，请求定义部分为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[request_definition]
r = sub, obj, act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>r</code>即指request，不能用其他字符代替，sub即subject，指请求主体，obj即object，指请求对象，act即action，指的是请求行为。一般情况下请求定义与策略定义字段名都一致。请求部分并不由casbin负责，这由开发者自己决定什么是请求主体，什么是请求对象，casbin只需要负责根据传入的字段来进行访问控制。</p><h3 id="匹配" tabindex="-1"><a class="header-anchor" href="#匹配" aria-hidden="true">#</a> 匹配</h3><p>在配置文件中，匹配定义部分为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[matchers]
m = r.sub == p.sub &amp;&amp; r.obj == p.obj &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>m</code>指matcher，不能使用其他字符代替，其后就是相应的匹配规则，上述就是一个简单的布尔表达式，其意为传入的请求的所有字段都与策略规则的字段全部相同就匹配，当然它也可以是通配符或者表达力更强的正则表达式。</p><p>除此之外，matcher还支持in语法，例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[matchers]
m = r.sub in (&quot;root&quot;,&quot;admin&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以是</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[matchers]
m = r.sub.Name in (r.obj.Admins)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>e<span class="token punctuation">.</span><span class="token function">Enforce</span><span class="token punctuation">(</span>Sub<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;alice&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> Obj<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;a book&quot;</span><span class="token punctuation">,</span> Admins<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token string">&quot;alice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;bob&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在进行匹配时，Casbin不会进行类型检查，而是将其作为<code>interface</code>进行<code>==</code>检查是否相等。</p><h3 id="效果" tabindex="-1"><a class="header-anchor" href="#效果" aria-hidden="true">#</a> 效果</h3><p>效果定义部分对匹配结果再次作出逻辑组合判断，在配置文件中，效果定义部分为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[policy_effect]
e = some(where (p.eft == allow))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>e</code>即指effect，不能使用其他字符代替。 <code>some</code> 量词判断是否存在一条策略规则满足匹配器。 <code>any</code> 量词则判断是否所有的策略规则都满足匹配器 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>some(where (p.eft == allow))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一条规则意为在匹配结果中有一条结果allow，那么最终结果就为allow。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>e = !some(where (p.eft == deny))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一条规则意为在匹配结果中只要不存在deny的结果，那么最终结果就为allow。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>e = some(where (p.eft == allow)) &amp;&amp; !some(where (p.eft == deny))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一条规则意味在匹配结果中，有一条为allow，且不存在deny的结果，那么最终结果就为allow。</p><p>虽然Casbin设计了上述政策效果的语法，但目前的执行只是使用硬编码的政策效果。 他们认为这种灵活性没有多大必要。 目前为止你必须使用内置的 policy effects，不能自定义，内置支持的 policy effects如下。</p>`,44),m=e("thead",null,[e("tr",null,[e("th",null,"Policy effect定义"),e("th",null,"意义"),e("th",null,"示例")])],-1),b=e("td",null,"some(where (p.eft == allow))",-1),g=e("td",null,"allow-override",-1),h={href:"https://casbin.org/zh/docs/supported-models#examples",target:"_blank",rel:"noopener noreferrer"},x=e("td",null,"!some(where (p.eft == deny))",-1),_=e("td",null,"deny-override",-1),f={href:"https://casbin.org/zh/docs/supported-models#examples",target:"_blank",rel:"noopener noreferrer"},k=e("td",null,"some(where (p.eft == allow)) && !some(where (p.eft == deny))",-1),w=e("td",null,"allow-and-deny",-1),y={href:"https://casbin.org/zh/docs/supported-models#examples",target:"_blank",rel:"noopener noreferrer"},j=e("td",null,"priority(p.eft) || deny",-1),C=e("td",null,"priority",-1),A={href:"https://casbin.org/zh/docs/supported-models#examples",target:"_blank",rel:"noopener noreferrer"},q=e("td",null,"subjectPriority(p.eft)",-1),B=e("td",null,"基于角色的优先级",-1),L={href:"https://casbin.org/zh/docs/supported-models#examples",target:"_blank",rel:"noopener noreferrer"},R=d(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>1.上述四个定义都可以定义多个，语法是<code>type</code>+<code>number</code>，例如<code>r2</code>,<code>p2</code>,<code>e2</code>,<code>m2</code>。</p><p>2.模型文件可以有注释，以<code>#</code>符号进行注释。</p></div><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>下面是一个示例，演示下模型文件的工作过程。首先定义一个简单的ACL模型文件如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub &amp;&amp; r.obj == p.obj &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Policy文件如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, alice, data1, read
p, bob, data2, write
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如何抽象出主体，对象，行为这一过程由业务逻辑决定，这里并不重要所以省略。下面以最简单的方式展示传入的请求，如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alice, data1, read
bob, data1, read
alice, data2, write
bob, data2, write
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>policy文件中定义了alice拥有对data1进行read操作的权限，bob拥有对data2进行write操作的权限，那么在传入的请求中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alice, data1, read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示alice想要对data1进行read操作，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bob, data1, read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示bob想要对data1进行read操作，余下的同理。那么最终结果为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>true
false
false
true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),P={href:"https://casbin.org/zh/editor",target:"_blank",rel:"noopener noreferrer"},E=d(`<h2 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h2><p>RBAC（Role-Based-Access-Controll），基于角色的访问控制，相较于ACL模型会多一个<code>[role definition]</code>，下面是一个简单的RBAC模型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) &amp;&amp; r.obj == p.obj &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中角色的定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[role_definition]
g = _, _
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>g指group，不能用其他字符代替，支持<code>type</code>+<code>number</code>方式创建多个，<code>_</code>是占位符，表示有几个入参。一般而言，在Policy中，g通常为如下格式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g, alice, data2_admin
g, mike, data1_admin
g, data1_admin data2_admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alice指的是主体，data2_admin指的是角色，严格来说casbin都将将其看待为字符串，如何理解其含义和使用取决于开发者。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g, alice, data2_admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示alice具有角色data2_admin</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g, mike, data1_admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示mike具有角色data1_admin</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g, data1_admin data2_admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示角色data1_admin具有角色data2_admin，这是角色之间的继承关系。</p><h3 id="资源角色模型" tabindex="-1"><a class="header-anchor" href="#资源角色模型" aria-hidden="true">#</a> 资源角色模型</h3><p>资源角色模型新增了一个g2，作为资源的角色定义，模型定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _
g2 = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) &amp;&amp; g2(r.obj, p.obj) &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Policy示例定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, alice, data1, read
p, bob, data2, write
p, data_group_admin, data_group, write

g, alice, data_group_admin
g2, data1, data_group
g2, data2, data_group
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中g2定义了资源角色组，将资源赋予不同的角色，同时规定了用户角色与资源角色之间的用户关系。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, data_group_admin, data_group, write
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一条策略便是定义了具有角色data_group_admin的用户能对具有data_group角色的资源进行写操作。</p><h3 id="多租户领域模型" tabindex="-1"><a class="header-anchor" href="#多租户领域模型" aria-hidden="true">#</a> 多租户领域模型</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[request_definition]
r = sub, dom, obj, act

[policy_definition]
p = sub, dom, obj, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.dom) &amp;&amp; r.dom == p.dom &amp;&amp; r.obj == p.obj &amp;&amp; r.act == p.act
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多租户领域模型相较于传统RBAC模型多了dom字段，用于表示主体所属于的领域。Policy示例如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, admin, domain1, data1, read
p, admin, domain1, data1, write
p, admin, domain2, data2, read
p, admin, domain2, data2, write

g, alice, admin, domain1
g, bob, admin, domain2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p, admin, domain1, data1, read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>定义了属于领域domain1的主体admin具有对data1进行read操作的权限</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g, alice, admin, domain1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>定义了alice属于domain1具有角色admin</p><h2 id="abac" tabindex="-1"><a class="header-anchor" href="#abac" aria-hidden="true">#</a> ABAC</h2>`,32);function z(T,N){const n=r("ExternalLinkIcon");return l(),t("div",null,[o,e("p",null,[a("官方仓库："),e("a",u,[a("casbin/casbin: An authorization library that supports access control models like ACL, RBAC, ABAC in Golang (github.com)"),i(n)])]),e("p",null,[a("官方文档："),e("a",p,[a("概述 | Casbin"),i(n)])]),v,e("table",null,[m,e("tbody",null,[e("tr",null,[b,g,e("td",null,[e("a",h,[a("ACL, RBAC, etc."),i(n)])])]),e("tr",null,[x,_,e("td",null,[e("a",f,[a("拒绝改写"),i(n)])])]),e("tr",null,[k,w,e("td",null,[e("a",y,[a("同意与拒绝"),i(n)])])]),e("tr",null,[j,C,e("td",null,[e("a",A,[a("优先级"),i(n)])])]),e("tr",null,[q,B,e("td",null,[e("a",L,[a("主题优先级"),i(n)])])])])]),R,e("p",null,[a("这是一个最简单的ACL示例，Casbin官网中可以进行在线编辑并测试示例，前往"),e("a",P,[a("Casbin editor"),i(n)]),a("进行测试。")]),E])}const M=s(c,[["render",z],["__file","Casbin.html.vue"]]);export{M as default};
