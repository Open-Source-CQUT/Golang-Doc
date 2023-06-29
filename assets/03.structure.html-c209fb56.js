import{_ as n,V as s,W as a,Z as t}from"./framework-44a66fc7.js";const p={},c=t(`<h1 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式" aria-hidden="true">#</a> 结构型模式</h1><p>结构型模式描述如何将类或对象按某种布局组成更大的结构。它分为类结构型模式和对象结构型模式， 前者采用继承机制来组织接口和类，后者釆用组合或聚合来组合对象。 由于组合关系或聚合关系比继承关系耦合度低，满足“合成复用原则”，所以对象结构型模式比类结构型 模式具有更大的灵活性。</p><h2 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h2><p>由于某些原因需要给某对象提供一个代理以控制对该对象的访问。这时，访问对象不适合或者不能直接引用目标对象，代理对象作为访问对象和目标对象之间的中介。</p><ul><li><p>抽象主题（Subject）接口： 通过接口或抽象类声明真实主题和代理对象实现的业务方法。</p></li><li><p>真实主题（Real Subject）类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。</p></li><li><p>代理（Proxy）类 ：提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问，控制或扩展真实主题的功能。</p></li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象主题</span>
<span class="token keyword">type</span> Subject <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体主题</span>
<span class="token keyword">type</span> RealSubject <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r RealSubject<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;do something&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 代理</span>
<span class="token keyword">type</span> ProxySubject <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	sub Subject
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p ProxySubject<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;before&quot;</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>sub<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;after&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> ProxySubject <span class="token punctuation">{</span>
	<span class="token keyword">return</span> ProxySubject<span class="token punctuation">{</span>sub<span class="token punctuation">:</span> RealSubject<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestProxy</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	proxy <span class="token operator">:=</span> <span class="token function">NewProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	proxy<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述这种代理方式是静态代理，对Java有过了解的人可能会想着在Go中搞动态代理，但显然这是不可能的。要知道动态代理的核心是反射，Go确实支持反射，但不要忘了一点是Go是纯粹的静态编译型语言，而Java看似是一个编译型语言，但其实是一个动态的解释型语言，JDK动态代理就是在运行时生成字节码然后通过类加载器加载进JVM的，这对于Go来讲是完全不可能的事情。</p><h2 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h2><p>将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作。 适配器模式分为类适配器模式和对象适配器模式，前者类之间的耦合度比后者高，且要求程序员了解现有组件库中的相关组件的内部结构，所以应用相对较少些。</p><ul><li>目标（Target）接口：当前系统业务所期待的接口，它可以是抽象类或接口。</li><li>适配者（Adaptee）类：它是被访问和适配的现存组件库中的组件接口。</li><li>适配器（Adapter）类：它是一个转换器，通过继承或引用适配者的对象，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者。</li></ul><p>举个例子，现在有一个苹果手机，它只支持苹果充电器，但是手上只有一个安卓充电器，这时候需要一个适配器让安卓充电器也可以给苹果手机充电。</p><p>适配模式分类适配和对象适配，区别在于前者在适配原有组件时使用的是继承，而后者是组合，通常建议用后者。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 苹果充电器</span>
<span class="token keyword">type</span> IphoneCharge <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">IosCharge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 安卓充电器</span>
<span class="token keyword">type</span> AndroidCharge <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 安卓可以Type-c充电</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a AndroidCharge<span class="token punctuation">)</span> <span class="token function">TypeCCharge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;type-c charge&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 适配器</span>
<span class="token keyword">type</span> Adapter <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	android AndroidCharge
<span class="token punctuation">}</span>

<span class="token comment">// 适配器组合了安卓充电器,又实现了苹果充电器的接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Adapter<span class="token punctuation">)</span> <span class="token function">IosCharge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>android<span class="token punctuation">.</span><span class="token function">TypeCCharge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;type-c to ios charge&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;iphone charge&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestAdapter</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> ios IphoneCharge
	ios <span class="token operator">=</span> <span class="token operator">&amp;</span>Adapter<span class="token punctuation">{</span>AndroidCharge<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ios<span class="token punctuation">.</span><span class="token function">IosCharge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="装饰模式" tabindex="-1"><a class="header-anchor" href="#装饰模式" aria-hidden="true">#</a> 装饰模式</h2><p>装饰模式又名包装(Wrapper)模式。装饰模式以对客户端透明的方式扩展对象的功能，是继承关系的一个替代方案。</p><ul><li>抽象构件（Component）角色 ：定义一个抽象接口以规范准备接收附加责任的对象。</li><li>具体构件（Concrete Component）角色：实现抽象构件，通过装饰角色为其添加一些职责。</li><li>抽象装饰（Decorator）角色 ：继承或实现抽象构件，并包含具体构件的实例，可以通过其子类扩展具体构件的功能。</li><li>具体装饰（ConcreteDecorator）角色 ：实现抽象装饰的相关方法，并给具体构件对象添加附加的责任。</li></ul><p>在Go语言中可以通过实现或者匿名组合可以很轻易的实现装饰者模式，装饰者模式又分为全透明和半透明，区别在于是否改变被装饰接口的定义。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 汽车接口</span>
<span class="token keyword">type</span> Car <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 卡车</span>
<span class="token keyword">type</span> Truck <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Truck<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Truck can run&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//会飞的卡车</span>
<span class="token keyword">type</span> CarCanFlyDecorator <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   Car
<span class="token punctuation">}</span>

<span class="token keyword">type</span> TruckDecorator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   car Car
<span class="token punctuation">}</span>

<span class="token comment">// 对原有方法进行增强，没有改变定义</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>t TruckDecorator<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;truck can fly&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Test</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> car Car
   car <span class="token operator">=</span> Truck<span class="token punctuation">{</span><span class="token punctuation">}</span>
   car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   car <span class="token operator">=</span> TruckDecorator<span class="token punctuation">{</span>car<span class="token punctuation">}</span>
   car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是全透明的装饰模式</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Car <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Truck <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Truck<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Truck can run&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 修改了接口定义</span>
<span class="token keyword">type</span> CarCanFlyDecorator <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   Car
   <span class="token function">Fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> TruckDecorator <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   car Car
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t TruckDecorator<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   t<span class="token punctuation">.</span>car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t TruckDecorator<span class="token punctuation">)</span> <span class="token function">Fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;truck can fly&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Test</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> car Car
   car <span class="token operator">=</span> Truck<span class="token punctuation">{</span><span class="token punctuation">}</span>
   car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">var</span> flyCar CarCanFlyDecorator
   flyCar <span class="token operator">=</span> TruckDecorator<span class="token punctuation">{</span>car<span class="token punctuation">}</span>
   flyCar<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   flyCar<span class="token punctuation">.</span><span class="token function">Fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是半透明装饰模式，半透明的装饰模式是介于装饰模式和适配器模式之间的。适配器模式的用意是改变所考虑的类的接口，也可以通过改写一个或几个方法，或增加新的方法来增强或改变所考虑的类的功能。大多数的装饰模式实际上是半透明的装饰模式，这样的装饰模式也称做半装饰、半适配器模式。</p><p><strong>代理模式和透明装饰者模式的区别</strong>：</p><p><strong>相同点</strong>：</p><ul><li>都要实现与目标类相同的业务接口</li><li>都要声明目标对象为成员变量</li><li>都可以在不修改目标类的前提下增强目标方法</li></ul><p><strong>不同点</strong>：</p><ul><li>目的不同装饰者是为了增强目标对象静态代理是为了保护和隐藏目标对象</li><li>获取目标对象构建的地方不同装饰者是由外界传递进来，可以通过构造方法传递静态代理是在代理类内部创建，以此来隐藏目标对象</li></ul><h2 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式" aria-hidden="true">#</a> 外观模式</h2><p>又名门面模式，是一种通过为多个复杂的子系统提供一个一致的接口，而使这些子系统更加容易被访问的模式。该模式对外有一个统一接口，外部应用程序不用关心内部子系统的具体的细节，这样会大大降低应用程序的复杂度，提高了程序的可维护性，是迪米特法则的典型应用。</p><ul><li>外观（Facade）角色：为多个子系统对外提供一个共同的接口。</li><li>子系统（Sub System）角色：实现系统的部分功能，客户可以通过外观角色访问它。</li></ul><p>例子：以前到家需要自己手动开电视，开空调，现在有了智能控制器，可以直接控制电视和空调，不再需要手动操作</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 电视</span>
<span class="token keyword">type</span> Tv <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Tv<span class="token punctuation">)</span> <span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;电视打开了&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t Tv<span class="token punctuation">)</span> <span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;电视关闭了&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 风扇</span>
<span class="token keyword">type</span> Fan <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Fan<span class="token punctuation">)</span> <span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;风扇打开了&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Fan<span class="token punctuation">)</span> <span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;风扇关闭了&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 智能遥控器</span>
<span class="token keyword">type</span> Facade <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   tv  Tv
   fan Fan
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewFacade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Facade <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>Facade<span class="token punctuation">{</span>tv<span class="token punctuation">:</span> Tv<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> fan<span class="token punctuation">:</span> Fan<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Facade<span class="token punctuation">)</span> <span class="token function">TurnOnTv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   f<span class="token punctuation">.</span>tv<span class="token punctuation">.</span><span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Facade<span class="token punctuation">)</span> <span class="token function">TurnOnFan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   f<span class="token punctuation">.</span>fan<span class="token punctuation">.</span><span class="token function">TurnOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Facade<span class="token punctuation">)</span> <span class="token function">TurnOffTv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   f<span class="token punctuation">.</span>tv<span class="token punctuation">.</span><span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Facade<span class="token punctuation">)</span> <span class="token function">TurnOffFan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   f<span class="token punctuation">.</span>fan<span class="token punctuation">.</span><span class="token function">TurnOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestFacade</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   facade <span class="token operator">:=</span> <span class="token function">NewFacade</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   facade<span class="token punctuation">.</span><span class="token function">TurnOnTv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   facade<span class="token punctuation">.</span><span class="token function">TurnOnFan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   facade<span class="token punctuation">.</span><span class="token function">TurnOffTv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   facade<span class="token punctuation">.</span><span class="token function">TurnOffFan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点</strong>：</p><p>降低了子系统与客户端之间的耦合度，使得子系统的变化不会影响调用它的客户类。</p><p>对客户屏蔽了子系统组件，减少了客户处理的对象数目，并使得子系统使用起来更加容易。</p><p><strong>缺点</strong>：</p><p>不符合开闭原则，修改很麻烦</p><h2 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h2><p>将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现，从而降低了抽象和实现这两个可变维度的耦合度。</p><p>例子：需要开发一个跨平台视频播放器，可以在不同操作系统平台（如Windows、Mac、Linux等）上播放多种格式的视频文件，常见的视频格式包括RMVB、AVI等。该播放器包含了两个维度，适合使用桥接模式。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 视频文件接口</span>
<span class="token keyword">type</span> VideoFile <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> AVI <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a AVI<span class="token punctuation">)</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token string">&quot;AVI&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> RMVB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>R RMVB<span class="token punctuation">)</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token string">&quot;RMVB&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 操作系统</span>
<span class="token keyword">type</span> OS <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   videoFile VideoFile
<span class="token punctuation">}</span>

<span class="token comment">// 播放文件</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o OS<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;overwrite me!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Windows <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   OS
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w Windows<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;windows&quot;</span> <span class="token operator">+</span> w<span class="token punctuation">.</span>OS<span class="token punctuation">.</span>videoFile<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Mac <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   OS
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m Mac<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;mac&quot;</span> <span class="token operator">+</span> m<span class="token punctuation">.</span>OS<span class="token punctuation">.</span>videoFile<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Linux <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   OS
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l Linux<span class="token punctuation">)</span> <span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;linux&quot;</span> <span class="token operator">+</span> l<span class="token punctuation">.</span>OS<span class="token punctuation">.</span>videoFile<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestBridge</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   os <span class="token operator">:=</span> Windows<span class="token punctuation">{</span>OS<span class="token punctuation">{</span>videoFile<span class="token punctuation">:</span> AVI<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
   os<span class="token punctuation">.</span><span class="token function">Play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>桥接模式提高了系统的可扩充性，在两个变化维度中任意扩展一个维度，都不需要修改原有系统。</p><h2 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h2><p>又名部分整体模式，是用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次。这种类型的设计模式属于结构型模式，它创建了对象组的树形结构。</p><ul><li>抽象根节点（Component）：定义系统各层次对象的共有方法和属性，可以预先定义一些默认行为和属性。</li><li>树枝节点（Composite）：定义树枝节点的行为，存储子节点，组合树枝节点和叶子节点形成一个树形结构。</li><li>叶子节点（Leaf）：叶子节点对象，其下再无分支，是系统层次遍历的最小单位。</li></ul><p>抽象根节点定义默认行为和属性，子类根据需求去选择实现和不实现哪些操作，虽然违背了接口隔离原则，但是在一定情况下非常适用。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象根节点</span>
<span class="token keyword">type</span> Component <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Add</span><span class="token punctuation">(</span>Component<span class="token punctuation">)</span>
   <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token function">Remove</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 树枝节点</span>
<span class="token keyword">type</span> Composite <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   leafs <span class="token punctuation">[</span><span class="token punctuation">]</span>Component
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Composite<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>component Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>leafs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>leafs<span class="token punctuation">,</span> component<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Composite<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> leaf <span class="token operator">:=</span> <span class="token keyword">range</span> c<span class="token punctuation">.</span>leafs <span class="token punctuation">{</span>
      leaf<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Composite<span class="token punctuation">)</span> <span class="token function">Remove</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   c<span class="token punctuation">.</span>leafs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>leafs<span class="token punctuation">[</span><span class="token punctuation">:</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>leafs<span class="token punctuation">[</span>index<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewComposite</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Component <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>Composite<span class="token punctuation">{</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Component<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 叶子节点</span>
<span class="token keyword">type</span> Leaf <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 不支持的操作，无意义调用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l Leaf<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>component Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;Unsupported&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l Leaf<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l Leaf<span class="token punctuation">)</span> <span class="token function">Remove</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;Unsupported&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestComposite</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   composite <span class="token operator">:=</span> <span class="token function">NewComposite</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Leaf<span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Leaf<span class="token punctuation">{</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Leaf<span class="token punctuation">{</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Leaf<span class="token punctuation">{</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   newComposite <span class="token operator">:=</span> <span class="token function">NewComposite</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   newComposite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Leaf<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>newComposite<span class="token punctuation">)</span>
   composite<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组合模式分为透明组合模式和安全组合模式，区别在于，树枝节点与叶子节点在接口的表现上是否一致，前者是完全一致，但是需要额外的处理避免无意义的调用，而后者虽然避免了无意义的调用，但是对于客户端来说不够透明，叶子节点与树枝节点具有不同的方法，以至于不能很好的抽象。</p><h2 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h2><p>运用共享技术来有效地支持大量细粒度对象的复用。它通过共享已经存在的对象来大幅度减少需要创建的对象数量、避免大量相似对象的开销，从而提高系统资源的利用率。</p><p>享元（Flyweight ）模式中存在以下两种状态：</p><p>1.内部状态，即不会随着环境的改变而改变的可共享部分。</p><p>2.外部状态，指随环境改变而改变的不可以共享的部分。享元模式的实现要领就是区分应用中的这两种状态，并将外部状态外部化。</p><ul><li>抽象享元角色（Flyweight）：通常是一个接口或抽象类，在抽象享元类中声明了具体享元类公共的方法，这些方法可以向外界提供享元对象的内部数据（内部状态），同时也可以通过这些方法来设置外部数据（外部状态）。</li><li>具体享元（Concrete Flyweight）角色 ：它实现了抽象享元类，称为享元对象；在具体享元类中为内部状态提供了存储空间。通常我们可以结合单例模式来设计具体享元类，为每一个具体享元类提供唯一的享元对象。</li><li>非享元（Unsharable Flyweight)角色 ：并不是所有的抽象享元类的子类都需要被共享，不能被共享的子类可设计为非共享具体享元类；当需要一个非共享具体享元类的对象时可以直接通过实例化创建。</li><li>享元工厂（Flyweight Factory）角色 ：负责创建和管理享元角色。当客户对象请求一个享元对象时，享元工厂检査系统中是否存在符合要求的享元对象，如果存在则提供给客户；如果不存在的话，则创建一个新的享元对象。</li></ul><p>众所周知的俄罗斯方块中的一个个方块，如果在俄罗斯方块这个游戏中，每个不同的方块都是一个实例对象，这些对象就要占用很多的内存空间，下面利用享元模式进行实现。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 抽象盒子</span>
<span class="token keyword">type</span> AbstractBox <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Shape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
   <span class="token function">Display</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 具体盒子</span>
<span class="token keyword">type</span> Box <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   shape <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b Box<span class="token punctuation">)</span> <span class="token function">Shape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> b<span class="token punctuation">.</span>shape
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b Box<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span>color <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>shape <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> color<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 盒子工厂</span>
<span class="token keyword">type</span> BoxFactory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   maps <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>AbstractBox
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewBoxFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>BoxFactory <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>BoxFactory<span class="token punctuation">{</span>maps<span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>AbstractBox<span class="token punctuation">{</span><span class="token string">&quot;I&quot;</span><span class="token punctuation">:</span> Box<span class="token punctuation">{</span><span class="token string">&quot;I&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;L&quot;</span><span class="token punctuation">:</span> Box<span class="token punctuation">{</span><span class="token string">&quot;L&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;O&quot;</span><span class="token punctuation">:</span> Box<span class="token punctuation">{</span><span class="token string">&quot;O&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f BoxFactory<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> AbstractBox <span class="token punctuation">{</span>
   <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> f<span class="token punctuation">.</span>maps<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
   <span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
      f<span class="token punctuation">.</span>maps<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> Box<span class="token punctuation">{</span>name<span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> f<span class="token punctuation">.</span>maps<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestBox</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   boxFactory <span class="token operator">:=</span> <span class="token function">NewBoxFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   boxFactory<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;I&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用享元模式时需要维护一个存储享元对象的享元池，而这需要耗费一定的系统资源，因此，应当在需要多次重复使用享元对象时才值得使用享元模式。</p><p><strong>优点</strong>：</p><p>极大减少内存中相似或相同对象数量，节约系统资源，提供系统性能，享元模式中的外部状态相对独立，且不影响内部状态</p><p><strong>缺点</strong>：</p><p>为了使对象可以共享，需要将享元对象的部分状态外部化，分离内部状态和外部状态，使程序逻辑复杂</p>`,60),e=[c];function o(i,u){return s(),a("div",null,e)}const k=n(p,[["render",o],["__file","03.structure.html.vue"]]);export{k as default};
