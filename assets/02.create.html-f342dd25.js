import{_ as n,V as s,W as a,Z as t}from"./framework-44a66fc7.js";const p={},e=t(`<h1 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式" aria-hidden="true">#</a> 创建型模式</h1><p>创建型模式的主要关注点是“怎样创建对象？”，它的主要特点是“将对象的创建与使用分离”。 这样可以降低系统的耦合度，使用者不需要关注对象的创建细节。</p><h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h2><p>这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。</p><p>在Go中是没有构造函数的说法，一般会定义<code>Newxxxx</code>函数来初始化相关的结构体或接口，而通过<code>Newxxx</code>函数来初始化返回接口时就是简单工厂模式，一般对于Go而言，最推荐的做法就是简单工厂。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Creature 生物接口</span>
<span class="token keyword">type</span> Creature <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Human 实现了生物接口</span>
<span class="token keyword">type</span> Human <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>h Human<span class="token punctuation">)</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token comment">// Animal 实现了生物接口</span>
<span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a Animal<span class="token punctuation">)</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token comment">// 这就是简单工厂</span>
<span class="token keyword">func</span> <span class="token function">NewCreature</span><span class="token punctuation">(</span>types <span class="token builtin">string</span><span class="token punctuation">)</span> Creature <span class="token punctuation">{</span>
   <span class="token comment">// 创建逻辑</span>
   <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>types<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">&amp;</span>Human<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>Animal<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于Go而言，工厂模式显得不那么重要，因为Go并不像Java万物都需要<code>new</code>出来，也并不需要一个专门的接口或者结构体来统一管理创建对象，并且Go的调用是基于包而不是结构体或者接口。</p><p><strong>优点</strong>：封装了创建的逻辑</p><p><strong>缺点</strong>：每新增一个生物的实现，就要修改一次创建逻辑</p><h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h2><p>工厂方法的区别在于，简单工厂是直接创建对象并返回，而工厂模式只定义一个接口，将创建的逻辑交给其子类来实现，即将创建的逻辑延迟到子类。</p><ul><li>抽象工厂（Abstract Factory）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。</li><li>具体工厂（ConcreteFactory）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。</li><li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能。</li><li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// Creature 抽象生物接口</span>
<span class="token keyword">type</span> Creature <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Human 实现了生物接口</span>
<span class="token keyword">type</span> Human <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>h Human<span class="token punctuation">)</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;人类在跑&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Animal 实现了生物接口</span>
<span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a Animal<span class="token punctuation">)</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;动物在跑&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 生物抽象工厂</span>
<span class="token keyword">type</span> CreatureFactory <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">creature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Creature
<span class="token punctuation">}</span>

<span class="token comment">// 实现生物工厂的人类具体工厂</span>
<span class="token keyword">type</span> HumanFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>


<span class="token keyword">func</span> <span class="token punctuation">(</span>h HumanFactory<span class="token punctuation">)</span> <span class="token function">creature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Creature <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Human<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现生物工厂的动物具体工厂</span>
<span class="token keyword">type</span> AnimalFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AnimalFactory<span class="token punctuation">)</span> <span class="token function">creature</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Creature <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Animal<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestFactory</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> factory CreatureFactory
	factory <span class="token operator">=</span> HumanFactory<span class="token punctuation">{</span><span class="token punctuation">}</span>
	factory<span class="token punctuation">.</span><span class="token function">creature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	factory <span class="token operator">=</span> AnimalFactory<span class="token punctuation">{</span><span class="token punctuation">}</span>
	factory<span class="token punctuation">.</span><span class="token function">creature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>人类在跑
动物在跑
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点</strong>：封装了创建逻辑，将创建逻辑延迟到子类</p><p><strong>缺点</strong>：新增一个生物实现时不需要再修改原有的逻辑，但需要新增一个对应的工厂实现。</p><h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h2><p>抽象工厂模式是工厂方法模式的升级版本，工厂方法模式只生产一个等级的产品，而抽象工厂模式可生产多个等级的产品。</p><ul><li>抽象工厂（Abstract Factory）：提供了创建产品的接口，它包含多个创建产品的方法，可以创建多个不同等级的产品。</li><li>具体工厂（Concrete Factory）：主要是实现抽象工厂中的多个抽象方法，完成具体产品的创建。</li><li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品。</li><li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间是多对一的关系。</li></ul><p>接下来创建一个职业接口，有工匠和士兵两个职业，人分为亚洲人，欧洲人。倘若继续使用工厂方法模式，就需要给人创建一个抽象工厂，再分别创建两个人种创建具体工厂，职业也是类似，一个工厂只能创建同一类的实体，这样做会导致代码量大幅度增加。抽象工厂就是为了解决这个问题而生的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 工人</span>
<span class="token keyword">type</span> Worker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 亚洲工人</span>
<span class="token keyword">type</span> AsianWorker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AsianWorker<span class="token punctuation">)</span> <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Asian worker  work&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 欧洲工人</span>
<span class="token keyword">type</span> EuropeanWorker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e EuropeanWorker<span class="token punctuation">)</span> <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;European worker  work&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 士兵</span>
<span class="token keyword">type</span> Solder <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 亚洲士兵</span>
<span class="token keyword">type</span> AsianSolder <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AsianSolder<span class="token punctuation">)</span> <span class="token function">Attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;AsianSolder attack&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 欧洲士兵</span>
<span class="token keyword">type</span> EuropeanSolder <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e EuropeanSolder<span class="token punctuation">)</span> <span class="token function">Attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;EuropeanSolder attack&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 人类抽象工厂</span>
<span class="token keyword">type</span> HumansFactory <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">CreateWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Worker
   <span class="token function">CreateSolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Solder
<span class="token punctuation">}</span>

<span class="token comment">// 亚洲工厂</span>
<span class="token keyword">type</span> AsiansFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AsiansFactory<span class="token punctuation">)</span> <span class="token function">CreateWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Worker <span class="token punctuation">{</span>
   <span class="token keyword">return</span> AsianWorker<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a AsiansFactory<span class="token punctuation">)</span> <span class="token function">CreateSolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Solder <span class="token punctuation">{</span>
   <span class="token keyword">return</span> AsianSolder<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 欧洲工厂</span>
<span class="token keyword">type</span> EuropeanFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e EuropeanFactory<span class="token punctuation">)</span> <span class="token function">CreateWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Worker <span class="token punctuation">{</span>
   <span class="token keyword">return</span> EuropeanWorker<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>e EuropeanFactory<span class="token punctuation">)</span> <span class="token function">CreateSolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Solder <span class="token punctuation">{</span>
   <span class="token keyword">return</span> EuropeanSolder<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点</strong>：当更换一套适用的规则时，例如将全部亚洲人换成欧洲人，可以做到无缝更换，只需要换一个工厂即可，不会有任何影响。</p><p><strong>缺点</strong>：当内部出现变化的话，几乎所有工厂都要做出对应的变化，例如新增一个人种或新增一个职业。</p><h2 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h2><p>建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。</p><p>抽象建造者类（Builder）：这个接口规定要实现复杂对象的那些部分的创建，并不涉及具体的部件对象的创建。</p><p>具体建造者类（ConcreteBuilder）：实现Builder接口，完成复杂产品的各个部件的具体创建方法。在构造过程完成后，提供产品的实例。</p><p>产品类（Product）：要创建的复杂对象。</p><p>指挥者类（Director）：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象各部分完整创建或按某种顺序创建。</p><p>下面以造汽车为例子，汽车需要安装引擎，轮胎，地盘，车架。需要一个汽车建造者接口，和两个实现，分别是卡车建造者和公交车建造者，最后是一个指挥者。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Car <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   engine  <span class="token builtin">string</span>
   wheel   <span class="token builtin">string</span>
   chassis <span class="token builtin">string</span>
   frame   <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Car<span class="token punctuation">)</span> <span class="token function">SetEngine</span><span class="token punctuation">(</span>engine <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Car<span class="token punctuation">)</span> <span class="token function">SetWheel</span><span class="token punctuation">(</span>wheel <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>wheel <span class="token operator">=</span> wheel
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Car<span class="token punctuation">)</span> <span class="token function">SetChassis</span><span class="token punctuation">(</span>chassis <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>chassis <span class="token operator">=</span> chassis
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Car<span class="token punctuation">)</span> <span class="token function">SetFrame</span><span class="token punctuation">(</span>frame <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>frame <span class="token operator">=</span> frame
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Car<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%s %s %s %s&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>engine<span class="token punctuation">,</span> c<span class="token punctuation">.</span>wheel<span class="token punctuation">,</span> c<span class="token punctuation">.</span>chassis<span class="token punctuation">,</span> c<span class="token punctuation">.</span>frame<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 汽车建造者</span>
<span class="token keyword">type</span> CarBuilder <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">BuildEngine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">BuildWheel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">BuildChassis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">BuildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Car
<span class="token punctuation">}</span>

<span class="token comment">//指挥者</span>
<span class="token keyword">type</span> CarDirector <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   builder <span class="token operator">*</span>CarBuilder
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewCarDirector</span><span class="token punctuation">(</span>builder CarBuilder<span class="token punctuation">)</span> <span class="token operator">*</span>CarDirector <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>CarDirector<span class="token punctuation">{</span>builder<span class="token punctuation">:</span> <span class="token operator">&amp;</span>builder<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>CarDirector<span class="token punctuation">)</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Car <span class="token punctuation">{</span>
   <span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">.</span>builder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BuildEngine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">.</span>builder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BuildWheel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">.</span>builder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BuildChassis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">.</span>builder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BuildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">*</span>d<span class="token punctuation">.</span>builder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 卡车建造者</span>
<span class="token keyword">type</span> TruckBuilder <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   truck <span class="token operator">*</span>Car
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewTruckBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>TruckBuilder <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>TruckBuilder<span class="token punctuation">{</span>truck<span class="token punctuation">:</span> <span class="token operator">&amp;</span>Car<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>TruckBuilder<span class="token punctuation">)</span> <span class="token function">BuildEngine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>truck<span class="token punctuation">.</span><span class="token function">SetEngine</span><span class="token punctuation">(</span><span class="token string">&quot;卡车引擎&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>TruckBuilder<span class="token punctuation">)</span> <span class="token function">BuildWheel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>truck<span class="token punctuation">.</span><span class="token function">SetWheel</span><span class="token punctuation">(</span><span class="token string">&quot;卡车轮胎&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>TruckBuilder<span class="token punctuation">)</span> <span class="token function">BuildChassis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>truck<span class="token punctuation">.</span><span class="token function">SetChassis</span><span class="token punctuation">(</span><span class="token string">&quot;卡车底盘&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>TruckBuilder<span class="token punctuation">)</span> <span class="token function">BuildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>truck<span class="token punctuation">.</span><span class="token function">SetFrame</span><span class="token punctuation">(</span><span class="token string">&quot;卡车车架&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>TruckBuilder<span class="token punctuation">)</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Car <span class="token punctuation">{</span>
   <span class="token keyword">return</span> t<span class="token punctuation">.</span>truck
<span class="token punctuation">}</span>

<span class="token comment">// 公交车建造者</span>
<span class="token keyword">type</span> BusBuilder <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   bus <span class="token operator">*</span>Car
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewBusBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>BusBuilder <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>BusBuilder<span class="token punctuation">{</span>bus<span class="token punctuation">:</span> <span class="token operator">&amp;</span>Car<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>BusBuilder<span class="token punctuation">)</span> <span class="token function">BuildEngine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   b<span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">SetEngine</span><span class="token punctuation">(</span><span class="token string">&quot;巴士引擎&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>BusBuilder<span class="token punctuation">)</span> <span class="token function">BuildWheel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   b<span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">SetWheel</span><span class="token punctuation">(</span><span class="token string">&quot;巴士轮胎&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>BusBuilder<span class="token punctuation">)</span> <span class="token function">BuildChassis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   b<span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">SetChassis</span><span class="token punctuation">(</span><span class="token string">&quot;巴士底盘&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>BusBuilder<span class="token punctuation">)</span> <span class="token function">BuildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   b<span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">SetFrame</span><span class="token punctuation">(</span><span class="token string">&quot;巴士车架&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>BusBuilder<span class="token punctuation">)</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Car <span class="token punctuation">{</span>
   <span class="token keyword">return</span> b<span class="token punctuation">.</span>bus
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestBuilder</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   director <span class="token operator">:=</span> <span class="token function">NewCarDirector</span><span class="token punctuation">(</span><span class="token function">NewTruckBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>director<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   director <span class="token operator">=</span> <span class="token function">NewCarDirector</span><span class="token punctuation">(</span><span class="token function">NewBusBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>director<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>卡车引擎 卡车轮胎 卡车底盘 卡车车架
巴士引擎 巴士轮胎 巴士底盘 巴士车架
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一般建造者模式在部件构建顺序和次序不太复杂的时候，都会选择将指挥者嵌入建造者中，本例选择分离了出来，比较符合单一职责原则，并且可以修改一下逻辑，改为链式调用会更好些。</p><p><strong>优点</strong>：建造者模式的封装性很好。使用建造者模式可以有效的封装变化，在使用建造者模式的场景中，一般产品类和建造者类是比较稳定的，因此，将主要的业务逻辑封装在指挥者类中对整体而言可以取得比较好的稳定性。</p><p><strong>缺点</strong>：造者模式所创建的产品一般具有较多的共同点，其组成部分相似，如果产品之间的差异性很大，则不适合使用建造者模式，因此其使用范围受到一定的限制。</p><h2 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h2><p>用一个已经创建的实例作为原型，通过复制该原型对象来创建一个和原型对象相同的新对象。</p><p>抽象原型类：规定了具体原型对象必须实现的的 clone() 方法。</p><p>具体原型类：实现抽象原型类的 clone() 方法，它是可被复制的对象。</p><p>访问类：使用具体原型类中的 clone() 方法来复制新的对象。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Cloneable <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Cloneable
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Cloneable <span class="token punctuation">{</span>
   <span class="token keyword">return</span> Person<span class="token punctuation">{</span>p<span class="token punctuation">.</span>name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestClone</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   person <span class="token operator">:=</span> Person<span class="token punctuation">{</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">}</span>
   person1 <span class="token operator">:=</span> person<span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span>Person<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>person1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在Go中深克隆一个对象并不属于设计模式的范畴</p></div><h2 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h2><p>这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Singleton <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> singleton <span class="token operator">*</span>Singleton

<span class="token keyword">var</span> once sync<span class="token punctuation">.</span>Once

<span class="token comment">// 懒汉方式 双重检查锁 线程安全</span>
<span class="token keyword">func</span> <span class="token function">Instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Singleton <span class="token punctuation">{</span>
   once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      singleton <span class="token operator">=</span> <span class="token operator">&amp;</span>Singleton<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token keyword">return</span> singleton
<span class="token punctuation">}</span>

<span class="token comment">// 饿汉方式 init加载</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   singleton <span class="token operator">=</span> <span class="token operator">&amp;</span>Singleton<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>懒汉方式是延迟加载，即被访问时才加载，饿汉方式是当包加载时该单例就被加载。</p>`,48),c=[e];function o(i,u){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","02.create.html.vue"]]);export{r as default};
