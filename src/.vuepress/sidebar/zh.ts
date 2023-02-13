import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/": [
        {
            icon: "activity",
            text: "语言入门",
            prefix: "语言入门/",
            children: [
                {icon: "bit", text: "语法基础", prefix: "语法基础/", collapsible: true, children: "structure"},
                {icon: "alias", text: "语法进阶", prefix: "语法进阶/", collapsible: true, children: "structure"},
                {icon: "blog", text: "标准库", prefix: "标准库/", collapsible: true, children: "structure"},
            ],
        },
        {
            icon: "advance",
            text: "语言进阶",
            prefix: "语言进阶/",
            children: [
                {icon: "engine", text: "原理解析", prefix: "原理解析/", collapsible: true, children: "structure"},
                {icon: "engine", text: "实用依赖", prefix: "实用依赖/", collapsible: true, children: "structure"},
                {icon: "customize", text: "实用框架", prefix: "实用框架/", collapsible: true, children: "structure"},
                {icon: "mysql", text: "数据操作", prefix: "数据操作/", collapsible: true, children: "structure"},
                {icon: "change", text: "微服务", prefix: "微服务/", collapsible: true, children: "structure"},
            ]
        },
        {
            icon: "study",
            text: "理论思想",
            prefix: "理论思想/",
            children: [
                {icon: "line", text: "设计模式", prefix: "设计模式/", collapsible: true, children: "structure"},
                {icon: "line", text: "算法刷题", prefix: "算法刷题/", collapsible: true, children: "structure"},
            ]
        },
        {
            icon: "software",
            text: "实用技术",
            prefix: "实用技术/",
            children: [
                {icon: "discover", text: "中间件", prefix: "中间件/", collapsible: true, children: "structure"},
                {icon: "snow", text: "有趣技术", prefix: "有趣技术/", collapsible: true, children: "structure"},
                {icon: "git", text: "Git", prefix: "Git/", collapsible: true, children: "structure"},
                {icon: "relation", text: "Docker", prefix: "Docker/", collapsible: true, children: "structure"},
                {icon: "linux", text: "Linux", prefix: "Linux/", collapsible: true, children: "structure"},
            ]
        }
    ],
});
