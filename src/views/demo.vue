<template>
  <div class="player-lrc-cover">
    <div class="lrc">
      <div class="lrc-cover">
        <div class="img">
          <img :src="require('@/assets/player/'+img2)" alt="" class="img2">
          <img :src="require('@/assets/player/'+img1)" alt="" class="img1">
        </div>
        <div class="lrc-rotate">
          <img src="https://p2.music.126.net/jjZVrXs7Zvfe3XMSm2QyHw==/109951165973424293.jpg" alt="">
        </div>
      </div>
      <div class="lrc-lyric">

      </div>
    </div>
    <div class="reviews-post">

    </div>
    <div class="reviers-lsit">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      img1: 'play-bar-support.png',
      img2: 'play-bar.png'
    }
  }

}
</script>

<style lang="scss" scoped>
.player-lrc-cover{
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  .lrc{
    width: 100%;
    display: flex;
    div{
      flex:1;
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
</style>
