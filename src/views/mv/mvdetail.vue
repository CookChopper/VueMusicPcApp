<template>
  <div class="mvdetail">
    <div class="left">
      <p class="title">
        <span class="tag">MV</span>
        <span class="name">{{detailInfo.name}}</span>
      </p>
      <video  controls ref="video"></video>
      <mv-comment :commentList="commentList" />
      <div class="pagination" >
       <el-pagination
        layout="prev, pager, next"
        :page-size="10"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.offset"
        :total="pageInfo.total"
       >
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <p class="title">MV介绍</p>
      <p class="info">
        <span>发布时间：{{detailInfo.publishTime}}</span>
        <span>播放次数：{{detailInfo.playCount}}</span>
      </p>
      <p class="desc">
        <span>简介：{{detailInfo.desc || '无'}}</span>
      </p>
      </div>
      <div class="list">
        <p class="title">相关推荐</p>
        <div class="item" v-for="item,index in mvlist" :key="index" @click="$router.push(`/mvdetail/${item.vid}`)">
          <div class="img">
            <img :src="item.coverUrl" alt="">
          </div>
          <div class="item-desc">
            <p class="item-title">
              <span class="item-tag">MV</span>
              <span class="item-name">{{item.title}}</span>
            </p>
            <p class="item-author">
              {{item.creator['0'].userName}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MvComment from './components/MvComment.vue'
import { getMvDetail, getMvUrl, getMvComment, getMvGroup } from '@/api/mv'
export default {
  name: 'MvDetail',
  data () {
    return {
      id: this.$route.params.id,
      detailInfo: {},
      mvlist: [],
      pageInfo: {
        total: 500,
        offset: 1
      },
      commentList: []
    }
  },
  components: {
    MvComment
  },
  mounted () {
    this.getMvDetail()
    this.getMvUrl()
    this.getMvGroup()
    this.getMvComment()
  },
  methods: {
    async getMvDetail () {
      const { data } = await getMvDetail(this.id)
      this.detailInfo = data
    },
    async getMvUrl () {
      const { data } = await getMvUrl(this.id)
      this.$refs.video.src = data.url
    },
    // 暂不渲染
    async getMvComment () {
      const { comments } = await getMvComment({
        id: this.id,
        offset: this.pageInfo.offset
      })
      this.commentList = comments
      // console.log(commentList)
    },
    async getMvGroup () {
      const { data } = await getMvGroup(this.id)
      this.mvlist = data
      // console.log(data)
    },
    handleCurrentChange (page) {
      this.pageInfo.offset = page
      this.getMvComment()
      // console.log(page)
    }
  },
  watch: {
    '$route.params.id' (val) {
      this.id = val
      this.getMvDetail()
      this.getMvUrl()
      this.getMvGroup()
      this.getMvComment()
    }
  }
}
</script>

<style lang="scss" scoped>
.mvdetail{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  display: flex;
  text-align: left;
  .left{
    width: 65%;
    .title{
      .tag{
        box-sizing: border-box;
        padding: 5px 10px;
        border: 1px solid #e83c3c;
        color: #e83c3c;
        border-radius: 5px;
      }
      .name{
        margin-left: 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }
    video{
      width: 100%;
      margin: 10px 0;
    }
  }
  .right{
    width: 35%;
    box-sizing: border-box;
    padding-left: 10px;
    .top{
      width: 100%;
      height: 400px;
      overflow: hidden;
    }
    p{
      margin: 5px 0;
    }
    .title{
      font-size: 18px;
      font-weight: 500;
    }
    .info{
      font-size: 12px;
      font-weight: 500;
      span:nth-of-type(2){
        margin-left: 5px;
      }
    }
    .desc{
      font-size: 12px;
      font-weight: 500;
      span{
        font-size: 14px;
      }
    }
    .list{
      width: 100%;
      .item{
        width: 100%;
        display: flex;
        margin:5px 0;
        .img{
          width: 150px;
          height: 100px;
          img{
            width: 100%;
            height: 100%;
          }

        }
        .item-desc{
            width: 50%;
            height: 100px;
            margin-left: 10px;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            .item-title{
              box-sizing: border-box;
              padding-top: 5px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
              .item-tag{
                box-sizing: border-box;
                padding: 2px 5px;
                border: 1px solid #e83c3c;
                color: #e83c3c;
                border-radius: 5px;
              }
              .item-name{
                margin-left: 10px;
                font-size: 14px;
                font-weight: 500;
              }
          }
      }
    }
  }
}
</style>
