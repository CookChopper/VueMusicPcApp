/*
 * @Author: CookChopper
 * @Date: 2022-01-06 00:11:01
 * @LastEditTime: 2022-01-09 14:07:45
 * @LastEditors: CookChopper
 * @Description: rem自适应
 */

import { throttle } from './tool'

const remBase = 14

let htmlFontSize

(function () {
  const calc = () => {
    const maxFontSize = 18
    const minFontSize = 14
    const html = document.getElementsByTagName('html')[0]
    const width = html.clientWidth
    let size = remBase * (width / 1440)
    size = Math.min(maxFontSize, size)
    size = Math.max(minFontSize, size)
    htmlFontSize = size
    html.style.fontSize = size + 'px'
  }
  calc()
  window.addEventListener('resize', throttle(calc, 500))
})()

// 静态转化rem
export function toRem (px) {
  return `${px / remBase}rem`
}

// js动态计算rem
export function toCurrentRem (px) {
  return `${px / htmlFontSize}rem`
}
