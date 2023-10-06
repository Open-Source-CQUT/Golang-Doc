import{_ as n,V as e,W as a,Z as s}from"./framework-44a66fc7.js";const t={},o=s(`<h1 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> map</h1><p>在go中与其它语言不同的是，映射表的支持是由<code>map</code>关键字提供的，而非将其封装为标准库。映射表是一种使用场景非常多的数据结构，底层有着许多的实现方式，最常见的两种方式就是红黑树和哈希表，go采用的是哈希表实现方式。</p><h2 id="内部结构" tabindex="-1"><a class="header-anchor" href="#内部结构" aria-hidden="true">#</a> 内部结构</h2><p><code>runtime.hmap</code>结构体就是代表着go中的<code>map</code>，与切片一样<code>map</code>的内部实现也是结构体。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// A header for a Go map.</span>
<span class="token keyword">type</span> hmap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// Note: the format of the hmap is also encoded in cmd/compile/internal/reflectdata/reflect.go.</span>
	<span class="token comment">// Make sure this stays in sync with the compiler&#39;s definition.</span>
	count     <span class="token builtin">int</span> <span class="token comment">// # live cells == size of map.  Must be first (used by len() builtin)</span>
	flags     <span class="token builtin">uint8</span>
	B         <span class="token builtin">uint8</span>  <span class="token comment">// log_2 of # of buckets (can hold up to loadFactor * 2^B items)</span>
	noverflow <span class="token builtin">uint16</span> <span class="token comment">// approximate number of overflow buckets; see incrnoverflow for details</span>
	hash0     <span class="token builtin">uint32</span> <span class="token comment">// hash seed</span>

	buckets    unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// array of 2^B Buckets. may be nil if count==0.</span>
	oldbuckets unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// previous bucket array of half the size, non-nil only when growing</span>
	nevacuate  <span class="token builtin">uintptr</span>        <span class="token comment">// progress counter for evacuation (buckets less than this have been evacuated)</span>

	extra <span class="token operator">*</span>mapextra <span class="token comment">// optional fields</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>英文注释已经说明的很清晰了，下面对比较重要的字段进行一些简单的解释</p><ul><li><code>count</code>，表示hamp中的元素数量，结果等同于<code>len(map)</code>。</li><li><code>B</code>，表示hamp中哈希桶的数量，通常是<code>2^n</code>。</li><li><code>noverflow</code>，hmap中溢出桶的大致数量。</li><li><code>hash0</code>，哈希种子，在hmap被创建时指定，用于计算哈希值。</li><li><code>buckets</code>，存放哈希桶数组的指针。</li><li><code>oldbuckets</code>，存放hmap在扩容前哈希桶数组的指针。</li><li><code>extra</code>，存放着hmap中的溢出桶，溢出桶指的是就是当前桶已经满了，创建新的桶来存放元素，新创建的桶就是溢出桶。</li></ul><p>hamp中的<code>bucket</code>也就是桶，在go中对应的结构为<code>runtime.bmap</code>，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// A bucket for a Go map.</span>
<span class="token keyword">type</span> bmap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// tophash generally contains the top byte of the hash value</span>
	<span class="token comment">// for each key in this bucket. If tophash[0] &lt; minTopHash,</span>
	<span class="token comment">// tophash[0] is a bucket evacuation state instead.</span>
	tophash <span class="token punctuation">[</span>bucketCnt<span class="token punctuation">]</span><span class="token builtin">uint8</span>
	<span class="token comment">// Followed by bucketCnt keys and then bucketCnt elems.</span>
	<span class="token comment">// NOTE: packing all the keys together and then all the elems together makes the</span>
	<span class="token comment">// code a bit more complicated than alternating key/elem/key/elem/... but it allows</span>
	<span class="token comment">// us to eliminate padding which would be needed for, e.g., map[int64]int8.</span>
	<span class="token comment">// Followed by an overflow pointer.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看到它只有一个<code>tophash</code>的字段，该字段是用于存放每个键的高八位，不过实际上来说，<code>bmap</code>的字段不止这些，这是因为<code>map</code>可以存储各种类型的键值对，所以需要在编译时根据类型来推导占用的内存空间，在源代码<code>cmd/compile/internal/reflectdata/reflect.go</code>中，有着相关的介绍。所以实际上，<code>bmap</code>的结构如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> bmap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	tophash <span class="token punctuation">[</span>BUCKETSIZE<span class="token punctuation">]</span><span class="token builtin">uint8</span>
	keys <span class="token punctuation">[</span>BUCKETSIZE<span class="token punctuation">]</span>keyType
	elems <span class="token punctuation">[</span>BUCKETSIZE<span class="token punctuation">]</span>elemType
	overflow <span class="token operator">*</span>bucket
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过这些字段对我们是不可见的，其中的一些解释如下</p><ul><li><code>keys</code>，存放指定类型键的数组。</li><li><code>elems</code>，存放指定类型值的数组。</li><li><code>overflow</code>，指向溢出桶的指针。</li></ul><p>在<code>cmd/compile/internal/reflectdata/reflect.go</code>中的<code>MapBucketType</code>函数的功能就是创建bucket，它会进行一系列检查工作，比如key的类型是否<code>comparable</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// MapBucketType makes the map bucket type given the type of the map.</span>
<span class="token keyword">func</span> <span class="token function">MapBucketType</span><span class="token punctuation">(</span>t <span class="token operator">*</span>types<span class="token punctuation">.</span>Type<span class="token punctuation">)</span> <span class="token operator">*</span>types<span class="token punctuation">.</span>Type
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="哈希冲突" tabindex="-1"><a class="header-anchor" href="#哈希冲突" aria-hidden="true">#</a> 哈希冲突</h2><figure><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202310051941295.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当两个键通过计算哈希后被分配到了同一个bucket，这种情况就是发生了哈希冲突。go中解决哈希冲突的方式就是拉链法，当发生冲突的键的数量大于桶的容量后，就会创建一个新的桶来存放这些键，这个桶就叫溢出桶，原有的桶则会指向新的溢出桶。而在hmap中，有一个字段<code>extra</code>专门用来存放溢出桶的信息，它的结构如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> mapextra <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// 溢出桶的指针切片</span>
	overflow    <span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>bmap
    <span class="token comment">// 扩容前旧的溢出桶的指针切片</span>
	oldoverflow <span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>bmap
	<span class="token comment">// 指向下一个空闲的溢出桶的指针</span>
	nextOverflow <span class="token operator">*</span>bmap
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),c=[o];function i(l,p){return e(),a("div",null,c)}const u=n(t,[["render",i],["__file","map.html.vue"]]);export{u as default};
