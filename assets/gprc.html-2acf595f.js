import{_ as p,V as o,W as c,X as n,Y as s,$ as e,Z as t,F as i}from"./framework-44a66fc7.js";const l={},u=n("h1",{id:"gprc",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gprc","aria-hidden":"true"},"#"),s(" GPRC")],-1),r=n("figure",null,[n("img",{src:"https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161153673.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),d=n("p",null,"远程过程调用rpc应该是微服务当中必须要学习的一个点了，在学习的过程中会遇到各式各样的rpc框架，不过在go这个领域，几乎所有的rpc框架都是基于gprc的，并且它还成为了云原生领域的一个基础协议，为什么选择它，官方如下回答：",-1),k=n("blockquote",null,[n("p",null,"GRPC 是一个现代化的开源高性能远程过程调用(Remote Process Call，RPC)框架，可以在任何环境中运行。它可以通过可插拔的负载平衡、跟踪、健康检查和身份验证支持，有效地连接数据中心内和数据中心之间的服务。它还适用于连接设备、移动应用程序和浏览器到后端服务的最后一英里分布式计算。")],-1),v={href:"https://grpc.io/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://grpc.io/docs/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://protobuf.dev/reference/",target:"_blank",rel:"noopener noreferrer"},g=t('<p>它也是CNCF基金会下一个的开源项目，CNCF全名CLOUD NATIVE COMPUTING FOUNDATION，译名云原生计算基金会</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161210568.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2><p><strong>简单的服务定义</strong></p><p>使用Protocol Buffers 定义服务，这是一个强大的二进制序列化工具集和语言。</p><p><strong>启动和扩容都十分迅捷</strong></p><p>只需一行代码即可安装运行时和开发环境，仅需几秒钟既可以扩张到每秒数百万个RPC</p><p><strong>跨语言，跨平台</strong></p><p>根据不同平台不同语言自动生成客户端和服务端的服务存根</p><p><strong>双向流和集成授权</strong></p><p>基于HTTP/2的双向流和可插拔的认证授权</p><p>虽然GRPC是语言无关的，但是本站的内容大部分都是go相关的，所以本文也会使用go作为主要语言进行讲解，后续用到的pb编译器和生成器如果是其他语言的使用者可以自行到Protobuf官网查找。为了方便起见，接下来会直接省略项目的创建过程（如果不会请先阅读基础教程）。</p><h2 id="依赖安装" tabindex="-1"><a class="header-anchor" href="#依赖安装" aria-hidden="true">#</a> 依赖安装</h2>',13),f={href:"https://github.com/protocolbuffers/protobuf/releases",target:"_blank",rel:"noopener noreferrer"},q=t(`<figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161253131.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>根据自己的情况选择系统和版本即可，下载完成后需要将bin目录添加到环境变量中。</p><p>然后还要下载代码生成器，编译器是将proto文件生成对应语言的序列化代码，生成器是用于生成业务代码。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">install</span> google.golang.org/protobuf/cmd/protoc-gen-go@latest
$ go <span class="token function">install</span> google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个空的项目，名字这里取grpc_learn，然后引入如下依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get google.golang.org/grpc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后看一下版本，是不是真的安装成功了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ protoc <span class="token parameter variable">--version</span>
libprotoc <span class="token number">23.4</span>

$ protoc-gen-go <span class="token parameter variable">--version</span>
protoc-gen-go.exe v1.28.1

$ protoc-gen-go-grpc <span class="token parameter variable">--version</span>
protoc-gen-go-grpc <span class="token number">1.3</span>.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello World</h2><h3 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h3><p>下面将以一个Hello World示例来进行演示，创建如下的项目结构。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>grpc_learn\\helloworld
|
+---client
|       main.go
|
+---hello
|
|
+---pb
|       hello.proto
|
\\---server
        main.go

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义protobuf文件" tabindex="-1"><a class="header-anchor" href="#定义protobuf文件" aria-hidden="true">#</a> 定义protobuf文件</h3><p>其中，在<code>pb/hello.proto</code>中，写入如下内容，这是一个相当简单的示例，如果不会protoc语法，请移步相关教程。</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// .表示就直接生成在输出路径下，hello是包名</span>
<span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;.;hello&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 请求</span>
<span class="token keyword">message</span> <span class="token class-name">HelloReq</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> name <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>


<span class="token comment">// 响应</span>
<span class="token keyword">message</span> <span class="token class-name">HelloRep</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> msg <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义服务</span>
<span class="token keyword">service</span> <span class="token class-name">SayHello</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token class-name">HelloReq</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">HelloRep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成代码" tabindex="-1"><a class="header-anchor" href="#生成代码" aria-hidden="true">#</a> 生成代码</h3><p>编写完成后，使用protoc编译器生成数据序列化相关的代码，使用生成器生成rpc相关代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ protoc <span class="token parameter variable">-I</span> ./pb <span class="token punctuation">\\</span>
		<span class="token parameter variable">--go_out</span><span class="token operator">=</span>./hello ./pb/*.proto<span class="token punctuation">\\</span>
		--go-grpc_out<span class="token operator">=</span>./hello ./pb/*.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时可以发现<code>hello</code>文件夹生成了<code>hello.pb.go</code>和<code>hello_grpc.pb.go</code>文件，浏览<code>hello.pb.go</code>可以发现我们定义的message</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> HelloReq <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	state         protoimpl<span class="token punctuation">.</span>MessageState
	sizeCache     protoimpl<span class="token punctuation">.</span>SizeCache
	unknownFields protoimpl<span class="token punctuation">.</span>UnknownFields

    <span class="token comment">// 定义的字段</span>
	Name <span class="token builtin">string</span> <span class="token string">\`protobuf:&quot;bytes,1,opt,name=name,proto3&quot; json:&quot;name,omitempty&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> HelloRep <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	state         protoimpl<span class="token punctuation">.</span>MessageState
	sizeCache     protoimpl<span class="token punctuation">.</span>SizeCache
	unknownFields protoimpl<span class="token punctuation">.</span>UnknownFields

   	<span class="token comment">// 定义的字段</span>
	Msg <span class="token builtin">string</span> <span class="token string">\`protobuf:&quot;bytes,1,opt,name=msg,proto3&quot; json:&quot;msg,omitempty&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>hello_grpc.pb.go</code>中可以发现我们定义的服务</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> SayHelloServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Hello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> <span class="token operator">*</span>HelloReq<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HelloRep<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">mustEmbedUnimplementedSayHelloServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 后续如果我们自己实现服务接口，必须要嵌入该结构体，就不用实现mustEmbedUnimplementedSayHelloServer方法</span>
<span class="token keyword">type</span> UnimplementedSayHelloServer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 默认返回nil</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>UnimplementedSayHelloServer<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> <span class="token operator">*</span>HelloReq<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HelloRep<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> status<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span>codes<span class="token punctuation">.</span>Unimplemented<span class="token punctuation">,</span> <span class="token string">&quot;method Hello not implemented&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口约束</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>UnimplementedSayHelloServer<span class="token punctuation">)</span> <span class="token function">mustEmbedUnimplementedSayHelloServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">type</span> UnsafeSayHelloServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">mustEmbedUnimplementedSayHelloServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写服务端" tabindex="-1"><a class="header-anchor" href="#编写服务端" aria-hidden="true">#</a> 编写服务端</h3><p>在<code>server/main.go</code>中编写如下代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc&quot;</span>
	pb <span class="token string">&quot;grpc_learn/server/protoc&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> GrpcServer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	pb<span class="token punctuation">.</span>UnimplementedSayHelloServer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GrpcServer<span class="token punctuation">)</span> <span class="token function">Hello</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>pb<span class="token punctuation">.</span>HelloReq<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>pb<span class="token punctuation">.</span>HelloRep<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;received grpc req: %+v&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>HelloRep<span class="token punctuation">{</span>Msg<span class="token punctuation">:</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;hello world! %s&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听端口</span>
	listen<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 创建gprc服务器</span>
	server <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">NewServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 注册服务</span>
	pb<span class="token punctuation">.</span><span class="token function">RegisterSayHelloServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token operator">&amp;</span>GrpcServer<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// 运行</span>
	err <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>listen<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写客户端" tabindex="-1"><a class="header-anchor" href="#编写客户端" aria-hidden="true">#</a> 编写客户端</h3><p>在<code>client/main.go</code>中写入如下代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc/credentials/insecure&quot;</span>
	pb <span class="token string">&quot;grpc_learn/server/protoc&quot;</span>
	<span class="token string">&quot;log&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 建立连接，没有加密验证</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:8080&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithTransportCredentials</span><span class="token punctuation">(</span>insecure<span class="token punctuation">.</span><span class="token function">NewCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 创建客户端</span>
	client <span class="token operator">:=</span> pb<span class="token punctuation">.</span><span class="token function">NewSayHelloClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	<span class="token comment">// 远程调用</span>
	helloRep<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>HelloReq<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;client&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;received grpc resp: %+v&quot;</span><span class="token punctuation">,</span> helloRep<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3><p>先运行服务端，再运行客户端，服务端输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2023/07/16 16:26:51 received grpc req: name:&quot;client&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>客户端输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2023/07/16 16:26:51 received grpc resp: msg:&quot;hello world! client&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本例中，客户端建立好连接后，在调用远程方法时就跟调用本地方法一样，直接访问<code>client</code>的<code>Hello</code>方法并获取结果，这就是一个最简单的GRPC例子，许多开源的框架也都是对这一个流程进行了封装。</p><h2 id="bufbuild" tabindex="-1"><a class="header-anchor" href="#bufbuild" aria-hidden="true">#</a> bufbuild</h2><p>在上述例子中，是直接使用命令生成的代码，如果后期插件多了命令会显得相当繁琐，这时可以通过工具来进行管理protobuf文件，正好就有这么一个开源的管理工具<code>bufbuild/buf</code>。</p>`,36),h={href:"https://github.com/bufbuild/buf",target:"_blank",rel:"noopener noreferrer"},y={href:"https://buf.build/docs/installation",target:"_blank",rel:"noopener noreferrer"},w=t(`<p><strong>特点</strong></p><ul><li>BSR管理</li><li>Linter</li><li>代码生成</li><li>格式化</li><li>依赖管理</li></ul><p>有了这个工具可以相当方便的管理protobuf文件。</p><p>文档中提供了相当多的安装方式，可以自己选择。如果本地安装了go环境的话，直接使用<code>go install</code>安装即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">install</span> github.com/bufbuild/buf/cmd/buf@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完毕后查看版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ buf <span class="token parameter variable">--version</span>
<span class="token number">1.24</span>.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>来到<code>helloworld/pb</code>文件夹，执行如下命令创建一个module来管理pb文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ buf mod init
$ <span class="token function">ls</span>
buf.yaml  hello.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>buf.yaml</code>文件内容默认如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> v1
<span class="token key atrule">breaking</span><span class="token punctuation">:</span>
  <span class="token key atrule">use</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> FILE
<span class="token key atrule">lint</span><span class="token punctuation">:</span>
  <span class="token key atrule">use</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> DEFAULT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来到<code>helloworld/</code>目录下，创建<code>buf.gen.yaml</code>，写入如下内容</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> v1
<span class="token key atrule">plugins</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">plugin</span><span class="token punctuation">:</span> go
    <span class="token key atrule">out</span><span class="token punctuation">:</span> hello
    <span class="token key atrule">opt</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">plugin</span><span class="token punctuation">:</span> go<span class="token punctuation">-</span>grpc
    <span class="token key atrule">out</span><span class="token punctuation">:</span> hello
    <span class="token key atrule">opt</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再执行命令生成代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ buf generate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完成后就可以看到生成的文件了，当然buf不止这点功能，其他的功能可以自己去文档学习。</p><h2 id="流式调用" tabindex="-1"><a class="header-anchor" href="#流式调用" aria-hidden="true">#</a> 流式调用</h2><p>grpc的调用方式有两大类，一元RPC（Unary RPC）和流式RPC（Stream RPC）。Hello World中的示例就是一个典型的一元RPC。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162029789.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>一元rpc用起来就跟普通的http一样，客户端请求，服务端返回数据，一问一答的方式。而流式RPC的请求和响应都 可以是流式的，如下图</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162033200.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用流式请求时，只返回一次响应，客户端可以通过流来多次发送参数给服务端，服务端可以不需要像一元RPC那样等到所有参数都接收完毕再处理，具体处理逻辑可以由服务端决定。正常情况下，只有客户端可以主动关闭流式请求，一旦流被关闭，当前RPC请求也就会结束。</p><p>使用流式响应时，只发送一次参数，服务端可以通过流多次发送数据给客户端，客户端不需要像一元RPC那样接受完所有数据再处理，具体的处理逻辑可以由客户端自己决定。正常请求下，只有服务端可以主动关闭流式响应，一旦流被关闭，当前RPC请求也就会结束。</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">service</span> <span class="token class-name">MessageService</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">google.protobuf.StringValue</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">Message</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以是只有响应是流式的（Server-Streaming RPC）</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">service</span> <span class="token class-name">MessageService</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token class-name">google.protobuf.StringValue</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">Message</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者请求和响应都是流式的（Bi-driectional-Streaming RPC）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>service MessageService {
  rpc getMessage(stream google.protobuf.StringValue) returns (stream Message);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单向流式" tabindex="-1"><a class="header-anchor" href="#单向流式" aria-hidden="true">#</a> 单向流式</h3><p>下面通过一个例子来演示单向流式的操作，首先创建如下的项目结构</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>grpc_learn\\server_client_stream
|   buf.gen.yaml
|
+---client
|       main.go
|
+---pb
|       buf.yaml
|       message.proto
|
\\---server
        main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>message.proto</code>内容如下</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>


<span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;.;message&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&quot;google/protobuf/wrappers.proto&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">message</span> <span class="token class-name">Message</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> from <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> content <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token builtin">string</span> to <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">service</span> <span class="token class-name">MessageService</span> <span class="token punctuation">{</span>
  <span class="token keyword">rpc</span> <span class="token function">receiveMessage</span><span class="token punctuation">(</span><span class="token class-name">google.protobuf.StringValue</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">Message</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">rpc</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">Message</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">google.protobuf.Int64Value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过buf生成代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ buf generate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里演示是消息服务，<code>receiveMessage</code>接收一个指定的用户名，类型为字符串，返回消息流，<code>sendMessage</code>接收消息流，返回成功发送的消息数目，类型为64位整型。接下来创建<code>server/message_service.go</code>，自己实现默认的代码生成的服务</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;google.golang.org/grpc/codes&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc/status&quot;</span>
	<span class="token string">&quot;google.golang.org/protobuf/types/known/wrapperspb&quot;</span>
	<span class="token string">&quot;grpc_learn/server_client_stream/message&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> MessageService <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	message<span class="token punctuation">.</span>UnimplementedMessageServiceServer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MessageService<span class="token punctuation">)</span> <span class="token function">ReceiveMessage</span><span class="token punctuation">(</span>user <span class="token operator">*</span>wrapperspb<span class="token punctuation">.</span>StringValue<span class="token punctuation">,</span> recvServer message<span class="token punctuation">.</span>MessageService_ReceiveMessageServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> status<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span>codes<span class="token punctuation">.</span>Unimplemented<span class="token punctuation">,</span> <span class="token string">&quot;method ReceiveMessage not implemented&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MessageService<span class="token punctuation">)</span> <span class="token function">SendMessage</span><span class="token punctuation">(</span>sendServer message<span class="token punctuation">.</span>MessageService_SendMessageServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> status<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span>codes<span class="token punctuation">.</span>Unimplemented<span class="token punctuation">,</span> <span class="token string">&quot;method SendMessage not implemented&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到接收消息和发送消息的参数里面都有一个流包装接口</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MessageService_ReceiveMessageServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发送消息</span>
	<span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">*</span>Message<span class="token punctuation">)</span> <span class="token builtin">error</span>
	grpc<span class="token punctuation">.</span>ServerStream
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MessageService_SendMessageServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// 发送返回值并关闭连接</span>
	<span class="token function">SendAndClose</span><span class="token punctuation">(</span><span class="token operator">*</span>wrapperspb<span class="token punctuation">.</span>StringValue<span class="token punctuation">)</span> <span class="token builtin">error</span>
    <span class="token comment">// 接收消息</span>
	<span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Message<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	grpc<span class="token punctuation">.</span>ServerStream
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它们都嵌入了<code>gprc.ServerStream</code>接口</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> ServerStream <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">SetHeader</span><span class="token punctuation">(</span>metadata<span class="token punctuation">.</span>MD<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">SendHeader</span><span class="token punctuation">(</span>metadata<span class="token punctuation">.</span>MD<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">SetTrailer</span><span class="token punctuation">(</span>metadata<span class="token punctuation">.</span>MD<span class="token punctuation">)</span>
	<span class="token function">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span>Context
	<span class="token function">SendMsg</span><span class="token punctuation">(</span>m <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">RecvMsg</span><span class="token punctuation">(</span>m <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，流式RPC并不像一元RPC那样入参和返回值都可以很明确的体现在函数签名上，这些方法乍一看是看不出来入参和返回值是什么类型的，需要调用传入的Stream类型完成流式传输，接下来开始编写服务端的具体逻辑。在编写服务端逻辑的时候，用了一个<code>sync.map</code>来模拟消息队列，当客户端发送<code>ReceiveMessage</code>请求时，服务端通过流式响应不断返回客户端想要的消息，直到超时过后断开请求。当客户端请求<code>SendMessage</code>时，通过流式请求不断发送消息过来，服务端不断的将消息放入队列中，直到客户端主动断开请求，并返回给客户端消息发送条数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;google.golang.org/protobuf/types/known/wrapperspb&quot;</span>
	<span class="token string">&quot;grpc_learn/server_client_stream/message&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 一个模拟的消息队列</span>
<span class="token keyword">var</span> messageQueue sync<span class="token punctuation">.</span>Map

<span class="token keyword">type</span> MessageService <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	message<span class="token punctuation">.</span>UnimplementedMessageServiceServer
<span class="token punctuation">}</span>

<span class="token comment">// ReceiveMessage</span>
<span class="token comment">// param user *wrapperspb.StringValue</span>
<span class="token comment">// param recvServer message.MessageService_ReceiveMessageServer</span>
<span class="token comment">// return error</span>
<span class="token comment">// 接收指定用户的消息</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MessageService<span class="token punctuation">)</span> <span class="token function">ReceiveMessage</span><span class="token punctuation">(</span>user <span class="token operator">*</span>wrapperspb<span class="token punctuation">.</span>StringValue<span class="token punctuation">,</span> recvServer message<span class="token punctuation">.</span>MessageService_ReceiveMessageServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	timer <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTimer</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>timer<span class="token punctuation">.</span>C<span class="token punctuation">:</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;5秒钟内没有收到%s的消息，关闭连接&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> messageQueue<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
				messageQueue<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>message<span class="token punctuation">.</span>Message<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
				<span class="token keyword">continue</span>
			<span class="token punctuation">}</span>
			queue <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>message<span class="token punctuation">.</span>Message<span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
				<span class="token keyword">continue</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 拿到消息</span>
			msg <span class="token operator">:=</span> queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
			<span class="token comment">// 通过流式传输将消息发送给客户端</span>
			err <span class="token operator">:=</span> recvServer<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;receive %+v\\n&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>

			queue <span class="token operator">=</span> queue<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
			messageQueue<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> queue<span class="token punctuation">)</span>
			timer<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// SendMessage</span>
<span class="token comment">// param sendServer message.MessageService_SendMessageServer</span>
<span class="token comment">// return error</span>
<span class="token comment">// 发送消息给指定用户</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MessageService<span class="token punctuation">)</span> <span class="token function">SendMessage</span><span class="token punctuation">(</span>sendServer message<span class="token punctuation">.</span>MessageService_SendMessageServer<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	count <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 从客户端接收消息</span>
		msg<span class="token punctuation">,</span> err <span class="token operator">:=</span> sendServer<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> io<span class="token punctuation">.</span>EOF<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> sendServer<span class="token punctuation">.</span><span class="token function">SendAndClose</span><span class="token punctuation">(</span>wrapperspb<span class="token punctuation">.</span><span class="token function">Int64</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;send %+v\\n&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>

		value<span class="token punctuation">,</span> ok <span class="token operator">:=</span> messageQueue<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>From<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			messageQueue<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>From<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>message<span class="token punctuation">.</span>Message<span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		queue <span class="token operator">:=</span> value<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>message<span class="token punctuation">.</span>Message<span class="token punctuation">)</span>
		queue <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
		<span class="token comment">// 将消息放入消息队列中</span>
		messageQueue<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>From<span class="token punctuation">,</span> queue<span class="token punctuation">)</span>
		count<span class="token operator">++</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端开了两个协程，一个协程用来发送消息，另一个协程用来接收消息，当然也可以一边发送一边接收，代码如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;github.com/dstgo/task&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc&quot;</span>
	<span class="token string">&quot;google.golang.org/grpc/credentials/insecure&quot;</span>
	<span class="token string">&quot;google.golang.org/protobuf/types/known/wrapperspb&quot;</span>
	<span class="token string">&quot;grpc_learn/server_client_stream/message&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> Client message<span class="token punctuation">.</span>MessageServiceClient

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dial<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:9090&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithTransportCredentials</span><span class="token punctuation">(</span>insecure<span class="token punctuation">.</span><span class="token function">NewCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Panicln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> dial<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	Client <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">NewMessageServiceClient</span><span class="token punctuation">(</span>dial<span class="token punctuation">)</span>

	log<span class="token punctuation">.</span><span class="token function">SetPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;client\\t&quot;</span><span class="token punctuation">)</span>
	msgTask <span class="token operator">:=</span> task<span class="token punctuation">.</span><span class="token function">NewTask</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Panicln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 接收消息请求</span>
	msgTask<span class="token punctuation">.</span><span class="token function">AddJobs</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		receiveMessageStream<span class="token punctuation">,</span> err <span class="token operator">:=</span> Client<span class="token punctuation">.</span><span class="token function">ReceiveMessage</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wrapperspb<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Panicln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			recv<span class="token punctuation">,</span> err <span class="token operator">:=</span> receiveMessageStream<span class="token punctuation">.</span><span class="token function">Recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> io<span class="token punctuation">.</span>EOF<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;暂无消息，关闭连接&quot;</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;receive %+v&quot;</span><span class="token punctuation">,</span> recv<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	msgTask<span class="token punctuation">.</span><span class="token function">AddJobs</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		from <span class="token operator">:=</span> <span class="token string">&quot;jack&quot;</span>
		to <span class="token operator">:=</span> <span class="token string">&quot;mike&quot;</span>

		sendMessageStream<span class="token punctuation">,</span> err <span class="token operator">:=</span> Client<span class="token punctuation">.</span><span class="token function">SendMessage</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Panicln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		msgs <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
			<span class="token string">&quot;在吗&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;下午有没有时间一起打游戏&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;那行吧，以后有时间一起约&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;就这个周末应该可以吧&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;那就这么定了&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> msg <span class="token operator">:=</span> <span class="token keyword">range</span> msgs <span class="token punctuation">{</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
			sendMessageStream<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>message<span class="token punctuation">.</span>Message<span class="token punctuation">{</span>
				From<span class="token punctuation">:</span>    from<span class="token punctuation">,</span>
				Content<span class="token punctuation">:</span> msg<span class="token punctuation">,</span>
				To<span class="token punctuation">:</span>      to<span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 消息发送完了，主动关闭请求并获取返回值</span>
		recv<span class="token punctuation">,</span> err <span class="token operator">:=</span> sendMessageStream<span class="token punctuation">.</span><span class="token function">CloseAndRecv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;发送完毕，总共发送了%d条消息\\n&quot;</span><span class="token punctuation">,</span> recv<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	msgTask<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行过后服务端输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server  2023/07/18 16:28:24 send from:&quot;jack&quot; content:&quot;在吗&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:24 receive from:&quot;jack&quot; content:&quot;在吗&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:25 send from:&quot;jack&quot; content:&quot;下午有没有时间一起打游戏&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:25 receive from:&quot;jack&quot; content:&quot;下午有没有时间一起打游戏&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:26 send from:&quot;jack&quot; content:&quot;那行吧，以后有时间一起约&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:26 receive from:&quot;jack&quot; content:&quot;那行吧，以后有时间一起约&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:27 send from:&quot;jack&quot; content:&quot;就这个周末应该可以吧&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:27 receive from:&quot;jack&quot; content:&quot;就这个周末应该可以吧&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:28 send from:&quot;jack&quot; content:&quot;那就这么定了&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:28 receive from:&quot;jack&quot; content:&quot;那就这么定了&quot; to:&quot;mike&quot;
server  2023/07/18 16:28:33 5秒钟内没有收到jack的消息，关闭连接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>client  2023/07/18 16:28:24 receive from:&quot;jack&quot; content:&quot;在吗&quot; to:&quot;mike&quot;
client  2023/07/18 16:28:25 receive from:&quot;jack&quot; content:&quot;下午有没有时间一起打游戏&quot; to:&quot;mike&quot;
client  2023/07/18 16:28:26 receive from:&quot;jack&quot; content:&quot;那行吧，以后有时间一起约&quot; to:&quot;mike&quot;
client  2023/07/18 16:28:27 receive from:&quot;jack&quot; content:&quot;就这个周末应该可以吧&quot; to:&quot;mike&quot;
client  2023/07/18 16:28:28 发送完毕，总共发送了5条消息
client  2023/07/18 16:28:28 receive from:&quot;jack&quot; content:&quot;那就这么定了&quot; to:&quot;mike&quot;
client  2023/07/18 16:28:33 暂无消息，关闭连接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个例子可以发现单向流式RPC请求处理起来的话不论是客户端还是服务端都要比一元rpc复杂，不过双向流式RPC比它们还要更复杂些。</p><h3 id="双向流式" tabindex="-1"><a class="header-anchor" href="#双向流式" aria-hidden="true">#</a> 双向流式</h3>`,51);function S(x,M){const a=i("ExternalLinkIcon");return o(),c("div",null,[u,r,d,k,n("p",null,[s("官方网址："),n("a",v,[s("gRPC"),e(a)])]),n("p",null,[s("官方文档："),n("a",m,[s("Documentation | gRPC"),e(a)])]),n("p",null,[s("ProtocBuf官网："),n("a",b,[s("Reference Guides | Protocol Buffers Documentation (protobuf.dev)"),e(a)])]),g,n("p",null,[s("先下载Protocol Buffer编译器，下载地址："),n("a",f,[s("Releases · protocolbuffers/protobuf (github.com)"),e(a)])]),q,n("p",null,[s("开源地址："),n("a",h,[s("bufbuild/buf: A new way of working with Protocol Buffers. (github.com)"),e(a)])]),n("p",null,[s("文档地址："),n("a",y,[s("Buf - Install the Buf CLI"),e(a)])]),w])}const R=p(l,[["render",S],["__file","gprc.html.vue"]]);export{R as default};
