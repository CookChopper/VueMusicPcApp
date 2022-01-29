/*
 * @Author: CookChopper
 * @Date: 2022-01-05 17:20:18
 * @LastEditTime: 2022-01-29 23:14:09
 * @LastEditors: CookChopper
 * @Description: vue.config.js
 */

const DefaultSetting = require('./src/setting.js')

const name = DefaultSetting.title || 'Vue项目'

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        // 代理地址
        target: 'http://localhost:3000',
        changeOrigin: true,
        // 重写
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
