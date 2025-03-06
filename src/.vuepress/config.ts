import {viteBundler} from "@vuepress/bundler-vite";
import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "Golang 中文学习文档",
    description: "Go 爱好者驱动的中文学习文档",

    head: [
        [
            "script",
            {},
            `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?87d678935e4b33455c0390543e7a759d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
        ],
        [
            "script",
            {
                async: true,
                src: "https://www.googletagmanager.com/gtag/js?id=G-6K9H75LPZG"
            }
        ],
        [
            "script",
            {},
            `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6K9H75LPZG');`
        ],
    ],

    bundler: viteBundler(),
    theme,

    shouldPrefetch: false,
    pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],
});
