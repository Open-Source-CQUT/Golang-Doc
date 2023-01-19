import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "指南", icon: "linter", link: "/guide" },
  { text: "外链", icon: "share", link: "/link" },
  { text: "命令", icon: "shell", link: "/cmd" },
  { text: "规范", icon: "discover", link: "/rules" },
  { text: "关于", icon: "alias", link: "/about" },
  { text: "参考手册", icon: "article", link: "https://go.dev/ref/spec" },
]);
