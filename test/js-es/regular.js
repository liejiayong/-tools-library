
/**
 * 正则匹配
 * 建议使用matchAll 替代 match
 * String.protype.matchAll
 *
 * 正则表达式捕获组:
 * 在 regex 中捕获组只是从 () 括号中提取一个模式，可以使用 /regex/.exec(string) 和string.match 捕捉组。
 * 常规捕获组是通过将模式包装在 (pattern) 中创建的，但是要在结果对象上创建 groups 属性，它是: (?<name>pattern)。
 * 要创建一个新的组名，只需在括号内附加 ?<name>，结果中，分组 (pattern) 匹配将成为 group.name，并附加到 match 对象，以下是一个实例：
 *
 *
 */

/**
 * 
 * match()
  有时候使用match进行匹配时会出现一些bug：
  如果你从这个正则表达式中删除 /g，
  你将永远在第一个结果上创建一个无限循环。这在过去是一个巨大的痛苦。
  想象一下，从某个数据库接收正则表达式时，
  你不确定它的末尾是否有 /g，你得先检查一下。
 * 
 */
const string = 'black*raven lime*parrot white*seagull'
const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/g
while ((match = regex.exec(string))) {
	let value = match[0]
	let index = match.index
	let input = match.input
	console.log(`${value} at ${index} with '${input}'`)
	console.log(match.groups.color)
	console.log(match.groups.bird)
}
// black*raven at 0 with 'black*raven lime*parrot white*seagull'
// black
// raven
// lime*parrot at 11 with 'black*raven lime*parrot white*seagull'
// lime
// parrot
// white*seagull at 23 with 'black*raven lime*parrot white*seagull'
// white
// seagull

/**
 * 
 * matchAll()
  - 在与捕获组一起使用时，它可以更加优雅,捕获组只是使用 () 提取模式的正则表达式的一部分。
  - 它返回一个迭代器而不是一个数组，迭代器本身是有用的。因此可以使用for...of来历遍数据
  - 迭代器可以使用扩展运算符 (…) 转换为数组。
  - 它避免了带有 /g 标志的正则表达式，当从数据库或外部源检索未知正则表达式并与陈旧的RegEx 对象一起使用时，它非常有用。
  - 使用 RegEx 对象创建的正则表达式不能使用点 (.) 操作符链接。
  - 高级: RegEx 对象更改跟踪最后匹配位置的内部 .lastindex 属性，这在复杂的情况下会造成严重破坏。
 * 
 */
const matchAllStr = 'black*raven lime*parrot white*seagull'
const matchAllReg = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/
for (const match of string.matchAll(matchAllReg)) {
	let value = match[0]
	let index = match.index
	let input = match.input
	console.log(`${value} at ${index} with '${input}'`)
	console.log(match.groups.color)
	console.log(match.groups.bird)
}
