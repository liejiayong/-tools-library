function getParam(params) {
  if (JSON.stringify(params) === '{}') return ''
  let url = ''
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      let value = params[k] !== undefined ? params[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
  }
  return url ? url.substring(1) : ''
}

function request(method, url, params, options) {
  const isGet = method === 'GET'
  if (isGet) url += (url.indexOf('?') < 0 ? '?' : '&') + getParam(params)

  const header = Object.assign({
    'content-type': 'application/x-www-form-urlencoded'
  }, options.header)

  return (resolve, reject) => {
    wx.request({
      url,
      data: isGet ? null : params,
      method,
      header,
      success: res => {resolve(res)},
      fail: err => {reject(err)}
    })
  }
}

const get = (url, params, options) => {
  return new Promise(request('GET', url, params, options))
}

const post = (url, params, options) => {
  return new Promise(request('POST', url, params, options))
}

module.exports = {
  request: request,
  getParam: getParam
}
