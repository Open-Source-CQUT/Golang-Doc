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
            ],
        },
        {
            icon: "advance",
            text: "语言进阶",
            prefix: "advance/",
            children: "structure",
        },
        {
            icon: "study",
            text: "理论思想",
            prefix: "knowledge/",
            children: "structure",
        },
        {
            icon: "software",
            text: "实用技术",
            prefix: "technology/",
            children: "structure",
        }
    ],
});
