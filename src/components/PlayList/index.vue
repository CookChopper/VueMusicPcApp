<template>
  <div class="playlist">
    <p class="title" v-if="title">{{title}}</p>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @row-dblclick="playmusic"

        >
        <el-table-column
          width="50"
          type="index"
          >
          <template slot-scope="scope">
            <svg-icon icon-class="shengyin-kai" style="fill:#2d8cf0" v-if="scope.$index === currentIndex"></svg-icon>
            <span class="index" v-else>{{scope.row.url ? scope.$index + 1 : '无效'}}</span>
          </template>
          </el-table-column>
        <el-table-column
          label="喜欢"
          width="50"
          v-if="showLike"
          >
          <template #default="scope">
            <svg-icon style="width:20px;height:20px;vertical-align:-5px;cursor:pointer" icon-class="like" @click="handleClick(scope.row.id)" v-if="!scope.row.like"></svg-icon>
            <svg-icon style="width:20px;height:20px;vertical-align:-5px;cursor:pointer;fill:#F56C6C;" icon-class="like_true" @click="handleClick(scope.row.id)" v-else></svg-icon>

          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="音乐标题"
          >
        </el-table-column>
        <el-table-column
          prop="ar[0].name"
          label="歌手"
          >
        </el-table-column>
         <el-table-column
          prop="al.name"
          label="专辑"
          v-if="showAl"
         >

        </el-table-column>
        <el-table-column
          label="时长"
          >
          <template slot-scope="scoped">
            {{scoped.row.dt|| scoped.row.duration  | formatDate('mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          label="添加到播放列表"
          width="150"
          align="center"
          v-if="showAdd"
          >
          <template slot-scope="scoped" >
            <el-button type="primary" icon="el-icon-plus" circle @click="addPlayMusic(scoped.row)" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: null
    },
    showLike: {
      type: Boolean,
      default: true
    },
    showAl: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    currentIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleClick (id) {
      this.$emit('likeMusic', id)
    },
    playmusic (row, column, event) {
      this.$emit('dblClick', row)
    },
    addPlayMusic (row) {
      this.$emit('dblClick', row, 'add')
    }
  }

}
</script>

<style lang="scss" scoped>
.playlist{
  background-color: #fff;
  .title{
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0;
  }
}
</style>
