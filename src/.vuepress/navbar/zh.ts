import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {text: "指南", icon: "linter", link: "/guide"},
    {text: "外链", icon: "share", link: "/link"},
    {text: "命令", icon: "shell", link: "/cmd"},
    {text: "规范", icon: "discover", link: "/rules"},
    {text: "在线运行", icon: "back-stage", link: "https://go.dev/play/"},
    {text: "参考手册", icon: "article", link: "https://go.dev/ref/spec"},
    {text: "关于作者", icon: "alias", link: "/about"},
]);
