class Client {
  constructor(hubUrl) {
    this.hubUrl = hubUrl
    // 每个请求的 id 值，作为唯一标识（累加）
    this.id = 0
    // 所有请求消息数据映射（如：getItem、setItem）
    this._requests = {}
    // 获取 iframe window 对象
    this._iframeWin = this._createIframe(this.hubUrl).contentWindow
    this._initListener()
  }
  // 获取存储数据
  getItem(key, callback) {
    this._requestFn('getItem', {
      key,
      callback,
    })
  }
  // 更新存储数据 
  setItem(key, value, callback) {
    this._requestFn('setItem', {
      key,
      value,
      callback,
    })
  }
  _requestFn(method, { key, value, callback }) {
    // 发消息时，请求对象格式
    let req = {
      id: this.id++,
      method,
      key,
      value,
    }
    // 请求唯一标识 id 和回调函数的映射
    this._requests[req.id] = callback
    // 向 iframe “中转页面”发送消息
    this._iframeWin.postMessage(req, this.hubUrl)
  }
  // 初始化监听函数
  _initListener() {
    // 监听 iframe “中转页面”返回的消息
    window.addEventListener('message', (e) => {
      let { id, result } = e.data
      // 找到“中转页面”的消息对应的回调函数
      let currentCallback = this._requests[id]
      if (!currentCallback) return
      // 调用并返回数据
      currentCallback(result)
    })
  }
  // 创建 iframe 标签
  _createIframe(hubUrl) {
    const iframe = document.createElement('iframe')
    iframe.src = hubUrl
    iframe.style = 'display: none;'
    window.document.body.appendChild(iframe)
    return iframe
  }
}

class Hub {
  constructor() {
    this._initListener()
    this.map = {
      setItem: (key, value) => window.localStorage['setItem'](key, value),
      getItem: (key) => window.localStorage['getItem'](key),
    }
  }
  // 监听 client ifameWin.postMessage() 事件
  _initListener() {
    window.addEventListener('message', (e) => {
      let { method, key, value, id } = e.data
      console.log('message', e, '---',this.map[method])
      if (!this.map[method]) return;
      // 处理对应的存储方法
      let result = this.map[method](key, value)
      // 返回给当前 client 的数据
      let response = {
        id,
        result,
      }
      // 把获取的数据，发送给 client 窗口
      window.parent.postMessage(response, '*')
    })
  }
}
