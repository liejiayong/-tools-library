const selfSort = {
    /**
     * 冒泡排序：循环内每个元素逐个对比
     * 最快效率：O(n2)，最慢效率：O(n2)
     * @param {*} arr 
     */
    bubble: function (arr = []) {
        for (let i = 0, len = arr.length; i < len; i++) {
            for (let j = 1, len = arr.length; j < len; j++) {
                if (arr[i] < arr[j]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    },
    /**
     * 插入排序：
     * @param {*} arr 
     */
    insert(arr = []) {
        for (let i = 1, len = arr.length; i < len; i++) {
            let j = i - 1;
            let temp = arr[i];
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j = j - 1;
                console.log(i, j, arr)
            }
            arr[j + 1] = temp;
        }
        return arr;
    },
    // 快排
    quick(arr = []) {
        return arr;
    }
}

