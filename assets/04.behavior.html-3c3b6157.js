import{_ as n,V as s,W as a,Z as t}from"./framework-44a66fc7.js";const p={},e=t(`<h1 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式" aria-hidden="true">#</a> 行为型模式</h1><p>行为型模式用于描述程序在运行时复杂的流程控制，即描述多个类或对象之间怎样相互协作共同完成单个对象都无法单独完成的任务，它涉及算法与对象间职责的分配。行为型模式分为类行为模式和对象行为模式，前者采用继承机制来在类间分派行为，后者采用组合或聚合在对象间分配行为。由于组合关系或聚合关系比继承关系耦合度低，满足“合成复用原则”，所以对象行为模式比类行为模式具有更大的灵活性。</p><h2 id="模板方法模式" tabindex="-1"><a class="header-anchor" href="#模板方法模式" aria-hidden="true">#</a> 模板方法模式</h2><p>定义一个操作中的算法骨架，而将算法的一些步骤延迟到子类中，使得子类可以不改变该算法结构的情况下重定义该算法的某些特定步骤。</p><ul><li><p>抽象类（Abstract Class）：负责给出一个算法的轮廓和骨架。它由一个模板方法和若干个基本方法构成。</p><ul><li>模板方法：定义了算法的骨架，按某种顺序调用其包含的基本方法。</li><li>基本方法：是实现算法各个步骤的方法，是模板方法的组成部分。</li></ul></li><li><p>具体子类（Concrete Class）：实现抽象类中所定义的抽象方法和钩子方法，它们是一个顶级逻辑的组成步骤。</p></li></ul><p>很典型的一个例子，go 标准库中排序<code>sort</code>包下 的<code>Interface</code>接口，其内部定义了三个基本方法和几个模板方法，倘若想要自定义数据结构排序，就必须要实现这三个方法，模板方法内会将基本方法的返回值当作排序的依据。</p><p>例：北方人都喜欢吃面，而煮面的步骤都是相同的，只是其中的细节和顺序不同，分为，烧水，下面，挑面，放调料。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> CookNoodles <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Water</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">Noodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">TakeNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">Condiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">Cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> template <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   CookNoodles
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t template<span class="token punctuation">)</span> <span class="token function">Cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span><span class="token function">Water</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   t<span class="token punctuation">.</span><span class="token function">Noodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   t<span class="token punctuation">.</span><span class="token function">TakeNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   t<span class="token punctuation">.</span><span class="token function">Condiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;面煮完了&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> BeefNoodles <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token operator">*</span>template
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b BeefNoodles<span class="token punctuation">)</span> <span class="token function">Water</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;烧水5分钟&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b BeefNoodles<span class="token punctuation">)</span> <span class="token function">Noodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;加入刀削面&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b BeefNoodles<span class="token punctuation">)</span> <span class="token function">TakeNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;用筷子挑面&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b BeefNoodles<span class="token punctuation">)</span> <span class="token function">Condiment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;加入牛肉和调料&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewCookNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> CookNoodles <span class="token punctuation">{</span>
   tem <span class="token operator">:=</span> template<span class="token punctuation">{</span><span class="token punctuation">}</span>
   noodles <span class="token operator">:=</span> BeefNoodles<span class="token punctuation">{</span>template<span class="token punctuation">:</span> <span class="token operator">&amp;</span>tem<span class="token punctuation">}</span>
   <span class="token comment">// 父类持有子类的引用</span>
   tem<span class="token punctuation">.</span>CookNoodles <span class="token operator">=</span> noodles
   <span class="token keyword">return</span> noodles
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestNoodles</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   noodles <span class="token operator">:=</span> <span class="token function">NewCookNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   noodles<span class="token punctuation">.</span><span class="token function">Cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>go语言是不提供继承机制的，这里是用匿名组合和手动让父类持有子类引用来模拟的，官方的解决办法是在<code>sort</code>包下，直接将模板方法作为了私有的函数，而不是成员方法，个人认为官方的解决办法会更好一些。</p><h2 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式" aria-hidden="true">#</a> 观察者模式</h2><p>又被称为发布-订阅（Publish/Subscribe）模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态变化时，会通知所有的观察者对象，使他们能够自动更新自己。</p><ul><li>Subject：抽象主题（抽象被观察者），抽象主题角色把所有观察者对象保存在一个集合里，每个主题都可以有任意数量的观察者，抽象主题提供一个接口，可以增加和删除观察者对象。</li><li>ConcreteSubject：具体主题（具体被观察者），该角色将有关状态存入具体观察者对象，在具体主题的内部状态发生改变时，给所有注册过的观察者发送通知。</li><li>Observer：抽象观察者，是观察者的抽象类，它定义了一个更新接口，使得在得到主题更改通知时更新自己。</li><li>ConcrereObserver：具体观察者，实现抽象观察者定义的更新接口，以便在得到主题更改通知时更新自身的状态。</li></ul><p>例：一个公众号有很多个订阅用户，公众号更新时会自动通知用户，用户收到通知便会做出相应的行为。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象主题</span>
<span class="token keyword">type</span> Subject <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Attach</span><span class="token punctuation">(</span>Observer<span class="token punctuation">)</span>
   <span class="token function">Detach</span><span class="token punctuation">(</span>Observer<span class="token punctuation">)</span>
   <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体主题</span>
<span class="token keyword">type</span> WeiXinOffical <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   observers <span class="token punctuation">[</span><span class="token punctuation">]</span>Observer
<span class="token punctuation">}</span>

<span class="token comment">// 构造方法</span>
<span class="token keyword">func</span> <span class="token function">NewWeiXinOffical</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>WeiXinOffical <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>WeiXinOffical<span class="token punctuation">{</span>observers<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Observer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>WeiXinOffical<span class="token punctuation">)</span> <span class="token function">Attach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   w<span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>w<span class="token punctuation">.</span>observers<span class="token punctuation">,</span> observer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>WeiXinOffical<span class="token punctuation">)</span> <span class="token function">Detach</span><span class="token punctuation">(</span>observer Observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">for</span> i<span class="token punctuation">,</span> o <span class="token operator">:=</span> <span class="token keyword">range</span> w<span class="token punctuation">.</span>observers <span class="token punctuation">{</span>
      <span class="token keyword">if</span> o <span class="token operator">==</span> observer <span class="token punctuation">{</span>
         w<span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>w<span class="token punctuation">.</span>observers<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> w<span class="token punctuation">.</span>observers<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>WeiXinOffical<span class="token punctuation">)</span> <span class="token function">Notify</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
   <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> observer <span class="token operator">:=</span> <span class="token keyword">range</span> w<span class="token punctuation">.</span>observers <span class="token punctuation">{</span>
      observer<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">&quot;公众号更新了&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象观察者</span>
<span class="token keyword">type</span> Observer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Update</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体观察者</span>
<span class="token keyword">type</span> WeiXinUser <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w WeiXinUser<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;收到更新了，赶紧去点赞&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestObserver</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   offical <span class="token operator">:=</span> <span class="token function">NewWeiXinOffical</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   offical<span class="token punctuation">.</span><span class="token function">Attach</span><span class="token punctuation">(</span>WeiXinUser<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   offical<span class="token punctuation">.</span><span class="token function">Attach</span><span class="token punctuation">(</span>WeiXinUser<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   offical<span class="token punctuation">.</span><span class="token function">Attach</span><span class="token punctuation">(</span>WeiXinUser<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   offical<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span><span class="token string">&quot;震惊，Go语言将推出新泛型机制！&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h2><p>又叫快照模式，在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后当需要时能将该对象恢复到原先保存的状态。</p><ul><li>发起人（Originator）角色：记录当前时刻的内部状态信息，提供创建备忘录和恢复备忘录数据的功能，实现其他业务功能，它可以访问备忘录里的所有信息。</li><li>备忘录（Memento）角色：负责存储发起人的内部状态，在需要的时候提供这些内部状态给发起人。</li><li>管理者（Caretaker）角色：对备忘录进行管理，提供保存与获取备忘录的功能，但其不能对备忘录的内容进行访问与修改。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>备忘录有两个等效的接口：</p><p><strong>窄接口</strong>：管理者(Caretaker)对象（和其他发起人对象之外的任何对象）看到的是备忘录的窄接口(narror Interface)，这个窄接口只允许他把备忘录对象传给其他的对象。</p><p><strong>宽接口</strong>：与管理者看到的窄接口相反，发起人对象可以看到一个宽接口(wide Interface)，这个宽接口允许它读取所有的数据，以便根据这些数据恢复这个发起人对象的内部状态。</p></div><h4 id="白箱模式" tabindex="-1"><a class="header-anchor" href="#白箱模式" aria-hidden="true">#</a> 白箱模式</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 存档对象 白箱模式下存档对象是对外暴露的</span>
<span class="token keyword">type</span> GameMemento <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	hp<span class="token punctuation">,</span> ak<span class="token punctuation">,</span> def <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 玩家对象</span>
<span class="token keyword">type</span> GamePlayer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>GameMemento
<span class="token punctuation">}</span>

<span class="token comment">// 构造方法</span>
<span class="token keyword">func</span> <span class="token function">NewGamePlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>GamePlayer <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>GamePlayer<span class="token punctuation">{</span>GameMemento<span class="token punctuation">:</span> <span class="token operator">&amp;</span>GameMemento<span class="token punctuation">{</span>
		hp<span class="token punctuation">:</span>  <span class="token number">100</span><span class="token punctuation">,</span>
		ak<span class="token punctuation">:</span>  <span class="token number">100</span><span class="token punctuation">,</span>
		def<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Fight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	g<span class="token punctuation">.</span>hp <span class="token operator">-=</span> <span class="token number">1</span>
	g<span class="token punctuation">.</span>ak <span class="token operator">-=</span> <span class="token number">1</span>
	g<span class="token punctuation">.</span>def <span class="token operator">-=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>GameMemento <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>GameMemento<span class="token punctuation">{</span>
		hp<span class="token punctuation">:</span>  g<span class="token punctuation">.</span>hp<span class="token punctuation">,</span>
		ak<span class="token punctuation">:</span>  g<span class="token punctuation">.</span>ak<span class="token punctuation">,</span>
		def<span class="token punctuation">:</span> g<span class="token punctuation">.</span>def<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Load</span><span class="token punctuation">(</span>memento <span class="token operator">*</span>GameMemento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	g<span class="token punctuation">.</span>hp <span class="token operator">=</span> memento<span class="token punctuation">.</span>hp
	g<span class="token punctuation">.</span>ak <span class="token operator">=</span> memento<span class="token punctuation">.</span>ak
	g<span class="token punctuation">.</span>def <span class="token operator">=</span> memento<span class="token punctuation">.</span>def
<span class="token punctuation">}</span>

<span class="token comment">// 存档保存对象</span>
<span class="token keyword">type</span> MementoTaker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	memento <span class="token operator">*</span>GameMemento
<span class="token punctuation">}</span>

<span class="token comment">// 保存对象知道保存的是玩家的数据存档</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MementoTaker<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>memento <span class="token operator">*</span>GameMemento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span>memento <span class="token operator">=</span> memento
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MementoTaker<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>GameMemento <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>memento
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestMemento</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	player <span class="token operator">:=</span> <span class="token function">NewGamePlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	taker <span class="token operator">:=</span> MementoTaker<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// 战斗前先存档</span>
	taker<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 战斗</span>
	player<span class="token punctuation">.</span><span class="token function">Fight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	player<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>taker<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="黑箱模式" tabindex="-1"><a class="header-anchor" href="#黑箱模式" aria-hidden="true">#</a> 黑箱模式</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 备忘录对象</span>
<span class="token keyword">type</span> Memento <span class="token keyword">interface</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 存档对象 黑箱模式 存档数据不对外公开</span>
<span class="token keyword">type</span> gameMemento <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   hp<span class="token punctuation">,</span> ak<span class="token punctuation">,</span> def <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 玩家对象</span>
<span class="token keyword">type</span> GamePlayer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token operator">*</span>gameMemento
<span class="token punctuation">}</span>

<span class="token comment">// 构造方法</span>
<span class="token keyword">func</span> <span class="token function">NewGamePlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>GamePlayer <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>GamePlayer<span class="token punctuation">{</span>gameMemento<span class="token punctuation">:</span> <span class="token operator">&amp;</span>gameMemento<span class="token punctuation">{</span>
      hp<span class="token punctuation">:</span>  <span class="token number">100</span><span class="token punctuation">,</span>
      ak<span class="token punctuation">:</span>  <span class="token number">100</span><span class="token punctuation">,</span>
      def<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Fight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   g<span class="token punctuation">.</span>hp <span class="token operator">-=</span> <span class="token number">1</span>
   g<span class="token punctuation">.</span>ak <span class="token operator">-=</span> <span class="token number">1</span>
   g<span class="token punctuation">.</span>def <span class="token operator">-=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Memento <span class="token punctuation">{</span>
   <span class="token keyword">return</span> gameMemento<span class="token punctuation">{</span>
      hp<span class="token punctuation">:</span>  g<span class="token punctuation">.</span>hp<span class="token punctuation">,</span>
      ak<span class="token punctuation">:</span>  g<span class="token punctuation">.</span>ak<span class="token punctuation">,</span>
      def<span class="token punctuation">:</span> g<span class="token punctuation">.</span>def<span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g <span class="token operator">*</span>GamePlayer<span class="token punctuation">)</span> <span class="token function">Load</span><span class="token punctuation">(</span>memento gameMemento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   g<span class="token punctuation">.</span>hp <span class="token operator">=</span> memento<span class="token punctuation">.</span>hp
   g<span class="token punctuation">.</span>ak <span class="token operator">=</span> memento<span class="token punctuation">.</span>ak
   g<span class="token punctuation">.</span>def <span class="token operator">=</span> memento<span class="token punctuation">.</span>def
<span class="token punctuation">}</span>

<span class="token comment">// 存档保存对象</span>
<span class="token keyword">type</span> MementoTaker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   memento Memento
<span class="token punctuation">}</span>

<span class="token comment">// 只知道是一个备忘录对象，不知道保存的是个什么东西，仅仅只负责存储</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MementoTaker<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>memento Memento<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   m<span class="token punctuation">.</span>memento <span class="token operator">=</span> memento
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MementoTaker<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Memento <span class="token punctuation">{</span>
   <span class="token keyword">return</span> m<span class="token punctuation">.</span>memento
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestMemento</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   player <span class="token operator">:=</span> <span class="token function">NewGamePlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   taker <span class="token operator">:=</span> MementoTaker<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token comment">// 战斗前先存档</span>
   taker<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token comment">// 战斗</span>
   player<span class="token punctuation">.</span><span class="token function">Fight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   player<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>taker<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span>gameMemento<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点</strong>：</p><p>提供了一种可以恢复状态的机制。当用户需要时能够比较方便地将数据恢复到某个历史的状态。实现了内部状态的封装。除了创建它的发起人之外，其他对象都不能够访问这些状态信息。简化了发起人类。发起人不需要管理和保存其内部状态的各个备份，所有状态信息都保存在备忘录 中，并由管理者进行管理，这符合单一职责原则。</p><p><strong>缺点</strong>：</p><p>资源消耗大。如果要保存的内部状态信息过多或者特别频繁，将会占用比较大的内存资源。</p><h2 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h2><p>又名职责链模式，为了避免请求发送者与多个请求处理者耦合在一起，将所有请求的处理者通过前一对象记住其下一个对象的引用而连成一条链；当有请求发生时，可将请求沿着这条链传递，直到有对象处理它为止。</p><ul><li>抽象处理者（Handler）角色：定义一个处理请求的接口，包含抽象处理方法和一个后继连接。</li><li>具体处理者（Concrete Handler）角色：实现抽象处理者的处理方法，判断能否处理本次请求，如果可以处理请求则处理，否则将该请求转给它的后继者。</li><li>客户类（Client）角色：创建处理链，并向链头的具体处理者对象提交请求，它不关心处理细节和请求的传递过程。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Gin框架内的中间件就是责任链模式的一个应用。</p></div><p>例子：现需要开发一个请假流程控制系统。请假一天以下的假只需要小组长同意即可；请假1天到3天的假还需要部门经理同意；请求3天到7天还需要总经理同意才行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 处理者</span>
<span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Handle</span><span class="token punctuation">(</span>Handlee<span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token punctuation">}</span>

<span class="token comment">// 小组长</span>
<span class="token keyword">type</span> GroupManager <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g GroupManager<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>handlee Handlee<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> handlee<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// 部门经理</span>
<span class="token keyword">type</span> Manager <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m Manager<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>handlee Handlee<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> handlee<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">3</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> GeneralManager <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>g GeneralManager<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>handlee Handlee<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> handlee<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">7</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// 被处理者不一定要是接口，具体的类也可以，被处理者的设计可以很灵活</span>
<span class="token keyword">type</span> Handlee <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 请假条</span>
<span class="token keyword">type</span> LeaveReq <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   days <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l LeaveReq<span class="token punctuation">)</span> <span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> l<span class="token punctuation">.</span>days
<span class="token punctuation">}</span>

<span class="token comment">// 调用链</span>
<span class="token keyword">type</span> HanlderChain <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   chain <span class="token punctuation">[</span><span class="token punctuation">]</span>Handler
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewHanlderChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>HanlderChain <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>HanlderChain<span class="token punctuation">{</span>chain<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Handler<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将调用链里的处理器一个个调用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>HanlderChain<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>handlee Handlee<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
   <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> handler <span class="token operator">:=</span> <span class="token keyword">range</span> h<span class="token punctuation">.</span>chain <span class="token punctuation">{</span>
      <span class="token keyword">if</span> handler<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>handlee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// 添加处理器，删除也可以有，这类省略了</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>HanlderChain<span class="token punctuation">)</span> <span class="token function">addHandler</span><span class="token punctuation">(</span>handler Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   h<span class="token punctuation">.</span>chain <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span>chain<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestResponse</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   handlerChain <span class="token operator">:=</span> <span class="token function">NewHanlderChain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   handlerChain<span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span>GroupManager<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   handlerChain<span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span>Manager<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   handlerChain<span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span>GeneralManager<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>handlerChain<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>LeaveReq<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实代码也还可以再简化，本质上调用链传的只是一个个方法，可以不需要<code>Handler</code>接口，将其换为类型为<code>Func(Handlee) bool</code>的类型会更好一些。</p><p><strong>优点</strong></p><p>降低了对象之间的耦合度该模式降低了请求发送者和接收者的耦合度。</p><p>增强了系统的可扩展性可以根据需要增加新的请求处理类，满足开闭原则。</p><p>增强了给对象指派职责的灵活性当工作流程发生变化，可以动态地改变链内的成员或者修改它们的次序，也可动态地新增或者删除责任。</p><p>责任链简化了对象之间的连接</p><p><strong>缺点</strong></p><p>不能保证每个请求一定被处理。由于一个请求没有明确的接收者，所以不能保证它一定会被处理， 该请求可能一直传到链的末端都得不到处理。 对比较长的职责链，请求的处理可能涉及多个处理对象，系统性能将受到一定影响。</p><h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h2><p>该模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用 算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分 割开来，并委派给不同的对象对这些算法进行管理。</p><ul><li>抽象策略（Strategy）类：这是一个抽象角色，通常由一个接口实现。此角色给出所有 的具体策略类所需的接口。</li><li>具体策略（Concrete Strategy）类：实现了抽象策略定义的接口，提供具体的算法实现或行为。</li><li>环境（Context）类：持有一个策略类的引用，最终给客户端调用。</li></ul><p>一个商店同时支持微信支付和支付宝支付，只要传入对应的支付方式就可以支付。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象策略类</span>
<span class="token keyword">type</span> Strategy <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">pay</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体策略类</span>
<span class="token keyword">type</span> WeiXinPay <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w WeiXinPay<span class="token punctuation">)</span> <span class="token function">pay</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;微信支付: %d 元&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体策略类</span>
<span class="token keyword">type</span> AliPay <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AliPay<span class="token punctuation">)</span> <span class="token function">pay</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;支付宝支付: %d 元&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 环境上下文类，持有策略的引用</span>
<span class="token keyword">type</span> Shop <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   strategy Strategy
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Shop<span class="token punctuation">)</span> <span class="token function">SetStrategy</span><span class="token punctuation">(</span>strategy Strategy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   s<span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Shop<span class="token punctuation">)</span> <span class="token function">Show</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>strategy<span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestStrategy</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   shop <span class="token operator">:=</span> Shop<span class="token punctuation">{</span><span class="token punctuation">}</span>
   shop<span class="token punctuation">.</span><span class="token function">SetStrategy</span><span class="token punctuation">(</span>WeiXinPay<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   shop<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
   shop<span class="token punctuation">.</span><span class="token function">SetStrategy</span><span class="token punctuation">(</span>AliPay<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   shop<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>策略类之间可以自由切换，由于策略类都实现同一个接口，所以使它们之间可以自由切换。</li><li>易于扩展，增加一个新的策略只需要添加一个具体的策略类即可，基本不需要改变原有的代码，符合“开闭原则“</li><li>避免使用多重条件选择语句（if else），充分体现面向对象设计思想。</li></ul><h2 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h2><p>将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开。这样两者之间通过命令对象 进行沟通，这样方便将命令对象进行存储、传递、调用、增加与管理。</p><ul><li>抽象命令类（Command）角色： 定义命令的接口，声明执行的方法。</li><li>具体命令（Concrete Command）角色：具体的命令，实现命令接口；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。</li><li>实现者/接收者（Receiver）角色： 接收者，真正执行命令的对象。任何类都可能成为一个接收者，只要它能够实现命令要求实现的相应功能。</li><li>调用者/请求者（Invoker）角色： 要求命令对象执行请求，通常会持有命令对象，可以持有很多的命令对象。这个是客户端真正触发命令并要求命令执行相应操作的地方，也就是说相当于使用 命令对象的入口。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象命令</span>
<span class="token keyword">type</span> Command <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体命令</span>
<span class="token keyword">type</span> StartCommand <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    mb <span class="token operator">*</span>MotherBoard
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewStartCommand</span><span class="token punctuation">(</span>mb <span class="token operator">*</span>MotherBoard<span class="token punctuation">)</span> <span class="token operator">*</span>StartCommand <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>StartCommand<span class="token punctuation">{</span>
        mb<span class="token punctuation">:</span> mb<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>StartCommand<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mb<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体命令</span>
<span class="token keyword">type</span> RebootCommand <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    mb <span class="token operator">*</span>MotherBoard
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewRebootCommand</span><span class="token punctuation">(</span>mb <span class="token operator">*</span>MotherBoard<span class="token punctuation">)</span> <span class="token operator">*</span>RebootCommand <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>RebootCommand<span class="token punctuation">{</span>
        mb<span class="token punctuation">:</span> mb<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>RebootCommand<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mb<span class="token punctuation">.</span><span class="token function">Reboot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MotherBoard <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>MotherBoard<span class="token punctuation">)</span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">&quot;system starting\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>MotherBoard<span class="token punctuation">)</span> <span class="token function">Reboot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">&quot;system rebooting\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 调用者</span>
<span class="token keyword">type</span> Box <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    button1 Command
    button2 Command
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewBox</span><span class="token punctuation">(</span>button1<span class="token punctuation">,</span> button2 Command<span class="token punctuation">)</span> <span class="token operator">*</span>Box <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Box<span class="token punctuation">{</span>
        button1<span class="token punctuation">:</span> button1<span class="token punctuation">,</span>
        button2<span class="token punctuation">:</span> button2<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Box<span class="token punctuation">)</span> <span class="token function">PressButton1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    b<span class="token punctuation">.</span>button1<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Box<span class="token punctuation">)</span> <span class="token function">PressButton2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    b<span class="token punctuation">.</span>button2<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExampleCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mb <span class="token operator">:=</span> <span class="token operator">&amp;</span>MotherBoard<span class="token punctuation">{</span><span class="token punctuation">}</span>
    startCommand <span class="token operator">:=</span> <span class="token function">NewStartCommand</span><span class="token punctuation">(</span>mb<span class="token punctuation">)</span>
    rebootCommand <span class="token operator">:=</span> <span class="token function">NewRebootCommand</span><span class="token punctuation">(</span>mb<span class="token punctuation">)</span>

    box1 <span class="token operator">:=</span> <span class="token function">NewBox</span><span class="token punctuation">(</span>startCommand<span class="token punctuation">,</span> rebootCommand<span class="token punctuation">)</span>
    box1<span class="token punctuation">.</span><span class="token function">PressButton1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    box1<span class="token punctuation">.</span><span class="token function">PressButton2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    box2 <span class="token operator">:=</span> <span class="token function">NewBox</span><span class="token punctuation">(</span>rebootCommand<span class="token punctuation">,</span> startCommand<span class="token punctuation">)</span>
    box2<span class="token punctuation">.</span><span class="token function">PressButton1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    box2<span class="token punctuation">.</span><span class="token function">PressButton2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// Output:</span>
    <span class="token comment">// system starting</span>
    <span class="token comment">// system rebooting</span>
    <span class="token comment">// system rebooting</span>
    <span class="token comment">// system starting</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h2><p>提供一个对象来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示</p><ul><li>抽象聚合（Aggregate）角色：定义存储、添加、删除聚合元素以及创建迭代器对象的接口。</li><li>具体聚合（ConcreteAggregate）角色：实现抽象聚合类，返回一个具体迭代器的实例。</li><li>抽象迭代器（Iterator）角色：定义访问和遍历聚合元素的接口，通常包含 hasNext()、 next() 等方法。</li><li>具体迭代器（Concretelterator）角色：实现抽象迭代器接口中所定义的方法，完成对聚合对 象的遍历，记录遍历的当前位置。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象聚合对象</span>
<span class="token keyword">type</span> Aggregate <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Iterator
<span class="token punctuation">}</span>

<span class="token comment">// 抽象迭代器</span>
<span class="token keyword">type</span> Iterator <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">IsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体聚合对象</span>
<span class="token keyword">type</span> Numbers <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    start<span class="token punctuation">,</span> end <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewNumbers</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Numbers <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>Numbers<span class="token punctuation">{</span>
        start<span class="token punctuation">:</span> start<span class="token punctuation">,</span>
        end<span class="token punctuation">:</span>   end<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>Numbers<span class="token punctuation">)</span> <span class="token function">Iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Iterator <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>NumbersIterator<span class="token punctuation">{</span>
        numbers<span class="token punctuation">:</span> n<span class="token punctuation">,</span>
        next<span class="token punctuation">:</span>    n<span class="token punctuation">.</span>start<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体迭代器</span>
<span class="token keyword">type</span> NumbersIterator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    numbers <span class="token operator">*</span>Numbers
    next    <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>NumbersIterator<span class="token punctuation">)</span> <span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i<span class="token punctuation">.</span>next <span class="token operator">=</span> i<span class="token punctuation">.</span>numbers<span class="token punctuation">.</span>start
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>NumbersIterator<span class="token punctuation">)</span> <span class="token function">IsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> i<span class="token punctuation">.</span>next <span class="token operator">&gt;</span> i<span class="token punctuation">.</span>numbers<span class="token punctuation">.</span>end
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>NumbersIterator<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token operator">!</span>i<span class="token punctuation">.</span><span class="token function">IsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        next <span class="token operator">:=</span> i<span class="token punctuation">.</span>next
        i<span class="token punctuation">.</span>next<span class="token operator">++</span>
        <span class="token keyword">return</span> next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">IteratorPrint</span><span class="token punctuation">(</span>i Iterator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>i<span class="token punctuation">.</span><span class="token function">IsDone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">{</span>
        c <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExampleIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> aggregate Aggregate
    aggregate <span class="token operator">=</span> <span class="token function">NewNumbers</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token function">IteratorPrint</span><span class="token punctuation">(</span>aggregate<span class="token punctuation">.</span><span class="token function">Iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// Output:</span>
    <span class="token comment">// 1</span>
    <span class="token comment">// 2</span>
    <span class="token comment">// 3</span>
    <span class="token comment">// 4</span>
    <span class="token comment">// 5</span>
    <span class="token comment">// 6</span>
    <span class="token comment">// 7</span>
    <span class="token comment">// 8</span>
    <span class="token comment">// 9</span>
    <span class="token comment">// 10</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式" aria-hidden="true">#</a> 状态模式</h2><p>对有状态的对象，把复杂的“判断逻辑”提取到不同的状态对象中，允许状态对象在其内部状态发生改变 时改变其行为。</p><ul><li>环境（Context）角色：也称为上下文，它定义了客户程序需要的接口，维护一个当前状态，并将与状态相关的操作委托给当前状态对象来处理。</li><li>抽象状态（State）角色：定义一个接口，用以封装环境对象中的特定状态所对应的行为。</li><li>具体状态（Concrete State）角色：实现抽象状态所对应的行为。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Week <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">Next</span><span class="token punctuation">(</span><span class="token operator">*</span>DayContext<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> DayContext <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    today Week
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewDayContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>DayContext <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>DayContext<span class="token punctuation">{</span>
        today<span class="token punctuation">:</span> <span class="token operator">&amp;</span>Sunday<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    d<span class="token punctuation">.</span>today<span class="token punctuation">.</span><span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    d<span class="token punctuation">.</span>today<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Sunday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Sunday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Sunday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Sunday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Monday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Monday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Monday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Monday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Monday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Tuesday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Tuesday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Tuesday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Tuesday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Tuesday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Wednesday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Wednesday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Wednesday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Wednesday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Wednesday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Thursday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Thursday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Thursday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Thursday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Thursday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Friday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Friday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Friday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Friday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Friday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Saturday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Saturday <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Saturday<span class="token punctuation">)</span> <span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Saturday\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>Saturday<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>DayContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>today <span class="token operator">=</span> <span class="token operator">&amp;</span>Sunday<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExampleWeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx <span class="token operator">:=</span> <span class="token function">NewDayContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    todayAndNext <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span><span class="token function">Today</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        ctx<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token function">todayAndNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Output:</span>
    <span class="token comment">// Sunday</span>
    <span class="token comment">// Monday</span>
    <span class="token comment">// Tuesday</span>
    <span class="token comment">// Wednesday</span>
    <span class="token comment">// Thursday</span>
    <span class="token comment">// Friday</span>
    <span class="token comment">// Saturday</span>
    <span class="token comment">// Sunday</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="解释器模式" tabindex="-1"><a class="header-anchor" href="#解释器模式" aria-hidden="true">#</a> 解释器模式</h2><p>解释器模式定义一套语言文法，并设计该语言解释器，使用户能使用特定文法控制解释器行为。解释器模式的意义在于，它分离多种复杂功能的实现，每个功能只需关注自身的解释。对于调用者不用关心内部的解释器的工作，只需要用简单的方式组合命令就可以。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Node <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> ValNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    val <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>ValNode<span class="token punctuation">)</span> <span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">.</span>val
<span class="token punctuation">}</span>

<span class="token keyword">type</span> AddNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    left<span class="token punctuation">,</span> right Node
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>AddNode<span class="token punctuation">)</span> <span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">.</span>left<span class="token punctuation">.</span><span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>right<span class="token punctuation">.</span><span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MinNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    left<span class="token punctuation">,</span> right Node
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>MinNode<span class="token punctuation">)</span> <span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">.</span>left<span class="token punctuation">.</span><span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> n<span class="token punctuation">.</span>right<span class="token punctuation">.</span><span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Parser <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    exp   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
    index <span class="token builtin">int</span>
    prev  Node
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Parser<span class="token punctuation">)</span> <span class="token function">Parse</span><span class="token punctuation">(</span>exp <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span>exp <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>exp<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> p<span class="token punctuation">.</span>index <span class="token operator">&gt;=</span> <span class="token function">len</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>exp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">switch</span> p<span class="token punctuation">.</span>exp<span class="token punctuation">[</span>p<span class="token punctuation">.</span>index<span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">&quot;+&quot;</span><span class="token punctuation">:</span>
            p<span class="token punctuation">.</span>prev <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">newAddNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">:</span>
            p<span class="token punctuation">.</span>prev <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">newMinNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            p<span class="token punctuation">.</span>prev <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">newValNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Parser<span class="token punctuation">)</span> <span class="token function">newAddNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Node <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span>index<span class="token operator">++</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>AddNode<span class="token punctuation">{</span>
        left<span class="token punctuation">:</span>  p<span class="token punctuation">.</span>prev<span class="token punctuation">,</span>
        right<span class="token punctuation">:</span> p<span class="token punctuation">.</span><span class="token function">newValNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Parser<span class="token punctuation">)</span> <span class="token function">newMinNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Node <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span>index<span class="token operator">++</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>MinNode<span class="token punctuation">{</span>
        left<span class="token punctuation">:</span>  p<span class="token punctuation">.</span>prev<span class="token punctuation">,</span>
        right<span class="token punctuation">:</span> p<span class="token punctuation">.</span><span class="token function">newValNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Parser<span class="token punctuation">)</span> <span class="token function">newValNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Node <span class="token punctuation">{</span>
    v<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>exp<span class="token punctuation">[</span>p<span class="token punctuation">.</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>index<span class="token operator">++</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>ValNode<span class="token punctuation">{</span>
        val<span class="token punctuation">:</span> v<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Parser<span class="token punctuation">)</span> <span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Node <span class="token punctuation">{</span>
    <span class="token keyword">return</span> p<span class="token punctuation">.</span>prev
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestInterpreter</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Parser<span class="token punctuation">{</span><span class="token punctuation">}</span>
    p<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;1 + 2 + 3 - 4 + 5 - 6&quot;</span><span class="token punctuation">)</span>
    res <span class="token operator">:=</span> p<span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Interpret</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    expect <span class="token operator">:=</span> <span class="token number">1</span>
    <span class="token keyword">if</span> res <span class="token operator">!=</span> expect <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;expect %d got %d&quot;</span><span class="token punctuation">,</span> expect<span class="token punctuation">,</span> res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h2><p>封装一些作用于某种数据结构中的各元素的操作，它可以在不改变这个数据结构的前提下定义作用于这些元素的新的操作。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token comment">// 抽象元素</span>
<span class="token keyword">type</span> Customer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Accept</span><span class="token punctuation">(</span>Visitor<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象访问者</span>
<span class="token keyword">type</span> Visitor <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Visit</span><span class="token punctuation">(</span>Customer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> EnterpriseCustomer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CustomerCol <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    customers <span class="token punctuation">[</span><span class="token punctuation">]</span>Customer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CustomerCol<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>customer Customer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>customers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>customers<span class="token punctuation">,</span> customer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CustomerCol<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> customer <span class="token operator">:=</span> <span class="token keyword">range</span> c<span class="token punctuation">.</span>customers <span class="token punctuation">{</span>
        customer<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewEnterpriseCustomer</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>EnterpriseCustomer <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>EnterpriseCustomer<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>EnterpriseCustomer<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    visitor<span class="token punctuation">.</span><span class="token function">Visit</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> IndividualCustomer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewIndividualCustomer</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>IndividualCustomer <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>IndividualCustomer<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>IndividualCustomer<span class="token punctuation">)</span> <span class="token function">Accept</span><span class="token punctuation">(</span>visitor Visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    visitor<span class="token punctuation">.</span><span class="token function">Visit</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> ServiceRequestVisitor <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>ServiceRequestVisitor<span class="token punctuation">)</span> <span class="token function">Visit</span><span class="token punctuation">(</span>customer Customer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> c <span class="token operator">:=</span> customer<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">*</span>EnterpriseCustomer<span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;serving enterprise customer %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token operator">*</span>IndividualCustomer<span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;serving individual customer %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// only for enterprise</span>
<span class="token keyword">type</span> AnalysisVisitor <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>AnalysisVisitor<span class="token punctuation">)</span> <span class="token function">Visit</span><span class="token punctuation">(</span>customer Customer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> c <span class="token operator">:=</span> customer<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">*</span>EnterpriseCustomer<span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;analysis enterprise customer %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ExampleRequestVisitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c <span class="token operator">:=</span> <span class="token operator">&amp;</span>CustomerCol<span class="token punctuation">{</span><span class="token punctuation">}</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewEnterpriseCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;A company&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewEnterpriseCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;B company&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewIndividualCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ServiceRequestVisitor<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// Output:</span>
    <span class="token comment">// serving enterprise customer A company</span>
    <span class="token comment">// serving enterprise customer B company</span>
    <span class="token comment">// serving individual customer bob</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ExampleAnalysis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c <span class="token operator">:=</span> <span class="token operator">&amp;</span>CustomerCol<span class="token punctuation">{</span><span class="token punctuation">}</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewEnterpriseCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;A company&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewIndividualCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token function">NewEnterpriseCustomer</span><span class="token punctuation">(</span><span class="token string">&quot;B company&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>AnalysisVisitor<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// Output:</span>
    <span class="token comment">// analysis enterprise customer A company</span>
    <span class="token comment">// analysis enterprise customer B company</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式" aria-hidden="true">#</a> 中介者模式</h2><p>又叫调停模式，定义一个中介角色来封装一系列对象之间的交互，使原有对象之间的耦合松散，且可以 独立地改变它们之间的交互。</p><ul><li>抽象中介者（Mediator）角色：它是中介者的接口，提供了同事对象注册与转发同事对象信息的抽象方法。</li><li>具体中介者（ConcreteMediator）角色：实现中介者接口，定义一个 List 来管理同事对 象，协调各个同事角色之间的交互关系，因此它依赖于同事角色。</li><li>抽象同事类（Colleague）角色：定义同事类的接口，保存中介者对象，提供同事对象交互的抽 象方法，实现所有相互影响的同事类的公共功能。</li><li>具体同事类（Concrete Colleague）角色：是抽象同事类的实现者，当需要与其他同事对象交 互时，由中介者对象负责后续的交互。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> CDDriver <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Data <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CDDriver<span class="token punctuation">)</span> <span class="token function">ReadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>Data <span class="token operator">=</span> <span class="token string">&quot;music,image&quot;</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;CDDriver: reading data %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">changed</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CPU <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Video <span class="token builtin">string</span>
    Sound <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CPU<span class="token punctuation">)</span> <span class="token function">Process</span><span class="token punctuation">(</span>data <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sp <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span>
    c<span class="token punctuation">.</span>Sound <span class="token operator">=</span> sp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    c<span class="token punctuation">.</span>Video <span class="token operator">=</span> sp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;CPU: split data with Sound %s, Video %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Sound<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Video<span class="token punctuation">)</span>
    <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">changed</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> VideoCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Data <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>v <span class="token operator">*</span>VideoCard<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span>data <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    v<span class="token punctuation">.</span>Data <span class="token operator">=</span> data
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;VideoCard: display %s\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">changed</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> SoundCard <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Data <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SoundCard<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span>data <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span>Data <span class="token operator">=</span> data
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;SoundCard: play %s\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">changed</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Mediator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    CD    <span class="token operator">*</span>CDDriver
    CPU   <span class="token operator">*</span>CPU
    Video <span class="token operator">*</span>VideoCard
    Sound <span class="token operator">*</span>SoundCard
<span class="token punctuation">}</span>

<span class="token keyword">var</span> mediator <span class="token operator">*</span>Mediator

<span class="token keyword">func</span> <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Mediator <span class="token punctuation">{</span>
    <span class="token keyword">if</span> mediator <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        mediator <span class="token operator">=</span> <span class="token operator">&amp;</span>Mediator<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> mediator
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Mediator<span class="token punctuation">)</span> <span class="token function">changed</span><span class="token punctuation">(</span>i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> inst <span class="token operator">:=</span> i<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">*</span>CDDriver<span class="token punctuation">:</span>
        m<span class="token punctuation">.</span>CPU<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span>inst<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token operator">*</span>CPU<span class="token punctuation">:</span>
        m<span class="token punctuation">.</span>Sound<span class="token punctuation">.</span><span class="token function">Play</span><span class="token punctuation">(</span>inst<span class="token punctuation">.</span>Sound<span class="token punctuation">)</span>
        m<span class="token punctuation">.</span>Video<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span>inst<span class="token punctuation">.</span>Video<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestMediator</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mediator <span class="token operator">:=</span> <span class="token function">GetMediatorInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    mediator<span class="token punctuation">.</span>CD <span class="token operator">=</span> <span class="token operator">&amp;</span>CDDriver<span class="token punctuation">{</span><span class="token punctuation">}</span>
    mediator<span class="token punctuation">.</span>CPU <span class="token operator">=</span> <span class="token operator">&amp;</span>CPU<span class="token punctuation">{</span><span class="token punctuation">}</span>
    mediator<span class="token punctuation">.</span>Video <span class="token operator">=</span> <span class="token operator">&amp;</span>VideoCard<span class="token punctuation">{</span><span class="token punctuation">}</span>
    mediator<span class="token punctuation">.</span>Sound <span class="token operator">=</span> <span class="token operator">&amp;</span>SoundCard<span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//Tiggle</span>
    mediator<span class="token punctuation">.</span>CD<span class="token punctuation">.</span><span class="token function">ReadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> mediator<span class="token punctuation">.</span>CD<span class="token punctuation">.</span>Data <span class="token operator">!=</span> <span class="token string">&quot;music,image&quot;</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CD unexpect data %s&quot;</span><span class="token punctuation">,</span> mediator<span class="token punctuation">.</span>CD<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> mediator<span class="token punctuation">.</span>CPU<span class="token punctuation">.</span>Sound <span class="token operator">!=</span> <span class="token string">&quot;music&quot;</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CPU unexpect sound data %s&quot;</span><span class="token punctuation">,</span> mediator<span class="token punctuation">.</span>CPU<span class="token punctuation">.</span>Sound<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> mediator<span class="token punctuation">.</span>CPU<span class="token punctuation">.</span>Video <span class="token operator">!=</span> <span class="token string">&quot;image&quot;</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CPU unexpect video data %s&quot;</span><span class="token punctuation">,</span> mediator<span class="token punctuation">.</span>CPU<span class="token punctuation">.</span>Video<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> mediator<span class="token punctuation">.</span>Video<span class="token punctuation">.</span>Data <span class="token operator">!=</span> <span class="token string">&quot;image&quot;</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;VidoeCard unexpect data %s&quot;</span><span class="token punctuation">,</span> mediator<span class="token punctuation">.</span>Video<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> mediator<span class="token punctuation">.</span>Sound<span class="token punctuation">.</span>Data <span class="token operator">!=</span> <span class="token string">&quot;music&quot;</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;SoundCard unexpect data %s&quot;</span><span class="token punctuation">,</span> mediator<span class="token punctuation">.</span>Sound<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,71),o=[e];function c(i,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","04.behavior.html.vue"]]);export{k as default};
