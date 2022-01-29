<template>
  <div class="wrap">
    <!-- 选择框 -->
    <div class="select-box" @click="handleClick">
      <div class="select-box-left">
        {{title}}
      </div>
      <div class="select-box-right" >
        <svg-icon icon-class="arrow-down"></svg-icon>
      </div>
    </div>

    <!-- 选择项 -->
      <div class="loco" v-if="showOpiton">
      </div>
    <div class="select-options" v-if="showOpiton">
      <p class="text">{{text}}</p>
      <div class="btn" @click="handleClickOption('全部')">
        全部歌单
      </div>
      <div class="list-wrap">
        <div class="select-options-list" v-for="item,index in data" :key="index">
        <div class="option-name">
          <svg-icon icon-class="quanqiu"></svg-icon>
          <span>{{item.name}}</span>
        </div>
        <div class="option-item">
          <div class="option-item-box" v-for="i,ix in item.children" :key="ix" @click="handleClickOption(i.name)">
            {{i.name}}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCategory',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      showOpiton: false
    }
  },
  methods: {
    handleClick () {
      this.showOpiton = !this.showOpiton
    },
    handleClickOption (name) {
      this.$emit('update:title', name)
      this.$bus.$emit('changeTag', name)
      this.showOpiton = false
      this.$parent.pageInfo.offset = 1
      this.$parent.getSongSheet()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  position: relative;
  z-index: 9;
  .select-box{
    width: 100px;
    height: 40px;
    padding: 5px;
    line-height: 40px;
    box-sizing:border-box;
    display: flex;
    justify-content:  center;
    align-items: center;
    border:1px solid #e5e5e5;
    border-radius: 8px;

    cursor: pointer;
    &-left{
      width: 70px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
    &-right{
      .svg-icon{
      vertical-align: -2px;
      }
    }
  }
  .loco{
    background-color: #fff;
      position: absolute;
      margin: 0;
      padding: 0;
      left: 20px;
      top:50px;
      border: 1px solid #d5d5d5;
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      border-right:none;
      border-bottom:none;

    }
  .select-options{
    width: 500px;

    border:1PX solid #d5d5d5;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 60px;
    box-sizing:border-box;
    padding:0 10px;

    .text{
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1PX solid #d5d5d5;
    }
    .btn{
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin: 10px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      border:1PX solid #d5d5d5;
      border-radius:5px;
      cursor:pointer;
    }
    .list-wrap{
      width: 100%;
        height: 300px;
      overflow-y:auto ;
    }
    &-list{
      width: 100%;

      display: flex;
      .option-name{
        width: 20%;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        span{
          margin-left: 5px;

        }
        .svg-icon{
          width: 20px;
          height: 20px;
        }
      }
      .option-item{
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom:5px;
        cursor: pointer;
        &-box{
          width: 19%;
          border: 1PX solid #d5d5d5;
          box-sizing:border-box;
          padding: 3px;
          text-align: center;
          &:nth-of-type(n+2){
            border-left: none;
          }
          &:nth-of-type(5n+6){
            border-left: 1PX solid #d5d5d5;
          }
          &:nth-of-type(n+6){
            border-top: none;
          }
        }
      }
    }
  }
}
</style>
