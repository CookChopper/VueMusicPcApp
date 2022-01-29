<template>
  <div class="playerLrc" ref="playerLrc">
    <scroll ref="scroll" :height="height" :overflowY="overflowY" :overflowX="overflowX">
      <ul>
        <li v-for="item,index in lrcArray" :key="index" class="lrc-item" :style="{ 'color': currentIndex === index ? '#2d8cf0' : '#000'}">{{item[1]}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
export default {
  name: 'PlayerLrc',
  components: {
    Scroll
  },
  props: {
    lrcArray: {
      type: Array,
      default: null
    },
    currentTime: {
      type: String,
      default: ''
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
    }
  },
  mounted () {
    this.$refs.playerLrc.style.height = this.height
    this.$refs.playerLrc.style['overflow-x'] = this.overflowX ? 'auto' : ''
    this.$refs.playerLrc.style['overflow-y'] = this.overflowY ? 'auto' : ''
  },
  methods: {
    scrollTo (x, y) {
      this.$refs.playerLrc.scrollTop = y
      this.$refs.playerLrc.scrollLeft = x
    }
  }

}
</script>

<style lang="scss" scoped>
.playerLrc{
  width: 100%;
  overflow:hidden;
  .scroll{
    ul{
      width: 100%;
      height: 100%;
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
