import{_ as i,V as s,W as d,X as e,Y as n,$ as r,Z as l,F as c}from"./framework-44a66fc7.js";const t={},u=e("h1",{id:"常用命令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#常用命令","aria-hidden":"true"},"#"),n(" 常用命令")],-1),v=e("p",null,[n("Linux的目录结构为树状结构，最顶级的目录为根目录"),e("code",null,"/"),n("。")],-1),o=e("p",null,"可以通过挂载，卸载完成添加，移除操作。",-1),m={href:"https://www.runoob.com/linux/linux-command-manual.html",target:"_blank",rel:"noopener noreferrer"},h=l(`<h2 id="sudo" tabindex="-1"><a class="header-anchor" href="#sudo" aria-hidden="true">#</a> <code>sudo</code></h2><p>当权限不够时，需要使用该命令来启用临时管理员权限</p><h2 id="ls" tabindex="-1"><a class="header-anchor" href="#ls" aria-hidden="true">#</a> <code>ls</code></h2><p>全名 list files :列出当前目录的所有目录名以及文件名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/$ <span class="token function">ls</span>
bin  boot  cdrom  dev  etc  home  lib  lib32  lib64  libx32  lost+found  media  mnt  opt  proc  root  run  sbin  snap  srv  swapfile  sys  tmp  usr  var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cd" tabindex="-1"><a class="header-anchor" href="#cd" aria-hidden="true">#</a> <code>cd</code></h2><p>全名 change directoy 切换目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/$ <span class="token builtin class-name">cd</span> bin
stranger@stranger-virtual-machine:/bin$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pwd" tabindex="-1"><a class="header-anchor" href="#pwd" aria-hidden="true">#</a> <code>pwd</code></h2><p>全名 print work directory 显示当前目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/bin$ <span class="token builtin class-name">pwd</span>
/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir" aria-hidden="true">#</a> <code>mkdir</code></h2><p>全名 make directory 创建一个目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/$ <span class="token function">sudo</span> <span class="token function">mkdir</span> my
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="rmdir" tabindex="-1"><a class="header-anchor" href="#rmdir" aria-hidden="true">#</a> <code>rmdir</code></h2><p>删除一个<strong>空文件夹</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/$ <span class="token function">sudo</span> <span class="token function">rmdir</span> my
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="touch" tabindex="-1"><a class="header-anchor" href="#touch" aria-hidden="true">#</a> <code>touch</code></h2><p>创建一个文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">sudo</span> <span class="token function">touch</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cat" tabindex="-1"><a class="header-anchor" href="#cat" aria-hidden="true">#</a> <code>cat</code></h2><p>从头查看一个文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">cat</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="tac" tabindex="-1"><a class="header-anchor" href="#tac" aria-hidden="true">#</a> <code>tac</code></h2><p>从尾部查看一个文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">tac</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="head" tabindex="-1"><a class="header-anchor" href="#head" aria-hidden="true">#</a> <code>head</code></h2><p>查看文件开头部分，默认只显示10行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="more" tabindex="-1"><a class="header-anchor" href="#more" aria-hidden="true">#</a> <code>more</code></h2><p>分页查看文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">more</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="less" tabindex="-1"><a class="header-anchor" href="#less" aria-hidden="true">#</a> <code>less</code></h2><p>向前向后随意查看文件内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">less</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="rm" tabindex="-1"><a class="header-anchor" href="#rm" aria-hidden="true">#</a> <code>rm</code></h2><p><strong>使用之前需要小心</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-f：强制删除（force），和 -i 选项相反，使用 -f，系统将不再询问，而是直接删除目标文件或目录。
-i：和 -f 正好相反，在删除文件或目录之前，系统会给出提示信息，使用 -i 可以有效防止不小心删除有用的文件或目录。
-r：递归删除，主要用于删除目录，可删除指定目录及包含的所有内容，包括所有的子目录和文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认执行 <code>rm -i</code></p><p>删除文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">rm</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除一个非空文件夹</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:$ <span class="token function">rm</span> <span class="token parameter variable">-rf</span> my
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cp" tabindex="-1"><a class="header-anchor" href="#cp" aria-hidden="true">#</a> <code>cp</code></h2><p>复制文件及文件夹</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">rm</span> my.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)

-d：若来源档为链接档的属性(link file)，则复制链接档属性而非文件本身；

-f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；

-i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)

-l：进行硬式链接(hard link)的链接档创建，而非复制文件本身；

-p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；

-r：递归持续复制，用於目录的复制行为；(常用)

-s：复制成为符号链接档 (symbolic link)，亦即『捷径』文件；

-u：若 destination 比 source 旧才升级 destination ！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mv" tabindex="-1"><a class="header-anchor" href="#mv" aria-hidden="true">#</a> <code>mv</code></h2><p>移动文件夹及文件，或者修改名称</p><p>参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
-u ：若目标文件已经存在，且 source 比较新，才会升级 (update)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">mv</span> my.txt you.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:/my$ <span class="token function">mv</span> you.txt <span class="token punctuation">..</span>/you/you.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> <code>find</code></h2><p>搜索命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-mount, -xdev : 只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件

-amin n : 在过去 n 分钟内被读取过

-anewer file : 比文件 file 更晚被读取过的文件

-atime n : 在过去 n 天内被读取过的文件

-cmin n : 在过去 n 分钟内被修改过

-cnewer file :比文件 file 更新的文件

-ctime n : 在过去 n 天内创建的文件

-mtime n : 在过去 n 天内修改过的文件

-empty : 空的文件-gid n or -group name : gid 是 n 或是 group 名称是 name

-ipath p, -path p : 路径名称符合 p 的文件，ipath 会忽略大小写

-name name, -iname name : 文件名称符合 name 的文件。iname 会忽略大小写

-size n : 文件大小 是 n 单位，b 代表 512 位元组的区块，c 表示字元数，k 表示 kilo bytes，w 是二个位元组。

-type c : 文件类型是 c 的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-type 参数

d: 目录

c: 字型装置文件

b: 区块装置文件

p: 具名贮列

f: 一般文件

l: 符号连结

s: socket

-pid n : process id 是 n 的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="clear" tabindex="-1"><a class="header-anchor" href="#clear" aria-hidden="true">#</a> <code>clear</code></h2><p>清屏</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>stranger@stranger-virtual-machine:$ <span class="token function">clear</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,61);function b(p,g){const a=c("ExternalLinkIcon");return s(),d("div",null,[u,v,o,e("p",null,[e("a",m,[n("Linux 命令大全 | 菜鸟教程 (runoob.com)"),r(a)])]),h])}const f=i(t,[["render",b],["__file","2.命令.html.vue"]]);export{f as default};
