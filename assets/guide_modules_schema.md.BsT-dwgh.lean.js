import{_ as i,c as a,a0 as h,o as k}from"./chunks/framework.D5XSuxOt.js";const y=JSON.parse('{"title":"配置检测","description":"","frontmatter":{},"headers":[],"relativePath":"guide/modules/schema.md","filePath":"guide/modules/schema.md","lastUpdated":1724729588000}'),n={name:"guide/modules/schema.md"};function t(l,s,p,e,r,d){return k(),a("div",null,s[0]||(s[0]=[h(`<h1 id="配置检测" tabindex="-1">配置检测 <a class="header-anchor" href="#配置检测" aria-label="Permalink to &quot;配置检测&quot;">​</a></h1><p><strong>配置检测(Schema)</strong> 是 Kotori 中的一个重要概念和功能，其相关的所有实现均来源于 <a href="https://github.com/biyuehu/tsukiko" target="_blank" rel="noreferrer">Tsukiko</a> 库。Kotori 对 Tsukiko 进行了重新导出，因此可直接在 Kotori 中使用。</p><h2 id="tsukiko-简介" tabindex="-1">Tsukiko 简介 <a class="header-anchor" href="#tsukiko-简介" aria-label="Permalink to &quot;Tsukiko 简介&quot;">​</a></h2><p><strong>Tsukiko</strong> 是一个基于 TypeScript 开发的运行时下动态类型检查库，最初作为 kotori 开发中的副产物诞生，其作用与应用场景类似于 io-ts 之类的库，常用于 JSON/YAML/TOML 文件数据格式检验、第三方 HTTP API 数据格式检验、数据库返回数据格式检验（尽管此处推荐直接用更为成熟的 ORM 框架）等。</p><blockquote><p>视频介绍与演示：<a href="https://b23.tv/ejhXmIx" target="_blank" rel="noreferrer">哔哩哔哩</a></p></blockquote><p>项目名字取自于轻小说《変態王子と笑わない猫。》中的女主角——<a href="https://mzh.moegirl.org.cn/%E7%AD%92%E9%9A%90%E6%9C%88%E5%AD%90" target="_blank" rel="noreferrer">筒隠月子（Tsukakushi Tsukiko）</a></p><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><h3 id="类型检验" tabindex="-1">类型检验 <a class="header-anchor" href="#类型检验" aria-label="Permalink to &quot;类型检验&quot;">​</a></h3><p>Tsukiko 中带有多种类型解析器，通过不同的解析器可以实现对未知值的类型校验与处理：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">kotori-bot</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">check</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">233</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // false</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">check</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Hello,Tsukiko!</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // true</span></span></code></pre></div><p><code>schema.check()</code> 接收一个参数，返回值表示该参数类型是否匹配。此外，与之类似的还有以下多种校验方法：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">raw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// if passed the value must be a string</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// if not passrd: throw TsuError</span></span></code></pre></div><p><code>schema.parse()</code> 会处理传入值并判断是否符合要求，如若不符合将抛出错误（<code>TsuError</code>）并附带详细原因。不过有时并不想直接抛出错误则可以使用 <code>schema.parseSafe()</code>：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parseSafe</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">raw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">   console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Passed:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> else</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">   console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Error:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> result</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">error</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">message</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre></div><p>该方法会返回一个对象，当 <code>value</code> 为 <code>true</code> 时，对象上存在 <code>data</code> 属性，其值即为处理后的结果，当 <code>value</code> 为 <code>false</code> 时，对象上存在 <code>error</code> 属性，其值即为错误信息。此外，还有一个异步版本 <code>schema.parseAsync</code>：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parseAsync</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">raw</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">   .</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">then</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Passed</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> data</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">   .</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">error</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Fatal</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> error</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span></span></code></pre></div><p>上面有提到，<code>schema.parse()</code> 及相关的解析方法，在传入值符合要求时返回的数据会经过一定的处理，其主要体现为默认值处理：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">schema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Object</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">   name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Romi</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">),</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">   age</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Stting</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">16</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}).</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">   name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Romi</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">   age</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">16</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">schema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({ </span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Yuki</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">, </span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">17</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> })</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed { name: &#39;Yuki&#39;, age: 17 }</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">schema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({ </span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Kisaki</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> })</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed { name: &#39;Kisaki&#39;, age: 16 }</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">schema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({})</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed { name: &#39;Romi&#39;, age: 16 }</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">schema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">([])</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Error</span></span></code></pre></div><p>在不同的解析器下也有一定的体现，如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">233</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed &#39;233&#39;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Error</span></span></code></pre></div><p><code>Tsu.String()</code> 解析器默认允许数字传入（出于兼容性考虑），并会将其处理成字符串返回。</p><h3 id="类型修饰" tabindex="-1">类型修饰 <a class="header-anchor" href="#类型修饰" aria-label="Permalink to &quot;类型修饰&quot;">​</a></h3><p>最典型的修饰方法为 <code>schema.default()</code> 与 <code>schema.optional()</code>，前者用于设置默认值，后者用于设置可选类型：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">numSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Number</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">default</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2333</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">numSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 2333</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">optional</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">undefined</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed</span></span></code></pre></div><p>同样是出于兼容性考虑，解析器默认会允许 <code>null</code>，如若想只允许 <code>undefined</code> 作为空值，则可以使用 <code>schema.empty()</code>：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">optional</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">empty</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">undefined</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Passed</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">strSchema</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">parse</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">null</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // Error</span></span></code></pre></div><p>除去以上所有解析器共有方法以外，每个解析器也有自己专门的修饰方法，详情可查看下文。可以看到，在 <code>schema.optional()</code> 之后可以继续调用方法，因为包括以上在内的绝大部分修饰方法都会返回当前实例，链式调用便是 Tsukiko 最大特点。不过，同一个修饰方法应当在同一个解析器中仅调用一次，因为不同的修饰方法其执行行为有所不同：</p><ul><li>开关解析器上的某一内部属性（如 <code>Tsu.String()</code> 与 <code>Tsu.Object()</code> 上均存在的 <code>.strict()</code>），这使得可以在调用方法时传入一个 <code>Boolean</code> 值 ，一般地，这些方法的参数会有默认值</li><li>单向设置解析器上的某一内部属性（如上文的 <code>schema.optional()</code>、<code>schema.empty()</code>、<code>schema.default()</code>），大部分不需要传参，但也有些需要传参</li><li>多个同级方法间合并解析器上的多个内部属性（如很多解析器上都存在的 <code>.min()</code>、<code>.max()</code>、<code>range()</code>）</li></ul><h3 id="类型导出" tabindex="-1">类型导出 <a class="header-anchor" href="#类型导出" aria-label="Permalink to &quot;类型导出&quot;">​</a></h3><p><a href="https://json-schema.org/" target="_blank" rel="noreferrer"><strong>JSON Schema</strong></a> 是用于验证 JSON 数据结构的强大工具。在必要时可通过 <code>schema.schema()</code> 将任意解析器导出成 JSON Schema。不过在此之前，Tsukiko 提供了额外两个关于 JSON Schema 的新方法：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">config</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Object</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">   port</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Number</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">port</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">describe</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Server port</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">   address</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Tsu</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">describe</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Server display address</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}).</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">title</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Plugin configuration</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre></div><p><code>schema.</code></p><h2 id="解析器" tabindex="-1">解析器 <a class="header-anchor" href="#解析器" aria-label="Permalink to &quot;解析器&quot;">​</a></h2><h3 id="基础类型" tabindex="-1">基础类型 <a class="header-anchor" href="#基础类型" aria-label="Permalink to &quot;基础类型&quot;">​</a></h3><h3 id="引用类型" tabindex="-1">引用类型 <a class="header-anchor" href="#引用类型" aria-label="Permalink to &quot;引用类型&quot;">​</a></h3><h3 id="标准类型" tabindex="-1">标准类型 <a class="header-anchor" href="#标准类型" aria-label="Permalink to &quot;标准类型&quot;">​</a></h3><h3 id="高级类型" tabindex="-1">高级类型 <a class="header-anchor" href="#高级类型" aria-label="Permalink to &quot;高级类型&quot;">​</a></h3><h2 id="在-kotori-中的引用" tabindex="-1">在 Kotori 中的引用 <a class="header-anchor" href="#在-kotori-中的引用" aria-label="Permalink to &quot;在 Kotori 中的引用&quot;">​</a></h2><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><h3 id="数据检验" tabindex="-1">数据检验 <a class="header-anchor" href="#数据检验" aria-label="Permalink to &quot;数据检验&quot;">​</a></h3>`,40)]))}const c=i(n,[["render",t]]);export{y as __pageData,c as default};
