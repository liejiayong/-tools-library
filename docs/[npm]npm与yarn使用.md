---
title: [npm]npm与yarn使用
---

> 持续整理中

## 初始化库步骤：

```bash
npm init -y
npm install webpack --save-dev
```

## 查看模块

### 全局安装的所有模块

```bash
npm list -g
```

### 当前文件夹安装的所有模块

```bash
npm list
```

### 查看指定模块

```bash
npm list <packageName>
```

## npm 的配置项

### 查看配置列表

```bash
npm config ls
npm config list
```

### 设置缓存文件夹

缓存文件默认地址：C:\Users\Administrator\AppData\Roaming\npm-cache
全局包文件默认地址：C:\Users\Administrator\AppData\Roaming\npm\node_modules

```bash
# 设置缓存
npm config set cache "D:\npm\node_cache"
# 设置全局
npm config set prefix "D:\npm\node_global"
```

### 设置配置代理

```bash
npm config set proxy null
npm config set proxy <url>
```

### npm 添加用户

资源库中注册用户（使用邮箱注册）

```bash
npm adduser
```

## 发布模块

```bash
npm publish
```

## 创建文件

```bash
touch
```

## 更新模块

### npm 更新

```bash
npm update <packageName>

```

### yarn 更新

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

## 卸载安装

```bash
npm uninstall <packageName>
```

## 搜索模块

```bash
npm search <packageName>
```

## 安装包

根据参数选择安装模式：

- 添加-g 则为全局安装
- 添加 -D 或 --save-dev 则安装为工具包，该包不参加打包
- 添加 -S 或 --save 则安装为依赖包， 该包参加打包工具打包

```bash
npm install <packageName>
npm i <packageName>
npm i -g <packageName>
npm i -D <packageName>
npm i --save-dev <packageName>
npm i --save <packageName>
```

如果出现以下错误：
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087

解决办法为：npm config set proxy null

## 局部安装

```bash
npm i --save  <packageName>
```

## 全局安装

全局安装的默认地址

```bash
npm i -g <packageName>
```

## 缓存

### 清除缓存

```bash
npm cache clean
```

### 设置缓存文件夹

缓存文件默认地址：C:\Users\Administrator\AppData\Roaming\npm-cache
全局包文件默认地址：C:\Users\Administrator\AppData\Roaming\npm\node_modules

```bash
# 设置缓存
npm config set cache "D:\npm\node_cache"
# 设置全局
npm config set prefix "D:\npm\node_global"
```

或者可在文件夹：C:\Users\Administrator 上修改文件配置.npmrc

> 注意：如果修改了全局包文件夹目录位置，则需要在电脑环境变量 Path 上添加，**全局安装目录 D:\npm\node_global**

## npm 镜像

### 查看当前镜像：

npm config get registry

```bash
npm config get registry
yarn config get registry
```

### 设置永久镜像源：

npm config set registry

```bash
npm config set registry http://registry.npm.taobao.org/
npm config set registry https://registry.npmjs.org/
yarn config set registry https://registry.npm.taobao.org/
```

### 使用淘宝源时或者尝试 cnpm

安装 cnpm 包

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org/
cnpm install <packageName>
```

当使用 cnpm -v/cnpm -version 查看版本时提示“cnpm 命令提示不是内部或外部命令”

原因：本地系统没有添加 npm 模块的环境变量，所以不能识别命令。

解决： 将将全局安装目录 D:\npm\node_global 添加到环境变量

### 设置临时镜像:

npm --registry

```bash
npm --registry https://registry.npm.taobao.org install <packageName>
yarn --registry https://registry.npm.taobao.org add <packageName>
```

## FAQS

### 全局包运行是报错： SecurityError: (:) []，PSSecurityException

```

+ CategoryInfo          : SecurityError: (:) []，PSSecurityException
+ FullyQualifiedErrorId : UnauthorizedAccess

```

原因：Windows 下 PowerShell 默认的权限级别是 Restricted，不允许执行 PS 脚本（即.ps1 文件）。如果在 Restricted 权限级别下运行，会得到上述错误

解决：Set-ExecutionPolicy RemoteSigned -Scope process

- 科普 window 执行策略：

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
