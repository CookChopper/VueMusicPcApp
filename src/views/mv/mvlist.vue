<template>
  <div class="mvlist">
    <p class="title">全部MV</p>
    <VideoTag title="语种" :tags="areaList" @handleClick="handleLangClick" :currentIndex="currentLangIndex" />
    <VideoTag title="分类" :tags="typeList" @handleClick="handleTypeClick" :currentIndex="currentTypeIndex" />
    <VideoTag title="排序" :tags="orderList" @handleClick="handleOrderClick" :currentIndex="currentOrderIndex" />
    <VideoList :mvData="mvList" />
    <el-pagination
    :total="pageInfo.total"
    :current-page="pageInfo.offset"
    @current-change="changePage"
    layout="prev,pager,next"
    ></el-pagination>
  </div>
</template>

<script>
import VideoTag from './components/VideoTag'
import VideoList from './components/VideoList.vue'
import { getAllMv } from '@/api/discover'
export default {
  name: 'mv-detail',
  components: {
    VideoTag, VideoList
  },
  data () {
    return {
      areaList: [
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
      ],
      currentLangIndex: 0,
      typeList: [
        {
          name: '全部'
        },
        {
          name: '官方版'
        },
        {
          name: '原生'
        },
        {
          name: '现场版'
        }, {
          name: '网易出品'
        }
      ],
      currentTypeIndex: 0,
      orderList: [
        {
          name: '上升最快'
        },
        {
          name: '最热'
        },
        {
          name: '最新'
        }
      ],
      currentOrderIndex: 0,
      pageInfo: {
        total: 500,
        offset: 1
      },
      mvList: []
    }
  },
  mounted () {
    this.getAllMv()
  },
  methods: {
    handleLangClick (item, index) {
      this.currentLangIndex = index
      this.getAllMv()
    },
    handleTypeClick (item, index) {
      this.currentTypeIndex = index
      this.getAllMv()
    },
    handleOrderClick (item, index) {
      this.currentOrderIndex = index
      this.getAllMv()
    },
    async getAllMv () {
      const { data } = await getAllMv({
        area: this.areaList[this.currentLangIndex].name,
        type: this.typeList[this.currentTypeIndex].name,
        order: this.orderList[this.currentOrderIndex].name,
        limit: 16,
        offset: this.pageInfo.offset
      })
      this.mvList = data
      // console.log(data)
    },
    changePage (page) {
      this.pageInfo.offset = page
      this.getAllMv()
      // console.log(arguments)
    }
  }
}
</script>

<style lang="scss" scoped>
.mvlist{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .title{
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 1PX solid #eee;
    text-align:left;
    font-size: 14px;
    font-weight: 800;
  }
}
 .videotag ::v-deep .left {
  display: flex;
  align-items: center;
}
</style>
