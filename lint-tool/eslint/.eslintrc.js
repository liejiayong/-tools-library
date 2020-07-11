/**
 * *xxx 则xxx为默认选项
 * 使用版本：eslint@7.x.x
 * 
 */


module.exports = {
    "root": true, // 设置当前目录为父目录，权限最高
    "noInlineConfig": false, // 内联配置。true:关闭；false:开启
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "standard"
    ],
    "parser": "@typescript-eslint/parser", // *Espress | Babel-ESLint | @typescript-eslint/parser | esprima | ...
    "parserOptions": {
        "ecmaVersion": 11, // 3,*5, 6, 7, 8, 9, 10 or 11
        "sourceType": "module" // *script | module
        // 可选。an object indicating which additional language features you'd like to use
        , "ecmaFeatures": {
            "globalReturn": false, // allow return statements in the global scope
            "impliedStrict": true,  // enable global strict mode (if ecmaVersion is 5 or greater)
            "jsx": true
        }
    },
    "plugins": [
        "@typescript-eslint"
    ],
    // if only a kind of file, use rules
    // "rules": {
    // },
    // if To specify processors for a specific kind of files, use overrides
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "lint-md",
            "rules": {

            }
        },
        {
            "files": ["**/*.md/*.js"],
            "rules": {
                "strict": "off",
                // 强制行的最大长度 默认80个
                "max- len": ["error", { "code": 150, "tabWidth": 4, "comments": 80 }],
                // 变量引号
                "quotes": ["error", "single", { "allowTemplateLiterals": true }],
                // 缩进4个空格 swtich case缩进
                "indent": ["error", 2, { "SwitchCase": 1, "VariableDeclarator": 2 }],
                // 要求或禁止使用分号代替
                "semi": ["error", "never"],
                // 分号位置。first:写在换行开头；last:写在单词后面
                "semi-style": ["error", "last"],
                // 不允许非空数组里面有多余的空格
                "array-bracket-spacing": ["error", "never"],
                // 强制 getter 和 setter 在对象中成对出现
                "accessor-pairs": ["error", { "setWithoutGet": true, "getWithoutSet": true }],
                // 强制 要求箭头函数的箭头之前或之后有空格
                "arrow-spacing": [{ "before": true, "after": true }],
                // 块语句作用域中禁止使用var 先声明再在块里使用
                "block-scoped-var": "error",
                // 大括号风格要求
                "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
                // 对象属性中禁止使用空格 obj[foo ] obj[ 'foo']
                "computed-property-spacing": ["error", "never", { "enforceForClassMembers": true }],
                // 要求使用骆驼拼写法
                "camelcase": ["error", { properties: "always", "ignoreDestructuring": true }],
                // 对象字面量项尾不能有逗号
                "comma-dangle": ["error", "never"],
                // 逗号前后的空格
                "comma-spacing": ["error", { "before": false, "after": true }],
                // 设置this别名 that ,self ,me
                "consistent-this": ["error", "that"],
                // 要求 switch 语句中有 default 分支
                "default-case": "error",
                // 点号操作符应该和属性在同一行.property
                "dot-location": ["error", "property"],
                // 要求使用 === 和 !==  (比较两个字面量的 、 比较 typeof 的值 、与 null 进行比较 可以)
                "eqeqeq": ["error", "smart"],
                // 要求使用函数声明 而不是函数表达式 避免作用域提升
                "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
                // 强制块语句的最大可嵌套深度 最大4层
                "max-depth": ["error", 2],
                // 限制函数定义中最大参数个数 默认最多3个
                "max-params": ["error", 6],
                // 要求调用无参构造函数时带括号
                "new-parens": "error",
                // 禁止alert
                "no-alert": "error",
                // 禁止使用 Array 构造函数 因为容易全局层面被重写
                "no-array-constructor": "error",
                // 禁止位操作符
                "no-bitwise": "error",
                // 禁用 arguments.caller 或 arguments.callee
                "no-caller": "error",
                // 禁止箭头函数 中使用 三元表达式
                "no-confusing-arrow": "error",
                // console不禁用
                "no-console": "always",
                // 禁止使用看起来像除法的正则表达式
                "no-div-regex": "error",
                // 禁止debuuger 生产模式中
                "no-debugger": process.env.NODE_ENV !== 'production' ? "error" : "always",
                // 禁止一个模块 重复导入
                "no-duplicate-imports": "error",
                // 禁止 if 语句中 return 语句之后有 else 块
                "no-else-return": "error",
                // 禁止label
                "no-empty-label": "error",
                // 禁止空的块级代码
                "no-empty": "error",
                // 禁eval
                "no-eval": "error",
                // 禁止扩展原生对象
                "no-extend-native": "error",
                // 禁止不必要的函数绑定
                "no-extra-bind": "error",
                // 禁止冗余的括号
                "no-extra-parens": "error",
                // 禁止浮点小数 缩写写法 例如.3 、 2. =>  0.3 、2.0
                "no-floating-decimal": "error",
                // 禁止使用类似 eval() 的方法
                "no-implied-eval": "error",
                // 禁止使用内联注释
                "no-inline-comments": "error",
                // 禁用 __iterator__ 属性
                "no-iterator": "error",
                // 禁用不必要的嵌套块
                "no-lone-blocks": "error",
                // 禁止循环中存在函数
                "no-loop-func": "error",
                // 禁止 require 调用与普通变量声明混合使用
                "no-mixed-requires": "error",
                // 禁止使用嵌套的三元表达式
                "no-nested-ternary": "error",
                // 禁用Function构造函数 new Function()
                "no-new-func": "error",
                // 禁止使用 Object 构造函数 直接 var obj = {}
                "no-new-object": "error",
                // 禁止调用 require 时使用 new 操作符
                "no-new-require": "error",
                // 禁止原始包装实例 new String('abc') => String('abc')
                "no-new-wrappers": "error",
                // 禁止new实例后 不赋值
                "no-new": "error",
                // 禁止在字符串字面量中使用八进制转义序列
                "no-octal-escape": "error",
                // 当使用 _dirname 和 _filename 时不允许字符串拼接
                "no-path-concat": "error",
                // 禁用__proto__  正确: var a = Object.getPrototypeOf(obj);
                "no-proto": "error",
                // 禁用 Node.js 模块
                "no-restricted-modules": "error",
                // 禁止在 return 语句中使用赋值语句
                "no-return-assign": "error",
                // 禁止自身比较
                "no-self-compare": "error",
                // 禁止使用逗号运算符
                "no-sequences": "error",
                // 禁止赋值关键字
                "no-shadow-restricted-names": "error",
                // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
                "no-this-before-super": "error",
                // 禁止抛出字面量错误 throw "error";
                "no-throw-literal": "error",
                // 禁用行尾空白
                "no-trailing-spaces": "error",
                // 禁止将变量初始化为 undefined
                "no-undef-init": "error",
                // 禁止 更简单的可替代的 表达式时使用三元操作符 isYes = answer === 1 ? true : false;
                "no-unneeded-ternary": "error",
                // 禁止未使用过的表达式
                "no-unused-expressions": "error",
                // 禁止未使用过的变量
                "no-unused-vars": ["error", {
                    "vars": "all",
                    "args": "after-used" // 最后一个参数必须使用。如：一个函数有两个参数，你使用了第二个参数，ESLint 不会报警告。
                }],
                // 禁止定义前使用
                "no-use-before-define": "error",
                // 禁用不必要的 .call() 和 .apply()
                "no-useless-call": "error",
                // 禁止没有必要的字符拼接
                "no-useless-concat": "error",
                // 禁用 void 操作符
                "no-void": "error",
                // 要求对象字面量简写语法 es6 标准
                "object-shorthand": ["error", "always", { "avoidQuotes": true }],
                // 要求或禁止尽可能地简化赋值操作
                "operator-assignment": "error",
                // 强制操作符使用一致的换行符风格
                "operator-linebreak": ["error", "before"],
                // 要求使用 const 声明那些声明后不再被修改的变量
                "prefer-const": "error",
                // 建议使用扩展运算符而非.apply()
                "prefer-spread": "error",
                // parseInt必须带第二个参数
                "radix": "error",
                // 变量排序
                "sort-vars": ["error", { "ignoreCase": true }],
                // 要求正则表达式被包裹起来
                "wrap-regex": "error",
                // 要求箭头函数的参数使用圆括号  "as-needed" 当只有一个参数时允许省略圆括号。
                "arrow-parens": ["error", "as-needed"]
            }
        }
    ]
};
