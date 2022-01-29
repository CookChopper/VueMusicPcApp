<template>
  <div class="new-song">
    <div class="list">
      <div class="list-item" v-for="item,index in mvList" :key="index" @dblclick="handleClick(item)">
        <span class="index">{{index + 1}}</span>
        <div class="list-item-pic">
          <img :src="item.cover" alt="">
        <svg-icon icon-class="play1"></svg-icon>
        </div>
        <div class="list-item-desc">
          <p class="name">{{item.name}}</p>
          <p class="bottom">{{item.artists[0].name}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {

    mvList: {
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
        width: 100px;
        height: 100px;
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
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
