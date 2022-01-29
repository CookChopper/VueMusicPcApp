<template>
  <div class="comment">
     <div class="comment-post">
       <textarea rows="5" v-model="val" />
       <div class="comment-post-submit">
         <button>评论</button>
       </div>
     </div>
     <div class="comment-list">
       <p class="comment-list-title">{{commentList.length? '精彩评论' : '暂无评论'}}</p>
       <div class="comment-list-item" v-for="item,index in commentList" :key="index" >
         <div class="avatar">
           <img :src="item.user.avatarUrl" alt="">
         </div>
         <div class="user-desc">
           <p class="context">
             <span class="user-name">{{item.user.nickname}}：</span>{{item.content}}
           </p>
           <p class="create-time">{{item.time | formatDate('yyyy-MM-dd hh:mm:ss')}}</p>
         </div>
       </div>
     </div>
     <div class="pagination" v-if="commentList.length">
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
</template>

<script>
import { getPlayListComment } from '@/api/music.js'
export default {
  name: 'Comment',
  data () {
    return {
      val: '',
      pageInfo: {
        limit: 10,
        offset: 1,
        total: 0
      },
      commentList: [],
      id: ''
    }
  },
  props: {
    Mid: {
      type: String,
      default: null
    }
  },
  methods: {
    async getPlayListComment (id) {
      const { comments, total } = await getPlayListComment({ id, ...this.pageInfo })
      this.commentList = comments
      this.pageInfo.total = total
    },
    handleCurrentChange () {
      // console.log(this.Mid)
      this.getPlayListComment(this.Mid)
    }
  },
  watch: {
    '$route' (val) {
      this.id = val.params.id
    }
  }

}
</script>

<style lang="scss" scoped>
.comment{
  width: 100%;
  // box-sizing:border-box;
  // padding: 10px 40px;
  &-post{
    width: 100%;
    background-color: #eee;
    box-sizing:border-box;
    padding: 5px 20px;
    textarea{
      width: 100%;
      resize: none;
    }
    &-submit{
      display: flex;
      justify-content: flex-end;
      button{
        border: none;
        background-color: none;
        cursor: pointer;
      }
    }
  }
  &-list{
    width: 100%;
    margin-top: 10px;
    &-title{
      font-size: 16px;
      font-weight: 500;
      text-align: left;
    }
    &-item{
      display: flex;
      box-sizing: border-box;
      padding:5px;
      align-items: center;
      .avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow:hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .user-desc{
        width: 95%;
        margin-left: 10px;
        overflow: hidden;
        p{
          text-align: left;
          font-size: 14px;
        }
        .create-time{
          margin-top: 5px;
        }
        .user-name{
          color: #0c73c2;
        }
      }
      &:nth-of-type(2n){
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
