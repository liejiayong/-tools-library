# WaterMark.js

A lightweight WaterMarks for html background

# Usage

## install

```bash

npm i ScreenOrient

```

## Example


```js
  const xScreen = new ScreenOrient()
  // 强制竖屏
  xScreen.lock({
    mode: 'portrait',
    $wrapper: document.getElementById('J_portrait'),
    zIndex: 302,
  })

  // 强制横屏
  xScreen.lock({
    mode: 'landscape',
    $wrapper: document.getElementById('J_landscape'),
    zIndex: 301,
  })

  // 横屏提示
  xScreen.inform({
    mode: 'landscape',
    id: 'J_landscapeTips',
  })

  // 竖屏提醒
  xScreen.inform({
    mode: 'portrait',
    id: 'J_portraitTips',
    text: '竖屏浏览体验更好喔！',
    logo: './img/portrait_logo.png'
  })

  // 屏幕翻转回调
  xScreen.onOrientationChange(orientation => {
    console.log('1', orientation)
  }, this)

  // 屏幕翻转回调
  xScreen.onOrientationChange(orientation => {
    console.log('2', orientation)
  }, this)
```
