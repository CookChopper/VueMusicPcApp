<template>
  <div class="ranklist" v-loading.fullscreen.lock="loading"
    element-loading-text="正在加载中..."
    element-loading-background="rgba(0,0,0,0.8)"
  >
    <p class="name">官方榜</p>
    <div class="official">
      <Rank :bgc="['#56a1e3', '#5a8beb']" :title="'飙升榜'.split('')" :list="soraList" @handleDblClick="play" />
      <Rank :bgc="['#34aabe', '#56c2cd']" :title="'新歌榜'.split('')" :list="newList" @handleDblClick="play" />
      <Rank :bgc="['#d53d6a', '#eb638d']" :title="'原创榜'.split('')" :list="originalList" @handleDblClick="play" />
      <Rank :bgc="['#c7523c', '#cc7455']" :title="'热歌榜'.split('')" :list="hotList" @handleDblClick="play" />
      <Rank :bgc="['#9455ce', '#9946c9']" :title="'爱听榜'.split('')" :list="listenList" @handleDblClick="play" />
    </div>
    <p class="name">全球榜</p>
    <div class="music-wrap">
      <music-list  :list="musicSheet" />
    </div>
  </div>
</template>

<script>
import Rank from './components/Rank.vue'
import MusicList from '@/components/MusicList'
import { getTopList } from '@/api/discover.js'
import { getAllMusic, getSongUrl } from '@/api/music.js'
export default {
  name: 'RankList',
  data () {
    return {
      soraList: [],
      newList: [],
      originalList: [],
      hotList: [],
      listenList: [],
      musicSheet: [],
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  components: {
    Rank, MusicList
  },
  methods: {
    async init () {
      this.loading = true
      // 获取全球榜
      this.getTopList()
      // 飙升榜
      const { songs: _soar } = await this.getAllMusic(19723756)
      this.soraList = _soar.splice(0, 8)
      // 新歌榜
      const { songs: _new } = await this.getAllMusic(3779629)
      this.newList = _new.splice(0, 8)
      // 原创榜
      const { songs: _original } = await this.getAllMusic(2884035)
      this.originalList = _original.splice(0, 8)
      // 热歌榜
      const { songs: _hot } = await this.getAllMusic(3778678)
      this.hotList = _hot.splice(0, 8)
      // 爱听榜
      const { songs: _listen } = await this.getAllMusic(5453912201)
      this.listenList = _listen.splice(0, 8)
      this.loading = false
    },
    // 所有榜单
    async getTopList () {
      const { list } = await getTopList()
      this.musicSheet = list
    },
    // 榜单详情
    async getAllMusic (id) {
      const data = await getAllMusic({ id })
      return data
    },
    // 双击播放
    async play (row) {
      const { data } = await getSongUrl({ id: row.id })
      this.$bus.$emit('playsong', { ...row, ...data[0] })
    }
  }
}
</script>

<style lang="scss" scoped>
.ranklist{
  width: 100%;
  box-sizing: border-box;
  padding: 0 70px;
  .name{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
  }
  .official{
    width: 100%;
     display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
    .rank{
    width: 30%;
    margin: 10px 20px 0 0px;
  }
  }

}
</style>
