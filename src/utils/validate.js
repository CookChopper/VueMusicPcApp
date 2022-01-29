/*
 * @Author: CookChopper
 * @Date: 2022-01-07 21:50:02
 * @LastEditTime: 2022-01-11 23:38:35
 * @LastEditors: CookChopper
 * @Description: 公共函数
 */

// 是否url
export function isExternal (path) {
  return /^(https?:|mailto:?tel:)/.test(path)
}

// 对象与数组相关联
export function makeUpArray (obj1, obj2) {
  const newArr = []
  Object.keys(obj1).forEach(key => {
    const obj = {
      id: parseInt(key) + 1,
      category: parseInt(key),
      name: obj1[key],
      children: []
    }
    newArr.push(obj)
  })
  newArr.forEach(item => {
    obj2.forEach(i => {
      if (i.category === item.category) {
        item.children = [...item.children, i]
      }
    })
  })
  return newArr
}

// 手机号校验
export function checkPhone (rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/
  if (!reg.test(value)) {
    return callback(new Error('手机号码格式不正确'))
  } else {
    return callback()
  }
}
