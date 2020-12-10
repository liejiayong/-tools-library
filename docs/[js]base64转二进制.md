---
title: base64转二进制
---

## base64 编码规则

- 把 3 个字符变成 4 个字符。
- 每 76 个字符加一个换行符。
- 最后的结束符也要处理。

转换前: 11111101, 11111111, 11111111 （二进制）

转换后: 00111111, 00011111, 00111111, 00111111 （二进制，因为 base64 只需要 6 位就能满足，但是一个字节是 8 位，所以多出来 2 个没用的 0）

要转回 2 进制，就需要把那前面的 00 砍掉 并且让后面的数据接上来。

## 转码方式

### toString(2)转换成 2 进制字符串

使用 toString(2)转换成 2 进制字符串，再进行拼接，但是二进制数据太多，直接操作内存会快很多，所以不再使用字符串。

### 通过 base64 编码表转换

```js
// base64编码表
const map = {
  0: 52,
  1: 53,
  2: 54,
  3: 55,
  4: 56,
  5: 57,
  6: 58,
  7: 59,
  8: 60,
  9: 61,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  a: 26,
  b: 27,
  c: 28,
  d: 29,
  e: 30,
  f: 31,
  g: 32,
  h: 33,
  i: 34,
  j: 35,
  k: 36,
  l: 37,
  m: 38,
  n: 39,
  o: 40,
  p: 41,
  q: 42,
  r: 43,
  s: 44,
  t: 45,
  u: 46,
  v: 47,
  w: 48,
  x: 49,
  y: 50,
  z: 51,
  '+': 62,
  '/': 63,
};

function base64to2(base64) {
  let len = base64.length * 0.75; // 转换为int8array所需长度
  base64 = base64.replace(/=*$/, ''); // 去掉=号（占位的）

  const int8 = new Int8Array(len); //设置int8array视图
  let arr1,
    arr2,
    arr3,
    arr4,
    p = 0;

  for (let i = 0; i < base64.length; i += 4) {
    arr1 = map[base64[i]]; // 每次循环 都将base644个字节转换为3个int8array直接
    arr2 = map[base64[i + 1]];
    arr3 = map[base64[i + 2]];
    arr4 = map[base64[i + 3]];
    // 假设数据arr 数据 00101011 00101111 00110011 00110001
    int8[p++] = (arr1 << 2) | (arr2 >> 4);
    // 上面的操作 arr1向左边移动2位 变为10101100
    // arr2 向右移动4位：00000010
    // | 为'与'操作: 10101110
    int8[p++] = (arr2 << 4) | (arr3 >> 2);
    int8[p++] = (arr3 << 6) | arr4;
  }
  return int8;
}
```

### 转成 Blob

```js
function base64toBlob(base64, type) {
  // 将base64转为Unicode规则编码
  (bstr = atob(base64, type)), (n = bstr.length), (u8arr = new Uint8Array(n));
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 转换编码后才可以使用charCodeAt 找到Unicode编码
  }
  return new Blob([u8arr], {
    type,
  });
}

// base64图片转blob
function base64ToBlob(base64) {
	var arr = base64.split(',');
	var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
	// 去掉url的头，并转化为byte
	var bytes = window.atob(arr[1]);
	// 处理异常,将ascii码小于0的转换为大于0
	var ab = new ArrayBuffer(bytes.length);
	// 生成视图（直接针对内存）：8位无符号整数，长度1个字节
	var ia = new Uint8Array(ab);

	for (var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}

	return new Blob([ab], {
		type: mime
	});

```
