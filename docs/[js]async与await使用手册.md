## 循环中的 async

在一次项目中使用 async 函数来循环遍历数组，再将数据分别上传到服务器上，于是撸起袖子就是干。

过了一会测试发现通过 forEach 或 map 来套用 async 函数进行循环时，上传接口数据会有重复覆盖的情况，这是因为 forEach\map 本身就是就是异步函数

```js
let list = [1, 2, 3, 4, 5, 6]

function fun(item) {
  //这里其实是调用接口，所以时间完全无法把握
  return item
}
async function go1() {
  list.forEach(async (item) => {
    console.log(item)
    let item1 = await fun(item)
    console.log(item1)
  })
  //加上这句话
  console.log("done")
}
go1() // 输出 done 1 2 3 4 5 6
```

> 从运行结果中，可以看出，代码没有等待 forEach 方法执行结束，而是直接继续往后执行了。回调函数传进去之后，2 秒钟之后才会返回数据，这不是我们想要的结果，我现在是希望它能顺序的执行。

于是查找了下文档发现

```js
let list = [1, 2, 3, 4, 5, 6]

function fun(item) {
  //这里其实是调用接口，所以时间完全无法把握
  return item
}
async function go2() {
  for (let item of list) {
    let item1 = await fun(item)
    console.log(item1)
  }
  console.log("done")
}
go2() // 输出  1 2 3 4 5 6 done
```

> 按照上述代码的打印结果分析，for 循环内的代码，每一次都会等当前的 fun 方法返回了内容之后，才会继续下一个循环，循环全部结束的时候，才会跑 for 循环下面的代码，这是我们想要的结果，nice。

**结论**

- for 循环内使用 async 和 await 还是可以的，稳如老狗
- 不要在 forEach 方法内使用 async、await，尽量避免这种写法，坑啊。。。
