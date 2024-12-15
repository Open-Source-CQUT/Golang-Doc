import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      icon: "activity",
      text: "语言入门",
      prefix: "essential/",
      // 没法给目录排序，所以这里只能手动指定顺序
      children: [
        {
          icon: "bit",
          text: "语法基础",
          prefix: "base/",
          collapsible: true,
          children: "structure",
        },
        {
          icon: "alias",
          text: "语法进阶",
          prefix: "senior/",
          collapsible: true,
          children: "structure",
        },
        {
          icon: "module",
          text: "标准库",
          prefix: "std/",
          collapsible: true,
          children: "structure",
        },
        {
          icon: "template",
          text: "实现原理",
          prefix: "impl/",
          collapsible: true,
          children: [
            { text: "错误处理", prefix: "err/", children: "structure" },
            { text: "数据结构", prefix: "ds/", children: "structure" },
            { text: "运行时", prefix: "runtime/", children: "structure" },
            { text: "并发", prefix: "sync/", children: "structure" },
            { text: "网络", prefix: "network/", children: "structure" },
          ],
        },
      ],
    },
    {
      icon: "software",
      text: "社区生态",
      prefix: "community/",
      children: "structure",
    },
  ],
});
