<template>
  <div class="rank">
    <div class="rank-top" ref="rankTop">
      <div class="title">
        <div class="title-left"><i>{{title[0]}}</i></div>
        <div class="title-right">
          <p class="title-right-item">{{title[1] + title[2]}}</p>
          <p>{{nowTime | formatDate('MM月dd日')}}</p>
        </div>
      </div>
      <svg-icon icon-class="bofang"></svg-icon>
    </div>
    <div class="rank-content">
      <ul class="rank-content-list">
        <li class="rank-content-list-item" v-for="item,index in list" :key="index" @dblclick="handleDblClick(item)">
          <span class="index">{{index+1 | fillZero}}</span>
          <span class="name">{{item.name}}</span>
          <span class="author">{{item.ar[0].name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: Array,
      default: null
    },
    title: {
      type: Array,
      default: null
    },
    list: {
      type: Array,
      default: null
    }
  },
  mounted () {
    this.$refs.rankTop.style.background = `linear-gradient(to right,${this.bgc[0]}, ${this.bgc[1]})`
  },
  computed: {
    nowTime () {
      return new Date().valueOf()
    }
  },
  methods: {
    // 双击
    handleDblClick (row) {
      this.$emit('handleDblClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.rank{
  width: 100%;
  &-top{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 40px;
    .title{
      display: flex;
      align-items: center;
      color: #fff;
          overflow: hidden;

      &-left{
        font-size: 50px;
        font-weight: 600;
      }
      &-right{
        &-item{
          font-size: 22px;
        }
        font-size: 16px;
        font-weight: 600;
        margin-left: 5px;
        font-style: italic;
          overflow: hidden;

        p{
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-of-type(2){
            font-style: normal;
            font-weight: 500;
          }
        }

      }
    }
    .svg-icon{
      width: 40px;
      height: 40px;
      fill:white;
    }
  }
  &-content{
    width: 100%;
    &-list{
      width: 100%;
      &-item{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        text-align: left;
        overflow: hidden;
        cursor:pointer;
        &:nth-of-type(2n){
          background-color: #f9f9f9;
        }
        &:hover{
          background-color: #f3f3f3;
        }
        &:nth-of-type(1){
            .index{
              color: red;
            }
          }
          &:nth-of-type(2){
            .index{
              color: red;
            }
          }
          &:nth-of-type(3){
            .index{
              color: red;
            }
          }
        .index{
          width: 30px;
          text-align: center;

        }
        .name{
          width: 65%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-left: 10px;
        }
        .author{
          width: 20%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
