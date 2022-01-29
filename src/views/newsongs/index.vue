<template>
  <div class="newsongs"
    v-loading.fullscreen.lock="loading"
    element-loading-text="loading..."
    element-loading-background="rgba(0,0,0,.5)">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0">
        </el-tab-pane>
        <el-tab-pane label="华语" name="7"></el-tab-pane>
        <el-tab-pane label="欧美" name="96"></el-tab-pane>
        <el-tab-pane label="韩国" name="16"></el-tab-pane>
        <el-tab-pane label="日本" name="8"></el-tab-pane>
      </el-tabs>
      <PlayList :tableData="songList" @dblClick="playsong" />

    </div>
  </div>
</template>

<script>
import { getNewSongs, getSongUrl, getMusicDetail } from '@/api/music'
import PlayList from '@/components/PlayList'
export default {
  name: 'newSongs',
  data () {
    return {
      loading: false,
      activeName: '0',
      songList: []
    }
  },
  mounted () {
    this.getNewSongs()
  },
  components: {
    PlayList
  },
  methods: {
    handleClick (e) {
      this.activeName = e.name
      this.getNewSongs()
      // console.log(activeName)
      // console.log(arguments)
    },
    async getNewSongs () {
      this.loading = true
      const { data } = await getNewSongs(this.activeName)
      // console.log(data)
      // 获取歌曲id
      const trackIds = []
      data.forEach(item => {
        trackIds.push(item.id)
      })
      // 获取歌曲url
      const { data: result } = await getSongUrl({ id: trackIds.join(',') })
      const { songs } = await getMusicDetail({ ids: trackIds.join(',') })
      data.forEach(item => {
        const res = result.filter(i => item.id === i.id)[0]
        const detail = songs.filter(i => item.id === i.id)[0]
        item.url = res.url
        item.ar = detail.ar
        item.al = detail.al
      })
      this.songList = data
      this.loading = false
    },
    playsong (item, type) {
      if (type) {
        this.$bus.$emit('addsong', item)
      } else {
        this.$bus.$emit('playsong', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.newsongs{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  .tabs{
    width: 100%;
  }
}
</style>
