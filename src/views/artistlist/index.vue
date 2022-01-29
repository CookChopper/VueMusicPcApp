<template>
  <div class="artistlist"
  v-loading.fullscreen.lock="loading"
  element-loading-text="加载中..."
  element-loading-background="rgba(0,0,0,.5)"
  >
    <div class="language">
      <tag-list title="语种" :tags="language" :currentIndex="langCurrentIndex" @handleClick="handleChangeLangTag" />
    </div>
    <div class="category">
      <tag-list title="分类" :tags="category" :currentIndex="CateCurrentIndex" @handleClick="handleChangeCateTag" />
    </div>
    <div class="name">
      <tag-list title="筛选" :tags="name" :currentIndex="NameCurrentIndex" @handleClick="handleChangeNameTag" />
    </div>
    <div class="list">
      <list :list="list" @handleClick="handleClickArtist" />
    </div>
    <div class="pagination">
      <el-pagination
        :total="pageInfo.total"
        layout="prev,pager,next"
        background
         @current-change="handleCurrentChange"
       ></el-pagination>
    </div>
  </div>
</template>

<script>
import TagList from '@/components/TagList'
import List from './components/ArtistList'
import { getArtistList } from '@/api/artist.js'
export default {
  name: 'ArtistList',
  data () {
    return {
      list: [],
      language: [
        { area: -1, name: '全部' },
        { area: 7, name: '华语' },
        { area: 96, name: '欧美' },
        { area: 8, name: '日本' },
        { area: 16, name: '韩国' },
        { area: 0, name: '其他' }
      ],
      category: [
        { type: -1, name: '全部' },
        { type: 1, name: '男歌手' },
        { type: 2, name: '女歌手' },
        { type: 3, name: '乐队' }

      ],
      name: [{ id: 1, name: '热门' }],
      langCurrentIndex: 0,
      CateCurrentIndex: 0,
      NameCurrentIndex: 0,
      pageInfo: {
        total: 500,
        offset: 1,
        area: -1,
        type: -1,
        initial: ''
      },
      loading: false
    }
  },
  mounted () {
    this.initName()
    this.getArtistList(-1, -1, 1)
  },
  components: {
    TagList, List
  },
  methods: {
    initName () {
      for (let i = 0; i < 26; i++) {
        const obj = {
          id: i + 2,
          name: String.fromCharCode(65 + i)
        }
        this.name.push(obj)
      }
    },
    async getArtistList (type, area, offset, initial) {
      this.loading = true
      if (initial === '热门') {
        const { artists } = await getArtistList({ type, area, offset })
        this.list = artists
        this.loading = false

        return
      }
      const { artists } = await getArtistList({ type, area, offset, initial })
      this.list = artists
      this.loading = false
    },
    handleChangeLangTag (item, index) {
      this.langCurrentIndex = index
      this.pageInfo.area = item.area
      this.getArtistList(this.pageInfo.type, this.pageInfo.area, this.pageInfo.offset, this.pageInfo.initial)
    },
    handleChangeCateTag (item, index) {
      this.CateCurrentIndex = index
      this.pageInfo.type = item.type
      this.getArtistList(this.pageInfo.type, this.pageInfo.area, this.pageInfo.offset, this.pageInfo.initial)
    },
    handleChangeNameTag (item, index) {
      this.NameCurrentIndex = index
      this.pageInfo.initial = item.name
      this.getArtistList(this.pageInfo.type, this.pageInfo.area, this.pageInfo.offset, this.pageInfo.initial)
    },
    handleCurrentChange (page) {
      this.pageInfo.offset = page
      this.getArtistList(this.pageInfo.type, this.pageInfo.area, this.pageInfo.offset, this.pageInfo.initial)
    },
    handleClickArtist (id) {
      this.$router.push(`/artistdetail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.artistlist{
  width: 100%;
  box-sizing: border-box;
  padding: 5px 50px;
  .language{
    width: 100%;
  }
}
</style>
