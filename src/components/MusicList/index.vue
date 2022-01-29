<template>
  <div class="recommand">
    <p>{{title}}</p>
    <div class="music-list">
      <div class="music-list-item" v-for="item,index in list" :key="item.id" @click="handleClick(item.id)">
        <div class="music-list-item-img" @mouseenter="overImgItem(index)" @mouseleave="leaveImgItem(index)" >
          <img :src="item.picUrl || item.coverImgUrl" alt="">
          <transition name="listenerItem">
            <div class="listener" v-show="currentIndex != index ? description?true:false : description?false:true" v-if="showPlayCount">
              <svg-icon icon-class="airpods" />
              <span class="total">{{item.playCount}}</span>
            </div>
          </transition>
          <transition name="listenerItem">
            <div class="titleItem" v-show="description ? currentIndex == index ? true : false : false">
              <span class="title">{{description}}</span>
            </div>
          </transition>
          <transition name="playItem">
            <div class="playBtn" v-show="currentIndex == index ? true : false">
              <svg-icon icon-class="play" />
            </div>
          </transition>
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
    title: {
      type: String,
      defualt: ''
    },
    list: {
      type: Array,
      default: null
    },
    description: {
      type: String,
      default: ''
    },
    showPlayCount: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentIndex: null
    }
  },
  mounted () {

  },
  methods: {
    overImgItem (index) {
      this.currentIndex = index
    },
    leaveImgItem (index) {
      this.currentIndex = null
    },
    handleClick (id) {
      this.$router.push(`/musiclistdetail/${id}`)
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
.listenerItem-enter-active{
  animation: slideInDown .4s ;
}
.listenerItem-leave-active{
  animation: slideInDown .4s reverse;
}
.playItem-enter-active{
  animation: fadeIn 1s;
}
.playItem-leave-active{
  animation: fadeIn 1s reverse;
}
</style>
