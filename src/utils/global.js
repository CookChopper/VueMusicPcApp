/*
 * @Author: CookChopper
 * @Date: 2022-01-05 18:15:49
 * @LastEditTime: 2022-01-24 11:53:30
 * @LastEditors: CookChopper
 * @Description: 全局组件
 */

import {
  Button, Icon,
  Input, Carousel,
  CarouselItem, Loading,
  Select, Pagination,
  Form, FormItem,
  Message, Tabs,
  TabPane, Table,
  TableColumn, Slider,
  Popconfirm, Autocomplete
} from 'element-ui'

import Vue from 'vue'

Vue.prototype.$message = Message

Vue.use(Button)
  .use(Icon)
  .use(Input)
  .use(Carousel)
  .use(CarouselItem)
  .use(Loading)
  .use(Select)
  .use(Pagination)
  .use(Form)
  .use(FormItem)
  .use(Tabs)
  .use(TabPane)
  .use(Table)
  .use(TableColumn)
  .use(Slider)
  .use(Popconfirm)
  .use(Autocomplete)
