<template>
  <div class="new-song">
    <p class="title">{{title}}</p>
    <div class="list">
      <div class="list-item" v-for="item,index in songList" :key="index" @dblclick="handleClick(item)">
        <span class="index">{{index + 1}}</span>
        <div class="list-item-pic">
          <img :src="item.picUrl" alt="">
        <svg-icon icon-class="play1"></svg-icon>
        </div>
        <div class="list-item-desc">
          <p class="name">{{item.name}}</p>
          <p class="bottom">{{item.song.album.company}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    songList: {
      type: Array,
      default: null
    }
  },
  methods: {
    handleClick (row) {
      this.$emit('handleDblClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-song{
  width: 100%;
  .title{
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d1d1d1;
  }
  .list{
    width: 100%;
    display: flex;
    justify-content: space-between;
      flex-wrap: wrap;

    &-item{
      width: 50%;
      display: flex;
      margin-top: 10px;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      .index{
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
      }
      &-pic{
      position: relative;
      img{
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
      .svg-icon{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      }
      &-desc{
        margin-left: 10px;
        p{
          text-align: left;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
