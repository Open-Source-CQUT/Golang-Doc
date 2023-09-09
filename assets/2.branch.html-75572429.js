import{_ as t,V as i,W as p,X as a,Y as n,$ as c,Z as s,F as l}from"./framework-44a66fc7.js";const o={},u=s(`<h1 id="分支" tabindex="-1"><a class="header-anchor" href="#分支" aria-hidden="true">#</a> 分支</h1><p>如果说有什么特性能让git从其它vcs中脱颖而出，那唯一的答案就是git的分支管理，因为它很快，快到分支切换无感，即便是一个非常大的仓库。一般仓库都会有一个主分支用于存放核心代码，当你想要做出一些修改时，不必修改主分支，可以新建一个新分支，在新分支中提交然后将修改合并到主分支，这样的工作流程在大型项目中尤其适用。在git中每一次提交都会包含一个指针，它指向的是该次提交的内容快照，同时也会指向上一次提交。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309081917035.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>git的分支，实际上正是指向提交对象的可变指针，如图所示。通过如下命令可以看到分支所指向提交的情况</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--decorate</span>
f5602b9 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, tag: v1.0.3, tag: v1.0.1, tag: v1.0.0, origin/main<span class="token punctuation">)</span> Revert <span class="token string">&quot;revert example&quot;</span>
9d3a0a3 revert example
25cdeea a
10e5e5e commit
c7bdcd8 update aaa.txt
e538986 skip stage
b4c2d7f 3rd commit
5ca7961 hello
eff484a initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建切换" tabindex="-1"><a class="header-anchor" href="#创建切换" aria-hidden="true">#</a> 创建切换</h2><p>从图中和输出中我们可以看到，HEAD此时是指向main分支，于此同时，main分支与test分支都是指向的<code>f5602b9</code>这一提交，并且还有很多tag，除此之外，还可以看到<code>origin/main</code>这一远程分支。接下来创建一个新的分支试试，通过如下命令可以创建一个分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建完成后，使用<code>git checkout &lt;branchname&gt;</code>来切换到指定分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想要创建的同时并切换切换成该分支可以使用<code>-b</code>参数，例如</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch <span class="token parameter variable">-c</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令<code>git checkout &lt;branchname&gt;</code>也可以切换分支，使用<code>git checkout -b &lt;branchname&gt;</code>也能达到创建并切换的效果，事实上<code>git switch</code>使用的还是<code>git checkout</code>。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>git switch</code>命令相对<code>git checkout</code>命令比较新，同时也可能不那么稳定。</p></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309081917091.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>分支切换后，HEAD指针就会指向test分支，HEAD指针永远指向当前所在的分支，通过它就可以知道现在仓库的状态处于哪一个分支。接下来做一个提交来看看。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;branch test update it&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt

$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update hello.txt on test branch&quot;</span>
<span class="token punctuation">[</span>test <span class="token number">9105078</span><span class="token punctuation">]</span> update hello.txt on <span class="token builtin class-name">test</span> branch
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--decorate</span>
<span class="token number">9105078</span> <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> <span class="token builtin class-name">test</span><span class="token punctuation">)</span> update hello.txt on <span class="token builtin class-name">test</span> branch
f5602b9 <span class="token punctuation">(</span>tag: v1.0.3, tag: v1.0.1, tag: v1.0.0, origin/main, main<span class="token punctuation">)</span> Revert <span class="token string">&quot;revert example&quot;</span>
9d3a0a3 revert example
25cdeea a
10e5e5e commit
c7bdcd8 update aaa.txt
e538986 skip stage
b4c2d7f 3rd commit
5ca7961 hello
eff484a initial commit

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309081909312.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以从输出中看到，test分支此时指向的是<code>9105078</code>这个提交，而main分支依旧是指向的原来的那个提交。当分支切换回去时，会发现HEAD再次指向了main分支。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch main
Switched to branch <span class="token string">&#39;main&#39;</span>
Your branch is up to <span class="token function">date</span> with <span class="token string">&#39;origin/main&#39;</span><span class="token builtin class-name">.</span>

$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--decorate</span>
f5602b9 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, tag: v1.0.3, tag: v1.0.1, tag: v1.0.0, origin/main<span class="token punctuation">)</span> Revert <span class="token string">&quot;revert example&quot;</span>
9d3a0a3 revert example
25cdeea a
10e5e5e commit
c7bdcd8 update aaa.txt
e538986 skip stage
b4c2d7f 3rd commit
5ca7961 hello
eff484a initial commit

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时再做出一些修改并提交，可以看到HEAD和main分支都指向了最新的提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;update on branch main&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
Stranger@LAPTOP-9VDMJGFL MINGW64 /d/WorkSpace/Code/example <span class="token punctuation">(</span>main<span class="token punctuation">)</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update on main&quot;</span>
<span class="token punctuation">[</span>main d0872e5<span class="token punctuation">]</span> update on main
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--decorate</span>
d0872e5 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> update on main
f5602b9 <span class="token punctuation">(</span>tag: v1.0.3, tag: v1.0.1, tag: v1.0.0, origin/main<span class="token punctuation">)</span> Revert <span class="token string">&quot;revert example&quot;</span>
9d3a0a3 revert example
25cdeea a
10e5e5e commit
c7bdcd8 update aaa.txt
e538986 skip stage
b4c2d7f 3rd commit
5ca7961 hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来查看提交日志，git很形象的表示了所有分支的状态。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--decorate</span> <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span>
* d0872e5 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> update on main
<span class="token operator">|</span> * <span class="token number">9105078</span> <span class="token punctuation">(</span>test<span class="token punctuation">)</span> update hello.txt on <span class="token builtin class-name">test</span> branch
<span class="token operator">|</span>/
* f5602b9 <span class="token punctuation">(</span>tag: v1.0.3, tag: v1.0.1, tag: v1.0.0, origin/main<span class="token punctuation">)</span> Revert <span class="token string">&quot;revert example&quot;</span>
* 9d3a0a3 revert example
* 25cdeea a
* 10e5e5e commit
* c7bdcd8 update aaa.txt
* e538986 skip stage
* b4c2d7f 3rd commit
* 5ca7961 hello
* eff484a initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309081910241.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>git的输出就如图所示，main与test两个分支最初都指向的同一个提交commit3，在随着有了新的提交后，它们都分别指向了各自不同的提交，当想要切换分支时，git就会将HEAD指针指向指定的分支，并将工作区恢复成该分支所指向提交的状态，在git中，分支的切换仅仅只是指针的移动，所以切换起来相当的迅速。正应如此，开发人员可以随心所欲的创建属于自己的分支来给仓库添加新的特性，这些变更在最后合并分支后都会出现在主分支中。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>刚刚提到的主分支，只是对开发人员的一个概念，git中没有什么特殊分支，起名为main仅仅只是将它看待成主分支，实际上它与test分支并没有什么不同，默认的master分支也只是git的一个默认名称而已。</p></div><p>在创建分支时，也可以不必从最新的提交创建，通过如下命令指定提交，就可以从指定的提交创建分支。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token operator">&lt;</span>branche-name<span class="token operator">&gt;</span> <span class="token punctuation">[</span>commit-id<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, feature_v2<span class="token punctuation">)</span> another new feature
28d8277 <span class="token function">add</span> new feature
a35c102 <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
$ <span class="token function">git</span> branch jkl a35c102
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, feature_v2<span class="token punctuation">)</span> another new feature
28d8277 <span class="token function">add</span> new feature
a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中可以看到，jkl分支指向的是<code>a35c102</code>这一提交。</p><h2 id="临时修改" tabindex="-1"><a class="header-anchor" href="#临时修改" aria-hidden="true">#</a> 临时修改</h2><p>在分支切换时，git会将工作区切换到该分支所指向提交的状态，并且暂存区会被清空，这就意味着，如果在切换分支时有未提交的修改，那么这些修改将会丢失。不过git显然不允许这样的情况发生，它会这样提示你。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch <span class="token builtin class-name">test</span>
error: Your <span class="token builtin class-name">local</span> changes to the following files would be overwritten by checkout:
        hello.txt
Please commit your changes or stash them before you switch branches.
Aborting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>如果你非要这么做，可以加上<code>--discard-changes</code>参数来丢弃修改或者<code>--merge</code>合并修改。</p></div><p>在进行危险操作时git总会提醒你不要这么做，从输出中可以得知，当本地有未提交的修改时，git不允许切换分支，要么把修改提交了，要么就使用一个名为<code>git stash</code>。它可以将本地未提交的修改临时保存起来，待将分支切换回来以后，还可以将这些修改复原，回到之前的状态，以便继续这个分支的开发工作。示例如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;123&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> <span class="token function">add</span> hello.txt
$ <span class="token function">git</span> switch <span class="token builtin class-name">test</span>
error: Your <span class="token builtin class-name">local</span> changes to the following files would be overwritten by checkout:
        hello.txt
Please commit your changes or stash them before you switch branches.
Aborting
$ <span class="token function">git</span> stash
Saved working directory and index state WIP on main: d0872e5 update on main
$ <span class="token function">git</span> switch <span class="token builtin class-name">test</span>
Switched to branch <span class="token string">&#39;test&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里先做了一些修改，将修改添加到了暂存区但未提交，只要是被追踪的文件发生变化，这里不添加到暂存区一样会被阻止，如果不添加到暂存区，git在stash时会自动添加将修改添加到暂存区。可以看到在切换分支时被git阻止了，于是使用<code>git stash</code>命令将这些修改临时存放后成功切换到了test分支。然后再切换回来，使用<code>git stash pop</code>来恢复最近一个临时保存的修改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch main
Switched to branch <span class="token string">&#39;main&#39;</span>
Your branch is ahead of <span class="token string">&#39;origin/main&#39;</span> by <span class="token number">1</span> commit.
  <span class="token punctuation">(</span>use <span class="token string">&quot;git push&quot;</span> to publish your <span class="token builtin class-name">local</span> commits<span class="token punctuation">)</span>

$ <span class="token function">git</span> stash pop
On branch main
Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git restore &lt;file&gt;...&quot;</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        modified:   hello.txt

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
Dropped refs/stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span> <span class="token punctuation">(</span>f4a0c807addcd08959555e02d4191fb5324dad88<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到仓库状态又变成了未暂存的修改，一旦临时修改被恢复过后，它就会被移出，正如pop所表达的含义一样。我们可以进行多次临时保存，并选择特定的修改来恢复。这里分别进行两次修改，然后临时保存两次。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;123&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> stash
Saved working directory and index state WIP on test: 0224b74 initial commit
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;12345&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> stash
Saved working directory and index state WIP on test: 0224b74 initial commit
$ <span class="token function">git</span> stash show
 hello.txt <span class="token operator">|</span> <span class="token number">1</span> +
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token function">git</span> stash list
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: WIP on test: 0224b74 initial commit
stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: WIP on test: 0224b74 initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过输出可以发现有两个临时保存的修改，存放的顺序就跟栈一样，后进先出，最上面的就是最新的修改。这时可以使用命令<code>git stash apply</code>来恢复指定的修改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash apply stash@P<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果恢复完成过后，想要删除的话，使用如下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash drop stash@P<span class="token punctuation">{</span>index<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>git stash pop</code>就是将最近的一次修改恢复并删除。也可以使用<code>clear</code>命令来一次性删除所有的修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash <span class="token function">clear</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的输出中可以看到，<code>stash</code>输出的修改列表除了索引不一样，其它都没什么区别，这样很难区分到底做了什么修改。为此，可以加上<code>-m</code>参数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;456&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> stash push <span class="token parameter variable">-m</span> <span class="token string">&quot;456&quot;</span>
Saved working directory and index state On test: <span class="token number">456</span>
$ <span class="token function">git</span> stash list
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: On test: <span class="token number">456</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;789&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> stash <span class="token parameter variable">-m</span> <span class="token string">&quot;789&quot;</span>
Saved working directory and index state On test: <span class="token number">789</span>
$ <span class="token function">git</span> stash list
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: On test: <span class="token number">789</span>
stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: On test: <span class="token number">456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中可以看到，当<code>git stash</code>不带子命令直接执行时，其实就是执行的<code>git stash push</code>，加上<code>-m</code>参数以后，查看修改历史就可以看到我们自定义的信息了。</p><h2 id="合并删除" tabindex="-1"><a class="header-anchor" href="#合并删除" aria-hidden="true">#</a> 合并删除</h2><p>git支持多分支开发，也非常鼓励多分支开发。一般而言，一个项目会有一个主分支，也是就是main或master（只是一个名字而已，叫什么不重要），主分支的代码是最稳定的，通常软件发版就是在主分支发行。当你后期想要添加一个新特性，或者修复一个问题，你可以直接修改主分支代码，但这就破坏了主分支的稳定性，为此可以新建一个分支来做这类工作，新分支的代码可能不那么稳定，开发人员通常会在新分支上捣鼓各种奇奇怪怪的东西，等到稳定后就可以将修改合并到主分支上，又或者是放弃此前的工作，直接删除该分支。所以，在git中你可以随意的新建和删除分支并且不需要什么成本。</p><p>下面会做一些例子来进行演示，首先先看看仓库中有哪些分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$$</span> <span class="token function">git</span> branch <span class="token parameter variable">-l</span>
* main
  <span class="token function">op</span>
  <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，总共有三个分支，git用<code>*</code> 标注了当前所在的分支，为了方便演示先将<code>hello.txt</code>文件清空并提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&gt;</span> hello.txt
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;clear hello.txt&quot;</span>
<span class="token punctuation">[</span>main a35c102<span class="token punctuation">]</span> <span class="token function">clear</span> hello.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">17</span> deletions<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后再新建一个feature分支并切换过去。这里之所以叫feature是表示新增特性，你也可以取其它名字，比如hotfix，即热修复，或者patch，表示补丁，这些名字并不是强制要求的，仅仅只是一个规范，你可以取你想要的任何名字。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature
Switched to a new branch <span class="token string">&#39;feature&#39;</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
a35c102 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> feature, main<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到四个分支中，test与op分支指向的<code>0224b74</code>提交，而feature与main分支都指向的是最新的提交。接下来在feature分支做一些修改并提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;this is a new feature&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;add new feature&quot;</span>
<span class="token punctuation">[</span>feature 28d8277<span class="token punctuation">]</span> <span class="token function">add</span> new feature
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;this is another new feature&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;another new feature&quot;</span>
<span class="token punctuation">[</span>feature 0658483<span class="token punctuation">]</span> another new feature
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 $ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> feature<span class="token punctuation">)</span> another new feature
28d8277 <span class="token function">add</span> new feature
a35c102 <span class="token punctuation">(</span>main<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309090937979.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到feature分支已经领先main两个提交了，前面提到过未提交的修改在切换分支后会丢失，这里将修改提交后切换分支就没什么问题了。这个时候想要合并分支的话，由于我们将main分支作为主分支，所以需要先切回到main分支，git会将当前所作的分支作为被并入的分支，然后再使用<code>git merge</code>命令合并。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout main
Switched to branch <span class="token string">&#39;main&#39;</span>

$ <span class="token function">git</span> merge feature
Updating a35c102<span class="token punctuation">..</span>0658483
Fast-forward
 hello.txt <span class="token operator">|</span> <span class="token number">2</span> ++
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token function">cat</span> hello.txt

this is a new feature
this is another new feature
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, feature<span class="token punctuation">)</span> another new feature
28d8277 <span class="token function">add</span> new feature
a35c102 <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并成功后，查看<code>hello.txt</code>文件就可以看到新的变化了。当一个分支成功合并以后，这个分支就没用了，所以可以将其删除。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature
Deleted branch feature <span class="token punctuation">(</span>was 0658483<span class="token punctuation">)</span>.

$ <span class="token function">git</span> branch <span class="token parameter variable">-l</span>
* main
  <span class="token function">op</span>
  <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除后再次查看分支列表，就会发现不存在了，此时main分支的代码就已经是最新的了。</p><h3 id="恢复分支" tabindex="-1"><a class="header-anchor" href="#恢复分支" aria-hidden="true">#</a> 恢复分支</h3><p>在进行日常操作时，总会不可避免将分支误删除，之前讲到过分支其实就是一个指向提交的指针，而删除分支只是删除这个指针，至于那些提交不会有任何变化，所以恢复的关键点在于找到提交。在先前的例子中，我们已经将feature分支删除了，为了恢复该分支，我们先看看git的引用日志。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> reflog
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: merge feature: Fast-forward
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: checkout: moving from feature to main
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: checkout: moving from main to feature
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: checkout: moving from main to main
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: checkout: moving from feature to main
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span>: checkout: moving from main to feature
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">}</span>: checkout: moving from feature to main
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">}</span>: commit: another new feature
28d8277 HEAD@<span class="token punctuation">{</span><span class="token number">8</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> new feature
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">9</span><span class="token punctuation">}</span>: checkout: moving from main to feature
a35c102 HEAD@<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">}</span>: commit: <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">}</span>: checkout: moving from <span class="token builtin class-name">test</span> to main
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">12</span><span class="token punctuation">}</span>: reset: moving to HEAD
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">13</span><span class="token punctuation">}</span>: reset: moving to HEAD
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">14</span><span class="token punctuation">}</span>: reset: moving to HEAD
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">15</span><span class="token punctuation">}</span>: reset: moving to HEAD
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">16</span><span class="token punctuation">}</span>: checkout: moving from <span class="token function">op</span> to <span class="token builtin class-name">test</span>
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">17</span><span class="token punctuation">}</span>: checkout: moving from main to <span class="token function">op</span>
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">18</span><span class="token punctuation">}</span>: checkout: moving from <span class="token builtin class-name">test</span> to main
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">19</span><span class="token punctuation">}</span>: reset: moving to HEAD
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">20</span><span class="token punctuation">}</span>: commit <span class="token punctuation">(</span>initial<span class="token punctuation">)</span>: initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键点在于这一条，这时我们在feature分支做的最后一个提交</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0658483 (HEAD -&gt; main) HEAD@{7}: commit: another new feature
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用该commitId创建一个新分支</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature_v2 0658483
Switched to a new branch <span class="token string">&#39;feature_v2&#39;</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
0658483 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> feature_v2, main<span class="token punctuation">)</span> another new feature
28d8277 <span class="token function">add</span> new feature
a35c102 <span class="token function">clear</span> hello.txt
0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出中可以看到，在先前feature分支的提交都已经恢复了。</p><h3 id="冲突解决" tabindex="-1"><a class="header-anchor" href="#冲突解决" aria-hidden="true">#</a> 冲突解决</h3><p>上述过程就是一个多分支开发的例子，这个简单的案例中只涉及到了一个文件的变化，在使用的过程中很难会出什么问题。不过在实际项目中从主分支中创建一个新分支，主分支在合并前就可能有了很多的新的提交，这些提交可能是从其它分支中合并来的，新的提交可能会涉及到很多文件的新增，修改，删除，而新分支也是同样如此，这样一来在合并时就不可避免的会出现冲突，只有将冲突解决后，才能成功合并。如图所示</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309090938745.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了演示冲突，先在从当前提交创建一个新分支，并做一些修改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> conflict
Switched to a new branch <span class="token string">&#39;conflict&#39;</span>

$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;this is update at conflict branch&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt

$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update hello.txt&quot;</span>
<span class="token punctuation">[</span>conflict 2ae76e4<span class="token punctuation">]</span> update hello.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后切回main分支，再做一个修改并提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout main
Switched to branch <span class="token string">&#39;main&#39;</span>

$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;this is a update at main branch&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt

$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update hello.txt&quot;</span>
<span class="token punctuation">[</span>main fd66aec<span class="token punctuation">]</span> update hello.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时查看提交历史，就跟上图描述的差不多</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">--oneline</span>
* fd66aec <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> update hello.txt
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在开始准备合并，git会提示你没法合并，因为有文件冲突，只有将冲突解决了才能合并。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> merge conflict
Auto-merging hello.txt
CONFLICT <span class="token punctuation">(</span>content<span class="token punctuation">)</span>: Merge conflict <span class="token keyword">in</span> hello.txt
Automatic merge failed<span class="token punctuation">;</span> fix conflicts and <span class="token keyword">then</span> commit the result.
$ <span class="token function">git</span> status
On branch main
You have unmerged paths.
  <span class="token punctuation">(</span>fix conflicts and run <span class="token string">&quot;git commit&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">&quot;git merge --abort&quot;</span> to abort the merge<span class="token punctuation">)</span>

Unmerged paths:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to mark resolution<span class="token punctuation">)</span>
        both modified:   hello.txt

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时看看<code>hello.txt</code>文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> hello.txt

this is a new feature
this is another new feature
<span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD
this is a update at main branch
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
this is update at conflict branch
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> conflict
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会发现git已经给你标记好了哪些修改是main分支做的，哪些修改conflict分支做的，由于同时修改了同一个文件，所以产生了冲突。我们使用vim将文件修改成如下内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
this is a new feature
this is another new feature
this is a update at main branch
this is update at conflict branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上只是去掉了git后面加的标记，因为这两个分支的修改我们都需要保留，只有将git冲突标记去掉后，git才会认为是真正解决了冲突，然后再将修改提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;merged from conflict&quot;</span>
<span class="token punctuation">[</span>main 388811a<span class="token punctuation">]</span> merged from conflict
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span>
*   388811a <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main<span class="token punctuation">)</span> merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main分支和conflict分支最初的父提交都是<code>0658483 </code>，而后两个分支分别做各自的修改，它们的最新提交分别是<code>fd66aec</code>和<code>2ae76e4</code>。这样一来，git在合并时就会比对这三个提交所对应的快照，进行一个三方合并。而在之前的feature分支中，由于main分支并未做出任何新的提交，所以合并后提交历史依旧是线性的，也就不需要三方合并。从提交历史中可以看到，此时两个分支的提交已经被合并了，而且还多了一个新的提交，这个提交被称为合并提交，它用来记录一次三方合并操作，这样一来合并操作就会被记录到提交历史中，合并后的仓库提交历史如图所示。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091039034.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在提交历史中可以清晰的看到，这是一次合并提交</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>commit 388811a9465176c7dadfa75f06c41c7f66cb88a2
Merge: fd66aec 2ae76e4
Author: <span class="token number">246859</span> <span class="token operator">&lt;</span><span class="token number">2633565580</span>@qq.com<span class="token operator">&gt;</span>
Date:   Sat Sep <span class="token number">9</span> <span class="token number">10</span>:24:07 <span class="token number">2023</span> +0800

    merged from conflict
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Merge: fd66aec 2ae76e4</code>这一行描述了合并前两个分支所指向的最新的提交，通过这两个commitid，也可以很轻松的恢复原分支。</p><h2 id="变基操作" tabindex="-1"><a class="header-anchor" href="#变基操作" aria-hidden="true">#</a> 变基操作</h2><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309090938745.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在git中整合不同分支的方法除了合并<code>merge</code>之外，还有一个方法就是变基<code>rebase</code>。在之前的例子中，我们可以得知，合并操作会将对两个分支进行三方合并，最终结果是生成了一个新的提交，并且这个提交在历史中会被记录。而变基则相反，它不会生成一个新的提交，对于上图这种状态，它会将feature分支上所有的修改都移到main分支上，原本feature分支是从Commit2的基础之上新建来的，执行<code>rebase</code>操作后，feature分支中的Commit4将会指向Commit3，这一过程就被称作变基，就如下图所示。然后就只需要一个普通合并让main分支指向Commit5就完成操作了。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091435384.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="双分支" tabindex="-1"><a class="header-anchor" href="#双分支" aria-hidden="true">#</a> 双分支</h3><p>下面会例子来进行演示，首先在main分支对<code>README.md</code>文件做修改并提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;123&quot;</span> <span class="token operator">&gt;&gt;</span> README.md

$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update README&quot;</span>
<span class="token punctuation">[</span>main 0d096d1<span class="token punctuation">]</span> update README
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在前一个提交的基础上新建一个名为<code>feature_v3</code>的分支，在该分支上对<code>hello.txt</code>进行修改并提交</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch feature_V3 388811a

$ <span class="token function">git</span> switch feature_V3
Switched to branch <span class="token string">&#39;feature_V3&#39;</span>

$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;456&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt

$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update hello.txt&quot;</span>
<span class="token punctuation">[</span>feature_V3 63f5bc8<span class="token punctuation">]</span> update hello.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时仓库状态跟下面的输出一样，是分叉的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">--graph</span>
* 63f5bc8 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> feature_V3<span class="token punctuation">)</span> update hello.txt
<span class="token operator">|</span> * 0d096d1 <span class="token punctuation">(</span>main<span class="token punctuation">)</span> update README
<span class="token operator">|</span>/
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在feature_v3分支上对main分支执行变基操作，就会发现提交历史又变成线性的了，提交<code>63f5bc8</code>原本指向的父提交从<code>388811a</code>变成了main分支的 <code>0d096d1</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase main
Successfully rebased and updated refs/heads/feature_V3.

$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--graph</span>
* a7c0c56 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 <span class="token punctuation">(</span>main<span class="token punctuation">)</span> update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再切回main分支，对feature_v3进行合并。这种合并就不是三方合并了，只是让main分支指针移动到与feautre_v3分支所指向的同一个提交，所以也不会生成新的合并提交，这种合并被称为快进合并。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> merge feature_v3
Updating 0d096d1<span class="token punctuation">..</span>a7c0c56
Fast-forward
 hello.txt <span class="token operator">|</span> <span class="token number">1</span> +
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>

$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">--graph</span>
* a7c0c56 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时仓库状态就类似下图。变基与三方合并结果并没有区别，只是变基操作不会被记录在提交历史中，且提交历史看起来是线性的，能够保持提交历史的简介。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091457670.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="三分支" tabindex="-1"><a class="header-anchor" href="#三分支" aria-hidden="true">#</a> 三分支</h3><p>似乎从目前看来，变基要比合并好用的多，不过事实并非如此。下面来演示三个分支变基的例子。先创建一个新分支叫v1，然后在main分支上做一些修改并提交，切换到v1分支上做一些修改并提交，在这个提交的基础上再建一个新分支v2，随后又在v2分支上做一些新提交，总共三个分支。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch v1
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;123&quot;</span> <span class="token operator">&gt;&gt;</span> hello.txt
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update hello.txt&quot;</span>
<span class="token punctuation">[</span>main e2344ae<span class="token punctuation">]</span> update hello.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token function">git</span> checkout v1
Switched to branch <span class="token string">&#39;v1&#39;</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;456&quot;</span> <span class="token operator">&gt;&gt;</span> README.md
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update README&quot;</span>
<span class="token punctuation">[</span>v1 22131f9<span class="token punctuation">]</span> update README
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;789&quot;</span> <span class="token operator">&gt;&gt;</span> README.md
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;update README again&quot;</span>
<span class="token punctuation">[</span>v1 06983cb<span class="token punctuation">]</span> update README again
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
$ <span class="token function">git</span> checkout v2
Switched to branch <span class="token string">&#39;v2&#39;</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;good bye!&quot;</span> <span class="token operator">&gt;&gt;</span> bye.txt
$ <span class="token function">git</span> <span class="token function">add</span> bye.txt <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;add new bye.txt&quot;</span>
<span class="token punctuation">[</span>v2 2b14346<span class="token punctuation">]</span> <span class="token function">add</span> new bye.txt
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> bye.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过一系列修改后，就有了三个分支，并且各自都有新提交，此时仓库提交历史如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span>
* 2b14346 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> v2<span class="token punctuation">)</span> <span class="token function">add</span> new bye.txt
<span class="token operator">|</span> * 06983cb <span class="token punctuation">(</span>v1<span class="token punctuation">)</span> update README again
<span class="token operator">|</span>/
* 22131f9 update README
<span class="token operator">|</span> * e2344ae <span class="token punctuation">(</span>main<span class="token punctuation">)</span> update hello.txt
<span class="token operator">|</span>/
* a7c0c56 <span class="token punctuation">(</span>feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似下图所描述的结构</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091537147.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>假如我想要把v2分支的修改合并到main分支中，因为v2分支的修改已经工作完毕，可以考虑合并了，但v1分支中的修改还不稳定，需要继续完善，所以只想要应用v2的修改，但并不想应用v1的修改，这就需要用到<code>git rebase --onto</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase <span class="token parameter variable">--onto</span> main v1 v2
Successfully rebased and updated refs/heads/v2.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过执行上述命令，git会将v2分支变基到main分支上，git会找出v2分支从v1分支分离后的修改，将其应用在main分支上。<code>--onto</code>参数就是干这活的，如果直接进行变基的话，v1和v2的修改都会被应用到main分支上。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">--graph</span>
* 9991f25 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> v2<span class="token punctuation">)</span> <span class="token function">add</span> new bye.txt
* e2344ae <span class="token punctuation">(</span>main<span class="token punctuation">)</span> update hello.txt
<span class="token operator">|</span> * 06983cb <span class="token punctuation">(</span>v1<span class="token punctuation">)</span> update README again
<span class="token operator">|</span> * 22131f9 update README
<span class="token operator">|</span>/
* a7c0c56 <span class="token punctuation">(</span>feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过提交历史可以看到，此时的提交历史如下图所示</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091552648.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>先别急着合并，在这之前，先将分支v1变基到v2分支上</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase v2 v1
Successfully rebased and updated refs/heads/v1.

$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span> <span class="token parameter variable">--graph</span>
* ead7b89 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> v1<span class="token punctuation">)</span> update README again
* 7b3ec3a update README
* 9991f25 <span class="token punctuation">(</span>v2<span class="token punctuation">)</span> <span class="token function">add</span> new bye.txt
* e2344ae <span class="token punctuation">(</span>main<span class="token punctuation">)</span> update hello.txt
* a7c0c56 <span class="token punctuation">(</span>feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过提交历史可以看到，此时的提交历史又变成线性的了，然后再逐一合并</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> switch v2
Switched to branch <span class="token string">&#39;v2&#39;</span>

$ <span class="token function">git</span> merge v1
Updating 9991f25<span class="token punctuation">..</span>ead7b89
Fast-forward
 README.md <span class="token operator">|</span> <span class="token number">2</span> ++
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>

$ <span class="token function">git</span> switch main
Switched to branch <span class="token string">&#39;main&#39;</span>

$ <span class="token function">git</span> merge v1
Updating e2344ae<span class="token punctuation">..</span>ead7b89
Fast-forward
 README.md <span class="token operator">|</span> <span class="token number">2</span> ++
 bye.txt   <span class="token operator">|</span> <span class="token number">1</span> +
 <span class="token number">2</span> files changed, <span class="token number">3</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> bye.txt
 
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span>
* ead7b89 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> main, v2, v1<span class="token punctuation">)</span> update README again
* 7b3ec3a update README
* 9991f25 <span class="token function">add</span> new bye.txt
* e2344ae update hello.txt
* a7c0c56 <span class="token punctuation">(</span>feature_V3<span class="token punctuation">)</span> update hello.txt
* 0d096d1 update README
*   388811a merged from conflict
<span class="token operator">|</span><span class="token punctuation">\\</span>
<span class="token operator">|</span> * 2ae76e4 <span class="token punctuation">(</span>conflict<span class="token punctuation">)</span> update hello.txt
* <span class="token operator">|</span> fd66aec update hello.txt
<span class="token operator">|</span>/
* 0658483 <span class="token punctuation">(</span>feature_v2<span class="token punctuation">)</span> another new feature
* 28d8277 <span class="token function">add</span> new feature
* a35c102 <span class="token punctuation">(</span>jkl<span class="token punctuation">)</span> <span class="token function">clear</span> hello.txt
<span class="token operator">|</span> * 67f67ee <span class="token punctuation">(</span>refs/stash<span class="token punctuation">)</span> On test: <span class="token number">789</span>
<span class="token operator">|</span>/<span class="token operator">|</span>
<span class="token operator">|</span> * 8a311a3 index on test: 0224b74 initial commit
<span class="token operator">|</span>/
* 0224b74 <span class="token punctuation">(</span>test, <span class="token function">op</span><span class="token punctuation">)</span> initial commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，所有分支的提交都变成线性的了，就如下图所示。这个例子演示了如何在变基时，选择性的合并修改，即便是四个分支，五分支也是同样如此。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091608582.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h3>`,133),d={href:"https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA#_merge_rebase_work",target:"_blank",rel:"noopener noreferrer"},r=s(`<p>图中分为远程仓库和本次仓库，你的本次仓库在远程仓库的基础之上做了一些修改。</p><figure><img src="https://git-scm.com/book/en/v2/images/perils-of-rebasing-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后另外一个人做了一些合并修改，并推送到远程仓库，随后你又拉取了这些修改到你的本次仓库，并将修改合并到你本地的分支，此时提交历史是这样的。</p><figure><img src="https://git-scm.com/book/en/v2/images/perils-of-rebasing-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>结果那个人吃饱了撑的又把合并操作撤销了，改用变基操作，然后又用<code>git push --force</code>覆盖了远程仓库上的提交历史。这时如果你再次拉取远程仓库上的修改，你就会发现本地仓库中多出来一些提交，这些多出来的提交，就是变基操作在目标分支上复原的提交。此时的提交历史如下图所示</p><figure><img src="https://git-scm.com/book/en/v2/images/perils-of-rebasing-3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到c6是原来远程仓库中三方合并c1，c4，c5产生的新提交，但是那个人将合并撤销后改用变基，这就意味着c6提交在远程仓库中被废弃了，不过在你的本地仓库并没有废弃，而且你本地仓库的c7提交是从c6提交合并而来的，c4&#39;是变基操作将c4重新在目标分支上应用而产生的新提交。再次将远程分支合并过后，其实c6与c4&#39;这两个提交内容是完全一样的，等于是你将相同的内容又合并了一次。本地仓库的提交历史就像下图一样</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091658757.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>c8是由合并而产生的新提交，你的本次仓库中会同时存在c4与c4&#39;这两个提交，它们两个理应不应该同时出现，这时查看提交历史，你会发现c4与c4&#39;的提交信息完全一模一样。更大的问题是，假如你想要把你的修改提交到远程仓库上，等于就是你把别人通过变基操作丢弃掉的提交（c4，c6）又找了回来。</p><p>面对这种问题，你应该将远程分支作为目标分支进行变基，就是执行如下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase rebase teamone/master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> pull <span class="token parameter variable">--rebase</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Git 将会进行如下操作：</p><ul><li>检查哪些提交是我们的分支上独有的（C2，C3，C4，C6，C7）</li><li>检查其中哪些提交不是合并操作的结果（C2，C3，C4）</li><li>检查哪些提交在对方覆盖更新时并没有被纳入目标分支（只有 C2 和 C3，因为 C4 其实就是 C4&#39;）</li><li>把查到的这些提交应用在 <code>teamone/master</code> 上面</li></ul><p>最终就会如下图所示，是一个线性的提交历史。</p><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202309091713225.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>导致这种情况的原因就在于，你已经基于远程仓库的提交进行新的开发了，而对方却使用变基使得提交废弃了。建议使用变基时，最好只在你本地进行，并且只对<strong>没有推送到远程仓库的提交</strong>进行变基，这样才能安全的享受到变基带来的好处，否则的话你就有大麻烦了。</p>`,18);function v(m,b){const e=l("ExternalLinkIcon");return i(),p("div",null,[u,a("p",null,[n("就目前而言的话，变基的使用还是相当愉快的，不过愉快的前提是这个仓库只有你一个人用。变基最大的缺点就是体现在远程仓库中多人开发的时候，下面来讲一讲它的缺点。变基的实质是丢弃一些现有的提交，然后再新建一些看起来一样但其实并不一样的提交，这里拿官网的例子举例"),a("a",d,[n("Git - 变基 (git-scm.com)"),c(e)]),n("，可以先去了解下远程仓库再来看这个例子。")]),r])}const g=t(o,[["render",v],["__file","2.branch.html.vue"]]);export{g as default};
