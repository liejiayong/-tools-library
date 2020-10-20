const INLINE_ELEMENTS = ['span'];
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  'vue/multiline-html-element-content-newline': [
    'error',
    {
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', ...INLINE_ELEMENTS],
      allowEmptyLines: false,
    },
  ],
};
