const selfSort = {
    // 插入排序
    insertSort (arr = []) {
        for (let i = 1, len = arr.length; i < len; i++) {
            let j = i - 1;
            let temp = arr[i];
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = temp;
        }
        return arr;
    },
    // 快排
    quickSort (arr = []) {
        return arr;
    }
}

