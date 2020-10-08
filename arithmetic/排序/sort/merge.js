/**
 * 并归排序
 * @param {[]} arr 
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2020-10-05 15:21:32
 */
function merge(arr = []) {
    var len = arr.length
    if (len < 2) {
        return arr
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle)

    return mergeSort(merge(left), merge(right))
}
function mergeSort(left = [], right = []) {
    var res = []

    // compare left and right 
    while (left.length && right.length) {
        if (left[0] > right[0]) {
            res.push(right.shift())
        } else {
            res.push(left.shift())
        }
    }

    // Check the remainder term of left
    while (left.length) {
        res.push(left.shift())
    }
    // Check the remainder term of right
    while (right.length) {
        res.push(right.shift(G))
    }

    return res
}
