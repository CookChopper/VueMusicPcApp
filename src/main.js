/*
 * @Author: CookChopper
 * @Date: 2022-01-05 17:18:13
 * @LastEditTime: 2022-01-13 22:46:54
 * @LastEditors: CookChopper
 * @Description: 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 分辨率自适应
import '@/utils/rem.js'
// element-ui按需加载
import '@/utils/global.js'
// svg-icon
import '@/icons/index.js'
// 公用样式
import '@/styles/index.scss'
// 注册过滤器
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// $bus解决不相关组件通信
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
