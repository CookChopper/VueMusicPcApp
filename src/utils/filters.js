/*
 * @Author: CookChopper
 * @Date: 2022-01-13 22:44:18
 * @LastEditTime: 2022-01-15 16:54:35
 * @LastEditors: CookChopper
 * @Description: 过滤器
 */

/**
 * @description: 格式化时间
 * @param {*} time 时间戳
 * @param {*} fmt  时间格式
 * @return {*}
 */
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

// 大于5位数转换为万单位
export function formatTotal (total) {
  let res = total + ''
  if (res.length > 5) {
    res = res.slice(0, 2) + '万'
  }
  return res
}

// 秒数转化为 分钟:秒数
export function formatMinutesSecond (val) {
  if (val !== 0) {
    const mm = parseInt(val / 60)
    const ss = fillZero(parseInt(val % 60))
    return `${mm}:${ss}`
  } else {
    return '0:00'
  }
}

export function fillZero (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
