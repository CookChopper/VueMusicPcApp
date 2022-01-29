<template>
  <div class="recommand">
    <div class="music-list">
      <div class="music-list-item" v-for="item,index in list" :key="index" @click="handleClick(item.id)">
        <div class="music-list-item-img"  >
          <img :src="item.picUrl || item.coverImgUrl" alt="">
        </div>
        <p class="music-list-item-name">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {

    list: {
      type: Array,
      default: null
    }

  },
  methods: {

    handleClick (id) {
      this.$emit('handleClick', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommand{
  width: 100%;
  margin-top: 10px;
  p{
    text-align: left;
    font-size: 16px;
    font-weight: 800;
  }
  .music-list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item{
      width: calc(18%);
      cursor:pointer;
      &-img{
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        img{
          display: block;
          width: 100%;
        }
        .listener{
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
          text-align: right;
          box-sizing:border-box;
          padding: 2px 5px;
          .svg-icon{
            width: 16px;
            height: 16px;
            fill:white;
            vertical-align: -2px;
          }
          .total{
            margin-left: 5px;
            color: white;
            font-size: 14px;
          }
        }
        .playBtn{
          position: absolute;
          left: 10px;
          bottom: 10px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(255, 255, 255,.5);
          .svg-icon{
            width:18px;
            height: 18px;
            vertical-align: -8px;
          }
        }
        .titleItem{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
          text-align: left;
          box-sizing:border-box;
          padding: 2px 5px;
           .svg-icon{
            width: 16px;
            height: 16px;
            fill:white;
            vertical-align: -2px;
          }
          .title{
            font-size: 14px;
            color:white;
          }
        }
      }
      &-name{
        margin: 5px 0;
        width: 100%;
        height: 40px;
        line-height: 20px;
        font-size: 15px;
        font-weight: 350;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient:vertical;
        overflow: hidden;
      }
    }
  }
}

</style>
