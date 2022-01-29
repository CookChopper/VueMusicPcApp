<template>
  <div class="swiper">
      <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item,index in banner" :key="index">
      <img :src="item.imageUrl" alt="" style="width:100%;height:100%" @click="go(item.url)">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default: null
    }
  },
  methods: {
    go (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  width: 100%;
}
</style>
