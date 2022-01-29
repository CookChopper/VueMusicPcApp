<template>
  <div class="player-lrc-cover">
    <div class="icon" @click="handleClose">
      <svg-icon icon-class="suoxiao"></svg-icon>
    </div>
    <div class="lrc">
      <div class="lrc-cover">
        <div class="img">
          <img :src="require('@/assets/player/'+img2)" alt="" class="img2">
          <img :src="require('@/assets/player/'+img1)" alt="" class="img1">
        </div>
        <div class="lrc-rotate">
          <img :src="coverImg" alt="">
        </div>
      </div>
      <div class="lrc-lyric" >
        <p class="title">{{name}}</p>
        <p class="title">{{author}}</p>
        <div class="wrap" ref="lrcLyric">
          <scroll ref="scroll" :height="height" :overflowY="overflowY" :overflowX="overflowX">
          <ul>
            <li v-for="item,index in lrcArray" :key="index" class="lrc-item" :style="{ 'color': currentIndex === index ? '#2d8cf0' : '#000'}">{{item[1]}}</li>
          </ul>
        </scroll>
        </div>
      </div>
    </div>
    <div class="reviews-post">

    </div>
    <div class="reviers-lsit">

    </div>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
export default {
  name: 'PlayerPure',
  data () {
    return {
      img1: 'play-bar-support.png',
      img2: 'play-bar.png'
    }
  },
  props: {
    coverImg: {
      type: String,
      default: ''
    },
    lrcArray: {
      type: Array,
      default: null
    },
    height: {
      type: String,
      default: '100px'
    },
    overflowX: {
      type: Boolean,
      default: false
    },
    overflowY: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: null
    },
    author: {
      type: String,
      default: null
    }
  },
  mounted () {
    this.$refs.lrcLyric.style.height = this.height
    this.$refs.lrcLyric.style['overflow-x'] = this.overflowX ? 'auto' : ''
    this.$refs.lrcLyric.style['overflow-y'] = this.overflowY ? 'auto' : ''
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    scrollTo (x, y) {
      this.$refs.lrcLyric.scrollTop = y
      this.$refs.lrcLyric.scrollLeft = x
    }
  },
  components: {
    Scroll
  }

}
</script>

<style lang="scss" scoped>
.player-lrc-cover{
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  .icon{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: #ffb800;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    .svg-icon{
      width: 25px;
      height: 25px;
      fill:white;
    }
  }
  .lrc{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .lrc-cover,.lrc-lyric{
      width: 50%;
      display: flex;
      justify-content: center;
      text-align: center;

    }
    .lrc-cover{
      position: relative;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        display: block;
      }
      .img1{
        width: 30px;
        height: 30px;
        z-index: 99;
      }
      .img2{
        width: 80px;
        height: 80px;
        transform: rotate(-30deg);
        position: absolute;
        left: 53%;
      }
      .lrc-rotate{
        margin-top: 40px;
        width: 300px;
        min-height: 300px;
        max-height: 300px;
        border-radius:50%;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items:center;
        box-shadow: 0px 0px 100px #918a85;
        animation: rotating 10s linear infinite;
        img{
          display: block;
          width: 200px;
          height: 200px;
          border-radius:50%;
          border:1PX solid #fff;
        }
      }
    }
  }
}
.lrc-lyric{
  width: 100%;
  height: 300px;
  display: block;
  overflow-y:hidden;
  flex-direction: column;
  .title{
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  .scroll{
    ul{
      width: 100%;
      height: 100%;
      text-align: left;
      li{
        font-size: 16px;
        font-weight: 500;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
