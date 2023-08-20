import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "指南", icon: "activity", link: "/guide"},
    {text: "外链", icon: "share", link: "/link"},
    {text: "命令", icon: "shell", link: "/cmd"},
    {text: "更新日志", icon: "repo", link: "/release"},
    {text: "依赖导航", icon: "discover", link: "/deb"},
    {text: "在线运行", icon: "back-stage", link: "https://go.dev/play/"},
    {text: "参考手册", icon: "article", link: "https://go.dev/ref/spec"},
    {text: "关于作者", icon: "alias", link: "/about"},
]);
