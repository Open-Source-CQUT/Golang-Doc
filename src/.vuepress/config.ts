import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import {componentsPlugin} from "vuepress-plugin-components";

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "Golang中文学习文档",
    description: "Go爱好者驱动的中文学习文档",
    head: [
        [
            "script", {},
            `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?87d678935e4b33455c0390543e7a759d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`
        ]
    ],
    theme,
    shouldPrefetch: false,
    pagePatterns: [
        "**/*.md",
        "!**/*.snippet.md",
        "!.vuepress",
        "!node_modules",
    ],
    plugins: [
        componentsPlugin({
            rootComponents: {
                notice: [
                    {
                        path: "/",
                        title: "域名更换",
                        content: "旧版www域名SSL证书已过期，请前往新的golang域名，已经是新域名的可以忽略。",
                        showOnce: true,
                        actions: [
                            {
                                type: "primary",
                                text: "前往",
                                link: "https://golang.halfiisland.com/"
                            }
                        ]
                    },
                ],
            }
        }),
        searchProPlugin({
            // 索引全部内容
            indexContent: true
        }),
    ]
});
