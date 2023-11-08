import{_ as n,V as s,W as a,a0 as t}from"./framework-f06be456.js";const e={},p=t(`<h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h1><p>Mysql是当下最流行的开源关系型数据库，具体的sql知识这里不会做过多的赘述，只是简单讲解如何利用go进行sql操作。如果是在项目中的话一般不会直接使用驱动来进行数据库操作，而是会使用ORM框架。</p><h2 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>go get github<span class="token punctuation">.</span>com/go-sql-driver/mysql 
go get github<span class="token punctuation">.</span>com/jmoiron/sqlx 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>db<span class="token punctuation">,</span>err <span class="token operator">:=</span> sqlx<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;数据库类型&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;用户名:密码@tcp(地址:端口)/数据库名&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据" tabindex="-1"><a class="header-anchor" href="#数据" aria-hidden="true">#</a> 数据</h2><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS \`user\`;
CREATE TABLE \`user\`  (
  \`id\` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  \`age\` tinyint(0) NULL DEFAULT NULL,
  \`address\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO \`user\` VALUES (&#39;12132&#39;, &#39;张三&#39;, 35, &#39;北京市&#39;);
INSERT INTO \`user\` VALUES (&#39;16162&#39;, &#39;王五&#39;, 22, &#39;上海市&#39;);

SET FOREIGN_KEY_CHECKS = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   UserId <span class="token builtin">string</span> <span class="token string">\`db:&quot;id&quot;\`</span>
   Username <span class="token builtin">string</span> <span class="token string">\`db:&quot;name&quot;\`</span>
   Age <span class="token builtin">int</span> <span class="token string">\`db:&quot;age&quot;\`</span>
   Address <span class="token builtin">string</span> <span class="token string">\`db:&quot;address&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> db <span class="token operator">*</span>sqlx<span class="token punctuation">.</span>DB

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   UserId   <span class="token builtin">string</span> <span class="token string">\`db:&quot;id&quot;\`</span>
   Username <span class="token builtin">string</span> <span class="token string">\`db:&quot;name&quot;\`</span>
   Age      <span class="token builtin">int</span>    <span class="token string">\`db:&quot;age&quot;\`</span>
   Address  <span class="token builtin">string</span> <span class="token string">\`db:&quot;address&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> sqlx<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root:wyh246859@tcp(127.0.0.1)/test&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Open mysql failed&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>

   db <span class="token operator">=</span> conn
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> person Person
   <span class="token comment">//查询一个是Get，多个是Select</span>
   err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>person<span class="token punctuation">,</span> <span class="token string">&quot;select * from user where id = ?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;12132&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;query failed:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;query succ:%+v&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> perons <span class="token punctuation">[</span><span class="token punctuation">]</span>Person
	err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>perons<span class="token punctuation">,</span> <span class="token string">&quot;select * from user&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;list err&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;list succ,%+v&quot;</span><span class="token punctuation">,</span> perons<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新增" tabindex="-1"><a class="header-anchor" href="#新增" aria-hidden="true">#</a> 新增</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   result<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token string">&quot;insert into user value (?,?,?,?)&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;120230&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">&quot;广州市&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;insert err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   id<span class="token punctuation">,</span> err <span class="token operator">:=</span> result<span class="token punctuation">.</span><span class="token function">LastInsertId</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;insert err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;insert succ:&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新" tabindex="-1"><a class="header-anchor" href="#更新" aria-hidden="true">#</a> 更新</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   res<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token string">&quot;update user set name = ? where id = ?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;赵六&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;120230&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;update err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   eff<span class="token punctuation">,</span> err <span class="token operator">:=</span> res<span class="token punctuation">.</span><span class="token function">RowsAffected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">||</span> eff <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;update err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Update succ&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   res<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token string">&quot;delete from user where id = ?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;120230&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;delete err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   eff<span class="token punctuation">,</span> err <span class="token operator">:=</span> res<span class="token punctuation">.</span><span class="token function">RowsAffected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">||</span> eff <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;delete err:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;delete succ&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>db <span class="token operator">*</span>DB<span class="token punctuation">)</span> <span class="token function">Begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Tx<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token comment">//开始一个事务</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tx <span class="token operator">*</span>Tx<span class="token punctuation">)</span> <span class="token function">Commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token comment">//提交一个事务</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>tx <span class="token operator">*</span>Tx<span class="token punctuation">)</span> <span class="token function">Rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token comment">//回滚一个事务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	transation<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;transation err&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 	transation<span class="token punctuation">.</span><span class="token function">Commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;transation err&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			transation<span class="token punctuation">.</span><span class="token function">Rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;数据库链接关闭&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","Mysql.html.vue"]]);export{r as default};
