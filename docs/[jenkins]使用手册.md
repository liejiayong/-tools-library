---
title: [jenkins]使用手册
---

## 更改镜像源

当科学上网时，可更改国内镜像源Link：https://mirrors.tuna.tsinghua.edu.cn/jenkins/

修改方法：

- 从浏览器修更改

在页面打开系统管理>管理插件>高级，在 **升级站点** 上填写最新镜像源 *https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json* 再保存即可

- 从系统安装文件更改

以window为例，进入用户文件C:\Users\Administrator\.jenkins\updates，找到default.json，

然后将 *http://updates.jenkins-ci.org/download/plugins* 

更改为 *https://mirrors.tuna.tsinghua.edu.cn/jenkins/plugins*

保存即可

