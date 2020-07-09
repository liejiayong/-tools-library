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
            }
        }
    ]
};
