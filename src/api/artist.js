/*
 * @Author: CookChopper
 * @Date: 2022-01-21 22:44:15
 * @LastEditTime: 2022-01-22 09:57:04
 * @LastEditors: CookChopper
 * @Description: 歌手
 */


import request from '@/utils/request'

// 歌手分类列表
export function getArtistList (params) {
  return request({
    url: '/artist/list',
    params
  })
}

// 歌手详情
export function getArtistDetail (id) {
  return request({
    url: '/artist/detail',
    params: {
      id
    }
  })
}

// 歌手热门50首
export function getArtistTopSong (id) {
  return request({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}
