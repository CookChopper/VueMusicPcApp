<template>
  <div class="aside">
    <ul class="aside-list" @click="clickNavItem">
      <router-link to="/individuation" exact>
        <li class="aside-item">
        <svg-icon icon-class="yinleguan" />
        <span>个性推荐</span>
      </li>
      </router-link>
      <router-link to="/allmusiclist" exact>
      <li class="aside-item">
        <svg-icon icon-class="music" />
        <span>歌单</span>
      </li>
      </router-link>
      <router-link to="/ranklist" exact>
      <li class="aside-item">
        <svg-icon icon-class="paixingbang" />
        <span>排行榜</span>
      </li>
      </router-link>
      <router-link to="/artist-list" exact>
      <li class="aside-item">
        <svg-icon icon-class="user" />
        <span>歌手</span>
      </li>
      </router-link>
      <router-link to="/mv" exact>
      <li class="aside-item">
        <svg-icon icon-class="MV" />
        <span>MV</span>
      </li>
      </router-link>
      <router-link to="/new-songs" exact>
      <li class="aside-item">
        <svg-icon icon-class="yinyue" />
        <span>最新音乐</span>
      </li>
      </router-link>
    </ul>
    <div class="userSheet" v-if="token">
      <p class="title">创建的歌单</p>
      <ul class="list">
        <li class="item" v-for="item,index in userSheet" :key="index" @click="handleClick(item.id)">
          <img :src="item.coverImgUrl" alt="" class="item-img">
          <span class="item-name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserSongSheet } from '@/api/user.js'
export default {
  data () {
    return {
      activeIndex: 0,
      userSheet: [] // 用户的歌单
    }
  },
  methods: {
    clickNavItem (item) {
      // console.log(item.target)
    },
    async getUserSongSheet (id) {
      const { playlist } = await getUserSongSheet({ uid: id })
      // console.log(data)
      this.userSheet = playlist
    },
    handleClick (id) {
      this.$router.push(`/musiclistdetail/${id}`)
    }
  },
  computed: {
    token () {
      if (this.$store.state.token) {
        this.getUserSongSheet(this.$store.state.uid)
      }
      return this.$store.state.token
    }
  }
}
</script>

<style lang="scss" scoped>
.aside{
  width: 18%;
  // min-width: 200px;
  height: calc(100vh - 70px - 60px);
  background: #f9f9f9;
  float: left;
  &-list{
    width: 100%;
    a{
      &.active{
        border-left: 5px solid #2d8cf0;
        color: #2d8cf0;
        .svg-icon{
                      color: #2d8cf0;
                      fill: #2d8cf0!important;
                    }
      }
      &:hover{
              border-left: 5px solid #2d8cf0;
              color: #2d8cf0;
              .svg-icon{
                color: #2d8cf0;
                fill: #2d8cf0!important;
              }
            }
    }
  }
   &-item{
      width: 100%;
      height: 50px;
      line-height: 60px;
      text-align: left;
      box-sizing:border-box;
      padding: 5px 10px 5px 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .svg-icon{
        vertical-align: -4px;
        width: 20px;
        height: 20px;
      }
      span{
        margin-left: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  .userSheet{
    width: 100%;
    .title{
      width: 100%;
      height: 30px;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      box-sizing:border-box;
      margin-top: 10px;
      padding-left: 10px;
    }
    .list{
      width: 100%;
      overflow: hidden;
      .item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        &-img{
          width: 25px;
          height: 25px;
          vertical-align: middle;
          margin-left: 20px;
          margin-right: 10px;
        }
        &-name{
          font-size: 12px;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
