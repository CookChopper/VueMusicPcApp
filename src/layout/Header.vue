<template>
  <div class="header">
    <!-- 头部左侧 -->
    <div class="header-title">
    <!-- 头部左侧 -->
       <div class="header-title-left" @mouseover="showHeaderSlide" @mouseleave="hideHeaderSlide">
        <el-button circle type="danger" size="mini">
          <transition name="header-side">
          <svg-icon icon-class="home-filling" v-show="showSlide" @click="$router.push('/individuation')"/>
          </transition>
        </el-button>
        <el-button circle type="warning" size="mini">
          <transition name="header-side">
          <svg-icon icon-class="minus-bold" v-show="showSlide" @click="changFullScreen('off')" />
          </transition>
        </el-button>
        <el-button circle type="success" size="mini">
          <transition name="header-side">
          <svg-icon icon-class="fullscreen"  v-show="showSlide" @click="changFullScreen('on')"/>
          </transition>
        </el-button>
      </div>
      <div class="header-title-right">
        <i class="el-icon-arrow-left" @click="go(-1)"></i>
        <i class="el-icon-arrow-right" @click="go(1)"></i>
      </div>
    </div>
    <!-- 头部右侧 -->
    <div class="header-main">
      <div class="left">
           <el-autocomplete
            class="inline-input"
            v-model="searchInput"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="true"
            @select="handleSelect"
            popper-class="hots"
          >
            <template slot-scope="scope">
              <!-- {{scope.item.searchWord}} -->
                  <div class="item" v-for="item,index in scope" :key="index" >
                    <div class="item-right">
                      <p class="title">{{item.searchWord || item.name}} <span style="font-style:oblique;color:#ccc;">{{item.score || item.itype}}</span></p>
                      <p class="description">{{item.content || item.itype==='单曲'?`——${item.author}`:'' ||item.itype==='歌手'?'——歌手结果':'' ||item.itype==='MV'?'——MV结果':'' ||'热门推荐'}}</p>
                    </div>
                </div>
            </template>
          </el-autocomplete>
      </div>
      <div class="right">
        <div class="avatar" @click="showLoginWrap">
          <img :src="avatar" alt="">
        </div>
         <svg-icon icon-class="theme" />
          <svg-icon icon-class="github" />
      </div>
    </div>
    <!-- 登录框 -->
    <transition name="login-slide">
    <login v-show="showLogin" @close="handleLoginClose" />
    </transition>
  </div>
</template>

<script>
import { getHotSearch, getSearchResult } from '@/api/discover'
import Login from '@/components/Login/index.vue'
import { mapState } from 'vuex'
// import Selecter from '@/components/Select'
import { fullScreen, exitFullscreen } from '../utils/tool'
import { getSongUrl } from '@/api/music'


export default {
  name: 'LayoutHeader',
  data () {
    return {
      searchInput: '', // 搜索内容
      showSlide: false, // 控制左上角按钮图标
      showLogin: false, // 控制登录框
      hots: [],
      showOpiton: false
    }
  },
  components: {
    Login
  },
  computed: {
    ...mapState(['avatar'])
  },
  mounted () {
    this.getHotSearch()
  },
  methods: {
    showHeaderSlide () {
      this.showSlide = true
    },
    hideHeaderSlide () {
      this.showSlide = false
    },
    showLoginWrap () {
      if (this.$store.state.token) {

      } else {
        this.showLogin = true
      }
    },
    handleLoginClose () {
      this.showLogin = false
    },
    go (index) {
      this.$router.go(index)
    },
    // 获取热搜列表
    async getHotSearch () {
      const { data } = await getHotSearch()
      this.hots = data
    },
    // 选择建议项
    handleSelect (item) {
      if (!item.itype) {
        this.$router.push(`/search-detail/${item.searchWord}/songs`)
      }
      if (item.itype === '单曲') {
        // console.log(item)
        this.$bus.$emit('playsong', item)
      }
      if (item.itype === '歌手') {
        this.$router.push(`/artistdetail/${item.id}`)
      }
      if (item.itype === 'MV') {
        this.$router.push(`/mvdetail/${item.id}`)
      }
    },
    // 返回建议列表
    async querySearch (queryString, cb) {
      if (queryString) {
        const res = await this.getSearchResult(queryString)
        cb(res)
      } else {
        cb(this.hots)
      }
    },
    // 全屏
    changFullScreen (type) {
      if (type === 'off') {
        exitFullscreen()
      } else {
        fullScreen()
      }
    },
    async getSearchResult (keywords) {
      const { result: { songs } } = await getSearchResult({
        keywords,
        type: 1
      })
      const { result: { artists } } = await getSearchResult({
        keywords,
        type: 100
      })
      const { result: { mvs } } = await getSearchResult({
        keywords,
        type: 1004
      })
      const res1 = songs.splice(0, 3) || []
      const ids = []
      res1.forEach(item => {
        ids.push(item.id)
      })
      const { data } = await getSongUrl({ id: ids.join(',') })
      res1 && res1.forEach(item => {
        item.author = item.artists[0].name
        item.ar = item.artists
        item.al = item.artists[0] || ''
        item.url = data.filter(i => i.id === item.id)[0].url
        item.itype = '单曲'
      })
      const res2 = artists && artists.splice(0, 2)
      res2 && res2.forEach(item => {
        item.itype = '歌手'
      })
      const res3 = mvs && mvs.splice(0, 2)
      res3 && res3.forEach(item => {
        item.itype = 'MV'
      })
      return [...res1, ...res2, ...res3]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/header.scss';
</style>
