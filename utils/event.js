/**
 * 由于比闭包的特性（一个函数可以访问另一个函数作用域上的变量），只要闭包里面的变量存在被引用，那么它占用的内存无法被回收。
 * 
 * eventTemplateError作为一个元素处理事件的闭包，而这个闭包也创建了一个循环引用。
 * 由于匿名函数保存一对eventTemplateError()函数的引用，因此导致无法减少$dom的引用次数。
 * 只要匿名函数存在，$dom的引用永远大于1，因此它占用的内存无法被回收
 */
function eventTemplateError(id) {
  var $dom = document.querySelector(id)
  $dom.onclick = function () {
    console.log($dom.className)
  }
}

/**
 * 上述函数的改进方法是：将$dom需要被引用的className用变量保存下来
 * 在注册好事件后释放对$dom的引用，这样就能减少$dom的引用数，确保正常回收其占用内存
 * 避免内存泄露风险
 */
function eventTemplateRight(id) {
  var $dom = document.querySelector(id)
  var cls = $dom.className
  $dom.onclick = function () {
    console.log(cls)
  }
  $dom = null
}
