import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "指南", icon: "linter", link: "/guide" },
  { text: "外链", icon: "share", link: "/link" },
  { text: "规范", icon: "discover", link: "/rules" },
  { text: "命令", icon: "shell", link: "/cmd" },
  { text: "关于", icon: "alias", link: "/about" },
]);
