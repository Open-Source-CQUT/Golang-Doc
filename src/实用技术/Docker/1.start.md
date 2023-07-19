# 安装使用

第一次使用电脑时，都会先学习怎么开机和关机，使用软件也一样，得先学会怎么安装和卸载，以免觉得不好用了也可以卸掉。

本篇的内容参考自[Install Docker Engine on Ubuntu | Docker Documentation](https://docs.docker.com/engine/install/ubuntu/)

::: tip

后续的文章都将在ubuntu22.04LTS系统基础之上进行描述。

:::

## 安装



### 设置仓库

1.更新apt索引，安装一些依赖

```sh
$ sudo apt-get update
$ sudo apt-get install ca-certificates curl gnupg
```

2.添加docker官方的GPG密钥

```sh
 $ sudo install -m 0755 -d /etc/apt/keyrings
 $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
 $ sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

3.设置仓库

```sh
$ echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```



### 安装docker engine

1.先更新索引

```sh
$ sudo apt-get update
```

2.安装最新版本

```sh
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3.安装指定版本

```sh
# 挑选需要的版本
$ apt-cache madison docker-ce | awk '{ print $3 }'

5:24.0.0-1~ubuntu.22.04~jammy
5:23.0.6-1~ubuntu.22.04~jammy
...
# 安装指定版本
$ VERSION_STRING=5:24.0.0-1~ubuntu.22.04~jammy
$ sudo apt-get install \
docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
```

4.执行`docker info`看看是否docker service是否都正常运行

```sh
$ sudo docker info
Client: Docker Engine - Community
 Version:    24.0.4
 Context:    default
 Debug Mode: false
 Plugins:
  buildx: Docker Buildx (Docker Inc.)
    Version:  v0.11.1
    Path:     /usr/libexec/docker/cli-plugins/docker-buildx
  compose: Docker Compose (Docker Inc.)
    Version:  v2.19.1
    Path:     /usr/libexec/docker/cli-plugins/docker-compose

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 24.0.4
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Using metacopy: false
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: 2
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 3dce8eb055cbb6872793272b4f20ed16117344f8
 runc version: v1.1.7-0-g860f061
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 5.19.0-46-generic
 Operating System: Ubuntu 22.04.1 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 8
 Total Memory: 15.61GiB
 Name: wyh-virtual-machine
 ID: 6bef4127-4e92-4dc1-9b07-ba8c17987a8f
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Username: stranger246859
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false
```

5.运行`hello-world`镜像看看能不能正常工作

```sh
$ sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
719385e32844: Pull complete 
Digest: sha256:926fac19d22aa2d60f1a276b66a20eb765fbeea2db5dbdaafeb456ad8ce81598
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## 卸载

相比于安装，卸载就要简单多了

```sh
$ sudo apt-get purge \
docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

然后再删除数据文件

```sh
$ rm -rf /var/lib/docker /var/lib/containerd /etc/docker
```



## 关闭

要想完全关闭docker，需要将`docker.socket`和`docker`两个服务都关掉。

```sh
$ systemctl stop docker.socket docker
```

## 开启

开启同理

```sh
$ systemctl start docker.socket docker
```

