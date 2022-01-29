<template>
  <div class="searchDetail"
    v-loading.fullscreen.lock="loading"
    element-loading-text="loading..."
    element-loading-background="rgba(0,0,0,.7)"
  >
    <!-- 头部 -->
    <p class="top">
      <span class="searchWord">{{keywords}}</span>
      共找到
      <span class="total">{{songList.length || artistList.length || musicList.length || mvList.length}}</span>
      个
    </p>
    <!-- 标签页 -->
    <el-tabs v-model="type" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="songs">
        <PlayList :tableData="songList" @dblClick="dblClick" />
      </el-tab-pane>
      <el-tab-pane label="歌手" name="artist">
        <List :list="artistList" />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songlist">
        <MusicList :list="musicList" />
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <VideoList :mvData="mvList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/discover'
import { getSongUrl } from '@/api/music'
import PlayList from '@/components/PlayList'
import MusicList from '@/components/MusicList'
import List from '@/views/artistlist/components/ArtistList'
import VideoList from '@/views/mv/components/VideoList'
export default {
  name: 'searchDetail',
  data () {
    return {
      keywords: this.$route.params.keywords,
      type: this.$route.params.type,
      typeList: {
        songs: 1,
        artist: 100,
        songlist: 1000,
        mv: 1004
      },
      songList: [],
      artistList: [],
      musicList: [],
      mvList: [],
      loading: false
    }
  },
  mounted () {
    this.getSearchResult()
  },
  components: {
    PlayList, List, MusicList, VideoList
  },
  methods: {
    async getSearchResult () {
      this.loading = true
      const { result } = await getSearchResult({
        keywords: this.keywords,
        type: this.typeList[this.type]
      })
      this.formatData(result)
      this.loading = false
      // console.log(result)
    },
    handleClick (item) {
      this.type = item.name
      this.getSearchResult()
    },
    dblClick (item, type) {
      if (!type) {
        this.$bus.$emit('playsong', item)
      } else {
        this.$bus.$emit('addsong', item)
      }
    },
    async formatData (result) {
      this.songList = []
      this.artistList = []
      this.musicList = []
      this.mvList = []
      // 歌曲
      if (this.type === 'songs') {
        const trackIds = []
        result.songs.forEach(item => {
          trackIds.push(item.id)
          item.al = {
            name: item.album.name
          }
          item.ar = item.artists
        })
        const { data } = await getSongUrl({
          id: trackIds.join(',')
        })
        result.songs.forEach(item => {
          item.url = data.filter(i => i.id === item.id)[0].url
        })
        this.songList = result.songs
      }
      // 歌手
      if (this.type === 'artist') {
        this.artistList = result.artists
      }
      // 歌单
      if (this.type === 'songlist') {
        this.musicList = result.playlists
      }
      // mv
      if (this.type === 'mv') {
        this.mvList = result.mvs
      }
    }
  },
  watch: {
    '$route.params.keywords' (val) {
      this.keywords = val
      this.getSearchResult()
    }
  }
}
</script>

<style lang="scss" scoped>
.searchDetail{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  .top{
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    .searchWord{
      font-size: 18px;
      color: #0c73c2;
    }
    .total{
      color: #0c73c2;
    }
  }
}
</style>
