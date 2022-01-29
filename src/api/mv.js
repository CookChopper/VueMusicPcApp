/*
 * @Author: CookChopper
 * @Date: 2022-01-22 16:21:19
 * @LastEditTime: 2022-01-22 17:57:24
 * @LastEditors: CookChopper
 * @Description: mv
 */

import request from '@/utils/request.js'

// mv详情
export function getMvDetail (mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}

// mv url
export function getMvUrl (id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}

// mv comment
export function getMvComment (params) {
  return request({
    url: '/comment/mv',
    params
  })
}

// mv相关推荐
export function getMvGroup (id) {
  return request({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}
