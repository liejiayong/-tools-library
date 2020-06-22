/**
 * 用于文本输入栏，将符号替换成转义字符
 * @param {String} str 
 */
export const escapeHTML = str =>
  str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag))

/**
 * 用于文本输入栏，将符号替换成转义字符
 * @param {String} str 
 */
export const unescapeHTML = str =>
  str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, tag => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': "'",
    '&quot;': '"'
  }[tag] || tag));

