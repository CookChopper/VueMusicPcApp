<template>
  <div class="mv">
    <div class="first">
      <video-tag title="最新MV"
        :tags="tagList"
        @handleClick="handleClick"
        :currentIndex="currentIndex" :moreIcon="true" />
      <video-list  :mvData="firstMV" />
    </div>
    <div class="recommand">
      <video-tag title="推荐MV" :moreIcon="true" />
      <video-list  :mvData="recomMV" />
    </div>
    <div class="mvTop">
      <video-tag title="MV排行榜"
        :tags="tagList"
        @handleClick="handleTopClick"
        :currentIndex="currentIndex" :moreIcon="true" />
      <MvTop :mvList="MvTop" />
    </div>
  </div>
</template>

<script>
import VideoList from './components/VideoList'
import VideoTag from './components/VideoTag'
import MvTop from './components/MvTop'
import { getFirstMv, getPersonalizedMv, getTopMv } from '@/api/discover'
export default {
  name: 'Mv',
  data () {
    return {
      currentIndex: 0,
      firstMV: [],
      recomMV: [],
      MvTop: [],
      tagList: [
        {
          name: '全部'
        },
        {
          name: '内地'
        },
        {
          name: '港台'
        },
        {
          name: '欧美'
        }, {
          name: '日本'
        }, {
          name: '韩国'
        }
      ]
    }
  },
  components: {
    VideoList, VideoTag, MvTop
  },
  methods: {
    handleClick (item, index) {
      this.currentIndex = index
      if (item.name === '全部') {
        this.getFirstMv()
      } else {
        this.getFirstMv(item.name)
      }
    },
    handleTopClick (item, index) {
      this.currentIndex = index
      if (item.area === '全部') {
        this.getMvTop()
      } else {
        this.getMvTop(item.area)
      }
    },
    async getFirstMv (area) {
      const { data } = await getFirstMv({ area, limit: 8 })
      this.firstMV = data
      console.log(data)
    },
    async getPersonalizedMv () {
      const { result } = await getPersonalizedMv()
      this.recomMV = result
    },
    async getMvTop (area) {
      const { data } = await getTopMv({ area, limit: 8 })
      this.MvTop = data
    }
  },
  mounted () {
    this.getFirstMv()
    this.getPersonalizedMv()
    this.getMvTop()
  }
}
</script>

<style lang="scss" scoped>
.mv{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .first{
    width: 100%;
  }
}
</style>
