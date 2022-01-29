<template>

  <div class="taglist" >
    <span class="title">{{title}}：</span>
    <div class="tag-item"
      :class="[{'active':index===currentIndex}]"
      v-for="item,index in tags"
      :key="index"
      @click="handleClick(item,index)"
    >
      {{item.name}}
    </div>
  </div>

</template>

<script>

export default {
  name: 'TagList',
  data () {
    return {
      currentIndex: null
    }
  },
  props: {
    // 标签组名称
    title: {
      type: String,
      default: ''
    },
    // 标签数据列表
    tags: {
      type: Array,
      default: null
    }

  },
  methods: {
    // 通知父组件调用点击事件
    handleClick (item, index) {
      this.currentIndex = index
      this.$emit('handleClick', item)
    },
    // 修改index
    handleOn (index) {
      this.currentIndex = parseInt(index)
    }
  },
  created () {
    this.$bus.$on('changeTag', (name) => {
      Object.keys(this.tags).forEach(key => {
        if (this.tags[key].name === name) {
          this.handleOn(key)
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.taglist{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  .tag-item{
    flex: 1;
    max-width: 10%;
    text-align: center;
    cursor:pointer;
    &.active{
      color: #2D8CF0;
    }
  }
}
</style>
