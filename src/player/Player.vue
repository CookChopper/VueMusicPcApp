<template>
  <div class="player">
    <!-- 播放按钮组件 -->
    <player-btn :playing="audio.playing" @handleClick="clickPlayBtn" />
    <!-- 播放滑块 -->
    <div class="player-slider">
      <span class="playtime">{{audio.currentTime | formatMinutesSecond}}</span>
      <el-slider :max="audio.maxTime" v-model="audio.currentTime" :show-tooltip="false" @change="changeCurrentTime" :debounce="500"></el-slider>
      <span class="overtime">{{audio.maxTime | formatMinutesSecond}}</span>
    </div>
    <!-- 声音滑块 -->
    <div class="audio-slider">
      <svg-icon :icon-class="VolumeIcon" @click="changeVolume(0)"></svg-icon>
      <el-slider v-model="audio.volume" :show-tooltip="false" @change="changeVolume"></el-slider>
    </div>
    <!-- 播放方法按钮 -->
    <div class="player-btn-right">
      <div class="btn">
        <svg-icon :icon-class="playIcon" @click="playWay"></svg-icon>
      </div>
        <div class="btn">
        <svg-icon icon-class="geci" @click="showLrc = !showLrc" :class="[{active:showLrc}]"></svg-icon>
      </div>
        <div class="btn">
        <svg-icon icon-class="playlist" :class="{active:showPlayList}" @click="playListBtn" ></svg-icon>
      </div>
    </div>
    <!-- 音乐audio -->
    <audio autoplay ref="audio" :src="audio.url" @timeupdate="onTimeupdate" @loadedmetadata="onloadedmetadata" @ended="onEnded">
    </audio>
    <!-- 播放列表 -->
    <transition name="playlist-slide">
    <div class="playlist-wrap" v-show="showPlayList">
      <svg-icon icon-class="close" @click="showPlayList = false"></svg-icon>
      <play-list :tableData="playlist"
      :showLike="false"
      :showAl="false"
      :showAdd="false" title="播放列表"
      :currentIndex="this.audio.index"
      class="playlist"
       />
    </div>
    </transition>

    <!-- 播放歌曲cover -->
    <div class="playcover-wrap">
      <player-cover :coverImg="playCoverImg" :title="playTitle" :author="playAuthor" v-show="playTitle" @open="handlePlayerPure(true)" />
    </div>
    <!-- 桌面歌词 -->
    <div class="player-lrc" v-show="showLrc">
      <PlayerLrc height="30px" :overflowY="false" ref="playerLrc" :currentIndex="currentIndex" :lrcArray="lrcData"/>
    </div>
    <!-- 播放纯净模式 -->
    <transition name="playerSlide">
      <player-slide class="player-slide"
      v-show="showPlayerPure"
      @close="handlePlayerPure(false)"
      :coverImg="playCoverImg"
      :overflowY="true"
      ref="playerPure"
      :currentIndex="currentIndex"
      :lrcArray="lrcData"
      height="300px"
      :name="playTitle"
      :author="playAuthor"
       />
    </transition>
  </div>
</template>

<script>
import PlayerBtn from './PlayerBtn.vue'
import PlayerCover from './PlayerCover.vue'
import PlayList from '@/components/PlayList'
import PlayerLrc from './PlayerLrc.vue'
import { getRandomInt } from '../utils/tool'
import { parseLyric } from '../utils/player-lrc'
import { getSongLrc } from '@/api/music.js'
import PlayerSlide from './PlayerSlider.vue'

export default {
  name: 'Player',
  data () {
    return {
      index: 0,
      playIcon: 'shunxu',
      VolumeIcon: 'shengyin-kai',
      audio: {
        url: '',
        maxTime: 0,
        currentTime: 0,
        playing: false,
        playValue: 0,
        volume: 100,
        index: 0
      },
      playlist: [],
      showPlayList: false,
      playCoverImg: '',
      playTitle: '',
      playAuthor: '',
      lrcData: [],
      currentIndex: 0,
      showLrc: false,
      isSLide: false,
      showPlayerPure: false
    }
  },

  mounted () {
    // 播放歌曲
    this.init()
    // 触发播放歌曲
    this.$bus.$on('playsong', this.init)
    // 触发添加歌曲
    this.$bus.$on('addsong', (item) => {
      this.playlist.push(item)
    })
    //
    this.$refs.playerLrc.scrollTo(0, 0)
  },
  components: {
    PlayerBtn, PlayList, PlayerCover, PlayerLrc, PlayerSlide
  },
  methods: {
    init (item, type) {
      // 判断是否有播放资源
      if (!item) {
        this.$message.error('暂无播放资源')
        return false
      }
      // 添加到当前播放列表
      const index = this.playlist.push(item)
      // 当前播放歌曲索引
      this.audio.index = index - 1
      // 给audio赋值
      this.audio.url = item.url
      // playcover
      this.changePlayCover()
      // 播放
      this.$nextTick(() => {
        this.audio.playing = true
        // 当audio.url为空时，audio.onPlay会报错
        if (!this.audio.url) {
          return false
        }
        this.audio.playing = true
        this.startPlay()
      })
    },
    // 播放方式
    playWay () {
      if (this.index === 2) {
        this.index = 0
        return
      }
      this.index++
    },
    // audio播放当前时间
    onTimeupdate (res) {
      this.audio.currentTime = this.$refs.audio.currentTime
    },
    // audio加载完成时间
    onloadedmetadata (res) {
      this.audio.maxTime = res.target.duration
    },
    // 播放按钮点击事件
    clickPlayBtn (type) {
      // 点击播放或暂停按钮
      if (type === 'zanting' || type === 'play') {
        if (type === 'play') {
          if (this.playlist.length === 0) {
            this.$message.error('暂无播放资源')
            return
          } else if (this.audio.url) {
            // console.log(this.$refs.audio.src)
            this.startPlay()
          } else {
            // 播放当前audio.index歌曲
            this.onEnded()
          }
        }
        this.$set(this.audio, 'playing', !this.audio.playing)
        this.$nextTick(() => {
          this.audio.playing ? this.startPlay() : this.pausePlay()
        })
      }
      // 播放上一首
      if (type === 'prev') {
        if (this.audio.index === 0) {
          this.audio.index = this.playlist.length - 2
        } else {
          this.audio.index = this.audio.index - 2
        }
        this.onEnded()
      }
      // 播放下一首
      if (type === 'next') {
        this.onEnded()
      }
    },
    // 改变进度
    changeCurrentTime (index) {
      if (this.audio.url) {
        const currentTime = index
        this.$set(this.audio, 'currentTime', currentTime)
        this.$refs.audio.currentTime = currentTime
      } else {
        this.$message.error('暂无播放资源')
      }
    },
    // 改变声音
    changeVolume (index) {
      // 点击静音按钮
      if (!this.$refs.audio.volume && index === 0) {
        index = 100
      }
      // 静音图标
      index === 0 ? this.VolumeIcon = 'shengyin-guan' : this.VolumeIcon = 'shengyin-kai'
      // 设置audio音量滑块
      this.audio.volume = index

      // 设置audio标签音量
      this.$refs.audio.volume = index / 100
    },
    // 播放下一首
    onEnded () {
      // 重置audio数据
      this.audio.url = ''
      this.audio.maxTime = 0
      this.audio.currentTime = 0
      this.audio.playValue = 0
      // 播放模式为列表循环播放
      if (this.index === 0) {
        // 是否播放到列表最后一首了
        if (this.audio.index === this.playlist.length - 1) {
          this.audio.index = 0
          this.$set(this.audio, 'url', this.playlist[0].url)
        } else {
        // 播放列表下一首索引
          this.audio.index++
          this.$set(this.audio, 'index', this.audio.index)
          this.$set(this.audio, 'url', this.playlist[this.audio.index].url)
        }
      }
      // 播放模式随机
      if (this.index === 1) {
        this.audio.index = getRandomInt(0, this.playlist.length)
      }
      // playCover
      this.changePlayCover()
      // 播放模式单曲循环
      this.$set(this.audio, 'url', this.playlist[this.audio.index].url)
      // 重置歌曲长度
      this.audio.maxTime = parseInt(this.$refs.audio.duration)
      // 重置歌曲滑块
      // this.changeCurrentTime(0)
      // 播放歌曲
      this.$nextTick(() => {
        this.startPlay()
      })
    },
    // 控制播放列表显示
    playListBtn () {
      this.showPlayList = !this.showPlayList
    },
    // 改变播放封面
    changePlayCover () {
      this.playCoverImg = this.playlist[this.audio.index].al.picUrl || ''
      this.playTitle = this.playlist[this.audio.index].name
      this.playAuthor = this.playlist[this.audio.index].ar[0].name
      this.getSongLrc()
    },
    // 打开纯净模式
    handlePlayerPure (val) {
      this.showPlayerPure = val
    },
    // 播放开始
    startPlay () {
      this.$refs.audio.play()
    },
    // 播放暂停
    pausePlay () {
      this.$refs.audio.pause()
    },
    // 获取歌词
    async getSongLrc () {
      const { lrc } = await getSongLrc(this.playlist[this.audio.index].id)
      this.lrcData = parseLyric(lrc.lyric)
    }
  },
  watch: {
    index (val) {
      const obj = {
        0: 'shunxu',
        1: 'suiji',
        2: 'xunhuan'
      }
      this.playIcon = obj[val]
    },
    'audio.currentTime' (val) {
      for (let i = 0; i < this.lrcData.length; i++) {
        if (val > parseInt(this.lrcData[i][0])) {
          this.currentIndex = i
          this.$refs.playerLrc.scrollTo(0, i * 30)
          if (i > 5) {
            this.$refs.playerPure.scrollTo(0, (i - 5) * 30)
          }
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>

.player{
  width:100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &-slider{
    width: 50%;
    display: flex;
    align-items: center;
    .el-slider{
      width: 90%;
      margin: 0 15px;
    }
  }
  .audio-slider{
    width: 12%;
    display: flex;
    box-sizing:border-box;
    padding-left: 10px;
    align-items:center;
    .el-slider{
      width: 90%;
      margin-left: 15px;
    }
  }
  .player-btn-right{
    width: 20%;
    display: flex;
    .btn{
      flex:1;
      cursor: pointer;
      .svg-icon{
        width: 15px;
        height: 15px;
        &.active{
          fill:#409EFF;
        }
      }
    }
  }
  .playlist-wrap{
    width: 500px;
    max-height: 500px;
    position: absolute;
    right: 1px;
    bottom: 62px;
    background-color: #fff;
    border: 1PX solid #f9f9f9;
    border-radius:10px;
    overflow: hidden;
    z-index: 99!important;
      overflow-y: auto;


    .svg-icon{
      position: fixed;
      width: 15px;
      height: 15px;
      margin-top: 10px;
      margin-left:200px;
      cursor: pointer;
      z-index: 99;
    }
  }
  .playcover-wrap{
    width: 18%;
    position: fixed;
    left: 0;
    bottom: 61px;

    overflow: hidden;
  }

  .player-lrc{
    width: 100%;
    position: absolute;
    left:0;
    bottom: 70px;
  }
  .playlist-slide-enter-active{
    animation: slideInRight .5s;
  }
  .playlist-slide-leave-active{
    animation: slideInRight .5s reverse;
  }
  .playerSlide-enter-active{
    animation: slideInUp .5s;
  }
  .playerSlide-leave-active{
    animation: slideInUp .5s reverse;
  }
  .player-slide{
    position: fixed;
    left: 0;
    top:70px;
    z-index: auto;
    background-color: #fff;
    height: calc(100vh - 70px - 60px);
  }
}


</style>
