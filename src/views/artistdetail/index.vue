<template>
  <div class="artistdetail" v-loading.fullscreen.lock="loading"
  element-loading-text="正在加载中..."
  element-loading-background="rgba(0,0,0,.8)">

    <div class="desc">
      <img :src="artistInfo.cover" alt="">
      <div class="desc-detail">
        <div class="detail-title">
          <div class="left">
            <span class="detail-type">歌手</span>
            <span class="detail-name">{{artistInfo.name}}</span>
          </div>
        </div>
         <div class="detail-description">
          <span class="title">单曲数：</span><span>{{artistInfo.musicSize}}</span>
        </div>
         <div class="detail-description">
          <span class="title">专辑数：</span><span>{{artistInfo.albumSize}}</span>
        </div>
         <div class="detail-description">
          <span class="title">MV数：</span><span>{{artistInfo.mvSize}}</span>
        </div>
         <div class="detail-description">
          <span class="title">简介：</span><span>{{artistInfo.briefDesc}}</span>
        </div>
      </div>
    </div>
    <div class="table">
       <el-tabs v-model="activeName" >
          <el-tab-pane label="专辑" name="musiclist">
            <play-list :tableData="songList" @likeMusic="likemusic" @dblClick="playmusic" />
          </el-tab-pane>
          <el-tab-pane label="MV" name="mv">
          </el-tab-pane>
          <el-tab-pane label="歌手详情" name="detail">
          </el-tab-pane>
           <el-tab-pane label="相似歌手" name="more">
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { getArtistDetail, getArtistTopSong } from '@/api/artist'
import { getSongUrl, likeMusicList, likeMusic } from '@/api/music'
import PlayList from '@/components/PlayList'
export default {
  name: 'ArtistDetail',
  data () {
    return {
      id: this.$route.params.id,
      loading: false,
      artistInfo: { },
      activeName: 'musiclist',
      songList: []
    }
  },
  components: {
    PlayList
  },
  mounted () {
    this.getArtistDetail()
    this.getArtistTopSong()
  },
  methods: {
    async getArtistDetail () {
      const { data } = await getArtistDetail(this.id)
      this.artistInfo = data.artist
    },
    async getArtistTopSong () {
      // 获取50首热门歌曲
      const { songs } = await getArtistTopSong(this.id)
      // 获取歌曲id
      const trackIds = []
      songs.forEach(item => {
        trackIds.push(item.id)
      })
      // 获取歌曲url
      const { data } = await getSongUrl({ id: trackIds.join(',') })
      songs.forEach(item => {
        const res = data.filter(i => item.id === i.id)[0]
        item.url = res.url
      })
      this.songList = songs
    },
    async likemusic (id) {
      const { ids } = await likeMusicList({ uid: this.$store.state.uid })
      const isLike = ids.some(item => item === id)
      const { code } = await likeMusic({ id, like: !isLike })
      if (code === 200) {
        this.$message.success('操作成功，API有延迟，请稍后刷新')
      }
    },
    playmusic (item) {
      this.$bus.$emit('playsong', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.artistdetail{
  width: 100%;
  box-sizing:border-box;
  padding: 20px 40px;
  .desc{
    width: 100%;
    display: flex;
    img{
      width: 180px;
      height: 180px;
    }
    &-detail{
      width: 100%;
      margin-left: 30px;
      text-align: left;

      .detail-title{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left{
          .detail-type{
            display: inline-block;
            box-sizing:border-box;
            padding: 5px 10px;
            text-align: center;
            border: 1PX solid #E83C3C;
            color: #E83C3C;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
          }
          .detail-name{
            margin-left: 10px;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
      .detail-description{
        margin: 10px 0;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        .title{
          color: #0c73c2;
        }
      }
    }
  }
  .table{
    width: 100%;
    margin-top: 10px;
  }
  ::v-deep.el-tabs__nav-wrap::after{
    z-index: auto!important;
  }
  ::v-deep.el-tabs__nav{
    z-index: auto!important;
  }
}
</style>
