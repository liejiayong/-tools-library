/*
 *  personal private function tools
 * */

/*
 * An Array of relevant
 * use for loop
 * */
Array.prototype.arrUnique_for = function () {
    let res = [this[0]];
    let flag = false;
    for (let i = 1; i < this.length; i++) {
        for (let j = 0; j < res.length; j++) {
            if (this[i] === res[j]) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            res.push(this[i]);
        }
        flag = false;
    }
    return res;
}

/*
 *  An array of relevant
 *  use array sort and judge
 *
 * */
Array.prototype.arrUnique_sort = function () {
    this.sort();
    let res = [this[0]];
    for (let i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
}

/*
 *  An array of relevant
 *  create a new array and create a new object ,compare then
 *
 * */

Array.prototype.arrUnique_aco = function () {
    let res = [];
    let json = {};
    for (let i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

/*
 *  An array of relevant
 *  use indexOf iterate ,if res==-1 and return
 *
 * */

Array.prototype.arrUnique_indexof = function () {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (res.indexOf(this[i]) === -1) res.push(this[i]);
    }
    return res;

}

/*
 *  An array of relevant
 *  use indexOf iterate,if res index == i
 *
 * */

Array.prototype.arrUnique_indexof_index = function () {
    let res = [this[0]];
    for (let i = 1; i < this.length; i++) {
        if (this.indexOf(this[i]) === i) {
            res.push(this[i]);
        }
    }
    return res;
}

/*
 * indexOf兼容
 * */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (val) {
        let res = -1, len = this.length;
        if (len === 0) {
            return res;
        }
        for (let i = 0; i < len; i++) {
            if (this[i] === val) {
                res = i;
                break;
            }
        }
        return res;
    }
}

/*
 *  An array of relevant
 *  优化遍历数组法
 *
 * */

Array.prototype.arrUnique_optimize = function () {
    let res = [], len = this.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (this[i] === this[j]) j = ++i;
        }
        res.push(this[i])
    }
    return res;
}

function unique5(array){
    var r = [];
    for(var i = 0, l = array.length; i < l; i++) {
        for(var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}


// 利用es6的set() 构造器去重

function setFun(arr){
     let s = new Set();
     arr.forEach((item) => {
        s.add(item);
     });
     return s;
}