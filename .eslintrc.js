/*
 * @Author: CookChopper
 * @Date: 2022-01-05 17:18:13
 * @LastEditTime: 2022-01-05 18:06:27
 * @LastEditors: CookChopper
 * @Description: 
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": [1, {"max": 2}],
    "comma-dangle": [2, "never"],
  }
}
