/*
 * @Author: CookChopper
 * @Date: 2022-01-10 21:30:33
 * @LastEditTime: 2022-01-23 16:55:06
 * @LastEditors: CookChopper
 * @Description: 歌曲类API
 */

import request from '@/utils/request'

// 获取热门歌单分类
export function getHotSongSheetCate () {
  return request({
    url: '/playlist/hot'
  })
}

// 获取全部歌单分类
export function getAllSongSheetCate () {
  return request({
    url: '/playlist/catlist'
  })
}

// 获取歌单
export function getSongSheet (params) {
  return request({
    url: '/top/playlist',
    params
  })
}

// 歌单详情
export function getListDetail (params) {
  return request({
    url: '/playlist/detail',
    params
  })
}

// 获取歌单所有歌曲
export function getAllMusic (params) {
  return request({
    url: '/playlist/track/all',
    params
  })
}

// 获取歌曲详情
export function getMusicDetail (params) {
  return request({
    url: '/song/detail',
    params
  })
}

// 喜欢歌曲
export function likeMusic (params) {
  return request({
    url: '/like',
    params
  })
}

// 喜欢歌曲列表
export function likeMusicList (params) {
  return request({
    url: '/likelist',
    params
  })
}

// 获取歌曲url
export function getSongUrl (params) {
  return request({
    url: '/song/url',
    params
  })
}

// 音乐是否可用
export function checkMusic (params) {
  return request({
    url: '/check/music',
    params
  })
}

// 获取歌词
export function getSongLrc (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 歌单详情动态
export function getMusicListDynamic (id) {
  return request({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}

// 歌单评论
export function getPlayListComment (params) {
  return request({
    url: '/comment/playlist',
    params
  })
}

// 歌单收藏者列表
export function getCollector (params) {
  return request({
    url: '/playlist/subscribers',
    params
  })
}

// 最新音乐
export function getNewSongs (type) {
  return request({
    url: '/top/song',
    params: {
      type
    }
  })
}
