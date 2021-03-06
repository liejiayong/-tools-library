# H5 键盘兼容性小结

在 H5 项目中，我们会经常遇到页面中存在单个甚至多个 input/textarea 输入框与底部固定元素的布局情况。在 input/textarea 输入框获取焦点时，会自动触发键盘弹起，而键盘弹出在 ios 与 android 的 webview 中表现并非一致，同时当我们主动触发键盘收起时也同样存在差异化。而无论如何，我们希望功能流畅的同时，尽量保持用户体验的一致性，因此有了下面一系列兼容性问题的研究。

## 键盘弹出的不同表现

+ IOS：触发键盘上的按钮收起键盘或者输入框以外的页面区域时，输入框会失去焦点，因此会触发输入框的 blur 事件。
+ Android: 触发键盘上的按钮收起键盘时，输入框并不会失去焦点，因此不会触发页面的 blur 事件；触发输入框以外的区域时，输入框会失去焦点，触发输入框的 blur 事件。

## 监听键盘的弹出与收起

在 h5 中目前没有接口可以直接监听键盘事件，但我们可以通过分析键盘弹出、收起的触发过程及表现形式，来判断键盘是弹出还是收起的状态。

+ 键盘弹出：输入框获取焦点时会自动触发键盘的弹起动作，因此，我们可以监听输入框的 focus 事件，在里面实现键盘弹出后所需的页面逻辑。这在 ios 及 android 中表现一致。
+ 键盘收起：从第 2 部分可知，触发键盘收起的不同形式会存在差异化表现，当触发其他页面区域收起键盘时，我们可以监听输入框的 blur 事件，在里面实现键盘收起后所需的页面逻辑。而在通过键盘按钮收起键盘时在 ios 与 android 端存在差异化表现，下面具体分析：
  + IOS：触发了输入框 blur 事件，仍然通过该办法监听。
  + Android：没有触发输入框的 blur 事件。但通过第 1、2 部分我们可以知道，在 android 中，键盘的状态切换（弹出、收起）不仅和输入框关联，同时还会影响到 webview 高度的变化，那我们不妨通过监听 webview height 的变化来判断键盘是否收起。

## 小结

在 ios 中，无论何种布局，为了使输入框展示在可视区域中，键盘弹出时，页面会向上滚动，该过程与 Element.scrollIntoViewIfNeeded() 方法（将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域）产生的效果一致；且高度始终不变，页面可滚动。

在 android 中，键盘唤起后，页面可滚动与否由其处在正常文档流中的元素决定：如果正常文档流中的元素可全量展示，页面不可滚动，否则页面支持滚动；

在 android 中，键盘唤起后，fixed 元素的基准会发生变化：根据 bottom 定位的元素，其基线变为键盘上部；根据 top 定位的元素，仍然根据页面顶部，因此为照顾正常文档流及 fixed 元素的用户体验，有的元素可根据顶部定位，有的可以根据底部定位。

在了解清楚 h5 中键盘的弹出收起的性质后，在处理兼容性问题会容易很多。同时也可使用Element.scrollIntoViewIfNeeded() 方法辅助解决问题（比如在切换不同的输入法时，可能导致有用信息被遮挡的情况）优化体验。
 