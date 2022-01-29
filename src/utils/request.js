/*
 * @Author: CookChopper
 * @Date: 2022-01-09 16:28:41
 * @LastEditTime: 2022-01-29 22:58:50
 * @LastEditors: CookChopper
 * @Description: 封装axios
 */

import axios from 'axios'
import store from '@/store/index.js'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api'

axios.defaults.timeout = 5000

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  if (store.state.token) {
    // 登录状态下 请求头携带token
    config.headers.Authorization = store.state.token
  }
  return config
})

axios.interceptors.response.use(res => {
  if (res.status !== 200) {
    return Promise.reject(new Error('请求失败'))
  }
  return res.data
})

export default axios
