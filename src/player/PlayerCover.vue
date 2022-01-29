<template>
  <div class="playcover">
    <div class="img"  @mouseenter="_onmouseenter" @mouseleave="_onmouseleave">
      <div class="icon" v-show="showIcon" @click="handleOpen" >
        <svg-icon icon-class="fullscreen"></svg-icon>
      </div>
      <img :src="coverImg" alt="">
    </div>
    <div class="desc">
      <p class="song">{{title}}</p>
      <p class="author">{{author}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PlayerCover',
  mounted () {
    this.$bus.$on('postSongLrc', (lrcdata, current) => {
      console.log(lrcdata)
      console.log(current)
    })
  },
  props: {
    coverImg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      showIcon: false
    }
  },

  methods: {
    _onmouseenter () {
      this.showIcon = true
    },
    _onmouseleave () {
      this.showIcon = false
    },
    handleOpen () {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.playcover{
  width: 100%;
  box-sizing:border-box;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .img{
    position: relative;
      cursor:pointer;

    .icon{
      position: absolute;
      left: 0;
      top: 0;
      width: 50px;
      height: 50px;
      background: rgba(0,0,0,.3);
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon{
        width: 25px;
        height: 25px;
        fill:white;
      }
    }
    img{
    width: 50px;
    height: 50px;
    vertical-align: middle;
    }
  }

  .desc{
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding-left: 5px;

    p{
      width: 100%;
      text-align: left;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &.song{
        font-weight: 500;
        margin-bottom: 5px;
      }
    }
  }

}
</style>
