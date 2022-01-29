<template>
  <div class="collect">
    <div class="collector" v-for="item,index in collector" :key="index">
      <div class="avatar">
        <img :src="item.avatarUrl" alt="">
      </div>
      <div class="nickname">
        {{item.nickname}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collect',
  props: {
    collector: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.collect{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .collector{
    width: 10%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow:hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .nickname{
      width: 100%;
      margin-top: 5px;
      text-align: center;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
