// *xxx 则xxx为默认选项

module.exports = {
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
            "rules": {}
        },
        {
            "files": ["**/*.md/*.js"],
            "rules": {
                "strict": "off"
            }
        }
    ]
};
