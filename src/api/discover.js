/*
 * @Author: CookChopper
 * @Date: 2022-01-09 16:27:54
 * @LastEditTime: 2022-01-27 15:25:25
 * @LastEditors: CookChopper
 * @Description: 公共数据API
 */

import request from '@/utils/request.js'

/**
 * @description: 获取banner
 * @param {*}
 * @return {*}
 */
export function getBanner () {
  return request({
    url: '/banner'
  })
}

/**
 * @description: 获取推荐歌单
 * @param {*} params
 * @return {*}
 */
export function getRecommandSheet (params) {
  return request({
    url: '/personalized',
    params
  })
}

/**
 * @description: 获取推荐MV
 * @param {*}
 * @return {*}
 */
export function getRecommandMv (params) {
  return request({
    url: '/personalized/privatecontent',
    params
  })
}

// 推荐新音乐列表
export function getRecommandSong () {
  return request({
    url: '/personalized/newsong'
  })
}

// 所有榜单
export function getTopList () {
  return request({
    url: '/toplist'
  })
}

// 最新MV
export function getFirstMv (params) {
  return request({
    url: '/mv/first',
    params
  })
}

// 推荐MV
export function getPersonalizedMv () {
  return request({
    url: '/personalized/mv'
  })
}

// mv排行
export function getTopMv (params) {
  return request({
    url: '/top/mv',
    params
  })
}

// 全部MV
export function getAllMv (params) {
  return request({
    url: '/mv/all',
    params
  })
}

// 热搜列表
export function getHotSearch () {
  return request({
    url: '/search/hot/detail'
  })
}

// 搜索
export function getSearchResult (params) {
  return request({
    url: '/search',
    params
  })
}
