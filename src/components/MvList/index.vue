<template>
  <div class="wrap">
    <p class="title">{{title}}</p>
    <div class="mvlist">
      <div class="mvlist-item" v-for="item,index in mv" :key="index">
      <div class="loco">
        <svg-icon icon-class="MV"></svg-icon>
      </div>
      <img :src="item.picUrl">
      <p class="mvlist-item-name">{{item.copywriter}}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvList',
  props: {
    mv: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  .title{
    text-align: left;
    font-size: 16px;
    font-weight: 600;
  }
}
.mvlist{
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-item{
    width: 32%;
    position: relative;
    cursor: pointer;
    .loco{
      position: absolute;
      left: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background:rgba(0,0,0,.3);
      .svg-icon{
        fill: #fff;
        vertical-align: -3px;
      }
    }
    img{
      width: 100%;
    }
    &-name{
      margin: 5px 0 0 0;
      text-align: left;
      // 文字过长换行 超过2行自动省略
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
