<template>
  <div class="allmusiclist" >
    <select-category :title.sync="selectValue"
      text="全部歌单分类"
      :data="songCate"
     />
    <tag-list title="热门标签"
      :tags="hotTagList"
      @handleClick="handleClickTag"
    />
    <music-list :list="list"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
    <div class="pagination">
      <el-pagination
      :page-size="pageInfo.limit"
      :pager-count="7"
      layout="prev, pager, next"
      :current-page="pageInfo.offset"
      @current-change="handleChangePage"
      :total="pageInfo.total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getHotSongSheetCate,
  getAllSongSheetCate,
  getSongSheet
} from '@/api/music.js'
import { makeUpArray } from '@/utils/validate.js'
import SelectCategory from './components/SelectCategory.vue'
import MusicList from '@/components/MusicList/index.vue'
import TagList from './components/TagList.vue'
export default {
  name: 'AllMusicList',
  data () {
    return {
      cateValue: '',
      hotTagList: [], // 热门歌单标签
      songCate: [], // 全部歌单分类
      selectValue: '全部',
      pageInfo: {
        order: 'hot', // 歌单分类 new or hot
        limit: 50, // 显示条数
        offset: 1, // 页码
        total: 0 // 总条数
      },
      list: [], // 歌单数据
      loading: false // 加载
    }
  },
  mounted () {
    this.getHotSongSheetCate()
    this.getAllSongSheetCate()
    this.getSongSheet()
  },
  components: {
    SelectCategory, MusicList, TagList
  },
  methods: {
    // 获取全部歌单分类
    async getAllSongSheetCate () {
      const { categories, sub } = await getAllSongSheetCate()
      this.songCate = makeUpArray(categories, sub)
    },
    // 获取热门歌单分类
    async getHotSongSheetCate () {
      const { tags } = await getHotSongSheetCate()
      this.hotTagList = tags
    },
    // 获取歌单
    async getSongSheet () {
      this.loading = true
      const data = await getSongSheet({ ...this.pageInfo, cat: this.selectValue })
      this.list = data.playlists
      this.pageInfo.total = data.total
      this.loading = false
    },
    // 点击标签
    handleClickTag (item) {
      this.selectValue = item.name
      this.pageInfo.offset = 1
      this.getSongSheet()
    },
    // 切换分页
    handleChangePage (num) {
      this.pageInfo.offset = num
      this.getSongSheet()
    }
  }
}
</script>

<style lang="scss" scoped>
.allmusiclist{
  width: 100%;
  box-sizing:border-box;
  padding: 20px 50px;
  text-align: left;
}
.pagination{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
