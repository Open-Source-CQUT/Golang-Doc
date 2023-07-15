import{_ as a,V as i,W as l,X as n,Y as s,$ as c,Z as o,F as d}from"./framework-44a66fc7.js";const r={},t=n("h2",{id:"安装、卸载、开启、关闭",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装、卸载、开启、关闭","aria-hidden":"true"},"#"),s(" 安装、卸载、开启、关闭")],-1),u=n("p",null,"第一次使用电脑时，都会先学习怎么开机和关机，使用软件也一样，得先学会怎么安装和卸载，以免觉得不好用了也可以卸掉。",-1),p={href:"https://docs.docker.com/engine/install/ubuntu/",target:"_blank",rel:"noopener noreferrer"},v=o(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>后续的文章都将在ubuntu22.04LTS系统基础之上进行描述。</p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><h3 id="设置仓库" tabindex="-1"><a class="header-anchor" href="#设置仓库" aria-hidden="true">#</a> 设置仓库</h3><p>1.更新apt索引，安装一些依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ca-certificates <span class="token function">curl</span> gnupg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.添加docker官方的GPG密钥</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> $ <span class="token function">sudo</span> <span class="token function">install</span> <span class="token parameter variable">-m</span> 0755 <span class="token parameter variable">-d</span> /etc/apt/keyrings
 $ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /etc/apt/keyrings/docker.gpg
 $ <span class="token function">sudo</span> <span class="token function">chmod</span> a+r /etc/apt/keyrings/docker.gpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.设置仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
  <span class="token string">&quot;deb [arch=&quot;</span><span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span><span class="token string">&quot; signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  &quot;</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">.</span> /etc/os-release <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$VERSION_CODENAME</span>&quot;</span><span class="token variable">)</span></span><span class="token string">&quot; stable&quot;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
  <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装docker-engine" tabindex="-1"><a class="header-anchor" href="#安装docker-engine" aria-hidden="true">#</a> 安装docker engine</h3><p>1.先更新索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.安装最新版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.安装指定版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 挑选需要的版本</span>
$ <span class="token function">apt-cache</span> madison docker-ce <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{ print $3 }&#39;</span>

<span class="token number">5</span>:24.0.0-1~ubuntu.22.04~jammy
<span class="token number">5</span>:23.0.6-1~ubuntu.22.04~jammy
<span class="token punctuation">..</span>.
<span class="token comment"># 安装指定版本</span>
$ <span class="token assign-left variable">VERSION_STRING</span><span class="token operator">=</span><span class="token number">5</span>:24.0.0-1~ubuntu.22.04~jammy
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\\</span>
docker-ce<span class="token operator">=</span><span class="token variable">$VERSION_STRING</span> docker-ce-cli<span class="token operator">=</span><span class="token variable">$VERSION_STRING</span> containerd.io docker-buildx-plugin docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.执行<code>docker info</code>看看是否docker service是否都正常运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">docker</span> info
Client: Docker Engine - Community
 Version:    <span class="token number">24.0</span>.4
 Context:    default
 Debug Mode: <span class="token boolean">false</span>
 Plugins:
  buildx: Docker Buildx <span class="token punctuation">(</span>Docker Inc.<span class="token punctuation">)</span>
    Version:  v0.11.1
    Path:     /usr/libexec/docker/cli-plugins/docker-buildx
  compose: Docker Compose <span class="token punctuation">(</span>Docker Inc.<span class="token punctuation">)</span>
    Version:  v2.19.1
    Path:     /usr/libexec/docker/cli-plugins/docker-compose

Server:
 Containers: <span class="token number">0</span>
  Running: <span class="token number">0</span>
  Paused: <span class="token number">0</span>
  Stopped: <span class="token number">0</span>
 Images: <span class="token number">0</span>
 Server Version: <span class="token number">24.0</span>.4
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: <span class="token boolean">true</span>
  Using metacopy: <span class="token boolean">false</span>
  Native Overlay Diff: <span class="token boolean">true</span>
  userxattr: <span class="token boolean">false</span>
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: <span class="token number">2</span>
 Plugins:
  Volume: <span class="token builtin class-name">local</span>
  Network: bridge <span class="token function">host</span> ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file <span class="token builtin class-name">local</span> logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 3dce8eb055cbb6872793272b4f20ed16117344f8
 runc version: v1.1.7-0-g860f061
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: <span class="token builtin class-name">builtin</span>
  cgroupns
 Kernel Version: <span class="token number">5.19</span>.0-46-generic
 Operating System: Ubuntu <span class="token number">22.04</span>.1 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: <span class="token number">8</span>
 Total Memory: <span class="token number">15</span>.61GiB
 Name: wyh-virtual-machine
 ID: 6bef4127-4e92-4dc1-9b07-ba8c17987a8f
 Docker Root Dir: /var/lib/docker
 Debug Mode: <span class="token boolean">false</span>
 Username: stranger246859
 Experimental: <span class="token boolean">false</span>
 Insecure Registries:
  <span class="token number">127.0</span>.0.0/8
 Live Restore Enabled: <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.运行<code>hello-world</code>镜像看看能不能正常工作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">docker</span> run hello-world
Unable to <span class="token function">find</span> image <span class="token string">&#39;hello-world:latest&#39;</span> locally
latest: Pulling from library/hello-world
719385e32844: Pull complete 
Digest: sha256:926fac19d22aa2d60f1a276b66a20eb765fbeea2db5dbdaafeb456ad8ce81598
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">&quot;hello-world&quot;</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h2><p>相比于安装，卸载就要简单多了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> purge <span class="token punctuation">\\</span>
docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再删除数据文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker /var/lib/containerd /etc/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关闭" tabindex="-1"><a class="header-anchor" href="#关闭" aria-hidden="true">#</a> 关闭</h2><p>要想完全关闭docker，需要将<code>docker.socket</code>和<code>docker</code>两个服务都关掉。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl stop docker.socket <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="开启" tabindex="-1"><a class="header-anchor" href="#开启" aria-hidden="true">#</a> 开启</h2><p>开启同理</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl start docker.socket <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,31);function b(m,k){const e=d("ExternalLinkIcon");return i(),l("div",null,[t,u,n("p",null,[s("本篇的内容参考自"),n("a",p,[s("Install Docker Engine on Ubuntu | Docker Documentation"),c(e)])]),v])}const g=a(r,[["render",b],["__file","start.html.vue"]]);export{g as default};
