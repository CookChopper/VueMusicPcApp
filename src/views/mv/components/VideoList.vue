<template>
  <div class="videolist">
    <div class="item" v-for="item,i in mvData" :key="i" @mouseenter="currentIndex = i" @mouseleave="currentIndex = -1">
      <div class="img" @click="$router.push(`/mvdetail/${item.id}`)">
        <img :src="item.cover || item.picUrl" alt="">
      </div>
      <p class="title">
        {{item.name}}
      </p>
      <p class="author">
        {{item.artists[0].name}}
      </p>
      <p class="playCount">
        <svg-icon icon-class="MV"></svg-icon>
        <span class="count">{{item.playCount | formatTotal}}</span>
      </p>
      <transition name="playSlide">
        <div class="playicon" v-show="currentIndex === i">
          <svg-icon icon-class="play"></svg-icon>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  data () {
    return {
      currentIndex: -1
    }
  },
  props: {
    mvData: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.videolist{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item{
    width: calc(25%);
    box-sizing:border-box;
    padding:10px 20px;
    position:relative;
    .img{
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: left;
      font-size: 13px;
      &.title{
        font-weight: 500;
      }
      &.author{
        color: #515a6e;
      }
    }
    .playicon{
      position: absolute;
      top: calc(50% - 40px);
      left: calc(50% - 40px);
      width: 40px;
      height: 40px;
      background:rgba(255,255,255,.5);
      border-radius:50%;
      .svg-icon{
        display: block;
        width: 30px;
        height: 30px;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
    .playCount{
      position: absolute;
      right: 20px;
      top: 10px;
      color: #fff;
      background: rgba(0,0,0,.1);
      .svg-icon{
        fill:white;
        vertical-align: -2px;
      }
      .count{
        margin-left: 5px;
      }
    }
  }
  .playSlide-enter-active{
    animation: fadeIn .5s;
  }
  .playSlide-leave-active{
    animation: fadeIn .5s reverse;
  }
}
</style>
