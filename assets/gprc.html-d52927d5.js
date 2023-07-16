import{_ as o,V as p,W as c,X as n,Y as s,$ as e,Z as t,F as i}from"./framework-44a66fc7.js";const l={},u=n("h1",{id:"gprc",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gprc","aria-hidden":"true"},"#"),s(" GPRC")],-1),r=n("figure",null,[n("img",{src:"https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161153673.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),d=n("p",null,"远程过程调用rpc应该是微服务当中必须要学习的一个点了，在学习的过程中会遇到各式各样的rpc框架，不过在go这个领域，几乎所有的rpc框架都是基于gprc的，并且它还成为了云原生领域的一个基础协议，为什么选择它，官方如下回答：",-1),v=n("blockquote",null,[n("p",null,"GRPC 是一个现代化的开源高性能远程过程调用(Remote Process Call，RPC)框架，可以在任何环境中运行。它可以通过可插拔的负载平衡、跟踪、健康检查和身份验证支持，有效地连接数据中心内和数据中心之间的服务。它还适用于连接设备、移动应用程序和浏览器到后端服务的最后一英里分布式计算。")],-1),k={href:"https://grpc.io/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://grpc.io/docs/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://protobuf.dev/reference/",target:"_blank",rel:"noopener noreferrer"},b=t('<p>它也是CNCF基金会下一个的开源项目，CNCF全名CLOUD NATIVE COMPUTING FOUNDATION，译名云原生计算基金会</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161210568.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2><p><strong>简单的服务定义</strong></p><p>使用Protocol Buffers 定义服务，这是一个强大的二进制序列化工具集和语言。</p><p><strong>启动和扩容都十分迅捷</strong></p><p>只需一行代码即可安装运行时和开发环境，仅需几秒钟既可以扩张到每秒数百万个RPC</p><p><strong>跨语言，跨平台</strong></p><p>根据不同平台不同语言自动生成客户端和服务端的服务存根</p><p><strong>双向流和集成授权</strong></p><p>基于HTTP/2的双向流和可插拔的认证授权</p><p>虽然GRPC是语言无关的，但是本站的内容大部分都是go相关的，所以本文也会使用go作为主要语言进行讲解，后续用到的pb编译器和生成器如果是其他语言的使用者可以自行到Protobuf官网查找。为了方便起见，接下来会直接省略项目的创建过程（如果不会请先阅读基础教程）。</p><h2 id="依赖安装" tabindex="-1"><a class="header-anchor" href="#依赖安装" aria-hidden="true">#</a> 依赖安装</h2>',13),h={href:"https://github.com/protocolbuffers/protobuf/releases",target:"_blank",rel:"noopener noreferrer"},f=t(`<figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307161253131.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>根据自己的情况选择系统和版本即可，下载完成后需要将bin目录添加到环境变量中。</p><p>然后还要下载代码生成器，编译器是将proto文件生成对应语言的序列化代码，生成器是用于生成业务代码。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">install</span> google.golang.org/protobuf/cmd/protoc-gen-go@latest
$ go <span class="token function">install</span> google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个空的项目，名字这里取grpc_learn，然后引入如下依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go get google.golang.org/grpc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后看一下版本，是不是真的安装成功了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ protoc <span class="token parameter variable">--version</span>
libprotoc <span class="token number">23.4</span>

$ protoc-gen-go <span class="token parameter variable">--version</span>
protoc-gen-go.exe v1.28.1

$ protoc-gen-go-grpc <span class="token parameter variable">--version</span>
protoc-gen-go-grpc <span class="token number">1.3</span>.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello World</h2><h3 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h3><p>下面将以一个Hello World示例来进行演示，创建如下的项目结构。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>grpc_learn
|   go.mod
|   go.sum
|
+---client
|   |   main.go
|   |
|   \\---protoc
\\---server
    |   main.go
    |
    \\---protoc
            hello.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义protobuf文件" tabindex="-1"><a class="header-anchor" href="#定义protobuf文件" aria-hidden="true">#</a> 定义protobuf文件</h3><p>其中，在<code>server/protoc/hello.proto</code>中，写入如下内容，这是一个相当简单的示例，如果不会protoc语法，请移步相关教程。</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">option</span> go_package <span class="token operator">=</span> <span class="token string">&quot;.;service&quot;</span><span class="token punctuation">;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成代码" tabindex="-1"><a class="header-anchor" href="#生成代码" aria-hidden="true">#</a> 生成代码</h3><p>编写完成后，使用protoc编译器生成数据序列化相关的代码，使用生成器生成rpc相关代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>protoc --go_out=server/protoc server/protoc/*.proto
protoc --go-grpc_out=server/protoc server/protoc/*.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时可以发现文件夹生成了<code>hello.pb.go</code>和<code>hello_grpc.pb.go</code>文件，浏览<code>hello.pb.go</code>可以发现我们定义的message</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> HelloReq <span class="token keyword">struct</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在本例中，客户端建立好连接后，在调用远程方法时就跟调用本地方法一样，直接访问<code>client</code>的<code>Hello</code>方法并获取结果。这就是一个最简单的GRPC例子</p><h2 id="流式通信" tabindex="-1"><a class="header-anchor" href="#流式通信" aria-hidden="true">#</a> 流式通信</h2><p>grpc的通信方式有两大类，一元RPC（Unary RPC）和流式RPC（Stream RPC）。Hello World中的示例就是一个典型的一元RPC。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162029789.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>一元rpc就跟普通的http一样，客户端请求，服务端返回数据。流式RPC的请求和响应可以是流式的，如下图</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202307162033200.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用流式请求时，客户端可以通过流来多次发起rpc请求给服务端，使用流式响应时，服务端可以通过流多次返回响应给客户端。可以是只有请求是流式的（Client-Streaming RPC），也可以是只有响应是流式的（Server-Streaming RPC），或者请求和响应都是流式的（Bi-driectional-Streaming RPC）</p>`,40);function q(y,x){const a=i("ExternalLinkIcon");return p(),c("div",null,[u,r,d,v,n("p",null,[s("官方网址："),n("a",k,[s("gRPC"),e(a)])]),n("p",null,[s("官方文档："),n("a",m,[s("Documentation | gRPC"),e(a)])]),n("p",null,[s("ProtocBuf官网："),n("a",g,[s("Reference Guides | Protocol Buffers Documentation (protobuf.dev)"),e(a)])]),b,n("p",null,[s("先下载Protocol Buffer编译器，下载地址："),n("a",h,[s("Releases · protocolbuffers/protobuf (github.com)"),e(a)])]),f])}const w=o(l,[["render",q],["__file","gprc.html.vue"]]);export{w as default};
