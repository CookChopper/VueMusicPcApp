<template>
  <div class="playerBtn">
    <div class="btn">
      <svg-icon icon-class="shangyishou" @click="handleClick('prev')"></svg-icon>
    </div>
    <div class="btn">
      <svg-icon icon-class="bofang" @click="handleClick('play')" v-if="!playing"></svg-icon>
      <svg-icon icon-class="zanting" @click="handleClick('zanting')" v-else></svg-icon>
    </div>
    <div class="btn">
      <svg-icon icon-class="xiayishou" @click="handleClick('next')"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerBtn',
  data () {
    return {

    }
  },
  methods: {
    handleClick (type) {
      this.$emit('handleClick', type)
    }
  },
  props: {
    playing: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang="scss" scoped>
.playerBtn{
  width: 18%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  .btn{
    width: 70px;
    text-align: center;
    cursor: pointer;

  }
  .svg-icon{
    width: 30px;
    height: 30px;
  }
}
</style>
