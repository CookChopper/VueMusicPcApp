/*
 * @Author: CookChopper
 * @Date: 2022-01-06 00:36:43
 * @LastEditTime: 2022-01-24 11:48:11
 * @LastEditors: CookChopper
 * @Description: 工具函数
 */

// 时间戳方案-节流阀
export function throttle (fn, wait) {
  const pre = Date.now()
  return function () {
    const context = this
    const args = arguments
    const now = Date.now()
    if (now - pre >= wait) {
      fn.apply(context, args)
    }
  }
}

// 格式化时间
export function formatDate (time, fmt) {
  const date = new Date(time)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

// 得到一个两数之间的随机整数
export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // 不含最大值，含最小值
}

// 对数组中某个对象值排序
export function sortBy (attr, rev) {
  // 第二个参数没有传递 默认升序排列
  // eslint-disable-next-line
  if (rev == undefined) {
    rev = 1
  } else {
    rev = (rev) ? 1 : -1
  }

  return function (a, b) {
    a = a[attr] ? a[attr] : ''
    b = b[attr] ? b[attr] : ''
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}

// 全屏
export function fullScreen () {
  var element = document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  }
}

// 退出全屏
export function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
