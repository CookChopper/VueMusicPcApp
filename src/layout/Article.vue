<template>
  <div class="article">
    <!-- <keep-alive> -->
      <router-view :key="key" />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  computed: {
    key () {
      return new Date().valueOf()
    }
  }
}
</script>

<style lang="scss" scoped>
.article{
  width: 82%;
  height: calc(100vh - 70px - 60px);
  overflow-y:auto;
  float: left;
}
</style>
