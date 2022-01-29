<template>
  <div class="music-list-detail"
  v-loading.fullscreen.lock="loading"
  element-loading-text="正在加载中..."
  element-loading-background="rgba(0,0,0,.8)"
  >
    <div class="desc">
      <img :src="detailInfo.coverImgUrl" alt="">
      <div class="desc-detail">
        <div class="detail-title">
          <div class="left">
            <span class="detail-type">歌单</span>
            <span class="detail-name">{{detailInfo.name}}</span>
          </div>
          <div class="right">
            <div class="musictotal">
              <span>歌曲数</span>
              <span>{{detailInfo.trackCount}}</span>
            </div>
            <div class="playtotal">
              <span>播放量</span>
              <span>{{dynamic.playCount | formatTotal}}</span>
            </div>
          </div>
        </div>
        <div class="detail-author">
          <img src="http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg" alt="">
          <span class="author">{{author}}</span>
          <span class="createtime">创建时间：{{detailInfo.createTime | formatDate('yyyy-MM-dd')}}</span>
        </div>
        <div class="detail-btn">
          <el-button type="danger" @click="playAllSong">
            <svg-icon icon-class="bofang" ></svg-icon>
              播放全部
          </el-button>
          <el-button >
            <svg-icon icon-class="shoucang"></svg-icon>
              收藏({{dynamic.bookedCount}})
          </el-button>
          <el-button >
            <svg-icon icon-class="fenxiang"></svg-icon>
              分享({{dynamic.shareCount}})
          </el-button>
        </div>
        <div class="detail-tags">
          <span>标签：</span>
          <span v-for="item,index in detailInfo.tags" :key="index">{{item.name}}</span>
        </div>
         <div class="detail-description">
          <span>简介：{{detailInfo.description}}</span>
        </div>
      </div>
    </div>
    <div class="table">
       <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="歌曲列表" name="musiclist">
            <play-list :tableData="songsList" @likeMusic="likemusic" @dblClick="playmusic" />
          </el-tab-pane>
          <el-tab-pane :label="`评论(${dynamic.commentCount})`" name="assess">
            <comment :Mid="detailId" ref="comment" />
          </el-tab-pane>
          <el-tab-pane label="收藏者" name="third">
            <Collect :collector="subscribers" />
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import playList from '@/components/PlayList'
import Comment from '@/components/Comment/index.vue'
import Collect from '@/components/Collect/index.vue'
import { getListDetail, getAllMusic, likeMusicList, likeMusic, getSongUrl, getMusicListDynamic, getCollector } from '@/api/music.js'
import { sortBy } from '@/utils/tool'
export default {
  name: 'MusicListDetail',
  components: {
    playList, Comment, Collect
  },
  data () {
    return {
      activeName: 'musiclist', // 标签页激活
      detailId: this.$route.params.id, // 歌单id
      detailInfo: {}, // 歌单信息
      songsList: [], // 歌单所有歌曲
      author: '', // 歌单作者
      dynamic: {}, // 歌单详情动态
      loading: false,
      subscribers: [] // 歌单收藏者
    }
  },
  methods: {
    handleClick (item) {
      // console.log(item)
    },
    // 获取歌单详情
    async getListDetail (id) {
      try {
        this.loading = true
        // 加载评论
        this.$refs.comment.getPlayListComment(id)
        // 歌单详情
        const { playlist } = await getListDetail({ id: id })
        // 歌单详情动态
        const res = await getMusicListDynamic(id)
        // 所有歌曲
        const { songs } = await getAllMusic({ id })
        // 是否为喜欢的歌曲
        const { ids } = await likeMusicList({ uid: this.$store.state.uid })
        // 歌单所有歌曲id
        const trackIds = []
        songs.forEach(item => {
          trackIds.push(item.id)
        })
        // 音乐是否可用
        const { data } = await getSongUrl({ id: trackIds.join(',') })
        songs.forEach(item => {
          const isLike = ids.some(i => i === item.id)
          if (isLike) {
            item.like = true
          }
          const res = data.filter(i => i.id === item.id)
          item.url = res[0].url

          item = { ...item, ...res[0] }
        })
        // 所有歌曲详情
        this.detailInfo = playlist
        this.dynamic = res
        this.songsList = songs.sort(sortBy('url', false))
        this.author = playlist.creator.nickname
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    // 喜欢音乐
    async likemusic (id) {
      try {
        if (!this.$store.state.uid) return this.$message.error('请先登录！')
        const { ids } = await likeMusicList({ uid: this.$store.state.uid })
        const isLike = ids.some(item => item === id)
        const { code } = await likeMusic({ id, like: !isLike })
        if (code === 200) {
          this.$message.success('操作成功，API有延迟，请稍后刷新')
        }
      } catch (error) {
        console.log(error)
      }

      // await this.getListDetail(this.detailId)
    },
    // 播放音乐
    async playmusic (row, type) {
      if (type) {
        this.$bus.$emit('addsong', row)
        return
      }
      this.$bus.$emit('playsong', row)
    },
    // 播放所有音乐
    playAllSong () {
      this.$bus.$emit('playsong', this.songsList[0])
      for (let i = 1; i < this.songsList.length; i++) {
        if (!this.songsList[i].url) return
        this.$bus.$emit('addsong', this.songsList[i])
      }
    },
    async getCollector () {
      const { subscribers } = await getCollector({ id: this.detailId, limit: 30 })
      this.subscribers = subscribers
    }
  },
  async mounted () {
    await this.getListDetail(this.detailId)
    this.getCollector()
  },
  async beforeRouteUpdate (to, from, next) {
    this.detailId = to.params.id
    this.getListDetail(this.detailId)
    this.getCollector()

    next()
  }
}
</script>

<style lang="scss" scoped>
.music-list-detail{
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
        .right{
          display: flex;
          font-size: 14px;
          font-weight: 500;
          div{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .musictotal{
            width: 50px;
            text-align: left;
            border-right: 1PX solid #ccc;
          }
          .playtotal{
            width: 50px;
            text-align: left;
            margin-left: 5px;
          }
        }
      }
      .detail-author{
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin-top: 10px;
        img{
          width: 30px;
          height: 30px;
          vertical-align: middle;
          border-radius: 50%;
        }
        .author,.createtime{
          margin-left: 10px;
        }
      }
      .detail-btn{
        width: 100%;
        min-width: 500px;
        margin-top: 20px;
        text-align:left;
        .el-button{
          .svg-icon{
            vertical-align: -2px;

          }
          &:nth-of-type(1){
              fill: white;
            }
        }
      }
      .detail-tags,.detail-description{
        margin-top: 5px;
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
