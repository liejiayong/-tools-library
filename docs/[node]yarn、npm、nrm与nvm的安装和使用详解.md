---
title: [node]yarn、npm、nrm与nvm的安装和使用详解
---

> 持续整理中...

- feat：增加一个新功能
- fix：修复 bug
- docs：只修改了文档
- style：做了不影响代码含义的修改，空格、格式化、缺少分号等等
- refactor：代码重构，既不是修复 bug，也不是新功能的修改
- perf：改进性能的代码
- test：增加测试或更新已有的测试
- chore：构建或辅助工具或依赖库的更新

#### 注释

下面所讲的包（package），即代码模块

在开发过程中，拥有一套可以随意切换 node 版本的，可以随意切换远程代码源地址的，可以初始化、下载、删除、发布源码包的利器，可以让开发者在使用、管理代码的时候更加得心应手。下面会一步一步分解讲述 yarn、npm、nrm 和 nvm。

# nvm

nvm 全称 Node Version Manager 是 Nodejs 版本管理器，它让我们能方便的对 Nodejs 的版 本进行切换。 nvm 的官方版本只支持 Linux 和 Mac。 Windows 用户，可以用 [nvm-windows](https://github.com/coreybutler/nvm-windows)。

## install nvm

> 安装注意事项：

- 如果在安装 nvm 之前已经下载了 node,需要把 node 卸载！！！需要把 node 卸载！！！需要把 node 卸载！！！
- nvm 所安装目录名不能存在空格

linux、mac 可以通过命令栏下载：

```bash
# 下载
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

#查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
npm ls -g --depth=0
#删除全局 node_modules 目录
sudo rm -rf /usr/local/lib/node_modules
#删除 node
sudo rm /usr/local/bin/node
#删除全局 node 模块注册的软链
cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm
```

window 可以直接根据系统版本来安装即可，[nvm-windows 下载](https://github.com/coreybutler/nvm-windows)。几个版本的区别：

- nvm-noinstall.zip： 这个是绿色免安装版本，但是使用之前需要配置
- nvm-setup.zip：这是一个安装包，下载之后点击安装，无需配置就可以使用，方便(推荐)。
- Source code(zip)：zip 压缩的源码
- Sourc code(tar.gz)：tar.gz 的源码，一般用于\*nix 系统

下载完成后解压下载的 zip，生成 nvm-setup.exe 文件并运行。

在安装步骤中 next 时，需要配置 nvm 安装地址位置 与 设置 node 的 symlink 文件夹位置(注意安装 nvm 与 node 的所在目录不能存在空格等非常规字符) 。

然后安装流程下一步即可完成安装。

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

## Configuration NVM

在你安装的目录下找到 settings.txt 文件，

打开后加上 node 与 npm 的镜像地址(mirror),

接着添加 nvm 在本地磁盘位置 root,以及 nvm 当前控制的 node 版本的磁盘位置：path，位置根据实际安装位置来设置。

```txt
root: E:\nvm
path:E:\nvm\v10.16.3
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

settings.txt 最终效果（如果不存在 settings.txt，则需要在 nvm 根目录新建本添加）：

```txt
root: E:\nvm
path:E:\nvm\v10.16.3
arch: 64
proxy: none
originalpath:
originalversion:
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## Usage nvm

### nvm 参数的使用说明

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

### 常用命令

先查看当前版本列表：nvm list

接着查看线上版本：nvm list available

然后安装需求版本： nvm install 12.13.0

最后使用 nvm 指定 node 版本： nvm use 12.13.0

## nvm FAQS

---

1. windows 上安装 nvm 后选择 node 版本出现 exit status 1...

问题：nvm install x.x.x 可以成功，但无法切换和使用

原因：我把 nvm 安装到了有空格的路径上（D:\Program Files），导致切换失败

解决：把 nvm 卸载重装到没有空格的路径上（例如：D:\nvm），即可解决问题

---

2. nvm 在 Cmder 中不生效

原因就不需要解析了

解决：重启电脑后 或者重启命令工具后，即会生效。

---

3. 安装时出现 npm Download failed.

原因：

- 可能是 npm 镜像地址为国外，没有科学上网超时下载
- 可能设置[淘宝镜像](https://npm.taobao.org/mirrors/npm/)后，所下载 npm 版本（如：node:v12.13.1, npm:v6.12.1）在淘宝镜像不存在,因此需要手动安装

解决：

问题 1：只需设置淘宝镜像即可，[看上文](#修改代理)

问题 2 则需要如下步骤：

- 首先去 node 官网下载对应版本的 node
- 在 nvm 目录下创建名为 v12.13.1 的文件夹
- 点开 node-v**.**.\*.msi 的安装文件，将安装目录选为 nvm\v12.13.1\，然后一直 next 即可。
- 修改这个版本 npm 的缓存目录：npm config set prefix "你的 nvm 目录\v12.13.1\node_modules"

---

# npm 与 yarn

npm(node package manager)简单的说是一个面向 node 的包管理工具。其包的结构使您能够轻松跟踪依赖项和版本，使用 npm 可以轻松发布包、下载包。

npm 由三个独立的部分组成，

- 访问 npm 包的网站，如：https://www.npmjs.com/
- 注册表（registry）
- cli(开发者操作使用的工具)

因为在安装好 nodejs 或 nvm 后，npm 就已经被预设好了，所以喜欢使用 yarn 的小伙伴只需要按照 yarn 即可。

## install yarn

安装就不讲了，看教程即可：

- [window 用户下载](https://yarn.bootcss.com/docs/install/#windows-stable)，然后手残式安装

- [mac 安装](https://yarn.bootcss.com/docs/install/#mac-stable)

- [Ubuntu 安装](https://yarn.bootcss.com/docs/install/#debian-stable)

## Usage npm&yarn

### 初始化库步骤：

```bash
# npm
npm init -y
npm install webpack --save-dev

# yarn
yarn init -y
yarn add webpack --save-dev
```

### 查看模块

- 全局安装的所有模块

```bash
# npm
npm list -g
```

- 当前文件夹安装的所有模块

```bash
# npm
npm list
```

- 查看指定模块

```bash
# npm
npm list <packageName>
```

### npm 添加用户

资源库中注册用户（使用邮箱注册）

```bash
# npm
npm adduser
```

### 发布模块

```bash
# npm
npm publish --registry=https://registry.npmjs.org/
```

### 创建文件

```bash
touch
```

### 更新模块

---

npm 更新

```bash
# npm
npm update <packageName>
```

---

yarn 更新

- 下载 npm-check-updates
- yarn upgrade-interactive --latest（推荐）
- yarn upgrade package@version

```bash
// 先下载
yarn global add npm-check-updates
// 更新包（yarn.lock和package.json同步更新）
ncu --upgrade --upgradeAll && yarn upgrade

yarn upgrade-interactive --latest
// 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择

yarn upgrade package@version
// yarn.lock和package.json都会更新，但是会进行版本锁定 "echarts": "4.2.0-rc.2"
```

---

### 卸载安装

```bash
# npm
npm uninstall <packageName>

# yarn
yarn remove <packageName>
```

### 搜索模块

```bash
# npm
npm search <packageName>
```

### 安装包

根据参数选择安装模式：

- 添加-g 则为全局安装
- 添加 -D 或 --save-dev 则安装为工具包，该包不参加打包
- 添加 -S 或 --save 则安装为依赖包， 该包参加打包工具打包

```bash
# npm
npm install <packageName>
npm i <packageName>
npm i -g <packageName>
npm i -D <packageName>
npm i --save-dev <packageName>
npm i --save <packageName>

#yarn
yarn global add <packageName>
yarn add <packageName>
yarn add i -g <packageName>
yarn add i -D <packageName>
yarn add --save-dev <packageName>
yarn add --save <packageName>
```

如果出现以下错误： npm err! Error: connect ECONNREFUSED 127.0.0.1:8087

解决办法为：npm config set proxy null

- 局部安装

```bash
# npm
npm i --save  <packageName>
```

- 全局安装

全局安装的默认地址

```bash
# npm
npm i -g <packageName>
```

### 配置项

> 注意：如果修改了全局包文件夹目录位置(如修改后为 path_gloabl[D:\npm\node_global])，则需要在电脑环境变量 Path 上添加**path_gloabl**，

当使用 npm|yarn set config xxx xxx 后，磁盘的用户文件夹下会生成一个.npmrc|.yarnrc 的文件，以下操作或者可在文件夹：C:\Users\<Administrator> 上修改文件配置.npmrc

---

- 查看总配置列表

```bash
# npm
npm config ls
npm config list

# yarn
yarn config list
```

---

- 设置配置代理

用于设置代理协议，如：socks\http 等。

因为有些包是存在 http,有些在 socks（基本默认）

因此需要在特定情况下设置代理才能顺利下载包

```bash
# npm
# 有时候再设置代理后无法下载包，则需要清空代理
npm config set proxy null

# 基本代理设置
npm config set proxy http://[ip]:[port]
npm config set https-proxy http://[ip]:[port]

# 需要认证代理设置
npm config set proxy http://username:password@server:port
npm config set https-proxy http://username:pawword@server:port

# 清除代理设置
npm config delete proxy
npm config delete https-proxy
```

---

- 设置本地缓存文件夹和全局文件夹

在开发过程中，随着时间的推移，开发者可能会按照了很多全局包。因为全部包的默认目录一般在系统盘，因此可以跳转默认目录，也方便以后的管理。

缓存文件默认地址：C:\Users\Administrator\AppData\Roaming\npm-cache 全局包文件默认地址：C:\Users\Administrator\AppData\Roaming\npm\node_modules

npm config 允许使用 set\get 来设置或查看信息。如下：

```bash
# npm
# 设置缓存
npm config set cache "D:\npm\node_cache"
# 设置全局
npm config set prefix "D:\npm\node_global"
# 设置镜像源
npm config set registry "https://registry.npm.taobao.org"
# 查看缓存
npm config get cache
# 查看全局
npm config get prefix
# 查看镜像源
npm config get registry

# yarn
# 设置缓存
yarn config set cache "D:\npm\node_cache"
# 设置全局
yarn config set prefix "D:\npm\node_global"
# 设置镜像源
yarn config set registry "https://registry.npm.taobao.org"
# 查看缓存
yarn config get cache
# 查看全局
yarn config get prefix
# 查看镜像源
yarn config get registry
```

---

- 清除缓存

有时候缓存包会与安装包存在冲突，这种情况需要清除缓存处理

```bash
# npm
npm cache clean # npm@v5
npm cache verify # npm@v6
```

---

- 镜像设置

```bash
# npm
# 查看镜像：
npm config get registry
yarn config get registry

# 设置永久镜像，设置会被写入到.npmrc|.yarnrc文件：
npm config set registry http://registry.npm.taobao.org/
npm config set registry https://registry.npmjs.org/
yarn config set registry https://registry.npm.taobao.org/

# 设置临时镜像，只在本次命令使用
npm --registry https://registry.npm.taobao.org install <packageName>
yarn --registry https://registry.npm.taobao.org add <packageName>
```

---

- 常用镜像源地址有：

npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/

切换镜像源地址通过上述方式进行设置与查看，也可以直接使用**nrm 包**来设置，下面会讲到。

---

- 使用淘宝源时或者尝试 cnpm

安装 cnpm 包

```bash
# npm
npm install -g cnpm --registry=https://registry.npm.taobao.org/
cnpm install <packageName>
```

当使用 cnpm -v/cnpm -version 查看版本时提示“cnpm 命令提示不是内部或外部命令”

原因：本地系统没有添加 npm 模块的环境变量，所以不能识别命令。

解决： 将将全局安装目录 D:\npm\node_global 添加到环境变量

---

## npm|yarn FAQS

---

- 全局包运行时报错： SecurityError: (:) []，PSSecurityException

```
+ CategoryInfo          : SecurityError: (:) []，PSSecurityException
+ FullyQualifiedErrorId : UnauthorizedAccess
```

原因：Windows 下 PowerShell 默认的权限级别是 Restricted，不允许执行 PS 脚本（即.ps1 文件）。如果在 Restricted 权限级别下运行，会得到上述错误

解决：Set-ExecutionPolicy RemoteSigned -Scope process

科普 window 执行策略：

```bash
#更新执行策略
Set-ExecutionPolicy <policy-name>

#policy-name可能的值
Unrestricted、RemoteSigned、AllSigned、Restricted、Default、Bypass、Undefined

#将ExecutionPolicy改为Unrestricted，可以运行未签名的脚本
Set-ExecutionPolicy Unrestricted

#查询详细策略
get-help about_Execution_Policise

```

---

- node-sass 安装错误

首先要排除 node-sass 版本是否与你安装的 py2、py3 有冲突，如果没冲突则做下面操作。

排除 py 问题，一般都是国内网络不稳定的问题了。

那么我们有几种常用方法：

1. 设置特定包的淘宝源：

```bash
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/
npm config set registry=https://registry.npm.taobao.org
```

上述操作可以在使用 npm install 安装 node-sass、electron 和 phantomjs 时都能自动从淘宝源上下载。

2. 使用 cnpm 淘宝源下载

```bash
npm install -g cnpm
cnpm install
```

3. 使用 VPN

```bash
npm config set proxy (http://127.0.0.1:1080)此处是 VPN 的代理地址
npm i node-sass

#下载完成后删除 http 代理
npm config delete proxy
```

---

# nrm

nrm(npm registry manager )是 npm 的镜像源管理工具，有时候国外资源太慢，那么我们可以用这个来切换镜像源。

## install nrm

```bash
npm install -g nrm
```

## Usage nrm

```bash
# 查看可使用镜像源
#   npm -------- https://registry.npmjs.org/
#   yarn ------- https://registry.yarnpkg.com/
#   cnpm ------- http://r.cnpmjs.org/
# * taobao ----- https://registry.npm.taobao.org/
#   nj --------- https://registry.nodejitsu.com/
#   npmMirror -- https://skimdb.npmjs.com/registry/
#   edunpm ----- http://registry.enpmjs.org/
nrm ls
# 切换镜像源
nrm use <url>
```

# 参考链接

- [nvm](https://github.com/nvm-sh/nvm)
- [淘宝源](https://developer.aliyun.com/mirror/NPM?from=tnpm)
- [Yarn 文档](https://yarn.bootcss.com/)
- [npm 文档](https://www.npmjs.cn/)
- Practice
