<template>
  <div class="individuation" v-loading.fullscreen.lock="loading"   element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <swiper :banner="banners" />
    <music-list title="推荐歌单" :list="musicSheet" description="热门推荐"/>
    <mv-list :mv="mvlist" title="独家放送" />
    <new-song title="最新音乐" :songList="newSong" @handleDblClick="dblclick" />
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/index.vue'
import MusicList from '@/components/MusicList'
import mvList from '@/components/MvList'
import NewSong from './components/NewSong.vue'
import {
  getBanner, getRecommandSheet,
  getRecommandMv, getRecommandSong
} from '@/api/discover.js'
import { getSongUrl, getMusicDetail } from '@/api/music.js'
export default {
  name: 'Individuation',
  components: {
    Swiper, MusicList, mvList, NewSong
  },
  data () {
    return {
      banners: [],
      musicSheet: [],
      mvlist: [],
      newSong: [],
      loading: false
    }
  },
  methods: {
    async getBanner () {
      const data = await getBanner()
      this.banners = data.banners
    },
    async getMusicSheet () {
      const data = await getRecommandSheet({ limit: 10 })
      this.musicSheet = data.result
    },
    async getRecommandMv () {
      const data = await getRecommandMv()
      // console.log(data)
      this.mvlist = data.result
    },
    async getRecommandSong () {
      const data = await getRecommandSong()

      this.newSong = data.result
    },
    async dblclick (row) {
      // console.log(row)
      const { songs } = await getMusicDetail({ ids: row.id })
      const { data } = await getSongUrl({ id: row.id })

      this.$bus.$emit('playsong', { ...songs[0], ...data[0] })
    }
  },
  async mounted () {
    this.loading = true
    await this.getBanner()
    await this.getMusicSheet()
    await this.getRecommandMv()
    await this.getRecommandSong()
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.individuation{
  width: 100%;
  box-sizing:border-box;
  padding: 20px 100px;
}
</style>
