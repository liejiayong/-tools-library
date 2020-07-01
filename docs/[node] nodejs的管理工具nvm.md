---
title: nodejs的管理工具nvm
---

> 本文章不跟新，可移步到“[node]yarn、npm、nrm与nvm的安装和使用详解”

2020 新年，疫情形势让我内心姗姗来迟的平静下来，于是...发现个人电脑竟然还装在 nodejs 独立版本，所以...写下一篇笔记。

# 安装

安装注意事项：

- 如果在安装 nvm 之前已经下载了 node,需要把 node 卸载！！！需要把 node 卸载！！！需要把 node 卸载！！！
- nvm 所安装目录名不能存在空格

## mac 下 安装

## linux 下 安装

## windows 下 安装

[下载地址：https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

- nvm-noinstall.zip： 这个是绿色免安装版本，但是使用之前需要配置
- nvm-setup.zip：这是一个安装包，下载之后点击安装，无需配置就可以使用，方便(推荐)。
- Source code(zip)：zip 压缩的源码
- Sourc code(tar.gz)：tar.gz 的源码，一般用于\*nix 系统

下载完成后解压下载的 zip，生成 nvm-setup.exe 文件并运行。

然后配置 nvm 安装地址位置 与 设置 node 的 symlink 文件夹位置(注意安装 nvm 与 node 的所在目录不能存在空格等非常规字符) 。

然后安装流程下一步即可完成安装

在显示安装成功后，打开 GIT 命令窗口输入 **nvm** 后，窗口显示有关 nvm 的相关信息则安装成功，如下：

```txt

Running version 1.1.7.

Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                 Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                 Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/cli/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm version                  : Displays the current running version of nvm for Windows. Aliased as v.

```

# 修改代理

在你安装的目录下找到 settings.txt 文件，打开后加上

```txt
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

settings.txt 最终效果

```txt
root: D:\nvm
path: D:\nodejs

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

# nvm Usage

- nvm arch [32|64]： 显示 node 是运行在 32 位还是 64 位模式。指定 32 或 64 来覆盖默认体系结构。
- nvm install <version> [arch]：该可以是 node.js 版本或最新稳定版本 latest。（可选[arch]）指定安装 32 位或 64 位版本（默认为系统 arch）。设置[arch]为 all 以安装 32 和 64 位版本。在命令后面添加–insecure，可以绕过远端下载服务器的 SSL 验证。
- nvm list [available]：列出已经安装的 node.js 版本。可选的 available，显示可下载版本的部分列表。这个命令可以简写为 nvm ls [available]。
- nvm on： 启用 node.js 版本管理。
- nvm off： 禁用 node.js 版本管理(不卸载任何东西)
- nvm proxy [url]： 设置用于下载的代理。留[url]空白，以查看当前的代理。设置[url]为 none 删除代理。
- nvm node_mirror [url]：设置 node 镜像，默认为https://nodejs.org/dist/.。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/node/
- nvm npm_mirror [url]：设置 npm 镜像，默认为https://github.com/npm/- npm/archive/。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/npm/
- nvm uninstall <version>： 卸载指定版本的 nodejs。
- nvm use [version][arch]： 切换到使用指定的 nodejs 版本。可以指定 32/64 位[arch]。
- nvm use <arch>：将继续使用所选版本，但根据提供的值切换到 32/64 位模式
- nvm root [path]： 设置 nvm 存储 node.js 不同版本的目录 ,如果未设置，将使用当前目录。
- nvm version： 显示当前运行的 nvm 版本，可以简写为 nvm v

# 使用

先查看当前版本列表：nvm list

接着查看线上版本：nvm list available

然后安装需求版本： nvm install 12.13.0

最后使用 nvm 指定 node 版本： nvm use 12.13.0

# 可能遇见问题

## windows 上安装 nvm 后选择 node 版本出现 exit status 1...

问题：nvm install x.x.x 可以成功，但无法切换和使用

原因：我把 nvm 安装到了有空格的路径上（D:\Program Files），导致切换失败

解决：把 nvm 卸载重装到没有空格的路径上（例如：D:\nvm），即可解决问题

## nvm 在 Cmder 中不生效

原因就不需要解析了

解决：重启电脑后 或者重启命令工具后，即会生效。

## 安装时出现 npm Download failed.

原因：

1. 可能是 npm 镜像地址为国外，没有科学上网超时下载
2. 可能设置[淘宝镜像](https://npm.taobao.org/mirrors/npm/)后，所下载 npm 版本（如：node:v12.13.1, npm:v6.12.1）在淘宝镜像不存在,因此需要手动安装

解决：

问题 1：只需设置淘宝镜像即可，[看上文](#修改代理)

问题 2 则需要如下步骤：

- 首先去 node 官网下载对应版本的 node
- 在 nvm 目录下创建名为 v12.13.1 的文件夹
- 点开 node-v**.**.\*.msi 的安装文件，将安装目录选为 nvm\v12.13.1\，然后一直 next 即可。
- 修改这个版本 npm 的缓存目录：npm config set prefix "你的 nvm 目录\v12.13.1\node_modules"
