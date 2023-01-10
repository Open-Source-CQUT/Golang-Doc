import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "Golang中文学习文档",
    description: "Go爱好者驱动的中文学习文档",
    theme,
    shouldPrefetch: false,
    pagePatterns: [
        "**/*.md",
        "!**/*.snippet.md",
        "!.vuepress",
        "!node_modules",
    ],
    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true
        }),
    ]
});
