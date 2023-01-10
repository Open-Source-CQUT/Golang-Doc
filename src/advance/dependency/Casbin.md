# Casbin

官方仓库：[casbin/casbin: An authorization library that supports access control models like ACL, RBAC, ABAC in Golang (github.com)](https://github.com/casbin/casbin)

官方文档：[概述 | Casbin](https://casbin.org/zh/docs/overview)



## 介绍

Casbin 是一个强大和高效的开放源码访问控制库，它支持各种以强制全面执行授权。

执行一套规则与列出下述问题一样简单。 对象和所需的 在 **策略**文件中允许的动作(或根据您的需要提供任何其他格式)。 这是Casbin使用的所有流的同义词。 开发者/管理员有 完全控制布局， 通过 **模型** 文件设置的执行和授权条件 。 Casbin提供了一个 **执行者** 根据提供给执行者的策略和模型文件验证传入的请求。