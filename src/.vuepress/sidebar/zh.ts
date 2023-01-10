import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/": [
        {
            icon: "activity",
            text: "语言入门",
            prefix: "base/",
            children: [
                {icon: "bit", text: "语法基础", prefix: "essential/", collapsible: true, children: "structure"},
                {icon: "alias", text: "语法进阶", prefix: "advanced/", collapsible: true, children: "structure"},
                {icon: "blog", text: "标准库", prefix: "std/", collapsible: true, children: "structure"},
            ],
        },
        {
            icon: "advance",
            text: "语言进阶",
            prefix: "advance/",
            children: [
                {icon: "mysql", text: "数据库", prefix: "data/", collapsible: true, children: "structure"},
                {icon: "engine", text: "实用依赖", prefix: "dependency/", collapsible: true, children: "structure"},
                {icon: "customize", text: "实用框架", prefix: "framework/", collapsible: true, children: "structure"},
                {icon: "change", text: "微服务", prefix: "mirco/", collapsible: true, children: "structure"},
            ]
        },
        {
            icon: "study",
            text: "理论思想",
            prefix: "knowledge/",
            children: [
                {icon: "line", text: "设计模式", prefix: "pattern/", collapsible: true, children: "structure"},
            ]
        },
        {
            icon: "software",
            text: "实用技术",
            prefix: "technology/",
            children: [
                {icon: "discover", text: "中间件", prefix: "middleware/", collapsible: true, children: "structure"},
                {icon: "snow", text: "有趣技术", prefix: "thirdPart/", collapsible: true, children: "structure"},
                {icon: "relation", text: "Docker", prefix: "docker/", collapsible: true, children: "structure"},
                {icon: "linux", text: "Linux", prefix: "linux/", collapsible: true, children: "structure"},
            ]
        }
    ],
});
