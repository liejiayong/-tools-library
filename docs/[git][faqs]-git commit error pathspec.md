## git commit error:pathspec 问题

- terminal：
  - window7

### 解决问题

在一次提交日志时，git 报出错误如下：

```git
error: pathspec 'xxx' did not match any file(s) known to git.
```

在一系列检查后将问题定位在 git commit 时提交的信息上。

复现错误操作：

```git
git commit -m 'xxx'

git commit -m ‘xxx’
```

接着解决问题，将单引号中文引号改为双引号：

```git
git commit -m "xxx"
```

好，问题解决，开始划重点。

本次 git commit 报错的主要问题在引号这块，然鹅，在 linux 和 window 上，引号的表现都是不一样的。

### 引号


