const { gridConfig } = require('../config/components/grid-config')
const { listviewConfig } = require('../config/components/listview-config')
const { navigateTo } = require('../utils/util')

// 初始化grid count
const initialGridCount = (target = [], src = []) => {
    if (target.length === 0 && src.length === 0) return
    target.forEach(t => {
        src.forEach(s => {
            if (t.name === s.name) {
                t.count = s.count
            }
        })
    })
}

// 跳转grid路由页面
const gridNavigateTo = (type, id) => {
    const url = `${gridConfig[type].routeLink}?userid=${id}`
    if (url) navigateTo(url)
}

// 跳转listview路由页面
const listviewNavigateTo = (type, id) => {
    const url = `${listviewConfig[type].routeLink}?userid=${id}`
    if (url) navigateTo(url)
}

module.exports = {
    initialGridCount,
    gridNavigateTo,
    listviewNavigateTo
}
