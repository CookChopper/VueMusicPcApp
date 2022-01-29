<template>

  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  props: {
    height: {
      type: String,
      default: '0px'
    }
  },
  methods: {
    scrollTo (x, y) {
      this.$refs.scroll.scrollLeft = x
      this.$refs.scroll.scrollTop = y
    }
  }

}
</script>

<style lang="scss" scoped>
.scroll{
  width: 100%;
  overflow: hidden;

}
</style>
