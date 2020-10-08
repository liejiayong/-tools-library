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

建议：

- 在 Linux 系统中，commit 信息使用单引号包括
- windows 系统，commit 信息使用双引号

### 科普引号

> meta：元字符；关闭：去除特殊含义；

引号的种类：

- 单引号：为了保护文字不被转换。就是说除去单引号外, 在单引号内的所有文字都是原样输出。
- 双引号：为了包含文字或者函数段。除了本身,反引号内的函数,\$开头的变量和\开头反转换的字符外, 其余都是直接输出。
- 反引号：为了在双引号内保持函数转换. 但单引号内其无作用。

反斜杆：有时候，我们想让通配符，或者元字符变成普通字符，不需要使用它的转义含义。那么这里我们就需要用到转义符了。 shell 提供转义符有三种。

在 bash 中，常用的 quoting 有如下三种方法：

- hard quote：' ' (单引号)，也叫硬转义。在 hard quote 中所有 shell 字符的**meta**和**通配符**均被关闭。
- soft quote： " " (双引号)，也叫软转义。在 soft quote 中允许出现特定的 meta，大部份 meta 都会被关闭，但\$(用于参数替换`用于命令替代)则保留。
- escape ：\ (反斜杆)，也叫转义符。紧接在 escape 之后的**单一 meta**和**通配符** 会被关闭。\后跟的是非元字符，与没有加\的效果一样。

```
echo '\A' 和echo "\A" 的输出都是 \A
echo \A 的输出却是A
```
