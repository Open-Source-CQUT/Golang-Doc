import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/": [
        {
            icon: "activity",
            text: "语言入门",
            prefix: "essential/",
            // 没法给目录排序，所以这里只能手动指定顺序
            children: [
                {icon: "bit", text: "语法基础", prefix: "base/", collapsible: true, children: "structure"},
                {icon: "alias", text: "语法进阶", prefix: "senior/", collapsible: true, children: "structure"},
                {icon: "module", text: "标准库", prefix: "std/", collapsible: true, children: "structure"},
                {icon: "template", text: "实现原理", prefix: "impl/", collapsible: true, children: "structure"},
            ],
        },
        {
            icon: "software",
            text: "社区生态",
            prefix: "advance/",
            children: "structure",
        }
    ],
});
