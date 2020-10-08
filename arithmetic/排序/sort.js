const selfSort = {
    arr: [8, 1, 2, 5, 3, 4, 7, 9, 6, 10],
    /**
     * 冒泡排序：循环内每个元素逐个对比
     * 最快效率：O(n2)，最慢效率：O(n2)
     * @param {*} arr 
     */
    bubble: function (arr = this.arr || []) {
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
    insert(arr = this.arr || []) {
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
    quick(arr = this.arr || []) {
        return arr;
    },
    mergetep(arr = this.arr || []) {
        const len = arr.length;
        if (len > 1) {
            // 对半分解
            const middle = Math.floor(len / 2);
            const left = arr.slice(0, middle);
            const right = arr.slice(middle, len);
            let i = 0;
            let j = 0;
            let k = 0;
            // 分别对左右进行排序
            this.mergeSort(left);
            this.mergeSort(right);
            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) {
                    arr[k] = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    j++;
                }
                k++;
            }
            // 检查余项
            while (i < left.length) {
                arr[k] = left[i];
                i++;
                k++;
            }
            while (j < right.length) {
                arr[k] = right[j];
                j++;
                k++;
            }
        }
        return arr
    }
}

