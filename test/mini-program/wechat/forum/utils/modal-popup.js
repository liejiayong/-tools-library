// 按照type顺序返回数组
export const getNormalizeList = (src = {}) => {
    let ret = []
    for (let item of Object.values(src)) {
        ret.push(item)
    }
    ret = ret.sort((a, b) => a.type - b.type)
    return ret
}

// export const initialStatus = (list = []) => {
//     if (list.length === 0) return
//     return list.map(item => {
        
//     })
// }
