<<<<<<< HEAD
/*获取反色颜色编码*/
function negationColor(colorValue) {
    let len = colorValue.length;
    let negationColorValue;
    const halfOfValue = 125;

//            console.log(colorValue)
    if (len <= 3) {
        colorValue = parseInt(colorValue, 10)
        negationColorValue = colorValue > halfOfValue ? (colorValue - halfOfValue) : (colorValue + halfOfValue);
    }
    else if (len == 6) {

    }
    else if (len == 7) {
        let val = colorValue.substr(1, 7);
        let decVal = hexToRGB(val);
        let arr = decVal.split(',');

        decVal = arr.map(function (color) {
            color = color > halfOfValue ? color - halfOfValue : color + halfOfValue;
            return color;
        });
        negationColorValue = `rgb(${decVal})`;

    }

    return negationColorValue;
}

/*判断字符串部位数字返回报错，并显示在页面*/
function judgeValue(val, showSelector, rgbChangeColorShow) {
    if (regDigital(val) && parseInt(val, 10) < 256) {
        return regDigital(val)
    } else {
        showSelector.innerHTML = "请输入0到256之间的数字"
        rgbChangeColorShow.style.cssText = `background-color:#fff`;
    }
}

/*判断字符串全部为数字*/
function regDigital(val) {
    var valLen = val.length;
    var pattern = `\\d{${valLen}}`;
    var regExpObj = new RegExp(pattern, "g")
    var regFlag = regExpObj.test(val)
    if (regFlag) {
        return val;
    } else {
        return false;
    }
}

/*拼接为16进制字符串格式并返回*/
function appendToHexColor(r_value, g_value, b_value) {
    let r_value_Hex, g_value_Hex, b_value_Hex;
    let hexColor;
    r_value_Hex = eachRGBToHex(r_value);
    g_value_Hex = eachRGBToHex(g_value);
    b_value_Hex = eachRGBToHex(b_value);
    hexColor = `#${r_value_Hex}${g_value_Hex}${b_value_Hex}`;
    return hexColor;
}

/**
 * 检测符合1~255之间的数字，并返回16进制数字
 * @param str 输入10进制数字
 * @returns {*} 返回16进制数字
 */
function eachRGBToHex(str) {
    let num = parseInt(str, 10);
    const numRegExp = /\d{1,3}/g;
    const res = numRegExp.test(num);
    if (res && num >= 0 && num < 256) {
        num = num.toString(16);
        if (num.length < 2) {
            num = `0${num}`;
        }
        return num;
    }

}

/**
 * 将字符串16进制转换为10进制，返回指定string
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回16进制数的数组
 * */

function hexToRGB(str, sep) {
//            console.log("aa", str)
    let val = str + "";
    const numRegExp = /[0-9a-fA-F]{6,7}/g;
    const res = numRegExp.test(val);
    const splitLen = 2;
    const symbolFlag = val.search("#") < 0 ? 0 : 1;
    let hexString;
    let arr = [];
    if (res && !symbolFlag && val.length == 6) {
        arr = splitString(val, splitLen)
        hexString = mapHexToDec(arr);
        return hexString.join(sep);
    }
    else if (res && symbolFlag && val.length == 7) {
        val = val.substr(1, 6);
        arr = splitString(val, splitLen)
        hexString = mapHexToDec(arr);
        return hexString.join(sep);
    } else {
        return false;
    }
}

/**
 * 将数组值转化为16进制，返回数组
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回16进制数的数组
 * */

function mapHexToDec(arr) {
    let mapArr = [];
    mapArr = arr.map(function (val) {
        val = parseInt(val, 16);//string to number
        return val;
    })
    return mapArr;
}

function browserCopy(selector) {
    let content ;
    selector.select();
    content = document.execCommand('Copy');
    return content;
}

function copyToClipBoard(content) {
    window.clipboardData.setData("Text",content)
}

/**
 * 将字符串按照指定长度分割，返回数组
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回数组
 */
function splitString(str, splitLen) {
    const len = str.length;//字符串长度
    const level = Math.ceil(len / splitLen);//倍数长度
    const remainder = len % splitLen;//余数
    let arr = [];//返回的数组
    let newStr, start;
    let count = 1;//历遍计数器
    while (count <= level) {
        start = (count - 1) * splitLen;
        /*判断字符串长度求余不为零*/
        if (remainder !== 0 && count == level) {
            splitLen = remainder;
        }
        newStr = str.substr(start, splitLen);
        arr.push(newStr)
        count++;
    }
    return arr;
}

function querySel(ele) {
    return document.querySelector(ele)
=======
/*获取反色颜色编码*/
function negationColor(colorValue) {
    let len = colorValue.length;
    let negationColorValue;
    const halfOfValue = 125;

//            console.log(colorValue)
    if (len <= 3) {
        colorValue = parseInt(colorValue, 10)
        negationColorValue = colorValue > halfOfValue ? (colorValue - halfOfValue) : (colorValue + halfOfValue);
    }
    else if (len == 6) {

    }
    else if (len == 7) {
        let val = colorValue.substr(1, 7);
        let decVal = hexToRGB(val);
        let arr = decVal.split(',');

        decVal = arr.map(function (color) {
            color = color > halfOfValue ? color - halfOfValue : color + halfOfValue;
            return color;
        });
        negationColorValue = `rgb(${decVal})`;

    }

    return negationColorValue;
}

/*判断字符串部位数字返回报错，并显示在页面*/
function judgeValue(val, showSelector, rgbChangeColorShow) {
    if (regDigital(val) && parseInt(val, 10) < 256) {
        return regDigital(val)
    } else {
        showSelector.innerHTML = "请输入0到256之间的数字"
        rgbChangeColorShow.style.cssText = `background-color:#fff`;
    }
}

/*判断字符串全部为数字*/
function regDigital(val) {
    var valLen = val.length;
    var pattern = `\\d{${valLen}}`;
    var regExpObj = new RegExp(pattern, "g")
    var regFlag = regExpObj.test(val)
    if (regFlag) {
        return val;
    } else {
        return false;
    }
}

/*拼接为16进制字符串格式并返回*/
function appendToHexColor(r_value, g_value, b_value) {
    let r_value_Hex, g_value_Hex, b_value_Hex;
    let hexColor;
    r_value_Hex = eachRGBToHex(r_value);
    g_value_Hex = eachRGBToHex(g_value);
    b_value_Hex = eachRGBToHex(b_value);
    hexColor = `#${r_value_Hex}${g_value_Hex}${b_value_Hex}`;
    return hexColor;
}

/**
 * 检测符合1~255之间的数字，并返回16进制数字
 * @param str 输入10进制数字
 * @returns {*} 返回16进制数字
 */
function eachRGBToHex(str) {
    let num = parseInt(str, 10);
    const numRegExp = /\d{1,3}/g;
    const res = numRegExp.test(num);
    if (res && num >= 0 && num < 256) {
        num = num.toString(16);
        if (num.length < 2) {
            num = `0${num}`;
        }
        return num;
    }

}

/**
 * 将字符串16进制转换为10进制，返回指定string
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回16进制数的数组
 * */

function hexToRGB(str, sep) {
//            console.log("aa", str)
    let val = str + "";
    const numRegExp = /[0-9a-fA-F]{6,7}/g;
    const res = numRegExp.test(val);
    const splitLen = 2;
    const symbolFlag = val.search("#") < 0 ? 0 : 1;
    let hexString;
    let arr = [];
    if (res && !symbolFlag && val.length == 6) {
        arr = splitString(val, splitLen)
        hexString = mapHexToDec(arr);
        return hexString.join(sep);
    }
    else if (res && symbolFlag && val.length == 7) {
        val = val.substr(1, 6);
        arr = splitString(val, splitLen)
        hexString = mapHexToDec(arr);
        return hexString.join(sep);
    } else {
        return false;
    }
}

/**
 * 将数组值转化为16进制，返回数组
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回16进制数的数组
 * */

function mapHexToDec(arr) {
    let mapArr = [];
    mapArr = arr.map(function (val) {
        val = parseInt(val, 16);//string to number
        return val;
    })
    return mapArr;
}

function browserCopy(selector) {
    let content ;
    selector.select();
    content = document.execCommand('Copy');
    return content;
}

function copyToClipBoard(content) {
    window.clipboardData.setData("Text",content)
}

/**
 * 将字符串按照指定长度分割，返回数组
 * @param str 输入字符串
 * @param splitLen 每次分割字符串长度
 * @returns {Array} 返回数组
 */
function splitString(str, splitLen) {
    const len = str.length;//字符串长度
    const level = Math.ceil(len / splitLen);//倍数长度
    const remainder = len % splitLen;//余数
    let arr = [];//返回的数组
    let newStr, start;
    let count = 1;//历遍计数器
    while (count <= level) {
        start = (count - 1) * splitLen;
        /*判断字符串长度求余不为零*/
        if (remainder !== 0 && count == level) {
            splitLen = remainder;
        }
        newStr = str.substr(start, splitLen);
        arr.push(newStr)
        count++;
    }
    return arr;
}

function querySel(ele) {
    return document.querySelector(ele)
>>>>>>> d01da57dca517ea544fbda22fee24eb59db3616b
}