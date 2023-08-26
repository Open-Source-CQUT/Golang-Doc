# Consul

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308251536825.png)

>consul是一个能够让团队在服务与跨预置和多云环境中安全管理网络连接的解决方案，它提供了服务发现，服务网格，流量治理，网络基础设施自动更新等一系列功能。

官方文档：[Consul by HashiCorp](https://www.consul.io/)

开源地址：[hashicorp/consul](https://github.com/hashicorp/consul)



Consul是HashiCorp公司开源的一款服务发现与注册工具，采用Raft选举算法，工具本身使用Go语言进行开发，因此部署起来十分的轻便。Consul总共有以下特点：

- 服务发现
- 服务注册
- 健康检查
- 键值存储
- 多数据中心

实际上consul能做的事情不止服务发现，还可以做分布式配置中心，同类型的开源工具也有很多，比如zookeeper，nacos，这里就不再做过多的介绍。



## 安装

对于Ubuntu而言的话，执行下面的命令使用apt安装即可

```sh
$ wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
$ echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
$ sudo apt update && sudo apt install consul
```

或者也可以在官网下载[Install Consul](https://developer.hashicorp.com/consul/downloads)对应的安装包，由于consul是由go开发的，安装包本身也就只有一个二进制可执行文件，安装起来也相当的方便，安装成功后，执行如下命令查看版本。

```sh
$ consul version
```

正常输出就没有问题

```
Consul v1.16.1
Revision e0ab4d29
Build Date 2023-08-05T21:56:29Z
Protocol 2 spoken by default, understands 2 to 3 (agent will automatically use protocol >2 when speaking to compatible agents)
```



## 快速开始

下面介绍如何快速搭建一个consul单节点，一般单节点是在开发期间测试用的，如果单节点使用起来没有问题，大概率多节点集群也不会由问题。单节点搭建起来十分的简单，只需要一行命令即可

```sh
$ consul agent -dev -bind=192.168.48.141 -data-dir=/tmp/consul -ui -node=dev01
```

一般会有如下输出

```
==> Starting Consul agent...
               Version: '1.16.1'
            Build Date: '2023-08-05 21:56:29 +0000 UTC'
               Node ID: 'be6f6b8d-9668-f7ff-8709-ed57c72ffdec'
             Node name: 'dev01'
            Datacenter: 'dc1' (Segment: '<all>')
                Server: true (Bootstrap: false)
           Client Addr: [127.0.0.1] (HTTP: 8500, HTTPS: -1, gRPC: 8502, gRPC-TLS: 8503, DNS: 8600)
          Cluster Addr: 192.168.48.141 (LAN: 8301, WAN: 8302)
     Gossip Encryption: false
      Auto-Encrypt-TLS: false
           ACL Enabled: false
     Reporting Enabled: false
    ACL Default Policy: allow
             HTTPS TLS: Verify Incoming: false, Verify Outgoing: false, Min Version: TLSv1_2
              gRPC TLS: Verify Incoming: false, Min Version: TLSv1_2
      Internal RPC TLS: Verify Incoming: false, Verify Outgoing: false (Verify Hostname: false), Min Version: TLSv1_2
==> Log data will now stream in as it occurs:
2023-08-25T17:23:33.763+0800 [DEBUG] agent.grpc.balancer: switching server: target=consul://dc1.be6f6b8d-9668-f7ff-8709-ed57c72ffdec/server.dc1 from=<none> to=<none>
2023-08-25T17:23:33.767+0800 [INFO]  agent.server.raft: initial configuration: index=1 servers="[{Suffrage:Voter ID:be6f6b8d-9668-f7ff-8709-ed57c72ffdec Address:192.168.48.141:8300}]"
```

简单讲解一下释义

- `agent`是子命令，是consul的核心命令，`consul agent`就是运行一个新的consul代理，每一个node都是一个代理。

- `dev`，是agent的运行模式，总共有三种`dev`，`client`，`server`

- `bind`，局域网通信地址，端口默认8301，一般此值为服务器的内网地址

- `advertise`，广域网通信地址，端口默认8302，一般此值为服务器的外网地址

- `data-dir`，数据存放目录

- `config-dir`，配置存放目录，consul会读取目录下所有的json文件

- `bootstrap`，标注当前server进入引导模式，在raft选举时会给自己投票，集群中处于该模式的server不能超过一个

- `bootstrap-expect`，即集群中期望的server数量，在没有达到指定数量之前，集群不会开始选举投票，不能与`bootstrap`同时使用。

- `retry-join`，agent启动后，会不断尝试加入指定的节点，还支持以下的一些服务商发现方法

    ```
    aliyun aws azure digitalocean gce hcp k8s linode mdns os packet scaleway softlayer tencentcloud triton vsphere
    ```

- `ui`，运行Web后台

- `node`，执行节点名称，必须在集群中保持唯一。

::: tip

关于更多的agent参数释义，前往[Agents - CLI Reference | Consul | HashiCorp Developer](https://developer.hashicorp.com/consul/docs/agent/config/cli-flags#usage)，需要注意的是有些参数只有企业版能用。

:::

当成功运行后，访问`127.0.0.1:8500`，就可以浏览Web界面。

<img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308251740238.png"  />

dev01的图标是一个星星，就说明它是leader节点。

退出时，为了能其他节点感知到当前节点的退出，不建议强制杀死进程，可以使用命令

```sh
consul leave
```

或者

```sh
consul force-leave
```

也可以`ctrl+c`，让consul agent 优雅退出。



## 概念

![](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dconsul%26version%3Drefs%252Fheads%252Frelease%252F1.16.x%26asset%3Dwebsite%252Fpublic%252Fimg%252Fconsul-arch%252Fconsul-arch-overview-control-plane.svg%26width%3D960%26height%3D540&w=1920&q=75)

这是一张consul集群的示意图，图中分为了两部分，控制面和数据面。consul只负责控制面，分为服务集群和客户端，服务集群中又分为追随者和领导者，总体而言，图中consul集群就构成了一个数据中心。下面对一些术语进行讲解

- Agent（代理）：或者称为节点更合适，每一个agent都是一个长时间运行的守护进程，它们对外暴露HTTP和DNS接口，负责健康检查和服务同步。
- Server（服务代理）：作为一个consul server，它的职责主要有参与Raft选举，维护集群状态，响应查询，与其他数据中心交换数据，以及向领导者和其他数据中心转发查询。
- Client（客户代理）：client相对server来说是无状态的，它不参与Raft选举，所做的事情仅仅只是将所有的请求转发给server，它唯一参与的与后台有关的事情就是局域网流言转发（LAN gossip pool）。
- Leader（领导者）：leader是所有server的领导，而且领导只能有一个，leader是通过Raft选举算法进行选举的，每一个leader有自己的任期，在任期内，其他的server收到了不管什么请求都要告诉leader，所以leader的数据是最及时最新的。
- Gossi（流言）：Consul是基于Serf（该公司其下的另一个产品）而构建的，它使用gossip协议，该协议专用于节点间的随机通信，类似UDP，consul使用此协议来在服务集群间进行互相通知。
- Data Center（数据中心）：一个局域网内的consul集群被称为一个数据中心，consul支持多数据中心，多数据中心的沟通方式就是WAN gossip。

::: tip

更多词汇和术语可以前往[Glossary | Consul | HashiCorp Developer](https://developer.hashicorp.com/consul/docs/install/glossary#consul-vocabulary)进行了解。

:::



在consul集群中，server的数量应该严格控制，因为它们直接参与到LAN gossip和WAN gossip，raft选举，并且要存储数据，server越多，通信成本越高。而client的数量多一点没什么问题，它只负责转发，不参与选举，占用资源很低，在图中的集群中，各个服务通过client将自身注册到server中，如果有server挂了的话，client会自行寻找其他可用的server。



## 集群搭建示例

下面搭建一个简单的consul多节点集群示例，先准备四台虚拟机

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308251754483.png)

四台虚拟机中，三个server，一个client，官方建议server的数量最好是奇数，并且最好大于等于三个。这里将vm00-vm02作为server，vm03作为client，

对于server而言，运行如下命令，创建server agent

```sh
consul agent -server -bind=vm_address -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent_name -ui
```

对于client而言，运行如下命令，创建client agent

```sh
consul agent -client=0.0.0.0  -bind=vm_address -data-dir=/tmp/consul/ -node=agent_name -ui
```

执行的命令分别如下

```sh
# vm00
consul agent -server -bind=192.168.48.138 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent01 -ui -bootstrap

# vm01
consul agent -server -bind=192.168.48.139 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent02 -ui -retry-join=192.168.48.138

# vm02
consul agent -server -bind=192.168.48.140 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent03 -ui -retry-join=192.168.48.138

# vm03
consul agent -bind=192.168.48.140 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent03 -ui -retry-join=192.168.48.138
```

一些参数释义

- `client`，`0.0.0.0`即放行所有来源的请求，如果只有client参数，没有server参数，代表着agent将以client模式运行。

所有的agent运行好后，其中`retry-join`的作用等于自动执行join命令，失败后会不断尝试，默认重试时间30s

```sh
$ consul join 192.168.48.138
```

join完成后，各个节点都知晓了对方的存在，由于vm00指定了bootstrap模式，所以它就是默认的leader，如果没有指定bootstrap模式，所有节点在join时指定的节点为默认leader，**在leader没有选举出来之前，集群无法正常工作，访问web界面会返回500，一些命令也无法正常工作**。如果集群中有节点制定了bootstrap模式，那么集群中其他节点就不应该再有其他节点指定bootstrap模式，同时其他节点也不应该再使用`bootstrap-expect`参数，如果使用了会自动禁用。

这时在leader节点上（实际上这时无论哪个节点都可以查看）运行查看data center的成员信息，运行如下命令

```sh
$ consul members
Node      Address              Status  Type    Build   Protocol  DC   Partition  Segment
agent01   192.168.48.138:8301  alive   server  1.16.1  2         dc1  default    <all>
agent02   192.168.48.139:8301  alive   server  1.16.1  2         dc1  default    <all>
agent03   192.168.48.140:8301  alive   server  1.16.1  2         dc1  default    <all>
client01  192.168.48.141:8301  alive   client  1.16.1  2         dc1  default    <default>
```

- Node，即节点名称
- Address，通信地址
- Status，`alive`表示存活，`left`表示下线
- Type，agent种类，server和client两种模式
- Build，该节点使用的consul版本，consul可以在一定范围内兼容不同版本的节点进行工作
- Protocol，指的是使用的Raft协议版本，这个协议应当所有节点一致
- DC，Data Center，数据中心，输出中的所有节点都属于dc1数据中心
- Partition，节点隶属的分区，属于企业版功能，每个节点只能与同一分区的节点进行通信
- Segment，节点隶属的网段，属于企业版功能

<img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308251814336.png"  />

同样的，如果想要一个节点退出，应该使用`consul leave`让节点优雅退出，并通知其他节点自己将要退出，对于多节点的情况下，节点的优雅退出尤为重要，因为这关系到数据的一致性。

:::  tip

虚拟机在演示的时候关闭了所有的防火墙，在实际生产环境中为了安全考虑应该开启，为此应该关注下consul使用到的所有端口：[Required Ports | Consul | HashiCorp Developer](https://developer.hashicorp.com/consul/docs/install/ports)。

:::

接下来简单测试一下数据一致性，在vm00虚拟机中添加如下数据

```sh
$ consul kv put sys_confg {"name":"consul"}
Success! Data written to: sys_confg
```

保存后，通过HTTP API访问其他节点会发现数据同样存在（其中的value是base64编码）

```sh
$ curl http://192.168.48.138:8500/v1/kv/sys_confg
[{"LockIndex":0,"Key":"sys_confg","Flags":0,"Value":"ewogICJuYW1lIjoiY29uc3VsIgp9","CreateIndex":2518,"ModifyIndex":2518}]
$ curl http://192.168.48.139:8500/v1/kv/sys_confg
[{"LockIndex":0,"Key":"sys_confg","Flags":0,"Value":"ewogICJuYW1lIjoiY29uc3VsIgp9","CreateIndex":2518,"ModifyIndex":2518}]
$ curl http://192.168.48.140:8500/v1/kv/sys_confg
[{"LockIndex":0,"Key":"sys_confg","Flags":0,"Value":"ewogICJuYW1lIjoiY29uc3VsIgp9","CreateIndex":2518,"ModifyIndex":2518}]
```

事实上，consul提供的服务发现与注册功能，就是将注册的服务以KV形式存储的，并通过gossip协议广播给其他节点，并且当任意一个节点加入当前数据中心时，所有的节点都会感知到此变化。



## 多数据中心搭建示例

准备五台虚拟机，vm00-vm02是上一个示例的集群，属于dc1数据中心，不去动它，vm03-vm04属于dc2数据中心，数据中心在agent启动时，默认为dc1。

![](https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202308261221865.png)

::: tip

这里为了演示，只搭建server，省掉了client。

:::

首先分别启动vm03，将其作为默认的leader

```sh
$ consul agent -server -datacenter=dc2 -bind=192.168.48.141 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent04 -ui -bootstrap
```

启动启动vm04，让其自动join到vm03节点

```sh
$ consul agent -server -datacenter=dc2 -bind=192.168.48.142 -client=0.0.0.0 -data-dir=/tmp/consul/ -node=agent05 -ui -retry-join=192.168.48.141
```

此时分别在vm00和vm03查看members

```sh
# vm00-vm02
$ consul members
Node      Address              Status  Type    Build   Protocol  DC   Partition  Segment
agent01   192.168.48.138:8301  alive   server  1.16.1  2         dc1  default    <all>
agent02   192.168.48.139:8301  alive   server  1.16.1  2         dc1  default    <all>
agent03   192.168.48.140:8301  alive   server  1.16.1  2         dc1  default    <all>

# vm03-vm04
$ consul members
Node     Address              Status  Type    Build   Protocol  DC   Partition  Segment
agent04  192.168.48.141:8301  alive   server  1.16.1  2         dc2  default    <all>
agent05  192.168.48.142:8301  alive   server  1.16.1  2         dc2  default    <all>
```

可以看到DC字段不同，因为这里是虚拟机演示，所以都是在同一个网段中，现实中两个数据中心可能是异地的服务器集群。接下来让dc1的任意一个节点join到dc2的任意一个节点，这里让vm01 join vm03

```sh
$ consul join -wan 192.168.48.141
Successfully joined cluster by contacting 1 nodes.
```

join成功后，执行命令查看广域网members

```sh
$ consul members -wan
Node         Address              Status  Type    Build   Protocol  DC   Partition  Segment
agent01.dc1  192.168.48.138:8302  alive   server  1.16.1  2         dc1  default    <all>
agent02.dc1  192.168.48.139:8302  alive   server  1.16.1  2         dc1  default    <all>
agent03.dc1  192.168.48.140:8302  alive   server  1.16.1  2         dc1  default    <all>
agent04.dc2  192.168.48.141:8302  alive   server  1.16.1  2         dc2  default    <all>
agent05.dc2  192.168.48.142:8302  alive   server  1.16.1  2         dc2  default    <all>

$ consul catalog datacenters
dc2
dc1
```

只要dc1的随便一个节点join到dc2的任意一个节点，两个数据中心的所有节点都会感知到此变化，查看members的时候也可以看到两个数据中心的节点。

接下来尝试在vm00节点添加一个KV数据

```sh
$ consul kv put name consul
Success! Data written to: name
```

 在vm01节点尝试读取数据，可以看到同一数据中心的数据是同步的

```sh
$ consul kv get name
consul
```

然后再去不同数据中心的vm03尝试读取数据，会发现不同数据中心的数据是不同步的。

```sh
$ consul kv get name
Error! No key exists at: name
```

如果想要多数据中心数据同步的话，可以了解[hashicorp/consul-replicate: Consul cross-DC KV replication daemon](https://github.com/hashicorp/consul-replicate)。



## 服务注册与发现
