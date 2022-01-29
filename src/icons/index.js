/*
 * @Author: CookChopper
 * @Date: 2022-01-07 21:52:57
 * @LastEditTime: 2022-01-07 22:23:31
 * @LastEditors: CookChopper
 * @Description: svg图标注册
 */

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


