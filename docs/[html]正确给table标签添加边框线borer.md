---
title: 正确给table标签添加边框线borer
date: 2020-12-31
categories:
  - html
  - css
tags:
  - html
  - css
  - html-border
# keys:
#   - 'password'
# sticky: 1
publish: true
isTimeLine: true
sidebar: 'auto'
isComment: true
---

## 前言

曾经以为 HTML-table 这块没啥要总结的，直到在某次移动端专题测试中碰到了一个小 table-bug，我再次意识到越是基础越要牢固的重要性。那是一个移动端项目，使用的是 rem 适配方案，是在 iphone11 碰到 boder 线条或显示不全或定义线条颜色后有些线条任然是黑色的问题。在解决了问题之后，我决定要总结，让自己牢固知识，为他人轻易绕过去。

## 总结在前

推荐直接使用下面方法来给 table 添加 border 样式。

```html
<style>
  .table-norm {
    margin: 0 auto;
    padding: 2px;
    width: 200px;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    &,
    & tr th,
    & tr td {
      border: 1px solid red;
    }
  }
</style>
<table class="table-norm">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

## 基础回顾

> 查看 [MDN-table 文档-2021](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table)后，你会发现 HTML-table 的**大部分属性**在标准 HTML 规范上**已废弃**，为了让代码对以后的开发产生不必要的问题，**建议不要使用 table 内联属性来定义样式，改用为 css 设置样式**

下面记录几个在实际开发中常用的

- align：left|center|right。指定了包含在文档中的表格必须如何对齐。

  - **不要使用这个属性，它已经不赞成被使用。**

  - 推荐使用 css 设置 margin: 0 auto 来实现类似于 align 属性的效果。

- border：定义了表格单元的内容和边框之间的空间。

  - **不要使用这个属性, 该属性已废弃，建议使用 css 给 table 添加 border**

  - border="1"：将整个 table(包括表格及每一个单元格)加上 1 像素的黑色边框;其等同于 css 设置 table,table tr th,table tr td {border: 1px solid red;}

- cellpadding：默认值为 1px。定义了表格单元的内容和边框之间的空间。如果它是一个像素长度单位，这个像素将被应用到所有的四个侧边；如果它是一个百分比的长度单位，内容将被作为中心，总的垂直（上和下）长度将代表这个百分比。这同样适用于总的水平（左和右）空间。

  - **不要使用这个属性, 该属性已废弃，建议使用 css 给 table 添加 border**

  - cellpadding="0"：将 table 单元格内边距等于 0px;其等同于 css 设置{padding：0;}

- cellspacing：其默认值为 2px。定义了两个单元格之间空间的大小（从水平和垂直方向上），包括了表格的顶部与第一行的单元格，表的左边与第一列单元格，表的右边与最后一列的单元格，表的底部与最后一行单元格之间的空间。

  - **不要使用这个属性, 该属性已废弃，建议使用 css 给 table 添加 border**

  - cellspacing="0"：将 table 单元格间距等于 0。

## 细节浅谈

下面会通过实践方式来引出问题

- [点击在线查看下面源码效果](https://codepen.io/liejiayong/pen/ZEpdXbV)

### 直接通过 table 属性来设置 border

当直接通过 border="1"来设置 table border 时，table 会显示为一个带默认黑色的线条，且单元格之间、单元格内容与单元格边框间存在默认间隙。如下：

```html
<table border="1">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

如果需要一个没有单元格边线间没有间隙的 table，可以如下：

```html
<table border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

但是上述的表格会存在一定的问题。因为虽然 cellspacing="0"设置了单元格间的间隔为 0，但是由于设置了 border="1"使得每个单元格拥有边线，以至于单元格间虽然没有空隙但是都存在自身的边线，相邻单元格边线叠加会造成**边线加粗**的问题，因此仍需要在 css 定义边框线合并 border-collapse: collapse 来排除边线叠加加粗的问题。因此上述问题优化如下：

```html
<style>
  table {
    border-collapse: collapse;
  }
</style>
<table border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

经过一番猛如虎的操作后一个正常带边线无单元格边距与单元格内容间隙的 table 就大功告成了。

接下来我们来搞一下不一样。在实际开发中需求不仅有带黑色边框线的 情况，还有带其他颜色边框线的情况。在需要修改边框线颜色的时候，需要将 boder-color 设置需要的颜色，如下：

```html
<style>
  .table-red {
    text-align: center;
    border-collapse: collapse;
    border-color: red;
  }
</style>
<table border="1" cellspacing="0" cellpadding="0" class="table-red">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

将代码放在不同的浏览器上，你可以清晰看见不同浏览器所解析边框不同，但是其实他们是一样的。他们同时都给边框加了颜色，但是由于我们 td 和 th 默认有一个默认的颜色，而我们这里没有给他们添加样式去覆盖默认的黑色线条，而导致了一些浏览器如火狐中出现只有外边框线改变颜色里面单元格边线任然是默认黑色的情况，其实这个情况在谷歌中也有，只是不明显，其解析的黑色默认线条被我们的颜色盖在了上面，你如果仔细查看还是会发现有黑色边条出现，同时在实际开发中这种情况尤其是**在 iphone11 上尤为明显**，这个时候我们只需要给 th 和 td 加上颜色样式即可， 如下：

```html
<style>
  .table-red-adv {
    text-align: center;
    border-collapse: collapse;
    border-color: red;
    & tr th,
    & tr td {
      border-border: red;
    }
  }
</style>
<table border="1" cellspacing="0" cellpadding="0" class="table-red-adv">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

## table 设置 border 的标准写法

实践到这里你是否觉得已经大功告成了？ 请别着急，问题任然存在。我来给你分析一下问题所在：

- 上面已经提到了如果在 table 上设置了属性 border="1"的时候，浏览器会在 table 上描绘 1px 的黑色边线。如果你需要改变边框颜色的时候，需要重新在 css 设置 table,table tr th,table tr td{border-color:red;}指定颜色。然后浏览器会在默认 1px 的黑色边线上面再描绘 1px 你设置的红色边线来进行覆盖，这样子是视觉上就会呈现出我们需要的颜色边线。但是这样子会存在缺陷，只要你足够细心，在分辨率不错的屏幕上，尤其是在高分辨率的移动端 retina 屏幕上，你会发现红色边线下有淡淡的黑色边线，这也是覆盖 boder 的一大弊端，因此在此我建议**不要混用 css 设置边线与 border 属性设置边线，css 与属性二选一设置边线。当然官方已经弃用 border 属性设置边线的情况，因此只需使用 css 来设置边线**。如下：

```html
<style>
  .table-norm {
    margin: 0 auto;
    padding: 2px;
    width: 200px;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    &,
    & tr th,
    & tr td {
      border: 1px solid red;
    }
  }
</style>
<table class="table-norm">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

## 方案

经过上面一步步的探究可以得知：table 上 border 属性与 css 设置 border 会产生冲突。

冲突原因是因为属性设置 border 样式与 css 设置 border 样式都会使得浏览器进行一次样式对比然后在屏幕上绘制样式的情况，也就是浏览器样式重绘。浏览器重绘是代码架构组织不严谨的表现，重绘也会一定程度的损耗浏览器性能，因此要避免重绘的发生。

鉴于实践需求给出如下方案：

- 只需绘制黑色边框的情况可以使用内联属性 border="1"。

鉴于标准 HTML 规范上**已废弃**，并且个人觉得又是设置 border、cellspacing、cellpadding，又要写 css 样式就显得写法有点多余累赘，因此不推荐使用。

```html
<style>
  .table-default {
    margin: 10px auto;
    padding: 2px;
    width: 200px;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
  }
</style>
<table border="1" cellspacing="0" cellpadding="0" class="table-default">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

- **（推荐使用）** 只用 css 设置样式，适用于一切情景

```html
<style>
  .table-norm {
    margin: 0 auto;
    padding: 2px;
    width: 200px;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    &,
    & tr th,
    & tr td {
      border: 1px solid red;
    }
  }
</style>
<table class="table-norm">
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
    <td>内容</td>
  </tr>
</table>
```

经此总结，我发现有时候我都误用了表格边框的使用，我们只需要在上述方案上二选一即可避免由误用产生诸多问题。

要养成良好的编码习惯，使用推荐方案就没错啦~
