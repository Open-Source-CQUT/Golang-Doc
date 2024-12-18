# Casbin

官方仓库：[casbin/casbin: An authorization library that supports access control models like ACL, RBAC, ABAC in Golang (github.com)](https://github.com/casbin/casbin)

官方文档：[概述 | Casbin](https://casbin.org/zh/docs/overview)

::: tip

本文只能算是一个Casbin入门文章，如果想要更细致的了解请前往官网进行学习。

:::

## 介绍

在一个系统中，后端程序员需要负责对于API权限的管理，而这需要耗费大量的工作，倘若每一个项目都要自己手写一套，将会浪费大量的时间。拥有更多人力物力的大公司会更倾向于自己开发一套权限框架，但是大部分中小公司承受不起这种开发成本，所以市面上开源的权限框架成为了他们的首选。Casbin就是这样一个开源高效的访问控制库，本身是采用Go语言进行开发，同时也支持其他的主流语言。

需要注意的是，Casbin仅仅只是一个访问控制框架，只负责访问控制，访问认证方面的逻辑并不由Casbin负责，它仅仅存储用户与角色之间的映射关系。支持以下访问控制模型：

1. ACL (Access Control List, 访问控制列表)
2. 具有超级用户的ACL
3. **没有用户的 ACL**: 对于没有身份验证或用户登录的系统尤其有用。
4. **没有资源的 ACL**: 某些场景可能只针对资源的类型, 而不是单个资源, 诸如 `write-article`, `read-log`等权限。 它不控制对特定文章或日志的访问。
5. RBAC (基于角色的访问控制)
6. **支持资源角色的RBAC**: 用户和资源可以同时具有角色 (或组)。
7. **支持域/租户的RBAC**: 用户可以为不同的域/租户设置不同的角色集。
8. ABAC (基于属性的访问控制): 支持利用`resource.Owner`这种语法糖获取元素的属性。
9. RESTful: 支持路径, 如 `/res/*`, `/res/: id` 和 HTTP 方法, 如 `GET`, `POST`, `PUT`, `DELETE`。
10. **拒绝优先**: 支持允许和拒绝授权, 拒绝优先于允许。
11. **优先级**: 策略规则按照先后次序确定优先级，类似于防火墙规则

## 工作原理

在Casbin中，访问控制模型被抽象为基于PERM的配置文件，PERM指Policy（策略），Effect（效果），Request（请求），Matcher（匹配），在项目修改授权机制时，只需要简单地修改配置文件即可。一个正常的Model配置文件内容如下：

```conf
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

这是一个最简单的ACL访问控制模型。

### 策略

在配置文件中，策略定义部分为

```
[policy_definition]
p = sub, obj, act
```

`p`即指policy，不能用其他字符代替，sub指subject，为策略主体，obj即object，为策略对象，act即action，指的是行为。

```
p = sub, obj, act
```

也可以有第四个字段eft，如果省略默认eft为allow。

```
p=sub, obj, act, eft
```

这一行定义只是描述了policy该如何书写，并非具体的策略定义。下面是一个具体的policy例子

```
p, jojo, cake, eat
```

p代表了这是一条策略规则定义，jojo即策略主体，cake即策略对象，eat即行为，完整意思为主体jojo能对对象cake进行行为eat。具体的策略规则并不会出现在模型文件中，会有专门的policy文件或者数据库来进行策略存储。

### 请求

在配置文件中，请求定义部分为

```
[request_definition]
r = sub, obj, act
```

`r`即指request，不能用其他字符代替，sub即subject，指请求主体，obj即object，指请求对象，act即action，指的是请求行为。一般情况下请求定义与策略定义字段名都一致。请求部分并不由casbin负责，这由开发者自己决定什么是请求主体，什么是请求对象，casbin只需要负责根据传入的字段来进行访问控制。

### 匹配

在配置文件中，匹配定义部分为

```
[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

`m`指matcher，不能使用其他字符代替，其后就是相应的匹配规则，上述就是一个简单的布尔表达式，其意为传入的请求的所有字段都与策略规则的字段全部相同就匹配，当然它也可以是通配符或者表达力更强的正则表达式。

除此之外，matcher还支持in语法，例如

```
[matchers]
m = r.sub in ("root","admin")
```

也可以是

```
[matchers]
m = r.sub.Name in (r.obj.Admins)
```

```go
e.Enforce(Sub{Name: "alice"}, Obj{Name: "a book", Admins: []interface{}{"alice", "bob"}})
```

在进行匹配时，Casbin不会进行类型检查，而是将其作为`interface`进行`==`检查是否相等。

### 效果

效果定义部分对匹配结果再次作出逻辑组合判断，在配置文件中，效果定义部分为

```
[policy_effect]
e = some(where (p.eft == allow))
```

`e`即指effect，不能使用其他字符代替。 `some` 量词判断是否存在一条策略规则满足匹配器。 `any` 量词则判断是否所有的策略规则都满足匹配器 。

```
some(where (p.eft == allow))
```

这一条规则意为在匹配结果中有一条结果allow，那么最终结果就为allow。

```
e = !some(where (p.eft == deny))
```

这一条规则意为在匹配结果中只要不存在deny的结果，那么最终结果就为allow。

```
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))
```

这一条规则意味在匹配结果中，有一条为allow，且不存在deny的结果，那么最终结果就为allow。

虽然Casbin设计了上述政策效果的语法，但目前的执行只是使用硬编码的政策效果。 他们认为这种灵活性没有多大必要。 目前为止你必须使用内置的 policy effects，不能自定义，内置支持的 policy effects如下。

| Policy effect定义                                            | 意义             | 示例                                                                    |
| ------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------- |
| some(where (p.eft == allow))                                 | allow-override   | [ACL, RBAC, etc.](https://casbin.org/zh/docs/supported-models#examples) |
| !some(where (p.eft == deny))                                 | deny-override    | [拒绝改写](https://casbin.org/zh/docs/supported-models#examples)        |
| some(where (p.eft == allow)) && !some(where (p.eft == deny)) | allow-and-deny   | [同意与拒绝](https://casbin.org/zh/docs/supported-models#examples)      |
| priority(p.eft) \|\| deny                                    | priority         | [优先级](https://casbin.org/zh/docs/supported-models#examples)          |
| subjectPriority(p.eft)                                       | 基于角色的优先级 | [主题优先级](https://casbin.org/zh/docs/supported-models#examples)      |

::: tip

1.上述四个定义都可以定义多个，语法是`type`+`number`，例如`r2`,`p2`,`e2`,`m2`。

2.模型文件可以有注释，以`#`符号进行注释。

:::

### 示例

下面是一个示例，演示下模型文件的工作过程。首先定义一个简单的ACL模型文件如下

```
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

Policy文件如下

```
p, alice, data1, read
p, bob, data2, write
```

如何抽象出主体，对象，行为这一过程由业务逻辑决定，这里并不重要所以省略。下面以最简单的方式展示传入的请求，如下

```
alice, data1, read
bob, data1, read
alice, data2, write
bob, data2, write
```

policy文件中定义了alice拥有对data1进行read操作的权限，bob拥有对data2进行write操作的权限，那么在传入的请求中

```
alice, data1, read
```

表示alice想要对data1进行read操作，

```
bob, data1, read
```

表示bob想要对data1进行read操作，余下的同理。那么最终结果为

```
true
false
false
true
```

这是一个最简单的ACL示例，Casbin官网中可以进行在线编辑并测试示例，前往[Casbin editor](https://casbin.org/zh/editor)进行测试。

## RBAC

RBAC（Role-Based-Access-Controll），基于角色的访问控制，相较于ACL模型会多一个`[role definition]`，下面是一个简单的RBAC模型

```
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

其中角色的定义如下

```
[role_definition]
g = _, _
```

g指group，不能用其他字符代替，支持`type`+`number`方式创建多个，`_`是占位符，表示有几个入参。一般而言，在Policy中，g通常为如下格式

```
g, alice, data2_admin
g, mike, data1_admin
g, data1_admin data2_admin
```

alice指的是主体，data2_admin指的是角色，严格来说casbin都将将其看待为字符串，如何理解其含义和使用取决于开发者。

```
g, alice, data2_admin
```

表示alice具有角色data2_admin

```
g, mike, data1_admin
```

表示mike具有角色data1_admin

```
g, data1_admin data2_admin
```

表示角色data1_admin具有角色data2_admin，这是角色之间的继承关系。

### 资源角色模型

资源角色模型新增了一个g2，作为资源的角色定义，模型定义如下

```
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _
g2 = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act
```

Policy示例定义如下

```
p, alice, data1, read
p, bob, data2, write
p, data_group_admin, data_group, write

g, alice, data_group_admin
g2, data1, data_group
g2, data2, data_group
```

其中g2定义了资源角色组，将资源赋予不同的角色，同时规定了用户角色与资源角色之间的用户关系。

```
p, data_group_admin, data_group, write
```

这一条策略便是定义了具有角色data_group_admin的用户能对具有data_group角色的资源进行写操作。

### 多租户领域模型

```
[request_definition]
r = sub, dom, obj, act

[policy_definition]
p = sub, dom, obj, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act
```

多租户领域模型相较于传统RBAC模型多了dom字段，用于表示主体所属于的领域。Policy示例如下

```
p, admin, domain1, data1, read
p, admin, domain1, data1, write
p, admin, domain2, data2, read
p, admin, domain2, data2, write

g, alice, admin, domain1
g, bob, admin, domain2
```

例如

```
p, admin, domain1, data1, read
```

定义了属于领域domain1的主体admin具有对data1进行read操作的权限

```
g, alice, admin, domain1
```

定义了alice属于domain1具有角色admin

## ABAC
