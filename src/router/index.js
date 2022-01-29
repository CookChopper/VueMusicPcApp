/*
 * @Author: CookChopper
 * @Date: 2022-01-05 17:18:13
 * @LastEditTime: 2022-01-27 15:12:11
 * @LastEditors: CookChopper
 * @Description: 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/individuation'
  },
  {
    path: '/individuation',
    name: 'Individuation',
    component: () => import('@/views/individuation/index.vue')
  },
  {
    path: '/allmusiclist',
    name: 'allmusiclist',
    component: () => import('@/views/allmusiclist/index.vue')
  },
  {
    path: '/musiclistdetail/:id',
    name: 'musiclistdetail',
    component: () => import('@/views/musiclistdetail/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue')
  },
  {
    path: '/ranklist',
    name: 'ranklist',
    component: () => import('@/views/ranklist/index.vue')
  },
  {
    path: '/artist-list',
    name: 'artistlist',
    component: () => import('@/views/artistlist/index.vue')
  },
  {
    path: '/artistdetail/:id',
    name: 'artistdetail',
    component: () => import('@/views/artistdetail/index.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/views/mv/index.vue')
  },
  {
    path: '/mvlist',
    name: 'mvlist',
    component: () => import('@/views/mv/mvlist.vue')
  },
  {
    path: '/mvdetail/:id',
    name: 'mvdetail',
    component: () => import('@/views/mv/mvdetail.vue')
  },
  {
    path: '/new-songs',
    name: 'newsongs',
    component: () => import('@/views/newsongs/index.vue')
  },
  {
    path: '/search-detail/:keywords/:type',
    name: 'searchDetail',
    component: () => import('@/views/searchdetail/index.vue')
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
