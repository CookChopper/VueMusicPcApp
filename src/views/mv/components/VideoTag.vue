<template>
  <div class="videotag">
    <div class="left">
      <span class="title">{{title}}</span>
      <span class="tag"
       v-for="item,index in tags"
       :key="index"
       :class="{active : index === currentIndex}"
       @click="handleClick(item,index)"
       >{{item.name}}</span>
    </div>
    <div class="right" v-show="moreIcon">
      <svg-icon icon-class="arrow-right-bold" @click="$router.push('/mvlist')"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoTag',
  props: {
    title: {
      type: String,
      default: ''
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: null
    },
    moreIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (item, index) {
      this.$emit('handleClick', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.videotag{
  width: 100%;
  height: 40px;
  // text-align: left;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
  span{
    display: inline-block;
    text-align: center;
  }
  .title{
    width: 100px;
    font-weight: 800;
  }
  .tag{
    width: 80px;
    font-size: 14px;
    font-weight: 450;
    vertical-align: -5px;
    cursor: pointer;
    &.active{
      color: #0c73c2;
    }
  }
  .right .svg-icon{
    width: 15px;
    height: 15px;
    vertical-align: -10px;
    cursor: pointer;
  }
}
</style>
