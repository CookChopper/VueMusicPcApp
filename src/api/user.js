/*
 * @Author: CookChopper
 * @Date: 2022-01-12 00:20:45
 * @LastEditTime: 2022-01-13 00:29:04
 * @LastEditors: CookChopper
 * @Description: 用户API
 */

import request from '@/utils/request.js'

// 登录接口
export function login (params) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    params
  })
}

// 退出接口
export function logout () {
  return request({
    url: '/logout'
  })
}

// 获取用户歌单接口
export function getUserSongSheet (params) {
  return request({
    url: '/user/playlist',
    params
  })
}
