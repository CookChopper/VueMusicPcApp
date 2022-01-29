/*
 * @Author: CookChopper
 * @Date: 2022-01-05 17:18:13
 * @LastEditTime: 2022-01-12 23:33:53
 * @LastEditors: CookChopper
 * @Description: vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout } from '@/api/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    uid: localStorage.getItem('uid') || null,
    user: localStorage.getItem('user') || null,
    avatar: localStorage.getItem('avatar') || null
  },
  mutations: {
    setUser (state, obj) {
      state.user = obj
      state.uid = state.user.userId
      localStorage.setItem('user', state.user)
      localStorage.setItem('uid', state.uid)
      localStorage.setItem('avatar', state.user.avatarUrl)
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken (state) {
      state.token = null
      localStorage.removeItem('token')
    },
    removeUser (state) {
      state.user = null
      state.uid = null
      localStorage.removeItem('user')
      localStorage.removeItem('uid')
      localStorage.removeItem('avatar')
    }
  },
  actions: {
    // 登录
    async login (context, data) {
      const res = await login(data)
      context.commit('setUser', res.profile)
      context.commit('setToken', res.token)
      return res.profile
    },
    // 退出
    async logout (context) {
      await logout()
      context.commit('removeToken')
      context.commit('removeUser')
    }
  },
  modules: {
  }
})
