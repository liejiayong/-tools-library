export function getPath(dir) {
  const path = require('path')
  const files = require.context(dir, false, /\.vue$/)
  const modules = {}
  files.keys().forEach(key => {
    const name = path.basename(key, '.vue')
    modules[name] = files(key).default || files(key)
  })
}
